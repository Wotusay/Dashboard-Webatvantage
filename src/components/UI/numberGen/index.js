import { animate } from 'framer-motion';
import React, { useEffect, useRef } from 'react';

const Counter = ({ from, to, isCurrency }) => {
  const nodeRef = useRef();
  console.log(to);

  useEffect(() => {
    const node = nodeRef.current;

    const controls = animate(from, to, {
      duration: 1,
      onUpdate(value) {
        node.textContent = isCurrency
          ? new Intl.NumberFormat('de-DE', {
              style: 'currency',
              currency: 'EUR',
            }).format(value)

          : new Intl.NumberFormat('de-DE').format(value.toFixed(0));
      },
    });

    return () => controls.stop();
  }, [from, to, isCurrency]);

  return (
    <p
      className="font-sans font-semibold text-6xl text-nightBlue"
      ref={nodeRef}
    />
  );
};

export default Counter;
