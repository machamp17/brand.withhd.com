/* ===========================================
   WITH HOLDINGS — Refined Cursor & Click Spark
   =========================================== */
(function(){
  // Skip on coarse pointers (touch devices)
  if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) return;
  if ('ontouchstart' in window && !window.matchMedia('(pointer: fine)').matches) return;

  const style = document.createElement('style');
  style.setAttribute('data-whd-cursor','');
  style.textContent = `
    html, body { cursor: none !important; }
    html *, body * { cursor: none !important; }

    .whd-cursor-ring, .whd-cursor-dot, .whd-spark-layer, .whd-cursor-corners {
      position: fixed; pointer-events: none; z-index: 2147483646;
      will-change: transform, opacity;
    }
    .whd-cursor-ring {
      top: 0; left: 0;
      width: 26px; height: 26px;
      border: 1px solid rgba(212,162,74,.78);
      border-radius: 50%;
      transform: translate3d(-100px,-100px,0) translate(-50%,-50%);
      transition:
        width .32s cubic-bezier(.2,.8,.2,1),
        height .32s cubic-bezier(.2,.8,.2,1),
        border-color .25s ease,
        background-color .25s ease,
        opacity .25s ease,
        border-radius .3s ease,
        box-shadow .3s ease;
      opacity: 0;
      box-shadow:
        0 0 0 1px rgba(212,162,74,.05),
        0 0 14px rgba(212,162,74,.12);
    }
    .whd-cursor-dot {
      top: 0; left: 0;
      width: 4px; height: 4px;
      background: #D4A24A;
      border-radius: 50%;
      transform: translate3d(-100px,-100px,0) translate(-50%,-50%);
      opacity: 0;
      transition: opacity .25s ease, transform .06s linear, background .25s ease, width .25s ease, height .25s ease;
      box-shadow: 0 0 6px rgba(212,162,74,.6);
    }
    .whd-cursor-ring.is-on, .whd-cursor-dot.is-on { opacity: 1; }

    /* HOVER: ring expands and fills, dot disappears (clear visual feedback) */
    .whd-cursor-ring.is-hover {
      width: 56px; height: 56px;
      background: rgba(212,162,74,.12);
      border-color: rgba(232,201,136,1);
      box-shadow: 0 0 0 1px rgba(232,201,136,.25), 0 0 24px rgba(212,162,74,.4);
    }
    .whd-cursor-dot.is-hover {
      width: 0; height: 0;
      opacity: 0;
    }

    .whd-cursor-ring.is-down {
      width: 16px; height: 16px;
      background: rgba(212,162,74,.18);
      border-color: rgba(232,201,136,1);
      box-shadow: 0 0 0 1px rgba(232,201,136,.3), 0 0 16px rgba(212,162,74,.45);
    }
    .whd-cursor-ring.is-text {
      width: 2px; height: 22px; border-radius: 1px;
      border: none; background: rgba(232,201,136,.85);
    }

    /* Corner brackets — appear when over interactive */
    .whd-cursor-corners {
      top: 0; left: 0;
      width: 56px; height: 56px;
      transform: translate3d(-100px,-100px,0) translate(-50%,-50%);
      opacity: 0;
      transition: opacity .25s ease, transform .35s cubic-bezier(.2,.8,.2,1);
    }
    .whd-cursor-corners.is-on { opacity: 1; }
    .whd-cursor-corners .c {
      position: absolute; width: 12px; height: 12px;
      border: 1px solid rgba(232,201,136,.95);
      filter: drop-shadow(0 0 4px rgba(212,162,74,.5));
    }
    .whd-cursor-corners .c.tl { top: 0;     left: 0;     border-right: none; border-bottom: none; }
    .whd-cursor-corners .c.tr { top: 0;     right: 0;    border-left:  none; border-bottom: none; }
    .whd-cursor-corners .c.bl { bottom: 0;  left: 0;     border-right: none; border-top:    none; }
    .whd-cursor-corners .c.br { bottom: 0;  right: 0;    border-left:  none; border-top:    none; }

    /* spark */
    .whd-spark-layer { top:0; left:0; width:0; height:0; }
    .whd-spark {
      position: absolute; top:0; left:0;
      width: 1px; height: 14px;
      background: linear-gradient(180deg, rgba(232,201,136,0) 0%, rgba(232,201,136,1) 50%, rgba(232,201,136,0) 100%);
      transform-origin: 50% 0%;
      opacity: 0;
      filter: drop-shadow(0 0 2px rgba(212,162,74,.6));
    }
    .whd-spark-dot {
      position: absolute; top:0; left:0;
      width: 6px; height: 6px; margin: -3px 0 0 -3px;
      border-radius: 50%;
      background: rgba(232,201,136,.9);
      opacity: 0;
      box-shadow: 0 0 12px rgba(212,162,74,.7);
    }
    @media (prefers-reduced-motion: reduce) {
      .whd-cursor-ring, .whd-cursor-dot, .whd-spark-layer, .whd-cursor-corners { display: none !important; }
      html, body, html *, body * { cursor: auto !important; }
    }
  `;
  document.head.appendChild(style);
  // direct enforcement (bypasses any class-name overrides)
  document.documentElement.style.cursor = 'none';
  if (document.body) document.body.style.cursor = 'none';
  else document.addEventListener('DOMContentLoaded', () => { document.body.style.cursor = 'none'; });

  function build(){
    const ring = document.createElement('div'); ring.className = 'whd-cursor-ring';
    const dot  = document.createElement('div'); dot.className  = 'whd-cursor-dot';
    const corners = document.createElement('div'); corners.className = 'whd-cursor-corners';
    corners.innerHTML = '<span class="c tl"></span><span class="c tr"></span><span class="c bl"></span><span class="c br"></span>';
    const sparkLayer = document.createElement('div'); sparkLayer.className = 'whd-spark-layer';
    document.body.appendChild(corners);
    document.body.appendChild(ring);
    document.body.appendChild(dot);
    document.body.appendChild(sparkLayer);
    return { ring, dot, corners, sparkLayer };
  }

  let parts = null;
  function ensureParts(){
    if (parts) return parts;
    if (!document.body) return null;
    parts = build();
    return parts;
  }

  let mx = -100, my = -100;
  let rx = -100, ry = -100;
  let active = false;

  function loop(){
    const p = ensureParts(); if (!p) { requestAnimationFrame(loop); return; }
    rx += (mx - rx) * 0.22;
    ry += (my - ry) * 0.22;
    p.ring.style.transform    = `translate3d(${rx}px, ${ry}px, 0) translate(-50%,-50%)`;
    p.dot.style.transform     = `translate3d(${mx}px, ${my}px, 0) translate(-50%,-50%)`;
    p.corners.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%,-50%)`;
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);

  window.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    if (!active){
      active = true;
      const p = ensureParts(); if(!p) return;
      p.ring.classList.add('is-on'); p.dot.classList.add('is-on');
    }
  }, { passive:true });

  window.addEventListener('mouseleave', () => {
    if(!parts) return;
    parts.ring.classList.remove('is-on');
    parts.dot.classList.remove('is-on');
    parts.corners.classList.remove('is-on');
    active = false;
  });
  window.addEventListener('mouseenter', () => {
    if(!parts) return;
    if (active) { parts.ring.classList.add('is-on'); parts.dot.classList.add('is-on'); }
  });

  // Treat text inputs the same as any other interactive element (no I-beam variant)
  const HOVER_SEL = 'a, button, [role="button"], input, textarea, select, label, summary, details, .cc-btn, .cc-toggle, .biz-card, .group-card, .link-card, .cta, .nav-toggle, .drawer-close, .drawer a, [data-cursor="hover"]';

  document.addEventListener('mouseover', (e) => {
    const p = ensureParts(); if(!p) return;
    const t = e.target;
    if (!(t instanceof Element)) return;
    if (t.closest(HOVER_SEL)) {
      p.ring.classList.add('is-hover');
      p.dot.classList.add('is-hover');
      p.corners.classList.add('is-on');
      p.ring.classList.remove('is-text');
    }
  });
  document.addEventListener('mouseout', (e) => {
    const p = ensureParts(); if(!p) return;
    const t = e.target;
    if (!(t instanceof Element)) return;
    if (t.closest(HOVER_SEL)) {
      p.ring.classList.remove('is-hover','is-text');
      p.dot.classList.remove('is-hover');
      p.corners.classList.remove('is-on');
    }
  });

  document.addEventListener('mousedown', () => parts && parts.ring.classList.add('is-down'));
  document.addEventListener('mouseup',   () => parts && parts.ring.classList.remove('is-down'));

  function spark(x, y){
    const p = ensureParts(); if(!p) return;
    const layer = p.sparkLayer;
    const N = 6;
    const dist = 22;
    const dur = 620;

    const glow = document.createElement('div');
    glow.className = 'whd-spark-dot';
    glow.style.left = x + 'px';
    glow.style.top  = y + 'px';
    layer.appendChild(glow);
    glow.animate([
      { opacity: .9, transform: 'scale(.6)' },
      { opacity: 0,  transform: 'scale(2.2)' }
    ], { duration: 480, easing: 'cubic-bezier(.2,.8,.2,1)' });
    setTimeout(() => glow.remove(), 520);

    for (let i = 0; i < N; i++){
      const r = document.createElement('div');
      r.className = 'whd-spark';
      const angle = (360 / N) * i + (Math.random() * 18 - 9);
      const len = 10 + Math.random() * 8;
      r.style.height = len + 'px';
      r.style.left = x + 'px';
      r.style.top = y + 'px';
      r.style.transform = `rotate(${angle}deg) translateY(0)`;
      layer.appendChild(r);

      r.animate([
        { opacity: 1,   transform: `rotate(${angle}deg) translateY(2px) scaleY(.6)` },
        { opacity: .85, transform: `rotate(${angle}deg) translateY(${dist*0.55}px) scaleY(1)`, offset: .5 },
        { opacity: 0,   transform: `rotate(${angle}deg) translateY(${dist}px) scaleY(.8)` }
      ], { duration: dur + Math.random()*120, easing: 'cubic-bezier(.2,.7,.2,1)' });

      setTimeout(() => r.remove(), dur + 200);
    }
  }

  document.addEventListener('click', (e) => {
    spark(e.clientX, e.clientY);
  }, true);
})();
