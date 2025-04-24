'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

type WingProps = {
  reflected?: boolean;
  reset?: boolean;
};

export default function Wing({ reflected = false, reset }: WingProps) {
  const [isFlapping, setIsFlapping] = useState(false);

  useEffect(() => {
    if (reset) {
      setIsFlapping(false);
    } else {
      setIsFlapping(true);
    }

    const timer = setTimeout(() => {
      setIsFlapping(true);
    }, 500); 

    return () => clearTimeout(timer);
  }, [reset]);

  return (
    <div className={`absolute w-96 mx-auto ${reflected ? 'scale-x-[-1]' : ''}`}>
      <Image
        src="/logowing.png"
        alt="Wing"
        width={1000}
        height={1000}
        draggable={false}
        className={`select-none ${isFlapping ? 'wing-animate-sequence flapping' : 'wing-animate-sequence'}`}
      />
    </div>
  );
}