module.exports = {
  clearMocks: true,
  testEnvironment: 'node',
  transform: {
    '.(js)': '@sucrase/jest-plugin'
  }
};
