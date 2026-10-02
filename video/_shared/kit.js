// Shared animation kit for the phildave.com videos. Seek-safe GSAP only.
// A composition calls K.init() (reads <script id="timing">), builds each scene with
// K.scene("sN") and the helpers below (times are local to the scene), then registers window.__timelines["main"] = K.done().
(function () {
  const CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
  const CROSS = '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round"><path d="M6.5 6.5l11 11M17.5 6.5l-11 11"/></svg>';
  let root, tl, T;
  const K = (window.K = {});
  K.$ = (s, r = document) => r.querySelector(s);
  K.$$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  let seed = 7;
  K.rnd = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;

  K.init = () => {
    T = JSON.parse(document.getElementById("timing").textContent);
    root = gsap.timeline({ paused: true });
    tl = root;
    K.$$(".tk").forEach((t) => (t.innerHTML = CHECK));
    K.$$(".xk").forEach((t) => (t.innerHTML = CROSS));
    const half = T.total / 2;
    root.fromTo("#bg .b1", { x: 0, y: 0 }, { x: 260, y: 160, duration: half, ease: "sine.inOut", yoyo: true, repeat: 1 }, 0);
    root.fromTo("#bg .b2", { x: 0, y: 0 }, { x: -240, y: -120, duration: half, ease: "sine.inOut", yoyo: true, repeat: 1 }, 0);
    return T;
  };
  K.scene = (name) => {
    tl = gsap.timeline();
    root.add(tl, T.scenes[name].start);
    return T.scenes[name];
  };
  K.tl = () => tl;
  K.done = () => root; // the page registers it: window.__timelines["main"] = K.done();

  K.set = (t, sel, vars) => tl.set(sel, vars, t);
  K.hide = (sel) => tl.set(sel, { opacity: 0 }, 0);
  K.rise = (t, sel, o = {}) =>
    tl.fromTo(sel, { opacity: 0, y: o.y ?? 40, filter: "blur(10px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: o.d ?? 0.7, ease: "power3.out", stagger: o.s ?? 0, immediateRender: o.ir ?? true }, t);
  K.pop = (t, sel, o = {}) =>
    tl.fromTo(sel, { opacity: 0, scale: o.from ?? 0.6 },
      { opacity: 1, scale: 1, duration: o.d ?? 0.5, ease: `back.out(${o.b ?? 1.8})`, stagger: o.s ?? 0, immediateRender: o.ir ?? true }, t);
  K.slideIn = (t, sel, o = {}) =>
    tl.fromTo(sel, { opacity: 0, x: o.x ?? 120 }, { opacity: 1, x: 0, duration: o.d ?? 0.7, ease: "power3.out", stagger: o.s ?? 0, immediateRender: o.ir ?? true }, t);
  K.out = (t, sel, d = 0.4) => tl.to(sel, { opacity: 0, duration: d, ease: "power2.in" }, t);
  K.label = (t, scope) => {
    tl.fromTo(`${scope} .label .rule`, { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: "power3.out" }, t);
    tl.fromTo(`${scope} .label`, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" }, t);
  };
  K.tick = (t, sel) => tl.fromTo(sel, { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(2.4)", immediateRender: false }, t);
  K.stamp = (t, sel, rot = -8) => {
    tl.fromTo(sel, { opacity: 0, scale: 2.4, rotation: rot - 8 }, { opacity: 1, scale: 1, rotation: rot, duration: 0.28, ease: "power4.out", immediateRender: false }, t);
  };
  K.shake = (t, sel) => tl.fromTo(sel, { x: 0 }, { x: 10, duration: 0.05, yoyo: true, repeat: 3, ease: "none", immediateRender: false }, t);
  K.serifIn = (t, sel, d = 1.0) =>
    tl.fromTo(sel, { opacity: 0, y: 30, scale: 0.94, filter: "blur(12px)" }, { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: d, ease: "power3.out" }, t);
  K.draw = (t, sel, d = 0.8) => tl.fromTo(sel, { scaleX: 0 }, { scaleX: 1, duration: d, ease: "power3.inOut" }, t);
  K.count = (t, el, from, to, d, fmt = (v) => Math.round(v).toLocaleString("en-US")) => {
    if (typeof el === "string") el = K.$(el);
    const st = { v: from };
    tl.fromTo(st, { v: from }, { v: to, duration: d, ease: "power2.out", immediateRender: false, onUpdate: () => (el.textContent = fmt(st.v)) }, t);
  };
  K.slam = (t, sel) => tl.fromTo(sel, { opacity: 0, scale: 1.6, y: 30 }, { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: "power4.out", immediateRender: false }, t);
})();
