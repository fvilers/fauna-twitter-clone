import dayjs from "dayjs";
import React, { useMemo, useState } from "react";
import useInterval from "../hooks/useInterval";

type Props = {
  date: string | number | Date;
  refreshInterval?: number;
};

function FromNow({ date, refreshInterval = 1000 }: Props) {
  const dateTime = useMemo(() => dayjs(date), [date]);
  const [fromNow, setFromNow] = useState(dateTime.fromNow());

  useInterval(() => {
    setFromNow(dateTime.fromNow());
  }, refreshInterval);

  return <time dateTime={dateTime.toISOString()}>{fromNow}</time>;
}

export default FromNow;
