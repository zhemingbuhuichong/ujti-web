export const DIMENSION_ORDER = ['engineering', 'order', 'fuel', 'field'];

export const DIMENSIONS = {
  engineering: {
    label: '动手维度',
    lowLabel: '偏理论',
    highLabel: '偏上手',
    description: '看你更喜欢推公式、想逻辑，还是更喜欢设备、结构和实际工程那一套。'
  },
  order: {
    label: '做事维度',
    lowLabel: '先冲再说',
    highLabel: '先看流程',
    description: '看你做事更随手发挥，还是更习惯按规则、按步骤、按边界来。'
  },
  fuel: {
    label: '动力维度',
    lowLabel: '题目上头',
    highLabel: '成事上头',
    description: '看你是因为问题本身有意思才往下钻，还是因为想把事情做成才停不下来。'
  },
  field: {
    label: '关注维度',
    lowLabel: '系统设备',
    highLabel: '人和表达',
    description: '看你更自然地盯系统、模型、设备，还是更容易去想人、组织、沟通和空间。'
  }
};

export function scoreToLevel(score) {
  if (score <= 13) return 'L';
  if (score <= 18) return 'M';
  return 'H';
}
