import { pluralizePl, PluralizerPL } from '../pluralize';

describe('pluralizePl with "kot", "koty", "kotów"', () => {
  const SINGULAR = 'kot';
  const PLURAL_234 = 'koty';
  const PLURAL_5 = 'kotów';

  it('returns singular for exactly 1 and -1', () => {
    expect(pluralizePl(1, SINGULAR, PLURAL_234, PLURAL_5)).toBe(SINGULAR);
    expect(pluralizePl(-1, SINGULAR, PLURAL_234, PLURAL_5)).toBe(SINGULAR);
  });

  it('returns plural5 for zero', () => {
    expect(pluralizePl(0, SINGULAR, PLURAL_234, PLURAL_5)).toBe(PLURAL_5);
  });

  it('returns plural234 for endings 2-4 (excluding 12-14)', () => {
    [2, 3, 4, 22, 23, 24, 32, 33, 34, 102, 1002].forEach(num =>
      expect(pluralizePl(num, SINGULAR, PLURAL_234, PLURAL_5)).withContext(`num: ${num}`).toBe(PLURAL_234)
    );
  });

  it('returns plural5 for endings 12-14 (special case)', () => {
    [12, 13, 14, 112, 113, 114, 1012, 2013, 3014].forEach(num =>
      expect(pluralizePl(num, SINGULAR, PLURAL_234, PLURAL_5)).withContext(`num: ${num}`).toBe(PLURAL_5)
    );
  });

  it('returns plural5 for endings in 0, 5-9 and 10, 11, 15-19', () => {
    [0, 5, 6, 7, 8, 9, 10, 11, 15, 16, 17, 18, 19, 20].forEach(num =>
      expect(pluralizePl(num, SINGULAR, PLURAL_234, PLURAL_5)).withContext(`num: ${num}`).toBe(PLURAL_5)
    );
  });

  it('handles large numbers ending in plural234-valid digits', () => {
    [1234562, 9876543, 1234564].forEach(num =>
      expect(pluralizePl(num, SINGULAR, PLURAL_234, PLURAL_5)).withContext(`num: ${num}`).toBe(PLURAL_234)
    );
  });

  it('handles large numbers with 12-14 endings (plural5 override)', () => {
    [1234512, 1001113, 1000014].forEach(num =>
      expect(pluralizePl(num, SINGULAR, PLURAL_234, PLURAL_5)).withContext(`num: ${num}`).toBe(PLURAL_5)
    );
  });

  it('returns plural234 for numbers ending in 1 but not equal to 1', () => {
    [21, 101, 1001, 2021, 100001].forEach(num =>
      expect(pluralizePl(num, SINGULAR, PLURAL_234, PLURAL_5)).withContext(`num: ${num}`).toBe(PLURAL_5)
    );
  });

  it('correctly pluralizes negative numbers', () => {
    expect(pluralizePl(-2, SINGULAR, PLURAL_234, PLURAL_5)).toBe(PLURAL_234);
    expect(pluralizePl(-4, SINGULAR, PLURAL_234, PLURAL_5)).toBe(PLURAL_234);
    expect(pluralizePl(-12, SINGULAR, PLURAL_234, PLURAL_5)).toBe(PLURAL_5);
    expect(pluralizePl(-23, SINGULAR, PLURAL_234, PLURAL_5)).toBe(PLURAL_234);
    expect(pluralizePl(-114, SINGULAR, PLURAL_234, PLURAL_5)).toBe(PLURAL_5);
    expect(pluralizePl(-1000004, SINGULAR, PLURAL_234, PLURAL_5)).toBe(PLURAL_234);
  });

  it('pluralizePl handles fractional numbers using fraction form', () => {
    expect(pluralizePl(1.5, 'kot', 'koty', 'kotów', 'kota')).toBe('kota');
    expect(pluralizePl(2.25, 'kot', 'koty', 'kotów', 'kota')).toBe('kota');
    expect(pluralizePl(-0.75, 'kot', 'koty', 'kotów', 'kota')).toBe('kota');
    expect(pluralizePl(0.001, 'kot', 'koty', 'kotów', 'kota')).toBe('kota');
  });

  it('pluralizePl throws an error when fractional value provided without fractionForm', () => {
    expect(() => pluralizePl(1.5, 'kot', 'koty', 'kotów')).toThrowError();
  });

  it('PluralizerPL class produces same results', () => {
    const catPluralizer = new PluralizerPL(SINGULAR, PLURAL_234, PLURAL_5);

    expect(catPluralizer.pluralize(1)).toBe(SINGULAR);
    expect(catPluralizer.pluralize(2)).toBe(PLURAL_234);
    expect(catPluralizer.pluralize(13)).toBe(PLURAL_5);
    expect(catPluralizer.pluralize(22)).toBe(PLURAL_234);
    expect(catPluralizer.pluralize(1112)).toBe(PLURAL_5);
    expect(catPluralizer.pluralize(1123)).toBe(PLURAL_234);
  });

  it('PluralizerPL.toString() returns readable representation', () => {
    const pluralizer = new PluralizerPL('kot', 'koty', 'kotów');
    expect(pluralizer.toString()).toBe('1: kot, 2: koty, 5: kotów');
  });
});
