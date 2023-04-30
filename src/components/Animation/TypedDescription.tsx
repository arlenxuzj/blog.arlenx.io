import { useEffect, useRef } from 'react';

import Typed from 'typed.js';

const TypedDescription = () => {
  const elRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (!elRef.current) {
      return;
    }

    const options = {
      strings: [
        "I'm aliased as <b>Arlen</b>.^1000",
        "I'm from China <i class='twa twa-lg twa-flag-china'></i>, living and studying in <b>NYU</b> now.^500",
        'My first programming language I learned was <b>Python</b>.^500',
        "I love web development <i class='twa twa-md twa-globe-with-meridians'></i>.^500",
        "I love music <i class='twa twa-lg twa-guitar'></i> and snowboarding <i class='twa twa-lg twa-snowboarder'></i>.^1000"
      ],
      typeSpeed: 40,
      backSpeed: 10,
      loop: true,
      backDelay: 1000
    };

    const typed = new Typed(elRef.current, options);

    return () => {
      typed.destroy();
    };
  }, [elRef]);

  return (
    <span
      ref={elRef}
      style={{
        verticalAlign: 'middle',
        fontSize: '18px',
        lineHeight: '36px',
        color: 'var(--palette-text-primary)'
      }}
    />
  );
};

export default TypedDescription;
