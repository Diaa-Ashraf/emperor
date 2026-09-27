# دليل نشر منصة إمبراطور على خوادم الإنتاج (Production Deployment Manual)

مرحباً بك في دليل النشر والتشغيل الرسمي لمنصة **Emperor (إمبراطور)** المبنية بأحدث تقنيات Laravel 12 + Filament v5 + React SPA.

---

## 1. متطلبات الخادم (Server Prerequisites)
- **نظام التشغيل:** Ubuntu 24.04 LTS / Debian 12
- **المعالج والذاكرة:** 2 Cores CPU / 4GB RAM كحد أدنى (يفضل 4 Cores / 8GB RAM لأكثر من 50,000 عملية يومياً)
- **حزم البرمجيات المطلوبة:**
  - `PHP 8.3` أو `PHP 8.4` مع الامتدادات التالية:
    `php8.3-fpm`, `php8.3-mysql`, `php8.3-redis`, `php8.3-mbstring`, `php8.3-xml`, `php8.3-curl`, `php8.3-zip`, `php8.3-bcmath`, `php8.3-gd`, `php8.3-intl`
  - `Nginx` (أحدث إصدار مستقر مع دعم HTTP/2 و SSL)
  - `MySQL 8.0` أو `MariaDB 10.11+`
  - `Redis Server` (للـ Sessions, Cache, والـ Queue Jobs)
  - `Supervisor` (لإدارة مهام الطوابير وخادم WebSockets)
  - `Composer 2.7+` & `Node.js 20+ LTS` مع `npm`

---

## 2. خطوات التثبيت والإعداد خطوة بخطوة

### الخطوة 1: استنساخ المشروع وضبط الصلاحيات
```bash
cd /var/www
git clone https://github.com/your-org/emperor.git emperor
cd emperor

# ضبط ملكية وصلاحيات المجلدات
sudo chown -R www-data:www-data /var/www/emperor
sudo chmod -R 775 /var/www/emperor/storage /var/www/emperor/bootstrap/cache
```

### الخطوة 2: تثبيت حزم PHP و Node.js
```bash
# تثبيت حزم الباك إند بدون حزم التطوير مع تحسين الأوتولود
composer install --no-dev --optimize-autoloader

# تثبيت وبناء حزم الفرونت إند
npm ci
npm run build
```

### الخطوة 3: إعداد ملف البيئة `.env`
```bash
cp .env.production.example .env

# توليد مفتاح التشفير الفريد
php artisan key:generate

# تحرير الملف وضبط بيانات قاعدة البيانات ومفاتيح الـ APIs
nano .env
```

### الخطوة 4: ترحيل قاعدة البيانات وتشغيل البيانات الأولية
```bash
# ترحيل الجداول والفهارس
php artisan migrate --force

# تشغيل السيدرز الأساسية (الحسابات الإدارية، الأدوار والصلاحيات، بوابات الدفع، وإعدادات المنصة)
php artisan db:seed --class=RolesAndPermissionsSeeder --force
php artisan db:seed --class=AdminUserSeeder --force
php artisan db:seed --class=PaymentMethodSeeder --force
php artisan db:seed --class=SettingSeeder --force

# ربط مجلد التخزين العام
php artisan storage:link
```

### الخطوة 5: تحسين أداء الكاش لـ Laravel
```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache
```

---

## 3. إعداد خادم Nginx وشهادة SSL المجانية

```bash
# نسخ إعدادات Nginx
sudo cp deployment/nginx/emperor.conf /etc/nginx/sites-available/emperor.conf
sudo ln -s /etc/nginx/sites-available/emperor.conf /etc/nginx/sites-enabled/

# اختبار الإعدادات وإعادة تشغيل Nginx
sudo nginx -t
sudo systemctl reload nginx

# تثبيت شهادة SSL مجانية من Let's Encrypt
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d emperor.vip -d www.emperor.vip
```

---

## 4. إعداد Supervisor (Queue Worker & Reverb WebSockets)

```bash
sudo cp deployment/supervisor/emperor-worker.conf /etc/supervisor/conf.d/emperor-worker.conf

# تحديث وتشغيل العمليات
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl start all

# التحقق من الحالة
sudo supervisorctl status
```

---

## 5. إعداد المهام المجدولة (Cron Scheduler & Backups)

```bash
sudo crontab -u www-data -e
```
أضف السطور التالية:
```cron
* * * * * cd /var/www/emperor && php artisan schedule:run >> /dev/null 2>&1
0 3 * * * /var/www/emperor/deployment/scripts/backup.sh >> /var/www/emperor/storage/logs/backup.log 2>&1
```

---

## 6. أوامر الصيانة والتحديث اليومي السريع (Quick Deploy Script)

عند الرغبة في نشر تحديث جديد للكود:
```bash
cd /var/www/emperor
git pull origin main
composer install --no-dev --optimize-autoloader
npm ci && npm run build
php artisan migrate --force
php artisan optimize
sudo supervisorctl restart emperor-queue-worker:*
```
