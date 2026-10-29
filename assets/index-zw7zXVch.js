(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const c of t.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&l(c)}).observe(document,{childList:!0,subtree:!0});function n(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function l(e){if(e.ep)return;e.ep=!0;const t=n(e);fetch(e.href,t)}})();function s(o=Math.random){const r=[];let n;do n=Math.floor(o()*10)+1,r.push(n);while(n===10);return{rolls:r,total:r.reduce((l,e)=>l+e,0),fumble:r[0]===1}}const u=document.querySelector("#app");u.innerHTML=`
  <h1>CP2020 Web</h1>
  <button id="roll">1d10 굴리기</button>
  <pre id="log"></pre>
`;const i=document.querySelector("#log");document.querySelector("#roll").onclick=()=>{const o=s();i.textContent=`[${o.rolls.join(" + ")}] = ${o.total}${o.fumble?" (대실패)":""}
`+i.textContent};
