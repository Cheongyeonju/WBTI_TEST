// =============================================
// WBTI — app.js  (v8)
// =============================================

// ─── 서비스 설정 ─────────────────────────────
const WBTI_URL      = 'https://wbti-test-drab.vercel.app/';
const KAKAO_JS_KEY  = '37fe103ef60f973f833a3a41505950ff'; // ← 카카오 JavaScript 키 입력

// ─── 상태 변수 ───────────────────────────────
let answers     = new Array(16).fill(null);
let currentQ    = 0;
let resultCode  = '';
let selectedAge = '';
let currentLang = 'ko';  // 언어 상태: 'ko' | 'en'

// ─── 챕터 컬러 (함수보다 먼저 선언 필수) ─────
const CHAPTER_COLORS = ['#1a3a2a','#6b1f2a','#7a5c1e','#2a3a5a'];

// ─── Supabase 초기화 ─────────────────────────
// ★ 실제 값으로 교체하세요
const SUPABASE_URL = 'https://trnqjqggehvbtykfveqz.supabase.co/rest/v1/';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRybnFqcWdnZWh2YnR5a2Z2ZXF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE2MzU0MjgsImV4cCI6MjA5NzIxMTQyOH0.dxw21RVYBcuNjB02EBQZIAo2wLhEHD0vF8yFwifbetk';
const supabaseClient = (
  typeof supabase !== 'undefined' &&
  SUPABASE_URL !== 'YOUR_SUPABASE_URL' &&
  SUPABASE_URL.startsWith('http')
) ? supabase.createClient(SUPABASE_URL, SUPABASE_KEY) : null;

// ─── 카카오 초기화 ───────────────────────────
function initKakao() {
  if (typeof Kakao !== 'undefined' && !Kakao.isInitialized()) {
    try { Kakao.init(KAKAO_JS_KEY); } catch(e) { console.warn('Kakao init 실패:', e); }
  }
}

// ─── Supabase 저장 ───────────────────────────
async function saveToSupabase(code, age) {
  if (!supabaseClient) { console.warn('Supabase 미연결'); return; }
  try {
    const { error } = await supabaseClient
      .from('wbti_results')
      .insert([{
        result_code: code,
        age_group:   age || '미응답',
        created_at:  new Date().toISOString()
      }]);
    if (error) console.error('Supabase 저장 오류:', error);
  } catch(e) {
    console.error('Supabase 오류:', e);
  }
}

// ─── 화면 전환 ────────────────────────────────
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => {
    s.classList.remove('active');
    s.scrollTop = 0;
  });
  const el = document.getElementById(id);
  if (el) { el.classList.add('active'); el.scrollTop = 0; }
}

// ─── 언어 토글 ───────────────────────────────
function setLang(lang) {
  currentLang = lang;

  // 버튼 active 상태 교체
  document.getElementById('btn-lang-ko')?.classList.toggle('active', lang === 'ko');
  document.getElementById('btn-lang-en')?.classList.toggle('active', lang === 'en');

  // 4. '선택지를 골라주세요' 영문 처리
  const optHeader = document.querySelector('.options-header');
  if (optHeader && optHeader.id !== 'age-question-text') {
    optHeader.textContent = lang === 'ko' ? '선택지를 골라주세요' : 'Choose your answer';
  }

  // 현재 활성 화면에 따라 재렌더링
  const activeScreen = document.querySelector('.screen.active');
  if (!activeScreen) return;

  switch(activeScreen.id) {
    case 'screen-quiz':
      renderQuestion(currentQ, 'none');
      break;
    case 'screen-result':
      renderResult(resultCode);
      break;
    case 'screen-age':
      renderAgePage();
      break;
  }

  // 3. 퀴즈 이전 버튼 텍스트
  const backBtn = document.getElementById('btn-back');
  if (backBtn) {
    const txt = backBtn.querySelector('span') || backBtn;
    // btn-back은 텍스트노드로 "이전" 포함
    backBtn.childNodes.forEach(n => {
      if (n.nodeType === 3 && n.textContent.trim()) {
        n.textContent = lang === 'ko' ? '이전' : 'Back';
      }
    });
  }

  // 공유 팝업 텍스트 업데이트
  updateSharePopupLang();
  // 저장 버튼 텍스트
  const saveBtn = document.getElementById('btn-save');
  if (saveBtn) {
    const icon = saveBtn.querySelector('.btn-action-icon');
    saveBtn.innerHTML = '';
    const sp = document.createElement('span');
    sp.className = 'btn-action-icon'; sp.textContent = '⬇';
    saveBtn.appendChild(sp);
    saveBtn.appendChild(document.createTextNode(lang === 'ko' ? '갤러리 저장' : 'Save'));
    saveBtn.onclick = saveImage;
  }
  const shareLabel = document.getElementById('btn-share-label');
  if (shareLabel) shareLabel.textContent = lang === 'ko' ? '공유하기' : 'Share';
}

function updateSharePopupLang() {
  const ko = currentLang === 'ko';
  const title = document.getElementById('share-popup-title');
  const desc  = document.getElementById('share-popup-desc');
  if (title) title.textContent = ko ? '공유하기' : 'Share';
  if (desc)  desc.textContent  = ko ? '나의 WBTI 결과를 공유해보세요' : 'Share your WBTI result!';
  const kakaoL = document.getElementById('share-kakao-label');
  const igL    = document.getElementById('share-ig-label');
  const linkL  = document.getElementById('share-link-label');
  if (kakaoL) kakaoL.textContent = ko ? '카카오톡' : 'KakaoTalk';
  if (igL)    igL.textContent    = ko ? '인스타그램' : 'Instagram';
  if (linkL)  linkL.textContent  = ko ? '링크 복사' : 'Copy Link';
}

function renderAgePage() {
  const ko = currentLang === 'ko';

  // 2. 질문 텍스트 영문 처리
  const qEl = document.getElementById('age-question-text');
  if (qEl) qEl.textContent = ko ? '나이대가 어떻게 되시나요?' : 'What is your age group?';

  // 3. 이전 버튼 영문 처리
  const backLabel = document.getElementById('age-back-label');
  if (backLabel) backLabel.textContent = ko ? '이전' : 'Back';

  // 선택지 레이블
  const labels = ko
    ? ['20대', '30대', '40대', '50대', '60세 이상']
    : ['20s', '30s', '40s', '50s', '60 or older'];
  labels.forEach((txt, i) => {
    const el = document.getElementById(`age-label-${i + 1}`);
    if (el) el.textContent = txt;
  });
}

// ─── 나이대 선택 ─────────────────────────────
function selectAge(age) {
  // 영문 모드일 때도 DB에는 한글로 저장
  const ageMap = {
    '20s':'20대', '30s':'30대', '40s':'40대',
    '50s':'50대', '60 or older':'60세 이상'
  };
  selectedAge = ageMap[age] || age;
  // 선택 표시
  document.querySelectorAll('.age-btn').forEach(btn => {
    btn.classList.toggle('selected', btn.textContent.trim() === age);
  });
  // 200ms 후 퀴즈 시작
  setTimeout(() => {
    answers  = new Array(16).fill(null);
    currentQ = 0;
    showScreen('screen-quiz');
    renderQuestion(0, 'none');
  }, 200);
}

// ─── 시작 / 재시도 ────────────────────────────
function startQuiz() {
  selectedAge = '';
  showScreen('screen-age');
}
function retryQuiz() { startQuiz(); }

// ─── 챕터 조회 ────────────────────────────────
function getChapter(idx) {
  return CHAPTERS.find(c => idx >= c.range[0] && idx <= c.range[1]);
}

// ══════════════════════════════════════════════
// 이미지 캐시 시스템
// ══════════════════════════════════════════════
const imgCache = new Map();

function preloadImage(src) {
  if (!src || imgCache.has(src)) return Promise.resolve();
  return new Promise(resolve => {
    const img = new Image();
    img.onload  = () => { imgCache.set(src, img); resolve(); };
    img.onerror = () => { resolve(); };
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

  setEl('chapter-label-text', ch ? (currentLang==='en' ? ch.name_en : ch.name) : '');
  applyChapterColor(idx);

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

// ─── 카드 콘텐츠 갱신 (A/B 슬롯 swap) ────────
let _activeSlot = 'a';

function updateCardContent(q, idx) {
  const sitEl = document.getElementById('q-situation');
  const txtEl = document.getElementById('q-text');
  if (sitEl) sitEl.textContent = currentLang === 'en' ? q.situation_en : q.situation;
  if (txtEl) {
    txtEl.innerHTML = `<span class="q-number">Q${idx + 1}.</span> ${currentLang === 'en' ? q.text_en : q.text}`;
  }

  const slotA = document.getElementById('illust-slot-a');
  const slotB = document.getElementById('illust-slot-b');
  if (!slotA || !slotB) return;

  const nextSlot = _activeSlot === 'a' ? slotB : slotA;
  const curSlot  = _activeSlot === 'a' ? slotA : slotB;
  const src = q.illust;

  function swapSlots() {
    nextSlot.style.opacity = '1';
    curSlot.style.opacity  = '0';
    _activeSlot = _activeSlot === 'a' ? 'b' : 'a';
  }

  if (imgCache.has(src)) {
    nextSlot.src = src;
    nextSlot.alt = `Q${idx + 1}`;
    swapSlots();
  } else {
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
      `<div class="option-text">${currentLang === 'en' ? q[l].text_en : q[l].text}</div>`;
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
  if (currentQ === 0) { showScreen('screen-age'); }
  else { currentQ--; renderQuestion(currentQ, 'prev'); }
}

// ─── 로딩 → 결과 ──────────────────────────────
async function goToLoading() {
  showScreen('screen-loading');
  const rect = document.getElementById('wine-fill-rect');
  if (rect) {
    rect.style.animation = 'none';
    void rect.getBoundingClientRect();
    rect.style.animation = '';
  }
  setTimeout(async () => {
    resultCode = calcResult();
    renderResult(resultCode);
    showScreen('screen-result');
    // Supabase 저장 (비동기, UI 블로킹 없음)
    await saveToSupabase(resultCode, selectedAge);
  }, 2200);
}

// ─── 챕터 색상 ────────────────────────────────
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

  // ── 코드 표시 (로고 대신) ──
  setEl('result-code-display', code);

  // ── 캐릭터 ──
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

  setEl('result-char-name',   currentLang === 'en' ? r.name_en    : r.name);
  setEl('result-char-origin', toOriginCase(r.origin));

  // ── TASTE PROFILE — 중앙 양방향 게이지 ──
  // 4축 정의: key, 레이블, lo쪽(코드값), hi쪽(코드값), 챕터 컬러
  const _en = currentLang === 'en';
  // axes 수치 실제 의미:
  //   sweet   = S(스위트)  방향 강도 → rawCode:'S'
  //   tannin  = T(강한)    방향 강도 → rawCode:'T'
  //   acidity = F(높은산미) 방향 강도 → rawCode:'F'
  //   body    = B(풀바디)  방향 강도 → rawCode:'B'
  const axDefs = [
    { key:'sweet',   rawCode:'S', label:_en?'Sweetness':'당도',  lo:_en?'Sweet':'스위트',    loCode:'S', hi:_en?'Dry':'드라이',          hiCode:'D', color:'#1a3a2a' },
    { key:'tannin',  rawCode:'T', label:_en?'Tannin':'타닌',     lo:_en?'Smooth':'부드러운', loCode:'L', hi:_en?'Strong':'강한',         hiCode:'T', color:'#6b1f2a' },
    { key:'acidity', rawCode:'F', label:_en?'Acidity':'산미',    lo:_en?'Low':'낮음',        loCode:'E', hi:_en?'High':'높음',           hiCode:'F', color:'#7a5c1e' },
    { key:'body',    rawCode:'B', label:_en?'Body':'바디감',      lo:_en?'Light':'라이트',    loCode:'W', hi:_en?'Full Body':'풀바디',    hiCode:'B', color:'#2a3a5a' }
  ];

  // 코드에서 각 축 우세 방향 파악
  const codeMap = {
    sweet:   code[0],   // S or D
    tannin:  code[1],   // T or L
    acidity: code[2],   // F or E
    body:    code[3]    // B or W
  };

  const axesEl = document.getElementById('result-axes');
  if (axesEl) {
    axesEl.innerHTML = axDefs.map((ax, i) => {
      // axes 수치(rawPct)는 rawCode 방향의 강도
      // rawCode가 loCode이면: lo방향=rawPct, hi방향=100-rawPct
      // rawCode가 hiCode이면: hi방향=rawPct, lo방향=100-rawPct
      const rawPct   = r.axes[ax.key];
      const dominant = codeMap[ax.key];

      const isRawLo = (ax.rawCode === ax.loCode);  // rawPct가 lo방향인지
      const loW = isRawLo ? rawPct       : (100 - rawPct);
      const hiW = isRawLo ? (100-rawPct) : rawPct;

      // dominant가 loCode면 lo쪽이 우세
      const isLoDominant = (dominant === ax.loCode);

      const loPct = loW;
      const hiPct = hiW;

      // 볼드/컬러 클래스
      const loPctCls  = isLoDominant  ? 'rc-axis-pct-lo dominant'     : 'rc-axis-pct-lo';
      const hiPctCls  = !isLoDominant ? 'rc-axis-pct-hi dominant'     : 'rc-axis-pct-hi';
      const loLblCls  = isLoDominant  ? 'rc-axis-label-lo dominant'   : 'rc-axis-label-lo';
      const hiLblCls  = !isLoDominant ? 'rc-axis-label-hi dominant'   : 'rc-axis-label-hi';

      return `
      <div class="rc-axis-item">
        <span class="rc-axis-name">${i+1}. ${ax.label}</span>
        <div class="rc-axis-bar-row">
          <!-- 좌: lo 퍼센트 + 레이블 -->
          <div class="rc-axis-left-block">
            <span class="${loPctCls}" style="--axis-color:${ax.color}">${loPct}%</span>
            <span class="${loLblCls}" style="--axis-color:${ax.color}">${ax.lo}</span>
          </div>
          <!-- 중앙: 게이지 바 -->
          <div class="rc-axis-bar-track">
            <div class="rc-axis-bar-center"></div>
            <div class="rc-axis-bar-lo" style="width:${loW/2}%; background:${ax.color};"></div>
            <div class="rc-axis-bar-hi" style="width:${hiW/2}%; background:${ax.color};"></div>
          </div>
          <!-- 우: 레이블 + hi 퍼센트 -->
          <div class="rc-axis-right-block">
            <span class="${hiPctCls}" style="--axis-color:${ax.color}">${hiPct}%</span>
            <span class="${hiLblCls}" style="--axis-color:${ax.color}">${ax.hi}</span>
          </div>
        </div>
      </div>`;
    }).join('');
  }

  setEl('result-feature', currentLang === 'en' ? r.feature_en : r.feature);

  // ── 와인 추천 ──
  const w = r.wine || { name:'—', origin:'—', feature:'—' };
  const wineImg = document.getElementById('result-wine-img-1');
  if (wineImg) {
    wineImg.style.display = 'block';
    wineImg.onerror = () => { wineImg.style.display = 'none'; };
    wineImg.onload  = () => { wineImg.style.display = 'block'; };
    wineImg.src = `images/wines/${code}.png`;
  }
  setEl('result-wine1-name',    currentLang === 'en' ? (w.name_en || w.name) : w.name);
  setEl('result-wine1-origin',  toOriginCase(w.origin || '—'));
  setEl('result-wine1-feature', currentLang === 'en' ? (w.feature_en || w.feature) : w.feature);

  const wine2El = document.getElementById('rc-wine-2');
  if (wine2El) wine2El.style.display = 'none';

  const now = new Date();
  setEl('result-date',
    currentLang === 'en'
      ? `${now.getFullYear()}.${pad(now.getMonth()+1)}.${pad(now.getDate())} – WINE WORKS`
      : `${now.getFullYear()}.${pad(now.getMonth()+1)}.${pad(now.getDate())} – WINE WORKS`);
}

// ─── 와인 팝업 ────────────────────────────────
function openWinePopup() {
  const r = results[resultCode] || results['DLEW'];
  const w = r.wine || {};

  // 팝업 이미지
  const popImg = document.getElementById('popup-wine-img');
  if (popImg) {
    popImg.src = `images/wines/${resultCode}.png`;
    popImg.onerror = () => { popImg.style.display = 'none'; };
  }

  setEl('popup-wine-name',    currentLang === 'en' ? (w.name_en || w.name || '—') : (w.name || '—'));
  setEl('popup-wine-origin',  toOriginCase(w.origin  || '—'));
  setEl('popup-wine-grape',   w.grape   || '');
  setEl('popup-wine-tasting', currentLang === 'en' ? (w.tasting_note_en || w.tasting_note || '—') : (w.tasting_note || '—'));
  setEl('popup-wine-pairing', currentLang === 'en' ? (w.pairing_en || w.pairing || '—') : (w.pairing || '—'));
  setEl('popup-wine-price',   w.price_range  ? `💰 ${w.price_range}` : '');

  const popup = document.getElementById('wine-popup');
  if (popup) popup.style.display = 'flex';
}

function closeWinePopup() {
  const popup = document.getElementById('wine-popup');
  if (popup) popup.style.display = 'none';
}

// ─── 유틸 ────────────────────────────────────
function toOriginCase(str) {
  return str.toLowerCase().replace(/(^|[\s/·])([^\s])/g, (_, sep, ch) => sep + ch.toUpperCase());
}
function setEl(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}
function pad(n) { return String(n).padStart(2,'0'); }


// ─── 공유 팝업 ───────────────────────────────
function openSharePopup() {
  updateSharePopupLang();
  const popup = document.getElementById('share-popup');
  if (popup) popup.style.display = 'flex';
}
function closeSharePopup() {
  const popup = document.getElementById('share-popup');
  if (popup) popup.style.display = 'none';
}

// 카카오톡 공유
function shareKakao() {
  const r = results[resultCode] || results['DLEW'];
  if (typeof Kakao === 'undefined' || !Kakao.isInitialized()) {
    const ko = currentLang === 'ko';
    showToast(ko ? '카카오 키를 설정해주세요' : 'Kakao key not configured');
    return;
  }
  const ko = currentLang === 'ko';
  Kakao.Share.sendDefault({
    objectType: 'feed',
    content: {
      title: ko ? `나의 WBTI는 ${resultCode}! ${r.name}` : `My WBTI is ${resultCode}! ${r.name_en || r.name}`,
      description: ko
        ? '나만의 와인 취향을 찾아보세요 🍷'
        : 'Find your perfect wine match 🍷',
      imageUrl: WBTI_URL + 'images/cover_bg.png',
      link: { mobileWebUrl: WBTI_URL, webUrl: WBTI_URL }
    },
    buttons: [{
      title: ko ? 'WBTI 테스트 하기' : 'Take the WBTI Test',
      link:  { mobileWebUrl: WBTI_URL, webUrl: WBTI_URL }
    }]
  });
  closeSharePopup();
}

// 인스타그램 공유 (Web Share API로 링크 공유)
function shareToInstagram() {
  const r  = results[resultCode] || results['DLEW'];
  const ko = currentLang === 'ko';
  const text = ko
    ? `나의 WBTI는 ${resultCode}! ${r.name}
${WBTI_URL}
#WBTI #와인취향 #나의첫와인`
    : `My WBTI is ${resultCode}! ${r.name_en || r.name}
${WBTI_URL}
#WBTI #WineTaste`;

  if (navigator.share) {
    navigator.share({ title: 'WBTI', text, url: WBTI_URL })
      .then(() => closeSharePopup())
      .catch(e => { if (e.name !== 'AbortError') console.error(e); });
  } else {
    // 미지원 시 링크 복사 fallback
    navigator.clipboard.writeText(WBTI_URL).then(() => {
      showToast(ko ? '링크가 복사됐어요! 인스타에 붙여넣기 해주세요 📸' : 'Link copied! Paste it on Instagram 📸');
      closeSharePopup();
    });
  }
}

// 링크 복사
function copyLink() {
  const ko = currentLang === 'ko';
  navigator.clipboard.writeText(WBTI_URL).then(() => {
    showToast(ko ? '링크가 복사됐어요! 🔗' : 'Link copied! 🔗');
    closeSharePopup();
  }).catch(() => {
    showToast(ko ? '복사에 실패했어요.' : 'Failed to copy.');
  });
}

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
// ══════════════════════════════════════════════
async function buildShareCanvas() {
  const card = document.getElementById('receipt-card');
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

  const PAD_X = 60, PAD_Y = 80;
  const out   = document.createElement('canvas');
  out.width   = cardCanvas.width  + PAD_X * 2;
  out.height  = cardCanvas.height + PAD_Y * 2;
  const ctx   = out.getContext('2d');

  ctx.fillStyle = '#F5F5F5';
  ctx.fillRect(0, 0, out.width, out.height);
  ctx.drawImage(cardCanvas, PAD_X, PAD_Y);

  ctx.font      = '32px "Share Tech Mono", monospace';
  ctx.fillStyle = 'rgba(26,58,42,.25)';
  ctx.textAlign = 'center';
  ctx.fillText('WBTI · Wine Base Taste Index', out.width / 2, out.height - 28);

  return out;
}

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

// ─── 앱 시작 ─────────────────────────────────
preloadAllImages();
initKakao();