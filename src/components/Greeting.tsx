import React from "react";

// Inspired by https://writing.stackexchange.com/questions/7111/how-do-greetings-vary-with-time-of-day
function getGreeting(when: Date): string {
  const FIVE_IN_THE_MORNING = 5 * 60;
  const TWELVE_THIRTEEN = 12 * 60 + 30;
  const FIVE_IN_THE_EVENING = 17 * 60;
  const totalMinutes = when.getHours() * 60 + when.getMinutes();

  if (totalMinutes >= FIVE_IN_THE_MORNING && totalMinutes < TWELVE_THIRTEEN) {
    return "Good morning";
  }
  if (totalMinutes <= FIVE_IN_THE_EVENING) {
    return "Good afternoon";
  }

  return "Good evening";
}

type Props = {
  when?: Date;
};

function Greeting({ when = new Date() }: Props) {
  const greeting = getGreeting(when);

  return (
    <div>
      {greeting}, <strong>fvilers</strong>
    </div>
  );
}

export default Greeting;
