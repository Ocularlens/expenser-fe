export default function NumberFormatter(value: number, decimal: number) {
  const val = parseFloat(value.toString()).toFixed(decimal);
  return Number(val).toLocaleString("en");
}
