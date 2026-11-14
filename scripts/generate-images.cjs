// Regenerates favicon, apple icon, navbar mark, footer logo and the social share (OG) image.
// Run after changing public/photo.jpeg, public/logo.png or public/favicon.png:
//   npm run images
//
// PHOTO_CROP = the square area of photo.jpeg that shows your face (in pixels).
// Adjust it if you replace the photo and the face isn't centred in public/og.png.
const PHOTO_CROP = { left: 40, top: 250, width: 640, height: 640 };

const sharp = require("sharp");
const clear = { r: 0, g: 0, b: 0, alpha: 0 };

(async () => {
  const mark = await sharp("public/favicon.png").trim().toBuffer();

  // browser tab icon (Next.js serves src/app/icon.png automatically)
  await sharp(mark)
    .resize(176, 176, { fit: "contain", background: clear })
    .extend({ top: 8, bottom: 8, left: 8, right: 8, background: clear })
    .png({ compressionLevel: 9 })
    .toFile("src/app/icon.png");

  // iOS home-screen icon (needs a solid background)
  const inner = await sharp(mark).resize(136, 136, { fit: "contain", background: clear }).png().toBuffer();
  await sharp({ create: { width: 180, height: 180, channels: 4, background: "#0b0b12" } })
    .composite([{ input: inner, gravity: "center" }])
    .png()
    .toFile("src/app/apple-icon.png");

  // navbar mark + footer logo
  await sharp(mark).resize(96, 96, { fit: "contain", background: clear }).png().toFile("public/logo-mark.png");
  await sharp("public/logo.png").trim().resize({ width: 480 }).png({ compressionLevel: 9, palette: true }).toFile("public/logo-full.png");

  // 1200x630 share image
  const W = 1200, H = 630, D = 340;
  const bg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <radialGradient id="a" cx="15%" cy="10%" r="70%"><stop offset="0" stop-color="#7c3aed" stop-opacity=".55"/><stop offset="1" stop-color="#08080c" stop-opacity="0"/></radialGradient>
    <radialGradient id="b" cx="95%" cy="100%" r="60%"><stop offset="0" stop-color="#db2777" stop-opacity=".4"/><stop offset="1" stop-color="#08080c" stop-opacity="0"/></radialGradient>
    <linearGradient id="t" x1="0" x2="1"><stop offset="0" stop-color="#c4b5fd"/><stop offset=".5" stop-color="#f472b6"/><stop offset="1" stop-color="#fb923c"/></linearGradient>
    <linearGradient id="r" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#a78bfa"/><stop offset=".5" stop-color="#f472b6"/><stop offset="1" stop-color="#fb923c"/></linearGradient>
    <pattern id="g" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M48 0H0V48" fill="none" stroke="#ffffff" stroke-opacity=".05"/></pattern>
  </defs>
  <rect width="100%" height="100%" fill="#08080c"/><rect width="100%" height="100%" fill="url(#g)"/>
  <rect width="100%" height="100%" fill="url(#a)"/><rect width="100%" height="100%" fill="url(#b)"/>
  <circle cx="${780 + D / 2}" cy="${145 + D / 2}" r="${D / 2 + 8}" fill="url(#r)"/>
  <text x="80" y="300" font-family="Segoe UI, Arial, sans-serif" font-size="76" font-weight="700" fill="#ededf2" letter-spacing="-2">Bhumika Garg</text>
  <text x="80" y="370" font-family="Segoe UI, Arial, sans-serif" font-size="40" font-weight="600" fill="url(#t)">Full Stack Developer</text>
  <text x="80" y="430" font-family="Consolas, monospace" font-size="26" fill="#a1a0ad">MERN · React.js · Next.js · Node.js</text>
  <rect x="80" y="480" rx="22" width="330" height="44" fill="#ffffff" fill-opacity=".06" stroke="#ffffff" stroke-opacity=".12"/>
  <circle cx="106" cy="502" r="7" fill="#bef264"/>
  <text x="124" y="511" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="#ededf2">Available for work · Delhi</text>
</svg>`;
  const ogMark = await sharp(mark).resize(120, 120, { fit: "contain", background: clear }).toBuffer();
  const circle = Buffer.from(`<svg width="${D}" height="${D}"><circle cx="${D / 2}" cy="${D / 2}" r="${D / 2}"/></svg>`);
  const photo = await sharp("public/photo.jpeg").extract(PHOTO_CROP).resize(D, D).composite([{ input: circle, blend: "dest-in" }]).png().toBuffer();
  await sharp(Buffer.from(bg))
    .composite([{ input: ogMark, left: 78, top: 96 }, { input: photo, left: 780, top: 145 }])
    .png({ compressionLevel: 9 })
    .toFile("public/og.png");

  console.log("✓ icons, logos and og.png regenerated");
})();
