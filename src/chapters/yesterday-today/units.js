// Chapter 7 · Yesterday, Today — 12 units.
//
// From the curriculum PDF:
//   The frame: Mira keeps a diary of her week in Seoul. Every unit is a page
//   of it — which gives the past tense a reason to exist, rather than being
//   a grammar exercise.
//
// Romanisation policy (per the taper spec):
//   Chapter 7 shows romanisation only behind a tap. In this app the global
//   Hangul-only toggle already handles the show/hide — every entry still
//   carries `roman` as its own field, so the toggle just switches CSS class
//   on/off exactly as it does for Chapters 5 and 6.

export const UNITS = [
  // ---------- PART 1 · WHEN THINGS HAPPEN ----------
  {
    n: 1, slug: 'today-yesterday-tomorrow', part: 'PART 1 · WHEN THINGS HAPPEN',
    title: 'Today, yesterday, tomorrow',
    grammar: '오늘 · 어제 · 내일',
    intro: 'Time words first, so that when the past tense arrives in unit 2 there is somewhere to put it.',
    kind: 'vocab',
    rule: {
      head: 'Time you can point at',
      note: '오늘 (today), 어제 (yesterday), 내일 (tomorrow) — start here. The rest tells Yuna WHEN you did the thing.',
    },
    words: [
      { word: '오늘',  roman: 'oneul',   meaning: 'today',    scene: '📅' },
      { word: '어제',  roman: 'eoje',    meaning: 'yesterday', scene: '⬅️' },
      { word: '내일',  roman: 'naeil',   meaning: 'tomorrow',  scene: '➡️' },
      { word: '아침',  roman: 'achim',   meaning: 'morning',   scene: '🌅' },
      { word: '점심',  roman: 'jeomsim', meaning: 'midday',    scene: '🌞' },
      { word: '저녁',  roman: 'jeonyeok', meaning: 'evening',  scene: '🌆' },
      { word: '밤',    roman: 'bam',     meaning: 'night',     scene: '🌙' },
      { word: '지금',  roman: 'jigeum',  meaning: 'now',       scene: '⏰' },
    ],
    postcard: { line: '지금 뭐 해요?', roman: 'jigeum mwo haeyo?', meaning: 'What are you doing now?', scene: '🤔' },
  },

  {
    n: 2, slug: 'past-tense', part: 'PART 1 · WHEN THINGS HAPPEN',
    title: 'It already happened',
    grammar: '-았어요 / -었어요',
    intro: 'The same vowel rule as the present tense, which is the good news — you already know how to choose.',
    kind: 'past-verbs',
    rule: {
      head: 'stem has ㅏ or ㅗ → 았어요',
      body: 'everything else → 었어요 · 하다 → 했어요',
      note: 'If you can build 먹어요, you can build 먹었어요. It turns a whole new tense into a small extension of what you already own.',
    },
    verbs: [
      { dict: '가다',   present: '가요',    past: '갔어요',     meaning: 'went',        dictRoman: 'gada',    presentRoman: 'gayo',      pastRoman: 'gasseoyo' },
      { dict: '오다',   present: '와요',    past: '왔어요',     meaning: 'came',        dictRoman: 'oda',     presentRoman: 'wayo',      pastRoman: 'wasseoyo' },
      { dict: '먹다',   present: '먹어요',  past: '먹었어요',   meaning: 'ate',         dictRoman: 'meokda',  presentRoman: 'meogeoyo',  pastRoman: 'meogeosseoyo' },
      { dict: '보다',   present: '봐요',    past: '봤어요',     meaning: 'saw',         dictRoman: 'boda',    presentRoman: 'bwayo',     pastRoman: 'bwasseoyo' },
      { dict: '하다',   present: '해요',    past: '했어요',     meaning: 'did',         dictRoman: 'hada',    presentRoman: 'haeyo',     pastRoman: 'haesseoyo' },
      { dict: '있다',   present: '있어요',  past: '있었어요',   meaning: 'there was',   dictRoman: 'itda',    presentRoman: 'isseoyo',   pastRoman: 'isseosseoyo' },
    ],
    postcard: { line: '어제 갔어요.', roman: 'eoje gasseoyo.', meaning: 'I went yesterday.', scene: '📅' },
  },

  {
    n: 3, slug: 'day-in-past', part: 'PART 1 · WHEN THINGS HAPPEN',
    title: 'A day in the past',
    grammar: 'practice',
    intro: "Mira's first day in Seoul, retold in past tense. Read each present-tense sentence and pick its past form.",
    kind: 'convert',
    rule: {
      head: 'Same rule, one tense later.',
      note: 'These are the ONLY verbs from unit 2 — nothing new. If it feels easy, that\'s the point.',
    },
    pairs: [
      { present: '학교에 가요.',      past: '학교에 갔어요.',       roman: 'hakgyoe gasseoyo.',           pastForm: '갔어요',     pastFormRoman: 'gasseoyo',      meaning: 'I went to school.' },
      { present: '커피를 마셔요.',    past: '커피를 마셨어요.',     roman: 'keopireul masyeosseoyo.',     pastForm: '마셨어요',   pastFormRoman: 'masyeosseoyo',  meaning: 'I drank coffee.' },
      { present: '친구를 봐요.',      past: '친구를 봤어요.',       roman: 'chingureul bwasseoyo.',       pastForm: '봤어요',     pastFormRoman: 'bwasseoyo',     meaning: 'I saw a friend.' },
      { present: '김밥을 먹어요.',    past: '김밥을 먹었어요.',     roman: 'gimbabeul meogeosseoyo.',     pastForm: '먹었어요',   pastFormRoman: 'meogeosseoyo',  meaning: 'I ate kimbap.' },
      { present: '한국어를 공부해요.', past: '한국어를 공부했어요.', roman: 'hangugeoreul gongbuhaesseoyo.', pastForm: '공부했어요', pastFormRoman: 'gongbuhaesseoyo', meaning: 'I studied Korean.' },
    ],
    postcard: { line: '어제 뭐 했어요?', roman: 'eoje mwo haesseoyo?', meaning: 'What did you do yesterday?', scene: '🤔' },
  },

  // ---------- PART 2 · THE CALENDAR AND THE CLOCK ----------
  {
    n: 4, slug: 'days-of-week', part: 'PART 2 · THE CALENDAR AND THE CLOCK',
    title: 'The days of the week',
    grammar: '요일',
    intro: 'Every day ends in 요일, so there are really only seven syllables to learn.',
    kind: 'vocab',
    rule: {
      head: 'Just remember the first syllable.',
      note: '월 moon · 화 fire · 수 water · 목 wood · 금 gold · 토 earth · 일 sun. Then + 요일 for the day.',
    },
    words: [
      { word: '월요일', roman: 'woryoil', meaning: 'Monday',    scene: '🌙' },
      { word: '화요일', roman: 'hwayoil', meaning: 'Tuesday',   scene: '🔥' },
      { word: '수요일', roman: 'suyoil',  meaning: 'Wednesday', scene: '💧' },
      { word: '목요일', roman: 'mogyoil', meaning: 'Thursday',  scene: '🌳' },
      { word: '금요일', roman: 'geumyoil', meaning: 'Friday',   scene: '🥇' },
      { word: '토요일', roman: 'toyoil',  meaning: 'Saturday',  scene: '🪨' },
      { word: '일요일', roman: 'iryoil',  meaning: 'Sunday',    scene: '☀️' },
    ],
    postcard: { line: '금요일에 만나요!', roman: 'geumyoire mannayo!', meaning: 'See you on Friday!', scene: '🥳' },
  },

  {
    n: 5, slug: 'dates', part: 'PART 2 · THE CALENDAR AND THE CLOCK',
    title: 'Dates',
    grammar: '년 · 월 · 일',
    intro: 'Korean dates run large to small — year, month, day. Opposite of English, and the same as a filename that sorts properly.',
    kind: 'date',
    rule: {
      head: 'year 년 · month 월 · day 일',
      body: '2026년 9월 4일 — read left to right, biggest to smallest.',
      note: 'Two irregular months only: June is 유월 (not 육월), October is 시월 (not 십월). Every other month is Sino number + 월.',
    },
    monthWords: [
      { n: 1, word: '일월',  roman: 'irwol',   meaning: 'January' },
      { n: 2, word: '이월',  roman: 'iwol',    meaning: 'February' },
      { n: 3, word: '삼월',  roman: 'samwol',  meaning: 'March' },
      { n: 4, word: '사월',  roman: 'sawol',   meaning: 'April' },
      { n: 5, word: '오월',  roman: 'owol',    meaning: 'May' },
      { n: 6, word: '유월',  roman: 'yuwol',   meaning: 'June',    irregular: true },
      { n: 7, word: '칠월',  roman: 'chirwol', meaning: 'July' },
      { n: 8, word: '팔월',  roman: 'parwol',  meaning: 'August' },
      { n: 9, word: '구월',  roman: 'guwol',   meaning: 'September' },
      { n: 10, word: '시월', roman: 'siwol',   meaning: 'October', irregular: true },
      { n: 11, word: '십일월', roman: 'sibirwol', meaning: 'November' },
      { n: 12, word: '십이월', roman: 'sibiwol', meaning: 'December' },
    ],
    phrases: [
      { line: '오늘은 2026년 9월 4일이에요.', roman: 'oneureun icheonisimnyungnyeon guwol sail-ieyo.', meaning: "Today is September 4, 2026.", scene: '📅' },
      { line: '생일이 언제예요?',              roman: 'saengil-i eonjeyeyo?',                            meaning: 'When is your birthday?', scene: '🎂' },
      { line: '유월에 왔어요.',                 roman: 'yuwore wasseoyo.',                                meaning: 'I came in June.',        scene: '🌻' },
    ],
    postcard: { line: '10월 3일에 만나요.', roman: 'siwol samire mannayo.', meaning: 'See you on October 3.', scene: '🍂' },
  },

  {
    n: 6, slug: 'telling-time', part: 'PART 2 · THE CALENDAR AND THE CLOCK',
    title: 'Telling the time',
    grammar: '시 · 분',
    intro: 'The trap the chapter has been building toward since Chapter 5 taught two number systems. The hour and the minute use different sets — in the same sentence.',
    kind: 'clock',
    rule: {
      head: 'hours → native + 시',
      body: 'minutes → Sino + 분',
      note: 'Native numbers change shape before a counter: 하나 → 한, 둘 → 두, 셋 → 세, 넷 → 네, 스물 → 스무. So it is 한 시, never 하나 시.',
    },
    hours: [
      { n: 1,  word: '한 시',    roman: 'han si' },
      { n: 2,  word: '두 시',    roman: 'du si' },
      { n: 3,  word: '세 시',    roman: 'se si' },
      { n: 4,  word: '네 시',    roman: 'ne si' },
      { n: 5,  word: '다섯 시',  roman: 'daseot si' },
      { n: 6,  word: '여섯 시',  roman: 'yeoseot si' },
      { n: 7,  word: '일곱 시',  roman: 'ilgop si' },
      { n: 8,  word: '여덟 시',  roman: 'yeodeol si' },
      { n: 9,  word: '아홉 시',  roman: 'ahop si' },
      { n: 10, word: '열 시',    roman: 'yeol si' },
      { n: 11, word: '열한 시',  roman: 'yeolhan si' },
      { n: 12, word: '열두 시',  roman: 'yeoldu si' },
    ],
    // Sino minute words are built at render time (십, 이십, 삼십, 사십, 오십), but store one example
    example: { line: '세 시 삼십 분이에요.', roman: 'se si samsip bunieyo.', meaning: "It's half past three." },
    postcard: { line: '지금 몇 시예요?', roman: 'jigeum myeot siyeyo?', meaning: 'What time is it now?', scene: '⏰' },
  },

  // ---------- PART 3 · COUNTING THINGS ----------
  {
    n: 7, slug: 'counters', part: 'PART 3 · COUNTING THINGS',
    title: 'Counting things',
    grammar: '개 · 명 · 마리',
    intro: 'Korean cannot count nouns bare — every noun needs a counter word, chosen by what kind of thing it is. English does this occasionally (two SLICES of bread); Korean does it always.',
    kind: 'counters',
    rule: {
      head: '개 general · 명 people · 마리 animals',
      body: 'noun + number + counter',
      note: 'Numbers use the NATIVE set (하나·둘·셋…), and they change shape before the counter (하나 → 한, 둘 → 두, 셋 → 세, 넷 → 네).',
    },
    counters: [
      { counter: '개',   for: 'general things',    example: '사과 세 개',   exampleRoman: 'sagwa se gae',   exampleMeaning: 'three apples', scene: '🍎' },
      { counter: '명',   for: 'people',            example: '사람 두 명',   exampleRoman: 'saram du myeong', exampleMeaning: 'two people',   scene: '👥' },
      { counter: '마리', for: 'animals',           example: '고양이 한 마리', exampleRoman: 'goyangi han mari', exampleMeaning: 'one cat',   scene: '🐱' },
    ],
    postcard: { line: '사과 두 개 주세요.', roman: 'sagwa du gae juseyo.', meaning: 'Two apples please.', scene: '🍎' },
  },

  {
    n: 8, slug: 'more-counters', part: 'PART 3 · COUNTING THINGS',
    title: 'More counters',
    grammar: '살 · 권 · 장 · 잔',
    intro: 'Four more, chosen because a beginner meets them within a week of arriving.',
    kind: 'counters',
    rule: {
      head: '살 age · 권 books · 장 sheets · 잔 cups',
      note: 'Same native-number-changes rule. 열 살 (ten years old), 다섯 권 (five books).',
    },
    counters: [
      { counter: '살',  for: 'age',        example: '열 살이에요',   exampleRoman: 'yeol sarieyo',    exampleMeaning: "I'm ten years old", scene: '🎂' },
      { counter: '권',  for: 'books',      example: '책 다섯 권',    exampleRoman: 'chaek daseot gwon', exampleMeaning: 'five books',      scene: '📚' },
      { counter: '장',  for: 'sheets',     example: '종이 세 장',    exampleRoman: 'jongi se jang',    exampleMeaning: 'three sheets of paper', scene: '📄' },
      { counter: '잔',  for: 'cups',       example: '커피 두 잔',    exampleRoman: 'keopi du jan',     exampleMeaning: 'two cups of coffee', scene: '☕' },
    ],
    postcard: { line: '커피 한 잔 주세요.', roman: 'keopi han jan juseyo.', meaning: 'One coffee please.', scene: '☕' },
  },

  // ---------- PART 4 · JOINING AND WANTING ----------
  {
    n: 9, slug: 'and-also', part: 'PART 4 · JOINING AND WANTING',
    title: 'And, also',
    grammar: '하고 · 도',
    intro: '하고 joins two nouns. 도 replaces a particle to mean "too". Same 하고 is also "with" — a relief, not a confusion.',
    kind: 'phrases',
    rule: {
      head: 'noun 하고 noun · noun 도',
      body: '하고 also means "with" when used with a person.',
      note: 'Beginners find "with = and" delightful. Same word, two useful jobs.',
    },
    phrases: [
      { line: '밥하고 김치',         roman: 'baphago gimchi',       meaning: 'rice AND kimchi',        scene: '🍚' },
      { line: '저도 갔어요.',        roman: 'jeodo gasseoyo.',      meaning: 'I went TOO.',            scene: '🙋' },
      { line: '친구하고 갔어요.',    roman: 'chinguhago gasseoyo.', meaning: 'I went WITH a friend.',  scene: '👫' },
      { line: '커피하고 빵 주세요.', roman: 'keopihago ppang juseyo.', meaning: 'Coffee and bread, please.', scene: '☕' },
    ],
    postcard: { line: '저도 좋아해요.', roman: 'jeodo joahaeyo.', meaning: 'I like it too.', scene: '👍' },
  },

  {
    n: 10, slug: 'want-to', part: 'PART 4 · JOINING AND WANTING',
    title: 'I want to',
    grammar: '-고 싶어요',
    intro: 'Attaches straight onto the verb stem — no vowel rule to worry about. A welcome break after two units of number systems.',
    kind: 'phrases',
    rule: {
      head: 'verb-stem + 고 싶어요',
      body: '가다 → 가고 싶어요 · 먹다 → 먹고 싶어요',
      note: 'It literally means "want to VERB". Chain it: 한국에 가고 싶어요 — I want to go to Korea.',
    },
    phrases: [
      { line: '가고 싶어요.',           roman: 'gago sipeoyo.',           meaning: 'I want to go.',       scene: '🚪' },
      { line: '먹고 싶어요.',           roman: 'meokgo sipeoyo.',         meaning: 'I want to eat.',       scene: '🍚' },
      { line: '한국에 가고 싶어요.',    roman: 'hangugeo gago sipeoyo.',  meaning: 'I want to go to Korea.', scene: '🇰🇷' },
      { line: '자고 싶어요.',           roman: 'jago sipeoyo.',           meaning: 'I want to sleep.',     scene: '😴' },
    ],
    postcard: { line: '커피 마시고 싶어요.', roman: 'keopi masigo sipeoyo.', meaning: 'I want to drink coffee.', scene: '☕' },
  },

  // ---------- PART 5 · ASK AND ANSWER ----------
  {
    n: 11, slug: 'question-words', part: 'PART 5 · ASK AND ANSWER',
    title: 'Asking properly',
    grammar: '뭐 · 언제 · 누구 · 왜 · 어디 · 어떻게 · 얼마 · 몇',
    intro: 'The full set of question words, collected now that you have enough grammar to build a real question around each.',
    kind: 'vocab-with-examples',
    rule: {
      head: 'Eight question words. Learn them together.',
      note: 'They almost always land near the start of the question. Put the verb where it always lives — at the end.',
    },
    words: [
      { word: '뭐',    roman: 'mwo',      meaning: 'what',       example: '뭐 먹어요?',     exampleMeaning: 'What are you eating?', scene: '❓' },
      { word: '언제',  roman: 'eonje',    meaning: 'when',       example: '언제 왔어요?',    exampleMeaning: 'When did you come?',   scene: '⏰' },
      { word: '누구',  roman: 'nugu',     meaning: 'who',        example: '누구예요?',       exampleMeaning: 'Who is it?',           scene: '👤' },
      { word: '왜',    roman: 'wae',      meaning: 'why',        example: '왜 갔어요?',      exampleMeaning: 'Why did you go?',      scene: '🤔' },
      { word: '어디',  roman: 'eodi',     meaning: 'where',      example: '어디에서 샀어요?', exampleMeaning: 'Where did you buy it?', scene: '🗺️' },
      { word: '어떻게', roman: 'eotteoke', meaning: 'how',        example: '어떻게 해요?',    exampleMeaning: 'How do you do it?',    scene: '🛠️' },
      { word: '얼마',  roman: 'eolma',    meaning: 'how much',   example: '얼마예요?',       exampleMeaning: 'How much is it?',      scene: '💰' },
      { word: '몇',    roman: 'myeot',    meaning: 'how many',   example: '몇 살이에요?',    exampleMeaning: 'How old are you?',    scene: '🔢' },
    ],
    postcard: { line: '오늘 뭐 했어요?', roman: 'oneul mwo haesseoyo?', meaning: 'What did you do today?', scene: '🤔' },
  },

  // ---------- PART 6 · MIRA'S WEEK ----------
  {
    n: 12, slug: 'the-diary', part: "PART 6 · MIRA'S WEEK",
    title: "The diary",
    grammar: 'everything so far',
    intro: "Mira's full week, in her diary. Read each entry and pick the verb that finishes it. No new words — just proof of how much you can already read.",
    kind: 'diary',
    entries: [
      {
        setting: 'MONDAY · 월요일',
        prefix: '오늘 아침 학교에',
        gap: '갔어요',
        suffix: '.',
        roman: 'oneul achim hakgyoe gasseoyo.',
        meaning: 'This morning I went to school.',
        tray: ['갔어요', '왔어요', '먹었어요'],
      },
      {
        setting: 'TUESDAY · 화요일',
        prefix: '점심에 김밥을',
        gap: '먹었어요',
        suffix: '.',
        roman: 'jeomsime gimbabeul meogeosseoyo.',
        meaning: 'At lunch I ate kimbap.',
        tray: ['먹었어요', '마셨어요', '갔어요'],
      },
      {
        setting: 'WEDNESDAY · 수요일',
        prefix: '카페에서 커피를',
        gap: '마셨어요',
        suffix: '.',
        roman: 'kapeeeseo keopireul masyeosseoyo.',
        meaning: 'I drank coffee at the café.',
        tray: ['봤어요', '마셨어요', '했어요'],
      },
      {
        setting: 'THURSDAY · 목요일',
        prefix: '친구를 공원에서',
        gap: '봤어요',
        suffix: '.',
        roman: 'chingureul gongwoneseo bwasseoyo.',
        meaning: 'I saw a friend at the park.',
        tray: ['봤어요', '있었어요', '왔어요'],
      },
      {
        setting: 'FRIDAY · 금요일',
        prefix: '저녁에 한국어를',
        gap: '공부했어요',
        suffix: '.',
        roman: 'jeonyeoge hangugeoreul gongbuhaesseoyo.',
        meaning: 'In the evening I studied Korean.',
        tray: ['공부했어요', '먹었어요', '갔어요'],
      },
      {
        setting: 'SATURDAY · 토요일',
        prefix: '유나 집에',
        gap: '있었어요',
        suffix: '.',
        roman: 'yuna jibe isseosseoyo.',
        meaning: "I was at Yuna's house.",
        tray: ['있었어요', '갔어요', '왔어요'],
      },
      {
        setting: 'SUNDAY · 일요일',
        prefix: '오늘은 아무것도 안',
        gap: '했어요',
        suffix: '.',
        roman: 'oneureun amugeotdo an haesseoyo.',
        meaning: 'Today I did nothing.',
        tray: ['했어요', '갔어요', '먹었어요'],
      },
    ],
    postcard: { line: '재미있는 한 주였어요.', roman: 'jaemiinneun han juyeosseoyo.', meaning: 'It was a fun week.', scene: '📓' },
  },
]

export function unitBySlug(slug) { return UNITS.find(u => u.slug === slug) }
export function unitActivityKey(slug) { return `yt-${slug}` }
export const ALL_ACTIVITY_KEYS = UNITS.map(u => unitActivityKey(u.slug))
export const TOTAL_UNITS = UNITS.length
