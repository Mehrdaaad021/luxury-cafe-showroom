// cms.js — نسخه ۲۹: ولوم بالاتر + همه قابلیت‌های قبلی
(function () {
  var K_C = "cms-content-v2";
  var DEFAULT_HERO = "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1400&auto=format&fit=crop";
  var LOCAL_HERO = "./images/morrow-coffee-cup-cutout.webp";
  var DEMO_TAG = "طراحی و توسعه: استودیوی شما";
  var DEFAULT_QUOTE = "قهوه یعنی مکث کردن در روزِ تند؛ بهانه‌ای برای اینکه دل، آرام‌تر بتپد.";
  var TAGS = ["گرم", "سرد", "گیاهی", "بدون کافئین", "پرفروش", "ویژه"];
  var JADE_TAGS = { "گیاهی": 1, "بدون کافئین": 1 };
  var THEMES = [
    { id: "champagne", label: "شامپاین", g: "#d8c08a", gd: "#8a6d1f", gl: "rgba(216,192,138,.22)", c: "#c08552", cl: "rgba(192,133,82,.4)" },
    { id: "copper",    label: "مسی",     g: "#e2a878", gd: "#8a4f2a", gl: "rgba(226,168,120,.22)", c: "#b96a33", cl: "rgba(185,106,51,.4)" },
    { id: "jade",      label: "یشمی",    g: "#a9cdb8", gd: "#3f6b52", gl: "rgba(169,205,184,.22)", c: "#7fb69a", cl: "rgba(127,182,154,.4)" },
    { id: "rose",      label: "رزگلد",   g: "#e3b7a6", gd: "#9a5b45", gl: "rgba(227,183,166,.22)", c: "#c98a72", cl: "rgba(201,138,114,.4)" }
  ];
  var DEF_TEAM = [
    { name: "سارا", role: "باریستای سرپرست", line: "مسئول اینکه لاته‌ات قلب داشته باشد" },
    { name: "آرمان", role: "استاد بوداده", line: "هر دانه را از اسمش می‌شناسد" },
    { name: "نیکا", role: "میزبان خانه", line: "سفارش همیشگی‌ات را از بر است" }
  ];
  var DEFAULT_MENU = [
    { title: "بار گرم", sizes: "", items: [
      { name: "اسپرسو", note: "همیشه دبل", price: "۸۵,۰۰ تومان", tags: ["گرم","پرفروش"] },
      { name: "ماکیاتو", note: "", price: "۹۰,۰۰ تومان", tags: ["گرم"] },
      { name: "کورتادو", note: "", price: "۹۵,۰۰ تومان", tags: ["گرم"] },
      { name: "فلت وایت", note: "", price: "۱۰۵,۰۰ تومان", tags: ["گرم","پرفروش"] },
      { name: "کاپوچینو", note: "", price: "۱۰,۰۰ تومان", tags: ["گرم"] },
      { name: "لاته", note: "", price: "۱۱,۰۰ تومان", tags: ["گرم"] },
      { name: "موکا", note: "با شکلات ۷۰٪", price: "۱۳۰,۰۰ تومان", tags: ["گرم","ویژه"] }
    ]},
    { title: "نوشیدنی سرد", sizes: "", items: [
      { name: "آیس لاته", note: "", price: "۱۱,۰۰ تومان", tags: ["سرد","پرفروش"] },
      { name: "کلد برو", note: "دم‌کرده ۱۸ ساعته", price: "۱۱,۰۰ تومان", tags: ["سرد"] },
      { name: "آیس آمریکانو", note: "", price: "۹۵,۰۰ تومان", tags: ["سرد"] },
      { name: "لیموناد نعنا", note: "بدون کافئین", price: "۸۰,۰۰ تومان", tags: ["سرد","بدون کافئین","گیاهی"] }
    ]},
    { title: "سالاد و غذا", sizes: "", items: [
      { name: "سالاد سزار", note: "با مرغ و پارمزان", price: "۱۸۵,۰۰ تومان", tags: ["پرفروش"] },
      { name: "سالاد یونانی", note: "", price: "۱۶,۰۰ تومان", tags: ["گیاهی"] },
      { name: "ساندویچ کلاب", note: "با سیب‌زمینی", price: "۲۱۰,۰۰ تومان", tags: [] },
      { name: "پاستا آلفردو", note: "", price: "۲۴۰,۰۰ تومان", tags: ["گیاهی"] }
    ]}
  ];
  var EXTRA_CSS =
    '.skip{position:fixed;top:-70px;inset-inline-start:16px;z-index:99;background:var(--gold);color:var(--bg);padding:10px 18px;border-radius:2px;font-size:13px;text-decoration:none;transition:top .2s ease}' +
    '.skip:focus{top:12px}' +
    '.clubStamps{display:grid;grid-template-columns:repeat(5,1fr);gap:10px;margin:18px 0}' +
    '.stamp{aspect-ratio:1;border-radius:50%;border:1px dashed var(--gold-line);display:grid;place-items:center;color:var(--faint);font-size:15px;transition:all .3s ease}' +
    '.stamp.on{border-style:solid;border-color:var(--gold);color:var(--gold);background:rgba(216,192,138,.10);box-shadow:inset 0 0 12px rgba(216,192,138,.25)}' +
    '.clubMsg{font-size:13px;color:var(--jade);min-height:22px;text-align:center}' +
    '.clubBtns{display:flex;gap:10px;justify-content:center;margin-top:14px}' +
    '.clubBtns button{border:1px solid var(--gold-line);border-radius:2px;padding:10px 18px;font-family:"Shabnam";font-size:12.5px;font-weight:300;cursor:pointer;background:transparent;color:var(--mut);transition:all .25s ease}' +
    '.clubBtns .plus{border-color:var(--gold);color:var(--gold)}' +
    '.clubBtns .plus:hover{background:var(--gold);color:var(--bg)}' +
    '.mapWrap{margin-top:28px;border:1px solid var(--gold-line);border-radius:4px;overflow:hidden;background:var(--bg2)}' +
    '.mapWrap iframe{display:block;width:100%;height:260px;border:0;filter:grayscale(.45) contrast(1.05) opacity(.92)}' +
    '.mapBtns{display:flex;gap:8px;flex-wrap:wrap;padding:12px}' +
    '.mapBtns a{font-size:12px;color:var(--gold);text-decoration:none;border:1px solid var(--gold-line);border-radius:2px;padding:7px 14px;transition:all .25s ease}' +
    '.mapBtns a:hover{background:var(--gold);color:var(--bg)}' +
    '#team .teamGrid{display:grid;grid-template-columns:repeat(3,1fr);gap:26px}' +
    '.teamCard{text-align:center}' +
    '.teamCard .tp{width:132px;height:132px;margin:0 auto 14px;border-radius:50%;overflow:hidden;border:1px solid var(--gold-line);padding:5px;background:var(--bg2)}' +
    '.teamCard .tp img{width:100%;height:100%;object-fit:cover;border-radius:50%;filter:saturate(.9)}' +
    '.teamCard .tp .noImg{display:grid;place-items:center;width:100%;height:100%;border-radius:50%;background:var(--bg3);color:var(--gold);font-size:30px}' +
    '.teamCard h3{font-size:17px;color:var(--cream);font-weight:400}' +
    '.teamCard .role{color:var(--gold);font-size:11.5px;letter-spacing:1.5px}' +
    '.teamCard p{color:var(--mut);font-size:12.5px;font-weight:300;margin-top:6px}' +
    '@media(max-width:960px){#team .teamGrid{grid-template-columns:1fr;gap:34px}}';
  var REDUCED = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var FINE = window.matchMedia ? matchMedia("(pointer:fine)").matches : true;
  try {
    var ls = localStorage.getItem(K_C);
    if (ls) { var lp = JSON.parse(ls); if (lp && typeof lp === "object") window.CONTENT = lp; }
  } catch (e) {}

  function hexToRgb(h){ h=String(h).replace('#',''); if(h.length===3) h=h.split('').map(function(c){return c+c;}).join(''); var n=parseInt(h,16); return [(n>>16)&255,(n>>8)&255,n&255]; }
  function rgba(h,a){ var c=hexToRgb(h); return 'rgba('+c[0]+','+c[1]+','+c[2]+','+a+')'; }
  function shade(h,amt){ var c=hexToRgb(h).map(function(v){ return Math.max(0,Math.min(255,v+amt)); }); return '#'+c.map(function(v){ return ('0'+v.toString(16)).slice(-2); }).join(''); }
  function applyTheme(id) {
    var th = null;
    for (var i = 0; i < THEMES.length; i++) if (THEMES[i].id === id) th = THEMES[i];
    if (!th) return;
    var r = document.documentElement.style;
    r.setProperty("--gold", th.g); r.setProperty("--gold-d", th.gd); r.setProperty("--gold-line", th.gl);
    r.setProperty("--copper", th.c); r.setProperty("--copper-line", th.cl);
    var bs = document.querySelectorAll(".swatches button");
    for (var b = 0; b < bs.length; b++) bs[b].classList.toggle("on", bs[b].getAttribute("data-th") === id);
  }
  function applyBrand() {
    var s = (window.CONTENT && window.CONTENT.settings) || {};
    var b = s.brand || null;
    if (!b) return;
    var r = document.documentElement.style;
    if (b.gold) { r.setProperty("--gold", b.gold); r.setProperty("--gold-d", shade(b.gold, -70)); r.setProperty("--gold-line", rgba(b.gold, .22)); }
    if (b.copper) { r.setProperty("--copper", b.copper); r.setProperty("--copper-line", rgba(b.copper, .4)); }
    if (b.bg) { r.setProperty("--bg", b.bg); r.setProperty("--bg2", shade(b.bg, 6)); r.setProperty("--bg3", shade(b.bg, 12)); }
  }
  (function () {
    try { var saved = localStorage.getItem("cms-accent"); if (saved) applyTheme(saved); } catch (e) {}
    applyBrand();
    var st = document.createElement("style");
    st.id = "extraStyles";
    st.textContent = EXTRA_CSS;
    document.head.appendChild(st);
  })();

  document.documentElement.setAttribute("lang", "fa");
  document.documentElement.setAttribute("dir", "rtl");
  if (!document.querySelector('link[href="./styles/custom.css"]')) {
    var lk = document.createElement("link");
    lk.rel = "stylesheet"; lk.href = "./styles/custom.css";
    document.head.appendChild(lk);
  }
  (function perf(){
    var bad = document.querySelector('link[rel="preload"][href="./images/latte-art.jpg"]');
    if (bad) bad.remove();
    if (!document.querySelector('link[data-pf="preconnect"]')) {
      var pc = document.createElement("link");
      pc.rel = "preconnect"; pc.href = "https://cdn.jsdelivr.net"; pc.crossOrigin = "";
      pc.setAttribute("data-pf", "preconnect");
      document.head.appendChild(pc);
    }
  })();

  var DEF_SETTINGS = {
    tel: "tel:+982188888888",
    whatsapp: "https://wa.me/989120000000",
    instagram: "https://instagram.com/yourcafe",
    hours: [
      { o: 7, c: 22 }, { o: 7, c: 22 }, { o: 7, c: 22 }, { o: 7, c: 22 },
      { o: 7, c: 22 }, { o: 9, c: 23 }, { o: 7, c: 23 }
    ],
    specials: [
      "ویژه امروز: قهوه دارچین و هل", "ویژه امروز: کلد برو پرتقال", "ویژه امروز: موکای فندق",
      "ویژه امروز: لاته زعفرونی", "ویژه امروز: کلد برو نارگیل", "ویژه امروز: شات خرما و گردو",
      "ویژه امروز: لاته عسل و گلاب"
    ],
    sectionsOff: {},
    customSections: [],
    brand: {},
    musicUrl: "",
    musicVol: 0.8,
    lat: 35.7448,
    lng: 51.3753,
    team: DEF_TEAM
  };
  var FA_WEEK = ["یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنجشنبه", "جمعه", "شنبه"];
  var FA_DIG = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

  function faNum(n) { return String(n).replace(/\d/g, function (d) { return FA_DIG[Number(d)]; }); }
  function faTime(h) { return faNum(h) + ":۰۰"; }
  function faDate(d) {
    try { return new Intl.DateTimeFormat("fa-IR", { day: "numeric", month: "long" }).format(d); }
    catch (e) { return faNum(d.getDate()) + "/" + faNum(d.getMonth() + 1); }
  }
  function getConfig() {
    var s = (window.CONTENT && window.CONTENT.settings) || {};
    var cfg = {};
    cfg.tel = s.tel || DEF_SETTINGS.tel;
    cfg.whatsapp = s.whatsapp || DEF_SETTINGS.whatsapp;
    cfg.instagram = s.instagram || DEF_SETTINGS.instagram;
    cfg.hours = (s.hours && s.hours.length === 7) ? s.hours : DEF_SETTINGS.hours;
    cfg.specials = (s.specials && s.specials.length === 7) ? s.specials : DEF_SETTINGS.specials;
    cfg.sectionsOff = s.sectionsOff || {};
    cfg.customSections = s.customSections || [];
    cfg.brand = s.brand || {};
    cfg.musicUrl = s.musicUrl || "";
    cfg.musicVol = (s.musicVol != null && s.musicVol !== "") ? Math.max(0, Math.min(1, Number(s.musicVol))) : 0.8;
    cfg.lat = (s.lat != null && s.lat !== "") ? Number(s.lat) : DEF_SETTINGS.lat;
    cfg.lng = (s.lng != null && s.lng !== "") ? Number(s.lng) : DEF_SETTINGS.lng;
    cfg.team = (s.team && s.team.length) ? s.team : DEF_TEAM;
    return cfg;
  }
  function img(key) {
    var C = window.CONTENT || {};
    return (C.images && C.images[key]) ? C.images[key] : "";
  }
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function escAttr(s) { return esc(s).replace(/"/g, "&quot;"); }
  function put(el, val) {
    if (el.hasAttribute("data-edit-multiline") || String(val).indexOf("\n") > -1) el.innerHTML = esc(val).replace(/\n/g, "<br/>");
    else el.textContent = val;
  }
  function menuData() {
    var raw = (window.CONTENT && window.CONTENT.menu) || null;
    return (raw && raw.length) ? raw : DEFAULT_MENU;
  }
  function quoteText() {
    var C = window.CONTENT || {};
    return (C.site && C.site.quote) ? C.site.quote : DEFAULT_QUOTE;
  }
  function inferTags(it, cat) {
    var t = [];
    var s = (it.name || "") + " " + (it.note || "") + " " + (cat.title || "");
    var cold = /آیس|کلد|اسموثی|شیک|لیموناد|یخ|سرد/.test(s);
    var hot = /اسپرسو|ماکیاتو|کورتادو|فلت|کاپوچینو|لاته|موکا|قهوه|آمریکانو|چای|ماسالا|هات|شکلات|دم‌کرده|برو|گرم|نسکافه|فرانسه|کاکائو/.test(s);
    if (cold) t.push("سرد"); else if (hot) t.push("گرم");
    if (/سالاد|گیاهی|سبزی|وگان/.test(s)) t.push("گیاهی");
    if (/بدون کافئین|دمنوش|لیموناد|نعنا|چای سبز|شکلات داغ|کاکائو/.test(s)) t.push("بدون کافئین");
    return t;
  }
  function tagsOf(it, cat) {
    return (it.tags && it.tags.length) ? it.tags : inferTags(it, cat);
  }

  var initials = { text: {}, images: {}, colors: {}, title: document.title, desc: "", menu: null };
  var menuSeen = false;
  var revIO = null;
  var lbIndex = 0;
  var lastFocus = null;

  function capture() {
    var m = document.querySelector('meta[name="description"]');
    if (m) initials.desc = m.getAttribute("content") || "";
    var t = document.querySelectorAll("[data-edit]");
    for (var i = 0; i < t.length; i++) initials.text[t[i].getAttribute("data-edit")] = t[i].innerHTML;
    var g = document.querySelectorAll("[data-edit-image]");
    for (var j = 0; j < g.length; j++) initials.images[g[j].getAttribute("data-edit-image")] = g[j].getAttribute("src");
    var grid = document.querySelector("#menu .menuGrid");
    if (grid) initials.menu = grid.innerHTML;
    var root = document.querySelector("[data-edit-vars]");
    if (root) {
      var re = /--([a-zA-Z0-9-]+)\s*:\s*([^;]+)/g, mm;
      while ((mm = re.exec(root.getAttribute("style") || ""))) initials.colors[mm[1]] = mm[2].trim();
    }
  }

  function applyHero() {
    var hl = document.querySelector("header.left");
    if (!hl) return;
    var ph = img("img.hero") || DEFAULT_HERO;
    if (hl.dataset.heroBg === ph) return;
    hl.dataset.heroBg = ph;
    var test = new Image();
    test.onload = function () { hl.style.backgroundImage = 'url("' + ph + '")'; };
    test.onerror = function () { hl.style.backgroundImage = 'url("' + LOCAL_HERO + '")'; };
    test.src = ph;
    if (!document.querySelector('link[data-heropreload]')) {
      var pl = document.createElement("link");
      pl.rel = "preload"; pl.as = "image"; pl.href = ph;
      pl.setAttribute("data-heropreload", "1");
      document.head.appendChild(pl);
    }
  }

  function syncLogo() {
    var hl = document.querySelector("header.left");
    if (!hl) return;
    var src = img("img.logo");
    var ex = hl.querySelector(".brandLogo");
    if (src) {
      if (!ex) {
        ex = document.createElement("img");
        ex.className = "brandLogo"; ex.alt = "لوگو";
        hl.insertBefore(ex, hl.firstChild);
      }
      if (ex.getAttribute("src") !== src) ex.src = src;
    } else if (ex) ex.remove();
  }

  function initClock() {
    var p = document.querySelector("p.status");
    if (!p || document.getElementById("liveClock")) return;
    var sep = document.createElement("span");
    sep.className = "clockSep"; sep.textContent = "·";
    var ck = document.createElement("span");
    ck.className = "clock"; ck.id = "liveClock";
    p.appendChild(sep); p.appendChild(ck);
    function tick() {
      var s;
      try {
        s = new Intl.DateTimeFormat("fa-IR", { timeZone: "Asia/Tehran", hour: "2-digit", minute: "2-digit", second: "2-digit" }).format(new Date());
      } catch (e) {
        var d = new Date();
        s = faNum(d.getHours()) + ":" + faNum(("0" + d.getMinutes()).slice(-2)) + ":" + faNum(("0" + d.getSeconds()).slice(-2));
      }
      ck.textContent = s;
    }
    tick();
    setInterval(tick, 1000);
  }

  /* ===== 🎷 موسیقی: جَز زنده یا MP3 — با ولوم قوی‌تر ===== */
  var audioCtx = null, jazz = null, musicEl = null, soundOn = false;
  function mf(m){ return 440 * Math.pow(2, (m - 69) / 12); }
  var PROG = [
    { ch: [57,60,64,69], bass: [38,41,43,45] },
    { ch: [59,64,65,69], bass: [43,47,48,50] },
    { ch: [52,59,62,67], bass: [36,40,43,45] },
    { ch: [61,64,65,67], bass: [45,49,50,52] }
  ];
  function updateSoundBtn() {
    var b = document.querySelector('[data-dock="sound"]');
    if (b) { b.classList.toggle("on", soundOn); b.setAttribute("aria-pressed", soundOn ? "true" : "false"); b.title = soundOn ? "قطع موسیقی" : "پخش موسیقی کافه"; }
  }
  function tone(t, midi, dur, type, g, vib) {
    var o = audioCtx.createOscillator();
    o.type = type || "triangle";
    o.frequency.value = mf(midi);
    var gn = audioCtx.createGain();
    gn.gain.setValueAtTime(0.0001, t);
    gn.gain.exponentialRampToValueAtTime(g, t + 0.02);
    gn.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    if (vib) {
      var l = audioCtx.createOscillator(); l.frequency.value = 5.2;
      var lg = audioCtx.createGain(); lg.gain.value = 4;
      l.connect(lg); lg.connect(o.frequency);
      l.start(t); l.stop(t + dur);
    }
    o.connect(gn); gn.connect(jazz.out);
    o.start(t); o.stop(t + dur + 0.05);
  }
  function chord(t, arr, dur, g) {
    for (var i = 0; i < arr.length; i++) tone(t + i * 0.012, arr[i], dur, "triangle", g);
  }
  function ride(t) {
    var o = audioCtx.createOscillator(); o.type = "sine";
    o.frequency.value = 2400 + Math.random() * 300;
    var g = audioCtx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.02, t + 0.005);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.35);
    o.connect(g); g.connect(jazz.out);
    o.start(t); o.stop(t + 0.4);
  }
  function noiseBurst(t, dur, g, f, type) {
    var len = Math.max(1, Math.floor(audioCtx.sampleRate * dur));
    var buf = audioCtx.createBuffer(1, len, audioCtx.sampleRate);
    var d = buf.getChannelData(0);
    for (var i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len);
    var s = audioCtx.createBufferSource(); s.buffer = buf;
    var fl = audioCtx.createBiquadFilter(); fl.type = type || "bandpass"; fl.frequency.value = f;
    var gn = audioCtx.createGain(); gn.gain.value = g;
    s.connect(fl); fl.connect(gn); gn.connect(jazz ? jazz.out : audioCtx.destination);
    s.start(t);
  }
  function crackleLoop() {
    if (!jazz || jazz.stop) return;
    noiseBurst(audioCtx.currentTime + Math.random() * 0.3, 0.012, 0.006, 3000, "highpass");
    jazz.crack = setTimeout(crackleLoop, 140 + Math.random() * 420);
  }
  function scheduleBar(t) {
    if (!jazz || jazz.stop) return;
    var B = 60 / 84;
    var barDur = 4 * B;
    var P = PROG[jazz.bar % 4];
    for (var i = 0; i < 4; i++) tone(t + i * B, P.bass[i], B * 0.9, "triangle", 0.16);
    [0, 1.66, 2, 3.66].forEach(function (b) { ride(t + b * B); });
    [1, 3].forEach(function (b) { noiseBurst(t + b * B, 0.05, 0.012, 6000, "highpass"); });
    chord(t, P.ch, B * 2.6, 0.10);
    if (Math.random() < 0.6) chord(t + 2.66 * B, P.ch, B * 0.9, 0.07);
    if (Math.random() < 0.5) {
      var pent = [72, 74, 76, 79, 81, 84];
      tone(t + (1 + Math.random() * 2) * B, pent[Math.floor(Math.random() * pent.length)], B * 1.4, "sine", 0.05, true);
    }
    jazz.bar++;
    jazz.timer = setTimeout(function () { scheduleBar(t + barDur); }, (barDur - 0.25) * 1000);
  }
  function startMusicEl(url, vol) {
    musicEl = new Audio(url);
    musicEl.loop = true;
    musicEl.volume = 0;
    musicEl.play().then(function () {
      var target = Math.min(1, vol * 1.15);
      var v = 0;
      var iv = setInterval(function () {
        v += 0.05;
        musicEl.volume = Math.min(target, v);
        if (v >= target) clearInterval(iv);
      }, 100);
    }).catch(function () {
      toastSite("پخش موسیقی ممکن نشد؛ مسیر/لینک را بررسی کن.");
      musicEl = null;
      soundOn = false;
      updateSoundBtn();
    });
  }
  function startJazz() {
    var cfg = getConfig();
    var vol = cfg.musicVol;
    if (cfg.musicUrl) { startMusicEl(cfg.musicUrl, vol); soundOn = true; updateSoundBtn(); return; }
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    if (!audioCtx) audioCtx = new AC();
    if (audioCtx.state === "suspended") audioCtx.resume();
    var master = audioCtx.createGain();
    master.gain.value = 0;
    master.connect(audioCtx.destination);
    master.gain.linearRampToValueAtTime(0.24 * vol, audioCtx.currentTime + 1.5);
    var lp = audioCtx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 5600;
    lp.connect(master);
    jazz = { master: master, out: lp, timer: null, crack: null, bar: 0, stop: false };
    crackleLoop();
    scheduleBar(audioCtx.currentTime + 0.1);
    soundOn = true;
    updateSoundBtn();
  }
  function stopJazz() {
    soundOn = false;
    updateSoundBtn();
    if (musicEl) {
      var el = musicEl; musicEl = null;
      var iv = setInterval(function () {
        el.volume = Math.max(0, el.volume - 0.08);
        if (el.volume <= 0) { clearInterval(iv); el.pause(); }
      }, 90);
      return;
    }
    if (!jazz || !audioCtx) return;
    var j = jazz; jazz = null; j.stop = true;
    clearTimeout(j.timer); clearTimeout(j.crack);
    try { j.master.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.6); } catch (e) {}
    setTimeout(function () { try { j.master.disconnect(); } catch (e) {} }, 900);
  }
  function initSound() {
    var btn = document.querySelector('[data-dock="sound"]');
    if (!btn || btn.dataset.wired) return;
    btn.dataset.wired = "1";
    btn.addEventListener("click", function () { soundOn ? stopJazz() : startJazz(); });
    updateSoundBtn();
  }
  function toastSite(m) {
    var t = document.createElement("div");
    t.className = "luck";
    t.innerHTML = '<div class="luckCard"><p class="luckCat">' + esc(m) + '</p><div class="luckBtns"><button class="close">بستن</button></div></div>';
    document.body.appendChild(t);
    t.querySelector(".close").onclick = function () { t.remove(); };
    t.onclick = function (e) { if (e.target === t) t.remove(); };
  }

  /* ===== 🎁 باشگاه ===== */
  function clubCount() { try { return Number(localStorage.getItem("cms-club") || 0); } catch (e) { return 0; } }
  function setClub(n) { try { localStorage.setItem("cms-club", String(n)); } catch (e) {} }
  function openClub() {
    var n = clubCount();
    var ov = document.createElement("div");
    ov.className = "luck";
    ov.setAttribute("role", "dialog");
    ov.setAttribute("aria-modal", "true");
    var stamps = "";
    for (var i = 0; i < 10; i++) stamps += '<span class="stamp' + (i < n ? " on" : "") + '">' + (i < n ? "☕" : "") + '</span>';
    ov.innerHTML =
      '<div class="luckCard"><div class="luckEmoji">🎁</div>' +
      '<p class="luckCat">باشگاه مشتریان · کارت مهر</p>' +
      '<div class="clubStamps">' + stamps + '</div>' +
      '<p class="clubMsg">' + (n >= 10 ? "این قهوه مهمان ماست! 🎉 کارت را صفر کن و لذت ببر." : faNum(n) + " از ۱۰ مهر — قهوهٔ دهم مهمان ما") + '</p>' +
      '<div class="clubBtns"><button class="plus" type="button">+ یک مهر (باریستا)</button><button class="close" type="button">بستن</button>' +
      (n >= 10 ? '<button class="reset" type="button" style="border-color:var(--copper);color:var(--copper)">صفر کردن کارت</button>' : '') + '</div></div>';
    document.body.appendChild(ov);
    ov.querySelector(".plus").onclick = function () { setClub(Math.min(10, clubCount() + 1)); ov.remove(); openClub(); };
    var rs = ov.querySelector(".reset");
    if (rs) rs.onclick = function () { setClub(0); ov.remove(); openClub(); };
    ov.querySelector(".close").onclick = function () { ov.remove(); };
    ov.onclick = function (e) { if (e.target === ov) ov.remove(); };
    ov.querySelector(".close").focus();
  }

  function initPeek() {
    if (!FINE || document.getElementById("menuPeek")) return;
    var peek = document.createElement("div");
    peek.id = "menuPeek";
    peek.innerHTML = '<img alt=""/>';
    document.body.appendChild(peek);
    var pim = peek.querySelector("img");
    var curKey = null;
    document.addEventListener("mouseover", function (e) {
      var li = e.target.closest ? e.target.closest("ul.items li[data-img]") : null;
      if (!li) { peek.classList.remove("on"); curKey = null; return; }
      var key = li.getAttribute("data-img");
      var src = img(key);
      if (!src) { peek.classList.remove("on"); curKey = null; return; }
      if (key !== curKey) { pim.src = src; curKey = key; }
      peek.classList.add("on");
    });
    document.addEventListener("mousemove", function (e) {
      if (!peek.classList.contains("on")) return;
      peek.style.left = e.clientX + "px";
      peek.style.top = (e.clientY - 12) + "px";
    }, { passive: true });
    document.addEventListener("mouseout", function (e) {
      if (e.target.closest && e.target.closest("ul.items li[data-img]")) peek.classList.remove("on");
    });
  }

  function splitHeadings() {
    var els = document.querySelectorAll(".title .name, section.sec h2");
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      var hasWi = el.querySelector(".wi");
      if (el.dataset.split && hasWi) {
        if (el.dataset.rev === "1") el.classList.add("in");
        continue;
      }
      var text = el.textContent;
      el.dataset.split = "1";
      el.classList.add("rv-lines");
      var words = text.trim().split(/\s+/);
      var html = "";
      for (var w = 0; w < words.length; w++) {
        html += '<span class="wi"><span style="--d:' + (w * 70) + 'ms">' + esc(words[w]) + '</span></span>';
        if (w < words.length - 1) html += " ";
      }
      el.innerHTML = html;
      if (el.dataset.rev === "1" || REDUCED) el.classList.add("in");
    }
    if (!revIO && "IntersectionObserver" in window && !REDUCED) {
      revIO = new IntersectionObserver(function (es) {
        for (var q = 0; q < es.length; q++) {
          if (es[q].isIntersecting) {
            es[q].target.classList.add("in");
            es[q].target.dataset.rev = "1";
            revIO.unobserve(es[q].target);
          }
        }
      }, { threshold: 0.2 });
    }
    var pend = document.querySelectorAll(".rv-lines:not([data-obs])");
    for (var p = 0; p < pend.length; p++) {
      pend[p].setAttribute("data-obs", "1");
      if (revIO) revIO.observe(pend[p]);
      else { pend[p].classList.add("in"); pend[p].dataset.rev = "1"; }
    }
  }

  function initCursor() {
    if (!FINE || REDUCED || document.getElementById("curDot")) return;
    document.documentElement.classList.add("hasCursor");
    var dot = document.createElement("div"); dot.id = "curDot";
    var ring = document.createElement("div"); ring.id = "curRing";
    document.body.appendChild(dot);
    document.body.appendChild(ring);
    var x = innerWidth / 2, y = innerHeight / 2, rx = x, ry = y;
    window.addEventListener("mousemove", function (e) {
      x = e.clientX; y = e.clientY;
      dot.style.transform = "translate(" + x + "px," + y + "px)";
    }, { passive: true });
    (function loop() {
      rx += (x - rx) * 0.16; ry += (y - ry) * 0.16;
      ring.style.transform = "translate(" + rx + "px," + ry + "px)";
      requestAnimationFrame(loop);
    })();
    document.addEventListener("mouseover", function (e) {
      var t = e.target.closest ? e.target.closest("a,button,input,select,textarea,.mChip,.sigCard,.galItem,.teamCard") : null;
      ring.classList.toggle("grow", !!t);
    });
    document.documentElement.addEventListener("mouseleave", function () { ring.classList.add("hide"); dot.style.opacity = "0"; });
    document.documentElement.addEventListener("mouseenter", function () { ring.classList.remove("hide"); dot.style.opacity = "1"; });
  }

  function initMagnetic() {
    if (!FINE || REDUCED) return;
    var sel = ".button, .mChip, #luckBtn, .bkSubmit, .dock a, .dock button, #toTop";
    window.__magScan = function () {
      var els = document.querySelectorAll(sel);
      for (var i = 0; i < els.length; i++) {
        (function (el) {
          if (el.dataset.mag) return;
          el.dataset.mag = "1";
          el.classList.add("mag");
          el.addEventListener("mousemove", function (e) {
            var r = el.getBoundingClientRect();
            var dx = (e.clientX - (r.left + r.width / 2)) * 0.22;
            var dy = (e.clientY - (r.top + r.height / 2)) * 0.3;
            dx = Math.max(-8, Math.min(8, dx));
            dy = Math.max(-6, Math.min(6, dy));
            el.style.transform = "translate(" + dx + "px," + dy + "px)";
          });
          el.addEventListener("mouseleave", function () { el.style.transform = ""; });
        })(els[i]);
      }
    };
    window.__magScan();
  }

  function renderMenu() {
    var grid = document.querySelector("#menu .menuGrid");
    if (!grid) return;
    var sec = document.getElementById("menu");
    var data = menuData();
    var tools = sec.querySelector(".menuTools");
    if (!tools) {
      tools = document.createElement("div");
      tools.className = "menuTools";
      var chips = '<button class="mChip on" data-tag="" type="button">همه</button>';
      for (var t = 0; t < TAGS.length; t++) chips += '<button class="mChip" data-tag="' + TAGS[t] + '" type="button" aria-pressed="false">' + TAGS[t] + '</button>';
      tools.innerHTML = '<input class="mSearch" type="search" placeholder="جست‌وجو در منو…" aria-label="جست‌وجو در منو"/>' + chips;
      grid.parentNode.insertBefore(tools, grid);
      tools.addEventListener("click", function (e) {
        var b = e.target.closest ? e.target.closest(".mChip") : null;
        if (!b) return;
        var all = tools.querySelectorAll(".mChip");
        for (var i = 0; i < all.length; i++) { all[i].classList.remove("on"); all[i].setAttribute("aria-pressed", "false"); }
        b.classList.add("on");
        b.setAttribute("aria-pressed", "true");
        filterMenu();
      });
      tools.querySelector(".mSearch").addEventListener("input", filterMenu);
    }
    var html = "";
    var liIndex = 0;
    for (var c = 0; c < data.length; c++) {
      var cat = data[c];
      html += '<div class="mGroup" style="--g:' + c + '"><div class="groupHead"><h3>' + esc(cat.title || "") + '</h3>';
      if (cat.sizes) html += '<span class="sizes">' + esc(cat.sizes) + '</span>';
      html += '</div><ul class="items">';
      var items = cat.items || [];
      for (var i = 0; i < items.length; i++) {
        var it = items[i];
        var tg = tagsOf(it, cat);
        var tags = "";
        if (tg.length) {
          tags = '<span class="itemTags">';
          for (var g2 = 0; g2 < tg.length; g2++) {
            var cls = JADE_TAGS[tg[g2]] ? " jade" : ((tg[g2] === "پرفروش" || tg[g2] === "ویژه") ? " hot" : "");
            tags += '<span class="itemTag' + cls + '">' + esc(tg[g2]) + '</span>';
          }
          tags += '</span>';
        }
        html += '<li style="--i:' + liIndex + '" data-img="img.menu.' + c + '.' + i + '" data-name="' + escAttr(((it.name || "") + " " + (it.note || "")).toLowerCase()) + '" data-tags="' + escAttr(tg.join(",")) + '">' +
          '<div class="itemText"><span class="itemName">' + esc(it.name || "") + '</span>' + tags +
          (it.note ? '<span class="itemNote">' + esc(it.note) + '</span>' : '') +
          '</div><span class="itemPrice">' + esc(it.price || "") + '</span></li>';
        liIndex++;
      }
      html += '</ul></div>';
    }
    grid.innerHTML = html;
    if (!sec.querySelector(".mEmpty")) {
      var empty = document.createElement("p");
      empty.className = "mEmpty";
      empty.setAttribute("role", "status");
      grid.parentNode.insertBefore(empty, grid.nextSibling);
    }
    if (menuSeen) grid.classList.add("anim");
    filterMenu();
  }
  function restartMenuAnim() {
    var grid = document.querySelector("#menu .menuGrid");
    if (!grid || !menuSeen || REDUCED) return;
    grid.classList.remove("anim");
    void grid.offsetWidth;
    grid.classList.add("anim");
  }
  function watchMenu() {
    var sec = document.getElementById("menu");
    var grid = sec && sec.querySelector(".menuGrid");
    if (!grid) return;
    if (!("IntersectionObserver" in window) || REDUCED) { menuSeen = true; grid.classList.add("anim"); return; }
    var io = new IntersectionObserver(function (es) {
      for (var q = 0; q < es.length; q++) {
        if (es[q].isIntersecting) {
          menuSeen = true;
          grid.classList.add("anim");
          io.disconnect();
        }
      }
    }, { threshold: 0.12 });
    io.observe(sec);
  }
  function filterMenu() {
    var sec = document.getElementById("menu");
    if (!sec) return;
    var tools = sec.querySelector(".menuTools");
    var grid = sec.querySelector(".menuGrid");
    if (!tools || !grid) return;
    var q = (tools.querySelector(".mSearch").value || "").trim().toLowerCase();
    var on = tools.querySelector(".mChip.on");
    var tag = on ? (on.getAttribute("data-tag") || "") : "";
    var lis = grid.querySelectorAll("li");
    var any = false;
    for (var i = 0; i < lis.length; i++) {
      var okQ = !q || (lis[i].getAttribute("data-name") || "").indexOf(q) > -1;
      var okT = !tag || ("," + (lis[i].getAttribute("data-tags") || "") + ",").indexOf("," + tag + ",") > -1;
      var show = okQ && okT;
      lis[i].style.display = show ? "" : "none";
      if (show) any = true;
    }
    var groups = grid.querySelectorAll(".mGroup");
    for (var gI = 0; gI < groups.length; gI++) {
      var vis = groups[gI].querySelectorAll('li:not([style*="none"])');
      groups[gI].style.display = vis.length ? "" : "none";
    }
    var empty = sec.querySelector(".mEmpty");
    if (empty) {
      empty.style.display = any ? "none" : "block";
      empty.textContent = tag
        ? "هیچ آیتمی با برچسب «" + tag + "» نیست؛ از پنل → منو، برچسب‌ها را روشن کن."
        : "چیزی پیدا نشد؛ فیلتری را بردار یا جور دیگر بنویس.";
    }
    restartMenuAnim();
  }

  function miniCup(coffee) {
    return '<svg viewBox="0 0 120 120" aria-hidden="true">' +
      '<ellipse cx="60" cy="100" rx="34" ry="8" fill="#241d16"/>' +
      '<circle cx="88" cy="66" r="12" fill="none" stroke="#d8c08a" stroke-width="5"/>' +
      '<path d="M32 52 h56 v22 a18 18 0 0 1 -18 18 h-20 a18 18 0 0 1 -18 -18 z" fill="#171310"/>' +
      '<ellipse cx="60" cy="52" rx="28" ry="9" fill="#0e0c0a"/>' +
      '<ellipse cx="60" cy="52" rx="23" ry="7" fill="' + coffee + '"/>' +
      '<path d="M60 60 C 53 54, 50 50, 50 46 C 50 43, 53 41, 56 41 C 58 41, 59 42, 60 44 C 61 42, 62 41, 64 41 C 67 41, 70 43, 70 46 C 70 50, 67 54, 60 60 Z" fill="#e9e2d6"/>' +
      '</svg>';
  }
  function renderSignature() {
    var old = document.getElementById("signature");
    if (old) old.remove();
    var menu = menuData();
    var cat = null;
    for (var i = 0; i < menu.length; i++) if ((menu[i].items || []).length) { cat = menu[i]; break; }
    var anchor = document.querySelector("#menu");
    if (!cat || !anchor) return;
    var pick = cat.items.slice(0, 3);
    var coffees = ["#c98a4b", "#8a5a2e", "#5a3419"];
    var sec = document.createElement("section");
    sec.id = "signature"; sec.className = "sec";
    var h = '<div class="secHead center"><span class="eyebrow"><b class="lat">SIGNATURE</b> نوشیدنی‌های امضایی</span><h2>انتخابِ خانه</h2></div><div class="sigGrid">';
    for (var j = 0; j < pick.length; j++) {
      var ph = img("img.sig." + j);
      h += '<div class="sigCard"><div class="ph">' + (ph ? '<img class="lz" loading="lazy" decoding="async" src="' + ph + '" alt="' + escAttr(pick[j].name || "") + '"/>' : miniCup(coffees[j % 3])) + '</div>' +
        '<h3>' + esc(pick[j].name || "") + '</h3>' +
        '<p>' + esc(pick[j].note || cat.title || "") + '</p>' +
        '<span class="pr">' + esc(pick[j].price || "") + '</span>' +
        '<a href="#menu">دیدن در منو</a></div>';
    }
    h += '</div>';
    sec.innerHTML = h;
    anchor.parentNode.insertBefore(sec, anchor);
  }

  function renderGallery() {
    var old = document.getElementById("gallery");
    if (old) old.remove();
    var pics = [];
    for (var i = 0; i < 6; i++) {
      var src = img("img.gal." + i);
      if (src) pics.push(src);
    }
    if (!pics.length) return;
    var anchor = document.querySelector("#visit") || document.querySelector("footer.footer");
    if (!anchor) return;
    var sec = document.createElement("section");
    sec.id = "gallery"; sec.className = "sec";
    var h = '<div class="secHead center"><span class="eyebrow"><b class="lat">GALLERY</b> گالری خانه</span></div>' +
      '<div class="galTrack">';
    for (var p = 0; p < pics.length; p++) {
      h += '<figure class="galItem" data-i="' + p + '"><img class="lz" loading="lazy" decoding="async" src="' + pics[p] + '" alt="تصویر گالری ' + faNum(p + 1) + '"/>' +
        '<figcaption>لحظهٔ ' + faNum(p + 1) + ' از خانه</figcaption></figure>';
    }
    h += '</div><p class="galHint">با اسکرول، نوار حرکت می‌کند · برای دیدن بزرگ‌تر کلیک کن</p>';
    sec.innerHTML = h;
    anchor.parentNode.insertBefore(sec, anchor);
    var track = sec.querySelector(".galTrack");
    if (!track.dataset.wired) {
      track.dataset.wired = "1";
      var down = false, startX = 0, startL = 0, moved = 0;
      track.addEventListener("pointerdown", function (e) {
        down = true; moved = 0; startX = e.clientX; startL = track.scrollLeft;
        track.classList.add("drag");
        track.dataset.userScrolled = "1";
      });
      window.addEventListener("pointermove", function (e) {
        if (!down) return;
        var dx = e.clientX - startX;
        moved = Math.max(moved, Math.abs(dx));
        track.scrollLeft = startL - dx;
      });
      window.addEventListener("pointerup", function () { down = false; track.classList.remove("drag"); });
      track.addEventListener("wheel", function () { track.dataset.userScrolled = "1"; }, { passive: true });
      track.addEventListener("click", function (e) {
        if (moved > 6) { e.preventDefault(); e.stopPropagation(); moved = 0; return; }
        var fig = e.target.closest ? e.target.closest(".galItem") : null;
        if (fig) openLb(Number(fig.getAttribute("data-i")) || 0);
      }, true);
    }
  }
  function lbList() {
    var out = [];
    var figs = document.querySelectorAll("#gallery .galItem img");
    for (var i = 0; i < figs.length; i++) out.push({ src: figs[i].src, cap: figs[i].getAttribute("alt") || "" });
    return out;
  }
  function openLb(i) {
    var lb = document.getElementById("lb");
    if (!lb) return;
    var list = lbList();
    if (!list.length) return;
    lastFocus = document.activeElement;
    lbIndex = Math.max(0, Math.min(list.length - 1, i));
    paintLb();
    lb.classList.add("on");
    lb.querySelector(".lbClose").focus();
  }
  function paintLb() {
    var lb = document.getElementById("lb");
    var list = lbList();
    if (!list.length) return;
    lb.querySelector("img").src = list[lbIndex].src;
    lb.querySelector("figcaption").textContent = list[lbIndex].cap;
    lb.querySelector(".lbCount").textContent = faNum(lbIndex + 1) + " / " + faNum(list.length);
  }
  function closeLb() {
    var lb = document.getElementById("lb");
    if (!lb) return;
    lb.classList.remove("on");
    if (lastFocus && lastFocus.focus) lastFocus.focus();
    lastFocus = null;
  }
  function stepLb(d) {
    var n = lbList().length;
    if (!n) return;
    lbIndex = (lbIndex + d + n) % n;
    paintLb();
  }

  function renderTeam() {
    var old = document.getElementById("team");
    if (old) old.remove();
    var cfg = getConfig();
    var anchor = document.querySelector("#gallery") || document.querySelector("#visit") || document.querySelector("footer.footer");
    if (!anchor) return;
    var sec = document.createElement("section");
    sec.id = "team"; sec.className = "sec";
    var h = '<div class="secHead center"><span class="eyebrow"><b class="lat">OUR PEOPLE</b> آدم‌های خانه</span></div><div class="teamGrid">';
    for (var i = 0; i < cfg.team.length; i++) {
      var t = cfg.team[i];
      var ph = img("img.team." + i);
      h += '<div class="teamCard"><div class="tp">' +
        (ph ? '<img class="lz" loading="lazy" decoding="async" src="' + ph + '" alt="' + escAttr(t.name || "") + '"/>' : '<span class="noImg">☕</span>') +
        '</div><h3>' + esc(t.name || "") + '</h3><div class="role">' + esc(t.role || "") + '</div><p>' + esc(t.line || "") + '</p></div>';
    }
    h += '</div>';
    sec.innerHTML = h;
    anchor.parentNode.insertBefore(sec, anchor);
  }

  function renderMap() {
    var vs = document.getElementById("visit");
    if (!vs || vs.querySelector(".mapWrap")) return;
    var cfg = getConfig();
    var la = cfg.lat, ln = cfg.lng;
    var box = [ln - 0.010, la - 0.006, ln + 0.010, la + 0.006].join(",");
    var wrap = document.createElement("div");
    wrap.className = "mapWrap";
    wrap.innerHTML =
      '<iframe title="نقشهٔ کافه" loading="lazy" src="https://www.openstreetmap.org/export/embed.html?bbox=' + box + '&layer=mapnik&marker=' + la + ',' + ln + '"></iframe>' +
      '<div class="mapBtns">' +
        '<a target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&destination=' + la + ',' + ln + '">مسیر با گوگل‌مپس</a>' +
        '<a target="_blank" rel="noopener" href="https://neshan.org/maps?lat=' + la + '&lng=' + ln + '">نشان</a>' +
        '<a target="_blank" rel="noopener" href="https://balad.ir/location?latitude=' + la + '&longitude=' + ln + '">بلد</a>' +
      '</div>';
    vs.appendChild(wrap);
  }

  function renderStoryReviews() {
    var C = window.CONTENT || {};
    var o1 = document.getElementById("story"); if (o1) o1.remove();
    var o2 = document.getElementById("reviews"); if (o2) o2.remove();
    var anchor = document.querySelector("#subscriptions");
    if (!anchor) return;
    var s = C.story;
    if (s && (s.title || (s.timeline || []).length)) {
      var sec = document.createElement("section");
      sec.id = "story"; sec.className = "sec";
      var ph = img("img.story");
      if (ph) sec.classList.add("hasPh");
      var h = '<div><div class="secHead"><span class="secNo">۰۱</span><h2>' + esc(s.title || "") + '</h2></div>';
      if (s.intro) h += '<p class="storyIntro">' + esc(s.intro).replace(/\n/g, "<br/>") + '</p>';
      if ((s.timeline || []).length) {
        h += '<ul class="timeline">';
        for (var i = 0; i < s.timeline.length; i++) {
          h += '<li><span class="tYear">' + esc(s.timeline[i].year || "") + '</span><p>' + esc(s.timeline[i].text || "") + '</p></li>';
        }
        h += '</ul>';
      }
      h += '</div>';
      if (ph) h += '<div class="storyPh"><img class="lz" loading="lazy" decoding="async" src="' + ph + '" alt="قصه ما"/></div>';
      sec.innerHTML = h;
      anchor.parentNode.insertBefore(sec, anchor);
    }
    var r = C.reviews;
    if (r && (r.title || (r.items || []).length)) {
      var sec2 = document.createElement("section");
      sec2.id = "reviews"; sec2.className = "sec";
      var h2 = '<div class="secHead center"><span class="eyebrow"><b class="lat">GUEST LETTERS</b> ' + esc(r.title || "") + '</span></div><div class="reviews">';
      for (var j = 0; j < r.items.length; j++) {
        var rv = r.items[j];
        var st = Math.max(1, Math.min(5, Number(rv.stars) || 5));
        var stars = "";
        for (var a = 0; a < st; a++) stars += "★";
        for (var b = st; b < 5; b++) stars += "☆";
        h2 += '<figure class="review"><div class="stars">' + stars + '</div><blockquote>' + esc(rv.text || "") + '</blockquote>' +
          '<figcaption><span class="who">' + esc(rv.name || "") + '</span><span class="role">' + esc(rv.role || "") + '</span></figcaption></figure>';
      }
      h2 += '</div>';
      sec2.innerHTML = h2;
      anchor.parentNode.insertBefore(sec2, anchor);
    }
  }

  function renderBooking() {
    var old = document.getElementById("booking");
    if (old) old.remove();
    var footer = document.querySelector("footer.footer");
    var host = footer ? footer.parentNode : document.body;
    var cfg = getConfig();
    var C = window.CONTENT || {};
    var addr = (C.text && C.text["visit.body"]) || "";
    var ph = img("img.booking");
    var sec = document.createElement("section");
    sec.id = "booking"; sec.className = "sec";
    var hoursHtml = "";
    for (var i = 0; i < 7; i++) {
      hoursHtml += '<li><b>' + FA_WEEK[i] + '</b><span>' + faTime(cfg.hours[i].o) + ' تا ' + faTime(cfg.hours[i].c) + '</span></li>';
    }
    sec.innerHTML =
      '<div class="bkGrid">' +
        '<div>' +
          '<span class="eyebrow"><b class="lat">RESERVE</b> رزرو میز</span>' +
          '<h2>میزی برای شما نگه داشته‌ایم</h2>' +
          '<form class="bkForm" id="bkForm">' +
            '<input type="text" id="bkName" placeholder="نام و نام خانوادگی" required aria-label="نام"/>' +
            '<input type="tel" id="bkTel" placeholder="شماره تماس" required aria-label="شماره تماس"/>' +
            '<input type="text" id="bkDate" placeholder="تاریخ و ساعت (مثلاً ۱۴ مهر، ۱۸:۳۰)" required aria-label="تاریخ"/>' +
            '<select id="bkGuests" aria-label="تعداد نفرات"><option>۱ نفر</option><option>۲ نفر</option><option>۳ نفر</option><option>۴ نفر</option><option>۵ نفر</option><option>۶+ نفر</option></select>' +
            '<button type="submit" class="bkSubmit">ثبت درخواست</button>' +
          '</form>' +
        '</div>' +
        '<div class="bkInfo">' +
          '<h3>ساعت‌های کاری</h3><ul>' + hoursHtml + '</ul>' +
          '<p class="bkAddr">' + esc(addr).replace(/\n/g, "<br/>") + '</p>' +
          (ph ? '<img class="lz bkPh" loading="lazy" decoding="async" src="' + ph + '" alt="فضای کافه"/>' : '') +
        '</div>' +
      '</div>';
    if (footer) host.insertBefore(sec, footer); else host.appendChild(sec);
    var form = document.getElementById("bkForm");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var msg = "سلام! درخواست رزرو میز:\nنام: " + document.getElementById("bkName").value +
          "\nتماس: " + document.getElementById("bkTel").value +
          "\nزمان: " + document.getElementById("bkDate").value +
          "\nتعداد: " + document.getElementById("bkGuests").value;
        window.open(cfg.whatsapp + "?text=" + encodeURIComponent(msg), "_blank");
      });
    }
  }

  function renderCustomSections() {
    var old = document.querySelectorAll(".secCustom");
    for (var i = 0; i < old.length; i++) old[i].remove();
    var list = getConfig().customSections;
    var anchor = document.querySelector("#subscriptions");
    var mainEl = document.querySelector("main#top") || document.querySelector("main");
    for (var j = 0; j < list.length; j++) {
      var cs = list[j];
      var sec = document.createElement("section");
      sec.className = "sec secCustom"; sec.id = "custom-" + (cs.id || j);
      var h = '<div class="secHead"><span class="secNo">✧</span><h2>' + esc(cs.title || "") + '</h2></div>';
      h += '<p class="storyIntro">' + esc(cs.body || "").replace(/\n/g, "<br/>") + '</p>';
      sec.innerHTML = h;
      if (cs.off) sec.style.display = "none";
      if (anchor) anchor.parentNode.insertBefore(sec, anchor);
      else if (mainEl) mainEl.appendChild(sec);
    }
  }
  function applySections() {
    var cfg = getConfig();
    var map = {
      menu: "#menu", beans: "#beans", subscriptions: "#subscriptions", wholesale: "#wholesale",
      events: "#events", visit: "#visit", story: "#story", reviews: "#reviews", signature: "#signature",
      gallery: "#gallery", team: "#team"
    };
    Object.keys(map).forEach(function (k) {
      var sec = document.querySelector(map[k]);
      if (!sec) return;
      var off = !!cfg.sectionsOff[k];
      sec.style.display = off ? "none" : "";
      var nx = sec.nextSibling;
      while (nx && nx.nodeType === 3) nx = nx.nextSibling;
      if (nx && nx.classList && nx.classList.contains("divider")) nx.style.display = off ? "none" : "";
    });
    renderCustomSections();
    var n = 0;
    var secs = document.querySelectorAll("section.sec");
    for (var i = 0; i < secs.length; i++) {
      if (secs[i].style.display === "none") continue;
      if (secs[i].id === "signature" || secs[i].id === "booking" || secs[i].id === "gallery" || secs[i].id === "team") continue;
      var no = secs[i].querySelector(".secNo");
      if (!no) continue;
      if (/^[0-9۰-۹]+$/.test(no.textContent.trim())) { n++; no.textContent = faNum(n < 10 ? "0" + n : String(n)); }
    }
  }

  function applyAll() {
    var C = window.CONTENT || {};
    var tk = Object.keys(initials.text);
    for (var i = 0; i < tk.length; i++) {
      var k = tk[i];
      var els = document.querySelectorAll('[data-edit="' + k + '"]');
      for (var j = 0; j < els.length; j++) {
        var v = (C.text && C.text[k] != null) ? C.text[k] : null;
        if (v == null) els[j].innerHTML = initials.text[k]; else put(els[j], v);
      }
    }
    var root = document.querySelector("[data-edit-vars]");
    if (root) {
      var ck = Object.keys(initials.colors);
      for (var z = 0; z < ck.length; z++) {
        root.style.setProperty("--" + ck[z], (C.colors && C.colors[ck[z]]) ? C.colors[ck[z]] : initials.colors[ck[z]]);
      }
    }
    document.title = (C.site && C.site.title) || initials.title;
    var m = document.querySelector('meta[name="description"]');
    if (m) m.setAttribute("content", (C.site && C.site.description) || initials.desc);
    var qt = document.getElementById("quoteText");
    if (qt) qt.textContent = quoteText();
    applyBrand();
    applyHero();
    syncLogo();
    renderMenu();
    renderSignature();
    renderTeam();
    renderGallery();
    renderStoryReviews();
    renderBooking();
    renderMap();
    applySections();
    wireLazy();
    watchMenu();
    splitHeadings();
    if (window.__magScan) window.__magScan();
  }

  function wireLazy() {
    var imgs = document.querySelectorAll("img.lz:not([data-lzw])");
    for (var i = 0; i < imgs.length; i++) {
      (function (im) {
        im.setAttribute("data-lzw", "1");
        if (im.complete && im.naturalWidth) im.classList.add("loaded");
        else {
          im.addEventListener("load", function () { im.classList.add("loaded"); }, { once: true });
          im.addEventListener("error", function () { im.classList.add("loaded"); }, { once: true });
        }
      })(imgs[i]);
    }
  }

  function initScrollUI() {
    if (document.getElementById("progressBar")) return;
    var bar = document.createElement("div");
    bar.id = "progressBar";
    document.body.appendChild(bar);
    var ids = ["menu", "beans", "subscriptions", "wholesale", "events", "team", "gallery", "visit", "story", "reviews"];
    var ticking = false;
    function update() {
      ticking = false;
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      var top = h.scrollTop || document.body.scrollTop || 0;
      bar.style.transform = "scaleX(" + (max > 0 ? top / max : 0) + ")";
      var tt = document.getElementById("toTop");
      if (tt) tt.classList.toggle("on", top > 600);
      if (!REDUCED) {
        var hl = document.querySelector("header.left");
        if (hl) hl.style.backgroundPositionY = (top * 0.08) + "px";
        var gal = document.getElementById("gallery");
        if (gal && gal.style.display !== "none") {
          var tr = gal.querySelector(".galTrack");
          if (tr && !tr.dataset.drag && !tr.dataset.userScrolled) {
            var r = gal.getBoundingClientRect();
            var vh = window.innerHeight || 800;
            var p = (vh * 0.85 - r.top) / (r.height + vh * 0.5);
            p = Math.max(0, Math.min(1, p));
            var maxS = tr.scrollWidth - tr.clientWidth;
            if (maxS > 0) tr.scrollLeft = p * maxS;
          }
        }
      }
      var mid = (window.innerHeight || 800) * 0.4;
      var current = "";
      for (var i = 0; i < ids.length; i++) {
        var s = document.getElementById(ids[i]);
        if (!s || s.style.display === "none") continue;
        if (s.getBoundingClientRect().top <= mid) current = ids[i];
      }
      var links = document.querySelectorAll("nav.nav a, .template-menu__panel a");
      for (var j = 0; j < links.length; j++) {
        links[j].classList.toggle("active", (links[j].getAttribute("href") || "") === "#" + current);
      }
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  function setStatus() {
    var p = document.querySelector("p.status");
    if (!p) return;
    var span = p.querySelector("[data-edit='left.text']");
    if (!span) return;
    var cfg = getConfig();
    var now = new Date();
    var day = now.getDay();
    var h = now.getHours() + now.getMinutes() / 60;
    var t = cfg.hours[day];
    var open = (h >= t.o && h < t.c);
    p.classList.toggle("is-open", open);
    p.classList.toggle("is-closed", !open);
    if (open) span.textContent = "باز · تا " + faTime(t.c);
    else {
      var nd = (h < t.o) ? day : (day + 1) % 7;
      span.textContent = "بسته · بازگشایی " + FA_WEEK[nd] + "، " + faTime(cfg.hours[nd].o);
    }
  }

  function setToday() {
    var term = document.querySelector("[data-edit='left.term.0']");
    var body = document.querySelector("[data-edit='left.body.0']");
    var cfg = getConfig();
    var now = new Date();
    if (term) term.textContent = "امروز";
    if (body) body.innerHTML = FA_WEEK[now.getDay()] + "، " + faNum(faDate(now)) + " — " + cfg.specials[now.getDay()];
  }

  var ICONS = {
    tel: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M6 3h4l1 5-3 2c1 3 3 5 6 6l2-3 5 1v4c0 1-1 2-2 2C10 20 4 14 4 5c0-1 1-2 2-2z"/></svg>',
    wa: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M4 5h16v11H9l-5 4z"/></svg>',
    ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="7" width="18" height="13" rx="2"/><circle cx="12" cy="13" r="4"/><path d="M8 7l1.5-2h5L16 7"/></svg>',
    snd: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M9 18V6l8-2v12"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="14.5" cy="16" r="2.5"/></svg>',
    club: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M20 12v8H4v-8"/><path d="M2 7h20v5H2z"/><path d="M12 7v13"/><path d="M12 7c-2 0-3-1-3-2s2-2 3 0c1-2 3-1 3 0s-1 2-3 2z"/></svg>'
  };
  function updateDock() {
    var cfg = getConfig();
    var t = document.querySelector('[data-dock="tel"]');
    var w = document.querySelector('[data-dock="wa"]');
    var ig = document.querySelector('[data-dock="ig"]');
    if (t) t.href = cfg.tel;
    if (w) w.href = cfg.whatsapp;
    if (ig) ig.href = cfg.instagram;
  }

  function injectOnce() {
    if (document.querySelector(".dock")) return;
    if (!document.querySelector(".skip")) {
      var sk = document.createElement("a");
      sk.className = "skip";
      sk.href = "#menu";
      sk.textContent = "پرش به منو";
      document.body.insertBefore(sk, document.body.firstChild);
    }
    var secs = document.querySelectorAll("section.sec");
    for (var i = 0; i < secs.length; i++) {
      var d = document.createElement("div");
      d.className = "divider";
      d.innerHTML = "<span></span><span></span><span></span>";
      secs[i].parentNode.insertBefore(d, secs[i].nextSibling);
    }
    var dock = document.createElement("div");
    dock.className = "dock";
    dock.setAttribute("role", "group");
    dock.setAttribute("aria-label", "راه‌های تماس");
    dock.innerHTML =
      '<a data-dock="tel" href="#" aria-label="تماس تلفنی" title="تماس">' + ICONS.tel + '</a>' +
      '<a data-dock="wa" href="#" target="_blank" rel="noopener" aria-label="واتساپ" title="واتساپ">' + ICONS.wa + '</a>' +
      '<a data-dock="ig" href="#" target="_blank" rel="noopener" aria-label="اینستاگرام" title="اینستاگرام">' + ICONS.ig + '</a>' +
      '<button data-dock="sound" type="button" aria-label="موسیقی کافه" aria-pressed="false" title="پخش موسیقی کافه">' + ICONS.snd + '</button>' +
      '<button data-dock="club" type="button" aria-label="باشگاه مشتریان" title="باشگاه مشتریان">' + ICONS.club + '</button>';
    document.body.appendChild(dock);
    dock.querySelector('[data-dock="club"]').addEventListener("click", openClub);
    var tag = document.createElement("div");
    tag.className = "demoTag";
    tag.innerHTML = "نمونهٔ نمایشی · <b>" + esc(DEMO_TAG) + "</b>";
    document.body.appendChild(tag);

    var hl = document.querySelector("header.left");
    if (hl && !REDUCED && !hl.querySelector(".dust")) {
      var dust = document.createElement("div");
      dust.className = "dust"; dust.setAttribute("aria-hidden", "true");
      var inner = "";
      for (var p = 0; p < 14; p++) {
        var sz = (2 + Math.random() * 2.4).toFixed(1);
        inner += '<i style="left:' + (Math.random() * 100).toFixed(1) + '%;width:' + sz + 'px;height:' + sz + 'px;' +
          'animation-duration:' + (9 + Math.random() * 10).toFixed(1) + 's;animation-delay:-' + (Math.random() * 12).toFixed(1) + 's"></i>';
      }
      dust.innerHTML = inner;
      hl.appendChild(dust);
      var swp = document.createElement("div");
      swp.className = "sweep"; swp.setAttribute("aria-hidden", "true");
      hl.appendChild(swp);
    }

    if (!document.getElementById("quoteBand")) {
      var qb = document.createElement("section");
      qb.id = "quoteBand"; qb.className = "quoteBand";
      qb.innerHTML = '<span class="qMark">“</span><blockquote id="quoteText"></blockquote><span class="qBy">— باریستای خانه</span>';
      var qAnchor = document.querySelector("#beans") || document.querySelector("#subscriptions") || document.querySelector(".right");
      if (qAnchor) qAnchor.parentNode.insertBefore(qb, qAnchor);
    }

    if (!document.querySelector(".swatches")) {
      var swBox = document.createElement("div");
      swBox.className = "swatches";
      swBox.setAttribute("role", "group");
      swBox.setAttribute("aria-label", "رنگ برند");
      var saved = null;
      try { saved = localStorage.getItem("cms-accent"); } catch (e) {}
      for (var t = 0; t < THEMES.length; t++) {
        (function (th) {
          var b = document.createElement("button");
          b.type = "button";
          b.setAttribute("data-th", th.id);
          b.setAttribute("aria-label", "رنگ " + th.label);
          b.title = th.label;
          b.style.setProperty("--sw", th.g);
          b.onclick = function () {
            applyTheme(th.id);
            try { localStorage.setItem("cms-accent", th.id); } catch (e) {}
          };
          swBox.appendChild(b);
        })(THEMES[t]);
      }
      document.body.appendChild(swBox);
      applyTheme(saved || "champagne");
      applyBrand();
    }

    if (!document.getElementById("toTop")) {
      var tt = document.createElement("button");
      tt.id = "toTop"; tt.type = "button"; tt.title = "بازگشت به بالا";
      tt.setAttribute("aria-label", "بازگشت به بالا");
      tt.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5"/><path d="M5 12l7-7 7 7"/></svg>';
      tt.onclick = function () { window.scrollTo({ top: 0, behavior: REDUCED ? "auto" : "smooth" }); };
      document.body.appendChild(tt);
    }

    if (!document.getElementById("lb")) {
      var lb = document.createElement("div");
      lb.id = "lb"; lb.className = "lb";
      lb.setAttribute("role", "dialog");
      lb.setAttribute("aria-modal", "true");
      lb.setAttribute("aria-label", "نمایش بزرگ تصویر");
      lb.innerHTML =
        '<span class="lbCount"></span>' +
        '<figure><img alt=""/><figcaption></figcaption></figure>' +
        '<button class="lbClose" title="بستن" aria-label="بستن">✕</button>' +
        '<button class="lbPrev" title="قبلی" aria-label="تصویر قبلی">→</button>' +
        '<button class="lbNext" title="بعدی" aria-label="تصویر بعدی">←</button>';
      document.body.appendChild(lb);
      lb.querySelector(".lbClose").onclick = closeLb;
      lb.querySelector(".lbPrev").onclick = function () { stepLb(-1); };
      lb.querySelector(".lbNext").onclick = function () { stepLb(1); };
      lb.addEventListener("click", function (e) { if (e.target === lb) closeLb(); });
      document.addEventListener("keydown", function (e) {
        if (!lb.classList.contains("on")) return;
        if (e.key === "Escape") closeLb();
        if (e.key === "ArrowLeft") stepLb(1);
        if (e.key === "ArrowRight") stepLb(-1);
      });
    }

    var mq = document.createElement("div");
    mq.className = "marquee";
    mq.setAttribute("aria-hidden", "true");
    var line = "";
    for (var r = 0; r < 2; r++) {
      line += '<span>قهوهٔ تخصصی <b>·</b> بوداده در محل <b>·</b> سرو با آرامش <b>·</b> دانهٔ تک‌خاستگاه <b>·</b> شیرِ تازهٔ روز <b>·</b></span>';
    }
    mq.innerHTML = '<div>' + line + line + '</div>';
    var right = document.querySelector(".right");
    if (right) right.insertBefore(mq, right.firstChild);
    var head = document.querySelector("#menu .secHead");
    if (head) {
      var b2 = document.createElement("button");
      b2.id = "luckBtn"; b2.type = "button";
      b2.textContent = "پیشنهاد باریستا";
      b2.onclick = luck;
      head.appendChild(b2);
    }
    var title = document.querySelector(".title");
    if (title && !document.querySelector(".features")) {
      var f = document.createElement("div");
      f.className = "features";
      f.innerHTML = "<span>دانهٔ تک‌خاستگاه</span><span>بودادهٔ هفته</span><span>سرو با آرامش</span>";
      title.appendChild(f);
    }
    injectFooter();
    var targets = document.querySelectorAll("section.sec, .quoteBand, .title, dl.today, .footer");
    if ("IntersectionObserver" in window && !REDUCED) {
      var io = new IntersectionObserver(function (es) {
        for (var q = 0; q < es.length; q++) {
          if (es[q].isIntersecting) { es[q].target.classList.add("in"); io.unobserve(es[q].target); }
        }
      }, { threshold: 0.1 });
      for (var n = 0; n < targets.length; n++) { targets[n].classList.add("rv"); io.observe(targets[n]); }
    } else {
      for (var n2 = 0; n2 < targets.length; n2++) targets[n2].classList.add("rv", "in");
    }
  }

  function injectFooter() {
    var ft = document.querySelector("footer.footer");
    if (!ft || ft.dataset.v4) return;
    ft.dataset.v4 = "1";
    var bodyP = ft.querySelector('[data-edit="footer.body"]');
    if (bodyP) bodyP.classList.add("footBody");
    var tabs = ft.querySelectorAll("p");
    for (var i = 0; i < tabs.length; i++) {
      if (!tabs[i].classList.contains("footName") && !tabs[i].classList.contains("footBody")) tabs[i].classList.add("footTab");
    }
    var cfg = getConfig();
    var C = window.CONTENT || {};
    var email = (C.text && C.text["visit.link2"]) || "";
    var grid = document.createElement("div");
    grid.className = "footGrid";
    grid.innerHTML =
      '<div class="footCol"><h4>بخش‌ها</h4>' +
        '<a href="#menu">منو</a><a href="#beans">دانه‌ها</a><a href="#subscriptions">اشتراک</a>' +
        '<a href="#events">رویدادها</a><a href="#team">تیم ما</a><a href="#gallery">گالری</a><a href="#visit">دیدار</a></div>' +
      '<div class="footCol"><h4>ساعت کاری</h4>' +
        '<span>شنبه تا چهارشنبه · ' + faTime(cfg.hours[6].o) + ' تا ' + faTime(cfg.hours[6].c) + '</span>' +
        '<span>پنجشنبه · ' + faTime(cfg.hours[4].o) + ' تا ' + faTime(cfg.hours[4].c) + '</span>' +
        '<span>جمعه · ' + faTime(cfg.hours[5].o) + ' تا ' + faTime(cfg.hours[5].c) + '</span></div>' +
      '<div class="footCol"><h4>تماس و خبرنامه</h4>' +
        '<a href="' + cfg.tel + '">تماس تلفنی</a>' +
        (email ? '<a href="mailto:' + escAttr(email) + '">' + esc(email) + '</a>' : '') +
        '<a href="' + cfg.instagram + '" target="_blank" rel="noopener">اینستاگرام</a>' +
        '<form class="footNews" id="footNews"><input type="email" placeholder="ایمیل تو…" aria-label="ایمیل" required/><button type="submit">عضویت</button></form>' +
        '<p class="footNewsMsg" id="footNewsMsg" role="status"></p></div>';
    ft.appendChild(grid);
    var bar = document.createElement("div");
    bar.className = "footBar";
    var yr = faNum(new Intl.DateTimeFormat("fa-IR", { year: "numeric" }).format(new Date()));
    bar.innerHTML = '<span>© ' + yr + ' — تمام حقوق برای این خانه است.</span><span>بوداده‌شده با حوصله در تهران</span>';
    ft.appendChild(bar);
    var fn = document.getElementById("footNews");
    if (fn) {
      fn.addEventListener("submit", function (e) {
        e.preventDefault();
        document.getElementById("footNewsMsg").textContent = "✦ عضویت تو ثبت شد؛ نامهٔ بعدی با بوی قهوه می‌آید.";
        fn.reset();
      });
    }
  }

  function luck() {
    var menu = menuData();
    var cats = [];
    for (var i = 0; i < menu.length; i++) if ((menu[i].items || []).length) cats.push(menu[i]);
    if (!cats.length) return;
    var c = cats[Math.floor(Math.random() * cats.length)];
    var it = c.items[Math.floor(Math.random() * c.items.length)];
    var ov = document.createElement("div");
    ov.className = "luck";
    ov.setAttribute("role", "dialog");
    ov.setAttribute("aria-modal", "true");
    ov.innerHTML =
      '<div class="luckCard"><div class="luckEmoji">☕</div>' +
      '<p class="luckCat">پیشنهاد باریستا از «' + esc(c.title) + '»</p>' +
      '<h3 class="luckName">' + esc(it.name) + '</h3>' +
      '<p class="luckPrice">' + esc(it.price || "") + '</p>' +
      '<div class="luckBtns"><button class="again">پیشنهاد دیگر</button><button class="close">بستن</button></div></div>';
    document.body.appendChild(ov);
    ov.querySelector(".again").onclick = function () { ov.remove(); luck(); };
    ov.querySelector(".close").onclick = function () { ov.remove(); };
    ov.onclick = function (e) { if (e.target === ov) ov.remove(); };
    ov.querySelector(".close").focus();
  }

  function initAll() {
    capture();
    applyAll();
    setStatus();
    setToday();
    injectOnce();
    updateDock();
    initScrollUI();
    initCursor();
    initMagnetic();
    initClock();
    initPeek();
    initSound();
    splitHeadings();
  }
  window.addEventListener("message", function (e) {
    var d = e.data;
    if (d && d.type === "cms-preview") {
      window.CONTENT = d.content || {};
      applyAll(); setStatus(); setToday(); updateDock();
    }
  });
  document.addEventListener("DOMContentLoaded", initAll);
})();