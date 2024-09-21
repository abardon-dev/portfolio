"use client";

import { useState, useEffect } from "react";

export function RealtimeClock({
  className,
  locale,
  options
}: {
  className?: string;
  locale?: Intl.LocalesArgument;
  options?: Intl.DateTimeFormatOptions;
}) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return <span className={className}>{time.toLocaleTimeString(locale, { ...options, timeStyle: "short" })}</span>;
}
