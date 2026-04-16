const RAW_QUESTIONS = [
  {
    id: 'eng-01',
    dimension: 'engineering',
    text: '看到一台结构复杂、线路密密麻麻的设备时，你更像哪种人？',
    options: [
      { label: '先研究它为什么这样设计，背后的原理更有意思。', value: 1 },
      { label: '先拍个照，回头慢慢看。', value: 2 },
      { label: '先想办法把它拆明白，最好顺手再装回去。', value: 3 }
    ]
  },
  {
    id: 'eng-02',
    dimension: 'engineering',
    text: '组会里有人扔出一个抽象到像在飞升的概念，你的第一反应是：',
    options: [
      { label: '这个概念成立的话，倒是值得继续推。', value: 1 },
      { label: '先听完，看它最后能不能落地。', value: 2 },
      { label: '别飘，给我说说最后怎么做、谁来做。', value: 3 }
    ]
  },
  {
    id: 'eng-03',
    dimension: 'engineering',
    text: '你更容易对哪种课程产生真爱？',
    options: [
      { label: '证明、推导、模型这种“越抽象越上头”的。', value: 1 },
      { label: '能讲清楚逻辑也能联系现实的。', value: 2 },
      { label: '带系统、带装置、带流程、带真实工程味的。', value: 3 }
    ]
  },
  {
    id: 'eng-04',
    dimension: 'engineering',
    text: '你做项目时最讨厌的一句话是：',
    options: [
      { label: '“先做出来再说，原理以后再补。”', value: 1 },
      { label: '“我们边做边看。”', value: 2 },
      { label: '“反正差不多能跑就行。”', value: 3 }
    ]
  },
  {
    id: 'eng-05',
    dimension: 'engineering',
    text: '面对一个复杂问题，你通常先抓什么？',
    options: [
      { label: '定义、变量和逻辑边界。', value: 1 },
      { label: '问题里最关键的一两步。', value: 2 },
      { label: '系统结构、接口和真实约束。', value: 3 }
    ]
  },
  {
    id: 'eng-06',
    dimension: 'engineering',
    text: '别人夸你“脑子里像有一张图”，你更希望那张图是：',
    options: [
      { label: '公式和结构组成的图。', value: 1 },
      { label: '概念和流程都能讲通的图。', value: 2 },
      { label: '设备、路径、接口、输入输出全标好的图。', value: 3 }
    ]
  },
  {
    id: 'eng-07',
    dimension: 'engineering',
    text: '如果今晚必须熬夜，你更愿意熬在哪件事上？',
    options: [
      { label: '把一个推导彻底想透。', value: 1 },
      { label: '把方案从头到尾理顺。', value: 2 },
      { label: '把系统调通、让它真的跑起来。', value: 3 }
    ]
  },
  {
    id: 'eng-08',
    dimension: 'engineering',
    text: '你最不能忍的一类汇报是：',
    options: [
      { label: '结论挺热闹，但理论支撑空空如也。', value: 1 },
      { label: '什么都讲一点，但重点不突出。', value: 2 },
      { label: 'PPT 很漂亮，可一问落地路径就开始失语。', value: 3 }
    ]
  },
  {
    id: 'order-01',
    dimension: 'order',
    text: '群里有人问“五一到底放哪几天”，你最像哪种人？',
    options: [
      { label: '先猜一个，大差不差就行。', value: 1 },
      { label: '先等等，看看有没有人已经问到准信了。', value: 2, probes: { laoJin: 1 } },
      { label: '直接把校历或通知甩过去：请以官方安排为准。', value: 3, probes: { academicAffairs: 2 } }
    ]
  },
  {
    id: 'order-02',
    dimension: 'order',
    text: '老师说“格式没要求，自己把握”，你会：',
    options: [
      { label: '那我就按自己顺手的来。', value: 1 },
      { label: '大概沿用以前的样子。', value: 2 },
      { label: '不行，没要求也要自己先立一套要求。', value: 3 }
    ]
  },
  {
    id: 'order-03',
    dimension: 'order',
    text: '小组作业刚开工，有人提议“先把能做的部分做起来，细节后面再补”，你会：',
    options: [
      { label: '可以，先把东西做出来再说。', value: 1 },
      { label: '行，但别偏太多就行。', value: 2 },
      { label: '不行，流程乱了后面会更乱。', value: 3, probes: { academicAffairs: 1 } }
    ]
  },
  {
    id: 'order-04',
    dimension: 'order',
    text: '你对“按规定来”这四个字的真实感受更像：',
    options: [
      { label: '规定就是用来被现实修正的。', value: 1 },
      { label: '看情况，别太死。', value: 2 },
      { label: '规定不是浪漫，但它真能救命。', value: 3, probes: { academicAffairs: 2 } }
    ]
  },
  {
    id: 'order-05',
    dimension: 'order',
    text: 'DDL 当天突然发现要求更新了，你更可能：',
    options: [
      { label: '先按自己原来的交，主打一个生死有命。', value: 1 },
      { label: '能补多少补多少。', value: 2 },
      { label: '立刻逐条比对新要求，绝不漏项。', value: 3 }
    ]
  },
  {
    id: 'order-06',
    dimension: 'order',
    text: '看到别人把公共空间搞得乱七八糟，你更可能：',
    options: [
      { label: '算了，我也懒得管。', value: 1 },
      { label: '吐槽两句，但未必动手。', value: 2 },
      { label: '忍不了，先整理，再顺手贴个提醒。', value: 3, probes: { academicAffairs: 1 } }
    ]
  },
  {
    id: 'order-07',
    dimension: 'order',
    text: '你对“自由发挥”的态度更像：',
    options: [
      { label: '那是快乐源泉。', value: 1 },
      { label: '有边界的自由发挥最好。', value: 2 },
      { label: '先给我边界，再谈发挥。', value: 3 }
    ]
  },
  {
    id: 'order-08',
    dimension: 'order',
    text: '如果你回论坛答疑，你最容易写出哪种句子？',
    options: [
      { label: '“我猜大概是这样，你们自己看着办。”', value: 1 },
      { label: '“应该差不多，等等正式消息。”', value: 2 },
      { label: '“同学你好，请查阅通知原文。”', value: 3, probes: { academicAffairs: 2 } }
    ]
  },
  {
    id: 'fuel-01',
    dimension: 'fuel',
    text: '你熬夜做事最常见的原因是：',
    options: [
      { label: '这个问题太香了，我非得把它啃下来。', value: 1 },
      { label: '已经做到这儿了，顺手做完。', value: 2 },
      { label: '都烧到这一步了，先顶着干，明早再说。', value: 3, probes: { laoJin: 1 } }
    ]
  },
  {
    id: 'fuel-02',
    dimension: 'fuel',
    text: '实验还没完全稳住，但数据已经很好看了，你第一反应通常是：',
    options: [
      { label: '先回去把变量查干净，别急着兴奋。', value: 1 },
      { label: '我会先和熟人确认一下，还不急着冲。', value: 2, probes: { laoJin: 1 } },
      { label: '先发出来再说，真炸了以后再补说明。', value: 3, probes: { laoJin: 2 } }
    ]
  },
  {
    id: 'fuel-03',
    dimension: 'fuel',
    text: '一件事真正让你满意的标准更像：',
    options: [
      { label: '我学到了硬东西。', value: 1 },
      { label: '这事做得挺完整。', value: 2 },
      { label: '它轰的一下跑起来了，而且场面很大。', value: 3, probes: { laoJin: 1 } }
    ]
  },
  {
    id: 'fuel-04',
    dimension: 'fuel',
    text: '面对“这事风险不低，但成了就很炸场”时，你通常会：',
    options: [
      { label: '先评估清楚，别把自己一起带走。', value: 1 },
      { label: '可以试，但我得先留后手。', value: 2, probes: { laoJin: 1 } },
      { label: '先冲了再说，成了就是全场最佳。', value: 3, probes: { laoJin: 2 } }
    ]
  },
  {
    id: 'fuel-05',
    dimension: 'fuel',
    text: '你更容易被什么场景点燃？',
    options: [
      { label: '一道特别难但我能打穿的题。', value: 1 },
      { label: '一个能让我证明自己靠谱的任务。', value: 2 },
      { label: '一台还带着热气的动力系统终于被我点起来。', value: 3, probes: { laoJin: 1 } }
    ]
  },
  {
    id: 'fuel-06',
    dimension: 'fuel',
    text: '如果别人夸你，你更想听到哪句？',
    options: [
      { label: '“你是真会做东西。”', value: 1 },
      { label: '“你是真靠谱。”', value: 2 },
      { label: '“你一上手，整台东西都像要起飞了。”', value: 3, probes: { laoJin: 2 } }
    ]
  },
  {
    id: 'fuel-07',
    dimension: 'fuel',
    text: '你对“责任感”这玩意的体感更接近：',
    options: [
      { label: '别拿它绑我，我先把本事练出来。', value: 1 },
      { label: '有，但不至于事事上身。', value: 2 },
      { label: '只要这事能成，我很容易先把刹车忘了。', value: 3, probes: { laoJin: 1 } }
    ]
  },
  {
    id: 'fuel-08',
    dimension: 'fuel',
    text: '你最容易在什么时候进入“算了我来吧”状态？',
    options: [
      { label: '别人做得不够漂亮的时候。', value: 1 },
      { label: '事情一直卡着没人推进的时候。', value: 2 },
      { label: '大家都嫌太险，但我觉得还能再推一把的时候。', value: 3, probes: { laoJin: 2 } }
    ]
  },
  {
    id: 'field-01',
    dimension: 'field',
    text: '你更自然沉浸在哪类世界里？',
    options: [
      { label: '模型、系统、数据和逻辑对象。', value: 1 },
      { label: '两边都能待，但要看任务。', value: 2 },
      { label: '人、组织、空间和表达关系。', value: 3 }
    ]
  },
  {
    id: 'field-02',
    dimension: 'field',
    text: '在团队里，你更像哪一位？',
    options: [
      { label: '专注把技术块啃穿的那个人。', value: 1 },
      { label: '谁缺什么我补什么的中转站。', value: 2 },
      { label: '负责拍板推进，让发动机先响起来的那个人。', value: 3, probes: { laoJin: 1 } }
    ]
  },
  {
    id: 'field-03',
    dimension: 'field',
    text: '你做事最常盯着什么看？',
    options: [
      { label: '结构对不对，逻辑顺不顺。', value: 1 },
      { label: '目标能不能推进。', value: 2 },
      { label: '系统是不是已经热起来，能不能继续往上推。', value: 3, probes: { laoJin: 1 } }
    ]
  },
  {
    id: 'field-04',
    dimension: 'field',
    text: '你更愿意花时间修哪种 bug？',
    options: [
      { label: '程序、设备、模型上的 bug。', value: 1 },
      { label: '流程协作上的 bug。', value: 2 },
      { label: '那种一旦修好就能把功率直接拉上去的 bug。', value: 3, probes: { laoJin: 1 } }
    ]
  },
  {
    id: 'field-05',
    dimension: 'field',
    text: '你更容易把什么当成“真正的作品”？',
    options: [
      { label: '一个算得准、跑得稳的系统。', value: 1 },
      { label: '一个从头到尾推进完整的项目。', value: 2 },
      { label: '一个能影响人、改变空间或重塑关系的方案。', value: 3 }
    ]
  },
  {
    id: 'field-06',
    dimension: 'field',
    text: '别人吵起来时，你更容易注意到：',
    options: [
      { label: '谁的逻辑先出了问题。', value: 1 },
      { label: '这事到底怎么收场更划算。', value: 2 },
      { label: '谁已经把场子烧热了，只差一个人往前拍板。', value: 3, probes: { laoJin: 2 } }
    ]
  },
  {
    id: 'field-07',
    dimension: 'field',
    text: '你更喜欢哪种“掌控感”？',
    options: [
      { label: '我理解了一个系统。', value: 1 },
      { label: '我能让事情按计划推进。', value: 2 },
      { label: '我能把人和环境调到更对的状态。', value: 3 }
    ]
  },
  {
    id: 'field-08',
    dimension: 'field',
    text: '你更愿意被别人怎样需要？',
    options: [
      { label: '需要我的技术判断。', value: 1 },
      { label: '需要我的执行和协调。', value: 2 },
      { label: '需要我把场子点起来，然后硬生生推过去。', value: 3, probes: { laoJin: 1 } }
    ]
  }
];

const PUBLISHED_ORDER = [
  'order-01',
  'eng-03',
  'field-02',
  'fuel-04',
  'eng-01',
  'order-05',
  'fuel-02',
  'field-07',
  'fuel-05',
  'field-01',
  'order-03',
  'eng-06',
  'field-06',
  'fuel-01',
  'eng-08',
  'order-08',
  'eng-02',
  'field-04',
  'order-06',
  'fuel-07',
  'field-03',
  'eng-04',
  'fuel-03',
  'order-02',
  'eng-07',
  'order-07',
  'field-05',
  'fuel-08',
  'eng-05',
  'fuel-06',
  'field-08',
  'order-04'
];

const OPTION_VALUE_PATTERNS = [
  [3, 1, 2],
  [2, 3, 1],
  [2, 1, 3],
  [1, 3, 2],
  [3, 2, 1]
];

const QUESTION_BY_ID = new Map(RAW_QUESTIONS.map((question) => [question.id, question]));

export const QUESTIONS = PUBLISHED_ORDER.map((questionId, index) => {
  const question = QUESTION_BY_ID.get(questionId);

  if (!question) {
    throw new Error(`Unknown question id in published order: ${questionId}`);
  }

  const optionValueOrder = OPTION_VALUE_PATTERNS[index % OPTION_VALUE_PATTERNS.length];
  const optionByValue = new Map(question.options.map((option) => [option.value, option]));

  return {
    ...question,
    options: optionValueOrder.map((value) => {
      const option = optionByValue.get(value);

      if (!option) {
        throw new Error(`Unknown option value ${value} on question ${question.id}`);
      }

      return option;
    })
  };
});
