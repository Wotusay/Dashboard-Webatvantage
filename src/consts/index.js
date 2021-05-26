const ROUTES = {
  home: '/',
  analytics: '/analytics',
  servers: '/servers',
  company: '/company',
};

const CHARTS = {
  analyticsChart: {
    margin: { top: 1, right: 20, bottom: 120, left: 90 },
    color: { rectSessions: '#ED605B', rectViews: '#000000' },
    font: {
      axisX: {
        fontSize: '1.4rem',
      },
      fontWeight: {
        bold: 700,
      },
    },
    transforms: {
      axisX: 'translate(-10,10)rotate(-55)',
      ratio: 'translate(2,-14)',
    },
    opacity: 0.4,
    groups: ['sessions', 'views'],
  },

  conversionChart: {
    margin: { top: 20, right: 0, bottom: 120, left: 50 },
    color: { rect: '#D5D7EE', lineChart: ['#8675FF', '#FFA640', '#FF718B'] },
    strokeWidth: { path: 3.2, line: 4, domain: 2 },
    font: {
      axisX: {
        fontSize: '1.4rem',
      },
      axisY: {
        fontSize: '1.6rem',
      },
    },
    transforms: {
      axisX: 'translate(-10,10)rotate(-50)',
      ratio: 'translate(2,-14)',
    },
  },
  aquistionChart: {
    innerRadius: 220,
    color: {
      zAxis: ['#F87390', '#F87390', '#FCBB67', '#8675FF', '#8018F7', '#A547D3'],
      line: '#000',
      circleColor: '#000',
      strokeLegend: '#fff',
    },
    transforms: {
      textUnder: 'rotate(180)translate(20,3)',
      textUp: 'rotate(0)translate(-82,3)',
    },
    font: {
      label: '0.9rem',
      yAxis: '1.2rem',
      legend: '1.2rem',
    },
    legend: {
      width: 7,
      height: 7,
      x: 18,
      y: 2,
      dy: '0.25em',
    },
    yTickStyles: {
      circleOpacity: 0.2,
      text: {
        x: -6,
        dy: '0.35em',
        strokeWidth: 5,
      },
    },
  },
  earningChart: {
    margin: { top: 20, right: 20, bottom: 5, left: 0 },
    color: {
      text: '#777777',
      line: '#dddddd',
      categoriesColors: {
        medic: '#F1DEA0',
        fashion: '#CAB1C5',
        shoes: '#ACC39F',
      },
    },
    font: { fontSize: '14px', fontWeight: '600' },
  },
};

const RADIALCOLORS = {
  red: '#FD2D2D',
  orange: '#FF7E06',
  green: '#00B928',
  blue: '#023AFF',
  black: '#DBDFF1',
  textColor: '#383874',
  purple: '#8675FF',
  white:'#F5F6FB',
  background: '#EDEEFA',
  pink: '#FF708B'
};

const CATEGORIES = {
  medic: 'Medisch',
  fashion: 'Fashion',
  shoes: 'Schoenen',
  category1:'Category 1',
  category2:'Category 2',
  category3:'Category 3',
  category4:'Category 4',
  category5:'Category 5',
  category6:'Category 6',

  colors: {
    medic: '#FF37BB',
    fashion: '#AE2AFF',
    shoes: '#967BE1',
    category1: '#FBB228',
    category2: '#FF2D2E',
    category3: '#E682CA',
    category4: '#023AFF',
    category5: '#00B929',
    category6: '#00F0E2'
  },
};

export { ROUTES, CHARTS, CATEGORIES, RADIALCOLORS };
