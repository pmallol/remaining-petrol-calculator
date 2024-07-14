export const calculateBottles = (liters: number) => {
  const sizes = [15, 5, 3, 1];
  const result: { [key: string]: number } = {};

  sizes.forEach(size => {
    result[size] = Math.floor(liters / size);
    liters %= size;
  });

  return result;
};
