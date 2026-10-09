"use client";

import { useEffect, useState } from "react";

const CurrentDate = () => {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    const date = new Intl.DateTimeFormat("bn-BD", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "Asia/Dhaka",
    }).format(new Date());

    setFormattedDate(date);
  }, []);

  return <p>{formattedDate}</p>;
};

export default CurrentDate;