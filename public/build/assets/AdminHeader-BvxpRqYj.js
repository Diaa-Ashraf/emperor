import{u as J,g as K,f as Q,r as s,j as e,L as D,R as X,p as L}from"./app-bu6AuqGl.js";import{g as Z,W as ee,B as ie,M as te,j as ae,p as I}from"./soundHelper-DLXa6_VD.js";import{g as R,a as ne,M as oe,S as re}from"./settingsHelper-Crf2R5af.js";import{A as se,S as de}from"./shield-DbMetyuY.js";const _=new Set;let W=!1;const le=window.localStorage.getItem("adminNotificationSoundEnabled")==="true";function ge({title:y,subtitle:pe,onRefresh:w,refreshing:j=!1,badge:M="لوحة القيادة الإدارية"}){var B,z;const m=J(),{theme:O,toggleTheme:H}=K(),{user:a}=Q(),i=O==="light",[T,k]=s.useState(!1),[h,g]=s.useState(!1),[S,N]=s.useState([]),[d,v]=s.useState(0),[x,$]=s.useState(le),C=s.useRef(null);s.useEffect(()=>{let t=!0,n=!1;const o=async()=>{var c;if(!(n||document.visibilityState!=="visible")){n=!0;try{const p=await L.checkLatest(),b=(c=p==null?void 0:p.data)==null?void 0:c.data;if(!t||!b)return;const F=Array.isArray(b.notifications)?b.notifications:[],A=W?F.filter(r=>r.id&&!_.has(r.id)):[];if(F.forEach(r=>{r.id&&_.add(r.id)}),A.length>0&&(x&&I("default"),document.hidden&&"Notification"in window&&Notification.permission==="granted")){const r=A[0];new Notification(r.title||"إشعار إداري جديد",{body:r.body||"",icon:R()})}W=!0,N(F),v(Number(b.unread_count)||0)}catch{}finally{n=!1}}};o();const u=window.setInterval(o,5e3),l=()=>{document.visibilityState==="visible"&&o()};return window.addEventListener("focus",l),document.addEventListener("visibilitychange",l),()=>{t=!1,window.clearInterval(u),window.removeEventListener("focus",l),document.removeEventListener("visibilitychange",l)}},[a==null?void 0:a.id,x]),s.useEffect(()=>{if(!h)return;const t=n=>{var o;(o=C.current)!=null&&o.contains(n.target)||g(!1)};return document.addEventListener("pointerdown",t),()=>document.removeEventListener("pointerdown",t)},[h]);const U=async t=>{var l;g(!1),!t.is_read&&!t.read_at&&(N(c=>c.map(p=>p.id===t.id?{...p,is_read:!0,read_at:new Date().toISOString()}:p)),v(c=>Math.max(0,c-1)),L.markAsRead(t.id).catch(()=>{}));const n=t.link||"",o=(l=n.match(/^\/admin\/(deposits|orders|targets)(?:\/.*)?$/))==null?void 0:l[1],u=o?`/admin/${o}`:n.startsWith("/")?n:"/notifications";m(u)},P=()=>{I("default"),window.localStorage.setItem("adminNotificationSoundEnabled","true"),$(!0)},q=()=>{window.history.length>1?m(-1):m("/admin")},G=R()||"/images/mohra_sand_logo.png",E=ne(),f=Number(((B=a==null?void 0:a.wallet)==null?void 0:B.balance)||0),V=f%1===0?f.toLocaleString("en-US",{maximumFractionDigits:0}):f.toLocaleString("en-US",{minimumFractionDigits:1,maximumFractionDigits:2}),Y=Z((a==null?void 0:a.currency)||((z=a==null?void 0:a.wallet)==null?void 0:z.currency)||"EGP");return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
                .admin-header-wrapper {
                    position: sticky;
                    top: 0;
                    z-index: 900;
                    backdrop-filter: blur(16px);
                    -webkit-backdrop-filter: blur(16px);
                    transition: background-color 0.2s ease, border-color 0.2s ease;
                    margin-bottom: 20px;
                    width: 100%;
                }
                .admin-header-inner {
                    max-width: 1280px;
                    margin: 0 auto;
                    padding: 10px 16px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 12px;
                    direction: rtl;
                    font-family: 'Cairo', sans-serif;
                    box-sizing: border-box;
                }
                .admin-header-right {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    min-width: 0;
                    flex-shrink: 1;
                }
                .admin-header-back-btn {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    padding: 7px 12px;
                    border-radius: 12px;
                    font-size: 13px;
                    font-weight: 800;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    flex-shrink: 0;
                }
                .admin-header-title-wrapper {
                    min-width: 0;
                    display: flex;
                    flex-direction: column;
                }
                .admin-header-badge {
                    font-size: 11px;
                    font-weight: 800;
                    color: #38BDF8;
                    background-color: rgba(56, 189, 248, 0.12);
                    padding: 1px 7px;
                    border-radius: 6px;
                    border: 1px solid rgba(56, 189, 248, 0.25);
                    display: inline-flex;
                    align-items: center;
                    gap: 4px;
                    width: fit-content;
                }
                .admin-header-title {
                    font-size: 15px;
                    font-weight: 900;
                    margin: 2px 0 0;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .admin-header-logo-link {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    text-decoration: none;
                    flex-shrink: 0;
                }
                .admin-header-logo-img {
                    width: 36px;
                    height: 36px;
                    border-radius: 10px;
                    object-fit: contain;
                    filter: drop-shadow(0 0 8px rgba(56, 189, 248, 0.35));
                }
                .admin-header-left {
                    display: flex;
                    align-items: center;
                    gap: 7px;
                    flex-shrink: 0;
                }
                .admin-header-wallet-pill {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    padding: 6px 10px;
                    border-radius: 11px;
                    text-decoration: none;
                    color: #38BDF8;
                    font-size: 12px;
                    font-weight: 900;
                    white-space: nowrap;
                    transition: all 0.2s ease;
                }
                .admin-header-action-btn {
                    width: 34px;
                    height: 34px;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    flex-shrink: 0;
                    transition: all 0.2s ease;
                }
                @media (max-width: 768px) {
                    .admin-header-inner {
                        padding: 8px 10px !important;
                        gap: 6px !important;
                    }
                    .admin-header-back-text {
                        display: none !important;
                    }
                    .admin-header-back-btn {
                        width: 34px !important;
                        height: 34px !important;
                        padding: 0 !important;
                        justify-content: center !important;
                        border-radius: 10px !important;
                    }
                    .admin-header-badge {
                        display: none !important;
                    }
                    .admin-header-logo-link {
                        display: none !important;
                    }
                    .admin-header-title {
                        font-size: 13.5px !important;
                        max-width: 120px !important;
                    }
                    .admin-header-wallet-pill {
                        padding: 4px 7px !important;
                        font-size: 11px !important;
                        gap: 3px !important;
                    }
                    .admin-header-action-btn {
                        width: 32px !important;
                        height: 32px !important;
                    }
                }
                @media (max-width: 420px) {
                    .admin-header-inner {
                        padding: 6px 8px !important;
                        gap: 4px !important;
                    }
                    .admin-header-title {
                        font-size: 13px !important;
                        max-width: 95px !important;
                    }
                    .admin-header-refresh-btn {
                        display: none !important;
                    }
                    .admin-header-balance-curr {
                        display: none !important;
                    }
                    .admin-header-wallet-pill {
                        padding: 4px 6px !important;
                        font-size: 10.5px !important;
                    }
                    .admin-header-action-btn {
                        width: 30px !important;
                        height: 30px !important;
                    }
                }
            `}),e.jsx("div",{className:"admin-header-wrapper",style:{backgroundColor:i?"rgba(255, 255, 255, 0.96)":"rgba(7, 10, 18, 0.96)",borderBottom:i?"1px solid #E2E8F0":"1px solid rgba(56, 189, 248, 0.2)",boxShadow:i?"0 4px 20px rgba(0, 0, 0, 0.05)":"0 4px 25px rgba(0, 0, 0, 0.6)"},children:e.jsxs("div",{className:"admin-header-inner",children:[e.jsxs("div",{className:"admin-header-right",children:[e.jsxs("button",{onClick:q,title:"رجوع للصفحة السابقة",className:"admin-header-back-btn",style:{backgroundColor:i?"#F1F5F9":"rgba(255, 255, 255, 0.08)",border:i?"1px solid #CBD5E1":"1px solid rgba(255, 255, 255, 0.15)",color:i?"#0F172A":"#FFFFFF"},children:[e.jsx(se,{size:16}),e.jsx("span",{className:"admin-header-back-text",children:"رجوع"})]}),e.jsxs("div",{className:"admin-header-title-wrapper",children:[e.jsxs("span",{className:"admin-header-badge hidden sm:inline-flex",children:[e.jsx(de,{size:11}),e.jsx("span",{children:M})]}),e.jsx("h2",{className:"admin-header-title",style:{color:i?"#0F172A":"#FFFFFF"},title:y,children:y})]})]}),e.jsx(D,{to:"/",className:"admin-header-logo-link hidden md:flex",title:E,children:e.jsx("img",{src:G,alt:E,className:"admin-header-logo-img"})}),e.jsxs("div",{className:"admin-header-left",children:[e.jsxs(D,{to:"/wallet",className:"admin-header-wallet-pill",style:{backgroundColor:i?"#F1F5F9":"#0B1322",border:i?"1px solid #CBD5E1":"1px solid rgba(56, 189, 248, 0.3)"},title:"رصيد المحفظة",children:[e.jsx(ee,{size:13,color:"#38BDF8"}),e.jsx("span",{className:"admin-header-balance-val",children:V}),e.jsx("span",{className:"admin-header-balance-curr",children:Y})]}),e.jsxs("div",{ref:C,style:{position:"relative"},children:[e.jsxs("button",{type:"button",onClick:()=>g(t=>!t),"aria-label":`إشعارات الإدارة${d?`، ${d} غير مقروء`:""}`,"aria-expanded":h,title:"إشعارات الإدارة",className:"admin-header-action-btn",style:{position:"relative",backgroundColor:i?"#F1F5F9":"rgba(255, 255, 255, 0.08)",border:i?"1px solid #CBD5E1":"1px solid rgba(56, 189, 248, 0.3)",color:"#38BDF8"},children:[e.jsx(ie,{size:16}),d>0&&e.jsx("span",{style:{position:"absolute",top:"-6px",right:"-7px",minWidth:"17px",height:"17px",padding:"0 4px",borderRadius:"999px",display:"flex",alignItems:"center",justifyContent:"center",background:"#EF4444",color:"#FFFFFF",border:`2px solid ${i?"#FFFFFF":"#070A12"}`,fontSize:"9px",fontWeight:900,lineHeight:1},children:d>99?"99+":d})]}),h&&e.jsxs("div",{style:{position:"absolute",top:"calc(100% + 10px)",left:0,width:"min(360px, calc(100vw - 24px))",maxHeight:"min(480px, calc(100dvh - 90px))",overflowY:"auto",zIndex:1300,borderRadius:"16px",background:i?"#FFFFFF":"#0B1322",border:i?"1px solid #CBD5E1":"1px solid rgba(56, 189, 248, 0.35)",boxShadow:"0 18px 45px rgba(0,0,0,0.45)",color:i?"#0F172A":"#FFFFFF",direction:"rtl"},children:[e.jsxs("div",{style:{position:"sticky",top:0,zIndex:1,display:"flex",alignItems:"center",justifyContent:"space-between",gap:"8px",padding:"12px 14px",background:i?"#FFFFFF":"#0B1322",borderBottom:i?"1px solid #E2E8F0":"1px solid rgba(148, 163, 184, 0.16)"},children:[e.jsx("strong",{style:{fontSize:"13px",fontWeight:900},children:"إشعارات الإدارة"}),e.jsxs("span",{style:{fontSize:"11px",color:d?"#EF4444":"#94A3B8",fontWeight:800},children:[d," غير مقروء"]})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",gap:"8px",padding:"8px 14px",borderBottom:i?"1px solid #E2E8F0":"1px solid rgba(148, 163, 184, 0.1)"},children:[e.jsx("span",{style:{fontSize:"11px",color:"#94A3B8"},children:"تنبيه صوتي عند وصول جديد"}),e.jsx("button",{type:"button",onClick:P,style:{border:"1px solid rgba(34, 197, 94, 0.35)",borderRadius:"8px",padding:"5px 9px",background:x?"rgba(34, 197, 94, 0.12)":"transparent",color:x?"#22C55E":"#38BDF8",fontSize:"10px",fontWeight:900,cursor:"pointer",fontFamily:"Cairo, sans-serif"},children:x?"الصوت مفعّل":"تفعيل الصوت"})]}),S.length===0?e.jsx("div",{style:{padding:"24px 16px",textAlign:"center",fontSize:"12px",color:"#94A3B8"},children:"لا توجد إشعارات جديدة حالياً"}):S.slice(0,8).map(t=>e.jsxs("button",{type:"button",onClick:()=>U(t),style:{width:"100%",display:"block",padding:"12px 14px",textAlign:"right",background:t.is_read?"transparent":i?"#F8FAFC":"rgba(56, 189, 248, 0.07)",border:"none",borderBottom:i?"1px solid #E2E8F0":"1px solid rgba(148, 163, 184, 0.1)",color:i?"#0F172A":"#FFFFFF",cursor:"pointer",fontFamily:"Cairo, sans-serif"},children:[e.jsxs("span",{style:{display:"flex",justifyContent:"space-between",gap:"8px",alignItems:"flex-start"},children:[e.jsx("strong",{style:{fontSize:"12px",lineHeight:1.5},children:t.title||"إشعار إداري جديد"}),!t.is_read&&e.jsx("span",{style:{width:"7px",height:"7px",borderRadius:"50%",background:"#38BDF8",flexShrink:0,marginTop:"5px"}})]}),t.body&&e.jsx("span",{style:{display:"block",marginTop:"4px",fontSize:"11px",color:"#94A3B8",lineHeight:1.6},children:t.body}),t.time_ago&&e.jsx("span",{style:{display:"block",marginTop:"5px",fontSize:"10px",color:"#64748B"},children:t.time_ago})]},t.id)),e.jsx("button",{type:"button",onClick:()=>{g(!1),m("/notifications")},style:{width:"100%",padding:"11px",border:"none",background:"transparent",color:"#38BDF8",fontSize:"11px",fontWeight:900,cursor:"pointer",fontFamily:"Cairo, sans-serif"},children:"فتح مركز الإشعارات"})]})]}),w&&e.jsx("button",{onClick:w,disabled:j,title:"تحديث البيانات",className:"admin-header-action-btn admin-header-refresh-btn",style:{backgroundColor:i?"#F1F5F9":"rgba(255, 255, 255, 0.08)",border:i?"1px solid #CBD5E1":"1px solid rgba(255, 255, 255, 0.12)",color:i?"#64748B":"#E2E8F0"},children:e.jsx(X,{size:14,className:j?"animate-spin":""})}),e.jsx("button",{onClick:H,title:i?"الوضع الليلي":"الوضع النهاري",className:"admin-header-action-btn admin-header-theme-btn",style:{backgroundColor:i?"#F1F5F9":"rgba(255, 255, 255, 0.08)",border:i?"1px solid #CBD5E1":"1px solid rgba(255, 255, 255, 0.12)",color:i?"#D97706":"#FDE047"},children:i?e.jsx(oe,{size:14}):e.jsx(re,{size:14})}),e.jsx("button",{onClick:()=>k(!0),title:"قائمة الإدارة والتنقل",className:"admin-header-action-btn admin-header-menu-btn",style:{backgroundColor:i?"#0F172A":"#0B1322",border:"1px solid rgba(56, 189, 248, 0.4)",color:"#38BDF8",boxShadow:"0 0 12px rgba(56, 189, 248, 0.25)"},children:e.jsx(te,{size:16})})]})]})}),e.jsx(ae,{isOpen:T,onClose:()=>k(!1)})]})}export{ge as A};
