import{c as jt,g as me,a as ce,j as a,L as j,r as m,X as Ke,v as jn,T as Nn,y as Nt,u as Rt,f as Rn,h as On,e as Bn,p as Mn}from"./app-CJyoSjnz.js";import{C as Pn,H as rt,W as Te,F as $n,M as Ln,i as zn,T as Wn}from"./UserSidebarDrawer-23cicqin.js";import{g as ge,b as xe,c as it,a as Hn}from"./settingsHelper-CVV19m83.js";import{E as Un}from"./external-link-C9zc_Rda.js";import{P as Vn}from"./phone-BJZpKU84.js";import{M as Me,C as Kn}from"./message-circle-Cr1dYe69.js";import{S as Ot}from"./shield-check-Dpu1NGCy.js";import{a as qn}from"./headphones-DKdMHwQ-.js";import{A as Gn}from"./shield-T7fEu42S.js";import{T as Yn}from"./trending-up-CMrYV7JD.js";import{U as ot}from"./user-Cv2selXK.js";/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bt={name:"bell",size:24,node:[["path",{d:"M10.268 21a2 2 0 0 0 3.464 0",key:"vwvbt9"}],["path",{d:"M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",key:"11g9vi"}]]};Bt.node;const Jn=jt(Bt);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mt={name:"circle-alert",size:24,node:[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]],aliases:["alert-circle"]};Mt.node;const at=jt(Mt),Xn=()=>{};var st={};/**
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
 */const Pt=function(e){const t=[];let n=0;for(let r=0;r<e.length;r++){let i=e.charCodeAt(r);i<128?t[n++]=i:i<2048?(t[n++]=i>>6|192,t[n++]=i&63|128):(i&64512)===55296&&r+1<e.length&&(e.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(e.charCodeAt(++r)&1023),t[n++]=i>>18|240,t[n++]=i>>12&63|128,t[n++]=i>>6&63|128,t[n++]=i&63|128):(t[n++]=i>>12|224,t[n++]=i>>6&63|128,t[n++]=i&63|128)}return t},Zn=function(e){const t=[];let n=0,r=0;for(;n<e.length;){const i=e[n++];if(i<128)t[r++]=String.fromCharCode(i);else if(i>191&&i<224){const o=e[n++];t[r++]=String.fromCharCode((i&31)<<6|o&63)}else if(i>239&&i<365){const o=e[n++],s=e[n++],d=e[n++],l=((i&7)<<18|(o&63)<<12|(s&63)<<6|d&63)-65536;t[r++]=String.fromCharCode(55296+(l>>10)),t[r++]=String.fromCharCode(56320+(l&1023))}else{const o=e[n++],s=e[n++];t[r++]=String.fromCharCode((i&15)<<12|(o&63)<<6|s&63)}}return t.join("")},$t={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(e,t){if(!Array.isArray(e))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<e.length;i+=3){const o=e[i],s=i+1<e.length,d=s?e[i+1]:0,l=i+2<e.length,c=l?e[i+2]:0,p=o>>2,v=(o&3)<<4|d>>4;let E=(d&15)<<2|c>>6,k=c&63;l||(k=64,s||(E=64)),r.push(n[p],n[v],n[E],n[k])}return r.join("")},encodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(e):this.encodeByteArray(Pt(e),t)},decodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(e):Zn(this.decodeStringToByteArray(e,t))},decodeStringToByteArray(e,t){this.init_();const n=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<e.length;){const o=n[e.charAt(i++)],d=i<e.length?n[e.charAt(i)]:0;++i;const c=i<e.length?n[e.charAt(i)]:64;++i;const v=i<e.length?n[e.charAt(i)]:64;if(++i,o==null||d==null||c==null||v==null)throw new Qn;const E=o<<2|d>>4;if(r.push(E),c!==64){const k=d<<4&240|c>>2;if(r.push(k),v!==64){const F=c<<6&192|v;r.push(F)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}};class Qn extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const er=function(e){const t=Pt(e);return $t.encodeByteArray(t,!0)},Lt=function(e){return er(e).replace(/\./g,"")},tr=function(e){try{return $t.decodeString(e,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};/**
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
 */function nr(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const rr=()=>nr().__FIREBASE_DEFAULTS__,ir=()=>{if(typeof process>"u"||typeof st>"u")return;const e=st.__FIREBASE_DEFAULTS__;if(e)return JSON.parse(e)},or=()=>{if(typeof document>"u")return;let e;try{e=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const t=e&&tr(e[1]);return t&&JSON.parse(t)},qe=()=>{try{return Xn()||rr()||ir()||or()}catch(e){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`);return}},Fa=e=>{var t,n;return(n=(t=qe())==null?void 0:t.emulatorHosts)==null?void 0:n[e]},zt=()=>{var e;return(e=qe())==null?void 0:e.config},Da=e=>{var t;return(t=qe())==null?void 0:t[`_${e}`]};/**
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
 */class ar{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((t,n)=>{this.resolve=t,this.reject=n})}wrapCallback(t){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof t=="function"&&(this.promise.catch(()=>{}),t.length===1?t(n):t(n,r))}}}/**
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
 */function Wt(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Aa(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Wt())}function _a(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function ja(){const e=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof e=="object"&&e.id!==void 0}function Na(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Ra(){const e=Wt();return e.indexOf("MSIE ")>=0||e.indexOf("Trident/")>=0}function Ht(){try{return typeof indexedDB=="object"}catch{return!1}}function Ut(){return new Promise((e,t)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(r),e(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{var o;t(((o=i.error)==null?void 0:o.message)||"")}}catch(n){t(n)}})}function sr(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
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
 */const cr="FirebaseError";class ee extends Error{constructor(t,n,r){super(n),this.code=t,this.customData=r,this.name=cr,Object.setPrototypeOf(this,ee.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,ye.prototype.create)}}class ye{constructor(t,n,r){this.service=t,this.serviceName=n,this.errors=r}create(t,...n){const r=n[0]||{},i=`${this.service}/${t}`,o=this.errors[t],s=o?lr(o,r):"Error",d=`${this.serviceName}: ${s} (${i}).`;return new ee(i,d,r)}}function lr(e,t){try{let n=0,r="";for(;n<e.length;){const i=e.indexOf("{$",n);if(i===-1){r+=e.substring(n);break}const o=e.indexOf("}",i+2);if(o===-1){r+=e.substring(n);break}const s=e.substring(i+2,o),d=t[s];r+=e.substring(n,i)+(d!=null?String(d):`<${s}?>`),n=o+1}return r}catch{return e}}function Oa(e){for(const t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}function Pe(e,t){if(e===t)return!0;const n=Object.keys(e),r=Object.keys(t);for(const i of n){if(!r.includes(i))return!1;const o=e[i],s=t[i];if(ct(o)&&ct(s)){if(!Pe(o,s))return!1}else if(o!==s)return!1}for(const i of r)if(!n.includes(i))return!1;return!0}function ct(e){return e!==null&&typeof e=="object"}/**
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
 */function Ba(e){const t=[];for(const[n,r]of Object.entries(e))Array.isArray(r)?r.forEach(i=>{t.push(encodeURIComponent(n)+"="+encodeURIComponent(i))}):t.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return t.length?"&"+t.join("&"):""}function Ma(e,t){const n=new dr(e,t);return n.subscribe.bind(n)}class dr{constructor(t,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{t(this)}).catch(r=>{this.error(r)})}next(t){this.forEachObserver(n=>{n.next(t)})}error(t){this.forEachObserver(n=>{n.error(t)}),this.close(t)}complete(){this.forEachObserver(t=>{t.complete()}),this.close()}subscribe(t,n,r){let i;if(t===void 0&&n===void 0&&r===void 0)throw new Error("Missing Observer.");pr(t,["next","error","complete"])?i=t:i={next:t,error:n,complete:r},i.next===void 0&&(i.next=Fe),i.error===void 0&&(i.error=Fe),i.complete===void 0&&(i.complete=Fe);const o=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),o}unsubscribeOne(t){this.observers===void 0||this.observers[t]===void 0||(delete this.observers[t],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(t){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,t)}sendOne(t,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[t]!==void 0)try{n(this.observers[t])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(t){this.finalized||(this.finalized=!0,t!==void 0&&(this.finalError=t),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function pr(e,t){if(typeof e!="object"||e===null)return!1;for(const n of t)if(n in e&&typeof e[n]=="function")return!0;return!1}function Fe(){}/**
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
 */function Vt(e){return e&&e._delegate?e._delegate:e}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pa(e){try{return(e.startsWith("http://")||e.startsWith("https://")?new URL(e).hostname:e).endsWith(".cloudworkstations.dev")}catch{return!1}}async function $a(e){return(await fetch(e,{credentials:"include"})).ok}class z{constructor(t,n,r){this.name=t,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}}/**
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
 */const U="[DEFAULT]";/**
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
 */class ur{constructor(t,n){this.name=t,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){const n=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(n)){const r=new ar;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:n});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(t){const n=this.normalizeInstanceIdentifier(t==null?void 0:t.identifier),r=(t==null?void 0:t.optional)??!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(i){if(r)return null;throw i}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,!!this.shouldAutoInitialize()){if(hr(t))try{this.getOrInitializeService({instanceIdentifier:U})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(n);try{const o=this.getOrInitializeService({instanceIdentifier:i});r.resolve(o)}catch{}}}}clearInstance(t=U){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}async delete(){const t=Array.from(this.instances.values());await Promise.all([...t.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...t.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(t=U){return this.instances.has(t)}getOptions(t=U){return this.instancesOptions.get(t)||{}}initialize(t={}){const{options:n={}}=t,r=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[o,s]of this.instancesDeferred.entries()){const d=this.normalizeInstanceIdentifier(o);r===d&&s.resolve(i)}return i}onInit(t,n){const r=this.normalizeInstanceIdentifier(n),i=this.onInitCallbacks.get(r)??new Set;i.add(t),this.onInitCallbacks.set(r,i);const o=this.instances.get(r);return o&&t(o,r),()=>{i.delete(t)}}invokeOnInitCallbacks(t,n){const r=this.onInitCallbacks.get(n);if(r)for(const i of r)try{i(t,n)}catch{}}getOrInitializeService({instanceIdentifier:t,options:n={}}){let r=this.instances.get(t);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:fr(t),options:n}),this.instances.set(t,r),this.instancesOptions.set(t,n),this.invokeOnInitCallbacks(r,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,r)}catch{}return r||null}normalizeInstanceIdentifier(t=U){return this.component?this.component.multipleInstances?t:U:t}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function fr(e){return e===U?void 0:e}function hr(e){return e.instantiationMode==="EAGER"}/**
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
 */class gr{constructor(t){this.name=t,this.providers=new Map}addComponent(t){const n=this.getProvider(t.name);if(n.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);n.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);const n=new ur(t,this);return this.providers.set(t,n),n}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var w;(function(e){e[e.DEBUG=0]="DEBUG",e[e.VERBOSE=1]="VERBOSE",e[e.INFO=2]="INFO",e[e.WARN=3]="WARN",e[e.ERROR=4]="ERROR",e[e.SILENT=5]="SILENT"})(w||(w={}));const br={debug:w.DEBUG,verbose:w.VERBOSE,info:w.INFO,warn:w.WARN,error:w.ERROR,silent:w.SILENT},mr=w.INFO,xr={[w.DEBUG]:"log",[w.VERBOSE]:"log",[w.INFO]:"info",[w.WARN]:"warn",[w.ERROR]:"error"},yr=(e,t,...n)=>{if(t<e.logLevel)return;const r=new Date().toISOString(),i=xr[t];if(i)console[i](`[${r}]  ${e.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)};class wr{constructor(t){this.name=t,this._logLevel=mr,this._logHandler=yr,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in w))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel=typeof t=="string"?br[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if(typeof t!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,w.DEBUG,...t),this._logHandler(this,w.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,w.VERBOSE,...t),this._logHandler(this,w.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,w.INFO,...t),this._logHandler(this,w.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,w.WARN,...t),this._logHandler(this,w.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,w.ERROR,...t),this._logHandler(this,w.ERROR,...t)}}const vr=(e,t)=>t.some(n=>e instanceof n);let lt,dt;function Sr(){return lt||(lt=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Er(){return dt||(dt=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Kt=new WeakMap,$e=new WeakMap,qt=new WeakMap,De=new WeakMap,Ge=new WeakMap;function Ir(e){const t=new Promise((n,r)=>{const i=()=>{e.removeEventListener("success",o),e.removeEventListener("error",s)},o=()=>{n(M(e.result)),i()},s=()=>{r(e.error),i()};e.addEventListener("success",o),e.addEventListener("error",s)});return t.then(n=>{n instanceof IDBCursor&&Kt.set(n,e)}).catch(()=>{}),Ge.set(t,e),t}function kr(e){if($e.has(e))return;const t=new Promise((n,r)=>{const i=()=>{e.removeEventListener("complete",o),e.removeEventListener("error",s),e.removeEventListener("abort",s)},o=()=>{n(),i()},s=()=>{r(e.error||new DOMException("AbortError","AbortError")),i()};e.addEventListener("complete",o),e.addEventListener("error",s),e.addEventListener("abort",s)});$e.set(e,t)}let Le={get(e,t,n){if(e instanceof IDBTransaction){if(t==="done")return $e.get(e);if(t==="objectStoreNames")return e.objectStoreNames||qt.get(e);if(t==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return M(e[t])},set(e,t,n){return e[t]=n,!0},has(e,t){return e instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in e}};function Cr(e){Le=e(Le)}function Tr(e){return e===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(t,...n){const r=e.call(Ae(this),t,...n);return qt.set(r,t.sort?t.sort():[t]),M(r)}:Er().includes(e)?function(...t){return e.apply(Ae(this),t),M(Kt.get(this))}:function(...t){return M(e.apply(Ae(this),t))}}function Fr(e){return typeof e=="function"?Tr(e):(e instanceof IDBTransaction&&kr(e),vr(e,Sr())?new Proxy(e,Le):e)}function M(e){if(e instanceof IDBRequest)return Ir(e);if(De.has(e))return De.get(e);const t=Fr(e);return t!==e&&(De.set(e,t),Ge.set(t,e)),t}const Ae=e=>Ge.get(e);function we(e,t,{blocked:n,upgrade:r,blocking:i,terminated:o}={}){const s=indexedDB.open(e,t),d=M(s);return r&&s.addEventListener("upgradeneeded",l=>{r(M(s.result),l.oldVersion,l.newVersion,M(s.transaction),l)}),n&&s.addEventListener("blocked",l=>n(l.oldVersion,l.newVersion,l)),d.then(l=>{o&&l.addEventListener("close",()=>o()),i&&l.addEventListener("versionchange",c=>i(c.oldVersion,c.newVersion,c))}).catch(()=>{}),d}function he(e,{blocked:t}={}){const n=indexedDB.deleteDatabase(e);return t&&n.addEventListener("blocked",r=>t(r.oldVersion,r)),M(n).then(()=>{})}const Dr=["get","getKey","getAll","getAllKeys","count"],Ar=["put","add","delete","clear"],_e=new Map;function pt(e,t){if(!(e instanceof IDBDatabase&&!(t in e)&&typeof t=="string"))return;if(_e.get(t))return _e.get(t);const n=t.replace(/FromIndex$/,""),r=t!==n,i=Ar.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(i||Dr.includes(n)))return;const o=async function(s,...d){const l=this.transaction(s,i?"readwrite":"readonly");let c=l.store;return r&&(c=c.index(d.shift())),(await Promise.all([c[n](...d),i&&l.done]))[0]};return _e.set(t,o),o}Cr(e=>({...e,get:(t,n,r)=>pt(t,n)||e.get(t,n,r),has:(t,n)=>!!pt(t,n)||e.has(t,n)}));/**
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
 */class _r{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(jr(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function jr(e){const t=e.getComponent();return(t==null?void 0:t.type)==="VERSION"}const ze="@firebase/app",ut="0.16.2";/**
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
 */const $=new wr("@firebase/app"),Nr="@firebase/app-compat",Rr="@firebase/analytics-compat",Or="@firebase/analytics",Br="@firebase/app-check-compat",Mr="@firebase/app-check",Pr="@firebase/auth",$r="@firebase/auth-compat",Lr="@firebase/database",zr="@firebase/data-connect",Wr="@firebase/database-compat",Hr="@firebase/functions",Ur="@firebase/functions-compat",Vr="@firebase/installations",Kr="@firebase/installations-compat",qr="@firebase/messaging",Gr="@firebase/messaging-compat",Yr="@firebase/performance",Jr="@firebase/performance-compat",Xr="@firebase/remote-config",Zr="@firebase/remote-config-compat",Qr="@firebase/storage",ei="@firebase/storage-compat",ti="@firebase/firestore",ni="@firebase/ai",ri="@firebase/firestore-compat",ii="firebase",oi="12.19.0";/**
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
 */const We="[DEFAULT]",ai={[ze]:"fire-core",[Nr]:"fire-core-compat",[Or]:"fire-analytics",[Rr]:"fire-analytics-compat",[Mr]:"fire-app-check",[Br]:"fire-app-check-compat",[Pr]:"fire-auth",[$r]:"fire-auth-compat",[Lr]:"fire-rtdb",[zr]:"fire-data-connect",[Wr]:"fire-rtdb-compat",[Hr]:"fire-fn",[Ur]:"fire-fn-compat",[Vr]:"fire-iid",[Kr]:"fire-iid-compat",[qr]:"fire-fcm",[Gr]:"fire-fcm-compat",[Yr]:"fire-perf",[Jr]:"fire-perf-compat",[Xr]:"fire-rc",[Zr]:"fire-rc-compat",[Qr]:"fire-gcs",[ei]:"fire-gcs-compat",[ti]:"fire-fst",[ri]:"fire-fst-compat",[ni]:"fire-vertex","fire-js":"fire-js",[ii]:"fire-js-all"};/**
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
 */const ae=new Map,si=new Map,He=new Map;function ft(e,t){try{e.container.addComponent(t)}catch(n){$.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`,n)}}function K(e){const t=e.name;if(He.has(t))return $.debug(`There were multiple attempts to register component ${t}.`),!1;He.set(t,e);for(const n of ae.values())ft(n,e);for(const n of si.values())ft(n,e);return!0}function Ye(e,t){const n=e.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),e.container.getProvider(t)}function La(e){return e==null?!1:e.settings!==void 0}/**
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
 */const ci={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different {$mismatchedParam}. Existing: '{$oldValue}'. New: '{$newValue}'.","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},B=new ye("app","Firebase",ci);/**
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
 */class li{constructor(t,n,r){this._isDeleted=!1,this._options={...t},this._config={...n},this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new z("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw B.create("app-deleted",{appName:this._name})}}/**
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
 */const za=oi;function Gt(e,t={}){let n=e;typeof t!="object"&&(t={name:t});const r={name:We,automaticDataCollectionEnabled:!0,...t},i=r.name;if(typeof i!="string"||!i)throw B.create("bad-app-name",{appName:String(i)});if(n||(n=zt()),!n)throw B.create("no-options");const o=ae.get(i);if(o)if(Pe(n,o.options)){if(Pe(r,o.config))return o;throw B.create("duplicate-app",{appName:i,mismatchedParam:"config",oldValue:JSON.stringify(o.config),newValue:JSON.stringify(r)})}else throw B.create("duplicate-app",{appName:i,mismatchedParam:"options",oldValue:JSON.stringify(o.options),newValue:JSON.stringify(n)});const s=new gr(i);for(const l of He.values())s.addComponent(l);const d=new li(n,r,s);return ae.set(i,d),d}function Yt(e=We){const t=ae.get(e);if(!t&&e===We&&zt())return Gt();if(!t)throw B.create("no-app",{appName:e});return t}function di(){return Array.from(ae.values())}function L(e,t,n){let r=ai[e]??e;n&&(r+=`-${n}`);const i=r.match(/\s|\//),o=t.match(/\s|\//);if(i||o){const s=[`Unable to register library "${r}" with version "${t}":`];i&&s.push(`library name "${r}" contains illegal characters (whitespace or "/")`),i&&o&&s.push("and"),o&&s.push(`version name "${t}" contains illegal characters (whitespace or "/")`),$.warn(s.join(" "));return}K(new z(`${r}-version`,()=>({library:r,version:t}),"VERSION"))}/**
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
 */const pi="firebase-heartbeat-database",ui=1,se="firebase-heartbeat-store";let je=null;function Jt(){return je||(je=we(pi,ui,{upgrade:(e,t)=>{switch(t){case 0:try{e.createObjectStore(se)}catch(n){console.warn(n)}}}}).catch(e=>{throw B.create("idb-open",{originalErrorMessage:e.message})})),je}async function fi(e){try{const n=(await Jt()).transaction(se),r=await n.objectStore(se).get(Xt(e));return await n.done,r}catch(t){if(t instanceof ee)$.warn(t.message);else{const n=B.create("idb-get",{originalErrorMessage:t==null?void 0:t.message});$.warn(n.message)}}}async function ht(e,t){try{const r=(await Jt()).transaction(se,"readwrite");await r.objectStore(se).put(t,Xt(e)),await r.done}catch(n){if(n instanceof ee)$.warn(n.message);else{const r=B.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});$.warn(r.message)}}}function Xt(e){return`${e.name}!${e.options.appId}`}/**
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
 */const hi=1024,gi=30;class bi{constructor(t){this.container=t,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new xi(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var t,n;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),o=gt();if(((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)==null?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===o||this._heartbeatsCache.heartbeats.some(s=>s.date===o))return;if(this._heartbeatsCache.heartbeats.push({date:o,agent:i}),this._heartbeatsCache.heartbeats.length>gi){const s=yi(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(s,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){$.warn(r)}}async getHeartbeatsHeader(){var t;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=gt(),{heartbeatsToSend:r,unsentEntries:i}=mi(this._heartbeatsCache.heartbeats),o=Lt(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=n,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),o}catch(n){return $.warn(n),""}}}function gt(){return new Date().toISOString().substring(0,10)}function mi(e,t=hi){const n=[];let r=e.slice();for(const i of e){const o=n.find(s=>s.agent===i.agent);if(o){if(o.dates.push(i.date),bt(n)>t){o.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),bt(n)>t){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class xi{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Ht()?Ut().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await fi(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(t){if(await this._canUseIndexedDBPromise){const r=await this.read();return ht(this.app,{lastSentHeartbeatDate:t.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:t.heartbeats})}else return}async add(t){if(await this._canUseIndexedDBPromise){const r=await this.read();return ht(this.app,{lastSentHeartbeatDate:t.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...t.heartbeats]})}else return}}function bt(e){return Lt(JSON.stringify({version:2,heartbeats:e})).length}function yi(e){if(e.length===0)return-1;let t=0,n=e[0].date;for(let r=1;r<e.length;r++)e[r].date<n&&(n=e[r].date,t=r);return t}/**
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
 */function wi(e){K(new z("platform-logger",t=>new _r(t),"PRIVATE")),K(new z("heartbeat",t=>new bi(t),"PRIVATE")),L(ze,ut,e),L(ze,ut,"esm2020"),L("fire-js","")}/**
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
 */wi("");var vi="firebase",Si="12.19.0";/**
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
 */L(vi,Si,"app");const Zt="@firebase/installations",Je="0.6.24";/**
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
 */const Qt=1e4,en=`w:${Je}`,tn="FIS_v2",Ei="https://firebaseinstallations.googleapis.com/v1",Ii=3600*1e3,ki="installations",Ci="Installations";/**
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
 */const Ti={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},q=new ye(ki,Ci,Ti);function nn(e){return e instanceof ee&&e.code.includes("request-failed")}/**
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
 */function rn({projectId:e}){return`${Ei}/projects/${e}/installations`}function on(e){return{token:e.token,requestStatus:2,expiresIn:Di(e.expiresIn),creationTime:Date.now()}}async function an(e,t){const r=(await t.json()).error;return q.create("request-failed",{requestName:e,serverCode:r.code,serverMessage:r.message,serverStatus:r.status})}function sn({apiKey:e}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e})}function Fi(e,{refreshToken:t}){const n=sn(e);return n.append("Authorization",Ai(t)),n}async function cn(e){const t=await e();return t.status>=500&&t.status<600?e():t}function Di(e){return Number(e.replace("s","000"))}function Ai(e){return`${tn} ${e}`}/**
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
 */async function _i({appConfig:e,heartbeatServiceProvider:t},{fid:n}){const r=rn(e),i=sn(e),o=t.getImmediate({optional:!0});if(o){const c=await o.getHeartbeatsHeader();c&&i.append("x-firebase-client",c)}const s={fid:n,authVersion:tn,appId:e.appId,sdkVersion:en},d={method:"POST",headers:i,body:JSON.stringify(s)},l=await cn(()=>fetch(r,d));if(l.ok){const c=await l.json();return{fid:c.fid||n,registrationStatus:2,refreshToken:c.refreshToken,authToken:on(c.authToken)}}else throw await an("Create Installation",l)}/**
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
 */function ln(e){return new Promise(t=>{setTimeout(t,e)})}/**
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
 */function ji(e){return btoa(String.fromCharCode(...e)).replace(/\+/g,"-").replace(/\//g,"_")}/**
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
 */const Ni=/^[cdef][\w-]{21}$/,Ue="";function Ri(){try{const e=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(e),e[0]=112+e[0]%16;const n=Oi(e);return Ni.test(n)?n:Ue}catch{return Ue}}function Oi(e){return ji(e).substr(0,22)}/**
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
 */function te(e){return`${e.appName}!${e.appId}`}/**
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
 */const Z=new Map;function dn(e,t){const n=te(e);pn(n,t),Pi(n,t)}function Bi(e,t){un();const n=te(e);let r=Z.get(n);r||(r=new Set,Z.set(n,r)),r.add(t)}function Mi(e,t){const n=te(e),r=Z.get(n);r&&(r.delete(t),r.size===0&&Z.delete(n),fn())}function pn(e,t){const n=Z.get(e);if(n)for(const r of n)r(t)}function Pi(e,t){const n=un();n&&n.postMessage({key:e,fid:t}),fn()}let V=null;function un(){return!V&&"BroadcastChannel"in self&&(V=new BroadcastChannel("[Firebase] FID Change"),V.onmessage=e=>{pn(e.data.key,e.data.fid)}),V}function fn(){Z.size===0&&V&&(V.close(),V=null)}/**
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
 */const $i="firebase-installations-database",Li=1,G="firebase-installations-store";let Ne=null;function Xe(){return Ne||(Ne=we($i,Li,{upgrade:(e,t)=>{switch(t){case 0:e.createObjectStore(G)}}})),Ne}async function be(e,t){const n=te(e),i=(await Xe()).transaction(G,"readwrite"),o=i.objectStore(G),s=await o.get(n);return await o.put(t,n),await i.done,(!s||s.fid!==t.fid)&&dn(e,t.fid),t}async function hn(e){const t=te(e),r=(await Xe()).transaction(G,"readwrite");await r.objectStore(G).delete(t),await r.done}async function ve(e,t){const n=te(e),i=(await Xe()).transaction(G,"readwrite"),o=i.objectStore(G),s=await o.get(n),d=t(s);return d===void 0?await o.delete(n):await o.put(d,n),await i.done,d&&(!s||s.fid!==d.fid)&&dn(e,d.fid),d}/**
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
 */async function Ze(e){let t;const n=await ve(e.appConfig,r=>{const i=zi(r),o=Wi(e,i);return t=o.registrationPromise,o.installationEntry});return n.fid===Ue?{installationEntry:await t}:{installationEntry:n,registrationPromise:t}}function zi(e){const t=e||{fid:Ri(),registrationStatus:0};return gn(t)}function Wi(e,t){if(t.registrationStatus===0){if(!navigator.onLine){const i=Promise.reject(q.create("app-offline"));return{installationEntry:t,registrationPromise:i}}const n={fid:t.fid,registrationStatus:1,registrationTime:Date.now()},r=Hi(e,n);return{installationEntry:n,registrationPromise:r}}else return t.registrationStatus===1?{installationEntry:t,registrationPromise:Ui(e)}:{installationEntry:t}}async function Hi(e,t){try{const n=await _i(e,t);return be(e.appConfig,n)}catch(n){throw nn(n)&&n.customData.serverCode===409?await hn(e.appConfig):await be(e.appConfig,{fid:t.fid,registrationStatus:0}),n}}async function Ui(e){let t=await mt(e.appConfig);for(;t.registrationStatus===1;)await ln(100),t=await mt(e.appConfig);if(t.registrationStatus===0){const{installationEntry:n,registrationPromise:r}=await Ze(e);return r||n}return t}function mt(e){return ve(e,t=>{if(!t)throw q.create("installation-not-found");return gn(t)})}function gn(e){return Vi(e)?{fid:e.fid,registrationStatus:0}:e}function Vi(e){return e.registrationStatus===1&&e.registrationTime+Qt<Date.now()}/**
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
 */async function Ki({appConfig:e,heartbeatServiceProvider:t},n){const r=qi(e,n),i=Fi(e,n),o=t.getImmediate({optional:!0});if(o){const c=await o.getHeartbeatsHeader();c&&i.append("x-firebase-client",c)}const s={installation:{sdkVersion:en,appId:e.appId}},d={method:"POST",headers:i,body:JSON.stringify(s)},l=await cn(()=>fetch(r,d));if(l.ok){const c=await l.json();return on(c)}else throw await an("Generate Auth Token",l)}function qi(e,{fid:t}){return`${rn(e)}/${t}/authTokens:generate`}/**
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
 */async function Qe(e,t=!1){let n;const r=await ve(e.appConfig,o=>{if(!bn(o))throw q.create("not-registered");const s=o.authToken;if(!t&&Ji(s))return o;if(s.requestStatus===1)return n=Gi(e,t),o;{if(!navigator.onLine)throw q.create("app-offline");const d=Zi(o);return n=Yi(e,d),d}});return n?await n:r.authToken}async function Gi(e,t){let n=await xt(e.appConfig);for(;n.authToken.requestStatus===1;)await ln(100),n=await xt(e.appConfig);const r=n.authToken;return r.requestStatus===0?Qe(e,t):r}function xt(e){return ve(e,t=>{if(!bn(t))throw q.create("not-registered");const n=t.authToken;return Qi(n)?{...t,authToken:{requestStatus:0}}:t})}async function Yi(e,t){try{const n=await Ki(e,t),r={...t,authToken:n};return await be(e.appConfig,r),n}catch(n){if(nn(n)&&(n.customData.serverCode===401||n.customData.serverCode===404))await hn(e.appConfig);else{const r={...t,authToken:{requestStatus:0}};await be(e.appConfig,r)}throw n}}function bn(e){return e!==void 0&&e.registrationStatus===2}function Ji(e){return e.requestStatus===2&&!Xi(e)}function Xi(e){const t=Date.now();return t<e.creationTime||e.creationTime+e.expiresIn<t+Ii}function Zi(e){const t={requestStatus:1,requestTime:Date.now()};return{...e,authToken:t}}function Qi(e){return e.requestStatus===1&&e.requestTime+Qt<Date.now()}/**
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
 */async function eo(e){const t=e,{installationEntry:n,registrationPromise:r}=await Ze(t);return r?r.catch(console.error):Qe(t).catch(console.error),n.fid}/**
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
 */async function to(e,t=!1){const n=e;return await no(n),(await Qe(n,t)).token}async function no(e){const{registrationPromise:t}=await Ze(e);t&&await t}/**
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
 */function ro(e,t){const{appConfig:n}=e;return Bi(n,t),()=>{Mi(n,t)}}/**
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
 */function io(e){if(!e||!e.options)throw Re("App Configuration");if(!e.name)throw Re("App Name");const t=["projectId","apiKey","appId"];for(const n of t)if(!e.options[n])throw Re(n);return{appName:e.name,projectId:e.options.projectId,apiKey:e.options.apiKey,appId:e.options.appId}}function Re(e){return q.create("missing-app-config-values",{valueName:e})}/**
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
 */const mn="installations",oo="installations-internal",ao=e=>{const t=e.getProvider("app").getImmediate(),n=io(t),r=Ye(t,"heartbeat");return{app:t,appConfig:n,heartbeatServiceProvider:r,_delete:()=>Promise.resolve()}},so=e=>{const t=e.getProvider("app").getImmediate(),n=Ye(t,mn).getImmediate();return{getId:()=>eo(n),getToken:i=>to(n,i)}};function co(){K(new z(mn,ao,"PUBLIC")),K(new z(oo,so,"PRIVATE"))}/**
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
 */co();L(Zt,Je);L(Zt,Je,"esm2020");/**
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
 */const lo="/firebase-messaging-sw.js",po="/firebase-cloud-messaging-push-scope",xn="BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4",uo="https://fcmregistrations.googleapis.com/v1",yn="google.c.a.c_id",fo="google.c.a.c_l",ho="google.c.a.ts",go="google.c.a.e",yt=1e4;var wt;(function(e){e[e.DATA_MESSAGE=1]="DATA_MESSAGE",e[e.DISPLAY_NOTIFICATION=3]="DISPLAY_NOTIFICATION"})(wt||(wt={}));/**
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
 */var Q;(function(e){e.PUSH_RECEIVED="push-received",e.NOTIFICATION_CLICKED="notification-clicked",e.FID_REGISTERED="fid-registered"})(Q||(Q={}));/**
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
 */function D(e){const t=new Uint8Array(e);return btoa(String.fromCharCode(...t)).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}function wn(e){const t="=".repeat((4-e.length%4)%4),n=(e+t).replace(/\-/g,"+").replace(/_/g,"/"),r=atob(n),i=new Uint8Array(r.length);for(let o=0;o<r.length;++o)i[o]=r.charCodeAt(o);return i}/**
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
 */const Oe="fcm_token_details_db",bo=5,vt="fcm_token_object_Store";async function mo(e){if("databases"in indexedDB&&!(await indexedDB.databases()).map(o=>o.name).includes(Oe))return null;let t=null;return(await we(Oe,bo,{upgrade:async(r,i,o,s)=>{if(i<2||!r.objectStoreNames.contains(vt))return;const d=s.objectStore(vt),l=await d.index("fcmSenderId").get(e);if(await d.clear(),!!l){if(i===2){const c=l;if(!c.auth||!c.p256dh||!c.endpoint)return;t={token:c.fcmToken,createTime:c.createTime??Date.now(),subscriptionOptions:{auth:c.auth,p256dh:c.p256dh,endpoint:c.endpoint,swScope:c.swScope,vapidKey:typeof c.vapidKey=="string"?c.vapidKey:D(c.vapidKey)}}}else if(i===3){const c=l;t={token:c.fcmToken,createTime:c.createTime,subscriptionOptions:{auth:D(c.auth),p256dh:D(c.p256dh),endpoint:c.endpoint,swScope:c.swScope,vapidKey:D(c.vapidKey)}}}else if(i===4){const c=l;t={token:c.fcmToken,createTime:c.createTime,subscriptionOptions:{auth:D(c.auth),p256dh:D(c.p256dh),endpoint:c.endpoint,swScope:c.swScope,vapidKey:D(c.vapidKey)}}}}}})).close(),await he(Oe),await he("fcm_vapid_details_db"),await he("undefined"),xo(t)?t:null}function xo(e){if(!e||!e.subscriptionOptions)return!1;const{subscriptionOptions:t}=e;return typeof e.createTime=="number"&&e.createTime>0&&typeof e.token=="string"&&e.token.length>0&&typeof t.auth=="string"&&t.auth.length>0&&typeof t.p256dh=="string"&&t.p256dh.length>0&&typeof t.endpoint=="string"&&t.endpoint.length>0&&typeof t.swScope=="string"&&t.swScope.length>0&&typeof t.vapidKey=="string"&&t.vapidKey.length>0}/**
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
 */const yo={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"only-available-in-window":"This method is available in a Window context.","only-available-in-sw":"This method is available in a service worker context.","permission-default":"The notification permission was not granted and dismissed instead.","permission-blocked":"The notification permission was not granted and blocked instead.","unsupported-browser":"This browser doesn't support the API's required to use the Firebase SDK.","indexed-db-unsupported":"This browser doesn't support indexedDb.open() (ex. Safari iFrame, Firefox Private Browsing, etc)","failed-service-worker-registration":"We are unable to register the default service worker. {$browserErrorMessage}","token-subscribe-failed":"A problem occurred while subscribing the user to FCM: {$errorInfo}","token-subscribe-no-token":"FCM returned no token when subscribing the user to push.","fid-registration-failed":"A problem occurred while creating an FCM registration via FID: {$errorInfo}","fid-unregister-failed":"A problem occurred while unregistering the FCM registration via FID: {$errorInfo}","fid-registration-idb-schema-unavailable":"Unable to read or persist FID registration metadata because the messaging IndexedDB schema is unavailable (for example, the database could not be upgraded to the latest version).","token-unsubscribe-failed":"A problem occurred while unsubscribing the user from FCM: {$errorInfo}","token-update-failed":"A problem occurred while updating the user from FCM: {$errorInfo}","token-update-no-token":"FCM returned no token when updating the user to push.","use-sw-after-get-token":"The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.","invalid-sw-registration":"The input to useServiceWorker() must be a ServiceWorkerRegistration.","invalid-bg-handler":"The input to setBackgroundMessageHandler() must be a function.","invalid-vapid-key":"The public VAPID key must be a string.","use-vapid-key-after-get-token":"The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used.","invalid-on-registered-handler":"No onRegistered callback handler was provided or registered. Implement onRegistered() before register()."},b=new ye("messaging","Messaging",yo);/**
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
 */const St="firebase-messaging-database",Et=2,Y="firebase-messaging-store",P="firebase-messaging-fid-registration-store",wo={openDB:we,deleteDB:he};let It=wo,oe=null;function vo(e,t,n){switch(t){case 0:if(e.createObjectStore(Y),n===1)break;case 1:n===2&&e.createObjectStore(P)}}function kt(e){return{upgrade:(t,n)=>{vo(t,n,e)},blocked:()=>{},blocking:(t,n,r)=>{var i;oe=null,(i=r.target)==null||i.close()},terminated:()=>{oe=null}}}function Se(){return oe||(oe=It.openDB(St,Et,kt(2)).catch(()=>It.openDB(St,Et-1,kt(1)))),oe}function vn(e,t){return e.objectStoreNames.contains(t)}function Sn(e){if(!vn(e,P))throw b.create("fid-registration-idb-schema-unavailable")}async function So(e){const t=Ee(e),r=await(await Se()).transaction(Y).objectStore(Y).get(t);if(r)return r;{const i=await mo(e.appConfig.senderId);if(i)return await et(e,i),i}}async function et(e,t){const n=Ee(e),r=await Se(),i=[Y],o=vn(r,P);o&&i.push(P);const s=r.transaction(i,"readwrite");return await s.objectStore(Y).put(t,n),o&&await s.objectStore(P).delete(n),await s.done,t}async function En(e){const t=Ee(e),n=await Se();return Sn(n),await n.transaction(P).objectStore(P).get(t)}async function Eo(e,t){const n=Ee(e),r=await Se();Sn(r);const i=r.transaction([Y,P],"readwrite");return await i.objectStore(P).put(t,n),await i.objectStore(Y).delete(n),await i.done,t}function Ee({appConfig:e}){return e.appId}const Ct="@firebase/messaging",Ve="0.13.3";/**
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
 */const Io=3,ko=1e3;async function Co(e,t){const n=await ke(e),r=tt(t,e.appConfig.appName,!1),i={method:"POST",headers:n,body:JSON.stringify(r)};let o;try{o=await(await fetch(Ie(e.appConfig),i)).json()}catch(s){throw b.create("token-subscribe-failed",{errorInfo:s==null?void 0:s.toString()})}if(o.error){const s=o.error.message;throw b.create("token-subscribe-failed",{errorInfo:s})}if(!o.token)throw b.create("token-subscribe-no-token");return o.token}async function To(e,t){var l;const n=await ke(e),r=tt(t,e.appConfig.appName,!0),i={method:"POST",headers:n,body:JSON.stringify(r)};let o;try{o=await jo(()=>fetch(Ie(e.appConfig),i),Io,ko)}catch(c){throw b.create("fid-registration-failed",{errorInfo:c==null?void 0:c.toString()})}if(o.ok)return{responseFid:await Fo(o)};let s;try{s=await o.json()}catch{throw b.create("fid-registration-failed",{errorInfo:o.statusText})}const d=((l=s.error)==null?void 0:l.message)??o.statusText;throw b.create("fid-registration-failed",{errorInfo:d})}async function Fo(e){const t=await e.text();if(!t.trim())throw b.create("fid-registration-failed",{errorInfo:"CreateRegistration succeeded but response body is empty"});let n;try{n=JSON.parse(t)}catch{throw b.create("fid-registration-failed",{errorInfo:"CreateRegistration succeeded but response body is not valid JSON"})}const r=n.name;if(typeof r!="string"||r.length===0)throw b.create("fid-registration-failed",{errorInfo:"CreateRegistration succeeded but response did not include a non-empty name"});return Do(r)}const Tt="/registrations/";function Do(e){const t=e.indexOf(Tt);if(t!==-1){const n=e.slice(t+Tt.length);if(n.length>0)return n}throw b.create("fid-registration-failed",{errorInfo:"CreateRegistration succeeded but response name is not a valid registration resource name"})}async function Ao(e,t){const n=await ke(e),r=tt(t.subscriptionOptions,e.appConfig.appName,!1),i={method:"PATCH",headers:n,body:JSON.stringify(r)};let o;try{o=await(await fetch(`${Ie(e.appConfig)}/${t.token}`,i)).json()}catch(s){throw b.create("token-update-failed",{errorInfo:s==null?void 0:s.toString()})}if(o.error){const s=o.error.message;throw b.create("token-update-failed",{errorInfo:s})}if(!o.token)throw b.create("token-update-no-token");return o.token}async function _o(e,t){const r={method:"DELETE",headers:await ke(e)};try{const o=await(await fetch(`${Ie(e.appConfig)}/${t}`,r)).json();if(o.error){const s=o.error.message;throw b.create("token-unsubscribe-failed",{errorInfo:s})}}catch(i){throw b.create("token-unsubscribe-failed",{errorInfo:i==null?void 0:i.toString()})}}async function jo(e,t,n){let r;for(let i=0;i<t;i++)try{return await e()}catch(o){if(r=o,i<t-1){const s=n*Math.pow(2,i);await new Promise(d=>setTimeout(d,s))}}throw r}function Ie({projectId:e}){return`${uo}/projects/${e}/registrations`}async function ke({appConfig:e,installations:t}){const n=await t.getToken();return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e.apiKey,"x-goog-firebase-installations-auth":`FIS ${n}`})}function No(e,t){var n,r;try{if(/^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(e))return new URL(e).host}catch{}try{if(typeof self<"u"&&((n=self.location)!=null&&n.href))return new URL(e,self.location.origin).host}catch{}return typeof self<"u"&&((r=self.location)!=null&&r.host)?self.location.host:t}function tt({p256dh:e,auth:t,endpoint:n,vapidKey:r,swScope:i},o,s){const d={web:{origin:No(i,o),endpoint:n,auth:t,p256dh:e}};return s&&(d.fcm_sdk_version=Ve),r!==xn&&(d.web.applicationPubKey=r),d}/**
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
 */const Ro=10080*60*1e3;async function Oo(e){const t=await Mo(e.swRegistration,e.vapidKey),n={vapidKey:e.vapidKey,swScope:e.swRegistration.scope,endpoint:t.endpoint,auth:D(t.getKey("auth")),p256dh:D(t.getKey("p256dh"))},r=await So(e.firebaseDependencies);if(r){if(Po(r.subscriptionOptions,n))return Date.now()>=r.createTime+Ro?Bo(e,{token:r.token,createTime:Date.now(),subscriptionOptions:n}):r.token;try{await _o(e.firebaseDependencies,r.token)}catch(i){console.warn(i)}return Ft(e.firebaseDependencies,n)}else return Ft(e.firebaseDependencies,n)}async function Bo(e,t){try{const n=await Ao(e.firebaseDependencies,t),r={...t,token:n,createTime:Date.now()};return await et(e.firebaseDependencies,r),n}catch(n){throw n}}async function Ft(e,t){const r={token:await Co(e,t),createTime:Date.now(),subscriptionOptions:t};return await et(e,r),r.token}async function Mo(e,t){const n=await e.pushManager.getSubscription();return n||e.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:wn(t)})}function Po(e,t){const n=t.vapidKey===e.vapidKey,r=t.endpoint===e.endpoint,i=t.auth===e.auth,o=t.p256dh===e.p256dh;return n&&r&&i&&o}function $o(e,t){const n=e.onRegisteredHandler;n&&(typeof n=="function"?n(t):n.next(t))}/**
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
 */async function Lo(e){try{e.swRegistration=await navigator.serviceWorker.register(lo,{scope:po}),e.swRegistration.update().catch(()=>{}),await zo(e.swRegistration)}catch(t){throw b.create("failed-service-worker-registration",{browserErrorMessage:t==null?void 0:t.message})}}async function zo(e){return new Promise((t,n)=>{const r=setTimeout(()=>n(new Error(`Service worker not registered after ${yt} ms`)),yt),i=e.installing||e.waiting;e.active?(clearTimeout(r),t()):i?i.onstatechange=o=>{var s;((s=o.target)==null?void 0:s.state)==="activated"&&(i.onstatechange=null,clearTimeout(r),t())}:(clearTimeout(r),n(new Error("No incoming service worker found.")))})}/**
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
 */async function In(e,t){if(!t&&!e.swRegistration&&await Lo(e),!(!t&&e.swRegistration)){if(!(t instanceof ServiceWorkerRegistration))throw b.create("invalid-sw-registration");e.swRegistration=t}}/**
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
 */async function kn(e,t){t?e.vapidKey=t:e.vapidKey||(e.vapidKey=xn)}/**
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
 */const Dt=3;async function Wo(e,t){const n=await Ho(e.swRegistration,e.vapidKey),r={vapidKey:e.vapidKey,swScope:e.swRegistration.scope,endpoint:n.endpoint,auth:D(n.getKey("auth")),p256dh:D(n.getKey("p256dh"))},i=e.firebaseDependencies.installations;for(let o=0;o<Dt;o++){const{responseFid:s}=await To(e.firebaseDependencies,r);if(s===t)return;o<Dt-1&&await i.getToken(!0)}throw b.create("fid-registration-failed",{errorInfo:"CreateRegistration response FID does not match Firebase Installation ID"})}async function Ho(e,t){const n=await e.pushManager.getSubscription();return n||e.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:wn(t)})}/**
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
 */const Uo=10080*60*1e3;async function Cn(e,t){if(!navigator)throw b.create("only-available-in-window");if(Notification.permission==="default"&&await Notification.requestPermission(),Notification.permission!=="granted")throw b.create("permission-blocked");if(!e.onRegisteredHandler)throw b.create("invalid-on-registered-handler");await kn(e,t==null?void 0:t.vapidKey),await In(e,t==null?void 0:t.serviceWorkerRegistration);const n=e._registerNotifyChain.catch(()=>{});return e._registerNotifyChain=n.then(async()=>{const r=await e.firebaseDependencies.installations.getId(),i=await En(e.firebaseDependencies),o=Date.now();if((!i||i.fid!==r||o>=i.lastRegisterTime+Uo)&&(await Wo(e,r),await Eo(e.firebaseDependencies,{fid:r,lastRegisterTime:o,vapidKey:e.vapidKey})),!e.onRegisteredHandler)throw b.create("invalid-on-registered-handler");$o(e,r)}),e._registerNotifyChain}/**
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
 */function Vo(e,t){return ro(t,()=>{(async()=>!e.onRegisteredHandler||!await En(e.firebaseDependencies)||await Cn(e).catch(()=>{}))()})}/**
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
 */function At(e){const t={from:e.from,collapseKey:e.collapse_key,messageId:e.fcmMessageId};return Ko(t,e),qo(t,e),Go(t,e),t}function Ko(e,t){if(!t.notification)return;e.notification={};const n=t.notification.title;n&&(e.notification.title=n);const r=t.notification.body;r&&(e.notification.body=r);const i=t.notification.image;i&&(e.notification.image=i);const o=t.notification.icon;o&&(e.notification.icon=o)}function qo(e,t){t.data&&(e.data=t.data)}function Go(e,t){var i,o,s,d;if(!t.fcmOptions&&!((i=t.notification)!=null&&i.click_action))return;e.fcmOptions={};const n=((o=t.fcmOptions)==null?void 0:o.link)??((s=t.notification)==null?void 0:s.click_action);n&&(e.fcmOptions.link=n);const r=(d=t.fcmOptions)==null?void 0:d.analytics_label;r&&(e.fcmOptions.analyticsLabel=r)}/**
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
 */function Yo(e){return typeof e=="object"&&!!e&&yn in e}/**
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
 */function Jo(e){if(!e||!e.options)throw Be("App Configuration Object");if(!e.name)throw Be("App Name");const t=["projectId","apiKey","appId","messagingSenderId"],{options:n}=e;for(const r of t)if(!n[r])throw Be(r);return{appName:e.name,projectId:n.projectId,apiKey:n.apiKey,appId:n.appId,senderId:n.messagingSenderId}}function Be(e){return b.create("missing-app-config-values",{valueName:e})}/**
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
 */class Xo{constructor(t,n,r){this.deliveryMetricsExportedToBigQueryEnabled=!1,this.onBackgroundMessageHandler=null,this.onMessageHandler=null,this.onRegisteredHandler=null,this.onUnregisteredHandler=null,this._registerNotifyChain=Promise.resolve(),this._fidChangeUnsubscribe=null,this.logEvents=[],this.logQueue={state:"stopped"};const i=Jo(t);this.firebaseDependencies={app:t,appConfig:i,installations:n,analyticsProvider:r}}_delete(){return this._fidChangeUnsubscribe&&(this._fidChangeUnsubscribe(),this._fidChangeUnsubscribe=null),this.logQueue.state==="scheduled"&&clearTimeout(this.logQueue.timerId),this.logQueue={state:"stopped"},Promise.resolve()}}/**
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
 */async function Zo(e,t){if(!navigator)throw b.create("only-available-in-window");if(Notification.permission==="default"&&await Notification.requestPermission(),Notification.permission!=="granted")throw b.create("permission-blocked");return await kn(e,t==null?void 0:t.vapidKey),await In(e,t==null?void 0:t.serviceWorkerRegistration),Oo(e)}/**
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
 */async function Qo(e,t,n){const r=ea(t);(await e.firebaseDependencies.analyticsProvider.get()).logEvent(r,{message_id:n[yn],message_name:n[fo],message_time:n[ho],message_device_time:Math.floor(Date.now()/1e3)})}function ea(e){switch(e){case Q.NOTIFICATION_CLICKED:return"notification_open";case Q.PUSH_RECEIVED:return"notification_foreground";default:throw new Error}}/**
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
 */async function ta(e,t){const n=t.data;if(!n.isFirebaseMessaging)return;if(e.onMessageHandler&&n.messageType===Q.PUSH_RECEIVED&&(typeof e.onMessageHandler=="function"?e.onMessageHandler(At(n)):e.onMessageHandler.next(At(n))),e.onRegisteredHandler&&n.messageType===Q.FID_REGISTERED){const i=n.fid;typeof e.onRegisteredHandler=="function"?e.onRegisteredHandler(i):e.onRegisteredHandler.next(i)}const r=n.data;Yo(r)&&r[go]==="1"&&await Qo(e,n.messageType,r)}/**
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
 */const na=e=>{const t=new Xo(e.getProvider("app").getImmediate(),e.getProvider("installations-internal").getImmediate(),e.getProvider("analytics-internal"));return navigator.serviceWorker.addEventListener("message",n=>ta(t,n)),t._fidChangeUnsubscribe=Vo(t,e.getProvider("installations").getImmediate()),t},ra=e=>{const t=e.getProvider("messaging").getImmediate();return{getToken:r=>Zo(t,r),register:r=>Cn(t,r)}};function ia(){K(new z("messaging",na,"PUBLIC")),K(new z("messaging-internal",ra,"PRIVATE")),L(Ct,Ve),L(Ct,Ve,"esm2020")}/**
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
 */async function Tn(){try{await Ut()}catch{return!1}return typeof window<"u"&&Ht()&&sr()&&"serviceWorker"in navigator&&"PushManager"in window&&"Notification"in window&&"fetch"in window&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey")}/**
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
 */function oa(e,t){if(!navigator)throw b.create("only-available-in-window");return e.onMessageHandler=t,()=>{e.onMessageHandler=null}}/**
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
 */function aa(e=Yt()){return Tn().then(t=>{if(!t)throw b.create("unsupported-browser")},t=>{throw b.create("indexed-db-unsupported")}),Ye(Vt(e),"messaging").getImmediate()}function sa(e,t){return e=Vt(e),oa(e,t)}/**
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
 */ia();const ca={apiKey:"AIzaSyFakeKeyForLocalTesting12345678",authDomain:"emperor-saas.firebaseapp.com",projectId:"emperor-saas",storageBucket:"emperor-saas.appspot.com",messagingSenderId:"123456789012",appId:"1:123456789012:web:abcdef123456"},la=di().length>0?Yt():Gt(ca);async function da(e){try{if(!await Tn())return null;const n=aa(la);return sa(n,r=>{e&&e(r)})}catch(t){return console.error("Error attaching foreground message listener:",t),null}}function pa(){const{theme:e}=me(),{t,language:n}=ce(),r=e==="light",i=new Date().getFullYear(),o=ge();return a.jsx("footer",{className:"emperor-app-footer",children:a.jsxs("div",{className:"emperor-app-footer-inner",children:[a.jsxs("div",{className:"emperor-app-footer-brand",children:[a.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"8px",overflow:"hidden",border:"1px solid rgba(56, 189, 248, 0.45)",background:r?"#ffffff":"#071325",display:"inline-flex",alignItems:"center",justifyContent:"center",flexShrink:0,boxShadow:"0 0 10px rgba(56, 189, 248, 0.3)"},children:a.jsx("img",{src:xe(),alt:o,style:{width:"100%",height:"100%",objectFit:"contain"}})}),a.jsx("span",{style:{color:r?"#475569":"#94A3B8",fontWeight:"600",lineHeight:"1.6"},children:t("rights",n==="en"?`All Rights Reserved © ${i} — ${o}`:`جميع الحقوق محفوظة © ${i} — منصة ${o}`)})]}),a.jsx("div",{children:a.jsxs(j,{to:"/created-by",style:{color:r?"#b45309":"#D4A537",textDecoration:"none",fontWeight:"700",fontSize:"12px",display:"inline-flex",alignItems:"center",gap:"5px",padding:"5px 12px",borderRadius:"8px",background:r?"rgba(212, 165, 55, 0.1)":"rgba(212, 165, 55, 0.08)",border:r?"1px solid rgba(212, 165, 55, 0.25)":"1px solid rgba(212, 165, 55, 0.18)",transition:"all 0.2s ease"},onMouseEnter:s=>{s.currentTarget.style.background=r?"rgba(212, 165, 55, 0.2)":"rgba(212, 165, 55, 0.16)",s.currentTarget.style.transform="translateY(-1px)"},onMouseLeave:s=>{s.currentTarget.style.background=r?"rgba(212, 165, 55, 0.1)":"rgba(212, 165, 55, 0.08)",s.currentTarget.style.transform="translateY(0)"},children:[a.jsx("span",{children:t("developedByTeam","تم التطوير بواسطة فريق العمل")}),a.jsx(Un,{size:12})]})})]})})}function ua({isOpen:e,onClose:t}){const{theme:n}=me(),r=n==="light",{language:i,isRtl:o}=ce(),s=i==="en",[d,l]=m.useState([]),[c,p]=m.useState(!1);if(m.useEffect(()=>{if(!e)return;const u=document.body.style.overflow;document.body.style.overflow="hidden";const h=y=>{y.key==="Escape"&&t()};return window.addEventListener("keydown",h),()=>{document.body.style.overflow=u,window.removeEventListener("keydown",h)}},[e,t]),m.useEffect(()=>{if(!e)return;let u=!0;return(async()=>{var y;p(!0);try{const S=await jn.getSupportContacts(),N=((y=S.data)==null?void 0:y.data)||S.data||[];u&&l(Array.isArray(N)?N:[])}catch(S){console.error("Error fetching support contacts for modal:",S)}finally{u&&p(!1)}})(),()=>{u=!1}},[e]),!e)return null;const v=[{id:"owner",name:s?"Diaa Ashraf":"ضياء أشرف",role_badge:s?"Platform Owner":"صاحب المنصة",badge_color:"#F59E0B",channel:"whatsapp",phone:"01012286661",value:"01012286661"},{id:"support-1",name:s?"Yasmine":"ياسمين",role_badge:s?"Customer Support":"خدمة العملاء",badge_color:"#38BDF8",channel:"whatsapp",phone:"01201111390",value:"01201111390"},{id:"support-2",name:s?"Support Team":"فريق الدعم",role_badge:s?"Customer Support":"خدمة العملاء",badge_color:"#34D399",channel:"whatsapp",phone:"01013669339",value:"01013669339"}],E=u=>{const h=(u.value||u.phone||"").trim(),y=(u.channel||"").toLowerCase();if(y.includes("whatsapp")||h.startsWith("+")||/^[0-9]+$/.test(h.replace(/[\s+-]/g,""))){const S=h.replace(/[^0-9]/g,""),N=S.startsWith("01")?`20${S.substring(1)}`:S,R=encodeURIComponent(s?"Hello, I need assistance regarding my account.":"السلام عليكم ورحمة الله وبركاته، محتاج مساعدة بخصوص حسابي في منصة سند ومهره كارد.");return`https://wa.me/${N}?text=${R}`}return y.includes("telegram")||h.includes("t.me")?h.startsWith("http")?h:`https://t.me/${h.replace("@","")}`:y.includes("email")||h.includes("@")?`mailto:${h}`:h.startsWith("http")?h:`https://${h}`},k=(u,h)=>{let y=u.role_badge;if(!y){const S=(u.description||"").trim();S.includes("صاحب")||S.includes("إدارة")?y="صاحب المنصة":S.includes("تارجت")?y="قسم التارجت":S.includes("فني")||S.includes("شحن")?y="الدعم الفني":y="خدمة العملاء"}if(s){if(y==="صاحب المنصة")return"Platform Owner";if(y==="قسم التارجت")return"Target Support";if(y==="الدعم الفني")return"Technical Support";if(y==="خدمة العملاء")return"Customer Support"}return y},F=d.length>0?d.map((u,h)=>({...u,phone:u.value?u.value.replace(/[^0-9+]/g,""):"",role_badge:k(u),badge_color:h===0?"#F59E0B":h%2===1?"#38BDF8":"#34D399"})):v;return a.jsxs("div",{onClick:t,style:{position:"fixed",inset:0,zIndex:9999,display:"flex",alignItems:"center",justifyContent:"center",padding:"16px",backgroundColor:r?"rgba(15, 23, 42, 0.35)":"rgba(5, 5, 8, 0.82)",backdropFilter:"blur(10px)",WebkitBackdropFilter:"blur(10px)",animation:"fadeInModal 0.25s ease-out forwards"},children:[a.jsx("style",{children:`
                @keyframes fadeInModal {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes scaleUpModal {
                    from { opacity: 0; transform: scale(0.94) translateY(12px); }
                    to { opacity: 1; transform: scale(1) translateY(0); }
                }
                .support-contact-card {
                    transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .support-contact-card:hover {
                    border-color: rgba(34, 197, 94, 0.6) !important;
                    background: ${r?"#FEFCE8":"rgba(18, 30, 24, 0.85)"} !important;
                    transform: translateY(-2px);
                    box-shadow: 0 8px 24px rgba(34, 197, 94, 0.15);
                }
                .support-contact-btn {
                    transition: all 0.2s ease;
                }
                .support-contact-btn:hover {
                    background: #22C55E !important;
                    color: #FFFFFF !important;
                    box-shadow: 0 0 16px rgba(34, 197, 94, 0.4);
                }
            `}),a.jsxs("div",{onClick:u=>u.stopPropagation(),style:{position:"relative",width:"100%",maxWidth:"460px",maxHeight:"90vh",overflowY:"auto",backgroundColor:r?"#FFFFFF":"#0D0E12",border:r?"1.5px solid rgba(212, 165, 55, 0.45)":"1.5px solid rgba(34, 197, 94, 0.35)",borderRadius:"24px",padding:"clamp(16px, 4vw, 24px)",boxShadow:r?"0 20px 60px rgba(0, 0, 0, 0.12), 0 0 30px rgba(212, 165, 55, 0.1)":"0 20px 60px rgba(0, 0, 0, 0.9), 0 0 40px rgba(34, 197, 94, 0.12)",animation:"scaleUpModal 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards",fontFamily:"var(--font-cairo, Cairo, sans-serif)",direction:o?"rtl":"ltr",color:r?"#0F172A":"#FFFFFF",boxSizing:"border-box"},children:[a.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"16px",gap:"10px"},children:[a.jsx("button",{type:"button",onClick:t,"aria-label":s?"Close":"إغلاق",style:{display:"flex",alignItems:"center",justifyContent:"center",width:"36px",height:"36px",borderRadius:"12px",background:r?"#F1F5F9":"rgba(255, 255, 255, 0.06)",border:r?"1px solid #CBD5E1":"1px solid rgba(255, 255, 255, 0.1)",color:r?"#475569":"#A0A0B0",cursor:"pointer",transition:"all 0.2s ease",flexShrink:0},onMouseEnter:u=>{u.currentTarget.style.color="#FFFFFF",u.currentTarget.style.background="rgba(239, 68, 68, 0.85)",u.currentTarget.style.borderColor="rgba(239, 68, 68, 0.9)"},onMouseLeave:u=>{u.currentTarget.style.color=r?"#475569":"#A0A0B0",u.currentTarget.style.background=r?"#F1F5F9":"rgba(255, 255, 255, 0.06)",u.currentTarget.style.borderColor=r?"#CBD5E1":"rgba(255, 255, 255, 0.1)"},children:a.jsx(Ke,{size:20})}),a.jsxs("h2",{style:{margin:0,fontSize:"clamp(16px, 4vw, 18px)",fontWeight:"900",color:r?"#0F172A":"#FFFFFF",letterSpacing:"-0.2px",display:"flex",alignItems:"center",gap:"6px"},children:[a.jsx("span",{children:s?"Contact Team":"تواصل مع فريق"}),a.jsx("span",{style:{background:"linear-gradient(135deg, #F5D061 0%, #D4A537 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"},children:"EMPEROR"})]})]}),a.jsx("p",{style:{margin:"0 0 18px",fontSize:"13.5px",fontWeight:"700",color:r?"#475569":"#9E9EA8",textAlign:o?"right":"left"},children:s?"Choose the channel or representative to contact directly:":"اختر القناة أو الشخص الذي تريد التواصل معه مباشرة:"}),a.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"12px"},children:F.map((u,h)=>{const y=E(u),S=h===0;return a.jsxs("div",{className:"support-contact-card",style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 14px",borderRadius:"16px",background:r?"#FFFFFF":"rgba(15, 18, 16, 0.75)",border:r?"1.5px solid rgba(212, 165, 55, 0.35)":"1.5px solid rgba(34, 197, 94, 0.22)",gap:"10px",boxSizing:"border-box",width:"100%"},children:[a.jsx("a",{href:y,target:"_blank",rel:"noopener noreferrer",className:"support-contact-btn",style:{display:"inline-flex",alignItems:"center",justifyContent:"center",padding:"7px 16px",borderRadius:"10px",border:"1.5px solid #22C55E",color:"#FFFFFF",background:"#22C55E",fontSize:"13px",fontWeight:"900",textDecoration:"none",cursor:"pointer",flexShrink:0,boxShadow:"0 2px 8px rgba(34, 197, 94, 0.3)"},children:s?"Contact":"تواصل"}),a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px",minWidth:0,flex:1,justifyContent:o?"flex-end":"flex-start",flexDirection:o?"row":"row-reverse"},children:[a.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"3px",minWidth:0,flex:1,textAlign:o?"right":"left"},children:[a.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"flex-start",gap:"6px",flexWrap:"wrap"},children:[a.jsx("span",{style:{fontSize:"13.5px",fontWeight:"900",color:r?"#0F172A":"#FFFFFF",lineHeight:"1.4",wordBreak:"break-word"},children:u.name}),u.role_badge&&a.jsx("span",{style:{fontSize:"10.5px",fontWeight:"800",color:u.badge_color||(S?r?"#B45309":"#F59E0B":r?"#0369A1":"#38BDF8"),background:r?"rgba(0, 0, 0, 0.05)":"rgba(255, 255, 255, 0.06)",padding:"2px 7px",borderRadius:"6px",whiteSpace:"nowrap"},children:u.role_badge})]}),(u.phone||u.value)&&a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"5px",color:r?"#475569":"#A0A0B0",fontSize:"12px",fontWeight:"700",direction:"ltr",justifyContent:o?"flex-end":"flex-start",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:[a.jsx("span",{style:{overflow:"hidden",textOverflow:"ellipsis"},children:u.phone||u.value}),a.jsx(Vn,{size:11,color:"#22C55E",style:{flexShrink:0}})]})]}),a.jsx("div",{style:{width:"40px",height:"40px",borderRadius:"50%",background:"linear-gradient(135deg, #22C55E 0%, #16A34A 100%)",display:"flex",alignItems:"center",justifyContent:"center",color:"#FFFFFF",boxShadow:"0 0 14px rgba(34, 197, 94, 0.35)",flexShrink:0},children:a.jsx(Me,{size:20,fill:"#FFFFFF",color:"#22C55E"})})]})]},u.id||h)})}),a.jsxs("div",{style:{marginTop:"16px",paddingTop:"12px",borderTop:r?"1px solid #E2E8F0":"1px solid rgba(255, 255, 255, 0.06)",display:"flex",alignItems:"center",justifyContent:"center",gap:"6px",color:r?"#64748B":"#6B7280",fontSize:"11.5px",fontWeight:"700"},children:[a.jsx(Ot,{size:14,color:"#22C55E"}),a.jsx("span",{children:s?"Support team available 24/7 to assist you":"فريق الدعم متواجد لخدمتك على مدار الساعة 24/7"})]})]})]})}function fa(){const[e,t]=m.useState(!0),[n,r]=m.useState(!1);return m.useEffect(()=>{const i=setTimeout(()=>{r(!0)},1200),o=setTimeout(()=>{t(!1)},1600);return()=>{clearTimeout(i),clearTimeout(o)}},[]),e?a.jsxs("div",{id:"emperor-splash-screen",style:{position:"fixed",inset:0,zIndex:999999,backgroundColor:"#050508",backgroundImage:"radial-gradient(circle at 50% 45%, rgba(212, 165, 55, 0.18) 0%, rgba(5, 5, 8, 0.98) 70%)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",opacity:n?0:1,transform:n?"scale(1.04)":"scale(1)",transition:"opacity 0.45s ease, transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)",pointerEvents:n?"none":"auto",userSelect:"none"},children:[a.jsx("style",{children:`
                @keyframes emperorPulseLogo {
                    0% { transform: scale(0.92); filter: drop-shadow(0 0 20px rgba(212, 165, 55, 0.3)); }
                    50% { transform: scale(1.02); filter: drop-shadow(0 0 35px rgba(212, 165, 55, 0.7)); }
                    100% { transform: scale(0.92); filter: drop-shadow(0 0 20px rgba(212, 165, 55, 0.3)); }
                }
                @keyframes emperorProgressFill {
                    0% { width: 0%; }
                    100% { width: 100%; }
                }
                @keyframes emperorShimmerText {
                    0% { background-position: -200% center; }
                    100% { background-position: 200% center; }
                }
            `}),a.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"18px",textAlign:"center",padding:"20px"},children:[a.jsx("div",{style:{position:"relative",width:"120px",height:"120px",animation:"emperorPulseLogo 2.5s ease-in-out infinite"},children:a.jsx("img",{src:xe(),alt:"سند ومهره كارد",style:{width:"100%",height:"100%",borderRadius:"28px",objectFit:"contain",border:"2px solid rgba(212, 165, 55, 0.6)",boxShadow:"0 0 30px rgba(212, 165, 55, 0.5), inset 0 0 15px rgba(212, 165, 55, 0.3)"}})}),a.jsxs("div",{children:[a.jsx("h1",{style:{margin:"6px 0 2px",fontSize:"26px",fontWeight:"900",letterSpacing:"1px",fontFamily:"var(--font-cairo, Cairo, sans-serif)",background:"linear-gradient(90deg, #F8E8B8 0%, #FFFFFF 25%, #D4A537 50%, #FFFFFF 75%, #F8E8B8 100%)",backgroundSize:"200% auto",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",animation:"emperorShimmerText 3s linear infinite",textShadow:"0 0 20px rgba(212, 165, 55, 0.4)"},children:"سند ومهره كارد"}),a.jsx("p",{style:{margin:0,fontSize:"13px",fontWeight:"700",color:"#D4A537",letterSpacing:"0.5px",fontFamily:"var(--font-cairo, Cairo, sans-serif)"},children:"خدماتك الرقمية والمالية في مكان واحد"})]}),a.jsx("div",{style:{width:"160px",height:"4px",borderRadius:"999px",backgroundColor:"rgba(255, 255, 255, 0.08)",overflow:"hidden",marginTop:"8px",border:"1px solid rgba(212, 165, 55, 0.3)"},children:a.jsx("div",{style:{height:"100%",background:"linear-gradient(90deg, #D4A537, #F8E8B8, #22C55E)",animation:"emperorProgressFill 1.1s cubic-bezier(0.16, 1, 0.3, 1) forwards"}})})]})]}):null}function ha(){const[e,t]=m.useState(!1),[n,r]=m.useState(!1),{isRtl:i,t:o}=ce();m.useEffect(()=>{if(sessionStorage.getItem("emperor_payment_notice_seen"))return;const p=setTimeout(()=>{t(!0)},1700);return()=>clearTimeout(p)},[]);const s=()=>{sessionStorage.setItem("emperor_payment_notice_seen","true"),r(!0),setTimeout(()=>{t(!1),r(!1)},300)};if(!e)return null;const d=ge(),l=xe();return a.jsxs("div",{id:"emperor-payment-notice-backdrop",style:{position:"fixed",inset:0,zIndex:999998,backgroundColor:"rgba(3, 8, 18, 0.85)",backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",display:"flex",alignItems:"center",justifyContent:"center",padding:"16px",opacity:n?0:1,transition:"opacity 0.3s ease",direction:i?"rtl":"ltr",fontFamily:"var(--font-cairo, Cairo, sans-serif)"},onClick:c=>{c.target===c.currentTarget&&s()},children:[a.jsx("style",{children:`
                @keyframes emperorNoticePop {
                    0% {
                        opacity: 0;
                        transform: scale(0.9) translateY(20px);
                    }
                    100% {
                        opacity: 1;
                        transform: scale(1) translateY(0);
                    }
                }
                @keyframes emperorNoticeGlowPulse {
                    0%, 100% {
                        box-shadow: 0 0 25px rgba(245, 208, 97, 0.35), 0 0 50px rgba(245, 158, 11, 0.25);
                        border-color: #F5D061;
                    }
                    50% {
                        box-shadow: 0 0 45px rgba(245, 208, 97, 0.6), 0 0 75px rgba(245, 158, 11, 0.45);
                        border-color: #FDE047;
                    }
                }
                @keyframes emperorParticleDrift {
                    0% { transform: translateY(0px) scale(0.9); opacity: 0.35; }
                    50% { transform: translateY(-9px) scale(1.15); opacity: 0.85; }
                    100% { transform: translateY(0px) scale(0.9); opacity: 0.35; }
                }
            `}),a.jsxs("div",{className:"emperor-payment-notice-card",style:{position:"relative",width:"100%",maxWidth:"430px",borderRadius:"28px",padding:"2px",overflow:"hidden",background:"transparent",boxShadow:"0 25px 70px rgba(0, 0, 0, 0.95), 0 0 40px rgba(245, 208, 97, 0.2)",animation:n?"none":"emperorNoticePop 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",transform:n?"scale(0.92) translateY(15px)":"none",transition:"transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)"},children:[a.jsx("div",{style:{position:"absolute",top:"-50%",left:"-50%",width:"200%",height:"200%",background:"conic-gradient(from 0deg, transparent 0deg, #F5D061 55deg, #F59E0B 120deg, transparent 180deg, #38BDF8 240deg, #F5D061 310deg, transparent 360deg)",animation:"emperorRainbowSpin 6s linear infinite",zIndex:0}}),a.jsxs("div",{style:{position:"relative",zIndex:1,width:"100%",height:"100%",borderRadius:"26px",background:"linear-gradient(175deg, #181109 0%, #0d121c 30%, #050811 100%)",padding:"24px 22px 22px",overflow:"hidden",display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center"},children:[a.jsx("div",{style:{position:"absolute",top:"-90px",left:"50%",transform:"translateX(-50%)",width:"280px",height:"200px",borderRadius:"50%",background:"radial-gradient(circle, rgba(245, 158, 11, 0.38) 0%, rgba(245, 208, 97, 0.2) 45%, transparent 75%)",filter:"blur(35px)",pointerEvents:"none"}}),a.jsx("div",{style:{position:"absolute",top:"55px",left:"40px",width:"4px",height:"4px",borderRadius:"50%",background:"#F5D061",boxShadow:"0 0 10px #F5D061",animation:"emperorParticleDrift 3.2s infinite ease-in-out"}}),a.jsx("div",{style:{position:"absolute",top:"75px",left:"90px",width:"3px",height:"3px",borderRadius:"50%",background:"#F59E0B",boxShadow:"0 0 8px #F59E0B",animation:"emperorParticleDrift 2.7s infinite ease-in-out 0.4s"}}),a.jsx("div",{style:{position:"absolute",top:"60px",right:"50px",width:"4px",height:"4px",borderRadius:"50%",background:"#F5D061",boxShadow:"0 0 10px #F5D061",animation:"emperorParticleDrift 3.6s infinite ease-in-out 0.9s"}}),a.jsx("div",{style:{position:"absolute",top:"80px",right:"95px",width:"3px",height:"3px",borderRadius:"50%",background:"#FBBF24",boxShadow:"0 0 8px #FBBF24",animation:"emperorParticleDrift 3s infinite ease-in-out 1.2s"}}),a.jsx("button",{onClick:s,title:"إغلاق",style:{position:"absolute",top:"18px",left:"18px",width:"36px",height:"36px",borderRadius:"50%",background:"rgba(255, 255, 255, 0.08)",border:"1px solid rgba(255, 255, 255, 0.18)",display:"flex",alignItems:"center",justifyContent:"center",color:"#E2E8F0",cursor:"pointer",transition:"all 0.2s ease",outline:"none",zIndex:10},onMouseEnter:c=>{c.currentTarget.style.background="rgba(239, 68, 68, 0.25)",c.currentTarget.style.borderColor="#ef4444",c.currentTarget.style.color="#ef4444",c.currentTarget.style.transform="scale(1.08)"},onMouseLeave:c=>{c.currentTarget.style.background="rgba(255, 255, 255, 0.08)",c.currentTarget.style.borderColor="rgba(255, 255, 255, 0.18)",c.currentTarget.style.color="#E2E8F0",c.currentTarget.style.transform="scale(1)"},children:a.jsx(Ke,{size:17})}),a.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",marginBottom:"18px",marginTop:"4px"},children:[a.jsx("img",{src:l,alt:d,style:{width:"22px",height:"22px",objectFit:"contain",filter:"drop-shadow(0 0 8px rgba(245, 208, 97, 0.5))"}}),a.jsx("span",{style:{fontSize:"13px",fontWeight:"900",color:"#F5D061",letterSpacing:"0.6px",textShadow:"0 0 12px rgba(245, 208, 97, 0.4)"},children:d})]}),a.jsx("div",{style:{width:"56px",height:"56px",borderRadius:"50%",background:"radial-gradient(circle, rgba(245, 208, 97, 0.22) 0%, rgba(212, 165, 55, 0.08) 70%)",border:"1.5px solid #F5D061",display:"flex",alignItems:"center",justifyContent:"center",color:"#F5D061",marginBottom:"14px",animation:"emperorNoticeGlowPulse 2.8s infinite ease-in-out"},children:a.jsx(Nn,{size:28,color:"#F5D061"})}),a.jsx("h2",{style:{margin:"0 0 18px",fontSize:"22px",fontWeight:"900",color:"#FFF8E7",textShadow:"0 2px 10px rgba(0, 0, 0, 0.8), 0 0 25px rgba(245, 208, 97, 0.4)",letterSpacing:"0.2px"},children:o("paymentNoticeTitle","تنبيه قبل الدفع")}),a.jsxs("div",{style:{width:"100%",display:"flex",flexDirection:i?"row-reverse":"row",alignItems:"center",justifyContent:"space-between",gap:"12px",padding:"14px 16px",borderRadius:"16px",background:"rgba(28, 20, 10, 0.85)",border:"1.2px solid rgba(245, 208, 97, 0.35)",marginBottom:"12px",boxShadow:"0 6px 20px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(245, 208, 97, 0.15)"},children:[a.jsx("span",{style:{fontSize:"13.5px",fontWeight:"800",color:"#FDE68A",lineHeight:"1.45",textAlign:i?"right":"left",flex:1},children:o("paymentNotice1","المنتجات الرقمية لا تُسترد بعد تأكيد التحويل.")}),a.jsx("div",{style:{width:"30px",height:"30px",borderRadius:"50%",background:"rgba(245, 208, 97, 0.18)",border:"1.2px solid rgba(245, 208, 97, 0.65)",display:"flex",alignItems:"center",justifyContent:"center",color:"#F5D061",flexShrink:0,boxShadow:"0 0 10px rgba(245, 208, 97, 0.3)"},children:a.jsx(at,{size:16})})]}),a.jsxs("div",{style:{width:"100%",display:"flex",flexDirection:i?"row-reverse":"row",alignItems:"center",justifyContent:"space-between",gap:"12px",padding:"14px 16px",borderRadius:"16px",background:"rgba(28, 20, 10, 0.85)",border:"1.2px solid rgba(245, 208, 97, 0.35)",marginBottom:"22px",boxShadow:"0 6px 20px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(245, 208, 97, 0.15)"},children:[a.jsx("span",{style:{fontSize:"13.5px",fontWeight:"800",color:"#FDE68A",lineHeight:"1.45",textAlign:i?"right":"left",flex:1},children:o("paymentNotice2","راجع تفاصيل طلبك جيدًا قبل الدفع.")}),a.jsx("div",{style:{width:"30px",height:"30px",borderRadius:"50%",background:"rgba(245, 208, 97, 0.18)",border:"1.2px solid rgba(245, 208, 97, 0.65)",display:"flex",alignItems:"center",justifyContent:"center",color:"#F5D061",flexShrink:0,boxShadow:"0 0 10px rgba(245, 208, 97, 0.3)"},children:a.jsx(at,{size:16})})]}),a.jsxs("button",{onClick:s,style:{width:"100%",padding:"14px 22px",borderRadius:"15px",background:"linear-gradient(135deg, #F59E0B 0%, #D97706 50%, #B45309 100%)",border:"1px solid rgba(253, 230, 138, 0.35)",color:"#FFFFFF",fontSize:"16px",fontWeight:"900",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",cursor:"pointer",boxShadow:"0 10px 28px rgba(217, 119, 6, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.25)",transition:"all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",outline:"none"},onMouseEnter:c=>{c.currentTarget.style.transform="scale(1.02)",c.currentTarget.style.boxShadow="0 12px 34px rgba(217, 119, 6, 0.75), inset 0 1px 0 rgba(255, 255, 255, 0.35)",c.currentTarget.style.background="linear-gradient(135deg, #FBBF24 0%, #EA580C 100%)"},onMouseLeave:c=>{c.currentTarget.style.transform="scale(1)",c.currentTarget.style.boxShadow="0 10px 28px rgba(217, 119, 6, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.25)",c.currentTarget.style.background="linear-gradient(135deg, #F59E0B 0%, #D97706 50%, #B45309 100%)"},children:[a.jsx("span",{children:o("continue","متابعة")}),a.jsx(qn,{size:19,strokeWidth:3})]})]})]})]})}function ga(){const{isRtl:e}=ce(),{theme:t}=me(),n=t==="light",[r,i]=m.useState([]),[o,s]=m.useState(0),[d,l]=m.useState(!1),c=[{id:"banner-vf-cash",title:"إيداع فودافون كاش أوتوماتيك خلال 0 ثانية",link:"/deposit",isExternal:!1,image:"/images/banners/banner_vodafone_cash.jpg"},{id:"banner-chat-apps",title:"أقل سعر في مصر لبرامج الدردشة الصوتية",link:"/category/apps",isExternal:!1,image:"/images/banners/banner_chat_apps.jpg"},{id:"banner-whatsapp-channel",title:"انضم إلى مجتمعنا على واتساب",link:"https://whatsapp.com/channel/0029Vb97YHSB4hdZjFJysw14",isExternal:!0,image:"/images/banners/whatsapp_channel_banner.jpg"}];m.useEffect(()=>{Nt.getBanners().then(g=>{const I=Array.isArray(g==null?void 0:g.data)?g.data:Array.isArray(g)?g:[];if(I.length>0){const J=I.map(C=>{const le=C.link&&(C.link.startsWith("http://")||C.link.startsWith("https://")),A=C.image_url||C.image;let f="/images/banners/banner_vodafone_cash.jpg";return A&&typeof A=="string"&&(A.startsWith("http://")||A.startsWith("https://")||A.startsWith("/")?f=A:f="/storage/"+A),{id:C.id,title:C.title||"سند ومهره كارد للشحن الرقمي",link:C.link||"/category/games",isExternal:!!le,image:f}});i(J)}else i(c)}).catch(()=>{i(c)})},[]);const p=r.length>0?r:c,[v,E]=m.useState(null),[k,F]=m.useState(null),u=40,h=g=>{F(null),E(g.targetTouches[0].clientX)},y=g=>{F(g.targetTouches[0].clientX)},S=()=>{if(!v||!k)return;const g=v-k;Math.abs(g)<u||(g>u?e?N():R():g<-u&&(e?R():N()))};m.useEffect(()=>{if(p.length<=1||d)return;const g=setInterval(()=>{s(I=>(I+1)%p.length)},6e3);return()=>clearInterval(g)},[p.length,d]);const N=g=>{s(I=>I===0?p.length-1:I-1)},R=g=>{s(I=>(I+1)%p.length)},x=p[o]||p[0];return a.jsxs("div",{className:"emperor-global-banner-container",style:{width:"100%",maxWidth:"1100px",margin:"0 auto",padding:"16px 0 24px",boxSizing:"border-box"},onMouseEnter:()=>l(!0),onMouseLeave:()=>l(!1),onTouchStart:h,onTouchMove:y,onTouchEnd:S,children:[a.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",background:"rgba(16, 185, 129, 0.08)",border:"1px solid rgba(16, 185, 129, 0.35)",borderRadius:"16px",padding:"10px 18px",marginBottom:"18px",width:"100%",boxSizing:"border-box",gap:"10px"},children:[a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px",minWidth:0},children:[a.jsx("span",{style:{color:"#10B981",display:"flex",alignItems:"center",flexShrink:0},children:a.jsx(Ot,{size:18})}),a.jsx("span",{style:{fontSize:"13px",fontWeight:"700",color:"#E2E8F0",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"},children:"حماية إضافية لحسابك: فعّل المصادقة الثنائية في أقل من دقيقة."})]}),a.jsx(j,{to:"/settings",style:{background:"rgba(16, 185, 129, 0.18)",border:"1px solid rgba(16, 185, 129, 0.5)",borderRadius:"10px",padding:"4px 12px",color:"#34D399",textDecoration:"none",fontSize:"12px",fontWeight:"800",whiteSpace:"nowrap",flexShrink:0},children:"تفعيل الحماية ↗"})]}),a.jsxs("div",{className:"emperor-hero-slider",style:{position:"relative",borderRadius:"26px",overflow:"hidden",border:n?"1.8px solid rgba(212, 165, 55, 0.35)":"1.8px solid rgba(212, 165, 55, 0.45)",background:n?"#FFFFFF":"#0B0B0F",boxShadow:n?"0 0 20px rgba(212, 165, 55, 0.2)":"0 14px 40px rgba(0, 0, 0, 0.85), 0 0 28px rgba(212, 165, 55, 0.18)",aspectRatio:"2.85 / 1",maxHeight:"260px",height:"clamp(130px, 22vw, 260px)",width:"100%",minHeight:"130px",display:"flex",alignItems:"center",justifyContent:"center",cursor:x!=null&&x.link?"pointer":"default",transition:"all 0.3s ease",userSelect:"none",touchAction:"pan-y",boxSizing:"border-box"},children:[x!=null&&x.link?x.isExternal?a.jsxs("a",{href:x.link,target:"_blank",rel:"noopener noreferrer",style:{display:"block",width:"100%",height:"100%",textDecoration:"none"},children:[x.image&&a.jsx("img",{src:x.image,alt:x.title||"إعلان سند ومهره كارد",className:"emperor-slider-kenburns",onError:g=>{g.currentTarget.onerror=null,g.currentTarget.src=c[0].image},style:{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center",display:"block"}},`banner-img-${o}-${x.id}`),a.jsx("div",{className:"emperor-slider-shimmer"})]}):a.jsxs(j,{to:x.link,style:{display:"block",width:"100%",height:"100%",textDecoration:"none"},children:[x.image&&a.jsx("img",{src:x.image,alt:x.title||"إعلان سند ومهره كارد",className:"emperor-slider-kenburns",onError:g=>{g.currentTarget.onerror=null,g.currentTarget.src=c[0].image},style:{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center",display:"block"}},`banner-img-${o}-${x.id}`),a.jsx("div",{className:"emperor-slider-shimmer"})]}):a.jsxs("div",{style:{display:"block",width:"100%",height:"100%"},children:[(x==null?void 0:x.image)&&a.jsx("img",{src:x.image,alt:x.title||"إعلان سند ومهره كارد",className:"emperor-slider-kenburns",onError:g=>{g.currentTarget.onerror=null,g.currentTarget.src=c[0].image},style:{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center",display:"block"}},`banner-img-${o}-${x.id}`),a.jsx("div",{className:"emperor-slider-shimmer"})]}),p.length>1&&a.jsx("div",{style:{position:"absolute",bottom:"12px",left:"50%",transform:"translateX(-50%)",display:"flex",alignItems:"center",gap:"6px",zIndex:4,background:"rgba(0, 0, 0, 0.65)",padding:"4px 12px",borderRadius:"20px",backdropFilter:"blur(8px)",WebkitBackdropFilter:"blur(8px)",border:"1px solid rgba(212, 165, 55, 0.3)"},children:p.map((g,I)=>a.jsx("button",{onClick:J=>{J.preventDefault(),J.stopPropagation(),s(I)},"aria-label":`Go to slide ${I+1}`,style:{width:I===o?"22px":"6px",height:"6px",borderRadius:"3px",background:I===o?"linear-gradient(90deg, #F5D061 0%, #D4A537 100%)":"rgba(255, 255, 255, 0.35)",border:"none",cursor:"pointer",padding:0,transition:"all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"}},I))}),p.length>1&&!d&&a.jsx("div",{className:"emperor-slider-progress",style:{position:"absolute",bottom:0,left:0,height:"2.5px",background:"linear-gradient(90deg, #D4A537 0%, #F5D061 100%)",boxShadow:"0 0 6px rgba(212, 165, 55, 0.8)",zIndex:5}},`prog-${o}`)]}),a.jsxs("div",{style:{textAlign:"center",marginTop:"14px",padding:"0 8px",fontSize:"clamp(11.5px, 2.5vw, 15px)",fontWeight:"800",color:n?"#78350F":"#F5D061",fontFamily:"var(--font-cairo)",letterSpacing:"0.2px",lineHeight:"1.6",boxSizing:"border-box",textShadow:n?"none":"0 2px 10px rgba(0,0,0,0.85), 0 0 14px rgba(212, 165, 55, 0.3)"},children:[a.jsx("span",{style:{color:n?"#78350F":"#E6C665"},children:"بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ"}),a.jsxs("span",{style:{color:n?"#92400E":"#FFE57F",fontWeight:"900",margin:"0 4px"},children:["{","وَأَحَلَّ اللَّهُ الْبَيْعَ وَحَرَّمَ الرِّبَا","}"]}),a.jsx("span",{style:{color:n?"#78350F":"#E6C665"},children:"صَدَقَ اللَّهُ الْعَظِيمُ"})]}),a.jsx("style",{children:`
                /* Royal Frame Breathing Glow */
                .emperor-hero-slider {
                    animation: royalBorderGlow 4s ease-in-out infinite alternate;
                }
                @keyframes royalBorderGlow {
                    0% {
                        border-color: rgba(212, 165, 55, 0.45);
                        box-shadow: ${n?"0 0 15px rgba(212, 165, 55, 0.15)":"0 10px 35px rgba(0, 0, 0, 0.8), 0 0 25px rgba(212, 165, 55, 0.18)"};
                    }
                    100% {
                        border-color: rgba(245, 208, 97, 0.85);
                        box-shadow: ${n?"0 0 25px rgba(212, 165, 55, 0.3)":"0 16px 45px rgba(0, 0, 0, 0.9), 0 0 45px rgba(212, 165, 55, 0.38)"};
                    }
                }

                @media (max-width: 768px) {
                    .emperor-hero-slider {
                        border-radius: 18px !important;
                    }
                }

                /* Continuous Smooth Breathing Zoom In & Out */
                .emperor-slider-kenburns {
                    animation: continuousBannerZoom 4.5s ease-in-out infinite alternate;
                    will-change: transform;
                }
                @keyframes continuousBannerZoom {
                    0% {
                        transform: scale(1);
                    }
                    100% {
                        transform: scale(1.055);
                    }
                }

                /* Shimmer Light Beam Across Card */
                .emperor-slider-shimmer {
                    position: absolute;
                    inset: 0;
                    width: 50%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.06), rgba(212, 165, 55, 0.2), transparent);
                    transform: skewX(-25deg);
                    animation: bannerShimmerSweep 5s ease-in-out infinite;
                    pointer-events: none;
                    z-index: 2;
                }
                @keyframes bannerShimmerSweep {
                    0% {
                        transform: translateX(-150%) skewX(-25deg);
                    }
                    35%, 100% {
                        transform: translateX(350%) skewX(-25deg);
                    }
                }

                /* Slide Countdown Progress Bar */
                .emperor-slider-progress {
                    animation: slideProgressAnim 6s linear forwards;
                }
                @keyframes slideProgressAnim {
                    from {
                        width: 0%;
                    }
                    to {
                        width: 100%;
                    }
                }
            `})]})}function ba(){const[e,t]=m.useState(null),[n,r]=m.useState(!1),[i,o]=m.useState(!1),s=Rt();m.useEffect(()=>{let p=!0;return Nt.getBanners({type:"popup"}).then(v=>{if(!p)return;const E=Array.isArray(v==null?void 0:v.data)?v.data:Array.isArray(v)?v:[];if(E.length>0){const k=E[0],F=`emperor_popup_dismissed_${k.id}`;if(!(sessionStorage.getItem(F)||localStorage.getItem(F))){t(k);const h=setTimeout(()=>{p&&r(!0)},700);return()=>clearTimeout(h)}}}).catch(v=>{console.warn("Failed to load promotional popup:",v)}),()=>{p=!1}},[]);const d=()=>{if(!e)return;const p=`emperor_popup_dismissed_${e.id}`;i?localStorage.setItem(p,"true"):sessionStorage.setItem(p,"true"),r(!1)},l=()=>{if(!e||(d(),!e.link))return;e.link.startsWith("http://")||e.link.startsWith("https://")?window.open(e.link,"_blank","noopener,noreferrer"):s(e.link)};if(!n||!e)return null;const c=e.image_url||e.image;return a.jsx("div",{className:"promotional-popup-backdrop",style:{position:"fixed",inset:0,zIndex:99999,backgroundColor:"rgba(5, 5, 8, 0.82)",backdropFilter:"blur(8px)",WebkitBackdropFilter:"blur(8px)",display:"flex",alignItems:"center",justifyContent:"center",padding:"16px",animation:"fadeIn 0.25s ease-out"},onClick:p=>{p.target===p.currentTarget&&d()},children:a.jsxs("div",{className:"promotional-popup-dialog",style:{position:"relative",width:"100%",maxWidth:"460px",borderRadius:"22px",background:"linear-gradient(180deg, rgba(24, 24, 34, 0.98) 0%, rgba(12, 12, 18, 0.99) 100%)",border:"1.5px solid rgba(212, 165, 55, 0.55)",boxShadow:"0 25px 60px rgba(0, 0, 0, 0.9), 0 0 35px rgba(212, 165, 55, 0.25)",overflow:"hidden",display:"flex",flexDirection:"column",animation:"scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)",direction:"rtl"},children:[a.jsx("div",{style:{height:"3px",width:"100%",background:"linear-gradient(90deg, transparent 0%, #D4A537 50%, transparent 100%)"}}),a.jsx("button",{onClick:d,title:"إغلاق النافذة",style:{position:"absolute",top:"12px",left:"12px",zIndex:10,width:"32px",height:"32px",borderRadius:"50%",background:"rgba(0, 0, 0, 0.65)",border:"1px solid rgba(212, 165, 55, 0.35)",color:"#F5D061",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",transition:"all 0.2s ease"},onMouseEnter:p=>{p.currentTarget.style.transform="scale(1.1)",p.currentTarget.style.backgroundColor="rgba(212, 165, 55, 0.2)"},onMouseLeave:p=>{p.currentTarget.style.transform="scale(1)",p.currentTarget.style.backgroundColor="rgba(0, 0, 0, 0.65)"},children:a.jsx(Ke,{size:16})}),c&&a.jsxs("div",{style:{position:"relative",width:"100%",height:"210px",background:"#09090D",overflow:"hidden",borderBottom:"1px solid rgba(212, 165, 55, 0.2)"},children:[a.jsx("img",{src:c,alt:e.title,style:{width:"100%",height:"100%",objectFit:"cover",transition:"transform 0.5s ease"}}),a.jsx("div",{style:{position:"absolute",inset:0,background:"linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(12,12,18,0.9) 100%)"}})]}),a.jsxs("div",{style:{padding:c?"18px 22px 20px":"28px 22px 20px",textAlign:"center"},children:[a.jsxs("div",{style:{display:"inline-flex",alignItems:"center",gap:"6px",padding:"4px 12px",borderRadius:"20px",background:"rgba(212, 165, 55, 0.15)",border:"1px solid rgba(212, 165, 55, 0.35)",color:"#F5D061",fontSize:"11px",fontWeight:"800",marginBottom:"12px"},children:[a.jsx(Pn,{size:13,color:"#F5D061"}),a.jsx("span",{children:"إعلان مميز من سند ومهره كارد"})]}),a.jsx("h3",{style:{fontSize:"19px",fontWeight:"900",color:"#FFFFFF",margin:"0 0 8px",lineHeight:1.35},children:e.title}),e.subtitle&&a.jsx("p",{style:{fontSize:"13px",color:"#A0A0B0",lineHeight:1.6,margin:"0 0 20px"},children:e.subtitle}),a.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"10px",marginTop:"16px"},children:[e.link&&a.jsxs("button",{onClick:l,style:{width:"100%",padding:"12px 18px",borderRadius:"13px",background:"linear-gradient(135deg, #F5D061 0%, #D4A537 100%)",border:"none",color:"#070709",fontSize:"14.5px",fontWeight:"900",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",boxShadow:"0 4px 18px rgba(212, 165, 55, 0.35)",transition:"all 0.2s ease"},onMouseEnter:p=>{p.currentTarget.style.transform="translateY(-2px)",p.currentTarget.style.boxShadow="0 6px 24px rgba(212, 165, 55, 0.55)"},onMouseLeave:p=>{p.currentTarget.style.transform="translateY(0)",p.currentTarget.style.boxShadow="0 4px 18px rgba(212, 165, 55, 0.35)"},children:[a.jsx("span",{children:"عرض التفاصيل الآن"}),a.jsx(Gn,{size:16})]}),a.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:"8px",paddingTop:"10px",borderTop:"1px solid rgba(255, 255, 255, 0.06)",fontSize:"12px",color:"#7E7E8E"},children:[a.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"6px",cursor:"pointer"},children:[a.jsx("input",{type:"checkbox",checked:i,onChange:p=>o(p.target.checked),style:{accentColor:"#D4A537",cursor:"pointer"}}),a.jsx("span",{children:"عدم الإظهار مجدداً"})]}),a.jsx("button",{onClick:d,style:{background:"transparent",border:"none",color:"#8E8E98",cursor:"pointer",fontSize:"12px",fontWeight:"700",padding:"4px"},onMouseEnter:p=>p.currentTarget.style.color="#F5D061",onMouseLeave:p=>p.currentTarget.style.color="#8E8E98",children:"إغلاق"})]})]})]})]})})}let X=null;const Fn=()=>{if(!X){const e=window.AudioContext||window.webkitAudioContext;e&&(X=new e)}return X&&X.state==="suspended"&&X.resume().catch(()=>{}),X};if(typeof window<"u"){const e=()=>{const t=Fn();t&&t.state==="suspended"&&t.resume().catch(()=>{}),window.removeEventListener("click",e),window.removeEventListener("keydown",e),window.removeEventListener("touchstart",e)};window.addEventListener("click",e,{once:!0}),window.addEventListener("keydown",e,{once:!0}),window.addEventListener("touchstart",e,{once:!0})}const _t=(e="default")=>{try{const t=Fn();if(!t)return;const n=t.currentTime,r=(i,o,s,d=.15)=>{const l=t.createOscillator(),c=t.createGain();l.type="sine",l.frequency.setValueAtTime(i,o),c.gain.setValueAtTime(.001,o),c.gain.exponentialRampToValueAtTime(d,o+.03),c.gain.exponentialRampToValueAtTime(1e-4,o+s),l.connect(c),c.connect(t.destination),l.start(o),l.stop(o+s)};e==="success"?(r(880,n,.25,.18),r(1174.66,n+.1,.35,.2),r(1760,n+.2,.45,.22)):e==="warning"?(r(784,n,.2,.15),r(659.25,n+.12,.3,.15)):(r(1046.5,n,.28,.18),r(1318.51,n+.08,.32,.2),r(1567.98,n+.18,.5,.22))}catch{}};function Wa({children:e,showBanner:t=!1}){var le,A;const{user:n,isAuthenticated:r}=Rn(),{theme:i,toggleTheme:o}=me(),{language:s,switchLanguage:d,t:l,isRtl:c}=ce(),{addToast:p}=On(),v=Bn();Rt();const[E,k]=m.useState(!1),[F,u]=m.useState(!1),[h,y]=m.useState(0),[S,N]=m.useState(!1);m.useEffect(()=>{const f=()=>u(!0);return window.addEventListener("emperor:open-support-modal",f),()=>window.removeEventListener("emperor:open-support-modal",f)},[]),m.useEffect(()=>{const f=()=>N(window.scrollY>20);return window.addEventListener("scroll",f,{passive:!0}),()=>window.removeEventListener("scroll",f)},[]),m.useEffect(()=>{if(!r){y(0);return}let f=!0;const _=new Set;let nt=!0,de=null;const pe=async()=>{var O;try{const W=await Mn.checkLatest();if(!f||!((O=W==null?void 0:W.data)!=null&&O.data))return;const{unread_count:H,notifications:ne}=W.data.data,re=Array.isArray(ne)?ne:[];if(typeof H=="number"){if(y(H),nt){re.forEach(T=>_.add(T.id)),de=H,nt=!1;return}const ie=re.filter(T=>!_.has(T.id));(ie.length>0||de!==null&&H>de)&&(_t("default"),ie.forEach(T=>{_.add(T.id);const An=T.title||"إشعار جديد",_n=T.body?` - ${T.body}`:"";p(`${An}${_n}`,"info"),window.dispatchEvent(new CustomEvent("emperor:new-notification",{detail:T}))}),window.dispatchEvent(new CustomEvent("emperor:refresh-notifications"))),de=H}}catch{}};pe();const Dn=setInterval(()=>{document.visibilityState==="visible"&&pe()},15e3),ue=()=>{document.visibilityState==="visible"&&pe()};window.addEventListener("focus",ue),document.addEventListener("visibilitychange",ue);let Ce=null;return da(O=>{var ne,re,ie,T;const W=((ne=O.notification)==null?void 0:ne.title)||((re=O.data)==null?void 0:re.title)||"إشعار جديد",H=((ie=O.notification)==null?void 0:ie.body)||((T=O.data)==null?void 0:T.body)||"";_t("default"),p(`${W}: ${H}`,"info"),pe()}).then(O=>{Ce=O}),()=>{f=!1,clearInterval(Dn),window.removeEventListener("focus",ue),document.removeEventListener("visibilitychange",ue),typeof Ce=="function"&&Ce()}},[r,p]);const R=f=>!f||typeof f!="string"||f.startsWith("#")?!1:!!(f==="/"&&v.pathname==="/"||f!=="/"&&v.pathname.startsWith(f)),x=Number(((le=n==null?void 0:n.wallet)==null?void 0:le.balance)||0),g=((A=n==null?void 0:n.wallet)==null?void 0:A.balance)!==void 0?x%1===0?x.toLocaleString("en-US",{maximumFractionDigits:0}):x.toLocaleString("en-US",{minimumFractionDigits:1,maximumFractionDigits:2}):"0",I=s==="en"?"EGP":"ج.م",J=[{to:"/",label:l("home","الرئيسية"),icon:rt},{to:"#whatsapp-channel",href:it(),label:l("whatsappChannel","قناة الواتساب"),icon:Me,isExternal:!0,badge:s==="en"?"Updates":"تحديثات"},{to:"/target/apps",label:l("targetSelling","بيع التارجت"),icon:Yn,badge:s==="en"?"Instant Cash":"كاش فوري",isSpecial:!0},{to:"/deposit",label:l("chargeWallet","شحن المحفظة"),icon:Te},{to:"/orders",label:l("myOrders","طلباتي"),icon:$n,authRequired:!0},{to:"/account-issues",label:l("support","الشكاوى"),icon:Kn}],C=i==="light";return a.jsxs("div",{style:{minHeight:"100vh",display:"flex",flexDirection:"column",backgroundColor:C?"var(--bg-main)":"#070709",color:C?"var(--text-primary)":"#FFFFFF",fontFamily:"var(--font-cairo)",direction:c?"rtl":"ltr"},children:[a.jsx("header",{className:"emperor-header",style:{position:"sticky",top:0,zIndex:1e3,transition:"all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",width:"100%",padding:0},children:a.jsxs("div",{className:"emperor-navbar-container",style:{background:C?S?"rgba(255, 255, 255, 0.96)":"rgba(240, 247, 255, 0.94)":S?"rgba(5, 12, 24, 0.98)":"rgba(6, 15, 30, 0.94)",backdropFilter:"blur(20px) saturate(1.8)",WebkitBackdropFilter:"blur(20px) saturate(1.8)",borderBottom:"1.5px solid rgba(56, 189, 248, 0.35)",boxShadow:C?"0 10px 30px rgba(15, 23, 42, 0.08)":"0 10px 35px rgba(0, 0, 0, 0.8), 0 0 25px rgba(0, 130, 255, 0.12)"},children:[a.jsx("div",{style:{display:"flex",alignItems:"center",gap:"14px",minWidth:0,flexShrink:0},children:a.jsxs(j,{to:"/",style:{display:"flex",alignItems:"center",gap:"10px",textDecoration:"none",minWidth:0,flexShrink:0},children:[a.jsx("div",{className:"header-logo-icon",style:{width:"44px",height:"44px",borderRadius:"12px",overflow:"hidden",border:"1.5px solid rgba(56, 189, 248, 0.45)",boxShadow:"0 0 15px rgba(56, 189, 248, 0.35)",flexShrink:0,background:"#071325",display:"flex",alignItems:"center",justifyContent:"center"},children:a.jsx("img",{src:xe(),alt:ge(),style:{width:"100%",height:"100%",objectFit:"contain"},onError:f=>{f.currentTarget.style.display="none",f.currentTarget.parentNode.innerHTML='<span style="color:#F5D061;font-size:22px;font-weight:900;">👑</span>'}})}),a.jsxs("div",{style:{display:"flex",flexDirection:"column",minWidth:0},children:[a.jsx("span",{className:"brand-title",style:{fontSize:"19px",fontWeight:"900",color:"#F5D061",letterSpacing:"0.3px",lineHeight:1.15,whiteSpace:"nowrap",textShadow:"0 2px 10px rgba(0,0,0,0.6), 0 0 15px rgba(245, 208, 97, 0.35)"},children:ge()}),a.jsx("span",{className:"brand-subtitle",style:{fontSize:"10px",fontWeight:"800",color:"#38BDF8",letterSpacing:"0.2px",whiteSpace:"nowrap"},children:Hn()})]})]})}),a.jsx("nav",{className:"desktop-nav-links",style:{display:"flex",alignItems:"center",gap:"6px",justifyContent:"center",flex:1,margin:"0 16px"},children:J.map(f=>{if(f.authRequired&&!r)return null;const _=!f.isModalTrigger&&!f.isExternal&&R(f.to);return f.isExternal?a.jsxs("a",{href:f.href,target:"_blank",rel:"noopener noreferrer",className:"nav-link-item",style:{display:"flex",alignItems:"center",gap:"5px",padding:"7px 14px",borderRadius:"10px",textDecoration:"none",fontSize:"13.5px",fontWeight:"800",color:"#22c55e",background:"rgba(34, 197, 94, 0.08)",border:"1px solid rgba(34, 197, 94, 0.25)",transition:"all 0.2s",whiteSpace:"nowrap"},children:[a.jsx(f.icon,{size:15,color:"#22c55e"}),a.jsx("span",{children:f.label})]},f.label):a.jsxs(j,{to:f.to,className:"nav-link-item",style:{display:"flex",alignItems:"center",gap:"5px",padding:"7px 15px",borderRadius:"10px",textDecoration:"none",fontSize:"13.5px",fontWeight:_?"900":"800",color:_?"#38BDF8":"#F5D061",background:_?"rgba(14, 165, 233, 0.15)":"transparent",border:_?"1px solid rgba(56, 189, 248, 0.45)":"1px solid transparent",boxShadow:_?"0 0 15px rgba(56, 189, 248, 0.2)":"none",transition:"all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",whiteSpace:"nowrap"},children:[a.jsx(f.icon,{size:15,color:_?"#38BDF8":"#F5D061"}),a.jsx("span",{children:f.label})]},f.to)})}),a.jsxs("div",{className:"header-actions",children:[r?a.jsxs(a.Fragment,{children:[a.jsxs(j,{to:"/deposit",className:"header-wallet-badge",title:l("walletBalance","رصيد المحفظة"),children:[a.jsx(Te,{size:14,color:"#38BDF8",style:{flexShrink:0}}),a.jsx("span",{className:"balance-num",children:g}),a.jsx("span",{className:"balance-curr",children:I})]}),a.jsxs(j,{to:"/notifications",className:"header-notif-btn",title:l("notifications","الإشعارات"),children:[a.jsx(Jn,{size:17,color:"#F5D061"}),h>0&&a.jsx("span",{className:"notif-badge-dot",children:h>9?"9+":h})]})]}):a.jsxs(a.Fragment,{children:[a.jsx(j,{to:"/register",className:"header-register-btn",children:l("createAccount","إنشاء حساب")}),a.jsxs(j,{to:"/login",className:"header-login-btn",children:[a.jsx(ot,{size:15,color:"#38BDF8"}),a.jsx("span",{children:l("login","دخول")})]})]}),a.jsx("button",{onClick:()=>k(!0),title:l("mainMenu","القائمة الكاملة"),className:"header-hamburger-btn",children:a.jsx(Ln,{size:18})})]})]})}),a.jsx(fa,{}),a.jsx(ha,{}),a.jsx(zn,{isOpen:E,onClose:()=>k(!1)}),a.jsx(ua,{isOpen:F,onClose:()=>u(!1)}),a.jsx(ba,{}),a.jsx("main",{className:"emperor-main-layout-content",style:{flex:1,paddingBottom:"80px",width:"100%",overflowX:"hidden"},children:a.jsxs("div",{className:"emperor-main-container",children:[t&&a.jsx(ga,{}),e]})}),a.jsxs("nav",{className:"emperor-bottom-nav mobile-bottom-bar",children:[a.jsx(fe,{to:"/",icon:rt,label:l("home","الرئيسية"),active:R("/")}),a.jsx(fe,{href:it(),icon:Me,label:l("whatsappChannel","الواتساب"),isExternal:!0,color:"#25D366"}),a.jsx(fe,{to:"/target/apps",icon:Wn,label:l("targetSelling","التارجت"),active:R("/target/apps")}),a.jsx(fe,{to:"/deposit",icon:Te,label:l("chargeWallet","المحفظة"),active:R("/deposit")}),a.jsxs("button",{type:"button",onClick:()=>k(!0),className:`emperor-bottom-nav-item${E?" active":""}`,style:{outline:"none",border:"none",background:"transparent",color:E?"#F5D061":"#8E8E98",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"4px",cursor:"pointer",userSelect:"none",WebkitTapHighlightColor:"transparent"},children:[a.jsx(ot,{size:20,color:E?"#F5D061":"#8E8E98"}),a.jsx("span",{style:{fontSize:"11px",fontWeight:E?"800":"600",whiteSpace:"nowrap",lineHeight:1.1,fontFamily:"var(--font-cairo)"},children:r?l("myAccount","حسابي"):"دخول"})]})]}),a.jsx(pa,{})]})}function fe({to:e,href:t,icon:n,label:r,active:i,isExternal:o,color:s}){return t||o?a.jsxs("a",{href:t,target:"_blank",rel:"noopener noreferrer",className:"emperor-bottom-nav-item",style:{textDecoration:"none",color:s||"#8E8E98",outline:"none",border:"none",background:"transparent",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"4px",userSelect:"none",WebkitTapHighlightColor:"transparent"},children:[a.jsx(n,{size:20,color:s||"#8E8E98"}),a.jsx("span",{style:{fontSize:"11px",fontWeight:"700",whiteSpace:"nowrap",lineHeight:1.1,fontFamily:"var(--font-cairo)",color:s||"#8E8E98"},children:r})]}):a.jsxs(j,{to:e,className:`emperor-bottom-nav-item${i?" active":""}`,style:{textDecoration:"none",color:i?"#F5D061":"#8E8E98",outline:"none",border:"none",background:"transparent",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"4px",userSelect:"none",WebkitTapHighlightColor:"transparent"},children:[a.jsx(n,{size:20,color:i?"#F5D061":"#8E8E98"}),a.jsx("span",{style:{fontSize:"11px",fontWeight:i?"800":"600",whiteSpace:"nowrap",lineHeight:1.1,fontFamily:"var(--font-cairo)"},children:r})]})}export{Jn as B,at as C,ar as D,ye as E,ee as F,wr as L,Wa as M,za as S,La as _,Ye as a,Da as b,Fa as c,Yt as d,Pe as e,Aa as f,Vt as g,Na as h,Pa as i,ja as j,w as k,Wt as l,Ra as m,Oa as n,tr as o,$a as p,Ba as q,_a as r,K as s,z as t,L as u,Ma as v,di as w,Gt as x};
