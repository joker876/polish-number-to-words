import { numberToWordsPL } from '../standard';

describe('numberToWordsPL', () => {
  it('should return "zero" for 0', () => {
    expect(numberToWordsPL(0)).toBe('zero');
  });

  it('should handle positive single-digit numbers', () => {
    expect(numberToWordsPL(5)).toBe('pięć');
    expect(numberToWordsPL(9)).toBe('dziewięć');
  });

  it('should handle numbers 10-19', () => {
    expect(numberToWordsPL(11)).toBe('jedenaście');
    expect(numberToWordsPL(19)).toBe('dziewiętnaście');
  });

  it('should handle tens', () => {
    expect(numberToWordsPL(20)).toBe('dwadzieścia');
    expect(numberToWordsPL(47)).toBe('czterdzieści siedem');
    expect(numberToWordsPL(99)).toBe('dziewięćdziesiąt dziewięć');
  });

  it('should handle hundreds', () => {
    expect(numberToWordsPL(100)).toBe('sto');
    expect(numberToWordsPL(305)).toBe('trzysta pięć');
    expect(numberToWordsPL(999)).toBe('dziewięćset dziewięćdziesiąt dziewięć');
  });

  it('should handle thousands', () => {
    expect(numberToWordsPL(1000)).toBe('tysiąc');
    expect(numberToWordsPL(2345)).toBe('dwa tysiące trzysta czterdzieści pięć');
    expect(numberToWordsPL(11000)).toBe('jedenaście tysięcy');
  });

  it('should handle millions', () => {
    expect(numberToWordsPL(1000000)).toBe('jeden milion');
    expect(numberToWordsPL(2000001)).toBe('dwa miliony jeden');
    expect(numberToWordsPL(5432100)).toBe('pięć milionów czterysta trzydzieści dwa tysiące sto');
  });

  it('should handle negative numbers', () => {
    expect(numberToWordsPL(-5)).toBe('minus pięć');
    expect(numberToWordsPL(-1234567)).toBe(
      'minus jeden milion dwieście trzydzieści cztery tysiące pięćset sześćdziesiąt siedem'
    );
  });
});
