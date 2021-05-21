const titleAnimaton = {
  start: {
    opacity: 1,
    translateX: 0,
    translateY: 0,
    transition: {
      duration: 1.2,
      ease: [0.43, 0.13, 0.23, 0.96],
    },
  },
  exit: {
    opacity: 0,
    translateX: 0,
    translateY: -50,
    transition: {
      duration: 0.5,
      ease: [0.43, 0.13, 0.23, 0.96],
    },
  },
};

const graphAnimaton = {
  start: {
    opacity: 1,
    translateX: 0,
    translateY: 0,
    transition: {
      duration: 1.8,
      ease: [0.43, 0.13, 0.23, 0.96],
    },
  },
  exit: {
    opacity: 0,
    translateX: 0,
    translateY: 0,
    transition: {
      duration: 0.5,
      ease: [0.43, 0.13, 0.23, 0.96],
    },
  },
};

const earningAnimaton = {
  start: {
    opacity: 1,
    translateX: 0,
    translateY: 0,
    transition: {
      duration: 1.8,
      ease: [0.43, 0.13, 0.23, 0.96],
    },
  },
  exit: {
    opacity: 0,
    translateX: 0,
    translateY: 0,
    transition: {
      duration: 0.5,
      ease: [0.43, 0.13, 0.23, 0.96],
    },
  },
};

const cardAnimaton = {
  start: {
    opacity: 1,
    translateX: 0,
    translateY: 0,
    transition: {
      duration: 2.3,
      ease: [0.43, 0.13, 0.23, 0.96],
    },
  },
  exit: {
    opacity: 0,
    translateX: 0,
    translateY: 0,
    transition: {
      duration: 0.5,
      ease: [0.43, 0.13, 0.23, 0.96],
    },
  },
};


const radialAnim = {
  start: {
    opacity: 1,
    transition: {
      duration: 2.3,
      ease: [0.43, 0.13, 0.23, 0.96],
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: [0.43, 0.13, 0.23, 0.96],
    },
  },
}

export { titleAnimaton, graphAnimaton, earningAnimaton, cardAnimaton,radialAnim };
