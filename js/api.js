export async function getRouteFromOSRM(start, end) {
  const url = `https://router.project-osrm.org/route/v1/cycling/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=polyline`;

  try {
    const res = await fetch(url);

    if (!res.ok) throw new Error("OSRM fetch failed");

    const data = await res.json();

    if (!data.routes || !data.routes.length)
      throw new Error("OSRM: no routes found");

    return data.routes[0].geometry;
  } catch (err) {
    console.error("OSRM Error:", err);
    throw err;
  }
}

export async function getElevationData(polyline) {
  const apiUrl = "https://route-elevation-maps.onrender.com/route-elevation/";

  try {
    const res = await fetch(`${apiUrl}?poly=${encodeURIComponent(polyline)}`);

    if (!res.ok) throw new Error("FastAPI elevation request failed");

    return await res.json();
  } catch (err) {
    console.error("API Error:", err);
    throw err;
  }
}
