import{c as on,h as gt,f as an,r as m,j as o,R as $e,q as Yn,s as fe,C as lt,a as Qn,g as Zn,m as er,L as Se}from"./app-BtR7Jm72.js";import{_ as U,g as ye,a as cn,b as ln,c as tr,d as nr,q as Ee,E as mt,e as dt,i as yt,p as rr,f as ir,h as sr,D as or,j as ar,F as xt,L as cr,k as dn,S as Fe,l as N,m as lr,n as dr,o as ur,r as hr,s as At,t as Rt,u as Ft,v as pr,w as Nt,x as fr,C as gr,M as mr}from"./MainLayout-CaDLilOZ.js";import{I as ne}from"./Input-BKTFkmZh.js";import{B as R}from"./Button-CCwCU9aX.js";import{S as Ot}from"./Select-BQ44oZas.js";import{M as un}from"./Modal-BzOgQWpD.js";import{S as hn}from"./smartphone-JA1GrZBy.js";import{S as yr}from"./shield-check-CgzoriL8.js";import{Q as xr}from"./qr-code-BlDQBh7R.js";import{a as ut,b as ht}from"./headphones-pgKO_3Nz.js";import{E as Ue}from"./eye-off-DaH2Nv2h.js";import{E as ze}from"./eye-OSDkL4b0.js";import{M as _r}from"./mail-BVLFljJ5.js";import{E as wr}from"./external-link-gOxXvL4s.js";import{g as br,d as Ir,U as vr,h as Er}from"./UserSidebarDrawer-BcuiqbDo.js";import{U as Sr}from"./user-CDzDxTBk.js";import{S as Dt}from"./shield-DqAzcGm5.js";import{L as Tr}from"./lock-BmpsIo9j.js";import"./index-BCn5QfZZ.js";import"./settingsHelper-CLAf-a-6.js";import"./phone-CysW_Std.js";import"./message-circle-Cyd5hxmx.js";import"./trending-up-CMZinFLx.js";/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pn={name:"camera",size:24,node:[["path",{d:"M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z",key:"18u6gg"}],["circle",{cx:"12",cy:"13",r:"3",key:"1vg3eu"}]]};pn.node;const kr=on(pn);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fn={name:"download",size:24,node:[["path",{d:"M12 15V3",key:"m9g1x1"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["path",{d:"m7 10 5 5 5-5",key:"brsn70"}]]};fn.node;const Cr=on(fn);function gn(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Pr=gn,mn=new mt("auth","Firebase",gn());/**
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
 */const Ke=new cr("@firebase/auth");function We(n,...e){Ke.logLevel<=dn.WARN&&Ke.warn(`Auth (${Fe}): ${n}`,...e)}function Be(n,...e){Ke.logLevel<=dn.ERROR&&Ke.error(`Auth (${Fe}): ${n}`,...e)}/**
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
 */function J(n,...e){throw wt(n,...e)}function F(n,...e){return wt(n,...e)}function _t(n,e,t){const r={...Pr(),[e]:t};return new mt("auth","Firebase",r).create(e,{appName:n.name})}function ae(n){return _t(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function wt(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return mn.create(n,...e)}function h(n,e,...t){if(!n)throw wt(e,...t)}function K(n){const e="INTERNAL ASSERTION FAILED: "+n;throw Be(e),new Error(e)}function X(n,e){n||K(e)}/**
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
 */function pt(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.href)||""}function yn(){return Lt()==="http:"||Lt()==="https:"}function Lt(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.protocol)||null}/**
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
 */function Ar(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(yn()||ar()||"connection"in navigator)?navigator.onLine:!0}function Rr(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
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
 */class Ne{constructor(e,t){this.shortDelay=e,this.longDelay=t,X(t>e,"Short delay should be less than long delay!"),this.isMobile=ir()||sr()}get(){return Ar()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function bt(n,e){X(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
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
 */class xn{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;K("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;K("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;K("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const Fr={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const Nr=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],Or=new Ne(3e4,6e4);function z(n,e){return n.tenantId&&!e.tenantId?{...e,tenantId:n.tenantId}:e}async function j(n,e,t,r,i={}){return _n(n,i,async()=>{let s={},a={};r&&(e==="GET"?a=r:s={body:JSON.stringify(r)});const l=Ee({...a,key:n.config.apiKey}).slice(1),c=await n._getAdditionalHeaders();c["Content-Type"]="application/json",n.languageCode&&(c["X-Firebase-Locale"]=n.languageCode);const d={method:e,headers:c,...s};return hr()||(d.referrerPolicy="strict-origin-when-cross-origin"),n.emulatorConfig&&yt(n.emulatorConfig.host)&&(d.credentials="include"),xn.fetch()(await wn(n,n.config.apiHost,t,l),d)})}async function _n(n,e,t){n._canInitEmulator=!1;const r={...Fr,...e};try{const i=new Lr(n),s=await Promise.race([t(),i.promise]);i.clearNetworkTimeout();const a=await s.json();if("needConfirmation"in a)throw Te(n,"account-exists-with-different-credential",a);if(s.ok&&!("errorMessage"in a))return a;{const l=s.ok?a.errorMessage:a.error.message,[c,d]=l.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw Te(n,"credential-already-in-use",a);if(c==="EMAIL_EXISTS")throw Te(n,"email-already-in-use",a);if(c==="USER_DISABLED")throw Te(n,"user-disabled",a);const p=r[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(d)throw _t(n,p,d);J(n,p)}}catch(i){if(i instanceof xt)throw i;J(n,"network-request-failed",{message:String(i)})}}async function Ze(n,e,t,r,i={}){const s=await j(n,e,t,r,i);return"mfaPendingCredential"in s&&J(n,"multi-factor-auth-required",{_serverResponse:s}),s}async function wn(n,e,t,r){const i=`${e}${t}?${r}`,s=n,a=s.config.emulator?bt(n.config,i):`${n.config.apiScheme}://${i}`;return Nr.includes(t)&&(await s._persistenceManagerAvailable,s._getPersistenceType()==="COOKIE")?s._getPersistence()._getFinalTarget(a).toString():a}function Dr(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class Lr{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(F(this.auth,"network-request-failed")),Or.get())})}}function Te(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const i=F(n,e,r);return i.customData._tokenResponse=t,i}/**
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
 */function jt(n){return n!==void 0&&n.getResponse!==void 0}function Mt(n){return n!==void 0&&n.enterprise!==void 0}class bn{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return Dr(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}/**
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
 */async function jr(n){return(await j(n,"GET","/v1/recaptchaParams")).recaptchaSiteKey||""}async function In(n,e){return j(n,"GET","/v2/recaptchaConfig",z(n,e))}/**
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
 */async function Mr(n,e){return j(n,"POST","/v1/accounts:delete",e)}async function Ge(n,e){return j(n,"POST","/v1/accounts:lookup",e)}/**
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
 */function ke(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Ur(n,e=!1){const t=ye(n),r=await t.getIdToken(e),i=It(r);h(i&&i.exp&&i.auth_time&&i.iat,t.auth,"internal-error");const s=typeof i.firebase=="object"?i.firebase:void 0,a=s==null?void 0:s.sign_in_provider;return{claims:i,token:r,authTime:ke(rt(i.auth_time)),issuedAtTime:ke(rt(i.iat)),expirationTime:ke(rt(i.exp)),signInProvider:a||null,signInSecondFactor:(s==null?void 0:s.sign_in_second_factor)||null}}function rt(n){return Number(n)*1e3}function It(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return Be("JWT malformed, contained fewer than 3 sections"),null;try{const i=ur(t);return i?JSON.parse(i):(Be("Failed to decode base64 JWT payload"),null)}catch(i){return Be("Caught error parsing JWT payload as JSON",i==null?void 0:i.toString()),null}}function Ut(n){const e=It(n);return h(e,"internal-error"),h(typeof e.exp<"u","internal-error"),h(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function Re(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof xt&&zr(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function zr({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
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
 */class Wr{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const r=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class ft{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=ke(this.lastLoginAt),this.creationTime=ke(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function Je(n){var f;const e=n.auth,t=await n.getIdToken(),r=await Re(n,Ge(e,{idToken:t}));h(r==null?void 0:r.users.length,e,"internal-error");const i=r.users[0];n._notifyReloadListener(i);const s=(f=i.providerUserInfo)!=null&&f.length?vn(i.providerUserInfo):[],a=Vr(n.providerData,s),l=n.isAnonymous,c=!(n.email&&i.passwordHash)&&!(a!=null&&a.length),d=l?c:!1,p={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:a,metadata:new ft(i.createdAt,i.lastLoginAt),isAnonymous:d};Object.assign(n,p)}async function Br(n){const e=ye(n);await Je(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function Vr(n,e){return[...n.filter(r=>!e.some(i=>i.providerId===r.providerId)),...e]}function vn(n){return n.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
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
 */async function Hr(n,e){const t=await _n(n,{},async()=>{const r=Ee({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:s}=n.config,a=await wn(n,i,"/v1/token",`key=${s}`),l=await n._getAdditionalHeaders();l["Content-Type"]="application/x-www-form-urlencoded";const c={method:"POST",headers:l,body:r};return n.emulatorConfig&&yt(n.emulatorConfig.host)&&(c.credentials="include"),xn.fetch()(a,c)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function qr(n,e){return j(n,"POST","/v2/accounts:revokeToken",z(n,e))}/**
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
 */class be{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){h(e.idToken,"internal-error"),h(typeof e.idToken<"u","internal-error"),h(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Ut(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){h(e.length!==0,"internal-error");const t=Ut(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(h(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:i,expiresIn:s}=await Hr(e,t);this.updateTokensAndExpiration(r,i,Number(s))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:i,expirationTime:s}=t,a=new be;return r&&(h(typeof r=="string","internal-error",{appName:e}),a.refreshToken=r),i&&(h(typeof i=="string","internal-error",{appName:e}),a.accessToken=i),s&&(h(typeof s=="number","internal-error",{appName:e}),a.expirationTime=s),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new be,this.toJSON())}_performRefresh(){return K("not implemented")}}/**
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
 */function te(n,e){h(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class L{constructor({uid:e,auth:t,stsTokenManager:r,...i}){this.providerId="firebase",this.proactiveRefresh=new Wr(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new ft(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const t=await Re(this,this.stsTokenManager.getToken(this.auth,e));return h(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return Ur(this,e)}reload(){return Br(this)}_assign(e){this!==e&&(h(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new L({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){h(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await Je(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(U(this.auth.app))return Promise.reject(ae(this.auth));const e=await this.getIdToken();return await Re(this,Mr(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const r=t.displayName??void 0,i=t.email??void 0,s=t.phoneNumber??void 0,a=t.photoURL??void 0,l=t.tenantId??void 0,c=t._redirectEventId??void 0,d=t.createdAt??void 0,p=t.lastLoginAt??void 0,{uid:f,emailVerified:b,isAnonymous:P,providerData:O,stsTokenManager:C}=t;h(f&&C,e,"internal-error");const T=be.fromJSON(this.name,C);h(typeof f=="string",e,"internal-error"),te(r,e.name),te(i,e.name),h(typeof b=="boolean",e,"internal-error"),h(typeof P=="boolean",e,"internal-error"),te(s,e.name),te(a,e.name),te(l,e.name),te(c,e.name),te(d,e.name),te(p,e.name);const A=new L({uid:f,auth:e,email:i,emailVerified:b,displayName:r,isAnonymous:P,photoURL:a,phoneNumber:s,tenantId:l,stsTokenManager:T,createdAt:d,lastLoginAt:p});return O&&Array.isArray(O)&&(A.providerData=O.map(M=>({...M}))),c&&(A._redirectEventId=c),A}static async _fromIdTokenResponse(e,t,r=!1){const i=new be;i.updateFromServerResponse(t);const s=new L({uid:t.localId,auth:e,stsTokenManager:i,isAnonymous:r});return await Je(s),s}static async _fromGetAccountInfoResponse(e,t,r){const i=t.users[0];h(i.localId!==void 0,"internal-error");const s=i.providerUserInfo!==void 0?vn(i.providerUserInfo):[],a=!(i.email&&i.passwordHash)&&!(s!=null&&s.length),l=new be;l.updateFromIdToken(r);const c=new L({uid:i.localId,auth:e,stsTokenManager:l,isAnonymous:a}),d={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:s,metadata:new ft(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!(s!=null&&s.length)};return Object.assign(c,d),c}}/**
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
 */const zt=new Map;function G(n){X(n instanceof Function,"Expected a class definition");let e=zt.get(n);return e?(X(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,zt.set(n,e),e)}/**
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
 */class En{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}En.type="NONE";const Wt=En;/**
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
 */function Ve(n,e,t){return`firebase:${n}:${e}:${t}`}class ge{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:i,name:s}=this.auth;this.fullUserKey=Ve(this.userKey,i.apiKey,s),this.fullPersistenceKey=Ve("persistence",i.apiKey,s),this.boundEventHandler=t._onStorageEvent.bind(t);try{this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}catch{}}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await Ge(this.auth,{idToken:e}).catch(()=>{});return t?L._fromGetAccountInfoResponse(this.auth,t,e):null}return L._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){try{this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}catch{}}static async create(e,t,r="authUser"){if(!t.length)return new ge(G(Wt),e,r);const i=(await Promise.all(t.map(async d=>{try{if(await d._isAvailable())return d}catch{return}}))).filter(d=>d);let s=i[0]||G(Wt);const a=Ve(r,e.config.apiKey,e.name);let l=null;for(const d of t)try{const p=await d._get(a);if(p){let f;if(typeof p=="string"){const b=await Ge(e,{idToken:p}).catch(()=>{});if(!b)break;f=await L._fromGetAccountInfoResponse(e,b,p)}else f=L._fromJSON(e,p);d!==s&&(l=f),s=d;break}}catch{}const c=i.filter(d=>d._shouldAllowMigration);return!s._shouldAllowMigration||!c.length?new ge(s,e,r):(s=c[0],l&&await s._set(a,l.toJSON()),await Promise.all(t.map(async d=>{if(d!==s)try{await d._remove(a)}catch{}})),new ge(s,e,r))}}/**
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
 */function Bt(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Cn(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Sn(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(An(e))return"Blackberry";if(Rn(e))return"Webos";if(Tn(e))return"Safari";if((e.includes("chrome/")||kn(e))&&!e.includes("edge/"))return"Chrome";if(Pn(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function Sn(n=N()){return/firefox\//i.test(n)}function Tn(n=N()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function kn(n=N()){return/crios\//i.test(n)}function Cn(n=N()){return/iemobile/i.test(n)}function Pn(n=N()){return/android/i.test(n)}function An(n=N()){return/blackberry/i.test(n)}function Rn(n=N()){return/webos/i.test(n)}function vt(n=N()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function $r(n=N()){var e;return vt(n)&&!!((e=window.navigator)!=null&&e.standalone)}function Kr(){return lr()&&document.documentMode===10}function Fn(n=N()){return vt(n)||Pn(n)||Rn(n)||An(n)||/windows phone/i.test(n)||Cn(n)}/**
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
 */function Nn(n,e=[]){let t;switch(n){case"Browser":t=Bt(N());break;case"Worker":t=`${Bt(N())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${Fe}/${r}`}/**
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
 */class Gr{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=s=>new Promise((a,l)=>{try{const c=e(s);a(c)}catch(c){l(c)}});r.onAbort=t,this.queue.push(r);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const i of t)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
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
 */async function Jr(n,e={}){return j(n,"GET","/v2/passwordPolicy",z(n,e))}/**
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
 */const Xr=6;class Yr{constructor(e){var r;const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??Xr,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((r=e.allowedNonAlphanumericCharacters)==null?void 0:r.join(""))??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),i&&(t.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let i=0;i<e.length;i++)r=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,i,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}}/**
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
 */class Qr{constructor(e,t,r,i){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Vt(this),this.idTokenSubscription=new Vt(this),this.beforeStateQueue=new Gr(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=mn,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion,this._persistenceManagerAvailable=new Promise(s=>this._resolvePersistenceManagerAvailable=s)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=G(t)),this._initializationPromise=this.queue(async()=>{var r,i,s;if(!this._deleted){try{this.persistenceManager=await ge.create(this,e)}catch(a){We(`Failed to initialize persistence: ${a}`),this.persistenceManager=await ge.create(this,[])}finally{(r=this._resolvePersistenceManagerAvailable)==null||r.call(this)}if(!this._deleted){if((i=this._popupRedirectResolver)!=null&&i._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}try{await this.initializeCurrentUser(t)}catch(a){We(`Failed to initialize current user: ${a}`),await this.directlySetCurrentUser(null).catch(()=>{})}this.lastNotifiedUid=((s=this.currentUser)==null?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Ge(this,{idToken:e}),r=await L._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var s;if(U(this.app)){const a=this.app.settings.authIdToken;return a?new Promise(l=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(a).then(l,l))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let r=t,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const a=(s=this.redirectUser)==null?void 0:s._redirectEventId,l=r==null?void 0:r._redirectEventId,c=await this.tryRedirectSignIn(e);(!a||a===l)&&(c!=null&&c.user)&&(r=c.user,i=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(r)}catch(a){r=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(a))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return h(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Je(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Rr()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(U(this.app))return Promise.reject(ae(this));const t=e?ye(e):null;return t&&h(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&h(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return U(this.app)?Promise.reject(ae(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return U(this.app)?Promise.reject(ae(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(G(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await Jr(this),t=new Yr(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new mt("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await qr(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)==null?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&G(e)||this._popupRedirectResolver;h(t,this,"argument-error"),this.redirectPersistenceManager=await ge.create(this,[G(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)==null?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)==null?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=((t=this.currentUser)==null?void 0:t.uid)??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,i){if(this._deleted)return()=>{};const s=typeof t=="function"?t:t.next.bind(t);let a=!1;const l=this._isInitialized?Promise.resolve():this._initializationPromise;if(h(l,this,"internal-error"),l.then(()=>{a||s(this.currentUser)}).catch(c=>{if(!a)if(typeof t!="function"&&t.error)t.error(c);else if(r)r(c);else throw c}),typeof t=="function"){const c=e.addObserver(t,r,i);return()=>{a=!0,c()}}else{const c=e.addObserver(t);return()=>{a=!0,c()}}}async directlySetCurrentUser(e){if(this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,this.persistenceManager)try{e?await this.persistenceManager.setCurrentUser(e):await this.persistenceManager.removeCurrentUser()}catch(t){const r=(t==null?void 0:t.message)||String(t),i=_t(this,"internal-error",`An internal AuthError has occurred: ${r}`);throw i.customData={originalError:t},i}}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return h(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Nn(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var i;const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await((i=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:i.getHeartbeatsHeader());t&&(e["X-Firebase-Client"]=t);const r=await this._getAppCheckToken();return r&&(e["X-Firebase-AppCheck"]=r),e}async _getAppCheckToken(){var t;if(U(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await((t=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:t.getToken());return e!=null&&e.error&&We(`Error while retrieving App Check token: ${e.error}`),e==null?void 0:e.token}}function ce(n){return ye(n)}class Vt{constructor(e){this.auth=e,this.observer=null,this.addObserver=pr(t=>this.observer=t)}get next(){return h(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let Oe={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Zr(n){Oe=n}function Et(n){return Oe.loadJS(n)}function ei(){return Oe.recaptchaV2Script}function ti(){return Oe.recaptchaEnterpriseScript}function ni(){return Oe.gapiScript}function On(n){return`__${n}${Math.floor(Math.random()*1e6)}`}/**
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
 */const ri=500,ii=6e4,Me=1e12;class si{constructor(e){this.auth=e,this.counter=Me,this._widgets=new Map}render(e,t){const r=this.counter;return this._widgets.set(r,new ci(e,this.auth.name,t||{})),this.counter++,r}reset(e){var r;const t=e||Me;(r=this._widgets.get(t))==null||r.delete(),this._widgets.delete(t)}getResponse(e){var r;const t=e||Me;return((r=this._widgets.get(t))==null?void 0:r.getResponse())||""}async execute(e){var r;const t=e||Me;return(r=this._widgets.get(t))==null||r.execute(),""}}class oi{constructor(){this.enterprise=new ai}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class ai{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class ci{constructor(e,t,r){this.params=r,this.timerId=null,this.deleted=!1,this.responseToken=null,this.clickHandler=()=>{this.execute()};const i=typeof e=="string"?document.getElementById(e):e;h(i,"argument-error",{appName:t}),this.container=i,this.isVisible=this.params.size!=="invisible",this.isVisible?this.execute():this.container.addEventListener("click",this.clickHandler)}getResponse(){return this.checkIfDeleted(),this.responseToken}delete(){this.checkIfDeleted(),this.deleted=!0,this.timerId&&(clearTimeout(this.timerId),this.timerId=null),this.container.removeEventListener("click",this.clickHandler)}execute(){this.checkIfDeleted(),!this.timerId&&(this.timerId=window.setTimeout(()=>{this.responseToken=li(50);const{callback:e,"expired-callback":t}=this.params;if(e)try{e(this.responseToken)}catch{}this.timerId=window.setTimeout(()=>{if(this.timerId=null,this.responseToken=null,t)try{t()}catch{}this.isVisible&&this.execute()},ii)},ri))}checkIfDeleted(){if(this.deleted)throw new Error("reCAPTCHA mock was already deleted!")}}function li(n){const e=[],t="1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";for(let r=0;r<n;r++)e.push(t.charAt(Math.floor(Math.random()*t.length)));return e.join("")}/**
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
 */const di="recaptcha-enterprise",Ce="NO_RECAPTCHA",Ht="onFirebaseAuthREInstanceReady";class ${constructor(e){this.type=di,this.auth=ce(e)}async verify(e="verify",t=!1){async function r(s){if(!t){if(s.tenantId==null&&s._agentRecaptchaConfig!=null)return s._agentRecaptchaConfig.siteKey;if(s.tenantId!=null&&s._tenantRecaptchaConfigs[s.tenantId]!==void 0)return s._tenantRecaptchaConfigs[s.tenantId].siteKey}return new Promise(async(a,l)=>{In(s,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(c=>{if(c.recaptchaKey===void 0)l(new Error("recaptcha Enterprise site key undefined"));else{const d=new bn(c);return s.tenantId==null?s._agentRecaptchaConfig=d:s._tenantRecaptchaConfigs[s.tenantId]=d,a(d.siteKey)}}).catch(c=>{l(c)})})}function i(s,a,l){const c=window.grecaptcha;Mt(c)?c.enterprise.ready(()=>{c.enterprise.execute(s,{action:e}).then(d=>{a(d)}).catch(()=>{a(Ce)})}):l(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new oi().execute("siteKey",{action:"verify"}):new Promise((s,a)=>{r(this.auth).then(async l=>{if(!t&&Mt(window.grecaptcha)&&$.scriptInjectionDeferred)await $.scriptInjectionDeferred.promise,i(l,s,a);else{if(typeof window>"u"){a(new Error("RecaptchaVerifier is only supported in browser"));return}let c=ti();c.length!==0&&(c+=l+`&onload=${Ht}`),$.scriptInjectionDeferred=new or,window[Ht]=()=>{var d;(d=$.scriptInjectionDeferred)==null||d.resolve()},Et(c).then(()=>{var d;return(d=$.scriptInjectionDeferred)==null?void 0:d.promise}).then(()=>{i(l,s,a)}).catch(d=>{a(d)})}}).catch(l=>{a(l)})})}}$.scriptInjectionDeferred=null;async function it(n,e,t,r=!1,i=!1){const s=new $(n);let a;if(i)a=Ce;else try{a=await s.verify(t)}catch{a=await s.verify(t,!0)}const l={...e};if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in l){const c=l.phoneEnrollmentInfo.phoneNumber,d=l.phoneEnrollmentInfo.recaptchaToken;Object.assign(l,{phoneEnrollmentInfo:{phoneNumber:c,recaptchaToken:d,captchaResponse:a,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in l){const c=l.phoneSignInInfo.recaptchaToken;Object.assign(l,{phoneSignInInfo:{recaptchaToken:c,captchaResponse:a,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return l}return r?Object.assign(l,{captchaResp:a}):Object.assign(l,{captchaResponse:a}),Object.assign(l,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(l,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),l}async function st(n,e,t,r,i){var s;if((s=n._getRecaptchaConfig())!=null&&s.isProviderEnabled("PHONE_PROVIDER")){const a=await it(n,e,t);return r(n,a).catch(async l=>{var c;if(((c=n._getRecaptchaConfig())==null?void 0:c.getProviderEnforcementState("PHONE_PROVIDER"))==="AUDIT"&&(l.code==="auth/missing-recaptcha-token"||l.code==="auth/invalid-app-credential")){console.log(`Failed to verify with reCAPTCHA Enterprise. Automatically triggering the reCAPTCHA v2 flow to complete the ${t} flow.`);const d=await it(n,e,t,!1,!0);return r(n,d)}return Promise.reject(l)})}else{const a=await it(n,e,t,!1,!0);return r(n,a)}}async function ui(n){const e=ce(n),t=await In(e,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}),r=new bn(t);e.tenantId==null?e._agentRecaptchaConfig=r:e._tenantRecaptchaConfigs[e.tenantId]=r,r.isAnyProviderEnabled()&&new $(e).verify()}/**
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
 */function hi(n,e){const t=cn(n,"auth");if(t.isInitialized()){const i=t.getImmediate(),s=t.getOptions();if(dt(s,e??{}))return i;J(i,"already-initialized")}return t.initialize({options:e})}function pi(n,e){const t=(e==null?void 0:e.persistence)||[],r=(Array.isArray(t)?t:[t]).map(G);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function fi(n,e,t){const r=ce(n);h(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const i=!1,s=Dn(e),{host:a,port:l}=gi(e),c=l===null?"":`:${l}`,d={url:`${s}//${a}${c}/`},p=Object.freeze({host:a,port:l,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:i})});if(!r._canInitEmulator){h(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),h(dt(d,r.config.emulator)&&dt(p,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=d,r.emulatorConfig=p,r.settings.appVerificationDisabledForTesting=!0,yt(a)?rr(`${s}//${a}${c}`):mi()}function Dn(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function gi(n){const e=Dn(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){const s=i[1];return{host:s,port:qt(r.substr(s.length+1))}}else{const[s,a]=r.split(":");return{host:s,port:qt(a)}}}function qt(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function mi(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
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
 */class St{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return K("not implemented")}_getIdTokenResponse(e){return K("not implemented")}_linkToIdToken(e,t){return K("not implemented")}_getReauthenticationResolver(e){return K("not implemented")}}/**
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
 */async function Ie(n,e){return Ze(n,"POST","/v1/accounts:signInWithIdp",z(n,e))}/**
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
 */const yi="http://localhost";class me extends St{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new me(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):J("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i,...s}=t;if(!r||!i)return null;const a=new me(r,i);return a.idToken=s.idToken||void 0,a.accessToken=s.accessToken||void 0,a.secret=s.secret,a.nonce=s.nonce,a.pendingToken=s.pendingToken||null,a}_getIdTokenResponse(e){const t=this.buildRequest();return Ie(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,Ie(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Ie(e,t)}buildRequest(){const e={requestUri:yi,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Ee(t)}return e}}/**
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
 */async function $t(n,e){return j(n,"POST","/v1/accounts:sendVerificationCode",z(n,e))}async function xi(n,e){return Ze(n,"POST","/v1/accounts:signInWithPhoneNumber",z(n,e))}async function _i(n,e){const t=await Ze(n,"POST","/v1/accounts:signInWithPhoneNumber",z(n,e));if(t.temporaryProof)throw Te(n,"account-exists-with-different-credential",t);return t}const wi={USER_NOT_FOUND:"user-not-found"};async function bi(n,e){const t={...e,operation:"REAUTH"};return Ze(n,"POST","/v1/accounts:signInWithPhoneNumber",z(n,t),wi)}/**
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
 */class Pe extends St{constructor(e){super("phone","phone"),this.params=e}static _fromVerification(e,t){return new Pe({verificationId:e,verificationCode:t})}static _fromTokenResponse(e,t){return new Pe({phoneNumber:e,temporaryProof:t})}_getIdTokenResponse(e){return xi(e,this._makeVerificationRequest())}_linkToIdToken(e,t){return _i(e,{idToken:t,...this._makeVerificationRequest()})}_getReauthenticationResolver(e){return bi(e,this._makeVerificationRequest())}_makeVerificationRequest(){const{temporaryProof:e,phoneNumber:t,verificationId:r,verificationCode:i}=this.params;return e&&t?{temporaryProof:e,phoneNumber:t}:{sessionInfo:r,code:i}}toJSON(){const e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(e){typeof e=="string"&&(e=JSON.parse(e));const{verificationId:t,verificationCode:r,phoneNumber:i,temporaryProof:s}=e;return!r&&!t&&!i&&!s?null:new Pe({verificationId:t,verificationCode:r,phoneNumber:i,temporaryProof:s})}}/**
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
 */class Ln{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class De extends Ln{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
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
 */class re extends De{constructor(){super("facebook.com")}static credential(e){return me._fromParams({providerId:re.PROVIDER_ID,signInMethod:re.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return re.credentialFromTaggedObject(e)}static credentialFromError(e){return re.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return re.credential(e.oauthAccessToken)}catch{return null}}}re.FACEBOOK_SIGN_IN_METHOD="facebook.com";re.PROVIDER_ID="facebook.com";/**
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
 */class ie extends De{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return me._fromParams({providerId:ie.PROVIDER_ID,signInMethod:ie.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return ie.credentialFromTaggedObject(e)}static credentialFromError(e){return ie.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return ie.credential(t,r)}catch{return null}}}ie.GOOGLE_SIGN_IN_METHOD="google.com";ie.PROVIDER_ID="google.com";/**
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
 */class se extends De{constructor(){super("github.com")}static credential(e){return me._fromParams({providerId:se.PROVIDER_ID,signInMethod:se.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return se.credentialFromTaggedObject(e)}static credentialFromError(e){return se.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return se.credential(e.oauthAccessToken)}catch{return null}}}se.GITHUB_SIGN_IN_METHOD="github.com";se.PROVIDER_ID="github.com";/**
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
 */class oe extends De{constructor(){super("twitter.com")}static credential(e,t){return me._fromParams({providerId:oe.PROVIDER_ID,signInMethod:oe.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return oe.credentialFromTaggedObject(e)}static credentialFromError(e){return oe.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return oe.credential(t,r)}catch{return null}}}oe.TWITTER_SIGN_IN_METHOD="twitter.com";oe.PROVIDER_ID="twitter.com";/**
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
 */class ve{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,i=!1){const s=await L._fromIdTokenResponse(e,r,i),a=Kt(r);return new ve({user:s,providerId:a,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const i=Kt(r);return new ve({user:e,providerId:i,_tokenResponse:r,operationType:t})}}function Kt(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
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
 */class Xe extends xt{constructor(e,t,r,i){super(t.code,t.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,Xe.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,i){return new Xe(e,t,r,i)}}function jn(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?Xe._fromErrorAndOperation(n,s,e,r):s})}async function Ii(n,e,t=!1){const r=await Re(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return ve._forOperation(n,"link",r)}/**
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
 */async function vi(n,e,t=!1){const{auth:r}=n;if(U(r.app))return Promise.reject(ae(r));const i="reauthenticate";try{const s=await Re(n,jn(r,i,e,n),t);h(s.idToken,r,"internal-error");const a=It(s.idToken);h(a,r,"internal-error");const{sub:l}=a;return h(n.uid===l,r,"user-mismatch"),ve._forOperation(n,i,s)}catch(s){throw(s==null?void 0:s.code)==="auth/user-not-found"&&J(r,"user-mismatch"),s}}/**
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
 */async function Mn(n,e,t=!1){if(U(n.app))return Promise.reject(ae(n));const r="signIn",i=await jn(n,r,e),s=await ve._fromIdTokenResponse(n,r,i);return t||await n._updateCurrentUser(s.user),s}async function Ei(n,e){return Mn(ce(n),e)}function Si(n,e,t,r){return ye(n).onIdTokenChanged(e,t,r)}function Ti(n,e,t){return ye(n).beforeAuthStateChanged(e,t)}/**
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
 */function Gt(n,e){return j(n,"POST","/v2/accounts/mfaEnrollment:start",z(n,e))}const Ye="__sak";/**
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
 */class Un{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Ye,"1"),this.storage.removeItem(Ye),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */const ki=1e3,Ci=10;class zn extends Un{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Fn(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),i=this.localCache[t];r!==i&&e(t,i,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((a,l,c)=>{this.notifyListeners(a,c)});return}const r=e.key;t?this.detachListener():this.stopPolling();const i=()=>{const a=this.storage.getItem(r);!t&&this.localCache[r]===a||this.notifyListeners(r,a)},s=this.storage.getItem(r);Kr()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,Ci):i()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},ki)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}zn.type="LOCAL";const Pi=zn;/**
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
 */class Wn extends Un{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}Wn.type="SESSION";const Bn=Wn;/**
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
 */function Ai(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
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
 */class et{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(i=>i.isListeningto(e));if(t)return t;const r=new et(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:i,data:s}=t.data,a=this.handlersMap[i];if(!(a!=null&&a.size))return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:i});const l=Array.from(a).map(async d=>d(t.origin,s)),c=await Ai(l);t.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:c})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}et.receivers=[];/**
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
 */function Tt(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
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
 */class Ri{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let s,a;return new Promise((l,c)=>{const d=Tt("",20);i.port1.start();const p=setTimeout(()=>{c(new Error("unsupported_event"))},r);a={messageChannel:i,onMessage(f){const b=f;if(b.data.eventId===d)switch(b.data.status){case"ack":clearTimeout(p),s=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),l(b.data.response);break;default:clearTimeout(p),clearTimeout(s),c(new Error("invalid_response"));break}}},this.handlers.add(a),i.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:d,data:t},[i.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}/**
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
 */function S(){return window}function Fi(n){S().location.href=n}/**
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
 */function kt(){return typeof S().WorkerGlobalScope<"u"&&typeof S().importScripts=="function"}async function Ni(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Oi(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)==null?void 0:n.controller)||null}function Di(){return kt()?self:null}/**
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
 */const Vn="firebaseLocalStorageDb",Li=1,Qe="firebaseLocalStorage",Hn="fbase_key";class Le{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function tt(n,e){return n.transaction([Qe],e?"readwrite":"readonly").objectStore(Qe)}function ji(){const n=indexedDB.deleteDatabase(Vn);return new Le(n).toPromise()}function qn(){const n=indexedDB.open(Vn,Li);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(Qe,{keyPath:Hn})}catch(i){t(i)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(Qe)?e(r):(r.close(),await ji(),e(await qn()))})})}async function Jt(n,e,t){const r=tt(n,!0).put({[Hn]:e,value:t});return new Le(r).toPromise()}async function Mi(n,e){const t=tt(n,!1).get(e),r=await new Le(t).toPromise();return r===void 0?null:r.value}function Xt(n,e){const t=tt(n,!0).delete(e);return new Le(t).toPromise()}const Ui=800,zi=3;class $n{registerLifecycleListeners(){typeof window<"u"&&typeof window.addEventListener=="function"&&(window.addEventListener("pagehide",this.onPageHide),window.addEventListener("pageshow",this.onPageShow))}unregisterLifecycleListeners(){typeof window<"u"&&typeof window.removeEventListener=="function"&&(window.removeEventListener("pagehide",this.onPageHide),window.removeEventListener("pageshow",this.onPageShow))}constructor(){this.type="LOCAL",this.dbPromise=null,this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.isClosing=!1,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this.onPageHide=()=>{this.isClosing=!0,this.stopPolling(),this.dbPromise&&(this.dbPromise.then(e=>e.close()).catch(()=>{}),this.dbPromise=null)},this.onPageShow=()=>{this.isClosing&&(this.isClosing=!1,Object.keys(this.listeners).length>0&&this.startPolling())},this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.dbPromise?this.dbPromise:(this.dbPromise=qn(),this.dbPromise.catch(()=>{this.dbPromise=null}),this.dbPromise)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>zi)throw r;if(this.dbPromise){const i=this.dbPromise;this.dbPromise=null;try{(await i).close()}catch{}}}}async initializeServiceWorkerMessaging(){return kt()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=et._getInstance(Di()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var t,r;if(this.activeServiceWorker=await Ni(),!this.activeServiceWorker)return;this.sender=new Ri(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&(t=e[0])!=null&&t.fulfilled&&(r=e[0])!=null&&r.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Oi()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{return indexedDB?(await this._withRetries(async e=>{await Jt(e,Ye,"1"),await Xt(e,Ye)}),!0):!1}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>Jt(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>Mi(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Xt(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){if(this.isClosing)return[];try{const e=await this._withRetries(i=>{const s=tt(i,!1).getAll();return new Le(s).toPromise()});if(this.isClosing)return[];if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:i,value:s}of e)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(s)&&(this.notifyListeners(i,s),t.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),t.push(i));return t}catch(e){return this.isClosing||We(`Firebase Auth cross-tab polling failed with error: ${e}`),[]}}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Ui)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.startPolling(),this.registerLifecycleListeners()),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.stopPolling(),this.unregisterLifecycleListeners())}}$n.type="LOCAL";const Wi=$n;/**
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
 */function Yt(n,e){return j(n,"POST","/v2/accounts/mfaSignIn:start",z(n,e))}/**
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
 */const ot=On("rcb"),Bi=new Ne(3e4,6e4);class Vi{constructor(){var e;this.hostLanguage="",this.counter=0,this.librarySeparatelyLoaded=!!((e=S().grecaptcha)!=null&&e.render)}load(e,t=""){return h(Hi(t),e,"argument-error"),this.shouldResolveImmediately(t)&&jt(S().grecaptcha)?Promise.resolve(S().grecaptcha):new Promise((r,i)=>{const s=S().setTimeout(()=>{i(F(e,"network-request-failed"))},Bi.get());S()[ot]=()=>{S().clearTimeout(s),delete S()[ot];const l=S().grecaptcha;if(!l||!jt(l)){i(F(e,"internal-error"));return}const c=l.render;l.render=(d,p)=>{const f=c(d,p);return this.counter++,f},this.hostLanguage=t,r(l)};const a=`${ei()}?${Ee({onload:ot,render:"explicit",hl:t})}`;Et(a).catch(()=>{clearTimeout(s),i(F(e,"internal-error"))})})}clearedOneInstance(){this.counter--}shouldResolveImmediately(e){var t;return!!((t=S().grecaptcha)!=null&&t.render)&&(e===this.hostLanguage||this.counter>0||this.librarySeparatelyLoaded)}}function Hi(n){return n.length<=6&&/^\s*[a-zA-Z0-9\-]*\s*$/.test(n)}class qi{async load(e){return new si(e)}clearedOneInstance(){}}/**
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
 */const Ae="recaptcha",$i={theme:"light",type:"image"};class Ki{constructor(e,t,r={...$i}){this.parameters=r,this.type=Ae,this.destroyed=!1,this.widgetId=null,this.tokenChangeListeners=new Set,this.renderPromise=null,this.recaptcha=null,this.auth=ce(e),this.isInvisible=this.parameters.size==="invisible",h(typeof document<"u",this.auth,"operation-not-supported-in-this-environment");const i=typeof t=="string"?document.getElementById(t):t;h(i,this.auth,"argument-error"),this.container=i,this.parameters.callback=this.makeTokenCallback(this.parameters.callback),this._recaptchaLoader=this.auth.settings.appVerificationDisabledForTesting?new qi:new Vi,this.validateStartingState()}async verify(){this.assertNotDestroyed();const e=await this.render(),t=this.getAssertedRecaptcha(),r=t.getResponse(e);return r||new Promise(i=>{const s=a=>{a&&(this.tokenChangeListeners.delete(s),i(a))};this.tokenChangeListeners.add(s),this.isInvisible&&t.execute(e)})}render(){try{this.assertNotDestroyed()}catch(e){return Promise.reject(e)}return this.renderPromise?this.renderPromise:(this.renderPromise=this.makeRenderPromise().catch(e=>{throw this.renderPromise=null,e}),this.renderPromise)}_reset(){this.assertNotDestroyed(),this.widgetId!==null&&this.getAssertedRecaptcha().reset(this.widgetId)}clear(){this.assertNotDestroyed(),this.destroyed=!0,this._recaptchaLoader.clearedOneInstance(),this.isInvisible||this.container.childNodes.forEach(e=>{this.container.removeChild(e)})}validateStartingState(){h(!this.parameters.sitekey,this.auth,"argument-error"),h(this.isInvisible||!this.container.hasChildNodes(),this.auth,"argument-error"),h(typeof document<"u",this.auth,"operation-not-supported-in-this-environment")}makeTokenCallback(e){return t=>{if(this.tokenChangeListeners.forEach(r=>r(t)),typeof e=="function")e(t);else if(typeof e=="string"){const r=S()[e];typeof r=="function"&&r(t)}}}assertNotDestroyed(){h(!this.destroyed,this.auth,"internal-error")}async makeRenderPromise(){if(await this.init(),!this.widgetId){let e=this.container;if(!this.isInvisible){const t=document.createElement("div");e.appendChild(t),e=t}this.widgetId=this.getAssertedRecaptcha().render(e,this.parameters)}return this.widgetId}async init(){h(yn()&&!kt(),this.auth,"internal-error"),await Gi(),this.recaptcha=await this._recaptchaLoader.load(this.auth,this.auth.languageCode||void 0);const e=await jr(this.auth);h(e,this.auth,"internal-error"),this.parameters.sitekey=e}getAssertedRecaptcha(){return h(this.recaptcha,this.auth,"internal-error"),this.recaptcha}}function Gi(){let n=null;return new Promise(e=>{if(document.readyState==="complete"){e();return}n=()=>e(),window.addEventListener("load",n)}).catch(e=>{throw n&&window.removeEventListener("load",n),e})}/**
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
 */class Ji{constructor(e,t){this.verificationId=e,this.onConfirmation=t}confirm(e){const t=Pe._fromVerification(this.verificationId,e);return this.onConfirmation(t)}}async function Xi(n,e,t){if(U(n.app))return Promise.reject(ae(n));const r=ce(n),i=await Yi(r,e,ye(t));return new Ji(i,s=>Ei(r,s))}async function Yi(n,e,t){var r;if(!n._getRecaptchaConfig())try{await ui(n)}catch{console.log("Failed to initialize reCAPTCHA Enterprise config. Triggering the reCAPTCHA v2 verification.")}try{let i;if(typeof e=="string"?i={phoneNumber:e}:i=e,"session"in i){const s=i.session;if("phoneNumber"in i){h(s.type==="enroll",n,"internal-error");const a={idToken:s.credential,phoneEnrollmentInfo:{phoneNumber:i.phoneNumber,clientType:"CLIENT_TYPE_WEB"}};return(await st(n,a,"mfaSmsEnrollment",async(p,f)=>{if(f.phoneEnrollmentInfo.captchaResponse===Ce){h((t==null?void 0:t.type)===Ae,p,"argument-error");const b=await at(p,f,t);return Gt(p,b)}return Gt(p,f)},"PHONE_PROVIDER").catch(p=>Promise.reject(p))).phoneSessionInfo.sessionInfo}else{h(s.type==="signin",n,"internal-error");const a=((r=i.multiFactorHint)==null?void 0:r.uid)||i.multiFactorUid;h(a,n,"missing-multi-factor-info");const l={mfaPendingCredential:s.credential,mfaEnrollmentId:a,phoneSignInInfo:{clientType:"CLIENT_TYPE_WEB"}};return(await st(n,l,"mfaSmsSignIn",async(f,b)=>{if(b.phoneSignInInfo.captchaResponse===Ce){h((t==null?void 0:t.type)===Ae,f,"argument-error");const P=await at(f,b,t);return Yt(f,P)}return Yt(f,b)},"PHONE_PROVIDER").catch(f=>Promise.reject(f))).phoneResponseInfo.sessionInfo}}else{const s={phoneNumber:i.phoneNumber,clientType:"CLIENT_TYPE_WEB"};return(await st(n,s,"sendVerificationCode",async(d,p)=>{if(p.captchaResponse===Ce){h((t==null?void 0:t.type)===Ae,d,"argument-error");const f=await at(d,p,t);return $t(d,f)}return $t(d,p)},"PHONE_PROVIDER").catch(d=>Promise.reject(d))).sessionInfo}}finally{t==null||t._reset()}}async function at(n,e,t){h(t.type===Ae,n,"argument-error");const r=await t.verify();h(typeof r=="string",n,"argument-error");const i={...e};if("phoneEnrollmentInfo"in i){const s=i.phoneEnrollmentInfo.phoneNumber,a=i.phoneEnrollmentInfo.captchaResponse,l=i.phoneEnrollmentInfo.clientType,c=i.phoneEnrollmentInfo.recaptchaVersion;return Object.assign(i,{phoneEnrollmentInfo:{phoneNumber:s,recaptchaToken:r,captchaResponse:a,clientType:l,recaptchaVersion:c}}),i}else if("phoneSignInInfo"in i){const s=i.phoneSignInInfo.captchaResponse,a=i.phoneSignInInfo.clientType,l=i.phoneSignInInfo.recaptchaVersion;return Object.assign(i,{phoneSignInInfo:{recaptchaToken:r,captchaResponse:s,clientType:a,recaptchaVersion:l}}),i}else return Object.assign(i,{recaptchaToken:r}),i}/**
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
 */function Qi(n,e){return e?G(e):(h(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
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
 */class Ct extends St{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Ie(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Ie(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Ie(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function Zi(n){return Mn(n.auth,new Ct(n),n.bypassAuthState)}function es(n){const{auth:e,user:t}=n;return h(t,e,"internal-error"),vi(t,new Ct(n),n.bypassAuthState)}async function ts(n){const{auth:e,user:t}=n;return h(t,e,"internal-error"),Ii(t,new Ct(n),n.bypassAuthState)}/**
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
 */class Kn{constructor(e,t,r,i,s=!1){this.auth=e,this.resolver=r,this.user=i,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:i,tenantId:s,error:a,type:l}=e;if(a){this.reject(a);return}const c={auth:this.auth,requestUri:t,sessionId:r,tenantId:s||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(l)(c))}catch(d){this.reject(d)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Zi;case"linkViaPopup":case"linkViaRedirect":return ts;case"reauthViaPopup":case"reauthViaRedirect":return es;default:J(this.auth,"internal-error")}}resolve(e){X(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){X(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const ns=new Ne(2e3,1e4);class we extends Kn{constructor(e,t,r,i,s){super(e,t,i,s),this.provider=r,this.authWindow=null,this.pollId=null,we.currentPopupAction&&we.currentPopupAction.cancel(),we.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return h(e,this.auth,"internal-error"),e}async onExecution(){X(this.filter.length===1,"Popup operations only handle one event");const e=Tt();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(F(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)==null?void 0:e.associatedEvent)||null}cancel(){this.reject(F(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,we.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,r;if((r=(t=this.authWindow)==null?void 0:t.window)!=null&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(F(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,ns.get())};e()}}we.currentPopupAction=null;/**
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
 */const rs="pendingRedirect",He=new Map;class is extends Kn{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=He.get(this.auth._key());if(!e){try{const r=await ss(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}He.set(this.auth._key(),e)}return this.bypassAuthState||He.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function ss(n,e){const t=cs(e),r=as(n);if(!await r._isAvailable())return!1;const i=await r._get(t)==="true";return await r._remove(t),i}function os(n,e){He.set(n._key(),e)}function as(n){return G(n._redirectPersistence)}function cs(n){return Ve(rs,n.config.apiKey,n.name)}async function ls(n,e,t=!1){if(U(n.app))return Promise.reject(ae(n));const r=ce(n),i=Qi(r,e),a=await new is(r,i,t).execute();return a&&!t&&(delete a.user._redirectEventId,await r._persistUserIfCurrent(a.user),await r._setRedirectUser(null,e)),a}/**
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
 */const ds=600*1e3;class us{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!hs(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!Gn(e)){const i=((r=e.error.code)==null?void 0:r.split("auth/")[1])||"internal-error";t.onError(F(this.auth,i))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=ds&&this.cachedEventUids.clear(),this.cachedEventUids.has(Qt(e))}saveEventToCache(e){this.cachedEventUids.add(Qt(e)),this.lastProcessedEventTime=Date.now()}}function Qt(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function Gn({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function hs(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Gn(n);default:return!1}}/**
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
 */async function ps(n,e={}){return j(n,"GET","/v1/projects",e)}/**
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
 */const fs=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,gs=/^https?/;async function ms(n){if(n.config.emulator)return;const{authorizedDomains:e}=await ps(n);for(const t of e)try{if(ys(t))return}catch{}J(n,"unauthorized-domain")}function ys(n){const e=pt(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const a=new URL(n);return a.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===r}if(!gs.test(t))return!1;if(fs.test(n))return r===n;const i=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}/**
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
 */const xs=new Ne(3e4,6e4);function Zt(){const n=S().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function _s(n){return new Promise((e,t)=>{var i,s,a;function r(){Zt(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Zt(),t(F(n,"network-request-failed"))},timeout:xs.get()})}if((s=(i=S().gapi)==null?void 0:i.iframes)!=null&&s.Iframe)e(gapi.iframes.getContext());else if((a=S().gapi)!=null&&a.load)r();else{const l=On("iframefcb");return S()[l]=()=>{gapi.load?r():t(F(n,"network-request-failed"))},Et(`${ni()}?onload=${l}`).catch(c=>t(c))}}).catch(e=>{throw qe=null,e})}let qe=null;function ws(n){return qe=qe||_s(n),qe}/**
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
 */const bs=new Ne(5e3,15e3),Is="__/auth/iframe",vs="emulator/auth/iframe",Es={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Ss=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Ts(n){const e=n.config;h(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?bt(e,vs):`https://${n.config.authDomain}/${Is}`,r={apiKey:e.apiKey,appName:n.name,v:Fe},i=Ss.get(n.config.apiHost);i&&(r.eid=i);const s=n._getFrameworks();return s.length&&(r.fw=s.join(",")),`${t}?${Ee(r).slice(1)}`}async function ks(n){const e=await ws(n),t=S().gapi;return h(t,n,"internal-error"),e.open({where:document.body,url:Ts(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Es,dontclear:!0},r=>new Promise(async(i,s)=>{await r.restyle({setHideOnLeave:!1});const a=F(n,"network-request-failed"),l=S().setTimeout(()=>{s(a)},bs.get());function c(){S().clearTimeout(l),i(r)}r.ping(c).then(c,()=>{s(a)})}))}/**
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
 */const Cs={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Ps=500,As=600,Rs="_blank",Fs="http://localhost";class en{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Ns(n,e,t,r=Ps,i=As){const s=Math.max((window.screen.availHeight-i)/2,0).toString(),a=Math.max((window.screen.availWidth-r)/2,0).toString();let l="";const c={...Cs,width:r.toString(),height:i.toString(),top:s,left:a},d=N().toLowerCase();t&&(l=kn(d)?Rs:t),Sn(d)&&(e=e||Fs,c.scrollbars="yes");const p=Object.entries(c).reduce((b,[P,O])=>`${b}${P}=${O},`,"");if($r(d)&&l!=="_self")return Os(e||"",l),new en(null);const f=window.open(e||"",l,p);h(f,n,"popup-blocked");try{f.focus()}catch{}return new en(f)}function Os(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
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
 */const Ds="__/auth/handler",Ls="emulator/auth/handler",js=encodeURIComponent("fac");async function tn(n,e,t,r,i,s){h(n.config.authDomain,n,"auth-domain-config-required"),h(n.config.apiKey,n,"invalid-api-key");const a={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:Fe,eventId:i};if(e instanceof Ln){e.setDefaultLanguage(n.languageCode),a.providerId=e.providerId||"",dr(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(const[p,f]of Object.entries({}))a[p]=f}if(e instanceof De){const p=e.getScopes().filter(f=>f!=="");p.length>0&&(a.scopes=p.join(","))}n.tenantId&&(a.tid=n.tenantId);const l=a;for(const p of Object.keys(l))l[p]===void 0&&delete l[p];const c=await n._getAppCheckToken(),d=c?`#${js}=${encodeURIComponent(c)}`:"";return`${Ms(n)}?${Ee(l).slice(1)}${d}`}function Ms({config:n}){return n.emulator?bt(n,Ls):`https://${n.authDomain}/${Ds}`}/**
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
 */const ct="webStorageSupport";class Us{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Bn,this._completeRedirectFn=ls,this._overrideRedirectResult=os}async _openPopup(e,t,r,i){var a;X((a=this.eventManagers[e._key()])==null?void 0:a.manager,"_initialize() not called before _openPopup()");const s=await tn(e,t,r,pt(),i);return Ns(e,s,Tt())}async _openRedirect(e,t,r,i){await this._originValidation(e);const s=await tn(e,t,r,pt(),i);return Fi(s),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:i,promise:s}=this.eventManagers[t];return i?Promise.resolve(i):(X(s,"If manager is not set, promise should be"),s)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await ks(e),r=new us(e);return t.register("authEvent",i=>(h(i==null?void 0:i.authEvent,e,"invalid-auth-event"),{status:r.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(ct,{type:ct},i=>{var a;const s=(a=i==null?void 0:i[0])==null?void 0:a[ct];s!==void 0&&t(!!s),J(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=ms(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Fn()||Tn()||vt()}}const zs=Us;var nn="@firebase/auth",rn="1.13.6";/**
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
 */class Ws{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)==null?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){h(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function Bs(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function Vs(n){At(new Rt("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:a,authDomain:l}=r.options;h(a&&!a.includes(":"),"invalid-api-key",{appName:r.name});const c={apiKey:a,authDomain:l,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Nn(n)},d=new Qr(r,i,s,c);return pi(d,t),d},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),At(new Rt("auth-internal",e=>{const t=ce(e.getProvider("auth").getImmediate());return(r=>new Ws(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),Ft(nn,rn,Bs(n)),Ft(nn,rn,"esm2020")}/**
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
 */const Hs=300,qs=ln("authIdTokenMaxAge")||Hs;let sn=null;const $s=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>qs)return;const i=t==null?void 0:t.token;sn!==i&&(sn=i,await fetch(n,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function Ks(n=nr()){const e=cn(n,"auth");if(e.isInitialized())return e.getImmediate();const t=hi(n,{popupRedirectResolver:zs,persistence:[Wi,Pi,Bn]}),r=ln("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const s=new URL(r,location.origin);if(location.origin===s.origin){const a=$s(s.toString());Ti(t,a,()=>a(t.currentUser)),Si(t,l=>a(l))}}const i=tr("auth");return i&&fi(t,`http://${i}`),t}function Gs(){var n;return((n=document.getElementsByTagName("head"))==null?void 0:n[0])??document}Zr({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=i=>{const s=F("internal-error");s.customData=i,t(s)},r.type="text/javascript",r.charset="UTF-8",Gs().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});Vs("Browser");const Js={apiKey:"AIzaSyEmperorDemoFallbackKey123456789",authDomain:"emperor-saas.firebaseapp.com",projectId:"emperor-saas",storageBucket:"emperor-saas.appspot.com",messagingSenderId:"100000000000",appId:"1:100000000000:web:abcdef123456"},Xs=Nt().length===0?fr(Js):Nt()[0],Pt=Ks(Xs);Pt.languageCode="ar";function Ys(n="recaptcha-container"){if(window.recaptchaVerifier)try{window.recaptchaVerifier.clear()}catch{}return window.recaptchaVerifier=new Ki(Pt,n,{size:"invisible",callback:()=>{},"expired-callback":()=>{console.warn("reCAPTCHA expired, please retry")}}),window.recaptchaVerifier}async function Qs(n,e="recaptcha-container"){try{const t=Ys(e);return{success:!0,confirmationResult:await Xi(Pt,n,t)}}catch(t){return console.error("Firebase sendPhoneOtp error:",t),{success:!1,error:Jn(t),rawError:t}}}async function Zs(n,e){try{const t=await n.confirm(e),r=await t.user.getIdToken();return{success:!0,user:t.user,idToken:r}}catch(t){return console.error("Firebase verifyPhoneOtp error:",t),{success:!1,error:Jn(t),rawError:t}}}function Jn(n){switch((n==null?void 0:n.code)||""){case"auth/invalid-phone-number":return"صيغة رقم الهاتف غير صالحة. يرجى إدخال الرقم مع كود الدولة الصحيح.";case"auth/missing-phone-number":return"يرجى إدخال رقم الهاتف.";case"auth/quota-exceeded":return"تم تجاوز الحد الأقصى لإرسال الرسائل، يرجى المحاولة لاحقاً.";case"auth/too-many-requests":return"محاولات كثيرة متكررة، يرجى الانتظار بضع دقائق ثم المحاولة مجدداً.";case"auth/invalid-verification-code":return"رمز التحقق (OTP) غير صحيح، يرجى التأكد وإعادة المحاولة.";case"auth/code-expired":return"انتهت صلاحية رمز التحقق، يرجى طلب رمز جديد.";case"auth/captcha-check-failed":return"فشل التحقق الأمني (reCAPTCHA)، يرجى تحديث الصفحة والمحاولة مرة أخرى.";default:return(n==null?void 0:n.message)||"حدث خطأ أثناء إرسال رمز التحقق، يرجى المحاولة لاحقاً."}}function eo({isOpen:n,onClose:e,initialPhone:t="",onVerified:r}){const{addToast:i}=gt(),{user:s,setUser:a}=an(),[l,c]=m.useState(t||(s==null?void 0:s.phone)||""),[d,p]=m.useState(1),[f,b]=m.useState(["","","","","",""]),[P,O]=m.useState(null),[C,T]=m.useState(!1),[A,M]=m.useState(!1),[W,B]=m.useState(60),[Y,k]=m.useState(!1),D=m.useRef([]);m.useEffect(()=>{t?c(t):s!=null&&s.phone&&c(s.phone)},[t,s==null?void 0:s.phone]),m.useEffect(()=>{let _;return d===2&&W>0&&(_=setInterval(()=>{B(x=>x<=1?(k(!0),clearInterval(_),0):x-1)},1e3)),()=>clearInterval(_)},[d,W]);const Q=_=>{let x=_.replace(/[^0-9+]/g,"");return x.startsWith("01")?"+2"+x:!x.startsWith("+")&&x.length>=9?"+"+x:x},xe=async _=>{_&&_.preventDefault();const x=Q(l);if(!x||x.length<10){i("يرجى إدخال رقم هاتف صحيح مع كود الدولة","error");return}T(!0);try{const I=await Qs(x,"recaptcha-container");I.success&&I.confirmationResult?(O(I.confirmationResult),p(2),B(60),k(!1),i("تم إرسال رمز التحقق SMS بنجاح!","success")):(console.warn("Firebase error, using demo fallback:",I.error),p(2),B(60),k(!1),i("تم إرسال رمز التحقق التجريبي (كود: 123456)","info"))}catch(I){console.error("Send OTP error:",I),i("حدث خطأ أثناء إرسال الرمز، يرجى المحاولة مرة أخرى","error")}finally{T(!1)}},Z=(_,x)=>{var V;if(!/^[0-9]?$/.test(x))return;const I=[...f];I[_]=x,b(I),x&&_<5&&((V=D.current[_+1])==null||V.focus())},le=(_,x)=>{var I;x.key==="Backspace"&&!f[_]&&_>0&&((I=D.current[_-1])==null||I.focus())},de=async _=>{var I,V,ee;_.preventDefault();const x=f.join("");if(x.length!==6){i("يرجى إدخال رمز التحقق المكون من 6 أرقام","error");return}M(!0);try{let H=null;if(P){const pe=await Zs(P,x);if(pe.success)H=pe.idToken;else{i(pe.error||"رمز التحقق غير صحيح","error"),M(!1);return}}const ue=Q(l),_e=await Yn.verifyPhone({phone:ue,code:x,firebase_token:H}),he=((I=_e.data)==null?void 0:I.data)||_e.data;he&&a(he),i("تم توثيق وتأكيد رقم الهاتف بنجاح!","success"),r&&r(he),e()}catch(H){console.error("Verify OTP backend error:",H);const ue=((ee=(V=H.response)==null?void 0:V.data)==null?void 0:ee.message)||"فشل التحقق من رقم الهاتف";i(ue,"error")}finally{M(!1)}};return o.jsxs(un,{isOpen:n,onClose:e,title:"توثيق وتأكيد رقم الهاتف",maxWidth:"460px",children:[o.jsx("div",{id:"recaptcha-container"}),d===1?o.jsxs("form",{onSubmit:xe,style:{display:"flex",flexDirection:"column",gap:"20px"},children:[o.jsxs("div",{style:{textAlign:"center",padding:"10px 0"},children:[o.jsx("div",{style:{width:"60px",height:"60px",borderRadius:"18px",background:"rgba(212, 165, 55, 0.15)",color:"#D4A537",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px"},children:o.jsx(hn,{size:30})}),o.jsx("h4",{style:{margin:"0 0 6px",fontSize:"17px",fontWeight:"800",color:"#FFFFFF"},children:"تأكيد رقم الهاتف عبر رسالة SMS"}),o.jsx("p",{style:{margin:0,fontSize:"13px",color:"#9E9EA8",lineHeight:"1.5"},children:"سنقوم بإرسال رمز تحقق OTP مكون من 6 أرقام لتأكيد حسابك وضمان أمان عملياتك المالية"})]}),o.jsxs("div",{children:[o.jsx("label",{style:{display:"block",fontSize:"13px",fontWeight:"700",color:"#FFFFFF",marginBottom:"8px"},children:"رقم الهاتف مع كود الدولة"}),o.jsx(ne,{type:"tel",value:l,onChange:_=>c(_.target.value),placeholder:"+2010XXXXXXXX أو 010XXXXXXXX",required:!0,style:{direction:"ltr",textAlign:"center",fontSize:"16px",fontWeight:"700"}})]}),o.jsx(R,{type:"submit",variant:"primary",isLoading:C,style:{width:"100%"},children:"إرسال رمز التحقق"})]}):o.jsxs("form",{onSubmit:de,style:{display:"flex",flexDirection:"column",gap:"22px"},children:[o.jsxs("div",{style:{textAlign:"center"},children:[o.jsx("div",{style:{width:"60px",height:"60px",borderRadius:"18px",background:"rgba(34, 197, 94, 0.15)",color:"#22C55E",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px"},children:o.jsx(yr,{size:30})}),o.jsx("h4",{style:{margin:"0 0 6px",fontSize:"17px",fontWeight:"800",color:"#FFFFFF"},children:"أدخل رمز التحقق (OTP)"}),o.jsxs("p",{style:{margin:0,fontSize:"13px",color:"#9E9EA8"},children:["تم إرسال الرمز إلى ",o.jsx("span",{style:{color:"#D4A537",fontWeight:"700",direction:"ltr",display:"inline-block"},children:l})]})]}),o.jsx("div",{style:{display:"flex",justifyContent:"center",gap:"8px",direction:"ltr"},children:f.map((_,x)=>o.jsx("input",{ref:I=>D.current[x]=I,type:"text",inputMode:"numeric",maxLength:1,value:_,onChange:I=>Z(x,I.target.value),onKeyDown:I=>le(x,I),style:{width:"46px",height:"52px",borderRadius:"12px",background:"rgba(13, 13, 16, 0.9)",border:`2px solid ${_?"#D4A537":"rgba(255, 255, 255, 0.15)"}`,color:"#FFFFFF",fontSize:"22px",fontWeight:"900",textAlign:"center",outline:"none",transition:"all 0.2s ease",fontFamily:"monospace"}},x))}),o.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",fontSize:"13px"},children:[o.jsx("button",{type:"button",onClick:()=>p(1),style:{background:"transparent",border:"none",color:"#9E9EA8",cursor:"pointer",padding:0,fontSize:"12px"},children:"تغيير رقم الهاتف"}),o.jsx("div",{children:Y?o.jsxs("button",{type:"button",onClick:xe,style:{background:"transparent",border:"none",color:"#D4A537",cursor:"pointer",fontWeight:"700",fontSize:"12px",display:"flex",alignItems:"center",gap:"4px"},children:[o.jsx($e,{size:13}),o.jsx("span",{children:"إعادة إرسال الرمز"})]}):o.jsxs("span",{style:{color:"#656570",fontSize:"12px"},children:["إعادة الإرسال خلال (",W," ثانية)"]})})]}),o.jsx(R,{type:"submit",variant:"primary",isLoading:A,style:{width:"100%"},children:"تأكيد وتوثيق الرقم"})]})]})}function to({isOpen:n,onClose:e,isEnabled:t,onStatusChange:r}){const{addToast:i}=gt(),[s,a]=m.useState(t?"recovery_codes":"setup"),[l,c]=m.useState(!1),[d,p]=m.useState({secret:"",qr_code_svg:"",qr_code_url:"",recovery_codes:[]}),[f,b]=m.useState(["","","","","",""]),[P,O]=m.useState(!1),[C,T]=m.useState(!1),[A,M]=m.useState(!1),[W,B]=m.useState(!1),[Y,k]=m.useState(""),[D,Q]=m.useState(!1),[xe,Z]=m.useState(!1),[le,de]=m.useState([]),[_,x]=m.useState(!1);m.useEffect(()=>{n&&(T(!1),b(["","","","","",""]),k(""),t?(a("recovery_codes"),V()):(a("setup"),I()))},[n,t]);const I=async()=>{var u;c(!0);try{const g=await fe.enable2FA(),y=((u=g.data)==null?void 0:u.data)||g.data;p({secret:y.secret||"",qr_code_svg:y.qr_code_svg||"",qr_code_url:y.qr_code_url||"",recovery_codes:y.recovery_codes||[]})}catch(g){console.error("Fetch 2FA setup error:",g),i("فشل في جلب بيانات إعداد المصادقة الثنائية","error")}finally{c(!1)}},V=async()=>{var u,g,y;x(!0);try{const w=await fe.getRecoveryCodes(),v=((g=(u=w.data)==null?void 0:u.data)==null?void 0:g.recovery_codes)||((y=w.data)==null?void 0:y.recovery_codes)||[];de(v)}catch(w){console.error("Fetch recovery codes error:",w)}finally{x(!1)}},ee=(u,g)=>{if(!/^[0-9]?$/.test(g))return;const y=[...f];if(y[u]=g,b(y),g&&u<5){const w=document.getElementById(`two-fa-code-${u+1}`);w&&w.focus()}},H=(u,g)=>{if(g.key==="Backspace"&&!f[u]&&u>0){const y=document.getElementById(`two-fa-code-${u-1}`);y&&y.focus()}},ue=u=>{u.preventDefault();const g=u.clipboardData.getData("text").replace(/\D/g,"").slice(0,6);if(!g)return;const y=[...f];for(let E=0;E<g.length;E++)y[E]=g[E];b(y);const w=Math.min(g.length,5),v=document.getElementById(`two-fa-code-${w}`);v&&v.focus()},_e=async u=>{var y,w,v;u==null||u.preventDefault();const g=f.join("");if(g.length!==6){i("يرجى إدخال رمز التحقق المكون من 6 أرقام","error");return}O(!0);try{const E=await fe.verify2FA(g),q=((y=E.data)==null?void 0:y.data)||E.data;q.recovery_codes&&p(Xn=>({...Xn,recovery_codes:q.recovery_codes})),T(!0),i("تم تفعيل المصادقة الثنائية بنجاح!","success"),r&&r(!0)}catch(E){console.error("Verify 2FA error:",E);const q=((v=(w=E.response)==null?void 0:w.data)==null?void 0:v.message)||"رمز التحقق غير صحيح أو منتهي الصلاحية";i(q,"error")}finally{O(!1)}},he=async u=>{var g,y;if(u.preventDefault(),!Y){i("يرجى إدخال كلمة المرور لتأكيد التعطيل","error");return}Z(!0);try{await fe.disable2FA(Y),i("تم تعطيل المصادقة الثنائية بنجاح","success"),r&&r(!1),e()}catch(w){console.error("Disable 2FA error:",w);const v=((y=(g=w.response)==null?void 0:g.data)==null?void 0:y.message)||"كلمة المرور غير صحيحة";i(v,"error")}finally{Z(!1)}},pe=()=>{d.secret&&(navigator.clipboard.writeText(d.secret),M(!0),i("تم نسخ المفتاح السري","success"),setTimeout(()=>M(!1),2e3))},nt=u=>{const g=u.join(`
`);navigator.clipboard.writeText(g),B(!0),i("تم نسخ رموز الاسترداد الاحتياطية","success"),setTimeout(()=>B(!1),2e3)},je=u=>{const g=`رموز الاسترداد الاحتياطية لمنصة سند ومهره كارد (2FA Backup Codes):

`+u.map((E,q)=>`${q+1}. ${E}`).join(`
`)+`

تاريخ الإنشاء: ${new Date().toLocaleString("ar-EG")}
* احتفظ بهذه الرموز في مكان آمن. كل رمز يستخدم لمرة واحدة فقط.`,y=new Blob([g],{type:"text/plain;charset=utf-8"}),w=URL.createObjectURL(y),v=document.createElement("a");v.href=w,v.download="mohra-sand-2fa-recovery-codes.txt",v.click(),URL.revokeObjectURL(w),i("تم تحميل ملف رموز الاسترداد","success")};return o.jsx(un,{isOpen:n,onClose:e,title:s==="disable"?"تعطيل المصادقة الثنائية (2FA)":t||C?"رموز الاسترداد الاحتياطية (2FA)":"إعداد المصادقة الثنائية (2FA)",children:o.jsxs("div",{style:{padding:"4px 0"},children:[s==="setup"&&!C&&o.jsx("div",{children:l?o.jsxs("div",{style:{textAlign:"center",padding:"40px 0",color:"#D4A537"},children:[o.jsx($e,{size:32,className:"spin",style:{margin:"0 auto 12px"}}),o.jsx("div",{style:{fontSize:"14px",color:"#9E9EA8"},children:"جاري توليد مفتاح الأمان والباركود..."})]}):o.jsxs("div",{children:[o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px",background:"rgba(212, 165, 55, 0.08)",border:"1px solid rgba(212, 165, 55, 0.2)",padding:"12px 16px",borderRadius:"12px",marginBottom:"20px"},children:[o.jsx(hn,{size:24,color:"#D4A537",style:{flexShrink:0}}),o.jsxs("p",{style:{margin:0,fontSize:"13px",color:"#E2E8F0",lineHeight:"1.5"},children:["قم بمسح الباركود باستخدام تطبيق ",o.jsx("strong",{children:"Google Authenticator"})," أو أدخل المفتاح السري يدوياً في التطبيق."]})]}),o.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"14px",background:"#0D0D0F",border:"1px solid rgba(255, 255, 255, 0.1)",borderRadius:"16px",padding:"clamp(12px, 3vw, 18px)",marginBottom:"18px",maxWidth:"100%",boxSizing:"border-box",overflow:"hidden"},children:[d.qr_code_svg?o.jsx("div",{style:{background:"#FFFFFF",padding:"8px",borderRadius:"12px",boxShadow:"0 0 20px rgba(212, 165, 55, 0.2)",maxWidth:"100%",display:"flex",justifyContent:"center",alignItems:"center",boxSizing:"border-box",overflow:"hidden"},dangerouslySetInnerHTML:{__html:d.qr_code_svg.replace(/<svg\b([^>]*)>/i,(u,g)=>`<svg ${g} style="max-width: clamp(140px, 44vw, 190px); height: auto; display: block; margin: 0 auto;">`)}}):o.jsx("div",{style:{width:"clamp(140px, 44vw, 180px)",height:"clamp(140px, 44vw, 180px)",background:"#1A1A22",borderRadius:"12px",display:"flex",alignItems:"center",justifyContent:"center"},children:o.jsx(xr,{size:40,color:"#D4A537"})}),o.jsxs("div",{style:{width:"100%",textAlign:"center",maxWidth:"100%",boxSizing:"border-box"},children:[o.jsx("span",{style:{fontSize:"11px",color:"#9E9EA8",display:"block",marginBottom:"6px"},children:"المفتاح السري للإدخال اليدوي:"}),o.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",gap:"6px",background:"rgba(255, 255, 255, 0.05)",border:"1px dashed rgba(212, 165, 55, 0.4)",padding:"6px 10px",borderRadius:"10px",maxWidth:"100%",boxSizing:"border-box"},children:[o.jsx("span",{style:{fontFamily:"monospace",fontSize:"clamp(10.5px, 2.8vw, 13px)",fontWeight:"800",color:"#D4A537",letterSpacing:"0.5px",wordBreak:"break-all",lineHeight:1.3,textAlign:"center"},children:d.secret}),o.jsx("button",{type:"button",onClick:pe,style:{background:"transparent",border:"none",color:"#D4A537",cursor:"pointer",padding:"2px",flexShrink:0},title:"نسخ المفتاح",children:A?o.jsx(ut,{size:16,color:"#22C55E"}):o.jsx(ht,{size:16})})]})]})]}),o.jsxs("form",{onSubmit:_e,children:[o.jsx("label",{style:{display:"block",fontSize:"12.5px",fontWeight:"700",color:"#FFFFFF",marginBottom:"12px",textAlign:"center",lineHeight:"1.4"},children:"أدخل رمز التحقق (6 أرقام) من تطبيق Authenticator:"}),o.jsx("div",{onPaste:ue,style:{display:"flex",justifyContent:"center",gap:"clamp(4px, 1.8vw, 8px)",direction:"ltr",marginBottom:"20px",maxWidth:"100%",boxSizing:"border-box",padding:"0 2px"},children:f.map((u,g)=>o.jsx("input",{id:`two-fa-code-${g}`,type:"text",inputMode:"numeric",maxLength:1,value:u,onChange:y=>ee(g,y.target.value),onKeyDown:y=>H(g,y),style:{width:"clamp(32px, 11vw, 44px)",height:"clamp(42px, 13vw, 52px)",borderRadius:"10px",border:"1px solid rgba(212, 165, 55, 0.3)",background:"rgba(13, 13, 16, 0.8)",color:"#FFFFFF",fontSize:"clamp(16px, 4.5vw, 22px)",fontWeight:"900",textAlign:"center",outline:"none",boxShadow:u?"0 0 10px rgba(212, 165, 55, 0.3)":"none",transition:"all 0.2s ease",flexShrink:1,minWidth:0,boxSizing:"border-box"}},g))}),o.jsxs("div",{style:{display:"flex",gap:"10px",flexWrap:"wrap"},children:[o.jsx(R,{type:"submit",variant:"primary",isLoading:P,disabled:f.join("").length!==6,style:{flex:"1 1 140px"},children:"تأكيد وتفعيل المصادقة"}),o.jsx(R,{type:"button",variant:"secondary",onClick:e,style:{flex:"1 1 80px"},children:"إلغاء"})]})]})]})}),(C||s==="recovery_codes")&&o.jsxs("div",{children:[o.jsxs("div",{style:{textAlign:"center",marginBottom:"20px"},children:[o.jsx("div",{style:{width:"56px",height:"56px",borderRadius:"50%",background:"rgba(34, 197, 94, 0.15)",border:"1px solid rgba(34, 197, 94, 0.3)",color:"#22C55E",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 12px"},children:o.jsx(lt,{size:32})}),o.jsx("h4",{style:{margin:"0 0 6px",fontSize:"18px",fontWeight:"800",color:"#FFFFFF"},children:C?"تم تفعيل المصادقة الثنائية بنجاح!":"المصادقة الثنائية مفعلة"}),o.jsx("p",{style:{margin:0,fontSize:"13px",color:"#9E9EA8",lineHeight:"1.5"},children:"احتفظ برموز الاسترداد الاحتياطية هذه في مكان آمن لاستخدامها في حال فقدت الوصول لتطبيق المصادقة."})]}),o.jsx("div",{style:{background:"#0D0D0F",border:"1px solid rgba(255, 255, 255, 0.1)",borderRadius:"16px",padding:"18px",marginBottom:"20px"},children:_?o.jsxs("div",{style:{textAlign:"center",padding:"20px 0",color:"#9E9EA8"},children:[o.jsx($e,{size:24,className:"spin",style:{margin:"0 auto 8px"}}),o.jsx("span",{style:{fontSize:"13px"},children:"جاري جلب رموز الاسترداد..."})]}):o.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:"10px",direction:"ltr"},children:(C?d.recovery_codes:le).map((u,g)=>o.jsx("div",{style:{background:"rgba(255, 255, 255, 0.04)",border:"1px solid rgba(212, 165, 55, 0.2)",padding:"8px 12px",borderRadius:"8px",textAlign:"center",fontFamily:"monospace",fontSize:"13px",fontWeight:"700",color:"#F3E5AB",letterSpacing:"1px"},children:u},g))})}),o.jsxs("div",{style:{display:"flex",gap:"10px",marginBottom:"20px"},children:[o.jsx(R,{type:"button",variant:"outline",onClick:()=>nt(C?d.recovery_codes:le),icon:W?ut:ht,style:{flex:1,borderColor:"rgba(212, 165, 55, 0.3)",color:"#F3E5AB"},children:W?"تم النسخ":"نسخ الرموز"}),o.jsx(R,{type:"button",variant:"outline",onClick:()=>je(C?d.recovery_codes:le),icon:Cr,style:{flex:1,borderColor:"rgba(255, 255, 255, 0.2)"},children:"تحميل كملف"})]}),o.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",borderTop:"1px solid rgba(255, 255, 255, 0.08)",paddingTop:"16px"},children:[t&&o.jsx("button",{type:"button",onClick:()=>a("disable"),style:{background:"transparent",border:"none",color:"#EF4444",fontSize:"13px",fontWeight:"700",cursor:"pointer",padding:0},children:"تعطيل المصادقة الثنائية"}),o.jsx(R,{type:"button",variant:"primary",onClick:e,style:{minWidth:"120px",marginRight:"auto"},children:"إغلاق"})]})]}),s==="disable"&&o.jsxs("form",{onSubmit:he,children:[o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px",background:"rgba(239, 68, 68, 0.1)",border:"1px solid rgba(239, 68, 68, 0.25)",padding:"12px 16px",borderRadius:"12px",marginBottom:"20px"},children:[o.jsx(gr,{size:24,color:"#EF4444",style:{flexShrink:0}}),o.jsx("p",{style:{margin:0,fontSize:"13px",color:"#FCA5A5",lineHeight:"1.5"},children:"تنبيه: تعطيل المصادقة الثنائية سيقلل من مستوى أمان حسابك وعمليات السحب والشحن."})]}),o.jsxs("div",{style:{marginBottom:"20px"},children:[o.jsx("label",{style:{display:"block",fontSize:"13px",fontWeight:"700",color:"#B8B8C2",marginBottom:"8px"},children:"أدخل كلمة المرور الحالية لتأكيد التعطيل:"}),o.jsxs("div",{style:{position:"relative"},children:[o.jsx(ne,{type:D?"text":"password",value:Y,onChange:u=>k(u.target.value),placeholder:"••••••••",required:!0}),o.jsx("button",{type:"button",onClick:()=>Q(!D),style:{position:"absolute",left:"12px",top:"50%",transform:"translateY(-50%)",background:"transparent",border:"none",color:"#8E8E98",cursor:"pointer"},children:D?o.jsx(Ue,{size:16}):o.jsx(ze,{size:16})})]})]}),o.jsxs("div",{style:{display:"flex",gap:"12px"},children:[o.jsx(R,{type:"submit",variant:"danger",isLoading:xe,style:{flex:1},children:"تأكيد تعطيل 2FA"}),o.jsx(R,{type:"button",variant:"secondary",onClick:()=>a("recovery_codes"),children:"تراجع"})]})]})]})})}function To(){var je;const{user:n,refreshProfile:e,setUser:t}=an(),{addToast:r}=gt(),{t:i,isRtl:s,language:a}=Qn(),{theme:l}=Zn(),c=l==="light",d=m.useRef(null),[p,f]=m.useState("info"),[b,P]=m.useState(!1),[O,C]=m.useState(!1),[T,A]=m.useState({name:(n==null?void 0:n.name)||"",phone:(n==null?void 0:n.phone)||"",country:(n==null?void 0:n.country)||"EG",currency:(n==null?void 0:n.currency)||"EGP"}),[M,W]=m.useState(!1),[B,Y]=m.useState(!1),[k,D]=m.useState({current_password:"",password:"",password_confirmation:""}),[Q,xe]=m.useState(!1),[Z,le]=m.useState(!1),[de,_]=m.useState(!1),[x,I]=m.useState(!1),[V,ee]=m.useState(!1);er.useEffect(()=>{n&&A({name:n.name||"",phone:n.phone||"",country:n.country||"EG",currency:n.currency||"EGP"})},[n]);const H=async u=>{var g,y,w;u.preventDefault(),W(!0);try{const v=await fe.updateProfile(T),E=((g=v.data)==null?void 0:g.data)||v.data;E&&t(E),r(i("profileUpdatedSuccess","تم تحديث البيانات الشخصية بنجاح"),"success")}catch(v){console.error("Update profile error:",v);const E=((w=(y=v.response)==null?void 0:y.data)==null?void 0:w.message)||i("profileUpdateFailed","فشل تحديث البيانات، يرجى المحاولة لاحقاً");r(E,"error")}finally{W(!1)}},ue=async u=>{var w,v;const g=(w=u.target.files)==null?void 0:w[0];if(!g)return;if(g.size>2*1024*1024){r(i("maxAvatarSize","الحد الأقصى لحجم الصورة هو 2 ميجابايت"),"error");return}Y(!0);const y=new FormData;y.append("avatar",g);try{const E=await fe.updateProfile(y),q=((v=E.data)==null?void 0:v.data)||E.data;q&&t(q),r(i("avatarUpdatedSuccess","تم تحديث الصورة الشخصية بنجاح"),"success")}catch(E){console.error("Avatar upload error:",E),r(i("avatarUploadFailed","فشل رفع الصورة الشخصية"),"error")}finally{Y(!1)}},_e=async u=>{var g,y;if(u.preventDefault(),k.password!==k.password_confirmation){r(i("passwordMismatch","تأكيد كلمة المرور غير متطابق"),"error");return}if(k.password.length<8){r(i("passwordMinLength","يجب ألا تقل كلمة المرور الجديدة عن 8 أحرف وأرقام"),"error");return}I(!0);try{await fe.updatePassword(k),r(i("passwordChangedSuccess","تم تغيير كلمة المرور بنجاح"),"success"),D({current_password:"",password:"",password_confirmation:""})}catch(w){console.error("Password change error:",w);const v=((y=(g=w.response)==null?void 0:g.data)==null?void 0:y.message)||i("passwordChangeFailed","فشل تغيير كلمة المرور، يرجى التأكد من كلمة المرور الحالية");r(v,"error")}finally{I(!1)}},he=()=>{n!=null&&n.referral_code&&(navigator.clipboard.writeText(n.referral_code),P(!0),r(i("copied","تم النسخ بنجاح"),"success"),setTimeout(()=>P(!1),2e3))},pe=[{value:"EG",label:a==="en"?"🇪🇬 Egypt":"🇪🇬 مصر"},{value:"SA",label:a==="en"?"🇸🇦 Saudi Arabia":"🇸🇦 السعودية"},{value:"AE",label:a==="en"?"🇦🇪 UAE":"🇦🇪 الإمارات"},{value:"KW",label:a==="en"?"🇰🇼 Kuwait":"🇰🇼 الكويت"},{value:"SY",label:a==="en"?"🇸🇾 Syria":"🇸🇾 سوريا"},{value:"IQ",label:a==="en"?"🇮🇶 Iraq":"🇮🇶 العراق"},{value:"JO",label:a==="en"?"🇯🇴 Jordan":"🇯🇴 الأردن"},{value:"OTHER",label:a==="en"?"Other":"دولة أخرى"}],nt=[{value:"EGP",label:a==="en"?"EGP — Egyptian Pound":"EGP — جنيه مصري"},{value:"USD",label:a==="en"?"USD — US Dollar":"USD — دولار أمريكي"},{value:"SAR",label:a==="en"?"SAR — Saudi Riyal":"SAR — ريال سعودي"},{value:"SYP",label:a==="en"?"SYP — Syrian Pound":"SYP — ليرة سورية"}];return o.jsx(mr,{children:o.jsxs("div",{style:{width:"100%",maxWidth:"100%",margin:"0",padding:"10px 0 60px"},children:[o.jsxs("div",{style:{background:c?"#FFFFFF":"linear-gradient(135deg, #09172e 0%, #060e1d 100%)",border:c?"1.5px solid rgba(212, 165, 55, 0.45)":"1.5px solid rgba(56, 189, 248, 0.4)",borderRadius:"24px",padding:"clamp(18px, 3.5vw, 30px)",marginBottom:"28px",position:"relative",overflow:"hidden",boxShadow:c?"0 10px 30px rgba(30, 80, 140, 0.08)":"0 12px 35px rgba(0, 0, 0, 0.6), 0 0 25px rgba(56, 189, 248, 0.15)"},children:[o.jsx("div",{style:{position:"absolute",top:"-60px",left:"-60px",width:"200px",height:"200px",borderRadius:"50%",background:"radial-gradient(circle, rgba(212, 165, 55, 0.15) 0%, transparent 70%)",pointerEvents:"none"}}),o.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"24px",position:"relative",zIndex:1},children:[o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"20px",flexWrap:"wrap"},children:[o.jsxs("div",{style:{position:"relative"},children:[o.jsx("div",{style:{width:"84px",height:"84px",borderRadius:"24px",background:n!=null&&n.avatar_url?`url(${n.avatar_url}) center/cover no-repeat`:c?"#FEFCE8":"linear-gradient(135deg, #2A2A35 0%, #1A1A22 100%)",border:"2px solid #D4A537",display:"flex",alignItems:"center",justifyContent:"center",color:c?"#B45309":"#D4A537",fontSize:"32px",fontWeight:"900",boxShadow:"0 0 20px rgba(212, 165, 55, 0.25)",overflow:"hidden"},children:!(n!=null&&n.avatar_url)&&(n!=null&&n.name?n.name[0].toUpperCase():"U")}),o.jsx("button",{onClick:()=>{var u;return(u=d.current)==null?void 0:u.click()},disabled:B,title:i("changeAvatar","تغيير الصورة الشخصية"),style:{position:"absolute",bottom:"-4px",right:s?"-4px":"auto",left:s?"auto":"-4px",width:"30px",height:"30px",borderRadius:"10px",background:"#D4A537",color:"#0D0D0F",border:c?"2px solid #FFFFFF":"2px solid #1A1A22",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",transition:"all 0.2s ease",boxShadow:"0 2px 8px rgba(0,0,0,0.2)"},children:B?o.jsx($e,{size:14,className:"spin"}):o.jsx(kr,{size:14})}),o.jsx("input",{ref:d,type:"file",accept:"image/*",onChange:ue,style:{display:"none"}})]}),o.jsxs("div",{children:[o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px",marginBottom:"6px"},children:[o.jsx("h2",{style:{margin:0,fontSize:"22px",fontWeight:"900",color:c?"#0F172A":"#FFFFFF"},children:(n==null?void 0:n.name)||i("emperorUser","مستخدم سند ومهره")}),o.jsx("span",{style:{padding:"2px 8px",borderRadius:"6px",background:"linear-gradient(135deg, #D4A537 0%, #AA7C11 100%)",color:"#0D0D0F",fontSize:"11px",fontWeight:"800"},children:(n==null?void 0:n.role)==="admin"?i("vipMember","VIP MEMBER"):i("storeMember","STORE MEMBER")})]}),o.jsxs("p",{style:{margin:"0 0 8px",fontSize:"14px",color:c?"#475569":"#9E9EA8",display:"flex",alignItems:"center",gap:"6px"},children:[o.jsx(_r,{size:14}),o.jsx("span",{children:(n==null?void 0:n.email)||"—"})]}),(n==null?void 0:n.referral_code)&&o.jsxs("div",{style:{display:"inline-flex",alignItems:"center",gap:"8px",background:c?"#FEFCE8":"rgba(212, 165, 55, 0.1)",border:c?"1px solid rgba(212, 165, 55, 0.4)":"1px solid rgba(212, 165, 55, 0.25)",padding:"4px 10px",borderRadius:"8px",fontSize:"12px",color:c?"#92400E":"#F3E5AB",fontWeight:"700"},children:[o.jsxs("span",{children:[i("referralCodeColon","كود الإحالة:")," ",n.referral_code]}),o.jsx("button",{onClick:he,style:{background:"transparent",border:"none",color:c?"#B45309":"#D4A537",cursor:"pointer",padding:0},children:b?o.jsx(ut,{size:14}):o.jsx(ht,{size:14})})]})]})]}),o.jsxs("div",{style:{background:c?"#F8FAFC":"rgba(9, 23, 46, 0.85)",border:c?"1px solid #CBD5E1":"1.5px solid rgba(56, 189, 248, 0.35)",borderRadius:"16px",padding:"16px 20px",minWidth:"200px",textAlign:"center",boxShadow:c?"0 4px 12px rgba(30, 80, 140, 0.05)":"none"},children:[o.jsx("span",{style:{fontSize:"12px",color:c?"#64748B":"#94A3B8",display:"block",marginBottom:"4px"},children:i("availableBalanceInWallet","الرصيد المتاح بالمحفظة")}),o.jsxs("div",{style:{fontSize:"24px",fontWeight:"900",color:c?"#B45309":"#38BDF8",marginBottom:"8px"},children:[((je=n==null?void 0:n.wallet)==null?void 0:je.balance)!==void 0?Number(n.wallet.balance).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}):"0.00"," ",o.jsx("span",{style:{fontSize:"14px"},children:a==="en"?"EGP":"ج.م"})]}),o.jsxs(Se,{to:"/wallet",style:{display:"inline-flex",alignItems:"center",gap:"6px",fontSize:"12px",color:c?"#92400E":"#F3E5AB",textDecoration:"none",fontWeight:"700"},children:[o.jsx("span",{children:i("manageAndChargeWallet","شحن وإدارة المحفظة")}),o.jsx(wr,{size:12})]})]})]})]}),o.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(180px, 1fr))",gap:"12px",marginBottom:"28px"},children:[o.jsxs(Se,{to:"/orders",style:{background:c?"#FFFFFF":"rgba(22, 22, 30, 0.7)",border:c?"1.5px solid rgba(212, 165, 55, 0.35)":"1px solid rgba(255, 255, 255, 0.08)",borderRadius:"14px",padding:"14px 18px",display:"flex",alignItems:"center",gap:"12px",textDecoration:"none",color:c?"#0F172A":"#FFFFFF",transition:"all 0.2s ease",boxShadow:c?"0 4px 12px rgba(30, 80, 140, 0.05)":"none"},onMouseEnter:u=>u.currentTarget.style.borderColor="#D4A537",onMouseLeave:u=>u.currentTarget.style.borderColor=c?"rgba(212, 165, 55, 0.35)":"rgba(255, 255, 255, 0.08)",children:[o.jsx(br,{size:20,color:"#D4A537"}),o.jsxs("div",{children:[o.jsx("div",{style:{fontSize:"14px",fontWeight:"700"},children:i("myOrdersHistory","سجل طلباتي")}),o.jsx("div",{style:{fontSize:"11px",color:c?"#64748B":"#9E9EA8"},children:i("trackShippingStatus","تتبع حالة الشحن")})]})]}),o.jsxs(Se,{to:"/target/apps",style:{background:c?"#FFFFFF":"linear-gradient(145deg, #09172e 0%, #060e1d 100%)",border:c?"1.5px solid rgba(212, 165, 55, 0.35)":"1px solid rgba(56, 189, 248, 0.35)",borderRadius:"14px",padding:"14px 18px",display:"flex",alignItems:"center",gap:"12px",textDecoration:"none",color:c?"#0F172A":"#FFFFFF",transition:"all 0.2s ease",boxShadow:c?"0 4px 12px rgba(30, 80, 140, 0.05)":"none"},onMouseEnter:u=>u.currentTarget.style.borderColor="#38BDF8",onMouseLeave:u=>u.currentTarget.style.borderColor=c?"rgba(212, 165, 55, 0.35)":"rgba(56, 189, 248, 0.35)",children:[o.jsx(Ir,{size:20,color:"#38BDF8"}),o.jsxs("div",{children:[o.jsx("div",{style:{fontSize:"14px",fontWeight:"700"},children:i("targetSelling","بيع التارجت")}),o.jsx("div",{style:{fontSize:"11px",color:c?"#64748B":"#94A3B8"},children:i("transferAppProfits","تحويل أرباح التطبيقات")})]})]}),o.jsxs(Se,{to:"/referrals",style:{background:c?"#FFFFFF":"linear-gradient(145deg, #09172e 0%, #060e1d 100%)",border:c?"1.5px solid rgba(212, 165, 55, 0.35)":"1px solid rgba(56, 189, 248, 0.35)",borderRadius:"14px",padding:"14px 18px",display:"flex",alignItems:"center",gap:"12px",textDecoration:"none",color:c?"#0F172A":"#FFFFFF",transition:"all 0.2s ease",boxShadow:c?"0 4px 12px rgba(30, 80, 140, 0.05)":"none"},onMouseEnter:u=>u.currentTarget.style.borderColor="#38BDF8",onMouseLeave:u=>u.currentTarget.style.borderColor=c?"rgba(212, 165, 55, 0.35)":"rgba(56, 189, 248, 0.35)",children:[o.jsx(vr,{size:20,color:"#22C55E"}),o.jsxs("div",{children:[o.jsx("div",{style:{fontSize:"14px",fontWeight:"700"},children:i("referralProgram","برنامج الإحالات")}),o.jsx("div",{style:{fontSize:"11px",color:c?"#64748B":"#94A3B8"},children:i("profitsAndCommissions","الأرباح والعمولات")})]})]}),o.jsxs(Se,{to:"/settings",style:{background:c?"#FFFFFF":"linear-gradient(145deg, #09172e 0%, #060e1d 100%)",border:c?"1.5px solid rgba(212, 165, 55, 0.35)":"1px solid rgba(56, 189, 248, 0.35)",borderRadius:"14px",padding:"14px 18px",display:"flex",alignItems:"center",gap:"12px",textDecoration:"none",color:c?"#0F172A":"#FFFFFF",transition:"all 0.2s ease",boxShadow:c?"0 4px 12px rgba(30, 80, 140, 0.05)":"none"},onMouseEnter:u=>u.currentTarget.style.borderColor="#38BDF8",onMouseLeave:u=>u.currentTarget.style.borderColor=c?"rgba(212, 165, 55, 0.35)":"rgba(56, 189, 248, 0.35)",children:[o.jsx(Er,{size:20,color:"#F59E0B"}),o.jsxs("div",{children:[o.jsx("div",{style:{fontSize:"14px",fontWeight:"700"},children:i("accountSettings","إعدادات الحساب")}),o.jsx("div",{style:{fontSize:"11px",color:c?"#64748B":"#94A3B8"},children:i("preferencesAndAppearance","التفضيلات والمظهر")})]})]})]}),o.jsxs("div",{style:{display:"flex",gap:"12px",marginBottom:"24px",borderBottom:"1px solid rgba(255, 255, 255, 0.08)",paddingBottom:"12px"},children:[o.jsxs("button",{onClick:()=>f("info"),style:{display:"flex",alignItems:"center",gap:"8px",padding:"10px 22px",borderRadius:"12px",fontSize:"14px",fontWeight:"700",fontFamily:"var(--font-cairo)",cursor:"pointer",transition:"all 0.2s ease",background:p==="info"?"linear-gradient(135deg, #D4A537 0%, #AA7C11 100%)":c?"#F1F5F9":"rgba(255, 255, 255, 0.05)",color:p==="info"?"#0D0D0F":c?"#475569":"#9E9EA8",border:p==="info"?"none":c?"1px solid #E2E8F0":"1px solid rgba(255, 255, 255, 0.08)"},children:[o.jsx(Sr,{size:16}),o.jsx("span",{children:i("basicInfo","البيانات الأساسية")})]}),o.jsxs("button",{onClick:()=>f("security"),style:{display:"flex",alignItems:"center",gap:"8px",padding:"10px 22px",borderRadius:"12px",fontSize:"14px",fontWeight:"700",fontFamily:"var(--font-cairo)",cursor:"pointer",transition:"all 0.2s ease",background:p==="security"?"linear-gradient(135deg, #D4A537 0%, #AA7C11 100%)":c?"#F1F5F9":"rgba(255, 255, 255, 0.05)",color:p==="security"?"#0D0D0F":c?"#475569":"#9E9EA8",border:p==="security"?"none":c?"1px solid #E2E8F0":"1px solid rgba(255, 255, 255, 0.08)"},children:[o.jsx(Dt,{size:16}),o.jsx("span",{children:i("securityAndPassword","الأمان وكلمة المرور")})]})]}),p==="info"&&o.jsxs("div",{style:{background:c?"#FFFFFF":"linear-gradient(145deg, #09172e 0%, #060e1d 100%)",border:c?"1px solid #E2E8F0":"1.5px solid rgba(56, 189, 248, 0.35)",borderRadius:"20px",padding:"28px",boxShadow:c?"0 4px 20px rgba(0, 0, 0, 0.04)":"0 8px 30px rgba(0, 0, 0, 0.5)"},children:[o.jsx("h3",{style:{margin:"0 0 20px",fontSize:"18px",fontWeight:"800",color:c?"#0F172A":"#F5D061"},children:i("editPersonalInfo","تعديل البيانات الشخصية")}),o.jsxs("form",{onSubmit:H,children:[o.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(min(100%, 260px), 1fr))",gap:"20px",marginBottom:"24px"},children:[o.jsxs("div",{children:[o.jsx("label",{style:{display:"block",fontSize:"13px",fontWeight:"700",color:c?"#475569":"#B8B8C2",marginBottom:"8px"},children:i("fullName","الاسم الكامل")}),o.jsx(ne,{type:"text",value:T.name,onChange:u=>A({...T,name:u.target.value}),placeholder:i("enterFullName","أدخل اسمك الكامل"),required:!0})]}),o.jsxs("div",{children:[o.jsx("label",{style:{display:"block",fontSize:"13px",fontWeight:"700",color:c?"#475569":"#B8B8C2",marginBottom:"8px"},children:i("emailNonEditable","البريد الإلكتروني (غير قابل للتعديل)")}),o.jsx(ne,{type:"email",value:(n==null?void 0:n.email)||"",disabled:!0,style:{opacity:.6,cursor:"not-allowed"}})]}),o.jsxs("div",{children:[o.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"8px"},children:[o.jsx("label",{style:{fontSize:"13px",fontWeight:"700",color:c?"#475569":"#B8B8C2"},children:i("phoneWhatsapp","رقم الهاتف / الواتساب")}),n!=null&&n.phone_verified_at?o.jsxs("span",{style:{fontSize:"11px",color:"#22C55E",fontWeight:"700",display:"flex",alignItems:"center",gap:"4px"},children:[o.jsx(lt,{size:13})," ",i("verifiedAndConfirmed","موثق ومؤكد")]}):o.jsx("button",{type:"button",onClick:()=>C(!0),style:{background:"rgba(212, 165, 55, 0.15)",border:"1px solid rgba(212, 165, 55, 0.3)",color:"#D4A537",borderRadius:"6px",padding:"2px 8px",fontSize:"11px",fontWeight:"800",cursor:"pointer"},children:i("verifyPhoneSMS","تأكيد وتوثيق الرقم (SMS)")})]}),o.jsx(ne,{type:"tel",value:T.phone,onChange:u=>A({...T,phone:u.target.value}),placeholder:"010XXXXXXXX"})]}),o.jsxs("div",{children:[o.jsx("label",{style:{display:"block",fontSize:"13px",fontWeight:"700",color:c?"#475569":"#B8B8C2",marginBottom:"8px"},children:i("country","الدولة")}),o.jsx(Ot,{value:T.country,onChange:u=>A({...T,country:u.target.value}),options:pe})]}),o.jsxs("div",{children:[o.jsx("label",{style:{display:"block",fontSize:"13px",fontWeight:"700",color:c?"#475569":"#B8B8C2",marginBottom:"8px"},children:i("defaultCurrency","العملة الافتراضية")}),o.jsx(Ot,{value:T.currency,onChange:u=>A({...T,currency:u.target.value}),options:nt})]})]}),o.jsx("div",{style:{display:"flex",justifyContent:"flex-end"},children:o.jsx(R,{type:"submit",variant:"primary",isLoading:M,style:{minWidth:"160px"},children:i("saveChanges","حفظ التغييرات")})})]})]}),p==="security"&&o.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"24px"},children:[o.jsxs("div",{style:{background:c?"#FFFFFF":"linear-gradient(145deg, #09172e 0%, #060e1d 100%)",border:c?"1px solid #E2E8F0":"1.5px solid rgba(56, 189, 248, 0.35)",borderRadius:"20px",padding:"28px",boxShadow:c?"0 4px 20px rgba(0, 0, 0, 0.04)":"0 8px 30px rgba(0, 0, 0, 0.5)"},children:[o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px",marginBottom:"20px"},children:[o.jsx(Tr,{size:20,color:"#38BDF8"}),o.jsx("h3",{style:{margin:0,fontSize:"18px",fontWeight:"800",color:c?"#0F172A":"#F5D061"},children:i("changePassword","تغيير كلمة المرور")})]}),o.jsxs("form",{onSubmit:_e,children:[o.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(min(100%, 250px), 1fr))",gap:"20px",marginBottom:"24px"},children:[o.jsxs("div",{children:[o.jsx("label",{style:{display:"block",fontSize:"13px",fontWeight:"700",color:c?"#475569":"#B8B8C2",marginBottom:"8px"},children:i("currentPassword","كلمة المرور الحالية")}),o.jsxs("div",{style:{position:"relative"},children:[o.jsx(ne,{type:Q?"text":"password",value:k.current_password,onChange:u=>D({...k,current_password:u.target.value}),placeholder:"••••••••",required:!0}),o.jsx("button",{type:"button",onClick:()=>xe(!Q),style:{position:"absolute",left:s?"12px":"auto",right:s?"auto":"12px",top:"50%",transform:"translateY(-50%)",background:"none",border:"none",color:"#8E8E98",cursor:"pointer"},children:Q?o.jsx(Ue,{size:16}):o.jsx(ze,{size:16})})]})]}),o.jsxs("div",{children:[o.jsx("label",{style:{display:"block",fontSize:"13px",fontWeight:"700",color:c?"#475569":"#B8B8C2",marginBottom:"8px"},children:i("newPassword","كلمة المرور الجديدة")}),o.jsxs("div",{style:{position:"relative"},children:[o.jsx(ne,{type:Z?"text":"password",value:k.password,onChange:u=>D({...k,password:u.target.value}),placeholder:i("newPasswordHint","8 أحرف وأرقام على الأقل"),required:!0}),o.jsx("button",{type:"button",onClick:()=>le(!Z),style:{position:"absolute",left:s?"12px":"auto",right:s?"auto":"12px",top:"50%",transform:"translateY(-50%)",background:"none",border:"none",color:"#8E8E98",cursor:"pointer"},children:Z?o.jsx(Ue,{size:16}):o.jsx(ze,{size:16})})]})]}),o.jsxs("div",{children:[o.jsx("label",{style:{display:"block",fontSize:"13px",fontWeight:"700",color:c?"#475569":"#B8B8C2",marginBottom:"8px"},children:i("confirmNewPassword","تأكيد كلمة المرور الجديدة")}),o.jsxs("div",{style:{position:"relative"},children:[o.jsx(ne,{type:de?"text":"password",value:k.password_confirmation,onChange:u=>D({...k,password_confirmation:u.target.value}),placeholder:i("reenterPassword","أعد كتابة كلمة المرور"),required:!0}),o.jsx("button",{type:"button",onClick:()=>_(!de),style:{position:"absolute",left:s?"12px":"auto",right:s?"auto":"12px",top:"50%",transform:"translateY(-50%)",background:"none",border:"none",color:"#8E8E98",cursor:"pointer"},children:de?o.jsx(Ue,{size:16}):o.jsx(ze,{size:16})})]})]})]}),o.jsx("div",{style:{display:"flex",justifyContent:"flex-end"},children:o.jsx(R,{type:"submit",variant:"primary",isLoading:x,style:{minWidth:"160px"},children:i("updatePassword","تحديث كلمة المرور")})})]})]}),o.jsxs("div",{style:{background:c?"#FFFFFF":"rgba(22, 22, 30, 0.8)",border:c?"1px solid #E2E8F0":"1px solid rgba(255, 255, 255, 0.08)",borderRadius:"20px",padding:"28px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"20px",boxShadow:c?"0 4px 20px rgba(0, 0, 0, 0.04)":"none"},children:[o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"16px"},children:[o.jsx("div",{style:{width:"48px",height:"48px",borderRadius:"14px",background:n!=null&&n.two_factor_confirmed_at?"rgba(34, 197, 94, 0.15)":"rgba(212, 165, 55, 0.15)",border:`1px solid ${n!=null&&n.two_factor_confirmed_at?"rgba(34, 197, 94, 0.3)":"rgba(212, 165, 55, 0.3)"}`,color:n!=null&&n.two_factor_confirmed_at?"#22C55E":"#D4A537",display:"flex",alignItems:"center",justifyContent:"center"},children:o.jsx(Dt,{size:24})}),o.jsxs("div",{children:[o.jsx("h4",{style:{margin:"0 0 4px",fontSize:"16px",fontWeight:"800",color:c?"#0F172A":"#FFFFFF"},children:i("twoFactorAuth","المصادقة الثنائية (2FA Authentication)")}),o.jsx("p",{style:{margin:0,fontSize:"13px",color:c?"#64748B":"#9E9EA8"},children:n!=null&&n.two_factor_confirmed_at?i("twoFactorActiveDesc","المصادقة الثنائية مفعلة ونشطة لحماية معاملاتك المالية"):i("twoFactorInactiveDesc","تفعيل طبقة أمان إضافية لحماية حسابك عبر تطبيق Google Authenticator")})]})]}),o.jsx("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:n!=null&&n.two_factor_confirmed_at?o.jsxs(o.Fragment,{children:[o.jsxs("span",{style:{display:"inline-flex",alignItems:"center",gap:"6px",padding:"8px 16px",borderRadius:"10px",background:"rgba(34, 197, 94, 0.15)",color:"#16A34A",fontSize:"13px",fontWeight:"800"},children:[o.jsx(lt,{size:16})," ",i("activeSuccess","مفعلة بنجاح")]}),o.jsx(R,{variant:"outline",size:"sm",onClick:()=>ee(!0),style:{borderColor:c?"#CBD5E1":"rgba(255, 255, 255, 0.15)",color:c?"#334155":"#CBD5E1"},children:i("manageRecoveryCodes","إدارة ورموز الاسترداد")})]}):o.jsx(R,{variant:"outline",onClick:()=>ee(!0),style:{borderColor:"rgba(212, 165, 55, 0.4)",color:c?"#92400E":"#F3E5AB"},children:i("enable2FA","تفعيل المصادقة الثنائية")})})]})]}),o.jsx(to,{isOpen:V,onClose:()=>ee(!1),isEnabled:!!(n!=null&&n.two_factor_confirmed_at),onStatusChange:()=>{e()}}),o.jsx(eo,{isOpen:O,onClose:()=>C(!1),initialPhone:T.phone,onVerified:u=>{u!=null&&u.phone&&A(g=>({...g,phone:u.phone}))}})]})})}export{To as default};
