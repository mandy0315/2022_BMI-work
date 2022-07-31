import colors from "windicss/colors";

const customColors = {
  "c-background": "#f5f5f5",
  "c-dark": "#4A4A4A",
  "c-gray": "#424242",
  "c-yellow": "#FFD366",
  "c-orange-500": "#FF6C03",
  "c-orange-300": "#FF982D",
  "c-red-500": "#FF1200",
  "c-green": "#86D73F",
  "c-blue": "#31BAF9 ",
};

export default {
  extract: {
    // 啟用/禁用 windicss 配置
    include: ["src/**/*.{vue,html,jsx,tsx}"],
    exclude: ["node_modules", ".git"],
  },
  shortcuts: {
    "box-container": "mx-auto max-w-768px",
  },
  //主題
  theme: {
    screens: {
      // 響應式
      phone: { max: "768px" },
      "sm-phone": { max: "414px" },
    },
    colors: {
      ...customColors,
      ...colors,
    },
    backgroundColor: {
      ...customColors,
      ...colors,
    },
  },
};
