module.exports = {
  preset: 'jest-preset-angular',
  setupTestFrameworkScriptFile: '<rootDir>/src/client/setupJest.ts',
  testPathIgnorePatterns: ['/node_modules/', '/fury_theme/', '/src/server'],

  globals: {
    'ts-jest': {
      tsConfigFile: 'src/client/tsconfig.spec.json',
    },
    __TRANSFORM_HTML__: true,
  },
  transform: {
    '^.+\\.(ts|js|html)$':
      '<rootDir>/node_modules/jest-preset-angular/preprocessor.js',
  },
  testMatch: [
    '**/__tests__/**/*.+(ts|js)?(x)',
    '**/+(*.)+(spec|test).+(ts|js)?(x)',
  ],
  moduleFileExtensions: ['ts', 'js', 'html'],
  moduleNameMapper: {
    //'app/(.*)': '<rootDir>/src/app/$1',
    //'assets/(.*)': '<rootDir>/src/assets/$1',
    //'environments/(.*)': '<rootDir>/src/environments/$1',

    'app/(.*)$': '<rootDir>/src/client/app/$1',
    'environments/(.*)$': '<rootDir>/src/client/environments/$1',
    'assets/(.*)$': '<rootDir>/src/client/assets/$1',
    '@fuse/(.*)$': '<rootDir>/src/client/@fuse/$1',
  },
  transformIgnorePatterns: ['node_modules/(?!@ngrx)'],
};
