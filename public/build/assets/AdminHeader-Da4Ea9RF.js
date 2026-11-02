import{u as j,g as y,f as k,r as N,j as e,L as x,R as C}from"./app-CBfmF6zW.js";import{g as z,W as B,M as D,j as S}from"./UserSidebarDrawer-BFJGB6If.js";import{b as E,g as v,M as A,S as L}from"./settingsHelper-BJHSBPL9.js";import{A as M,S as O}from"./shield-DDpB9FmQ.js";function H({title:t,subtitle:R,onRefresh:r,refreshing:d=!1,badge:c="لوحة القيادة الإدارية"}){var p,m;const o=j(),{theme:h,toggleTheme:g}=y(),{user:i}=k(),a=h==="light",[b,s]=N.useState(!1),f=()=>{window.history.length>1?o(-1):o("/admin")},u=E(),l=v(),n=Number(((p=i==null?void 0:i.wallet)==null?void 0:p.balance)||0),w=n%1===0?n.toLocaleString("en-US",{maximumFractionDigits:0}):n.toLocaleString("en-US",{minimumFractionDigits:1,maximumFractionDigits:2}),F=z((i==null?void 0:i.currency)||((m=i==null?void 0:i.wallet)==null?void 0:m.currency)||"EGP");return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
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
            `}),e.jsx("div",{className:"admin-header-wrapper",style:{backgroundColor:a?"rgba(255, 255, 255, 0.96)":"rgba(7, 10, 18, 0.96)",borderBottom:a?"1px solid #E2E8F0":"1px solid rgba(56, 189, 248, 0.2)",boxShadow:a?"0 4px 20px rgba(0, 0, 0, 0.05)":"0 4px 25px rgba(0, 0, 0, 0.6)"},children:e.jsxs("div",{className:"admin-header-inner",children:[e.jsxs("div",{className:"admin-header-right",children:[e.jsxs("button",{onClick:f,title:"رجوع للصفحة السابقة",className:"admin-header-back-btn",style:{backgroundColor:a?"#F1F5F9":"rgba(255, 255, 255, 0.08)",border:a?"1px solid #CBD5E1":"1px solid rgba(255, 255, 255, 0.15)",color:a?"#0F172A":"#FFFFFF"},children:[e.jsx(M,{size:16}),e.jsx("span",{className:"admin-header-back-text",children:"رجوع"})]}),e.jsxs("div",{className:"admin-header-title-wrapper",children:[e.jsxs("span",{className:"admin-header-badge hidden sm:inline-flex",children:[e.jsx(O,{size:11}),e.jsx("span",{children:c})]}),e.jsx("h2",{className:"admin-header-title",style:{color:a?"#0F172A":"#FFFFFF"},title:t,children:t})]})]}),e.jsx(x,{to:"/",className:"admin-header-logo-link hidden md:flex",title:l,children:e.jsx("img",{src:u,alt:l,className:"admin-header-logo-img"})}),e.jsxs("div",{className:"admin-header-left",children:[e.jsxs(x,{to:"/wallet",className:"admin-header-wallet-pill",style:{backgroundColor:a?"#F1F5F9":"#0B1322",border:a?"1px solid #CBD5E1":"1px solid rgba(56, 189, 248, 0.3)"},title:"رصيد المحفظة",children:[e.jsx(B,{size:13,color:"#38BDF8"}),e.jsx("span",{className:"admin-header-balance-val",children:w}),e.jsx("span",{className:"admin-header-balance-curr",children:F})]}),r&&e.jsx("button",{onClick:r,disabled:d,title:"تحديث البيانات",className:"admin-header-action-btn admin-header-refresh-btn",style:{backgroundColor:a?"#F1F5F9":"rgba(255, 255, 255, 0.08)",border:a?"1px solid #CBD5E1":"1px solid rgba(255, 255, 255, 0.12)",color:a?"#64748B":"#E2E8F0"},children:e.jsx(C,{size:14,className:d?"animate-spin":""})}),e.jsx("button",{onClick:g,title:a?"الوضع الليلي":"الوضع النهاري",className:"admin-header-action-btn admin-header-theme-btn",style:{backgroundColor:a?"#F1F5F9":"rgba(255, 255, 255, 0.08)",border:a?"1px solid #CBD5E1":"1px solid rgba(255, 255, 255, 0.12)",color:a?"#D97706":"#FDE047"},children:a?e.jsx(A,{size:14}):e.jsx(L,{size:14})}),e.jsx("button",{onClick:()=>s(!0),title:"قائمة الإدارة والتنقل",className:"admin-header-action-btn admin-header-menu-btn",style:{backgroundColor:a?"#0F172A":"#0B1322",border:"1px solid rgba(56, 189, 248, 0.4)",color:"#38BDF8",boxShadow:"0 0 12px rgba(56, 189, 248, 0.25)"},children:e.jsx(D,{size:16})})]})]})}),e.jsx(S,{isOpen:b,onClose:()=>s(!1)})]})}export{H as A};
