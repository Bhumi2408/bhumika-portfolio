export default function manifest() {
  return {
    name: "Bhumika Garg — Full Stack Developer",
    short_name: "Bhumika.dev",
    description: "Portfolio of Bhumika Garg, Full Stack Developer (MERN · Next.js) in Delhi, India.",
    start_url: "/",
    display: "standalone",
    background_color: "#08080c",
    theme_color: "#7c3aed",
    icons: [
      { src: "/icon.png", sizes: "192x192", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
