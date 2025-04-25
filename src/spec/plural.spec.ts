import { pluralizePl, PluralizerPL } from '../plural';

describe('pluralizePl', () => {
  it('should return singular form for 1 and -1', () => {
    expect(pluralizePl(1, 'kot', 'koty', 'kotów')).toBe('kot');
    expect(pluralizePl(-1, 'kot', 'koty', 'kotów')).toBe('kot');
  });

  it('should return plural234 form for numbers ending with 2, 3, 4 (except 12-14)', () => {
    expect(pluralizePl(2, 'kot', 'koty', 'kotów')).toBe('koty');
    expect(pluralizePl(3, 'kot', 'koty', 'kotów')).toBe('koty');
    expect(pluralizePl(4, 'kot', 'koty', 'kotów')).toBe('koty');
    expect(pluralizePl(22, 'kot', 'koty', 'kotów')).toBe('koty');
  });

  it('should return plural5 form for numbers ending with 5-9 or 0, or between 11-14', () => {
    expect(pluralizePl(5, 'kot', 'koty', 'kotów')).toBe('kotów');
    expect(pluralizePl(11, 'kot', 'koty', 'kotów')).toBe('kotów');
    expect(pluralizePl(14, 'kot', 'koty', 'kotów')).toBe('kotów');
    expect(pluralizePl(25, 'kot', 'koty', 'kotów')).toBe('kotów');
  });

  it('should correctly handle negative numbers', () => {
    expect(pluralizePl(-2, 'kot', 'koty', 'kotów')).toBe('koty');
    expect(pluralizePl(-5, 'kot', 'koty', 'kotów')).toBe('kotów');
    expect(pluralizePl(-13, 'kot', 'koty', 'kotów')).toBe('kotów');
  });

  it('PluralizerPL class should pluralize correctly', () => {
    const catPluralizer = new PluralizerPL('kot', 'koty', 'kotów');
    expect(catPluralizer.pluralize(1)).toBe('kot');
    expect(catPluralizer.pluralize(3)).toBe('koty');
    expect(catPluralizer.pluralize(15)).toBe('kotów');
  });
});
