import * as React from "react";

//
export interface TimeDownProps {
  time_start: number;
  time_end?: number;
  handleEnd?: () => void;
}

//
function TimeDown({
  time_start,
  time_end = 0,
  handleEnd = () => {},
}: TimeDownProps) {
  //
  const [time, setTime] = React.useState(time_start);

  //
  React.useEffect(() => {
    console.log(time);
    
    const interval = setInterval(() => {
      setTime((time) => {
        if (time > 0) {
          return time - 1;
        } else {
          clearInterval(interval);
          return 0;
        }
      });
    }, 1000);

    if (time <= time_end) {
      handleEnd();
    }

    return () => {
      clearInterval(interval);
    };
  }, [time <= time_end]);

  //
  return <span>{time}</span>;
}

export default TimeDown;
