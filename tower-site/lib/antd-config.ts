import type { ThemeConfig } from "antd";

export const darkTheme: ThemeConfig = {
  token: {
    colorPrimary: "#8b4513",
    colorBgContainer: "#141414",
    colorBgLayout: "#0a0a0a",
    colorBgElevated: "#1a1a1a",
    colorBorderSecondary: "#2a2a2a",
    colorBorder: "#2a2a2a",
    colorText: "#d4d4d4",
    colorTextSecondary: "#737373",
    colorTextTertiary: "#525252",
    borderRadius: 6,
    fontFamily: "var(--font-geist-sans), Arial, sans-serif",
  },
  components: {
    Menu: {
      darkItemBg: "#141414",
      darkItemSelectedBg: "#1a1a1a",
      darkItemColor: "#d4d4d4",
      darkItemSelectedColor: "#8b4513",
      darkItemHoverColor: "#b8860b",
      darkItemHoverBg: "#1a1a1a",
    },
    Card: {
      colorBgContainer: "#141414",
      colorBorderSecondary: "#2a2a2a",
    },
    Button: {
      defaultBg: "#1a1a1a",
      defaultBorderColor: "#2a2a2a",
      defaultColor: "#d4d4d4",
      primaryColor: "#fff",
    },
    Typography: {
      colorText: "#d4d4d4",
      colorTextSecondary: "#737373",
    },
    Tag: {
      defaultBg: "#1a1a1a",
      defaultColor: "#d4d4d4",
    },
  },
};
