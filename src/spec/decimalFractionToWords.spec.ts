import { decimalFractionToWordsPL } from '../decimalFractionToWords';

describe('decimalFractionToWordsPL', () => {
  it('should throw an error for whole numbers', () => {
    expect(() => decimalFractionToWordsPL(1)).toThrow();
    expect(() => decimalFractionToWordsPL(0)).toThrow();
    expect(() => decimalFractionToWordsPL(-5)).toThrow();
  });

  describe('formal fractions (default behavior)', () => {
    it('should handle common decimal fractions formally', () => {
      expect(decimalFractionToWordsPL(0.5)).toBe('pięć dziesiątych');
      expect(decimalFractionToWordsPL(0.25)).toBe('dwadzieścia pięć setnych');
      expect(decimalFractionToWordsPL(0.75)).toBe('siedemdziesiąt pięć setnych');
      expect(decimalFractionToWordsPL(0.2)).toBe('dwie dziesiąte');
      expect(decimalFractionToWordsPL(0.333)).toBe('trzysta trzydzieści trzy tysięczne');
    });

    it('should handle negative decimal fractions formally', () => {
      expect(decimalFractionToWordsPL(-0.5)).toBe('pięć dziesiątych');
      expect(decimalFractionToWordsPL(-0.125)).toBe('sto dwadzieścia pięć tysięcznych');
      expect(decimalFractionToWordsPL(-0.01)).toBe('jedna setna');
    });
  });

  describe('formal fractions with spellFractionExactly: true', () => {
    it('should spell fractions without reducing them', () => {
      expect(decimalFractionToWordsPL(0.5, { simplifyFraction: true })).toBe('jedna druga');
      expect(decimalFractionToWordsPL(0.25, { simplifyFraction: true })).toBe('jedna czwarta');
      expect(decimalFractionToWordsPL(0.75, { simplifyFraction: true })).toBe('trzy czwarte');
      expect(decimalFractionToWordsPL(0.2, { simplifyFraction: true })).toBe('jedna piąta');
      expect(decimalFractionToWordsPL(0.333, { simplifyFraction: true })).toBe('trzysta trzydzieści trzy tysięczne');
    });

    it('should spell negative fractions without reducing them', () => {
      expect(decimalFractionToWordsPL(-0.5, { simplifyFraction: true })).toBe('jedna druga');
      expect(decimalFractionToWordsPL(-0.125, { simplifyFraction: true })).toBe('jedna ósma');
      expect(decimalFractionToWordsPL(-0.01, { simplifyFraction: true })).toBe('jedna setna');
    });
  });

  describe('informal mode (przecinek)', () => {
    it('should handle informal small decimals (default threshold = 4)', () => {
      expect(decimalFractionToWordsPL(0.5, { informal: true })).toBe('przecinek pięć');
      expect(decimalFractionToWordsPL(0.25, { informal: true })).toBe('przecinek dwadzieścia pięć');
      expect(decimalFractionToWordsPL(0.123, { informal: true })).toBe('przecinek sto dwadzieścia trzy');
    });

    it('should handle informal larger decimals by digit-by-digit spelling', () => {
      expect(decimalFractionToWordsPL(0.1234, { informal: true })).toBe('przecinek jeden dwa trzy cztery');
      expect(decimalFractionToWordsPL(0.56789, { informal: true })).toBe('przecinek pięć sześć siedem osiem dziewięć');
      expect(decimalFractionToWordsPL(0.10001, { informal: true })).toBe('przecinek jeden zero zero zero jeden');
    });

    it('should handle informal small decimals with custom threshold', () => {
      expect(decimalFractionToWordsPL(0.12345, { informal: true, informalFormIndividualNumberThreshold: 6 })).toBe(
        'przecinek dwanaście tysięcy trzysta czterdzieści pięć'
      );
      expect(decimalFractionToWordsPL(0.123456, { informal: true, informalFormIndividualNumberThreshold: 5 })).toBe(
        'przecinek jeden dwa trzy cztery pięć sześć'
      );
    });

    it('should correctly handle negative numbers informally', () => {
      expect(decimalFractionToWordsPL(-0.45, { informal: true })).toBe('przecinek czterdzieści pięć');
      expect(decimalFractionToWordsPL(-0.4567, { informal: true })).toBe('przecinek cztery pięć sześć siedem');
    });
  });
});
