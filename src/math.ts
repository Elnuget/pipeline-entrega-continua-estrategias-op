export function add(a: number, b: number): number {
  return a + b;
}

export function calculateThroughput(totalRequests: number, totalSeconds: number): number {
  if (totalSeconds <= 0) return 0;
  return totalRequests / totalSeconds;
}
