import { JestConfigWithTsJest } from "ts-jest";

const config: JestConfigWithTsJest = {
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(ts)$',
  moduleFileExtensions: ['js', 'ts', 'json', 'node'],
  setupFiles: ['./jest.setup.ts'],
};

export default config