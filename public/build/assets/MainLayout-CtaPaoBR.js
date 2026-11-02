import{c as Bt,g as xe,a as le,j as a,L as j,r as b,X as Ge,x as Bn,T as Mn,z as Mt,u as Pt,f as Pn,h as $n,e as Ln,w as zn,p as Wn}from"./app-CvzrQq5w.js";import{C as Hn,g as Un,H as st,W as De,F as Vn,M as Kn,j as qn,T as Gn}from"./UserSidebarDrawer-BsyQewEi.js";import{g as be,b as ye,c as ct,a as Yn}from"./settingsHelper-Q2Y8x6lx.js";import{E as Jn}from"./external-link-RXcW2ISV.js";import{P as Xn,M as $e,C as Zn}from"./phone-DTdZlc2x.js";import{S as $t}from"./shield-check-Dt4NKgYw.js";import{C as Qn}from"./check-DTe7OrMP.js";import{A as er}from"./shield-C0vFvi78.js";import{T as tr}from"./trending-up-D3SmlxJI.js";import{U as lt}from"./user-CkA68uYe.js";/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Lt={name:"bell",size:24,node:[["path",{d:"M10.268 21a2 2 0 0 0 3.464 0",key:"vwvbt9"}],["path",{d:"M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",key:"11g9vi"}]]};Lt.node;const nr=Bt(Lt);/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zt={name:"circle-alert",size:24,node:[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]],aliases:["alert-circle"]};zt.node;const dt=Bt(zt),rr=()=>{};var pt={};/**
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
 */const Wt=function(e){const t=[];let n=0;for(let r=0;r<e.length;r++){let i=e.charCodeAt(r);i<128?t[n++]=i:i<2048?(t[n++]=i>>6|192,t[n++]=i&63|128):(i&64512)===55296&&r+1<e.length&&(e.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(e.charCodeAt(++r)&1023),t[n++]=i>>18|240,t[n++]=i>>12&63|128,t[n++]=i>>6&63|128,t[n++]=i&63|128):(t[n++]=i>>12|224,t[n++]=i>>6&63|128,t[n++]=i&63|128)}return t},ir=function(e){const t=[];let n=0,r=0;for(;n<e.length;){const i=e[n++];if(i<128)t[r++]=String.fromCharCode(i);else if(i>191&&i<224){const o=e[n++];t[r++]=String.fromCharCode((i&31)<<6|o&63)}else if(i>239&&i<365){const o=e[n++],s=e[n++],d=e[n++],l=((i&7)<<18|(o&63)<<12|(s&63)<<6|d&63)-65536;t[r++]=String.fromCharCode(55296+(l>>10)),t[r++]=String.fromCharCode(56320+(l&1023))}else{const o=e[n++],s=e[n++];t[r++]=String.fromCharCode((i&15)<<12|(o&63)<<6|s&63)}}return t.join("")},Ht={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(e,t){if(!Array.isArray(e))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<e.length;i+=3){const o=e[i],s=i+1<e.length,d=s?e[i+1]:0,l=i+2<e.length,c=l?e[i+2]:0,p=o>>2,v=(o&3)<<4|d>>4;let I=(d&15)<<2|c>>6,k=c&63;l||(k=64,s||(I=64)),r.push(n[p],n[v],n[I],n[k])}return r.join("")},encodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(e):this.encodeByteArray(Wt(e),t)},decodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(e):ir(this.decodeStringToByteArray(e,t))},decodeStringToByteArray(e,t){this.init_();const n=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<e.length;){const o=n[e.charAt(i++)],d=i<e.length?n[e.charAt(i)]:0;++i;const c=i<e.length?n[e.charAt(i)]:64;++i;const v=i<e.length?n[e.charAt(i)]:64;if(++i,o==null||d==null||c==null||v==null)throw new or;const I=o<<2|d>>4;if(r.push(I),c!==64){const k=d<<4&240|c>>2;if(r.push(k),v!==64){const D=c<<6&192|v;r.push(D)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}};class or extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const ar=function(e){const t=Wt(e);return Ht.encodeByteArray(t,!0)},Ut=function(e){return ar(e).replace(/\./g,"")},sr=function(e){try{return Ht.decodeString(e,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};/**
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
 */function cr(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const lr=()=>cr().__FIREBASE_DEFAULTS__,dr=()=>{if(typeof process>"u"||typeof pt>"u")return;const e=pt.__FIREBASE_DEFAULTS__;if(e)return JSON.parse(e)},pr=()=>{if(typeof document>"u")return;let e;try{e=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const t=e&&sr(e[1]);return t&&JSON.parse(t)},Ye=()=>{try{return rr()||lr()||dr()||pr()}catch(e){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`);return}},Na=e=>{var t,n;return(n=(t=Ye())==null?void 0:t.emulatorHosts)==null?void 0:n[e]},Vt=()=>{var e;return(e=Ye())==null?void 0:e.config},Ra=e=>{var t;return(t=Ye())==null?void 0:t[`_${e}`]};/**
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
 */class ur{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((t,n)=>{this.resolve=t,this.reject=n})}wrapCallback(t){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof t=="function"&&(this.promise.catch(()=>{}),t.length===1?t(n):t(n,r))}}}/**
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
 */function Kt(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Oa(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Kt())}function Ba(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Ma(){const e=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof e=="object"&&e.id!==void 0}function Pa(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function $a(){const e=Kt();return e.indexOf("MSIE ")>=0||e.indexOf("Trident/")>=0}function qt(){try{return typeof indexedDB=="object"}catch{return!1}}function Gt(){return new Promise((e,t)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(r),e(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{var o;t(((o=i.error)==null?void 0:o.message)||"")}}catch(n){t(n)}})}function fr(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
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
 */const hr="FirebaseError";class ee extends Error{constructor(t,n,r){super(n),this.code=t,this.customData=r,this.name=hr,Object.setPrototypeOf(this,ee.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,we.prototype.create)}}class we{constructor(t,n,r){this.service=t,this.serviceName=n,this.errors=r}create(t,...n){const r=n[0]||{},i=`${this.service}/${t}`,o=this.errors[t],s=o?gr(o,r):"Error",d=`${this.serviceName}: ${s} (${i}).`;return new ee(i,d,r)}}function gr(e,t){try{let n=0,r="";for(;n<e.length;){const i=e.indexOf("{$",n);if(i===-1){r+=e.substring(n);break}const o=e.indexOf("}",i+2);if(o===-1){r+=e.substring(n);break}const s=e.substring(i+2,o),d=t[s];r+=e.substring(n,i)+(d!=null?String(d):`<${s}?>`),n=o+1}return r}catch{return e}}function La(e){for(const t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}function Le(e,t){if(e===t)return!0;const n=Object.keys(e),r=Object.keys(t);for(const i of n){if(!r.includes(i))return!1;const o=e[i],s=t[i];if(ut(o)&&ut(s)){if(!Le(o,s))return!1}else if(o!==s)return!1}for(const i of r)if(!n.includes(i))return!1;return!0}function ut(e){return e!==null&&typeof e=="object"}/**
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
 */function za(e){const t=[];for(const[n,r]of Object.entries(e))Array.isArray(r)?r.forEach(i=>{t.push(encodeURIComponent(n)+"="+encodeURIComponent(i))}):t.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return t.length?"&"+t.join("&"):""}function Wa(e,t){const n=new br(e,t);return n.subscribe.bind(n)}class br{constructor(t,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{t(this)}).catch(r=>{this.error(r)})}next(t){this.forEachObserver(n=>{n.next(t)})}error(t){this.forEachObserver(n=>{n.error(t)}),this.close(t)}complete(){this.forEachObserver(t=>{t.complete()}),this.close()}subscribe(t,n,r){let i;if(t===void 0&&n===void 0&&r===void 0)throw new Error("Missing Observer.");mr(t,["next","error","complete"])?i=t:i={next:t,error:n,complete:r},i.next===void 0&&(i.next=_e),i.error===void 0&&(i.error=_e),i.complete===void 0&&(i.complete=_e);const o=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),o}unsubscribeOne(t){this.observers===void 0||this.observers[t]===void 0||(delete this.observers[t],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(t){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,t)}sendOne(t,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[t]!==void 0)try{n(this.observers[t])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(t){this.finalized||(this.finalized=!0,t!==void 0&&(this.finalError=t),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function mr(e,t){if(typeof e!="object"||e===null)return!1;for(const n of t)if(n in e&&typeof e[n]=="function")return!0;return!1}function _e(){}/**
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
 */function Yt(e){return e&&e._delegate?e._delegate:e}/**
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
 */function Ha(e){try{return(e.startsWith("http://")||e.startsWith("https://")?new URL(e).hostname:e).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Ua(e){return(await fetch(e,{credentials:"include"})).ok}class W{constructor(t,n,r){this.name=t,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}}/**
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
 */const V="[DEFAULT]";/**
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
 */class xr{constructor(t,n){this.name=t,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){const n=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(n)){const r=new ur;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:n});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(t){const n=this.normalizeInstanceIdentifier(t==null?void 0:t.identifier),r=(t==null?void 0:t.optional)??!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(i){if(r)return null;throw i}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,!!this.shouldAutoInitialize()){if(wr(t))try{this.getOrInitializeService({instanceIdentifier:V})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(n);try{const o=this.getOrInitializeService({instanceIdentifier:i});r.resolve(o)}catch{}}}}clearInstance(t=V){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}async delete(){const t=Array.from(this.instances.values());await Promise.all([...t.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...t.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(t=V){return this.instances.has(t)}getOptions(t=V){return this.instancesOptions.get(t)||{}}initialize(t={}){const{options:n={}}=t,r=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[o,s]of this.instancesDeferred.entries()){const d=this.normalizeInstanceIdentifier(o);r===d&&s.resolve(i)}return i}onInit(t,n){const r=this.normalizeInstanceIdentifier(n),i=this.onInitCallbacks.get(r)??new Set;i.add(t),this.onInitCallbacks.set(r,i);const o=this.instances.get(r);return o&&t(o,r),()=>{i.delete(t)}}invokeOnInitCallbacks(t,n){const r=this.onInitCallbacks.get(n);if(r)for(const i of r)try{i(t,n)}catch{}}getOrInitializeService({instanceIdentifier:t,options:n={}}){let r=this.instances.get(t);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:yr(t),options:n}),this.instances.set(t,r),this.instancesOptions.set(t,n),this.invokeOnInitCallbacks(r,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,r)}catch{}return r||null}normalizeInstanceIdentifier(t=V){return this.component?this.component.multipleInstances?t:V:t}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function yr(e){return e===V?void 0:e}function wr(e){return e.instantiationMode==="EAGER"}/**
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
 */class vr{constructor(t){this.name=t,this.providers=new Map}addComponent(t){const n=this.getProvider(t.name);if(n.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);n.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);const n=new xr(t,this);return this.providers.set(t,n),n}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var w;(function(e){e[e.DEBUG=0]="DEBUG",e[e.VERBOSE=1]="VERBOSE",e[e.INFO=2]="INFO",e[e.WARN=3]="WARN",e[e.ERROR=4]="ERROR",e[e.SILENT=5]="SILENT"})(w||(w={}));const Sr={debug:w.DEBUG,verbose:w.VERBOSE,info:w.INFO,warn:w.WARN,error:w.ERROR,silent:w.SILENT},Er=w.INFO,Ir={[w.DEBUG]:"log",[w.VERBOSE]:"log",[w.INFO]:"info",[w.WARN]:"warn",[w.ERROR]:"error"},kr=(e,t,...n)=>{if(t<e.logLevel)return;const r=new Date().toISOString(),i=Ir[t];if(i)console[i](`[${r}]  ${e.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)};class Cr{constructor(t){this.name=t,this._logLevel=Er,this._logHandler=kr,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in w))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel=typeof t=="string"?Sr[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if(typeof t!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,w.DEBUG,...t),this._logHandler(this,w.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,w.VERBOSE,...t),this._logHandler(this,w.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,w.INFO,...t),this._logHandler(this,w.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,w.WARN,...t),this._logHandler(this,w.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,w.ERROR,...t),this._logHandler(this,w.ERROR,...t)}}const Tr=(e,t)=>t.some(n=>e instanceof n);let ft,ht;function Fr(){return ft||(ft=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Dr(){return ht||(ht=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Jt=new WeakMap,ze=new WeakMap,Xt=new WeakMap,Ae=new WeakMap,Je=new WeakMap;function _r(e){const t=new Promise((n,r)=>{const i=()=>{e.removeEventListener("success",o),e.removeEventListener("error",s)},o=()=>{n(M(e.result)),i()},s=()=>{r(e.error),i()};e.addEventListener("success",o),e.addEventListener("error",s)});return t.then(n=>{n instanceof IDBCursor&&Jt.set(n,e)}).catch(()=>{}),Je.set(t,e),t}function Ar(e){if(ze.has(e))return;const t=new Promise((n,r)=>{const i=()=>{e.removeEventListener("complete",o),e.removeEventListener("error",s),e.removeEventListener("abort",s)},o=()=>{n(),i()},s=()=>{r(e.error||new DOMException("AbortError","AbortError")),i()};e.addEventListener("complete",o),e.addEventListener("error",s),e.addEventListener("abort",s)});ze.set(e,t)}let We={get(e,t,n){if(e instanceof IDBTransaction){if(t==="done")return ze.get(e);if(t==="objectStoreNames")return e.objectStoreNames||Xt.get(e);if(t==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return M(e[t])},set(e,t,n){return e[t]=n,!0},has(e,t){return e instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in e}};function jr(e){We=e(We)}function Nr(e){return e===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(t,...n){const r=e.call(je(this),t,...n);return Xt.set(r,t.sort?t.sort():[t]),M(r)}:Dr().includes(e)?function(...t){return e.apply(je(this),t),M(Jt.get(this))}:function(...t){return M(e.apply(je(this),t))}}function Rr(e){return typeof e=="function"?Nr(e):(e instanceof IDBTransaction&&Ar(e),Tr(e,Fr())?new Proxy(e,We):e)}function M(e){if(e instanceof IDBRequest)return _r(e);if(Ae.has(e))return Ae.get(e);const t=Rr(e);return t!==e&&(Ae.set(e,t),Je.set(t,e)),t}const je=e=>Je.get(e);function ve(e,t,{blocked:n,upgrade:r,blocking:i,terminated:o}={}){const s=indexedDB.open(e,t),d=M(s);return r&&s.addEventListener("upgradeneeded",l=>{r(M(s.result),l.oldVersion,l.newVersion,M(s.transaction),l)}),n&&s.addEventListener("blocked",l=>n(l.oldVersion,l.newVersion,l)),d.then(l=>{o&&l.addEventListener("close",()=>o()),i&&l.addEventListener("versionchange",c=>i(c.oldVersion,c.newVersion,c))}).catch(()=>{}),d}function ge(e,{blocked:t}={}){const n=indexedDB.deleteDatabase(e);return t&&n.addEventListener("blocked",r=>t(r.oldVersion,r)),M(n).then(()=>{})}const Or=["get","getKey","getAll","getAllKeys","count"],Br=["put","add","delete","clear"],Ne=new Map;function gt(e,t){if(!(e instanceof IDBDatabase&&!(t in e)&&typeof t=="string"))return;if(Ne.get(t))return Ne.get(t);const n=t.replace(/FromIndex$/,""),r=t!==n,i=Br.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(i||Or.includes(n)))return;const o=async function(s,...d){const l=this.transaction(s,i?"readwrite":"readonly");let c=l.store;return r&&(c=c.index(d.shift())),(await Promise.all([c[n](...d),i&&l.done]))[0]};return Ne.set(t,o),o}jr(e=>({...e,get:(t,n,r)=>gt(t,n)||e.get(t,n,r),has:(t,n)=>!!gt(t,n)||e.has(t,n)}));/**
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
 */class Mr{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(Pr(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function Pr(e){const t=e.getComponent();return(t==null?void 0:t.type)==="VERSION"}const He="@firebase/app",bt="0.16.2";/**
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
 */const $=new Cr("@firebase/app"),$r="@firebase/app-compat",Lr="@firebase/analytics-compat",zr="@firebase/analytics",Wr="@firebase/app-check-compat",Hr="@firebase/app-check",Ur="@firebase/auth",Vr="@firebase/auth-compat",Kr="@firebase/database",qr="@firebase/data-connect",Gr="@firebase/database-compat",Yr="@firebase/functions",Jr="@firebase/functions-compat",Xr="@firebase/installations",Zr="@firebase/installations-compat",Qr="@firebase/messaging",ei="@firebase/messaging-compat",ti="@firebase/performance",ni="@firebase/performance-compat",ri="@firebase/remote-config",ii="@firebase/remote-config-compat",oi="@firebase/storage",ai="@firebase/storage-compat",si="@firebase/firestore",ci="@firebase/ai",li="@firebase/firestore-compat",di="firebase",pi="12.19.0";/**
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
 */const Ue="[DEFAULT]",ui={[He]:"fire-core",[$r]:"fire-core-compat",[zr]:"fire-analytics",[Lr]:"fire-analytics-compat",[Hr]:"fire-app-check",[Wr]:"fire-app-check-compat",[Ur]:"fire-auth",[Vr]:"fire-auth-compat",[Kr]:"fire-rtdb",[qr]:"fire-data-connect",[Gr]:"fire-rtdb-compat",[Yr]:"fire-fn",[Jr]:"fire-fn-compat",[Xr]:"fire-iid",[Zr]:"fire-iid-compat",[Qr]:"fire-fcm",[ei]:"fire-fcm-compat",[ti]:"fire-perf",[ni]:"fire-perf-compat",[ri]:"fire-rc",[ii]:"fire-rc-compat",[oi]:"fire-gcs",[ai]:"fire-gcs-compat",[si]:"fire-fst",[li]:"fire-fst-compat",[ci]:"fire-vertex","fire-js":"fire-js",[di]:"fire-js-all"};/**
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
 */const se=new Map,fi=new Map,Ve=new Map;function mt(e,t){try{e.container.addComponent(t)}catch(n){$.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`,n)}}function q(e){const t=e.name;if(Ve.has(t))return $.debug(`There were multiple attempts to register component ${t}.`),!1;Ve.set(t,e);for(const n of se.values())mt(n,e);for(const n of fi.values())mt(n,e);return!0}function Xe(e,t){const n=e.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),e.container.getProvider(t)}function Va(e){return e==null?!1:e.settings!==void 0}/**
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
 */const hi={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different {$mismatchedParam}. Existing: '{$oldValue}'. New: '{$newValue}'.","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},B=new we("app","Firebase",hi);/**
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
 */class gi{constructor(t,n,r){this._isDeleted=!1,this._options={...t},this._config={...n},this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new W("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw B.create("app-deleted",{appName:this._name})}}/**
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
 */const Ka=pi;function Zt(e,t={}){let n=e;typeof t!="object"&&(t={name:t});const r={name:Ue,automaticDataCollectionEnabled:!0,...t},i=r.name;if(typeof i!="string"||!i)throw B.create("bad-app-name",{appName:String(i)});if(n||(n=Vt()),!n)throw B.create("no-options");const o=se.get(i);if(o)if(Le(n,o.options)){if(Le(r,o.config))return o;throw B.create("duplicate-app",{appName:i,mismatchedParam:"config",oldValue:JSON.stringify(o.config),newValue:JSON.stringify(r)})}else throw B.create("duplicate-app",{appName:i,mismatchedParam:"options",oldValue:JSON.stringify(o.options),newValue:JSON.stringify(n)});const s=new vr(i);for(const l of Ve.values())s.addComponent(l);const d=new gi(n,r,s);return se.set(i,d),d}function Qt(e=Ue){const t=se.get(e);if(!t&&e===Ue&&Vt())return Zt();if(!t)throw B.create("no-app",{appName:e});return t}function bi(){return Array.from(se.values())}function z(e,t,n){let r=ui[e]??e;n&&(r+=`-${n}`);const i=r.match(/\s|\//),o=t.match(/\s|\//);if(i||o){const s=[`Unable to register library "${r}" with version "${t}":`];i&&s.push(`library name "${r}" contains illegal characters (whitespace or "/")`),i&&o&&s.push("and"),o&&s.push(`version name "${t}" contains illegal characters (whitespace or "/")`),$.warn(s.join(" "));return}q(new W(`${r}-version`,()=>({library:r,version:t}),"VERSION"))}/**
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
 */const mi="firebase-heartbeat-database",xi=1,ce="firebase-heartbeat-store";let Re=null;function en(){return Re||(Re=ve(mi,xi,{upgrade:(e,t)=>{switch(t){case 0:try{e.createObjectStore(ce)}catch(n){console.warn(n)}}}}).catch(e=>{throw B.create("idb-open",{originalErrorMessage:e.message})})),Re}async function yi(e){try{const n=(await en()).transaction(ce),r=await n.objectStore(ce).get(tn(e));return await n.done,r}catch(t){if(t instanceof ee)$.warn(t.message);else{const n=B.create("idb-get",{originalErrorMessage:t==null?void 0:t.message});$.warn(n.message)}}}async function xt(e,t){try{const r=(await en()).transaction(ce,"readwrite");await r.objectStore(ce).put(t,tn(e)),await r.done}catch(n){if(n instanceof ee)$.warn(n.message);else{const r=B.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});$.warn(r.message)}}}function tn(e){return`${e.name}!${e.options.appId}`}/**
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
 */const wi=1024,vi=30;class Si{constructor(t){this.container=t,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new Ii(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var t,n;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),o=yt();if(((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)==null?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===o||this._heartbeatsCache.heartbeats.some(s=>s.date===o))return;if(this._heartbeatsCache.heartbeats.push({date:o,agent:i}),this._heartbeatsCache.heartbeats.length>vi){const s=ki(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(s,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){$.warn(r)}}async getHeartbeatsHeader(){var t;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=yt(),{heartbeatsToSend:r,unsentEntries:i}=Ei(this._heartbeatsCache.heartbeats),o=Ut(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=n,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),o}catch(n){return $.warn(n),""}}}function yt(){return new Date().toISOString().substring(0,10)}function Ei(e,t=wi){const n=[];let r=e.slice();for(const i of e){const o=n.find(s=>s.agent===i.agent);if(o){if(o.dates.push(i.date),wt(n)>t){o.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),wt(n)>t){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class Ii{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return qt()?Gt().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await yi(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(t){if(await this._canUseIndexedDBPromise){const r=await this.read();return xt(this.app,{lastSentHeartbeatDate:t.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:t.heartbeats})}else return}async add(t){if(await this._canUseIndexedDBPromise){const r=await this.read();return xt(this.app,{lastSentHeartbeatDate:t.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...t.heartbeats]})}else return}}function wt(e){return Ut(JSON.stringify({version:2,heartbeats:e})).length}function ki(e){if(e.length===0)return-1;let t=0,n=e[0].date;for(let r=1;r<e.length;r++)e[r].date<n&&(n=e[r].date,t=r);return t}/**
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
 */function Ci(e){q(new W("platform-logger",t=>new Mr(t),"PRIVATE")),q(new W("heartbeat",t=>new Si(t),"PRIVATE")),z(He,bt,e),z(He,bt,"esm2020"),z("fire-js","")}/**
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
 */Ci("");var Ti="firebase",Fi="12.19.0";/**
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
 */z(Ti,Fi,"app");const nn="@firebase/installations",Ze="0.6.24";/**
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
 */const rn=1e4,on=`w:${Ze}`,an="FIS_v2",Di="https://firebaseinstallations.googleapis.com/v1",_i=3600*1e3,Ai="installations",ji="Installations";/**
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
 */const Ni={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},G=new we(Ai,ji,Ni);function sn(e){return e instanceof ee&&e.code.includes("request-failed")}/**
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
 */function cn({projectId:e}){return`${Di}/projects/${e}/installations`}function ln(e){return{token:e.token,requestStatus:2,expiresIn:Oi(e.expiresIn),creationTime:Date.now()}}async function dn(e,t){const r=(await t.json()).error;return G.create("request-failed",{requestName:e,serverCode:r.code,serverMessage:r.message,serverStatus:r.status})}function pn({apiKey:e}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e})}function Ri(e,{refreshToken:t}){const n=pn(e);return n.append("Authorization",Bi(t)),n}async function un(e){const t=await e();return t.status>=500&&t.status<600?e():t}function Oi(e){return Number(e.replace("s","000"))}function Bi(e){return`${an} ${e}`}/**
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
 */async function Mi({appConfig:e,heartbeatServiceProvider:t},{fid:n}){const r=cn(e),i=pn(e),o=t.getImmediate({optional:!0});if(o){const c=await o.getHeartbeatsHeader();c&&i.append("x-firebase-client",c)}const s={fid:n,authVersion:an,appId:e.appId,sdkVersion:on},d={method:"POST",headers:i,body:JSON.stringify(s)},l=await un(()=>fetch(r,d));if(l.ok){const c=await l.json();return{fid:c.fid||n,registrationStatus:2,refreshToken:c.refreshToken,authToken:ln(c.authToken)}}else throw await dn("Create Installation",l)}/**
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
 */function fn(e){return new Promise(t=>{setTimeout(t,e)})}/**
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
 */function Pi(e){return btoa(String.fromCharCode(...e)).replace(/\+/g,"-").replace(/\//g,"_")}/**
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
 */const $i=/^[cdef][\w-]{21}$/,Ke="";function Li(){try{const e=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(e),e[0]=112+e[0]%16;const n=zi(e);return $i.test(n)?n:Ke}catch{return Ke}}function zi(e){return Pi(e).substr(0,22)}/**
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
 */const Z=new Map;function hn(e,t){const n=te(e);gn(n,t),Ui(n,t)}function Wi(e,t){bn();const n=te(e);let r=Z.get(n);r||(r=new Set,Z.set(n,r)),r.add(t)}function Hi(e,t){const n=te(e),r=Z.get(n);r&&(r.delete(t),r.size===0&&Z.delete(n),mn())}function gn(e,t){const n=Z.get(e);if(n)for(const r of n)r(t)}function Ui(e,t){const n=bn();n&&n.postMessage({key:e,fid:t}),mn()}let K=null;function bn(){return!K&&"BroadcastChannel"in self&&(K=new BroadcastChannel("[Firebase] FID Change"),K.onmessage=e=>{gn(e.data.key,e.data.fid)}),K}function mn(){Z.size===0&&K&&(K.close(),K=null)}/**
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
 */const Vi="firebase-installations-database",Ki=1,Y="firebase-installations-store";let Oe=null;function Qe(){return Oe||(Oe=ve(Vi,Ki,{upgrade:(e,t)=>{switch(t){case 0:e.createObjectStore(Y)}}})),Oe}async function me(e,t){const n=te(e),i=(await Qe()).transaction(Y,"readwrite"),o=i.objectStore(Y),s=await o.get(n);return await o.put(t,n),await i.done,(!s||s.fid!==t.fid)&&hn(e,t.fid),t}async function xn(e){const t=te(e),r=(await Qe()).transaction(Y,"readwrite");await r.objectStore(Y).delete(t),await r.done}async function Se(e,t){const n=te(e),i=(await Qe()).transaction(Y,"readwrite"),o=i.objectStore(Y),s=await o.get(n),d=t(s);return d===void 0?await o.delete(n):await o.put(d,n),await i.done,d&&(!s||s.fid!==d.fid)&&hn(e,d.fid),d}/**
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
 */async function et(e){let t;const n=await Se(e.appConfig,r=>{const i=qi(r),o=Gi(e,i);return t=o.registrationPromise,o.installationEntry});return n.fid===Ke?{installationEntry:await t}:{installationEntry:n,registrationPromise:t}}function qi(e){const t=e||{fid:Li(),registrationStatus:0};return yn(t)}function Gi(e,t){if(t.registrationStatus===0){if(!navigator.onLine){const i=Promise.reject(G.create("app-offline"));return{installationEntry:t,registrationPromise:i}}const n={fid:t.fid,registrationStatus:1,registrationTime:Date.now()},r=Yi(e,n);return{installationEntry:n,registrationPromise:r}}else return t.registrationStatus===1?{installationEntry:t,registrationPromise:Ji(e)}:{installationEntry:t}}async function Yi(e,t){try{const n=await Mi(e,t);return me(e.appConfig,n)}catch(n){throw sn(n)&&n.customData.serverCode===409?await xn(e.appConfig):await me(e.appConfig,{fid:t.fid,registrationStatus:0}),n}}async function Ji(e){let t=await vt(e.appConfig);for(;t.registrationStatus===1;)await fn(100),t=await vt(e.appConfig);if(t.registrationStatus===0){const{installationEntry:n,registrationPromise:r}=await et(e);return r||n}return t}function vt(e){return Se(e,t=>{if(!t)throw G.create("installation-not-found");return yn(t)})}function yn(e){return Xi(e)?{fid:e.fid,registrationStatus:0}:e}function Xi(e){return e.registrationStatus===1&&e.registrationTime+rn<Date.now()}/**
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
 */async function Zi({appConfig:e,heartbeatServiceProvider:t},n){const r=Qi(e,n),i=Ri(e,n),o=t.getImmediate({optional:!0});if(o){const c=await o.getHeartbeatsHeader();c&&i.append("x-firebase-client",c)}const s={installation:{sdkVersion:on,appId:e.appId}},d={method:"POST",headers:i,body:JSON.stringify(s)},l=await un(()=>fetch(r,d));if(l.ok){const c=await l.json();return ln(c)}else throw await dn("Generate Auth Token",l)}function Qi(e,{fid:t}){return`${cn(e)}/${t}/authTokens:generate`}/**
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
 */async function tt(e,t=!1){let n;const r=await Se(e.appConfig,o=>{if(!wn(o))throw G.create("not-registered");const s=o.authToken;if(!t&&no(s))return o;if(s.requestStatus===1)return n=eo(e,t),o;{if(!navigator.onLine)throw G.create("app-offline");const d=io(o);return n=to(e,d),d}});return n?await n:r.authToken}async function eo(e,t){let n=await St(e.appConfig);for(;n.authToken.requestStatus===1;)await fn(100),n=await St(e.appConfig);const r=n.authToken;return r.requestStatus===0?tt(e,t):r}function St(e){return Se(e,t=>{if(!wn(t))throw G.create("not-registered");const n=t.authToken;return oo(n)?{...t,authToken:{requestStatus:0}}:t})}async function to(e,t){try{const n=await Zi(e,t),r={...t,authToken:n};return await me(e.appConfig,r),n}catch(n){if(sn(n)&&(n.customData.serverCode===401||n.customData.serverCode===404))await xn(e.appConfig);else{const r={...t,authToken:{requestStatus:0}};await me(e.appConfig,r)}throw n}}function wn(e){return e!==void 0&&e.registrationStatus===2}function no(e){return e.requestStatus===2&&!ro(e)}function ro(e){const t=Date.now();return t<e.creationTime||e.creationTime+e.expiresIn<t+_i}function io(e){const t={requestStatus:1,requestTime:Date.now()};return{...e,authToken:t}}function oo(e){return e.requestStatus===1&&e.requestTime+rn<Date.now()}/**
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
 */async function ao(e){const t=e,{installationEntry:n,registrationPromise:r}=await et(t);return r?r.catch(console.error):tt(t).catch(console.error),n.fid}/**
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
 */async function so(e,t=!1){const n=e;return await co(n),(await tt(n,t)).token}async function co(e){const{registrationPromise:t}=await et(e);t&&await t}/**
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
 */function lo(e,t){const{appConfig:n}=e;return Wi(n,t),()=>{Hi(n,t)}}/**
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
 */function po(e){if(!e||!e.options)throw Be("App Configuration");if(!e.name)throw Be("App Name");const t=["projectId","apiKey","appId"];for(const n of t)if(!e.options[n])throw Be(n);return{appName:e.name,projectId:e.options.projectId,apiKey:e.options.apiKey,appId:e.options.appId}}function Be(e){return G.create("missing-app-config-values",{valueName:e})}/**
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
 */const vn="installations",uo="installations-internal",fo=e=>{const t=e.getProvider("app").getImmediate(),n=po(t),r=Xe(t,"heartbeat");return{app:t,appConfig:n,heartbeatServiceProvider:r,_delete:()=>Promise.resolve()}},ho=e=>{const t=e.getProvider("app").getImmediate(),n=Xe(t,vn).getImmediate();return{getId:()=>ao(n),getToken:i=>so(n,i)}};function go(){q(new W(vn,fo,"PUBLIC")),q(new W(uo,ho,"PRIVATE"))}/**
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
 */go();z(nn,Ze);z(nn,Ze,"esm2020");/**
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
 */const bo="/firebase-messaging-sw.js",mo="/firebase-cloud-messaging-push-scope",Sn="BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4",xo="https://fcmregistrations.googleapis.com/v1",En="google.c.a.c_id",yo="google.c.a.c_l",wo="google.c.a.ts",vo="google.c.a.e",Et=1e4;var It;(function(e){e[e.DATA_MESSAGE=1]="DATA_MESSAGE",e[e.DISPLAY_NOTIFICATION=3]="DISPLAY_NOTIFICATION"})(It||(It={}));/**
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
 */function _(e){const t=new Uint8Array(e);return btoa(String.fromCharCode(...t)).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}function In(e){const t="=".repeat((4-e.length%4)%4),n=(e+t).replace(/\-/g,"+").replace(/_/g,"/"),r=atob(n),i=new Uint8Array(r.length);for(let o=0;o<r.length;++o)i[o]=r.charCodeAt(o);return i}/**
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
 */const Me="fcm_token_details_db",So=5,kt="fcm_token_object_Store";async function Eo(e){if("databases"in indexedDB&&!(await indexedDB.databases()).map(o=>o.name).includes(Me))return null;let t=null;return(await ve(Me,So,{upgrade:async(r,i,o,s)=>{if(i<2||!r.objectStoreNames.contains(kt))return;const d=s.objectStore(kt),l=await d.index("fcmSenderId").get(e);if(await d.clear(),!!l){if(i===2){const c=l;if(!c.auth||!c.p256dh||!c.endpoint)return;t={token:c.fcmToken,createTime:c.createTime??Date.now(),subscriptionOptions:{auth:c.auth,p256dh:c.p256dh,endpoint:c.endpoint,swScope:c.swScope,vapidKey:typeof c.vapidKey=="string"?c.vapidKey:_(c.vapidKey)}}}else if(i===3){const c=l;t={token:c.fcmToken,createTime:c.createTime,subscriptionOptions:{auth:_(c.auth),p256dh:_(c.p256dh),endpoint:c.endpoint,swScope:c.swScope,vapidKey:_(c.vapidKey)}}}else if(i===4){const c=l;t={token:c.fcmToken,createTime:c.createTime,subscriptionOptions:{auth:_(c.auth),p256dh:_(c.p256dh),endpoint:c.endpoint,swScope:c.swScope,vapidKey:_(c.vapidKey)}}}}}})).close(),await ge(Me),await ge("fcm_vapid_details_db"),await ge("undefined"),Io(t)?t:null}function Io(e){if(!e||!e.subscriptionOptions)return!1;const{subscriptionOptions:t}=e;return typeof e.createTime=="number"&&e.createTime>0&&typeof e.token=="string"&&e.token.length>0&&typeof t.auth=="string"&&t.auth.length>0&&typeof t.p256dh=="string"&&t.p256dh.length>0&&typeof t.endpoint=="string"&&t.endpoint.length>0&&typeof t.swScope=="string"&&t.swScope.length>0&&typeof t.vapidKey=="string"&&t.vapidKey.length>0}/**
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
 */const ko={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"only-available-in-window":"This method is available in a Window context.","only-available-in-sw":"This method is available in a service worker context.","permission-default":"The notification permission was not granted and dismissed instead.","permission-blocked":"The notification permission was not granted and blocked instead.","unsupported-browser":"This browser doesn't support the API's required to use the Firebase SDK.","indexed-db-unsupported":"This browser doesn't support indexedDb.open() (ex. Safari iFrame, Firefox Private Browsing, etc)","failed-service-worker-registration":"We are unable to register the default service worker. {$browserErrorMessage}","token-subscribe-failed":"A problem occurred while subscribing the user to FCM: {$errorInfo}","token-subscribe-no-token":"FCM returned no token when subscribing the user to push.","fid-registration-failed":"A problem occurred while creating an FCM registration via FID: {$errorInfo}","fid-unregister-failed":"A problem occurred while unregistering the FCM registration via FID: {$errorInfo}","fid-registration-idb-schema-unavailable":"Unable to read or persist FID registration metadata because the messaging IndexedDB schema is unavailable (for example, the database could not be upgraded to the latest version).","token-unsubscribe-failed":"A problem occurred while unsubscribing the user from FCM: {$errorInfo}","token-update-failed":"A problem occurred while updating the user from FCM: {$errorInfo}","token-update-no-token":"FCM returned no token when updating the user to push.","use-sw-after-get-token":"The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.","invalid-sw-registration":"The input to useServiceWorker() must be a ServiceWorkerRegistration.","invalid-bg-handler":"The input to setBackgroundMessageHandler() must be a function.","invalid-vapid-key":"The public VAPID key must be a string.","use-vapid-key-after-get-token":"The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used.","invalid-on-registered-handler":"No onRegistered callback handler was provided or registered. Implement onRegistered() before register()."},m=new we("messaging","Messaging",ko);/**
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
 */const Ct="firebase-messaging-database",Tt=2,J="firebase-messaging-store",P="firebase-messaging-fid-registration-store",Co={openDB:ve,deleteDB:ge};let Ft=Co,ae=null;function To(e,t,n){switch(t){case 0:if(e.createObjectStore(J),n===1)break;case 1:n===2&&e.createObjectStore(P)}}function Dt(e){return{upgrade:(t,n)=>{To(t,n,e)},blocked:()=>{},blocking:(t,n,r)=>{var i;ae=null,(i=r.target)==null||i.close()},terminated:()=>{ae=null}}}function Ee(){return ae||(ae=Ft.openDB(Ct,Tt,Dt(2)).catch(()=>Ft.openDB(Ct,Tt-1,Dt(1)))),ae}function kn(e,t){return e.objectStoreNames.contains(t)}function Cn(e){if(!kn(e,P))throw m.create("fid-registration-idb-schema-unavailable")}async function Fo(e){const t=Ie(e),r=await(await Ee()).transaction(J).objectStore(J).get(t);if(r)return r;{const i=await Eo(e.appConfig.senderId);if(i)return await nt(e,i),i}}async function nt(e,t){const n=Ie(e),r=await Ee(),i=[J],o=kn(r,P);o&&i.push(P);const s=r.transaction(i,"readwrite");return await s.objectStore(J).put(t,n),o&&await s.objectStore(P).delete(n),await s.done,t}async function Tn(e){const t=Ie(e),n=await Ee();return Cn(n),await n.transaction(P).objectStore(P).get(t)}async function Do(e,t){const n=Ie(e),r=await Ee();Cn(r);const i=r.transaction([J,P],"readwrite");return await i.objectStore(P).put(t,n),await i.objectStore(J).delete(n),await i.done,t}function Ie({appConfig:e}){return e.appId}const _t="@firebase/messaging",qe="0.13.3";/**
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
 */const _o=3,Ao=1e3;async function jo(e,t){const n=await Ce(e),r=rt(t,e.appConfig.appName,!1),i={method:"POST",headers:n,body:JSON.stringify(r)};let o;try{o=await(await fetch(ke(e.appConfig),i)).json()}catch(s){throw m.create("token-subscribe-failed",{errorInfo:s==null?void 0:s.toString()})}if(o.error){const s=o.error.message;throw m.create("token-subscribe-failed",{errorInfo:s})}if(!o.token)throw m.create("token-subscribe-no-token");return o.token}async function No(e,t){var l;const n=await Ce(e),r=rt(t,e.appConfig.appName,!0),i={method:"POST",headers:n,body:JSON.stringify(r)};let o;try{o=await Po(()=>fetch(ke(e.appConfig),i),_o,Ao)}catch(c){throw m.create("fid-registration-failed",{errorInfo:c==null?void 0:c.toString()})}if(o.ok)return{responseFid:await Ro(o)};let s;try{s=await o.json()}catch{throw m.create("fid-registration-failed",{errorInfo:o.statusText})}const d=((l=s.error)==null?void 0:l.message)??o.statusText;throw m.create("fid-registration-failed",{errorInfo:d})}async function Ro(e){const t=await e.text();if(!t.trim())throw m.create("fid-registration-failed",{errorInfo:"CreateRegistration succeeded but response body is empty"});let n;try{n=JSON.parse(t)}catch{throw m.create("fid-registration-failed",{errorInfo:"CreateRegistration succeeded but response body is not valid JSON"})}const r=n.name;if(typeof r!="string"||r.length===0)throw m.create("fid-registration-failed",{errorInfo:"CreateRegistration succeeded but response did not include a non-empty name"});return Oo(r)}const At="/registrations/";function Oo(e){const t=e.indexOf(At);if(t!==-1){const n=e.slice(t+At.length);if(n.length>0)return n}throw m.create("fid-registration-failed",{errorInfo:"CreateRegistration succeeded but response name is not a valid registration resource name"})}async function Bo(e,t){const n=await Ce(e),r=rt(t.subscriptionOptions,e.appConfig.appName,!1),i={method:"PATCH",headers:n,body:JSON.stringify(r)};let o;try{o=await(await fetch(`${ke(e.appConfig)}/${t.token}`,i)).json()}catch(s){throw m.create("token-update-failed",{errorInfo:s==null?void 0:s.toString()})}if(o.error){const s=o.error.message;throw m.create("token-update-failed",{errorInfo:s})}if(!o.token)throw m.create("token-update-no-token");return o.token}async function Mo(e,t){const r={method:"DELETE",headers:await Ce(e)};try{const o=await(await fetch(`${ke(e.appConfig)}/${t}`,r)).json();if(o.error){const s=o.error.message;throw m.create("token-unsubscribe-failed",{errorInfo:s})}}catch(i){throw m.create("token-unsubscribe-failed",{errorInfo:i==null?void 0:i.toString()})}}async function Po(e,t,n){let r;for(let i=0;i<t;i++)try{return await e()}catch(o){if(r=o,i<t-1){const s=n*Math.pow(2,i);await new Promise(d=>setTimeout(d,s))}}throw r}function ke({projectId:e}){return`${xo}/projects/${e}/registrations`}async function Ce({appConfig:e,installations:t}){const n=await t.getToken();return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e.apiKey,"x-goog-firebase-installations-auth":`FIS ${n}`})}function $o(e,t){var n,r;try{if(/^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(e))return new URL(e).host}catch{}try{if(typeof self<"u"&&((n=self.location)!=null&&n.href))return new URL(e,self.location.origin).host}catch{}return typeof self<"u"&&((r=self.location)!=null&&r.host)?self.location.host:t}function rt({p256dh:e,auth:t,endpoint:n,vapidKey:r,swScope:i},o,s){const d={web:{origin:$o(i,o),endpoint:n,auth:t,p256dh:e}};return s&&(d.fcm_sdk_version=qe),r!==Sn&&(d.web.applicationPubKey=r),d}/**
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
 */const Lo=10080*60*1e3;async function zo(e){const t=await Ho(e.swRegistration,e.vapidKey),n={vapidKey:e.vapidKey,swScope:e.swRegistration.scope,endpoint:t.endpoint,auth:_(t.getKey("auth")),p256dh:_(t.getKey("p256dh"))},r=await Fo(e.firebaseDependencies);if(r){if(Uo(r.subscriptionOptions,n))return Date.now()>=r.createTime+Lo?Wo(e,{token:r.token,createTime:Date.now(),subscriptionOptions:n}):r.token;try{await Mo(e.firebaseDependencies,r.token)}catch(i){console.warn(i)}return jt(e.firebaseDependencies,n)}else return jt(e.firebaseDependencies,n)}async function Wo(e,t){try{const n=await Bo(e.firebaseDependencies,t),r={...t,token:n,createTime:Date.now()};return await nt(e.firebaseDependencies,r),n}catch(n){throw n}}async function jt(e,t){const r={token:await jo(e,t),createTime:Date.now(),subscriptionOptions:t};return await nt(e,r),r.token}async function Ho(e,t){const n=await e.pushManager.getSubscription();return n||e.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:In(t)})}function Uo(e,t){const n=t.vapidKey===e.vapidKey,r=t.endpoint===e.endpoint,i=t.auth===e.auth,o=t.p256dh===e.p256dh;return n&&r&&i&&o}function Vo(e,t){const n=e.onRegisteredHandler;n&&(typeof n=="function"?n(t):n.next(t))}/**
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
 */async function Ko(e){try{e.swRegistration=await navigator.serviceWorker.register(bo,{scope:mo}),e.swRegistration.update().catch(()=>{}),await qo(e.swRegistration)}catch(t){throw m.create("failed-service-worker-registration",{browserErrorMessage:t==null?void 0:t.message})}}async function qo(e){return new Promise((t,n)=>{const r=setTimeout(()=>n(new Error(`Service worker not registered after ${Et} ms`)),Et),i=e.installing||e.waiting;e.active?(clearTimeout(r),t()):i?i.onstatechange=o=>{var s;((s=o.target)==null?void 0:s.state)==="activated"&&(i.onstatechange=null,clearTimeout(r),t())}:(clearTimeout(r),n(new Error("No incoming service worker found.")))})}/**
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
 */async function Fn(e,t){if(!t&&!e.swRegistration&&await Ko(e),!(!t&&e.swRegistration)){if(!(t instanceof ServiceWorkerRegistration))throw m.create("invalid-sw-registration");e.swRegistration=t}}/**
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
 */async function Dn(e,t){t?e.vapidKey=t:e.vapidKey||(e.vapidKey=Sn)}/**
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
 */const Nt=3;async function Go(e,t){const n=await Yo(e.swRegistration,e.vapidKey),r={vapidKey:e.vapidKey,swScope:e.swRegistration.scope,endpoint:n.endpoint,auth:_(n.getKey("auth")),p256dh:_(n.getKey("p256dh"))},i=e.firebaseDependencies.installations;for(let o=0;o<Nt;o++){const{responseFid:s}=await No(e.firebaseDependencies,r);if(s===t)return;o<Nt-1&&await i.getToken(!0)}throw m.create("fid-registration-failed",{errorInfo:"CreateRegistration response FID does not match Firebase Installation ID"})}async function Yo(e,t){const n=await e.pushManager.getSubscription();return n||e.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:In(t)})}/**
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
 */const Jo=10080*60*1e3;async function _n(e,t){if(!navigator)throw m.create("only-available-in-window");if(Notification.permission==="default"&&await Notification.requestPermission(),Notification.permission!=="granted")throw m.create("permission-blocked");if(!e.onRegisteredHandler)throw m.create("invalid-on-registered-handler");await Dn(e,t==null?void 0:t.vapidKey),await Fn(e,t==null?void 0:t.serviceWorkerRegistration);const n=e._registerNotifyChain.catch(()=>{});return e._registerNotifyChain=n.then(async()=>{const r=await e.firebaseDependencies.installations.getId(),i=await Tn(e.firebaseDependencies),o=Date.now();if((!i||i.fid!==r||o>=i.lastRegisterTime+Jo)&&(await Go(e,r),await Do(e.firebaseDependencies,{fid:r,lastRegisterTime:o,vapidKey:e.vapidKey})),!e.onRegisteredHandler)throw m.create("invalid-on-registered-handler");Vo(e,r)}),e._registerNotifyChain}/**
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
 */function Xo(e,t){return lo(t,()=>{(async()=>!e.onRegisteredHandler||!await Tn(e.firebaseDependencies)||await _n(e).catch(()=>{}))()})}/**
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
 */function Rt(e){const t={from:e.from,collapseKey:e.collapse_key,messageId:e.fcmMessageId};return Zo(t,e),Qo(t,e),ea(t,e),t}function Zo(e,t){if(!t.notification)return;e.notification={};const n=t.notification.title;n&&(e.notification.title=n);const r=t.notification.body;r&&(e.notification.body=r);const i=t.notification.image;i&&(e.notification.image=i);const o=t.notification.icon;o&&(e.notification.icon=o)}function Qo(e,t){t.data&&(e.data=t.data)}function ea(e,t){var i,o,s,d;if(!t.fcmOptions&&!((i=t.notification)!=null&&i.click_action))return;e.fcmOptions={};const n=((o=t.fcmOptions)==null?void 0:o.link)??((s=t.notification)==null?void 0:s.click_action);n&&(e.fcmOptions.link=n);const r=(d=t.fcmOptions)==null?void 0:d.analytics_label;r&&(e.fcmOptions.analyticsLabel=r)}/**
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
 */function ta(e){return typeof e=="object"&&!!e&&En in e}/**
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
 */function na(e){if(!e||!e.options)throw Pe("App Configuration Object");if(!e.name)throw Pe("App Name");const t=["projectId","apiKey","appId","messagingSenderId"],{options:n}=e;for(const r of t)if(!n[r])throw Pe(r);return{appName:e.name,projectId:n.projectId,apiKey:n.apiKey,appId:n.appId,senderId:n.messagingSenderId}}function Pe(e){return m.create("missing-app-config-values",{valueName:e})}/**
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
 */class ra{constructor(t,n,r){this.deliveryMetricsExportedToBigQueryEnabled=!1,this.onBackgroundMessageHandler=null,this.onMessageHandler=null,this.onRegisteredHandler=null,this.onUnregisteredHandler=null,this._registerNotifyChain=Promise.resolve(),this._fidChangeUnsubscribe=null,this.logEvents=[],this.logQueue={state:"stopped"};const i=na(t);this.firebaseDependencies={app:t,appConfig:i,installations:n,analyticsProvider:r}}_delete(){return this._fidChangeUnsubscribe&&(this._fidChangeUnsubscribe(),this._fidChangeUnsubscribe=null),this.logQueue.state==="scheduled"&&clearTimeout(this.logQueue.timerId),this.logQueue={state:"stopped"},Promise.resolve()}}/**
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
 */async function ia(e,t){if(!navigator)throw m.create("only-available-in-window");if(Notification.permission==="default"&&await Notification.requestPermission(),Notification.permission!=="granted")throw m.create("permission-blocked");return await Dn(e,t==null?void 0:t.vapidKey),await Fn(e,t==null?void 0:t.serviceWorkerRegistration),zo(e)}/**
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
 */async function oa(e,t,n){const r=aa(t);(await e.firebaseDependencies.analyticsProvider.get()).logEvent(r,{message_id:n[En],message_name:n[yo],message_time:n[wo],message_device_time:Math.floor(Date.now()/1e3)})}function aa(e){switch(e){case Q.NOTIFICATION_CLICKED:return"notification_open";case Q.PUSH_RECEIVED:return"notification_foreground";default:throw new Error}}/**
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
 */async function sa(e,t){const n=t.data;if(!n.isFirebaseMessaging)return;if(e.onMessageHandler&&n.messageType===Q.PUSH_RECEIVED&&(typeof e.onMessageHandler=="function"?e.onMessageHandler(Rt(n)):e.onMessageHandler.next(Rt(n))),e.onRegisteredHandler&&n.messageType===Q.FID_REGISTERED){const i=n.fid;typeof e.onRegisteredHandler=="function"?e.onRegisteredHandler(i):e.onRegisteredHandler.next(i)}const r=n.data;ta(r)&&r[vo]==="1"&&await oa(e,n.messageType,r)}/**
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
 */const ca=e=>{const t=new ra(e.getProvider("app").getImmediate(),e.getProvider("installations-internal").getImmediate(),e.getProvider("analytics-internal"));return navigator.serviceWorker.addEventListener("message",n=>sa(t,n)),t._fidChangeUnsubscribe=Xo(t,e.getProvider("installations").getImmediate()),t},la=e=>{const t=e.getProvider("messaging").getImmediate();return{getToken:r=>ia(t,r),register:r=>_n(t,r)}};function da(){q(new W("messaging",ca,"PUBLIC")),q(new W("messaging-internal",la,"PRIVATE")),z(_t,qe),z(_t,qe,"esm2020")}/**
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
 */async function An(){try{await Gt()}catch{return!1}return typeof window<"u"&&qt()&&fr()&&"serviceWorker"in navigator&&"PushManager"in window&&"Notification"in window&&"fetch"in window&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey")}/**
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
 */function pa(e,t){if(!navigator)throw m.create("only-available-in-window");return e.onMessageHandler=t,()=>{e.onMessageHandler=null}}/**
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
 */function ua(e=Qt()){return An().then(t=>{if(!t)throw m.create("unsupported-browser")},t=>{throw m.create("indexed-db-unsupported")}),Xe(Yt(e),"messaging").getImmediate()}function fa(e,t){return e=Yt(e),pa(e,t)}/**
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
 */da();const ha={apiKey:"AIzaSyFakeKeyForLocalTesting12345678",authDomain:"emperor-saas.firebaseapp.com",projectId:"emperor-saas",storageBucket:"emperor-saas.appspot.com",messagingSenderId:"123456789012",appId:"1:123456789012:web:abcdef123456"},ga=bi().length>0?Qt():Zt(ha);async function ba(e){try{if(!await An())return null;const n=ua(ga);return fa(n,r=>{e&&e(r)})}catch(t){return console.error("Error attaching foreground message listener:",t),null}}function ma(){const{theme:e}=xe(),{t,language:n}=le(),r=e==="light",i=new Date().getFullYear(),o=be();return a.jsx("footer",{className:"emperor-app-footer",children:a.jsxs("div",{className:"emperor-app-footer-inner",children:[a.jsxs("div",{className:"emperor-app-footer-brand",children:[a.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"8px",overflow:"hidden",border:"1px solid rgba(56, 189, 248, 0.45)",background:r?"#ffffff":"#071325",display:"inline-flex",alignItems:"center",justifyContent:"center",flexShrink:0,boxShadow:"0 0 10px rgba(56, 189, 248, 0.3)"},children:a.jsx("img",{src:ye(),alt:o,style:{width:"100%",height:"100%",objectFit:"contain"}})}),a.jsx("span",{style:{color:r?"#475569":"#94A3B8",fontWeight:"600",lineHeight:"1.6"},children:t("rights",n==="en"?`All Rights Reserved © ${i} — ${o}`:`جميع الحقوق محفوظة © ${i} — منصة ${o}`)})]}),a.jsx("div",{children:a.jsxs(j,{to:"/created-by",style:{color:r?"#b45309":"#D4A537",textDecoration:"none",fontWeight:"700",fontSize:"12px",display:"inline-flex",alignItems:"center",gap:"5px",padding:"5px 12px",borderRadius:"8px",background:r?"rgba(212, 165, 55, 0.1)":"rgba(212, 165, 55, 0.08)",border:r?"1px solid rgba(212, 165, 55, 0.25)":"1px solid rgba(212, 165, 55, 0.18)",transition:"all 0.2s ease"},onMouseEnter:s=>{s.currentTarget.style.background=r?"rgba(212, 165, 55, 0.2)":"rgba(212, 165, 55, 0.16)",s.currentTarget.style.transform="translateY(-1px)"},onMouseLeave:s=>{s.currentTarget.style.background=r?"rgba(212, 165, 55, 0.1)":"rgba(212, 165, 55, 0.08)",s.currentTarget.style.transform="translateY(0)"},children:[a.jsx("span",{children:t("developedByTeam","تم التطوير بواسطة فريق العمل")}),a.jsx(Jn,{size:12})]})})]})})}function xa({isOpen:e,onClose:t}){const{theme:n}=xe(),r=n==="light",{language:i,isRtl:o}=le(),s=i==="en",[d,l]=b.useState([]),[c,p]=b.useState(!1);if(b.useEffect(()=>{if(!e)return;const u=document.body.style.overflow;document.body.style.overflow="hidden";const g=x=>{x.key==="Escape"&&t()};return window.addEventListener("keydown",g),()=>{document.body.style.overflow=u,window.removeEventListener("keydown",g)}},[e,t]),b.useEffect(()=>{if(!e)return;let u=!0;return(async()=>{var x;p(!0);try{const S=await Bn.getSupportContacts(),N=((x=S.data)==null?void 0:x.data)||S.data||[];u&&l(Array.isArray(N)?N:[])}catch(S){console.error("Error fetching support contacts for modal:",S)}finally{u&&p(!1)}})(),()=>{u=!1}},[e]),!e)return null;const v=[{id:"owner",name:s?"Diaa Ashraf":"ضياء أشرف",role_badge:s?"Platform Owner":"صاحب المنصة",badge_color:"#F59E0B",channel:"whatsapp",phone:"01012286661",value:"01012286661"},{id:"support-1",name:s?"Yasmine":"ياسمين",role_badge:s?"Customer Support":"خدمة العملاء",badge_color:"#38BDF8",channel:"whatsapp",phone:"01201111390",value:"01201111390"},{id:"support-2",name:s?"Support Team":"فريق الدعم",role_badge:s?"Customer Support":"خدمة العملاء",badge_color:"#34D399",channel:"whatsapp",phone:"01013669339",value:"01013669339"}],I=u=>{const g=(u.value||u.phone||"").trim(),x=(u.channel||"").toLowerCase();if(x.includes("whatsapp")||g.startsWith("+")||/^[0-9]+$/.test(g.replace(/[\s+-]/g,""))){const S=g.replace(/[^0-9]/g,""),N=S.startsWith("01")?`20${S.substring(1)}`:S,T=encodeURIComponent(s?"Hello, I need assistance regarding my account.":"السلام عليكم ورحمة الله وبركاته، محتاج مساعدة بخصوص حسابي في منصة سند ومهره كارد.");return`https://wa.me/${N}?text=${T}`}return x.includes("telegram")||g.includes("t.me")?g.startsWith("http")?g:`https://t.me/${g.replace("@","")}`:x.includes("email")||g.includes("@")?`mailto:${g}`:g.startsWith("http")?g:`https://${g}`},k=(u,g)=>{let x=u.role_badge;if(!x){const S=(u.description||"").trim();S.includes("صاحب")||S.includes("إدارة")?x="صاحب المنصة":S.includes("تارجت")?x="قسم التارجت":S.includes("فني")||S.includes("شحن")?x="الدعم الفني":x="خدمة العملاء"}if(s){if(x==="صاحب المنصة")return"Platform Owner";if(x==="قسم التارجت")return"Target Support";if(x==="الدعم الفني")return"Technical Support";if(x==="خدمة العملاء")return"Customer Support"}return x},D=d.length>0?d.map((u,g)=>({...u,phone:u.value?u.value.replace(/[^0-9+]/g,""):"",role_badge:k(u),badge_color:g===0?"#F59E0B":g%2===1?"#38BDF8":"#34D399"})):v;return a.jsxs("div",{onClick:t,style:{position:"fixed",inset:0,zIndex:9999,display:"flex",alignItems:"center",justifyContent:"center",padding:"16px",backgroundColor:r?"rgba(15, 23, 42, 0.35)":"rgba(5, 5, 8, 0.82)",backdropFilter:"blur(10px)",WebkitBackdropFilter:"blur(10px)",animation:"fadeInModal 0.25s ease-out forwards"},children:[a.jsx("style",{children:`
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
            `}),a.jsxs("div",{onClick:u=>u.stopPropagation(),style:{position:"relative",width:"100%",maxWidth:"460px",maxHeight:"90vh",overflowY:"auto",backgroundColor:r?"#FFFFFF":"#0D0E12",border:r?"1.5px solid rgba(212, 165, 55, 0.45)":"1.5px solid rgba(34, 197, 94, 0.35)",borderRadius:"24px",padding:"clamp(16px, 4vw, 24px)",boxShadow:r?"0 20px 60px rgba(0, 0, 0, 0.12), 0 0 30px rgba(212, 165, 55, 0.1)":"0 20px 60px rgba(0, 0, 0, 0.9), 0 0 40px rgba(34, 197, 94, 0.12)",animation:"scaleUpModal 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards",fontFamily:"var(--font-cairo, Cairo, sans-serif)",direction:o?"rtl":"ltr",color:r?"#0F172A":"#FFFFFF",boxSizing:"border-box"},children:[a.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"16px",gap:"10px"},children:[a.jsx("button",{type:"button",onClick:t,"aria-label":s?"Close":"إغلاق",style:{display:"flex",alignItems:"center",justifyContent:"center",width:"36px",height:"36px",borderRadius:"12px",background:r?"#F1F5F9":"rgba(255, 255, 255, 0.06)",border:r?"1px solid #CBD5E1":"1px solid rgba(255, 255, 255, 0.1)",color:r?"#475569":"#A0A0B0",cursor:"pointer",transition:"all 0.2s ease",flexShrink:0},onMouseEnter:u=>{u.currentTarget.style.color="#FFFFFF",u.currentTarget.style.background="rgba(239, 68, 68, 0.85)",u.currentTarget.style.borderColor="rgba(239, 68, 68, 0.9)"},onMouseLeave:u=>{u.currentTarget.style.color=r?"#475569":"#A0A0B0",u.currentTarget.style.background=r?"#F1F5F9":"rgba(255, 255, 255, 0.06)",u.currentTarget.style.borderColor=r?"#CBD5E1":"rgba(255, 255, 255, 0.1)"},children:a.jsx(Ge,{size:20})}),a.jsxs("h2",{style:{margin:0,fontSize:"clamp(16px, 4vw, 18px)",fontWeight:"900",color:r?"#0F172A":"#FFFFFF",letterSpacing:"-0.2px",display:"flex",alignItems:"center",gap:"6px"},children:[a.jsx("span",{children:s?"Contact Team":"تواصل مع فريق"}),a.jsx("span",{style:{background:"linear-gradient(135deg, #F5D061 0%, #D4A537 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"},children:"EMPEROR"})]})]}),a.jsx("p",{style:{margin:"0 0 18px",fontSize:"13.5px",fontWeight:"700",color:r?"#475569":"#9E9EA8",textAlign:o?"right":"left"},children:s?"Choose the channel or representative to contact directly:":"اختر القناة أو الشخص الذي تريد التواصل معه مباشرة:"}),a.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"12px"},children:D.map((u,g)=>{const x=I(u),S=g===0;return a.jsxs("div",{className:"support-contact-card",style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 14px",borderRadius:"16px",background:r?"#FFFFFF":"rgba(15, 18, 16, 0.75)",border:r?"1.5px solid rgba(212, 165, 55, 0.35)":"1.5px solid rgba(34, 197, 94, 0.22)",gap:"10px",boxSizing:"border-box",width:"100%"},children:[a.jsx("a",{href:x,target:"_blank",rel:"noopener noreferrer",className:"support-contact-btn",style:{display:"inline-flex",alignItems:"center",justifyContent:"center",padding:"7px 16px",borderRadius:"10px",border:"1.5px solid #22C55E",color:"#FFFFFF",background:"#22C55E",fontSize:"13px",fontWeight:"900",textDecoration:"none",cursor:"pointer",flexShrink:0,boxShadow:"0 2px 8px rgba(34, 197, 94, 0.3)"},children:s?"Contact":"تواصل"}),a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px",minWidth:0,flex:1,justifyContent:o?"flex-end":"flex-start",flexDirection:o?"row":"row-reverse"},children:[a.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"3px",minWidth:0,flex:1,textAlign:o?"right":"left"},children:[a.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"flex-start",gap:"6px",flexWrap:"wrap"},children:[a.jsx("span",{style:{fontSize:"13.5px",fontWeight:"900",color:r?"#0F172A":"#FFFFFF",lineHeight:"1.4",wordBreak:"break-word"},children:u.name}),u.role_badge&&a.jsx("span",{style:{fontSize:"10.5px",fontWeight:"800",color:u.badge_color||(S?r?"#B45309":"#F59E0B":r?"#0369A1":"#38BDF8"),background:r?"rgba(0, 0, 0, 0.05)":"rgba(255, 255, 255, 0.06)",padding:"2px 7px",borderRadius:"6px",whiteSpace:"nowrap"},children:u.role_badge})]}),(u.phone||u.value)&&a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"5px",color:r?"#475569":"#A0A0B0",fontSize:"12px",fontWeight:"700",direction:"ltr",justifyContent:o?"flex-end":"flex-start",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:[a.jsx("span",{style:{overflow:"hidden",textOverflow:"ellipsis"},children:u.phone||u.value}),a.jsx(Xn,{size:11,color:"#22C55E",style:{flexShrink:0}})]})]}),a.jsx("div",{style:{width:"40px",height:"40px",borderRadius:"50%",background:"linear-gradient(135deg, #22C55E 0%, #16A34A 100%)",display:"flex",alignItems:"center",justifyContent:"center",color:"#FFFFFF",boxShadow:"0 0 14px rgba(34, 197, 94, 0.35)",flexShrink:0},children:a.jsx($e,{size:20,fill:"#FFFFFF",color:"#22C55E"})})]})]},u.id||g)})}),a.jsxs("div",{style:{marginTop:"16px",paddingTop:"12px",borderTop:r?"1px solid #E2E8F0":"1px solid rgba(255, 255, 255, 0.06)",display:"flex",alignItems:"center",justifyContent:"center",gap:"6px",color:r?"#64748B":"#6B7280",fontSize:"11.5px",fontWeight:"700"},children:[a.jsx($t,{size:14,color:"#22C55E"}),a.jsx("span",{children:s?"Support team available 24/7 to assist you":"فريق الدعم متواجد لخدمتك على مدار الساعة 24/7"})]})]})]})}function ya(){const[e,t]=b.useState(!0),[n,r]=b.useState(!1);return b.useEffect(()=>{const i=setTimeout(()=>{r(!0)},1200),o=setTimeout(()=>{t(!1)},1600);return()=>{clearTimeout(i),clearTimeout(o)}},[]),e?a.jsxs("div",{id:"emperor-splash-screen",style:{position:"fixed",inset:0,zIndex:999999,backgroundColor:"#050508",backgroundImage:"radial-gradient(circle at 50% 45%, rgba(212, 165, 55, 0.18) 0%, rgba(5, 5, 8, 0.98) 70%)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",opacity:n?0:1,transform:n?"scale(1.04)":"scale(1)",transition:"opacity 0.45s ease, transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)",pointerEvents:n?"none":"auto",userSelect:"none"},children:[a.jsx("style",{children:`
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
            `}),a.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"18px",textAlign:"center",padding:"20px"},children:[a.jsx("div",{style:{position:"relative",width:"120px",height:"120px",animation:"emperorPulseLogo 2.5s ease-in-out infinite"},children:a.jsx("img",{src:ye(),alt:"سند ومهره كارد",style:{width:"100%",height:"100%",borderRadius:"28px",objectFit:"contain",border:"2px solid rgba(212, 165, 55, 0.6)",boxShadow:"0 0 30px rgba(212, 165, 55, 0.5), inset 0 0 15px rgba(212, 165, 55, 0.3)"}})}),a.jsxs("div",{children:[a.jsx("h1",{style:{margin:"6px 0 2px",fontSize:"26px",fontWeight:"900",letterSpacing:"1px",fontFamily:"var(--font-cairo, Cairo, sans-serif)",background:"linear-gradient(90deg, #F8E8B8 0%, #FFFFFF 25%, #D4A537 50%, #FFFFFF 75%, #F8E8B8 100%)",backgroundSize:"200% auto",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",animation:"emperorShimmerText 3s linear infinite",textShadow:"0 0 20px rgba(212, 165, 55, 0.4)"},children:"سند ومهره كارد"}),a.jsx("p",{style:{margin:0,fontSize:"13px",fontWeight:"700",color:"#D4A537",letterSpacing:"0.5px",fontFamily:"var(--font-cairo, Cairo, sans-serif)"},children:"خدماتك الرقمية والمالية في مكان واحد"})]}),a.jsx("div",{style:{width:"160px",height:"4px",borderRadius:"999px",backgroundColor:"rgba(255, 255, 255, 0.08)",overflow:"hidden",marginTop:"8px",border:"1px solid rgba(212, 165, 55, 0.3)"},children:a.jsx("div",{style:{height:"100%",background:"linear-gradient(90deg, #D4A537, #F8E8B8, #22C55E)",animation:"emperorProgressFill 1.1s cubic-bezier(0.16, 1, 0.3, 1) forwards"}})})]})]}):null}function wa(){const[e,t]=b.useState(!1),[n,r]=b.useState(!1),{isRtl:i,t:o}=le();b.useEffect(()=>{if(sessionStorage.getItem("emperor_payment_notice_seen"))return;const p=setTimeout(()=>{t(!0)},1700);return()=>clearTimeout(p)},[]);const s=()=>{sessionStorage.setItem("emperor_payment_notice_seen","true"),r(!0),setTimeout(()=>{t(!1),r(!1)},300)};if(!e)return null;const d=be(),l=ye();return a.jsxs("div",{id:"emperor-payment-notice-backdrop",style:{position:"fixed",inset:0,zIndex:999998,backgroundColor:"rgba(3, 8, 18, 0.85)",backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",display:"flex",alignItems:"center",justifyContent:"center",padding:"16px",opacity:n?0:1,transition:"opacity 0.3s ease",direction:i?"rtl":"ltr",fontFamily:"var(--font-cairo, Cairo, sans-serif)"},onClick:c=>{c.target===c.currentTarget&&s()},children:[a.jsx("style",{children:`
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
            `}),a.jsxs("div",{className:"emperor-payment-notice-card",style:{position:"relative",width:"100%",maxWidth:"430px",borderRadius:"28px",padding:"2px",overflow:"hidden",background:"transparent",boxShadow:"0 25px 70px rgba(0, 0, 0, 0.95), 0 0 40px rgba(245, 208, 97, 0.2)",animation:n?"none":"emperorNoticePop 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",transform:n?"scale(0.92) translateY(15px)":"none",transition:"transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)"},children:[a.jsx("div",{style:{position:"absolute",top:"-50%",left:"-50%",width:"200%",height:"200%",background:"conic-gradient(from 0deg, transparent 0deg, #F5D061 55deg, #F59E0B 120deg, transparent 180deg, #38BDF8 240deg, #F5D061 310deg, transparent 360deg)",animation:"emperorRainbowSpin 6s linear infinite",zIndex:0}}),a.jsxs("div",{style:{position:"relative",zIndex:1,width:"100%",height:"100%",borderRadius:"26px",background:"linear-gradient(175deg, #181109 0%, #0d121c 30%, #050811 100%)",padding:"24px 22px 22px",overflow:"hidden",display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center"},children:[a.jsx("div",{style:{position:"absolute",top:"-90px",left:"50%",transform:"translateX(-50%)",width:"280px",height:"200px",borderRadius:"50%",background:"radial-gradient(circle, rgba(245, 158, 11, 0.38) 0%, rgba(245, 208, 97, 0.2) 45%, transparent 75%)",filter:"blur(35px)",pointerEvents:"none"}}),a.jsx("div",{style:{position:"absolute",top:"55px",left:"40px",width:"4px",height:"4px",borderRadius:"50%",background:"#F5D061",boxShadow:"0 0 10px #F5D061",animation:"emperorParticleDrift 3.2s infinite ease-in-out"}}),a.jsx("div",{style:{position:"absolute",top:"75px",left:"90px",width:"3px",height:"3px",borderRadius:"50%",background:"#F59E0B",boxShadow:"0 0 8px #F59E0B",animation:"emperorParticleDrift 2.7s infinite ease-in-out 0.4s"}}),a.jsx("div",{style:{position:"absolute",top:"60px",right:"50px",width:"4px",height:"4px",borderRadius:"50%",background:"#F5D061",boxShadow:"0 0 10px #F5D061",animation:"emperorParticleDrift 3.6s infinite ease-in-out 0.9s"}}),a.jsx("div",{style:{position:"absolute",top:"80px",right:"95px",width:"3px",height:"3px",borderRadius:"50%",background:"#FBBF24",boxShadow:"0 0 8px #FBBF24",animation:"emperorParticleDrift 3s infinite ease-in-out 1.2s"}}),a.jsx("button",{onClick:s,title:"إغلاق",style:{position:"absolute",top:"18px",left:"18px",width:"36px",height:"36px",borderRadius:"50%",background:"rgba(255, 255, 255, 0.08)",border:"1px solid rgba(255, 255, 255, 0.18)",display:"flex",alignItems:"center",justifyContent:"center",color:"#E2E8F0",cursor:"pointer",transition:"all 0.2s ease",outline:"none",zIndex:10},onMouseEnter:c=>{c.currentTarget.style.background="rgba(239, 68, 68, 0.25)",c.currentTarget.style.borderColor="#ef4444",c.currentTarget.style.color="#ef4444",c.currentTarget.style.transform="scale(1.08)"},onMouseLeave:c=>{c.currentTarget.style.background="rgba(255, 255, 255, 0.08)",c.currentTarget.style.borderColor="rgba(255, 255, 255, 0.18)",c.currentTarget.style.color="#E2E8F0",c.currentTarget.style.transform="scale(1)"},children:a.jsx(Ge,{size:17})}),a.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",marginBottom:"18px",marginTop:"4px"},children:[a.jsx("img",{src:l,alt:d,style:{width:"22px",height:"22px",objectFit:"contain",filter:"drop-shadow(0 0 8px rgba(245, 208, 97, 0.5))"}}),a.jsx("span",{style:{fontSize:"13px",fontWeight:"900",color:"#F5D061",letterSpacing:"0.6px",textShadow:"0 0 12px rgba(245, 208, 97, 0.4)"},children:d})]}),a.jsx("div",{style:{width:"56px",height:"56px",borderRadius:"50%",background:"radial-gradient(circle, rgba(245, 208, 97, 0.22) 0%, rgba(212, 165, 55, 0.08) 70%)",border:"1.5px solid #F5D061",display:"flex",alignItems:"center",justifyContent:"center",color:"#F5D061",marginBottom:"14px",animation:"emperorNoticeGlowPulse 2.8s infinite ease-in-out"},children:a.jsx(Mn,{size:28,color:"#F5D061"})}),a.jsx("h2",{style:{margin:"0 0 18px",fontSize:"22px",fontWeight:"900",color:"#FFF8E7",textShadow:"0 2px 10px rgba(0, 0, 0, 0.8), 0 0 25px rgba(245, 208, 97, 0.4)",letterSpacing:"0.2px"},children:o("paymentNoticeTitle","تنبيه قبل الدفع")}),a.jsxs("div",{style:{width:"100%",display:"flex",flexDirection:i?"row-reverse":"row",alignItems:"center",justifyContent:"space-between",gap:"12px",padding:"14px 16px",borderRadius:"16px",background:"rgba(28, 20, 10, 0.85)",border:"1.2px solid rgba(245, 208, 97, 0.35)",marginBottom:"12px",boxShadow:"0 6px 20px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(245, 208, 97, 0.15)"},children:[a.jsx("span",{style:{fontSize:"13.5px",fontWeight:"800",color:"#FDE68A",lineHeight:"1.45",textAlign:i?"right":"left",flex:1},children:o("paymentNotice1","المنتجات الرقمية لا تُسترد بعد تأكيد التحويل.")}),a.jsx("div",{style:{width:"30px",height:"30px",borderRadius:"50%",background:"rgba(245, 208, 97, 0.18)",border:"1.2px solid rgba(245, 208, 97, 0.65)",display:"flex",alignItems:"center",justifyContent:"center",color:"#F5D061",flexShrink:0,boxShadow:"0 0 10px rgba(245, 208, 97, 0.3)"},children:a.jsx(dt,{size:16})})]}),a.jsxs("div",{style:{width:"100%",display:"flex",flexDirection:i?"row-reverse":"row",alignItems:"center",justifyContent:"space-between",gap:"12px",padding:"14px 16px",borderRadius:"16px",background:"rgba(28, 20, 10, 0.85)",border:"1.2px solid rgba(245, 208, 97, 0.35)",marginBottom:"22px",boxShadow:"0 6px 20px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(245, 208, 97, 0.15)"},children:[a.jsx("span",{style:{fontSize:"13.5px",fontWeight:"800",color:"#FDE68A",lineHeight:"1.45",textAlign:i?"right":"left",flex:1},children:o("paymentNotice2","راجع تفاصيل طلبك جيدًا قبل الدفع.")}),a.jsx("div",{style:{width:"30px",height:"30px",borderRadius:"50%",background:"rgba(245, 208, 97, 0.18)",border:"1.2px solid rgba(245, 208, 97, 0.65)",display:"flex",alignItems:"center",justifyContent:"center",color:"#F5D061",flexShrink:0,boxShadow:"0 0 10px rgba(245, 208, 97, 0.3)"},children:a.jsx(dt,{size:16})})]}),a.jsxs("button",{onClick:s,style:{width:"100%",padding:"14px 22px",borderRadius:"15px",background:"linear-gradient(135deg, #F59E0B 0%, #D97706 50%, #B45309 100%)",border:"1px solid rgba(253, 230, 138, 0.35)",color:"#FFFFFF",fontSize:"16px",fontWeight:"900",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",cursor:"pointer",boxShadow:"0 10px 28px rgba(217, 119, 6, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.25)",transition:"all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",outline:"none"},onMouseEnter:c=>{c.currentTarget.style.transform="scale(1.02)",c.currentTarget.style.boxShadow="0 12px 34px rgba(217, 119, 6, 0.75), inset 0 1px 0 rgba(255, 255, 255, 0.35)",c.currentTarget.style.background="linear-gradient(135deg, #FBBF24 0%, #EA580C 100%)"},onMouseLeave:c=>{c.currentTarget.style.transform="scale(1)",c.currentTarget.style.boxShadow="0 10px 28px rgba(217, 119, 6, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.25)",c.currentTarget.style.background="linear-gradient(135deg, #F59E0B 0%, #D97706 50%, #B45309 100%)"},children:[a.jsx("span",{children:o("continue","متابعة")}),a.jsx(Qn,{size:19,strokeWidth:3})]})]})]})]})}function va(){const{isRtl:e}=le(),{theme:t}=xe(),n=t==="light",[r,i]=b.useState([]),[o,s]=b.useState(0),[d,l]=b.useState(!1),c=[{id:"banner-vf-cash",title:"إيداع فودافون كاش أوتوماتيك خلال 0 ثانية",link:"/deposit",isExternal:!1,image:"/images/banners/banner_vodafone_cash.jpg"},{id:"banner-chat-apps",title:"أقل سعر في مصر لبرامج الدردشة الصوتية",link:"/category/apps",isExternal:!1,image:"/images/banners/banner_chat_apps.jpg"},{id:"banner-whatsapp-channel",title:"انضم إلى مجتمعنا على واتساب",link:"https://whatsapp.com/channel/0029Vb97YHSB4hdZjFJysw14",isExternal:!0,image:"/images/banners/whatsapp_channel_banner.jpg"}];b.useEffect(()=>{Mt.getBanners().then(h=>{const E=Array.isArray(h==null?void 0:h.data)?h.data:Array.isArray(h)?h:[];if(E.length>0){const L=E.map(A=>{const Te=A.link&&(A.link.startsWith("http://")||A.link.startsWith("https://")),R=A.image_url||A.image;let ne="/images/banners/banner_vodafone_cash.jpg";return R&&typeof R=="string"&&(R.startsWith("http://")||R.startsWith("https://")||R.startsWith("/")?ne=R:ne="/storage/"+R),{id:A.id,title:A.title||"سند ومهره كارد للشحن الرقمي",link:A.link||"/category/games",isExternal:!!Te,image:ne}});i(L)}else i(c)}).catch(()=>{i(c)})},[]);const p=r.length>0?r:c,[v,I]=b.useState(null),[k,D]=b.useState(null),u=40,g=h=>{D(null),I(h.targetTouches[0].clientX)},x=h=>{D(h.targetTouches[0].clientX)},S=()=>{if(!v||!k)return;const h=v-k;Math.abs(h)<u||(h>u?e?N():T():h<-u&&(e?T():N()))};b.useEffect(()=>{if(p.length<=1||d)return;const h=setInterval(()=>{s(E=>(E+1)%p.length)},6e3);return()=>clearInterval(h)},[p.length,d]);const N=h=>{s(E=>E===0?p.length-1:E-1)},T=h=>{s(E=>(E+1)%p.length)},y=p[o]||p[0];return a.jsxs("div",{className:"emperor-global-banner-container",style:{width:"100%",maxWidth:"1100px",margin:"0 auto",padding:"16px 0 24px",boxSizing:"border-box"},onMouseEnter:()=>l(!0),onMouseLeave:()=>l(!1),onTouchStart:g,onTouchMove:x,onTouchEnd:S,children:[a.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",background:"rgba(16, 185, 129, 0.08)",border:"1px solid rgba(16, 185, 129, 0.35)",borderRadius:"16px",padding:"10px 18px",marginBottom:"18px",width:"100%",boxSizing:"border-box",gap:"10px"},children:[a.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px",minWidth:0},children:[a.jsx("span",{style:{color:"#10B981",display:"flex",alignItems:"center",flexShrink:0},children:a.jsx($t,{size:18})}),a.jsx("span",{style:{fontSize:"13px",fontWeight:"700",color:"#E2E8F0",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"},children:"حماية إضافية لحسابك: فعّل المصادقة الثنائية في أقل من دقيقة."})]}),a.jsx(j,{to:"/account-security",style:{background:"rgba(16, 185, 129, 0.18)",border:"1px solid rgba(16, 185, 129, 0.5)",borderRadius:"10px",padding:"4px 12px",color:"#34D399",textDecoration:"none",fontSize:"12px",fontWeight:"800",whiteSpace:"nowrap",flexShrink:0},children:"تفعيل الحماية ↗"})]}),a.jsxs("div",{className:"emperor-hero-slider",style:{position:"relative",borderRadius:"26px",overflow:"hidden",border:n?"1.8px solid rgba(212, 165, 55, 0.35)":"1.8px solid rgba(212, 165, 55, 0.45)",background:n?"#FFFFFF":"#0B0B0F",boxShadow:n?"0 0 20px rgba(212, 165, 55, 0.2)":"0 14px 40px rgba(0, 0, 0, 0.85), 0 0 28px rgba(212, 165, 55, 0.18)",aspectRatio:"2.85 / 1",maxHeight:"260px",height:"clamp(130px, 22vw, 260px)",width:"100%",minHeight:"130px",display:"flex",alignItems:"center",justifyContent:"center",cursor:y!=null&&y.link?"pointer":"default",transition:"all 0.3s ease",userSelect:"none",touchAction:"pan-y",boxSizing:"border-box"},children:[y!=null&&y.link?y.isExternal?a.jsxs("a",{href:y.link,target:"_blank",rel:"noopener noreferrer",style:{display:"block",width:"100%",height:"100%",textDecoration:"none"},children:[y.image&&a.jsx("img",{src:y.image,alt:y.title||"إعلان سند ومهره كارد",className:"emperor-slider-kenburns",onError:h=>{h.currentTarget.onerror=null,h.currentTarget.src=c[0].image},style:{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center",display:"block"}},`banner-img-${o}-${y.id}`),a.jsx("div",{className:"emperor-slider-shimmer"})]}):a.jsxs(j,{to:y.link,style:{display:"block",width:"100%",height:"100%",textDecoration:"none"},children:[y.image&&a.jsx("img",{src:y.image,alt:y.title||"إعلان سند ومهره كارد",className:"emperor-slider-kenburns",onError:h=>{h.currentTarget.onerror=null,h.currentTarget.src=c[0].image},style:{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center",display:"block"}},`banner-img-${o}-${y.id}`),a.jsx("div",{className:"emperor-slider-shimmer"})]}):a.jsxs("div",{style:{display:"block",width:"100%",height:"100%"},children:[(y==null?void 0:y.image)&&a.jsx("img",{src:y.image,alt:y.title||"إعلان سند ومهره كارد",className:"emperor-slider-kenburns",onError:h=>{h.currentTarget.onerror=null,h.currentTarget.src=c[0].image},style:{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center",display:"block"}},`banner-img-${o}-${y.id}`),a.jsx("div",{className:"emperor-slider-shimmer"})]}),p.length>1&&a.jsx("div",{style:{position:"absolute",bottom:"12px",left:"50%",transform:"translateX(-50%)",display:"flex",alignItems:"center",gap:"6px",zIndex:4,background:"rgba(0, 0, 0, 0.65)",padding:"4px 12px",borderRadius:"20px",backdropFilter:"blur(8px)",WebkitBackdropFilter:"blur(8px)",border:"1px solid rgba(212, 165, 55, 0.3)"},children:p.map((h,E)=>a.jsx("button",{onClick:L=>{L.preventDefault(),L.stopPropagation(),s(E)},"aria-label":`Go to slide ${E+1}`,style:{width:E===o?"22px":"6px",height:"6px",borderRadius:"3px",background:E===o?"linear-gradient(90deg, #F5D061 0%, #D4A537 100%)":"rgba(255, 255, 255, 0.35)",border:"none",cursor:"pointer",padding:0,transition:"all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"}},E))}),p.length>1&&!d&&a.jsx("div",{className:"emperor-slider-progress",style:{position:"absolute",bottom:0,left:0,height:"2.5px",background:"linear-gradient(90deg, #D4A537 0%, #F5D061 100%)",boxShadow:"0 0 6px rgba(212, 165, 55, 0.8)",zIndex:5}},`prog-${o}`)]}),a.jsxs("div",{style:{textAlign:"center",marginTop:"14px",padding:"0 8px",fontSize:"clamp(11.5px, 2.5vw, 15px)",fontWeight:"800",color:n?"#78350F":"#F5D061",fontFamily:"var(--font-cairo)",letterSpacing:"0.2px",lineHeight:"1.6",boxSizing:"border-box",textShadow:n?"none":"0 2px 10px rgba(0,0,0,0.85), 0 0 14px rgba(212, 165, 55, 0.3)"},children:[a.jsx("span",{style:{color:n?"#78350F":"#E6C665"},children:"بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ"}),a.jsxs("span",{style:{color:n?"#92400E":"#FFE57F",fontWeight:"900",margin:"0 4px"},children:["{","وَأَحَلَّ اللَّهُ الْبَيْعَ وَحَرَّمَ الرِّبَا","}"]}),a.jsx("span",{style:{color:n?"#78350F":"#E6C665"},children:"صَدَقَ اللَّهُ الْعَظِيمُ"})]}),a.jsx("style",{children:`
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
            `})]})}function Sa(){const[e,t]=b.useState(null),[n,r]=b.useState(!1),[i,o]=b.useState(!1),s=Pt();b.useEffect(()=>{let p=!0;return Mt.getBanners({type:"popup"}).then(v=>{if(!p)return;const I=Array.isArray(v==null?void 0:v.data)?v.data:Array.isArray(v)?v:[];if(I.length>0){const k=I[0],D=`emperor_popup_dismissed_${k.id}`;if(!(sessionStorage.getItem(D)||localStorage.getItem(D))){t(k);const g=setTimeout(()=>{p&&r(!0)},700);return()=>clearTimeout(g)}}}).catch(v=>{console.warn("Failed to load promotional popup:",v)}),()=>{p=!1}},[]);const d=()=>{if(!e)return;const p=`emperor_popup_dismissed_${e.id}`;i?localStorage.setItem(p,"true"):sessionStorage.setItem(p,"true"),r(!1)},l=()=>{if(!e||(d(),!e.link))return;e.link.startsWith("http://")||e.link.startsWith("https://")?window.open(e.link,"_blank","noopener,noreferrer"):s(e.link)};if(!n||!e)return null;const c=e.image_url||e.image;return a.jsx("div",{className:"promotional-popup-backdrop",style:{position:"fixed",inset:0,zIndex:99999,backgroundColor:"rgba(5, 5, 8, 0.82)",backdropFilter:"blur(8px)",WebkitBackdropFilter:"blur(8px)",display:"flex",alignItems:"center",justifyContent:"center",padding:"16px",animation:"fadeIn 0.25s ease-out"},onClick:p=>{p.target===p.currentTarget&&d()},children:a.jsxs("div",{className:"promotional-popup-dialog",style:{position:"relative",width:"100%",maxWidth:"460px",borderRadius:"22px",background:"linear-gradient(180deg, rgba(24, 24, 34, 0.98) 0%, rgba(12, 12, 18, 0.99) 100%)",border:"1.5px solid rgba(212, 165, 55, 0.55)",boxShadow:"0 25px 60px rgba(0, 0, 0, 0.9), 0 0 35px rgba(212, 165, 55, 0.25)",overflow:"hidden",display:"flex",flexDirection:"column",animation:"scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)",direction:"rtl"},children:[a.jsx("div",{style:{height:"3px",width:"100%",background:"linear-gradient(90deg, transparent 0%, #D4A537 50%, transparent 100%)"}}),a.jsx("button",{onClick:d,title:"إغلاق النافذة",style:{position:"absolute",top:"12px",left:"12px",zIndex:10,width:"32px",height:"32px",borderRadius:"50%",background:"rgba(0, 0, 0, 0.65)",border:"1px solid rgba(212, 165, 55, 0.35)",color:"#F5D061",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",transition:"all 0.2s ease"},onMouseEnter:p=>{p.currentTarget.style.transform="scale(1.1)",p.currentTarget.style.backgroundColor="rgba(212, 165, 55, 0.2)"},onMouseLeave:p=>{p.currentTarget.style.transform="scale(1)",p.currentTarget.style.backgroundColor="rgba(0, 0, 0, 0.65)"},children:a.jsx(Ge,{size:16})}),c&&a.jsxs("div",{style:{position:"relative",width:"100%",height:"210px",background:"#09090D",overflow:"hidden",borderBottom:"1px solid rgba(212, 165, 55, 0.2)"},children:[a.jsx("img",{src:c,alt:e.title,style:{width:"100%",height:"100%",objectFit:"cover",transition:"transform 0.5s ease"}}),a.jsx("div",{style:{position:"absolute",inset:0,background:"linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(12,12,18,0.9) 100%)"}})]}),a.jsxs("div",{style:{padding:c?"18px 22px 20px":"28px 22px 20px",textAlign:"center"},children:[a.jsxs("div",{style:{display:"inline-flex",alignItems:"center",gap:"6px",padding:"4px 12px",borderRadius:"20px",background:"rgba(212, 165, 55, 0.15)",border:"1px solid rgba(212, 165, 55, 0.35)",color:"#F5D061",fontSize:"11px",fontWeight:"800",marginBottom:"12px"},children:[a.jsx(Hn,{size:13,color:"#F5D061"}),a.jsx("span",{children:"إعلان مميز من سند ومهره كارد"})]}),a.jsx("h3",{style:{fontSize:"19px",fontWeight:"900",color:"#FFFFFF",margin:"0 0 8px",lineHeight:1.35},children:e.title}),e.subtitle&&a.jsx("p",{style:{fontSize:"13px",color:"#A0A0B0",lineHeight:1.6,margin:"0 0 20px"},children:e.subtitle}),a.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"10px",marginTop:"16px"},children:[e.link&&a.jsxs("button",{onClick:l,style:{width:"100%",padding:"12px 18px",borderRadius:"13px",background:"linear-gradient(135deg, #F5D061 0%, #D4A537 100%)",border:"none",color:"#070709",fontSize:"14.5px",fontWeight:"900",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",boxShadow:"0 4px 18px rgba(212, 165, 55, 0.35)",transition:"all 0.2s ease"},onMouseEnter:p=>{p.currentTarget.style.transform="translateY(-2px)",p.currentTarget.style.boxShadow="0 6px 24px rgba(212, 165, 55, 0.55)"},onMouseLeave:p=>{p.currentTarget.style.transform="translateY(0)",p.currentTarget.style.boxShadow="0 4px 18px rgba(212, 165, 55, 0.35)"},children:[a.jsx("span",{children:"عرض التفاصيل الآن"}),a.jsx(er,{size:16})]}),a.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:"8px",paddingTop:"10px",borderTop:"1px solid rgba(255, 255, 255, 0.06)",fontSize:"12px",color:"#7E7E8E"},children:[a.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"6px",cursor:"pointer"},children:[a.jsx("input",{type:"checkbox",checked:i,onChange:p=>o(p.target.checked),style:{accentColor:"#D4A537",cursor:"pointer"}}),a.jsx("span",{children:"عدم الإظهار مجدداً"})]}),a.jsx("button",{onClick:d,style:{background:"transparent",border:"none",color:"#8E8E98",cursor:"pointer",fontSize:"12px",fontWeight:"700",padding:"4px"},onMouseEnter:p=>p.currentTarget.style.color="#F5D061",onMouseLeave:p=>p.currentTarget.style.color="#8E8E98",children:"إغلاق"})]})]})]})]})})}let X=null;const jn=()=>{if(!X){const e=window.AudioContext||window.webkitAudioContext;e&&(X=new e)}return X&&X.state==="suspended"&&X.resume().catch(()=>{}),X};if(typeof window<"u"){const e=()=>{const t=jn();t&&t.state==="suspended"&&t.resume().catch(()=>{}),window.removeEventListener("click",e),window.removeEventListener("keydown",e),window.removeEventListener("touchstart",e)};window.addEventListener("click",e,{once:!0}),window.addEventListener("keydown",e,{once:!0}),window.addEventListener("touchstart",e,{once:!0})}const Ot=(e="default")=>{try{const t=jn();if(!t)return;const n=t.currentTime,r=(i,o,s,d=.15)=>{const l=t.createOscillator(),c=t.createGain();l.type="sine",l.frequency.setValueAtTime(i,o),c.gain.setValueAtTime(.001,o),c.gain.exponentialRampToValueAtTime(d,o+.03),c.gain.exponentialRampToValueAtTime(1e-4,o+s),l.connect(c),c.connect(t.destination),l.start(o),l.stop(o+s)};e==="success"?(r(880,n,.25,.18),r(1174.66,n+.1,.35,.2),r(1760,n+.2,.45,.22)):e==="warning"?(r(784,n,.2,.15),r(659.25,n+.12,.3,.15)):(r(1046.5,n,.28,.18),r(1318.51,n+.08,.32,.2),r(1567.98,n+.18,.5,.22))}catch{}};function qa({children:e,showBanner:t=!1}){var it,ot;const{user:n,isAuthenticated:r}=Pn(),{theme:i,toggleTheme:o}=xe(),{language:s,switchLanguage:d,t:l,isRtl:c}=le(),{addToast:p}=$n(),v=Ln();Pt();const[I,k]=b.useState(!1),[D,u]=b.useState(!1),[g,x]=b.useState(0),[S,N]=b.useState(!1),[T,y]=b.useState(null);b.useEffect(()=>{if(!r){y(null);return}zn.getBalance().then(f=>{var C;return y(((C=f==null?void 0:f.data)==null?void 0:C.data)||(f==null?void 0:f.data)||f||null)}).catch(()=>{})},[r,n==null?void 0:n.currency]),b.useEffect(()=>{const f=()=>u(!0);return window.addEventListener("emperor:open-support-modal",f),()=>window.removeEventListener("emperor:open-support-modal",f)},[]),b.useEffect(()=>{const f=()=>N(window.scrollY>20);return window.addEventListener("scroll",f,{passive:!0}),()=>window.removeEventListener("scroll",f)},[]),b.useEffect(()=>{if(!r){x(0);return}let f=!0;const C=new Set;let at=!0,pe=null;const ue=async()=>{var O;try{const H=await Wn.checkLatest();if(!f||!((O=H==null?void 0:H.data)!=null&&O.data))return;const{unread_count:U,notifications:re}=H.data.data,ie=Array.isArray(re)?re:[];if(typeof U=="number"){if(x(U),at){ie.forEach(F=>C.add(F.id)),pe=U,at=!1;return}const oe=ie.filter(F=>!C.has(F.id));(oe.length>0||pe!==null&&U>pe)&&(Ot("default"),oe.forEach(F=>{C.add(F.id);const Rn=F.title||"إشعار جديد",On=F.body?` - ${F.body}`:"";p(`${Rn}${On}`,"info"),window.dispatchEvent(new CustomEvent("emperor:new-notification",{detail:F}))}),window.dispatchEvent(new CustomEvent("emperor:refresh-notifications"))),pe=U}}catch{}};ue();const Nn=setInterval(()=>{document.visibilityState==="visible"&&ue()},15e3),fe=()=>{document.visibilityState==="visible"&&ue()};window.addEventListener("focus",fe),document.addEventListener("visibilitychange",fe);let Fe=null;return ba(O=>{var re,ie,oe,F;const H=((re=O.notification)==null?void 0:re.title)||((ie=O.data)==null?void 0:ie.title)||"إشعار جديد",U=((oe=O.notification)==null?void 0:oe.body)||((F=O.data)==null?void 0:F.body)||"";Ot("default"),p(`${H}: ${U}`,"info"),ue()}).then(O=>{Fe=O}),()=>{f=!1,clearInterval(Nn),window.removeEventListener("focus",fe),document.removeEventListener("visibilitychange",fe),typeof Fe=="function"&&Fe()}},[r,p]);const h=f=>!f||typeof f!="string"||f.startsWith("#")?!1:!!(f==="/"&&v.pathname==="/"||f!=="/"&&v.pathname.startsWith(f)),E=(T==null?void 0:T.preferred_balance)??((it=n==null?void 0:n.wallet)==null?void 0:it.balance)??(n==null?void 0:n.wallet_balance)??0,L=Number(E||0),A=E!==void 0?L%1===0?L.toLocaleString("en-US",{maximumFractionDigits:0}):L.toLocaleString("en-US",{minimumFractionDigits:1,maximumFractionDigits:2}):"0",Te=(n==null?void 0:n.currency)||(T==null?void 0:T.preferred_currency)||((ot=n==null?void 0:n.wallet)==null?void 0:ot.currency)||"EGP",R=Un(Te,s),ne=[{to:"/",label:l("home","الرئيسية"),icon:st},{to:"#whatsapp-channel",href:ct(),label:l("whatsappChannel","قناة الواتساب"),icon:$e,isExternal:!0,badge:s==="en"?"Updates":"تحديثات"},{to:"/target/apps",label:l("targetSelling","بيع التارجت"),icon:tr,badge:s==="en"?"Instant Cash":"كاش فوري",isSpecial:!0},{to:"/deposit",label:l("chargeWallet","شحن المحفظة"),icon:De},{to:"/orders",label:l("myOrders","طلباتي"),icon:Vn,authRequired:!0},{to:"/account-issues",label:l("support","الشكاوى"),icon:Zn}],de=i==="light";return a.jsxs("div",{style:{minHeight:"100vh",display:"flex",flexDirection:"column",backgroundColor:de?"var(--bg-main)":"#070709",color:de?"var(--text-primary)":"#FFFFFF",fontFamily:"var(--font-cairo)",direction:c?"rtl":"ltr"},children:[a.jsx("header",{className:"emperor-header",style:{position:"sticky",top:0,zIndex:1e3,transition:"all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",width:"100%",padding:0},children:a.jsxs("div",{className:"emperor-navbar-container",style:{background:de?S?"rgba(255, 255, 255, 0.96)":"rgba(240, 247, 255, 0.94)":S?"rgba(5, 12, 24, 0.98)":"rgba(6, 15, 30, 0.94)",backdropFilter:"blur(20px) saturate(1.8)",WebkitBackdropFilter:"blur(20px) saturate(1.8)",borderBottom:"1.5px solid rgba(56, 189, 248, 0.35)",boxShadow:de?"0 10px 30px rgba(15, 23, 42, 0.08)":"0 10px 35px rgba(0, 0, 0, 0.8), 0 0 25px rgba(0, 130, 255, 0.12)"},children:[a.jsx("div",{style:{display:"flex",alignItems:"center",gap:"14px",minWidth:0,flexShrink:0},children:a.jsxs(j,{to:"/",style:{display:"flex",alignItems:"center",gap:"10px",textDecoration:"none",minWidth:0,flexShrink:0},children:[a.jsx("div",{className:"header-logo-icon",style:{width:"44px",height:"44px",borderRadius:"12px",overflow:"hidden",border:"1.5px solid rgba(56, 189, 248, 0.45)",boxShadow:"0 0 15px rgba(56, 189, 248, 0.35)",flexShrink:0,background:"#071325",display:"flex",alignItems:"center",justifyContent:"center"},children:a.jsx("img",{src:ye(),alt:be(),style:{width:"100%",height:"100%",objectFit:"contain"},onError:f=>{f.currentTarget.style.display="none",f.currentTarget.parentNode.innerHTML='<span style="color:#F5D061;font-size:22px;font-weight:900;">👑</span>'}})}),a.jsxs("div",{style:{display:"flex",flexDirection:"column",minWidth:0},children:[a.jsx("span",{className:"brand-title",style:{fontSize:"19px",fontWeight:"900",color:"#F5D061",letterSpacing:"0.3px",lineHeight:1.15,whiteSpace:"nowrap",textShadow:"0 2px 10px rgba(0,0,0,0.6), 0 0 15px rgba(245, 208, 97, 0.35)"},children:be()}),a.jsx("span",{className:"brand-subtitle",style:{fontSize:"10px",fontWeight:"800",color:"#38BDF8",letterSpacing:"0.2px",whiteSpace:"nowrap"},children:Yn()})]})]})}),a.jsx("nav",{className:"desktop-nav-links",style:{display:"flex",alignItems:"center",gap:"6px",justifyContent:"center",flex:1,margin:"0 16px"},children:ne.map(f=>{if(f.authRequired&&!r)return null;const C=!f.isModalTrigger&&!f.isExternal&&h(f.to);return f.isExternal?a.jsxs("a",{href:f.href,target:"_blank",rel:"noopener noreferrer",className:"nav-link-item",style:{display:"flex",alignItems:"center",gap:"5px",padding:"7px 14px",borderRadius:"10px",textDecoration:"none",fontSize:"13.5px",fontWeight:"800",color:"#22c55e",background:"rgba(34, 197, 94, 0.08)",border:"1px solid rgba(34, 197, 94, 0.25)",transition:"all 0.2s",whiteSpace:"nowrap"},children:[a.jsx(f.icon,{size:15,color:"#22c55e"}),a.jsx("span",{children:f.label})]},f.label):a.jsxs(j,{to:f.to,className:"nav-link-item",style:{display:"flex",alignItems:"center",gap:"5px",padding:"7px 15px",borderRadius:"10px",textDecoration:"none",fontSize:"13.5px",fontWeight:C?"900":"800",color:C?"#38BDF8":"#F5D061",background:C?"rgba(14, 165, 233, 0.15)":"transparent",border:C?"1px solid rgba(56, 189, 248, 0.45)":"1px solid transparent",boxShadow:C?"0 0 15px rgba(56, 189, 248, 0.2)":"none",transition:"all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",whiteSpace:"nowrap"},children:[a.jsx(f.icon,{size:15,color:C?"#38BDF8":"#F5D061"}),a.jsx("span",{children:f.label})]},f.to)})}),a.jsxs("div",{className:"header-actions",children:[r?a.jsxs(a.Fragment,{children:[a.jsxs(j,{to:"/deposit",className:"header-wallet-badge",title:l("walletBalance","رصيد المحفظة"),children:[a.jsx(De,{size:14,color:"#38BDF8",style:{flexShrink:0}}),a.jsx("span",{className:"balance-num",children:A}),a.jsx("span",{className:"balance-curr",children:R})]}),a.jsxs(j,{to:"/notifications",className:"header-notif-btn",title:l("notifications","الإشعارات"),children:[a.jsx(nr,{size:17,color:"#F5D061"}),g>0&&a.jsx("span",{className:"notif-badge-dot",children:g>9?"9+":g})]})]}):a.jsxs(a.Fragment,{children:[a.jsx(j,{to:"/register",className:"header-register-btn",children:l("createAccount","إنشاء حساب")}),a.jsxs(j,{to:"/login",className:"header-login-btn",children:[a.jsx(lt,{size:15,color:"#38BDF8"}),a.jsx("span",{children:l("login","دخول")})]})]}),a.jsx("button",{onClick:()=>k(!0),title:l("mainMenu","القائمة الكاملة"),className:"header-hamburger-btn",children:a.jsx(Kn,{size:18})})]})]})}),a.jsx(ya,{}),a.jsx(wa,{}),a.jsx(qn,{isOpen:I,onClose:()=>k(!1),walletBalance:T}),a.jsx(xa,{isOpen:D,onClose:()=>u(!1)}),a.jsx(Sa,{}),a.jsx("main",{className:"emperor-main-layout-content",style:{flex:1,paddingBottom:"80px",width:"100%",overflowX:"hidden"},children:a.jsxs("div",{className:"emperor-main-container",children:[t&&a.jsx(va,{}),e]})}),a.jsxs("nav",{className:"emperor-bottom-nav mobile-bottom-bar",children:[a.jsx(he,{to:"/",icon:st,label:l("home","الرئيسية"),active:h("/")}),a.jsx(he,{href:ct(),icon:$e,label:l("whatsappChannel","الواتساب"),isExternal:!0,color:"#25D366"}),a.jsx(he,{to:"/target/apps",icon:Gn,label:l("targetSelling","التارجت"),active:h("/target/apps")}),a.jsx(he,{to:"/deposit",icon:De,label:l("chargeWallet","المحفظة"),active:h("/deposit")}),a.jsxs("button",{type:"button",onClick:()=>k(!0),className:`emperor-bottom-nav-item${I?" active":""}`,style:{outline:"none",border:"none",background:"transparent",color:I?"#F5D061":"#8E8E98",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"4px",cursor:"pointer",userSelect:"none",WebkitTapHighlightColor:"transparent"},children:[a.jsx(lt,{size:20,color:I?"#F5D061":"#8E8E98"}),a.jsx("span",{style:{fontSize:"11px",fontWeight:I?"800":"600",whiteSpace:"nowrap",lineHeight:1.1,fontFamily:"var(--font-cairo)"},children:r?l("myAccount","حسابي"):"دخول"})]})]}),a.jsx(ma,{})]})}function he({to:e,href:t,icon:n,label:r,active:i,isExternal:o,color:s}){return t||o?a.jsxs("a",{href:t,target:"_blank",rel:"noopener noreferrer",className:"emperor-bottom-nav-item",style:{textDecoration:"none",color:s||"#8E8E98",outline:"none",border:"none",background:"transparent",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"4px",userSelect:"none",WebkitTapHighlightColor:"transparent"},children:[a.jsx(n,{size:20,color:s||"#8E8E98"}),a.jsx("span",{style:{fontSize:"11px",fontWeight:"700",whiteSpace:"nowrap",lineHeight:1.1,fontFamily:"var(--font-cairo)",color:s||"#8E8E98"},children:r})]}):a.jsxs(j,{to:e,className:`emperor-bottom-nav-item${i?" active":""}`,style:{textDecoration:"none",color:i?"#F5D061":"#8E8E98",outline:"none",border:"none",background:"transparent",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"4px",userSelect:"none",WebkitTapHighlightColor:"transparent"},children:[a.jsx(n,{size:20,color:i?"#F5D061":"#8E8E98"}),a.jsx("span",{style:{fontSize:"11px",fontWeight:i?"800":"600",whiteSpace:"nowrap",lineHeight:1.1,fontFamily:"var(--font-cairo)"},children:r})]})}export{nr as B,dt as C,ur as D,we as E,ee as F,Cr as L,qa as M,Ka as S,Va as _,Xe as a,Ra as b,Na as c,Qt as d,Le as e,Oa as f,Yt as g,Pa as h,Ha as i,Ma as j,w as k,Kt as l,$a as m,La as n,sr as o,Ua as p,za as q,Ba as r,q as s,W as t,z as u,Wa as v,bi as w,Zt as x};
