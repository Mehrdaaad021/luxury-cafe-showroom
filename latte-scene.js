/* latte-scene.js — بعد از cms.js لود شود (با defer) */
(() => {
  'use strict';

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const rand = (a, b) => a + Math.random() * (b - a);
  const STATES = ['is-esp', 'is-milk', 'is-art', 'is-steam', 'is-out'];

  const BEAN = `<svg viewBox="0 0 26 35" aria-hidden="true">
    <ellipse cx="13" cy="17.5" rx="11.5" ry="16.5" fill="#5a3624" stroke="#33190f" stroke-width=".8"/>
    <ellipse cx="10.5" cy="12" rx="5" ry="8" fill="#7a4c33" opacity=".7"/>
    <path d="M13 2.5C6 11 20 24 13 33" fill="none" stroke="#25120b" stroke-width="2.2" stroke-linecap="round"/>
  </svg>`;

  const SCENE = `
  <div class="lcScene" role="img" aria-label="فنجان لاته با طرح قلب و بخار؛ برای پخش دوباره کلیک کنید">
    <div class="lcGlow"></div>
    <svg class="lcSvg" viewBox="0 0 400 400" aria-hidden="true">
      <defs>
        <linearGradient id="lcSaucer" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fffaf0"/><stop offset="1" stop-color="#e6cdb0"/></linearGradient>
        <linearGradient id="lcBody" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fffaf0"/><stop offset=".5" stop-color="#fbefdc"/><stop offset="1" stop-color="#e3caa9"/></linearGradient>
        <linearGradient id="lcInner" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eed9bd"/><stop offset="1" stop-color="#8a6e58"/></linearGradient>
        <radialGradient id="lcEspG" cx=".5" cy=".5" r=".6"><stop offset="0" stop-color="#6b4129"/><stop offset="1" stop-color="#2c1a12"/></radialGradient>
        <radialGradient id="lcMilkG" cx=".5" cy=".42" r=".62"><stop offset="0" stop-color="#efcda3"/><stop offset=".6" stop-color="#c8925d"/><stop offset="1" stop-color="#a8733f"/></radialGradient>
        <filter id="lcBlur" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="8"/></filter>
        <clipPath id="lcBodyClip"><path d="M75 170C75 262 118 304 200 304C282 304 325 262 325 170Z"/></clipPath>
        <clipPath id="lcInnerClip"><ellipse cx="200" cy="169.5" rx="112" ry="33.5"/></clipPath>
        <path id="lcHeart" d="M0 42C-8 35-62 4-58-26C-55-48-22-54 0-26C22-54 55-48 58-26C62 4 8 35 0 42Z"/>
      </defs>

      <!-- سایه و نعلبکی -->
      <ellipse cx="205" cy="324" rx="160" ry="28" fill="rgba(46,30,24,.28)" filter="url(#lcBlur)"/>
      <ellipse cx="200" cy="314" rx="160" ry="36" fill="#d9bf9f"/>
      <ellipse cx="200" cy="308" rx="160" ry="36" fill="url(#lcSaucer)"/>
      <ellipse cx="200" cy="306" rx="112" ry="22" fill="#ecd6bb" stroke="#dcc2a2" stroke-width="1.5"/>

      <g class="lcCupG">
        <ellipse cx="200" cy="303" rx="98" ry="12" fill="rgba(80,50,35,.25)"/>
        <!-- دسته -->
        <path d="M316 192C378 182 384 268 306 262" fill="none" stroke="#e3caa9" stroke-width="19" stroke-linecap="round"/>
        <path d="M316 192C378 182 384 268 306 262" fill="none" stroke="#fbefdc" stroke-width="14" stroke-linecap="round"/>
        <!-- بدنه -->
        <path d="M75 170C75 262 118 304 200 304C282 304 325 262 325 170Z" fill="url(#lcBody)"/>
        <g clip-path="url(#lcBodyClip)" fill="none">
          <path d="M60 236Q200 292 340 236" stroke="#e07a5f" stroke-width="12"/>
          <path d="M60 254Q200 310 340 254" stroke="#f2cc8f" stroke-width="5"/>
        </g>
        <path d="M92 196C96 244 122 276 160 290" fill="none" stroke="#fff" stroke-opacity=".6" stroke-width="6" stroke-linecap="round"/>
        <!-- لبه و داخل فنجان -->
        <ellipse cx="200" cy="170" rx="125" ry="38" fill="#fffaf1" stroke="#ead3b6" stroke-width="2"/>
        <ellipse cx="200" cy="169.5" rx="112" ry="33.5" fill="url(#lcInner)"/>

        <g clip-path="url(#lcInnerClip)">
          <ellipse class="lcEsp"  cx="200" cy="172" rx="106" ry="31" fill="url(#lcEspG)"/>
          <ellipse class="lcMilk" cx="200" cy="172" rx="106" ry="31" fill="url(#lcMilkG)"/>
          <ellipse class="lcShine" cx="178" cy="160" rx="52" ry="7" fill="#fff" opacity=".2"/>
          <g transform="translate(200 173) scale(1.05 .31)">
            <g class="lcArt a1"><use href="#lcHeart" fill="#f8e9d3"/></g>
            <g class="lcArt a2"><use href="#lcHeart" fill="#cf9a66" transform="scale(.7)"/></g>
            <g class="lcArt a3"><use href="#lcHeart" fill="#f8e9d3" transform="scale(.42)"/></g>
            <path class="lcLine" pathLength="1" d="M0 -14L0 44" fill="none" stroke="#8a5a34" stroke-opacity=".75" stroke-width="2.6" stroke-linecap="round"/>
          </g>
          <ellipse class="lcRipple" cx="200" cy="171" rx="20" ry="6" fill="none" stroke="#fff" stroke-width="2" opacity="0" style="transform-box:fill-box;transform-origin:50% 50%"/>
        </g>
      </g>

      <!-- نقطه‌ی فرود دانه‌ها (نامرئی) -->
      <circle id="lcMouth" cx="200" cy="170" r="2" fill="none"/>

      <!-- بخار -->
      <g class="lcSteam">
        <g transform="translate(164 140)"><path class="lcSt lcStA" d="M0 0C-16-20 16-40 0-62C-14-82 12-100 0-124"/></g>
        <g transform="translate(202 134)"><path class="lcSt lcStB" d="M0 0C14-22-14-42 0-66C14-88-10-106 0-130"/></g>
        <g transform="translate(240 140)"><path class="lcSt lcStC" d="M0 0C-14-20 14-38 0-60C-12-80 10-98 0-118"/></g>
      </g>
    </svg>
  </div>`;

  let stage, scene, mouth, cupG, ripple, layer, io;
  let timers = [], anims = new Set(), visible = false;

  const later = (fn, ms) => timers.push(setTimeout(fn, ms));
  const add = c => scene && scene.classList.add(c);
  const resetStates = () => scene && STATES.forEach(c => scene.classList.remove(c));

  function clearAll() {
    timers.forEach(clearTimeout); timers = [];
    anims.forEach(a => { a.onfinish = null; a.cancel(); a.__el.remove(); });
    anims.clear();
  }

  function thud() {
    if (!cupG) return;
    cupG.animate(
      [{ transform: 'translateY(0)' }, { transform: 'translateY(2.5px)', offset: .35 }, { transform: 'translateY(0)' }],
      { duration: 180, easing: 'ease-out' });
    ripple.animate(
      [{ transform: 'scale(.3)', opacity: .7 }, { transform: 'scale(2.6)', opacity: 0 }],
      { duration: 600, easing: 'ease-out' });
  }

  function drop() {
    if (!stage || !mouth) return;
    const m = mouth.getBoundingClientRect(), s = stage.getBoundingClientRect();
    const size = Math.max(20, Math.min(34, s.width * .065));
    const tx = m.left + m.width / 2, ty = m.top + m.height / 2;
    const x0 = tx + rand(-s.width * .3, s.width * .3);
    const x1 = tx + rand(-s.width * .05, s.width * .05);
    const r0 = rand(-180, 180), r1 = r0 + rand(-540, 540);

    const el = document.createElement('div');
    el.className = 'lcBean';
    el.style.width = size + 'px';
    el.style.height = size * 1.35 + 'px';
    el.innerHTML = BEAN;
    layer.appendChild(el);

    const P = (x, y, r, sc, o) => ({
      transform: `translate(${x - size / 2}px,${y - size * .675}px) rotate(${r}deg) scale(${sc})`, opacity: o });

    const a = el.animate([
      { ...P(x0, -size * 2, r0, 1, 1), easing: 'cubic-bezier(.5,0,.9,.6)' },
      { ...P(x1, ty, r1, 1, 1), offset: .9 },
      P(x1, ty + 4, r1, .4, 0)
    ], { duration: 900 + ty * .35 + rand(0, 300), fill: 'forwards' });

    a.__el = el; anims.add(a);
    a.onfinish = () => { el.remove(); anims.delete(a); thud(); };
  }

  function play() {
    if (!scene) return;
    clearAll(); resetStates();
    for (let i = 0; i < 11; i++) later(drop, 600 + i * 240);   // ۱۱ دانه
    later(() => add('is-esp'),   3500);   // اسپرسو
    later(() => add('is-milk'),  4900);   // شیر
    later(() => add('is-art'),   7000);   // طرح قلب
    later(() => add('is-steam'), 8200);   // بخار
    later(() => add('is-out'),  16300);   // محو شدن
    later(resetStates,          16800);
    later(play,                 18200);   // تکرار
  }

  function showFinal() {
    ['is-esp', 'is-milk', 'is-art', 'is-steam'].forEach(add);
  }

  function start() { reduce ? showFinal() : play(); }
  function stop()  { clearAll(); resetStates(); }

  function mount() {
    const s = document.querySelector('.stage');
    if (!s || s.querySelector(':scope > .lcScene')) return;

    stage = s;
    s.classList.add('lc-stage');
    s.insertAdjacentHTML('beforeend', SCENE);
    scene  = s.querySelector('.lcScene');
    mouth  = s.querySelector('#lcMouth');
    cupG   = s.querySelector('.lcCupG');
    ripple = s.querySelector('.lcRipple');

    if (!layer) {
      layer = document.createElement('div');
      layer.className = 'lcBeans';
      layer.setAttribute('aria-hidden', 'true');
      document.body.appendChild(layer);
    }
    if (!s.dataset.lcBound) {
      s.dataset.lcBound = '1';
      s.addEventListener('click', () => { if (!reduce) play(); });
    }

    if (io) io.disconnect();
    io = new IntersectionObserver(es => {
      visible = es[0].isIntersecting;
      visible ? start() : stop();
    }, { threshold: .35 });
    io.observe(s);
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop(); else if (visible) start();
  });

  // cms.js ممکن است .stage را دیرتر بسازد یا دوباره بسازد
  let raf;
  new MutationObserver(() => { cancelAnimationFrame(raf); raf = requestAnimationFrame(mount); })
    .observe(document.documentElement, { childList: true, subtree: true });
  mount();
})();