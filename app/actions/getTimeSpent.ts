type TTimeSpent = {
  hours: number;
  minutes: number;
  seconds: number;
};

const getTimeSpent: (input_seconds: number) => TTimeSpent = (
  input_seconds: number,
) => {
  let hours: number = 0;
  let minutes: number = 0;
  let seconds: number = input_seconds;

  if (seconds > 60) {
    minutes = Math.round(seconds / 60);
    seconds = seconds % 60;
    if (minutes > 60) {
      hours = Math.round(minutes / 60);
      minutes = minutes % 60;
    }
  }

  return { hours, minutes, seconds };
};

export default getTimeSpent;
