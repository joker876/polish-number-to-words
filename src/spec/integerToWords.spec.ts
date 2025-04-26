import { integerToWordsPL } from '../integerToWords';

describe('integerToWordsPL', () => {
  it('should return "zero" for 0', () => {
    expect(integerToWordsPL(0)).toBe('zero');
  });

  it('should handle positive single-digit numbers', () => {
    expect(integerToWordsPL(5)).toBe('pięć');
    expect(integerToWordsPL(9)).toBe('dziewięć');
  });

  it('should handle numbers 10-19', () => {
    expect(integerToWordsPL(11)).toBe('jedenaście');
    expect(integerToWordsPL(19)).toBe('dziewiętnaście');
  });

  it('should handle tens', () => {
    expect(integerToWordsPL(20)).toBe('dwadzieścia');
    expect(integerToWordsPL(47)).toBe('czterdzieści siedem');
    expect(integerToWordsPL(99)).toBe('dziewięćdziesiąt dziewięć');
  });

  it('should handle hundreds', () => {
    expect(integerToWordsPL(100)).toBe('sto');
    expect(integerToWordsPL(305)).toBe('trzysta pięć');
    expect(integerToWordsPL(999)).toBe('dziewięćset dziewięćdziesiąt dziewięć');
  });

  it('should handle thousands', () => {
    expect(integerToWordsPL(1000)).toBe('tysiąc');
    expect(integerToWordsPL(2345)).toBe('dwa tysiące trzysta czterdzieści pięć');
    expect(integerToWordsPL(11_000)).toBe('jedenaście tysięcy');
  });

  it('should handle millions', () => {
    expect(integerToWordsPL(1_000_000)).toBe('milion');
    expect(integerToWordsPL(2_000_001)).toBe('dwa miliony jeden');
    expect(integerToWordsPL(5_432_100)).toBe('pięć milionów czterysta trzydzieści dwa tysiące sto');
  });

  it('should handle billions and larger numbers', () => {
    expect(integerToWordsPL(1_000_000_000)).toBe('miliard');
    expect(integerToWordsPL(2_000_001_000)).toBe('dwa miliardy tysiąc');
    expect(integerToWordsPL(5_432_100_000)).toBe('pięć miliardów czterysta trzydzieści dwa miliony sto tysięcy');
  });

  it('should handle negative numbers', () => {
    expect(integerToWordsPL(-5)).toBe('minus pięć');
    expect(integerToWordsPL(-1234567)).toBe(
      'minus milion dwieście trzydzieści cztery tysiące pięćset sześćdziesiąt siedem'
    );
  });

  it('should handle explicit single thousand option correctly', () => {
    expect(integerToWordsPL(1000, { explicitSingleThousand: true })).toBe('jeden tysiąc');
    expect(integerToWordsPL(1_000_030, { explicitSingleThousand: true })).toBe('jeden milion trzydzieści');
    expect(integerToWordsPL(1_030_000, { explicitSingleThousand: true })).toBe('jeden milion trzydzieści tysięcy');
    expect(integerToWordsPL(1_001_000, { explicitSingleThousand: true })).toBe('jeden milion jeden tysiąc');
  });
});
