import{c as jn,g as me,a as ce,j as o,L as j,r as g,X as qe,y as Nn,T as Rn,A as Bt,u as Ot,f as Bn,h as On,e as Mn,w as Pn,p as $n}from"./app-CN6dliQ0.js";import{h as Ln,g as zn,i as at,W as Fe,F as Wn,B as Hn,M as Un,j as Vn,T as Kn,p as st}from"./soundHelper-DtrbDW0y.js";import{a as ge,g as xe,b as ct,c as qn}from"./settingsHelper-fCg9HViL.js";import{E as Gn}from"./external-link-CYw7emg_.js";import{P as Yn}from"./phone-D11zLAgx.js";import{M as Pe,C as Jn}from"./message-circle-u-mSqYfF.js";import{S as Mt}from"./shield-check-i2qfazLm.js";import{C as Xn}from"./check-VHW7XCsr.js";import{A as Zn}from"./shield-wThWVaA3.js";import{T as Qn}from"./trending-up-HU75f9rk.js";import{U as lt}from"./user-B7wwgZxW.js";/**
 * @license lucide-react v1.47.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pt={name:"circle-alert",size:24,node:[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]],aliases:["alert-circle"]};Pt.node;const dt=jn(Pt),er=()=>{};var pt={};/**
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
 */const $t=function(e){const t=[];let n=0;for(let r=0;r<e.length;r++){let i=e.charCodeAt(r);i<128?t[n++]=i:i<2048?(t[n++]=i>>6|192,t[n++]=i&63|128):(i&64512)===55296&&r+1<e.length&&(e.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(e.charCodeAt(++r)&1023),t[n++]=i>>18|240,t[n++]=i>>12&63|128,t[n++]=i>>6&63|128,t[n++]=i&63|128):(t[n++]=i>>12|224,t[n++]=i>>6&63|128,t[n++]=i&63|128)}return t},tr=function(e){const t=[];let n=0,r=0;for(;n<e.length;){const i=e[n++];if(i<128)t[r++]=String.fromCharCode(i);else if(i>191&&i<224){const a=e[n++];t[r++]=String.fromCharCode((i&31)<<6|a&63)}else if(i>239&&i<365){const a=e[n++],s=e[n++],l=e[n++],d=((i&7)<<18|(a&63)<<12|(s&63)<<6|l&63)-65536;t[r++]=String.fromCharCode(55296+(d>>10)),t[r++]=String.fromCharCode(56320+(d&1023))}else{const a=e[n++],s=e[n++];t[r++]=String.fromCharCode((i&15)<<12|(a&63)<<6|s&63)}}return t.join("")},Lt={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(e,t){if(!Array.isArray(e))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<e.length;i+=3){const a=e[i],s=i+1<e.length,l=s?e[i+1]:0,d=i+2<e.length,c=d?e[i+2]:0,u=a>>2,S=(a&3)<<4|l>>4;let I=(l&15)<<2|c>>6,C=c&63;d||(C=64,s||(I=64)),r.push(n[u],n[S],n[I],n[C])}return r.join("")},encodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(e):this.encodeByteArray($t(e),t)},decodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(e):tr(this.decodeStringToByteArray(e,t))},decodeStringToByteArray(e,t){this.init_();const n=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<e.length;){const a=n[e.charAt(i++)],l=i<e.length?n[e.charAt(i)]:0;++i;const c=i<e.length?n[e.charAt(i)]:64;++i;const S=i<e.length?n[e.charAt(i)]:64;if(++i,a==null||l==null||c==null||S==null)throw new nr;const I=a<<2|l>>4;if(r.push(I),c!==64){const C=l<<4&240|c>>2;if(r.push(C),S!==64){const D=c<<6&192|S;r.push(D)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}};class nr extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const rr=function(e){const t=$t(e);return Lt.encodeByteArray(t,!0)},zt=function(e){return rr(e).replace(/\./g,"")},ir=function(e){try{return Lt.decodeString(e,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};/**
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
 */function or(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const ar=()=>or().__FIREBASE_DEFAULTS__,sr=()=>{if(typeof process>"u"||typeof pt>"u")return;const e=pt.__FIREBASE_DEFAULTS__;if(e)return JSON.parse(e)},cr=()=>{if(typeof document>"u")return;let e;try{e=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const t=e&&ir(e[1]);return t&&JSON.parse(t)},Ge=()=>{try{return er()||ar()||sr()||cr()}catch(e){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`);return}},Aa=e=>{var t,n;return(n=(t=Ge())==null?void 0:t.emulatorHosts)==null?void 0:n[e]},Wt=()=>{var e;return(e=Ge())==null?void 0:e.config},ja=e=>{var t;return(t=Ge())==null?void 0:t[`_${e}`]};/**
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
 */class lr{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((t,n)=>{this.resolve=t,this.reject=n})}wrapCallback(t){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof t=="function"&&(this.promise.catch(()=>{}),t.length===1?t(n):t(n,r))}}}/**
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
 */function Ht(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Na(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Ht())}function Ra(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Ba(){const e=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof e=="object"&&e.id!==void 0}function Oa(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Ma(){const e=Ht();return e.indexOf("MSIE ")>=0||e.indexOf("Trident/")>=0}function Ut(){try{return typeof indexedDB=="object"}catch{return!1}}function Vt(){return new Promise((e,t)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(r),e(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{var a;t(((a=i.error)==null?void 0:a.message)||"")}}catch(n){t(n)}})}function dr(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
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
 */const pr="FirebaseError";class Q extends Error{constructor(t,n,r){super(n),this.code=t,this.customData=r,this.name=pr,Object.setPrototypeOf(this,Q.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,ye.prototype.create)}}class ye{constructor(t,n,r){this.service=t,this.serviceName=n,this.errors=r}create(t,...n){const r=n[0]||{},i=`${this.service}/${t}`,a=this.errors[t],s=a?ur(a,r):"Error",l=`${this.serviceName}: ${s} (${i}).`;return new Q(i,l,r)}}function ur(e,t){try{let n=0,r="";for(;n<e.length;){const i=e.indexOf("{$",n);if(i===-1){r+=e.substring(n);break}const a=e.indexOf("}",i+2);if(a===-1){r+=e.substring(n);break}const s=e.substring(i+2,a),l=t[s];r+=e.substring(n,i)+(l!=null?String(l):`<${s}?>`),n=a+1}return r}catch{return e}}function Pa(e){for(const t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}function $e(e,t){if(e===t)return!0;const n=Object.keys(e),r=Object.keys(t);for(const i of n){if(!r.includes(i))return!1;const a=e[i],s=t[i];if(ut(a)&&ut(s)){if(!$e(a,s))return!1}else if(a!==s)return!1}for(const i of r)if(!n.includes(i))return!1;return!0}function ut(e){return e!==null&&typeof e=="object"}/**
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
 */function $a(e){const t=[];for(const[n,r]of Object.entries(e))Array.isArray(r)?r.forEach(i=>{t.push(encodeURIComponent(n)+"="+encodeURIComponent(i))}):t.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return t.length?"&"+t.join("&"):""}function La(e,t){const n=new fr(e,t);return n.subscribe.bind(n)}class fr{constructor(t,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{t(this)}).catch(r=>{this.error(r)})}next(t){this.forEachObserver(n=>{n.next(t)})}error(t){this.forEachObserver(n=>{n.error(t)}),this.close(t)}complete(){this.forEachObserver(t=>{t.complete()}),this.close()}subscribe(t,n,r){let i;if(t===void 0&&n===void 0&&r===void 0)throw new Error("Missing Observer.");hr(t,["next","error","complete"])?i=t:i={next:t,error:n,complete:r},i.next===void 0&&(i.next=De),i.error===void 0&&(i.error=De),i.complete===void 0&&(i.complete=De);const a=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),a}unsubscribeOne(t){this.observers===void 0||this.observers[t]===void 0||(delete this.observers[t],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(t){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,t)}sendOne(t,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[t]!==void 0)try{n(this.observers[t])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(t){this.finalized||(this.finalized=!0,t!==void 0&&(this.finalError=t),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function hr(e,t){if(typeof e!="object"||e===null)return!1;for(const n of t)if(n in e&&typeof e[n]=="function")return!0;return!1}function De(){}/**
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
 */function Kt(e){return e&&e._delegate?e._delegate:e}/**
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
 */function za(e){try{return(e.startsWith("http://")||e.startsWith("https://")?new URL(e).hostname:e).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Wa(e){return(await fetch(e,{credentials:"include"})).ok}class W{constructor(t,n,r){this.name=t,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}}/**
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
 */class gr{constructor(t,n){this.name=t,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){const n=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(n)){const r=new lr;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:n});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(t){const n=this.normalizeInstanceIdentifier(t==null?void 0:t.identifier),r=(t==null?void 0:t.optional)??!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(i){if(r)return null;throw i}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,!!this.shouldAutoInitialize()){if(mr(t))try{this.getOrInitializeService({instanceIdentifier:V})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(n);try{const a=this.getOrInitializeService({instanceIdentifier:i});r.resolve(a)}catch{}}}}clearInstance(t=V){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}async delete(){const t=Array.from(this.instances.values());await Promise.all([...t.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...t.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(t=V){return this.instances.has(t)}getOptions(t=V){return this.instancesOptions.get(t)||{}}initialize(t={}){const{options:n={}}=t,r=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[a,s]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(a);r===l&&s.resolve(i)}return i}onInit(t,n){const r=this.normalizeInstanceIdentifier(n),i=this.onInitCallbacks.get(r)??new Set;i.add(t),this.onInitCallbacks.set(r,i);const a=this.instances.get(r);return a&&t(a,r),()=>{i.delete(t)}}invokeOnInitCallbacks(t,n){const r=this.onInitCallbacks.get(n);if(r)for(const i of r)try{i(t,n)}catch{}}getOrInitializeService({instanceIdentifier:t,options:n={}}){let r=this.instances.get(t);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:br(t),options:n}),this.instances.set(t,r),this.instancesOptions.set(t,n),this.invokeOnInitCallbacks(r,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,r)}catch{}return r||null}normalizeInstanceIdentifier(t=V){return this.component?this.component.multipleInstances?t:V:t}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function br(e){return e===V?void 0:e}function mr(e){return e.instantiationMode==="EAGER"}/**
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
 */class xr{constructor(t){this.name=t,this.providers=new Map}addComponent(t){const n=this.getProvider(t.name);if(n.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);n.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);const n=new gr(t,this);return this.providers.set(t,n),n}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var w;(function(e){e[e.DEBUG=0]="DEBUG",e[e.VERBOSE=1]="VERBOSE",e[e.INFO=2]="INFO",e[e.WARN=3]="WARN",e[e.ERROR=4]="ERROR",e[e.SILENT=5]="SILENT"})(w||(w={}));const yr={debug:w.DEBUG,verbose:w.VERBOSE,info:w.INFO,warn:w.WARN,error:w.ERROR,silent:w.SILENT},wr=w.INFO,vr={[w.DEBUG]:"log",[w.VERBOSE]:"log",[w.INFO]:"info",[w.WARN]:"warn",[w.ERROR]:"error"},Sr=(e,t,...n)=>{if(t<e.logLevel)return;const r=new Date().toISOString(),i=vr[t];if(i)console[i](`[${r}]  ${e.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)};class Er{constructor(t){this.name=t,this._logLevel=wr,this._logHandler=Sr,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in w))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel=typeof t=="string"?yr[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if(typeof t!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,w.DEBUG,...t),this._logHandler(this,w.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,w.VERBOSE,...t),this._logHandler(this,w.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,w.INFO,...t),this._logHandler(this,w.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,w.WARN,...t),this._logHandler(this,w.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,w.ERROR,...t),this._logHandler(this,w.ERROR,...t)}}const Ir=(e,t)=>t.some(n=>e instanceof n);let ft,ht;function kr(){return ft||(ft=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Cr(){return ht||(ht=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const qt=new WeakMap,Le=new WeakMap,Gt=new WeakMap,_e=new WeakMap,Ye=new WeakMap;function Tr(e){const t=new Promise((n,r)=>{const i=()=>{e.removeEventListener("success",a),e.removeEventListener("error",s)},a=()=>{n(M(e.result)),i()},s=()=>{r(e.error),i()};e.addEventListener("success",a),e.addEventListener("error",s)});return t.then(n=>{n instanceof IDBCursor&&qt.set(n,e)}).catch(()=>{}),Ye.set(t,e),t}function Fr(e){if(Le.has(e))return;const t=new Promise((n,r)=>{const i=()=>{e.removeEventListener("complete",a),e.removeEventListener("error",s),e.removeEventListener("abort",s)},a=()=>{n(),i()},s=()=>{r(e.error||new DOMException("AbortError","AbortError")),i()};e.addEventListener("complete",a),e.addEventListener("error",s),e.addEventListener("abort",s)});Le.set(e,t)}let ze={get(e,t,n){if(e instanceof IDBTransaction){if(t==="done")return Le.get(e);if(t==="objectStoreNames")return e.objectStoreNames||Gt.get(e);if(t==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return M(e[t])},set(e,t,n){return e[t]=n,!0},has(e,t){return e instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in e}};function Dr(e){ze=e(ze)}function _r(e){return e===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(t,...n){const r=e.call(Ae(this),t,...n);return Gt.set(r,t.sort?t.sort():[t]),M(r)}:Cr().includes(e)?function(...t){return e.apply(Ae(this),t),M(qt.get(this))}:function(...t){return M(e.apply(Ae(this),t))}}function Ar(e){return typeof e=="function"?_r(e):(e instanceof IDBTransaction&&Fr(e),Ir(e,kr())?new Proxy(e,ze):e)}function M(e){if(e instanceof IDBRequest)return Tr(e);if(_e.has(e))return _e.get(e);const t=Ar(e);return t!==e&&(_e.set(e,t),Ye.set(t,e)),t}const Ae=e=>Ye.get(e);function we(e,t,{blocked:n,upgrade:r,blocking:i,terminated:a}={}){const s=indexedDB.open(e,t),l=M(s);return r&&s.addEventListener("upgradeneeded",d=>{r(M(s.result),d.oldVersion,d.newVersion,M(s.transaction),d)}),n&&s.addEventListener("blocked",d=>n(d.oldVersion,d.newVersion,d)),l.then(d=>{a&&d.addEventListener("close",()=>a()),i&&d.addEventListener("versionchange",c=>i(c.oldVersion,c.newVersion,c))}).catch(()=>{}),l}function he(e,{blocked:t}={}){const n=indexedDB.deleteDatabase(e);return t&&n.addEventListener("blocked",r=>t(r.oldVersion,r)),M(n).then(()=>{})}const jr=["get","getKey","getAll","getAllKeys","count"],Nr=["put","add","delete","clear"],je=new Map;function gt(e,t){if(!(e instanceof IDBDatabase&&!(t in e)&&typeof t=="string"))return;if(je.get(t))return je.get(t);const n=t.replace(/FromIndex$/,""),r=t!==n,i=Nr.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(i||jr.includes(n)))return;const a=async function(s,...l){const d=this.transaction(s,i?"readwrite":"readonly");let c=d.store;return r&&(c=c.index(l.shift())),(await Promise.all([c[n](...l),i&&d.done]))[0]};return je.set(t,a),a}Dr(e=>({...e,get:(t,n,r)=>gt(t,n)||e.get(t,n,r),has:(t,n)=>!!gt(t,n)||e.has(t,n)}));/**
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
 */class Rr{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(Br(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function Br(e){const t=e.getComponent();return(t==null?void 0:t.type)==="VERSION"}const We="@firebase/app",bt="0.16.2";/**
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
 */const $=new Er("@firebase/app"),Or="@firebase/app-compat",Mr="@firebase/analytics-compat",Pr="@firebase/analytics",$r="@firebase/app-check-compat",Lr="@firebase/app-check",zr="@firebase/auth",Wr="@firebase/auth-compat",Hr="@firebase/database",Ur="@firebase/data-connect",Vr="@firebase/database-compat",Kr="@firebase/functions",qr="@firebase/functions-compat",Gr="@firebase/installations",Yr="@firebase/installations-compat",Jr="@firebase/messaging",Xr="@firebase/messaging-compat",Zr="@firebase/performance",Qr="@firebase/performance-compat",ei="@firebase/remote-config",ti="@firebase/remote-config-compat",ni="@firebase/storage",ri="@firebase/storage-compat",ii="@firebase/firestore",oi="@firebase/ai",ai="@firebase/firestore-compat",si="firebase",ci="12.19.0";/**
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
 */const He="[DEFAULT]",li={[We]:"fire-core",[Or]:"fire-core-compat",[Pr]:"fire-analytics",[Mr]:"fire-analytics-compat",[Lr]:"fire-app-check",[$r]:"fire-app-check-compat",[zr]:"fire-auth",[Wr]:"fire-auth-compat",[Hr]:"fire-rtdb",[Ur]:"fire-data-connect",[Vr]:"fire-rtdb-compat",[Kr]:"fire-fn",[qr]:"fire-fn-compat",[Gr]:"fire-iid",[Yr]:"fire-iid-compat",[Jr]:"fire-fcm",[Xr]:"fire-fcm-compat",[Zr]:"fire-perf",[Qr]:"fire-perf-compat",[ei]:"fire-rc",[ti]:"fire-rc-compat",[ni]:"fire-gcs",[ri]:"fire-gcs-compat",[ii]:"fire-fst",[ai]:"fire-fst-compat",[oi]:"fire-vertex","fire-js":"fire-js",[si]:"fire-js-all"};/**
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
 */const ae=new Map,di=new Map,Ue=new Map;function mt(e,t){try{e.container.addComponent(t)}catch(n){$.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`,n)}}function q(e){const t=e.name;if(Ue.has(t))return $.debug(`There were multiple attempts to register component ${t}.`),!1;Ue.set(t,e);for(const n of ae.values())mt(n,e);for(const n of di.values())mt(n,e);return!0}function Je(e,t){const n=e.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),e.container.getProvider(t)}function Ha(e){return e==null?!1:e.settings!==void 0}/**
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
 */const pi={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different {$mismatchedParam}. Existing: '{$oldValue}'. New: '{$newValue}'.","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},O=new ye("app","Firebase",pi);/**
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
 */class ui{constructor(t,n,r){this._isDeleted=!1,this._options={...t},this._config={...n},this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new W("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw O.create("app-deleted",{appName:this._name})}}/**
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
 */const Ua=ci;function Yt(e,t={}){let n=e;typeof t!="object"&&(t={name:t});const r={name:He,automaticDataCollectionEnabled:!0,...t},i=r.name;if(typeof i!="string"||!i)throw O.create("bad-app-name",{appName:String(i)});if(n||(n=Wt()),!n)throw O.create("no-options");const a=ae.get(i);if(a)if($e(n,a.options)){if($e(r,a.config))return a;throw O.create("duplicate-app",{appName:i,mismatchedParam:"config",oldValue:JSON.stringify(a.config),newValue:JSON.stringify(r)})}else throw O.create("duplicate-app",{appName:i,mismatchedParam:"options",oldValue:JSON.stringify(a.options),newValue:JSON.stringify(n)});const s=new xr(i);for(const d of Ue.values())s.addComponent(d);const l=new ui(n,r,s);return ae.set(i,l),l}function Jt(e=He){const t=ae.get(e);if(!t&&e===He&&Wt())return Yt();if(!t)throw O.create("no-app",{appName:e});return t}function fi(){return Array.from(ae.values())}function z(e,t,n){let r=li[e]??e;n&&(r+=`-${n}`);const i=r.match(/\s|\//),a=t.match(/\s|\//);if(i||a){const s=[`Unable to register library "${r}" with version "${t}":`];i&&s.push(`library name "${r}" contains illegal characters (whitespace or "/")`),i&&a&&s.push("and"),a&&s.push(`version name "${t}" contains illegal characters (whitespace or "/")`),$.warn(s.join(" "));return}q(new W(`${r}-version`,()=>({library:r,version:t}),"VERSION"))}/**
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
 */const hi="firebase-heartbeat-database",gi=1,se="firebase-heartbeat-store";let Ne=null;function Xt(){return Ne||(Ne=we(hi,gi,{upgrade:(e,t)=>{switch(t){case 0:try{e.createObjectStore(se)}catch(n){console.warn(n)}}}}).catch(e=>{throw O.create("idb-open",{originalErrorMessage:e.message})})),Ne}async function bi(e){try{const n=(await Xt()).transaction(se),r=await n.objectStore(se).get(Zt(e));return await n.done,r}catch(t){if(t instanceof Q)$.warn(t.message);else{const n=O.create("idb-get",{originalErrorMessage:t==null?void 0:t.message});$.warn(n.message)}}}async function xt(e,t){try{const r=(await Xt()).transaction(se,"readwrite");await r.objectStore(se).put(t,Zt(e)),await r.done}catch(n){if(n instanceof Q)$.warn(n.message);else{const r=O.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});$.warn(r.message)}}}function Zt(e){return`${e.name}!${e.options.appId}`}/**
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
 */const mi=1024,xi=30;class yi{constructor(t){this.container=t,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new vi(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var t,n;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),a=yt();if(((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)==null?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===a||this._heartbeatsCache.heartbeats.some(s=>s.date===a))return;if(this._heartbeatsCache.heartbeats.push({date:a,agent:i}),this._heartbeatsCache.heartbeats.length>xi){const s=Si(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(s,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){$.warn(r)}}async getHeartbeatsHeader(){var t;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=yt(),{heartbeatsToSend:r,unsentEntries:i}=wi(this._heartbeatsCache.heartbeats),a=zt(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=n,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),a}catch(n){return $.warn(n),""}}}function yt(){return new Date().toISOString().substring(0,10)}function wi(e,t=mi){const n=[];let r=e.slice();for(const i of e){const a=n.find(s=>s.agent===i.agent);if(a){if(a.dates.push(i.date),wt(n)>t){a.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),wt(n)>t){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class vi{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Ut()?Vt().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await bi(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(t){if(await this._canUseIndexedDBPromise){const r=await this.read();return xt(this.app,{lastSentHeartbeatDate:t.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:t.heartbeats})}else return}async add(t){if(await this._canUseIndexedDBPromise){const r=await this.read();return xt(this.app,{lastSentHeartbeatDate:t.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...t.heartbeats]})}else return}}function wt(e){return zt(JSON.stringify({version:2,heartbeats:e})).length}function Si(e){if(e.length===0)return-1;let t=0,n=e[0].date;for(let r=1;r<e.length;r++)e[r].date<n&&(n=e[r].date,t=r);return t}/**
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
 */function Ei(e){q(new W("platform-logger",t=>new Rr(t),"PRIVATE")),q(new W("heartbeat",t=>new yi(t),"PRIVATE")),z(We,bt,e),z(We,bt,"esm2020"),z("fire-js","")}/**
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
 */Ei("");var Ii="firebase",ki="12.19.0";/**
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
 */z(Ii,ki,"app");const Qt="@firebase/installations",Xe="0.6.24";/**
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
 */const en=1e4,tn=`w:${Xe}`,nn="FIS_v2",Ci="https://firebaseinstallations.googleapis.com/v1",Ti=3600*1e3,Fi="installations",Di="Installations";/**
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
 */const _i={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},G=new ye(Fi,Di,_i);function rn(e){return e instanceof Q&&e.code.includes("request-failed")}/**
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
 */function on({projectId:e}){return`${Ci}/projects/${e}/installations`}function an(e){return{token:e.token,requestStatus:2,expiresIn:ji(e.expiresIn),creationTime:Date.now()}}async function sn(e,t){const r=(await t.json()).error;return G.create("request-failed",{requestName:e,serverCode:r.code,serverMessage:r.message,serverStatus:r.status})}function cn({apiKey:e}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e})}function Ai(e,{refreshToken:t}){const n=cn(e);return n.append("Authorization",Ni(t)),n}async function ln(e){const t=await e();return t.status>=500&&t.status<600?e():t}function ji(e){return Number(e.replace("s","000"))}function Ni(e){return`${nn} ${e}`}/**
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
 */async function Ri({appConfig:e,heartbeatServiceProvider:t},{fid:n}){const r=on(e),i=cn(e),a=t.getImmediate({optional:!0});if(a){const c=await a.getHeartbeatsHeader();c&&i.append("x-firebase-client",c)}const s={fid:n,authVersion:nn,appId:e.appId,sdkVersion:tn},l={method:"POST",headers:i,body:JSON.stringify(s)},d=await ln(()=>fetch(r,l));if(d.ok){const c=await d.json();return{fid:c.fid||n,registrationStatus:2,refreshToken:c.refreshToken,authToken:an(c.authToken)}}else throw await sn("Create Installation",d)}/**
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
 */function dn(e){return new Promise(t=>{setTimeout(t,e)})}/**
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
 */function Bi(e){return btoa(String.fromCharCode(...e)).replace(/\+/g,"-").replace(/\//g,"_")}/**
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
 */const Oi=/^[cdef][\w-]{21}$/,Ve="";function Mi(){try{const e=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(e),e[0]=112+e[0]%16;const n=Pi(e);return Oi.test(n)?n:Ve}catch{return Ve}}function Pi(e){return Bi(e).substr(0,22)}/**
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
 */function ee(e){return`${e.appName}!${e.appId}`}/**
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
 */const X=new Map;function pn(e,t){const n=ee(e);un(n,t),zi(n,t)}function $i(e,t){fn();const n=ee(e);let r=X.get(n);r||(r=new Set,X.set(n,r)),r.add(t)}function Li(e,t){const n=ee(e),r=X.get(n);r&&(r.delete(t),r.size===0&&X.delete(n),hn())}function un(e,t){const n=X.get(e);if(n)for(const r of n)r(t)}function zi(e,t){const n=fn();n&&n.postMessage({key:e,fid:t}),hn()}let K=null;function fn(){return!K&&"BroadcastChannel"in self&&(K=new BroadcastChannel("[Firebase] FID Change"),K.onmessage=e=>{un(e.data.key,e.data.fid)}),K}function hn(){X.size===0&&K&&(K.close(),K=null)}/**
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
 */const Wi="firebase-installations-database",Hi=1,Y="firebase-installations-store";let Re=null;function Ze(){return Re||(Re=we(Wi,Hi,{upgrade:(e,t)=>{switch(t){case 0:e.createObjectStore(Y)}}})),Re}async function be(e,t){const n=ee(e),i=(await Ze()).transaction(Y,"readwrite"),a=i.objectStore(Y),s=await a.get(n);return await a.put(t,n),await i.done,(!s||s.fid!==t.fid)&&pn(e,t.fid),t}async function gn(e){const t=ee(e),r=(await Ze()).transaction(Y,"readwrite");await r.objectStore(Y).delete(t),await r.done}async function ve(e,t){const n=ee(e),i=(await Ze()).transaction(Y,"readwrite"),a=i.objectStore(Y),s=await a.get(n),l=t(s);return l===void 0?await a.delete(n):await a.put(l,n),await i.done,l&&(!s||s.fid!==l.fid)&&pn(e,l.fid),l}/**
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
 */async function Qe(e){let t;const n=await ve(e.appConfig,r=>{const i=Ui(r),a=Vi(e,i);return t=a.registrationPromise,a.installationEntry});return n.fid===Ve?{installationEntry:await t}:{installationEntry:n,registrationPromise:t}}function Ui(e){const t=e||{fid:Mi(),registrationStatus:0};return bn(t)}function Vi(e,t){if(t.registrationStatus===0){if(!navigator.onLine){const i=Promise.reject(G.create("app-offline"));return{installationEntry:t,registrationPromise:i}}const n={fid:t.fid,registrationStatus:1,registrationTime:Date.now()},r=Ki(e,n);return{installationEntry:n,registrationPromise:r}}else return t.registrationStatus===1?{installationEntry:t,registrationPromise:qi(e)}:{installationEntry:t}}async function Ki(e,t){try{const n=await Ri(e,t);return be(e.appConfig,n)}catch(n){throw rn(n)&&n.customData.serverCode===409?await gn(e.appConfig):await be(e.appConfig,{fid:t.fid,registrationStatus:0}),n}}async function qi(e){let t=await vt(e.appConfig);for(;t.registrationStatus===1;)await dn(100),t=await vt(e.appConfig);if(t.registrationStatus===0){const{installationEntry:n,registrationPromise:r}=await Qe(e);return r||n}return t}function vt(e){return ve(e,t=>{if(!t)throw G.create("installation-not-found");return bn(t)})}function bn(e){return Gi(e)?{fid:e.fid,registrationStatus:0}:e}function Gi(e){return e.registrationStatus===1&&e.registrationTime+en<Date.now()}/**
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
 */async function Yi({appConfig:e,heartbeatServiceProvider:t},n){const r=Ji(e,n),i=Ai(e,n),a=t.getImmediate({optional:!0});if(a){const c=await a.getHeartbeatsHeader();c&&i.append("x-firebase-client",c)}const s={installation:{sdkVersion:tn,appId:e.appId}},l={method:"POST",headers:i,body:JSON.stringify(s)},d=await ln(()=>fetch(r,l));if(d.ok){const c=await d.json();return an(c)}else throw await sn("Generate Auth Token",d)}function Ji(e,{fid:t}){return`${on(e)}/${t}/authTokens:generate`}/**
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
 */async function et(e,t=!1){let n;const r=await ve(e.appConfig,a=>{if(!mn(a))throw G.create("not-registered");const s=a.authToken;if(!t&&Qi(s))return a;if(s.requestStatus===1)return n=Xi(e,t),a;{if(!navigator.onLine)throw G.create("app-offline");const l=to(a);return n=Zi(e,l),l}});return n?await n:r.authToken}async function Xi(e,t){let n=await St(e.appConfig);for(;n.authToken.requestStatus===1;)await dn(100),n=await St(e.appConfig);const r=n.authToken;return r.requestStatus===0?et(e,t):r}function St(e){return ve(e,t=>{if(!mn(t))throw G.create("not-registered");const n=t.authToken;return no(n)?{...t,authToken:{requestStatus:0}}:t})}async function Zi(e,t){try{const n=await Yi(e,t),r={...t,authToken:n};return await be(e.appConfig,r),n}catch(n){if(rn(n)&&(n.customData.serverCode===401||n.customData.serverCode===404))await gn(e.appConfig);else{const r={...t,authToken:{requestStatus:0}};await be(e.appConfig,r)}throw n}}function mn(e){return e!==void 0&&e.registrationStatus===2}function Qi(e){return e.requestStatus===2&&!eo(e)}function eo(e){const t=Date.now();return t<e.creationTime||e.creationTime+e.expiresIn<t+Ti}function to(e){const t={requestStatus:1,requestTime:Date.now()};return{...e,authToken:t}}function no(e){return e.requestStatus===1&&e.requestTime+en<Date.now()}/**
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
 */async function ro(e){const t=e,{installationEntry:n,registrationPromise:r}=await Qe(t);return r?r.catch(console.error):et(t).catch(console.error),n.fid}/**
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
 */async function io(e,t=!1){const n=e;return await oo(n),(await et(n,t)).token}async function oo(e){const{registrationPromise:t}=await Qe(e);t&&await t}/**
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
 */function ao(e,t){const{appConfig:n}=e;return $i(n,t),()=>{Li(n,t)}}/**
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
 */function so(e){if(!e||!e.options)throw Be("App Configuration");if(!e.name)throw Be("App Name");const t=["projectId","apiKey","appId"];for(const n of t)if(!e.options[n])throw Be(n);return{appName:e.name,projectId:e.options.projectId,apiKey:e.options.apiKey,appId:e.options.appId}}function Be(e){return G.create("missing-app-config-values",{valueName:e})}/**
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
 */const xn="installations",co="installations-internal",lo=e=>{const t=e.getProvider("app").getImmediate(),n=so(t),r=Je(t,"heartbeat");return{app:t,appConfig:n,heartbeatServiceProvider:r,_delete:()=>Promise.resolve()}},po=e=>{const t=e.getProvider("app").getImmediate(),n=Je(t,xn).getImmediate();return{getId:()=>ro(n),getToken:i=>io(n,i)}};function uo(){q(new W(xn,lo,"PUBLIC")),q(new W(co,po,"PRIVATE"))}/**
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
 */uo();z(Qt,Xe);z(Qt,Xe,"esm2020");/**
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
 */const fo="/firebase-messaging-sw.js",ho="/firebase-cloud-messaging-push-scope",yn="BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4",go="https://fcmregistrations.googleapis.com/v1",wn="google.c.a.c_id",bo="google.c.a.c_l",mo="google.c.a.ts",xo="google.c.a.e",Et=1e4;var It;(function(e){e[e.DATA_MESSAGE=1]="DATA_MESSAGE",e[e.DISPLAY_NOTIFICATION=3]="DISPLAY_NOTIFICATION"})(It||(It={}));/**
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
 */var Z;(function(e){e.PUSH_RECEIVED="push-received",e.NOTIFICATION_CLICKED="notification-clicked",e.FID_REGISTERED="fid-registered"})(Z||(Z={}));/**
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
 */function _(e){const t=new Uint8Array(e);return btoa(String.fromCharCode(...t)).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}function vn(e){const t="=".repeat((4-e.length%4)%4),n=(e+t).replace(/\-/g,"+").replace(/_/g,"/"),r=atob(n),i=new Uint8Array(r.length);for(let a=0;a<r.length;++a)i[a]=r.charCodeAt(a);return i}/**
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
 */const Oe="fcm_token_details_db",yo=5,kt="fcm_token_object_Store";async function wo(e){if("databases"in indexedDB&&!(await indexedDB.databases()).map(a=>a.name).includes(Oe))return null;let t=null;return(await we(Oe,yo,{upgrade:async(r,i,a,s)=>{if(i<2||!r.objectStoreNames.contains(kt))return;const l=s.objectStore(kt),d=await l.index("fcmSenderId").get(e);if(await l.clear(),!!d){if(i===2){const c=d;if(!c.auth||!c.p256dh||!c.endpoint)return;t={token:c.fcmToken,createTime:c.createTime??Date.now(),subscriptionOptions:{auth:c.auth,p256dh:c.p256dh,endpoint:c.endpoint,swScope:c.swScope,vapidKey:typeof c.vapidKey=="string"?c.vapidKey:_(c.vapidKey)}}}else if(i===3){const c=d;t={token:c.fcmToken,createTime:c.createTime,subscriptionOptions:{auth:_(c.auth),p256dh:_(c.p256dh),endpoint:c.endpoint,swScope:c.swScope,vapidKey:_(c.vapidKey)}}}else if(i===4){const c=d;t={token:c.fcmToken,createTime:c.createTime,subscriptionOptions:{auth:_(c.auth),p256dh:_(c.p256dh),endpoint:c.endpoint,swScope:c.swScope,vapidKey:_(c.vapidKey)}}}}}})).close(),await he(Oe),await he("fcm_vapid_details_db"),await he("undefined"),vo(t)?t:null}function vo(e){if(!e||!e.subscriptionOptions)return!1;const{subscriptionOptions:t}=e;return typeof e.createTime=="number"&&e.createTime>0&&typeof e.token=="string"&&e.token.length>0&&typeof t.auth=="string"&&t.auth.length>0&&typeof t.p256dh=="string"&&t.p256dh.length>0&&typeof t.endpoint=="string"&&t.endpoint.length>0&&typeof t.swScope=="string"&&t.swScope.length>0&&typeof t.vapidKey=="string"&&t.vapidKey.length>0}/**
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
 */const So={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"only-available-in-window":"This method is available in a Window context.","only-available-in-sw":"This method is available in a service worker context.","permission-default":"The notification permission was not granted and dismissed instead.","permission-blocked":"The notification permission was not granted and blocked instead.","unsupported-browser":"This browser doesn't support the API's required to use the Firebase SDK.","indexed-db-unsupported":"This browser doesn't support indexedDb.open() (ex. Safari iFrame, Firefox Private Browsing, etc)","failed-service-worker-registration":"We are unable to register the default service worker. {$browserErrorMessage}","token-subscribe-failed":"A problem occurred while subscribing the user to FCM: {$errorInfo}","token-subscribe-no-token":"FCM returned no token when subscribing the user to push.","fid-registration-failed":"A problem occurred while creating an FCM registration via FID: {$errorInfo}","fid-unregister-failed":"A problem occurred while unregistering the FCM registration via FID: {$errorInfo}","fid-registration-idb-schema-unavailable":"Unable to read or persist FID registration metadata because the messaging IndexedDB schema is unavailable (for example, the database could not be upgraded to the latest version).","token-unsubscribe-failed":"A problem occurred while unsubscribing the user from FCM: {$errorInfo}","token-update-failed":"A problem occurred while updating the user from FCM: {$errorInfo}","token-update-no-token":"FCM returned no token when updating the user to push.","use-sw-after-get-token":"The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.","invalid-sw-registration":"The input to useServiceWorker() must be a ServiceWorkerRegistration.","invalid-bg-handler":"The input to setBackgroundMessageHandler() must be a function.","invalid-vapid-key":"The public VAPID key must be a string.","use-vapid-key-after-get-token":"The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used.","invalid-on-registered-handler":"No onRegistered callback handler was provided or registered. Implement onRegistered() before register()."},m=new ye("messaging","Messaging",So);/**
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
 */const Ct="firebase-messaging-database",Tt=2,J="firebase-messaging-store",P="firebase-messaging-fid-registration-store",Eo={openDB:we,deleteDB:he};let Ft=Eo,oe=null;function Io(e,t,n){switch(t){case 0:if(e.createObjectStore(J),n===1)break;case 1:n===2&&e.createObjectStore(P)}}function Dt(e){return{upgrade:(t,n)=>{Io(t,n,e)},blocked:()=>{},blocking:(t,n,r)=>{var i;oe=null,(i=r.target)==null||i.close()},terminated:()=>{oe=null}}}function Se(){return oe||(oe=Ft.openDB(Ct,Tt,Dt(2)).catch(()=>Ft.openDB(Ct,Tt-1,Dt(1)))),oe}function Sn(e,t){return e.objectStoreNames.contains(t)}function En(e){if(!Sn(e,P))throw m.create("fid-registration-idb-schema-unavailable")}async function ko(e){const t=Ee(e),r=await(await Se()).transaction(J).objectStore(J).get(t);if(r)return r;{const i=await wo(e.appConfig.senderId);if(i)return await tt(e,i),i}}async function tt(e,t){const n=Ee(e),r=await Se(),i=[J],a=Sn(r,P);a&&i.push(P);const s=r.transaction(i,"readwrite");return await s.objectStore(J).put(t,n),a&&await s.objectStore(P).delete(n),await s.done,t}async function In(e){const t=Ee(e),n=await Se();return En(n),await n.transaction(P).objectStore(P).get(t)}async function Co(e,t){const n=Ee(e),r=await Se();En(r);const i=r.transaction([J,P],"readwrite");return await i.objectStore(P).put(t,n),await i.objectStore(J).delete(n),await i.done,t}function Ee({appConfig:e}){return e.appId}const _t="@firebase/messaging",Ke="0.13.3";/**
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
 */const To=3,Fo=1e3;async function Do(e,t){const n=await ke(e),r=nt(t,e.appConfig.appName,!1),i={method:"POST",headers:n,body:JSON.stringify(r)};let a;try{a=await(await fetch(Ie(e.appConfig),i)).json()}catch(s){throw m.create("token-subscribe-failed",{errorInfo:s==null?void 0:s.toString()})}if(a.error){const s=a.error.message;throw m.create("token-subscribe-failed",{errorInfo:s})}if(!a.token)throw m.create("token-subscribe-no-token");return a.token}async function _o(e,t){var d;const n=await ke(e),r=nt(t,e.appConfig.appName,!0),i={method:"POST",headers:n,body:JSON.stringify(r)};let a;try{a=await Bo(()=>fetch(Ie(e.appConfig),i),To,Fo)}catch(c){throw m.create("fid-registration-failed",{errorInfo:c==null?void 0:c.toString()})}if(a.ok)return{responseFid:await Ao(a)};let s;try{s=await a.json()}catch{throw m.create("fid-registration-failed",{errorInfo:a.statusText})}const l=((d=s.error)==null?void 0:d.message)??a.statusText;throw m.create("fid-registration-failed",{errorInfo:l})}async function Ao(e){const t=await e.text();if(!t.trim())throw m.create("fid-registration-failed",{errorInfo:"CreateRegistration succeeded but response body is empty"});let n;try{n=JSON.parse(t)}catch{throw m.create("fid-registration-failed",{errorInfo:"CreateRegistration succeeded but response body is not valid JSON"})}const r=n.name;if(typeof r!="string"||r.length===0)throw m.create("fid-registration-failed",{errorInfo:"CreateRegistration succeeded but response did not include a non-empty name"});return jo(r)}const At="/registrations/";function jo(e){const t=e.indexOf(At);if(t!==-1){const n=e.slice(t+At.length);if(n.length>0)return n}throw m.create("fid-registration-failed",{errorInfo:"CreateRegistration succeeded but response name is not a valid registration resource name"})}async function No(e,t){const n=await ke(e),r=nt(t.subscriptionOptions,e.appConfig.appName,!1),i={method:"PATCH",headers:n,body:JSON.stringify(r)};let a;try{a=await(await fetch(`${Ie(e.appConfig)}/${t.token}`,i)).json()}catch(s){throw m.create("token-update-failed",{errorInfo:s==null?void 0:s.toString()})}if(a.error){const s=a.error.message;throw m.create("token-update-failed",{errorInfo:s})}if(!a.token)throw m.create("token-update-no-token");return a.token}async function Ro(e,t){const r={method:"DELETE",headers:await ke(e)};try{const a=await(await fetch(`${Ie(e.appConfig)}/${t}`,r)).json();if(a.error){const s=a.error.message;throw m.create("token-unsubscribe-failed",{errorInfo:s})}}catch(i){throw m.create("token-unsubscribe-failed",{errorInfo:i==null?void 0:i.toString()})}}async function Bo(e,t,n){let r;for(let i=0;i<t;i++)try{return await e()}catch(a){if(r=a,i<t-1){const s=n*Math.pow(2,i);await new Promise(l=>setTimeout(l,s))}}throw r}function Ie({projectId:e}){return`${go}/projects/${e}/registrations`}async function ke({appConfig:e,installations:t}){const n=await t.getToken();return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e.apiKey,"x-goog-firebase-installations-auth":`FIS ${n}`})}function Oo(e,t){var n,r;try{if(/^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(e))return new URL(e).host}catch{}try{if(typeof self<"u"&&((n=self.location)!=null&&n.href))return new URL(e,self.location.origin).host}catch{}return typeof self<"u"&&((r=self.location)!=null&&r.host)?self.location.host:t}function nt({p256dh:e,auth:t,endpoint:n,vapidKey:r,swScope:i},a,s){const l={web:{origin:Oo(i,a),endpoint:n,auth:t,p256dh:e}};return s&&(l.fcm_sdk_version=Ke),r!==yn&&(l.web.applicationPubKey=r),l}/**
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
 */const Mo=10080*60*1e3;async function Po(e){const t=await Lo(e.swRegistration,e.vapidKey),n={vapidKey:e.vapidKey,swScope:e.swRegistration.scope,endpoint:t.endpoint,auth:_(t.getKey("auth")),p256dh:_(t.getKey("p256dh"))},r=await ko(e.firebaseDependencies);if(r){if(zo(r.subscriptionOptions,n))return Date.now()>=r.createTime+Mo?$o(e,{token:r.token,createTime:Date.now(),subscriptionOptions:n}):r.token;try{await Ro(e.firebaseDependencies,r.token)}catch(i){console.warn(i)}return jt(e.firebaseDependencies,n)}else return jt(e.firebaseDependencies,n)}async function $o(e,t){try{const n=await No(e.firebaseDependencies,t),r={...t,token:n,createTime:Date.now()};return await tt(e.firebaseDependencies,r),n}catch(n){throw n}}async function jt(e,t){const r={token:await Do(e,t),createTime:Date.now(),subscriptionOptions:t};return await tt(e,r),r.token}async function Lo(e,t){const n=await e.pushManager.getSubscription();return n||e.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:vn(t)})}function zo(e,t){const n=t.vapidKey===e.vapidKey,r=t.endpoint===e.endpoint,i=t.auth===e.auth,a=t.p256dh===e.p256dh;return n&&r&&i&&a}function Wo(e,t){const n=e.onRegisteredHandler;n&&(typeof n=="function"?n(t):n.next(t))}/**
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
 */async function Ho(e){try{e.swRegistration=await navigator.serviceWorker.register(fo,{scope:ho}),e.swRegistration.update().catch(()=>{}),await Uo(e.swRegistration)}catch(t){throw m.create("failed-service-worker-registration",{browserErrorMessage:t==null?void 0:t.message})}}async function Uo(e){return new Promise((t,n)=>{const r=setTimeout(()=>n(new Error(`Service worker not registered after ${Et} ms`)),Et),i=e.installing||e.waiting;e.active?(clearTimeout(r),t()):i?i.onstatechange=a=>{var s;((s=a.target)==null?void 0:s.state)==="activated"&&(i.onstatechange=null,clearTimeout(r),t())}:(clearTimeout(r),n(new Error("No incoming service worker found.")))})}/**
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
 */async function kn(e,t){if(!t&&!e.swRegistration&&await Ho(e),!(!t&&e.swRegistration)){if(!(t instanceof ServiceWorkerRegistration))throw m.create("invalid-sw-registration");e.swRegistration=t}}/**
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
 */async function Cn(e,t){t?e.vapidKey=t:e.vapidKey||(e.vapidKey=yn)}/**
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
 */const Nt=3;async function Vo(e,t){const n=await Ko(e.swRegistration,e.vapidKey),r={vapidKey:e.vapidKey,swScope:e.swRegistration.scope,endpoint:n.endpoint,auth:_(n.getKey("auth")),p256dh:_(n.getKey("p256dh"))},i=e.firebaseDependencies.installations;for(let a=0;a<Nt;a++){const{responseFid:s}=await _o(e.firebaseDependencies,r);if(s===t)return;a<Nt-1&&await i.getToken(!0)}throw m.create("fid-registration-failed",{errorInfo:"CreateRegistration response FID does not match Firebase Installation ID"})}async function Ko(e,t){const n=await e.pushManager.getSubscription();return n||e.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:vn(t)})}/**
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
 */const qo=10080*60*1e3;async function Tn(e,t){if(!navigator)throw m.create("only-available-in-window");if(Notification.permission==="default"&&await Notification.requestPermission(),Notification.permission!=="granted")throw m.create("permission-blocked");if(!e.onRegisteredHandler)throw m.create("invalid-on-registered-handler");await Cn(e,t==null?void 0:t.vapidKey),await kn(e,t==null?void 0:t.serviceWorkerRegistration);const n=e._registerNotifyChain.catch(()=>{});return e._registerNotifyChain=n.then(async()=>{const r=await e.firebaseDependencies.installations.getId(),i=await In(e.firebaseDependencies),a=Date.now();if((!i||i.fid!==r||a>=i.lastRegisterTime+qo)&&(await Vo(e,r),await Co(e.firebaseDependencies,{fid:r,lastRegisterTime:a,vapidKey:e.vapidKey})),!e.onRegisteredHandler)throw m.create("invalid-on-registered-handler");Wo(e,r)}),e._registerNotifyChain}/**
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
 */function Go(e,t){return ao(t,()=>{(async()=>!e.onRegisteredHandler||!await In(e.firebaseDependencies)||await Tn(e).catch(()=>{}))()})}/**
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
 */function Rt(e){const t={from:e.from,collapseKey:e.collapse_key,messageId:e.fcmMessageId};return Yo(t,e),Jo(t,e),Xo(t,e),t}function Yo(e,t){if(!t.notification)return;e.notification={};const n=t.notification.title;n&&(e.notification.title=n);const r=t.notification.body;r&&(e.notification.body=r);const i=t.notification.image;i&&(e.notification.image=i);const a=t.notification.icon;a&&(e.notification.icon=a)}function Jo(e,t){t.data&&(e.data=t.data)}function Xo(e,t){var i,a,s,l;if(!t.fcmOptions&&!((i=t.notification)!=null&&i.click_action))return;e.fcmOptions={};const n=((a=t.fcmOptions)==null?void 0:a.link)??((s=t.notification)==null?void 0:s.click_action);n&&(e.fcmOptions.link=n);const r=(l=t.fcmOptions)==null?void 0:l.analytics_label;r&&(e.fcmOptions.analyticsLabel=r)}/**
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
 */function Zo(e){return typeof e=="object"&&!!e&&wn in e}/**
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
 */function Qo(e){if(!e||!e.options)throw Me("App Configuration Object");if(!e.name)throw Me("App Name");const t=["projectId","apiKey","appId","messagingSenderId"],{options:n}=e;for(const r of t)if(!n[r])throw Me(r);return{appName:e.name,projectId:n.projectId,apiKey:n.apiKey,appId:n.appId,senderId:n.messagingSenderId}}function Me(e){return m.create("missing-app-config-values",{valueName:e})}/**
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
 */class ea{constructor(t,n,r){this.deliveryMetricsExportedToBigQueryEnabled=!1,this.onBackgroundMessageHandler=null,this.onMessageHandler=null,this.onRegisteredHandler=null,this.onUnregisteredHandler=null,this._registerNotifyChain=Promise.resolve(),this._fidChangeUnsubscribe=null,this.logEvents=[],this.logQueue={state:"stopped"};const i=Qo(t);this.firebaseDependencies={app:t,appConfig:i,installations:n,analyticsProvider:r}}_delete(){return this._fidChangeUnsubscribe&&(this._fidChangeUnsubscribe(),this._fidChangeUnsubscribe=null),this.logQueue.state==="scheduled"&&clearTimeout(this.logQueue.timerId),this.logQueue={state:"stopped"},Promise.resolve()}}/**
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
 */async function ta(e,t){if(!navigator)throw m.create("only-available-in-window");if(Notification.permission==="default"&&await Notification.requestPermission(),Notification.permission!=="granted")throw m.create("permission-blocked");return await Cn(e,t==null?void 0:t.vapidKey),await kn(e,t==null?void 0:t.serviceWorkerRegistration),Po(e)}/**
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
 */async function na(e,t,n){const r=ra(t);(await e.firebaseDependencies.analyticsProvider.get()).logEvent(r,{message_id:n[wn],message_name:n[bo],message_time:n[mo],message_device_time:Math.floor(Date.now()/1e3)})}function ra(e){switch(e){case Z.NOTIFICATION_CLICKED:return"notification_open";case Z.PUSH_RECEIVED:return"notification_foreground";default:throw new Error}}/**
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
 */async function ia(e,t){const n=t.data;if(!n.isFirebaseMessaging)return;if(e.onMessageHandler&&n.messageType===Z.PUSH_RECEIVED&&(typeof e.onMessageHandler=="function"?e.onMessageHandler(Rt(n)):e.onMessageHandler.next(Rt(n))),e.onRegisteredHandler&&n.messageType===Z.FID_REGISTERED){const i=n.fid;typeof e.onRegisteredHandler=="function"?e.onRegisteredHandler(i):e.onRegisteredHandler.next(i)}const r=n.data;Zo(r)&&r[xo]==="1"&&await na(e,n.messageType,r)}/**
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
 */const oa=e=>{const t=new ea(e.getProvider("app").getImmediate(),e.getProvider("installations-internal").getImmediate(),e.getProvider("analytics-internal"));return navigator.serviceWorker.addEventListener("message",n=>ia(t,n)),t._fidChangeUnsubscribe=Go(t,e.getProvider("installations").getImmediate()),t},aa=e=>{const t=e.getProvider("messaging").getImmediate();return{getToken:r=>ta(t,r),register:r=>Tn(t,r)}};function sa(){q(new W("messaging",oa,"PUBLIC")),q(new W("messaging-internal",aa,"PRIVATE")),z(_t,Ke),z(_t,Ke,"esm2020")}/**
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
 */async function Fn(){try{await Vt()}catch{return!1}return typeof window<"u"&&Ut()&&dr()&&"serviceWorker"in navigator&&"PushManager"in window&&"Notification"in window&&"fetch"in window&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey")}/**
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
 */function ca(e,t){if(!navigator)throw m.create("only-available-in-window");return e.onMessageHandler=t,()=>{e.onMessageHandler=null}}/**
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
 */function la(e=Jt()){return Fn().then(t=>{if(!t)throw m.create("unsupported-browser")},t=>{throw m.create("indexed-db-unsupported")}),Je(Kt(e),"messaging").getImmediate()}function da(e,t){return e=Kt(e),ca(e,t)}/**
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
 */sa();const pa={apiKey:"AIzaSyFakeKeyForLocalTesting12345678",authDomain:"emperor-saas.firebaseapp.com",projectId:"emperor-saas",storageBucket:"emperor-saas.appspot.com",messagingSenderId:"123456789012",appId:"1:123456789012:web:abcdef123456"},ua=fi().length>0?Jt():Yt(pa);async function fa(e){try{if(!await Fn())return null;const n=la(ua);return da(n,r=>{e&&e(r)})}catch(t){return console.error("Error attaching foreground message listener:",t),null}}function ha(){const{theme:e}=me(),{t,language:n}=ce(),r=e==="light",i=new Date().getFullYear(),a=ge();return o.jsx("footer",{className:"emperor-app-footer",children:o.jsxs("div",{className:"emperor-app-footer-inner",children:[o.jsxs("div",{className:"emperor-app-footer-brand",children:[o.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"8px",overflow:"hidden",border:"1px solid rgba(56, 189, 248, 0.45)",background:r?"#ffffff":"#071325",display:"inline-flex",alignItems:"center",justifyContent:"center",flexShrink:0,boxShadow:"0 0 10px rgba(56, 189, 248, 0.3)"},children:o.jsx("img",{src:xe(),alt:a,style:{width:"100%",height:"100%",objectFit:"contain"}})}),o.jsx("span",{style:{color:r?"#475569":"#94A3B8",fontWeight:"600",lineHeight:"1.6"},children:t("rights",n==="en"?`All Rights Reserved © ${i} — ${a}`:`جميع الحقوق محفوظة © ${i} — منصة ${a}`)})]}),o.jsx("div",{children:o.jsxs(j,{to:"/created-by",style:{color:r?"#b45309":"#D4A537",textDecoration:"none",fontWeight:"700",fontSize:"12px",display:"inline-flex",alignItems:"center",gap:"5px",padding:"5px 12px",borderRadius:"8px",background:r?"rgba(212, 165, 55, 0.1)":"rgba(212, 165, 55, 0.08)",border:r?"1px solid rgba(212, 165, 55, 0.25)":"1px solid rgba(212, 165, 55, 0.18)",transition:"all 0.2s ease"},onMouseEnter:s=>{s.currentTarget.style.background=r?"rgba(212, 165, 55, 0.2)":"rgba(212, 165, 55, 0.16)",s.currentTarget.style.transform="translateY(-1px)"},onMouseLeave:s=>{s.currentTarget.style.background=r?"rgba(212, 165, 55, 0.1)":"rgba(212, 165, 55, 0.08)",s.currentTarget.style.transform="translateY(0)"},children:[o.jsx("span",{children:t("developedByTeam","تم التطوير بواسطة فريق العمل")}),o.jsx(Gn,{size:12})]})})]})})}function ga({isOpen:e,onClose:t}){const{theme:n}=me(),r=n==="light",{language:i,isRtl:a}=ce(),s=i==="en",[l,d]=g.useState([]),[c,u]=g.useState(!1);if(g.useEffect(()=>{if(!e)return;const p=document.body.style.overflow;document.body.style.overflow="hidden";const b=x=>{x.key==="Escape"&&t()};return window.addEventListener("keydown",b),()=>{document.body.style.overflow=p,window.removeEventListener("keydown",b)}},[e,t]),g.useEffect(()=>{if(!e)return;let p=!0;return(async()=>{var x;u(!0);try{const v=await Nn.getSupportContacts(),N=((x=v.data)==null?void 0:x.data)||v.data||[];p&&d(Array.isArray(N)?N.filter(k=>!`${k.channel||""} ${k.name||""} ${k.value||""}`.toLowerCase().includes("telegram")&&!`${k.name||""}`.includes("تليجرام")):[])}catch(v){console.error("Error fetching support contacts for modal:",v)}finally{p&&u(!1)}})(),()=>{p=!1}},[e]),!e)return null;const S=[{id:"owner",name:s?"Platform Manager":"مدير المنصة",role_badge:s?"Platform Manager":"مدير المنصة",badge_color:"#F59E0B",channel:"whatsapp",phone:"00972523281869",value:"00972523281869"},{id:"support-1",name:s?"Customer Service":"خدمة العملاء",role_badge:s?"Customer Support":"خدمة العملاء",badge_color:"#38BDF8",channel:"whatsapp",phone:"01002575638",value:"01002575638"}],I=p=>{const b=(p.value||p.phone||"").trim(),x=(p.channel||"").toLowerCase();if(x.includes("whatsapp")||b.startsWith("+")||/^[0-9]+$/.test(b.replace(/[\s+-]/g,""))){const v=b.replace(/[^0-9]/g,""),N=v.startsWith("00")?v.substring(2):v.startsWith("01")?`20${v.substring(1)}`:v,k=encodeURIComponent(s?"Hello, I need assistance regarding my account.":"السلام عليكم ورحمة الله وبركاته، محتاج مساعدة بخصوص حسابي في منصة سند ومهره كارد.");return`https://wa.me/${N}?text=${k}`}return x.includes("email")||b.includes("@")?`mailto:${b}`:b.startsWith("http")?b:`https://${b}`},C=(p,b)=>{let x=p.role_badge;if(!x){const v=(p.description||"").trim();v.includes("صاحب")||v.includes("إدارة")?x="صاحب المنصة":v.includes("تارجت")?x="قسم التارجت":v.includes("فني")||v.includes("شحن")?x="الدعم الفني":x="خدمة العملاء"}if(s){if(x==="صاحب المنصة")return"Platform Owner";if(x==="قسم التارجت")return"Target Support";if(x==="الدعم الفني")return"Technical Support";if(x==="خدمة العملاء")return"Customer Support"}return x},D=l.length>0?l.map((p,b)=>({...p,phone:p.value?p.value.replace(/[^0-9+]/g,""):"",role_badge:C(p),badge_color:b===0?"#F59E0B":b%2===1?"#38BDF8":"#34D399"})).map(p=>{const b=/مدير|مالك|owner|manager/i.test(`${p.name||""} ${p.role_badge||""} ${p.description||""}`),x=String(p.channel||"").toLowerCase()==="email"||String(p.value||"").includes("@");return!b&&!x?p:{...p,name:s?"Platform Manager":"مدير المنصة",role_badge:s?"Platform Manager":"مدير المنصة",channel:"whatsapp",phone:"00972523281869",value:"00972523281869"}}):S;return o.jsxs("div",{onClick:t,style:{position:"fixed",inset:0,zIndex:9999,display:"flex",alignItems:"center",justifyContent:"center",padding:"16px",backgroundColor:r?"rgba(15, 23, 42, 0.35)":"rgba(5, 5, 8, 0.82)",backdropFilter:"blur(10px)",WebkitBackdropFilter:"blur(10px)",animation:"fadeInModal 0.25s ease-out forwards"},children:[o.jsx("style",{children:`
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
            `}),o.jsxs("div",{onClick:p=>p.stopPropagation(),style:{position:"relative",width:"100%",maxWidth:"460px",maxHeight:"90vh",overflowY:"auto",backgroundColor:r?"#FFFFFF":"#0D0E12",border:r?"1.5px solid rgba(212, 165, 55, 0.45)":"1.5px solid rgba(34, 197, 94, 0.35)",borderRadius:"24px",padding:"clamp(16px, 4vw, 24px)",boxShadow:r?"0 20px 60px rgba(0, 0, 0, 0.12), 0 0 30px rgba(212, 165, 55, 0.1)":"0 20px 60px rgba(0, 0, 0, 0.9), 0 0 40px rgba(34, 197, 94, 0.12)",animation:"scaleUpModal 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards",fontFamily:"var(--font-cairo, Cairo, sans-serif)",direction:a?"rtl":"ltr",color:r?"#0F172A":"#FFFFFF",boxSizing:"border-box"},children:[o.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"16px",gap:"10px"},children:[o.jsx("button",{type:"button",onClick:t,"aria-label":s?"Close":"إغلاق",style:{display:"flex",alignItems:"center",justifyContent:"center",width:"36px",height:"36px",borderRadius:"12px",background:r?"#F1F5F9":"rgba(255, 255, 255, 0.06)",border:r?"1px solid #CBD5E1":"1px solid rgba(255, 255, 255, 0.1)",color:r?"#475569":"#A0A0B0",cursor:"pointer",transition:"all 0.2s ease",flexShrink:0},onMouseEnter:p=>{p.currentTarget.style.color="#FFFFFF",p.currentTarget.style.background="rgba(239, 68, 68, 0.85)",p.currentTarget.style.borderColor="rgba(239, 68, 68, 0.9)"},onMouseLeave:p=>{p.currentTarget.style.color=r?"#475569":"#A0A0B0",p.currentTarget.style.background=r?"#F1F5F9":"rgba(255, 255, 255, 0.06)",p.currentTarget.style.borderColor=r?"#CBD5E1":"rgba(255, 255, 255, 0.1)"},children:o.jsx(qe,{size:20})}),o.jsxs("h2",{style:{margin:0,fontSize:"clamp(16px, 4vw, 18px)",fontWeight:"900",color:r?"#0F172A":"#FFFFFF",letterSpacing:"-0.2px",display:"flex",alignItems:"center",gap:"6px"},children:[o.jsx("span",{children:s?"Contact Team":"تواصل مع فريق"}),o.jsx("span",{style:{background:"linear-gradient(135deg, #F5D061 0%, #D4A537 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"},children:s?"MOHRA & SAND CARD":"مهره وسند كارد"})]})]}),o.jsx("p",{style:{margin:"0 0 18px",fontSize:"13.5px",fontWeight:"700",color:r?"#475569":"#9E9EA8",textAlign:a?"right":"left"},children:s?"Choose the channel or representative to contact directly:":"اختر القناة أو الشخص الذي تريد التواصل معه مباشرة:"}),o.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"12px"},children:D.map((p,b)=>{const x=I(p),v=b===0;return o.jsxs("div",{className:"support-contact-card",style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 14px",borderRadius:"16px",background:r?"#FFFFFF":"rgba(15, 18, 16, 0.75)",border:r?"1.5px solid rgba(212, 165, 55, 0.35)":"1.5px solid rgba(34, 197, 94, 0.22)",gap:"10px",boxSizing:"border-box",width:"100%"},children:[o.jsx("a",{href:x,target:"_blank",rel:"noopener noreferrer",className:"support-contact-btn",style:{display:"inline-flex",alignItems:"center",justifyContent:"center",padding:"7px 16px",borderRadius:"10px",border:"1.5px solid #22C55E",color:"#FFFFFF",background:"#22C55E",fontSize:"13px",fontWeight:"900",textDecoration:"none",cursor:"pointer",flexShrink:0,boxShadow:"0 2px 8px rgba(34, 197, 94, 0.3)"},children:s?"Contact":"تواصل"}),o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px",minWidth:0,flex:1,justifyContent:a?"flex-end":"flex-start",flexDirection:a?"row":"row-reverse"},children:[o.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"3px",minWidth:0,flex:1,textAlign:a?"right":"left"},children:[o.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"flex-start",gap:"6px",flexWrap:"wrap"},children:[o.jsx("span",{style:{fontSize:"13.5px",fontWeight:"900",color:r?"#0F172A":"#FFFFFF",lineHeight:"1.4",wordBreak:"break-word"},children:p.name}),p.role_badge&&o.jsx("span",{style:{fontSize:"10.5px",fontWeight:"800",color:p.badge_color||(v?r?"#B45309":"#F59E0B":r?"#0369A1":"#38BDF8"),background:r?"rgba(0, 0, 0, 0.05)":"rgba(255, 255, 255, 0.06)",padding:"2px 7px",borderRadius:"6px",whiteSpace:"nowrap"},children:p.role_badge})]}),(p.phone||p.value)&&o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"5px",color:r?"#475569":"#A0A0B0",fontSize:"12px",fontWeight:"700",direction:"ltr",justifyContent:a?"flex-end":"flex-start",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:[o.jsx("span",{style:{overflow:"hidden",textOverflow:"ellipsis"},children:p.phone||p.value}),o.jsx(Yn,{size:11,color:"#22C55E",style:{flexShrink:0}})]})]}),o.jsx("div",{style:{width:"40px",height:"40px",borderRadius:"50%",background:"linear-gradient(135deg, #22C55E 0%, #16A34A 100%)",display:"flex",alignItems:"center",justifyContent:"center",color:"#FFFFFF",boxShadow:"0 0 14px rgba(34, 197, 94, 0.35)",flexShrink:0},children:o.jsx(Pe,{size:20,fill:"#FFFFFF",color:"#22C55E"})})]})]},p.id||b)})}),o.jsxs("div",{style:{marginTop:"16px",paddingTop:"12px",borderTop:r?"1px solid #E2E8F0":"1px solid rgba(255, 255, 255, 0.06)",display:"flex",alignItems:"center",justifyContent:"center",gap:"6px",color:r?"#64748B":"#6B7280",fontSize:"11.5px",fontWeight:"700"},children:[o.jsx(Mt,{size:14,color:"#22C55E"}),o.jsx("span",{children:s?"Support team available 24/7 to assist you":"فريق الدعم متواجد لخدمتك على مدار الساعة 24/7"})]})]})]})}function ba(){const[e,t]=g.useState(!0),[n,r]=g.useState(!1);return g.useEffect(()=>{const i=setTimeout(()=>{r(!0)},1200),a=setTimeout(()=>{t(!1)},1600);return()=>{clearTimeout(i),clearTimeout(a)}},[]),e?o.jsxs("div",{id:"emperor-splash-screen",style:{position:"fixed",inset:0,zIndex:999999,backgroundColor:"#050508",backgroundImage:"radial-gradient(circle at 50% 45%, rgba(212, 165, 55, 0.18) 0%, rgba(5, 5, 8, 0.98) 70%)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",opacity:n?0:1,transform:n?"scale(1.04)":"scale(1)",transition:"opacity 0.45s ease, transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)",pointerEvents:n?"none":"auto",userSelect:"none"},children:[o.jsx("style",{children:`
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
            `}),o.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"18px",textAlign:"center",padding:"20px"},children:[o.jsx("div",{style:{position:"relative",width:"120px",height:"120px",animation:"emperorPulseLogo 2.5s ease-in-out infinite"},children:o.jsx("img",{src:xe(),alt:"سند ومهره كارد",style:{width:"100%",height:"100%",borderRadius:"28px",objectFit:"contain",border:"2px solid rgba(212, 165, 55, 0.6)",boxShadow:"0 0 30px rgba(212, 165, 55, 0.5), inset 0 0 15px rgba(212, 165, 55, 0.3)"}})}),o.jsxs("div",{children:[o.jsx("h1",{style:{margin:"6px 0 2px",fontSize:"26px",fontWeight:"900",letterSpacing:"1px",fontFamily:"var(--font-cairo, Cairo, sans-serif)",background:"linear-gradient(90deg, #F8E8B8 0%, #FFFFFF 25%, #D4A537 50%, #FFFFFF 75%, #F8E8B8 100%)",backgroundSize:"200% auto",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",animation:"emperorShimmerText 3s linear infinite",textShadow:"0 0 20px rgba(212, 165, 55, 0.4)"},children:"سند ومهره كارد"}),o.jsx("p",{style:{margin:0,fontSize:"13px",fontWeight:"700",color:"#D4A537",letterSpacing:"0.5px",fontFamily:"var(--font-cairo, Cairo, sans-serif)"},children:"خدماتك الرقمية والمالية في مكان واحد"})]}),o.jsx("div",{style:{width:"160px",height:"4px",borderRadius:"999px",backgroundColor:"rgba(255, 255, 255, 0.08)",overflow:"hidden",marginTop:"8px",border:"1px solid rgba(212, 165, 55, 0.3)"},children:o.jsx("div",{style:{height:"100%",background:"linear-gradient(90deg, #D4A537, #F8E8B8, #22C55E)",animation:"emperorProgressFill 1.1s cubic-bezier(0.16, 1, 0.3, 1) forwards"}})})]})]}):null}function ma(){const[e,t]=g.useState(!1),[n,r]=g.useState(!1),{isRtl:i,t:a}=ce();g.useEffect(()=>{if(sessionStorage.getItem("emperor_payment_notice_seen"))return;const u=setTimeout(()=>{t(!0)},1700);return()=>clearTimeout(u)},[]);const s=()=>{sessionStorage.setItem("emperor_payment_notice_seen","true"),r(!0),setTimeout(()=>{t(!1),r(!1)},300)};if(!e)return null;const l=ge(),d=xe()||"/images/mohra_sand_logo.png";return o.jsxs("div",{id:"emperor-payment-notice-backdrop",style:{position:"fixed",inset:0,zIndex:999998,backgroundColor:"rgba(3, 8, 18, 0.85)",backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",display:"flex",alignItems:"center",justifyContent:"center",padding:"16px",opacity:n?0:1,transition:"opacity 0.3s ease",direction:i?"rtl":"ltr",fontFamily:"var(--font-cairo, Cairo, sans-serif)"},onClick:c=>{c.target===c.currentTarget&&s()},children:[o.jsx("style",{children:`
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
            `}),o.jsxs("div",{className:"emperor-payment-notice-card",style:{position:"relative",width:"100%",maxWidth:"430px",borderRadius:"28px",padding:"2px",overflow:"hidden",background:"transparent",boxShadow:"0 25px 70px rgba(0, 0, 0, 0.95), 0 0 40px rgba(245, 208, 97, 0.2)",animation:n?"none":"emperorNoticePop 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",transform:n?"scale(0.92) translateY(15px)":"none",transition:"transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)"},children:[o.jsx("div",{style:{position:"absolute",top:"-50%",left:"-50%",width:"200%",height:"200%",background:"conic-gradient(from 0deg, transparent 0deg, #F5D061 55deg, #F59E0B 120deg, transparent 180deg, #38BDF8 240deg, #F5D061 310deg, transparent 360deg)",animation:"emperorRainbowSpin 6s linear infinite",zIndex:0}}),o.jsxs("div",{style:{position:"relative",zIndex:1,width:"100%",height:"100%",borderRadius:"26px",background:"linear-gradient(175deg, #181109 0%, #0d121c 30%, #050811 100%)",padding:"24px 22px 22px",overflow:"hidden",display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center"},children:[o.jsx("div",{style:{position:"absolute",top:"-90px",left:"50%",transform:"translateX(-50%)",width:"280px",height:"200px",borderRadius:"50%",background:"radial-gradient(circle, rgba(245, 158, 11, 0.38) 0%, rgba(245, 208, 97, 0.2) 45%, transparent 75%)",filter:"blur(35px)",pointerEvents:"none"}}),o.jsx("div",{style:{position:"absolute",top:"55px",left:"40px",width:"4px",height:"4px",borderRadius:"50%",background:"#F5D061",boxShadow:"0 0 10px #F5D061",animation:"emperorParticleDrift 3.2s infinite ease-in-out"}}),o.jsx("div",{style:{position:"absolute",top:"75px",left:"90px",width:"3px",height:"3px",borderRadius:"50%",background:"#F59E0B",boxShadow:"0 0 8px #F59E0B",animation:"emperorParticleDrift 2.7s infinite ease-in-out 0.4s"}}),o.jsx("div",{style:{position:"absolute",top:"60px",right:"50px",width:"4px",height:"4px",borderRadius:"50%",background:"#F5D061",boxShadow:"0 0 10px #F5D061",animation:"emperorParticleDrift 3.6s infinite ease-in-out 0.9s"}}),o.jsx("div",{style:{position:"absolute",top:"80px",right:"95px",width:"3px",height:"3px",borderRadius:"50%",background:"#FBBF24",boxShadow:"0 0 8px #FBBF24",animation:"emperorParticleDrift 3s infinite ease-in-out 1.2s"}}),o.jsx("button",{onClick:s,title:"إغلاق",style:{position:"absolute",top:"18px",left:"18px",width:"36px",height:"36px",borderRadius:"50%",background:"rgba(255, 255, 255, 0.08)",border:"1px solid rgba(255, 255, 255, 0.18)",display:"flex",alignItems:"center",justifyContent:"center",color:"#E2E8F0",cursor:"pointer",transition:"all 0.2s ease",outline:"none",zIndex:10},onMouseEnter:c=>{c.currentTarget.style.background="rgba(239, 68, 68, 0.25)",c.currentTarget.style.borderColor="#ef4444",c.currentTarget.style.color="#ef4444",c.currentTarget.style.transform="scale(1.08)"},onMouseLeave:c=>{c.currentTarget.style.background="rgba(255, 255, 255, 0.08)",c.currentTarget.style.borderColor="rgba(255, 255, 255, 0.18)",c.currentTarget.style.color="#E2E8F0",c.currentTarget.style.transform="scale(1)"},children:o.jsx(qe,{size:17})}),o.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",marginBottom:"18px",marginTop:"4px"},children:[o.jsx("img",{src:d,alt:l,style:{width:"22px",height:"22px",objectFit:"contain",filter:"drop-shadow(0 0 8px rgba(245, 208, 97, 0.5))"}}),o.jsx("span",{style:{fontSize:"13px",fontWeight:"900",color:"#F5D061",letterSpacing:"0.6px",textShadow:"0 0 12px rgba(245, 208, 97, 0.4)"},children:l})]}),o.jsx("div",{style:{width:"56px",height:"56px",borderRadius:"50%",background:"radial-gradient(circle, rgba(245, 208, 97, 0.22) 0%, rgba(212, 165, 55, 0.08) 70%)",border:"1.5px solid #F5D061",display:"flex",alignItems:"center",justifyContent:"center",color:"#F5D061",marginBottom:"14px",animation:"emperorNoticeGlowPulse 2.8s infinite ease-in-out"},children:o.jsx(Rn,{size:28,color:"#F5D061"})}),o.jsx("h2",{style:{margin:"0 0 18px",fontSize:"22px",fontWeight:"900",color:"#FFF8E7",textShadow:"0 2px 10px rgba(0, 0, 0, 0.8), 0 0 25px rgba(245, 208, 97, 0.4)",letterSpacing:"0.2px"},children:a("paymentNoticeTitle","تنبيه قبل الدفع")}),o.jsxs("div",{style:{width:"100%",display:"flex",flexDirection:i?"row-reverse":"row",alignItems:"center",justifyContent:"space-between",gap:"12px",padding:"14px 16px",borderRadius:"16px",background:"rgba(28, 20, 10, 0.85)",border:"1.2px solid rgba(245, 208, 97, 0.35)",marginBottom:"12px",boxShadow:"0 6px 20px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(245, 208, 97, 0.15)"},children:[o.jsx("span",{style:{fontSize:"13.5px",fontWeight:"800",color:"#FDE68A",lineHeight:"1.45",textAlign:i?"right":"left",flex:1},children:a("paymentNotice1","المنتجات الرقمية لا تُسترد بعد تأكيد التحويل.")}),o.jsx("div",{style:{width:"30px",height:"30px",borderRadius:"50%",background:"rgba(245, 208, 97, 0.18)",border:"1.2px solid rgba(245, 208, 97, 0.65)",display:"flex",alignItems:"center",justifyContent:"center",color:"#F5D061",flexShrink:0,boxShadow:"0 0 10px rgba(245, 208, 97, 0.3)"},children:o.jsx(dt,{size:16})})]}),o.jsxs("div",{style:{width:"100%",display:"flex",flexDirection:i?"row-reverse":"row",alignItems:"center",justifyContent:"space-between",gap:"12px",padding:"14px 16px",borderRadius:"16px",background:"rgba(28, 20, 10, 0.85)",border:"1.2px solid rgba(245, 208, 97, 0.35)",marginBottom:"22px",boxShadow:"0 6px 20px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(245, 208, 97, 0.15)"},children:[o.jsx("span",{style:{fontSize:"13.5px",fontWeight:"800",color:"#FDE68A",lineHeight:"1.45",textAlign:i?"right":"left",flex:1},children:a("paymentNotice2","راجع تفاصيل طلبك جيدًا قبل الدفع.")}),o.jsx("div",{style:{width:"30px",height:"30px",borderRadius:"50%",background:"rgba(245, 208, 97, 0.18)",border:"1.2px solid rgba(245, 208, 97, 0.65)",display:"flex",alignItems:"center",justifyContent:"center",color:"#F5D061",flexShrink:0,boxShadow:"0 0 10px rgba(245, 208, 97, 0.3)"},children:o.jsx(dt,{size:16})})]}),o.jsxs("button",{onClick:s,style:{width:"100%",padding:"14px 22px",borderRadius:"15px",background:"linear-gradient(135deg, #F59E0B 0%, #D97706 50%, #B45309 100%)",border:"1px solid rgba(253, 230, 138, 0.35)",color:"#FFFFFF",fontSize:"16px",fontWeight:"900",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",cursor:"pointer",boxShadow:"0 10px 28px rgba(217, 119, 6, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.25)",transition:"all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",outline:"none"},onMouseEnter:c=>{c.currentTarget.style.transform="scale(1.02)",c.currentTarget.style.boxShadow="0 12px 34px rgba(217, 119, 6, 0.75), inset 0 1px 0 rgba(255, 255, 255, 0.35)",c.currentTarget.style.background="linear-gradient(135deg, #FBBF24 0%, #EA580C 100%)"},onMouseLeave:c=>{c.currentTarget.style.transform="scale(1)",c.currentTarget.style.boxShadow="0 10px 28px rgba(217, 119, 6, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.25)",c.currentTarget.style.background="linear-gradient(135deg, #F59E0B 0%, #D97706 50%, #B45309 100%)"},children:[o.jsx("span",{children:a("continue","متابعة")}),o.jsx(Xn,{size:19,strokeWidth:3})]})]})]})]})}function xa(){const{isRtl:e}=ce(),{theme:t}=me(),n=t==="light",[r,i]=g.useState([]),[a,s]=g.useState(0),[l,d]=g.useState(!1),c=[{id:"banner-vf-cash",title:"إيداع فودافون كاش أوتوماتيك خلال 0 ثانية",link:"/deposit",isExternal:!1,image:"/images/banners/banner_vodafone_cash.jpg"},{id:"banner-chat-apps",title:"أقل سعر في مصر لبرامج الدردشة الصوتية",link:"/category/apps",isExternal:!1,image:"/images/banners/banner_chat_apps.jpg"},{id:"banner-whatsapp-channel",title:"انضم إلى مجتمعنا على واتساب",link:"https://whatsapp.com/channel/0029VbDuIu76mYPJomZfr72N",isExternal:!0,image:"/images/banners/whatsapp_channel_banner.jpg"}];g.useEffect(()=>{Bt.getBanners().then(h=>{const E=Array.isArray(h==null?void 0:h.data)?h.data:Array.isArray(h)?h:[];if(E.length>0){const L=E.map(A=>{const Ce=A.link&&(A.link.startsWith("http://")||A.link.startsWith("https://")),R=A.image_url||A.image;let te="/images/banners/banner_vodafone_cash.jpg";return R&&typeof R=="string"&&(R.startsWith("http://")||R.startsWith("https://")||R.startsWith("/")?te=R:te="/storage/"+R),{id:A.id,title:A.title||"سند ومهره كارد للشحن الرقمي",link:A.link||"/category/games",isExternal:!!Ce,image:te}});i(L)}else i(c)}).catch(()=>{i(c)})},[]);const u=r.length>0?r:c,[S,I]=g.useState(null),[C,D]=g.useState(null),p=40,b=h=>{D(null),I(h.targetTouches[0].clientX)},x=h=>{D(h.targetTouches[0].clientX)},v=()=>{if(!S||!C)return;const h=S-C;Math.abs(h)<p||(h>p?e?N():k():h<-p&&(e?k():N()))};g.useEffect(()=>{if(u.length<=1||l)return;const h=setInterval(()=>{s(E=>(E+1)%u.length)},6e3);return()=>clearInterval(h)},[u.length,l]);const N=h=>{s(E=>E===0?u.length-1:E-1)},k=h=>{s(E=>(E+1)%u.length)},y=u[a]||u[0];return o.jsxs("div",{className:"emperor-global-banner-container",style:{width:"100%",maxWidth:"1100px",margin:"0 auto",padding:"16px 0 24px",boxSizing:"border-box"},onMouseEnter:()=>d(!0),onMouseLeave:()=>d(!1),onTouchStart:b,onTouchMove:x,onTouchEnd:v,children:[o.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",background:"rgba(16, 185, 129, 0.08)",border:"1px solid rgba(16, 185, 129, 0.35)",borderRadius:"16px",padding:"10px 18px",marginBottom:"18px",width:"100%",boxSizing:"border-box",gap:"10px"},children:[o.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px",minWidth:0},children:[o.jsx("span",{style:{color:"#10B981",display:"flex",alignItems:"center",flexShrink:0},children:o.jsx(Mt,{size:18})}),o.jsx("span",{style:{fontSize:"13px",fontWeight:"700",color:"#E2E8F0",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"},children:"حماية إضافية لحسابك: فعّل المصادقة الثنائية في أقل من دقيقة."})]}),o.jsx(j,{to:"/account-security",style:{background:"rgba(16, 185, 129, 0.18)",border:"1px solid rgba(16, 185, 129, 0.5)",borderRadius:"10px",padding:"4px 12px",color:"#34D399",textDecoration:"none",fontSize:"12px",fontWeight:"800",whiteSpace:"nowrap",flexShrink:0},children:"تفعيل الحماية ↗"})]}),o.jsxs("div",{className:"emperor-hero-slider",style:{position:"relative",borderRadius:"26px",overflow:"hidden",border:n?"1.8px solid rgba(212, 165, 55, 0.35)":"1.8px solid rgba(212, 165, 55, 0.45)",background:n?"#FFFFFF":"#0B0B0F",boxShadow:n?"0 0 20px rgba(212, 165, 55, 0.2)":"0 14px 40px rgba(0, 0, 0, 0.85), 0 0 28px rgba(212, 165, 55, 0.18)",aspectRatio:"2.85 / 1",maxHeight:"260px",height:"clamp(130px, 22vw, 260px)",width:"100%",minHeight:"130px",display:"flex",alignItems:"center",justifyContent:"center",cursor:y!=null&&y.link?"pointer":"default",transition:"all 0.3s ease",userSelect:"none",touchAction:"pan-y",boxSizing:"border-box"},children:[y!=null&&y.link?y.isExternal?o.jsxs("a",{href:y.link,target:"_blank",rel:"noopener noreferrer",style:{display:"block",width:"100%",height:"100%",textDecoration:"none"},children:[y.image&&o.jsx("img",{src:y.image,alt:y.title||"إعلان سند ومهره كارد",className:"emperor-slider-kenburns",onError:h=>{h.currentTarget.onerror=null,h.currentTarget.src=c[0].image},style:{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center",display:"block"}},`banner-img-${a}-${y.id}`),o.jsx("div",{className:"emperor-slider-shimmer"})]}):o.jsxs(j,{to:y.link,style:{display:"block",width:"100%",height:"100%",textDecoration:"none"},children:[y.image&&o.jsx("img",{src:y.image,alt:y.title||"إعلان سند ومهره كارد",className:"emperor-slider-kenburns",onError:h=>{h.currentTarget.onerror=null,h.currentTarget.src=c[0].image},style:{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center",display:"block"}},`banner-img-${a}-${y.id}`),o.jsx("div",{className:"emperor-slider-shimmer"})]}):o.jsxs("div",{style:{display:"block",width:"100%",height:"100%"},children:[(y==null?void 0:y.image)&&o.jsx("img",{src:y.image,alt:y.title||"إعلان سند ومهره كارد",className:"emperor-slider-kenburns",onError:h=>{h.currentTarget.onerror=null,h.currentTarget.src=c[0].image},style:{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center",display:"block"}},`banner-img-${a}-${y.id}`),o.jsx("div",{className:"emperor-slider-shimmer"})]}),u.length>1&&o.jsx("div",{style:{position:"absolute",bottom:"12px",left:"50%",transform:"translateX(-50%)",display:"flex",alignItems:"center",gap:"6px",zIndex:4,background:"rgba(0, 0, 0, 0.65)",padding:"4px 12px",borderRadius:"20px",backdropFilter:"blur(8px)",WebkitBackdropFilter:"blur(8px)",border:"1px solid rgba(212, 165, 55, 0.3)"},children:u.map((h,E)=>o.jsx("button",{onClick:L=>{L.preventDefault(),L.stopPropagation(),s(E)},"aria-label":`Go to slide ${E+1}`,style:{width:E===a?"22px":"6px",height:"6px",borderRadius:"3px",background:E===a?"linear-gradient(90deg, #F5D061 0%, #D4A537 100%)":"rgba(255, 255, 255, 0.35)",border:"none",cursor:"pointer",padding:0,transition:"all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"}},E))}),u.length>1&&!l&&o.jsx("div",{className:"emperor-slider-progress",style:{position:"absolute",bottom:0,left:0,height:"2.5px",background:"linear-gradient(90deg, #D4A537 0%, #F5D061 100%)",boxShadow:"0 0 6px rgba(212, 165, 55, 0.8)",zIndex:5}},`prog-${a}`)]}),o.jsxs("div",{style:{textAlign:"center",marginTop:"14px",padding:"0 8px",fontSize:"clamp(11.5px, 2.5vw, 15px)",fontWeight:"800",color:n?"#78350F":"#F5D061",fontFamily:"var(--font-cairo)",letterSpacing:"0.2px",lineHeight:"1.6",boxSizing:"border-box",textShadow:n?"none":"0 2px 10px rgba(0,0,0,0.85), 0 0 14px rgba(212, 165, 55, 0.3)"},children:[o.jsx("span",{style:{color:n?"#78350F":"#E6C665"},children:"بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ"}),o.jsxs("span",{style:{color:n?"#92400E":"#FFE57F",fontWeight:"900",margin:"0 4px"},children:["{","وَأَحَلَّ اللَّهُ الْبَيْعَ وَحَرَّمَ الرِّبَا","}"]}),o.jsx("span",{style:{color:n?"#78350F":"#E6C665"},children:"صَدَقَ اللَّهُ الْعَظِيمُ"})]}),o.jsx("style",{children:`
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
            `})]})}function ya(){const[e,t]=g.useState(null),[n,r]=g.useState(!1),[i,a]=g.useState(!1),s=Ot();g.useEffect(()=>{let u=!0;return Bt.getBanners({type:"popup"}).then(S=>{if(!u)return;const I=Array.isArray(S==null?void 0:S.data)?S.data:Array.isArray(S)?S:[];if(I.length>0){const C=I[0],D=`emperor_popup_dismissed_${C.id}`;if(!(sessionStorage.getItem(D)||localStorage.getItem(D))){t(C);const b=setTimeout(()=>{u&&r(!0)},700);return()=>clearTimeout(b)}}}).catch(S=>{console.warn("Failed to load promotional popup:",S)}),()=>{u=!1}},[]);const l=()=>{if(!e)return;const u=`emperor_popup_dismissed_${e.id}`;i?localStorage.setItem(u,"true"):sessionStorage.setItem(u,"true"),r(!1)},d=()=>{if(!e||(l(),!e.link))return;e.link.startsWith("http://")||e.link.startsWith("https://")?window.open(e.link,"_blank","noopener,noreferrer"):s(e.link)};if(!n||!e)return null;const c=e.image_url||e.image;return o.jsx("div",{className:"promotional-popup-backdrop",style:{position:"fixed",inset:0,zIndex:99999,backgroundColor:"rgba(5, 5, 8, 0.82)",backdropFilter:"blur(8px)",WebkitBackdropFilter:"blur(8px)",display:"flex",alignItems:"center",justifyContent:"center",padding:"16px",animation:"fadeIn 0.25s ease-out"},onClick:u=>{u.target===u.currentTarget&&l()},children:o.jsxs("div",{className:"promotional-popup-dialog",style:{position:"relative",width:"100%",maxWidth:"460px",borderRadius:"22px",background:"linear-gradient(180deg, rgba(24, 24, 34, 0.98) 0%, rgba(12, 12, 18, 0.99) 100%)",border:"1.5px solid rgba(212, 165, 55, 0.55)",boxShadow:"0 25px 60px rgba(0, 0, 0, 0.9), 0 0 35px rgba(212, 165, 55, 0.25)",overflow:"hidden",display:"flex",flexDirection:"column",animation:"scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)",direction:"rtl"},children:[o.jsx("div",{style:{height:"3px",width:"100%",background:"linear-gradient(90deg, transparent 0%, #D4A537 50%, transparent 100%)"}}),o.jsx("button",{onClick:l,title:"إغلاق النافذة",style:{position:"absolute",top:"12px",left:"12px",zIndex:10,width:"32px",height:"32px",borderRadius:"50%",background:"rgba(0, 0, 0, 0.65)",border:"1px solid rgba(212, 165, 55, 0.35)",color:"#F5D061",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",transition:"all 0.2s ease"},onMouseEnter:u=>{u.currentTarget.style.transform="scale(1.1)",u.currentTarget.style.backgroundColor="rgba(212, 165, 55, 0.2)"},onMouseLeave:u=>{u.currentTarget.style.transform="scale(1)",u.currentTarget.style.backgroundColor="rgba(0, 0, 0, 0.65)"},children:o.jsx(qe,{size:16})}),c&&o.jsxs("div",{style:{position:"relative",width:"100%",height:"210px",background:"#09090D",overflow:"hidden",borderBottom:"1px solid rgba(212, 165, 55, 0.2)"},children:[o.jsx("img",{src:c,alt:e.title,style:{width:"100%",height:"100%",objectFit:"cover",transition:"transform 0.5s ease"}}),o.jsx("div",{style:{position:"absolute",inset:0,background:"linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(12,12,18,0.9) 100%)"}})]}),o.jsxs("div",{style:{padding:c?"18px 22px 20px":"28px 22px 20px",textAlign:"center"},children:[o.jsxs("div",{style:{display:"inline-flex",alignItems:"center",gap:"6px",padding:"4px 12px",borderRadius:"20px",background:"rgba(212, 165, 55, 0.15)",border:"1px solid rgba(212, 165, 55, 0.35)",color:"#F5D061",fontSize:"11px",fontWeight:"800",marginBottom:"12px"},children:[o.jsx(Ln,{size:13,color:"#F5D061"}),o.jsx("span",{children:"إعلان مميز من سند ومهره كارد"})]}),o.jsx("h3",{style:{fontSize:"19px",fontWeight:"900",color:"#FFFFFF",margin:"0 0 8px",lineHeight:1.35},children:e.title}),e.subtitle&&o.jsx("p",{style:{fontSize:"13px",color:"#A0A0B0",lineHeight:1.6,margin:"0 0 20px"},children:e.subtitle}),o.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"10px",marginTop:"16px"},children:[e.link&&o.jsxs("button",{onClick:d,style:{width:"100%",padding:"12px 18px",borderRadius:"13px",background:"linear-gradient(135deg, #F5D061 0%, #D4A537 100%)",border:"none",color:"#070709",fontSize:"14.5px",fontWeight:"900",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",boxShadow:"0 4px 18px rgba(212, 165, 55, 0.35)",transition:"all 0.2s ease"},onMouseEnter:u=>{u.currentTarget.style.transform="translateY(-2px)",u.currentTarget.style.boxShadow="0 6px 24px rgba(212, 165, 55, 0.55)"},onMouseLeave:u=>{u.currentTarget.style.transform="translateY(0)",u.currentTarget.style.boxShadow="0 4px 18px rgba(212, 165, 55, 0.35)"},children:[o.jsx("span",{children:"عرض التفاصيل الآن"}),o.jsx(Zn,{size:16})]}),o.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:"8px",paddingTop:"10px",borderTop:"1px solid rgba(255, 255, 255, 0.06)",fontSize:"12px",color:"#7E7E8E"},children:[o.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"6px",cursor:"pointer"},children:[o.jsx("input",{type:"checkbox",checked:i,onChange:u=>a(u.target.checked),style:{accentColor:"#D4A537",cursor:"pointer"}}),o.jsx("span",{children:"عدم الإظهار مجدداً"})]}),o.jsx("button",{onClick:l,style:{background:"transparent",border:"none",color:"#8E8E98",cursor:"pointer",fontSize:"12px",fontWeight:"700",padding:"4px"},onMouseEnter:u=>u.currentTarget.style.color="#F5D061",onMouseLeave:u=>u.currentTarget.style.color="#8E8E98",children:"إغلاق"})]})]})]})]})})}function Va({children:e,showBanner:t=!1}){var rt,it;const{user:n,isAuthenticated:r}=Bn(),{theme:i,toggleTheme:a}=me(),{language:s,switchLanguage:l,t:d,isRtl:c}=ce(),{addToast:u}=On(),S=Mn();Ot();const[I,C]=g.useState(!1),[D,p]=g.useState(!1),[b,x]=g.useState(0),[v,N]=g.useState(!1),[k,y]=g.useState(null);g.useEffect(()=>{if(!r){y(null);return}Pn.getBalance().then(f=>{var T;return y(((T=f==null?void 0:f.data)==null?void 0:T.data)||(f==null?void 0:f.data)||f||null)}).catch(()=>{})},[r,n==null?void 0:n.currency]),g.useEffect(()=>{const f=()=>p(!0);return window.addEventListener("emperor:open-support-modal",f),()=>window.removeEventListener("emperor:open-support-modal",f)},[]),g.useEffect(()=>{const f=()=>N(window.scrollY>20);return window.addEventListener("scroll",f,{passive:!0}),()=>window.removeEventListener("scroll",f)},[]),g.useEffect(()=>{if(!r){x(0);return}let f=!0;const T=new Set;let ot=!0,de=null;const pe=async()=>{var B;try{const H=await $n.checkLatest();if(!f||!((B=H==null?void 0:H.data)!=null&&B.data))return;const{unread_count:U,notifications:ne}=H.data.data,re=Array.isArray(ne)?ne:[];if(typeof U=="number"){if(x(U),ot){re.forEach(F=>T.add(F.id)),de=U,ot=!1;return}const ie=re.filter(F=>!T.has(F.id));(ie.length>0||de!==null&&U>de)&&(st("default"),ie.forEach(F=>{T.add(F.id);const _n=F.title||"إشعار جديد",An=F.body?` - ${F.body}`:"";u(`${_n}${An}`,"info"),window.dispatchEvent(new CustomEvent("emperor:new-notification",{detail:F}))}),window.dispatchEvent(new CustomEvent("emperor:refresh-notifications"))),de=U}}catch{}};pe();const Dn=setInterval(()=>{document.visibilityState==="visible"&&pe()},15e3),ue=()=>{document.visibilityState==="visible"&&pe()};window.addEventListener("focus",ue),document.addEventListener("visibilitychange",ue);let Te=null;return fa(B=>{var ne,re,ie,F;const H=((ne=B.notification)==null?void 0:ne.title)||((re=B.data)==null?void 0:re.title)||"إشعار جديد",U=((ie=B.notification)==null?void 0:ie.body)||((F=B.data)==null?void 0:F.body)||"";st("default"),u(`${H}: ${U}`,"info"),pe()}).then(B=>{Te=B}),()=>{f=!1,clearInterval(Dn),window.removeEventListener("focus",ue),document.removeEventListener("visibilitychange",ue),typeof Te=="function"&&Te()}},[r,u]);const h=f=>!f||typeof f!="string"||f.startsWith("#")?!1:!!(f==="/"&&S.pathname==="/"||f!=="/"&&S.pathname.startsWith(f)),E=(k==null?void 0:k.preferred_balance)??((rt=n==null?void 0:n.wallet)==null?void 0:rt.balance)??(n==null?void 0:n.wallet_balance)??0,L=Number(E||0),A=E!==void 0?L%1===0?L.toLocaleString("en-US",{maximumFractionDigits:0}):L.toLocaleString("en-US",{minimumFractionDigits:1,maximumFractionDigits:2}):"0",Ce=(n==null?void 0:n.currency)||(k==null?void 0:k.preferred_currency)||((it=n==null?void 0:n.wallet)==null?void 0:it.currency)||"EGP",R=zn(Ce,s),te=[{to:"/",label:d("home","الرئيسية"),icon:at},{to:"#whatsapp-channel",href:ct(),label:d("whatsappChannel","قناة الواتساب"),icon:Pe,isExternal:!0,badge:s==="en"?"Updates":"تحديثات"},{to:"/target/apps",label:d("targetSelling","بيع التارجت"),icon:Qn,badge:s==="en"?"Instant Cash":"كاش فوري",isSpecial:!0},{to:"/deposit",label:d("chargeWallet","شحن المحفظة"),icon:Fe},{to:"/orders",label:d("myOrders","طلباتي"),icon:Wn,authRequired:!0},{to:"/account-issues",label:d("support","الشكاوى"),icon:Jn}],le=i==="light";return o.jsxs("div",{style:{minHeight:"100vh",display:"flex",flexDirection:"column",backgroundColor:le?"var(--bg-main)":"#070709",color:le?"var(--text-primary)":"#FFFFFF",fontFamily:"var(--font-cairo)",direction:c?"rtl":"ltr"},children:[o.jsx("header",{className:"emperor-header",style:{position:"sticky",top:0,zIndex:1e3,transition:"all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",width:"100%",padding:0},children:o.jsxs("div",{className:"emperor-navbar-container",style:{background:le?v?"rgba(255, 255, 255, 0.96)":"rgba(240, 247, 255, 0.94)":v?"rgba(5, 12, 24, 0.98)":"rgba(6, 15, 30, 0.94)",backdropFilter:"blur(20px) saturate(1.8)",WebkitBackdropFilter:"blur(20px) saturate(1.8)",borderBottom:"1.5px solid rgba(56, 189, 248, 0.35)",boxShadow:le?"0 10px 30px rgba(15, 23, 42, 0.08)":"0 10px 35px rgba(0, 0, 0, 0.8), 0 0 25px rgba(0, 130, 255, 0.12)"},children:[o.jsx("div",{style:{display:"flex",alignItems:"center",gap:"14px",minWidth:0,flexShrink:0},children:o.jsxs(j,{to:"/",style:{display:"flex",alignItems:"center",gap:"10px",textDecoration:"none",minWidth:0,flexShrink:0},children:[o.jsx("div",{className:"header-logo-icon",style:{width:"44px",height:"44px",borderRadius:"12px",overflow:"hidden",border:"1.5px solid rgba(56, 189, 248, 0.45)",boxShadow:"0 0 15px rgba(56, 189, 248, 0.35)",flexShrink:0,background:"#071325",display:"flex",alignItems:"center",justifyContent:"center"},children:o.jsx("img",{src:xe(),alt:ge(),style:{width:"100%",height:"100%",objectFit:"contain"},onError:f=>{f.currentTarget.style.display="none",f.currentTarget.parentNode.innerHTML='<span style="color:#F5D061;font-size:22px;font-weight:900;">👑</span>'}})}),o.jsxs("div",{style:{display:"flex",flexDirection:"column",minWidth:0},children:[o.jsx("span",{className:"brand-title",style:{fontSize:"19px",fontWeight:"900",color:"#F5D061",letterSpacing:"0.3px",lineHeight:1.15,whiteSpace:"nowrap",textShadow:"0 2px 10px rgba(0,0,0,0.6), 0 0 15px rgba(245, 208, 97, 0.35)"},children:ge()}),o.jsx("span",{className:"brand-subtitle",style:{fontSize:"10px",fontWeight:"800",color:"#38BDF8",letterSpacing:"0.2px",whiteSpace:"nowrap"},children:qn()})]})]})}),o.jsx("nav",{className:"desktop-nav-links",style:{display:"flex",alignItems:"center",gap:"6px",justifyContent:"center",flex:1,margin:"0 16px"},children:te.map(f=>{if(f.authRequired&&!r)return null;const T=!f.isModalTrigger&&!f.isExternal&&h(f.to);return f.isExternal?o.jsxs("a",{href:f.href,target:"_blank",rel:"noopener noreferrer",className:"nav-link-item",style:{display:"flex",alignItems:"center",gap:"5px",padding:"7px 14px",borderRadius:"10px",textDecoration:"none",fontSize:"13.5px",fontWeight:"800",color:"#22c55e",background:"rgba(34, 197, 94, 0.08)",border:"1px solid rgba(34, 197, 94, 0.25)",transition:"all 0.2s",whiteSpace:"nowrap"},children:[o.jsx(f.icon,{size:15,color:"#22c55e"}),o.jsx("span",{children:f.label})]},f.label):o.jsxs(j,{to:f.to,className:"nav-link-item",style:{display:"flex",alignItems:"center",gap:"5px",padding:"7px 15px",borderRadius:"10px",textDecoration:"none",fontSize:"13.5px",fontWeight:T?"900":"800",color:T?"#38BDF8":"#F5D061",background:T?"rgba(14, 165, 233, 0.15)":"transparent",border:T?"1px solid rgba(56, 189, 248, 0.45)":"1px solid transparent",boxShadow:T?"0 0 15px rgba(56, 189, 248, 0.2)":"none",transition:"all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",whiteSpace:"nowrap"},children:[o.jsx(f.icon,{size:15,color:T?"#38BDF8":"#F5D061"}),o.jsx("span",{children:f.label})]},f.to)})}),o.jsxs("div",{className:"header-actions",children:[r?o.jsxs(o.Fragment,{children:[o.jsxs(j,{to:"/deposit",className:"header-wallet-badge",title:d("walletBalance","رصيد المحفظة"),children:[o.jsx(Fe,{size:14,color:"#38BDF8",style:{flexShrink:0}}),o.jsx("span",{className:"balance-num",children:A}),o.jsx("span",{className:"balance-curr",children:R})]}),o.jsxs(j,{to:"/notifications",className:"header-notif-btn",title:d("notifications","الإشعارات"),children:[o.jsx(Hn,{size:17,color:"#F5D061"}),b>0&&o.jsx("span",{className:"notif-badge-dot",children:b>9?"9+":b})]})]}):o.jsxs(o.Fragment,{children:[o.jsx(j,{to:"/register",className:"header-register-btn",children:d("createAccount","إنشاء حساب")}),o.jsxs(j,{to:"/login",className:"header-login-btn",children:[o.jsx(lt,{size:15,color:"#38BDF8"}),o.jsx("span",{children:d("login","دخول")})]})]}),o.jsx("button",{onClick:()=>C(!0),title:d("mainMenu","القائمة الكاملة"),className:"header-hamburger-btn",children:o.jsx(Un,{size:18})})]})]})}),o.jsx(ba,{}),o.jsx(ma,{}),o.jsx(Vn,{isOpen:I,onClose:()=>C(!1),walletBalance:k}),o.jsx(ga,{isOpen:D,onClose:()=>p(!1)}),o.jsx(ya,{}),o.jsx("main",{className:"emperor-main-layout-content",style:{flex:1,paddingBottom:"80px",width:"100%",overflowX:"hidden"},children:o.jsxs("div",{className:"emperor-main-container",children:[t&&o.jsx(xa,{}),e]})}),o.jsxs("nav",{className:"emperor-bottom-nav mobile-bottom-bar",children:[o.jsx(fe,{to:"/",icon:at,label:d("home","الرئيسية"),active:h("/")}),o.jsx(fe,{href:ct(),icon:Pe,label:d("whatsappChannel","الواتساب"),isExternal:!0,color:"#25D366"}),o.jsx(fe,{to:"/target/apps",icon:Kn,label:d("targetSelling","التارجت"),active:h("/target/apps")}),o.jsx(fe,{to:"/deposit",icon:Fe,label:d("chargeWallet","المحفظة"),active:h("/deposit")}),o.jsxs("button",{type:"button",onClick:()=>C(!0),className:`emperor-bottom-nav-item${I?" active":""}`,style:{outline:"none",border:"none",background:"transparent",color:I?"#F5D061":"#8E8E98",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"4px",cursor:"pointer",userSelect:"none",WebkitTapHighlightColor:"transparent"},children:[o.jsx(lt,{size:20,color:I?"#F5D061":"#8E8E98"}),o.jsx("span",{style:{fontSize:"11px",fontWeight:I?"800":"600",whiteSpace:"nowrap",lineHeight:1.1,fontFamily:"var(--font-cairo)"},children:r?d("myAccount","حسابي"):"دخول"})]})]}),o.jsx(ha,{})]})}function fe({to:e,href:t,icon:n,label:r,active:i,isExternal:a,color:s}){return t||a?o.jsxs("a",{href:t,target:"_blank",rel:"noopener noreferrer",className:"emperor-bottom-nav-item",style:{textDecoration:"none",color:s||"#8E8E98",outline:"none",border:"none",background:"transparent",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"4px",userSelect:"none",WebkitTapHighlightColor:"transparent"},children:[o.jsx(n,{size:20,color:s||"#8E8E98"}),o.jsx("span",{style:{fontSize:"11px",fontWeight:"700",whiteSpace:"nowrap",lineHeight:1.1,fontFamily:"var(--font-cairo)",color:s||"#8E8E98"},children:r})]}):o.jsxs(j,{to:e,className:`emperor-bottom-nav-item${i?" active":""}`,style:{textDecoration:"none",color:i?"#F5D061":"#8E8E98",outline:"none",border:"none",background:"transparent",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"4px",userSelect:"none",WebkitTapHighlightColor:"transparent"},children:[o.jsx(n,{size:20,color:i?"#F5D061":"#8E8E98"}),o.jsx("span",{style:{fontSize:"11px",fontWeight:i?"800":"600",whiteSpace:"nowrap",lineHeight:1.1,fontFamily:"var(--font-cairo)"},children:r})]})}export{dt as C,lr as D,ye as E,Q as F,Er as L,Va as M,Ua as S,Ha as _,Je as a,ja as b,Aa as c,Jt as d,$e as e,Na as f,Kt as g,Oa as h,za as i,Ba as j,w as k,Ht as l,Ma as m,Pa as n,ir as o,Wa as p,$a as q,Ra as r,q as s,W as t,z as u,La as v,fi as w,Yt as x};
