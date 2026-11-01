import{c as dn,j as o,h as xt,f as un,r as m,R as Ge,q as er,s as ye,C as ht,a as tr,g as nr,i as rr,m as ir,L as Ce}from"./app-C4TxSEQj.js";import{_ as q,g as we,a as hn,b as pn,c as sr,d as or,q as ke,E as _t,e as pt,i as wt,p as ar,f as cr,h as lr,D as dr,j as ur,F as bt,L as hr,k as fn,S as je,l as O,m as pr,n as fr,o as gr,r as mr,s as Ot,t as jt,u as Dt,v as yr,w as Lt,x as xr,C as _r,M as wr}from"./MainLayout-COtXdzMh.js";import{I as oe,E as We}from"./Input--aPhQAhm.js";import{B as F}from"./Button-SGc0T9h_.js";import{M as gn}from"./Modal-C-B4F9oE.js";import{S as mn}from"./smartphone-DwuOPlOI.js";import{S as br}from"./shield-check-DYPrqkRV.js";import{Q as Ir}from"./qr-code-BgkuGbVo.js";import{C as ft}from"./check-CFZADbpj.js";import{a as gt}from"./headphones-CoSI8soG.js";import{E as Be}from"./eye-woWqBKFA.js";import{M as vr}from"./mail-fyuSTEqH.js";import{E as Er}from"./external-link-BDImru99.js";import{g as Sr,d as Tr,U as kr,h as Cr}from"./UserSidebarDrawer-DGojyaim.js";import{U as Pr}from"./user-Cfhtvwu3.js";import{S as Mt}from"./shield-CjCm0Vmv.js";import{L as Ar}from"./lock-g16nbs66.js";import"./index-BCn5QfZZ.js";import"./settingsHelper-CfNzzGLK.js";import"./phone-Dt5vZry_.js";import"./trending-up-fA1vTo84.js";import"./dollar-sign-ptY-E5Fo.js";/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yn={name:"camera",size:24,node:[["path",{d:"M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z",key:"18u6gg"}],["circle",{cx:"12",cy:"13",r:"3",key:"1vg3eu"}]]};yn.node;const Rr=dn(yn);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xn={name:"download",size:24,node:[["path",{d:"M12 15V3",key:"m9g1x1"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["path",{d:"m7 10 5 5 5-5",key:"brsn70"}]]};xn.node;const Fr=dn(xn);function Ut({label:n,error:e,helperText:t,options:r=[],className:i="",style:s={},containerStyle:a={},...l}){return o.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"6px",marginBottom:"16px",...a},children:[n&&o.jsx("label",{style:{fontSize:"14px",fontWeight:"600",color:"#E2E8F0"},children:n}),o.jsx("select",{style:{width:"100%",padding:"10px 14px",background:"#121218",border:e?"1px solid #EF4444":"1px solid rgba(255, 255, 255, 0.12)",borderRadius:"10px",color:"#FFFFFF",fontSize:"15px",outline:"none",fontFamily:"Cairo, sans-serif",cursor:"pointer",transition:"border-color 0.2s",...s},onFocus:c=>{e||(c.target.style.borderColor="#D4A537")},onBlur:c=>{e||(c.target.style.borderColor="rgba(255, 255, 255, 0.12)")},className:i,...l,children:r.map((c,d)=>{const p=typeof c=="object"?c.value:c,f=typeof c=="object"?c.label:c;return o.jsx("option",{value:p,style:{background:"#181820",color:"#FFF"},children:f},d)})}),e&&o.jsx("span",{style:{fontSize:"12px",color:"#EF4444",fontWeight:"600"},children:Array.isArray(e)?e[0]:e}),t&&!e&&o.jsx("span",{style:{fontSize:"12px",color:"#8E8E98"},children:t})]})}function _n(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Nr=_n,wn=new _t("auth","Firebase",_n());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Je=new hr("@firebase/auth");function Ve(n,...e){Je.logLevel<=fn.WARN&&Je.warn(`Auth (${je}): ${n}`,...e)}function He(n,...e){Je.logLevel<=fn.ERROR&&Je.error(`Auth (${je}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function te(n,...e){throw vt(n,...e)}function N(n,...e){return vt(n,...e)}function It(n,e,t){const r={...Nr(),[e]:t};return new _t("auth","Firebase",r).create(e,{appName:n.name})}function ue(n){return It(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function vt(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return wn.create(n,...e)}function u(n,e,...t){if(!n)throw vt(e,...t)}function Z(n){const e="INTERNAL ASSERTION FAILED: "+n;throw He(e),new Error(e)}function ne(n,e){n||Z(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mt(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.href)||""}function bn(){return zt()==="http:"||zt()==="https:"}function zt(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Or(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(bn()||ur()||"connection"in navigator)?navigator.onLine:!0}function jr(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class De{constructor(e,t){this.shortDelay=e,this.longDelay=t,ne(t>e,"Short delay should be less than long delay!"),this.isMobile=cr()||lr()}get(){return Or()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Et(n,e){ne(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class In{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Z("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Z("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Z("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dr={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lr=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],Mr=new De(3e4,6e4);function $(n,e){return n.tenantId&&!e.tenantId?{...e,tenantId:n.tenantId}:e}async function M(n,e,t,r,i={}){return vn(n,i,async()=>{let s={},a={};r&&(e==="GET"?a=r:s={body:JSON.stringify(r)});const l=ke({...a,key:n.config.apiKey}).slice(1),c=await n._getAdditionalHeaders();c["Content-Type"]="application/json",n.languageCode&&(c["X-Firebase-Locale"]=n.languageCode);const d={method:e,headers:c,...s};return mr()||(d.referrerPolicy="strict-origin-when-cross-origin"),n.emulatorConfig&&wt(n.emulatorConfig.host)&&(d.credentials="include"),In.fetch()(await En(n,n.config.apiHost,t,l),d)})}async function vn(n,e,t){n._canInitEmulator=!1;const r={...Dr,...e};try{const i=new zr(n),s=await Promise.race([t(),i.promise]);i.clearNetworkTimeout();const a=await s.json();if("needConfirmation"in a)throw Pe(n,"account-exists-with-different-credential",a);if(s.ok&&!("errorMessage"in a))return a;{const l=s.ok?a.errorMessage:a.error.message,[c,d]=l.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw Pe(n,"credential-already-in-use",a);if(c==="EMAIL_EXISTS")throw Pe(n,"email-already-in-use",a);if(c==="USER_DISABLED")throw Pe(n,"user-disabled",a);const p=r[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(d)throw It(n,p,d);te(n,p)}}catch(i){if(i instanceof bt)throw i;te(n,"network-request-failed",{message:String(i)})}}async function tt(n,e,t,r,i={}){const s=await M(n,e,t,r,i);return"mfaPendingCredential"in s&&te(n,"multi-factor-auth-required",{_serverResponse:s}),s}async function En(n,e,t,r){const i=`${e}${t}?${r}`,s=n,a=s.config.emulator?Et(n.config,i):`${n.config.apiScheme}://${i}`;return Lr.includes(t)&&(await s._persistenceManagerAvailable,s._getPersistenceType()==="COOKIE")?s._getPersistence()._getFinalTarget(a).toString():a}function Ur(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class zr{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(N(this.auth,"network-request-failed")),Mr.get())})}}function Pe(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const i=N(n,e,r);return i.customData._tokenResponse=t,i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wt(n){return n!==void 0&&n.getResponse!==void 0}function Bt(n){return n!==void 0&&n.enterprise!==void 0}class Sn{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return Ur(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Wr(n){return(await M(n,"GET","/v1/recaptchaParams")).recaptchaSiteKey||""}async function Tn(n,e){return M(n,"GET","/v2/recaptchaConfig",$(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Br(n,e){return M(n,"POST","/v1/accounts:delete",e)}async function Xe(n,e){return M(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ae(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Vr(n,e=!1){const t=we(n),r=await t.getIdToken(e),i=St(r);u(i&&i.exp&&i.auth_time&&i.iat,t.auth,"internal-error");const s=typeof i.firebase=="object"?i.firebase:void 0,a=s==null?void 0:s.sign_in_provider;return{claims:i,token:r,authTime:Ae(ot(i.auth_time)),issuedAtTime:Ae(ot(i.iat)),expirationTime:Ae(ot(i.exp)),signInProvider:a||null,signInSecondFactor:(s==null?void 0:s.sign_in_second_factor)||null}}function ot(n){return Number(n)*1e3}function St(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return He("JWT malformed, contained fewer than 3 sections"),null;try{const i=gr(t);return i?JSON.parse(i):(He("Failed to decode base64 JWT payload"),null)}catch(i){return He("Caught error parsing JWT payload as JSON",i==null?void 0:i.toString()),null}}function Vt(n){const e=St(n);return u(e,"internal-error"),u(typeof e.exp<"u","internal-error"),u(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Oe(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof bt&&Hr(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function Hr({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qr{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const r=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yt{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Ae(this.lastLoginAt),this.creationTime=Ae(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ye(n){var f;const e=n.auth,t=await n.getIdToken(),r=await Oe(n,Xe(e,{idToken:t}));u(r==null?void 0:r.users.length,e,"internal-error");const i=r.users[0];n._notifyReloadListener(i);const s=(f=i.providerUserInfo)!=null&&f.length?kn(i.providerUserInfo):[],a=Kr(n.providerData,s),l=n.isAnonymous,c=!(n.email&&i.passwordHash)&&!(a!=null&&a.length),d=l?c:!1,p={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:a,metadata:new yt(i.createdAt,i.lastLoginAt),isAnonymous:d};Object.assign(n,p)}async function $r(n){const e=we(n);await Ye(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function Kr(n,e){return[...n.filter(r=>!e.some(i=>i.providerId===r.providerId)),...e]}function kn(n){return n.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Gr(n,e){const t=await vn(n,{},async()=>{const r=ke({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:s}=n.config,a=await En(n,i,"/v1/token",`key=${s}`),l=await n._getAdditionalHeaders();l["Content-Type"]="application/x-www-form-urlencoded";const c={method:"POST",headers:l,body:r};return n.emulatorConfig&&wt(n.emulatorConfig.host)&&(c.credentials="include"),In.fetch()(a,c)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function Jr(n,e){return M(n,"POST","/v2/accounts:revokeToken",$(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ee{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){u(e.idToken,"internal-error"),u(typeof e.idToken<"u","internal-error"),u(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Vt(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){u(e.length!==0,"internal-error");const t=Vt(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(u(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:i,expiresIn:s}=await Gr(e,t);this.updateTokensAndExpiration(r,i,Number(s))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:i,expirationTime:s}=t,a=new Ee;return r&&(u(typeof r=="string","internal-error",{appName:e}),a.refreshToken=r),i&&(u(typeof i=="string","internal-error",{appName:e}),a.accessToken=i),s&&(u(typeof s=="number","internal-error",{appName:e}),a.expirationTime=s),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Ee,this.toJSON())}_performRefresh(){return Z("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function se(n,e){u(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class L{constructor({uid:e,auth:t,stsTokenManager:r,...i}){this.providerId="firebase",this.proactiveRefresh=new qr(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new yt(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const t=await Oe(this,this.stsTokenManager.getToken(this.auth,e));return u(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return Vr(this,e)}reload(){return $r(this)}_assign(e){this!==e&&(u(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new L({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){u(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await Ye(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(q(this.auth.app))return Promise.reject(ue(this.auth));const e=await this.getIdToken();return await Oe(this,Br(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const r=t.displayName??void 0,i=t.email??void 0,s=t.phoneNumber??void 0,a=t.photoURL??void 0,l=t.tenantId??void 0,c=t._redirectEventId??void 0,d=t.createdAt??void 0,p=t.lastLoginAt??void 0,{uid:f,emailVerified:b,isAnonymous:R,providerData:T,stsTokenManager:k}=t;u(f&&k,e,"internal-error");const K=Ee.fromJSON(this.name,k);u(typeof f=="string",e,"internal-error"),se(r,e.name),se(i,e.name),u(typeof b=="boolean",e,"internal-error"),u(typeof R=="boolean",e,"internal-error"),se(s,e.name),se(a,e.name),se(l,e.name),se(c,e.name),se(d,e.name),se(p,e.name);const U=new L({uid:f,auth:e,email:i,emailVerified:b,displayName:r,isAnonymous:R,photoURL:a,phoneNumber:s,tenantId:l,stsTokenManager:K,createdAt:d,lastLoginAt:p});return T&&Array.isArray(T)&&(U.providerData=T.map(z=>({...z}))),c&&(U._redirectEventId=c),U}static async _fromIdTokenResponse(e,t,r=!1){const i=new Ee;i.updateFromServerResponse(t);const s=new L({uid:t.localId,auth:e,stsTokenManager:i,isAnonymous:r});return await Ye(s),s}static async _fromGetAccountInfoResponse(e,t,r){const i=t.users[0];u(i.localId!==void 0,"internal-error");const s=i.providerUserInfo!==void 0?kn(i.providerUserInfo):[],a=!(i.email&&i.passwordHash)&&!(s!=null&&s.length),l=new Ee;l.updateFromIdToken(r);const c=new L({uid:i.localId,auth:e,stsTokenManager:l,isAnonymous:a}),d={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:s,metadata:new yt(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!(s!=null&&s.length)};return Object.assign(c,d),c}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ht=new Map;function ee(n){ne(n instanceof Function,"Expected a class definition");let e=Ht.get(n);return e?(ne(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,Ht.set(n,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cn{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Cn.type="NONE";const qt=Cn;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qe(n,e,t){return`firebase:${n}:${e}:${t}`}class xe{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:i,name:s}=this.auth;this.fullUserKey=qe(this.userKey,i.apiKey,s),this.fullPersistenceKey=qe("persistence",i.apiKey,s),this.boundEventHandler=t._onStorageEvent.bind(t);try{this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}catch{}}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await Xe(this.auth,{idToken:e}).catch(()=>{});return t?L._fromGetAccountInfoResponse(this.auth,t,e):null}return L._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){try{this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}catch{}}static async create(e,t,r="authUser"){if(!t.length)return new xe(ee(qt),e,r);const i=(await Promise.all(t.map(async d=>{try{if(await d._isAvailable())return d}catch{return}}))).filter(d=>d);let s=i[0]||ee(qt);const a=qe(r,e.config.apiKey,e.name);let l=null;for(const d of t)try{const p=await d._get(a);if(p){let f;if(typeof p=="string"){const b=await Xe(e,{idToken:p}).catch(()=>{});if(!b)break;f=await L._fromGetAccountInfoResponse(e,b,p)}else f=L._fromJSON(e,p);d!==s&&(l=f),s=d;break}}catch{}const c=i.filter(d=>d._shouldAllowMigration);return!s._shouldAllowMigration||!c.length?new xe(s,e,r):(s=c[0],l&&await s._set(a,l.toJSON()),await Promise.all(t.map(async d=>{if(d!==s)try{await d._remove(a)}catch{}})),new xe(s,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $t(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Fn(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Pn(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(On(e))return"Blackberry";if(jn(e))return"Webos";if(An(e))return"Safari";if((e.includes("chrome/")||Rn(e))&&!e.includes("edge/"))return"Chrome";if(Nn(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function Pn(n=O()){return/firefox\//i.test(n)}function An(n=O()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Rn(n=O()){return/crios\//i.test(n)}function Fn(n=O()){return/iemobile/i.test(n)}function Nn(n=O()){return/android/i.test(n)}function On(n=O()){return/blackberry/i.test(n)}function jn(n=O()){return/webos/i.test(n)}function Tt(n=O()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function Xr(n=O()){var e;return Tt(n)&&!!((e=window.navigator)!=null&&e.standalone)}function Yr(){return pr()&&document.documentMode===10}function Dn(n=O()){return Tt(n)||Nn(n)||jn(n)||On(n)||/windows phone/i.test(n)||Fn(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ln(n,e=[]){let t;switch(n){case"Browser":t=$t(O());break;case"Worker":t=`${$t(O())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${je}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qr{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=s=>new Promise((a,l)=>{try{const c=e(s);a(c)}catch(c){l(c)}});r.onAbort=t,this.queue.push(r);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const i of t)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Zr(n,e={}){return M(n,"GET","/v2/passwordPolicy",$(n,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ei=6;class ti{constructor(e){var r;const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??ei,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((r=e.allowedNonAlphanumericCharacters)==null?void 0:r.join(""))??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),i&&(t.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let i=0;i<e.length;i++)r=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,i,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ni{constructor(e,t,r,i){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Kt(this),this.idTokenSubscription=new Kt(this),this.beforeStateQueue=new Qr(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=wn,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion,this._persistenceManagerAvailable=new Promise(s=>this._resolvePersistenceManagerAvailable=s)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=ee(t)),this._initializationPromise=this.queue(async()=>{var r,i,s;if(!this._deleted){try{this.persistenceManager=await xe.create(this,e)}catch(a){Ve(`Failed to initialize persistence: ${a}`),this.persistenceManager=await xe.create(this,[])}finally{(r=this._resolvePersistenceManagerAvailable)==null||r.call(this)}if(!this._deleted){if((i=this._popupRedirectResolver)!=null&&i._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}try{await this.initializeCurrentUser(t)}catch(a){Ve(`Failed to initialize current user: ${a}`),await this.directlySetCurrentUser(null).catch(()=>{})}this.lastNotifiedUid=((s=this.currentUser)==null?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Xe(this,{idToken:e}),r=await L._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var s;if(q(this.app)){const a=this.app.settings.authIdToken;return a?new Promise(l=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(a).then(l,l))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let r=t,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const a=(s=this.redirectUser)==null?void 0:s._redirectEventId,l=r==null?void 0:r._redirectEventId,c=await this.tryRedirectSignIn(e);(!a||a===l)&&(c!=null&&c.user)&&(r=c.user,i=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(r)}catch(a){r=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(a))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return u(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Ye(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=jr()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(q(this.app))return Promise.reject(ue(this));const t=e?we(e):null;return t&&u(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&u(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return q(this.app)?Promise.reject(ue(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return q(this.app)?Promise.reject(ue(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(ee(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await Zr(this),t=new ti(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new _t("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await Jr(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)==null?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&ee(e)||this._popupRedirectResolver;u(t,this,"argument-error"),this.redirectPersistenceManager=await xe.create(this,[ee(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)==null?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)==null?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=((t=this.currentUser)==null?void 0:t.uid)??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,i){if(this._deleted)return()=>{};const s=typeof t=="function"?t:t.next.bind(t);let a=!1;const l=this._isInitialized?Promise.resolve():this._initializationPromise;if(u(l,this,"internal-error"),l.then(()=>{a||s(this.currentUser)}).catch(c=>{if(!a)if(typeof t!="function"&&t.error)t.error(c);else if(r)r(c);else throw c}),typeof t=="function"){const c=e.addObserver(t,r,i);return()=>{a=!0,c()}}else{const c=e.addObserver(t);return()=>{a=!0,c()}}}async directlySetCurrentUser(e){if(this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,this.persistenceManager)try{e?await this.persistenceManager.setCurrentUser(e):await this.persistenceManager.removeCurrentUser()}catch(t){const r=(t==null?void 0:t.message)||String(t),i=It(this,"internal-error",`An internal AuthError has occurred: ${r}`);throw i.customData={originalError:t},i}}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return u(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Ln(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var i;const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await((i=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:i.getHeartbeatsHeader());t&&(e["X-Firebase-Client"]=t);const r=await this._getAppCheckToken();return r&&(e["X-Firebase-AppCheck"]=r),e}async _getAppCheckToken(){var t;if(q(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await((t=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:t.getToken());return e!=null&&e.error&&Ve(`Error while retrieving App Check token: ${e.error}`),e==null?void 0:e.token}}function he(n){return we(n)}class Kt{constructor(e){this.auth=e,this.observer=null,this.addObserver=yr(t=>this.observer=t)}get next(){return u(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Le={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function ri(n){Le=n}function kt(n){return Le.loadJS(n)}function ii(){return Le.recaptchaV2Script}function si(){return Le.recaptchaEnterpriseScript}function oi(){return Le.gapiScript}function Mn(n){return`__${n}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ai=500,ci=6e4,ze=1e12;class li{constructor(e){this.auth=e,this.counter=ze,this._widgets=new Map}render(e,t){const r=this.counter;return this._widgets.set(r,new hi(e,this.auth.name,t||{})),this.counter++,r}reset(e){var r;const t=e||ze;(r=this._widgets.get(t))==null||r.delete(),this._widgets.delete(t)}getResponse(e){var r;const t=e||ze;return((r=this._widgets.get(t))==null?void 0:r.getResponse())||""}async execute(e){var r;const t=e||ze;return(r=this._widgets.get(t))==null||r.execute(),""}}class di{constructor(){this.enterprise=new ui}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class ui{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class hi{constructor(e,t,r){this.params=r,this.timerId=null,this.deleted=!1,this.responseToken=null,this.clickHandler=()=>{this.execute()};const i=typeof e=="string"?document.getElementById(e):e;u(i,"argument-error",{appName:t}),this.container=i,this.isVisible=this.params.size!=="invisible",this.isVisible?this.execute():this.container.addEventListener("click",this.clickHandler)}getResponse(){return this.checkIfDeleted(),this.responseToken}delete(){this.checkIfDeleted(),this.deleted=!0,this.timerId&&(clearTimeout(this.timerId),this.timerId=null),this.container.removeEventListener("click",this.clickHandler)}execute(){this.checkIfDeleted(),!this.timerId&&(this.timerId=window.setTimeout(()=>{this.responseToken=pi(50);const{callback:e,"expired-callback":t}=this.params;if(e)try{e(this.responseToken)}catch{}this.timerId=window.setTimeout(()=>{if(this.timerId=null,this.responseToken=null,t)try{t()}catch{}this.isVisible&&this.execute()},ci)},ai))}checkIfDeleted(){if(this.deleted)throw new Error("reCAPTCHA mock was already deleted!")}}function pi(n){const e=[],t="1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";for(let r=0;r<n;r++)e.push(t.charAt(Math.floor(Math.random()*t.length)));return e.join("")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fi="recaptcha-enterprise",Re="NO_RECAPTCHA",Gt="onFirebaseAuthREInstanceReady";class Q{constructor(e){this.type=fi,this.auth=he(e)}async verify(e="verify",t=!1){async function r(s){if(!t){if(s.tenantId==null&&s._agentRecaptchaConfig!=null)return s._agentRecaptchaConfig.siteKey;if(s.tenantId!=null&&s._tenantRecaptchaConfigs[s.tenantId]!==void 0)return s._tenantRecaptchaConfigs[s.tenantId].siteKey}return new Promise(async(a,l)=>{Tn(s,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(c=>{if(c.recaptchaKey===void 0)l(new Error("recaptcha Enterprise site key undefined"));else{const d=new Sn(c);return s.tenantId==null?s._agentRecaptchaConfig=d:s._tenantRecaptchaConfigs[s.tenantId]=d,a(d.siteKey)}}).catch(c=>{l(c)})})}function i(s,a,l){const c=window.grecaptcha;Bt(c)?c.enterprise.ready(()=>{c.enterprise.execute(s,{action:e}).then(d=>{a(d)}).catch(()=>{a(Re)})}):l(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new di().execute("siteKey",{action:"verify"}):new Promise((s,a)=>{r(this.auth).then(async l=>{if(!t&&Bt(window.grecaptcha)&&Q.scriptInjectionDeferred)await Q.scriptInjectionDeferred.promise,i(l,s,a);else{if(typeof window>"u"){a(new Error("RecaptchaVerifier is only supported in browser"));return}let c=si();c.length!==0&&(c+=l+`&onload=${Gt}`),Q.scriptInjectionDeferred=new dr,window[Gt]=()=>{var d;(d=Q.scriptInjectionDeferred)==null||d.resolve()},kt(c).then(()=>{var d;return(d=Q.scriptInjectionDeferred)==null?void 0:d.promise}).then(()=>{i(l,s,a)}).catch(d=>{a(d)})}}).catch(l=>{a(l)})})}}Q.scriptInjectionDeferred=null;async function at(n,e,t,r=!1,i=!1){const s=new Q(n);let a;if(i)a=Re;else try{a=await s.verify(t)}catch{a=await s.verify(t,!0)}const l={...e};if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in l){const c=l.phoneEnrollmentInfo.phoneNumber,d=l.phoneEnrollmentInfo.recaptchaToken;Object.assign(l,{phoneEnrollmentInfo:{phoneNumber:c,recaptchaToken:d,captchaResponse:a,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in l){const c=l.phoneSignInInfo.recaptchaToken;Object.assign(l,{phoneSignInInfo:{recaptchaToken:c,captchaResponse:a,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return l}return r?Object.assign(l,{captchaResp:a}):Object.assign(l,{captchaResponse:a}),Object.assign(l,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(l,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),l}async function ct(n,e,t,r,i){var s;if((s=n._getRecaptchaConfig())!=null&&s.isProviderEnabled("PHONE_PROVIDER")){const a=await at(n,e,t);return r(n,a).catch(async l=>{var c;if(((c=n._getRecaptchaConfig())==null?void 0:c.getProviderEnforcementState("PHONE_PROVIDER"))==="AUDIT"&&(l.code==="auth/missing-recaptcha-token"||l.code==="auth/invalid-app-credential")){console.log(`Failed to verify with reCAPTCHA Enterprise. Automatically triggering the reCAPTCHA v2 flow to complete the ${t} flow.`);const d=await at(n,e,t,!1,!0);return r(n,d)}return Promise.reject(l)})}else{const a=await at(n,e,t,!1,!0);return r(n,a)}}async function gi(n){const e=he(n),t=await Tn(e,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}),r=new Sn(t);e.tenantId==null?e._agentRecaptchaConfig=r:e._tenantRecaptchaConfigs[e.tenantId]=r,r.isAnyProviderEnabled()&&new Q(e).verify()}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mi(n,e){const t=hn(n,"auth");if(t.isInitialized()){const i=t.getImmediate(),s=t.getOptions();if(pt(s,e??{}))return i;te(i,"already-initialized")}return t.initialize({options:e})}function yi(n,e){const t=(e==null?void 0:e.persistence)||[],r=(Array.isArray(t)?t:[t]).map(ee);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function xi(n,e,t){const r=he(n);u(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const i=!1,s=Un(e),{host:a,port:l}=_i(e),c=l===null?"":`:${l}`,d={url:`${s}//${a}${c}/`},p=Object.freeze({host:a,port:l,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:i})});if(!r._canInitEmulator){u(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),u(pt(d,r.config.emulator)&&pt(p,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=d,r.emulatorConfig=p,r.settings.appVerificationDisabledForTesting=!0,wt(a)?ar(`${s}//${a}${c}`):wi()}function Un(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function _i(n){const e=Un(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){const s=i[1];return{host:s,port:Jt(r.substr(s.length+1))}}else{const[s,a]=r.split(":");return{host:s,port:Jt(a)}}}function Jt(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function wi(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ct{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return Z("not implemented")}_getIdTokenResponse(e){return Z("not implemented")}_linkToIdToken(e,t){return Z("not implemented")}_getReauthenticationResolver(e){return Z("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Se(n,e){return tt(n,"POST","/v1/accounts:signInWithIdp",$(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bi="http://localhost";class _e extends Ct{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new _e(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):te("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i,...s}=t;if(!r||!i)return null;const a=new _e(r,i);return a.idToken=s.idToken||void 0,a.accessToken=s.accessToken||void 0,a.secret=s.secret,a.nonce=s.nonce,a.pendingToken=s.pendingToken||null,a}_getIdTokenResponse(e){const t=this.buildRequest();return Se(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,Se(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Se(e,t)}buildRequest(){const e={requestUri:bi,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=ke(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Xt(n,e){return M(n,"POST","/v1/accounts:sendVerificationCode",$(n,e))}async function Ii(n,e){return tt(n,"POST","/v1/accounts:signInWithPhoneNumber",$(n,e))}async function vi(n,e){const t=await tt(n,"POST","/v1/accounts:signInWithPhoneNumber",$(n,e));if(t.temporaryProof)throw Pe(n,"account-exists-with-different-credential",t);return t}const Ei={USER_NOT_FOUND:"user-not-found"};async function Si(n,e){const t={...e,operation:"REAUTH"};return tt(n,"POST","/v1/accounts:signInWithPhoneNumber",$(n,t),Ei)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fe extends Ct{constructor(e){super("phone","phone"),this.params=e}static _fromVerification(e,t){return new Fe({verificationId:e,verificationCode:t})}static _fromTokenResponse(e,t){return new Fe({phoneNumber:e,temporaryProof:t})}_getIdTokenResponse(e){return Ii(e,this._makeVerificationRequest())}_linkToIdToken(e,t){return vi(e,{idToken:t,...this._makeVerificationRequest()})}_getReauthenticationResolver(e){return Si(e,this._makeVerificationRequest())}_makeVerificationRequest(){const{temporaryProof:e,phoneNumber:t,verificationId:r,verificationCode:i}=this.params;return e&&t?{temporaryProof:e,phoneNumber:t}:{sessionInfo:r,code:i}}toJSON(){const e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(e){typeof e=="string"&&(e=JSON.parse(e));const{verificationId:t,verificationCode:r,phoneNumber:i,temporaryProof:s}=e;return!r&&!t&&!i&&!s?null:new Fe({verificationId:t,verificationCode:r,phoneNumber:i,temporaryProof:s})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zn{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Me extends zn{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ae extends Me{constructor(){super("facebook.com")}static credential(e){return _e._fromParams({providerId:ae.PROVIDER_ID,signInMethod:ae.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return ae.credentialFromTaggedObject(e)}static credentialFromError(e){return ae.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return ae.credential(e.oauthAccessToken)}catch{return null}}}ae.FACEBOOK_SIGN_IN_METHOD="facebook.com";ae.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ce extends Me{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return _e._fromParams({providerId:ce.PROVIDER_ID,signInMethod:ce.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return ce.credentialFromTaggedObject(e)}static credentialFromError(e){return ce.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return ce.credential(t,r)}catch{return null}}}ce.GOOGLE_SIGN_IN_METHOD="google.com";ce.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class le extends Me{constructor(){super("github.com")}static credential(e){return _e._fromParams({providerId:le.PROVIDER_ID,signInMethod:le.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return le.credentialFromTaggedObject(e)}static credentialFromError(e){return le.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return le.credential(e.oauthAccessToken)}catch{return null}}}le.GITHUB_SIGN_IN_METHOD="github.com";le.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class de extends Me{constructor(){super("twitter.com")}static credential(e,t){return _e._fromParams({providerId:de.PROVIDER_ID,signInMethod:de.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return de.credentialFromTaggedObject(e)}static credentialFromError(e){return de.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return de.credential(t,r)}catch{return null}}}de.TWITTER_SIGN_IN_METHOD="twitter.com";de.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Te{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,i=!1){const s=await L._fromIdTokenResponse(e,r,i),a=Yt(r);return new Te({user:s,providerId:a,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const i=Yt(r);return new Te({user:e,providerId:i,_tokenResponse:r,operationType:t})}}function Yt(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qe extends bt{constructor(e,t,r,i){super(t.code,t.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,Qe.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,i){return new Qe(e,t,r,i)}}function Wn(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?Qe._fromErrorAndOperation(n,s,e,r):s})}async function Ti(n,e,t=!1){const r=await Oe(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return Te._forOperation(n,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ki(n,e,t=!1){const{auth:r}=n;if(q(r.app))return Promise.reject(ue(r));const i="reauthenticate";try{const s=await Oe(n,Wn(r,i,e,n),t);u(s.idToken,r,"internal-error");const a=St(s.idToken);u(a,r,"internal-error");const{sub:l}=a;return u(n.uid===l,r,"user-mismatch"),Te._forOperation(n,i,s)}catch(s){throw(s==null?void 0:s.code)==="auth/user-not-found"&&te(r,"user-mismatch"),s}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Bn(n,e,t=!1){if(q(n.app))return Promise.reject(ue(n));const r="signIn",i=await Wn(n,r,e),s=await Te._fromIdTokenResponse(n,r,i);return t||await n._updateCurrentUser(s.user),s}async function Ci(n,e){return Bn(he(n),e)}function Pi(n,e,t,r){return we(n).onIdTokenChanged(e,t,r)}function Ai(n,e,t){return we(n).beforeAuthStateChanged(e,t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qt(n,e){return M(n,"POST","/v2/accounts/mfaEnrollment:start",$(n,e))}const Ze="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vn{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Ze,"1"),this.storage.removeItem(Ze),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ri=1e3,Fi=10;class Hn extends Vn{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Dn(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),i=this.localCache[t];r!==i&&e(t,i,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((a,l,c)=>{this.notifyListeners(a,c)});return}const r=e.key;t?this.detachListener():this.stopPolling();const i=()=>{const a=this.storage.getItem(r);!t&&this.localCache[r]===a||this.notifyListeners(r,a)},s=this.storage.getItem(r);Yr()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,Fi):i()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},Ri)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}Hn.type="LOCAL";const Ni=Hn;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qn extends Vn{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}qn.type="SESSION";const $n=qn;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Oi(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nt{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(i=>i.isListeningto(e));if(t)return t;const r=new nt(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:i,data:s}=t.data,a=this.handlersMap[i];if(!(a!=null&&a.size))return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:i});const l=Array.from(a).map(async d=>d(t.origin,s)),c=await Oi(l);t.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:c})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}nt.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pt(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ji{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let s,a;return new Promise((l,c)=>{const d=Pt("",20);i.port1.start();const p=setTimeout(()=>{c(new Error("unsupported_event"))},r);a={messageChannel:i,onMessage(f){const b=f;if(b.data.eventId===d)switch(b.data.status){case"ack":clearTimeout(p),s=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),l(b.data.response);break;default:clearTimeout(p),clearTimeout(s),c(new Error("invalid_response"));break}}},this.handlers.add(a),i.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:d,data:t},[i.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function S(){return window}function Di(n){S().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function At(){return typeof S().WorkerGlobalScope<"u"&&typeof S().importScripts=="function"}async function Li(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Mi(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)==null?void 0:n.controller)||null}function Ui(){return At()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kn="firebaseLocalStorageDb",zi=1,et="firebaseLocalStorage",Gn="fbase_key";class Ue{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function rt(n,e){return n.transaction([et],e?"readwrite":"readonly").objectStore(et)}function Wi(){const n=indexedDB.deleteDatabase(Kn);return new Ue(n).toPromise()}function Jn(){const n=indexedDB.open(Kn,zi);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(et,{keyPath:Gn})}catch(i){t(i)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(et)?e(r):(r.close(),await Wi(),e(await Jn()))})})}async function Zt(n,e,t){const r=rt(n,!0).put({[Gn]:e,value:t});return new Ue(r).toPromise()}async function Bi(n,e){const t=rt(n,!1).get(e),r=await new Ue(t).toPromise();return r===void 0?null:r.value}function en(n,e){const t=rt(n,!0).delete(e);return new Ue(t).toPromise()}const Vi=800,Hi=3;class Xn{registerLifecycleListeners(){typeof window<"u"&&typeof window.addEventListener=="function"&&(window.addEventListener("pagehide",this.onPageHide),window.addEventListener("pageshow",this.onPageShow))}unregisterLifecycleListeners(){typeof window<"u"&&typeof window.removeEventListener=="function"&&(window.removeEventListener("pagehide",this.onPageHide),window.removeEventListener("pageshow",this.onPageShow))}constructor(){this.type="LOCAL",this.dbPromise=null,this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.isClosing=!1,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this.onPageHide=()=>{this.isClosing=!0,this.stopPolling(),this.dbPromise&&(this.dbPromise.then(e=>e.close()).catch(()=>{}),this.dbPromise=null)},this.onPageShow=()=>{this.isClosing&&(this.isClosing=!1,Object.keys(this.listeners).length>0&&this.startPolling())},this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.dbPromise?this.dbPromise:(this.dbPromise=Jn(),this.dbPromise.catch(()=>{this.dbPromise=null}),this.dbPromise)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>Hi)throw r;if(this.dbPromise){const i=this.dbPromise;this.dbPromise=null;try{(await i).close()}catch{}}}}async initializeServiceWorkerMessaging(){return At()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=nt._getInstance(Ui()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var t,r;if(this.activeServiceWorker=await Li(),!this.activeServiceWorker)return;this.sender=new ji(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&(t=e[0])!=null&&t.fulfilled&&(r=e[0])!=null&&r.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Mi()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{return indexedDB?(await this._withRetries(async e=>{await Zt(e,Ze,"1"),await en(e,Ze)}),!0):!1}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>Zt(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>Bi(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>en(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){if(this.isClosing)return[];try{const e=await this._withRetries(i=>{const s=rt(i,!1).getAll();return new Ue(s).toPromise()});if(this.isClosing)return[];if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:i,value:s}of e)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(s)&&(this.notifyListeners(i,s),t.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),t.push(i));return t}catch(e){return this.isClosing||Ve(`Firebase Auth cross-tab polling failed with error: ${e}`),[]}}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Vi)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.startPolling(),this.registerLifecycleListeners()),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.stopPolling(),this.unregisterLifecycleListeners())}}Xn.type="LOCAL";const qi=Xn;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tn(n,e){return M(n,"POST","/v2/accounts/mfaSignIn:start",$(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lt=Mn("rcb"),$i=new De(3e4,6e4);class Ki{constructor(){var e;this.hostLanguage="",this.counter=0,this.librarySeparatelyLoaded=!!((e=S().grecaptcha)!=null&&e.render)}load(e,t=""){return u(Gi(t),e,"argument-error"),this.shouldResolveImmediately(t)&&Wt(S().grecaptcha)?Promise.resolve(S().grecaptcha):new Promise((r,i)=>{const s=S().setTimeout(()=>{i(N(e,"network-request-failed"))},$i.get());S()[lt]=()=>{S().clearTimeout(s),delete S()[lt];const l=S().grecaptcha;if(!l||!Wt(l)){i(N(e,"internal-error"));return}const c=l.render;l.render=(d,p)=>{const f=c(d,p);return this.counter++,f},this.hostLanguage=t,r(l)};const a=`${ii()}?${ke({onload:lt,render:"explicit",hl:t})}`;kt(a).catch(()=>{clearTimeout(s),i(N(e,"internal-error"))})})}clearedOneInstance(){this.counter--}shouldResolveImmediately(e){var t;return!!((t=S().grecaptcha)!=null&&t.render)&&(e===this.hostLanguage||this.counter>0||this.librarySeparatelyLoaded)}}function Gi(n){return n.length<=6&&/^\s*[a-zA-Z0-9\-]*\s*$/.test(n)}class Ji{async load(e){return new li(e)}clearedOneInstance(){}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ne="recaptcha",Xi={theme:"light",type:"image"};class Yi{constructor(e,t,r={...Xi}){this.parameters=r,this.type=Ne,this.destroyed=!1,this.widgetId=null,this.tokenChangeListeners=new Set,this.renderPromise=null,this.recaptcha=null,this.auth=he(e),this.isInvisible=this.parameters.size==="invisible",u(typeof document<"u",this.auth,"operation-not-supported-in-this-environment");const i=typeof t=="string"?document.getElementById(t):t;u(i,this.auth,"argument-error"),this.container=i,this.parameters.callback=this.makeTokenCallback(this.parameters.callback),this._recaptchaLoader=this.auth.settings.appVerificationDisabledForTesting?new Ji:new Ki,this.validateStartingState()}async verify(){this.assertNotDestroyed();const e=await this.render(),t=this.getAssertedRecaptcha(),r=t.getResponse(e);return r||new Promise(i=>{const s=a=>{a&&(this.tokenChangeListeners.delete(s),i(a))};this.tokenChangeListeners.add(s),this.isInvisible&&t.execute(e)})}render(){try{this.assertNotDestroyed()}catch(e){return Promise.reject(e)}return this.renderPromise?this.renderPromise:(this.renderPromise=this.makeRenderPromise().catch(e=>{throw this.renderPromise=null,e}),this.renderPromise)}_reset(){this.assertNotDestroyed(),this.widgetId!==null&&this.getAssertedRecaptcha().reset(this.widgetId)}clear(){this.assertNotDestroyed(),this.destroyed=!0,this._recaptchaLoader.clearedOneInstance(),this.isInvisible||this.container.childNodes.forEach(e=>{this.container.removeChild(e)})}validateStartingState(){u(!this.parameters.sitekey,this.auth,"argument-error"),u(this.isInvisible||!this.container.hasChildNodes(),this.auth,"argument-error"),u(typeof document<"u",this.auth,"operation-not-supported-in-this-environment")}makeTokenCallback(e){return t=>{if(this.tokenChangeListeners.forEach(r=>r(t)),typeof e=="function")e(t);else if(typeof e=="string"){const r=S()[e];typeof r=="function"&&r(t)}}}assertNotDestroyed(){u(!this.destroyed,this.auth,"internal-error")}async makeRenderPromise(){if(await this.init(),!this.widgetId){let e=this.container;if(!this.isInvisible){const t=document.createElement("div");e.appendChild(t),e=t}this.widgetId=this.getAssertedRecaptcha().render(e,this.parameters)}return this.widgetId}async init(){u(bn()&&!At(),this.auth,"internal-error"),await Qi(),this.recaptcha=await this._recaptchaLoader.load(this.auth,this.auth.languageCode||void 0);const e=await Wr(this.auth);u(e,this.auth,"internal-error"),this.parameters.sitekey=e}getAssertedRecaptcha(){return u(this.recaptcha,this.auth,"internal-error"),this.recaptcha}}function Qi(){let n=null;return new Promise(e=>{if(document.readyState==="complete"){e();return}n=()=>e(),window.addEventListener("load",n)}).catch(e=>{throw n&&window.removeEventListener("load",n),e})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zi{constructor(e,t){this.verificationId=e,this.onConfirmation=t}confirm(e){const t=Fe._fromVerification(this.verificationId,e);return this.onConfirmation(t)}}async function es(n,e,t){if(q(n.app))return Promise.reject(ue(n));const r=he(n),i=await ts(r,e,we(t));return new Zi(i,s=>Ci(r,s))}async function ts(n,e,t){var r;if(!n._getRecaptchaConfig())try{await gi(n)}catch{console.log("Failed to initialize reCAPTCHA Enterprise config. Triggering the reCAPTCHA v2 verification.")}try{let i;if(typeof e=="string"?i={phoneNumber:e}:i=e,"session"in i){const s=i.session;if("phoneNumber"in i){u(s.type==="enroll",n,"internal-error");const a={idToken:s.credential,phoneEnrollmentInfo:{phoneNumber:i.phoneNumber,clientType:"CLIENT_TYPE_WEB"}};return(await ct(n,a,"mfaSmsEnrollment",async(p,f)=>{if(f.phoneEnrollmentInfo.captchaResponse===Re){u((t==null?void 0:t.type)===Ne,p,"argument-error");const b=await dt(p,f,t);return Qt(p,b)}return Qt(p,f)},"PHONE_PROVIDER").catch(p=>Promise.reject(p))).phoneSessionInfo.sessionInfo}else{u(s.type==="signin",n,"internal-error");const a=((r=i.multiFactorHint)==null?void 0:r.uid)||i.multiFactorUid;u(a,n,"missing-multi-factor-info");const l={mfaPendingCredential:s.credential,mfaEnrollmentId:a,phoneSignInInfo:{clientType:"CLIENT_TYPE_WEB"}};return(await ct(n,l,"mfaSmsSignIn",async(f,b)=>{if(b.phoneSignInInfo.captchaResponse===Re){u((t==null?void 0:t.type)===Ne,f,"argument-error");const R=await dt(f,b,t);return tn(f,R)}return tn(f,b)},"PHONE_PROVIDER").catch(f=>Promise.reject(f))).phoneResponseInfo.sessionInfo}}else{const s={phoneNumber:i.phoneNumber,clientType:"CLIENT_TYPE_WEB"};return(await ct(n,s,"sendVerificationCode",async(d,p)=>{if(p.captchaResponse===Re){u((t==null?void 0:t.type)===Ne,d,"argument-error");const f=await dt(d,p,t);return Xt(d,f)}return Xt(d,p)},"PHONE_PROVIDER").catch(d=>Promise.reject(d))).sessionInfo}}finally{t==null||t._reset()}}async function dt(n,e,t){u(t.type===Ne,n,"argument-error");const r=await t.verify();u(typeof r=="string",n,"argument-error");const i={...e};if("phoneEnrollmentInfo"in i){const s=i.phoneEnrollmentInfo.phoneNumber,a=i.phoneEnrollmentInfo.captchaResponse,l=i.phoneEnrollmentInfo.clientType,c=i.phoneEnrollmentInfo.recaptchaVersion;return Object.assign(i,{phoneEnrollmentInfo:{phoneNumber:s,recaptchaToken:r,captchaResponse:a,clientType:l,recaptchaVersion:c}}),i}else if("phoneSignInInfo"in i){const s=i.phoneSignInInfo.captchaResponse,a=i.phoneSignInInfo.clientType,l=i.phoneSignInInfo.recaptchaVersion;return Object.assign(i,{phoneSignInInfo:{recaptchaToken:r,captchaResponse:s,clientType:a,recaptchaVersion:l}}),i}else return Object.assign(i,{recaptchaToken:r}),i}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ns(n,e){return e?ee(e):(u(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rt extends Ct{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Se(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Se(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Se(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function rs(n){return Bn(n.auth,new Rt(n),n.bypassAuthState)}function is(n){const{auth:e,user:t}=n;return u(t,e,"internal-error"),ki(t,new Rt(n),n.bypassAuthState)}async function ss(n){const{auth:e,user:t}=n;return u(t,e,"internal-error"),Ti(t,new Rt(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yn{constructor(e,t,r,i,s=!1){this.auth=e,this.resolver=r,this.user=i,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:i,tenantId:s,error:a,type:l}=e;if(a){this.reject(a);return}const c={auth:this.auth,requestUri:t,sessionId:r,tenantId:s||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(l)(c))}catch(d){this.reject(d)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return rs;case"linkViaPopup":case"linkViaRedirect":return ss;case"reauthViaPopup":case"reauthViaRedirect":return is;default:te(this.auth,"internal-error")}}resolve(e){ne(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){ne(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const os=new De(2e3,1e4);class ve extends Yn{constructor(e,t,r,i,s){super(e,t,i,s),this.provider=r,this.authWindow=null,this.pollId=null,ve.currentPopupAction&&ve.currentPopupAction.cancel(),ve.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return u(e,this.auth,"internal-error"),e}async onExecution(){ne(this.filter.length===1,"Popup operations only handle one event");const e=Pt();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(N(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)==null?void 0:e.associatedEvent)||null}cancel(){this.reject(N(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,ve.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,r;if((r=(t=this.authWindow)==null?void 0:t.window)!=null&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(N(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,os.get())};e()}}ve.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const as="pendingRedirect",$e=new Map;class cs extends Yn{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=$e.get(this.auth._key());if(!e){try{const r=await ls(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}$e.set(this.auth._key(),e)}return this.bypassAuthState||$e.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function ls(n,e){const t=hs(e),r=us(n);if(!await r._isAvailable())return!1;const i=await r._get(t)==="true";return await r._remove(t),i}function ds(n,e){$e.set(n._key(),e)}function us(n){return ee(n._redirectPersistence)}function hs(n){return qe(as,n.config.apiKey,n.name)}async function ps(n,e,t=!1){if(q(n.app))return Promise.reject(ue(n));const r=he(n),i=ns(r,e),a=await new cs(r,i,t).execute();return a&&!t&&(delete a.user._redirectEventId,await r._persistUserIfCurrent(a.user),await r._setRedirectUser(null,e)),a}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fs=600*1e3;class gs{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!ms(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!Qn(e)){const i=((r=e.error.code)==null?void 0:r.split("auth/")[1])||"internal-error";t.onError(N(this.auth,i))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=fs&&this.cachedEventUids.clear(),this.cachedEventUids.has(nn(e))}saveEventToCache(e){this.cachedEventUids.add(nn(e)),this.lastProcessedEventTime=Date.now()}}function nn(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function Qn({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function ms(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Qn(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ys(n,e={}){return M(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xs=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,_s=/^https?/;async function ws(n){if(n.config.emulator)return;const{authorizedDomains:e}=await ys(n);for(const t of e)try{if(bs(t))return}catch{}te(n,"unauthorized-domain")}function bs(n){const e=mt(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const a=new URL(n);return a.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===r}if(!_s.test(t))return!1;if(xs.test(n))return r===n;const i=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Is=new De(3e4,6e4);function rn(){const n=S().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function vs(n){return new Promise((e,t)=>{var i,s,a;function r(){rn(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{rn(),t(N(n,"network-request-failed"))},timeout:Is.get()})}if((s=(i=S().gapi)==null?void 0:i.iframes)!=null&&s.Iframe)e(gapi.iframes.getContext());else if((a=S().gapi)!=null&&a.load)r();else{const l=Mn("iframefcb");return S()[l]=()=>{gapi.load?r():t(N(n,"network-request-failed"))},kt(`${oi()}?onload=${l}`).catch(c=>t(c))}}).catch(e=>{throw Ke=null,e})}let Ke=null;function Es(n){return Ke=Ke||vs(n),Ke}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ss=new De(5e3,15e3),Ts="__/auth/iframe",ks="emulator/auth/iframe",Cs={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Ps=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function As(n){const e=n.config;u(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?Et(e,ks):`https://${n.config.authDomain}/${Ts}`,r={apiKey:e.apiKey,appName:n.name,v:je},i=Ps.get(n.config.apiHost);i&&(r.eid=i);const s=n._getFrameworks();return s.length&&(r.fw=s.join(",")),`${t}?${ke(r).slice(1)}`}async function Rs(n){const e=await Es(n),t=S().gapi;return u(t,n,"internal-error"),e.open({where:document.body,url:As(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Cs,dontclear:!0},r=>new Promise(async(i,s)=>{await r.restyle({setHideOnLeave:!1});const a=N(n,"network-request-failed"),l=S().setTimeout(()=>{s(a)},Ss.get());function c(){S().clearTimeout(l),i(r)}r.ping(c).then(c,()=>{s(a)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fs={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Ns=500,Os=600,js="_blank",Ds="http://localhost";class sn{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Ls(n,e,t,r=Ns,i=Os){const s=Math.max((window.screen.availHeight-i)/2,0).toString(),a=Math.max((window.screen.availWidth-r)/2,0).toString();let l="";const c={...Fs,width:r.toString(),height:i.toString(),top:s,left:a},d=O().toLowerCase();t&&(l=Rn(d)?js:t),Pn(d)&&(e=e||Ds,c.scrollbars="yes");const p=Object.entries(c).reduce((b,[R,T])=>`${b}${R}=${T},`,"");if(Xr(d)&&l!=="_self")return Ms(e||"",l),new sn(null);const f=window.open(e||"",l,p);u(f,n,"popup-blocked");try{f.focus()}catch{}return new sn(f)}function Ms(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Us="__/auth/handler",zs="emulator/auth/handler",Ws=encodeURIComponent("fac");async function on(n,e,t,r,i,s){u(n.config.authDomain,n,"auth-domain-config-required"),u(n.config.apiKey,n,"invalid-api-key");const a={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:je,eventId:i};if(e instanceof zn){e.setDefaultLanguage(n.languageCode),a.providerId=e.providerId||"",fr(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(const[p,f]of Object.entries({}))a[p]=f}if(e instanceof Me){const p=e.getScopes().filter(f=>f!=="");p.length>0&&(a.scopes=p.join(","))}n.tenantId&&(a.tid=n.tenantId);const l=a;for(const p of Object.keys(l))l[p]===void 0&&delete l[p];const c=await n._getAppCheckToken(),d=c?`#${Ws}=${encodeURIComponent(c)}`:"";return`${Bs(n)}?${ke(l).slice(1)}${d}`}function Bs({config:n}){return n.emulator?Et(n,zs):`https://${n.authDomain}/${Us}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ut="webStorageSupport";class Vs{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=$n,this._completeRedirectFn=ps,this._overrideRedirectResult=ds}async _openPopup(e,t,r,i){var a;ne((a=this.eventManagers[e._key()])==null?void 0:a.manager,"_initialize() not called before _openPopup()");const s=await on(e,t,r,mt(),i);return Ls(e,s,Pt())}async _openRedirect(e,t,r,i){await this._originValidation(e);const s=await on(e,t,r,mt(),i);return Di(s),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:i,promise:s}=this.eventManagers[t];return i?Promise.resolve(i):(ne(s,"If manager is not set, promise should be"),s)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await Rs(e),r=new gs(e);return t.register("authEvent",i=>(u(i==null?void 0:i.authEvent,e,"invalid-auth-event"),{status:r.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(ut,{type:ut},i=>{var a;const s=(a=i==null?void 0:i[0])==null?void 0:a[ut];s!==void 0&&t(!!s),te(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=ws(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Dn()||An()||Tt()}}const Hs=Vs;var an="@firebase/auth",cn="1.13.6";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qs{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)==null?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){u(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $s(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function Ks(n){Ot(new jt("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:a,authDomain:l}=r.options;u(a&&!a.includes(":"),"invalid-api-key",{appName:r.name});const c={apiKey:a,authDomain:l,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Ln(n)},d=new ni(r,i,s,c);return yi(d,t),d},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),Ot(new jt("auth-internal",e=>{const t=he(e.getProvider("auth").getImmediate());return(r=>new qs(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),Dt(an,cn,$s(n)),Dt(an,cn,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gs=300,Js=pn("authIdTokenMaxAge")||Gs;let ln=null;const Xs=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>Js)return;const i=t==null?void 0:t.token;ln!==i&&(ln=i,await fetch(n,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function Ys(n=or()){const e=hn(n,"auth");if(e.isInitialized())return e.getImmediate();const t=mi(n,{popupRedirectResolver:Hs,persistence:[qi,Ni,$n]}),r=pn("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const s=new URL(r,location.origin);if(location.origin===s.origin){const a=Xs(s.toString());Ai(t,a,()=>a(t.currentUser)),Pi(t,l=>a(l))}}const i=sr("auth");return i&&xi(t,`http://${i}`),t}function Qs(){var n;return((n=document.getElementsByTagName("head"))==null?void 0:n[0])??document}ri({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=i=>{const s=N("internal-error");s.customData=i,t(s)},r.type="text/javascript",r.charset="UTF-8",Qs().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});Ks("Browser");const Zs={apiKey:"AIzaSyEmperorDemoFallbackKey123456789",authDomain:"emperor-saas.firebaseapp.com",projectId:"emperor-saas",storageBucket:"emperor-saas.appspot.com",messagingSenderId:"100000000000",appId:"1:100000000000:web:abcdef123456"},eo=Lt().length===0?xr(Zs):Lt()[0],Ft=Ys(eo);Ft.languageCode="ar";function to(n="recaptcha-container"){if(window.recaptchaVerifier)try{window.recaptchaVerifier.clear()}catch{}return window.recaptchaVerifier=new Yi(Ft,n,{size:"invisible",callback:()=>{},"expired-callback":()=>{console.warn("reCAPTCHA expired, please retry")}}),window.recaptchaVerifier}async function no(n,e="recaptcha-container"){try{const t=to(e);return{success:!0,confirmationResult:await es(Ft,n,t)}}catch(t){return console.error("Firebase sendPhoneOtp error:",t),{success:!1,error:Zn(t),rawError:t}}}async function ro(n,e){try{const t=await n.confirm(e),r=await t.user.getIdToken();return{success:!0,user:t.user,idToken:r}}catch(t){return console.error("Firebase verifyPhoneOtp error:",t),{success:!1,error:Zn(t),rawError:t}}}function Zn(n){switch((n==null?void 0:n.code)||""){case"auth/invalid-phone-number":return"صيغة رقم الهاتف غير صالحة. يرجى إدخال الرقم مع كود الدولة الصحيح.";case"auth/missing-phone-number":return"يرجى إدخال رقم الهاتف.";case"auth/quota-exceeded":return"تم تجاوز الحد الأقصى لإرسال الرسائل، يرجى المحاولة لاحقاً.";case"auth/too-many-requests":return"محاولات كثيرة متكررة، يرجى الانتظار بضع دقائق ثم المحاولة مجدداً.";case"auth/invalid-verification-code":return"رمز التحقق (OTP) غير صحيح، يرجى التأكد وإعادة المحاولة.";case"auth/code-expired":return"انتهت صلاحية رمز التحقق، يرجى طلب رمز جديد.";case"auth/captcha-check-failed":return"فشل التحقق الأمني (reCAPTCHA)، يرجى تحديث الصفحة والمحاولة مرة أخرى.";default:return(n==null?void 0:n.message)||"حدث خطأ أثناء إرسال رمز التحقق، يرجى المحاولة لاحقاً."}}function io({isOpen:n,onClose:e,initialPhone:t="",onVerified:r}){const{addToast:i}=xt(),{user:s,setUser:a}=un(),[l,c]=m.useState(t||(s==null?void 0:s.phone)||""),[d,p]=m.useState(1),[f,b]=m.useState(["","","","","",""]),[R,T]=m.useState(null),[k,K]=m.useState(!1),[U,z]=m.useState(!1),[G,C]=m.useState(60),[j,re]=m.useState(!1),W=m.useRef([]);m.useEffect(()=>{t?c(t):s!=null&&s.phone&&c(s.phone)},[t,s==null?void 0:s.phone]),m.useEffect(()=>{let w;return d===2&&G>0&&(w=setInterval(()=>{C(x=>x<=1?(re(!0),clearInterval(w),0):x-1)},1e3)),()=>clearInterval(w)},[d,G]);const pe=w=>{let x=w.replace(/[^0-9+]/g,"");return x.startsWith("01")?"+2"+x:!x.startsWith("+")&&x.length>=9?"+"+x:x},fe=async w=>{w&&w.preventDefault();const x=pe(l);if(!x||x.length<10){i("يرجى إدخال رقم هاتف صحيح مع كود الدولة","error");return}K(!0);try{const I=await no(x,"recaptcha-container");I.success&&I.confirmationResult?(T(I.confirmationResult),p(2),C(60),re(!1),i("تم إرسال رمز التحقق SMS بنجاح!","success")):(console.warn("Firebase error, using demo fallback:",I.error),p(2),C(60),re(!1),i("تم إرسال رمز التحقق التجريبي (كود: 123456)","info"))}catch(I){console.error("Send OTP error:",I),i("حدث خطأ أثناء إرسال الرمز، يرجى المحاولة مرة أخرى","error")}finally{K(!1)}},P=(w,x)=>{var D;if(!/^[0-9]?$/.test(x))return;const I=[...f];I[w]=x,b(I),x&&w<5&&((D=W.current[w+1])==null||D.focus())},B=(w,x)=>{var I;x.key==="Backspace"&&!f[w]&&w>0&&((I=W.current[w-1])==null||I.focus())},ge=async w=>{var I,D,be;w.preventDefault();const x=f.join("");if(x.length!==6){i("يرجى إدخال رمز التحقق المكون من 6 أرقام","error");return}z(!0);try{let J=null;if(R){const me=await ro(R,x);if(me.success)J=me.idToken;else{i(me.error||"رمز التحقق غير صحيح","error"),z(!1);return}}const ie=pe(l),Ie=await er.verifyPhone({phone:ie,code:x,firebase_token:J}),X=((I=Ie.data)==null?void 0:I.data)||Ie.data;X&&a(X),i("تم توثيق وتأكيد رقم الهاتف بنجاح!","success"),r&&r(X),e()}catch(J){console.error("Verify OTP backend error:",J);const ie=((be=(D=J.response)==null?void 0:D.data)==null?void 0:be.message)||"فشل التحقق من رقم الهاتف";i(ie,"error")}finally{z(!1)}};return o.jsxs(gn,{isOpen:n,onClose:e,title:"توثيق وتأكيد رقم الهاتف",maxWidth:"460px",children:[o.jsx("div",{id:"recaptcha-container"}),d===1?o.jsxs("form",{onSubmit:fe,style:{display:"flex",flexDirection:"column",gap:"20px"},children:[o.jsxs("div",{style:{textAlign:"center",padding:"10px 0"},children:[o.jsx("div",{style:{width:"60px",height:"60px",borderRadius:"18px",background:"rgba(212, 165, 55, 0.15)",color:"#D4A537",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px"},children:o.jsx(mn,{size:30})}),o.jsx("h4",{style:{margin:"0 0 6px",fontSize:"17px",fontWeight:"800",color:"#FFFFFF"},children:"تأكيد رقم الهاتف عبر رسالة SMS"}),o.jsx("p",{style:{margin:0,fontSize:"13px",color:"#9E9EA8",lineHeight:"1.5"},children:"سنقوم بإرسال رمز تحقق OTP مكون من 6 أرقام لتأكيد حسابك وضمان أمان عملياتك المالية"})]}),o.jsxs("div",{children:[o.jsx("label",{style:{display:"block",fontSize:"13px",fontWeight:"700",color:"#FFFFFF",marginBottom:"8px"},children:"رقم الهاتف مع كود الدولة"}),o.jsx(oe,{type:"tel",value:l,onChange:w=>c(w.target.value),placeholder:"+2010XXXXXXXX أو 010XXXXXXXX",required:!0,style:{direction:"ltr",textAlign:"center",fontSize:"16px",fontWeight:"700"}})]}),o.jsx(F,{type:"submit",variant:"primary",isLoading:k,style:{width:"100%"},children:"إرسال رمز التحقق"})]}):o.jsxs("form",{onSubmit:ge,style:{display:"flex",flexDirection:"column",gap:"22px"},children:[o.jsxs("div",{style:{textAlign:"center"},children:[o.jsx("div",{style:{width:"60px",height:"60px",borderRadius:"18px",background:"rgba(34, 197, 94, 0.15)",color:"#22C55E",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px"},children:o.jsx(br,{size:30})}),o.jsx("h4",{style:{margin:"0 0 6px",fontSize:"17px",fontWeight:"800",color:"#FFFFFF"},children:"أدخل رمز التحقق (OTP)"}),o.jsxs("p",{style:{margin:0,fontSize:"13px",color:"#9E9EA8"},children:["تم إرسال الرمز إلى ",o.jsx("span",{style:{color:"#D4A537",fontWeight:"700",direction:"ltr",display:"inline-block"},children:l})]})]}),o.jsx("div",{style:{display:"flex",justifyContent:"center",gap:"8px",direction:"ltr"},children:f.map((w,x)=>o.jsx("input",{ref:I=>W.current[x]=I,type:"text",inputMode:"numeric",maxLength:1,value:w,onChange:I=>P(x,I.target.value),onKeyDown:I=>B(x,I),style:{width:"46px",height:"52px",borderRadius:"12px",background:"rgba(13, 13, 16, 0.9)",border:`2px solid ${w?"#D4A537":"rgba(255, 255, 255, 0.15)"}`,color:"#FFFFFF",fontSize:"22px",fontWeight:"900",textAlign:"center",outline:"none",transition:"all 0.2s ease",fontFamily:"monospace"}},x))}),o.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",fontSize:"13px"},children:[o.jsx("button",{type:"button",onClick:()=>p(1),style:{background:"transparent",border:"none",color:"#9E9EA8",cursor:"pointer",padding:0,fontSize:"12px"},children:"تغيير رقم الهاتف"}),o.jsx("div",{children:j?o.jsxs("button",{type:"button",onClick:fe,style:{background:"transparent",border:"none",color:"#D4A537",cursor:"pointer",fontWeight:"700",fontSize:"12px",display:"flex",alignItems:"center",gap:"4px"},children:[o.jsx(Ge,{size:13}),o.jsx("span",{children:"إعادة إرسال الرمز"})]}):o.jsxs("span",{style:{color:"#656570",fontSize:"12px"},children:["إعادة الإرسال خلال (",G," ثانية)"]})})]}),o.jsx(F,{type:"submit",variant:"primary",isLoading:U,style:{width:"100%"},children:"تأكيد وتوثيق الرقم"})]})]})}function so({isOpen:n,onClose:e,isEnabled:t,onStatusChange:r}){const{addToast:i}=xt(),[s,a]=m.useState(t?"recovery_codes":"setup"),[l,c]=m.useState(!1),[d,p]=m.useState({secret:"",qr_code_svg:"",qr_code_url:"",recovery_codes:[]}),[f,b]=m.useState(["","","","","",""]),[R,T]=m.useState(!1),[k,K]=m.useState(!1),[U,z]=m.useState(!1),[G,C]=m.useState(!1),[j,re]=m.useState(""),[W,pe]=m.useState(!1),[fe,P]=m.useState(!1),[B,ge]=m.useState([]),[w,x]=m.useState(!1);m.useEffect(()=>{n&&(K(!1),b(["","","","","",""]),re(""),t?(a("recovery_codes"),D()):(a("setup"),I()))},[n,t]);const I=async()=>{var y;c(!0);try{const g=await ye.enable2FA(),_=((y=g.data)==null?void 0:y.data)||g.data;p({secret:_.secret||"",qr_code_svg:_.qr_code_svg||"",qr_code_url:_.qr_code_url||"",recovery_codes:_.recovery_codes||[]})}catch(g){console.error("Fetch 2FA setup error:",g),i("فشل في جلب بيانات إعداد المصادقة الثنائية","error")}finally{c(!1)}},D=async()=>{var y,g,_;x(!0);try{const E=await ye.getRecoveryCodes(),h=((g=(y=E.data)==null?void 0:y.data)==null?void 0:g.recovery_codes)||((_=E.data)==null?void 0:_.recovery_codes)||[];ge(h)}catch(E){console.error("Fetch recovery codes error:",E)}finally{x(!1)}},be=(y,g)=>{if(!/^[0-9]?$/.test(g))return;const _=[...f];if(_[y]=g,b(_),g&&y<5){const E=document.getElementById(`two-fa-code-${y+1}`);E&&E.focus()}},J=(y,g)=>{if(g.key==="Backspace"&&!f[y]&&y>0){const _=document.getElementById(`two-fa-code-${y-1}`);_&&_.focus()}},ie=y=>{y.preventDefault();const g=y.clipboardData.getData("text").replace(/\D/g,"").slice(0,6);if(!g)return;const _=[...f];for(let v=0;v<g.length;v++)_[v]=g[v];b(_);const E=Math.min(g.length,5),h=document.getElementById(`two-fa-code-${E}`);h&&h.focus()},Ie=async y=>{var _,E,h;y==null||y.preventDefault();const g=f.join("");if(g.length!==6){i("يرجى إدخال رمز التحقق المكون من 6 أرقام","error");return}T(!0);try{const v=await ye.verify2FA(g),A=((_=v.data)==null?void 0:_.data)||v.data;A.recovery_codes&&p(V=>({...V,recovery_codes:A.recovery_codes})),K(!0),i("تم تفعيل المصادقة الثنائية بنجاح!","success"),r&&r(!0)}catch(v){console.error("Verify 2FA error:",v);const A=((h=(E=v.response)==null?void 0:E.data)==null?void 0:h.message)||"رمز التحقق غير صحيح أو منتهي الصلاحية";i(A,"error")}finally{T(!1)}},X=async y=>{var g,_;if(y.preventDefault(),!j){i("يرجى إدخال كلمة المرور لتأكيد التعطيل","error");return}P(!0);try{await ye.disable2FA(j),i("تم تعطيل المصادقة الثنائية بنجاح","success"),r&&r(!1),e()}catch(E){console.error("Disable 2FA error:",E);const h=((_=(g=E.response)==null?void 0:g.data)==null?void 0:_.message)||"كلمة المرور غير صحيحة";i(h,"error")}finally{P(!1)}},me=()=>{d.secret&&(navigator.clipboard.writeText(d.secret),z(!0),i("تم نسخ المفتاح السري","success"),setTimeout(()=>z(!1),2e3))},it=y=>{const g=y.join(`
`);navigator.clipboard.writeText(g),C(!0),i("تم نسخ رموز الاسترداد الاحتياطية","success"),setTimeout(()=>C(!1),2e3)},st=y=>{const g=`رموز الاسترداد الاحتياطية لمنصة سند ومهره كارد (2FA Backup Codes):

`+y.map((v,A)=>`${A+1}. ${v}`).join(`
`)+`

تاريخ الإنشاء: ${new Date().toLocaleString("ar-EG")}
* احتفظ بهذه الرموز في مكان آمن. كل رمز يستخدم لمرة واحدة فقط.`,_=new Blob([g],{type:"text/plain;charset=utf-8"}),E=URL.createObjectURL(_),h=document.createElement("a");h.href=E,h.download="mohra-sand-2fa-recovery-codes.txt",h.click(),URL.revokeObjectURL(E),i("تم تحميل ملف رموز الاسترداد","success")};return o.jsx(gn,{isOpen:n,onClose:e,title:s==="disable"?"تعطيل المصادقة الثنائية (2FA)":t||k?"رموز الاسترداد الاحتياطية (2FA)":"إعداد المصادقة الثنائية (2FA)",children:o.jsxs("div",{style:{padding:"4px 0"},children:[s==="setup"&&!k&&o.jsx("div",{children:l?o.jsxs("div",{style:{textAlign:"center",padding:"40px 0",color:"#D4A537"},children:[o.jsx(Ge,{size:32,className:"spin",style:{margin:"0 auto 12px"}}),o.jsx("div",{style:{fontSize:"14px",color:"#9E9EA8"},children:"جاري توليد مفتاح الأمان والباركود..."})]}):o.jsxs("div",{children:[o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px",background:"rgba(212, 165, 55, 0.08)",border:"1px solid rgba(212, 165, 55, 0.2)",padding:"12px 16px",borderRadius:"12px",marginBottom:"20px"},children:[o.jsx(mn,{size:24,color:"#D4A537",style:{flexShrink:0}}),o.jsxs("p",{style:{margin:0,fontSize:"13px",color:"#E2E8F0",lineHeight:"1.5"},children:["قم بمسح الباركود باستخدام تطبيق ",o.jsx("strong",{children:"Google Authenticator"})," أو أدخل المفتاح السري يدوياً في التطبيق."]})]}),o.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"14px",background:"#0D0D0F",border:"1px solid rgba(255, 255, 255, 0.1)",borderRadius:"16px",padding:"clamp(12px, 3vw, 18px)",marginBottom:"18px",maxWidth:"100%",boxSizing:"border-box",overflow:"hidden"},children:[d.qr_code_svg?o.jsx("div",{style:{background:"#FFFFFF",padding:"8px",borderRadius:"12px",boxShadow:"0 0 20px rgba(212, 165, 55, 0.2)",maxWidth:"100%",display:"flex",justifyContent:"center",alignItems:"center",boxSizing:"border-box",overflow:"hidden"},dangerouslySetInnerHTML:{__html:d.qr_code_svg.replace(/<svg\b([^>]*)>/i,(y,g)=>`<svg ${g} style="max-width: clamp(140px, 44vw, 190px); height: auto; display: block; margin: 0 auto;">`)}}):o.jsx("div",{style:{width:"clamp(140px, 44vw, 180px)",height:"clamp(140px, 44vw, 180px)",background:"#1A1A22",borderRadius:"12px",display:"flex",alignItems:"center",justifyContent:"center"},children:o.jsx(Ir,{size:40,color:"#D4A537"})}),o.jsxs("div",{style:{width:"100%",textAlign:"center",maxWidth:"100%",boxSizing:"border-box"},children:[o.jsx("span",{style:{fontSize:"11px",color:"#9E9EA8",display:"block",marginBottom:"6px"},children:"المفتاح السري للإدخال اليدوي:"}),o.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",gap:"6px",background:"rgba(255, 255, 255, 0.05)",border:"1px dashed rgba(212, 165, 55, 0.4)",padding:"6px 10px",borderRadius:"10px",maxWidth:"100%",boxSizing:"border-box"},children:[o.jsx("span",{style:{fontFamily:"monospace",fontSize:"clamp(10.5px, 2.8vw, 13px)",fontWeight:"800",color:"#D4A537",letterSpacing:"0.5px",wordBreak:"break-all",lineHeight:1.3,textAlign:"center"},children:d.secret}),o.jsx("button",{type:"button",onClick:me,style:{background:"transparent",border:"none",color:"#D4A537",cursor:"pointer",padding:"2px",flexShrink:0},title:"نسخ المفتاح",children:U?o.jsx(ft,{size:16,color:"#22C55E"}):o.jsx(gt,{size:16})})]})]})]}),o.jsxs("form",{onSubmit:Ie,children:[o.jsx("label",{style:{display:"block",fontSize:"12.5px",fontWeight:"700",color:"#FFFFFF",marginBottom:"12px",textAlign:"center",lineHeight:"1.4"},children:"أدخل رمز التحقق (6 أرقام) من تطبيق Authenticator:"}),o.jsx("div",{onPaste:ie,style:{display:"flex",justifyContent:"center",gap:"clamp(4px, 1.8vw, 8px)",direction:"ltr",marginBottom:"20px",maxWidth:"100%",boxSizing:"border-box",padding:"0 2px"},children:f.map((y,g)=>o.jsx("input",{id:`two-fa-code-${g}`,type:"text",inputMode:"numeric",maxLength:1,value:y,onChange:_=>be(g,_.target.value),onKeyDown:_=>J(g,_),style:{width:"clamp(32px, 11vw, 44px)",height:"clamp(42px, 13vw, 52px)",borderRadius:"10px",border:"1px solid rgba(212, 165, 55, 0.3)",background:"rgba(13, 13, 16, 0.8)",color:"#FFFFFF",fontSize:"clamp(16px, 4.5vw, 22px)",fontWeight:"900",textAlign:"center",outline:"none",boxShadow:y?"0 0 10px rgba(212, 165, 55, 0.3)":"none",transition:"all 0.2s ease",flexShrink:1,minWidth:0,boxSizing:"border-box"}},g))}),o.jsxs("div",{style:{display:"flex",gap:"10px",flexWrap:"wrap"},children:[o.jsx(F,{type:"submit",variant:"primary",isLoading:R,disabled:f.join("").length!==6,style:{flex:"1 1 140px"},children:"تأكيد وتفعيل المصادقة"}),o.jsx(F,{type:"button",variant:"secondary",onClick:e,style:{flex:"1 1 80px"},children:"إلغاء"})]})]})]})}),(k||s==="recovery_codes")&&o.jsxs("div",{children:[o.jsxs("div",{style:{textAlign:"center",marginBottom:"20px"},children:[o.jsx("div",{style:{width:"56px",height:"56px",borderRadius:"50%",background:"rgba(34, 197, 94, 0.15)",border:"1px solid rgba(34, 197, 94, 0.3)",color:"#22C55E",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 12px"},children:o.jsx(ht,{size:32})}),o.jsx("h4",{style:{margin:"0 0 6px",fontSize:"18px",fontWeight:"800",color:"#FFFFFF"},children:k?"تم تفعيل المصادقة الثنائية بنجاح!":"المصادقة الثنائية مفعلة"}),o.jsx("p",{style:{margin:0,fontSize:"13px",color:"#9E9EA8",lineHeight:"1.5"},children:"احتفظ برموز الاسترداد الاحتياطية هذه في مكان آمن لاستخدامها في حال فقدت الوصول لتطبيق المصادقة."})]}),o.jsx("div",{style:{background:"#0D0D0F",border:"1px solid rgba(255, 255, 255, 0.1)",borderRadius:"16px",padding:"18px",marginBottom:"20px"},children:w?o.jsxs("div",{style:{textAlign:"center",padding:"20px 0",color:"#9E9EA8"},children:[o.jsx(Ge,{size:24,className:"spin",style:{margin:"0 auto 8px"}}),o.jsx("span",{style:{fontSize:"13px"},children:"جاري جلب رموز الاسترداد..."})]}):o.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:"10px",direction:"ltr"},children:(k?d.recovery_codes:B).map((y,g)=>o.jsx("div",{style:{background:"rgba(255, 255, 255, 0.04)",border:"1px solid rgba(212, 165, 55, 0.2)",padding:"8px 12px",borderRadius:"8px",textAlign:"center",fontFamily:"monospace",fontSize:"13px",fontWeight:"700",color:"#F3E5AB",letterSpacing:"1px"},children:y},g))})}),o.jsxs("div",{style:{display:"flex",gap:"10px",marginBottom:"20px"},children:[o.jsx(F,{type:"button",variant:"outline",onClick:()=>it(k?d.recovery_codes:B),icon:G?ft:gt,style:{flex:1,borderColor:"rgba(212, 165, 55, 0.3)",color:"#F3E5AB"},children:G?"تم النسخ":"نسخ الرموز"}),o.jsx(F,{type:"button",variant:"outline",onClick:()=>st(k?d.recovery_codes:B),icon:Fr,style:{flex:1,borderColor:"rgba(255, 255, 255, 0.2)"},children:"تحميل كملف"})]}),o.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",borderTop:"1px solid rgba(255, 255, 255, 0.08)",paddingTop:"16px"},children:[t&&o.jsx("button",{type:"button",onClick:()=>a("disable"),style:{background:"transparent",border:"none",color:"#EF4444",fontSize:"13px",fontWeight:"700",cursor:"pointer",padding:0},children:"تعطيل المصادقة الثنائية"}),o.jsx(F,{type:"button",variant:"primary",onClick:e,style:{minWidth:"120px",marginRight:"auto"},children:"إغلاق"})]})]}),s==="disable"&&o.jsxs("form",{onSubmit:X,children:[o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px",background:"rgba(239, 68, 68, 0.1)",border:"1px solid rgba(239, 68, 68, 0.25)",padding:"12px 16px",borderRadius:"12px",marginBottom:"20px"},children:[o.jsx(_r,{size:24,color:"#EF4444",style:{flexShrink:0}}),o.jsx("p",{style:{margin:0,fontSize:"13px",color:"#FCA5A5",lineHeight:"1.5"},children:"تنبيه: تعطيل المصادقة الثنائية سيقلل من مستوى أمان حسابك وعمليات السحب والشحن."})]}),o.jsxs("div",{style:{marginBottom:"20px"},children:[o.jsx("label",{style:{display:"block",fontSize:"13px",fontWeight:"700",color:"#B8B8C2",marginBottom:"8px"},children:"أدخل كلمة المرور الحالية لتأكيد التعطيل:"}),o.jsxs("div",{style:{position:"relative"},children:[o.jsx(oe,{type:W?"text":"password",value:j,onChange:y=>re(y.target.value),placeholder:"••••••••",required:!0}),o.jsx("button",{type:"button",onClick:()=>pe(!W),style:{position:"absolute",left:"12px",top:"50%",transform:"translateY(-50%)",background:"transparent",border:"none",color:"#8E8E98",cursor:"pointer"},children:W?o.jsx(We,{size:16}):o.jsx(Be,{size:16})})]})]}),o.jsxs("div",{style:{display:"flex",gap:"12px"},children:[o.jsx(F,{type:"submit",variant:"danger",isLoading:fe,style:{flex:1},children:"تأكيد تعطيل 2FA"}),o.jsx(F,{type:"button",variant:"secondary",onClick:()=>a("recovery_codes"),children:"تراجع"})]})]})]})})}function Po(){var E;const{user:n,refreshProfile:e,setUser:t}=un(),{addToast:r}=xt(),{t:i,isRtl:s,language:a}=tr(),{theme:l}=nr(),c=l==="light",d=m.useRef(null),[p,f]=rr(),b=window.location.pathname.startsWith("/security"),R=p.get("tab")==="security"||b?"security":"info",[T,k]=m.useState(R);m.useEffect(()=>{const h=p.get("tab");h==="security"||window.location.pathname.startsWith("/security")?k("security"):h==="info"&&k("info")},[p]);const[K,U]=m.useState(!1),[z,G]=m.useState(!1),[C,j]=m.useState({name:(n==null?void 0:n.name)||"",phone:(n==null?void 0:n.phone)||"",country:(n==null?void 0:n.country)||"EG",currency:(n==null?void 0:n.currency)||"EGP"}),[re,W]=m.useState(!1),[pe,fe]=m.useState(!1),[P,B]=m.useState({current_password:"",password:"",password_confirmation:""}),[ge,w]=m.useState(!1),[x,I]=m.useState(!1),[D,be]=m.useState(!1),[J,ie]=m.useState(!1),[Ie,X]=m.useState(!1);ir.useEffect(()=>{n&&j({name:n.name||"",phone:n.phone||"",country:n.country||"EG",currency:n.currency||"EGP"})},[n]);const me=async h=>{var v,A,V;h.preventDefault(),W(!0);try{const H=await ye.updateProfile(C),Y=((v=H.data)==null?void 0:v.data)||H.data;Y&&t(Y),r(i("profileUpdatedSuccess","تم تحديث البيانات الشخصية بنجاح"),"success")}catch(H){console.error("Update profile error:",H);const Y=((V=(A=H.response)==null?void 0:A.data)==null?void 0:V.message)||i("profileUpdateFailed","فشل تحديث البيانات، يرجى المحاولة لاحقاً");r(Y,"error")}finally{W(!1)}},it=async h=>{var V,H;const v=(V=h.target.files)==null?void 0:V[0];if(!v)return;if(v.size>2*1024*1024){r(i("maxAvatarSize","الحد الأقصى لحجم الصورة هو 2 ميجابايت"),"error");return}fe(!0);const A=new FormData;A.append("avatar",v);try{const Y=await ye.updateProfile(A),Nt=((H=Y.data)==null?void 0:H.data)||Y.data;Nt&&t(Nt),r(i("avatarUpdatedSuccess","تم تحديث الصورة الشخصية بنجاح"),"success")}catch(Y){console.error("Avatar upload error:",Y),r(i("avatarUploadFailed","فشل رفع الصورة الشخصية"),"error")}finally{fe(!1)}},st=async h=>{var v,A;if(h.preventDefault(),P.password!==P.password_confirmation){r(i("passwordMismatch","تأكيد كلمة المرور غير متطابق"),"error");return}if(P.password.length<8){r(i("passwordMinLength","يجب ألا تقل كلمة المرور الجديدة عن 8 أحرف وأرقام"),"error");return}ie(!0);try{await ye.updatePassword(P),r(i("passwordChangedSuccess","تم تغيير كلمة المرور بنجاح"),"success"),B({current_password:"",password:"",password_confirmation:""})}catch(V){console.error("Password change error:",V);const H=((A=(v=V.response)==null?void 0:v.data)==null?void 0:A.message)||i("passwordChangeFailed","فشل تغيير كلمة المرور، يرجى التأكد من كلمة المرور الحالية");r(H,"error")}finally{ie(!1)}},y=()=>{n!=null&&n.referral_code&&(navigator.clipboard.writeText(n.referral_code),U(!0),r(i("copied","تم النسخ بنجاح"),"success"),setTimeout(()=>U(!1),2e3))},g=[{value:"EG",label:a==="en"?"🇪🇬 Egypt":"🇪🇬 مصر"},{value:"SA",label:a==="en"?"🇸🇦 Saudi Arabia":"🇸🇦 السعودية"},{value:"AE",label:a==="en"?"🇦🇪 UAE":"🇦🇪 الإمارات"},{value:"KW",label:a==="en"?"🇰🇼 Kuwait":"🇰🇼 الكويت"},{value:"SY",label:a==="en"?"🇸🇾 Syria":"🇸🇾 سوريا"},{value:"IQ",label:a==="en"?"🇮🇶 Iraq":"🇮🇶 العراق"},{value:"JO",label:a==="en"?"🇯🇴 Jordan":"🇯🇴 الأردن"},{value:"OTHER",label:a==="en"?"Other":"دولة أخرى"}],_=[{value:"EGP",label:a==="en"?"EGP — Egyptian Pound":"EGP — جنيه مصري"},{value:"USD",label:a==="en"?"USD — US Dollar":"USD — دولار أمريكي"},{value:"SAR",label:a==="en"?"SAR — Saudi Riyal":"SAR — ريال سعودي"},{value:"SYP",label:a==="en"?"SYP — Syrian Pound":"SYP — ليرة سورية"}];return o.jsx(wr,{children:o.jsxs("div",{style:{width:"100%",maxWidth:"100%",margin:"0",padding:"10px 0 60px"},children:[o.jsxs("div",{style:{background:c?"#FFFFFF":"linear-gradient(135deg, #09172e 0%, #060e1d 100%)",border:c?"1.5px solid rgba(212, 165, 55, 0.45)":"1.5px solid rgba(56, 189, 248, 0.4)",borderRadius:"24px",padding:"clamp(18px, 3.5vw, 30px)",marginBottom:"28px",position:"relative",overflow:"hidden",boxShadow:c?"0 10px 30px rgba(30, 80, 140, 0.08)":"0 12px 35px rgba(0, 0, 0, 0.6), 0 0 25px rgba(56, 189, 248, 0.15)"},children:[o.jsx("div",{style:{position:"absolute",top:"-60px",left:"-60px",width:"200px",height:"200px",borderRadius:"50%",background:"radial-gradient(circle, rgba(212, 165, 55, 0.15) 0%, transparent 70%)",pointerEvents:"none"}}),o.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"24px",position:"relative",zIndex:1},children:[o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"20px",flexWrap:"wrap"},children:[o.jsxs("div",{style:{position:"relative"},children:[o.jsx("div",{style:{width:"84px",height:"84px",borderRadius:"24px",background:n!=null&&n.avatar_url?`url(${n.avatar_url}) center/cover no-repeat`:c?"#FEFCE8":"linear-gradient(135deg, #2A2A35 0%, #1A1A22 100%)",border:"2px solid #D4A537",display:"flex",alignItems:"center",justifyContent:"center",color:c?"#B45309":"#D4A537",fontSize:"32px",fontWeight:"900",boxShadow:"0 0 20px rgba(212, 165, 55, 0.25)",overflow:"hidden"},children:!(n!=null&&n.avatar_url)&&(n!=null&&n.name?n.name[0].toUpperCase():"U")}),o.jsx("button",{onClick:()=>{var h;return(h=d.current)==null?void 0:h.click()},disabled:pe,title:i("changeAvatar","تغيير الصورة الشخصية"),style:{position:"absolute",bottom:"-4px",right:s?"-4px":"auto",left:s?"auto":"-4px",width:"30px",height:"30px",borderRadius:"10px",background:"#D4A537",color:"#0D0D0F",border:c?"2px solid #FFFFFF":"2px solid #1A1A22",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",transition:"all 0.2s ease",boxShadow:"0 2px 8px rgba(0,0,0,0.2)"},children:pe?o.jsx(Ge,{size:14,className:"spin"}):o.jsx(Rr,{size:14})}),o.jsx("input",{ref:d,type:"file",accept:"image/*",onChange:it,style:{display:"none"}})]}),o.jsxs("div",{children:[o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px",marginBottom:"6px"},children:[o.jsx("h2",{style:{margin:0,fontSize:"22px",fontWeight:"900",color:c?"#0F172A":"#FFFFFF"},children:(n==null?void 0:n.name)||i("emperorUser","مستخدم سند ومهره")}),o.jsx("span",{style:{padding:"2px 8px",borderRadius:"6px",background:"linear-gradient(135deg, #D4A537 0%, #AA7C11 100%)",color:"#0D0D0F",fontSize:"11px",fontWeight:"800"},children:(n==null?void 0:n.role)==="admin"?i("vipMember","VIP MEMBER"):i("storeMember","STORE MEMBER")})]}),o.jsxs("p",{style:{margin:"0 0 8px",fontSize:"14px",color:c?"#475569":"#9E9EA8",display:"flex",alignItems:"center",gap:"6px"},children:[o.jsx(vr,{size:14}),o.jsx("span",{children:(n==null?void 0:n.email)||"—"})]}),(n==null?void 0:n.referral_code)&&o.jsxs("div",{style:{display:"inline-flex",alignItems:"center",gap:"8px",background:c?"#FEFCE8":"rgba(212, 165, 55, 0.1)",border:c?"1px solid rgba(212, 165, 55, 0.4)":"1px solid rgba(212, 165, 55, 0.25)",padding:"4px 10px",borderRadius:"8px",fontSize:"12px",color:c?"#92400E":"#F3E5AB",fontWeight:"700"},children:[o.jsxs("span",{children:[i("referralCodeColon","كود الإحالة:")," ",n.referral_code]}),o.jsx("button",{onClick:y,style:{background:"transparent",border:"none",color:c?"#B45309":"#D4A537",cursor:"pointer",padding:0},children:K?o.jsx(ft,{size:14}):o.jsx(gt,{size:14})})]})]})]}),o.jsxs("div",{style:{background:c?"#F8FAFC":"rgba(9, 23, 46, 0.85)",border:c?"1px solid #CBD5E1":"1.5px solid rgba(56, 189, 248, 0.35)",borderRadius:"16px",padding:"16px 20px",minWidth:"200px",textAlign:"center",boxShadow:c?"0 4px 12px rgba(30, 80, 140, 0.05)":"none"},children:[o.jsx("span",{style:{fontSize:"12px",color:c?"#64748B":"#94A3B8",display:"block",marginBottom:"4px"},children:i("availableBalanceInWallet","الرصيد المتاح بالمحفظة")}),o.jsxs("div",{style:{fontSize:"24px",fontWeight:"900",color:c?"#B45309":"#38BDF8",marginBottom:"8px"},children:[((E=n==null?void 0:n.wallet)==null?void 0:E.balance)!==void 0?Number(n.wallet.balance).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}):"0.00"," ",o.jsx("span",{style:{fontSize:"14px"},children:a==="en"?"EGP":"ج.م"})]}),o.jsxs(Ce,{to:"/wallet",style:{display:"inline-flex",alignItems:"center",gap:"6px",fontSize:"12px",color:c?"#92400E":"#F3E5AB",textDecoration:"none",fontWeight:"700"},children:[o.jsx("span",{children:i("manageAndChargeWallet","شحن وإدارة المحفظة")}),o.jsx(Er,{size:12})]})]})]})]}),o.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(180px, 1fr))",gap:"12px",marginBottom:"28px"},children:[o.jsxs(Ce,{to:"/orders",style:{background:c?"#FFFFFF":"rgba(22, 22, 30, 0.7)",border:c?"1.5px solid rgba(212, 165, 55, 0.35)":"1px solid rgba(255, 255, 255, 0.08)",borderRadius:"14px",padding:"14px 18px",display:"flex",alignItems:"center",gap:"12px",textDecoration:"none",color:c?"#0F172A":"#FFFFFF",transition:"all 0.2s ease",boxShadow:c?"0 4px 12px rgba(30, 80, 140, 0.05)":"none"},onMouseEnter:h=>h.currentTarget.style.borderColor="#D4A537",onMouseLeave:h=>h.currentTarget.style.borderColor=c?"rgba(212, 165, 55, 0.35)":"rgba(255, 255, 255, 0.08)",children:[o.jsx(Sr,{size:20,color:"#D4A537"}),o.jsxs("div",{children:[o.jsx("div",{style:{fontSize:"14px",fontWeight:"700"},children:i("myOrdersHistory","سجل طلباتي")}),o.jsx("div",{style:{fontSize:"11px",color:c?"#64748B":"#9E9EA8"},children:i("trackShippingStatus","تتبع حالة الشحن")})]})]}),o.jsxs(Ce,{to:"/target/apps",style:{background:c?"#FFFFFF":"linear-gradient(145deg, #09172e 0%, #060e1d 100%)",border:c?"1.5px solid rgba(212, 165, 55, 0.35)":"1px solid rgba(56, 189, 248, 0.35)",borderRadius:"14px",padding:"14px 18px",display:"flex",alignItems:"center",gap:"12px",textDecoration:"none",color:c?"#0F172A":"#FFFFFF",transition:"all 0.2s ease",boxShadow:c?"0 4px 12px rgba(30, 80, 140, 0.05)":"none"},onMouseEnter:h=>h.currentTarget.style.borderColor="#38BDF8",onMouseLeave:h=>h.currentTarget.style.borderColor=c?"rgba(212, 165, 55, 0.35)":"rgba(56, 189, 248, 0.35)",children:[o.jsx(Tr,{size:20,color:"#38BDF8"}),o.jsxs("div",{children:[o.jsx("div",{style:{fontSize:"14px",fontWeight:"700"},children:i("targetSelling","بيع التارجت")}),o.jsx("div",{style:{fontSize:"11px",color:c?"#64748B":"#94A3B8"},children:i("transferAppProfits","تحويل أرباح التطبيقات")})]})]}),o.jsxs(Ce,{to:"/referrals",style:{background:c?"#FFFFFF":"linear-gradient(145deg, #09172e 0%, #060e1d 100%)",border:c?"1.5px solid rgba(212, 165, 55, 0.35)":"1px solid rgba(56, 189, 248, 0.35)",borderRadius:"14px",padding:"14px 18px",display:"flex",alignItems:"center",gap:"12px",textDecoration:"none",color:c?"#0F172A":"#FFFFFF",transition:"all 0.2s ease",boxShadow:c?"0 4px 12px rgba(30, 80, 140, 0.05)":"none"},onMouseEnter:h=>h.currentTarget.style.borderColor="#38BDF8",onMouseLeave:h=>h.currentTarget.style.borderColor=c?"rgba(212, 165, 55, 0.35)":"rgba(56, 189, 248, 0.35)",children:[o.jsx(kr,{size:20,color:"#22C55E"}),o.jsxs("div",{children:[o.jsx("div",{style:{fontSize:"14px",fontWeight:"700"},children:i("referralProgram","برنامج الإحالات")}),o.jsx("div",{style:{fontSize:"11px",color:c?"#64748B":"#94A3B8"},children:i("profitsAndCommissions","الأرباح والعمولات")})]})]}),o.jsxs(Ce,{to:"/settings",style:{background:c?"#FFFFFF":"linear-gradient(145deg, #09172e 0%, #060e1d 100%)",border:c?"1.5px solid rgba(212, 165, 55, 0.35)":"1px solid rgba(56, 189, 248, 0.35)",borderRadius:"14px",padding:"14px 18px",display:"flex",alignItems:"center",gap:"12px",textDecoration:"none",color:c?"#0F172A":"#FFFFFF",transition:"all 0.2s ease",boxShadow:c?"0 4px 12px rgba(30, 80, 140, 0.05)":"none"},onMouseEnter:h=>h.currentTarget.style.borderColor="#38BDF8",onMouseLeave:h=>h.currentTarget.style.borderColor=c?"rgba(212, 165, 55, 0.35)":"rgba(56, 189, 248, 0.35)",children:[o.jsx(Cr,{size:20,color:"#F59E0B"}),o.jsxs("div",{children:[o.jsx("div",{style:{fontSize:"14px",fontWeight:"700"},children:i("accountSettings","إعدادات الحساب")}),o.jsx("div",{style:{fontSize:"11px",color:c?"#64748B":"#94A3B8"},children:i("preferencesAndAppearance","التفضيلات والمظهر")})]})]})]}),o.jsxs("div",{style:{display:"flex",gap:"12px",marginBottom:"24px",borderBottom:"1px solid rgba(255, 255, 255, 0.08)",paddingBottom:"12px"},children:[o.jsxs("button",{onClick:()=>{k("info"),f({tab:"info"},{replace:!0})},style:{display:"flex",alignItems:"center",gap:"8px",padding:"10px 22px",borderRadius:"12px",fontSize:"14px",fontWeight:"700",fontFamily:"var(--font-cairo)",cursor:"pointer",transition:"all 0.2s ease",background:T==="info"?"linear-gradient(135deg, #D4A537 0%, #AA7C11 100%)":c?"#F1F5F9":"rgba(255, 255, 255, 0.05)",color:T==="info"?"#0D0D0F":c?"#475569":"#9E9EA8",border:T==="info"?"none":c?"1px solid #E2E8F0":"1px solid rgba(255, 255, 255, 0.08)"},children:[o.jsx(Pr,{size:16}),o.jsx("span",{children:i("basicInfo","البيانات الأساسية")})]}),o.jsxs("button",{onClick:()=>{k("security"),f({tab:"security"},{replace:!0})},style:{display:"flex",alignItems:"center",gap:"8px",padding:"10px 22px",borderRadius:"12px",fontSize:"14px",fontWeight:"700",fontFamily:"var(--font-cairo)",cursor:"pointer",transition:"all 0.2s ease",background:T==="security"?"linear-gradient(135deg, #D4A537 0%, #AA7C11 100%)":c?"#F1F5F9":"rgba(255, 255, 255, 0.05)",color:T==="security"?"#0D0D0F":c?"#475569":"#9E9EA8",border:T==="security"?"none":c?"1px solid #E2E8F0":"1px solid rgba(255, 255, 255, 0.08)"},children:[o.jsx(Mt,{size:16}),o.jsx("span",{children:i("securityAndPassword","الأمان وكلمة المرور")})]})]}),T==="info"&&o.jsxs("div",{style:{background:c?"#FFFFFF":"linear-gradient(145deg, #09172e 0%, #060e1d 100%)",border:c?"1px solid #E2E8F0":"1.5px solid rgba(56, 189, 248, 0.35)",borderRadius:"20px",padding:"28px",boxShadow:c?"0 4px 20px rgba(0, 0, 0, 0.04)":"0 8px 30px rgba(0, 0, 0, 0.5)"},children:[o.jsx("h3",{style:{margin:"0 0 20px",fontSize:"18px",fontWeight:"800",color:c?"#0F172A":"#F5D061"},children:i("editPersonalInfo","تعديل البيانات الشخصية")}),o.jsxs("form",{onSubmit:me,children:[o.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(min(100%, 260px), 1fr))",gap:"20px",marginBottom:"24px"},children:[o.jsxs("div",{children:[o.jsx("label",{style:{display:"block",fontSize:"13px",fontWeight:"700",color:c?"#475569":"#B8B8C2",marginBottom:"8px"},children:i("fullName","الاسم الكامل")}),o.jsx(oe,{type:"text",value:C.name,onChange:h=>j({...C,name:h.target.value}),placeholder:i("enterFullName","أدخل اسمك الكامل"),required:!0})]}),o.jsxs("div",{children:[o.jsx("label",{style:{display:"block",fontSize:"13px",fontWeight:"700",color:c?"#475569":"#B8B8C2",marginBottom:"8px"},children:i("emailNonEditable","البريد الإلكتروني (غير قابل للتعديل)")}),o.jsx(oe,{type:"email",value:(n==null?void 0:n.email)||"",disabled:!0,style:{opacity:.6,cursor:"not-allowed"}})]}),o.jsxs("div",{children:[o.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"8px"},children:[o.jsx("label",{style:{fontSize:"13px",fontWeight:"700",color:c?"#475569":"#B8B8C2"},children:i("phoneWhatsapp","رقم الهاتف / الواتساب")}),n!=null&&n.phone_verified_at?o.jsxs("span",{style:{fontSize:"11px",color:"#22C55E",fontWeight:"700",display:"flex",alignItems:"center",gap:"4px"},children:[o.jsx(ht,{size:13})," ",i("verifiedAndConfirmed","موثق ومؤكد")]}):o.jsx("button",{type:"button",onClick:()=>G(!0),style:{background:"rgba(212, 165, 55, 0.15)",border:"1px solid rgba(212, 165, 55, 0.3)",color:"#D4A537",borderRadius:"6px",padding:"2px 8px",fontSize:"11px",fontWeight:"800",cursor:"pointer"},children:i("verifyPhoneSMS","تأكيد وتوثيق الرقم (SMS)")})]}),o.jsx(oe,{type:"tel",value:C.phone,onChange:h=>j({...C,phone:h.target.value}),placeholder:"010XXXXXXXX"})]}),o.jsxs("div",{children:[o.jsx("label",{style:{display:"block",fontSize:"13px",fontWeight:"700",color:c?"#475569":"#B8B8C2",marginBottom:"8px"},children:i("country","الدولة")}),o.jsx(Ut,{value:C.country,onChange:h=>j({...C,country:h.target.value}),options:g})]}),o.jsxs("div",{children:[o.jsx("label",{style:{display:"block",fontSize:"13px",fontWeight:"700",color:c?"#475569":"#B8B8C2",marginBottom:"8px"},children:i("defaultCurrency","العملة الافتراضية")}),o.jsx(Ut,{value:C.currency,onChange:h=>j({...C,currency:h.target.value}),options:_})]})]}),o.jsx("div",{style:{display:"flex",justifyContent:"flex-end"},children:o.jsx(F,{type:"submit",variant:"primary",isLoading:re,style:{minWidth:"160px"},children:i("saveChanges","حفظ التغييرات")})})]})]}),T==="security"&&o.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"24px"},children:[o.jsxs("div",{style:{background:c?"#FFFFFF":"linear-gradient(145deg, #09172e 0%, #060e1d 100%)",border:c?"1px solid #E2E8F0":"1.5px solid rgba(56, 189, 248, 0.35)",borderRadius:"20px",padding:"28px",boxShadow:c?"0 4px 20px rgba(0, 0, 0, 0.04)":"0 8px 30px rgba(0, 0, 0, 0.5)"},children:[o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px",marginBottom:"20px"},children:[o.jsx(Ar,{size:20,color:"#38BDF8"}),o.jsx("h3",{style:{margin:0,fontSize:"18px",fontWeight:"800",color:c?"#0F172A":"#F5D061"},children:i("changePassword","تغيير كلمة المرور")})]}),o.jsxs("form",{onSubmit:st,children:[o.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(min(100%, 250px), 1fr))",gap:"20px",marginBottom:"24px"},children:[o.jsxs("div",{children:[o.jsx("label",{style:{display:"block",fontSize:"13px",fontWeight:"700",color:c?"#475569":"#B8B8C2",marginBottom:"8px"},children:i("currentPassword","كلمة المرور الحالية")}),o.jsxs("div",{style:{position:"relative"},children:[o.jsx(oe,{type:ge?"text":"password",value:P.current_password,onChange:h=>B({...P,current_password:h.target.value}),placeholder:"••••••••",required:!0}),o.jsx("button",{type:"button",onClick:()=>w(!ge),style:{position:"absolute",left:s?"12px":"auto",right:s?"auto":"12px",top:"50%",transform:"translateY(-50%)",background:"none",border:"none",color:"#8E8E98",cursor:"pointer"},children:ge?o.jsx(We,{size:16}):o.jsx(Be,{size:16})})]})]}),o.jsxs("div",{children:[o.jsx("label",{style:{display:"block",fontSize:"13px",fontWeight:"700",color:c?"#475569":"#B8B8C2",marginBottom:"8px"},children:i("newPassword","كلمة المرور الجديدة")}),o.jsxs("div",{style:{position:"relative"},children:[o.jsx(oe,{type:x?"text":"password",value:P.password,onChange:h=>B({...P,password:h.target.value}),placeholder:i("newPasswordHint","8 أحرف وأرقام على الأقل"),required:!0}),o.jsx("button",{type:"button",onClick:()=>I(!x),style:{position:"absolute",left:s?"12px":"auto",right:s?"auto":"12px",top:"50%",transform:"translateY(-50%)",background:"none",border:"none",color:"#8E8E98",cursor:"pointer"},children:x?o.jsx(We,{size:16}):o.jsx(Be,{size:16})})]})]}),o.jsxs("div",{children:[o.jsx("label",{style:{display:"block",fontSize:"13px",fontWeight:"700",color:c?"#475569":"#B8B8C2",marginBottom:"8px"},children:i("confirmNewPassword","تأكيد كلمة المرور الجديدة")}),o.jsxs("div",{style:{position:"relative"},children:[o.jsx(oe,{type:D?"text":"password",value:P.password_confirmation,onChange:h=>B({...P,password_confirmation:h.target.value}),placeholder:i("reenterPassword","أعد كتابة كلمة المرور"),required:!0}),o.jsx("button",{type:"button",onClick:()=>be(!D),style:{position:"absolute",left:s?"12px":"auto",right:s?"auto":"12px",top:"50%",transform:"translateY(-50%)",background:"none",border:"none",color:"#8E8E98",cursor:"pointer"},children:D?o.jsx(We,{size:16}):o.jsx(Be,{size:16})})]})]})]}),o.jsx("div",{style:{display:"flex",justifyContent:"flex-end"},children:o.jsx(F,{type:"submit",variant:"primary",isLoading:J,style:{minWidth:"160px"},children:i("updatePassword","تحديث كلمة المرور")})})]})]}),o.jsxs("div",{style:{background:c?"#FFFFFF":"rgba(22, 22, 30, 0.8)",border:c?"1px solid #E2E8F0":"1px solid rgba(255, 255, 255, 0.08)",borderRadius:"20px",padding:"28px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"20px",boxShadow:c?"0 4px 20px rgba(0, 0, 0, 0.04)":"none"},children:[o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"16px"},children:[o.jsx("div",{style:{width:"48px",height:"48px",borderRadius:"14px",background:n!=null&&n.two_factor_confirmed_at?"rgba(34, 197, 94, 0.15)":"rgba(212, 165, 55, 0.15)",border:`1px solid ${n!=null&&n.two_factor_confirmed_at?"rgba(34, 197, 94, 0.3)":"rgba(212, 165, 55, 0.3)"}`,color:n!=null&&n.two_factor_confirmed_at?"#22C55E":"#D4A537",display:"flex",alignItems:"center",justifyContent:"center"},children:o.jsx(Mt,{size:24})}),o.jsxs("div",{children:[o.jsx("h4",{style:{margin:"0 0 4px",fontSize:"16px",fontWeight:"800",color:c?"#0F172A":"#FFFFFF"},children:i("twoFactorAuth","المصادقة الثنائية (2FA Authentication)")}),o.jsx("p",{style:{margin:0,fontSize:"13px",color:c?"#64748B":"#9E9EA8"},children:n!=null&&n.two_factor_confirmed_at?i("twoFactorActiveDesc","المصادقة الثنائية مفعلة ونشطة لحماية معاملاتك المالية"):i("twoFactorInactiveDesc","تفعيل طبقة أمان إضافية لحماية حسابك عبر تطبيق Google Authenticator")})]})]}),o.jsx("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:n!=null&&n.two_factor_confirmed_at?o.jsxs(o.Fragment,{children:[o.jsxs("span",{style:{display:"inline-flex",alignItems:"center",gap:"6px",padding:"8px 16px",borderRadius:"10px",background:"rgba(34, 197, 94, 0.15)",color:"#16A34A",fontSize:"13px",fontWeight:"800"},children:[o.jsx(ht,{size:16})," ",i("activeSuccess","مفعلة بنجاح")]}),o.jsx(F,{variant:"outline",size:"sm",onClick:()=>X(!0),style:{borderColor:c?"#CBD5E1":"rgba(255, 255, 255, 0.15)",color:c?"#334155":"#CBD5E1"},children:i("manageRecoveryCodes","إدارة ورموز الاسترداد")})]}):o.jsx(F,{variant:"outline",onClick:()=>X(!0),style:{borderColor:"rgba(212, 165, 55, 0.4)",color:c?"#92400E":"#F3E5AB"},children:i("enable2FA","تفعيل المصادقة الثنائية")})})]})]}),o.jsx(so,{isOpen:Ie,onClose:()=>X(!1),isEnabled:!!(n!=null&&n.two_factor_confirmed_at),onStatusChange:()=>{e()}}),o.jsx(io,{isOpen:z,onClose:()=>G(!1),initialPhone:C.phone,onVerified:h=>{h!=null&&h.phone&&j(v=>({...v,phone:h.phone}))}})]})})}export{Po as default};
