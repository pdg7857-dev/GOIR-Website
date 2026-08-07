/* <intel-globe> — orthographic intelligence globe: real Natural Earth land,
   great-circle tracks, moving air/sea assets that act as section navigation.
   Requires window.d3 + window.topojson (loaded from the page's <helmet>). */
(function () {
  const ACCENT = '#9184d9';
  const ACCENT_HI = '#d2cefd';
  const TEXT = '#e9e9ed';

  const TRACKS = [
    { code: 'SIG-01', label: 'The signal problem', kind: 'air', target: '#service',
      from: [-75.70, 45.41], to: [-77.04, 38.91], speed: 0.055, t0: 0.10, lab: [22, -26] },
    { code: 'OPS-02', label: 'How it works', kind: 'sea', target: '#process',
      from: [-63.57, 44.65], to: [-71.06, 42.36], speed: 0.030, t0: 0.55, lab: [22, 22] },
    { code: 'CVG-03', label: 'Coverage & pricing', kind: 'air', target: '#pricing',
      from: [-123.12, 49.28], to: [-79.38, 43.65], speed: 0.042, t0: 0.30, lab: [-118, -30] },
    { code: 'REC-04', label: 'Track record', kind: 'sea', target: '#about',
      from: [-122.33, 47.61], to: [-117.16, 32.72], speed: 0.034, t0: 0.75, lab: [-120, 8] },
    { code: 'REQ-05', label: 'Request intel', kind: 'air', target: '#contact',
      from: [-87.63, 41.88], to: [-96.80, 32.78], speed: 0.048, t0: 0.62, lab: [26, 26] }
  ];

  const STATIONS = [
    [-75.70, 45.41], [-77.04, 38.91], [-79.38, 43.65], [-73.57, 45.50],
    [-113.49, 53.55], [-123.12, 49.28], [-97.14, 49.90], [-63.57, 44.65],
    [-121.49, 38.58], [-97.74, 30.27], [-84.39, 33.75], [-104.99, 39.74],
    [-71.06, 42.36], [-90.07, 29.95], [-106.65, 52.13]
  ];

  class IntelGlobe extends HTMLElement {
    connectedCallback() {
      if (this._built) { this._ro.observe(this); this._resize(); this._start(); return; }
      this._built = true;
      this.style.display = 'block';
      this.style.position = 'relative';
      this.style.width = '100%';
      this.style.height = '100%';

      this.canvas = document.createElement('canvas');
      Object.assign(this.canvas.style, { display: 'block', width: '100%', height: '100%', cursor: 'default' });
      this.appendChild(this.canvas);
      this.ctx = this.canvas.getContext('2d');

      this.baseRotation = 98;
      this.rotation = 98;
      this.tilt = -34;
      this.hover = -1;
      this.dash = 0;
      this.time = 0;
      this.positions = [];
      this.land = null;

      this.canvas.addEventListener('mousemove', (e) => this._onMove(e));
      this.canvas.addEventListener('mouseleave', () => { this.hover = -1; this.canvas.style.cursor = 'default'; });
      this.canvas.addEventListener('click', () => this._onClick());
      this._ro = new ResizeObserver(() => this._resize());
      this._ro.observe(this);

      this._resize();
      this._waitForLibs().then(() => this._loadLand());
      this._start();
    }

    _start() {
      cancelAnimationFrame(this._frame);
      if (!this._vis) {
        this._vis = () => { if (document.visibilityState === 'visible' && this.isConnected) this._start(); };
        document.addEventListener('visibilitychange', this._vis);
      }
      try { this._draw(); } catch (e) {}
      this._frame = requestAnimationFrame(() => this._tick());
    }

    disconnectedCallback() { cancelAnimationFrame(this._frame); }

    _waitForLibs() {
      return new Promise((res) => {
        const check = () => (window.d3 && window.topojson) ? res() : setTimeout(check, 60);
        check();
      });
    }

    async _loadLand() {
      this.projection = d3.geoOrthographic().clipAngle(90);
      this.graticule = d3.geoGraticule10();
      this._sizeProjection();
      try {
        const topo = window.PD_TOPO
          || await fetch('/intel/countries-110m.json').then(r => r.json());
        window.PD_TOPO = topo;
        this.land = topojson.feature(topo, topo.objects.countries);
        this.borders = topojson.mesh(topo, topo.objects.countries, (a, b) => a !== b);
        this._draw();
      } catch (e) { this.land = null; }
    }

    _resize() {
      const r = this.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.w = Math.max(1, r.width); this.h = Math.max(1, r.height);
      this.canvas.width = this.w * dpr; this.canvas.height = this.h * dpr;
      this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      this._sizeProjection();
    }

    _sizeProjection() {
      if (!this.projection) return;
      this.radius = Math.min(this.w, this.h) * 0.46;
      this.cx = this.w / 2; this.cy = this.h / 2;
      this.projection.scale(this.radius).translate([this.cx, this.cy]);
    }

    _onMove(e) {
      const r = this.canvas.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      let hit = -1;
      this.positions.forEach((p, i) => {
        if (!p) return;
        if (Math.hypot(p.x - x, p.y - y) < 22) hit = i;
      });
      this.hover = hit;
      this.canvas.style.cursor = hit >= 0 ? 'pointer' : 'default';
    }

    _onClick() {
      if (this.hover < 0) return;
      const target = TRACKS[this.hover].target;
      const el = document.querySelector(target);
      if (el) {
        const top = el.getBoundingClientRect().top + (window.pageYOffset || 0) - 72;
        window.scrollTo({ top, behavior: 'smooth' });
      }
      this.dispatchEvent(new CustomEvent('assetselect', { detail: { target }, bubbles: true }));
    }

    _tick() {
      this.time += 1 / 60;
      this.swayRate = this.hover >= 0 ? 0.25 : 1;
      this.sway = (this.sway || 0) + (1 / 60) * this.swayRate;
      this.rotation = this.baseRotation + Math.sin(this.sway * 0.10) * 26;
      this.tilt = -34 + Math.sin(this.sway * 0.07) * 5;
      this.dash -= 0.6;
      this._draw();
      this._frame = requestAnimationFrame(() => this._tick());
    }

    _draw() {
      const ctx = this.ctx;
      ctx.clearRect(0, 0, this.w, this.h);
      if (!this.projection) return;
      this.projection.rotate([this.rotation, this.tilt]);
      const path = d3.geoPath(this.projection, ctx);
      const R = this.radius, cx = this.cx, cy = this.cy;

      // atmosphere
      const halo = ctx.createRadialGradient(cx, cy, R * 0.82, cx, cy, R * 1.22);
      halo.addColorStop(0, 'rgba(145,132,217,0.20)');
      halo.addColorStop(1, 'rgba(145,132,217,0)');
      ctx.fillStyle = halo;
      ctx.beginPath(); ctx.arc(cx, cy, R * 1.22, 0, Math.PI * 2); ctx.fill();

      // ocean
      const ocean = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.4, R * 0.1, cx, cy, R);
      ocean.addColorStop(0, '#22243a');
      ocean.addColorStop(0.65, '#191b2b');
      ocean.addColorStop(1, '#101120');
      ctx.fillStyle = ocean;
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();

      // graticule
      ctx.save();
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.clip();
      if (this.graticule) {
        ctx.beginPath(); path(this.graticule);
        ctx.strokeStyle = 'rgba(233,233,237,0.075)'; ctx.lineWidth = 1; ctx.stroke();
      }
      if (this.land) {
        ctx.beginPath(); path(this.land);
        ctx.fillStyle = 'rgba(145,132,217,0.22)'; ctx.fill();
        ctx.strokeStyle = 'rgba(145,132,217,0.55)'; ctx.lineWidth = 0.9; ctx.stroke();
        ctx.beginPath(); path(this.borders);
        ctx.strokeStyle = 'rgba(233,233,237,0.12)'; ctx.lineWidth = 0.6; ctx.stroke();
      }
      ctx.restore();

      // terminator sheen + rim
      const sheen = ctx.createLinearGradient(cx - R, cy - R, cx + R, cy + R);
      sheen.addColorStop(0, 'rgba(233,233,237,0.06)');
      sheen.addColorStop(0.5, 'rgba(0,0,0,0)');
      sheen.addColorStop(1, 'rgba(0,0,0,0.35)');
      ctx.fillStyle = sheen;
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(145,132,217,0.5)'; ctx.lineWidth = 1; ctx.stroke();

      const center = [-this.rotation, -this.tilt];
      const visible = (pt) => d3.geoDistance(pt, center) < Math.PI / 2 - 0.02;

      // stations
      STATIONS.forEach((s, i) => {
        if (!visible(s)) return;
        const p = this.projection(s); if (!p) return;
        const pulse = (this.time * 0.5 + i * 0.17) % 1;
        ctx.beginPath(); ctx.arc(p[0], p[1], 1.6 + pulse * 9, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(145,132,217,${0.32 * (1 - pulse)})`; ctx.lineWidth = 1; ctx.stroke();
        ctx.beginPath(); ctx.arc(p[0], p[1], 1.7, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(210,206,253,0.85)'; ctx.fill();
      });

      // tracks + assets
      this.positions = [];
      TRACKS.forEach((tr, i) => {
        const interp = d3.geoInterpolate(tr.from, tr.to);
        ctx.save();
        ctx.beginPath();
        path({ type: 'LineString', coordinates: d3.range(0, 1.001, 1 / 48).map(interp) });
        ctx.setLineDash([5, 7]); ctx.lineDashOffset = this.dash;
        ctx.strokeStyle = this.hover === i ? 'rgba(210,206,253,0.85)' : 'rgba(145,132,217,0.42)';
        ctx.lineWidth = this.hover === i ? 1.5 : 1;
        ctx.stroke();
        ctx.restore();

        const t = (tr.t0 + this.time * tr.speed) % 1;
        const pos = interp(t);
        const ahead = interp(Math.min(1, t + 0.02));
        if (!visible(pos)) { this.positions.push(null); return; }
        const p = this.projection(pos), pa = this.projection(ahead);
        if (!p) { this.positions.push(null); return; }
        this.positions.push({ x: p[0], y: p[1] });
        const angle = pa ? Math.atan2(pa[1] - p[1], pa[0] - p[0]) : 0;
        this._drawAsset(ctx, p[0], p[1], angle, tr, this.hover === i);
      });
    }

    _drawAsset(ctx, x, y, angle, tr, active) {
      const c = active ? ACCENT_HI : ACCENT;
      ctx.save();
      ctx.translate(x, y);
      if (active) {
        ctx.beginPath(); ctx.arc(0, 0, 15, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(210,206,253,0.55)'; ctx.lineWidth = 1; ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(-19, 0); ctx.lineTo(-11, 0); ctx.moveTo(19, 0); ctx.lineTo(11, 0);
        ctx.moveTo(0, -19); ctx.lineTo(0, -11); ctx.moveTo(0, 19); ctx.lineTo(0, 11);
        ctx.strokeStyle = 'rgba(210,206,253,0.7)'; ctx.stroke();
      }
      ctx.save();
      ctx.rotate(angle);
      ctx.fillStyle = c;
      ctx.shadowColor = 'rgba(145,132,217,0.9)';
      ctx.shadowBlur = active ? 14 : 7;
      if (tr.kind === 'air') {
        ctx.beginPath();
        ctx.moveTo(7, 0); ctx.lineTo(-3, 1.4); ctx.lineTo(-4.4, 5.2); ctx.lineTo(-6, 5.2);
        ctx.lineTo(-5, 1.6); ctx.lineTo(-6.6, 1.6); ctx.lineTo(-6.6, -1.6); ctx.lineTo(-5, -1.6);
        ctx.lineTo(-6, -5.2); ctx.lineTo(-4.4, -5.2); ctx.lineTo(-3, -1.4);
        ctx.closePath(); ctx.fill();
      } else {
        ctx.beginPath();
        ctx.moveTo(7, 0); ctx.lineTo(0.5, 3); ctx.lineTo(-6.5, 2.6); ctx.lineTo(-6.5, -2.6);
        ctx.lineTo(0.5, -3); ctx.closePath(); ctx.fill();
        ctx.fillRect(-3, -5.4, 3.4, 2.6);
      }
      ctx.restore();

      ctx.shadowBlur = 0;
      const off = tr.lab || [20, -8];
      const runLen = active ? 140 : 54;
      // pick the label side from the glyph's screen position, then clamp the
      // whole run inside the canvas so nothing is amputated at any width
      let rightward = x < this.w * 0.58;
      if (rightward && x + 24 + runLen > this.w - 8) rightward = false;
      if (!rightward && x - 24 - runLen < 8) rightward = true;
      let lx = rightward ? Math.abs(off[0]) : -Math.abs(off[0]);
      let ly = off[1];
      if (rightward) lx = Math.min(lx, this.w - 8 - runLen - x);
      else lx = Math.max(lx, 8 + runLen - x);
      if (rightward) lx = Math.max(lx, 14); else lx = Math.min(lx, -14);
      ly = Math.min(Math.max(ly, 20 - y), this.h - 24 - y);
      const runEnd = rightward ? lx + runLen : lx - runLen;
      ctx.beginPath();
      ctx.moveTo(rightward ? 10 : -10, ly > 0 ? 5 : -5); ctx.lineTo(lx + (rightward ? -4 : 4), ly); ctx.lineTo(runEnd, ly);
      ctx.strokeStyle = active ? 'rgba(210,206,253,0.75)' : 'rgba(145,132,217,0.35)';
      ctx.lineWidth = 1; ctx.stroke();
      ctx.font = '500 10px Inter, system-ui, sans-serif';
      ctx.letterSpacing = '0.14em';
      ctx.fillStyle = active ? ACCENT_HI : 'rgba(145,132,217,0.8)';
      ctx.textAlign = rightward ? 'left' : 'right';
      ctx.fillText(tr.code, lx, ly - 5);
      if (active) {
        ctx.font = '500 13px Inter, system-ui, sans-serif';
        ctx.letterSpacing = '0em';
        ctx.fillStyle = TEXT;
        ctx.fillText(tr.label.toUpperCase(), lx, ly + 16);
        ctx.font = '400 10px Inter, system-ui, sans-serif';
        ctx.letterSpacing = '0.1em';
        ctx.fillStyle = 'rgba(233,233,237,0.45)';
        ctx.fillText('CLICK TO OPEN', lx, ly + 31);
      }
      ctx.restore();
    }
  }

  if (!customElements.get('intel-globe')) customElements.define('intel-globe', IntelGlobe);
})();
