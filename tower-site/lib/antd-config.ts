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
    borderRadius: 8,
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
      borderRadiusLG: 8,
    },
    Button: {
      defaultBg: "#1a1a1a",
      defaultBorderColor: "#2a2a2a",
      defaultColor: "#d4d4d4",
      primaryColor: "#fff",
      borderRadius: 8,
    },
    Typography: {
      colorText: "#d4d4d4",
      colorTextSecondary: "#737373",
    },
    Tag: {
      defaultBg: "#1a1a1a",
      defaultColor: "#d4d4d4",
    },
    Tabs: {
      inkBarColor: "#8b4513",
      itemActiveColor: "#b8860b",
      itemHoverColor: "#d4a853",
      itemSelectedColor: "#d4d4d4",
    },
  },
};
