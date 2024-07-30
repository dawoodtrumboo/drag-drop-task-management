import { theme } from "antd";

export const LightTheme = {
  algorithm: theme.defaultAlgorithm,
  token: {
    colorPrimary: "#438ACC",
    colorError: "#FF6B6B",
    colorInfo: "#0038FF",
    colorSuccess: "#0ECC5A",
    colorWarning: "##FFA235",
    colorTextBase: "#4C575D",
    colorTextHeading: "#438ACC",

    colorBgBase: "#F9F9F9",
    colorBgContainer: "#fff",
    // Typography
    fontFamily: `Manrope,-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial`,
    fontSize: 14,
    fontSizeHeading1: 36,
    fontSizeHeading2: 30,
    fontSizeHeading3: 24,
    linkDecoration: "underline",
    // Layout
    padding: 16,
    boxShadow:
      "0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)",
    borderRadius: 6,
    controlHeight: 32,
    lineType: "solid",
    lineWidth: 1,
  },
  components: {
    Layout: {
      bodyBg: "#F9F9F9",
      headerBg: "F9F9F9",
      siderBg: "#ffffff",
    },
    Menu: {
      activeBarBorderWidth: 0,
    },
    Card: {
      padding: 10,
      paddingLG: 10,
      borderRadiusLG: 6,
    },
  },
};
