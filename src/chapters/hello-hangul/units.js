// All 19 units. Compound vowels sit at unit 9 (end of Part 1) so Part 1 delivers the
// complete writing system before Part 2 begins.
//
// Romanisation policy (Revised Romanization, official ROK 2000):
//   - Written together within a word: annyeonghaseyo, not annyeong-ha-se-yo
//   - Spaces between words: mul juseyo
//   - Reflects linking (batchim moves into next ㅇ): 한국어 → hangugeo, 맛있어요 → masisseoyo
//   - Every entry stores `roman` as its own field. The runner shows it in a muted line
//     right below the Korean, and the Hangul-only toggle hides those lines with CSS only —
//     so the display strings never mix the two.

export const UNITS = [
  // ============= PART 1 · THE LETTERS ARE PICTURES OF YOUR MOUTH =============
  {
    n: 1, slug: 'kings-idea', part: 'PART 1 · THE LETTERS', title: "A king's good idea",
    intro: "In 1443 a king had an idea: what if the letters were pictures of your mouth making the sound? Meet the five basic ones.",
    kind: 'letters',
    letters: [
      { letter: 'ㄱ', sound: 'g',  hint: 'Back of the tongue humps up against the roof.' },
      { letter: 'ㄴ', sound: 'n',  hint: 'Tongue tip touches behind the front teeth.' },
      { letter: 'ㅁ', sound: 'm',  hint: 'Lips closed — a square, seen from the front.' },
      { letter: 'ㅅ', sound: 's',  hint: 'A single tooth. Air hisses past.' },
      { letter: 'ㅇ', sound: 'silent / ng', hint: 'Silent at the front of a block, "ng" at the back.' },
    ],
    postcard: { line: '안녕!', roman: 'annyeong!', meaning: 'Hi! (friend to friend)', scene: '👋' },
  },
  {
    n: 2, slug: 'sky-earth-person', part: 'PART 1 · THE LETTERS', title: 'Sky, earth, person',
    intro: 'Vowels are made of three pieces only: a short stroke (the sun), a flat line (the earth), and an upright line (a person). Put them together — that is every vowel.',
    kind: 'vowels',
    letters: [
      { letter: 'ㅏ', sound: 'a',   hint: 'Person standing, sun on the right.' },
      { letter: 'ㅓ', sound: 'eo',  hint: 'Person standing, sun on the left.' },
      { letter: 'ㅗ', sound: 'o',   hint: 'Sun above the earth.' },
      { letter: 'ㅜ', sound: 'u',   hint: 'Sun below the earth.' },
      { letter: 'ㅡ', sound: 'eu',  hint: 'Just the earth line.' },
      { letter: 'ㅣ', sound: 'i',   hint: 'Just the person standing.' },
    ],
    postcard: { line: '안녕!', roman: 'annyeong!', meaning: 'Hi!', scene: '☀️ 🌏' },
  },
  {
    n: 3, slug: 'squares-not-lines', part: 'PART 1 · THE LETTERS', title: 'Squares, not lines',
    intro: "Korean packs each syllable into a square. Every square must begin with a consonant. When the syllable starts with a vowel sound, ㅇ takes the front seat and says nothing. Build your first three real words.",
    kind: 'builder',
    builders: [
      { target: ['ㅇ', 'ㅏ'],       layout: 'tall', tray: ['ㅇ','ㅏ','ㅁ','ㅗ'], word: '아',  roman: 'a',       meaning: 'a (sound only)' },
      { target: ['ㅇ', 'ㅏ', 'ㅇ', 'ㅣ'], _twoBlocks: true, layout: 'tall', tray: ['ㅇ','ㅏ','ㅇ','ㅣ'],
        word: '아이', roman: 'ai',    meaning: 'child' },
      { target: ['ㅇ', 'ㅗ', 'ㅇ', 'ㅣ'], _twoBlocks: true, layout: 'wide',
        tray: ['ㅇ','ㅗ','ㅇ','ㅣ','ㅏ'], word: '오이', roman: 'oi',    meaning: 'cucumber' },
      { target: ['ㅇ', 'ㅜ', 'ㅇ', 'ㅠ'], _twoBlocks: true, layout: 'wide',
        tray: ['ㅇ','ㅜ','ㅇ','ㅠ','ㅗ'], word: '우유', roman: 'uyu',   meaning: 'milk' },
    ],
    postcard: { line: '아이 · 오이 · 우유', roman: 'ai · oi · uyu', meaning: 'You just read three real Korean words.', scene: '👶 🥒 🥛' },
  },
  {
    n: 4, slug: 'add-line-add-puff', part: 'PART 1 · THE LETTERS', title: 'Add a line, add a puff',
    intro: 'An extra stroke means an extra puff of air. Hold a paper strip in front of your mouth: ㄱ barely stirs it, ㅋ makes it jump.',
    kind: 'letters',
    letters: [
      { letter: 'ㅋ', sound: 'k',  hint: 'Same tongue place as ㄱ, but with a big puff of air.' },
      { letter: 'ㄷ', sound: 'd',  hint: 'Same place as ㄴ, but a hard tap.' },
      { letter: 'ㅌ', sound: 't',  hint: 'Same as ㄷ, plus a big puff.' },
      { letter: 'ㅂ', sound: 'b',  hint: 'Lips closed, then pop open.' },
      { letter: 'ㅍ', sound: 'p',  hint: 'Lips close then explode with air.' },
      { letter: 'ㅈ', sound: 'j',  hint: 'Tongue on the roof, softly.' },
      { letter: 'ㅊ', sound: 'ch', hint: 'Same as ㅈ, plus a big puff.' },
      { letter: 'ㅎ', sound: 'h',  hint: 'Just breath, like sighing "hah".' },
    ],
    postcard: { line: '차 좋아요', roman: 'cha joayo', meaning: 'I like tea.', scene: '🍵' },
  },
  {
    n: 5, slug: 'squeeze', part: 'PART 1 · THE LETTERS', title: 'Say it with a squeeze',
    intro: "Doubled letters aren't twice as loud — they're squeezed. Tense muscle, no puff at all. Listen to 가 · 카 · 까 back to back.",
    kind: 'listen',
    letters: [
      { letter: 'ㄲ', sound: 'kk', hint: 'Squeezed ㄱ. Tense throat, no air.' },
      { letter: 'ㄸ', sound: 'tt', hint: 'Squeezed ㄷ.' },
      { letter: 'ㅃ', sound: 'pp', hint: 'Squeezed ㅂ.' },
      { letter: 'ㅆ', sound: 'ss', hint: 'Squeezed ㅅ.' },
      { letter: 'ㅉ', sound: 'jj', hint: 'Squeezed ㅈ.' },
    ],
    triples: [
      { plain: '가', plainRoman: 'ga', aspirated: '카', aspRoman: 'ka', tense: '까', tenseRoman: 'kka' },
      { plain: '다', plainRoman: 'da', aspirated: '타', aspRoman: 'ta', tense: '따', tenseRoman: 'tta' },
      { plain: '바', plainRoman: 'ba', aspirated: '파', aspRoman: 'pa', tense: '빠', tenseRoman: 'ppa' },
    ],
    postcard: { line: '괜찮아요', roman: 'gwaenchanayo', meaning: "It's fine.", scene: '🙂' },
  },
  {
    n: 6, slug: 'batchim', part: 'PART 1 · THE LETTERS', title: 'The letter underneath',
    intro: 'A third letter can sit beneath a block — the batchim. Final consonants are held, not released: the p in 밥 ends with lips closed and no burst.',
    kind: 'words',
    words: [
      { word: '밥', roman: 'bap', meaning: 'rice / meal',  scene: '🍚' },
      { word: '곰', roman: 'gom', meaning: 'bear',          scene: '🐻' },
      { word: '산', roman: 'san', meaning: 'mountain',       scene: '⛰️' },
      { word: '문', roman: 'mun', meaning: 'door',           scene: '🚪' },
      { word: '김', roman: 'gim', meaning: 'dried seaweed',  scene: '🌊' },
    ],
    postcard: { line: '밥 먹어요', roman: 'bap meogeoyo', meaning: "I'm eating.", scene: '🍚' },
  },
  {
    n: 7, slug: 'two-faces-of-ieung', part: 'PART 1 · THE LETTERS', title: 'The two faces of ㅇ',
    intro: 'On top it says nothing. Underneath, the same shape becomes "ng". 아이 has no ㅇ sound; 강아지 does — at the bottom.',
    kind: 'words',
    words: [
      { word: '아이',      roman: 'ai',           meaning: 'child',      scene: '👶' },
      { word: '강아지',    roman: 'gangaji',     meaning: 'puppy',      scene: '🐶' },
      { word: '오랑우탄', roman: 'orang-utan',   meaning: 'orangutan',  scene: '🦧' },
    ],
    postcard: { line: '강아지 귀여워요', roman: 'gangaji gwiyeowoyo', meaning: 'The puppy is cute.', scene: '🐶' },
  },
  {
    n: 8, slug: 'tricky-twins', part: 'PART 1 · THE LETTERS', title: 'The tricky twins',
    intro: "These pairs sound close but they're not the same. Two options only, never more.",
    kind: 'listen',
    letters: [
      { letter: 'ㅓ', sound: 'eo (like "cup")',  hint: 'Like the vowel in English "cup".' },
      { letter: 'ㅗ', sound: 'o  (like "oh")',   hint: 'Rounded lips.' },
      { letter: 'ㅡ', sound: 'eu',               hint: '"oo" with lips completely unrounded.' },
      { letter: 'ㅜ', sound: 'u  (like "boot")', hint: 'Like "oo" in "boot".' },
    ],
    postcard: { line: '천천히 말해 주세요', roman: 'cheoncheonhi malhae juseyo', meaning: 'Please speak slowly.', scene: '🐢' },
  },
  {
    // NEW UNIT — inserted so Part 1 finishes with the complete writing system.
    n: 9, slug: 'compound-vowels', part: 'PART 1 · THE LETTERS', title: 'Two vowels, one sound',
    intro: 'The last eleven vowels are just two of the ones you already know, stuck together. Two rules cover all of them.',
    kind: 'compound-vowels',
    relief: 'Modern Seoul speech treats ㅐ / ㅔ and ㅙ / ㅚ / ㅞ as identical. Even native speakers cannot hear them apart — they just memorise which spelling each word uses. So you do not need to distinguish them by ear.',
    // The big idea, shown once before the rules begin — one example of each rule.
    preview: [
      { a: 'ㅏ', b: 'ㅣ', result: 'ㅐ', label: 'Rule A' },
      { a: 'ㅗ', b: 'ㅏ', result: 'ㅘ', label: 'Rule B' },
    ],
    // Rule A: base + ㅣ, mouth closes
    ruleA: {
      title: 'Add ㅣ — mouth closes',
      hint: 'Any vowel followed by ㅣ blends toward "ee".',
      pairs: [
        { a: 'ㅏ', b: 'ㅣ', result: 'ㅐ', roman: 'ae'  },
        { a: 'ㅓ', b: 'ㅣ', result: 'ㅔ', roman: 'e'   },
        { a: 'ㅑ', b: 'ㅣ', result: 'ㅒ', roman: 'yae' },
        { a: 'ㅕ', b: 'ㅣ', result: 'ㅖ', roman: 'ye'  },
        { a: 'ㅗ', b: 'ㅣ', result: 'ㅚ', roman: 'oe'  },
        { a: 'ㅜ', b: 'ㅣ', result: 'ㅟ', roman: 'wi'  },
        { a: 'ㅡ', b: 'ㅣ', result: 'ㅢ', roman: 'ui'  },
      ],
    },
    // Rule B: base ㅗ / ㅜ + vowel, adds a "w" glide
    ruleB: {
      title: 'Start with ㅗ or ㅜ — a "w" slides in',
      hint: 'A "w" slides in at the front of the sound.',
      pairs: [
        { a: 'ㅗ', b: 'ㅏ', result: 'ㅘ', roman: 'wa'  },
        { a: 'ㅗ', b: 'ㅐ', result: 'ㅙ', roman: 'wae' },
        { a: 'ㅜ', b: 'ㅓ', result: 'ㅝ', roman: 'wo'  },
        { a: 'ㅜ', b: 'ㅔ', result: 'ㅞ', roman: 'we'  },
      ],
    },
    words: [
      { word: '네',    roman: 'ne',    meaning: 'yes',      scene: '👍' },
      { word: '개',    roman: 'gae',   meaning: 'dog',      scene: '🐕' },
      { word: '새',    roman: 'sae',   meaning: 'bird',     scene: '🐦' },
      { word: '게',    roman: 'ge',    meaning: 'crab',     scene: '🦀' },
      { word: '뭐',    roman: 'mwo',   meaning: 'what',     scene: '❓' },
      { word: '왜',    roman: 'wae',   meaning: 'why',      scene: '🤔' },
      { word: '위',    roman: 'wi',    meaning: 'above',    scene: '⬆️' },
      { word: '사과',  roman: 'sagwa', meaning: 'apple',    scene: '🍎' },
      { word: '의자',  roman: 'uija',  meaning: 'chair',    scene: '🪑' },
      { word: '회사',  roman: 'hoesa', meaning: 'company',  scene: '🏢' },
    ],
    postcard: { line: '네! 왜요?', roman: 'ne! waeyo?', meaning: 'Yes! Why?', scene: '🤔' },
  },

  // ============= PART 2 · WORDS YOU ALREADY KNOW =============
  {
    n: 10, slug: 'read-already', part: 'PART 2 · WORDS YOU KNOW', title: 'You can read this already',
    intro: "Loanwords are pronounced letter-by-letter. Sound each one out — you already know what it means.",
    kind: 'loanwords',
    words: [
      { word: '버스',        roman: 'beoseu',       meaning: 'bus',        scene: '🚌' },
      { word: '커피',        roman: 'keopi',        meaning: 'coffee',     scene: '☕' },
      { word: '카메라',      roman: 'kamera',       meaning: 'camera',     scene: '📷' },
      { word: '택시',        roman: 'taeksi',       meaning: 'taxi',       scene: '🚕' },
      { word: '피자',        roman: 'pija',         meaning: 'pizza',      scene: '🍕' },
      { word: '바나나',      roman: 'banana',       meaning: 'banana',     scene: '🍌' },
      { word: '초콜릿',      roman: 'chokollit',    meaning: 'chocolate',  scene: '🍫' },
      { word: '아이스크림', roman: 'aiseukeurim',  meaning: 'ice cream',   scene: '🍦' },
    ],
    postcard: { line: '피자 좋아해요!', roman: 'pija joahaeyo!', meaning: 'I love pizza!', scene: '🍕' },
  },
  {
    n: 11, slug: 'your-name', part: 'PART 2 · WORDS YOU KNOW', title: 'Your name in Hangul',
    intro: 'Type your name (or a friend\'s) — see it built into blocks, hear it in a Korean voice.',
    kind: 'name-builder',
    postcard: { line: '이름이 뭐예요?', roman: 'ireumi mwoyeyo?', meaning: "What's your name?", scene: '📛' },
  },
  {
    n: 12, slug: 'linking', part: 'PART 2 · WORDS YOU KNOW', title: 'Words slide into each other',
    intro: '한국어 is written han-guk-eo but sounds like han-gu-geo. The bottom letter of one block slides forward into the empty ㅇ of the next.',
    kind: 'linking',
    examples: [
      { word: '한국어', written: 'hanguk-eo', spoken: 'hangugeo', meaning: 'Korean (language)' },
      { word: '음악',    written: 'eum-ak',   spoken: 'eumak',    meaning: 'music' },
      { word: '옷이',    written: 'ot-i',     spoken: 'osi',      meaning: 'clothes (subject)' },
    ],
    postcard: { line: '한국어 재미있어요', roman: 'hangugeo jaemiisseoyo', meaning: 'Korean is fun.', scene: '🎵' },
  },

  // ============= PART 3 · WORDS THAT WORK =============
  {
    n: 13, slug: 'annyeong', part: 'PART 3 · WORDS THAT WORK', title: '안녕하세요',
    intro: 'To a friend: 안녕. To everyone else: 안녕하세요. That extra 요 on the end is politeness — the most valuable syllable in Korean.',
    kind: 'phrases',
    phrases: [
      { line: '안녕',           roman: 'annyeong',              meaning: 'Hi (friend)',                    scene: '👋' },
      { line: '안녕하세요',       roman: 'annyeonghaseyo',         meaning: 'Hello (polite)',                  scene: '🙇' },
      { line: '안녕히 계세요',    roman: 'annyeonghi gyeseyo',     meaning: "Goodbye (if you're leaving)",     scene: '🚪' },
      { line: '안녕히 가세요',    roman: 'annyeonghi gaseyo',      meaning: "Goodbye (if they're leaving)",    scene: '👋' },
    ],
    postcard: { line: '안녕하세요!', roman: 'annyeonghaseyo!', meaning: 'Hello!', scene: '🙇' },
  },
  {
    n: 14, slug: 'juseyo', part: 'PART 3 · WORDS THAT WORK', title: '주세요, the magic word',
    intro: 'It means "please give me". Clip it onto the end of any noun — you have a sentence.',
    kind: 'phrases',
    phrases: [
      { line: '물 주세요',    roman: 'mul juseyo',    meaning: 'Water please',     scene: '💧' },
      { line: '이거 주세요',   roman: 'igeo juseyo',   meaning: 'This one please',   scene: '👉' },
      { line: '김밥 주세요',   roman: 'gimbap juseyo', meaning: 'Kimbap please',     scene: '🍱' },
      { line: '커피 주세요',   roman: 'keopi juseyo',  meaning: 'Coffee please',     scene: '☕' },
    ],
    postcard: { line: '김밥 주세요!', roman: 'gimbap juseyo!', meaning: 'Kimbap please!', scene: '🍱' },
  },
  {
    n: 15, slug: 'i-am', part: 'PART 3 · WORDS THAT WORK', title: '저는 ___ 예요',
    intro: '"I am ___." The rule: 예요 after a vowel, 이에요 after a consonant. 저는 미라예요 — "I am Mira."',
    kind: 'phrases',
    phrases: [
      { line: '저는 미라예요',    roman: 'jeoneun mirayeyo',       meaning: 'I am Mira.',       scene: '🧒' },
      { line: '저는 유나예요',    roman: 'jeoneun yunayeyo',       meaning: 'I am Yuna.',        scene: '👧' },
      { line: '저는 학생이에요',  roman: 'jeoneun haksaengieyo',   meaning: 'I am a student.',   scene: '🎒' },
    ],
    postcard: { line: '저는 유나예요.', roman: 'jeoneun yunayeyo.', meaning: 'I am Yuna.', scene: '👧' },
  },
  {
    n: 16, slug: 'numbers', part: 'PART 3 · WORDS THAT WORK', title: 'Numbers, twice over',
    intro: "Korean has two sets of numbers. If you can point at it and count, use native (하나, 둘, 셋). If it's on a price tag or a clock, use Sino (일, 이, 삼).",
    kind: 'numbers',
    postcard: { line: '하나, 둘, 셋!', roman: 'hana, dul, set!', meaning: 'One, two, three!', scene: '🔢' },
  },
  {
    n: 17, slug: 'tasty', part: 'PART 3 · WORDS THAT WORK', title: '맛있어요!',
    intro: 'A handful of everyday reactions.',
    kind: 'phrases',
    phrases: [
      { line: '맛있어요',   roman: 'masisseoyo',    meaning: 'Delicious',        scene: '😋' },
      { line: '좋아요',     roman: 'joayo',          meaning: 'I like it / good',  scene: '👍' },
      { line: '괜찮아요',    roman: 'gwaenchanayo',   meaning: "It's fine",         scene: '🙂' },
      { line: '몰라요',     roman: 'mollayo',        meaning: "I don't know",      scene: '🤷' },
    ],
    postcard: { line: '맛있어요!', roman: 'masisseoyo!', meaning: 'Delicious!', scene: '😋' },
  },
  {
    n: 18, slug: 'ask-anything', part: 'PART 3 · WORDS THAT WORK', title: 'Ask anything',
    intro: 'The four most useful questions any beginner can own.',
    kind: 'phrases',
    phrases: [
      { line: '이게 뭐예요?',           roman: 'ige mwoyeyo?',                    meaning: 'What is this?',           scene: '❓' },
      { line: '얼마예요?',              roman: 'eolmayeyo?',                       meaning: 'How much?',                scene: '💰' },
      { line: '화장실 어디예요?',      roman: 'hwajangsil eodiyeyo?',             meaning: 'Where is the toilet?',      scene: '🚻' },
      { line: '천천히 말해 주세요',    roman: 'cheoncheonhi malhae juseyo',       meaning: 'Please speak slowly.',      scene: '🐢' },
    ],
    postcard: { line: '천천히 말해 주세요', roman: 'cheoncheonhi malhae juseyo', meaning: 'Please speak slowly.', scene: '🐢' },
  },
  {
    n: 19, slug: 'say-it-all', part: 'PART 3 · WORDS THAT WORK', title: 'Say it all',
    intro: "Yuna calls. Use everything you've learned — a real short conversation.",
    kind: 'conversation',
    dialog: [
      { who: 'Yuna', line: '안녕하세요!',              roman: 'annyeonghaseyo!',                    meaning: 'Hello!' },
      { who: 'You',  line: '안녕하세요! 저는 미라예요.', roman: 'annyeonghaseyo! jeoneun mirayeyo.', meaning: 'Hello! I am Mira.' },
      { who: 'Yuna', line: '뭐 드실래요?',             roman: 'mwo deusillaeyo?',                   meaning: 'What would you like?' },
      { who: 'You',  line: '김밥 주세요.',              roman: 'gimbap juseyo.',                     meaning: 'Kimbap please.' },
      { who: 'Yuna', line: '맛있어요?',                 roman: 'masisseoyo?',                         meaning: 'Is it tasty?' },
      { who: 'You',  line: '네! 맛있어요.',             roman: 'ne! masisseoyo.',                     meaning: 'Yes! Delicious.' },
      { who: 'You',  line: '안녕히 계세요.',              roman: 'annyeonghi gyeseyo.',                 meaning: "Goodbye (I'm leaving)." },
      { who: 'Yuna', line: '안녕히 가세요!',              roman: 'annyeonghi gaseyo!',                  meaning: 'Goodbye!' },
    ],
    postcard: { line: '또 만나요!', roman: 'tto mannayo!', meaning: 'See you again!', scene: '👋' },
  },
]

export function unitBySlug(slug) { return UNITS.find(u => u.slug === slug) }
export function unitActivityKey(slug) { return `hh-${slug}` }
export const ALL_ACTIVITY_KEYS = UNITS.map(u => unitActivityKey(u.slug))
export const TOTAL_UNITS = UNITS.length
