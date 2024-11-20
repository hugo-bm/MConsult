function dateHourToDate(date: string, time: string): Date | null {
  if (isValidDate(date) && isValidTime(time)) {
    const [year, month, day] = date.split('-').map(Number);
    const [hour, minute] = time.split(':').map(Number);

    return new Date(year, month - 1, day, hour, minute);
  } else {
    return null;
  }
}
function dateToDateHour(date: Date): { date: string; time: string } {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return {date: `${year}-${month}-${day}`, time: `${hours}:${minutes}`}
}

function isValidTime(time: string): boolean {
  // Check that the time is not in the format (hh:mm)
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
  return timeRegex.test(time);
}

function isValidDate(date: string): boolean {
  // Check that the time is not in the format (yyyy-mm-dd)
  const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
  if (!dateRegex.test(date)) {
    return false;
  }

  // Extrai o ano, mês e dia
  const [year, month, day] = date.split('-').map(Number);
  const dateObj = new Date(year, month - 1, day);

  // Valida se o dia e o mês existem no calendário
  return (
    dateObj.getFullYear() === year &&
    dateObj.getMonth() === month - 1 &&
    dateObj.getDate() === day
  );
}
