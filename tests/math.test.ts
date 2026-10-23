import { add, calculateThroughput } from '../src/math';

describe('Math utilities unit tests', () => {
  it('should sum numbers correctly', () => {
    expect(add(2, 3)).toBe(5);
  });

  it('should calculate throughput accurately', () => {
    expect(calculateThroughput(100, 2)).toBe(50);
    expect(calculateThroughput(100, 0)).toBe(0);
  });
});
