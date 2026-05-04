// Run this script locally after deploying to Vercel:
// node generate-qr.js https://your-vercel-url.vercel.app
//
// Output: public/qr.svg and public/qr.png

const QRCode = require("qrcode");
const fs = require("fs");
const path = require("path");

const url = process.argv[2];

if (!url) {
  console.error("❌  Please provide your Vercel URL:");
  console.error("   node generate-qr.js https://your-vercel-url.vercel.app");
  process.exit(1);
}

const OUTPUT_SVG = path.join("public", "qr.svg");
const OUTPUT_PNG = path.join("public", "qr.png");

const QR_OPTIONS = {
  errorCorrectionLevel: "H",
  margin: 2,
  width: 800,
  color: {
    dark: "#04C0C1",   // Airborne teal
    light: "#1a1a1a",  // Dark background
  },
};

async function generate() {
  console.log(`\n🔗  Generating QR for: ${url}\n`);

  // SVG
  const svgString = await QRCode.toString(url, { ...QR_OPTIONS, type: "svg" });
  fs.writeFileSync(OUTPUT_SVG, svgString);
  console.log(`✅  SVG saved → ${OUTPUT_SVG}`);

  // PNG
  await QRCode.toFile(OUTPUT_PNG, url, { ...QR_OPTIONS, type: "png" });
  console.log(`✅  PNG saved → ${OUTPUT_PNG}`);

  console.log("\n📦  Commit both files and push to trigger redeploy.\n");
}

generate().catch(console.error);
