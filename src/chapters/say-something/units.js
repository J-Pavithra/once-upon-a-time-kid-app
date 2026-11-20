// Chapter 6 · Say Something — 12 units.
//
// From the curriculum PDF (chapters-5-to-8):
//   The frame: Mira flies to Seoul and stays with Yuna's family for a week.
//   Each unit is a room, a street, or a meal — a place where one pattern is
//   the natural thing to say. Not finishable in a weekend: one unit a day, with
//   the Daily 3 in between.
//
// Romanisation policy for Chapter 6 (per the taper spec):
//   New words carry `roman`. Words already taught in Chapter 5 keep just their
//   Hangul in the display strings — the field is still present per-entry so the
//   Hangul-only toggle continues to work by CSS class alone.

export const UNITS = [
  // ---------- PART 1 · WHAT IS · WHAT ISN'T ----------
  {
    n: 1, slug: 'have-havent', part: 'PART 1 · WHAT IS · WHAT ISN\'T',
    title: 'There is, there isn\'t',
    grammar: '있어요 / 없어요',
    intro: 'The most productive pair in beginner Korean. It means both "there is" and "I have" — half of all beginner questions get answered with it.',
    kind: 'grammar',
    rule: {
      head: '있어요 = there is / I have',
      body: '없어요 = there isn\'t / I don\'t have',
      note: 'The subject is often dropped — Korean lets context do that work.',
    },
    phrases: [
      { line: '물 있어요?',       roman: 'mul isseoyo?',      meaning: 'Is there water? / Do you have water?', scene: '💧' },
      { line: '네, 있어요.',      roman: 'ne, isseoyo.',      meaning: 'Yes, there is.',                       scene: '✅' },
      { line: '아니요, 없어요.',   roman: 'aniyo, eopseoyo.', meaning: 'No, there isn\'t.',                     scene: '❌' },
      { line: '김치 있어요.',     roman: 'gimchi isseoyo.',   meaning: 'There is kimchi.',                     scene: '🥬' },
    ],
    postcard: { line: '시간 있어요?', roman: 'sigan isseoyo?', meaning: 'Do you have time?', scene: '⏰' },
  },

  {
    n: 2, slug: 'this-that', part: 'PART 1 · WHAT IS · WHAT ISN\'T',
    title: 'This, that, that over there',
    grammar: '이거 · 그거 · 저거',
    intro: 'Korean splits "that" in two. 그거 is near the listener; 저거 is far from both of you. Pair with 뭐예요? from Chapter 5.',
    kind: 'grammar',
    rule: {
      head: '이거 · 그거 · 저거',
      body: 'near-me · near-you · far-from-both',
      note: 'Rule of thumb: point at it. Which finger you\'d use tells you which word.',
    },
    phrases: [
      { line: '이거 뭐예요?',       roman: 'igeo mwoyeyo?',      meaning: 'What is this?',                    scene: '❓' },
      { line: '그거 김밥이에요.',   roman: 'geugeo gimbabieyo.',  meaning: 'That\'s kimbap.',                   scene: '🍱' },
      { line: '저거 주세요.',       roman: 'jeogeo juseyo.',      meaning: 'That one over there, please.',       scene: '👉' },
    ],
    postcard: { line: '이거 좋아요.', roman: 'igeo joayo.', meaning: 'I like this one.', scene: '👍' },
  },

  {
    n: 3, slug: 'here-there', part: 'PART 1 · WHAT IS · WHAT ISN\'T',
    title: 'Here, there, over there',
    grammar: '여기 · 거기 · 저기',
    intro: 'The same three-way split, but for places. 저기요 doubles as "excuse me" when calling a waiter — worth teaching, it\'s used constantly.',
    kind: 'grammar',
    rule: {
      head: '여기 · 거기 · 저기',
      body: 'here · there (near you) · over there (far)',
      note: '저기요! by itself, said louder, is how you get a stranger\'s attention politely.',
    },
    phrases: [
      { line: '화장실 여기 있어요.', roman: 'hwajangsil yeogi isseoyo.', meaning: 'The toilet is here.',      scene: '🚻' },
      { line: '저기요!',           roman: 'jeogiyo!',                   meaning: 'Excuse me!',                scene: '🙋' },
      { line: '여기 앉으세요.',     roman: 'yeogi anjeuseyo.',           meaning: 'Please sit here.',           scene: '🪑' },
    ],
    postcard: { line: '저기요, 김밥 주세요.', roman: 'jeogiyo, gimbap juseyo.', meaning: 'Excuse me, kimbap please.', scene: '🍱' },
  },

  // ---------- PART 2 · WHO DOES WHAT ----------
  {
    n: 4, slug: 'topic-marker', part: 'PART 2 · WHO DOES WHAT',
    title: 'As for me',
    grammar: '은/는',
    intro: 'The topic marker. It sets what the sentence is about, and it carries a faint sense of comparison — "as for me, ...".',
    kind: 'grammar',
    rule: {
      head: 'consonant + 은 · vowel + 는',
      body: '책은 · 저는 · 이름은 · 친구는',
      note: 'Tap the noun; the marker attaches by what the noun ends in.',
    },
    phrases: [
      { line: '저는 미라예요.',   roman: 'jeoneun mirayeyo.',  meaning: 'I\'m Mira.',           scene: '🧒' },
      { line: '이름은 뭐예요?',   roman: 'ireumeun mwoyeyo?', meaning: 'What\'s your name?',   scene: '📛' },
      { line: '김치는 매워요.',   roman: 'gimchineun maewoyo.', meaning: 'Kimchi is spicy.',    scene: '🌶️' },
    ],
    postcard: { line: '저는 학생이에요.', roman: 'jeoneun haksaengieyo.', meaning: 'I\'m a student.', scene: '🎒' },
  },

  {
    n: 5, slug: 'subject-marker', part: 'PART 2 · WHO DOES WHAT',
    title: 'The doer',
    grammar: '이/가',
    intro: 'The subject marker. For now, teach it as "the thing that exists or the thing that is" — it pairs with 있어요/없어요 and with adjectives.',
    kind: 'grammar',
    rule: {
      head: 'consonant + 이 · vowel + 가',
      body: '책이 · 친구가 · 물이 · 의자가',
      note: 'Do not attempt the full 은/는 vs 이/가 contrast yet — it takes years, and it isn\'t needed to be understood.',
    },
    phrases: [
      { line: '친구가 있어요.',   roman: 'chinguga isseoyo.',   meaning: 'I have a friend.',   scene: '👫' },
      { line: '시간이 없어요.',   roman: 'sigani eopseoyo.',    meaning: 'I don\'t have time.', scene: '⏰' },
      { line: '이름이 뭐예요?',   roman: 'ireumi mwoyeyo?',     meaning: 'What is your name?',  scene: '📛' },
    ],
    postcard: { line: '문제가 없어요.', roman: 'munjega eopseoyo.', meaning: 'No problem.', scene: '👌' },
  },

  {
    n: 6, slug: 'object-marker', part: 'PART 2 · WHO DOES WHAT',
    title: 'The thing being done to',
    grammar: '을/를',
    intro: 'The object marker. Because Korean puts the verb last, this is what tells you which noun is being eaten, bought, or read.',
    kind: 'grammar',
    rule: {
      head: 'consonant + 을 · vowel + 를',
      body: '밥을 · 우유를 · 책을 · 커피를',
      note: 'In casual speech people drop 을/를 constantly. Teach it anyway — a beginner who never uses it sounds childish, not casual.',
    },
    phrases: [
      { line: '밥을 먹어요.',   roman: 'babeul meogeoyo.',  meaning: 'I eat rice.',    scene: '🍚' },
      { line: '우유를 마셔요.', roman: 'uyureul masyeoyo.', meaning: 'I drink milk.',   scene: '🥛' },
      { line: '책을 읽어요.',   roman: 'chaegeul ilgeoyo.', meaning: 'I read a book.', scene: '📖' },
    ],
    postcard: { line: '커피를 좋아해요.', roman: 'keopireul joahaeyo.', meaning: 'I like coffee.', scene: '☕' },
  },

  // ---------- PART 3 · VERBS THAT WORK ----------
  {
    n: 7, slug: 'verbs-get-dressed', part: 'PART 3 · VERBS THAT WORK',
    title: 'Verbs get dressed',
    grammar: '-아요 / -어요',
    intro: 'The single most important rule in the chapter. Every Korean verb ends in 다 in the dictionary; drop it, and add an ending.',
    kind: 'verb-table',
    rule: {
      head: 'stem has ㅏ or ㅗ → 아요',
      body: 'everything else → 어요 · 하다 → 해요',
      note: 'That third line isn\'t an exception to apologise for — 하다 is the most common verb in Korean, worth learning as its own fact.',
    },
    verbs: [
      { dict: '가다',   dictRoman: 'gada',    polite: '가요',    politeRoman: 'gayo',       meaning: 'go' },
      { dict: '오다',   dictRoman: 'oda',     polite: '와요',    politeRoman: 'wayo',       meaning: 'come' },
      { dict: '보다',   dictRoman: 'boda',    polite: '봐요',    politeRoman: 'bwayo',      meaning: 'see, watch' },
      { dict: '먹다',   dictRoman: 'meokda',  polite: '먹어요',  politeRoman: 'meogeoyo',  meaning: 'eat' },
      { dict: '마시다', dictRoman: 'masida', polite: '마셔요',  politeRoman: 'masyeoyo',  meaning: 'drink' },
      { dict: '하다',   dictRoman: 'hada',    polite: '해요',    politeRoman: 'haeyo',      meaning: 'do' },
    ],
    postcard: { line: '뭐 해요?', roman: 'mwo haeyo?', meaning: 'What are you doing?', scene: '🤔' },
  },

  {
    n: 8, slug: 'six-more-verbs', part: 'PART 3 · VERBS THAT WORK',
    title: 'Six more verbs',
    grammar: 'practice, not new grammar',
    intro: 'Same rule, six more verbs — so the pattern becomes automatic before we add anything else. Two of these are 하다 verbs (noun + 하다) — the family that keeps giving.',
    kind: 'verb-table',
    rule: {
      head: 'The rule from unit 7 — again',
      body: '하다 verbs = noun + 하다 → noun + 해요',
      note: 'Once the learner sees hundreds of verbs are just noun+하다, vocabulary growth gets much cheaper.',
    },
    verbs: [
      { dict: '사다',       dictRoman: 'sada',        polite: '사요',       politeRoman: 'sayo',         meaning: 'buy' },
      { dict: '자다',       dictRoman: 'jada',        polite: '자요',       politeRoman: 'jayo',         meaning: 'sleep' },
      { dict: '좋아하다',   dictRoman: 'joahada',    polite: '좋아해요',   politeRoman: 'joahaeyo',    meaning: 'like' },
      { dict: '읽다',       dictRoman: 'ikda',        polite: '읽어요',     politeRoman: 'ilgeoyo',     meaning: 'read' },
      { dict: '주다',       dictRoman: 'juda',        polite: '줘요',       politeRoman: 'jwoyo',        meaning: 'give' },
      { dict: '공부하다',   dictRoman: 'gongbuhada', polite: '공부해요',   politeRoman: 'gongbuhaeyo', meaning: 'study' },
    ],
    postcard: { line: '한국어를 공부해요.', roman: 'hangugeoreul gongbuhaeyo.', meaning: 'I study Korean.', scene: '📚' },
  },

  // ---------- PART 4 · PLACES AND NEGATIVES ----------
  {
    n: 9, slug: 'to-a-place', part: 'PART 4 · PLACES AND NEGATIVES',
    title: 'Going somewhere',
    grammar: '에',
    intro: 'Marks a destination or a location. Small word, enormous reach.',
    kind: 'grammar',
    rule: {
      head: 'noun + 에',
      body: 'destination · location · time',
      note: '에 is used for BEING somewhere or GOING somewhere. Actions that happen there use 에서 — next unit.',
    },
    phrases: [
      { line: '학교에 가요.',    roman: 'hakgyoe gayo.',    meaning: 'I go to school.',   scene: '🏫' },
      { line: '집에 있어요.',    roman: 'jibe isseoyo.',    meaning: 'I\'m at home.',      scene: '🏠' },
      { line: '한국에 왔어요.',  roman: 'hangugeo wasseoyo.', meaning: 'I came to Korea.',   scene: '🇰🇷' },
    ],
    postcard: { line: '서울에 가고 싶어요.', roman: 'seoure gago sipeoyo.', meaning: 'I want to go to Seoul.', scene: '🗼' },
  },

  {
    n: 10, slug: 'action-at-place', part: 'PART 4 · PLACES AND NEGATIVES',
    title: 'Doing something somewhere',
    grammar: '에서',
    intro: 'The pair that trips everyone up. 에 is where you are or where you are going. 에서 is where an action happens. Teach them side by side.',
    kind: 'pair',
    rule: {
      head: '에 = static · 에서 = action',
      body: '집에 있어요 → I am at home\n집에서 먹어요 → I eat at home',
      note: 'Taught side by side, they separate. Taught apart, they never do.',
    },
    pairs: [
      {
        left:  { line: '집에 있어요.',      roman: 'jibe isseoyo.',      meaning: 'I am at home.',     scene: '🏠' },
        right: { line: '집에서 먹어요.',    roman: 'jibeseo meogeoyo.',  meaning: 'I eat at home.',    scene: '🍚' },
      },
      {
        left:  { line: '학교에 가요.',      roman: 'hakgyoe gayo.',      meaning: 'I go to school.',   scene: '🏫' },
        right: { line: '학교에서 공부해요.', roman: 'hakgyoeseo gongbuhaeyo.', meaning: 'I study at school.', scene: '📚' },
      },
      {
        left:  { line: '카페에 왔어요.',    roman: 'kapeee wasseoyo.',   meaning: 'I came to the café.', scene: '☕' },
        right: { line: '카페에서 만나요.',  roman: 'kapeeeseo mannayo.', meaning: 'We meet at the café.', scene: '🤝' },
      },
    ],
    postcard: { line: '카페에서 봐요!', roman: 'kapeeeseo bwayo!', meaning: 'See you at the café!', scene: '☕' },
  },

  {
    n: 11, slug: 'saying-no', part: 'PART 4 · PLACES AND NEGATIVES',
    title: 'Saying no',
    grammar: '안',
    intro: 'Put 안 in front of the verb. That is the whole rule.',
    kind: 'grammar',
    rule: {
      head: '안 + verb',
      body: 'One wrinkle: with 하다 verbs the 안 goes inside — 공부 안 해요, not 안 공부해요.',
      note: 'Because Korean stacks the meaning at the end, negation stays near the verb no matter how long the sentence is.',
    },
    phrases: [
      { line: '안 먹어요.',       roman: 'an meogeoyo.',      meaning: 'I don\'t eat it.',       scene: '🙅' },
      { line: '안 좋아해요.',     roman: 'an joahaeyo.',      meaning: 'I don\'t like it.',      scene: '👎' },
      { line: '오늘 안 가요.',    roman: 'oneul an gayo.',    meaning: 'I\'m not going today.', scene: '🚫' },
      { line: '공부 안 해요.',    roman: 'gongbu an haeyo.',  meaning: 'I don\'t study.',        scene: '📚' },
    ],
    postcard: { line: '오늘은 안 바빠요.', roman: 'oneureun an bappayo.', meaning: 'I\'m not busy today.', scene: '😌' },
  },

  // ---------- PART 5 · STRING IT TOGETHER ----------
  {
    n: 12, slug: 'yunas-week', part: 'PART 5 · STRING IT TOGETHER',
    title: 'Yuna\'s week',
    grammar: 'everything so far',
    intro: 'A seven-scene story through Yuna\'s week. Every pattern in the chapter is used at least once — and you choose what Mira says at each turn. This is where the twelve units stop being twelve units and become a language.',
    kind: 'story',
    scenes: [
      {
        setting: '🏠  Monday morning · Yuna\'s kitchen',
        yuna:  { line: '미라, 물 있어요?',       roman: 'mira, mul isseoyo?',       meaning: 'Mira, do you have water?' },
        prompt: 'You reach for the bottle. Say yes and hand it over.',
        options: [
          { line: '네, 있어요.',       roman: 'ne, isseoyo.',       meaning: 'Yes, there is.', ok: true },
          { line: '뭐예요?',           roman: 'mwoyeyo?',           meaning: 'What is it?',    ok: false, why: 'Yuna asked whether you have some — start with yes/no.' },
        ],
      },
      {
        setting: '🚌  Tuesday · on the bus',
        yuna:  { line: '어디에 가요?',           roman: 'eodie gayo?',              meaning: 'Where are you going?' },
        prompt: 'You\'re heading to school. Answer with 에.',
        options: [
          { line: '학교에 가요.',       roman: 'hakgyoe gayo.',       meaning: 'I\'m going to school.', ok: true },
          { line: '학교에서 가요.',     roman: 'hakgyoeseo gayo.',    meaning: '(uses 에서, wrong)',    ok: false, why: 'Movement TO a place uses 에, not 에서.' },
        ],
      },
      {
        setting: '🏫  Wednesday · lunch break',
        yuna:  { line: '뭐 먹어요?',             roman: 'mwo meogeoyo?',            meaning: 'What are you eating?' },
        prompt: 'You\'re having kimbap. Use 을/를.',
        options: [
          { line: '김밥을 먹어요.',     roman: 'gimbabeul meogeoyo.', meaning: 'I\'m eating kimbap.',   ok: true },
          { line: '김밥에 먹어요.',     roman: 'gimbabe meogeoyo.',   meaning: '(uses 에, wrong)',       ok: false, why: '을/를 marks the thing being done to.' },
        ],
      },
      {
        setting: '☕  Thursday · a café',
        yuna:  { line: '커피 좋아해요?',         roman: 'keopi joahaeyo?',          meaning: 'Do you like coffee?' },
        prompt: 'You don\'t. Say no politely.',
        options: [
          { line: '안 좋아해요.',       roman: 'an joahaeyo.',        meaning: 'I don\'t like it.',    ok: true },
          { line: '없어요.',            roman: 'eopseoyo.',           meaning: 'There isn\'t any.',    ok: false, why: 'She asked what you LIKE — negate the verb 좋아하다 with 안.' },
        ],
      },
      {
        setting: '📚  Friday · Yuna\'s desk',
        yuna:  { line: '지금 뭐 해요?',          roman: 'jigeum mwo haeyo?',        meaning: 'What are you doing now?' },
        prompt: 'You\'re studying Korean.',
        options: [
          { line: '한국어를 공부해요.', roman: 'hangugeoreul gongbuhaeyo.', meaning: 'I\'m studying Korean.', ok: true },
          { line: '한국어에 공부해요.', roman: 'hangugeoe gongbuhaeyo.',    meaning: '(uses 에, wrong)',      ok: false, why: '을/를 marks the thing you\'re studying.' },
        ],
      },
      {
        setting: '🏡  Saturday · back at home',
        yuna:  { line: '이거 뭐예요?',           roman: 'igeo mwoyeyo?',            meaning: 'What is this?' },
        prompt: 'She\'s pointing at a book you brought. Introduce yourself as its owner.',
        options: [
          { line: '제 책이에요.',       roman: 'je chaegieyo.',        meaning: 'It\'s my book.',       ok: true },
          { line: '책 있어요.',         roman: 'chaek isseoyo.',       meaning: 'There is a book.',    ok: false, why: 'She wants to know what the thing IS, not whether one exists.' },
        ],
      },
      {
        setting: '🌙  Sunday night · leaving',
        yuna:  { line: '내일 가요?',             roman: 'naeil gayo?',              meaning: 'Are you leaving tomorrow?' },
        prompt: 'Say a warm goodbye.',
        options: [
          { line: '네. 안녕히 계세요!', roman: 'ne. annyeonghi gyeseyo!', meaning: 'Yes. Goodbye (I\'m leaving)!', ok: true },
          { line: '네. 안녕히 가세요!', roman: 'ne. annyeonghi gaseyo!',  meaning: '(said to the one leaving)',    ok: false, why: 'YOU are the one leaving — say 계세요 (stay well).' },
        ],
      },
    ],
    postcard: { line: '또 만나요, 유나!', roman: 'tto mannayo, yuna!', meaning: 'See you again, Yuna!', scene: '👋' },
  },
]

// Vocabulary sets from the PDF — surfaced on the unit map as reference.
export const VOCAB_SETS = [
  { name: 'Family',   emoji: '👨‍👩‍👧', words: [
    { word: '엄마',   roman: 'eomma',   meaning: 'mum' },
    { word: '아빠',   roman: 'appa',    meaning: 'dad' },
    { word: '언니',   roman: 'eonni',   meaning: 'older sister (for a girl)' },
    { word: '오빠',   roman: 'oppa',    meaning: 'older brother (for a girl)' },
    { word: '누나',   roman: 'nuna',    meaning: 'older sister (for a boy)' },
    { word: '형',     roman: 'hyeong',  meaning: 'older brother (for a boy)' },
    { word: '동생',   roman: 'dongsaeng', meaning: 'younger sibling' },
    { word: '가족',   roman: 'gajok',   meaning: 'family' },
  ]},
  { name: 'Home',     emoji: '🏠', words: [
    { word: '집',     roman: 'jip',     meaning: 'house / home' },
    { word: '방',     roman: 'bang',    meaning: 'room' },
    { word: '문',     roman: 'mun',     meaning: 'door' },
    { word: '창문',   roman: 'changmun', meaning: 'window' },
    { word: '의자',   roman: 'uija',    meaning: 'chair' },
    { word: '침대',   roman: 'chimdae', meaning: 'bed' },
    { word: '화장실', roman: 'hwajangsil', meaning: 'toilet' },
  ]},
  { name: 'School',   emoji: '🏫', words: [
    { word: '학교',   roman: 'hakgyo',    meaning: 'school' },
    { word: '선생님', roman: 'seonsaengnim', meaning: 'teacher' },
    { word: '친구',   roman: 'chingu',    meaning: 'friend' },
    { word: '책',     roman: 'chaek',     meaning: 'book' },
    { word: '가방',   roman: 'gabang',    meaning: 'bag' },
    { word: '연필',   roman: 'yeonpil',   meaning: 'pencil' },
    { word: '교실',   roman: 'gyosil',    meaning: 'classroom' },
  ]},
  { name: 'Food',     emoji: '🍚', words: [
    { word: '밥',     roman: 'bap',       meaning: 'rice / meal' },
    { word: '물',     roman: 'mul',       meaning: 'water' },
    { word: '우유',   roman: 'uyu',       meaning: 'milk' },
    { word: '빵',     roman: 'ppang',     meaning: 'bread' },
    { word: '김치',   roman: 'gimchi',    meaning: 'kimchi' },
    { word: '라면',   roman: 'ramyeon',   meaning: 'ramen' },
    { word: '김밥',   roman: 'gimbap',    meaning: 'kimbap (rice-seaweed roll)' },
    { word: '과일',   roman: 'gwail',     meaning: 'fruit' },
    { word: '커피',   roman: 'keopi',     meaning: 'coffee' },
  ]},
  { name: 'Places',   emoji: '🗺️', words: [
    { word: '가게',   roman: 'gage',      meaning: 'shop' },
    { word: '시장',   roman: 'sijang',    meaning: 'market' },
    { word: '공원',   roman: 'gongwon',   meaning: 'park' },
    { word: '병원',   roman: 'byeongwon', meaning: 'hospital' },
    { word: '지하철', roman: 'jihacheol', meaning: 'subway' },
    { word: '버스',   roman: 'beoseu',    meaning: 'bus' },
    { word: '서울',   roman: 'seoul',     meaning: 'Seoul' },
  ]},
  { name: 'Everyday', emoji: '🧰', words: [
    { word: '옷',     roman: 'ot',       meaning: 'clothes' },
    { word: '신발',   roman: 'sinbal',   meaning: 'shoes' },
    { word: '시계',   roman: 'sigye',    meaning: 'clock / watch' },
    { word: '전화',   roman: 'jeonhwa',  meaning: 'phone' },
    { word: '돈',     roman: 'don',      meaning: 'money' },
    { word: '시간',   roman: 'sigan',    meaning: 'time' },
    { word: '이름',   roman: 'ireum',    meaning: 'name' },
  ]},
]

export function unitBySlug(slug) { return UNITS.find(u => u.slug === slug) }
export function unitActivityKey(slug) { return `ss-${slug}` }
export const ALL_ACTIVITY_KEYS = UNITS.map(u => unitActivityKey(u.slug))
export const TOTAL_UNITS = UNITS.length
