import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: "var(--foreground)",
            a: { color: "var(--foreground)" },
            p: {
              fontFamily: "var(--font-roboto)",
              fontSize: "16px",
              marginBottom: "0",
              maxWidth: "100%",
            },
            img: {
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
              borderRadius: "12px",
              maxWidth: "100%",
            },
            h2: {
              fontWight: "600",
            },
            h3: {
              fontWight: "600",
            },
            h4: {
              fontWight: "600",
            },
          },
        },
        lg: {
          css: {
            color: "var(--foreground)",
            p: {
              fontFamily: "var(--font-roboto)",
              fontSize: "18px",
              maxWidth: "100%",
            },
            a: { color: "var(--foreground)" },
            img: {
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
              borderRadius: "12px",
              width: "100%",
            },
            h2: {
              fontWeight: "600",
            },
            h3: {
              fontWeight: "600",
            },
            h4: {
              fontWeight: "600",
            },
          },
        },
      },
      fontFamily: {
        sans: ["var(--font-roboto)", "sans-serif"],
        sansConf: ["var(--font-robotoCondensed)", "sans-serif"],
        serif: ["var(--font-dm-serif)", "serif"],
      },
      screens: {
        sm: "860px",
        md: "1156px",
        lg: "1280px",
      },
      borderRadius: {
        lg: "8px",
        md: "6px",
        sm: "4px",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",

        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        hover: {
          DEFAULT: "var(--hover)",
          foreground: "var(--hover-foreground)",
        },
        backgroundBtn: "var(--backgroundBtn)",
        backgroundBtnHover: "var(--backgroundBtnHover)",
      },
      boxShadow: {
        btn: "var(--boxShadowBtn)",
        input: "var(--boxShadowInput)",
        inputHover: "var(--boxShadowInputHover)",
      },
    },
  },
  plugins: [typography],
};

export default config;
