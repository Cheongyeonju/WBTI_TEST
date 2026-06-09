// =============================================
// WBTI — app.js  v5  (최종)
// =============================================

let answers    = new Array(16).fill(null);
let currentQ   = 0;
let resultCode = '';

// ─── 화면 전환 ────────────────────────────────
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => {
    s.classList.remove('active');
    s.scrollTop = 0;   // 각 화면 내부 스크롤 리셋
  });
  const el = document.getElementById(id);
  if (el) {
    el.classList.add('active');
    el.scrollTop = 0;  // 새 화면도 최상단 시작
  }
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

// ─── 질문 렌더링 ──────────────────────────────
// direction: 'next' | 'prev' | 'none'
function renderQuestion(idx, direction) {
  const q     = questions[idx];
  const total = questions.length;
  const ch    = getChapter(idx);

  // 챕터명 (4문항마다 변경)
  setEl('chapter-label-text', ch ? ch.name : '');
  applyChapterColor(idx);  // 4번: 챕터 색상 적용

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

  // 카운터
  setEl('step-counter', `${idx + 1} / ${total}`);

  // 이전 버튼: 항상 활성 (Q1에서 누르면 커버로)
  const back = document.getElementById('btn-back');
  if (back) {
    back.style.opacity       = '1';
    back.style.pointerEvents = 'all';
  }

  // 슬라이드 애니메이션
  const content = document.getElementById('card-content');
  if (content && direction !== 'none') {

    // 1단계: 퇴장 시작 (콘텐츠는 아직 이전 것 유지 → 번쩍임 없음)
    const outCls = direction === 'next' ? 'slide-out-left' : 'slide-out-right';
    content.classList.remove('slide-visible','slide-in-right','slide-in-left');
    content.classList.add(outCls);

    // 2단계: 퇴장 완료 후 새 콘텐츠 로드 + 등장
    setTimeout(() => {
      updateCardContent(q, idx);           // 퇴장 완료 후 교체 → 번쩍임 없음

      const inCls = direction === 'next' ? 'slide-in-right' : 'slide-in-left';
      content.classList.remove(outCls);
      content.classList.add(inCls);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {      // 2 rAF: 브라우저가 inCls 위치를 확실히 인식 후 트랜지션
          content.classList.remove(inCls);
          content.classList.add('slide-visible');
        });
      });
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

  // 카드 등장: void offsetWidth 복원 (remove→add 사이 강제 스타일 플러시)
  const card = document.getElementById('quiz-card');
  if (card) {
    card.classList.remove('slide-in');
    void card.offsetWidth;                 // 카드 등장 애니메이션 보장
    card.classList.add('slide-in');
  }

  renderOptions(idx, q);
}

// ─── 카드 콘텐츠 갱신 ─────────────────────────
function updateCardContent(q, idx) {
  const sitEl = document.getElementById('q-situation');
  const txtEl = document.getElementById('q-text');

  if (sitEl) sitEl.textContent = q.situation;
  if (txtEl) {
    // Q1, Q2 … 번호를 span 으로 앞에 삽입
    txtEl.innerHTML =
      `<span class="q-number">Q${idx + 1}.</span> ${q.text}`;
  }

  const img = document.getElementById('q-illust');
  if (img) {
    img.style.opacity = '0';
    img.src = q.illust;
    img.alt = `Q${idx + 1} 일러스트`;
    img.onerror = () => { img.style.display = 'none'; };
    img.onload  = () => { img.style.display = 'block'; img.style.opacity = '1'; };
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
// Q1(idx=0) 에서 누르면 커버로 이동
function goPrev() {
  if (currentQ === 0) {
    showScreen('screen-cover');
  } else {
    currentQ--;
    renderQuestion(currentQ, 'prev');
  }
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


// ─── 챕터 색상 분기 (4번) ─────────────────────
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

// ─── 결과 렌더링 — 최종 레이아웃 ────────────────
function renderResult(code) {
  const r = results[code] || results['DLEW'];

  // ★ 9번: 캐릭터 이미지 — src 설정 전 onerror 등록
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

  // 캐릭터 이름 · 원산지
  setEl('result-char-name',   r.name);
  setEl('result-char-origin', toOriginCase(r.origin));

  // TASTE PROFILE — 번호 + 항목명 + 게이지 + 극단 레이블
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
          <span class="rc-axis-pct" id="ax-pct-${ax.key}">${r.axes[ax.key]}%</span>
        </div>
        <div class="rc-axis-bar-track">
          <div class="rc-axis-bar-fill"
               style="width:0%"
               data-target="${r.axes[ax.key]}"></div>
        </div>
        <div class="rc-axis-bottom-row">
          <span class="rc-axis-label-lo">${ax.lo}</span>
          <span class="rc-axis-label-hi">${ax.hi}</span>
        </div>
      </div>`).join('');

    requestAnimationFrame(() => requestAnimationFrame(() => {
      axesEl.querySelectorAll('.rc-axis-bar-fill').forEach(bar => {
        bar.style.width = bar.dataset.target + '%';
      });
    }));
  }

  // EXPLANATION
  setEl('result-feature', r.feature);

  // WINE RECOMMENDATION — 소믈리에 추천 1종 (r.wine)
  const w = r.wine || { name:'—', origin:'—', feature:'—' };

  // ★ 10번: 와인 이미지 — src 설정 전 onerror/onload 등록
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

  // 2번째 와인 항목 숨김 (1종만 추천)
  const wine2El = document.getElementById('rc-wine-2');
  if (wine2El) wine2El.style.display = 'none';

  // 날짜
  const now = new Date();
  setEl('result-date',
    `${now.getFullYear()}.${pad(now.getMonth()+1)}.${pad(now.getDate())} – WINE PAIRING`);
}

// ─── 유틸 ────────────────────────────────────
// 8번: 첫 글자만 대문자, 나머지 소문자 (단어 단위)
function toOriginCase(str) {
  return str.toLowerCase().replace(/(?:^|[\s·\/·])\S/g, c => c.toUpperCase());
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

// ─── 1080×1920 캔버스 합성 ────────────────────
// receipt-card 전체(CSS background 포함)를 html2canvas 로 캡처
async function buildShareCanvas() {
  const TARGET_W = 1080, TARGET_H = 1920;

  const card = document.getElementById('receipt-card');
  const cardCanvas = await html2canvas(card, {
    scale: 4,
    backgroundColor: null,
    useCORS: true,
    logging: false,
    allowTaint: true
  });

  const out = document.createElement('canvas');
  out.width = TARGET_W; out.height = TARGET_H;
  const ctx = out.getContext('2d');

  ctx.fillStyle = '#f4f1eb';
  ctx.fillRect(0, 0, TARGET_W, TARGET_H);

  const cardW = Math.round(TARGET_W * 0.88);
  const scale  = cardW / cardCanvas.width;
  const cardH  = Math.round(cardCanvas.height * scale);
  const cardX  = Math.round((TARGET_W - cardW) / 2);
  const cardY  = Math.round((TARGET_H - cardH) / 2) - 60;
  ctx.drawImage(cardCanvas, cardX, cardY, cardW, cardH);

  ctx.font = '500 28px "Share Tech Mono", monospace';
  ctx.fillStyle = 'rgba(26,58,42,.28)';
  ctx.textAlign = 'center';
  ctx.fillText('WBTI · Wine Base Taste Index', TARGET_W/2, TARGET_H - 60);

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
          `<p style="text-align:center;font-family:sans-serif;color:#555;margin:12px">` +
          `길게 눌러 사진 저장</p>`
        );
        showToast('이미지를 길게 눌러 저장하세요 📸');
      } else {
        showToast('팝업 차단을 해제하고 다시 시도해주세요.');
      }
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
    const sd   = {
      title: `나의 WBTI는 ${resultCode}!`,
      text:  `${r.name}\n${r.feature}\n\n#WBTI #와인취향 #나의첫와인`,
      files: [file]
    };
    if (navigator.canShare && navigator.canShare(sd)) {
      await navigator.share(sd);
      showToast('공유됐어요! 🥂');
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
      console.error(e);
      showToast('공유에 실패했어요. 이미지를 저장 후 직접 공유해주세요.');
    }
  } finally {
    if (btn) btn.classList.remove('loading');
  }
}