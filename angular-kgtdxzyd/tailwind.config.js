/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        // Твоя тепла палітра з референсу
        olive: "#8e8f3f",
        redWarm: "#fc4f3e",
        peach: "#f7ab78",
        caramel: "#ca8252",
        blueSoft: "#cbe8ff",
      },

      backgroundImage: {
        // Головний градієнт фону
        "app-gradient": `
          radial-gradient(circle 900px at 30% 18%, #8e8f3f, transparent 62%),
          radial-gradient(circle 1100px at 74% 48%, #fc4f3e, transparent 70%),
          radial-gradient(circle 1200px at 42% 84%, #f7ab78, transparent 72%),
          radial-gradient(circle 1500px at 82% 92%, #ca8252, transparent 76%),
          radial-gradient(circle 1300px at 28% 95%, rgba(203, 232, 255, 0.55), transparent 72%),
          linear-gradient(180deg, #f7ab78 0%, #fc4f3e 42%, #ca8252 72%, rgba(203, 232, 255, 0.55) 100%)
        `,

        // Світлі мʼякі кільця над основним фоном
        "light-circles": `
          radial-gradient(520px circle at 68% 22%, rgba(203, 232, 255, 0.9), transparent 70%),
          radial-gradient(780px circle at 60% 26%, rgba(203, 232, 255, 0.4), transparent 75%),
          radial-gradient(600px circle at 32% 60%, rgba(255,255,255,0.28), transparent 75%)
        `,
      },

      backdropBlur: {
        soft: "20px",
      },

      boxShadow: {
        soft: "0 0 45px rgba(255,255,255,0.25)",
      },

      keyframes: {
        fadeInUp: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },

      animation: {
        "fade-in-up": "fadeInUp 0.8s ease-out forwards",
      },
    },
  },
  plugins: [],
};