(()=>{"use strict";({486:function(t,n){var e=this&&this.__awaiter||function(t,n,e,r){return new(e||(e=Promise))((function(o,a){function i(t){try{u(r.next(t))}catch(t){a(t)}}function c(t){try{u(r.throw(t))}catch(t){a(t)}}function u(t){var n;t.done?o(t.value):(n=t.value,n instanceof e?n:new e((function(t){t(n)}))).then(i,c)}u((r=r.apply(t,n||[])).next())}))},r=this&&this.__generator||function(t,n){var e,r,o,a,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return a={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function c(c){return function(u){return function(c){if(e)throw new TypeError("Generator is already executing.");for(;a&&(a=0,c[0]&&(i=0)),i;)try{if(e=1,r&&(o=2&c[0]?r.return:c[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,c[1])).done)return o;switch(r=0,o&&(c=[2&c[0],o.value]),c[0]){case 0:case 1:o=c;break;case 4:return i.label++,{value:c[1],done:!1};case 5:i.label++,r=c[1],c=[0];continue;case 7:c=i.ops.pop(),i.trys.pop();continue;default:if(!((o=(o=i.trys).length>0&&o[o.length-1])||6!==c[0]&&2!==c[0])){i=0;continue}if(3===c[0]&&(!o||c[1]>o[0]&&c[1]<o[3])){i.label=c[1];break}if(6===c[0]&&i.label<o[1]){i.label=o[1],o=c;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(c);break}o[2]&&i.ops.pop(),i.trys.pop();continue}c=n.call(t,i)}catch(t){c=[6,t],r=0}finally{e=o=0}if(5&c[0])throw c[1];return{value:c[0]?c[1]:void 0,done:!0}}([c,u])}}};function o(){return e(this,void 0,void 0,(function(){var t;return r(this,(function(n){switch(n.label){case 0:return[4,fetch("/config.json")];case 1:if(!(t=n.sent()).ok)throw new Error("Error fetching config: ".concat(t.statusText));return[2,t.json()]}}))}))}function a(t,n){return e(this,void 0,void 0,(function(){var e;return r(this,(function(r){switch(r.label){case 0:return[4,fetch("/api/solar",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({apiKey:t,address:n})})];case 1:if(!(e=r.sent()).ok)throw new Error("Error fetching solar data: ".concat(e.statusText));return[2,e.json()]}}))}))}Object.defineProperty(n,"__esModule",{value:!0}),function(){e(this,void 0,void 0,(function(){var t,n,e,i,c,u,s,l,f;return r(this,(function(r){switch(r.label){case 0:return[4,o()];case 1:return t=r.sent(),n=t.apiKey,e=t.address,[4,a(n,e)];case 2:return i=r.sent(),c=i.imageUrl,u=i.solarData,(s=document.getElementById("canvas-container"))&&(l=function(t){var n=new Image;return n.src=t,n.alt="Solar Panel Configuration",n}(c),s.appendChild(l),(f=document.createElement("pre")).textContent=JSON.stringify(u,null,2),s.appendChild(f)),[2]}}))}))}()}})[486](0,{})})();