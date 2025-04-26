import { currencyToWordsPL } from '../currencyToWords';

describe('currencyToWordsPL', () => {
  it('should handle whole numbers without grosze', () => {
    expect(currencyToWordsPL(0)).toBe('zero złotych zero groszy');
    expect(currencyToWordsPL(1)).toBe('jeden złoty zero groszy');
    expect(currencyToWordsPL(2)).toBe('dwa złote zero groszy');
    expect(currencyToWordsPL(5)).toBe('pięć złotych zero groszy');
  });

  it('should handle numbers with grosze', () => {
    expect(currencyToWordsPL(1.01)).toBe('jeden złoty jeden grosz');
    expect(currencyToWordsPL(2.05)).toBe('dwa złote pięć groszy');
    expect(currencyToWordsPL(5.99)).toBe('pięć złotych dziewięćdziesiąt dziewięć groszy');
  });

  it('should handle larger amounts', () => {
    expect(currencyToWordsPL(1234.56)).toBe('jeden tysiąc dwieście trzydzieści cztery złote pięćdziesiąt sześć groszy');
    expect(currencyToWordsPL(1_000_000.99)).toBe('jeden milion złotych dziewięćdziesiąt dziewięć groszy');
  });

  it('should handle rounding of grosze correctly', () => {
    expect(currencyToWordsPL(10.004)).toBe('dziesięć złotych zero groszy');
    expect(currencyToWordsPL(10.005)).toBe('dziesięć złotych jeden grosz');
  });

  it('should handle custom currency words', () => {
    expect(currencyToWordsPL(5.25, ['dolar', 'dolary', 'dolarów'], ['cent', 'centy', 'centów'])).toBe(
      'pięć dolarów dwadzieścia pięć centów'
    );
    expect(currencyToWordsPL(1.01, ['euro', 'euro', 'euro'], ['cent', 'centy', 'centów'])).toBe(
      'jeden euro jeden cent'
    );
  });

  it('should handle negative amounts', () => {
    expect(currencyToWordsPL(-2.5)).toBe('minus dwa złote pięćdziesiąt groszy');
    expect(currencyToWordsPL(-1000.01)).toBe('minus jeden tysiąc złotych jeden grosz');
  });
});
