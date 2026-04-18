function sum(a: number, b: number): number {
  return a + b;
}

test("exemple", () => {
  const value = sum(2, 5);

  expect(value).toBe(6);
});
