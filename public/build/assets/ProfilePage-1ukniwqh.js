import{c as Yn,j as c,h as nn,f as rn,r as y,R as sn,q as Qn,a as Zn,g as er,i as tr,w as nr,m as rr,L as we,C as St,s as Ye,v as ir}from"./app-DSLiZ64X.js";import{_ as A,g as ie,a as on,b as an,c as sr,d as or,q as fe,E as lt,e as ot,i as dt,p as ar,f as cr,h as lr,D as dr,j as ur,F as ut,L as hr,k as cn,S as Pe,l as T,m as pr,n as fr,o as gr,r as mr,s as Pt,t as kt,u as Ct,v as yr,w as Rt,x as _r,M as Ir}from"./MainLayout-DgPLd4wu.js";import{g as wr,h as Er,d as br,U as vr,i as xr}from"./UserSidebarDrawer-OpQK702q.js";import{I as te,E as Qe}from"./Input-Dgb71v3z.js";import{B as le}from"./Button--Svu-ZJV.js";import{M as Tr}from"./Modal-D70vwCyB.js";import{S as Sr}from"./smartphone-CQOKk0j4.js";import{S as Pr}from"./shield-check-BCQonT9q.js";import{T as kr}from"./TwoFactorModal-BgREsxKB.js";import{M as Cr}from"./mail-BB459Ofb.js";import{C as Rr}from"./check-BlPBkvmW.js";import{a as Ar}from"./headphones-BrqYG5GG.js";import{E as Nr}from"./external-link-if01agye.js";import{U as Fr}from"./user-BrMuThWG.js";import{S as At}from"./shield-scsTIX59.js";import{L as Or}from"./lock-CKhF1V-p.js";import{E as Ze}from"./eye-BnVvjCXh.js";import"./index-BCn5QfZZ.js";import"./settingsHelper-0npmbL2V.js";import"./phone-CYW2dalf.js";import"./trending-up-CjvvufoF.js";import"./dollar-sign-BXgP6g01.js";import"./qr-code-C7Jk5peS.js";/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ln={name:"camera",size:24,node:[["path",{d:"M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z",key:"18u6gg"}],["circle",{cx:"12",cy:"13",r:"3",key:"1vg3eu"}]]};ln.node;const Lr=Yn(ln);function Nt({label:n,error:e,helperText:t,options:r=[],className:i="",style:s={},containerStyle:o={},...l}){return c.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"6px",marginBottom:"16px",...o},children:[n&&c.jsx("label",{style:{fontSize:"14px",fontWeight:"600",color:"#E2E8F0"},children:n}),c.jsx("select",{style:{width:"100%",padding:"10px 14px",background:"#121218",border:e?"1px solid #EF4444":"1px solid rgba(255, 255, 255, 0.12)",borderRadius:"10px",color:"#FFFFFF",fontSize:"15px",outline:"none",fontFamily:"Cairo, sans-serif",cursor:"pointer",transition:"border-color 0.2s",...s},onFocus:a=>{e||(a.target.style.borderColor="#D4A537")},onBlur:a=>{e||(a.target.style.borderColor="rgba(255, 255, 255, 0.12)")},className:i,...l,children:r.map((a,d)=>{const p=typeof a=="object"?a.value:a,f=typeof a=="object"?a.label:a;return c.jsx("option",{value:p,style:{background:"#181820",color:"#FFF"},children:f},d)})}),e&&c.jsx("span",{style:{fontSize:"12px",color:"#EF4444",fontWeight:"600"},children:Array.isArray(e)?e[0]:e}),t&&!e&&c.jsx("span",{style:{fontSize:"12px",color:"#8E8E98"},children:t})]})}function dn(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Dr=dn,un=new lt("auth","Firebase",dn());/**
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
 */const We=new hr("@firebase/auth");function Le(n,...e){We.logLevel<=cn.WARN&&We.warn(`Auth (${Pe}): ${n}`,...e)}function De(n,...e){We.logLevel<=cn.ERROR&&We.error(`Auth (${Pe}): ${n}`,...e)}/**
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
 */function W(n,...e){throw pt(n,...e)}function x(n,...e){return pt(n,...e)}function ht(n,e,t){const r={...Dr(),[e]:t};return new lt("auth","Firebase",r).create(e,{appName:n.name})}function Q(n){return ht(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function pt(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return un.create(n,...e)}function u(n,e,...t){if(!n)throw pt(e,...t)}function j(n){const e="INTERNAL ASSERTION FAILED: "+n;throw De(e),new Error(e)}function V(n,e){n||j(e)}/**
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
 */function at(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.href)||""}function hn(){return Ft()==="http:"||Ft()==="https:"}function Ft(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.protocol)||null}/**
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
 */function Mr(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(hn()||ur()||"connection"in navigator)?navigator.onLine:!0}function jr(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
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
 */class ke{constructor(e,t){this.shortDelay=e,this.longDelay=t,V(t>e,"Short delay should be less than long delay!"),this.isMobile=cr()||lr()}get(){return Mr()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function ft(n,e){V(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
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
 */class pn{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;j("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;j("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;j("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const Ur={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const Wr=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],Vr=new ke(3e4,6e4);function N(n,e){return n.tenantId&&!e.tenantId?{...e,tenantId:n.tenantId}:e}async function C(n,e,t,r,i={}){return fn(n,i,async()=>{let s={},o={};r&&(e==="GET"?o=r:s={body:JSON.stringify(r)});const l=fe({...o,key:n.config.apiKey}).slice(1),a=await n._getAdditionalHeaders();a["Content-Type"]="application/json",n.languageCode&&(a["X-Firebase-Locale"]=n.languageCode);const d={method:e,headers:a,...s};return mr()||(d.referrerPolicy="strict-origin-when-cross-origin"),n.emulatorConfig&&dt(n.emulatorConfig.host)&&(d.credentials="include"),pn.fetch()(await gn(n,n.config.apiHost,t,l),d)})}async function fn(n,e,t){n._canInitEmulator=!1;const r={...Ur,...e};try{const i=new Br(n),s=await Promise.race([t(),i.promise]);i.clearNetworkTimeout();const o=await s.json();if("needConfirmation"in o)throw Ee(n,"account-exists-with-different-credential",o);if(s.ok&&!("errorMessage"in o))return o;{const l=s.ok?o.errorMessage:o.error.message,[a,d]=l.split(" : ");if(a==="FEDERATED_USER_ID_ALREADY_LINKED")throw Ee(n,"credential-already-in-use",o);if(a==="EMAIL_EXISTS")throw Ee(n,"email-already-in-use",o);if(a==="USER_DISABLED")throw Ee(n,"user-disabled",o);const p=r[a]||a.toLowerCase().replace(/[_\s]+/g,"-");if(d)throw ht(n,p,d);W(n,p)}}catch(i){if(i instanceof ut)throw i;W(n,"network-request-failed",{message:String(i)})}}async function $e(n,e,t,r,i={}){const s=await C(n,e,t,r,i);return"mfaPendingCredential"in s&&W(n,"multi-factor-auth-required",{_serverResponse:s}),s}async function gn(n,e,t,r){const i=`${e}${t}?${r}`,s=n,o=s.config.emulator?ft(n.config,i):`${n.config.apiScheme}://${i}`;return Wr.includes(t)&&(await s._persistenceManagerAvailable,s._getPersistenceType()==="COOKIE")?s._getPersistence()._getFinalTarget(o).toString():o}function zr(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class Br{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(x(this.auth,"network-request-failed")),Vr.get())})}}function Ee(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const i=x(n,e,r);return i.customData._tokenResponse=t,i}/**
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
 */function Ot(n){return n!==void 0&&n.getResponse!==void 0}function Lt(n){return n!==void 0&&n.enterprise!==void 0}class mn{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return zr(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}/**
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
 */async function Hr(n){return(await C(n,"GET","/v1/recaptchaParams")).recaptchaSiteKey||""}async function yn(n,e){return C(n,"GET","/v2/recaptchaConfig",N(n,e))}/**
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
 */async function qr(n,e){return C(n,"POST","/v1/accounts:delete",e)}async function Ve(n,e){return C(n,"POST","/v1/accounts:lookup",e)}/**
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
 */function be(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function $r(n,e=!1){const t=ie(n),r=await t.getIdToken(e),i=gt(r);u(i&&i.exp&&i.auth_time&&i.iat,t.auth,"internal-error");const s=typeof i.firebase=="object"?i.firebase:void 0,o=s==null?void 0:s.sign_in_provider;return{claims:i,token:r,authTime:be(et(i.auth_time)),issuedAtTime:be(et(i.iat)),expirationTime:be(et(i.exp)),signInProvider:o||null,signInSecondFactor:(s==null?void 0:s.sign_in_second_factor)||null}}function et(n){return Number(n)*1e3}function gt(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return De("JWT malformed, contained fewer than 3 sections"),null;try{const i=gr(t);return i?JSON.parse(i):(De("Failed to decode base64 JWT payload"),null)}catch(i){return De("Caught error parsing JWT payload as JSON",i==null?void 0:i.toString()),null}}function Dt(n){const e=gt(n);return u(e,"internal-error"),u(typeof e.exp<"u","internal-error"),u(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function Se(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof ut&&Kr(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function Kr({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
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
 */class Gr{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const r=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class ct{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=be(this.lastLoginAt),this.creationTime=be(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function ze(n){var f;const e=n.auth,t=await n.getIdToken(),r=await Se(n,Ve(e,{idToken:t}));u(r==null?void 0:r.users.length,e,"internal-error");const i=r.users[0];n._notifyReloadListener(i);const s=(f=i.providerUserInfo)!=null&&f.length?_n(i.providerUserInfo):[],o=Xr(n.providerData,s),l=n.isAnonymous,a=!(n.email&&i.passwordHash)&&!(o!=null&&o.length),d=l?a:!1,p={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:o,metadata:new ct(i.createdAt,i.lastLoginAt),isAnonymous:d};Object.assign(n,p)}async function Jr(n){const e=ie(n);await ze(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function Xr(n,e){return[...n.filter(r=>!e.some(i=>i.providerId===r.providerId)),...e]}function _n(n){return n.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
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
 */async function Yr(n,e){const t=await fn(n,{},async()=>{const r=fe({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:s}=n.config,o=await gn(n,i,"/v1/token",`key=${s}`),l=await n._getAdditionalHeaders();l["Content-Type"]="application/x-www-form-urlencoded";const a={method:"POST",headers:l,body:r};return n.emulatorConfig&&dt(n.emulatorConfig.host)&&(a.credentials="include"),pn.fetch()(o,a)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function Qr(n,e){return C(n,"POST","/v2/accounts:revokeToken",N(n,e))}/**
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
 */class ue{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){u(e.idToken,"internal-error"),u(typeof e.idToken<"u","internal-error"),u(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Dt(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){u(e.length!==0,"internal-error");const t=Dt(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(u(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:i,expiresIn:s}=await Yr(e,t);this.updateTokensAndExpiration(r,i,Number(s))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:i,expirationTime:s}=t,o=new ue;return r&&(u(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),i&&(u(typeof i=="string","internal-error",{appName:e}),o.accessToken=i),s&&(u(typeof s=="number","internal-error",{appName:e}),o.expirationTime=s),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new ue,this.toJSON())}_performRefresh(){return j("not implemented")}}/**
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
 */function K(n,e){u(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class k{constructor({uid:e,auth:t,stsTokenManager:r,...i}){this.providerId="firebase",this.proactiveRefresh=new Gr(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new ct(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const t=await Se(this,this.stsTokenManager.getToken(this.auth,e));return u(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return $r(this,e)}reload(){return Jr(this)}_assign(e){this!==e&&(u(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new k({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){u(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await ze(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(A(this.auth.app))return Promise.reject(Q(this.auth));const e=await this.getIdToken();return await Se(this,qr(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const r=t.displayName??void 0,i=t.email??void 0,s=t.phoneNumber??void 0,o=t.photoURL??void 0,l=t.tenantId??void 0,a=t._redirectEventId??void 0,d=t.createdAt??void 0,p=t.lastLoginAt??void 0,{uid:f,emailVerified:I,isAnonymous:P,providerData:E,stsTokenManager:F}=t;u(f&&F,e,"internal-error");const se=ue.fromJSON(this.name,F);u(typeof f=="string",e,"internal-error"),K(r,e.name),K(i,e.name),u(typeof I=="boolean",e,"internal-error"),u(typeof P=="boolean",e,"internal-error"),K(s,e.name),K(o,e.name),K(l,e.name),K(a,e.name),K(d,e.name),K(p,e.name);const z=new k({uid:f,auth:e,email:i,emailVerified:I,displayName:r,isAnonymous:P,photoURL:o,phoneNumber:s,tenantId:l,stsTokenManager:se,createdAt:d,lastLoginAt:p});return E&&Array.isArray(E)&&(z.providerData=E.map(ee=>({...ee}))),a&&(z._redirectEventId=a),z}static async _fromIdTokenResponse(e,t,r=!1){const i=new ue;i.updateFromServerResponse(t);const s=new k({uid:t.localId,auth:e,stsTokenManager:i,isAnonymous:r});return await ze(s),s}static async _fromGetAccountInfoResponse(e,t,r){const i=t.users[0];u(i.localId!==void 0,"internal-error");const s=i.providerUserInfo!==void 0?_n(i.providerUserInfo):[],o=!(i.email&&i.passwordHash)&&!(s!=null&&s.length),l=new ue;l.updateFromIdToken(r);const a=new k({uid:i.localId,auth:e,stsTokenManager:l,isAnonymous:o}),d={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:s,metadata:new ct(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!(s!=null&&s.length)};return Object.assign(a,d),a}}/**
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
 */const Mt=new Map;function U(n){V(n instanceof Function,"Expected a class definition");let e=Mt.get(n);return e?(V(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,Mt.set(n,e),e)}/**
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
 */class In{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}In.type="NONE";const jt=In;/**
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
 */function Me(n,e,t){return`firebase:${n}:${e}:${t}`}class ne{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:i,name:s}=this.auth;this.fullUserKey=Me(this.userKey,i.apiKey,s),this.fullPersistenceKey=Me("persistence",i.apiKey,s),this.boundEventHandler=t._onStorageEvent.bind(t);try{this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}catch{}}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await Ve(this.auth,{idToken:e}).catch(()=>{});return t?k._fromGetAccountInfoResponse(this.auth,t,e):null}return k._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){try{this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}catch{}}static async create(e,t,r="authUser"){if(!t.length)return new ne(U(jt),e,r);const i=(await Promise.all(t.map(async d=>{try{if(await d._isAvailable())return d}catch{return}}))).filter(d=>d);let s=i[0]||U(jt);const o=Me(r,e.config.apiKey,e.name);let l=null;for(const d of t)try{const p=await d._get(o);if(p){let f;if(typeof p=="string"){const I=await Ve(e,{idToken:p}).catch(()=>{});if(!I)break;f=await k._fromGetAccountInfoResponse(e,I,p)}else f=k._fromJSON(e,p);d!==s&&(l=f),s=d;break}}catch{}const a=i.filter(d=>d._shouldAllowMigration);return!s._shouldAllowMigration||!a.length?new ne(s,e,r):(s=a[0],l&&await s._set(o,l.toJSON()),await Promise.all(t.map(async d=>{if(d!==s)try{await d._remove(o)}catch{}})),new ne(s,e,r))}}/**
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
 */function Ut(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(vn(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(wn(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Tn(e))return"Blackberry";if(Sn(e))return"Webos";if(En(e))return"Safari";if((e.includes("chrome/")||bn(e))&&!e.includes("edge/"))return"Chrome";if(xn(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function wn(n=T()){return/firefox\//i.test(n)}function En(n=T()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function bn(n=T()){return/crios\//i.test(n)}function vn(n=T()){return/iemobile/i.test(n)}function xn(n=T()){return/android/i.test(n)}function Tn(n=T()){return/blackberry/i.test(n)}function Sn(n=T()){return/webos/i.test(n)}function mt(n=T()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function Zr(n=T()){var e;return mt(n)&&!!((e=window.navigator)!=null&&e.standalone)}function ei(){return pr()&&document.documentMode===10}function Pn(n=T()){return mt(n)||xn(n)||Sn(n)||Tn(n)||/windows phone/i.test(n)||vn(n)}/**
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
 */function kn(n,e=[]){let t;switch(n){case"Browser":t=Ut(T());break;case"Worker":t=`${Ut(T())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${Pe}/${r}`}/**
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
 */class ti{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=s=>new Promise((o,l)=>{try{const a=e(s);o(a)}catch(a){l(a)}});r.onAbort=t,this.queue.push(r);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const i of t)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
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
 */async function ni(n,e={}){return C(n,"GET","/v2/passwordPolicy",N(n,e))}/**
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
 */const ri=6;class ii{constructor(e){var r;const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??ri,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((r=e.allowedNonAlphanumericCharacters)==null?void 0:r.join(""))??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),i&&(t.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let i=0;i<e.length;i++)r=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,i,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}}/**
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
 */class si{constructor(e,t,r,i){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Wt(this),this.idTokenSubscription=new Wt(this),this.beforeStateQueue=new ti(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=un,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion,this._persistenceManagerAvailable=new Promise(s=>this._resolvePersistenceManagerAvailable=s)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=U(t)),this._initializationPromise=this.queue(async()=>{var r,i,s;if(!this._deleted){try{this.persistenceManager=await ne.create(this,e)}catch(o){Le(`Failed to initialize persistence: ${o}`),this.persistenceManager=await ne.create(this,[])}finally{(r=this._resolvePersistenceManagerAvailable)==null||r.call(this)}if(!this._deleted){if((i=this._popupRedirectResolver)!=null&&i._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}try{await this.initializeCurrentUser(t)}catch(o){Le(`Failed to initialize current user: ${o}`),await this.directlySetCurrentUser(null).catch(()=>{})}this.lastNotifiedUid=((s=this.currentUser)==null?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Ve(this,{idToken:e}),r=await k._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var s;if(A(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(l=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(l,l))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let r=t,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(s=this.redirectUser)==null?void 0:s._redirectEventId,l=r==null?void 0:r._redirectEventId,a=await this.tryRedirectSignIn(e);(!o||o===l)&&(a!=null&&a.user)&&(r=a.user,i=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(r)}catch(o){r=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return u(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await ze(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=jr()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(A(this.app))return Promise.reject(Q(this));const t=e?ie(e):null;return t&&u(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&u(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return A(this.app)?Promise.reject(Q(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return A(this.app)?Promise.reject(Q(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(U(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await ni(this),t=new ii(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new lt("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await Qr(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)==null?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&U(e)||this._popupRedirectResolver;u(t,this,"argument-error"),this.redirectPersistenceManager=await ne.create(this,[U(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)==null?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)==null?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=((t=this.currentUser)==null?void 0:t.uid)??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,i){if(this._deleted)return()=>{};const s=typeof t=="function"?t:t.next.bind(t);let o=!1;const l=this._isInitialized?Promise.resolve():this._initializationPromise;if(u(l,this,"internal-error"),l.then(()=>{o||s(this.currentUser)}).catch(a=>{if(!o)if(typeof t!="function"&&t.error)t.error(a);else if(r)r(a);else throw a}),typeof t=="function"){const a=e.addObserver(t,r,i);return()=>{o=!0,a()}}else{const a=e.addObserver(t);return()=>{o=!0,a()}}}async directlySetCurrentUser(e){if(this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,this.persistenceManager)try{e?await this.persistenceManager.setCurrentUser(e):await this.persistenceManager.removeCurrentUser()}catch(t){const r=(t==null?void 0:t.message)||String(t),i=ht(this,"internal-error",`An internal AuthError has occurred: ${r}`);throw i.customData={originalError:t},i}}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return u(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=kn(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var i;const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await((i=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:i.getHeartbeatsHeader());t&&(e["X-Firebase-Client"]=t);const r=await this._getAppCheckToken();return r&&(e["X-Firebase-AppCheck"]=r),e}async _getAppCheckToken(){var t;if(A(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await((t=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:t.getToken());return e!=null&&e.error&&Le(`Error while retrieving App Check token: ${e.error}`),e==null?void 0:e.token}}function Z(n){return ie(n)}class Wt{constructor(e){this.auth=e,this.observer=null,this.addObserver=yr(t=>this.observer=t)}get next(){return u(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let Ce={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function oi(n){Ce=n}function yt(n){return Ce.loadJS(n)}function ai(){return Ce.recaptchaV2Script}function ci(){return Ce.recaptchaEnterpriseScript}function li(){return Ce.gapiScript}function Cn(n){return`__${n}${Math.floor(Math.random()*1e6)}`}/**
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
 */const di=500,ui=6e4,Oe=1e12;class hi{constructor(e){this.auth=e,this.counter=Oe,this._widgets=new Map}render(e,t){const r=this.counter;return this._widgets.set(r,new gi(e,this.auth.name,t||{})),this.counter++,r}reset(e){var r;const t=e||Oe;(r=this._widgets.get(t))==null||r.delete(),this._widgets.delete(t)}getResponse(e){var r;const t=e||Oe;return((r=this._widgets.get(t))==null?void 0:r.getResponse())||""}async execute(e){var r;const t=e||Oe;return(r=this._widgets.get(t))==null||r.execute(),""}}class pi{constructor(){this.enterprise=new fi}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class fi{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class gi{constructor(e,t,r){this.params=r,this.timerId=null,this.deleted=!1,this.responseToken=null,this.clickHandler=()=>{this.execute()};const i=typeof e=="string"?document.getElementById(e):e;u(i,"argument-error",{appName:t}),this.container=i,this.isVisible=this.params.size!=="invisible",this.isVisible?this.execute():this.container.addEventListener("click",this.clickHandler)}getResponse(){return this.checkIfDeleted(),this.responseToken}delete(){this.checkIfDeleted(),this.deleted=!0,this.timerId&&(clearTimeout(this.timerId),this.timerId=null),this.container.removeEventListener("click",this.clickHandler)}execute(){this.checkIfDeleted(),!this.timerId&&(this.timerId=window.setTimeout(()=>{this.responseToken=mi(50);const{callback:e,"expired-callback":t}=this.params;if(e)try{e(this.responseToken)}catch{}this.timerId=window.setTimeout(()=>{if(this.timerId=null,this.responseToken=null,t)try{t()}catch{}this.isVisible&&this.execute()},ui)},di))}checkIfDeleted(){if(this.deleted)throw new Error("reCAPTCHA mock was already deleted!")}}function mi(n){const e=[],t="1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";for(let r=0;r<n;r++)e.push(t.charAt(Math.floor(Math.random()*t.length)));return e.join("")}/**
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
 */const yi="recaptcha-enterprise",ve="NO_RECAPTCHA",Vt="onFirebaseAuthREInstanceReady";class M{constructor(e){this.type=yi,this.auth=Z(e)}async verify(e="verify",t=!1){async function r(s){if(!t){if(s.tenantId==null&&s._agentRecaptchaConfig!=null)return s._agentRecaptchaConfig.siteKey;if(s.tenantId!=null&&s._tenantRecaptchaConfigs[s.tenantId]!==void 0)return s._tenantRecaptchaConfigs[s.tenantId].siteKey}return new Promise(async(o,l)=>{yn(s,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(a=>{if(a.recaptchaKey===void 0)l(new Error("recaptcha Enterprise site key undefined"));else{const d=new mn(a);return s.tenantId==null?s._agentRecaptchaConfig=d:s._tenantRecaptchaConfigs[s.tenantId]=d,o(d.siteKey)}}).catch(a=>{l(a)})})}function i(s,o,l){const a=window.grecaptcha;Lt(a)?a.enterprise.ready(()=>{a.enterprise.execute(s,{action:e}).then(d=>{o(d)}).catch(()=>{o(ve)})}):l(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new pi().execute("siteKey",{action:"verify"}):new Promise((s,o)=>{r(this.auth).then(async l=>{if(!t&&Lt(window.grecaptcha)&&M.scriptInjectionDeferred)await M.scriptInjectionDeferred.promise,i(l,s,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let a=ci();a.length!==0&&(a+=l+`&onload=${Vt}`),M.scriptInjectionDeferred=new dr,window[Vt]=()=>{var d;(d=M.scriptInjectionDeferred)==null||d.resolve()},yt(a).then(()=>{var d;return(d=M.scriptInjectionDeferred)==null?void 0:d.promise}).then(()=>{i(l,s,o)}).catch(d=>{o(d)})}}).catch(l=>{o(l)})})}}M.scriptInjectionDeferred=null;async function tt(n,e,t,r=!1,i=!1){const s=new M(n);let o;if(i)o=ve;else try{o=await s.verify(t)}catch{o=await s.verify(t,!0)}const l={...e};if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in l){const a=l.phoneEnrollmentInfo.phoneNumber,d=l.phoneEnrollmentInfo.recaptchaToken;Object.assign(l,{phoneEnrollmentInfo:{phoneNumber:a,recaptchaToken:d,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in l){const a=l.phoneSignInInfo.recaptchaToken;Object.assign(l,{phoneSignInInfo:{recaptchaToken:a,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return l}return r?Object.assign(l,{captchaResp:o}):Object.assign(l,{captchaResponse:o}),Object.assign(l,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(l,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),l}async function nt(n,e,t,r,i){var s;if((s=n._getRecaptchaConfig())!=null&&s.isProviderEnabled("PHONE_PROVIDER")){const o=await tt(n,e,t);return r(n,o).catch(async l=>{var a;if(((a=n._getRecaptchaConfig())==null?void 0:a.getProviderEnforcementState("PHONE_PROVIDER"))==="AUDIT"&&(l.code==="auth/missing-recaptcha-token"||l.code==="auth/invalid-app-credential")){console.log(`Failed to verify with reCAPTCHA Enterprise. Automatically triggering the reCAPTCHA v2 flow to complete the ${t} flow.`);const d=await tt(n,e,t,!1,!0);return r(n,d)}return Promise.reject(l)})}else{const o=await tt(n,e,t,!1,!0);return r(n,o)}}async function _i(n){const e=Z(n),t=await yn(e,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}),r=new mn(t);e.tenantId==null?e._agentRecaptchaConfig=r:e._tenantRecaptchaConfigs[e.tenantId]=r,r.isAnyProviderEnabled()&&new M(e).verify()}/**
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
 */function Ii(n,e){const t=on(n,"auth");if(t.isInitialized()){const i=t.getImmediate(),s=t.getOptions();if(ot(s,e??{}))return i;W(i,"already-initialized")}return t.initialize({options:e})}function wi(n,e){const t=(e==null?void 0:e.persistence)||[],r=(Array.isArray(t)?t:[t]).map(U);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function Ei(n,e,t){const r=Z(n);u(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const i=!1,s=Rn(e),{host:o,port:l}=bi(e),a=l===null?"":`:${l}`,d={url:`${s}//${o}${a}/`},p=Object.freeze({host:o,port:l,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:i})});if(!r._canInitEmulator){u(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),u(ot(d,r.config.emulator)&&ot(p,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=d,r.emulatorConfig=p,r.settings.appVerificationDisabledForTesting=!0,dt(o)?ar(`${s}//${o}${a}`):vi()}function Rn(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function bi(n){const e=Rn(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){const s=i[1];return{host:s,port:zt(r.substr(s.length+1))}}else{const[s,o]=r.split(":");return{host:s,port:zt(o)}}}function zt(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function vi(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
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
 */class _t{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return j("not implemented")}_getIdTokenResponse(e){return j("not implemented")}_linkToIdToken(e,t){return j("not implemented")}_getReauthenticationResolver(e){return j("not implemented")}}/**
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
 */async function he(n,e){return $e(n,"POST","/v1/accounts:signInWithIdp",N(n,e))}/**
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
 */const xi="http://localhost";class re extends _t{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new re(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):W("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i,...s}=t;if(!r||!i)return null;const o=new re(r,i);return o.idToken=s.idToken||void 0,o.accessToken=s.accessToken||void 0,o.secret=s.secret,o.nonce=s.nonce,o.pendingToken=s.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return he(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,he(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,he(e,t)}buildRequest(){const e={requestUri:xi,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=fe(t)}return e}}/**
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
 */async function Bt(n,e){return C(n,"POST","/v1/accounts:sendVerificationCode",N(n,e))}async function Ti(n,e){return $e(n,"POST","/v1/accounts:signInWithPhoneNumber",N(n,e))}async function Si(n,e){const t=await $e(n,"POST","/v1/accounts:signInWithPhoneNumber",N(n,e));if(t.temporaryProof)throw Ee(n,"account-exists-with-different-credential",t);return t}const Pi={USER_NOT_FOUND:"user-not-found"};async function ki(n,e){const t={...e,operation:"REAUTH"};return $e(n,"POST","/v1/accounts:signInWithPhoneNumber",N(n,t),Pi)}/**
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
 */class xe extends _t{constructor(e){super("phone","phone"),this.params=e}static _fromVerification(e,t){return new xe({verificationId:e,verificationCode:t})}static _fromTokenResponse(e,t){return new xe({phoneNumber:e,temporaryProof:t})}_getIdTokenResponse(e){return Ti(e,this._makeVerificationRequest())}_linkToIdToken(e,t){return Si(e,{idToken:t,...this._makeVerificationRequest()})}_getReauthenticationResolver(e){return ki(e,this._makeVerificationRequest())}_makeVerificationRequest(){const{temporaryProof:e,phoneNumber:t,verificationId:r,verificationCode:i}=this.params;return e&&t?{temporaryProof:e,phoneNumber:t}:{sessionInfo:r,code:i}}toJSON(){const e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(e){typeof e=="string"&&(e=JSON.parse(e));const{verificationId:t,verificationCode:r,phoneNumber:i,temporaryProof:s}=e;return!r&&!t&&!i&&!s?null:new xe({verificationId:t,verificationCode:r,phoneNumber:i,temporaryProof:s})}}/**
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
 */class An{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class Re extends An{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
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
 */class G extends Re{constructor(){super("facebook.com")}static credential(e){return re._fromParams({providerId:G.PROVIDER_ID,signInMethod:G.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return G.credentialFromTaggedObject(e)}static credentialFromError(e){return G.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return G.credential(e.oauthAccessToken)}catch{return null}}}G.FACEBOOK_SIGN_IN_METHOD="facebook.com";G.PROVIDER_ID="facebook.com";/**
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
 */class J extends Re{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return re._fromParams({providerId:J.PROVIDER_ID,signInMethod:J.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return J.credentialFromTaggedObject(e)}static credentialFromError(e){return J.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return J.credential(t,r)}catch{return null}}}J.GOOGLE_SIGN_IN_METHOD="google.com";J.PROVIDER_ID="google.com";/**
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
 */class X extends Re{constructor(){super("github.com")}static credential(e){return re._fromParams({providerId:X.PROVIDER_ID,signInMethod:X.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return X.credentialFromTaggedObject(e)}static credentialFromError(e){return X.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return X.credential(e.oauthAccessToken)}catch{return null}}}X.GITHUB_SIGN_IN_METHOD="github.com";X.PROVIDER_ID="github.com";/**
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
 */class Y extends Re{constructor(){super("twitter.com")}static credential(e,t){return re._fromParams({providerId:Y.PROVIDER_ID,signInMethod:Y.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Y.credentialFromTaggedObject(e)}static credentialFromError(e){return Y.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return Y.credential(t,r)}catch{return null}}}Y.TWITTER_SIGN_IN_METHOD="twitter.com";Y.PROVIDER_ID="twitter.com";/**
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
 */class pe{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,i=!1){const s=await k._fromIdTokenResponse(e,r,i),o=Ht(r);return new pe({user:s,providerId:o,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const i=Ht(r);return new pe({user:e,providerId:i,_tokenResponse:r,operationType:t})}}function Ht(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
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
 */class Be extends ut{constructor(e,t,r,i){super(t.code,t.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,Be.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,i){return new Be(e,t,r,i)}}function Nn(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?Be._fromErrorAndOperation(n,s,e,r):s})}async function Ci(n,e,t=!1){const r=await Se(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return pe._forOperation(n,"link",r)}/**
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
 */async function Ri(n,e,t=!1){const{auth:r}=n;if(A(r.app))return Promise.reject(Q(r));const i="reauthenticate";try{const s=await Se(n,Nn(r,i,e,n),t);u(s.idToken,r,"internal-error");const o=gt(s.idToken);u(o,r,"internal-error");const{sub:l}=o;return u(n.uid===l,r,"user-mismatch"),pe._forOperation(n,i,s)}catch(s){throw(s==null?void 0:s.code)==="auth/user-not-found"&&W(r,"user-mismatch"),s}}/**
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
 */async function Fn(n,e,t=!1){if(A(n.app))return Promise.reject(Q(n));const r="signIn",i=await Nn(n,r,e),s=await pe._fromIdTokenResponse(n,r,i);return t||await n._updateCurrentUser(s.user),s}async function Ai(n,e){return Fn(Z(n),e)}function Ni(n,e,t,r){return ie(n).onIdTokenChanged(e,t,r)}function Fi(n,e,t){return ie(n).beforeAuthStateChanged(e,t)}/**
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
 */function qt(n,e){return C(n,"POST","/v2/accounts/mfaEnrollment:start",N(n,e))}const He="__sak";/**
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
 */class On{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(He,"1"),this.storage.removeItem(He),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */const Oi=1e3,Li=10;class Ln extends On{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Pn(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),i=this.localCache[t];r!==i&&e(t,i,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,l,a)=>{this.notifyListeners(o,a)});return}const r=e.key;t?this.detachListener():this.stopPolling();const i=()=>{const o=this.storage.getItem(r);!t&&this.localCache[r]===o||this.notifyListeners(r,o)},s=this.storage.getItem(r);ei()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,Li):i()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},Oi)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}Ln.type="LOCAL";const Di=Ln;/**
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
 */class Dn extends On{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}Dn.type="SESSION";const Mn=Dn;/**
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
 */function Mi(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
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
 */class Ke{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(i=>i.isListeningto(e));if(t)return t;const r=new Ke(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:i,data:s}=t.data,o=this.handlersMap[i];if(!(o!=null&&o.size))return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:i});const l=Array.from(o).map(async d=>d(t.origin,s)),a=await Mi(l);t.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:a})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Ke.receivers=[];/**
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
 */function It(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
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
 */class ji{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let s,o;return new Promise((l,a)=>{const d=It("",20);i.port1.start();const p=setTimeout(()=>{a(new Error("unsupported_event"))},r);o={messageChannel:i,onMessage(f){const I=f;if(I.data.eventId===d)switch(I.data.status){case"ack":clearTimeout(p),s=setTimeout(()=>{a(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),l(I.data.response);break;default:clearTimeout(p),clearTimeout(s),a(new Error("invalid_response"));break}}},this.handlers.add(o),i.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:d,data:t},[i.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
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
 */function w(){return window}function Ui(n){w().location.href=n}/**
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
 */function wt(){return typeof w().WorkerGlobalScope<"u"&&typeof w().importScripts=="function"}async function Wi(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Vi(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)==null?void 0:n.controller)||null}function zi(){return wt()?self:null}/**
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
 */const jn="firebaseLocalStorageDb",Bi=1,qe="firebaseLocalStorage",Un="fbase_key";class Ae{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Ge(n,e){return n.transaction([qe],e?"readwrite":"readonly").objectStore(qe)}function Hi(){const n=indexedDB.deleteDatabase(jn);return new Ae(n).toPromise()}function Wn(){const n=indexedDB.open(jn,Bi);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(qe,{keyPath:Un})}catch(i){t(i)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(qe)?e(r):(r.close(),await Hi(),e(await Wn()))})})}async function $t(n,e,t){const r=Ge(n,!0).put({[Un]:e,value:t});return new Ae(r).toPromise()}async function qi(n,e){const t=Ge(n,!1).get(e),r=await new Ae(t).toPromise();return r===void 0?null:r.value}function Kt(n,e){const t=Ge(n,!0).delete(e);return new Ae(t).toPromise()}const $i=800,Ki=3;class Vn{registerLifecycleListeners(){typeof window<"u"&&typeof window.addEventListener=="function"&&(window.addEventListener("pagehide",this.onPageHide),window.addEventListener("pageshow",this.onPageShow))}unregisterLifecycleListeners(){typeof window<"u"&&typeof window.removeEventListener=="function"&&(window.removeEventListener("pagehide",this.onPageHide),window.removeEventListener("pageshow",this.onPageShow))}constructor(){this.type="LOCAL",this.dbPromise=null,this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.isClosing=!1,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this.onPageHide=()=>{this.isClosing=!0,this.stopPolling(),this.dbPromise&&(this.dbPromise.then(e=>e.close()).catch(()=>{}),this.dbPromise=null)},this.onPageShow=()=>{this.isClosing&&(this.isClosing=!1,Object.keys(this.listeners).length>0&&this.startPolling())},this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.dbPromise?this.dbPromise:(this.dbPromise=Wn(),this.dbPromise.catch(()=>{this.dbPromise=null}),this.dbPromise)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>Ki)throw r;if(this.dbPromise){const i=this.dbPromise;this.dbPromise=null;try{(await i).close()}catch{}}}}async initializeServiceWorkerMessaging(){return wt()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Ke._getInstance(zi()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var t,r;if(this.activeServiceWorker=await Wi(),!this.activeServiceWorker)return;this.sender=new ji(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&(t=e[0])!=null&&t.fulfilled&&(r=e[0])!=null&&r.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Vi()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{return indexedDB?(await this._withRetries(async e=>{await $t(e,He,"1"),await Kt(e,He)}),!0):!1}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>$t(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>qi(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Kt(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){if(this.isClosing)return[];try{const e=await this._withRetries(i=>{const s=Ge(i,!1).getAll();return new Ae(s).toPromise()});if(this.isClosing)return[];if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:i,value:s}of e)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(s)&&(this.notifyListeners(i,s),t.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),t.push(i));return t}catch(e){return this.isClosing||Le(`Firebase Auth cross-tab polling failed with error: ${e}`),[]}}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),$i)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.startPolling(),this.registerLifecycleListeners()),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.stopPolling(),this.unregisterLifecycleListeners())}}Vn.type="LOCAL";const Gi=Vn;/**
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
 */function Gt(n,e){return C(n,"POST","/v2/accounts/mfaSignIn:start",N(n,e))}/**
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
 */const rt=Cn("rcb"),Ji=new ke(3e4,6e4);class Xi{constructor(){var e;this.hostLanguage="",this.counter=0,this.librarySeparatelyLoaded=!!((e=w().grecaptcha)!=null&&e.render)}load(e,t=""){return u(Yi(t),e,"argument-error"),this.shouldResolveImmediately(t)&&Ot(w().grecaptcha)?Promise.resolve(w().grecaptcha):new Promise((r,i)=>{const s=w().setTimeout(()=>{i(x(e,"network-request-failed"))},Ji.get());w()[rt]=()=>{w().clearTimeout(s),delete w()[rt];const l=w().grecaptcha;if(!l||!Ot(l)){i(x(e,"internal-error"));return}const a=l.render;l.render=(d,p)=>{const f=a(d,p);return this.counter++,f},this.hostLanguage=t,r(l)};const o=`${ai()}?${fe({onload:rt,render:"explicit",hl:t})}`;yt(o).catch(()=>{clearTimeout(s),i(x(e,"internal-error"))})})}clearedOneInstance(){this.counter--}shouldResolveImmediately(e){var t;return!!((t=w().grecaptcha)!=null&&t.render)&&(e===this.hostLanguage||this.counter>0||this.librarySeparatelyLoaded)}}function Yi(n){return n.length<=6&&/^\s*[a-zA-Z0-9\-]*\s*$/.test(n)}class Qi{async load(e){return new hi(e)}clearedOneInstance(){}}/**
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
 */const Te="recaptcha",Zi={theme:"light",type:"image"};class es{constructor(e,t,r={...Zi}){this.parameters=r,this.type=Te,this.destroyed=!1,this.widgetId=null,this.tokenChangeListeners=new Set,this.renderPromise=null,this.recaptcha=null,this.auth=Z(e),this.isInvisible=this.parameters.size==="invisible",u(typeof document<"u",this.auth,"operation-not-supported-in-this-environment");const i=typeof t=="string"?document.getElementById(t):t;u(i,this.auth,"argument-error"),this.container=i,this.parameters.callback=this.makeTokenCallback(this.parameters.callback),this._recaptchaLoader=this.auth.settings.appVerificationDisabledForTesting?new Qi:new Xi,this.validateStartingState()}async verify(){this.assertNotDestroyed();const e=await this.render(),t=this.getAssertedRecaptcha(),r=t.getResponse(e);return r||new Promise(i=>{const s=o=>{o&&(this.tokenChangeListeners.delete(s),i(o))};this.tokenChangeListeners.add(s),this.isInvisible&&t.execute(e)})}render(){try{this.assertNotDestroyed()}catch(e){return Promise.reject(e)}return this.renderPromise?this.renderPromise:(this.renderPromise=this.makeRenderPromise().catch(e=>{throw this.renderPromise=null,e}),this.renderPromise)}_reset(){this.assertNotDestroyed(),this.widgetId!==null&&this.getAssertedRecaptcha().reset(this.widgetId)}clear(){this.assertNotDestroyed(),this.destroyed=!0,this._recaptchaLoader.clearedOneInstance(),this.isInvisible||this.container.childNodes.forEach(e=>{this.container.removeChild(e)})}validateStartingState(){u(!this.parameters.sitekey,this.auth,"argument-error"),u(this.isInvisible||!this.container.hasChildNodes(),this.auth,"argument-error"),u(typeof document<"u",this.auth,"operation-not-supported-in-this-environment")}makeTokenCallback(e){return t=>{if(this.tokenChangeListeners.forEach(r=>r(t)),typeof e=="function")e(t);else if(typeof e=="string"){const r=w()[e];typeof r=="function"&&r(t)}}}assertNotDestroyed(){u(!this.destroyed,this.auth,"internal-error")}async makeRenderPromise(){if(await this.init(),!this.widgetId){let e=this.container;if(!this.isInvisible){const t=document.createElement("div");e.appendChild(t),e=t}this.widgetId=this.getAssertedRecaptcha().render(e,this.parameters)}return this.widgetId}async init(){u(hn()&&!wt(),this.auth,"internal-error"),await ts(),this.recaptcha=await this._recaptchaLoader.load(this.auth,this.auth.languageCode||void 0);const e=await Hr(this.auth);u(e,this.auth,"internal-error"),this.parameters.sitekey=e}getAssertedRecaptcha(){return u(this.recaptcha,this.auth,"internal-error"),this.recaptcha}}function ts(){let n=null;return new Promise(e=>{if(document.readyState==="complete"){e();return}n=()=>e(),window.addEventListener("load",n)}).catch(e=>{throw n&&window.removeEventListener("load",n),e})}/**
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
 */class ns{constructor(e,t){this.verificationId=e,this.onConfirmation=t}confirm(e){const t=xe._fromVerification(this.verificationId,e);return this.onConfirmation(t)}}async function rs(n,e,t){if(A(n.app))return Promise.reject(Q(n));const r=Z(n),i=await is(r,e,ie(t));return new ns(i,s=>Ai(r,s))}async function is(n,e,t){var r;if(!n._getRecaptchaConfig())try{await _i(n)}catch{console.log("Failed to initialize reCAPTCHA Enterprise config. Triggering the reCAPTCHA v2 verification.")}try{let i;if(typeof e=="string"?i={phoneNumber:e}:i=e,"session"in i){const s=i.session;if("phoneNumber"in i){u(s.type==="enroll",n,"internal-error");const o={idToken:s.credential,phoneEnrollmentInfo:{phoneNumber:i.phoneNumber,clientType:"CLIENT_TYPE_WEB"}};return(await nt(n,o,"mfaSmsEnrollment",async(p,f)=>{if(f.phoneEnrollmentInfo.captchaResponse===ve){u((t==null?void 0:t.type)===Te,p,"argument-error");const I=await it(p,f,t);return qt(p,I)}return qt(p,f)},"PHONE_PROVIDER").catch(p=>Promise.reject(p))).phoneSessionInfo.sessionInfo}else{u(s.type==="signin",n,"internal-error");const o=((r=i.multiFactorHint)==null?void 0:r.uid)||i.multiFactorUid;u(o,n,"missing-multi-factor-info");const l={mfaPendingCredential:s.credential,mfaEnrollmentId:o,phoneSignInInfo:{clientType:"CLIENT_TYPE_WEB"}};return(await nt(n,l,"mfaSmsSignIn",async(f,I)=>{if(I.phoneSignInInfo.captchaResponse===ve){u((t==null?void 0:t.type)===Te,f,"argument-error");const P=await it(f,I,t);return Gt(f,P)}return Gt(f,I)},"PHONE_PROVIDER").catch(f=>Promise.reject(f))).phoneResponseInfo.sessionInfo}}else{const s={phoneNumber:i.phoneNumber,clientType:"CLIENT_TYPE_WEB"};return(await nt(n,s,"sendVerificationCode",async(d,p)=>{if(p.captchaResponse===ve){u((t==null?void 0:t.type)===Te,d,"argument-error");const f=await it(d,p,t);return Bt(d,f)}return Bt(d,p)},"PHONE_PROVIDER").catch(d=>Promise.reject(d))).sessionInfo}}finally{t==null||t._reset()}}async function it(n,e,t){u(t.type===Te,n,"argument-error");const r=await t.verify();u(typeof r=="string",n,"argument-error");const i={...e};if("phoneEnrollmentInfo"in i){const s=i.phoneEnrollmentInfo.phoneNumber,o=i.phoneEnrollmentInfo.captchaResponse,l=i.phoneEnrollmentInfo.clientType,a=i.phoneEnrollmentInfo.recaptchaVersion;return Object.assign(i,{phoneEnrollmentInfo:{phoneNumber:s,recaptchaToken:r,captchaResponse:o,clientType:l,recaptchaVersion:a}}),i}else if("phoneSignInInfo"in i){const s=i.phoneSignInInfo.captchaResponse,o=i.phoneSignInInfo.clientType,l=i.phoneSignInInfo.recaptchaVersion;return Object.assign(i,{phoneSignInInfo:{recaptchaToken:r,captchaResponse:s,clientType:o,recaptchaVersion:l}}),i}else return Object.assign(i,{recaptchaToken:r}),i}/**
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
 */function ss(n,e){return e?U(e):(u(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
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
 */class Et extends _t{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return he(e,this._buildIdpRequest())}_linkToIdToken(e,t){return he(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return he(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function os(n){return Fn(n.auth,new Et(n),n.bypassAuthState)}function as(n){const{auth:e,user:t}=n;return u(t,e,"internal-error"),Ri(t,new Et(n),n.bypassAuthState)}async function cs(n){const{auth:e,user:t}=n;return u(t,e,"internal-error"),Ci(t,new Et(n),n.bypassAuthState)}/**
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
 */class zn{constructor(e,t,r,i,s=!1){this.auth=e,this.resolver=r,this.user=i,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:i,tenantId:s,error:o,type:l}=e;if(o){this.reject(o);return}const a={auth:this.auth,requestUri:t,sessionId:r,tenantId:s||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(l)(a))}catch(d){this.reject(d)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return os;case"linkViaPopup":case"linkViaRedirect":return cs;case"reauthViaPopup":case"reauthViaRedirect":return as;default:W(this.auth,"internal-error")}}resolve(e){V(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){V(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const ls=new ke(2e3,1e4);class de extends zn{constructor(e,t,r,i,s){super(e,t,i,s),this.provider=r,this.authWindow=null,this.pollId=null,de.currentPopupAction&&de.currentPopupAction.cancel(),de.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return u(e,this.auth,"internal-error"),e}async onExecution(){V(this.filter.length===1,"Popup operations only handle one event");const e=It();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(x(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)==null?void 0:e.associatedEvent)||null}cancel(){this.reject(x(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,de.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,r;if((r=(t=this.authWindow)==null?void 0:t.window)!=null&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(x(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,ls.get())};e()}}de.currentPopupAction=null;/**
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
 */const ds="pendingRedirect",je=new Map;class us extends zn{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=je.get(this.auth._key());if(!e){try{const r=await hs(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}je.set(this.auth._key(),e)}return this.bypassAuthState||je.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function hs(n,e){const t=gs(e),r=fs(n);if(!await r._isAvailable())return!1;const i=await r._get(t)==="true";return await r._remove(t),i}function ps(n,e){je.set(n._key(),e)}function fs(n){return U(n._redirectPersistence)}function gs(n){return Me(ds,n.config.apiKey,n.name)}async function ms(n,e,t=!1){if(A(n.app))return Promise.reject(Q(n));const r=Z(n),i=ss(r,e),o=await new us(r,i,t).execute();return o&&!t&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
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
 */const ys=600*1e3;class _s{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!Is(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!Bn(e)){const i=((r=e.error.code)==null?void 0:r.split("auth/")[1])||"internal-error";t.onError(x(this.auth,i))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=ys&&this.cachedEventUids.clear(),this.cachedEventUids.has(Jt(e))}saveEventToCache(e){this.cachedEventUids.add(Jt(e)),this.lastProcessedEventTime=Date.now()}}function Jt(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function Bn({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function Is(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Bn(n);default:return!1}}/**
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
 */async function ws(n,e={}){return C(n,"GET","/v1/projects",e)}/**
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
 */const Es=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,bs=/^https?/;async function vs(n){if(n.config.emulator)return;const{authorizedDomains:e}=await ws(n);for(const t of e)try{if(xs(t))return}catch{}W(n,"unauthorized-domain")}function xs(n){const e=at(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const o=new URL(n);return o.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===r}if(!bs.test(t))return!1;if(Es.test(n))return r===n;const i=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}/**
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
 */const Ts=new ke(3e4,6e4);function Xt(){const n=w().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function Ss(n){return new Promise((e,t)=>{var i,s,o;function r(){Xt(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Xt(),t(x(n,"network-request-failed"))},timeout:Ts.get()})}if((s=(i=w().gapi)==null?void 0:i.iframes)!=null&&s.Iframe)e(gapi.iframes.getContext());else if((o=w().gapi)!=null&&o.load)r();else{const l=Cn("iframefcb");return w()[l]=()=>{gapi.load?r():t(x(n,"network-request-failed"))},yt(`${li()}?onload=${l}`).catch(a=>t(a))}}).catch(e=>{throw Ue=null,e})}let Ue=null;function Ps(n){return Ue=Ue||Ss(n),Ue}/**
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
 */const ks=new ke(5e3,15e3),Cs="__/auth/iframe",Rs="emulator/auth/iframe",As={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Ns=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Fs(n){const e=n.config;u(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?ft(e,Rs):`https://${n.config.authDomain}/${Cs}`,r={apiKey:e.apiKey,appName:n.name,v:Pe},i=Ns.get(n.config.apiHost);i&&(r.eid=i);const s=n._getFrameworks();return s.length&&(r.fw=s.join(",")),`${t}?${fe(r).slice(1)}`}async function Os(n){const e=await Ps(n),t=w().gapi;return u(t,n,"internal-error"),e.open({where:document.body,url:Fs(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:As,dontclear:!0},r=>new Promise(async(i,s)=>{await r.restyle({setHideOnLeave:!1});const o=x(n,"network-request-failed"),l=w().setTimeout(()=>{s(o)},ks.get());function a(){w().clearTimeout(l),i(r)}r.ping(a).then(a,()=>{s(o)})}))}/**
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
 */const Ls={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Ds=500,Ms=600,js="_blank",Us="http://localhost";class Yt{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Ws(n,e,t,r=Ds,i=Ms){const s=Math.max((window.screen.availHeight-i)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let l="";const a={...Ls,width:r.toString(),height:i.toString(),top:s,left:o},d=T().toLowerCase();t&&(l=bn(d)?js:t),wn(d)&&(e=e||Us,a.scrollbars="yes");const p=Object.entries(a).reduce((I,[P,E])=>`${I}${P}=${E},`,"");if(Zr(d)&&l!=="_self")return Vs(e||"",l),new Yt(null);const f=window.open(e||"",l,p);u(f,n,"popup-blocked");try{f.focus()}catch{}return new Yt(f)}function Vs(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
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
 */const zs="__/auth/handler",Bs="emulator/auth/handler",Hs=encodeURIComponent("fac");async function Qt(n,e,t,r,i,s){u(n.config.authDomain,n,"auth-domain-config-required"),u(n.config.apiKey,n,"invalid-api-key");const o={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:Pe,eventId:i};if(e instanceof An){e.setDefaultLanguage(n.languageCode),o.providerId=e.providerId||"",fr(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[p,f]of Object.entries({}))o[p]=f}if(e instanceof Re){const p=e.getScopes().filter(f=>f!=="");p.length>0&&(o.scopes=p.join(","))}n.tenantId&&(o.tid=n.tenantId);const l=o;for(const p of Object.keys(l))l[p]===void 0&&delete l[p];const a=await n._getAppCheckToken(),d=a?`#${Hs}=${encodeURIComponent(a)}`:"";return`${qs(n)}?${fe(l).slice(1)}${d}`}function qs({config:n}){return n.emulator?ft(n,Bs):`https://${n.authDomain}/${zs}`}/**
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
 */const st="webStorageSupport";class $s{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Mn,this._completeRedirectFn=ms,this._overrideRedirectResult=ps}async _openPopup(e,t,r,i){var o;V((o=this.eventManagers[e._key()])==null?void 0:o.manager,"_initialize() not called before _openPopup()");const s=await Qt(e,t,r,at(),i);return Ws(e,s,It())}async _openRedirect(e,t,r,i){await this._originValidation(e);const s=await Qt(e,t,r,at(),i);return Ui(s),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:i,promise:s}=this.eventManagers[t];return i?Promise.resolve(i):(V(s,"If manager is not set, promise should be"),s)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await Os(e),r=new _s(e);return t.register("authEvent",i=>(u(i==null?void 0:i.authEvent,e,"invalid-auth-event"),{status:r.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(st,{type:st},i=>{var o;const s=(o=i==null?void 0:i[0])==null?void 0:o[st];s!==void 0&&t(!!s),W(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=vs(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Pn()||En()||mt()}}const Ks=$s;var Zt="@firebase/auth",en="1.13.6";/**
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
 */class Gs{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)==null?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){u(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function Js(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function Xs(n){Pt(new kt("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:o,authDomain:l}=r.options;u(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const a={apiKey:o,authDomain:l,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:kn(n)},d=new si(r,i,s,a);return wi(d,t),d},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),Pt(new kt("auth-internal",e=>{const t=Z(e.getProvider("auth").getImmediate());return(r=>new Gs(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),Ct(Zt,en,Js(n)),Ct(Zt,en,"esm2020")}/**
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
 */const Ys=300,Qs=an("authIdTokenMaxAge")||Ys;let tn=null;const Zs=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>Qs)return;const i=t==null?void 0:t.token;tn!==i&&(tn=i,await fetch(n,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function eo(n=or()){const e=on(n,"auth");if(e.isInitialized())return e.getImmediate();const t=Ii(n,{popupRedirectResolver:Ks,persistence:[Gi,Di,Mn]}),r=an("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const s=new URL(r,location.origin);if(location.origin===s.origin){const o=Zs(s.toString());Fi(t,o,()=>o(t.currentUser)),Ni(t,l=>o(l))}}const i=sr("auth");return i&&Ei(t,`http://${i}`),t}function to(){var n;return((n=document.getElementsByTagName("head"))==null?void 0:n[0])??document}oi({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=i=>{const s=x("internal-error");s.customData=i,t(s)},r.type="text/javascript",r.charset="UTF-8",to().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});Xs("Browser");const no={apiKey:"AIzaSyEmperorDemoFallbackKey123456789",authDomain:"emperor-saas.firebaseapp.com",projectId:"emperor-saas",storageBucket:"emperor-saas.appspot.com",messagingSenderId:"100000000000",appId:"1:100000000000:web:abcdef123456"},ro=Rt().length===0?_r(no):Rt()[0],bt=eo(ro);bt.languageCode="ar";function io(n="recaptcha-container"){if(window.recaptchaVerifier)try{window.recaptchaVerifier.clear()}catch{}return window.recaptchaVerifier=new es(bt,n,{size:"invisible",callback:()=>{},"expired-callback":()=>{console.warn("reCAPTCHA expired, please retry")}}),window.recaptchaVerifier}async function so(n,e="recaptcha-container"){try{const t=io(e);return{success:!0,confirmationResult:await rs(bt,n,t)}}catch(t){return console.error("Firebase sendPhoneOtp error:",t),{success:!1,error:Hn(t),rawError:t}}}async function oo(n,e){try{const t=await n.confirm(e),r=await t.user.getIdToken();return{success:!0,user:t.user,idToken:r}}catch(t){return console.error("Firebase verifyPhoneOtp error:",t),{success:!1,error:Hn(t),rawError:t}}}function Hn(n){switch((n==null?void 0:n.code)||""){case"auth/invalid-phone-number":return"صيغة رقم الهاتف غير صالحة. يرجى إدخال الرقم مع كود الدولة الصحيح.";case"auth/missing-phone-number":return"يرجى إدخال رقم الهاتف.";case"auth/quota-exceeded":return"تم تجاوز الحد الأقصى لإرسال الرسائل، يرجى المحاولة لاحقاً.";case"auth/too-many-requests":return"محاولات كثيرة متكررة، يرجى الانتظار بضع دقائق ثم المحاولة مجدداً.";case"auth/invalid-verification-code":return"رمز التحقق (OTP) غير صحيح، يرجى التأكد وإعادة المحاولة.";case"auth/code-expired":return"انتهت صلاحية رمز التحقق، يرجى طلب رمز جديد.";case"auth/captcha-check-failed":return"فشل التحقق الأمني (reCAPTCHA)، يرجى تحديث الصفحة والمحاولة مرة أخرى.";default:return(n==null?void 0:n.message)||"حدث خطأ أثناء إرسال رمز التحقق، يرجى المحاولة لاحقاً."}}function ao({isOpen:n,onClose:e,initialPhone:t="",onVerified:r}){const{addToast:i}=nn(),{user:s,setUser:o}=rn(),[l,a]=y.useState(t||(s==null?void 0:s.phone)||""),[d,p]=y.useState(1),[f,I]=y.useState(["","","","","",""]),[P,E]=y.useState(null),[F,se]=y.useState(!1),[z,ee]=y.useState(!1),[oe,b]=y.useState(60),[B,ge]=y.useState(!1),ae=y.useRef([]);y.useEffect(()=>{t?a(t):s!=null&&s.phone&&a(s.phone)},[t,s==null?void 0:s.phone]),y.useEffect(()=>{let m;return d===2&&oe>0&&(m=setInterval(()=>{b(g=>g<=1?(ge(!0),clearInterval(m),0):g-1)},1e3)),()=>clearInterval(m)},[d,oe]);const me=m=>{let g=m.replace(/[^0-9+]/g,"");return g.startsWith("01")?"+2"+g:!g.startsWith("+")&&g.length>=9?"+"+g:g},ye=async m=>{m&&m.preventDefault();const g=me(l);if(!g||g.length<10){i("يرجى إدخال رقم هاتف صحيح مع كود الدولة","error");return}se(!0);try{const _=await so(g,"recaptcha-container");_.success&&_.confirmationResult?(E(_.confirmationResult),p(2),b(60),ge(!1),i("تم إرسال رمز التحقق SMS بنجاح!","success")):(console.warn("Firebase error, using demo fallback:",_.error),p(2),b(60),ge(!1),i("تم إرسال رمز التحقق التجريبي (كود: 123456)","info"))}catch(_){console.error("Send OTP error:",_),i("حدث خطأ أثناء إرسال الرمز، يرجى المحاولة مرة أخرى","error")}finally{se(!1)}},H=(m,g)=>{var O;if(!/^[0-9]?$/.test(g))return;const _=[...f];_[m]=g,I(_),g&&m<5&&((O=ae.current[m+1])==null||O.focus())},Je=(m,g)=>{var _;g.key==="Backspace"&&!f[m]&&m>0&&((_=ae.current[m-1])==null||_.focus())},S=async m=>{var _,O,Ne;m.preventDefault();const g=f.join("");if(g.length!==6){i("يرجى إدخال رمز التحقق المكون من 6 أرقام","error");return}ee(!0);try{let L=null;if(P){const Ie=await oo(P,g);if(Ie.success)L=Ie.idToken;else{i(Ie.error||"رمز التحقق غير صحيح","error"),ee(!1);return}}const _e=me(l),Fe=await Qn.verifyPhone({phone:_e,code:g,firebase_token:L}),ce=((_=Fe.data)==null?void 0:_.data)||Fe.data;ce&&o(ce),i("تم توثيق وتأكيد رقم الهاتف بنجاح!","success"),r&&r(ce),e()}catch(L){console.error("Verify OTP backend error:",L);const _e=((Ne=(O=L.response)==null?void 0:O.data)==null?void 0:Ne.message)||"فشل التحقق من رقم الهاتف";i(_e,"error")}finally{ee(!1)}};return c.jsxs(Tr,{isOpen:n,onClose:e,title:"توثيق وتأكيد رقم الهاتف",maxWidth:"460px",children:[c.jsx("div",{id:"recaptcha-container"}),d===1?c.jsxs("form",{onSubmit:ye,style:{display:"flex",flexDirection:"column",gap:"20px"},children:[c.jsxs("div",{style:{textAlign:"center",padding:"10px 0"},children:[c.jsx("div",{style:{width:"60px",height:"60px",borderRadius:"18px",background:"rgba(212, 165, 55, 0.15)",color:"#D4A537",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px"},children:c.jsx(Sr,{size:30})}),c.jsx("h4",{style:{margin:"0 0 6px",fontSize:"17px",fontWeight:"800",color:"#FFFFFF"},children:"تأكيد رقم الهاتف عبر رسالة SMS"}),c.jsx("p",{style:{margin:0,fontSize:"13px",color:"#9E9EA8",lineHeight:"1.5"},children:"سنقوم بإرسال رمز تحقق OTP مكون من 6 أرقام لتأكيد حسابك وضمان أمان عملياتك المالية"})]}),c.jsxs("div",{children:[c.jsx("label",{style:{display:"block",fontSize:"13px",fontWeight:"700",color:"#FFFFFF",marginBottom:"8px"},children:"رقم الهاتف مع كود الدولة"}),c.jsx(te,{type:"tel",value:l,onChange:m=>a(m.target.value),placeholder:"+2010XXXXXXXX أو 010XXXXXXXX",required:!0,style:{direction:"ltr",textAlign:"center",fontSize:"16px",fontWeight:"700"}})]}),c.jsx(le,{type:"submit",variant:"primary",isLoading:F,style:{width:"100%"},children:"إرسال رمز التحقق"})]}):c.jsxs("form",{onSubmit:S,style:{display:"flex",flexDirection:"column",gap:"22px"},children:[c.jsxs("div",{style:{textAlign:"center"},children:[c.jsx("div",{style:{width:"60px",height:"60px",borderRadius:"18px",background:"rgba(34, 197, 94, 0.15)",color:"#22C55E",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px"},children:c.jsx(Pr,{size:30})}),c.jsx("h4",{style:{margin:"0 0 6px",fontSize:"17px",fontWeight:"800",color:"#FFFFFF"},children:"أدخل رمز التحقق (OTP)"}),c.jsxs("p",{style:{margin:0,fontSize:"13px",color:"#9E9EA8"},children:["تم إرسال الرمز إلى ",c.jsx("span",{style:{color:"#D4A537",fontWeight:"700",direction:"ltr",display:"inline-block"},children:l})]})]}),c.jsx("div",{style:{display:"flex",justifyContent:"center",gap:"8px",direction:"ltr"},children:f.map((m,g)=>c.jsx("input",{ref:_=>ae.current[g]=_,type:"text",inputMode:"numeric",maxLength:1,value:m,onChange:_=>H(g,_.target.value),onKeyDown:_=>Je(g,_),style:{width:"46px",height:"52px",borderRadius:"12px",background:"rgba(13, 13, 16, 0.9)",border:`2px solid ${m?"#D4A537":"rgba(255, 255, 255, 0.15)"}`,color:"#FFFFFF",fontSize:"22px",fontWeight:"900",textAlign:"center",outline:"none",transition:"all 0.2s ease",fontFamily:"monospace"}},g))}),c.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",fontSize:"13px"},children:[c.jsx("button",{type:"button",onClick:()=>p(1),style:{background:"transparent",border:"none",color:"#9E9EA8",cursor:"pointer",padding:0,fontSize:"12px"},children:"تغيير رقم الهاتف"}),c.jsx("div",{children:B?c.jsxs("button",{type:"button",onClick:ye,style:{background:"transparent",border:"none",color:"#D4A537",cursor:"pointer",fontWeight:"700",fontSize:"12px",display:"flex",alignItems:"center",gap:"4px"},children:[c.jsx(sn,{size:13}),c.jsx("span",{children:"إعادة إرسال الرمز"})]}):c.jsxs("span",{style:{color:"#656570",fontSize:"12px"},children:["إعادة الإرسال خلال (",oe," ثانية)"]})})]}),c.jsx(le,{type:"submit",variant:"primary",isLoading:z,style:{width:"100%"},children:"تأكيد وتوثيق الرقم"})]})]})}function No(){var vt,xt;const{user:n,refreshProfile:e,setUser:t}=rn(),{addToast:r}=nn(),{t:i,isRtl:s,language:o}=Zn(),{theme:l}=er(),a=l==="light",d=y.useRef(null),[p,f]=tr(),I=window.location.pathname.startsWith("/security"),P=p.get("tab")==="security"||I?"security":"info",[E,F]=y.useState(P);y.useEffect(()=>{const h=p.get("tab");h==="security"||window.location.pathname.startsWith("/security")?F("security"):h==="info"&&F("info")},[p]);const[se,z]=y.useState(!1),[ee,oe]=y.useState(!1),[b,B]=y.useState({name:(n==null?void 0:n.name)||"",phone:(n==null?void 0:n.phone)||"",country:(n==null?void 0:n.country)||"EG",currency:(n==null?void 0:n.currency)||"EGP"}),[ge,ae]=y.useState(!1),[me,ye]=y.useState(!1),[H,Je]=y.useState(null);y.useEffect(()=>{nr.getBalance().then(h=>{var v;return Je(((v=h==null?void 0:h.data)==null?void 0:v.data)||(h==null?void 0:h.data)||h||null)}).catch(()=>{})},[]);const[S,m]=y.useState({current_password:"",password:"",password_confirmation:""}),[g,_]=y.useState(!1),[O,Ne]=y.useState(!1),[L,_e]=y.useState(!1),[Fe,ce]=y.useState(!1),[Ie,Xe]=y.useState(!1);rr.useEffect(()=>{n&&B({name:n.name||"",phone:n.phone||"",country:n.country||"EG",currency:n.currency||"EGP"})},[n]);const qn=async h=>{var v,q,$;h.preventDefault(),ae(!0);try{const R=await Ye.updateProfile(b),D=((v=R.data)==null?void 0:v.data)||R.data;D&&(t(D),ir()),r(i("profileUpdatedSuccess","تم تحديث البيانات الشخصية بنجاح"),"success")}catch(R){console.error("Update profile error:",R);const D=(($=(q=R.response)==null?void 0:q.data)==null?void 0:$.message)||i("profileUpdateFailed","فشل تحديث البيانات، يرجى المحاولة لاحقاً");r(D,"error")}finally{ae(!1)}},$n=async h=>{var $,R;const v=($=h.target.files)==null?void 0:$[0];if(!v)return;if(v.size>2*1024*1024){r(i("maxAvatarSize","الحد الأقصى لحجم الصورة هو 2 ميجابايت"),"error");return}ye(!0);const q=new FormData;q.append("avatar",v);try{const D=await Ye.updateProfile(q),Tt=((R=D.data)==null?void 0:R.data)||D.data;Tt&&t(Tt),r(i("avatarUpdatedSuccess","تم تحديث الصورة الشخصية بنجاح"),"success")}catch(D){console.error("Avatar upload error:",D),r(i("avatarUploadFailed","فشل رفع الصورة الشخصية"),"error")}finally{ye(!1)}},Kn=async h=>{var v,q;if(h.preventDefault(),S.password!==S.password_confirmation){r(i("passwordMismatch","تأكيد كلمة المرور غير متطابق"),"error");return}if(S.password.length<8){r(i("passwordMinLength","يجب ألا تقل كلمة المرور الجديدة عن 8 أحرف وأرقام"),"error");return}ce(!0);try{await Ye.updatePassword(S),r(i("passwordChangedSuccess","تم تغيير كلمة المرور بنجاح"),"success"),m({current_password:"",password:"",password_confirmation:""})}catch($){console.error("Password change error:",$);const R=((q=(v=$.response)==null?void 0:v.data)==null?void 0:q.message)||i("passwordChangeFailed","فشل تغيير كلمة المرور، يرجى التأكد من كلمة المرور الحالية");r(R,"error")}finally{ce(!1)}},Gn=()=>{n!=null&&n.referral_code&&(navigator.clipboard.writeText(n.referral_code),z(!0),r(i("copied","تم النسخ بنجاح"),"success"),setTimeout(()=>z(!1),2e3))},Jn=[{value:"EG",label:o==="en"?"🇪🇬 Egypt":"🇪🇬 مصر"},{value:"SA",label:o==="en"?"🇸🇦 Saudi Arabia":"🇸🇦 السعودية"},{value:"AE",label:o==="en"?"🇦🇪 UAE":"🇦🇪 الإمارات"},{value:"KW",label:o==="en"?"🇰🇼 Kuwait":"🇰🇼 الكويت"},{value:"SY",label:o==="en"?"🇸🇾 Syria":"🇸🇾 سوريا"},{value:"IQ",label:o==="en"?"🇮🇶 Iraq":"🇮🇶 العراق"},{value:"JO",label:o==="en"?"🇯🇴 Jordan":"🇯🇴 الأردن"},{value:"OTHER",label:o==="en"?"Other":"دولة أخرى"}],Xn=[{value:"EGP",label:o==="en"?"EGP — Egyptian Pound":"EGP — جنيه مصري"},{value:"USD",label:o==="en"?"USD — US Dollar":"USD — دولار أمريكي"},{value:"SAR",label:o==="en"?"SAR — Saudi Riyal":"SAR — ريال سعودي"},{value:"SYP",label:o==="en"?"SYP — Syrian Pound":"SYP — ليرة سورية"}];return c.jsx(Ir,{children:c.jsxs("div",{style:{width:"100%",maxWidth:"100%",margin:"0",padding:"10px 0 60px"},children:[c.jsxs("div",{style:{background:a?"#FFFFFF":"linear-gradient(135deg, #09172e 0%, #060e1d 100%)",border:a?"1.5px solid rgba(212, 165, 55, 0.45)":"1.5px solid rgba(56, 189, 248, 0.4)",borderRadius:"24px",padding:"clamp(18px, 3.5vw, 30px)",marginBottom:"28px",position:"relative",overflow:"hidden",boxShadow:a?"0 10px 30px rgba(30, 80, 140, 0.08)":"0 12px 35px rgba(0, 0, 0, 0.6), 0 0 25px rgba(56, 189, 248, 0.15)"},children:[c.jsx("div",{style:{position:"absolute",top:"-60px",left:"-60px",width:"200px",height:"200px",borderRadius:"50%",background:"radial-gradient(circle, rgba(212, 165, 55, 0.15) 0%, transparent 70%)",pointerEvents:"none"}}),c.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"24px",position:"relative",zIndex:1},children:[c.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"20px",flexWrap:"wrap"},children:[c.jsxs("div",{style:{position:"relative"},children:[c.jsx("div",{style:{width:"84px",height:"84px",borderRadius:"24px",background:n!=null&&n.avatar_url?`url(${n.avatar_url}) center/cover no-repeat`:a?"#FEFCE8":"linear-gradient(135deg, #2A2A35 0%, #1A1A22 100%)",border:"2px solid #D4A537",display:"flex",alignItems:"center",justifyContent:"center",color:a?"#B45309":"#D4A537",fontSize:"32px",fontWeight:"900",boxShadow:"0 0 20px rgba(212, 165, 55, 0.25)",overflow:"hidden"},children:!(n!=null&&n.avatar_url)&&(n!=null&&n.name?n.name[0].toUpperCase():"U")}),c.jsx("button",{onClick:()=>{var h;return(h=d.current)==null?void 0:h.click()},disabled:me,title:i("changeAvatar","تغيير الصورة الشخصية"),style:{position:"absolute",bottom:"-4px",right:s?"-4px":"auto",left:s?"auto":"-4px",width:"30px",height:"30px",borderRadius:"10px",background:"#D4A537",color:"#0D0D0F",border:a?"2px solid #FFFFFF":"2px solid #1A1A22",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",transition:"all 0.2s ease",boxShadow:"0 2px 8px rgba(0,0,0,0.2)"},children:me?c.jsx(sn,{size:14,className:"spin"}):c.jsx(Lr,{size:14})}),c.jsx("input",{ref:d,type:"file",accept:"image/*",onChange:$n,style:{display:"none"}})]}),c.jsxs("div",{children:[c.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px",marginBottom:"6px"},children:[c.jsx("h2",{style:{margin:0,fontSize:"22px",fontWeight:"900",color:a?"#0F172A":"#FFFFFF"},children:(n==null?void 0:n.name)||i("emperorUser","مستخدم سند ومهره")}),c.jsx("span",{style:{padding:"2px 8px",borderRadius:"6px",background:"linear-gradient(135deg, #D4A537 0%, #AA7C11 100%)",color:"#0D0D0F",fontSize:"11px",fontWeight:"800"},children:(n==null?void 0:n.role)==="admin"?i("vipMember","VIP MEMBER"):i("storeMember","STORE MEMBER")})]}),c.jsxs("p",{style:{margin:"0 0 8px",fontSize:"14px",color:a?"#475569":"#9E9EA8",display:"flex",alignItems:"center",gap:"6px"},children:[c.jsx(Cr,{size:14}),c.jsx("span",{children:(n==null?void 0:n.email)||"—"})]}),(n==null?void 0:n.referral_code)&&c.jsxs("div",{style:{display:"inline-flex",alignItems:"center",gap:"8px",background:a?"#FEFCE8":"rgba(212, 165, 55, 0.1)",border:a?"1px solid rgba(212, 165, 55, 0.4)":"1px solid rgba(212, 165, 55, 0.25)",padding:"4px 10px",borderRadius:"8px",fontSize:"12px",color:a?"#92400E":"#F3E5AB",fontWeight:"700"},children:[c.jsxs("span",{children:[i("referralCodeColon","كود الإحالة:")," ",n.referral_code]}),c.jsx("button",{onClick:Gn,style:{background:"transparent",border:"none",color:a?"#B45309":"#D4A537",cursor:"pointer",padding:0},children:se?c.jsx(Rr,{size:14}):c.jsx(Ar,{size:14})})]})]})]}),c.jsxs("div",{style:{background:a?"#F8FAFC":"rgba(9, 23, 46, 0.85)",border:a?"1px solid #CBD5E1":"1.5px solid rgba(56, 189, 248, 0.35)",borderRadius:"16px",padding:"16px 20px",minWidth:"200px",textAlign:"center",boxShadow:a?"0 4px 12px rgba(30, 80, 140, 0.05)":"none"},children:[c.jsx("span",{style:{fontSize:"12px",color:a?"#64748B":"#94A3B8",display:"block",marginBottom:"4px"},children:i("availableBalanceInWallet","الرصيد المتاح بالمحفظة")}),c.jsxs("div",{style:{fontSize:"24px",fontWeight:"900",color:a?"#B45309":"#38BDF8",marginBottom:"8px"},children:[Number((H==null?void 0:H.preferred_balance)??((vt=n==null?void 0:n.wallet)==null?void 0:vt.balance)??(n==null?void 0:n.wallet_balance)??0).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})," ",c.jsx("span",{style:{fontSize:"14px"},children:wr((n==null?void 0:n.currency)||(H==null?void 0:H.preferred_currency)||((xt=n==null?void 0:n.wallet)==null?void 0:xt.currency)||"EGP",o)})]}),c.jsxs(we,{to:"/wallet",style:{display:"inline-flex",alignItems:"center",gap:"6px",fontSize:"12px",color:a?"#92400E":"#F3E5AB",textDecoration:"none",fontWeight:"700"},children:[c.jsx("span",{children:i("manageAndChargeWallet","شحن وإدارة المحفظة")}),c.jsx(Nr,{size:12})]})]})]})]}),c.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(180px, 1fr))",gap:"12px",marginBottom:"28px"},children:[c.jsxs(we,{to:"/orders",style:{background:a?"#FFFFFF":"rgba(22, 22, 30, 0.7)",border:a?"1.5px solid rgba(212, 165, 55, 0.35)":"1px solid rgba(255, 255, 255, 0.08)",borderRadius:"14px",padding:"14px 18px",display:"flex",alignItems:"center",gap:"12px",textDecoration:"none",color:a?"#0F172A":"#FFFFFF",transition:"all 0.2s ease",boxShadow:a?"0 4px 12px rgba(30, 80, 140, 0.05)":"none"},onMouseEnter:h=>h.currentTarget.style.borderColor="#D4A537",onMouseLeave:h=>h.currentTarget.style.borderColor=a?"rgba(212, 165, 55, 0.35)":"rgba(255, 255, 255, 0.08)",children:[c.jsx(Er,{size:20,color:"#D4A537"}),c.jsxs("div",{children:[c.jsx("div",{style:{fontSize:"14px",fontWeight:"700"},children:i("myOrdersHistory","سجل طلباتي")}),c.jsx("div",{style:{fontSize:"11px",color:a?"#64748B":"#9E9EA8"},children:i("trackShippingStatus","تتبع حالة الشحن")})]})]}),c.jsxs(we,{to:"/target/apps",style:{background:a?"#FFFFFF":"linear-gradient(145deg, #09172e 0%, #060e1d 100%)",border:a?"1.5px solid rgba(212, 165, 55, 0.35)":"1px solid rgba(56, 189, 248, 0.35)",borderRadius:"14px",padding:"14px 18px",display:"flex",alignItems:"center",gap:"12px",textDecoration:"none",color:a?"#0F172A":"#FFFFFF",transition:"all 0.2s ease",boxShadow:a?"0 4px 12px rgba(30, 80, 140, 0.05)":"none"},onMouseEnter:h=>h.currentTarget.style.borderColor="#38BDF8",onMouseLeave:h=>h.currentTarget.style.borderColor=a?"rgba(212, 165, 55, 0.35)":"rgba(56, 189, 248, 0.35)",children:[c.jsx(br,{size:20,color:"#38BDF8"}),c.jsxs("div",{children:[c.jsx("div",{style:{fontSize:"14px",fontWeight:"700"},children:i("targetSelling","بيع التارجت")}),c.jsx("div",{style:{fontSize:"11px",color:a?"#64748B":"#94A3B8"},children:i("transferAppProfits","تحويل أرباح التطبيقات")})]})]}),c.jsxs(we,{to:"/referrals",style:{background:a?"#FFFFFF":"linear-gradient(145deg, #09172e 0%, #060e1d 100%)",border:a?"1.5px solid rgba(212, 165, 55, 0.35)":"1px solid rgba(56, 189, 248, 0.35)",borderRadius:"14px",padding:"14px 18px",display:"flex",alignItems:"center",gap:"12px",textDecoration:"none",color:a?"#0F172A":"#FFFFFF",transition:"all 0.2s ease",boxShadow:a?"0 4px 12px rgba(30, 80, 140, 0.05)":"none"},onMouseEnter:h=>h.currentTarget.style.borderColor="#38BDF8",onMouseLeave:h=>h.currentTarget.style.borderColor=a?"rgba(212, 165, 55, 0.35)":"rgba(56, 189, 248, 0.35)",children:[c.jsx(vr,{size:20,color:"#22C55E"}),c.jsxs("div",{children:[c.jsx("div",{style:{fontSize:"14px",fontWeight:"700"},children:i("referralProgram","برنامج الإحالات")}),c.jsx("div",{style:{fontSize:"11px",color:a?"#64748B":"#94A3B8"},children:i("profitsAndCommissions","الأرباح والعمولات")})]})]}),c.jsxs(we,{to:"/settings",style:{background:a?"#FFFFFF":"linear-gradient(145deg, #09172e 0%, #060e1d 100%)",border:a?"1.5px solid rgba(212, 165, 55, 0.35)":"1px solid rgba(56, 189, 248, 0.35)",borderRadius:"14px",padding:"14px 18px",display:"flex",alignItems:"center",gap:"12px",textDecoration:"none",color:a?"#0F172A":"#FFFFFF",transition:"all 0.2s ease",boxShadow:a?"0 4px 12px rgba(30, 80, 140, 0.05)":"none"},onMouseEnter:h=>h.currentTarget.style.borderColor="#38BDF8",onMouseLeave:h=>h.currentTarget.style.borderColor=a?"rgba(212, 165, 55, 0.35)":"rgba(56, 189, 248, 0.35)",children:[c.jsx(xr,{size:20,color:"#F59E0B"}),c.jsxs("div",{children:[c.jsx("div",{style:{fontSize:"14px",fontWeight:"700"},children:i("accountSettings","إعدادات الحساب")}),c.jsx("div",{style:{fontSize:"11px",color:a?"#64748B":"#94A3B8"},children:i("preferencesAndAppearance","التفضيلات والمظهر")})]})]})]}),c.jsxs("div",{style:{display:"flex",gap:"12px",marginBottom:"24px",borderBottom:"1px solid rgba(255, 255, 255, 0.08)",paddingBottom:"12px"},children:[c.jsxs("button",{onClick:()=>{F("info"),f({tab:"info"},{replace:!0})},style:{display:"flex",alignItems:"center",gap:"8px",padding:"10px 22px",borderRadius:"12px",fontSize:"14px",fontWeight:"700",fontFamily:"var(--font-cairo)",cursor:"pointer",transition:"all 0.2s ease",background:E==="info"?"linear-gradient(135deg, #D4A537 0%, #AA7C11 100%)":a?"#F1F5F9":"rgba(255, 255, 255, 0.05)",color:E==="info"?"#0D0D0F":a?"#475569":"#9E9EA8",border:E==="info"?"none":a?"1px solid #E2E8F0":"1px solid rgba(255, 255, 255, 0.08)"},children:[c.jsx(Fr,{size:16}),c.jsx("span",{children:i("basicInfo","البيانات الأساسية")})]}),c.jsxs("button",{onClick:()=>{F("security"),f({tab:"security"},{replace:!0})},style:{display:"flex",alignItems:"center",gap:"8px",padding:"10px 22px",borderRadius:"12px",fontSize:"14px",fontWeight:"700",fontFamily:"var(--font-cairo)",cursor:"pointer",transition:"all 0.2s ease",background:E==="security"?"linear-gradient(135deg, #D4A537 0%, #AA7C11 100%)":a?"#F1F5F9":"rgba(255, 255, 255, 0.05)",color:E==="security"?"#0D0D0F":a?"#475569":"#9E9EA8",border:E==="security"?"none":a?"1px solid #E2E8F0":"1px solid rgba(255, 255, 255, 0.08)"},children:[c.jsx(At,{size:16}),c.jsx("span",{children:i("securityAndPassword","الأمان وكلمة المرور")})]})]}),E==="info"&&c.jsxs("div",{style:{background:a?"#FFFFFF":"linear-gradient(145deg, #09172e 0%, #060e1d 100%)",border:a?"1px solid #E2E8F0":"1.5px solid rgba(56, 189, 248, 0.35)",borderRadius:"20px",padding:"28px",boxShadow:a?"0 4px 20px rgba(0, 0, 0, 0.04)":"0 8px 30px rgba(0, 0, 0, 0.5)"},children:[c.jsx("h3",{style:{margin:"0 0 20px",fontSize:"18px",fontWeight:"800",color:a?"#0F172A":"#F5D061"},children:i("editPersonalInfo","تعديل البيانات الشخصية")}),c.jsxs("form",{onSubmit:qn,children:[c.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(min(100%, 260px), 1fr))",gap:"20px",marginBottom:"24px"},children:[c.jsxs("div",{children:[c.jsx("label",{style:{display:"block",fontSize:"13px",fontWeight:"700",color:a?"#475569":"#B8B8C2",marginBottom:"8px"},children:i("fullName","الاسم الكامل")}),c.jsx(te,{type:"text",value:b.name,onChange:h=>B({...b,name:h.target.value}),placeholder:i("enterFullName","أدخل اسمك الكامل"),required:!0})]}),c.jsxs("div",{children:[c.jsx("label",{style:{display:"block",fontSize:"13px",fontWeight:"700",color:a?"#475569":"#B8B8C2",marginBottom:"8px"},children:i("emailNonEditable","البريد الإلكتروني (غير قابل للتعديل)")}),c.jsx(te,{type:"email",value:(n==null?void 0:n.email)||"",disabled:!0,style:{opacity:.6,cursor:"not-allowed"}})]}),c.jsxs("div",{children:[c.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"8px"},children:[c.jsx("label",{style:{fontSize:"13px",fontWeight:"700",color:a?"#475569":"#B8B8C2"},children:i("phoneWhatsapp","رقم الهاتف / الواتساب")}),n!=null&&n.phone_verified_at?c.jsxs("span",{style:{fontSize:"11px",color:"#22C55E",fontWeight:"700",display:"flex",alignItems:"center",gap:"4px"},children:[c.jsx(St,{size:13})," ",i("verifiedAndConfirmed","موثق ومؤكد")]}):c.jsx("button",{type:"button",onClick:()=>oe(!0),style:{background:"rgba(212, 165, 55, 0.15)",border:"1px solid rgba(212, 165, 55, 0.3)",color:"#D4A537",borderRadius:"6px",padding:"2px 8px",fontSize:"11px",fontWeight:"800",cursor:"pointer"},children:i("verifyPhoneSMS","تأكيد وتوثيق الرقم (SMS)")})]}),c.jsx(te,{type:"tel",value:b.phone,onChange:h=>B({...b,phone:h.target.value}),placeholder:"010XXXXXXXX"})]}),c.jsxs("div",{children:[c.jsx("label",{style:{display:"block",fontSize:"13px",fontWeight:"700",color:a?"#475569":"#B8B8C2",marginBottom:"8px"},children:i("country","الدولة")}),c.jsx(Nt,{value:b.country,onChange:h=>B({...b,country:h.target.value}),options:Jn})]}),c.jsxs("div",{children:[c.jsx("label",{style:{display:"block",fontSize:"13px",fontWeight:"700",color:a?"#475569":"#B8B8C2",marginBottom:"8px"},children:i("defaultCurrency","العملة الافتراضية")}),c.jsx(Nt,{value:b.currency,onChange:h=>B({...b,currency:h.target.value}),options:Xn})]})]}),c.jsx("div",{style:{display:"flex",justifyContent:"flex-end"},children:c.jsx(le,{type:"submit",variant:"primary",isLoading:ge,style:{minWidth:"160px"},children:i("saveChanges","حفظ التغييرات")})})]})]}),E==="security"&&c.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"24px"},children:[c.jsxs("div",{style:{background:a?"#FFFFFF":"linear-gradient(145deg, #09172e 0%, #060e1d 100%)",border:a?"1px solid #E2E8F0":"1.5px solid rgba(56, 189, 248, 0.35)",borderRadius:"20px",padding:"28px",boxShadow:a?"0 4px 20px rgba(0, 0, 0, 0.04)":"0 8px 30px rgba(0, 0, 0, 0.5)"},children:[c.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px",marginBottom:"20px"},children:[c.jsx(Or,{size:20,color:"#38BDF8"}),c.jsx("h3",{style:{margin:0,fontSize:"18px",fontWeight:"800",color:a?"#0F172A":"#F5D061"},children:i("changePassword","تغيير كلمة المرور")})]}),c.jsxs("form",{onSubmit:Kn,children:[c.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(min(100%, 250px), 1fr))",gap:"20px",marginBottom:"24px"},children:[c.jsxs("div",{children:[c.jsx("label",{style:{display:"block",fontSize:"13px",fontWeight:"700",color:a?"#475569":"#B8B8C2",marginBottom:"8px"},children:i("currentPassword","كلمة المرور الحالية")}),c.jsxs("div",{style:{position:"relative"},children:[c.jsx(te,{type:g?"text":"password",value:S.current_password,onChange:h=>m({...S,current_password:h.target.value}),placeholder:"••••••••",required:!0}),c.jsx("button",{type:"button",onClick:()=>_(!g),style:{position:"absolute",left:s?"12px":"auto",right:s?"auto":"12px",top:"50%",transform:"translateY(-50%)",background:"none",border:"none",color:"#8E8E98",cursor:"pointer"},children:g?c.jsx(Qe,{size:16}):c.jsx(Ze,{size:16})})]})]}),c.jsxs("div",{children:[c.jsx("label",{style:{display:"block",fontSize:"13px",fontWeight:"700",color:a?"#475569":"#B8B8C2",marginBottom:"8px"},children:i("newPassword","كلمة المرور الجديدة")}),c.jsxs("div",{style:{position:"relative"},children:[c.jsx(te,{type:O?"text":"password",value:S.password,onChange:h=>m({...S,password:h.target.value}),placeholder:i("newPasswordHint","8 أحرف وأرقام على الأقل"),required:!0}),c.jsx("button",{type:"button",onClick:()=>Ne(!O),style:{position:"absolute",left:s?"12px":"auto",right:s?"auto":"12px",top:"50%",transform:"translateY(-50%)",background:"none",border:"none",color:"#8E8E98",cursor:"pointer"},children:O?c.jsx(Qe,{size:16}):c.jsx(Ze,{size:16})})]})]}),c.jsxs("div",{children:[c.jsx("label",{style:{display:"block",fontSize:"13px",fontWeight:"700",color:a?"#475569":"#B8B8C2",marginBottom:"8px"},children:i("confirmNewPassword","تأكيد كلمة المرور الجديدة")}),c.jsxs("div",{style:{position:"relative"},children:[c.jsx(te,{type:L?"text":"password",value:S.password_confirmation,onChange:h=>m({...S,password_confirmation:h.target.value}),placeholder:i("reenterPassword","أعد كتابة كلمة المرور"),required:!0}),c.jsx("button",{type:"button",onClick:()=>_e(!L),style:{position:"absolute",left:s?"12px":"auto",right:s?"auto":"12px",top:"50%",transform:"translateY(-50%)",background:"none",border:"none",color:"#8E8E98",cursor:"pointer"},children:L?c.jsx(Qe,{size:16}):c.jsx(Ze,{size:16})})]})]})]}),c.jsx("div",{style:{display:"flex",justifyContent:"flex-end"},children:c.jsx(le,{type:"submit",variant:"primary",isLoading:Fe,style:{minWidth:"160px"},children:i("updatePassword","تحديث كلمة المرور")})})]})]}),c.jsxs("div",{style:{background:a?"#FFFFFF":"rgba(22, 22, 30, 0.8)",border:a?"1px solid #E2E8F0":"1px solid rgba(255, 255, 255, 0.08)",borderRadius:"20px",padding:"28px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"20px",boxShadow:a?"0 4px 20px rgba(0, 0, 0, 0.04)":"none"},children:[c.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"16px"},children:[c.jsx("div",{style:{width:"48px",height:"48px",borderRadius:"14px",background:n!=null&&n.two_factor_confirmed_at?"rgba(34, 197, 94, 0.15)":"rgba(212, 165, 55, 0.15)",border:`1px solid ${n!=null&&n.two_factor_confirmed_at?"rgba(34, 197, 94, 0.3)":"rgba(212, 165, 55, 0.3)"}`,color:n!=null&&n.two_factor_confirmed_at?"#22C55E":"#D4A537",display:"flex",alignItems:"center",justifyContent:"center"},children:c.jsx(At,{size:24})}),c.jsxs("div",{children:[c.jsx("h4",{style:{margin:"0 0 4px",fontSize:"16px",fontWeight:"800",color:a?"#0F172A":"#FFFFFF"},children:i("twoFactorAuth","المصادقة الثنائية (2FA Authentication)")}),c.jsx("p",{style:{margin:0,fontSize:"13px",color:a?"#64748B":"#9E9EA8"},children:n!=null&&n.two_factor_confirmed_at?i("twoFactorActiveDesc","المصادقة الثنائية مفعلة ونشطة لحماية معاملاتك المالية"):i("twoFactorInactiveDesc","تفعيل طبقة أمان إضافية لحماية حسابك عبر تطبيق Google Authenticator")})]})]}),c.jsx("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:n!=null&&n.two_factor_confirmed_at?c.jsxs(c.Fragment,{children:[c.jsxs("span",{style:{display:"inline-flex",alignItems:"center",gap:"6px",padding:"8px 16px",borderRadius:"10px",background:"rgba(34, 197, 94, 0.15)",color:"#16A34A",fontSize:"13px",fontWeight:"800"},children:[c.jsx(St,{size:16})," ",i("activeSuccess","مفعلة بنجاح")]}),c.jsx(le,{variant:"outline",size:"sm",onClick:()=>Xe(!0),style:{borderColor:a?"#CBD5E1":"rgba(255, 255, 255, 0.15)",color:a?"#334155":"#CBD5E1"},children:i("manageRecoveryCodes","إدارة ورموز الاسترداد")})]}):c.jsx(le,{variant:"outline",onClick:()=>Xe(!0),style:{borderColor:"rgba(212, 165, 55, 0.4)",color:a?"#92400E":"#F3E5AB"},children:i("enable2FA","تفعيل المصادقة الثنائية")})})]})]}),c.jsx(kr,{isOpen:Ie,onClose:()=>Xe(!1),isEnabled:!!(n!=null&&n.two_factor_confirmed_at),onStatusChange:()=>{e()}}),c.jsx(ao,{isOpen:ee,onClose:()=>oe(!1),initialPhone:b.phone,onVerified:h=>{h!=null&&h.phone&&B(v=>({...v,phone:h.phone}))}})]})})}export{No as default};
