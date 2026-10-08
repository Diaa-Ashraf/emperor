# خطة الحماية والدرع الأمني الشامل ضد الهجمات المليونية (Anti-DDoS & Security Shield)

## 1. الحقيقة الهندسية لهجمات الـ 3 مليون طلب في الثانية (Volumetric DDoS)
عندما يقوم مهاجم أو شبكة بوتات (Botnet) بإرسال ملايين الطلبات في الثانية:
- **لا يمكن لسيرفر واحد (Single Origin Server)** معالجة هذا الحجم من البيانات بمفرده في طبقة الـ PHP/Web Server لأن سعة كارت الشبكة (1Gbps أو 10Gbps) والمعالج ستختنق فوراً قبل أن يصل الطلب حتى لكود لارافيل.
- لذلك، الحل المعتمد في الأنظمة العالمية (Enterprise SaaS) هو **استراتيجية الدفاع في العمق (Defense-in-Depth) على 3 طبقات**:

---

```
                       [ هجوم 3 مليون ريكويست / ثانية ]
                                     │
                                     ▼
      ┌─────────────────────────────────────────────────────────────┐
      │  الطبقة 1: Edge CDN / Cloudflare Enterprise / Under Attack  │
      │  - امتصاص هجمات L3/L4 (SYN, UDP Floods) حتى تيرا بايت/ث     │
      │  - صد البوتات عبر Managed Challenge / Turnstile            │
      │  - WAF لحجب فاحصات الثغرات ومنع الوصول المباشر للـ Origin IP │
      └──────────────────────────────┬──────────────────────────────┘
                                     │ (الطلبات النظيفة والموثوقة فقط)
                                     ▼
      ┌─────────────────────────────────────────────────────────────┐
      │  الطبقة 2: Nginx Reverse Proxy Hardened Engine              │
      │  - تحديد الاتصالات المتزامنة limit_conn (40 conn/ip)         │
      │  - خنق الطلبات المفرطة limit_req (30r/s مع burst)           │
      │  - إسقاط فوري لطلبات .env, .git, wp-admin بـ HTTP 444      │
      │  - منع هجمات Slowloris والتحكم بأحجام الـ Body             │
      └──────────────────────────────┬──────────────────────────────┘
                                     │
                                     ▼
      ┌─────────────────────────────────────────────────────────────┐
      │  الطبقة 3: Laravel 12 Application Firewall & Redis Cache    │
      │  - FirewallShieldMiddleware: مراقبة الاندفاع (Burst Shield) │
      │  - حظر مؤقت فوري 10 دقائق لأي IP يتجاوز 35 طلب في 3 ثواني   │
      │  - Rate Limiting منفصل للـ Auth, Admin, Financial Endpoints  │
      │  - حماية الهيدرز: CSP, HSTS, X-Frame-Options, XSS           │
      └─────────────────────────────────────────────────────────────┘
```

---

## 2. ما تم تطبيقه في كود المشروع (Laravel 12)

### أ. الـ Firewall Shield الذكي (`app/Http/Middleware/FirewallShieldMiddleware.php`)
1. **Burst Flood Detector:**
   - يراقب عدد الطلبات خلال نافذة زمنية ضيقة جداً (3 ثوانٍ).
   - إذا حاول IP إرسال أكثر من 35 طلباً خلال 3 ثوانٍ، يتم إدراجه في القائمة السوداء المؤقتة (Blacklist) لمدة 10 دقائق بدون استهلاك معالج أو قاعدة بيانات.
2. **Scanner & Exploit Dropper:**
   - يكتشف فوراً محاولات البحث عن ملفات حساسة (`.env`, `.git`, `eval-stdin.php`, `wp-login.php`, `xmlrpc.php`).
   - يقوم بحظر الـ IP مباشرة لمدة ساعة، ويرجع `403 Forbidden` برسالة واضحة.
3. **Payload Bomb Protection:**
   - يمنع إرسال طلبات JSON ضخمة لتعطيل الذاكرة (محدد بـ 2MB كحد أقصى للـ JSON و 12MB للملفات).
4. **Security Headers:**
   - يضيف تلقائياً في كل استجابة:
     - `X-Content-Type-Options: nosniff`
     - `X-Frame-Options: SAMEORIGIN` (منع Clickjacking)
     - `X-XSS-Protection: 1; mode=block`
     - `Strict-Transport-Security: max-age=31536000; includeSubDomains`

### ب. قيود المعدل الدقيقة (Multi-Tier Rate Limiters في `AppServiceProvider.php`)
- **`throttle:api`**: 60 طلب/دقيقة للزوار و 180 طلب/دقيقة للمستخدمين المسجلين.
- **`throttle:auth`**: 6 محاولات تسجيل دخول/دقيقة كحد أقصى لحماية كلمات المرور من التخمين (Brute-Force).
- **`throttle:admin-auth`**: 5 محاولات فقط كل 5 دقائق للوحة تحكم المدير لمنع اختراق الحساب الإداري.
- **`throttle:financial`**: 12 طلب/دقيقة للعمليات المالية الحرجة (سحب، إيداع، تحويل عملات، شراء رصيد) لمنع التلاعب والتكرار (Race Condition).

### ج. دعم السيرفرات الوسيطة (Cloudflare Proxy Support في `bootstrap/app.php`)
- تفعيل `$middleware->trustProxies(at: '*');` حتى يتم قراءة الـ IP الحقيقي للمستخدم من هيدر `CF-Connecting-IP` بدلاً من اعتبار كل الترافيك آتياً من نفس سيرفر Cloudflare.

---

## 3. إعدادات خادم Nginx في الإنتاج (`deployment/nginx/emperor.conf`)

تم تجهيز ملف إعدادات متكامل:
- **تحديد الـ Real IP من شبكة Cloudflare:**
  استخدام قوائم الـ IP الرسمية لـ Cloudflare لضمان قراءة `CF-Connecting-IP`.
- **مناطق الـ Rate Limiting في الذاكرة المشتركة (Shared Memory):**
  ```nginx
  limit_req_zone $binary_remote_addr zone=emperor_api:20m rate=30r/s;
  limit_req_zone $binary_remote_addr zone=emperor_auth:10m rate=5r/m;
  limit_conn_zone $binary_remote_addr zone=emperor_conn:20m;
  ```
- **حماية Slowloris:**
  تقليص `client_body_timeout 10s` و `client_header_timeout 10s`.
- **الإسقاط الصامت بـ 444:**
  أي محاولة لقراءة `.env` أو ملفات النظام لا تستهلك أي موارد من السيرفر ويتم إغلاق الاتصال فوراً (`return 444`).

---

## 4. إعدادات Cloudflare الموصى بها لمواجهة الهجمات الكبرى

1. **تفعيل Cloudflare Proxy (السحابة البرتقالية 🟧):**
   - إخفاء الـ IP الحقيقي للسيرفر (Origin IP) تماماً خلف شبكة Cloudflare Anycast العالمية.
2. **Cloudflare WAF Rate Limiting:**
   - إعداد قاعدة في WAF: إذا أرسل أي IP أكثر من 100 طلب في 10 ثوانٍ، يتم عرض `Managed Challenge` له.
3. **Bot Fight Mode:**
   - تفعيل خيار **Bot Fight Mode** المجاني أو Super Bot Fight Mode في باقة Pro لاكتشاف البوتات الآلية وحظرها قبل وصولها للسيرفر.
4. **Under Attack Mode:**
   - في حال حدوث هجوم هائل مفاجئ (Volumetric DDoS)، بضغطة زر واحدة يتم تفعيل **Under Attack Mode** ليتم فحص واختبار كل زائر بتحدي آلي (JavaScript Challenge) بدون لمس السيرفر.
5. **Origin IP Firewall:**
   - قفل بورت 80 و 443 في الـ Firewall الخاص بسيرفرك (UFW/Security Groups) ليقبل الاتصالات **فقط من عناوين IP الخاصة بـ Cloudflare**. وبذلك أي شخص يحاول مهاجمة السيرفر مباشرة عبر الـ IP يتم رفضه فوراً.

---

## 5. ضبط نظام تشغيل السيرفر (Linux Kernel Sysctl Hardening)

أضف هذه الإعدادات في ملف `/etc/sysctl.conf` على سيرفر الإنتاج لتفادي استهلاك اتصالات الـ TCP:

```ini
# حماية من هجمات SYN Flood
net.ipv4.tcp_syncookies = 1
net.ipv4.tcp_syn_retries = 2
net.ipv4.tcp_synack_retries = 2
net.ipv4.tcp_max_syn_backlog = 8192

# إعادة تدوير اتصالات TIME_WAIT بسرعة
net.ipv4.tcp_fin_timeout = 15
net.ipv4.tcp_tw_reuse = 1

# زيادة الحد الأقصى للملفات المفتوحة
fs.file-max = 2097152
```

ثم تطبيقها بأمر:
```bash
sudo sysctl -p
```
