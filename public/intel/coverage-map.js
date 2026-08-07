/* <coverage-map> — North America coverage board: real Natural Earth geometry in
   an Albers projection, one node per monitored jurisdiction sized by platform
   count, hover for its platform list. Requires window.d3 + window.topojson. */
(function () {
  const ACCENT_HI = '#d2cefd';

  const JURISDICTIONS = [
    { id: 'ca-fed', name: 'Canada — Federal', kind: 'Federal', coord: [-75.70, 45.41], platforms: ['CanadaBuys', 'MERX', 'Bonfire'], buyers: 190, note: 'Federal departments, agencies and Crown corporations.' },
    { id: 'on', name: 'Ontario', kind: 'Province', coord: [-79.38, 43.65], platforms: ['MERX', 'Biddingo', 'bids&tenders', 'Ontario Tenders Portal'], buyers: 640, note: 'Densest MASH market on the continent — school boards, hospitals, 444 municipalities.' },
    { id: 'qc', name: 'Québec', kind: 'Province', coord: [-71.21, 46.81], platforms: ['SEAO', 'MERX', 'Bonfire'], buyers: 410, note: 'SEAO is mandatory for public bodies; French-language documents throughout.' },
    { id: 'bc', name: 'British Columbia', kind: 'Province', coord: [-123.37, 48.43], platforms: ['BC Bid', 'MERX', 'Bonfire'], buyers: 280, note: 'BC Bid plus a long tail of regional districts posting on their own portals.' },
    { id: 'ab', name: 'Alberta', kind: 'Province', coord: [-113.49, 53.55], platforms: ['Alberta Purchasing Connection', 'bids&tenders', 'MERX'], buyers: 250, note: 'APC carries provincial and municipal work; heavy civil and facilities volume.' },
    { id: 'mb', name: 'Manitoba', kind: 'Province', coord: [-97.14, 49.90], platforms: ['MERX', 'Bonfire'], buyers: 95, note: 'Provincial tenders plus City of Winnipeg on its own system.' },
    { id: 'sk', name: 'Saskatchewan', kind: 'Province', coord: [-106.65, 52.13], platforms: ['SaskTenders', 'MERX'], buyers: 88, note: 'SaskTenders aggregates provincial, health and education buyers.' },
    { id: 'ns', name: 'Nova Scotia', kind: 'Province', coord: [-63.57, 44.65], platforms: ['NS Tenders', 'MERX'], buyers: 70, note: 'Provincial procurement plus Halifax Regional Municipality.' },
    { id: 'nb', name: 'New Brunswick', kind: 'Province', coord: [-66.63, 45.96], platforms: ['NBON', 'MERX'], buyers: 62, note: 'NBON posts provincial, health and municipal opportunities.' },
    { id: 'us-fed', name: 'United States — Federal', kind: 'Federal', coord: [-77.04, 38.91], platforms: ['SAM.gov', 'GSA eBuy', 'DIBBS'], buyers: 220, note: 'SAM.gov is the front door; set-asides and IDIQ vehicles matter more than keywords.' },
    { id: 'ca-st', name: 'California', kind: 'State', coord: [-121.49, 38.58], platforms: ['Cal eProcure', 'BidNet Direct', 'Bonfire'], buyers: 480, note: 'State plus 58 counties and 480+ cities, most on their own systems.' },
    { id: 'tx', name: 'Texas', kind: 'State', coord: [-97.74, 30.27], platforms: ['ESBD', 'BidNet Direct'], buyers: 390, note: 'ESBD for state agencies; large independent school district volume.' },
    { id: 'ny', name: 'New York', kind: 'State', coord: [-73.76, 42.65], platforms: ['NYS Contract Reporter', 'BidNet Direct'], buyers: 350, note: 'Contract Reporter plus authorities that post nowhere else.' },
    { id: 'il', name: 'Illinois', kind: 'State', coord: [-89.65, 39.80], platforms: ['BidBuy', 'BidNet Direct'], buyers: 240, note: 'BidBuy for state; Chicago and Cook County run separate portals.' },
    { id: 'ga', name: 'Georgia', kind: 'State', coord: [-84.39, 33.75], platforms: ['Georgia Procurement Registry', 'BidNet Direct'], buyers: 210, note: 'GPR plus a heavy university-system buyer base.' },
    { id: 'wa', name: 'Washington', kind: 'State', coord: [-122.90, 47.04], platforms: ['WEBS', 'BidNet Direct'], buyers: 180, note: 'WEBS registration drives notification; ports and transit buy separately.' },
    { id: 'co', name: 'Colorado', kind: 'State', coord: [-104.99, 39.74], platforms: ['Colorado BIDS', 'Rocky Mountain e-Purchasing'], buyers: 165, note: 'RMEPS carries most Front Range municipal work.' },
    { id: 'fl', name: 'Florida', kind: 'State', coord: [-84.28, 30.44], platforms: ['MyFloridaMarketPlace', 'DemandStar'], buyers: 300, note: 'State marketplace plus 67 counties on mixed systems.' },
    { id: 'ma', name: 'Massachusetts', kind: 'State', coord: [-71.06, 42.36], platforms: ['COMMBUYS', 'BidNet Direct'], buyers: 190, note: 'COMMBUYS covers state and many municipal buyers.' },
    { id: 'mi', name: 'Michigan', kind: 'State', coord: [-84.55, 42.73], platforms: ['SIGMA VSS', 'BidNet Direct'], buyers: 175, note: 'SIGMA for state; counties and districts post independently.' }
  ];


  class CoverageMap extends HTMLElement {
    connectedCallback() {
      if (this._built) { this._ro.observe(this); this._resize(); this._start(); return; }
      this._built = true;
      Object.assign(this.style, { display: 'block', position: 'relative', width: '100%', height: '100%' });
      this.canvas = document.createElement('canvas');
      Object.assign(this.canvas.style, { display: 'block', width: '100%', height: '100%' });
      this.appendChild(this.canvas);
      this.ctx = this.canvas.getContext('2d');
      this.hover = -1;
      this.time = 0;
      this.nodes = [];
      this.canvas.addEventListener('mousemove', (e) => this._move(e));
      this.canvas.addEventListener('mouseleave', () => { this.hover = -1; });
      this._ro = new ResizeObserver(() => this._resize());
      this._ro.observe(this);
      this._resize();
      this._boot();
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

    async _boot() {
      await new Promise((res) => {
        const check = () => (window.d3 && window.topojson) ? res() : setTimeout(check, 60);
        check();
      });
      this.jur = window.PD_JURISDICTIONS || JURISDICTIONS;
      let topo = window.PD_TOPO;
      if (!topo) {
        try {
          topo = await fetch('/intel/countries-110m.json').then(r => r.json());
          window.PD_TOPO = topo;
        } catch (e) { return; }
      }
      const all = topojson.feature(topo, topo.objects.countries);
      const wanted = ['Canada', 'United States of America', 'Mexico', 'Greenland'];
      this.focus = { type: 'FeatureCollection', features: all.features.filter(f => ['Canada', 'United States of America'].includes(f.properties.name)) };
      this.context = { type: 'FeatureCollection', features: all.features.filter(f => wanted.includes(f.properties.name)) };
      this.borders = topojson.mesh(topo, topo.objects.countries, (a, b) => a !== b);
      this.projection = d3.geoAlbers().rotate([98, 0]).center([0, 38]).parallels([29.5, 55.5]);
      this._fit();
      this._draw();
    }

    _fit() {
      if (!this.projection || !this.context) return;
      this.projection.fitExtent([[24, 26], [this.w - 24, this.h - 26]], this.context);
    }

    _resize() {
      const r = this.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.w = Math.max(1, r.width); this.h = Math.max(1, r.height);
      this.canvas.width = this.w * dpr; this.canvas.height = this.h * dpr;
      this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      this._fit();
    }

    _move(e) {
      const r = this.canvas.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      let hit = -1;
      this.nodes.forEach((n, i) => { if (Math.hypot(n.x - x, n.y - y) < 16) hit = i; });
      this.hover = hit;
      this.canvas.style.cursor = hit >= 0 ? 'pointer' : 'default';
    }

    _tick() {
      this.time += 1 / 60;
      this._draw();
      this._frame = requestAnimationFrame(() => this._tick());
    }

    _draw() {
      const ctx = this.ctx;
      ctx.clearRect(0, 0, this.w, this.h);
      if (!this.projection || !this.context) return;
      const path = d3.geoPath(this.projection, ctx);

      ctx.beginPath(); path(this.context);
      ctx.fillStyle = 'rgba(233,233,237,0.045)'; ctx.fill();
      ctx.beginPath(); path(this.focus);
      ctx.fillStyle = 'rgba(145,132,217,0.13)'; ctx.fill();
      ctx.strokeStyle = 'rgba(145,132,217,0.5)'; ctx.lineWidth = 1; ctx.stroke();
      ctx.beginPath(); path(this.borders);
      ctx.strokeStyle = 'rgba(233,233,237,0.1)'; ctx.lineWidth = 0.6; ctx.stroke();

      this.nodes = [];
      this.jur.forEach((j, i) => {
        const p = this.projection(j.coord);
        if (!p) return;
        this.nodes.push({ x: p[0], y: p[1], j });
        const idx = this.nodes.length - 1;
        const active = this.hover === idx;
        const rad = 3.4 + j.platforms.length * 1.5;
        const pulse = (this.time * 0.42 + i * 0.11) % 1;
        ctx.beginPath(); ctx.arc(p[0], p[1], rad + pulse * 12, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(145,132,217,${0.26 * (1 - pulse)})`; ctx.lineWidth = 1; ctx.stroke();
        ctx.beginPath(); ctx.arc(p[0], p[1], rad, 0, Math.PI * 2);
        ctx.fillStyle = active ? 'rgba(210,206,253,0.9)' : 'rgba(145,132,217,0.45)'; ctx.fill();
        ctx.strokeStyle = active ? ACCENT_HI : 'rgba(210,206,253,0.6)';
        ctx.lineWidth = active ? 1.6 : 1; ctx.stroke();
      });

      if (this.hover >= 0) this._tooltip(ctx, this.nodes[this.hover]);
      else {
        ctx.font = '400 9px Inter, system-ui, sans-serif';
        ctx.letterSpacing = '0.18em';
        ctx.fillStyle = 'rgba(233,233,237,0.3)';
        ctx.fillText('NODE SIZE = PLATFORMS MONITORED · HOVER FOR DETAIL', 14, this.h - 12);
      }
    }

    _tooltip(ctx, n) {
      const j = n.j;
      const lines = [j.platforms.join(' · '), '≈' + j.buyers + ' public buyers', j.note];
      ctx.font = '500 13px Inter, system-ui, sans-serif';
      const wName = ctx.measureText(j.name).width;
      ctx.font = '400 11px Inter, system-ui, sans-serif';
      const boxW = Math.min(320, Math.max(wName + 28, 230));
      const wrapped = [];
      lines.forEach((l, li) => {
        const words = l.split(' ');
        let cur = '';
        words.forEach((w) => {
          const test = cur ? cur + ' ' + w : w;
          if (ctx.measureText(test).width > boxW - 24) { wrapped.push({ t: cur, li }); cur = w; }
          else cur = test;
        });
        wrapped.push({ t: cur, li });
      });
      const boxH = 34 + wrapped.length * 15 + 10;
      let bx = n.x + 16, by = n.y - boxH / 2;
      if (bx + boxW > this.w - 8) bx = n.x - 16 - boxW;
      by = Math.min(Math.max(by, 8), this.h - boxH - 8);

      ctx.fillStyle = 'rgba(16,17,32,0.94)';
      ctx.strokeStyle = 'rgba(145,132,217,0.6)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(bx, by, boxW, boxH, 4); else ctx.rect(bx, by, boxW, boxH);
      ctx.fill(); ctx.stroke();

      ctx.beginPath(); ctx.moveTo(n.x, n.y); ctx.lineTo(bx < n.x ? bx + boxW : bx, n.y);
      ctx.strokeStyle = 'rgba(210,206,253,0.5)'; ctx.stroke();

      ctx.font = '400 9px Inter, system-ui, sans-serif';
      ctx.letterSpacing = '0.18em';
      ctx.fillStyle = 'rgba(145,132,217,0.9)';
      ctx.fillText(j.kind.toUpperCase(), bx + 12, by + 18);
      ctx.font = '500 14px Inter, system-ui, sans-serif';
      ctx.letterSpacing = '0em';
      ctx.fillStyle = '#e9e9ed';
      ctx.fillText(j.name, bx + 12, by + 36);
      wrapped.forEach((wl, i) => {
        ctx.font = wl.li === 0 ? '500 11px Inter, system-ui, sans-serif' : '400 11px Inter, system-ui, sans-serif';
        ctx.fillStyle = wl.li === 0 ? ACCENT_HI : 'rgba(233,233,237,0.6)';
        ctx.fillText(wl.t, bx + 12, by + 54 + i * 15);
      });
    }
  }

  if (!customElements.get('coverage-map')) customElements.define('coverage-map', CoverageMap);
})();
