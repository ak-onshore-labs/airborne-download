const APP_STORE_URL = "https://apps.apple.com/in/app/airborne-aerial-fitness/id6761477217";
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.airbornefitnessapp";

export default function handler(req, res) {
  const ua = req.headers["user-agent"] || "";

  const isIOS = /iPhone|iPad|iPod/i.test(ua);
  const isAndroid = /Android/i.test(ua);

  if (isIOS) {
    return res.redirect(302, APP_STORE_URL);
  }

  if (isAndroid) {
    return res.redirect(302, PLAY_STORE_URL);
  }

  // Desktop fallback — serve the static page
  res.redirect(302, "/index.html");
}
