import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
	"./features/**/*.{js,ts,jsx,tsx,mdx}",
	"./hooks/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
