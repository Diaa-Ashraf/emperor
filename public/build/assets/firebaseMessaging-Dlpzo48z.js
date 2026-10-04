import{c as j,s as Ue}from"./app-BkqDhcC1.js";import{t as k,s as S,C as A,a as x,E as ce,x as $,F as We,y as Ge,z as ze,A as Je,g as q,d as ue,B as T,v as Ye,w as Qe}from"./index.esm-Czzb8Hol.js";/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const de={name:"log-out",size:24,node:[["path",{d:"m16 17 5-5-5-5",key:"1bji2h"}],["path",{d:"M21 12H9",key:"dn1m92"}],["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}]]};de.node;const $n=j(de);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fe={name:"moon",size:24,node:[["path",{d:"M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",key:"kfwtm"}]]};fe.node;const qn=j(fe);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const le={name:"sun",size:24,node:[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]]};le.node;const Ln=j(le),pe="@firebase/installations",L="0.6.24";/**
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
 */const ge=1e4,he=`w:${L}`,we="FIS_v2",Xe="https://firebaseinstallations.googleapis.com/v1",Ze=3600*1e3,et="installations",tt="Installations";/**
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
 */const nt={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},g=new ce(et,tt,nt);function be(e){return e instanceof We&&e.code.includes("request-failed")}/**
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
 */function ye({projectId:e}){return`${Xe}/projects/${e}/installations`}function me(e){return{token:e.token,requestStatus:2,expiresIn:it(e.expiresIn),creationTime:Date.now()}}async function Ie(e,t){const o=(await t.json()).error;return g.create("request-failed",{requestName:e,serverCode:o.code,serverMessage:o.message,serverStatus:o.status})}function Te({apiKey:e}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e})}function ot(e,{refreshToken:t}){const n=Te(e);return n.append("Authorization",rt(t)),n}async function ke(e){const t=await e();return t.status>=500&&t.status<600?e():t}function it(e){return Number(e.replace("s","000"))}function rt(e){return`${we} ${e}`}/**
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
 */async function at({appConfig:e,heartbeatServiceProvider:t},{fid:n}){const o=ye(e),i=Te(e),r=t.getImmediate({optional:!0});if(r){const s=await r.getHeartbeatsHeader();s&&i.append("x-firebase-client",s)}const a={fid:n,authVersion:we,appId:e.appId,sdkVersion:he},u={method:"POST",headers:i,body:JSON.stringify(a)},d=await ke(()=>fetch(o,u));if(d.ok){const s=await d.json();return{fid:s.fid||n,registrationStatus:2,refreshToken:s.refreshToken,authToken:me(s.authToken)}}else throw await Ie("Create Installation",d)}/**
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
 */function Se(e){return new Promise(t=>{setTimeout(t,e)})}/**
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
 */function st(e){return btoa(String.fromCharCode(...e)).replace(/\+/g,"-").replace(/\//g,"_")}/**
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
 */const ct=/^[cdef][\w-]{21}$/,P="";function ut(){try{const e=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(e),e[0]=112+e[0]%16;const n=dt(e);return ct.test(n)?n:P}catch{return P}}function dt(e){return st(e).substr(0,22)}/**
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
 */function m(e){return`${e.appName}!${e.appId}`}/**
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
 */const b=new Map;function Ae(e,t){const n=m(e);ve(n,t),pt(n,t)}function ft(e,t){_e();const n=m(e);let o=b.get(n);o||(o=new Set,b.set(n,o)),o.add(t)}function lt(e,t){const n=m(e),o=b.get(n);o&&(o.delete(t),o.size===0&&b.delete(n),Ee())}function ve(e,t){const n=b.get(e);if(n)for(const o of n)o(t)}function pt(e,t){const n=_e();n&&n.postMessage({key:e,fid:t}),Ee()}let p=null;function _e(){return!p&&"BroadcastChannel"in self&&(p=new BroadcastChannel("[Firebase] FID Change"),p.onmessage=e=>{ve(e.data.key,e.data.fid)}),p}function Ee(){b.size===0&&p&&(p.close(),p=null)}/**
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
 */const gt="firebase-installations-database",ht=1,h="firebase-installations-store";let O=null;function H(){return O||(O=$(gt,ht,{upgrade:(e,t)=>{switch(t){case 0:e.createObjectStore(h)}}})),O}async function v(e,t){const n=m(e),i=(await H()).transaction(h,"readwrite"),r=i.objectStore(h),a=await r.get(n);return await r.put(t,n),await i.done,(!a||a.fid!==t.fid)&&Ae(e,t.fid),t}async function Ce(e){const t=m(e),o=(await H()).transaction(h,"readwrite");await o.objectStore(h).delete(t),await o.done}async function _(e,t){const n=m(e),i=(await H()).transaction(h,"readwrite"),r=i.objectStore(h),a=await r.get(n),u=t(a);return u===void 0?await r.delete(n):await r.put(u,n),await i.done,u&&(!a||a.fid!==u.fid)&&Ae(e,u.fid),u}/**
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
 */async function B(e){let t;const n=await _(e.appConfig,o=>{const i=wt(o),r=bt(e,i);return t=r.registrationPromise,r.installationEntry});return n.fid===P?{installationEntry:await t}:{installationEntry:n,registrationPromise:t}}function wt(e){const t=e||{fid:ut(),registrationStatus:0};return Re(t)}function bt(e,t){if(t.registrationStatus===0){if(!navigator.onLine){const i=Promise.reject(g.create("app-offline"));return{installationEntry:t,registrationPromise:i}}const n={fid:t.fid,registrationStatus:1,registrationTime:Date.now()},o=yt(e,n);return{installationEntry:n,registrationPromise:o}}else return t.registrationStatus===1?{installationEntry:t,registrationPromise:mt(e)}:{installationEntry:t}}async function yt(e,t){try{const n=await at(e,t);return v(e.appConfig,n)}catch(n){throw be(n)&&n.customData.serverCode===409?await Ce(e.appConfig):await v(e.appConfig,{fid:t.fid,registrationStatus:0}),n}}async function mt(e){let t=await z(e.appConfig);for(;t.registrationStatus===1;)await Se(100),t=await z(e.appConfig);if(t.registrationStatus===0){const{installationEntry:n,registrationPromise:o}=await B(e);return o||n}return t}function z(e){return _(e,t=>{if(!t)throw g.create("installation-not-found");return Re(t)})}function Re(e){return It(e)?{fid:e.fid,registrationStatus:0}:e}function It(e){return e.registrationStatus===1&&e.registrationTime+ge<Date.now()}/**
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
 */async function Tt({appConfig:e,heartbeatServiceProvider:t},n){const o=kt(e,n),i=ot(e,n),r=t.getImmediate({optional:!0});if(r){const s=await r.getHeartbeatsHeader();s&&i.append("x-firebase-client",s)}const a={installation:{sdkVersion:he,appId:e.appId}},u={method:"POST",headers:i,body:JSON.stringify(a)},d=await ke(()=>fetch(o,u));if(d.ok){const s=await d.json();return me(s)}else throw await Ie("Generate Auth Token",d)}function kt(e,{fid:t}){return`${ye(e)}/${t}/authTokens:generate`}/**
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
 */async function V(e,t=!1){let n;const o=await _(e.appConfig,r=>{if(!Ne(r))throw g.create("not-registered");const a=r.authToken;if(!t&&vt(a))return r;if(a.requestStatus===1)return n=St(e,t),r;{if(!navigator.onLine)throw g.create("app-offline");const u=Et(r);return n=At(e,u),u}});return n?await n:o.authToken}async function St(e,t){let n=await J(e.appConfig);for(;n.authToken.requestStatus===1;)await Se(100),n=await J(e.appConfig);const o=n.authToken;return o.requestStatus===0?V(e,t):o}function J(e){return _(e,t=>{if(!Ne(t))throw g.create("not-registered");const n=t.authToken;return Ct(n)?{...t,authToken:{requestStatus:0}}:t})}async function At(e,t){try{const n=await Tt(e,t),o={...t,authToken:n};return await v(e.appConfig,o),n}catch(n){if(be(n)&&(n.customData.serverCode===401||n.customData.serverCode===404))await Ce(e.appConfig);else{const o={...t,authToken:{requestStatus:0}};await v(e.appConfig,o)}throw n}}function Ne(e){return e!==void 0&&e.registrationStatus===2}function vt(e){return e.requestStatus===2&&!_t(e)}function _t(e){const t=Date.now();return t<e.creationTime||e.creationTime+e.expiresIn<t+Ze}function Et(e){const t={requestStatus:1,requestTime:Date.now()};return{...e,authToken:t}}function Ct(e){return e.requestStatus===1&&e.requestTime+ge<Date.now()}/**
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
 */async function Rt(e){const t=e,{installationEntry:n,registrationPromise:o}=await B(t);return o?o.catch(console.error):V(t).catch(console.error),n.fid}/**
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
 */async function Nt(e,t=!1){const n=e;return await Ot(n),(await V(n,t)).token}async function Ot(e){const{registrationPromise:t}=await B(e);t&&await t}/**
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
 */function Dt(e,t){const{appConfig:n}=e;return ft(n,t),()=>{lt(n,t)}}/**
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
 */function Mt(e){if(!e||!e.options)throw D("App Configuration");if(!e.name)throw D("App Name");const t=["projectId","apiKey","appId"];for(const n of t)if(!e.options[n])throw D(n);return{appName:e.name,projectId:e.options.projectId,apiKey:e.options.apiKey,appId:e.options.appId}}function D(e){return g.create("missing-app-config-values",{valueName:e})}/**
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
 */const Oe="installations",Ft="installations-internal",Pt=e=>{const t=e.getProvider("app").getImmediate(),n=Mt(t),o=x(t,"heartbeat");return{app:t,appConfig:n,heartbeatServiceProvider:o,_delete:()=>Promise.resolve()}},Kt=e=>{const t=e.getProvider("app").getImmediate(),n=x(t,Oe).getImmediate();return{getId:()=>Rt(n),getToken:i=>Nt(n,i)}};function jt(){S(new A(Oe,Pt,"PUBLIC")),S(new A(Ft,Kt,"PRIVATE"))}/**
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
 */jt();k(pe,L);k(pe,L,"esm2020");/**
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
 */const xt="/firebase-messaging-sw.js",$t="/firebase-cloud-messaging-push-scope",De="BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4",qt="https://fcmregistrations.googleapis.com/v1",Me="google.c.a.c_id",Lt="google.c.a.c_l",Ht="google.c.a.ts",Bt="google.c.a.e",Y=1e4;var Q;(function(e){e[e.DATA_MESSAGE=1]="DATA_MESSAGE",e[e.DISPLAY_NOTIFICATION=3]="DISPLAY_NOTIFICATION"})(Q||(Q={}));/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 */var y;(function(e){e.PUSH_RECEIVED="push-received",e.NOTIFICATION_CLICKED="notification-clicked",e.FID_REGISTERED="fid-registered"})(y||(y={}));/**
 * @license
 * Copyright 2017 Google LLC
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
 */function f(e){const t=new Uint8Array(e);return btoa(String.fromCharCode(...t)).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}function Fe(e){const t="=".repeat((4-e.length%4)%4),n=(e+t).replace(/\-/g,"+").replace(/_/g,"/"),o=atob(n),i=new Uint8Array(o.length);for(let r=0;r<o.length;++r)i[r]=o.charCodeAt(r);return i}/**
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
 */const M="fcm_token_details_db",Vt=5,X="fcm_token_object_Store";async function Ut(e){if("databases"in indexedDB&&!(await indexedDB.databases()).map(r=>r.name).includes(M))return null;let t=null;return(await $(M,Vt,{upgrade:async(o,i,r,a)=>{if(i<2||!o.objectStoreNames.contains(X))return;const u=a.objectStore(X),d=await u.index("fcmSenderId").get(e);if(await u.clear(),!!d){if(i===2){const s=d;if(!s.auth||!s.p256dh||!s.endpoint)return;t={token:s.fcmToken,createTime:s.createTime??Date.now(),subscriptionOptions:{auth:s.auth,p256dh:s.p256dh,endpoint:s.endpoint,swScope:s.swScope,vapidKey:typeof s.vapidKey=="string"?s.vapidKey:f(s.vapidKey)}}}else if(i===3){const s=d;t={token:s.fcmToken,createTime:s.createTime,subscriptionOptions:{auth:f(s.auth),p256dh:f(s.p256dh),endpoint:s.endpoint,swScope:s.swScope,vapidKey:f(s.vapidKey)}}}else if(i===4){const s=d;t={token:s.fcmToken,createTime:s.createTime,subscriptionOptions:{auth:f(s.auth),p256dh:f(s.p256dh),endpoint:s.endpoint,swScope:s.swScope,vapidKey:f(s.vapidKey)}}}}}})).close(),await T(M),await T("fcm_vapid_details_db"),await T("undefined"),Wt(t)?t:null}function Wt(e){if(!e||!e.subscriptionOptions)return!1;const{subscriptionOptions:t}=e;return typeof e.createTime=="number"&&e.createTime>0&&typeof e.token=="string"&&e.token.length>0&&typeof t.auth=="string"&&t.auth.length>0&&typeof t.p256dh=="string"&&t.p256dh.length>0&&typeof t.endpoint=="string"&&t.endpoint.length>0&&typeof t.swScope=="string"&&t.swScope.length>0&&typeof t.vapidKey=="string"&&t.vapidKey.length>0}/**
 * @license
 * Copyright 2017 Google LLC
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
 */const Gt={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"only-available-in-window":"This method is available in a Window context.","only-available-in-sw":"This method is available in a service worker context.","permission-default":"The notification permission was not granted and dismissed instead.","permission-blocked":"The notification permission was not granted and blocked instead.","unsupported-browser":"This browser doesn't support the API's required to use the Firebase SDK.","indexed-db-unsupported":"This browser doesn't support indexedDb.open() (ex. Safari iFrame, Firefox Private Browsing, etc)","failed-service-worker-registration":"We are unable to register the default service worker. {$browserErrorMessage}","token-subscribe-failed":"A problem occurred while subscribing the user to FCM: {$errorInfo}","token-subscribe-no-token":"FCM returned no token when subscribing the user to push.","fid-registration-failed":"A problem occurred while creating an FCM registration via FID: {$errorInfo}","fid-unregister-failed":"A problem occurred while unregistering the FCM registration via FID: {$errorInfo}","fid-registration-idb-schema-unavailable":"Unable to read or persist FID registration metadata because the messaging IndexedDB schema is unavailable (for example, the database could not be upgraded to the latest version).","token-unsubscribe-failed":"A problem occurred while unsubscribing the user from FCM: {$errorInfo}","token-update-failed":"A problem occurred while updating the user from FCM: {$errorInfo}","token-update-no-token":"FCM returned no token when updating the user to push.","use-sw-after-get-token":"The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.","invalid-sw-registration":"The input to useServiceWorker() must be a ServiceWorkerRegistration.","invalid-bg-handler":"The input to setBackgroundMessageHandler() must be a function.","invalid-vapid-key":"The public VAPID key must be a string.","use-vapid-key-after-get-token":"The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used.","invalid-on-registered-handler":"No onRegistered callback handler was provided or registered. Implement onRegistered() before register()."},c=new ce("messaging","Messaging",Gt);/**
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
 */const Z="firebase-messaging-database",ee=2,w="firebase-messaging-store",l="firebase-messaging-fid-registration-store",zt={openDB:$,deleteDB:T};let te=zt,I=null;function Jt(e,t,n){switch(t){case 0:if(e.createObjectStore(w),n===1)break;case 1:n===2&&e.createObjectStore(l)}}function ne(e){return{upgrade:(t,n)=>{Jt(t,n,e)},blocked:()=>{},blocking:(t,n,o)=>{var i;I=null,(i=o.target)==null||i.close()},terminated:()=>{I=null}}}function E(){return I||(I=te.openDB(Z,ee,ne(2)).catch(()=>te.openDB(Z,ee-1,ne(1)))),I}function Pe(e,t){return e.objectStoreNames.contains(t)}function Ke(e){if(!Pe(e,l))throw c.create("fid-registration-idb-schema-unavailable")}async function Yt(e){const t=C(e),o=await(await E()).transaction(w).objectStore(w).get(t);if(o)return o;{const i=await Ut(e.appConfig.senderId);if(i)return await U(e,i),i}}async function U(e,t){const n=C(e),o=await E(),i=[w],r=Pe(o,l);r&&i.push(l);const a=o.transaction(i,"readwrite");return await a.objectStore(w).put(t,n),r&&await a.objectStore(l).delete(n),await a.done,t}async function je(e){const t=C(e),n=await E();return Ke(n),await n.transaction(l).objectStore(l).get(t)}async function Qt(e,t){const n=C(e),o=await E();Ke(o);const i=o.transaction([w,l],"readwrite");return await i.objectStore(l).put(t,n),await i.objectStore(w).delete(n),await i.done,t}function C({appConfig:e}){return e.appId}const oe="@firebase/messaging",K="0.13.3";/**
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
 */const Xt=3,Zt=1e3;async function en(e,t){const n=await N(e),o=W(t,e.appConfig.appName,!1),i={method:"POST",headers:n,body:JSON.stringify(o)};let r;try{r=await(await fetch(R(e.appConfig),i)).json()}catch(a){throw c.create("token-subscribe-failed",{errorInfo:a==null?void 0:a.toString()})}if(r.error){const a=r.error.message;throw c.create("token-subscribe-failed",{errorInfo:a})}if(!r.token)throw c.create("token-subscribe-no-token");return r.token}async function tn(e,t){var d;const n=await N(e),o=W(t,e.appConfig.appName,!0),i={method:"POST",headers:n,body:JSON.stringify(o)};let r;try{r=await sn(()=>fetch(R(e.appConfig),i),Xt,Zt)}catch(s){throw c.create("fid-registration-failed",{errorInfo:s==null?void 0:s.toString()})}if(r.ok)return{responseFid:await nn(r)};let a;try{a=await r.json()}catch{throw c.create("fid-registration-failed",{errorInfo:r.statusText})}const u=((d=a.error)==null?void 0:d.message)??r.statusText;throw c.create("fid-registration-failed",{errorInfo:u})}async function nn(e){const t=await e.text();if(!t.trim())throw c.create("fid-registration-failed",{errorInfo:"CreateRegistration succeeded but response body is empty"});let n;try{n=JSON.parse(t)}catch{throw c.create("fid-registration-failed",{errorInfo:"CreateRegistration succeeded but response body is not valid JSON"})}const o=n.name;if(typeof o!="string"||o.length===0)throw c.create("fid-registration-failed",{errorInfo:"CreateRegistration succeeded but response did not include a non-empty name"});return on(o)}const ie="/registrations/";function on(e){const t=e.indexOf(ie);if(t!==-1){const n=e.slice(t+ie.length);if(n.length>0)return n}throw c.create("fid-registration-failed",{errorInfo:"CreateRegistration succeeded but response name is not a valid registration resource name"})}async function rn(e,t){const n=await N(e),o=W(t.subscriptionOptions,e.appConfig.appName,!1),i={method:"PATCH",headers:n,body:JSON.stringify(o)};let r;try{r=await(await fetch(`${R(e.appConfig)}/${t.token}`,i)).json()}catch(a){throw c.create("token-update-failed",{errorInfo:a==null?void 0:a.toString()})}if(r.error){const a=r.error.message;throw c.create("token-update-failed",{errorInfo:a})}if(!r.token)throw c.create("token-update-no-token");return r.token}async function an(e,t){const o={method:"DELETE",headers:await N(e)};try{const r=await(await fetch(`${R(e.appConfig)}/${t}`,o)).json();if(r.error){const a=r.error.message;throw c.create("token-unsubscribe-failed",{errorInfo:a})}}catch(i){throw c.create("token-unsubscribe-failed",{errorInfo:i==null?void 0:i.toString()})}}async function sn(e,t,n){let o;for(let i=0;i<t;i++)try{return await e()}catch(r){if(o=r,i<t-1){const a=n*Math.pow(2,i);await new Promise(u=>setTimeout(u,a))}}throw o}function R({projectId:e}){return`${qt}/projects/${e}/registrations`}async function N({appConfig:e,installations:t}){const n=await t.getToken();return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e.apiKey,"x-goog-firebase-installations-auth":`FIS ${n}`})}function cn(e,t){var n,o;try{if(/^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(e))return new URL(e).host}catch{}try{if(typeof self<"u"&&((n=self.location)!=null&&n.href))return new URL(e,self.location.origin).host}catch{}return typeof self<"u"&&((o=self.location)!=null&&o.host)?self.location.host:t}function W({p256dh:e,auth:t,endpoint:n,vapidKey:o,swScope:i},r,a){const u={web:{origin:cn(i,r),endpoint:n,auth:t,p256dh:e}};return a&&(u.fcm_sdk_version=K),o!==De&&(u.web.applicationPubKey=o),u}/**
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
 */const un=10080*60*1e3;async function dn(e){const t=await ln(e.swRegistration,e.vapidKey),n={vapidKey:e.vapidKey,swScope:e.swRegistration.scope,endpoint:t.endpoint,auth:f(t.getKey("auth")),p256dh:f(t.getKey("p256dh"))},o=await Yt(e.firebaseDependencies);if(o){if(pn(o.subscriptionOptions,n))return Date.now()>=o.createTime+un?fn(e,{token:o.token,createTime:Date.now(),subscriptionOptions:n}):o.token;try{await an(e.firebaseDependencies,o.token)}catch(i){console.warn(i)}return re(e.firebaseDependencies,n)}else return re(e.firebaseDependencies,n)}async function fn(e,t){try{const n=await rn(e.firebaseDependencies,t),o={...t,token:n,createTime:Date.now()};return await U(e.firebaseDependencies,o),n}catch(n){throw n}}async function re(e,t){const o={token:await en(e,t),createTime:Date.now(),subscriptionOptions:t};return await U(e,o),o.token}async function ln(e,t){const n=await e.pushManager.getSubscription();return n||e.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:Fe(t)})}function pn(e,t){const n=t.vapidKey===e.vapidKey,o=t.endpoint===e.endpoint,i=t.auth===e.auth,r=t.p256dh===e.p256dh;return n&&o&&i&&r}function gn(e,t){const n=e.onRegisteredHandler;n&&(typeof n=="function"?n(t):n.next(t))}/**
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
 */async function hn(e){try{e.swRegistration=await navigator.serviceWorker.register(xt,{scope:$t}),e.swRegistration.update().catch(()=>{}),await wn(e.swRegistration)}catch(t){throw c.create("failed-service-worker-registration",{browserErrorMessage:t==null?void 0:t.message})}}async function wn(e){return new Promise((t,n)=>{const o=setTimeout(()=>n(new Error(`Service worker not registered after ${Y} ms`)),Y),i=e.installing||e.waiting;e.active?(clearTimeout(o),t()):i?i.onstatechange=r=>{var a;((a=r.target)==null?void 0:a.state)==="activated"&&(i.onstatechange=null,clearTimeout(o),t())}:(clearTimeout(o),n(new Error("No incoming service worker found.")))})}/**
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
 */async function xe(e,t){if(!t&&!e.swRegistration&&await hn(e),!(!t&&e.swRegistration)){if(!(t instanceof ServiceWorkerRegistration))throw c.create("invalid-sw-registration");e.swRegistration=t}}/**
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
 */async function $e(e,t){t?e.vapidKey=t:e.vapidKey||(e.vapidKey=De)}/**
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
 */const ae=3;async function bn(e,t){const n=await yn(e.swRegistration,e.vapidKey),o={vapidKey:e.vapidKey,swScope:e.swRegistration.scope,endpoint:n.endpoint,auth:f(n.getKey("auth")),p256dh:f(n.getKey("p256dh"))},i=e.firebaseDependencies.installations;for(let r=0;r<ae;r++){const{responseFid:a}=await tn(e.firebaseDependencies,o);if(a===t)return;r<ae-1&&await i.getToken(!0)}throw c.create("fid-registration-failed",{errorInfo:"CreateRegistration response FID does not match Firebase Installation ID"})}async function yn(e,t){const n=await e.pushManager.getSubscription();return n||e.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:Fe(t)})}/**
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
 */const mn=10080*60*1e3;async function qe(e,t){if(!navigator)throw c.create("only-available-in-window");if(Notification.permission==="default"&&await Notification.requestPermission(),Notification.permission!=="granted")throw c.create("permission-blocked");if(!e.onRegisteredHandler)throw c.create("invalid-on-registered-handler");await $e(e,t==null?void 0:t.vapidKey),await xe(e,t==null?void 0:t.serviceWorkerRegistration);const n=e._registerNotifyChain.catch(()=>{});return e._registerNotifyChain=n.then(async()=>{const o=await e.firebaseDependencies.installations.getId(),i=await je(e.firebaseDependencies),r=Date.now();if((!i||i.fid!==o||r>=i.lastRegisterTime+mn)&&(await bn(e,o),await Qt(e.firebaseDependencies,{fid:o,lastRegisterTime:r,vapidKey:e.vapidKey})),!e.onRegisteredHandler)throw c.create("invalid-on-registered-handler");gn(e,o)}),e._registerNotifyChain}/**
 * @license
 * Copyright 2026 Google LLC
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
 */function In(e,t){return Dt(t,()=>{(async()=>!e.onRegisteredHandler||!await je(e.firebaseDependencies)||await qe(e).catch(()=>{}))()})}/**
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
 */function se(e){const t={from:e.from,collapseKey:e.collapse_key,messageId:e.fcmMessageId};return Tn(t,e),kn(t,e),Sn(t,e),t}function Tn(e,t){if(!t.notification)return;e.notification={};const n=t.notification.title;n&&(e.notification.title=n);const o=t.notification.body;o&&(e.notification.body=o);const i=t.notification.image;i&&(e.notification.image=i);const r=t.notification.icon;r&&(e.notification.icon=r)}function kn(e,t){t.data&&(e.data=t.data)}function Sn(e,t){var i,r,a,u;if(!t.fcmOptions&&!((i=t.notification)!=null&&i.click_action))return;e.fcmOptions={};const n=((r=t.fcmOptions)==null?void 0:r.link)??((a=t.notification)==null?void 0:a.click_action);n&&(e.fcmOptions.link=n);const o=(u=t.fcmOptions)==null?void 0:u.analytics_label;o&&(e.fcmOptions.analyticsLabel=o)}/**
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
 */function An(e){return typeof e=="object"&&!!e&&Me in e}/**
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
 */function vn(e){if(!e||!e.options)throw F("App Configuration Object");if(!e.name)throw F("App Name");const t=["projectId","apiKey","appId","messagingSenderId"],{options:n}=e;for(const o of t)if(!n[o])throw F(o);return{appName:e.name,projectId:n.projectId,apiKey:n.apiKey,appId:n.appId,senderId:n.messagingSenderId}}function F(e){return c.create("missing-app-config-values",{valueName:e})}/**
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
 */class _n{constructor(t,n,o){this.deliveryMetricsExportedToBigQueryEnabled=!1,this.onBackgroundMessageHandler=null,this.onMessageHandler=null,this.onRegisteredHandler=null,this.onUnregisteredHandler=null,this._registerNotifyChain=Promise.resolve(),this._fidChangeUnsubscribe=null,this.logEvents=[],this.logQueue={state:"stopped"};const i=vn(t);this.firebaseDependencies={app:t,appConfig:i,installations:n,analyticsProvider:o}}_delete(){return this._fidChangeUnsubscribe&&(this._fidChangeUnsubscribe(),this._fidChangeUnsubscribe=null),this.logQueue.state==="scheduled"&&clearTimeout(this.logQueue.timerId),this.logQueue={state:"stopped"},Promise.resolve()}}/**
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
 */async function Le(e,t){if(!navigator)throw c.create("only-available-in-window");if(Notification.permission==="default"&&await Notification.requestPermission(),Notification.permission!=="granted")throw c.create("permission-blocked");return await $e(e,t==null?void 0:t.vapidKey),await xe(e,t==null?void 0:t.serviceWorkerRegistration),dn(e)}/**
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
 */async function En(e,t,n){const o=Cn(t);(await e.firebaseDependencies.analyticsProvider.get()).logEvent(o,{message_id:n[Me],message_name:n[Lt],message_time:n[Ht],message_device_time:Math.floor(Date.now()/1e3)})}function Cn(e){switch(e){case y.NOTIFICATION_CLICKED:return"notification_open";case y.PUSH_RECEIVED:return"notification_foreground";default:throw new Error}}/**
 * @license
 * Copyright 2017 Google LLC
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
 */async function Rn(e,t){const n=t.data;if(!n.isFirebaseMessaging)return;if(e.onMessageHandler&&n.messageType===y.PUSH_RECEIVED&&(typeof e.onMessageHandler=="function"?e.onMessageHandler(se(n)):e.onMessageHandler.next(se(n))),e.onRegisteredHandler&&n.messageType===y.FID_REGISTERED){const i=n.fid;typeof e.onRegisteredHandler=="function"?e.onRegisteredHandler(i):e.onRegisteredHandler.next(i)}const o=n.data;An(o)&&o[Bt]==="1"&&await En(e,n.messageType,o)}/**
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
 */const Nn=e=>{const t=new _n(e.getProvider("app").getImmediate(),e.getProvider("installations-internal").getImmediate(),e.getProvider("analytics-internal"));return navigator.serviceWorker.addEventListener("message",n=>Rn(t,n)),t._fidChangeUnsubscribe=In(t,e.getProvider("installations").getImmediate()),t},On=e=>{const t=e.getProvider("messaging").getImmediate();return{getToken:o=>Le(t,o),register:o=>qe(t,o)}};function Dn(){S(new A("messaging",Nn,"PUBLIC")),S(new A("messaging-internal",On,"PRIVATE")),k(oe,K),k(oe,K,"esm2020")}/**
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
 */async function G(){try{await Ge()}catch{return!1}return typeof window<"u"&&ze()&&Je()&&"serviceWorker"in navigator&&"PushManager"in window&&"Notification"in window&&"fetch"in window&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey")}/**
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
 */function Mn(e,t){if(!navigator)throw c.create("only-available-in-window");return e.onMessageHandler=t,()=>{e.onMessageHandler=null}}/**
 * @license
 * Copyright 2017 Google LLC
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
 */function He(e=ue()){return G().then(t=>{if(!t)throw c.create("unsupported-browser")},t=>{throw c.create("indexed-db-unsupported")}),x(q(e),"messaging").getImmediate()}async function Fn(e,t){return e=q(e),Le(e,t)}function Pn(e,t){return e=q(e),Mn(e,t)}/**
 * @license
 * Copyright 2017 Google LLC
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
 */Dn();const Kn={apiKey:"AIzaSyFakeKeyForLocalTesting12345678",authDomain:"emperor-saas.firebaseapp.com",projectId:"emperor-saas",storageBucket:"emperor-saas.appspot.com",messagingSenderId:"123456789012",appId:"1:123456789012:web:abcdef123456"},Be=Ye().length>0?ue():Qe(Kn);async function Hn(){try{if(!("Notification"in window))return console.warn("This browser does not support desktop push notifications"),null;if(!await G())return console.warn("Firebase Cloud Messaging is not supported in this browser environment"),null;if(await Notification.requestPermission()==="granted"){const n=He(Be),i=await Fn(n,{vapidKey:void 0||void 0});return i?(await Ue.updateFcmToken(i),localStorage.setItem("emperor_fcm_token",i),i):(console.warn("No registration token available. Request permission to generate one."),null)}else return console.log("Push notification permission denied by user"),null}catch(e){return console.error("An error occurred while retrieving FCM token:",e),null}}async function Bn(e){try{if(!await G())return null;const n=He(Be);return Pn(n,o=>{e&&e(o)})}catch(t){return console.error("Error attaching foreground message listener:",t),null}}export{$n as L,qn as M,Ln as S,Bn as o,Hn as r};
