// =============================================
// WBTI — data.js  (bilingual: ko / en)
// =============================================

const CHAPTERS = [
  { name: 'Chapter 1. 당도',   name_en: 'Chapter 1. Sweetness', range: [0, 3]  },
  { name: 'Chapter 2. 타닌',   name_en: 'Chapter 2. Tannin',    range: [4, 7]  },
  { name: 'Chapter 3. 산미',   name_en: 'Chapter 3. Acidity',   range: [8, 11] },
  { name: 'Chapter 4. 바디감', name_en: 'Chapter 4. Body',      range: [12, 15] }
];

const questions = [

  // ── Chapter 1. 당도 ──────────────────────────
  {
    situation:    '영화관에서 팝콘을 고르려는 순간.',
    situation_en: 'You\'re about to grab popcorn at the movies.',
    text:    '어느쪽으로 손이 가나요?',
    text_en: 'Which one do you reach for?',
    illust: 'images/illustrations/q01_popcorn.png',
    A: { text: '달콤한 버터 카라멜 팝콘',     text_en: 'Sweet butter caramel popcorn', val: 'S' },
    B: { text: '짭짤한 체다 팝콘',             text_en: 'Salty cheddar popcorn',        val: 'D' }
  },
  {
    situation:    '브런치 집에 갔을 때.',
    situation_en: 'You\'re at a brunch café.',
    text:    '어떤 메뉴가 더 당기나요?',
    text_en: 'What sounds more appealing?',
    illust: 'images/illustrations/q02_brunch.png',
    A: { text: '메이플 시럽이 올라간 팬케이크',                       text_en: 'Pancakes drizzled with maple syrup',           val: 'S' },
    B: { text: '아보카도와 홀랜다이즈 소스가 올라간 에그베네딕트',   text_en: 'Eggs Benedict with avocado & hollandaise',      val: 'D' }
  },
  {
    situation:    '야식을 먹으려고 치킨을 주문할 때.',
    situation_en: 'You\'re ordering late-night fried chicken.',
    text:    '어떤 치킨을 선택하나요?',
    text_en: 'Which do you go for?',
    illust: 'images/illustrations/q03_chicken.png',
    A: { text: '매콤 달콤한 양념치킨', text_en: 'Sweet & spicy seasoned chicken', val: 'S' },
    B: { text: '담백한 후라이드치킨', text_en: 'Classic crispy fried chicken',    val: 'D' }
  },
  {
    situation:    '더운 여름 편의점에서 음료를 고를 때.',
    situation_en: 'It\'s a hot summer day. You stop by a convenience store.',
    text:    '어떤 음료에 손이 가나요?',
    text_en: 'What drink do you pick?',
    illust: 'images/illustrations/q04_drink.png',
    A: { text: '콜라, 사이다 같은 청량감 있는 음료',       text_en: 'A sweet, fizzy cola or soda',         val: 'S' },
    B: { text: '헛개차, 보리차 등의 달지 않은 고소한 음료', text_en: 'Unsweetened barley or herbal tea',    val: 'D' }
  },

  // ── Chapter 2. 타닌 ──────────────────────────
  {
    situation:    '편의점에서 초콜릿을 하나 고른다면.',
    situation_en: 'You\'re picking a chocolate bar at the store.',
    text:    '당신의 손은 어디로 향하나요?',
    text_en: 'Which do you reach for?',
    illust: 'images/illustrations/q05_chocolate.png',
    A: { text: '카카오 함량이 높고 뒷맛이 깔끔한 다크 초콜릿', text_en: 'High-cacao dark chocolate with a clean finish', val: 'T' },
    B: { text: '달콤하고 부드러운 밀크 초콜릿',               text_en: 'Sweet and creamy milk chocolate',               val: 'L' }
  },
  {
    situation:    '간식 시간, 견과류가 눈에 들어옵니다.',
    situation_en: 'Snack time — you spot a bowl of nuts.',
    text:    '어떤 견과류가 더 땡기나요?',
    text_en: 'Which do you prefer?',
    illust: 'images/illustrations/q06_nuts.png',
    A: { text: '겉질과 함께 먹는 호두, 아몬드',      text_en: 'Walnuts or almonds with their skin on',       val: 'T' },
    B: { text: '고소하고 부드러운 마카다미아, 캐슈넛', text_en: 'Buttery macadamia nuts or cashews',            val: 'L' }
  },
  {
    situation:    '쉬는 날 오후, 따뜻한 차 한잔이 마시고 싶은 당신.',
    situation_en: 'A lazy afternoon — you fancy a warm cup of tea.',
    text:    '어떤 차가 더 끌리나요?',
    text_en: 'Which sounds better?',
    illust: 'images/illustrations/q07_tea.png',
    A: { text: '떫은 맛 나는 진한 홍차, 보이차',    text_en: 'Bold, astringent black tea or pu-erh',    val: 'T' },
    B: { text: '부드럽고 향긋한 라벤더, 캐모마일차', text_en: 'Soft, fragrant lavender or chamomile tea', val: 'L' }
  },
  {
    situation:    '삼겹살 집에서 고기가 구워지고 있어요.',
    situation_en: 'The grill is sizzling at a Korean BBQ joint.',
    text:    '어떤 고기가 더 끌리나요?',
    text_en: 'Which cut catches your eye?',
    illust: 'images/illustrations/q08_bbq.png',
    A: { text: '토치로 강하게 불맛 입힌 겉바속촉 삼겹살', text_en: 'Pork belly torched for a bold, charred crust', val: 'T' },
    B: { text: '약불에 천천히 구워 부드러운 갈비살',     text_en: 'Short ribs slow-grilled until tender',          val: 'L' }
  },

  // ── Chapter 3. 산미 ──────────────────────────
  {
    situation:    '마트 과일 코너에서 딱 하나만 골라야 한다면.',
    situation_en: 'You can only pick one fruit at the market.',
    text:    '어느쪽이 끌리나요?',
    text_en: 'Which do you choose?',
    illust: 'images/illustrations/q09_fruit.png',
    A: { text: '새콤한 자몽, 키위',              text_en: 'Tangy grapefruit or kiwi',           val: 'F' },
    B: { text: '달콤한 망고, 바나나 같은 열대과일', text_en: 'Sweet tropical mango or banana',     val: 'E' }
  },
  {
    situation:    '샐러드 전문점에서 드레싱을 고르는 중입니다.',
    situation_en: 'You\'re choosing a dressing at a salad bar.',
    text:    '어떤 드레싱이 더 당기나요?',
    text_en: 'Which dressing appeals to you?',
    illust: 'images/illustrations/q10_salad.png',
    A: { text: '레몬, 발사믹의 새콤하고 상큼한 드레싱', text_en: 'Zesty lemon or balsamic vinaigrette',   val: 'F' },
    B: { text: '참기름, 간장의 고소하고 진한 드레싱',  text_en: 'Rich sesame oil and soy-based dressing', val: 'E' }
  },
  {
    situation:    '냉면집에 갔습니다. 테이블에 식초가 있는데.',
    situation_en: 'You\'re at a Korean cold noodle restaurant. There\'s vinegar on the table.',
    text:    '어떻게 하나요?',
    text_en: 'What do you do?',
    illust: 'images/illustrations/q11_naengmyeon.png',
    A: { text: '식초를 듬뿍 넣어 새콤하게 먹는다', text_en: 'Add a generous splash of vinegar',    val: 'F' },
    B: { text: '아무것도 넣지 않고 그대로 먹는다', text_en: 'Leave it as-is and enjoy the original flavor', val: 'E' }
  },
  {
    situation:    '텐동집에 갔습니다.',
    situation_en: 'You\'re at a tempura rice bowl restaurant.',
    text:    '텐푸라를 어떻게 드시나요?',
    text_en: 'How do you eat your tempura?',
    illust: 'images/illustrations/q12_tempura.png',
    A: { text: '상큼한 레몬을 뿌려 먹는다', text_en: 'Squeeze fresh lemon over it', val: 'F' },
    B: { text: '간장에만 찍어 먹는다',      text_en: 'Dip it simply in soy sauce', val: 'E' }
  },

  // ── Chapter 4. 바디감 ──────────────────────────
  {
    situation:    '치킨 배달이 도착했습니다!',
    situation_en: 'Your fried chicken delivery just arrived!',
    text:    '치킨 옆에 딱 어울리는 음료는 뭔가요?',
    text_en: 'What\'s your perfect drink pairing?',
    illust: 'images/illustrations/q13_beer.png',
    A: { text: '목 넘김이 묵직한 호가든 같은 에일맥주',    text_en: 'A full-bodied ale like Hoegaarden',        val: 'B' },
    B: { text: '카스, 테라, 파로니 같은 청량하고 가벼운 라거맥주', text_en: 'A light, crisp lager like Cass or Terra', val: 'W' }
  },
  {
    situation:    '목이 너무 마르던 찰나 커피숍에 들어갔습니다.',
    situation_en: 'You\'re parched and duck into a coffee shop.',
    text:    '어떤 음료를 시키나요?',
    text_en: 'What do you order?',
    illust: 'images/illustrations/q14_coffee.png',
    A: { text: '시원하고 쌉싸름한 아메리카노', text_en: 'A bold, bitter iced Americano', val: 'B' },
    B: { text: '시원하고 고소한 라떼',        text_en: 'A smooth, creamy iced latte',  val: 'W' }
  },
  {
    situation:    '추운 겨울날 국물 요리를 주문했어요.',
    situation_en: 'It\'s a cold winter day and you\'re ordering a hot soup dish.',
    text:    '어떤 국물이 더 당기나요?',
    text_en: 'Which broth sounds most comforting?',
    illust: 'images/illustrations/q15_soup.png',
    A: { text: '뼈를 오래 우린 진하고 걸쭉한 설렁탕, 곰탕', text_en: 'Rich, thick bone broth (seolleongtang or gomtang)', val: 'B' },
    B: { text: '맑고 시원하게 넘어가는 북엇국, 콩나물국',   text_en: 'Light, clear dried pollack or bean sprout soup',  val: 'W' }
  },
  {
    situation:    '파스타 집에서 메뉴판을 펼쳤습니다.',
    situation_en: 'You open the menu at a pasta restaurant.',
    text:    '오늘 당기는 파스타는?',
    text_en: 'What pasta are you feeling today?',
    illust: 'images/illustrations/q16_pasta.png',
    A: { text: '크림이 가득한 묵직한 알프레도 파스타',       text_en: 'Rich, heavy Alfredo pasta loaded with cream', val: 'B' },
    B: { text: '오일, 토마토 베이스의 가볍게 산뜻한 파스타', text_en: 'Light olive oil or fresh tomato-based pasta',  val: 'W' }
  }
];

// =============================================
// 결과 16종
// =============================================
const results = {

  STFB: {
    name:    '이탈리아에서 온 건포도',
    name_en: 'The Raisin from Italy',
    origin:  'ITALY·VENETO / AMARONE DELLA VALPOLICELLA',
    feature:    '포도를 말려서 만든 농밀하고 달콤하고 집중력 높은 자두',
    feature_en: 'Dense, sweet, and intensely focused with dried plum character — born from sun-dried grapes.',
    fruit: '🫐',
    axes: { sweet: 88, tannin: 90, acidity: 72, body: 95 },
    wine: {
      name: '안토리니 아마로네 델라 발폴리첼라 클라시코',
      name_en: 'Antolini Amarone della Valpolicella Classico',
      origin: 'ITALY · VENETO',
      feature:    '포도를 건조시켜 만든 농밀하고 복잡한 풀바디 레드. 진한 자두와 초콜릿 향이 인상적입니다.',
      feature_en: 'A dense, complex full-bodied red made from dried grapes. Impressive notes of dark plum and chocolate.',
      tasting_note:    '진한 자두, 블랙 체리, 다크 초콜릿의 농밀한 풍미. 오크 숙성으로 완성된 벨벳 같은 타닌.',
      tasting_note_en: 'Intense dark plum, black cherry, and dark chocolate. Velvety tannins refined through oak aging.',
      pairing:    '소고기 스테이크, 양고기 찜, 진한 치즈',
      pairing_en: 'Beef steak, braised lamb, aged hard cheese',
      grape: 'Corvina, Rondinella, Molinara',
      price_range: '10만원대'
    }
  },

  STFW: {
    name:    '이탈리아에서 온 새콤한 체리',
    name_en: 'The Sparkling Cherry from Italy',
    origin:  'ITALY / LAMBRUSCO DOLCE',
    feature:    '체리향의 달콤함에 살짝 떫은 타닌과 상큼한 기포, 가볍게 즐기는 달콤한 레드',
    feature_en: 'Sweet cherry aromas with a touch of tannin and lively bubbles — a playful, easy-drinking sweet red.',
    fruit: '🍒',
    axes: { sweet: 85, tannin: 70, acidity: 75, body: 32 },
    wine: {
      name: '루사 람브루스코 돌체 에밀리아',
      name_en: 'Lusa Lambrusco Dolce Emilia',
      origin: 'ITALY · EMILIA',
      feature:    '체리와 딸기의 달콤한 향, 부드러운 거품과 함께 즐기는 가볍고 사랑스러운 레드 스파클링.',
      feature_en: 'Sweet cherry and strawberry aromas with gentle bubbles — a light and lovable sparkling red.',
      tasting_note:    '체리와 딸기의 상큼한 달콤함, 은은한 탄산과 함께 부드럽게 넘어가는 가벼운 레드.',
      tasting_note_en: 'Fresh cherry and strawberry sweetness with soft bubbles and a smooth, easy finish.',
      pairing:    '과일 타르트, 초콜릿 디저트, 프로슈토',
      pairing_en: 'Fruit tart, chocolate desserts, prosciutto',
      grape: 'Lambrusco',
      price_range: '3~5만원대'
    }
  },

  STEB: {
    name:    '포르투갈에서 온 진한 블랙 베리',
    name_en: 'The Dark Blackberry from Portugal',
    origin:  'PORTUGAL·DOURO VALLEY / PORT',
    feature:    '블랙베리, 자두의 달콤함과 강렬한 타닌, 고알콜과 풀바디로 묵직한 마무리',
    feature_en: 'Blackberry and plum sweetness with intense tannins, high alcohol, and a full-bodied, weighty finish.',
    fruit: '🫐',
    axes: { sweet: 90, tannin: 88, acidity: 28, body: 93 },
    wine: {
      name: '다우 포트 파인 토니',
      name_en: 'Dow\'s Port Fine Tawny',
      origin: 'PORTUGAL · DOURO VALLEY',
      feature:    '견과류와 카라멜의 달콤한 향, 오크 숙성의 깊은 풍미가 인상적인 포르투갈의 대표 강화 와인.',
      feature_en: 'Sweet notes of nuts and caramel with deep oak-aged complexity — a signature Portuguese fortified wine.',
      tasting_note:    '블랙베리, 자두의 달콤함과 견과류·카라멜 향. 오크 숙성의 깊고 복잡한 풍미.',
      tasting_note_en: 'Blackberry and plum sweetness with walnut and caramel. Deep, complex oak-aged character.',
      pairing:    '블루치즈, 호두 케이크, 진한 초콜릿',
      pairing_en: 'Blue cheese, walnut cake, dark chocolate',
      grape: 'Touriga Nacional, Tinta Roriz',
      price_range: '5~8만원대'
    }
  },

  STEW: {
    name:    '이탈리아에서 온 달콤한 딸기',
    name_en: 'The Sweet Strawberry from Italy',
    origin:  'ITALY·PIEMONTE / BRACHETTO D\'ACQUI',
    feature:    '딸기, 장미향의 달콤함과 은은한 타닌, 가볍고 사랑스러운 레드 스파클링',
    feature_en: 'Sweet strawberry and rose aromas with gentle tannins — a light, charming sparkling red.',
    fruit: '🍓',
    axes: { sweet: 88, tannin: 65, acidity: 30, body: 28 },
    wine: {
      name: '브라이다 브라케토 다퀴',
      name_en: 'Braida Brachetto d\'Acqui',
      origin: 'ITALY · PIEMONTE',
      feature:    '딸기와 장미의 향긋한 달콤함. 가볍고 로맨틱한 분위기의 레드 스파클링 와인.',
      feature_en: 'Fragrant strawberry and rose sweetness. A light, romantic sparkling red wine.',
      tasting_note:    '딸기, 장미, 복숭아의 화사한 향기. 달콤하고 가벼운 탄산이 사랑스러운 스파클링.',
      tasting_note_en: 'Bright aromas of strawberry, rose, and peach. Sweet and light with lovely bubbles.',
      pairing:    '마카롱, 딸기 케이크, 생과일',
      pairing_en: 'Macarons, strawberry cake, fresh fruit',
      grape: 'Brachetto',
      price_range: '5~7만원대'
    }
  },

  SLFB: {
    name:    '프랑스에서 온 귀부 와인',
    name_en: 'The Noble Rot from France',
    origin:  'FRANCE·BORDEAUX / SAUTERNES',
    feature:    '살구, 배 등의 농밀한 단맛, 부드럽고 풀바디로 감싸는 귀부 와인의 여왕',
    feature_en: 'Dense sweetness of apricot and pear, enveloped in a soft, full-bodied embrace — the queen of noble rot wines.',
    fruit: '🍐',
    axes: { sweet: 95, tannin: 15, acidity: 78, body: 85 },
    wine: {
      name: '샤토 쉬드로 (프리미에 크루 클라세)',
      name_en: 'Château Suduiraut (Premier Cru Classé)',
      origin: 'FRANCE · BORDEAUX / SAUTERNES',
      feature:    '꿀, 살구, 배의 풍성한 단맛과 생기 있는 산미. 귀부 와인 최고의 밸런스를 보여줍니다.',
      feature_en: 'Rich honey, apricot, and pear sweetness with vibrant acidity — the finest balance in noble rot wines.',
      tasting_note:    '꿀, 살구, 오렌지 마멀레이드의 황금빛 단맛. 생기 있는 산미가 균형을 잡아주는 명품 디저트 와인.',
      tasting_note_en: 'Golden sweetness of honey, apricot, and orange marmalade, balanced by vibrant acidity.',
      pairing:    '푸아그라, 로크포르 치즈, 크렘 브륄레',
      pairing_en: 'Foie gras, Roquefort cheese, crème brûlée',
      grape: 'Sémillon, Sauvignon Blanc',
      price_range: '8만원대 이상'
    }
  },

  SLFW: {
    name:    '독일에서 온 달콤한 리치',
    name_en: 'The Sweet Lychee from Germany',
    origin:  'GERMANY / RIESLING SPATLESE',
    feature:    '파인애플 등의 풍부한 열대과일향과 신선한 산미, 달맛의 아름다운 조화',
    feature_en: 'Rich tropical fruit aromas like pineapple with fresh acidity — a beautiful harmony of sweetness.',
    fruit: '🍋',
    axes: { sweet: 82, tannin: 12, acidity: 80, body: 30 },
    wine: {
      name: '샤르츠호프베리크 리슬링 슈페트레제',
      name_en: 'Scharzhofberger Riesling Spätlese',
      origin: 'GERMANY · MOSEL',
      feature:    '열대과일과 꽃향의 달콤함, 팽팽한 산미와의 아름다운 조화. 독일 리슬링의 정수.',
      feature_en: 'Sweet tropical fruit and floral aromas in beautiful harmony with taut acidity — the essence of German Riesling.',
      tasting_note:    '복숭아, 살구, 리치의 풍성한 과일향. 달콤함과 산미의 완벽한 조화가 인상적인 독일 리슬링.',
      tasting_note_en: 'Lush aromas of peach, apricot, and lychee. Perfect sweet-acid balance — quintessential German Riesling.',
      pairing:    '아시안 요리, 매콤한 음식, 과일 디저트',
      pairing_en: 'Asian cuisine, spicy dishes, fruit desserts',
      grape: 'Riesling',
      price_range: '5~8만원대'
    }
  },

  SLEB: {
    name:    '프랑스에서 온 열대과일',
    name_en: 'The Tropical Fruit from France',
    origin:  'FRANCE·ALSACE / GEWURZTRAMINER',
    feature:    '리치, 복숭아, 장미 등의 아름다운 향긋한 풍미를 가진 와인',
    feature_en: 'A wine adorned with gorgeous aromas of lychee, peach, and rose.',
    fruit: '🍊',
    axes: { sweet: 80, tannin: 14, acidity: 32, body: 78 },
    wine: {
      name: '멘 쇼피트 게뷔르츠트라미너',
      name_en: 'Mann Schoffit Gewurztraminer',
      origin: 'FRANCE · ALSACE',
      feature:    '리치, 장미, 향신료의 화려하고 이국적인 향. 개성 넘치는 알자스의 대표 품종.',
      feature_en: 'Glamorous and exotic aromas of lychee, rose, and spice — the defining variety of Alsace.',
      tasting_note:    '리치, 장미, 망고의 이국적인 향기. 달콤하면서도 풍성한 바디가 특별한 경험을 선사.',
      tasting_note_en: 'Exotic aromas of lychee, rose, and mango. Sweet yet full-bodied for a truly special experience.',
      pairing:    '태국 요리, 향신료 요리, 복숭아 타르트',
      pairing_en: 'Thai cuisine, spiced dishes, peach tart',
      grape: 'Gewurztraminer',
      price_range: '5~7만원대'
    }
  },

  SLEW: {
    name:    '이탈리아에서 온 상큼한 복숭아',
    name_en: 'The Fresh Peach from Italy',
    origin:  'ITALY·PIEMONTE / MOSCATO D\'ASTI',
    feature:    '복숭아, 살구의 달콤함과 가볍고 사랑스러운 스위트 스파클링',
    feature_en: 'Sweet peach and apricot aromas in a light, lovable sweet sparkling wine.',
    fruit: '🍑',
    axes: { sweet: 90, tannin: 10, acidity: 38, body: 25 },
    wine: {
      name: '친제토 모스카토 다스티',
      name_en: 'Cinzano Moscato d\'Asti',
      origin: 'ITALY · PIEMONTE',
      feature:    '복숭아와 꽃향의 달콤하고 가벼운 스파클링. 디저트와 함께하기 완벽한 와인.',
      feature_en: 'Sweet and light sparkling with peach and floral notes. Perfect with dessert.',
      tasting_note:    '복숭아, 살구꽃, 오렌지 블로섬의 달콤하고 가벼운 스파클링. 마시는 내내 미소 짓게 되는 와인.',
      tasting_note_en: 'Sweet and light sparkling with peach, apricot blossom, and orange blossom — a wine that makes you smile.',
      pairing:    '마카롱, 판나코타, 생딸기',
      pairing_en: 'Macarons, panna cotta, fresh strawberries',
      grape: 'Moscato Bianco',
      price_range: '3~5만원대'
    }
  },

  DTFB: {
    name:    '칠레에서 온 블랙커런트',
    name_en: 'The Blackcurrant from Chile',
    origin:  'CHILE·MAIPO VALLEY / CABERNET FRANC',
    feature:    '베리, 블루베리류의 농익은 과일향과 민트, 유칼립투스 등의 상큼한 허브향',
    feature_en: 'Ripe berry and blueberry aromas with fresh hints of mint and eucalyptus.',
    fruit: '🫐',
    axes: { sweet: 12, tannin: 90, acidity: 82, body: 90 },
    wine: {
      name: '하라즈 드 피브르 갈란타스 카베르네 프랑',
      name_en: 'Haras de Pirque Gallaretas Cabernet Franc Gran Reserva',
      origin: 'CHILE · MAIPO VALLEY',
      feature:    '블랙베리와 카시스의 농밀한 과일향, 민트와 허브의 청량함이 어우러진 파워풀한 레드.',
      feature_en: 'Dense blackberry and cassis aromas with refreshing mint and herb notes — a powerful red.',
      tasting_note:    '블랙커런트, 블루베리, 민트의 강렬한 향. 탄탄한 타닌과 풍부한 과일미가 조화로운 파워풀 레드.',
      tasting_note_en: 'Intense blackcurrant, blueberry, and mint. Firm tannins and rich fruit in a powerful red.',
      pairing:    '양고기 구이, 숙성 치즈, 바비큐',
      pairing_en: 'Grilled lamb, aged cheese, barbecue',
      grape: 'Cabernet Franc',
      price_range: '6~9만원대'
    }
  },

  DTFW: {
    name:    '이탈리아에서 온 새콤한 붉은 체리',
    name_en: 'The Tart Red Cherry from Italy',
    origin:  'ITALY·TOSCANA / SANGIOVESE',
    feature:    '체리의 드라이한 과일향에 또렷한 타닌과 산미, 이탈리안 식탁의 단짝',
    feature_en: 'Dry cherry fruit with assertive tannins and acidity — the perfect partner for Italian cuisine.',
    fruit: '🍒',
    axes: { sweet: 12, tannin: 80, acidity: 82, body: 38 },
    wine: {
      name: '모리스팡 만드리올로 마렘마 토스카나',
      name_en: 'Moris Farms Mandriolo Maremma Toscana',
      origin: 'ITALY · TOSCANA',
      feature:    '체리와 자두의 드라이한 과일향, 또렷한 타닌과 산미. 이탈리안 식사와 완벽한 마리아주.',
      feature_en: 'Dry cherry and plum aromas with assertive tannins and acidity. A perfect match for Italian cuisine.',
      tasting_note:    '체리, 자두의 드라이한 과일향. 또렷한 타닌과 상큼한 산미가 이탈리안 음식과 완벽한 조화.',
      tasting_note_en: 'Dry cherry and plum. Assertive tannins and fresh acidity in perfect harmony with Italian food.',
      pairing:    '토마토 파스타, 피자, 그릴 채소',
      pairing_en: 'Tomato pasta, pizza, grilled vegetables',
      grape: 'Sangiovese',
      price_range: '4~7만원대'
    }
  },

  DTEB: {
    name:    '프랑스에서 온 블랙 체리',
    name_en: 'The Black Cherry from France',
    origin:  'AUSTRALIA·BAROSSA VALLEY / SHIRAZ',
    feature:    '진한 블루베리와 독특한 후추향, 스테이크와 최고의 궁합',
    feature_en: 'Deep blueberry and distinctive pepper notes — the ultimate steak companion.',
    fruit: '🫐',
    axes: { sweet: 14, tannin: 88, acidity: 30, body: 92 },
    wine: {
      name: '킹스 오브 프로히비션 쉬라즈',
      name_en: 'Kings of Prohibition Shiraz',
      origin: 'AUSTRALIA · BAROSSA VALLEY',
      feature:    '블루베리와 후추의 강렬한 풍미, 벨벳같은 타닌. 스테이크와 최고의 궁합을 자랑하는 풀바디.',
      feature_en: 'Intense blueberry and pepper, velvety tannins. A full-bodied powerhouse that loves a good steak.',
      tasting_note:    '블루베리, 블랙 올리브, 후추의 강렬한 풍미. 벨벳 같은 타닌과 스모키한 여운이 인상적.',
      tasting_note_en: 'Intense blueberry, black olive, and pepper. Velvety tannins with a memorable smoky finish.',
      pairing:    '립아이 스테이크, 양갈비, 숙성 체다',
      pairing_en: 'Ribeye steak, lamb chops, aged cheddar',
      grape: 'Shiraz (Syrah)',
      price_range: '6~9만원대'
    }
  },

  DTEW: {
    name:    '프랑스에서 온 레드 체리',
    name_en: 'The Red Cherry from France',
    origin:  'FRANCE·BOURGOGNE / PINOT NOIR',
    feature:    '베리류와 버섯, 나무향 등 신선하면서 복합미 좋은 가벼운 레드',
    feature_en: 'Fresh berries, mushroom, and earthy notes — a light yet beautifully complex red.',
    fruit: '🍒',
    axes: { sweet: 13, tannin: 72, acidity: 32, body: 36 },
    wine: {
      name: '샹피 부르고뉴 피노누아',
      name_en: 'Champy Bourgogne Pinot Noir',
      origin: 'FRANCE · BOURGOGNE',
      feature:    '체리와 라즈베리의 우아한 과일향, 실크같은 타닌. 부르고뉴 피노 누아의 섬세한 매력.',
      feature_en: 'Elegant cherry and raspberry aromas with silky tannins — the delicate charm of Burgundy Pinot Noir.',
      tasting_note:    '라즈베리, 체리, 버섯, 흙내음의 복합적인 향. 실크 같은 타닌과 우아한 피니시.',
      tasting_note_en: 'Complex aromas of raspberry, cherry, mushroom, and earth. Silky tannins with an elegant finish.',
      pairing:    '오리 요리, 연어 구이, 버섯 리조또',
      pairing_en: 'Duck dishes, grilled salmon, mushroom risotto',
      grape: 'Pinot Noir',
      price_range: '7만원대 이상'
    }
  },

  DLFB: {
    name:    '프랑스에서 온 허브를 감싼 체리',
    name_en: 'The Herb-Wrapped Cherry from France',
    origin:  'FRANCE·RHONE / GRENACHE',
    feature:    '레드 체리, 야생딸기 등의 허브향 가득, 숙성할수록 매력적인 레드',
    feature_en: 'Red cherry and wild strawberry with herb-filled aromas — a red that gets more captivating with age.',
    fruit: '🍒',
    axes: { sweet: 14, tannin: 28, acidity: 80, body: 82 },
    wine: {
      name: '안드레 브루닐 그르나슈',
      name_en: 'André Brunel Grenache',
      origin: 'FRANCE · RHONE',
      feature:    '레드 체리와 야생 허브의 싱그러운 향. 숙성될수록 깊어지는 론 지방의 매력적인 레드.',
      feature_en: 'Fresh red cherry and wild herb aromas. A captivating Rhône red that deepens beautifully with age.',
      tasting_note:    '레드 체리, 야생딸기, 허브의 생동감 넘치는 향. 부드러운 타닌과 은은한 향신료 여운.',
      tasting_note_en: 'Vibrant red cherry, wild strawberry, and herb. Soft tannins with a subtle spice finish.',
      pairing:    '지중해 요리, 양고기, 올리브 요리',
      pairing_en: 'Mediterranean cuisine, lamb, olive-based dishes',
      grape: 'Grenache (Garnacha)',
      price_range: '4~6만원대'
    }
  },

  DLFW: {
    name:    '뉴질랜드에서 온 상큼한 자몽',
    name_en: 'The Zesty Grapefruit from New Zealand',
    origin:  'NEW ZEALAND·MARLBOROUGH / SAUVIGNON BLANC',
    feature:    '자몽, 라임 등의 강렬한 시트러스 풍미와 섬세하고 팽팽한 산미',
    feature_en: 'Intense citrus aromas of grapefruit and lime with delicate, taut acidity.',
    fruit: '🍋',
    axes: { sweet: 10, tannin: 10, acidity: 92, body: 28 },
    wine: {
      name: '옐랜드 말보로 소비뇽 블랑',
      name_en: 'Yealands Marlborough Sauvignon Blanc',
      origin: 'NEW ZEALAND · MARLBOROUGH',
      feature:    '자몽과 라임의 강렬한 시트러스 향, 팽팽한 산미. 뉴질랜드 소비뇽 블랑의 청량한 정수.',
      feature_en: 'Intense grapefruit and lime with taut acidity — the crisp essence of New Zealand Sauvignon Blanc.',
      tasting_note:    '자몽, 라임, 패션프루트의 상큼하고 강렬한 시트러스 향. 팽팽한 산미와 청량한 피니시.',
      tasting_note_en: 'Fresh, intense citrus of grapefruit, lime, and passionfruit. Taut acidity and a crisp finish.',
      pairing:    '해산물, 굴, 신선한 샐러드, 스시',
      pairing_en: 'Seafood, oysters, fresh salad, sushi',
      grape: 'Sauvignon Blanc',
      price_range: '3~6만원대'
    }
  },

  DLEB: {
    name:    '프랑스에서 온 핵과일',
    name_en: 'The Stone Fruit from France',
    origin:  'FRANCE·RHONE / VIOGNIER',
    feature:    '살구, 복숭아, 모과 등 아름다운 핵과일 풍미와 반전되는 바디감의 화이트',
    feature_en: 'Beautiful stone fruit aromas of apricot, peach, and quince with a surprisingly full body.',
    fruit: '🍑',
    axes: { sweet: 16, tannin: 14, acidity: 30, body: 85 },
    wine: {
      name: '샤토 뒤 트리옹 비오니에',
      name_en: 'Château du Trignon Viognier',
      origin: 'FRANCE · RHONE',
      feature:    '살구와 복숭아의 풍성한 핵과일 향, 꽃향기와 함께 묵직하고 크리미한 여운.',
      feature_en: 'Lush stone fruit of apricot and peach with floral notes and a rich, creamy finish.',
      tasting_note:    '살구, 복숭아, 모과의 풍성한 핵과일 향. 꽃향기와 함께 묵직하고 크리미한 여운.',
      tasting_note_en: 'Lush stone fruit of apricot, peach, and quince. Floral notes leading to a rich, creamy finish.',
      pairing:    '가리비 구이, 크림 파스타, 소프트 치즈',
      pairing_en: 'Grilled scallops, cream pasta, soft cheese',
      grape: 'Viognier',
      price_range: '5~8만원대'
    }
  },

  DLEW: {
    name:    '이탈리아에서 온 음식 친화적인 와인',
    name_en: 'The Food-Friendly Wine from Italy',
    origin:  'ITALY·CAMPANIA / FIANO',
    feature:    '헤이즐넛 등의 고소한 풍미와 배, 복숭아 등의 핵과일의 조화',
    feature_en: 'Nutty hazelnut character harmonized with stone fruits like pear and peach.',
    fruit: '🍇',
    axes: { sweet: 11, tannin: 10, acidity: 36, body: 26 },
    wine: {
      name: '이 본조르노 살렌토 피아노',
      name_en: 'I Buongiorno Salento Fiano',
      origin: 'ITALY · CAMPANIA',
      feature:    '헤이즐넛의 고소함과 복숭아, 배의 부드러운 핵과일 향. 어떤 음식과도 잘 어울리는 이탈리아의 친근한 화이트.',
      feature_en: 'Nutty hazelnut with soft stone fruit of peach and pear. Italy\'s most food-friendly white.',
      tasting_note:    '헤이즐넛, 배, 복숭아의 고소하고 섬세한 풍미. 어떤 음식과도 자연스럽게 어울리는 친근한 화이트.',
      tasting_note_en: 'Nutty, delicate aromas of hazelnut, pear, and peach. A naturally versatile, food-friendly white.',
      pairing:    '해산물 파스타, 닭고기 요리, 연한 치즈',
      pairing_en: 'Seafood pasta, chicken dishes, mild cheese',
      grape: 'Fiano',
      price_range: '3~5만원대'
    }
  }
};