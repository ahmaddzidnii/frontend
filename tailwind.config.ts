import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,ts}"],
  theme: {
    extend: {
      fontSize: {
        sm: "13px", // bisa langsung string
        xs13: ["13px", { lineHeight: "18px" }], // custom name dengan line-height
      },
    },
  },
  plugins: [],
};

export default config;
