// eslint-disable-next-line no-bitwise
const hexToRgb = (hex) => {
  const bigint = parseInt(hex, 16);

  // eslint-disable-next-line no-bitwise
  return `${(bigint >> 16) & 255},${(bigint >> 8) & 255},${bigint & 255}`;
};

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '';
  for (let i = 0; i < 6; i += 1) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return hexToRgb(color);
};

export { hexToRgb, getRandomColor };
