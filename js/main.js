import { getRouteFromOSRM, getElevationData } from "./api.js";
import { showFindingRoute, hideFindingRoute, toggleJson, resetUI } from "./ui.js";
import { drawRoute, clearRoute } from "./render.js";
import { startIcon, endIcon } from "./icons.js";

export const map = L.map('map').setView([12.935, 77.58], 15);

L.tileLayer(
  "https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png",
  { attribution: "© CartoDB © OSM" }
).addTo(map);


let markers = [];

document.getElementById("jsonBtn").onclick = toggleJson;
document.getElementById("resetBtn").onclick = () => {
  markers.forEach(m => map.removeLayer(m));
  markers = [];
  clearRoute();
  resetUI();
};

map.on("click", async (e) => {
  try {
    if (markers.length === 2) {
      markers.forEach(m => map.removeLayer(m));
      markers = [];
      clearRoute();
      resetUI();
    }

    const icon = markers.length === 0 ? startIcon : endIcon;
    const marker = L.marker(e.latlng, { icon }).addTo(map);
    markers.push(marker);

    if (markers.length !== 2) return;

    showFindingRoute();

    const start = markers[0].getLatLng();
    const end = markers[1].getLatLng();

    // 1. GET ROUTE POLYLINE
    const polyline = await getRouteFromOSRM(start, end);

    if (!polyline) throw new Error("OSRM returned no route.");

    // 2. GET ELEVATION DATA FROM API
    const data = await getElevationData(polyline);

    if (!data || !data.points) throw new Error("Elevation data invalid.");

    // 3. RENDER ROUTE
    drawRoute(data);

  } catch (err) {
    alert("Error: " + err.message);
    console.error(err);
  } finally {
    hideFindingRoute();
  }
});
