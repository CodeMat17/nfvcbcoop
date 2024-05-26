"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type Props = {
  value: number;
 
  duratn: number;
};

const AnimatedCounterForTotalContri = ({ value, duratn }: Props) => {
  const [count, setCount] = useState(1);
  const [isPulsing, setIsPulsing] = useState(true);

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPulsing(false);
    }, 10000); // 5 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className={`text-4xl sm:text-5xl font-bold ml-3 text-slate-900 dark:text-white ${
        isPulsing ? "animate-pulse" : ""
      }`}
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 4, ease: "easeInOut" }}>
      {new Intl.NumberFormat().format(count)}
    </motion.div>
  );
};

export default AnimatedCounterForTotalContri;
