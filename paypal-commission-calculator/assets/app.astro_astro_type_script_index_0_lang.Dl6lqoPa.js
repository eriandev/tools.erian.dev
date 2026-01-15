import{$ as C,a as g,b as y,c as x,d as v}from"./app.astro_astro_type_script_index_1_lang.Tqr4fZuZ.js";const E=(function(){let o=0;return function(){return(++o).toString()}})();function A(o,t="blank",e={icon:{type:"",content:""},duration:"",closeable:!1,theme:{type:"light",style:{background:"",color:"",stroke:""}}}){const s=E(),a=I(s,t,e),n=L(t,e),r=M(o);return a.appendChild(n),a.appendChild(r),e.closeable&&a.appendChild(S(a)),document.querySelector("wc-toast").appendChild(a),{id:s,type:t,message:o,...e}}function I(o,t,e){const{duration:s,theme:a}=e,n=document.createElement("wc-toast-item"),l=(window?.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)"))?.matches?"dark":"light";if(n.setAttribute("type",t),n.setAttribute("duration",s||""),n.setAttribute("data-toast-item-id",o),n.setAttribute("theme",a?.type?a.type:l),a?.type==="custom"&&a?.style){const{background:d,stroke:c,color:T}=a.style;n.style.setProperty("--wc-toast-background",d),n.style.setProperty("--wc-toast-stroke",c),n.style.setProperty("--wc-toast-color",T)}return n}function L(o,t){const{icon:e}=t,s=document.createElement("wc-toast-icon");return s.setAttribute("type",e?.type?e.type:o),s.setAttribute("icon",e?.content&&e?.type==="custom"?e.content:""),e?.type==="svg"&&(s.innerHTML=e?.content?e.content:""),s}function M(o){const t=document.createElement("wc-toast-content");return t.setAttribute("message",o),t}function S(o){const t=document.createElement("wc-toast-close-button");return t.addEventListener("click",()=>{o.classList.add("dismiss-with-close-button")}),t}function m(o){return function(t,e){return A(t,o,e).id}}function i(o,t){return m("blank")(o,t)}i.loading=m("loading");i.success=m("success");i.error=m("error");i.dismiss=function(o){const t=document.querySelectorAll("wc-toast-item");for(const e of t){const s=e.getAttribute("data-toast-item-id");o===s&&e.classList.add("dismiss")}};i.promise=async function(o,t={loading:"",success:"",error:""},e){const s=i.loading(t.loading,{...e});try{const a=await o;return i.dismiss(s),i.success(t.success,{...e}),a}catch(a){return i.dismiss(s),i.error(t.error,{...e}),a}};class p extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.template=document.createElement("template"),this.template.innerHTML=p.template(),this.shadowRoot.append(this.template.content.cloneNode(!0))}connectedCallback(){this.setAttribute("role","status"),this.setAttribute("aria-live","polite"),this.position=this.getAttribute("position")||"top-center",this.arrangeToastPosition(this.position)}static get observedAttributes(){return["position"]}attributeChangedCallback(t,e,s){t==="position"&&(this.position=s,this.arrangeToastPosition(this.position))}arrangeToastPosition(t){const e=t.includes("top"),s={top:e&&0,bottom:!e&&0},a=t.includes("center")?"center":t.includes("right")?"flex-end":"flex-start",n=e?1:-1,r=e?"column-reverse":"column",d=window.getComputedStyle(document.querySelector("html")).getPropertyValue("scrollbar-gutter");this.style.setProperty("--wc-toast-factor",n),this.style.setProperty("--wc-toast-position",a),this.style.setProperty("--wc-toast-direction",r);const c=this.shadowRoot.querySelector(".wc-toast-container");c.style.top=s.top,c.style.bottom=s.bottom,c.style.right=d.includes("stable")&&"4px",c.style.justifyContent=a}static template(){return`
    <style>
      :host {
        --wc-toast-factor: 1;
        --wc-toast-position: center;
        --wc-toast-direction: column-reverse;

        position: fixed;
        z-index: 9999;
        top: 16px;
        left: 16px;
        right: 16px;
        bottom: 16px;
        pointer-events: none;
      }

      .wc-toast-container {
        z-index: 9999;
        left: 0;
        right: 0;
        display: flex;
        position: absolute;
      }

      .wc-toast-wrapper {
        display: flex;
        flex-direction: var(--wc-toast-direction);
        justify-content: flex-end;
        gap: 16px;
        will-change: transform;
        transition: all 230ms cubic-bezier(0.21, 1.02, 0.73, 1);
        pointer-events: none;
      }
    </style>
    <div class="wc-toast-container">
      <div class="wc-toast-wrapper" aria-live="polite">
        <slot> </slot>
      </div>
    </div>
    `}}customElements.define("wc-toast",p);class h extends HTMLElement{constructor(){super(),this.createdAt=new Date,this.EXIT_ANIMATION_DURATION=350,this.attachShadow({mode:"open"}),this.template=document.createElement("template"),this.template.innerHTML=h.template(),this.shadowRoot.append(this.template.content.cloneNode(!0))}connectedCallback(){this.type=this.getAttribute("type")||"blank",this.theme=this.getAttribute("theme")||"light",this.duration=this.getAttribute("duration")||this.getDurationByType(this.type),this.theme==="dark"&&(this.style.setProperty("--wc-toast-background","#2a2a32"),this.style.setProperty("--wc-toast-stroke","#f9f9fa"),this.style.setProperty("--wc-toast-color","#f9f9fa"));const t=()=>{setTimeout(()=>{this.remove()},this.EXIT_ANIMATION_DURATION),this.shadowRoot.querySelector(".wc-toast-bar").classList.add("dismiss")};let e=!1;this.addEventListener("mouseenter",()=>{e=!0}),this.addEventListener("mouseleave",()=>{e=!1});const s=setInterval(()=>{if(this.duration<=0){clearInterval(s),t();return}e||(this.duration-=100)},100)}static get observedAttributes(){return["class"]}attributeChangedCallback(t,e,s){if(t==="class")switch(s){case"dismiss-with-close-button":this.shadowRoot.querySelector(".wc-toast-bar").classList.add("dismiss"),setTimeout(()=>{this.remove()},this.EXIT_ANIMATION_DURATION);break;case"dismiss":default:this.remove();break}}getDurationByType(t){switch(t){case"success":return 2e3;case"loading":return 1e5*60;case"error":case"blank":case"custom":default:return 3500}}static template(){return`
    <style>
      /*
       * Author: Timo Lins
       * License: MIT
       * Source: https://github.com/timolins/react-hot-toast/blob/main/src/components/toast-bar.tsx
       */

      :host {
        --wc-toast-background: #fff;
        --wc-toast-max-width: 350px;
        --wc-toast-stroke: #2a2a32;
        --wc-toast-color: #000;
        --wc-toast-font-family: 'Roboto', 'Amiri', sans-serif;
        --wc-toast-font-size: 16px;
        --wc-toast-border-radius: 8px;
        --wc-toast-content-margin: 4px 10px;

        display: flex;
        justify-content: var(--wc-toast-position);
        transition: all 230ms cubic-bezier(0.21, 1.02, 0.73, 1);
      }

      :host > * {
        pointer-events: auto;
      }

      @media (prefers-color-scheme: dark) {
        :host {
          --wc-toast-background: #2a2a32;
          --wc-toast-stroke: #f9f9fa;
          --wc-toast-color: #f9f9fa;
        }

        :host([theme=light]) {
          --wc-toast-background: #fff;
          --wc-toast-stroke: #2a2a32;
          --wc-toast-color: #000;
        }
      }

      @keyframes enter-animation {
        0% {
          transform: translate3d(0, calc(var(--wc-toast-factor) * -200%), 0) scale(0.6);
          opacity: 0.5;
        }
        100% {
          transform: translate3d(0, 0, 0) scale(1);
          opacity: 1;
        }
      }

      @keyframes exit-animation {
        0% {
          transform: translate3d(0, 0, -1px) scale(1);
          opacity: 1;
        }
        100% {
          transform: translate3d(0, calc(var(--wc-toast-factor) * -150%), -1px) scale(0.6);
          opacity: 0;
        }
      }

      @keyframes fade-in {
        0% {
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      }

      @keyframes fade-out {
        0% {
          opacity: 1;
        }
        100% {
          opacity: 0;
        }
      }

      .wc-toast-bar {
        display: flex;
        align-items: center;
        background: var(--wc-toast-background, #fff);
        line-height: 1.3;
        will-change: transform;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
        animation: enter-animation 0.3s cubic-bezier(0.21, 1.02, 0.73, 1) forwards;
        max-width: var(--wc-toast-max-width);
        pointer-events: auto;
        padding: 8px 10px;
        border-radius: var(--wc-toast-border-radius);
      }

      .wc-toast-bar.dismiss {
        animation: exit-animation 0.3s forwards cubic-bezier(0.06, 0.71, 0.55, 1);
      }

      @media (prefers-reduced-motion: reduce) {
        .wc-toast-bar {
          animation-name: fade-in;
        }

        .wc-toast-bar.dismiss {
          animation-name: fade-out;
        }
      }
    </style>
    <div class="wc-toast-bar">
      <slot></slot>
    </div>
    `}}customElements.define("wc-toast-item",h);class f extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.template=document.createElement("template"),this.template.innerHTML=f.template(),this.shadowRoot.append(this.template.content.cloneNode(!0))}connectedCallback(){this.icon=this.getAttribute("icon"),this.type=this.getAttribute("type")||"blank",this.setAttribute("aria-hidden","true"),this.type!=="svg"&&(this.icon=this.icon!=null?this.createIcon(this.type,this.icon):this.createIcon(this.type),this.shadowRoot.appendChild(this.icon))}createIcon(t="blank",e=""){switch(t){case"success":const s=document.createElement("div");return s.classList.add("checkmark-icon"),s;case"error":const a=document.createElement("div");return a.classList.add("error-icon"),a.innerHTML='<svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>',a;case"loading":const n=document.createElement("div");return n.classList.add("loading-icon"),n;case"custom":const r=document.createElement("div");return r.classList.add("custom-icon"),r.innerHTML=e,r;case"blank":default:return document.createElement("div")}}static template(){return`
    <style>
      /*
      * Author: Timo Lins
      * License: MIT
      * Source: 
      * - https://github.com/timolins/react-hot-toast/blob/main/src/components/checkmark.tsx
      * - https://github.com/timolins/react-hot-toast/blob/main/src/components/error.tsx
      * - https://github.com/timolins/react-hot-toast/blob/main/src/components/loader.tsx
      */

      :host {
        display: flex;
        align-self: flex-start;
        margin-block: 4px !important;
      }

      @keyframes circle-animation {
        from {
          transform: scale(0) rotate(45deg);
          opacity: 0;
        }
        to {
          transform: scale(1) rotate(45deg);
          opacity: 1;
        }
      }

      .checkmark-icon {
        width: 20px;
        opacity: 0;
        height: 20px;
        border-radius: 10px;
        background: #61d345;
        position: relative;
        transform: rotate(45deg);
        animation: circle-animation 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        animation-delay: 100ms;
      }

      @keyframes checkmark-animation {
        0% {
          height: 0;
          width: 0;
          opacity: 0;
        }
        40% {
          height: 0;
          width: 6px;
          opacity: 1;
        }
        100% {
          opacity: 1;
          height: 10px;
        }
      }

      .checkmark-icon::after {
        content: '';
        box-sizing: border-box;
        animation: checkmark-animation 0.2s ease-out forwards;
        opacity: 0;
        animation-delay: 200ms;
        position: absolute;
        border-right: 2px solid;
        border-bottom: 2px solid;
        border-color: #fff;
        bottom: 6px;
        left: 6px;
        height: 10px;
        width: 6px;
      }

      @keyframes slide-in {
        from {
          transform: scale(0);
          opacity: 0;
        }
        to {
          transform: scale(1);
          opacity: 1;
        }
      }

      .error-icon {
        width: 20px;
        height: 20px;
        border-radius: 10px;
        background: #ff4b4b;
        display: flex;
        justify-content: center;
        align-items: center;
        animation: slide-in 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
      }

      .error-icon svg{
        width: 16px;
        height: 20px;
        stroke: #fff;
        animation: slide-in .2s ease-out;
        animation-delay: 100ms;
      }

      @keyframes rotate {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }

      .loading-icon {
        height: 20px;
        width: 20px;
        position: relative;
        border-radius: 10px;
        background-color: white;
      }

      .loading-icon::after {
        content: '';
        position: absolute;
        bottom: 4px;
        left: 4px;
        width: 12px;
        height: 12px;
        box-sizing: border-box;
        border: 2px solid;
        border-radius: 100%;
        border-color: #e0e0e0;
        border-right-color: #616161;
        animation: rotate 1s linear infinite;
      }

      @media (prefers-color-scheme: dark) {
        ::slotted(svg) {
          stroke: var(--wc-toast-stroke, #fff);
        }
      }
    </style>
    <slot name="svg"></slot>
    `}}customElements.define("wc-toast-icon",f);class b extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.template=document.createElement("template"),this.template.innerHTML=b.template(),this.shadowRoot.append(this.template.content.cloneNode(!0))}connectedCallback(){this.message=this.getAttribute("message"),this.shadowRoot.querySelector('slot[name="content"]').innerHTML=this.message}static template(){return`
    <style>
      :host {
        display: flex;
        justify-content: center;
        flex: 1 1 auto;
        margin: var(--wc-toast-content-margin) !important;
        color: var(--wc-toast-color, #000);
        font-family: var(--wc-toast-font-family);
        font-size: var(--wc-toast-font-size);
      }
    </style>
    <slot name="content"></slot>
    `}}customElements.define("wc-toast-content",b);class w extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.template=document.createElement("template"),this.template.innerHTML=w.template(),this.shadowRoot.append(this.template.content.cloneNode(!0))}static template(){return`
    <style>
      :host {
        width: 20px;
        opacity: 1;
        height: 20px;
        border-radius: 2px;
        border: 1px solid #dadce0;
        background: var(--wc-toast-background);
        position: relative;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 5px;
      }

      svg {
        stroke: var(--wc-toast-stroke, #2a2a32);
      }
    </style>
    <svg
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
    `}}customElements.define("wc-toast-close-button",w);function u(o){const t=typeof o=="number"?o.toString():o;return Number.parseFloat(t??"0")}function N(o){const t=u(o),e=u("0.3"),s=u("5.4");return{parsedAmount:t,parsedFixedCommision:e,parsedPercentCommision:s}}function R(o=0,t=0,e=0){const s=P(o,t,e),a=s-o;return{sendValue:s,sendCommision:a,fixedSendValue:s.toFixed(2),fixedSendCommision:a.toFixed(2)}}function H(o=0,t=0,e=0){const s=V(o,t,e),a=o-s;return{recieveValue:s,recieveCommision:a,fixedRecieveValue:s.toFixed(2),fixedRecieveCommision:a.toFixed(2)}}function P(o=0,t=0,e=0){return(o+t)/(1-e/100)}function V(o=0,t=0,e=0){return o-t-o*e/100}window.isOnlyNumberOrDot=z;function z({key:o}){return/^\d+(\.\d+)?$/.test(o)}document.addEventListener("click",o=>{const t=o.target;if(!(t instanceof Element))return;const e=t.closest('svg[id^="copy-btn-"]');if(e===null)return;const s=e.id.replace("copy-btn-",""),a=document.getElementById(s);a instanceof HTMLInputElement&&navigator.clipboard.writeText(a.value).then(()=>{i("Copied value!")}).catch(n=>{n instanceof Error&&console.error("Error coying:",n.message)})});C?.addEventListener("input",({target:o})=>{const{value:t}=o,{parsedAmount:e,parsedFixedCommision:s,parsedPercentCommision:a}=N(t);if(Number.isNaN(e)){k("","","","");return}const{fixedSendCommision:n,fixedSendValue:r}=R(e,s,a),{fixedRecieveCommision:l,fixedRecieveValue:d}=H(e,s,a);k(r,d,n,l)});function k(o,t,e,s){g!==null&&(g.value=o),y!==null&&(y.value=t),x!==null&&(x.value=e),v!==null&&(v.value=s)}
