// =============================================
// WBTI - Wine Base Taste Index
// 4축: 당도(S/D) / 타닌(T/L) / 산미(F/E) / 바디감(B/W)
// S=스위트  D=드라이
// T=강한타닌  L=부드러운타닌
// F=높은산미  E=낮은산미
// B=풀바디  W=라이트바디
// 결과 코드 = S/D + T/L + F/E + B/W
// =============================================

const CHAPTERS = [
  { name: "Chapter 1. 당도",   range: [0, 3]  },
  { name: "Chapter 2. 타닌",   range: [4, 7]  },
  { name: "Chapter 3. 산미",   range: [8, 11] },
  { name: "Chapter 4. 바디감", range: [12, 15] }
];

const questions = [

  // ── Chapter 1. 당도 (Q0~Q3) ──────────────────────────

  {
    situation: "영화관에서 팝콘을 고르려는 순간.",
    text: "어느쪽으로 손이 가나요?",
    illust: "images/illustrations/q01_popcorn.png",
    A: { text: "달콤한 버터 카라멜 팝콘", val: "S" },
    B: { text: "짭짤한 체다 팝콘", val: "D" }
  },
  {
    situation: "브런치 집에 갔을 때.",
    text: "어떤 메뉴가 더 당기나요?",
    illust: "images/illustrations/q02_brunch.png",
    A: { text: "메이플 시럽이 올라간 팬케이크", val: "S" },
    B: { text: "아보카도와 홀랜다이즈 소스가 올라간 에그베네딕트", val: "D" }
  },
  {
    situation: "야식을 먹으려고 치킨을 주문할 때.",
    text: "어떤 치킨을 선택하나요?",
    illust: "images/illustrations/q03_chicken.png",
    A: { text: "매콤 달콤한 양념치킨", val: "S" },
    B: { text: "담백한 후라이드치킨", val: "D" }
  },
  {
    situation: "더운 여름 편의점에서 음료를 고를 때.",
    text: "어떤 음료에 손이 가나요?",
    illust: "images/illustrations/q04_drink.png",
    A: { text: "콜라, 사이다 같은 청량감 있는 음료", val: "S" },
    B: { text: "헛개차, 보리차 등의 달지 않은 고소한 음료", val: "D" }
  },

  // ── Chapter 2. 타닌 (Q4~Q7) ──────────────────────────

  {
    situation: "편의점에서 초콜릿을 하나 고른다면.",
    text: "당신의 손은 어디로 향하나요?",
    illust: "images/illustrations/q05_chocolate.png",
    A: { text: "카카오 함량이 높고 뒷맛이 깔끔한 다크 초콜릿", val: "T" },
    B: { text: "달콤하고 부드러운 밀크 초콜릿", val: "L" }
  },
  {
    situation: "간식 시간, 견과류가 눈에 들어옵니다.",
    text: "어떤 견과류가 더 땡기나요?",
    illust: "images/illustrations/q06_nuts.png",
    A: { text: "겉질과 함께 먹는 호두, 아몬드", val: "T" },
    B: { text: "고소하고 부드러운 마카다미아, 캐슈넛", val: "L" }
  },
  {
    situation: "쉬는 날 오후, 따뜻한 차 한잔이 마시고 싶은 당신.",
    text: "어떤 차가 더 끌리나요?",
    illust: "images/illustrations/q07_tea.png",
    A: { text: "떫은 맛 나는 진한 홍차, 보이차", val: "T" },
    B: { text: "부드럽고 향긋한 라벤더, 캐모마일차", val: "L" }
  },
  {
    situation: "삼겹살 집에서 고기가 구워지고 있어요.",
    text: "어떤 고기가 더 끌리나요?",
    illust: "images/illustrations/q08_bbq.png",
    A: { text: "토치로 강하게 불맛 입힌 겉바속촉 삼겹살", val: "T" },
    B: { text: "약불에 천천히 구워 부드러운 갈비살", val: "L" }
  },

  // ── Chapter 3. 산미 (Q8~Q11) ──────────────────────────

  {
    situation: "마트 과일 코너에서 딱 하나만 골라야 한다면.",
    text: "어느쪽이 끌리나요?",
    illust: "images/illustrations/q09_fruit.png",
    A: { text: "새콤한 자몽, 키위", val: "F" },
    B: { text: "달콤한 망고, 바나나 같은 열대과일", val: "E" }
  },
  {
    situation: "샐러드 전문점에서 드레싱을 고르는 중입니다.",
    text: "어떤 드레싱이 더 당기나요?",
    illust: "images/illustrations/q10_salad.png",
    A: { text: "레몬, 발사믹의 새콤하고 상큼한 드레싱", val: "F" },
    B: { text: "참기름, 간장의 고소하고 진한 드레싱", val: "E" }
  },
  {
    situation: "냉면집에 갔습니다. 테이블에 식초가 있는데.",
    text: "어떻게 하나요?",
    illust: "images/illustrations/q11_naengmyeon.png",
    A: { text: "식초를 듬뿍 넣어 새콤하게 먹는다", val: "F" },
    B: { text: "아무것도 넣지 않고 그대로 먹는다", val: "E" }
  },
  {
    situation: "텐동집에 갔습니다.",
    text: "텐푸라를 어떻게 드시나요?",
    illust: "images/illustrations/q12_tempura.png",
    A: { text: "상큼한 레몬을 뿌려 먹는다", val: "F" },
    B: { text: "간장에만 찍어 먹는다", val: "E" }
  },

  // ── Chapter 4. 바디감 (Q12~Q15) ──────────────────────

  {
    situation: "치킨 배달이 도착했습니다!",
    text: "치킨 옆에 딱 어울리는 음료는 뭔가요?",
    illust: "images/illustrations/q13_beer.png",
    A: { text: "목 넘김이 묵직한 호가든 같은 에일맥주", val: "B" },
    B: { text: "카스, 테라, 파로니 같은 청량하고 가벼운 라거맥주", val: "W" }
  },
  {
    situation: "목이 너무 마르던 찰나 커피숍에 들어갔습니다.",
    text: "어떤 음료를 시키나요?",
    illust: "images/illustrations/q14_coffee.png",
    A: { text: "시원하고 쌉싸름한 아메리카노", val: "B" },
    B: { text: "시원하고 고소한 라떼", val: "W" }
  },
  {
    situation: "추운 겨울날 국물 요리를 주문했어요.",
    text: "어떤 국물이 더 당기나요?",
    illust: "images/illustrations/q15_soup.png",
    A: { text: "뼈를 오래 우린 진하고 걸쭉한 설렁탕, 곰탕", val: "B" },
    B: { text: "맑고 시원하게 넘어가는 북엇국, 콩나물국", val: "W" }
  },
  {
    situation: "파스타 집에서 메뉴판을 펼쳤습니다.",
    text: "오늘 당기는 파스타는?",
    illust: "images/illustrations/q16_pasta.png",
    A: { text: "크림이 가득한 묵직한 알프레도 파스타", val: "B" },
    B: { text: "오일, 토마토 베이스의 가볍게 산뜻한 파스타", val: "W" }
  }
];

// =============================================
// 16가지 결과값
// axes 수치는 해당 와인 품종의 실제 특성 기반
// wine: 소믈리에 추천 1종
// =============================================

const results = {

  // S(달콤) + T(강타닌) + F(높은산미) + B(풀바디)
  STFB: {
    name: "이탈리아에서 온 건포도",
    origin: "ITALY·VENETO / AMARONE DELLA VALPOLICELLA",
    feature: "포도를 말려서 만든 농밀하고 달콤하고 집중력 높은 자두",
    fruit: "🫐",
    axes: { sweet: 88, tannin: 90, acidity: 72, body: 95 },
    wine: {
      name: "안토리니 아마로네 델라 발폴리첼라 클라시코",
      origin: "ITALY · VENETO",
      feature: "포도를 건조시켜 만든 농밀하고 복잡한 풀바디 레드. 진한 자두와 초콜릿 향이 인상적입니다."
    }
  },

  // S(달콤) + T(강타닌) + F(높은산미) + W(라이트바디)
  STFW: {
    name: "이탈리아에서 온 새콤한 체리",
    origin: "ITALY / LAMBRUSCO DOLCE",
    feature: "체리향의 달콤함에 살짝 떫은 타닌과 상큼한 기포, 가볍게 즐기는 달콤한 레드",
    fruit: "🍒",
    axes: { sweet: 85, tannin: 70, acidity: 75, body: 32 },
    wine: {
      name: "루사 람브루스코 돌체 에밀리아",
      origin: "ITALY · EMILIA",
      feature: "체리와 딸기의 달콤한 향, 부드러운 거품과 함께 즐기는 가볍고 사랑스러운 레드 스파클링."
    }
  },

  // S(달콤) + T(강타닌) + E(낮은산미) + B(풀바디)
  STEB: {
    name: "포르투갈에서 온 진한 블랙 베리",
    origin: "PORTUGAL·DOURO VALLEY / PORT",
    feature: "블랙베리, 자두의 달콤함과 강렬한 타닌, 고알콜과 풀바디로 묵직한 마무리",
    fruit: "🫐",
    axes: { sweet: 90, tannin: 88, acidity: 28, body: 93 },
    wine: {
      name: "다우 포트 파인 토니",
      origin: "PORTUGAL · DOURO VALLEY",
      feature: "견과류와 카라멜의 달콤한 향, 오크 숙성의 깊은 풍미가 인상적인 포르투갈의 대표 강화 와인."
    }
  },

  // S(달콤) + T(강타닌) + E(낮은산미) + W(라이트바디)
  STEW: {
    name: "이탈리아에서 온 달콤한 딸기",
    origin: "ITALY·PIEMONTE / BRACHETTO D'ACQUI",
    feature: "딸기, 장미향의 달콤함과 은은한 타닌, 가볍고 사랑스러운 레드 스파클링",
    fruit: "🍓",
    axes: { sweet: 88, tannin: 65, acidity: 30, body: 28 },
    wine: {
      name: "브라이다 브라케토 다퀴",
      origin: "ITALY · PIEMONTE",
      feature: "딸기와 장미의 향긋한 달콤함. 가볍고 로맨틱한 분위기의 레드 스파클링 와인."
    }
  },

  // S(달콤) + L(부드러운타닌) + F(높은산미) + B(풀바디)
  SLFB: {
    name: "프랑스에서 온 귀부 와인",
    origin: "FRANCE·BORDEAUX / SAUTERNES",
    feature: "살구, 배 등의 농밀한 단맛, 부드럽고 풀바디로 감싸는 귀부 와인의 여왕",
    fruit: "🍐",
    axes: { sweet: 95, tannin: 15, acidity: 78, body: 85 },
    wine: {
      name: "샤토 쉬드로 (프리미에 크루 클라세)",
      origin: "FRANCE · BORDEAUX / SAUTERNES",
      feature: "꿀, 살구, 배의 풍성한 단맛과 생기 있는 산미. 귀부 와인 최고의 밸런스를 보여줍니다."
    }
  },

  // S(달콤) + L(부드러운타닌) + F(높은산미) + W(라이트바디)
  SLFW: {
    name: "독일에서 온 달콤한 리치",
    origin: "GERMANY / RIESLING SPATLESE",
    feature: "파인애플 등의 풍부한 열대과일향과 신선한 산미, 달맛의 아름다운 조화",
    fruit: "🍋",
    axes: { sweet: 82, tannin: 12, acidity: 80, body: 30 },
    wine: {
      name: "샤르츠호프베리크 리슬링 슈페트레제",
      origin: "GERMANY · MOSEL",
      feature: "열대과일과 꽃향의 달콤함, 팽팽한 산미와의 아름다운 조화. 독일 리슬링의 정수."
    }
  },

  // S(달콤) + L(부드러운타닌) + E(낮은산미) + B(풀바디)
  SLEB: {
    name: "프랑스에서 온 열대과일",
    origin: "FRANCE·ALSACE / GEWURZTRAMINER",
    feature: "리치, 복숭아, 장미 등의 아름다운 향긋한 풍미를 가진 와인",
    fruit: "🍊",
    axes: { sweet: 80, tannin: 14, acidity: 32, body: 78 },
    wine: {
      name: "멘 쇼피트 게뷔르츠트라미너",
      origin: "FRANCE · ALSACE",
      feature: "리치, 장미, 향신료의 화려하고 이국적인 향. 개성 넘치는 알자스의 대표 품종."
    }
  },

  // S(달콤) + L(부드러운타닌) + E(낮은산미) + W(라이트바디)
  SLEW: {
    name: "이탈리아에서 온 상큼한 복숭아",
    origin: "ITALY·PIEMONTE / MOSCATO D'ASTI",
    feature: "복숭아, 살구의 달콤함과 가볍고 사랑스러운 스위트 스파클링",
    fruit: "🍑",
    axes: { sweet: 90, tannin: 10, acidity: 38, body: 25 },
    wine: {
      name: "친제토 모스카토 다스티",
      origin: "ITALY · PIEMONTE",
      feature: "복숭아와 꽃향의 달콤하고 가벼운 스파클링. 디저트와 함께하기 완벽한 와인."
    }
  },

  // D(드라이) + T(강타닌) + F(높은산미) + B(풀바디)
  DTFB: {
    name: "칠레에서 온 블랙커런트",
    origin: "CHILE·MAIPO VALLEY / CABERNET FRANC",
    feature: "베리, 블루베리류의 농익은 과일향과 민트, 유칼립투스 등의 상큼한 허브향",
    fruit: "🫐",
    axes: { sweet: 12, tannin: 90, acidity: 82, body: 90 },
    wine: {
      name: "하라즈 드 피브르 갈란타스 카베르네 프랑 그랑 레세르바",
      origin: "CHILE · MAIPO VALLEY",
      feature: "블랙베리와 카시스의 농밀한 과일향, 민트와 허브의 청량함이 어우러진 파워풀한 레드."
    }
  },

  // D(드라이) + T(강타닌) + F(높은산미) + W(라이트바디)
  DTFW: {
    name: "이탈리아에서 온 새콤한 붉은 체리",
    origin: "ITALY·TOSCANA / SANGIOVESE",
    feature: "두, 체리의 드라이한 과일향에 또렷한 타닌과 산미, 이탈리안 식탁의 단짝",
    fruit: "🍒",
    axes: { sweet: 12, tannin: 80, acidity: 82, body: 38 },
    wine: {
      name: "모리스팡 만드리올로 마렘마 토스카나",
      origin: "ITALY · TOSCANA",
      feature: "체리와 자두의 드라이한 과일향, 또렷한 타닌과 산미. 이탈리안 식사와 완벽한 마리아주."
    }
  },

  // D(드라이) + T(강타닌) + E(낮은산미) + B(풀바디)
  DTEB: {
    name: "프랑스에서 온 블랙 체리",
    origin: "AUSTRALIA·BAROSSA VALLEY / SHIRAZ",
    feature: "진한 블루베리와 독특한 후추향, 술인듯한 과실미 스테이크와 최고의 궁합",
    fruit: "🫐",
    axes: { sweet: 14, tannin: 88, acidity: 30, body: 92 },
    wine: {
      name: "킹스 오브 프로히비션 쉬라즈",
      origin: "AUSTRALIA · BAROSSA VALLEY",
      feature: "블루베리와 후추의 강렬한 풍미, 벨벳같은 타닌. 스테이크와 최고의 궁합을 자랑하는 풀바디."
    }
  },

  // D(드라이) + T(강타닌) + E(낮은산미) + W(라이트바디)
  DTEW: {
    name: "프랑스에서 온 레드 체리",
    origin: "FRANCE·BOURGOGNE / PINOT NOIR",
    feature: "은 계통의 베리류와 버섯, 나무향 등 신선하면서 복합미 좋은 가벼운 레드",
    fruit: "🍒",
    axes: { sweet: 13, tannin: 72, acidity: 32, body: 36 },
    wine: {
      name: "샹피 부르고뉴 피노누아",
      origin: "FRANCE · BOURGOGNE",
      feature: "체리와 라즈베리의 우아한 과일향, 실크같은 타닌. 부르고뉴 피노 누아의 섬세한 매력."
    }
  },

  // D(드라이) + L(부드러운타닌) + F(높은산미) + B(풀바디)
  DLFB: {
    name: "프랑스에서 온 허브를 감싼 체리",
    origin: "FRANCE·RHONE / GRENACHE",
    feature: "레드 체리, 야생딸기 등의 허브향 가득, 숙성할수록 매력적인 레드",
    fruit: "🍒",
    axes: { sweet: 14, tannin: 28, acidity: 80, body: 82 },
    wine: {
      name: "안드레 브루닐 그르나슈",
      origin: "FRANCE · RHONE",
      feature: "레드 체리와 야생 허브의 싱그러운 향. 숙성될수록 깊어지는 론 지방의 매력적인 레드."
    }
  },

  // D(드라이) + L(부드러운타닌) + F(높은산미) + W(라이트바디)
  DLFW: {
    name: "뉴질랜드에서 온 상큼한 자몽",
    origin: "NEW ZEALAND·MARLBOROUGH / SAUVIGNON BLANC",
    feature: "자몽, 라임 등의 강렬한 시트러스 풍미와 섬세하고 팽팽한 산미",
    fruit: "🍋",
    axes: { sweet: 10, tannin: 10, acidity: 92, body: 28 },
    wine: {
      name: "옐랜드 말보로 소비뇽 블랑",
      origin: "NEW ZEALAND · MARLBOROUGH",
      feature: "자몽과 라임의 강렬한 시트러스 향, 팽팽한 산미. 뉴질랜드 소비뇽 블랑의 청량한 정수."
    }
  },

  // D(드라이) + L(부드러운타닌) + E(낮은산미) + B(풀바디)
  DLEB: {
    name: "프랑스에서 온 핵과일",
    origin: "FRANCE·RHONE / VIOGNIER",
    feature: "살구, 복숭아, 모과 등 아름다운 핵과일 풍미와 반전되는 바디감의 화이트",
    fruit: "🍑",
    axes: { sweet: 16, tannin: 14, acidity: 30, body: 85 },
    wine: {
      name: "샤토 뒤 트리옹 비오니에",
      origin: "FRANCE · RHONE",
      feature: "살구와 복숭아의 풍성한 핵과일 향, 꽃향기와 함께 묵직하게 마무리되는 개성 있는 화이트."
    }
  },

  // D(드라이) + L(부드러운타닌) + E(낮은산미) + W(라이트바디)
  DLEW: {
    name: "이탈리아에서 온 음식 친화적인 와인",
    origin: "ITALY·CAMPANIA / FIANO",
    feature: "헤이즐넛 등의 고소한 풍미와 배, 복숭아 등의 핵과일의 조화",
    fruit: "🍇",
    axes: { sweet: 11, tannin: 10, acidity: 36, body: 26 },
    wine: {
      name: "이 본조르노 살렌토 피아노",
      origin: "ITALY · CAMPANIA",
      feature: "헤이즐넛의 고소함과 복숭아, 배의 부드러운 핵과일 향. 어떤 음식과도 잘 어울리는 이탈리아의 친근한 화이트."
    }
  }
};