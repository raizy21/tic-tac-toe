export default {
  testEnvironment: "jest-environment-jsdom",
  transform: {},
  moduleNameMapper: {
    "^scripts/(.*)$": "<rootDir>/scripts/$1",
  },
};
