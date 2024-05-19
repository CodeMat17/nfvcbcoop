"use client";

import { useEffect, useState } from "react";

type Props = {
  value: number;
  style: any;
  duratn: number;
};

const AmountCounter = ({ value, style, duratn }: Props) => {
  const [count, setCount] = useState(0);

  const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  useEffect(() => {
    let start = 0;
    // const duration = duratn;
    const incrementTime = value / (duratn / 1000); 

    const timer = setInterval(() => {
      start += incrementTime;
      setCount(start);
      if (start === value) clearInterval(timer);
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [value, duratn]);

  return <div className={style}>{formatNumber(count)}</div>;
};

export default AmountCounter;
