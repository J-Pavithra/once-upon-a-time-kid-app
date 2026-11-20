// Chapter 8 · Let's Make a Plan — 12 units.
//
// From the curriculum PDF (chapters-5-to-8):
//   The frame: Mira and Yuna plan a day out, argue gently about it, and do
//   it. Planning is the natural home for the future tense, requests, and
//   every "but" and "so" in the chapter.
//
//   Ends at TOPIK 1 · A1 complete · ~800 words total.

export const UNITS = [
  // ---------- PART 1 · DESCRIBING ----------
  {
    n: 1, slug: 'describing', part: 'PART 1 · DESCRIBING',
    title: 'Describing things',
    grammar: 'adjectives · -아요 / -어요',
    intro: 'Korean adjectives behave like verbs — they conjugate with the same -아요/어요 rule you already own. That is a genuine gift.',
    kind: 'adj-table',
    rule: {
      head: 'Adjectives use the SAME rule as verbs.',
      body: 'stem has ㅏ or ㅗ → 아요 · everything else → 어요',
      note: 'If you can build 먹어요, you can build 좋아요. Same rule, different word class.',
    },
    adjs: [
      { dict: '크다',    polite: '커요',      meaning: 'big',        dictRoman: 'keuda',    politeRoman: 'keoyo' },
      { dict: '작다',    polite: '작아요',    meaning: 'small',      dictRoman: 'jakda',    politeRoman: 'jagayo' },
      { dict: '좋다',    polite: '좋아요',    meaning: 'good',       dictRoman: 'jota',     politeRoman: 'joayo' },
      { dict: '나쁘다',  polite: '나빠요',    meaning: 'bad',        dictRoman: 'nappeuda', politeRoman: 'nappayo' },
      { dict: '예쁘다',  polite: '예뻐요',    meaning: 'pretty',     dictRoman: 'yeppeuda', politeRoman: 'yeppeoyo' },
      { dict: '비싸다',  polite: '비싸요',    meaning: 'expensive',  dictRoman: 'bissada',  politeRoman: 'bissayo' },
      { dict: '맛있다',  polite: '맛있어요',  meaning: 'delicious',  dictRoman: 'masitda',  politeRoman: 'masisseoyo' },
      { dict: '재미있다', polite: '재미있어요', meaning: 'fun',        dictRoman: 'jaemiitda', politeRoman: 'jaemiisseoyo' },
    ],
    postcard: { line: '오늘 날씨가 좋아요.', roman: 'oneul nalssiga joayo.', meaning: 'The weather is nice today.', scene: '☀️' },
  },

  {
    n: 2, slug: 'noun-modifier', part: 'PART 1 · DESCRIBING',
    title: 'Describing before the noun',
    grammar: '-(으)ㄴ',
    intro: 'To put an adjective in FRONT of a noun, it changes shape. Same idea in English — but the changes are cleaner in Korean.',
    kind: 'noun-modifier',
    rule: {
      head: 'vowel stem → + ㄴ · consonant stem → + 은',
      body: '예쁘다 → 예쁜 꽃 · 작다 → 작은 집',
      note: 'The 있다 family is different — it takes 는: 맛있는 김치, 재미있는 책. Learn that as its own fact.',
    },
    pairs: [
      { adj: '예쁘다', mod: '예쁜',   noun: '꽃', full: '예쁜 꽃',   roman: 'yeppeun kkot',    meaning: 'pretty flower', kind: 'vowel' },
      { adj: '작다',   mod: '작은',   noun: '집', full: '작은 집',   roman: 'jageun jip',      meaning: 'small house',   kind: 'consonant' },
      { adj: '큰',     mod: '큰',     noun: '가방', full: '큰 가방', roman: 'keun gabang',     meaning: 'big bag',       kind: 'vowel' },
      { adj: '좋다',   mod: '좋은',   noun: '친구', full: '좋은 친구', roman: 'joeun chingu',   meaning: 'good friend',   kind: 'consonant' },
      { adj: '맛있다', mod: '맛있는', noun: '김치', full: '맛있는 김치', roman: 'masinneun gimchi', meaning: 'delicious kimchi', kind: 'itda' },
      { adj: '재미있다', mod: '재미있는', noun: '책', full: '재미있는 책', roman: 'jaemiinneun chaek', meaning: 'fun book', kind: 'itda' },
    ],
    postcard: { line: '재미있는 하루였어요.', roman: 'jaemiinneun haruyeosseoyo.', meaning: 'It was a fun day.', scene: '🎉' },
  },

  // ---------- PART 2 · JOINING SENTENCES ----------
  {
    n: 3, slug: 'sentence-connectors', part: 'PART 2 · JOINING SENTENCES',
    title: 'Joining two sentences',
    grammar: '그리고 · 그런데 · 그래서',
    intro: 'Sentence-level connectors first — they are just words placed at the start, no conjugation, and they immediately double how much you can say.',
    kind: 'phrases',
    rule: {
      head: '그리고 (and) · 그런데 (but) · 그래서 (so)',
      body: 'Place them at the START of the second sentence.',
      note: 'These are word connectors. Unit 4 shows how to do the SAME joins tucked inside one sentence — tidier, but harder.',
    },
    phrases: [
      { line: '밥을 먹었어요. 그리고 커피를 마셨어요.', roman: 'babeul meogeosseoyo. geurigo keopireul masyeosseoyo.', meaning: 'I ate. AND I drank coffee.', scene: '☕' },
      { line: '비쌌어요. 그런데 샀어요.',                 roman: 'bissasseoyo. geureonde sasseoyo.',                     meaning: 'It was expensive. BUT I bought it.', scene: '🛍️' },
      { line: '비가 왔어요. 그래서 집에 있었어요.',        roman: 'biga wasseoyo. geuraeseo jibe isseosseoyo.',           meaning: 'It rained. SO I stayed home.', scene: '🌧️' },
    ],
    postcard: { line: '재미있어요. 그리고 쉬워요.', roman: 'jaemiisseoyo. geurigo swiwoyo.', meaning: "It's fun. And easy.", scene: '😊' },
  },

  {
    n: 4, slug: 'clause-connectors', part: 'PART 2 · JOINING SENTENCES',
    title: 'Joining inside one sentence',
    grammar: '-고 · -지만',
    intro: 'Now the same joins, tidier — on the verb stem. Read each pair side by side and feel how the second one flows.',
    kind: 'pair',
    rule: {
      head: 'verb-stem + 고 (and) · verb-stem + 지만 (but)',
      body: '밥을 먹고 커피를 마셨어요 · 비쌌지만 샀어요',
      note: 'Same meaning as unit 3\'s 그리고 / 그런데, but folded into one sentence. The learner should feel the second is tidier.',
    },
    pairs: [
      {
        left:  { line: '밥을 먹었어요. 그리고 커피를 마셨어요.', roman: 'babeul meogeosseoyo. geurigo keopireul masyeosseoyo.', meaning: 'Two sentences.', scene: '📖' },
        right: { line: '밥을 먹고 커피를 마셨어요.',              roman: 'babeul meokgo keopireul masyeosseoyo.',                meaning: 'One tidy sentence.', scene: '✨' },
      },
      {
        left:  { line: '비쌌어요. 그런데 샀어요.',              roman: 'bissasseoyo. geureonde sasseoyo.',                     meaning: 'Two sentences.', scene: '📖' },
        right: { line: '비쌌지만 샀어요.',                       roman: 'bissatjiman sasseoyo.',                                meaning: 'One tidy sentence.', scene: '✨' },
      },
    ],
    postcard: { line: '피곤하지만 재미있어요.', roman: 'pigonhajiman jaemiisseoyo.', meaning: "I'm tired but it's fun.", scene: '😅' },
  },

  {
    n: 5, slug: 'because', part: 'PART 2 · JOINING SENTENCES',
    title: 'Because',
    grammar: '-아서 / -어서',
    intro: 'The same vowel rule again — third time. By now it should feel like an old friend, not a rule.',
    kind: 'phrases',
    rule: {
      head: 'stem has ㅏ or ㅗ → 아서 · everything else → 어서',
      body: '배가 고파서 밥을 먹었어요 · 비가 와서 안 갔어요',
      note: '-아서/어서 cannot be used with a command or a suggestion. For "let\'s go BECAUSE it\'s late" Korean uses a different connector — that\'s next-level territory. Say the limit out loud instead of letting them discover it by being corrected.',
    },
    phrases: [
      { line: '배가 고파서 밥을 먹었어요.', roman: 'baega gopaseo babeul meogeosseoyo.', meaning: 'I was hungry, so I ate.', scene: '🍚' },
      { line: '비가 와서 안 갔어요.',       roman: 'biga waseo an gasseoyo.',           meaning: "It rained, so I didn't go.", scene: '🌧️' },
      { line: '좋아서 샀어요.',              roman: 'joaseo sasseoyo.',                  meaning: 'I liked it, so I bought it.', scene: '🛍️' },
    ],
    postcard: { line: '재미있어서 또 왔어요.', roman: 'jaemiisseoseo tto wasseoyo.', meaning: 'It was fun, so I came again.', scene: '🎉' },
  },

  // ---------- PART 3 · WHAT COMES NEXT ----------
  {
    n: 6, slug: 'future', part: 'PART 3 · WHAT COMES NEXT',
    title: "What I'm going to do",
    grammar: '-(으)ㄹ 거예요',
    intro: 'The future — and by extension, intention. Attach one shape or the other to the verb stem.',
    kind: 'verb-form',
    rule: {
      head: 'vowel stem → + ㄹ 거예요',
      body: 'consonant stem → + 을 거예요',
      note: '가다 → 갈 거예요 · 먹다 → 먹을 거예요. Same shape works for "I intend to" — the future in Korean is often intention too.',
    },
    verbs: [
      { dict: '가다',       form: '갈 거예요',       meaning: 'will go',       dictRoman: 'gada',      formRoman: 'gal geoyeyo',      stemKind: 'vowel' },
      { dict: '오다',       form: '올 거예요',       meaning: 'will come',     dictRoman: 'oda',       formRoman: 'ol geoyeyo',       stemKind: 'vowel' },
      { dict: '보다',       form: '볼 거예요',       meaning: 'will see',      dictRoman: 'boda',      formRoman: 'bol geoyeyo',      stemKind: 'vowel' },
      { dict: '먹다',       form: '먹을 거예요',     meaning: 'will eat',      dictRoman: 'meokda',    formRoman: 'meogeul geoyeyo',  stemKind: 'consonant' },
      { dict: '읽다',       form: '읽을 거예요',     meaning: 'will read',     dictRoman: 'ikda',      formRoman: 'ilgeul geoyeyo',   stemKind: 'consonant' },
      { dict: '하다',       form: '할 거예요',       meaning: 'will do',       dictRoman: 'hada',      formRoman: 'hal geoyeyo',      stemKind: 'vowel' },
    ],
    postcard: { line: '내일 서울에 갈 거예요.', roman: 'naeil seoure gal geoyeyo.', meaning: "I'm going to Seoul tomorrow.", scene: '🗼' },
  },

  {
    n: 7, slug: 'polite-request', part: 'PART 3 · WHAT COMES NEXT',
    title: 'Asking politely',
    grammar: '-(으)세요',
    intro: 'The polite request — and, said with different intonation, the polite command. You have been hearing it since 안녕하세요 in Chapter 5; now you can build it.',
    kind: 'verb-form',
    rule: {
      head: 'vowel stem → + 세요',
      body: 'consonant stem → + 으세요',
      note: '가다 → 가세요 · 읽다 → 읽으세요. Same 세요 you hear in 안녕하세요 — it was doing this job all along.',
    },
    verbs: [
      { dict: '가다',       form: '가세요',          meaning: 'please go / go (polite)',   dictRoman: 'gada',      formRoman: 'gaseyo',        stemKind: 'vowel' },
      { dict: '오다',       form: '오세요',          meaning: 'please come',               dictRoman: 'oda',       formRoman: 'oseyo',         stemKind: 'vowel' },
      { dict: '앉다',       form: '앉으세요',        meaning: 'please sit',                dictRoman: 'anda',      formRoman: 'anjeuseyo',     stemKind: 'consonant' },
      { dict: '읽다',       form: '읽으세요',        meaning: 'please read',               dictRoman: 'ikda',      formRoman: 'ilgeuseyo',     stemKind: 'consonant' },
      { dict: '말하다',     form: '말하세요',        meaning: 'please speak',              dictRoman: 'malhada',   formRoman: 'malhaseyo',     stemKind: 'vowel' },
    ],
    postcard: { line: '천천히 말하세요.', roman: 'cheoncheonhi malhaseyo.', meaning: 'Please speak slowly.', scene: '🐢' },
  },

  {
    n: 8, slug: 'please-dont', part: 'PART 3 · WHAT COMES NEXT',
    title: "Please don't",
    grammar: '-지 마세요',
    intro: 'One shape, no vowel rule. A gentle break after two tenses.',
    kind: 'phrases',
    rule: {
      head: 'verb-stem + 지 마세요',
      body: '가다 → 가지 마세요 · 걱정하다 → 걱정하지 마세요',
      note: 'No consonant/vowel split. Just 지 마세요 on the end.',
    },
    phrases: [
      { line: '가지 마세요.',         roman: 'gaji maseyo.',         meaning: "Please don't go.",      scene: '🚫' },
      { line: '걱정하지 마세요.',     roman: 'geokjeonghaji maseyo.', meaning: "Please don't worry.",   scene: '💆' },
      { line: '늦지 마세요.',         roman: 'neutji maseyo.',        meaning: "Please don't be late.", scene: '⏰' },
    ],
    postcard: { line: '잊지 마세요!', roman: 'itji maseyo!', meaning: "Don't forget!", scene: '📝' },
  },

  {
    n: 9, slug: 'can-cant', part: 'PART 3 · WHAT COMES NEXT',
    title: "Can and can't",
    grammar: '못 · -(으)ㄹ 수 있어요',
    intro: '못 in front of the verb is the quick way. The longer form is the one used in writing and polite conversation.',
    kind: 'phrases',
    rule: {
      head: 'quick "can\'t" → 못 + verb',
      body: 'polite "can" → verb-stem + (으)ㄹ 수 있어요',
      note: 'Same wrinkle as 안 in Chapter 6: with 하다 verbs it splits — 공부 못 해요, not 못 공부해요.',
    },
    phrases: [
      { line: '못 가요.',                       roman: 'mot gayo.',                        meaning: "I can't go.",                    scene: '🚫' },
      { line: '갈 수 있어요.',                  roman: 'gal su isseoyo.',                  meaning: 'I can go.',                       scene: '✅' },
      { line: '한국어를 할 수 있어요.',         roman: 'hangugeoreul hal su isseoyo.',     meaning: 'I can speak Korean.',             scene: '🇰🇷' },
      { line: '공부 못 해요.',                  roman: 'gongbu mot haeyo.',                meaning: "I can't study.",                  scene: '📚' },
    ],
    postcard: { line: '이제 한국어를 할 수 있어요!', roman: 'ije hangugeoreul hal su isseoyo!', meaning: 'I can speak Korean now!', scene: '🎉' },
  },

  // ---------- PART 4 · SPEAKING TO PEOPLE ----------
  {
    n: 10, slug: 'honorifics', part: 'PART 4 · SPEAKING TO PEOPLE',
    title: 'Speaking up to elders',
    grammar: 'four set phrases',
    intro: "Honorifics kept to four set phrases rather than a system. You do not need to produce honorific grammar at this level, but you will hear it constantly and should not be confused by it.",
    kind: 'vocab-with-examples',
    rule: {
      head: 'Four honorific phrases — learn them as WORDS, not a system.',
      note: 'Yuna speaks one way to Mira and another way to her grandmother. You will notice the pattern before it is explained.',
    },
    words: [
      { word: '드세요',           roman: 'deuseyo',                meaning: 'Please eat (to an elder)',        example: '많이 드세요.',            exampleMeaning: 'Please eat lots.',              scene: '🍚' },
      { word: '안녕히 주무세요',   roman: 'annyeonghi jumuseyo',    meaning: 'Sleep well (to an elder)',        example: '할머니, 안녕히 주무세요.', exampleMeaning: 'Grandma, sleep well.',          scene: '🌙' },
      { word: '안녕히 계세요',     roman: 'annyeonghi gyeseyo',     meaning: "Goodbye — said by the one leaving", example: '안녕히 계세요!',           exampleMeaning: "Goodbye (I'm leaving)!",       scene: '👋' },
      { word: '안녕히 가세요',     roman: 'annyeonghi gaseyo',      meaning: 'Goodbye — said to the one leaving', example: '안녕히 가세요!',           exampleMeaning: 'Goodbye (you leave well)!',   scene: '🚪' },
    ],
    postcard: { line: '안녕히 주무세요, 할머니.', roman: 'annyeonghi jumuseyo, halmeoni.', meaning: 'Goodnight, Grandma.', scene: '🌙' },
  },

  {
    n: 11, slug: 'casual', part: 'PART 4 · SPEAKING TO PEOPLE',
    title: 'The casual voice',
    grammar: '반말',
    intro: 'Recognition only — one screen. You will hear 반말 in every drama and song you encounter, and should know what it is — but do NOT use it with anyone you have just met.',
    kind: 'casual',
    rule: {
      head: '반말 = polite without the 요',
      body: 'The politeness ending you learned in Chapter 5, dropped.',
      note: 'Teach it as a thing you understand, not a thing you say yet. That is both socially correct and honest about the level.',
    },
    pairs: [
      { casual: '어디 가?',       casualRoman: 'eodi ga?',       polite: '어디 가요?',       politeRoman: 'eodi gayo?',        meaning: 'Where are you going?' },
      { casual: '뭐 해?',         casualRoman: 'mwo hae?',       polite: '뭐 해요?',         politeRoman: 'mwo haeyo?',        meaning: 'What are you doing?' },
      { casual: '밥 먹었어?',     casualRoman: 'bap meogeosseo?', polite: '밥 먹었어요?',    politeRoman: 'bap meogeosseoyo?', meaning: 'Have you eaten?' },
      { casual: '고마워.',        casualRoman: 'gomawo.',        polite: '고마워요.',        politeRoman: 'gomawoyo.',         meaning: 'Thanks.' },
    ],
    warning: 'Never use the casual form with a stranger, an elder, or anyone at work. To someone you have just met, casual sounds RUDE — not friendly.',
    postcard: { line: '고마워요. 또 만나요!', roman: 'gomawoyo. tto mannayo!', meaning: 'Thanks. See you again!', scene: '👋' },
  },

  // ---------- PART 5 · THE LAST CALL ----------
  {
    n: 12, slug: 'the-last-call', part: 'PART 5 · THE LAST CALL',
    title: 'The last call',
    grammar: 'everything so far',
    intro: "A full conversation with Yuna, six turns long, using nothing outside the four chapters. Greeting, plan, disagreement, resolution, thanks, goodbye. Each turn offers three options — all grammatical — differing in politeness and warmth. It is the correct final test for beginner level. Not a quiz.",
    kind: 'story',
    scenes: [
      {
        setting: '📱 Friday afternoon · Yuna calls',
        yuna:  { line: '안녕하세요! 미라, 오늘 저녁에 뭐 해요?', roman: 'annyeonghaseyo! mira, oneul jeonyeoge mwo haeyo?', meaning: 'Hi! Mira, what are you doing this evening?' },
        prompt: 'Greet her back and say you are free.',
        options: [
          { line: '안녕하세요! 오늘은 시간이 있어요.', roman: 'annyeonghaseyo! oneureun sigani isseoyo.', meaning: 'Hi! I have time today.', ok: true, tone: 'friendly + polite' },
          { line: '뭐?',                                  roman: 'mwo?',                                     meaning: 'What?',                    ok: false, why: 'That is casual and abrupt — she said hello.' },
          { line: '있어요.',                              roman: 'isseoyo.',                                 meaning: 'I have some.',             ok: false, why: "Grammatical, but she asked what you were DOING — not whether you have something." },
        ],
      },
      {
        setting: '🎬 Yuna suggests a plan',
        yuna:  { line: '영화 보러 갈래요? 재미있는 영화가 있어요.', roman: 'yeonghwa boreo gallaeyo? jaemiinneun yeonghwaga isseoyo.', meaning: 'Shall we go see a movie? There\'s a fun one on.' },
        prompt: 'Say yes, and use "want to".',
        options: [
          { line: '네! 저도 영화 보고 싶어요.', roman: 'ne! jeodo yeonghwa bogo sipeoyo.', meaning: 'Yes! I want to see a movie too.', ok: true, tone: 'warm + eager' },
          { line: '아니요.',                     roman: 'aniyo.',                             meaning: 'No.',                              ok: false, why: 'Grammatically fine but the whole conversation is meant to end in a plan.' },
          { line: '영화 있어요.',                roman: 'yeonghwa isseoyo.',                 meaning: 'There is a movie.',               ok: false, why: "That's just a fact — it does not answer the invitation." },
        ],
      },
      {
        setting: '💸 The gentle disagreement',
        yuna:  { line: '이 영화는 좀 비싸요. 그런데 정말 재미있어요.', roman: 'i yeonghwaneun jom bissayo. geureonde jeongmal jaemiisseoyo.', meaning: "This movie's a bit expensive. But it's really fun." },
        prompt: 'Push back gently — use 지만.',
        options: [
          { line: '비싸지만 괜찮아요.',           roman: 'bissajiman gwaenchanayo.',           meaning: "It's expensive but that's fine.", ok: true, tone: 'agreeable + grown-up' },
          { line: '비싸요. 안 가요.',              roman: 'bissayo. an gayo.',                  meaning: "It's expensive. I'm not going.",  ok: false, why: 'Grammatical, but you already agreed to go.' },
          { line: '싼 영화 봐요.',                 roman: 'ssan yeonghwa bwayo.',              meaning: "Let's watch a cheap movie.",       ok: false, why: 'Fine in casual talk with a close friend; a bit blunt here.' },
        ],
      },
      {
        setting: '🕕 Time and place',
        yuna:  { line: '몇 시에 만날 거예요?', roman: 'myeot sie mannal geoyeyo?', meaning: 'What time shall we meet?' },
        prompt: 'Propose 6 o\'clock at the café near Yuna\'s.',
        options: [
          { line: '여섯 시에 카페에서 만나요.',     roman: 'yeoseot sie kapeeeseo mannayo.',      meaning: "Let's meet at 6 at the café.", ok: true, tone: 'clear + polite' },
          { line: '여섯 시.',                          roman: 'yeoseot si.',                          meaning: 'Six o\'clock.',                 ok: false, why: 'Just a time — no verb, no place. Real Korean uses a sentence.' },
          { line: '카페에 가요.',                     roman: 'kapee gayo.',                          meaning: "I'm going to the café.",         ok: false, why: 'Where — yes. When — missing.' },
        ],
      },
      {
        setting: '🎁 Thanks',
        yuna:  { line: '초대해 주셔서 고마워요.', roman: 'chodaehae jusyeoseo gomawoyo.', meaning: 'Thanks for inviting me.' },
        prompt: 'Return the thanks warmly.',
        options: [
          { line: '저도 고마워요. 재미있게 봐요!',  roman: 'jeodo gomawoyo. jaemiitge bwayo!',   meaning: "Thanks TOO. Let's enjoy it!", ok: true, tone: 'warmest' },
          { line: '괜찮아요.',                        roman: 'gwaenchanayo.',                      meaning: "It's fine.",                    ok: false, why: 'Grammatical, but a little cold in response to a thanks.' },
          { line: '왜?',                              roman: 'wae?',                                meaning: 'Why?',                          ok: false, why: 'Casual AND wrong — she was being warm to you.' },
        ],
      },
      {
        setting: '👋 Goodbye',
        yuna:  { line: '그럼, 안녕히 계세요!', roman: 'geureom, annyeonghi gyeseyo!', meaning: 'Then — goodbye (I\'m leaving)!' },
        prompt: 'She is leaving. Which goodbye do you say?',
        options: [
          { line: '안녕히 가세요!',    roman: 'annyeonghi gaseyo!',    meaning: 'Goodbye (to the one leaving)!', ok: true, tone: 'exactly right' },
          { line: '안녕히 계세요!',    roman: 'annyeonghi gyeseyo!',   meaning: 'Goodbye (I\'m leaving)!',       ok: false, why: 'That is what YOU say when YOU are the one leaving. Yuna is leaving — you say 가세요.' },
          { line: '안녕!',              roman: 'annyeong!',              meaning: 'Bye! (casual)',                 ok: false, why: 'Warm, but too casual for someone you have just called on the phone with 요-form.' },
        ],
      },
    ],
    postcard: { line: '한국어 첫 대화 끝!', roman: 'hangugeo cheot daehwa kkeut!', meaning: 'My first Korean conversation — done!', scene: '🏆' },
  },
]

// Vocabulary sets from the PDF — surfaced on the unit map.
export const VOCAB_SETS = [
  { name: 'Describing', emoji: '🖼️', words: [
    { word: '크다',     roman: 'keuda',      meaning: 'big' },
    { word: '작다',     roman: 'jakda',      meaning: 'small' },
    { word: '좋다',     roman: 'jota',       meaning: 'good' },
    { word: '나쁘다',   roman: 'nappeuda',   meaning: 'bad' },
    { word: '예쁘다',   roman: 'yeppeuda',   meaning: 'pretty' },
    { word: '비싸다',   roman: 'bissada',    meaning: 'expensive' },
    { word: '싸다',     roman: 'ssada',      meaning: 'cheap' },
    { word: '많다',     roman: 'manta',      meaning: 'many / a lot' },
    { word: '적다',     roman: 'jeokda',     meaning: 'few / not much' },
    { word: '덥다',     roman: 'deopda',     meaning: 'hot (weather)' },
    { word: '춥다',     roman: 'chupda',     meaning: 'cold (weather)' },
  ]},
  { name: 'Weather',    emoji: '🌦️', words: [
    { word: '비',       roman: 'bi',         meaning: 'rain' },
    { word: '눈',       roman: 'nun',        meaning: 'snow' },
    { word: '바람',     roman: 'baram',      meaning: 'wind' },
    { word: '날씨',     roman: 'nalssi',     meaning: 'weather' },
    { word: '맑다',     roman: 'makda',      meaning: 'clear (sky)' },
    { word: '흐리다',   roman: 'heurida',    meaning: 'cloudy' },
  ]},
  { name: 'Going out',  emoji: '🎬', words: [
    { word: '영화',     roman: 'yeonghwa',   meaning: 'movie' },
    { word: '노래',     roman: 'norae',      meaning: 'song' },
    { word: '사진',     roman: 'sajin',      meaning: 'photo' },
    { word: '여행',     roman: 'yeohaeng',   meaning: 'trip' },
    { word: '표',       roman: 'pyo',        meaning: 'ticket' },
    { word: '자리',     roman: 'jari',       meaning: 'seat' },
    { word: '약속',     roman: 'yaksok',     meaning: 'appointment' },
  ]},
  { name: 'Feelings',   emoji: '💭', words: [
    { word: '기분',     roman: 'gibun',      meaning: 'mood' },
    { word: '좋아하다', roman: 'joahada',    meaning: 'to like' },
    { word: '싫어하다', roman: 'sireohada',  meaning: 'to dislike' },
    { word: '재미있다', roman: 'jaemiitda',  meaning: 'fun / interesting' },
    { word: '심심하다', roman: 'simsimhada', meaning: 'bored' },
    { word: '피곤하다', roman: 'pigonhada',  meaning: 'tired' },
  ]},
  { name: 'Politeness', emoji: '🙇', words: [
    { word: '죄송합니다', roman: 'joesonghamnida', meaning: 'I\'m sorry (formal)' },
    { word: '실례합니다', roman: 'sillyehamnida',  meaning: 'Excuse me (formal)' },
    { word: '괜찮아요',   roman: 'gwaenchanayo',   meaning: 'It\'s fine / OK' },
    { word: '잠깐만요',   roman: 'jamkkanmanyo',   meaning: 'Just a moment' },
  ]},
]

export function unitBySlug(slug) { return UNITS.find(u => u.slug === slug) }
export function unitActivityKey(slug) { return `pl-${slug}` }
export const ALL_ACTIVITY_KEYS = UNITS.map(u => unitActivityKey(u.slug))
export const TOTAL_UNITS = UNITS.length
