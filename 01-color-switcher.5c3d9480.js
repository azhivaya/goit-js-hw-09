!function(){var e=document.querySelector("[data-start]"),t=document.querySelector("[data-stop]"),d=null,n=!1;function a(){return"#".concat(Math.floor(16777215*Math.random()).toString(16))}t.disabled=!0,e.addEventListener("click",(function(){if(n)return;t.disabled=!1,!1===t.disabled&&(e.disabled=!0);n=!0,d=setInterval((function(){document.body.style.backgroundColor=a()}),1e3)})),t.addEventListener("click",(function(){clearInterval(d),n=!1,t.disabled=!0,!0===t.disabled&&(e.disabled=!1)}))}();
//# sourceMappingURL=01-color-switcher.5c3d9480.js.map
