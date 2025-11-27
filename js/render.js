import { map } from "./main.js";
import { updateStats, updateDifficulty } from "./ui.js";

let routeLayers = [];

export function clearRoute() {
  routeLayers.forEach(l => map.removeLayer(l));
  routeLayers = [];
}

export function drawRoute(data) {
  clearRoute();

  let totalUp = 0, totalDown = 0, maxSlope = 0;

  data.points.forEach((p, i) => {
    if (i === 0) return;

    const p1 = data.points[i - 1];
    const p2 = data.points[i];

    let slope = p2.slope_pct || 0;

    if (slope > 0) totalUp += slope;
    else totalDown += Math.abs(slope);
    maxSlope = Math.max(maxSlope, Math.abs(slope));

    let color = "#4CAF50";

    if (slope > 8) color = "#d73027";
    else if (slope > 4) color = "#fc8d59";
    else if (slope > 1) color = "#fee08b";
    else if (slope < -8) color = "#4575b4";
    else if (slope < -4) color = "#74add1";
    else if (slope < -1) color = "#abd9e9";

    const seg = L.polyline(
      [[p1.lat, p1.lon], [p2.lat, p2.lon]],
      { color, weight: 6, opacity: 0.9 }
    ).addTo(map);

    routeLayers.push(seg);
  });

  updateStats(totalUp, totalDown, maxSlope);
  updateDifficulty(totalUp);
}
