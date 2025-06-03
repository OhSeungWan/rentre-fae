/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");
const px0_10 = { ...Array.from(Array(11)).map((_, i) => `${i}px`) };
const px0_100 = { ...Array.from(Array(101)).map((_, i) => `${i}px`) };
const px0_200 = { ...Array.from(Array(201)).map((_, i) => `${i}px`) };

const document_h0_200 = Array.from(Array(101)).map((_, i) => ({
  [`${i}ih`]: `calc(var(--vh, 1vh) * ${i})`,
}));
function generateIhObject() {
  const vhObject = {};
  const percentages = [...Array.from(Array(101)).map((_, i) => i)];

  percentages.forEach((percent) => {
    vhObject[`${percent}ih`] = `calc(var(--vh, 1vh) * ${percent})`;
  });

  return vhObject;
}

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: ["class"],

  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    screens: {
      maxscrn374: { max: "374px" },
      maxscrn370: { max: "370px" },
      scrn300: "300px",
      scrn321: "321px",
      scrn360: "360px",
      scrn375: "375px",
      scrn391: { min: "391px", max: "540px" },
      scrn412: "412px",
      scrn500: "500px",
      scrn600: "600px",
      ...defaultTheme.screens,
    },
    letterSpacing: { sm: "-0.4px" },
    lineHeight: {
      normal: "130%",
    },
    colors: { ...colors, primary: "#5D7CF9" },

    extend: {
      borderWidth: px0_10,
      fontSize: px0_100,
      lineHeight: px0_100,
      maxWidth: px0_200,
      minWidth: px0_200,
      maxHeight: px0_200,
      minHeight: px0_200,
      spacing: px0_200,
      borderRadius: px0_100,
      fontFamily: {
        gravitasOne: ["var(--font-gravitas-one)"],
        tektur: ["var(--font-tektur)"],
        ntsanskr: ["var(--font-noto-sans)"],
        applesd: ["Noto Sans", "Apple SD Gothic Neo", "sans-serif"],
        pretendard: ["var(--font-pretendard)"],
      },
      boxShadow: { "upper-sm": "0px -5px 5px 0px rgba(0, 0, 0, 0.04)" },
      height: generateIhObject(),
      minHeight: generateIhObject(),
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        animatedgradient: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        gradient: "animatedgradient 6s ease infinite alternate",
      },
      backgroundSize: {
        "300%": "300%",
      },
    },
  },
  // plugins: [require("tailwind-scrollbar")],
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
