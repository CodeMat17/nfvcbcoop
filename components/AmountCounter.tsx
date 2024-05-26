"use client";

import { useEffect, useState } from "react";

type Props = {
  value: number;
  style: any;
  duratn: number;
};

const AmountCounter = ({ value, style, duratn }: Props) => {
  const [count, setCount] = useState(1);

  // const formatNumber = (num: number): string => {
  //   return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  // };

  useEffect(() => {
    let start = 1;
    const end = value;
    const duration = duratn * 1000;
     const step = Math.ceil((end - start) / (duration / 10));
    // const incrementTime = duration / (end - start);

    const incrementCounter = () => {
      if (start < end) {
        start = Math.min(start + step, end);
        setCount(start);
        setTimeout(incrementCounter, 10);
      }
    };

    incrementCounter();
  }, [value, duratn]);

  return <div className={style}>{new Intl.NumberFormat().format(count)}</div>;
};

export default AmountCounter;
