const sum = (a,b) => {
  return a+b
}

describe('Initial test', () => {
  it('Sum two different numbers, (4 + 4 = 8)', () => {

    expect(sum(4,4)).toEqual(8)
  })
});
