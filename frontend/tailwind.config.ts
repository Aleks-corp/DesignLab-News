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
        serif: ["var(--font-dm-serif)", "serif"],
      },
      screens: {
        sm: "860px",
        md: "1156px",
        lg: "1280px",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
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
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        chart: {
          "1": "var(--chart-1)",
          "2": "var(--chart-2)",
          "3": "var(--chart-3)",
          "4": "var(--chart-4)",
          "5": "var(--chart-5)",
        },
      },

      boxShadow: {
        boxShadow: "var(--box-shadow-main)",
        boxShadowHover: "var(--box-shadow-hover)",
      },
    },
  },
  plugins: [typography],
};

export default config;
