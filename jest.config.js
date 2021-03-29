module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/**.ts',
  ],
  testRegex: '(/__tests__/.*(\\.|/)(test|spec))\\.[jt]sx?$',
  setupFilesAfterEnv: ['./jest.setup.js'],
};
