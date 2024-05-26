"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type Props = {
  value: number;
  style: any;
  duratn: number;
};

const AnimatedCounter = ({ value, style, duratn }: Props) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 5000); // 3 seconds delay

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

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
  }, [isVisible, value, duratn]);

  return (
    <motion.div
      className={style}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 2, ease: "easeInOut" }}>
      {new Intl.NumberFormat().format(count)}
    </motion.div>
  );
};

export default AnimatedCounter;
