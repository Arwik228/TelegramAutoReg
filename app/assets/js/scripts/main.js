const https=require("https"),fs=require("fs"),path=require("path"),log=require("./logger.js"),api=require("./api.js"),rootPath=require("electron-root-path").rootPath,settings={api:void 0,name:void 0,avatarPath:void 0,proxy:void 0},privateSettings={href:"https://sms-activate.ru/stubs/handler_api.php",balans:5.5};function start(){function a(){switch(localStorage.getItem("page")){case"1":button=document.getElementById("startParse"),button.style.background="",button.innerText="\u041D\u0430\u0447\u0430\u0442\u044C",button.setAttribute("disambled",!1);break;case"2":button=document.getElementById("page2startParse"),button.style.background="",button.innerText="\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C",button.setAttribute("disambled",!1);break;case"3":button=document.getElementById("page3startParse"),button.style.background="",button.innerText="\u041F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u043A\u043E\u0434",button.setAttribute("disambled",!1);}return!1}function b(b){if(""==b)log.error("CheckParam","Empty proxy list"),a();else{let a=[],c=b.split(";");c.forEach(b=>{try{if(c){let c=b.split("@");c[1]?a.push({name:c[0].split(":")[0],password:c[0].split(":")[1],ip:c[1].split(":")[0],port:c[1].split(":")[1]}):(c=b.split(":"),a.push({name:void 0,password:void 0,ip:c[0],port:c[1]}))}}catch{}}),settings.proxy=a,log.ok("CheckParam",`Valid proxy: ${settings.proxy.length}`)}}function c(){let c=document.getElementById("api-token-sms-activate").value,d=document.getElementById("final-user-name").value,e=document.getElementById("final-user-avatar").value,f=document.getElementById("proxyList").value;(function(){localStorage.setItem("token",c),localStorage.setItem("name",d),localStorage.setItem("avatar",e),localStorage.setItem("proxy",f)})(),""==c?(log.error("CheckParam","Empty token"),a()):https.get(`${privateSettings.href}?api_key=${c}&action=getBalance`,g=>{let h=new String;g.on("data",a=>{h+=a}),g.on("end",()=>{if("BAD_KEY"==h)log.error("CheckParam","Invalid Api Token"),a();else if(settings.api=c,log.warn("CheckParam",`Api token is OK, balanse: ${h.split(":")[1]}`),""==d?(log.error("CheckParam","Empty name"),a()):(d=d.split(","),log.ok("CheckParam",`Name correct and lenght: ${d.length?d.length:1}`),settings.name=d),""==e)log.warn("CheckParam","No set Dir, use default avatar");else try{fs.existsSync(e)?(localAvatarPath=[],fs.readdir(e.replace(/\\/g,"\\\\"),(a,c)=>{let d=0;a?log.log(a):(c.forEach(a=>{".jpg"==path.parse(a).ext&&(localAvatarPath.push(a),d++)}),settings.avatarPath=localAvatarPath,log.ok("CheckParam",`Set A folder avatar: ${e} and count avatar: ${d}`),b(f),api.startParser(settings,privateSettings,h.split(":")[1]))})):(log.error("CheckParam",`Please clear empty avatar path OR set valid path to folder`),a())}catch{log.error("CheckParam",`Please clear not path data a avatar input`),a()}})}).on("error",a=>{log.log(a)})}function d(){let b=document.getElementById("page2Number").value.split("+").pop(),c=document.getElementById("page2final-user-name").value,d=document.getElementById("page2final-user-avatar").value,e=document.getElementById("page2proxyList").value;(()=>{let f={number:void 0,name:void 0,avatar:void 0,proxy:void 0};if(""==b)log.error("CheckParam","Empty number"),a();else if(log.ok("CheckParam",`Number add`),f.number=b,""==c)log.error("CheckParam","No set name"),a();else if(f.name=c,""==d&&log.warn("CheckParam","No set avatar"),!(fs.existsSync(d)||""==d))log.error("CheckParam","I cant find this path"),a();else if(f.avatar=d,""==e)log.error("CheckParam","No set proxy"),a();else if(""==e)log.error("CheckParam","Empty proxy list"),a();else{let a=[],b=e.trim().split(";");b.forEach(c=>{try{if(b){let b=c.split("@");b[1]?a.push({name:b[0].split(":")[0],password:b[0].split(":")[1],ip:b[1].split(":")[0],port:b[1].split(":")[1]}):(b=c.split(":"),a.push({name:void 0,password:void 0,ip:b[0],port:b[1]}))}}catch{}}),f.proxy=a,log.ok("CheckParam",`Valid proxy: ${f.proxy.length}`),api.oneAdd(f)}})()}function e(){let b=document.getElementById("page3Number").value.split("+").pop();let c=document.getElementById("page3proxyList").value;localStorage.setItem("code2",!1),(()=>{let d={number:void 0,proxy:void 0};if(""==b)log.error("CheckParam","Empty number"),a();else if(log.ok("CheckParam",`Number add`),d.number=b,""==c)log.error("CheckParam","No set proxy"),a();else{let a=[],b=c.trim().split(";");b.forEach(c=>{try{if(b){let b=c.split("@");b[1]?a.push({name:b[0].split(":")[0],password:b[0].split(":")[1],ip:b[1].split(":")[0],port:b[1].split(":")[1]}):(b=c.split(":"),a.push({name:void 0,password:void 0,ip:b[0],port:b[1]}))}}catch{}}),d.proxy=a,log.ok("CheckParam",`Valid proxy: ${d.proxy.length}`),api.getCode(d)}})()}log.start(),localStorage.setItem("page",1),document.getElementById("startParse").addEventListener("click",a=>{"true"!=a.target.getAttribute("disambled")&&(log.clear(),a.target.setAttribute("disambled",!0),a.target.style.background="#e8b135",a.target.innerText="\u0412\u044B\u043F\u043E\u043B\u043D\u044F\u0435\u0442\u0441\u044F",log.ok("CheckParam","Start settings check"),c())}),document.getElementById("page2startParse").addEventListener("click",a=>{"true"!=a.target.getAttribute("disambled")&&(log.clear(),a.target.setAttribute("disambled",!0),a.target.style.background="#e8b135",a.target.innerText="\u0412\u044B\u043F\u043E\u043B\u043D\u044F\u0435\u0442\u0441\u044F",log.ok("CheckParam","Start settings check"),d())}),document.getElementById("page3startParse").addEventListener("click",a=>{"true"!=a.target.getAttribute("disambled")&&(log.clear(),a.target.setAttribute("disambled",!0),a.target.style.background="#e8b135",a.target.innerText="\u0412\u044B\u043F\u043E\u043B\u043D\u044F\u0435\u0442\u0441\u044F",log.ok("CheckParam","Start settings check"),e())}),document.getElementById("navigate").addEventListener("click",function(a){if(1==a.target.innerText.length||"FAQ"==a.target.innerText)switch(document.getElementById("page3CodeMessage").value="",log.clear(),localStorage.setItem("page",a.target.innerText),log.log(`Get page: ${a.target.innerText}`),a.target.innerText){case"1":document.getElementById("page1").style.display="block",document.getElementById("page2").style.display="none",document.getElementById("page3").style.display="none",document.getElementById("page4").style.display="none";break;case"2":document.getElementById("page1").style.display="none",document.getElementById("page2").style.display="block",document.getElementById("page3").style.display="none",document.getElementById("page4").style.display="none";break;case"3":document.getElementById("page1").style.display="none",document.getElementById("page2").style.display="none",document.getElementById("page3").style.display="block",document.getElementById("page4").style.display="none",(()=>{let a=path.join(rootPath,"account");if(fs.existsSync(a)){let b=fs.readdirSync(a).filter(b=>fs.statSync(path.join(a,b)).isDirectory());for(local in b)log.warn("GetAccount",`Available: ${b[local]}`)}else log.warn("GetAccount",`Account is no exist`)})();break;case"FAQ":document.getElementById("page1").style.display="none",document.getElementById("page2").style.display="none",document.getElementById("page3").style.display="none",document.getElementById("page4").style.display="block";}})}module.exports.start=start;
