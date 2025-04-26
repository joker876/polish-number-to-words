import { commonFractionToWordsPL } from '../commonFractionToWords';

describe('commonFractionToWordsPL', () => {
  it('should handle simple fractions', () => {
    expect(commonFractionToWordsPL(1, 2)).toBe('jedna druga');
    expect(commonFractionToWordsPL(2, 3)).toBe('dwie trzecie');
    expect(commonFractionToWordsPL(3, 4)).toBe('trzy czwarte');
    expect(commonFractionToWordsPL(1, 5)).toBe('jedna piąta');
    expect(commonFractionToWordsPL(1, 10)).toBe('jedna dziesiąta');
    expect(commonFractionToWordsPL(5, 6)).toBe('pięć szóstych');
  });

  it('should handle more complex fractions', () => {
    expect(commonFractionToWordsPL(1, 100)).toBe('jedna setna');
    expect(commonFractionToWordsPL(2, 100)).toBe('dwie setne');
    expect(commonFractionToWordsPL(5, 100)).toBe('pięć setnych');
    expect(commonFractionToWordsPL(2, 1000)).toBe('dwie tysięczne');
    expect(commonFractionToWordsPL(3, 1_000_000)).toBe('trzy milionowe');
    expect(commonFractionToWordsPL(11, 20)).toBe('jedenaście dwudziestych');
    expect(commonFractionToWordsPL(21, 100)).toBe('dwadzieścia jeden setnych');
  });

  it('should handle fractions with multiples of thousands, millions, etc', () => {
    expect(commonFractionToWordsPL(1, 2000)).toBe('jedna dwutysięczna');
    expect(commonFractionToWordsPL(2, 12_000)).toBe('dwie dwunastotysięczne');
    expect(commonFractionToWordsPL(8, 200_000)).toBe('osiem dwustutysięcznych');
    expect(commonFractionToWordsPL(3, 999_000)).toBe('trzy dziewięćset dziewięćdziesięciodziewięciotysięczne');
    expect(commonFractionToWordsPL(1, 1_000_000)).toBe('jedna milionowa');
    expect(commonFractionToWordsPL(2, 2_000_000)).toBe('dwie dwumilionowe');
  });

  it('should handle very complex fractions', () => {
    expect(commonFractionToWordsPL(48, 123)).toBe('czterdzieści osiem sto dwudziestych trzecich');
    expect(commonFractionToWordsPL(882, 1998)).toBe(
      'osiemset osiemdziesiąt dwie tysiąc dziewięćset dziewięćdziesiąte ósme'
    );
    expect(commonFractionToWordsPL(1_000_000, 1_000_003)).toBe('milion milion trzecich');
    expect(commonFractionToWordsPL(567, 890)).toBe('pięćset sześćdziesiąt siedem osiemset dziewięćdziesiątych');
    expect(commonFractionToWordsPL(999_999, 1_000_000)).toBe(
      'dziewięćset dziewięćdziesiąt dziewięć tysięcy dziewięćset dziewięćdziesiąt dziewięć milionowych'
    );
  });

  it('should handle fractions with negative parts', () => {
    expect(commonFractionToWordsPL(-1, 2)).toBe('minus jedna druga');
    expect(commonFractionToWordsPL(2, -3)).toBe('dwie minus trzecie');
    expect(commonFractionToWordsPL(-3, -4)).toBe('minus trzy minus czwarte');
    expect(commonFractionToWordsPL(-5, 6)).toBe('minus pięć szóstych');
    expect(commonFractionToWordsPL(7, -8)).toBe('siedem minus ósmych');
    expect(commonFractionToWordsPL(-9, -10)).toBe('minus dziewięć minus dziesiątych');
  });

  it('should handle special cases', () => {
    expect(commonFractionToWordsPL(0, 5)).toBe('zero piątych');
    expect(commonFractionToWordsPL(0, 1)).toBe('zero pierwszych');
    expect(commonFractionToWordsPL(1, 1)).toBe('jedna pierwsza');
    expect(commonFractionToWordsPL(2, 2)).toBe('dwie drugie');
    expect(commonFractionToWordsPL(100, 1)).toBe('sto pierwszych');
  });

  it('should handle large numerators and denominators', () => {
    expect(commonFractionToWordsPL(1_234_567, 8_765_432)).toBe(
      'milion dwieście trzydzieści cztery tysiące pięćset sześćdziesiąt siedem osiem milionów siedemset sześćdziesiąt pięć tysięcy czterysta trzydziestych drugich'
    );
    expect(commonFractionToWordsPL(999_999_999, 1_000_000_000)).toBe(
      'dziewięćset dziewięćdziesiąt dziewięć milionów dziewięćset dziewięćdziesiąt dziewięć tysięcy dziewięćset dziewięćdziesiąt dziewięć miliardowych'
    );
  });

  it('should handle singular vs plural correctly', () => {
    expect(commonFractionToWordsPL(1, 3)).toBe('jedna trzecia');
    expect(commonFractionToWordsPL(2, 3)).toBe('dwie trzecie');
    expect(commonFractionToWordsPL(5, 3)).toBe('pięć trzecich');
    expect(commonFractionToWordsPL(1, 1000)).toBe('jedna tysięczna');
    expect(commonFractionToWordsPL(2, 1000)).toBe('dwie tysięczne');
  });
});
