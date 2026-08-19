export function formatTime(hour, minute) {
  const period = hour < 12 ? '午前' : '午後';
  let h = hour % 12;
  if (h == 0) h = 12;
  const mm = String(minute).padStart(2, '0');
  return `${period}${h}:${mm}`;
}

export const timeOptions = [];
for (let h = 9; h < 19; h++) {
  for (let m = 0; m < 60; m += 15) {
    timeOptions.push(formatTime(h, m));
  }
}
