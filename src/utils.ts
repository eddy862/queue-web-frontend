export function formatEstimatedWaitTime(queueLength: number, minPerPerson: number) {
  const minutes = queueLength * minPerPerson;

  if (minutes >= 60) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins === 0 ? `${hours} h` : `${hours} h ${mins} m`;
  }
  return `${minutes} m`;
}
