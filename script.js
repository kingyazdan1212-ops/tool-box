const $=s=>document.querySelector(s);
let lang=localStorage.lang||"fa", dark=localStorage.dark==="1", currentCat="all";
document.body.classList.toggle("dark",dark);

const cats={
fa:{all:"همه",calc:"محاسبات",text:"متن",convert:"تبدیل",time:"زمان",dev:"توسعه‌دهنده",other:"متفرقه"},
en:{all:"All",calc:"Calculators",text:"Text",convert:"Converters",time:"Time",dev:"Developer",other:"Other"}
};
const tools=[
["calc","🧮","ماشین حساب","Calculator","calc"],["percent","📊","درصد","Percentage","percent"],["average","📈","میانگین","Average","average"],["bmi","⚖️","شاخص BMI","BMI Calculator","bmi"],["age","🎂","محاسبه سن","Age Calculator","age"],["tip","💵","محاسبه انعام","Tip Calculator","tip"],["discount","🏷️","تخفیف","Discount","discount"],["loan","🏦","قسط ساده","Loan Calculator","loan"],
["length","📏","تبدیل طول","Length Converter","length"],["weight","⚖️","تبدیل وزن","Weight Converter","weight"],["temp","🌡️","تبدیل دما","Temperature Converter","temp"],["speed","🚗","تبدیل سرعت","Speed Converter","speed"],["area","📐","مساحت","Area Calculator","area"],["volume","🧊","حجم مکعب","Cube Volume","volume"],["base","🔢","مبنای عدد","Number Base","base"],
["words","🔤","شمارش کلمات","Word Counter","words"],["reverse","🔄","برعکس کردن متن","Reverse Text","reverse"],["upper","🔠","حروف بزرگ","Uppercase","upper"],["lower","🔡","حروف کوچک","Lowercase","lower"],["remove","🧹","حذف فاصله‌های اضافی","Trim Spaces","remove"],["sort","↕️","مرتب‌سازی خطوط","Sort Lines","sort"],["slug","🔗","ساخت Slug","Slug Generator","slug"],["json","{}","فرمت JSON","JSON Formatter","json"],
["password","🔐","رمز عبور ساز","Password Generator","password"],["uuid","🆔","UUID ساز","UUID Generator","uuid"],["color","🎨","رنگ HEX/RGB","Color Converter","color"],["qr","▦","سازنده QR","QR Generator","qr"],["base64","🧬","Base64","Base64 Encoder","base64"],
["timer","⏱️","تایمر","Timer","timer"],["stopwatch","⏲️","کرنومتر","Stopwatch","stopwatch"],["countdown","⏳","شمارش معکوس","Countdown","countdown"],["days","📅","فاصله دو تاریخ","Date Difference","days"],["week","🗓️","روز هفته","Day of Week","week"],["world","🌍","ساعت جهانی","World Clock","world"],
["notes","📝","یادداشت","Notes","notes"],["todo","✅","لیست کارها","To-Do List","todo"],["random","🎲","عدد تصادفی","Random Number","random"],["dice","🎲","تاس","Dice Roller","dice"],["coin","🪙","شیر یا خط","Coin Flip","coin"],["counter","🔢","شمارنده","Counter","counter"],["stop","🛑","توقف خودکار","Auto Stop","stop"],["link","🌐","بازکن لینک","Open Link","link"],["copy","📋","کپی متن","Copy Text","copy"],["share","📤","اشتراک‌گذاری","Share Text","share"],["storage","💾","ذخیره‌ساز محلی","Local Storage","storage"],["about","ℹ️","درباره Tool Box","About Tool Box","about"],["fullscreen","⛶","تمام صفحه","Fullscreen","fullscreen"]
];

const catMap={calc:["calc","percent","average","bmi","age","tip","discount","loan","area","volume"],text:["words","reverse","upper","lower","remove","sort","slug","copy"],convert:["length","weight","temp","speed","base","color","base64"],time:["timer","stopwatch","countdown","days","week","world"],dev:["json","password","uuid","qr"],other:["notes","todo","random","dice","coin","counter","stop","link","share","storage","about","fullscreen"]};

function t(fa,en){return lang==="fa"?fa:en}
function renderCats(){ $("#categories").innerHTML=Object.entries(cats[lang]).map(([k,v])=>`<button class="cat ${currentCat===k?"active":""}" onclick="setCat('${k}')">${v}</button>`).join("")}
function render(){
 const q=$("#search").value.toLowerCase().trim();
 let arr=tools.filter(x=>(currentCat==="all"||catMap[currentCat]?.includes(x[0]))&&(t(x[2],x[3]).toLowerCase().includes(q)));
 $("#toolsGrid").innerHTML=arr.map(x=>`<article class="tool" onclick="openTool('${x[4]}')"><div class="emoji">${x[1]}</div><h3>${t(x[2],x[3])}</h3><p>${desc(x[0])}</p></article>`).join("")||`<div style="grid-column:1/-1;text-align:center;padding:40px">🔎 ${t("ابزاری پیدا نشد","No tool found")}</div>`;
}
function desc(id){const d={calc:["محاسبات سریع","Quick calculations"],percent:["محاسبه درصد","Calculate percentages"],words:["تعداد کلمات و حروف","Count words and characters"],password:["ساخت رمز تصادفی","Generate a random password"],color:["تبدیل و انتخاب رنگ","Color tools"],timer:["تایمر ساده","Simple timer"],notes:["یادداشت روی دستگاه","Local notes"],todo:["مدیریت کارهای روزانه","Daily tasks"],json:["زیباسازی JSON","Format JSON"],qr:["ساخت QR با لینک","Create a QR from a link"]};return t(...(d[id]||["ابزار کاربردی","Useful tool"]))}
function setCat(c){currentCat=c;renderCats();render()}
$("#search").oninput=render;

function field(id,label,type="text",value=""){return `<div class="field"><label>${label}</label><input id="${id}" type="${type}" value="${value}"></div>`}
function openTool(id){
 let title=tools.find(x=>x[0]===id); $("#modal").classList.remove("hidden");
 let body=`<h2>${title[1]} ${t(title[2],title[3])}</h2>`;
 const B=t;
 const forms={
 calc:()=>`${field("expr",B("عبارت ریاضی","Math expression"))}<button class="btn" onclick="calc()">= ${B("محاسبه","Calculate")}</button><div id="out" class="result"></div>`,
 percent:()=>`${field("a",B("عدد","Number"),"number")}${field("b",B("درصد","Percent"),"number")}<button class="btn" onclick="out('a × b ÷ 100 = '+(+a.value*+b.value/100))">${B("محاسبه","Calculate")}</button><div id="out" class="result"></div>`,
 average:()=>`${field("nums",B("اعداد با فاصله یا ویرگول","Numbers separated by spaces or commas"))}<button class="btn" onclick="let n=nums.value.split(/[ ,،]+/).filter(Boolean).map(Number);out(n.reduce((a,b)=>a+b,0)/n.length)">OK</button><div id="out" class="result"></div>`,
 bmi:()=>`${field("w",B("وزن (کیلوگرم)","Weight (kg)"),"number")}${field("h",B("قد (سانتی‌متر)","Height (cm)"),"number")}<button class="btn" onclick="let v=+w.value/((+h.value/100)**2);out(v.toFixed(2))"><span>${B("محاسبه","Calculate")}</span></button><div id="out" class="result"></div>`,
 age:()=>`${field("dob",B("تاریخ تولد","Birth date"),"date")}<button class="btn" onclick="let d=new Date(dob.value),n=new Date();out((n.getFullYear()-d.getFullYear())+' '+B('سال','years'))">${B("محاسبه","Calculate")}</button><div id="out" class="result"></div>`,
 tip:()=>`${field("bill",B("مبلغ","Bill"),"number")}${field("tipv",B("درصد انعام","Tip %"),"number","10")}<button class="btn" onclick="out((+bill.value*+tipv.value/100).toFixed(2))">${B("محاسبه","Calculate")}</button><div id="out" class="result"></div>`,
 discount:()=>`${field("price",B("قیمت","Price"),"number")}${field("disc",B("درصد تخفیف","Discount %"),"number")}<button class="btn" onclick="out((+price.value*(1-+disc.value/100)).toFixed(2))">${B("محاسبه","Calculate")}</button><div id="out" class="result"></div>`,
 loan:()=>`${field("loanp",B("اصل وام","Principal"),"number")}${field("months",B("تعداد ماه","Months"),"number")}${field("rate",B("سود سالانه %","Annual rate %"),"number")}<button class="btn" onclick="let r=+rate.value/1200,n=+months.value,p=+loanp.value;out((r? p*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1):p/n).toFixed(2))">${B("محاسبه قسط","Calculate payment")}</button><div id="out" class="result"></div>`,
 length:()=>converter("متر","فوت",3.28084), weight:()=>converter("کیلوگرم","پوند",2.20462), speed:()=>converter("کیلومتر/ساعت","مایل/ساعت",0.621371),
 temp:()=>`${field("tv",B("دما","Temperature"),"number")}<select id="unit"><option value="c">°C → °F</option><option value="f">°F → °C</option></select><button class="btn" onclick="let v=+tv.value;out(unit.value==='c'?(v*9/5+32).toFixed(2):((v-32)*5/9).toFixed(2))">${B("تبدیل","Convert")}</button><div id="out" class="result"></div>`,
 area:()=>`${field("aw",B("طول","Length"),"number")}${field("ah",B("عرض","Width"),"number")}<button class="btn" onclick="out(+aw.value*+ah.value)">${B("محاسبه","Calculate")}</button><div id="out" class="result"></div>`,
 volume:()=>`${field("vw","طول","number")}${field("vh","عرض","number")}${field("vd","ارتفاع","number")}<button class="btn" onclick="out(+vw.value*+vh.value*+vd.value)">${B("محاسبه","Calculate")}</button><div id="out" class="result"></div>`,
 words:()=>`${ta("txt",B("متن","Text"))}<button class="btn" onclick="let s=txt.value;out(B('کلمات','Words')+': '+(s.trim()?s.trim().split(/\\s+/).length:0)+'<br>'+B('حروف','Characters')+': '+s.length)">${B("شمارش","Count")}</button><div id="out" class="result"></div>`,
 reverse:()=>textOp("reverse",B("برعکس","Reverse"),s=>[...s].reverse().join("")),
 upper:()=>textOp("upper",B("بزرگ","Uppercase"),s=>s.toUpperCase()), lower:()=>textOp("lower",B("کوچک","Lowercase"),s=>s.toLowerCase()),
 remove:()=>textOp("remove",B("حذف فاصله اضافی","Trim"),s=>s.replace(/\s+/g," ").trim()),
 sort:()=>textOp("sort",B("مرتب کن","Sort"),s=>s.split("\n").sort().join("\n")),
 slug:()=>textOp("slug","Slug",s=>s.toLowerCase().trim().replace(/[^\w\u0600-\u06FF]+/g,"-").replace(/^-|-$/g,"")),
 json:()=>`${ta("jsonin","JSON") }<button class="btn" onclick="try{out('<pre>'+escapeHtml(JSON.stringify(JSON.parse(jsonin.value),null,2))+'</pre>')}catch(e){out('❌ '+e.message)}">${B("فرمت","Format")}</button><div id="out" class="result"></div>`,
 password:()=>`${field("plen",B("طول رمز","Length"),"number","16")}<button class="btn" onclick="let s='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';let r='';for(let i=0;i<+plen.value;i++)r+=s[Math.floor(Math.random()*s.length)];out('<b>'+r+'</b>')">${B("ساخت رمز","Generate")}</button><div id="out" class="result"></div>`,
 uuid:()=>`<button class="btn" onclick="out(crypto.randomUUID())">${B("ساخت UUID","Generate UUID")}</button><div id="out" class="result"></div>`,
 color:()=>`${field("hex","HEX","#6c5ce7")}<button class="btn" onclick="let v=hex.value;out('RGB: '+hexToRgb(v));document.getElementById('box').style.background=v">OK</button><div id="box" class="colorbox"></div><div id="out" class="result"></div>`,
 qr:()=>`${field("qrtext",B("متن یا لینک","Text or URL"))}<button class="btn" onclick="document.getElementById('qrimg').src='https://api.qrserver.com/v1/create-qr-code/?size=220x220&data='+encodeURIComponent(qrtext.value)">${B("ساخت QR","Create QR")}</button><div class="result"><img id="qrimg" width="220" alt="QR"></div>`,
 base64:()=>`${ta("b64",B("متن","Text"))}<button class="btn" onclick="out(btoa(unescape(encodeURIComponent(b64.value))))">Encode</button><button class="btn" onclick="out(decodeURIComponent(escape(atob(b64.value))))">Decode</button><div id="out" class="result"></div>`,
 timer:()=>`${field("sec",B("ثانیه","Seconds"),"number","60")}<button class="btn" onclick="startTimer(+sec.value)">${B("شروع","Start")}</button><div id="out" class="result">00:00</div>`,
 stopwatch:()=>`<button class="btn" onclick="startSW()">▶</button> <button class="btn" onclick="stopSW()">⏹</button><button class="btn" onclick="resetSW()">↺</button><div id="out" class="result">00:00.0</div>`,
 countdown:()=>`${field("cd",B("ثانیه","Seconds"),"number","10")}<button class="btn" onclick="startTimer(+cd.value)">Start</button><div id="out" class="result">00:00</div>`,
 days:()=>`${field("d1","تاریخ اول","date")}${field("d2","تاریخ دوم","date")}<button class="btn" onclick="out(Math.abs(new Date(d2.value)-new Date(d1.value))/86400000+' '+B('روز','days'))">${B("محاسبه","Calculate")}</button><div id="out" class="result"></div>`,
 week:()=>`${field("wd","تاریخ","date")}<button class="btn" onclick="out(new Date(wd.value).toLocaleDateString(lang==='fa'?'fa-IR':'en-US',{weekday:'long'}))">OK</button><div id="out" class="result"></div>`,
 world:()=>`<div class="result">${new Date().toLocaleString(lang==='fa'?'fa-IR':'en-US')}<br>UTC: ${new Date().toUTCString()}</div>`,
 notes:()=>`${ta("note",B("یادداشت","Note"),localStorage.note||"")}<button class="btn" onclick="localStorage.note=note.value;out(B('ذخیره شد ✓','Saved ✓'))">Save</button><div id="out" class="result"></div>`,
 todo:()=>`${field("task",B("کار جدید","New task"))}<button class="btn" onclick="addTodo()">+</button><div id="out" class="result">${localStorage.todo||""}</div>`,
 random:()=>`${field("min","Min","number","1")}${field("max","Max","number","100")}<button class="btn" onclick="out(Math.floor(Math.random()*(+max.value-+min.value+1))+ +min.value)">🎲</button><div id="out" class="result"></div>`,
 dice:()=>`<button class="btn" onclick="out('🎲 '+(Math.floor(Math.random()*6)+1))">Roll</button><div id="out" class="result"></div>`,
 coin:()=>`<button class="btn" onclick="out(Math.random()<.5?B('شیر 🪙','Heads 🪙'):B('خط 🪙','Tails 🪙'))">Flip</button><div id="out" class="result"></div>`,
 counter:()=>`<div style="font-size:45px;text-align:center" id="count">0</div><button class="btn" onclick="count.textContent=+count.textContent+1">+</button><button class="btn" onclick="count.textContent=+count.textContent-1">−</button>`,
 stop:()=>`${field("stopsec",B("بعد از چند ثانیه؟","Seconds"),"number","5")}<button class="btn" onclick="setTimeout(()=>alert(B('تمام شد!','Time is up!')),+stopsec.value*1000)">Start</button>`,
 link:()=>`${field("url",B("لینک","URL"),"url","https://")}<button class="btn" onclick="window.open(url.value,'_blank')">Open</button>`,
 copy:()=>`${ta("cp",B("متن","Text"))}<button class="btn" onclick="navigator.clipboard.writeText(cp.value);out(B('کپی شد ✓','Copied ✓'))">Copy</button><div id="out" class="result"></div>`,
 share:()=>`${ta("sh",B("متن","Text"))}<button class="btn" onclick="navigator.share?navigator.share({text:sh.value}):navigator.clipboard.writeText(sh.value)">Share</button>`,
 storage:()=>`<button class="btn" onclick="out(Object.keys(localStorage).join('<br>')||B('خالی','Empty'))">View storage</button><div id="out" class="result"></div>`,
 about:()=>`<p>🧰 <b>Tool Box</b></p><p>${B("یک جعبه‌ابزار رایگان و ساده برای کارهای روزمره.","A free and simple toolbox for everyday tasks.")}</p><p>Yazdan<br>@Yazdangpt1</p>`,
 fullscreen:()=>`<button class="btn" onclick="document.documentElement.requestFullscreen()">⛶ ${B("تمام صفحه","Fullscreen")}</button>`
 };
 body+=forms[id]?forms[id]():`<p>${B("این ابزار در نسخه بعدی کامل‌تر می‌شود.","This tool will be expanded in a future version.")}</p>`;
 $("#modalBody").innerHTML=body;
}
function ta(id,label,val=""){return `<div class="field"><label>${label}</label><textarea id="${id}">${val}</textarea></div>`}
function converter(a,b,m){return `${field("cv",a,"number")}<button class="btn" onclick="out((+cv.value*${m}).toFixed(4)+' ${b}')">${t("تبدیل","Convert")}</button><div id="out" class="result"></div>`}
function textOp(id,label,fn){return `${ta("txt",t("متن","Text"))}<button class="btn" onclick="out(escapeHtml(${fn.toString()}(txt.value)))">${label}</button><div id="out" class="result"></div>`}
function out(x){$("#out").innerHTML=x}
function calc(){try{let e=$("#expr").value.replace(/[^0-9+\-*/().% ]/g,"");out(Function("return "+e)())}catch(e){out("❌ "+t("عبارت نامعتبر","Invalid expression"))}}
function escapeHtml(s){return String(s).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;")}
function hexToRgb(h){h=h.replace("#","");if(h.length===3)h=h.split("").map(x=>x+x).join("");return h.match(/.{2}/g).map(x=>parseInt(x,16)).join(", ")}
let timerInt,swInt,swStart=0;
function startTimer(s){clearInterval(timerInt);let x=s;out(format(x));timerInt=setInterval(()=>{x--;out(format(Math.max(0,x)));if(x<=0){clearInterval(timerInt);alert(t("تمام شد!","Time is up!"))}},1000)}
function format(s){return String(Math.floor(s/60)).padStart(2,"0")+":"+String(s%60).padStart(2,"0")}
function startSW(){swStart=Date.now();clearInterval(swInt);swInt=setInterval(()=>out(((Date.now()-swStart)/1000).toFixed(1)),100)}
function stopSW(){clearInterval(swInt)} function resetSW(){clearInterval(swInt);out("00:00.0")}
function addTodo(){let v=localStorage.todo||"";v+=`<div>☐ ${escapeHtml($("#task").value)}</div>`;localStorage.todo=v;$("#out").innerHTML=v}
$("#closeModal").onclick=()=>$("#modal").classList.add("hidden");$("#modal").onclick=e=>{if(e.target.id==="modal")$("#modal").classList.add("hidden")}
$("#themeBtn").onclick=()=>{dark=!dark;localStorage.dark=dark?"1":"0";document.body.classList.toggle("dark",dark);$("#themeBtn").textContent=dark?"🌙":"☀️"}
$("#langBtn").onclick=()=>{lang=lang==="fa"?"en":"fa";localStorage.lang=lang;applyLang()}
function applyLang(){document.documentElement.lang=lang;document.documentElement.dir=lang==="fa"?"rtl":"ltr";$("#langBtn").textContent=lang==="fa"?"EN":"FA";document.querySelectorAll("[data-i18n]").forEach(e=>{const k=e.dataset.i18n;e.textContent={subtitle:t("مجموعه ابزارهای کاربردی","Useful tools collection"),ready:t("سریع، ساده و کاربردی","Fast, simple and useful"),heroTitle:t("همه ابزارهای مورد نیازت، یکجا","All the tools you need, in one place"),heroText:t("یک جعبه‌ابزار سبک و زیبا برای کارهای روزمره.","A lightweight toolbox for everyday tasks."),made:t("ساخته شده توسط","Made by"),support:t("پشتیبانی تلگرام:","Telegram support:")}[k]||e.textContent});$("#search").placeholder=t("جست‌وجوی ابزار...","Search tools...");renderCats();render()}
applyLang();
if("serviceWorker" in navigator) window.addEventListener("load",()=>navigator.serviceWorker.register("sw.js").catch(()=>{}));
