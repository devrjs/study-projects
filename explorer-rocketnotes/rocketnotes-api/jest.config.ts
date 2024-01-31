import type { Config } from "@jest/types"

const config: Config.InitialOptions = {
  bail: true,
  // clearMocks: true,
  coverageProvider: "v8",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  testMatch: ["<rootDir>/src/**/*.spec.ts"],
}

export default config

