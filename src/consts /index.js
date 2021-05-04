const ROUTES = {
  home: '/',
  analytics: '/analytics',
  servers: '/servers',
  company: '/company',
};

const CHARTS = {
  analyticsChart: {
    margin: { top: 20, right: 50, bottom: 120, left: 50 },
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
      axisX: 'translate(-10,10)rotate(-45)',
      ratio: 'translate(2,-14)',
    },
    opacity: 0.3,
    groups: ['sessions', 'views']
  },

  conversionChart: {
    margin: { top: 20, right: 0, bottom: 120, left: 50 },
    color: { rect: '#BBBBBB', lineChart: ['#05FF00', '#FF9F10', '#FF0202'] },
    strokeWidth: { path: 3, line: 4, domain: 2 },
    font: {
      axisX: {
        fontSize: '1.4rem',
      },
      axisY: {
        fontSize: '1.5rem',
      },
    },
    transforms: {
      axisX: 'translate(-10,10)rotate(-45)',
      ratio: 'translate(2,-14)',
    },
  },
  aquistionChart: {
    innerRadius: 180,
    color: {
      zAxis: [
        '#98abc5',
        '#8a89a6',
        '#7b6888',
        '#6b486b',
        '#a05d56',
        '#d0743c',
        '#ff8c00',
      ],
      line: '#000',
      circleColor: '#000',
      strokeLegend: '#fff',
    },
    transforms: {
      textUnder: 'rotate(-180)translate(55,3)',
      textUp: 'rotate(180)translate(55,3)',
    },
    font: {
      label: '0.9rem',
      yAxis: '1.2rem',
      legend: '1.2rem',
    },
    legend: {
      width: 14,
      height: 14,
      x: 18,
      y: 8,
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
    margin: { top: 20, right: 0, bottom: 5, left: 0 },
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

const CATEGORIES = {
  medic: 'Medisch',
  fashion: 'Fashion',
  shoes: 'Schoenen',
};



export { ROUTES, CHARTS, CATEGORIES };
