🚴‍♂️ Route Elevation Maps

A lightweight cycling-focused elevation and slope analyzer with colored route grading.

🌍 Live Demo (Frontend)

👉 https://dibyansh850.github.io/route_elevation_maps/

⚙️ Backend API (FastAPI on Render)

👉 https://route-elevation-maps.onrender.com/route-elevation

📌 Overview

Route Elevation Maps allows you to:

Select two points on a map

Fetch the best cycling route using OSRM

Decode the polyline geometry

Get elevation data using Open-Elevation

Smooth noisy elevation using NumPy

Calculate gradient segments with distance-aware chunking

Render a color-coded slope map

Display ascent, descent, max slope, difficulty

This tool is built specifically for cyclists who need accurate terrain difficulty classification.

🗂️ Project Structure
route_elevation_maps/
│

├── index.html        ← frontend entry point (deployed to GitHub Pages)<br/>
├── css/              ← frontend styles
│   ├── styles.css<br/>
│   ├── buttons.css<br/>
│   ├── legend.css<br/>
│   └── loading.css<br/>
│<br/>
├── js/               ← frontend logic (modular ES6)<br/>
│   ├── main.js<br/>
│   ├── api.js<br/>
│   ├── ui.js<br/>
│   ├── render.js<br/>
│   ├── icons.js<br/>
│   └── overlays/<br/>
│<br/>
├── assets/           ← icons/images<br/>
│<br/>
├── backend.py        ← FastAPI backend hosted separately (NOT used by GitHub Pages)<br/>
│<br/>
└── README.md<br/>


Frontend is deployed from repo root, backend is deployed separately.<br/>

⭐ Features<br/>
🎨 Elevation-colored route<br/>

Gradient → Color:<br/>

Slope,	Color<br/>
8%+ uphill	  🔴 Red<br/>
4–8% uphill	🟠 Orange<br/>
1–4% uphill	🟡 Yellow<br/>
Flat (±1%)	🟩 Green<br/>
1–4% downhill	🔵 Light Blue<br/>
4–8% downhill	🟦 Medium Blue<br/>
8%+ downhill	🔷 Dark Blue<br/>
<br/>
📊 Statistics<br/>

Total Ascent (m)

Total Descent (m)

Max Grade (%)

Average Absolute Grade (%)

Difficulty Rating

Easy

Moderate

Hard

Very Hard

⚡ FastAPI Backend

Backend performs:

Polyline decoding (via polyline)

Calls Open-Elevation via httpx

Moving-average smoothing (NumPy convolution)

Vectorized haversine distances

Chunk-based slope computation (50m)

Complete elevation profile summary

🧭 OSRM Routing

Frontend uses:

https://router.project-osrm.org/route/v1/cycling/{lon1},{lat1};{lon2},{lat2}?geometries=polyline

💎 Clean UI

Start/Finish markers

Colored slope segments

Difficulty panel

Floating “Finding route…” loading bar

Reset button

Show JSON inspector

🌐 Deployment
✅ Frontend — GitHub Pages

Your frontend lives in repo root, so setup is:

Go to Settings → Pages

Choose:

Source: Deploy from a branch

Branch: main

Folder: / (root)

Save

GitHub Pages publishes index.html and assets automatically.

Any push to main updates your site.

🟦 Backend — Render (FastAPI)

Use:

Build Command

pip install -r requirements.txt

Start Command

uvicorn backend:app --host 0.0.0.0 --port $PORT

This runs your FastAPI on the port Render assigns.


📡 API Usage
GET /route-elevation?poly=<encoded-polyline>

Returns:

{
  "total_ascent_m": 102.3,
  "total_descent_m": 97.5,
  "max_slope_pct": 8.2,
  "avg_slope_pct": 3.1,
  "difficulty": "Hard",
  "points": [...]
}
