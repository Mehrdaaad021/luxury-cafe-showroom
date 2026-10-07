// site.js — مغز زنده و بازیگوش سایت + صحنه انیمیشنی هدر
var CONFIG = {
  // ساعت کاری: [یکشنبه، دوشنبه، سه‌شنبه، چهارشنبه، پنجشنبه، جمعه، شنبه]
  hours: [
    { o: 7, c: 22 }, { o: 7, c: 22 }, { o: 7, c: 22 }, { o: 7, c: 22 },
    { o: 7, c: 22 }, { o: 9, c: 22 }, { o: 7, c: 22 }
  ],
  specials: [
    "ویژه امروز: قهوه دارچین و هل",
    "ویژه امروز: کلد برو پرتقال",
    "ویژه امروز: موکای فندق",
    "ویژه امروز: لاته زعفرونی",
    "ویژه امروز: کلد برو نارگیل",
    "ویژه امروز: شات خرما و گردو",
    "ویژه امروز: لاته عسل و گلاب"
  ],
  tel: "tel:+989120000000",
  whatsapp: "https://wa.me/989120000000",
  instagram: "https://instagram.com/yourcafe"
};

var FA_WEEK = ["یکشنبه","دوشنبه","سه‌شنبه","چهارشنبه","پنجشنبه","جمعه","شنبه"];
function faNum(n){ return String(n).replace(/\d/g, function(d){ return "۰۱۲۳۴۵۶۷۸۹"[d]; }); }
function esc(s){ return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }
function faDate(d){
  try { return new Intl.DateTimeFormat("fa-IR", { day:"numeric", month:"long" }).format(d); }
  catch(e){ return faNum(d.getDate()) + "/" + faNum(d.getMonth()+1); }
}

/* ===== صحنه انیمیشنی هدر: دانه‌ها → فنجان لاته ===== */
function heroHTML(){
  return '' +
  '<div class="heroAnim play" id="heroAnim">' +
    '<div class="beanFall"></div>' +
    '<div class="cupWrap">' +
      '<div class="ring"></div><div class="ring r2"></div>' +
      '<svg class="cupSvg" viewBox="0 0 200 200" aria-hidden="true">' +
        '<defs><radialGradient id="coffeeG" cx="50%" cy="42%" r="65%">' +
          '<stop offset="0%" stop-color="#c98a4b"/>' +
          '<stop offset="55%" stop-color="#a4632f"/>' +
          '<stop offset="100%" stop-color="#7c4a20"/>' +
        '</radialGradient></defs>' +
        '<circle class="saucerC" cx="100" cy="100" r="88"/>' +
        '<circle class="rimC" cx="100" cy="100" r="62"/>' +
        '<circle class="coffeeC" cx="100" cy="100" r="54"/>' +
        '<path class="heartP" d="M100 130 C 77 111, 65 96, 65 81 C 65 69, 75 61, 85 61 C 92 61, 98 65, 100 72 C 102 65, 108 61, 115 61 C 125 61, 135 69, 135 81 C 135 96, 123 111, 100 130 Z"/>' +
      '</svg>' +
      '<div class="steamW"><span></span><span></span><span></span></div>' +
    '</div>' +
    '<p class="heroHint">برای تکرار جادو کلیک کن ☝️</p>' +
  '</div>';
}
function spawnBeans(){
  var wrap = document.querySelector("#heroAnim .beanFall");
  if (!wrap) return;
  wrap.innerHTML = "";
  for (var i = 0; i < 14; i++){
    var b = document.createElement("span");
    b.className = "bean";
    b.style.setProperty("--sx", (6 + Math.random()*88).toFixed(1) + "%");
    b.style.setProperty("--dl", (Math.random()*1.1).toFixed(2) + "s");
    b.style.setProperty("--rt", Math.floor(Math.random()*360) + "deg");
    b.style.setProperty("--sz", Math.floor(10 + Math.random()*9) + "px");
    wrap.appendChild(b);
  }
}
function buildHero(){
  var stage = document.querySelector(".stage");
  if (!stage || stage.dataset.hero) return;
  stage.dataset.hero = "1";
  stage.innerHTML = heroHTML();
  spawnBeans();
  stage.addEventListener("click", function(){
    var h = document.getElementById("heroAnim");
    if (!h) return;
    h.classList.remove("play");
    void h.offsetWidth;           // ریست انیمیشن‌ها
    spawnBeans();                 // دانه‌های تصادفی تازه
    h.classList.add("play");
  });
}

/* ===== بقیه قابلیت‌های زنده ===== */
function setStatus(){
  var p = document.querySelector("p.status"); if (!p) return;
  var span = p.querySelector("[data-edit='left.text']"); if (!span) return;
  var now = new Date(), day = now.getDay(), h = now.getHours() + now.getMinutes()/60;
  var t = CONFIG.hours[day], open = (h >= t.o && h < t.c);
  p.classList.toggle("is-open", open);
  p.classList.toggle("is-closed", !open);
  if (open) span.textContent = "الان بازیم · تا " + faNum(t.c) + ":۰۰";
  else {
    var nd = (h < t.o) ? day : (day+1)%7;
    span.textContent = "فعلاً بسته‌ایم · باز می‌شویم " + FA_WEEK[nd] + " ساعت " + faNum(CONFIG.hours[nd].o) + ":۰۰";
  }
}
function setToday(){
  var term = document.querySelector("[data-edit='left.term.0']");
  var body = document.querySelector("[data-edit='left.body.0']");
  var now = new Date();
  if (term) term.textContent = "امروز در کافه";
  if (body) body.innerHTML = FA_WEEK[now.getDay()] + "، " + faNum(faDate(now)) + "<br>" + CONFIG.specials[now.getDay()];
}
function injectOnce(){
  if (document.querySelector(".dock")) return;
  document.querySelectorAll("section.sec").forEach(function(sec){
    var d = document.createElement("div"); d.className = "divider";
    d.innerHTML = "<span>✦</span><span>☕</span><span>✦</span>";
    sec.parentNode.insertBefore(d, sec.nextSibling);
  });
  var dock = document.createElement("div"); dock.className = "dock";
  dock.innerHTML =
    '<a href="'+CONFIG.tel+'" title="تماس">📞</a>' +
    '<a href="'+CONFIG.whatsapp+'" target="_blank" rel="noopener" title="واتساپ">💬</a>' +
    '<a href="'+CONFIG.instagram+'" target="_blank" rel="noopener" title="اینستاگرام">📸</a>';
  document.body.appendChild(dock);
  var head = document.querySelector("#menu .secHead");
  if (head){
    var b = document.createElement("button"); b.id = "luckBtn"; b.type = "button";
    b.textContent = "چی بخورم؟ 🎲"; b.onclick = luck;
    head.appendChild(b);
  }
  var targets = document.querySelectorAll("section.sec, .title, .stage, dl.today, .footer");
  if ("IntersectionObserver" in window){
    var io = new IntersectionObserver(function(es){
      es.forEach(function(e){ if (e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: .12 });
    targets.forEach(function(n){ n.classList.add("rv"); io.observe(n); });
  } else targets.forEach(function(n){ n.classList.add("rv","in"); });
}
function luck(){
  var menu = (window.CONTENT && window.CONTENT.menu) || [];
  var cats = menu.filter(function(c){ return (c.items||[]).length; });
  if (!cats.length) return;
  var c = cats[Math.floor(Math.random()*cats.length)];
  var it = c.items[Math.floor(Math.random()*c.items.length)];
  var ov = document.createElement("div"); ov.className = "luck";
  ov.innerHTML =
    '<div class="luckCard"><div class="luckEmoji">🎲</div>' +
    '<p class="luckCat">پیشنهاد ما از «' + esc(c.title) + '»</p>' +
    '<h3 class="luckName">' + esc(it.name) + '</h3>' +
    '<p class="luckPrice">' + esc(it.price||"") + '</p>' +
    '<div class="luckBtns"><button class="again">یه چیز دیگه! 🎲</button><button class="close">باشه ✨</button></div></div>';
  document.body.appendChild(ov);
  ov.querySelector(".again").onclick = function(){ ov.remove(); luck(); };
  ov.querySelector(".close").onclick = function(){ ov.remove(); };
  ov.onclick = function(e){ if (e.target === ov) ov.remove(); };
}
function init(){ buildHero(); setStatus(); setToday(); injectOnce(); }
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
else init();
window.addEventListener("message", function(e){
  if (e.data && e.data.type === "cms-preview") setTimeout(init, 0);
});