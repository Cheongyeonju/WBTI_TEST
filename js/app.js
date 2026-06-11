// =============================================
// WBTI — app.js
// =============================================

let answers    = new Array(16).fill(null);
let currentQ   = 0;
let resultCode = '';

// ─── 화면 전환 ────────────────────────────────
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => {
    s.classList.remove('active');
    s.scrollTop = 0;
  });
  const el = document.getElementById(id);
  if (el) { el.classList.add('active'); el.scrollTop = 0; }
}

// ─── 시작 / 재시도 ────────────────────────────
function startQuiz() {
  answers  = new Array(16).fill(null);
  currentQ = 0;
  showScreen('screen-quiz');
  renderQuestion(0, 'none');
}
function retryQuiz() { startQuiz(); }

// ─── 챕터 조회 ────────────────────────────────
function getChapter(idx) {
  return CHAPTERS.find(c => idx >= c.range[0] && idx <= c.range[1]);
}

// ══════════════════════════════════════════════
// 이미지 캐시 시스템
// ── 원리 ──────────────────────────────────────
//   HTMLImageElement를 Map에 보관.
//   프리로드 완료된 img 객체의 src만 신뢰.
//   교체 시 src 대입 대신 img 노드 자체를 swap.
// ══════════════════════════════════════════════
const imgCache = new Map(); // src → HTMLImageElement (로드완료)

function preloadImage(src) {
  if (!src || imgCache.has(src)) return Promise.resolve();
  return new Promise(resolve => {
    const img = new Image();
    img.onload  = () => { imgCache.set(src, img); resolve(); };
    img.onerror = () => { resolve(); }; // 실패해도 진행
    img.src = src;
  });
}

function preloadAllImages() {
  questions.forEach(q => preloadImage(q.illust));
}

// ─── 질문 렌더링 ──────────────────────────────
function renderQuestion(idx, direction) {
  const q     = questions[idx];
  const total = questions.length;
  const ch    = getChapter(idx);

  setEl('chapter-label-text', ch ? ch.name : '');
  applyChapterColor(idx);

  // 진행 도트
  const track = document.getElementById('step-track');
  if (track) {
    track.innerHTML = '';
    for (let i = 0; i < total; i++) {
      const dot = document.createElement('div');
      dot.className = 'step-dot' +
        (i < idx ? ' done' : i === idx ? ' active' : '');
      track.appendChild(dot);
    }
  }

  setEl('step-counter', `${idx + 1} / ${total}`);

  const back = document.getElementById('btn-back');
  if (back) { back.style.opacity = '1'; back.style.pointerEvents = 'all'; }

  // 슬라이드 애니메이션
  const content = document.getElementById('card-content');
  if (content && direction !== 'none') {
    const outCls = direction === 'next' ? 'slide-out-left' : 'slide-out-right';
    content.classList.remove('slide-visible','slide-in-right','slide-in-left');
    content.classList.add(outCls);

    setTimeout(() => {
      updateCardContent(q, idx);
      const inCls = direction === 'next' ? 'slide-in-right' : 'slide-in-left';
      content.classList.remove(outCls);
      content.classList.add(inCls);
      requestAnimationFrame(() => requestAnimationFrame(() => {
        content.classList.remove(inCls);
        content.classList.add('slide-visible');
      }));
    }, 180);

  } else {
    updateCardContent(q, idx);
    if (content) {
      content.classList.remove(
        'slide-out-left','slide-out-right','slide-in-right','slide-in-left'
      );
      content.classList.add('slide-visible');
    }
  }

  const card = document.getElementById('quiz-card');
  if (card) {
    card.classList.remove('slide-in');
    void card.offsetWidth;
    card.classList.add('slide-in');
  }

  renderOptions(idx, q);
}

// ─── 카드 콘텐츠 갱신 ─────────────────────────
// Flash 방지 핵심:
//   illust-area 안에 img를 두 개 운용 (A/B swap)
//   새 이미지가 완전히 로드된 후 보이는 쪽만 전환
// ─────────────────────────────────────────────
let _activeSlot = 'a'; // 현재 보이는 슬롯

function updateCardContent(q, idx) {
  const sitEl = document.getElementById('q-situation');
  const txtEl = document.getElementById('q-text');
  if (sitEl) sitEl.textContent = q.situation;
  if (txtEl) {
    txtEl.innerHTML = `<span class="q-number">Q${idx + 1}.</span> ${q.text}`;
  }

  const area   = document.getElementById('illust-area-inner');
  const slotA  = document.getElementById('illust-slot-a');
  const slotB  = document.getElementById('illust-slot-b');
  if (!area || !slotA || !slotB) {
    // fallback: 기존 단일 img 방식
    const imgEl = document.getElementById('q-illust');
    if (imgEl) { imgEl.src = q.illust; imgEl.alt = `Q${idx + 1}`; }
    return;
  }

  const nextSlot = _activeSlot === 'a' ? slotB : slotA;
  const curSlot  = _activeSlot === 'a' ? slotA : slotB;

  const src = q.illust;

  function swapSlots() {
    nextSlot.style.opacity = '1';
    curSlot.style.opacity  = '0';
    _activeSlot = _activeSlot === 'a' ? 'b' : 'a';
  }

  if (imgCache.has(src)) {
    // 캐시 히트: 즉시 swap
    nextSlot.src = src;
    nextSlot.alt = `Q${idx + 1}`;
    swapSlots();
  } else {
    // 캐시 미스: 로드 완료 후 swap
    nextSlot.onload  = () => { imgCache.set(src, nextSlot); swapSlots(); };
    nextSlot.onerror = () => { nextSlot.style.display = 'none'; };
    nextSlot.src = src;
    nextSlot.alt = `Q${idx + 1}`;
  }
}

// ─── 선택지 버튼 ──────────────────────────────
function renderOptions(idx, q) {
  const wrap = document.getElementById('options-wrap');
  if (!wrap) return;
  wrap.innerHTML = '';
  ['A', 'B'].forEach(l => {
    const btn = document.createElement('button');
    btn.className = 'option-btn' + (answers[idx] === l ? ' selected' : '');
    btn.innerHTML =
      `<div class="option-letter">${l}</div>` +
      `<div class="option-text">${q[l].text}</div>`;
    btn.addEventListener('click', () => selectOption(idx, l));
    wrap.appendChild(btn);
  });
}

// ─── 선택 처리 ────────────────────────────────
function selectOption(idx, letter) {
  answers[idx] = letter;
  document.querySelectorAll('.option-btn').forEach((b, i) =>
    b.classList.toggle('selected', i === (letter === 'A' ? 0 : 1))
  );
  if (idx === questions.length - 1) {
    setTimeout(goToLoading, 200);
  } else {
    setTimeout(() => { currentQ = idx + 1; renderQuestion(currentQ, 'next'); }, 200);
  }
}

// ─── 이전 이동 ────────────────────────────────
function goPrev() {
  if (currentQ === 0) { showScreen('screen-cover'); }
  else { currentQ--; renderQuestion(currentQ, 'prev'); }
}

// ─── 로딩 → 결과 ──────────────────────────────
function goToLoading() {
  showScreen('screen-loading');
  const rect = document.getElementById('wine-fill-rect');
  if (rect) {
    rect.style.animation = 'none';
    void rect.getBoundingClientRect();
    rect.style.animation = '';
  }
  setTimeout(() => {
    resultCode = calcResult();
    renderResult(resultCode);
    showScreen('screen-result');
  }, 2200);
}

// ─── 챕터 색상 ────────────────────────────────
const CHAPTER_COLORS = ['#1a3a2a','#6b1f2a','#7a5c1e','#2a3a5a'];
function applyChapterColor(idx) {
  const chIdx = CHAPTERS.findIndex(c => idx >= c.range[0] && idx <= c.range[1]);
  const color  = CHAPTER_COLORS[chIdx >= 0 ? chIdx : 0];
  document.documentElement.style.setProperty('--ch-current', color);
}

// ─── 결과 계산 ────────────────────────────────
function calcResult() {
  const s = { S:0,D:0,T:0,L:0,F:0,E:0,B:0,W:0 };
  answers.forEach((a,i) => { if (a) s[questions[i][a].val]++; });
  return (s.S>=s.D?'S':'D')+(s.T>=s.L?'T':'L')+(s.F>=s.E?'F':'E')+(s.B>=s.W?'B':'W');
}

// ─── 결과 렌더링 ──────────────────────────────
function renderResult(code) {
  const r = results[code] || results['DLEW'];

  const charImg = document.getElementById('result-char-img');
  const charFb  = document.getElementById('result-char-fallback');
  if (charImg) {
    charImg.style.display = 'block';
    if (charFb) charFb.style.display = 'none';
    charImg.onerror = () => {
      charImg.style.display = 'none';
      if (charFb) charFb.style.display = 'flex';
    };
    charImg.onload = () => {
      charImg.style.display = 'block';
      if (charFb) charFb.style.display = 'none';
    };
    charImg.src = `images/characters/${code}_c.png`;
    charImg.alt = r.name;
  }

  setEl('result-char-name',   r.name);
  setEl('result-char-origin', toOriginCase(r.origin));

  const axDefs = [
    { key:'sweet',   label:'당도',   lo:'스위트',   hi:'드라이'  },
    { key:'tannin',  label:'타닌',   lo:'부드러운', hi:'강한'    },
    { key:'acidity', label:'산미',   lo:'낮음',     hi:'높음'    },
    { key:'body',    label:'바디감', lo:'라이트',   hi:'풀바디'  }
  ];
  const axesEl = document.getElementById('result-axes');
  if (axesEl) {
    axesEl.innerHTML = axDefs.map((ax, i) => `
      <div class="rc-axis-item">
        <div class="rc-axis-top-row">
          <span class="rc-axis-name">${i+1}. ${ax.label}</span>
          <span class="rc-axis-pct">${r.axes[ax.key]}%</span>
        </div>
        <div class="rc-axis-bar-track">
          <div class="rc-axis-bar-fill" style="width:0%" data-target="${r.axes[ax.key]}"></div>
        </div>
        <div class="rc-axis-bottom-row">
          <span class="rc-axis-label-lo">${ax.lo}</span>
          <span class="rc-axis-label-hi">${ax.hi}</span>
        </div>
      </div>`).join('');
    requestAnimationFrame(() => requestAnimationFrame(() => {
      axesEl.querySelectorAll('.rc-axis-bar-fill').forEach(b => {
        b.style.width = b.dataset.target + '%';
      });
    }));
  }

  setEl('result-feature', r.feature);

  const w = r.wine || { name:'—', origin:'—', feature:'—' };
  const wineImg = document.getElementById('result-wine-img-1');
  if (wineImg) {
    wineImg.style.display = 'block';
    wineImg.onerror = () => { wineImg.style.display = 'none'; };
    wineImg.onload  = () => { wineImg.style.display = 'block'; };
    wineImg.src = `images/wines/${code}.png`;
  }
  setEl('result-wine1-name',    w.name);
  setEl('result-wine1-origin',  toOriginCase(w.origin || '—'));
  setEl('result-wine1-feature', w.feature);

  const wine2El = document.getElementById('rc-wine-2');
  if (wine2El) wine2El.style.display = 'none';

  const now = new Date();
  setEl('result-date',
    `${now.getFullYear()}.${pad(now.getMonth()+1)}.${pad(now.getDate())} – WINE PAIRING`);
}

// ─── 유틸 ────────────────────────────────────
function toOriginCase(str) {
  return str.toLowerCase().replace(/(?:^|[\s·\/])[^\s]/g, c => c.toUpperCase());
}
function setEl(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}
function pad(n) { return String(n).padStart(2,'0'); }

// ─── 토스트 ───────────────────────────────────
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

// ══════════════════════════════════════════════
// 이미지 저장 / 공유
// ── 문제 3 수정 ───────────────────────────────
//   고정 1920px 캔버스 폐기.
//   receipt-card를 실제 크기대로 캡처 후
//   좌우 패딩만 추가한 자연스러운 비율로 저장.
//   레이아웃 깨짐 없음.
// ══════════════════════════════════════════════
async function buildShareCanvas() {
  const card = document.getElementById('receipt-card');

  // ── 캡처 전: 게이지 바 트랜지션 OFF + 목표값 즉시 적용 ──
  const fills = card.querySelectorAll('.rc-axis-bar-fill');
  fills.forEach(bar => {
    bar.style.transition = 'none';
    bar.style.width      = (bar.dataset.target || '0') + '%';
  });

  // 강제 리플로우 → 브라우저가 즉시 스타일 반영
  void card.offsetHeight;

  // rAF 2회 대기 → 페인트까지 완전히 완료된 후 캡처
  await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));

  // receipt-card 캡처:
  // position:fixed 컨텍스트이므로 scrollX/Y=0, windowWidth/Height=뷰포트로 설정
  const cardCanvas = await html2canvas(card, {
    scale: 3,
    backgroundColor: '#F5F5F5',
    useCORS: true,
    logging: false,
    allowTaint: true,
    scrollX: 0,
    scrollY: 0,
    windowWidth:  document.documentElement.clientWidth,
    windowHeight: document.documentElement.clientHeight
  });

  // ── 캡처 후: 트랜지션 원상복구 ──
  fills.forEach(bar => {
    bar.style.transition = '';  // CSS 원래 값으로 복구
  });

  // 캔버스 크기 = 카드 크기 + 상하좌우 여백 60px
  const PAD_X = 60, PAD_Y = 80;
  const out   = document.createElement('canvas');
  out.width   = cardCanvas.width  + PAD_X * 2;
  out.height  = cardCanvas.height + PAD_Y * 2;
  const ctx   = out.getContext('2d');

  // 배경
  ctx.fillStyle = '#F5F5F5';
  ctx.fillRect(0, 0, out.width, out.height);

  // 카드 그대로 중앙에 삽입
  ctx.drawImage(cardCanvas, PAD_X, PAD_Y);

  // 하단 워터마크
  ctx.font      = '32px "Share Tech Mono", monospace';
  ctx.fillStyle = 'rgba(26,58,42,.25)';
  ctx.textAlign = 'center';
  ctx.fillText('WBTI · Wine Base Taste Index',
    out.width / 2, out.height - 28);

  return out;
}

// ─── 갤러리 저장 ──────────────────────────────
async function saveImage() {
  const btn = document.getElementById('btn-save');
  if (btn) btn.classList.add('loading');
  showToast('이미지를 준비하는 중…');
  try {
    const canvas  = await buildShareCanvas();
    const dataUrl = canvas.toDataURL('image/png');
    const isIOS   = /iP(hone|ad|od)/.test(navigator.userAgent);
    if (isIOS) {
      const tab = window.open();
      if (tab) {
        tab.document.write(
          `<img src="${dataUrl}" style="max-width:100%;display:block;margin:0 auto">` +
          `<p style="text-align:center;font-family:sans-serif;color:#555;margin:12px">길게 눌러 사진 저장</p>`
        );
        showToast('이미지를 길게 눌러 저장하세요 📸');
      } else { showToast('팝업 차단을 해제하고 다시 시도해주세요.'); }
    } else {
      const a = document.createElement('a');
      a.download = `WBTI_${resultCode}.png`;
      a.href = dataUrl; a.click();
      showToast('이미지가 저장됐어요! 🍇');
    }
  } catch(e) {
    console.error(e);
    showToast('저장에 실패했어요. 다시 시도해주세요.');
  } finally {
    if (btn) btn.classList.remove('loading');
  }
}

// ─── 인스타 공유 ──────────────────────────────
async function shareInstagram() {
  const r   = results[resultCode] || results['DLEW'];
  const btn = document.getElementById('btn-share-insta');
  if (btn) btn.classList.add('loading');
  showToast('공유 이미지를 준비하는 중…');
  try {
    const canvas = await buildShareCanvas();
    const blob   = await new Promise((res,rej) =>
      canvas.toBlob(b => b ? res(b) : rej(new Error('blob 실패')), 'image/png')
    );
    const file = new File([blob], `WBTI_${resultCode}.png`, { type:'image/png' });
    const sd = {
      title: `나의 WBTI는 ${resultCode}!`,
      text:  `${r.name}\n${r.feature}\n\n#WBTI #와인취향 #나의첫와인`,
      files: [file]
    };
    if (navigator.canShare && navigator.canShare(sd)) {
      await navigator.share(sd); showToast('공유됐어요! 🥂');
    } else if (navigator.share) {
      await navigator.share({ title: sd.title, text: sd.text });
      showToast('텍스트가 공유됐어요. 이미지는 저장 후 첨부해주세요!');
    } else {
      const text = `나의 WBTI는 ${resultCode}!\n${r.name}\n${r.feature}\n#WBTI #와인취향`;
      await navigator.clipboard.writeText(text);
      showToast('텍스트 복사됐어요! 인스타에 붙여넣기 해주세요 📸');
    }
  } catch(e) {
    if (e.name !== 'AbortError') {
      console.error(e); showToast('공유에 실패했어요. 이미지를 저장 후 직접 공유해주세요.');
    }
  } finally {
    if (btn) btn.classList.remove('loading');
  }
}

// ─── 앱 시작: 전체 이미지 프리로드 ───────────
preloadAllImages();