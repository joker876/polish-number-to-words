import { numberToWordsPL } from '../numberToWords';

describe('numberToWordsPL', () => {
  it('should handle pure integers correctly', () => {
    expect(numberToWordsPL(0)).toBe('zero');
    expect(numberToWordsPL(5)).toBe('pięć');
    expect(numberToWordsPL(123)).toBe('sto dwadzieścia trzy');
    expect(numberToWordsPL(1001)).toBe('tysiąc jeden');
    expect(numberToWordsPL(-1_000_000)).toBe('minus milion');
  });

  describe('formal fractions (default behavior)', () => {
    it('should handle positive decimal numbers formally with "i"', () => {
      expect(numberToWordsPL(5.5)).toBe('pięć i pięć dziesiątych');
      expect(numberToWordsPL(7.25)).toBe('siedem i dwadzieścia pięć setnych');
      expect(numberToWordsPL(0.125)).toBe('sto dwadzieścia pięć tysięcznych');
    });

    it('should handle negative decimal numbers formally with "i"', () => {
      expect(numberToWordsPL(-2.5)).toBe('minus dwa i pięć dziesiątych');
      expect(numberToWordsPL(-0.333)).toBe('minus trzysta trzydzieści trzy tysięczne');
      expect(numberToWordsPL(-10.01)).toBe('minus dziesięć i jedna setna');
    });
  });

  describe('informal fractions (przecinek mode)', () => {
    it('should handle informal fractions without "i"', () => {
      expect(numberToWordsPL(5.5, { informalFraction: true })).toBe('pięć przecinek pięć');
      expect(numberToWordsPL(12.25, { informalFraction: true })).toBe('dwanaście przecinek dwadzieścia pięć');
      expect(numberToWordsPL(0.75, { informalFraction: true })).toBe('zero przecinek siedemdziesiąt pięć');
    });

    it('should handle informal fractions with digit-by-digit spelling', () => {
      expect(numberToWordsPL(3.1415, { informalFraction: true })).toBe('trzy przecinek jeden cztery jeden pięć');
      expect(numberToWordsPL(0.56789, { informalFraction: true })).toBe(
        'zero przecinek pięć sześć siedem osiem dziewięć'
      );
    });

    it('should apply custom informal digit threshold', () => {
      expect(
        numberToWordsPL(2.3456, {
          informalFraction: true,
          informalFractionFormIndividualNumberThreshold: 5,
        })
      ).toBe('dwa przecinek trzy tysiące czterysta pięćdziesiąt sześć');

      expect(
        numberToWordsPL(2.34567, {
          informalFraction: true,
          informalFractionFormIndividualNumberThreshold: 5,
        })
      ).toBe('dwa przecinek trzy cztery pięć sześć siedem');
    });
  });

  describe('single word special cases (pół, półtorej, ćwierć)', () => {
    it('should handle single word fractions when enabled', () => {
      expect(numberToWordsPL(0.5, { informalFraction: true, useSingleWordFractions: true })).toBe('pół');
      expect(numberToWordsPL(1.5, { informalFraction: true, useSingleWordFractions: true })).toBe('półtorej');
      expect(numberToWordsPL(0.25, { informalFraction: true, useSingleWordFractions: true })).toBe('ćwierć');
    });

    it('should not apply single word special cases when disabled', () => {
      expect(numberToWordsPL(0.5, { informalFraction: true, useSingleWordFractions: false })).toBe(
        'zero przecinek pięć'
      );
      expect(numberToWordsPL(1.5, { informalFraction: true, useSingleWordFractions: false })).toBe(
        'jeden przecinek pięć'
      );
      expect(numberToWordsPL(0.25, { informalFraction: true, useSingleWordFractions: false })).toBe(
        'zero przecinek dwadzieścia pięć'
      );
    });

    it('should correctly add minus for negative special cases', () => {
      expect(numberToWordsPL(-0.5, { informalFraction: true, useSingleWordFractions: true })).toBe('minus pół');
      expect(numberToWordsPL(-1.5, { informalFraction: true, useSingleWordFractions: true })).toBe('minus półtorej');
    });

    it('should handle non-special fractions in a standard way', () => {
      expect(numberToWordsPL(3.1415, { informalFraction: true })).toBe('trzy przecinek jeden cztery jeden pięć');
      expect(numberToWordsPL(0.56789, { informalFraction: true })).toBe(
        'zero przecinek pięć sześć siedem osiem dziewięć'
      );
    });
  });

  describe('simplifyFraction option', () => {
    it('should spell fraction exactly when simplifyFraction is false (default)', () => {
      expect(numberToWordsPL(0.5, { informalFraction: false, simplifyFraction: false })).toBe('pięć dziesiątych');
      expect(numberToWordsPL(2.25, { informalFraction: false, simplifyFraction: false })).toBe(
        'dwa i dwadzieścia pięć setnych'
      );
    });

    it('should simplify fraction when simplifyFraction is true', () => {
      expect(numberToWordsPL(0.5, { informalFraction: false, simplifyFraction: true })).toBe('jedna druga');
      expect(numberToWordsPL(2.25, { informalFraction: false, simplifyFraction: true })).toBe('dwa i jedna czwarta');
    });
  });
});
