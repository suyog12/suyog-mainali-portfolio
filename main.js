/* main.js — Suyog Mainali Portfolio */
'use strict';

/* ============================================================
   CONSTANTS & DATA
   ============================================================ */
const MONTHS = ['Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar'];
const BLUE = '#00d2ff', GREEN = '#00e676', AMBER = '#ffb300', PURPLE = '#7c4dff', TEAL = '#1D9E75';

const CHART_DATA = {
  throughput: {
    labels: MONTHS,
    datasets: [
      { label: 'TB processed/day', data: [7.2,7.8,8.1,9.0,9.4,9.8,10.1,10.3],
        borderColor: BLUE, backgroundColor: BLUE+'22', tension: 0.4, fill: true, pointRadius: 3, pointBackgroundColor: BLUE },
      { label: 'pipeline jobs', data: [180,195,205,220,228,235,242,250],
        borderColor: GREEN, backgroundColor: 'transparent', tension: 0.4, pointRadius: 3, pointBackgroundColor: GREEN, yAxisID: 'y2' }
    ]
  },
  latency: {
    labels: MONTHS,
    datasets: [
      { label: 'avg latency (ms)', data: [220,195,180,170,158,145,135,125],
        borderColor: TEAL, backgroundColor: TEAL+'22', tension: 0.4, fill: true, pointRadius: 3, pointBackgroundColor: TEAL },
      { label: 'p99 latency (ms)', data: [450,390,340,310,280,250,220,195],
        borderColor: AMBER, backgroundColor: 'transparent', tension: 0.4, borderDash: [4,3], pointRadius: 3, pointBackgroundColor: AMBER }
    ]
  },
  failures: {
    labels: MONTHS,
    datasets: [
      { label: 'pipeline failures', data: [28,22,17,13,10,8,6,5],
        borderColor: AMBER, backgroundColor: AMBER+'22', tension: 0.4, fill: true, pointRadius: 3, pointBackgroundColor: AMBER },
      { label: 'SLA breaches', data: [4,3,2,2,1,1,0,0],
        borderColor: '#ff5252', backgroundColor: 'transparent', tension: 0.4, borderDash: [4,3], pointRadius: 3, pointBackgroundColor: '#ff5252' }
    ]
  }
};

const PROJECTS = [
  {
    id: 'ffiec',
    name: 'FFIEC Call Report Analytics Dashboard',
    status: 'production', statusClass: 'ps-prod',
    category: 'data-eng',
    thumb: 'images/etl.jpg',
    url: 'https://ffiec-frontend.vercel.app',
    gh: 'https://github.com/suyog12/ffiec-call-report-builder',
    featured: true,
    desc: 'End-to-end data platform ingesting FFIEC regulatory filings. PySpark batch pipeline writes Parquet to Cloudflare R2. DuckDB queries via httpfs in under 200ms vs 8–15s live API baseline. FastAPI backend, React/Vite frontend with UBPR formula builder, multi-bank comparison, and LangChain/LangGraph + Gemini multi-agent AI for natural-language bank analysis.',
    arch: [['FFIEC API','pn-a'],['PySpark','pn-b'],['Parquet','pn-b'],['Cloudflare R2','pn-g'],['DuckDB','pn-b'],['FastAPI','pn-b'],['React','pn-g'],['LangGraph','pn-p'],['Gemini','pn-p']],
    tags: ['Python','PySpark','DuckDB','Cloudflare R2','FastAPI','React/Vite','LangChain','LangGraph','Gemini','Vercel','Render'],
    how: 'PySpark reads FFIEC SDF quarterly files, normalizes schemas, writes partitioned Parquet to R2. DuckDB httpfs extension queries R2 directly — no download, zero egress fees. FastAPI wraps DuckDB with in-process column caching to avoid redundant 32MB Parquet scans. LangGraph orchestrates 3 agents: a router, a DuckDB query agent, and a synthesis agent. Context (selected banks + quarter) is auto-prepended to every AI query. Render free tier kept alive via UptimeRobot.'
  },
  {
    id: 'dollar100',
    name: '$100 Question — Stock Dashboard',
    status: 'deployed', statusClass: 'ps-dep',
    category: 'analytics',
    thumb: 'images/100-question-thumb.png',
    url: 'https://final-group-project-dash-app-team-9.onrender.com',
    gh: 'https://github.com/suyog12/Final-Group-Project---Dash-App-Team-9',
    featured: false,
    desc: 'Multi-page Plotly Dash app answering: "If I invested $100 then, what is it worth today?" Uses Alpha Vantage API for historical data. Features Werkzeug-hashed auth, normalized $100 chart with log scale, interactive candlestick view with 20/50-day MAs, and rolling volatility analysis.',
    arch: [['Alpha Vantage API','pn-a'],['Python','pn-b'],['Plotly Dash','pn-b'],['SQLite Auth','pn-x'],['Render','pn-g']],
    tags: ['Python','Plotly Dash','Alpha Vantage API','SQLite','Werkzeug','Render'],
    how: 'Multi-page Dash app: pages/hundred.py normalizes tickers to $100 on first available date using pct_change().add(1).cumprod()*100. Candlestick page uses go.Candlestick + go.Scatter for MAs. Volatility uses rolling(window).std()*sqrt(252)*100. Auth via Werkzeug check_password_hash. CSV cache fallback when API rate-limited (free tier: 25 req/day). Deployed via render.yaml with a Procfile gunicorn command.'
  },
  {
    id: 'nvda',
    name: 'NVDA Volatility Analyzer',
    status: 'complete', statusClass: 'ps-done',
    category: 'analytics',
    thumb: null,
    url: null,
    gh: 'https://github.com/zzitsluke/Team-9-Yahoo',
    featured: false,
    desc: 'Dash app with dual y-axis chart: NVIDIA stock price vs 30-day rolling volatility over 3 years. Features ThemeChangerAIO for live dark/light switching, Bootstrap info sidebar, and hover date detail. Team project with Vanessa Broadrup, Luke Kovats, Bryce Marin.',
    arch: [['yfinance 3yr','pn-a'],['Pandas rolling','pn-x'],['Plotly go','pn-b'],['Dash Bootstrap','pn-b'],['ThemeChangerAIO','pn-p']],
    tags: ['Python','Dash','yfinance','Plotly','dash-bootstrap-components','ThemeChangerAIO'],
    how: 'yf.Ticker("NVDA").history(period="3y") fetches OHLCV. Pandas pct_change() → rolling(30).std()*100 computes 30-day annualized vol. go.Figure: trace 1 = Price on y (left), trace 2 = Volatility on y2 (overlaying="y", side="right"). ThemeChangerAIO callback fires on radio value change and rebuilds figure with template_from_url(theme). Bootstrap Col layout: sticky sidebar (analysis cards) + graph column (width=8).'
  },
  {
    id: 'fred',
    name: 'FRED Macro Dashboard',
    status: 'complete', statusClass: 'ps-done',
    category: 'analytics',
    thumb: 'images/mini_finance_dashboard.png',
    url: null,
    gh: 'https://github.com/suyog12/CBTA-Fred-Dashboard-Team-9',
    featured: false,
    desc: 'Single-API Plotly Dash app visualizing Inflation (YoY %) vs Federal Funds Rate (3-month moving average) using the FRED API. Built for CTBA coursework. Python + CSS assets, env-based API key.',
    arch: [['FRED API','pn-a'],['fredapi','pn-b'],['Pandas','pn-x'],['Plotly Dash','pn-b']],
    tags: ['Python','Plotly Dash','FRED API','pandas','python-dotenv','CSS'],
    how: 'fredapi.Fred() fetches CPIAUCSL (CPI) and FEDFUNDS series. CPI → YoY % change via .pct_change(12)*100. Fed funds rate smoothed with rolling(3).mean(). Dual-series Plotly figure with date range selectors. API key loaded via python-dotenv from .env. Custom CSS in assets/ directory for theming and branding.'
  },
  {
    id: 'siftline',
    name: 'Siftline — Document QA',
    status: 'deployed', statusClass: 'ps-dep',
    category: 'ai',
    thumb: 'images/siftline-thumb.png',
    url: 'https://shiftline.streamlit.app/',
    gh: 'https://github.com/suyog12/Siftline',
    featured: false,
    desc: 'Private, grounded Q&A and summarization for PDF/DOCX/TXT. Hybrid retrieval pipeline: dense FAISS embeddings + sparse TF-IDF with score fusion. Optional cross-encoder re-ranking. Strict QA — answers capped at 1–3 sentences, grounded only in retrieved chunks. Token-safe hierarchical map-reduce summarizer.',
    arch: [['PDF/DOCX/TXT','pn-x'],['Chunker','pn-b'],['FAISS dense','pn-p'],['TF-IDF sparse','pn-p'],['Score fusion','pn-b'],['flan-t5 QA','pn-g']],
    tags: ['Python','Streamlit','FAISS','TF-IDF','sentence-transformers','flan-t5-base','distilbart','LangChain'],
    how: 'app.py → modules/ (ingestion, retrieval, qa, summarize) + utils/. PDFs parsed with pdfminer/pymupdf; DOCX with python-docx. Chunks embedded with sentence-transformers stored in FAISS index. At query time: top-k dense + BM25-style sparse scores fused via weighted sum. Optional cross-encoder reranks. QA prompt strictly forbids guessing — "Not found in the document." if absent. Summarizer does map-reduce: chunks summarized individually then combined to prevent token overflow on large PDFs. All in-memory, no persistence.'
  },
  {
    id: 'amazon-serpapi',
    name: 'Amazon Reviews ETL (SerpAPI)',
    status: 'complete', statusClass: 'ps-done',
    category: 'data-eng',
    thumb: 'images/amazon-reviews-serpapi-thumb.png',
    url: null,
    gh: 'https://github.com/suyog12/amazon_reviews_etl_pipeline_using_serpapi',
    featured: false,
    desc: 'Python ETL with Flask REST API and HTML dashboard for Amazon review collection. Extracts ASINs from URLs, scrapes product metadata via BeautifulSoup, fetches reviews via SerpAPI Google search, loads to PostgreSQL (Aiven Cloud, SSL). Incremental processing via etl_log table. CSV export by category or ASIN.',
    arch: [['URL input','pn-x'],['ASIN parser','pn-b'],['BeautifulSoup','pn-a'],['SerpAPI','pn-a'],['PostgreSQL','pn-g'],['Flask API','pn-b']],
    tags: ['Python','Flask','PostgreSQL','SerpAPI','BeautifulSoup','psycopg','Aiven Cloud','REST API'],
    how: 'api.py: Flask app with CORS, background-thread ETL, endpoints /api/process, /api/status, /api/export. etl_runner.py: fetch pending links from amazon_links → extract ASIN → scrape metadata with BeautifulSoup (browser headers to avoid blocking) → SerpAPI Google search for review snippets → dedup insert to amazon_reviews. etl_log tracks last_extracted per ASIN for incremental skipping. db_manager.py uses parameterized queries (SQL injection safe) with SSL via ca.pem. 2-second delay between requests for rate limiting.'
  },
  {
    id: 'encryption',
    name: 'Hybrid Encryption Dashboard',
    status: 'deployed', statusClass: 'ps-dep',
    category: 'other',
    thumb: 'images/hybrid-encryption.png',
    url: 'https://hybridencryption.streamlit.app/',
    gh: 'https://github.com/suyog12/hybridEncryption',
    featured: false,
    desc: 'Interactive Streamlit demo of proper hybrid cryptography: AES-256-GCM encrypts the message (fast + authenticated), RSA-OAEP (SHA-256) wraps the AES session key. Output is a JSON bundle with encrypted key (ek), nonce, ciphertext+tag (ct), and algorithm metadata. Decrypt via RSA private key or raw AES key.',
    arch: [['Plaintext','pn-x'],['AES-256-GCM','pn-b'],['RSA-OAEP wrap','pn-p'],['JSON bundle','pn-g'],['RSA unwrap + AES decrypt','pn-b']],
    tags: ['Python','Streamlit','cryptography (PyCA)','AES-256-GCM','RSA-OAEP','SHA-256'],
    how: 'rsa.generate_private_key(65537, 2048) on key gen. AESGCM(aes_key).encrypt(nonce, plaintext.encode(), aad) → ct. rsa_pub.encrypt(aes_key, OAEP(MGF1(SHA256()),SHA256(),None)) → ek. JSON bundle: {algs, rsa_pub_fpr, ek: b64, nonce: b64, ct: b64}. Decrypt: rsa_priv.decrypt(ek_bytes, OAEP(...)) → aes_key → AESGCM.decrypt(nonce, ct, aad). GCM tag provides tamper detection — any modification fails decryption. Optional AAD binds extra context to the ciphertext.'
  },
  {
    id: 'lackey',
    name: 'Lackey Clinic — Patient Churn Prediction',
    status: 'restricted', statusClass: 'ps-res',
    category: 'ml',
    thumb: null,
    url: null,
    gh: null,
    featured: false,
    desc: 'HIPAA-compliant patient churn prediction system for Lackey Clinic (W&M MSBA capstone). Python data pipeline with ultra-aggressive ICD-10 mapping (<2% unknown). R multi-model ML with Charlson + Elixhauser comorbidity scoring. 365-day churn lookahead, 7-model comparison, specialty-specific models including separated OB/GYN.',
    arch: [['Raw EHR CSVs','pn-a'],['data_clean.py','pn-b'],['ICD-10 mapping','pn-p'],['Comorbidity scores','pn-p'],['R caret models','pn-g'],['ROC/AUC','pn-g']],
    tags: ['Python','R','tidyverse','caret','randomForest','xgboost','glmnet','nnet','pROC','ICD-10','HIPAA'],
    how: 'data_clean.py: loads 10 raw CSVs, maps ICD-9→ICD-10 via mapped_output_patched CSV + section111validicd10 xlsx achieving <2% unknown rate. Classifies diagnoses as chronic/mental/preventive. Computes Charlson Comorbidity Index (17 conditions) and Elixhauser (31 conditions) per patient. Outputs 11 clean CSVs. R: set.seed(123), builds churn label (no encounter in 365-day window), engineers recency/frequency/intensity features + SDOH flags. Runs LR, LDA, RF, XGBoost, SVM, Neural Net, ElasticNet via caret; evaluates via pROC AUC. OB separated from GYN for specialty models.'
  },
  {
    id: 'traffic',
    name: 'Smart Traffic Light System',
    status: 'complete', statusClass: 'ps-done',
    category: 'other',
    thumb: 'images/smart_traffic_light.jpg',
    url: null,
    gh: 'https://github.com/iipacii/Smart-Traffic-Light',
    featured: false,
    desc: 'IoT-based smart traffic light using computer vision for adaptive signal management. Detects vehicle density per lane via image processing and dynamically adjusts green light duration to minimize congestion. Simulation layer validates timing logic before hardware deployment.',
    arch: [['Camera input','pn-a'],['OpenCV detection','pn-b'],['Vehicle count','pn-x'],['Adaptive timing','pn-p'],['Controller','pn-g']],
    tags: ['Python','OpenCV','IoT','Computer Vision','Simulation'],
    how: 'Camera feed processed by OpenCV to detect and count vehicles per lane using background subtraction + contour detection. Vehicle density per lane determines dynamic green light duration — high density → extended green. Adaptive algorithm reduces average wait time vs fixed-cycle lights. Simulation layer generates synthetic traffic patterns to validate timing logic before physical hardware deployment.'
  },
  {
    id: 'amazon-playwright',
    name: 'Amazon ETL (Playwright)',
    status: 'complete', statusClass: 'ps-done',
    category: 'data-eng',
    thumb: 'images/amazon-etl-thumb.png',
    url: null,
    gh: 'https://github.com/suyog12/Amazon-Reviews-ETL-Pipeline',
    featured: false,
    desc: 'Async Amazon ETL using Playwright browser automation for JS-rendered pages that BeautifulSoup cannot parse. Incremental upsert to PostgreSQL with ASIN + review_date composite key dedup.',
    arch: [['Playwright browser','pn-a'],['asyncio','pn-b'],['Schema validation','pn-x'],['PostgreSQL upsert','pn-g']],
    tags: ['Python','Playwright','asyncio','PostgreSQL','ETL','data validation'],
    how: 'Playwright launches headless Chromium, navigates to product pages after full JS render — handles React/SPA pages impossible for simple HTML scrapers. asyncio drives concurrent page fetches. Fields validated against schema before insert. ASIN + review_date composite key prevents duplicates. Mimics human scroll patterns + random delays to reduce bot detection. Complements SerpAPI version with different extraction layer.'
  }
];

/* ============================================================
   CHART INSTANCES
   ============================================================ */
const charts = {};

/* ============================================================
   NAV
   ============================================================ */
function initNav() {
  const mobBtn = document.getElementById('mob-btn');
  const mobMenu = document.getElementById('mob-menu');
  if (!mobBtn) return;

  mobBtn.addEventListener('click', () => {
    const open = mobMenu.classList.toggle('open');
    mobBtn.textContent = open ? '✕' : '☰';
  });

  document.querySelectorAll('.mob-menu a').forEach(a => {
    a.addEventListener('click', () => {
      mobMenu.classList.remove('open');
      mobBtn.textContent = '☰';
    });
  });

  // Active nav highlight on scroll
  const sections = document.querySelectorAll('section[id]');
  const navAs = document.querySelectorAll('.nav-links a[href^="#"]');
  window.addEventListener('scroll', () => {
    let cur = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 100) cur = s.id; });
    navAs.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + cur);
    });
  }, { passive: true });

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });
}

/* ============================================================
   KPI COUNTER ANIMATION
   ============================================================ */
function animateCounter(el) {
  const target = parseFloat(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const dur = 1600;
  const start = performance.now();
  const isFloat = target !== Math.floor(target);

  function tick(now) {
    const p = Math.min((now - start) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 4);
    const val = target * eased;
    el.textContent = (isFloat ? val.toFixed(1) : Math.round(val)) + suffix;
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = target + suffix;
  }
  requestAnimationFrame(tick);
}

/* ============================================================
   SCROLL REVEAL + KPI ANIMATION
   ============================================================ */
function initReveal() {
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('show'); });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

  const kpiObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting && !e.target.dataset.animated) {
        e.target.dataset.animated = '1';
        animateCounter(e.target);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.counter').forEach(el => kpiObs.observe(el));

  // Skill bars
  const barObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.skill-bar').forEach(bar => {
          setTimeout(() => { bar.style.width = bar.dataset.w + '%'; }, 150);
        });
        e.target.querySelectorAll('.mini-bar-fill').forEach(bar => {
          setTimeout(() => { bar.style.width = bar.dataset.w + '%'; }, 300);
        });
      }
    });
  }, { threshold: 0.2 });
  document.querySelectorAll('.skill-group, .chart-card').forEach(el => barObs.observe(el));
}

/* ============================================================
   EXPERIENCE ACCORDION
   ============================================================ */
function initExperience() {
  document.querySelectorAll('.exp-header').forEach(header => {
    header.addEventListener('click', () => {
      const card = header.closest('.exp-card');
      const body = card.querySelector('.exp-body');
      const wasOpen = card.classList.contains('open');

      document.querySelectorAll('.exp-card').forEach(c => {
        c.classList.remove('open');
        c.querySelector('.exp-body').classList.remove('open');
      });

      if (!wasOpen) {
        card.classList.add('open');
        body.classList.add('open');
      }
    });
  });
}

/* ============================================================
   PROJECTS
   ============================================================ */
function buildProjects() {
  const grid = document.getElementById('proj-grid');
  if (!grid) return;

  PROJECTS.forEach(p => {
    const card = document.createElement('div');
    card.className = `proj-card reveal${p.featured ? ' featured' : ''}`;
    card.dataset.cat = p.category;
    card.dataset.id = p.id;

    const thumbHTML = p.thumb
      ? `<img src="${p.thumb}" alt="${p.name}" class="proj-thumb" loading="lazy" onerror="this.style.display='none'">`
      : `<div class="proj-thumb-placeholder"><span style="font-size:24px">${categoryIcon(p.category)}</span><span>${p.name.split(' ').slice(0,3).join(' ')}</span></div>`;

    const archHTML = p.arch.map(([n,c]) => `<span class="pnode ${c}">${n}</span><span class="parr">→</span>`).join('').replace(/→$/, '');
    const tagsHTML = p.tags.map(t => `<span class="ptag">${t}</span>`).join('');

    const linksHTML = [
      p.url ? `<a href="${p.url}" target="_blank" rel="noopener" class="proj-link pl-primary">↗ Live App</a>` : '',
      p.gh ? `<a href="${p.gh}" target="_blank" rel="noopener" class="proj-link pl-secondary">GitHub</a>` : '',
      (!p.url && !p.gh) ? `<span class="proj-link pl-secondary" style="opacity:.5;cursor:default">HIPAA Restricted</span>` : ''
    ].join('');

    card.innerHTML = `
      ${thumbHTML}
      <div class="proj-body">
        <div class="proj-meta">
          <span class="proj-status ${p.statusClass}">⬤ ${p.status.toUpperCase()}</span>
          <button class="expand-btn" aria-label="Toggle details">details ↓</button>
        </div>
        <div class="proj-name">${p.name}</div>
        <div class="proj-desc">${p.desc}</div>
        <div class="proj-arch">
          <span class="arch-label">arch:</span>${archHTML}
        </div>
        <div class="proj-tags">${tagsHTML}</div>
        <div class="proj-how">
          <strong style="font-family:var(--mono);font-size:10px;color:var(--cyan);display:block;margin-bottom:6px">HOW IT WORKS</strong>
          ${p.how}
        </div>
        <div class="proj-links">${linksHTML}</div>
      </div>`;

    card.querySelector('.expand-btn').addEventListener('click', e => {
      e.stopPropagation();
      const expanded = card.classList.toggle('expanded');
      e.target.textContent = expanded ? 'less ↑' : 'details ↓';
    });

    grid.appendChild(card);
  });

  // Filter buttons
  document.querySelectorAll('.pf-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.pf-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.cat;
      document.querySelectorAll('.proj-card').forEach(card => {
        const show = cat === 'all' || card.dataset.cat === cat;
        card.classList.toggle('hidden', !show);
      });
    });
  });
}

function categoryIcon(cat) {
  const icons = { 'data-eng': '⚙', 'analytics': '📊', 'ai': '🤖', 'ml': '🧠', 'other': '🔧' };
  return icons[cat] || '💻';
}

/* ============================================================
   CHARTS (Chart.js)
   ============================================================ */
function initCharts() {
  const isDark = true; // always dark theme
  const tc = 'rgba(255,255,255,0.35)';
  const gc = 'rgba(255,255,255,0.06)';

  function baseOpts(hasY2 = false) {
    const scales = {
      x: { ticks: { color: tc, font: { size: 9, family: 'IBM Plex Mono' } }, grid: { color: gc } },
      y: { ticks: { color: tc, font: { size: 9, family: 'IBM Plex Mono' } }, grid: { color: gc } }
    };
    if (hasY2) scales.y2 = { position: 'right', ticks: { color: tc, font: { size: 9 } }, grid: { display: false } };
    return {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales
    };
  }

  // Main pipeline chart
  let curChartType = 'throughput';
  function buildMainChart(type) {
    if (charts.main) charts.main.destroy();
    const canvas = document.getElementById('main-chart');
    if (!canvas) return;
    const data = CHART_DATA[type];
    const hasY2 = type === 'throughput';
    charts.main = new Chart(canvas, { type: 'line', data, options: baseOpts(hasY2) });
    const leg = document.getElementById('main-legend');
    if (leg) leg.innerHTML = data.datasets.map(ds =>
      `<span style="display:flex;align-items:center;gap:5px">
        <span style="width:14px;height:2px;background:${ds.borderColor};border-radius:2px;display:inline-block${ds.borderDash ? ';border-top:2px dashed '+ds.borderColor+';background:transparent' : ''}"></span>
        <span style="font-family:var(--mono);font-size:10px;color:var(--text2)">${ds.label}</span>
      </span>`
    ).join('');
  }
  buildMainChart('throughput');

  document.querySelectorAll('.ctab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.ctab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      buildMainChart(tab.dataset.chart);
    });
  });

  // Impact horizontal bar
  const impCanvas = document.getElementById('impact-chart');
  if (impCanvas) {
    charts.impact = new Chart(impCanvas, {
      type: 'bar',
      data: {
        labels: ['report latency↓','pipeline failures↓','data errors↓','ML prep↓','manual reporting↓','ad-hoc requests↓'],
        datasets: [{ label: '% improvement',
          data: [99,60,40,40,70,40],
          backgroundColor: [BLUE,GREEN,TEAL,PURPLE,AMBER,BLUE],
          borderRadius: 4 }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        indexAxis: 'y',
        plugins: { legend: { display: false } },
        scales: {
          x: { ticks: { color: tc, font: { size: 9, family: 'IBM Plex Mono' }, callback: v => v + '%' }, grid: { color: gc }, max: 100 },
          y: { ticks: { color: tc, font: { size: 9, family: 'IBM Plex Mono' } }, grid: { display: false } }
        }
      }
    });
  }

  // Latency comparison bar
  const latCanvas = document.getElementById('latency-chart');
  if (latCanvas) {
    charts.latency = new Chart(latCanvas, {
      type: 'bar',
      data: {
        labels: ['Live FFIEC API', 'DuckDB + R2'],
        datasets: [{ label: 'latency',
          data: [11500, 175],
          backgroundColor: [AMBER + 'cc', GREEN + 'cc'],
          borderRadius: 5 }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { ticks: { color: tc, font: { size: 10, family: 'IBM Plex Mono' } }, grid: { display: false } },
          y: { ticks: { color: tc, font: { size: 9, family: 'IBM Plex Mono' }, callback: v => v >= 1000 ? (v/1000).toFixed(0)+'s' : v+'ms' }, grid: { color: gc } }
        }
      }
    });
  }

  // Skill radar
  const radCanvas = document.getElementById('radar-chart');
  if (radCanvas) {
    charts.radar = new Chart(radCanvas, {
      type: 'radar',
      data: {
        labels: ['Big Data','Cloud','Data Modeling','ML / AI','Streaming','DevOps','Analytics'],
        datasets: [{ label: 'proficiency',
          data: [97,90,93,78,85,80,82],
          borderColor: BLUE, backgroundColor: BLUE + '28',
          pointBackgroundColor: BLUE, pointRadius: 3 }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { r: {
          ticks: { display: false, stepSize: 20 },
          grid: { color: gc },
          pointLabels: { color: tc, font: { size: 10, family: 'IBM Plex Mono' } },
          min: 0, max: 100, angleLines: { color: gc }
        }}
      }
    });
  }
}

/* ============================================================
   RESUME SELECTOR
   ============================================================ */
function initResume() {
  const opts = document.querySelectorAll('.ropt');
  const dlBtn = document.getElementById('resume-dl');
  const pvBtn = document.getElementById('resume-pv');

  opts.forEach(opt => {
    opt.addEventListener('click', () => {
      opts.forEach(o => o.classList.remove('sel'));
      opt.classList.add('sel');
      const f = opt.dataset.file;
      if (dlBtn) dlBtn.href = f;
      if (pvBtn) pvBtn.href = f;
    });
  });
}

/* ============================================================
   FOOTER YEAR
   ============================================================ */
function setYear() {
  const el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear();
}

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initReveal();
  initExperience();
  buildProjects();
  initResume();
  setYear();

  // Chart.js loads after DOM
  const chartScript = document.createElement('script');
  chartScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js';
  chartScript.onload = initCharts;
  document.head.appendChild(chartScript);
});