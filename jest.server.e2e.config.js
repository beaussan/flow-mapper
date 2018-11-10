module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'server_e2e',
  testEnvironment: 'node',
  testRegex: '.e2e-spec.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsConfig: 'src/server/tsconfig.server.json',
    },
  },
};
