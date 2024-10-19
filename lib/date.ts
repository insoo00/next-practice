export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  const hours24 = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  const period = hours24 >= 12 ? '오후' : '오전';
  const hours12 = hours24 % 12 || 12;

  return `${year}. ${month}. ${day} ${period} ${hours12}:${minutes}:${seconds}`;
}
