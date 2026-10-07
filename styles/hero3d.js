// hero3d.js — صحنه سه‌بعدی: دانه‌ها → فنجان → لاته با آرت → بخار
(function () {
  var CSS = '#hero3d{position:absolute;inset:0;overflow:hidden;background:radial-gradient(60% 50% at 50% 42%, rgba(192,122,74,.16), transparent 70%);}' +
    '#hero3d canvas{display:block;width:100%;height:100%;}';
  function injectStyle(){
    if (document.getElementById('hero3d-style')) return;
    var st = document.createElement('style');
    st.id = 'hero3d-style';
    st.textContent = CSS;
    document.head.appendChild(st);
  }
  function mix(a, b, p){
    var ar = parseInt(a.slice(1,3),16), ag = parseInt(a.slice(3,5),16), ab = parseInt(a.slice(5,7),16);
    var br = parseInt(b.slice(1,3),16), bg = parseInt(b.slice(3,5),16), bb = parseInt(b.slice(5,7),16);
    return 'rgb(' + Math.round(ar+(br-ar)*p) + ',' + Math.round(ag+(bg-ag)*p) + ',' + Math.round(ab+(bb-ab)*p) + ')';
  }
  function clamp01(v){ return v < 0 ? 0 : (v > 1 ? 1 : v); }

  window.initHero3D = function () {
    var host = document.getElementById('hero3d');
    if (!host || !window.THREE || host.dataset.on) return;
    host.dataset.on = '1';
    injectStyle();

    var W = host.clientWidth || 600, H = host.clientHeight || 600;
    var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(W, H);
    host.appendChild(renderer.domElement);

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(35, W / H, 0.1, 100);
    camera.position.set(0, 2.3, 6.4);

    scene.add(new THREE.HemisphereLight(0xfff2e0, 0x1c1208, 0.95));
    var key = new THREE.DirectionalLight(0xffd9a0, 1.15); key.position.set(4, 7, 4); scene.add(key);
    var rim = new THREE.PointLight(0xc07a4a, 0.9, 30); rim.position.set(-5, 3, -4); scene.add(rim);

    var ceramic = new THREE.MeshStandardMaterial({ color: 0xf4eee4, roughness: 0.32, metalness: 0.05, side: THREE.DoubleSide });

    var cupPts = [
      new THREE.Vector2(0.001, 0), new THREE.Vector2(0.50, 0), new THREE.Vector2(0.58, 0.06),
      new THREE.Vector2(0.80, 1.05), new THREE.Vector2(0.86, 1.30), new THREE.Vector2(0.80, 1.32),
      new THREE.Vector2(0.72, 1.05), new THREE.Vector2(0.60, 0.35), new THREE.Vector2(0.001, 0.32)
    ];
    var cup = new THREE.Mesh(new THREE.LatheGeometry(cupPts, 64), ceramic);

    var handle = new THREE.Mesh(new THREE.TorusGeometry(0.30, 0.07, 14, 40, Math.PI * 1.35), ceramic);
    handle.position.set(0.88, 0.72, 0);
    handle.rotation.z = -2.11;

    var saucerPts = [
      new THREE.Vector2(0.001, 0), new THREE.Vector2(1.55, 0), new THREE.Vector2(1.62, 0.05),
      new THREE.Vector2(1.48, 0.10), new THREE.Vector2(0.70, 0.12), new THREE.Vector2(0.62, 0.05), new THREE.Vector2(0.001, 0.05)
    ];
    var saucer = new THREE.Mesh(new THREE.LatheGeometry(saucerPts, 64), ceramic);
    saucer.position.y = -0.02;

    var group = new THREE.Group();
    group.add(cup); group.add(handle); group.add(saucer);
    group.position.y = -0.9;
    scene.add(group);

    /* سطح قهوه با بافت زنده */
    var cv = document.createElement('canvas'); cv.width = 512; cv.height = 512;
    var ctx = cv.getContext('2d');
    var tex = new THREE.CanvasTexture(cv);
    var coffee = new THREE.Mesh(new THREE.CircleGeometry(0.72, 56),
      new THREE.MeshStandardMaterial({ map: tex, roughness: 0.22 }));
    coffee.rotation.x = -Math.PI / 2;
    coffee.position.y = 1.16;
    group.add(coffee);

    var SPECK = [];
    for (var si = 0; si < 46; si++) {
      var ang = Math.random() * Math.PI * 2, rad = 60 + Math.random() * 180;
      SPECK.push([256 + Math.cos(ang) * rad, 256 + Math.sin(ang) * rad, 1 + Math.random() * 2.4]);
    }
    var HEARTLEN = 980;
    function heartPath(c){
      c.moveTo(256, 392);
      c.bezierCurveTo(150, 308, 108, 246, 108, 192);
      c.bezierCurveTo(108, 140, 150, 116, 192, 116);
      c.bezierCurveTo(224, 116, 246, 138, 256, 164);
      c.bezierCurveTo(266, 138, 288, 116, 320, 116);
      c.bezierCurveTo(362, 116, 404, 140, 404, 192);
      c.bezierCurveTo(404, 246, 362, 308, 256, 392);
      c.closePath();
    }
    function drawCoffee(lp, hp, sw){
      var g = ctx.createRadialGradient(256, 232, 40, 256, 256, 252);
      g.addColorStop(0, mix('#6a4326', '#d9a869', lp));
      g.addColorStop(0.55, mix('#4a2c15', '#c08447', lp));
      g.addColorStop(1, mix('#2e1a0c', '#8a5a28', lp));
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 512, 512);
      ctx.fillStyle = 'rgba(255,240,220,' + (0.22 * lp).toFixed(3) + ')';
      for (var i = 0; i < SPECK.length; i++) {
        ctx.beginPath(); ctx.arc(SPECK[i][0], SPECK[i][1], SPECK[i][2], 0, 7); ctx.fill();
      }
      if (sw > 0 && sw < 1) {
        ctx.strokeStyle = 'rgba(246,234,216,' + (0.45 * Math.sin(sw * Math.PI)).toFixed(3) + ')';
        ctx.lineWidth = 9; ctx.beginPath();
        for (var a = 0.0001; a < Math.PI * 3.6; a += 0.22) {
          var rr = 18 + a * 30;
          var x = 256 + Math.cos(a + sw * 7) * rr;
          var y = 256 + Math.sin(a + sw * 7) * rr * 0.92;
          if (a < 0.1) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      if (hp > 0) {
        ctx.save();
        ctx.strokeStyle = '#f6ead8'; ctx.lineWidth = 15; ctx.lineCap = 'round';
        ctx.setLineDash([HEARTLEN]);
        ctx.lineDashOffset = HEARTLEN * (1 - clamp01(hp / 0.8));
        ctx.beginPath(); heartPath(ctx); ctx.stroke();
        if (hp > 0.8) {
          ctx.setLineDash([]);
          ctx.globalAlpha = clamp01((hp - 0.8) / 0.2);
          ctx.fillStyle = '#f6ead8';
          ctx.beginPath(); heartPath(ctx); ctx.fill();
        }
        ctx.restore();
      }
      tex.needsUpdate = true;
    }
    drawCoffee(0, 0, 0);

    /* دانه‌های سه‌بعدی */
    var bc = document.createElement('canvas'); bc.width = 128; bc.height = 128;
    var bctx = bc.getContext('2d');
    var bg2 = bctx.createRadialGradient(45, 40, 8, 64, 64, 70);
    bg2.addColorStop(0, '#a9713d'); bg2.addColorStop(0.55, '#7a4a24'); bg2.addColorStop(1, '#4a2a12');
    bctx.fillStyle = bg2; bctx.fillRect(0, 0, 128, 128);
    bctx.strokeStyle = '#3a2010'; bctx.lineWidth = 10; bctx.lineCap = 'round';
    bctx.beginPath(); bctx.moveTo(64, 12); bctx.bezierCurveTo(50, 44, 50, 84, 64, 116); bctx.stroke();
    bctx.strokeStyle = 'rgba(232,201,160,.7)'; bctx.lineWidth = 4;
    bctx.beginPath(); bctx.moveTo(66, 16); bctx.bezierCurveTo(54, 46, 54, 82, 66, 112); bctx.stroke();
    var beanTex = new THREE.CanvasTexture(bc);
    var beanGeo = new THREE.SphereGeometry(0.15, 18, 14);
    var beanMat = new THREE.MeshStandardMaterial({ map: beanTex, roughness: 0.55 });
    var beans = [];
    for (var bi = 0; bi < 14; bi++) {
      var m = new THREE.Mesh(beanGeo, beanMat);
      m.scale.set(1, 1.35, 0.82);
      var b = {
        mesh: m,
        sx: (Math.random() * 4.4 - 2.2),
        sy: 3.4 + Math.random() * 1.4,
        sz: (Math.random() * 1.6 - 0.8),
        tx: (Math.random() * 0.5 - 0.25),
        tz: (Math.random() * 0.5 - 0.25),
        delay: Math.random() * 0.8,
        dur: 0.85 + Math.random() * 0.5,
        spin: (Math.random() * 6 - 3),
        landed: false
      };
      m.position.set(b.sx, b.sy, b.sz);
      beans.push(b);
      scene.add(m);
    }

    /* موج‌های برخورد */
    var ripples = [];
    for (var ri = 0; ri < 8; ri++) {
      var rm = new THREE.Mesh(
        new THREE.RingGeometry(0.10, 0.14, 40),
        new THREE.MeshBasicMaterial({ color: 0xf6ead8, transparent: true, opacity: 0, side: THREE.DoubleSide })
      );
      rm.rotation.x = -Math.PI / 2;
      rm.position.y = 1.19;
      rm.visible = false;
      group.add(rm);
      ripples.push({ mesh: rm, life: -1 });
    }
    function spawnRipple(){
      for (var i = 0; i < ripples.length; i++) {
        if (ripples[i].life < 0) { ripples[i].life = 0; ripples[i].mesh.visible = true; return; }
      }
    }

    /* جریان شیر */
    var milk = new THREE.Mesh(
      new THREE.CylinderGeometry(0.045, 0.07, 2.4, 14),
      new THREE.MeshStandardMaterial({ color: 0xf6ead8, roughness: 0.4, emissive: 0x3a2c1c })
    );
    milk.position.set(0, 2.5, 0);
    milk.visible = false;
    group.add(milk);

    /* بخار */
    var stC = document.createElement('canvas'); stC.width = 64; stC.height = 64;
    var sctx = stC.getContext('2d');
    var sg = sctx.createRadialGradient(32, 32, 2, 32, 32, 30);
    sg.addColorStop(0, 'rgba(255,252,246,.55)'); sg.addColorStop(1, 'rgba(255,252,246,0)');
    sctx.fillStyle = sg; sctx.fillRect(0, 0, 64, 64);
    var stTex = new THREE.CanvasTexture(stC);
    var steams = [];
    for (var ti = 0; ti < 16; ti++) {
      var sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: stTex, transparent: true, depthWrite: false, opacity: 0 }));
      sp.scale.set(0.6, 0.6, 0.6);
      group.add(sp);
      steams.push({ sp: sp, seed: Math.random() });
    }

    /* پارالاکس ماوس */
    var px = 0, py = 0, tpx = 0, tpy = 0;
    var stageEl = host.parentElement;
    if (stageEl) {
      stageEl.addEventListener('mousemove', function (e) {
        var r = stageEl.getBoundingClientRect();
        tpx = ((e.clientX - r.left) / r.width - 0.5) * 2;
        tpy = ((e.clientY - r.top) / r.height - 0.5) * 2;
      });
      stageEl.addEventListener('mouseleave', function () { tpx = 0; tpy = 0; });
    }

    var t0 = performance.now() / 1000;
    var lastDraw = -1;
    function frame(){
      var t = performance.now() / 1000 - t0;
      for (var i = 0; i < beans.length; i++) {
        var b = beans[i];
        if (b.landed) continue;
        var p = clamp01((t - b.delay) / b.dur);
        if (p <= 0) continue;
        var e = p * p;
        b.mesh.position.x = b.sx + (b.tx - b.sx) * p;
        b.mesh.position.z = b.sz + (b.tz - b.sz) * p;
        b.mesh.position.y = b.sy + (0.45 - b.sy) * e;
        b.mesh.rotation.x += 0.02 + b.spin * 0.01;
        b.mesh.rotation.z += 0.015;
        if (p >= 1) { b.landed = true; b.mesh.visible = false; spawnRipple(); }
      }
      for (var r2 = 0; r2 < ripples.length; r2++) {
        var rp = ripples[r2];
        if (rp.life < 0) continue;
        rp.life += 0.016;
        var l2 = rp.life / 0.9;
        if (l2 >= 1) { rp.life = -1; rp.mesh.visible = false; rp.mesh.material.opacity = 0; continue; }
        var sc = 1 + l2 * 5;
        rp.mesh.scale.set(sc, sc, sc);
        rp.mesh.material.opacity = 0.55 * (1 - l2);
      }
      milk.visible = (t > 1.7 && t < 2.7);
      if (milk.visible) milk.position.x = Math.sin(t * 26) * 0.02;
      var lp = clamp01((t - 1.9) / 1.0);
      var hp = clamp01((t - 2.6) / 1.3);
      var sw = clamp01((t - 1.8) / 1.2);
      var kk = Math.round(lp * 40) + '|' + Math.round(hp * 60) + '|' + Math.round(sw * 40);
      if (kk !== lastDraw) { lastDraw = kk; drawCoffee(lp, hp, sw); }
      for (var s2 = 0; s2 < steams.length; s2++) {
        var st = steams[s2];
        if (t < 3.4) { st.sp.material.opacity = 0; continue; }
        var ct = ((t - 3.4) * 0.22 + st.seed) % 1;
        st.sp.position.set(Math.sin(ct * 6.2 + st.seed * 9) * 0.28 * (0.3 + ct), 1.35 + ct * 2.4, Math.cos(ct * 4 + st.seed * 7) * 0.15);
        st.sp.material.opacity = Math.sin(ct * Math.PI) * 0.32;
        var sc2 = 0.45 + ct * 1.3;
        st.sp.scale.set(sc2, sc2, sc2);
      }
      px += (tpx - px) * 0.06; py += (tpy - py) * 0.06;
      camera.position.x = px * 0.7;
      camera.position.y = 2.3 - py * 0.35;
      camera.lookAt(0, 0.45, 0);
      group.rotation.y = Math.sin(t * 0.14) * 0.07;
      renderer.render(scene, camera);
      requestAnimationFrame(frame);
    }
    frame();

    window.__hero3dReplay = function () {
      t0 = performance.now() / 1000;
      lastDraw = -1;
      for (var i2 = 0; i2 < beans.length; i2++) {
        beans[i2].landed = false;
        beans[i2].mesh.visible = true;
        beans[i2].mesh.position.set(beans[i2].sx, beans[i2].sy, beans[i2].sz);
      }
      for (var r3 = 0; r3 < ripples.length; r3++) { ripples[r3].life = -1; ripples[r3].mesh.visible = false; }
      drawCoffee(0, 0, 0);
    };

    window.addEventListener('resize', function () {
      var w = host.clientWidth, h2 = host.clientHeight;
      if (!w || !h2) return;
      camera.aspect = w / h2;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h2);
    });
  };
})();