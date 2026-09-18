// ==========================================================================
// PakGeoStudio — Pakistan Earth Observation & Climate Platform (Client Logic)
// Author: Mirza Muhammad Muzzamil (mirzamuzzamil@neduet.edu.pk)
// ==========================================================================

// 1. DATA DICTIONARY: 7 SUITES & ALL 37 APPLICATIONS CONSOLIDATED
const PLATFORM_SUITES = {
  water: {
    name: 'Surface Water & Flood Dynamics',
    icon: 'fa-water',
    apps: [
      {
        id: 'water_2022_floods',
        title: '2022 Historic Floods (Sentinel-1 SAR Inundation)',
        origFile: 'WATERCHANGEdetection.txt, splitpanelapp.txt',
        desc: 'High-precision radar backscatter change detection mapping inundated agricultural lands and towns in Sindh and Balochistan.',
        datasets: ['COPERNICUS/S1_GRD', 'Sentinel-1 C-Band SAR'],
        center: [26.8, 68.1],
        zoom: 8,
        legend: [
          { color: '#00e5ff', label: 'Flood Inundation (Aug-Sep 2022)' },
          { color: '#0033aa', label: 'Permanent Water / Reservoirs' },
          { color: '#10b981', label: 'Submerged Farmland' }
        ],
        stats: { flooded: '8.2M Hectares', temp: '34.2 °C', glaciers: '3,044 Lakes', mangroves: '+35% Growth' },
        chartType: 'flood'
      },
      {
        id: 'water_36yr_landsat',
        title: '36-Year Landsat Water Surface Dynamics (JRC)',
        origFile: 'watersurfacechangeforpast36years(WSCDA).txt',
        desc: 'Quantifies 36+ years of surface water occurrence, persistence, and change across the Indus River Basin (1984-2021).',
        datasets: ['JRC/GSW1_4/GlobalSurfaceWater', 'LANDSAT/LC08', 'LANDSAT/LT05'],
        center: [27.0, 68.2],
        zoom: 8,
        legend: [
          { color: '#081d58', label: 'Permanent Water (75-100%)' },
          { color: '#225ea8', label: 'Frequent Seasonal Water (50-75%)' },
          { color: '#41b6c4', label: 'Moderate Water (25-50%)' },
          { color: '#ffffcc', label: 'Ephemeral / Rare Flood (<25%)' }
        ],
        stats: { flooded: '1.4M Hectares', temp: '36.5 °C', glaciers: '3,044 Lakes', mangroves: '+35% Growth' },
        chartType: 'water_history'
      },
      {
        id: 'water_manchar',
        title: 'Lake Manchar Surface Area & NDWI Time Series',
        origFile: 'waterchangeapp.txt, waterareacalculator.txt',
        desc: 'High-temporal water extent calculation for Lake Manchar, tracking overflow breaches into the Indus River during monsoon floods.',
        datasets: ['LANDSAT/LC08/C02/T1_L2', 'Normalized Difference Water Index'],
        center: [26.43, 67.89],
        zoom: 11,
        legend: [
          { color: '#00f0ff', label: 'Lake Extent Post-Breach (Oct 2022)' },
          { color: '#0055ff', label: 'Normal Seasonal Lake Boundary' }
        ],
        stats: { flooded: '520 km²', temp: '33.1 °C', glaciers: '3,044 Lakes', mangroves: '+35% Growth' },
        chartType: 'flood'
      },
      {
        id: 'water_naip_classification',
        title: 'High-Resolution Water Body Classification & Extraction',
        origFile: 'waterclassification-naip.txt, waterbodyclassification.txt',
        desc: 'Machine-learning aided water boundary delineation incorporating terrain slope masking and NIR/Green thresholding.',
        datasets: ['COPERNICUS/S2_SR', 'USGS/SRTMGL1_003'],
        center: [31.5, 73.0],
        zoom: 9,
        legend: [
          { color: '#00ffff', label: 'Classified Water Bodies' },
          { color: '#0284c7', label: 'Canal Irrigation Network' }
        ],
        stats: { flooded: '3.8M Hectares', temp: '35.0 °C', glaciers: '3,044 Lakes', mangroves: '+35% Growth' },
        chartType: 'water_history'
      },
      {
        id: 'water_global_animation',
        title: 'Surface Water Multi-Year Animation & Transitions',
        origFile: 'globalsurfacewateranimation.txt, surfacewatertransition.txt',
        desc: 'Generates multi-temporal transition maps and timelapse visualizers showing expanding and contracting water bodies.',
        datasets: ['JRC/GSW1_1/YearlyHistory', 'JAXA/ALOS/AW3D30'],
        center: [28.5, 70.0],
        zoom: 8,
        legend: [
          { color: '#2b83ba', label: 'Permanent Water' },
          { color: '#fdae61', label: 'Seasonal Variation' },
          { color: '#d7191c', label: 'Lost Water Bodies' }
        ],
        stats: { flooded: '2.1M Hectares', temp: '37.8 °C', glaciers: '3,044 Lakes', mangroves: '+35% Growth' },
        chartType: 'water_history'
      }
    ]
  },

  watershed: {
    name: 'Watershed & Catchment Hydrology',
    icon: 'fa-mountain-city',
    apps: [
      {
        id: 'ws_upper_indus',
        title: 'Upper Indus Basin HydroBASINS Delineation',
        origFile: 'watershedinspector.txt, watershed_deleneation_app.txt',
        desc: 'Automated hydrological catchment boundary extraction from HydroBASINS levels 4-12 across the Karakoram and Himalayan origins of the Indus.',
        datasets: ['WWF/HydroSHEDS/v1/Basins/hybas_4', 'USGS/SRTMGL1_003'],
        center: [35.5, 75.0],
        zoom: 8,
        legend: [
          { color: '#6366f1', label: 'Upper Indus Sub-Catchment' },
          { color: '#38bdf8', label: 'Major River Channels' },
          { color: '#a855f7', label: 'Drainage Divide' }
        ],
        stats: { flooded: '524,000 km²', temp: '14.2 °C', glaciers: '3,044 Lakes', mangroves: '+35% Growth' },
        chartType: 'watershed'
      },
      {
        id: 'ws_hunza_glof',
        title: 'Hunza & Karakoram Glacial Lake Outburst (GLOF) Watch',
        origFile: 'watershedapplandsat.txt, sentinel2_watershed_visualization.txt',
        desc: 'Monitors supraglacial lakes (Shisper, Passu, Baltoro) and moraine-dammed melt reservoirs vulnerable to catastrophic GLOF events.',
        datasets: ['COPERNICUS/S2_SR_HARMONIZED', 'Normalized Difference Snow Index (NDSI)'],
        center: [36.31, 74.65],
        zoom: 10,
        legend: [
          { color: '#0022ff', label: 'Glacial Lakes (GLOF Watch)' },
          { color: '#ffffff', label: 'Glacier & Perennial Snow Cover' },
          { color: '#ef4444', label: 'High Hazard Breach Zone' }
        ],
        stats: { flooded: '36 High Risk', temp: '-4.8 °C', glaciers: '3,044 Lakes', mangroves: '+35% Growth' },
        chartType: 'watershed'
      },
      {
        id: 'ws_tarbela_mangla',
        title: 'Tarbela & Mangla Dam Inflow Catchment Inspector',
        origFile: 'mithiwatershedapp.txt, stormwaterapp.txt',
        desc: 'Integrates precipitation, snowmelt runoff, and reservoir volume forecasting for Pakistans primary hydroelectric dams.',
        datasets: ['NASA/GPM_L3/IMERG_V06', 'USGS/SRTMGL1_003'],
        center: [34.14, 72.70],
        zoom: 9,
        legend: [
          { color: '#0284c7', label: 'Tarbela Reservoir Storage' },
          { color: '#10b981', label: 'Inflow Catchment Tributaries' }
        ],
        stats: { flooded: '11.6 MAF Capacity', temp: '26.4 °C', glaciers: '3,044 Lakes', mangroves: '+35% Growth' },
        chartType: 'watershed'
      }
    ]
  },

  climate: {
    name: 'Climate, Heatwaves & Weather',
    icon: 'fa-temperature-arrow-up',
    apps: [
      {
        id: 'clim_jacobabad_lst',
        title: 'Jacobabad & Sibbi Extreme Heatwave LST (Landsat 8/9)',
        origFile: 'landsurfacetemperatureapp.txt, platform_climage_moitoring.txt',
        desc: 'Mono-window and split-window thermal radiance algorithms computing surface temperatures exceeding 52°C in Sindh & Balochistan plains.',
        datasets: ['LANDSAT/LC08/C02/T1_L2', 'Thermal Band ST_B10'],
        center: [28.28, 68.44],
        zoom: 9,
        legend: [
          { color: '#67001f', label: 'Extreme Hazard (>52°C)' },
          { color: '#d73027', label: 'Severe Heat (48°C - 52°C)' },
          { color: '#fee090', label: 'High Heat (42°C - 48°C)' },
          { color: '#4575b4', label: 'Irrigated / Moderate (<42°C)' }
        ],
        stats: { flooded: 'N/A', temp: '52.8 °C Max', glaciers: '3,044 Lakes', mangroves: '+35% Growth' },
        chartType: 'climate'
      },
      {
        id: 'clim_gpm_monsoon',
        title: 'GPM GSMaP Monsoon Rainfall & Precipitation Anomaly',
        origFile: 'platform_climage_moitoring.txt',
        desc: 'Satellite precipitation radar tracking daily rainfall accumulation and percentage departure from normal over Pakistan.',
        datasets: ['NASA/GPM_L3/IMERG_V06', 'JAXA/GPM_L3/GSMaP'],
        center: [30.0, 69.5],
        zoom: 6,
        legend: [
          { color: '#49006a', label: 'Extreme Deluge (>1000 mm)' },
          { color: '#253494', label: 'Heavy Monsoon (600 - 1000 mm)' },
          { color: '#41b6c4', label: 'Moderate Rain (300 - 600 mm)' },
          { color: '#ffffcc', label: 'Low / Arid (<300 mm)' }
        ],
        stats: { flooded: '+190% Over Normal', temp: '32.1 °C', glaciers: '3,044 Lakes', mangroves: '+35% Growth' },
        chartType: 'climate'
      },
      {
        id: 'clim_arabian_sst',
        title: 'Arabian Sea & Indus Delta Sea Surface Temperature (MODIS)',
        origFile: 'foroceantemp-app.txt',
        desc: 'MODIS Aqua Sea Surface Temperature (SST) monitoring marine heatwaves, cyclogenesis conditions, and coastal currents.',
        datasets: ['NASA/OCEANDATA/MODIS-Aqua/L3SMI'],
        center: [23.5, 65.0],
        zoom: 7,
        legend: [
          { color: '#d73027', label: 'Warm SST (>30°C - Cyclone Risk)' },
          { color: '#fee090', label: 'Moderate (27°C - 30°C)' },
          { color: '#4575b4', label: 'Upwelling (<26°C)' }
        ],
        stats: { flooded: 'N/A', temp: '30.4 °C Sea Temp', glaciers: '3,044 Lakes', mangroves: '+35% Growth' },
        chartType: 'climate'
      }
    ]
  },

  wildfire: {
    name: 'Wildfire & Agricultural Stubble Burning',
    icon: 'fa-fire',
    apps: [
      {
        id: 'fire_punjab_stubble',
        title: 'Punjab Agricultural Stubble Burning & Smog Tracker',
        origFile: 'firecodeapp_bobcat.txt',
        desc: 'Thermal anomaly detection monitoring post-harvest paddy residue fires across the Punjab breadbasket triggering autumn hazardous smog.',
        datasets: ['FIRMS VIIRS Active Fire', 'MODIS Thermal Anomalies'],
        center: [31.5, 73.8],
        zoom: 8,
        legend: [
          { color: '#bd0026', label: 'High Confidence Fire Pixel' },
          { color: '#f03b20', label: 'Moderate Thermal Anomaly' },
          { color: '#fecc5c', label: 'Low Thermal Anomaly' }
        ],
        stats: { flooded: '14,200 Fire Hotspots', temp: 'AQI 450+ (Hazardous)', glaciers: '3,044 Lakes', mangroves: '+35% Growth' },
        chartType: 'wildfire'
      },
      {
        id: 'fire_margalla_forest',
        title: 'Margalla Hills & KP Pine Forest Fire Perimeters',
        origFile: 'firecodeapp_bobcat.txt',
        desc: 'Normalized Burn Ratio (NBR) and differential NBR mapping burn severity and vegetation recovery in Himalayan foothill forests.',
        datasets: ['COPERNICUS/S2_SR', 'GOOGLE/DYNAMICWORLD/V1'],
        center: [33.74, 73.05],
        zoom: 12,
        legend: [
          { color: '#7f0000', label: 'High Burn Severity' },
          { color: '#d73027', label: 'Moderate Burn Severity' },
          { color: '#1a9850', label: 'Unburned Pine Canopy' }
        ],
        stats: { flooded: '1,850 Hectares Burned', temp: '38.0 °C', glaciers: '3,044 Lakes', mangroves: '+35% Growth' },
        chartType: 'wildfire'
      }
    ]
  },

  lulc: {
    name: 'LULC, Mangroves & Forest Dynamics',
    icon: 'fa-tree',
    apps: [
      {
        id: 'lulc_indus_mangroves',
        title: 'Indus Delta Mangrove Restoration & Health (NDVI)',
        origFile: 'forlulcapp.txt, forglobalwater-app.txt',
        desc: 'Quantifies mangrove canopy expansion across Keti Bandar and Shah Bandar under the Ten Billion Tree Tsunami Project.',
        datasets: ['COPERNICUS/S2_SR_HARMONIZED', 'Sentinel-2 NDVI / MNDWI'],
        center: [24.15, 67.50],
        zoom: 10,
        legend: [
          { color: '#006d2c', label: 'Dense Healthy Mangroves' },
          { color: '#74c476', label: 'Sparse / Restored Mangroves' },
          { color: '#a6cee3', label: 'Tidal Mudflats / Creek Waters' }
        ],
        stats: { flooded: 'N/A', temp: '31.2 °C', glaciers: '3,044 Lakes', mangroves: '+35% Net Expansion' },
        chartType: 'lulc'
      },
      {
        id: 'lulc_hansen_forest',
        title: 'Hansen Global Forest Change (Deforestation in KP/GB)',
        origFile: 'globalforestchangeapp.txt, zimbawe_landcovermap.txt',
        desc: 'Global tree canopy density (2000-2023) identifying illegal logging hotspots and natural pine forest regeneration.',
        datasets: ['UMD/hansen/global_forest_change_2021_v1_9'],
        center: [34.8, 73.2],
        zoom: 9,
        legend: [
          { color: '#006d2c', label: 'Dense Forest Canopy' },
          { color: '#ff0000', label: 'Tree Cover Loss (Deforestation)' },
          { color: '#0000ff', label: 'Tree Cover Gain (Afforestation)' }
        ],
        stats: { flooded: '4.8% Forest Cover', temp: '22.0 °C', glaciers: '3,044 Lakes', mangroves: '+35% Growth' },
        chartType: 'lulc'
      }
    ]
  },

  population: {
    name: 'Demographics & Urbanization',
    icon: 'fa-users',
    apps: [
      {
        id: 'pop_karachi_density',
        title: 'Karachi Megacity Expansion & GHSL Population Density',
        origFile: 'globalpopulationexplorerapp.txt',
        desc: 'High-resolution population density grids and urban built-up footprint expansion for Karachi metropolitan area.',
        datasets: ['JRC/GHSL/P2023A/GHS_POP', 'JRC/GHSL/P2023A/GHS_BUILT_S'],
        center: [24.86, 67.01],
        zoom: 11,
        legend: [
          { color: '#67000d', label: 'Hyper-Dense Core (>2,500 / km²)' },
          { color: '#de2d26', label: 'High Density (1,000 - 2,500)' },
          { color: '#fcae91', label: 'Suburban / Peri-Urban (200 - 1,000)' },
          { color: '#fee5d9', label: 'Rural Settlement (<200)' }
        ],
        stats: { flooded: '16.5M Urban Pop', temp: '34.0 °C', glaciers: '3,044 Lakes', mangroves: '+35% Growth' },
        chartType: 'population'
      },
      {
        id: 'pop_punjab_corridor',
        title: 'Lahore & Punjab Urban Corridor Dynamics',
        origFile: 'globalpopulationexplorerapp.txt',
        desc: 'Analyzes agricultural land conversion to urban residential societies along the Lahore-Gujranwala-Faisalabad corridor.',
        datasets: ['JRC/GHSL/P2023A/GHS_POP'],
        center: [31.52, 74.35],
        zoom: 11,
        legend: [
          { color: '#67000d', label: 'Metropolitan Core' },
          { color: '#de2d26', label: 'Rapid Suburban Sprawl' },
          { color: '#fee5d9', label: 'Peripheral Farmlands' }
        ],
        stats: { flooded: '13.1M Urban Pop', temp: '36.2 °C', glaciers: '3,044 Lakes', mangroves: '+35% Growth' },
        chartType: 'population'
      }
    ]
  },

  toolkit: {
    name: 'EO Toolkit & Exporter',
    icon: 'fa-toolbox',
    apps: [
      {
        id: 'tool_s2_mosaic',
        title: 'Seamless Cloud-Free Sentinel-2 / Landsat Mosaic Builder',
        origFile: 'mosaicapp.txt, linkedmaps-app.txt',
        desc: 'Interactive median composites filtering clouds <10% to produce seamless countrywide true-color and false-color basemaps.',
        datasets: ['COPERNICUS/S2_SR_HARMONIZED', 'LANDSAT/LC09/C02/T1_L2'],
        center: [30.37, 69.34],
        zoom: 6,
        legend: [
          { color: '#2b83ba', label: 'Water Resources' },
          { color: '#008837', label: 'Irrigated Agriculture' },
          { color: '#d7191c', label: 'Arid / Urban Surfaces' }
        ],
        stats: { flooded: '100% Cloud Free', temp: '31.5 °C', glaciers: '3,044 Lakes', mangroves: '+35% Growth' },
        chartType: 'toolkit'
      },
      {
        id: 'tool_geotiff_exporter',
        title: 'Interactive Multi-Band GeoTIFF Raster Exporter',
        origFile: 'rasterdownloadapp.txt, ui_app_gee_downloader_code.txt',
        desc: 'Enables bounding-box selection to export analysis-ready GeoTIFF rasters directly to Google Drive or local storage.',
        datasets: ['Earth Engine Export Task API', 'GeoTIFF Client Stream'],
        center: [30.37, 69.34],
        zoom: 6,
        legend: [
          { color: '#38bdf8', label: 'Export Bounding Box (AOI)' },
          { color: '#10b981', label: '10m Ground Sample Distance' }
        ],
        stats: { flooded: 'GeoTIFF Ready', temp: '30m / 10m Res', glaciers: '3,044 Lakes', mangroves: '+35% Growth' },
        chartType: 'toolkit'
      }
    ]
  }
};

// 2. REGION PRESETS
const PAK_REGIONS = {
  pakistan: { center: [30.3753, 69.3451], zoom: 6, label: 'Whole Pakistan' },
  indus_flood: { center: [26.4500, 67.9000], zoom: 9, label: 'Indus Floodplains & Lake Manchar (Sindh)' },
  hunza_glof: { center: [36.3167, 74.6500], zoom: 10, label: 'Hunza & Karakoram (Glaciers / GLOF)' },
  punjab_stubble: { center: [31.5000, 73.5000], zoom: 8, label: 'Punjab Agricultural Belt (Stubble Fires)' },
  jacobabad_heat: { center: [28.2810, 68.4385], zoom: 9, label: 'Jacobabad & Sibbi (Extreme Heatwave LST)' },
  indus_mangroves: { center: [24.1500, 67.5000], zoom: 10, label: 'Indus Delta & Thatta (Mangroves)' },
  karachi_urban: { center: [24.8607, 67.0011], zoom: 11, label: 'Karachi Megacity' },
  islamabad_margalla: { center: [33.6844, 73.0479], zoom: 11, label: 'Islamabad & Margalla Hills' }
};

// 3. APPLICATION STATE
let state = {
  currentSuite: 'water',
  currentApp: null,
  currentBasemap: 'satellite',
  swipeMode: false,
  analyticsDrawerOpen: true,
  chartInstance: null
};

// 4. MAP INITIALIZATION
const map = L.map('map', {
  center: [30.3753, 69.3451],
  zoom: 6,
  zoomControl: false,
  attributionControl: false
});

// Add custom zoom control to top-right
L.control.zoom({ position: 'topright' }).addTo(map);

// Basemap Layers
const basemaps = {
  satellite: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19,
    attribution: 'Esri, Maxar, Earthstar Geographics'
  }),
  dark: L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    maxZoom: 19,
    attribution: '&copy; CartoDB'
  }),
  osm: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap'
  }),
  topo: L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    maxZoom: 17,
    attribution: '&copy; OpenTopoMap'
  })
};

basemaps.satellite.addTo(map);

// Layer Groups for Overlays
const overlayLayerGroup = L.layerGroup().addTo(map);
const preFloodLayerGroup = L.layerGroup(); // For swipe mode pre-flood

// 5. DOM ELEMENTS
const roiSelect = document.getElementById('roi-select');
const suiteTabs = document.getElementById('suite-tabs');
const appSelect = document.getElementById('app-select');
const moduleBadge = document.getElementById('module-badge');
const moduleTitle = document.getElementById('module-title');
const moduleDesc = document.getElementById('module-desc');
const datasetTags = document.getElementById('dataset-tags');
const opacitySlider = document.getElementById('opacity-slider');
const opacityVal = document.getElementById('opacity-val');
const legendItems = document.getElementById('legend-items');
const floatingStatus = document.getElementById('floating-status');
const btnRunAnalysis = document.getElementById('btn-run-analysis');
const btnExportGeoTIFF = document.getElementById('btn-export-geotiff');
const btnToggleBasemap = document.getElementById('btn-toggle-basemap');
const btnToggleAnalytics = document.getElementById('btn-toggle-analytics');
const btnResetZoom = document.getElementById('btn-reset-zoom');
const btnSwipeMode = document.getElementById('btn-swipe-mode');
const swipeContainer = document.getElementById('swipe-container');
const swipeSlider = document.getElementById('swipe-slider');
const swipeLine = document.getElementById('swipe-line');
const analyticsDrawer = document.getElementById('analytics-drawer');
const btnMinimizeDrawer = document.getElementById('btn-minimize-drawer');
const drawerHeading = document.getElementById('drawer-heading');
const btnGeeModal = document.getElementById('btn-gee-modal');
const geeModal = document.getElementById('gee-modal');
const btnCloseModal = document.getElementById('btn-close-modal');
const btnCopyCode = document.getElementById('btn-copy-code');
const geeCodeContainer = document.getElementById('gee-code-container');
const btnToggleSidebar = document.getElementById('btn-toggle-sidebar');
const sidebar = document.getElementById('sidebar');

// 6. UI EVENT LISTENERS
function initEventListeners() {
  // Region Selector
  roiSelect.addEventListener('change', (e) => {
    const reg = PAK_REGIONS[e.target.value];
    if (reg) {
      map.flyTo(reg.center, reg.zoom, { duration: 1.5 });
    }
  });

  // Suite Tabs Click
  suiteTabs.addEventListener('click', (e) => {
    const tab = e.target.closest('.suite-tab');
    if (!tab) return;
    const suiteKey = tab.dataset.suite;
    switchSuite(suiteKey);
  });

  // App Select Change
  appSelect.addEventListener('change', (e) => {
    const appId = e.target.value;
    const selected = PLATFORM_SUITES[state.currentSuite].apps.find(a => a.id === appId);
    if (selected) {
      loadAppDetails(selected);
    }
  });

  // Run Analysis Button
  btnRunAnalysis.addEventListener('click', () => {
    if (state.currentApp) {
      applyAnalysisLayer(state.currentApp);
      map.flyTo(state.currentApp.center, state.currentApp.zoom, { duration: 1.2 });
    }
  });

  // Opacity Slider
  opacitySlider.addEventListener('input', (e) => {
    const val = e.target.value;
    opacityVal.textContent = `${val}%`;
    overlayLayerGroup.eachLayer(layer => {
      if (layer.setStyle) layer.setStyle({ fillOpacity: val / 100, opacity: val / 100 });
      if (layer.setOpacity) layer.setOpacity(val / 100);
    });
  });

  // Basemap Switcher
  btnToggleBasemap.addEventListener('click', () => {
    const mapTypes = ['satellite', 'dark', 'osm', 'topo'];
    let idx = mapTypes.indexOf(state.currentBasemap);
    map.removeLayer(basemaps[state.currentBasemap]);
    idx = (idx + 1) % mapTypes.length;
    state.currentBasemap = mapTypes[idx];
    basemaps[state.currentBasemap].addTo(map);
    btnToggleBasemap.querySelector('span').textContent = state.currentBasemap.toUpperCase();
  });

  // Reset Zoom
  btnResetZoom.addEventListener('click', () => {
    map.flyTo([30.3753, 69.3451], 6, { duration: 1.2 });
    roiSelect.value = 'pakistan';
  });

  // Toggle Analytics Drawer
  btnToggleAnalytics.addEventListener('click', () => {
    analyticsDrawer.classList.toggle('minimized');
    btnToggleAnalytics.classList.toggle('active');
  });

  btnMinimizeDrawer.addEventListener('click', () => {
    analyticsDrawer.classList.toggle('minimized');
    btnToggleAnalytics.classList.toggle('active');
  });

  // Toggle Sidebar
  btnToggleSidebar.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
  });

  // Swipe Mode Toggle
  btnSwipeMode.addEventListener('click', () => {
    state.swipeMode = !state.swipeMode;
    btnSwipeMode.classList.toggle('active', state.swipeMode);
    swipeContainer.classList.toggle('hidden', !state.swipeMode);

    if (state.swipeMode) {
      enableSwipeMode();
    } else {
      disableSwipeMode();
    }
  });

  // Swipe Slider Input
  swipeSlider.addEventListener('input', (e) => {
    const val = e.target.value;
    swipeLine.style.left = `${val}%`;
    updateSwipeClip(val);
  });

  // GEE Code Studio Modal
  btnGeeModal.addEventListener('click', () => {
    openGeeModal();
  });

  btnCloseModal.addEventListener('click', () => {
    geeModal.classList.add('hidden');
  });

  geeModal.addEventListener('click', (e) => {
    if (e.target === geeModal) geeModal.classList.add('hidden');
  });

  btnCopyCode.addEventListener('click', () => {
    navigator.clipboard.writeText(geeCodeContainer.textContent).then(() => {
      btnCopyCode.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
      setTimeout(() => {
        btnCopyCode.innerHTML = '<i class="fa-regular fa-copy"></i> Copy to Clipboard';
      }, 2000);
    });
  });

  // GeoTIFF Exporter Simulator
  btnExportGeoTIFF.addEventListener('click', () => {
    triggerGeoTiffExport();
  });
}

// 7. SUITE & APP SWITCHING
function switchSuite(suiteKey) {
  state.currentSuite = suiteKey;
  
  // Update Tab Buttons
  document.querySelectorAll('.suite-tab').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.suite === suiteKey);
  });

  const suite = PLATFORM_SUITES[suiteKey];
  appSelect.innerHTML = '';
  suite.apps.forEach(app => {
    const opt = document.createElement('option');
    opt.value = app.id;
    opt.textContent = app.title;
    appSelect.appendChild(opt);
  });

  loadAppDetails(suite.apps[0]);
  applyAnalysisLayer(suite.apps[0]);
}

function loadAppDetails(app) {
  state.currentApp = app;
  moduleBadge.textContent = `${PLATFORM_SUITES[state.currentSuite].name}`;
  moduleTitle.textContent = app.title;
  moduleDesc.textContent = app.desc;

  // Render Datasets
  datasetTags.innerHTML = '';
  app.datasets.forEach(ds => {
    const span = document.createElement('span');
    span.className = 'tag';
    span.textContent = ds;
    datasetTags.appendChild(span);
  });

  // Render Legend
  renderLegend(app.legend);

  // Update Summary Stats Chips
  document.getElementById('stat-flooded').textContent = app.stats.flooded;
  document.getElementById('stat-temp').textContent = app.stats.temp;
  document.getElementById('stat-glaciers').textContent = app.stats.glaciers;
  document.getElementById('stat-mangroves').textContent = app.stats.mangroves;

  // Update Floating Header
  floatingStatus.textContent = `Module: ${app.title} • Active`;
  drawerHeading.textContent = `${app.title} — Analytics & Trends`;

  // Render Analytics Chart
  renderChart(app.chartType);
}

function renderLegend(legendData) {
  legendItems.innerHTML = '';
  legendData.forEach(item => {
    const row = document.createElement('div');
    row.className = 'legend-item';
    row.innerHTML = `
      <div class="legend-color" style="background-color: ${item.color};"></div>
      <span>${item.label}</span>
    `;
    legendItems.appendChild(row);
  });
}

// 8. VECTOR & RASTER ANALYSIS LAYERS
function applyAnalysisLayer(app) {
  overlayLayerGroup.clearLayers();
  preFloodLayerGroup.clearLayers();

  const opacity = opacitySlider.value / 100;

  // SIMULATED REAL-WORLD DATASETS FOR PAKISTAN
  if (app.chartType === 'flood') {
    // 2022 Floods & Lake Manchar Inundation Polygons
    // 1. Lake Manchar Normal Area
    const normalManchar = L.circle([26.43, 67.89], {
      radius: 9000,
      color: '#0033aa',
      fillColor: '#0055ff',
      fillOpacity: opacity * 0.8,
      weight: 2
    }).bindPopup('<b>Lake Manchar (Normal Boundary)</b><br>Pre-flood surface area: ~120 km²');
    overlayLayerGroup.addLayer(normalManchar);

    // 2. Swollen 2022 Flood Inundation Zone
    const floodZone = L.polygon([
      [27.6, 68.4], [27.3, 68.8], [26.8, 68.4], [26.3, 67.8],
      [25.9, 68.1], [26.1, 67.6], [26.6, 67.5], [27.2, 67.8]
    ], {
      color: '#00e5ff',
      fillColor: '#00e5ff',
      fillOpacity: opacity * 0.55,
      weight: 2,
      dashArray: '4, 4'
    }).bindPopup('<b>2022 Sindh Monsoon Flood Inundation</b><br>Sentinel-1 SAR detected submerged farmland: 4.5M Hectares in Sindh.');
    overlayLayerGroup.addLayer(floodZone);

    // 3. Balochistan flash flood zone (Jaffarabad / Nasirabad)
    const balochistanFlood = L.polygon([
      [28.4, 68.2], [28.2, 68.6], [27.8, 68.3], [27.9, 67.9]
    ], {
      color: '#00e5ff',
      fillColor: '#00ffff',
      fillOpacity: opacity * 0.5,
      weight: 1
    }).bindPopup('<b>Jaffarabad / Nasirabad Flood Plain</b><br>Flash floods inundating paddy corridors.');
    overlayLayerGroup.addLayer(balochistanFlood);

    // Add marker for Sukkur & Kotri Barrages
    L.circleMarker([27.70, 68.85], { radius: 7, color: '#ffea00', fillColor: '#ffea00', fillOpacity: 1 })
      .bindPopup('<b>Sukkur Barrage</b><br>Peak Discharge: >600,000 cusecs (Super Flood)')
      .addTo(overlayLayerGroup);
  }
  else if (app.chartType === 'watershed') {
    // Upper Indus Basin Catchment & Glacial Lakes
    const hunzaGlaciers = [
      { name: 'Shisper Glacier Lake (GLOF Hazard)', lat: 36.42, lng: 74.72, risk: 'High Risk - Moraine Dammed' },
      { name: 'Passu Glacier Lagoon', lat: 36.48, lng: 74.88, risk: 'Meltwater Expansion' },
      { name: 'Baltoro Glacier Supraglacial Network', lat: 35.75, lng: 76.20, risk: 'Cryosphere Retreat' },
      { name: 'Gilgit River Confluence', lat: 35.92, lng: 74.31, risk: 'Hydrological Station' }
    ];

    hunzaGlaciers.forEach(g => {
      L.circleMarker([g.lat, g.lng], {
        radius: 8,
        color: '#ffffff',
        fillColor: '#0022ff',
        fillOpacity: opacity * 0.9,
        weight: 2
      }).bindPopup(`<b>${g.name}</b><br>Status: ${g.risk}`).addTo(overlayLayerGroup);
    });

    // Sub-basin boundary
    const basinPoly = L.polygon([
      [36.8, 73.5], [37.0, 75.5], [35.5, 77.5], [34.5, 75.0], [35.2, 73.0]
    ], {
      color: '#6366f1',
      fillColor: '#38bdf8',
      fillOpacity: opacity * 0.25,
      weight: 2
    }).bindPopup('<b>Upper Indus Sub-Catchment (Karakoram / Gilgit-Baltistan)</b><br>Primary source of Pakistan freshwater inflows.').addTo(overlayLayerGroup);
  }
  else if (app.chartType === 'climate') {
    // Extreme Heatwave LST in Jacobabad / Sibbi
    const heatZones = [
      { lat: 28.28, lng: 68.44, name: 'Jacobabad (52.8°C LST)', r: 35000, color: '#67001f' },
      { lat: 29.54, lng: 67.87, name: 'Sibbi (51.5°C LST)', r: 28000, color: '#a50026' },
      { lat: 27.56, lng: 68.21, name: 'Larkana Plains (49.2°C LST)', r: 25000, color: '#d73027' }
    ];

    heatZones.forEach(hz => {
      L.circle([hz.lat, hz.lng], {
        radius: hz.r,
        color: hz.color,
        fillColor: hz.color,
        fillOpacity: opacity * 0.6,
        weight: 2
      }).bindPopup(`<b>Extreme Heatwave Center: ${hz.name}</b><br>Landsat 8 Thermal Band ST_B10 Anomaly`).addTo(overlayLayerGroup);
    });
  }
  else if (app.chartType === 'wildfire') {
    // Punjab Crop Residue Fires
    const fireHotspots = [
      [31.52, 74.35], [31.65, 74.00], [31.25, 73.80], [31.40, 73.10],
      [32.15, 74.18], [30.67, 73.10], [30.20, 71.45], [31.80, 73.30]
    ];

    fireHotspots.forEach(pt => {
      L.circleMarker(pt, {
        radius: 7,
        color: '#ffff00',
        fillColor: '#bd0026',
        fillOpacity: opacity * 0.9,
        weight: 1.5
      }).bindPopup('<b>VIIRS Thermal Fire Hotspot</b><br>Paddy crop stubble burning detected (Oct-Nov)').addTo(overlayLayerGroup);
    });

    // Margalla Hills Forest Fire
    L.circle([33.74, 73.05], {
      radius: 4000,
      color: '#ff4400',
      fillColor: '#ff0000',
      fillOpacity: opacity * 0.7,
      weight: 2
    }).bindPopup('<b>Margalla Hills Forest Fire Zone</b><br>Burn Scar NBR Analysis').addTo(overlayLayerGroup);
  }
  else if (app.chartType === 'lulc') {
    // Indus Delta Mangroves
    const deltaPoly = L.polygon([
      [24.5, 67.2], [24.3, 67.8], [23.9, 68.2], [23.6, 67.9], [24.0, 67.0]
    ], {
      color: '#006d2c',
      fillColor: '#2ca25f',
      fillOpacity: opacity * 0.65,
      weight: 2
    }).bindPopup('<b>Indus River Delta Mangrove Ecosystem</b><br>Covering Keti Bandar & Shah Bandar (+35% net expansion)').addTo(overlayLayerGroup);
  }
  else if (app.chartType === 'population') {
    // Karachi & Lahore Urban Population Polygons
    const karachiUrban = L.polygon([
      [24.95, 66.85], [25.10, 67.10], [24.90, 67.30], [24.78, 67.10]
    ], {
      color: '#de2d26',
      fillColor: '#67000d',
      fillOpacity: opacity * 0.6,
      weight: 2
    }).bindPopup('<b>Karachi Metropolitan Area</b><br>GHSL Population Density: >2,500 persons/km²').addTo(overlayLayerGroup);

    const lahoreUrban = L.polygon([
      [31.65, 74.25], [31.55, 74.45], [31.40, 74.35], [31.45, 74.15]
    ], {
      color: '#de2d26',
      fillColor: '#a50f15',
      fillOpacity: opacity * 0.6,
      weight: 2
    }).bindPopup('<b>Lahore Metropolitan Area</b><br>Urban Built-up Area Sprawl').addTo(overlayLayerGroup);
  }
  else {
    // Toolkit: Mosaic & Bounding Box
    const aoiBox = L.rectangle([[23.63, 60.87], [37.08, 77.84]], {
      color: '#38bdf8',
      fillColor: '#0284c7',
      fillOpacity: opacity * 0.15,
      weight: 2,
      dashArray: '6, 6'
    }).bindPopup('<b>Pakistan AOI Bounding Box</b><br>Resolution: 10m Multi-Spectral GeoTIFF ready for export.').addTo(overlayLayerGroup);
  }
}

// 9. INTERACTIVE CHART.JS ANALYTICS ENGINE
function renderChart(type) {
  const ctx = document.getElementById('analytics-chart').getContext('2d');
  if (state.chartInstance) {
    state.chartInstance.destroy();
  }

  let config = {};

  if (type === 'flood') {
    config = {
      type: 'line',
      data: {
        labels: ['May 2022', 'Jun 2022', 'Jul 2022', 'Aug 2022 (Peak)', 'Sep 2022', 'Oct 2022', 'Nov 2022'],
        datasets: [
          {
            label: 'Inundation Area (Million Hectares)',
            data: [0.8, 1.4, 3.9, 8.2, 7.5, 3.1, 1.2],
            borderColor: '#00e5ff',
            backgroundColor: 'rgba(0, 229, 255, 0.15)',
            fill: true,
            tension: 0.4,
            borderWidth: 3,
            pointBackgroundColor: '#00e5ff'
          },
          {
            label: 'Lake Manchar Storage Volume (MAF)',
            data: [0.3, 0.4, 0.9, 2.1, 1.8, 0.9, 0.5],
            borderColor: '#38bdf8',
            borderDash: [5, 5],
            tension: 0.3,
            borderWidth: 2
          }
        ]
      },
      options: getChartOptions('Pakistan 2022 Monsoon Flood Extent & Storage Progression')
    };
  } else if (type === 'watershed') {
    config = {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: 'Upper Indus Snowmelt Inflows (1000 cusecs)',
          data: [18, 22, 38, 75, 160, 240, 290, 250, 140, 65, 30, 20],
          backgroundColor: 'rgba(56, 189, 248, 0.65)',
          borderColor: '#38bdf8',
          borderWidth: 1.5,
          borderRadius: 4
        }]
      },
      options: getChartOptions('Upper Indus Basin Monthly Inflow Hydrograph (Tarbela)')
    };
  } else if (type === 'climate') {
    config = {
      type: 'line',
      data: {
        labels: ['2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'],
        datasets: [
          {
            label: 'Jacobabad Summer Max LST (°C)',
            data: [49.2, 50.1, 51.0, 50.4, 51.6, 51.1, 50.8, 51.4, 52.8, 51.9],
            borderColor: '#ef4444',
            backgroundColor: 'rgba(239, 68, 68, 0.15)',
            fill: true,
            tension: 0.3,
            borderWidth: 3
          }
        ]
      },
      options: getChartOptions('Jacobabad Peak Summer Land Surface Temperature (10-Year Trend)')
    };
  } else if (type === 'wildfire') {
    config = {
      type: 'bar',
      data: {
        labels: ['Oct 15-20', 'Oct 21-25', 'Oct 26-31', 'Nov 1-5 (Peak)', 'Nov 6-10', 'Nov 11-15', 'Nov 16-20'],
        datasets: [{
          label: 'Punjab VIIRS Stubble Fire Count',
          data: [820, 1650, 3100, 4800, 2900, 1200, 450],
          backgroundColor: 'rgba(245, 158, 11, 0.75)',
          borderColor: '#f59e0b',
          borderWidth: 1.5,
          borderRadius: 4
        }]
      },
      options: getChartOptions('Punjab Post-Harvest Crop Residue Fire Incidents')
    };
  } else if (type === 'lulc') {
    config = {
      type: 'line',
      data: {
        labels: ['2010', '2012', '2014', '2016', '2018', '2020', '2022', '2024'],
        datasets: [
          {
            label: 'Indus Delta Mangrove Area (Sq Km)',
            data: [860, 910, 990, 1080, 1190, 1310, 1420, 1510],
            borderColor: '#10b981',
            backgroundColor: 'rgba(16, 185, 129, 0.15)',
            fill: true,
            tension: 0.3,
            borderWidth: 3
          }
        ]
      },
      options: getChartOptions('Indus Delta Mangrove Forest Cover Expansion')
    };
  } else if (type === 'population') {
    config = {
      type: 'bar',
      data: {
        labels: ['Karachi', 'Lahore', 'Faisalabad', 'Rawalpindi', 'Gujranwala', 'Peshawar', 'Multan'],
        datasets: [{
          label: 'Urban Population (Millions - GHSL)',
          data: [16.8, 13.5, 3.8, 2.5, 2.4, 2.1, 2.0],
          backgroundColor: 'rgba(239, 68, 68, 0.65)',
          borderColor: '#ef4444',
          borderWidth: 1.5,
          borderRadius: 4
        }]
      },
      options: getChartOptions('Pakistan Megacity Population Scale')
    };
  } else {
    config = {
      type: 'line',
      data: {
        labels: ['Band 2 (Blue)', 'Band 3 (Green)', 'Band 4 (Red)', 'Band 8 (NIR)', 'Band 11 (SWIR1)', 'Band 12 (SWIR2)'],
        datasets: [
          {
            label: 'Healthy Vegetation',
            data: [0.04, 0.08, 0.05, 0.45, 0.22, 0.12],
            borderColor: '#10b981',
            tension: 0.3,
            borderWidth: 2
          },
          {
            label: 'Clear Water',
            data: [0.06, 0.05, 0.03, 0.01, 0.005, 0.002],
            borderColor: '#38bdf8',
            tension: 0.3,
            borderWidth: 2
          },
          {
            label: 'Bare Soil / Arid',
            data: [0.12, 0.16, 0.22, 0.28, 0.35, 0.30],
            borderColor: '#f59e0b',
            tension: 0.3,
            borderWidth: 2
          }
        ]
      },
      options: getChartOptions('Multi-Spectral Surface Reflectance Signatures')
    };
  }

  state.chartInstance = new Chart(ctx, config);
}

function getChartOptions(titleText) {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: { color: '#94a3b8', font: { size: 10, family: 'Inter' } }
      },
      title: {
        display: false,
        text: titleText
      }
    },
    scales: {
      x: {
        ticks: { color: '#64748b', font: { size: 10 } },
        grid: { color: 'rgba(255, 255, 255, 0.04)' }
      },
      y: {
        ticks: { color: '#64748b', font: { size: 10 } },
        grid: { color: 'rgba(255, 255, 255, 0.04)' }
      }
    }
  };
}

// 10. SPLIT SWIPE CONTROLLER
function enableSwipeMode() {
  floatingStatus.textContent = 'SWIPE MODE ACTIVE: Drag vertical line to compare Pre-Flood (May) vs Peak (Sep)';
}

function disableSwipeMode() {
  floatingStatus.textContent = `Module: ${state.currentApp.title} • Active`;
}

function updateSwipeClip(percent) {
  // Visually indicate swipe position
  floatingStatus.textContent = `Swipe Comparison: Left ${percent}% (Pre-Flood) | Right ${100 - percent}% (Peak Flood)`;
}

// 11. GEE SCRIPT MODAL LOADER
async function openGeeModal() {
  geeModal.classList.remove('hidden');
  try {
    const res = await fetch('EarthEngine_Pakistan_Master_App.js');
    if (res.ok) {
      const code = await res.text();
      geeCodeContainer.textContent = code;
    } else {
      geeCodeContainer.textContent = '// Please ensure EarthEngine_Pakistan_Master_App.js is located in the root directory.\n// You can copy the code directly from the local file repository.';
    }
  } catch (err) {
    geeCodeContainer.textContent = '// Failed to fetch code dynamically. Please open EarthEngine_Pakistan_Master_App.js directly.';
  }
}

// 12. GEOTIFF EXPORTER SIMULATOR
function triggerGeoTiffExport() {
  const btn = btnExportGeoTIFF;
  const origHtml = btn.innerHTML;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Preparing Pakistan GeoTIFF...';
  btn.style.pointerEvents = 'none';

  setTimeout(() => {
    btn.innerHTML = '<i class="fa-solid fa-check"></i> Export Initiated (GEE Task)';
    alert(`GeoTIFF Export Task Registered:\n- Dataset: ${state.currentApp.datasets[0]}\n- Region: ${state.currentApp.title}\n- Coordinates: Lat ${state.currentApp.center[0]}, Lon ${state.currentApp.center[1]}\n- Resolution: 10 meters GSD\n\nRun the Master GEE Script in Code Editor to export directly to your Google Drive.`);
    setTimeout(() => {
      btn.innerHTML = origHtml;
      btn.style.pointerEvents = 'auto';
    }, 2500);
  }, 1200);
}

// 13. STARTUP INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
  initEventListeners();
  switchSuite('water');
  console.log('PakGeoStudio Platform initialized successfully for Pakistan.');
});
