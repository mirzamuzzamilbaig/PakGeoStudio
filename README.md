# 🇵🇰 PakGeoStudio — Pakistan Earth Observation & Climate Resilience Platform
### *Synthesizing 37 Google Earth Engine Applications into a Unified Geospatial Studio*

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Google Earth Engine](https://img.shields.io/badge/Google%20Earth%20Engine-API%20v0.1-brightgreen)](https://earthengine.google.com/)
[![Pakistan Focus](https://img.shields.io/badge/Focus-Pakistan%20Climate%20%26%20GIS-darkgreen)](https://github.com/mirzamuzzamilbaig/PakGeoStudio)
[![Status: Production](https://img.shields.io/badge/Status-Production%20Ready-emerald)](#)

---

## 🌍 Vision & Mission
Pakistan is among the world's most climate-vulnerable nations, facing catastrophic monsoon deluges, accelerated Himalayan glacial lake melt (GLOF hazards), scorching 50°C+ heatwaves in Jacobabad and Sibbi, post-harvest crop stubble smog in Punjab, and severe water scarcity across the Indus Basin.

**PakGeoStudio** was created by merging and consolidating **37 disparate Google Earth Engine applications** into a single, high-performance, modular geospatial ecosystem designed specifically for researchers, disaster management agencies (NDMA, PDMAs), universities, and the wider **Pakistan GIS & Remote Sensing Community**.

---

## 🚀 Key Highlights & Merged Applications

The platform organizes the 37 original applications into **7 Core Thematic Suites**:

### 1. 🌊 Surface Water & Flood Dynamics
*Consolidating: `WATERCHANGEdetection.txt`, `watersurfacechangeforpast36years(WSCDA).txt`, `forglobalwater-app.txt`, `globalsurfacewateranimation.txt`, `globalwaterchangeporapp.txt`, `landsatsurfacewaterapp.txt`, `surfacewatermappinglayerapp.txt`, `surfacewatertransition.txt`, `waterareacalculator.txt`, `waterareamapping.txt`, `waterbodyclassification.txt`, `waterchangeapp.txt`, `waterclassification-naip.txt`, `waterexplorerapp.txt`, `waterrelatedapp.txt`, `albertawideopenwatermapping.txt`, `openwatermappingapp.txt`*
- **Historic 2022 Monsoon Floods**: Sentinel-1 SAR dual-polarization (VV/VH) radar backscatter change detection mapping 8.2M+ hectares of inundated land in Sindh and Balochistan.
- **36-Year Landsat Water Dynamics**: Multi-decadal surface water recurrence, seasonality, and transitions using JRC Global Surface Water (1984–2021).
- **Lake Manchar Extent & NDWI**: High-resolution monitoring of Pakistan's largest freshwater reservoir before, during, and after flood relief cuts.
- **Automated High-Resolution Classification**: Spectral index thresholding combined with digital elevation slope masking.

### 2. 🏔️ Watershed Hydrology & Cryosphere (GLOF)
*Consolidating: `watershedinspector.txt`, `watershed_deleneation_app.txt`, `watershedapplandsat.txt`, `sentinel2_watershed_visualization.txt`, `mithiwatershedapp.txt`, `stormwaterapp.txt`*
- **Upper Indus Basin Delineation**: Automated HydroBASINS level 4–12 catchment boundaries across the Karakoram, Hindu Kush, and Himalayas.
- **Glacial Lake Outburst Floods (GLOF Watch)**: Tracking supraglacial lakes (Shisper, Passu, Baltoro) and moraine dams using Sentinel-2 NDSI snow and water indices.
- **Tarbela & Mangla Reservoir Inflows**: Integrated snowmelt runoff and precipitation forecasts feeding major hydroelectric reservoirs.

### 3. 🔥 Climate, Heatwaves & Meteorological Hazards
*Consolidating: `platform_climage_moitoring.txt` (DATA-Clima), `landsurfacetemperatureapp.txt`, `foroceantemp-app.txt`*
- **Jacobabad & Sibbi Extreme Heatwaves**: Landsat 8/9 Level-2 thermal radiance algorithms extracting Land Surface Temperature (LST >52°C).
- **GPM Monsoon Rainfall Anomalies**: Multi-satellite precipitation radar tracking extreme precipitation departures.
- **Arabian Sea Sea Surface Temperature (SST)**: MODIS Aqua thermal monitoring for tropical cyclone tracking and marine heatwaves.

### 4. 🌾 Wildfire & Agricultural Stubble Burning
*Consolidating: `firecodeapp_bobcat.txt`*
- **Punjab Crop Residue Smog Tracker**: High-temporal FIRMS VIIRS & MODIS thermal anomaly detection of post-harvest paddy stubble fires.
- **Margalla Hills & KP Forest Fires**: Normalized Burn Ratio (NBR) and Google Dynamic World near-real-time burn perimeter mapping.

### 5. 🌿 Land Use, Land Cover (LULC) & Mangrove Ecosystems
*Consolidating: `forlulcapp.txt`, `globalforestchangeapp.txt`, `zimbawe_landcovermap.txt`*
- **Indus River Delta Mangroves**: Multi-spectral tracking of mangrove afforestation across Keti Bandar and Shah Bandar (+35% net expansion).
- **Hansen Global Forest Change**: Annual deforestation and illegal logging detection in Khyber Pakhtunkhwa and Gilgit-Baltistan.

### 6. 🏙️ Demographics & Urbanization
*Consolidating: `globalpopulationexplorerapp.txt`*
- **Karachi & Lahore Metropolitan Expansion**: JRC Global Human Settlement Layer (GHSL) spatial density grids (persons/km²).
- **Urban Sprawl Corridor**: Agricultural land conversion analysis along the Grand Trunk Road and motorways.

### 7. 🛠️ Earth Observation Toolkit & Exporter
*Consolidating: `mosaicapp.txt`, `linkedmaps-app.txt`, `splitpanelapp.txt`, `rasterdownloadapp.txt`, `ui_app_gee_downloader_code.txt`*
- **Seamless Cloud-Free Mosaics**: Median Sentinel-2 and Landsat composites filtered for <10% cloud cover.
- **Interactive Swipe Comparator**: Real-time split-screen slider comparing Pre-Flood vs Peak-Flood imagery.
- **Multi-Band GeoTIFF Exporter**: Direct task creation for Google Drive and cloud storage exports.

---

## 📁 Repository Structure

```
project1/
├── apps ui/                                # Original 37 Earth Engine app scripts
├── EarthEngine_Pakistan_Master_App.js      # Consolidated GEE Script (Ready for Code Editor)
├── index.html                              # Modern Web Portal Interface
├── styles.css                              # Glassmorphism & responsive CSS design
├── app.js                                  # Interactive mapping, Chart.js analytics & controls
└── README.md                               # Complete documentation & deployment guide
```

---

## 💻 How to Use

### Option A: Run the Web Dashboard Locally
1. Double-click `index.html` to open it in any web browser (Chrome, Firefox, Edge, Safari).
2. Alternatively, serve it using Python's built-in HTTP server:
   ```bash
   python -m http.server 8000
   ```
3. Open `http://localhost:8000` in your browser.

### Option B: Deploy in Google Earth Engine
1. Open the [Google Earth Engine Code Editor](https://code.earthengine.google.com/).
2. Open [`EarthEngine_Pakistan_Master_App.js`](EarthEngine_Pakistan_Master_App.js).
3. Copy the entire contents and paste them into a new script in the Code Editor.
4. Click **Run**.
5. Explore the interactive panel on the left, change regions and thematic suites, and inspect real-time satellite layers.

### Option C: Publish to GitHub Pages
To publish this platform live on your GitHub:
```bash
git remote add origin https://github.com/<your-username>/<repo-name>.git
git branch -M main
git push -u origin main
```
Then enable **GitHub Pages** under `Settings > Pages > Deploy from a branch > main / root`.

---

## 🛰️ Earth Observation Datasets Used
- **COPERNICUS/S1_GRD**: Sentinel-1 C-Band Synthetic Aperture Radar (SAR)
- **COPERNICUS/S2_SR_HARMONIZED**: Sentinel-2 Multi-Spectral Surface Reflectance (10m)
- **LANDSAT/LC08/C02/T1_L2 & LANDSAT/LC09**: Landsat 8/9 Level-2 Thermal & Surface Reflectance (30m)
- **NASA/GPM_L3/IMERG_V06**: Global Precipitation Measurement
- **JRC/GSW1_4/GlobalSurfaceWater**: Joint Research Centre Global Surface Water (36 years)
- **JRC/GHSL/P2023A/GHS_POP**: Global Human Settlement Layer
- **USGS/SRTMGL1_003**: 30m Shuttle Radar Topography Mission DEM
- **FIRMS VIIRS & MODIS**: Active Fire and Thermal Anomaly Product
- **UMD/hansen/global_forest_change_2021_v1_9**: Hansen Global Forest Change

---

## 👨‍💻 Author & Attribution
Developed with dedication for the **Pakistan & Global GIS Community** by:
**Mirza Muhammad Muzzamil**  
NED University of Engineering and Technology, Karachi, Pakistan  
Email: `mirzamuzzamil@neduet.edu.pk`  
GitHub: [@mirzamuzzamilbaig](https://github.com/mirzamuzzamilbaig)
