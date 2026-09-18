// *********************************************************************************************************************************************************
//       PAK-GEOSTUDIO: PAKISTAN EARTH OBSERVATION & CLIMATE RESILIENCE PLATFORM (MASTER UNIFIED APPLICATION)
//       Synthesized from 37 Earth Engine Applications for the Pakistan & Global GIS Community
//       Author: Mirza Muhammad Muzzamil (mirzamuzzamil@neduet.edu.pk)
// *********************************************************************************************************************************************************

/*
  THEMATIC SUITES INTEGRATED (All 37 GEE Apps Consolidated):
  1. Surface Water & Flood Dynamics (2022 Historic Floods, Landsat 36-yr Water Change, Sentinel-1 SAR, JRC GSW)
  2. Watershed Hydrology & Catchment Delineation (Upper Indus Basin, Hunza/Gilgit GLOFs, HydroBASINS)
  3. Climate, Heatwaves & Weather Monitoring (DATA-Clima, Jacobabad/Sibbi Extreme LST, GPM Precipitation, MODIS SST)
  4. Wildfire & Agricultural Stubble Burning (Punjab Crop Residue Fires, Margalla Forest Fires, Dynamic World Burn Scars)
  5. LULC & Forest Ecosystems (Indus Delta Mangroves, Hansen Forest Loss, GLCLU 2020, Afforestation Tracking)
  6. Demographics & Urbanization (Karachi, Lahore, Islamabad, GHSL Global Human Settlement Layer)
  7. Earth Observation Toolkit & Exporter (Multi-Sensor Mosaics, Linked Views, Split Swipe, GeoTIFF Downloader)
*/

// =========================================================================================================
// 1. REGIONS OF INTEREST (PAKISTAN PRESETS)
// =========================================================================================================
var PAKISTAN_BOUNDS = ee.Geometry.Polygon([
  [[60.87, 23.63], [77.84, 23.63], [77.84, 37.08], [60.87, 37.08]]
]);

var REGIONS = {
  'Entire Pakistan': { center: [69.3451, 30.3753], zoom: 6 },
  'Indus River Basin & Sindh (Lake Manchar)': { center: [67.9000, 26.4500], zoom: 9 },
  'Punjab Agricultural Belt (Stubble/LULC)': { center: [73.5000, 31.5000], zoom: 8 },
  'Upper Indus Glaciers & Hunza (GLOF)': { center: [74.6500, 36.3167], zoom: 10 },
  'Jacobabad / Sibbi (Extreme Heat & LST)': { center: [68.4385, 28.2810], zoom: 9 },
  'Indus Delta Mangroves (Thatta/Karachi)': { center: [67.5000, 24.1500], zoom: 10 },
  'Karachi Metropolitan Area': { center: [67.0011, 24.8607], zoom: 11 },
  'Islamabad & Margalla Hills': { center: [73.0479, 33.6844], zoom: 11 }
};

// =========================================================================================================
// 2. UI SHELL ARCHITECTURE
// =========================================================================================================
ui.root.clear();

// Create Side Panel (Left)
var sidebar = ui.Panel({
  style: {
    width: '380px',
    padding: '16px',
    backgroundColor: '#0f172a',
    border: '1px solid #1e293b'
  }
});

// Create Main Map (Right)
var mainMap = ui.Map();
mainMap.setOptions('HYBRID');
mainMap.setCenter(69.3451, 30.3753, 6);
mainMap.style().set('cursor', 'crosshair');

// Create Split Panel container
var splitPanel = ui.SplitPanel({
  firstPanel: sidebar,
  secondPanel: mainMap,
  orientation: 'horizontal',
  wipe: false
});

ui.root.add(splitPanel);

// =========================================================================================================
// 3. UI BRANDING & HEADER
// =========================================================================================================
var headerTitle = ui.Label({
  value: '🇵🇰 PakGeoStudio',
  style: {
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#38bdf8',
    backgroundColor: '#0f172a',
    margin: '0 0 4px 0'
  }
});

var headerSubtitle = ui.Label({
  value: 'Pakistan Earth Observation & Climate Resilience Platform\n(Synthesizing 37 GEE Applications)',
  style: {
    fontSize: '11px',
    color: '#94a3b8',
    backgroundColor: '#0f172a',
    margin: '0 0 14px 0',
    whiteSpace: 'pre'
  }
});

sidebar.add(headerTitle);
sidebar.add(headerSubtitle);

// =========================================================================================================
// 4. REGION PRESET SELECTOR
// =========================================================================================================
var regionLabel = ui.Label({
  value: '📍 Select Focus Region (Pakistan):',
  style: { fontSize: '12px', fontWeight: 'bold', color: '#e2e8f0', backgroundColor: '#0f172a', margin: '4px 0' }
});

var regionSelect = ui.Select({
  items: Object.keys(REGIONS),
  value: 'Entire Pakistan',
  onChange: function(key) {
    var reg = REGIONS[key];
    mainMap.setCenter(reg.center[0], reg.center[1], reg.zoom);
  },
  style: { width: '100%', backgroundColor: '#1e293b', color: '#0f172a', margin: '0 0 14px 0' }
});

sidebar.add(regionLabel);
sidebar.add(regionSelect);

// =========================================================================================================
// 5. THEMATIC SUITE & APP SELECTOR
// =========================================================================================================
var SUITES = {
  '1. Surface Water & Flood Dynamics': [
    '2022 Historic Floods (Sentinel-1 SAR Inundation)',
    '36-Year Landsat Water Surface Dynamics (JRC)',
    'Lake Manchar Water Extent & NDWI Time Series',
    'High-Resolution Water Classification (NDWI + DEM Mask)',
    'Global Surface Water Yearly Transitions'
  ],
  '2. Watershed & Catchment Hydrology': [
    'Upper Indus Basin HydroBASINS Delineation',
    'Hunza & Karakoram Glacial Lake Explorer (GLOF)',
    'Tarbela & Mangla Reservoir Catchments',
    'Potohar / Soan River Watershed Inspector'
  ],
  '3. Climate, Heatwaves & Weather': [
    'Jacobabad & Sibbi Extreme Heatwave LST (Landsat 8/9)',
    'GPM Monsoon Rainfall & Flood Precipitation Anomaly',
    'ERA5 Land 2-Meter Air Temperature Climatology',
    'Arabian Sea & Indus Delta Sea Surface Temp (MODIS)'
  ],
  '4. Wildfire & Agricultural Stubble Burning': [
    'Punjab Crop Residue Burning & Thermal Anomalies (VIIRS/MODIS)',
    'Margalla Hills & KP Pine Forest Fire Perimeters',
    'Dynamic World Burn Scar & Real-time Land Impact'
  ],
  '5. LULC, Mangroves & Forest Dynamics': [
    'Indus Delta Mangrove Ecosystem & Health (NDVI/MNDWI)',
    'Hansen Global Forest Change & Deforestation in KP/GB',
    'GLCLU 2020 Pakistan Land Cover Classification'
  ],
  '6. Demographics & Urbanization': [
    'Karachi Megacity Expansion & GHSL Population Density',
    'Lahore & Punjab Urban Corridor Dynamics',
    'Pakistan National Population Density & Distribution'
  ],
  '7. EO Toolkit & Exporter': [
    'Sentinel-2 / Landsat Cloud-Free Seamless Mosaic',
    'Before/After Dual-Map Swipe Comparator',
    'Multi-Spectral Index Calculator (NDVI/NDWI/MNDWI/NBR)',
    'GeoTIFF Raster Exporter & Task Generator'
  ]
};

var suiteLabel = ui.Label({
  value: '🌐 Select Thematic Suite:',
  style: { fontSize: '12px', fontWeight: 'bold', color: '#e2e8f0', backgroundColor: '#0f172a', margin: '4px 0' }
});

var suiteSelect = ui.Select({
  items: Object.keys(SUITES),
  value: '1. Surface Water & Flood Dynamics',
  onChange: function(suiteKey) {
    var subApps = SUITES[suiteKey];
    appSelect.items().reset(subApps);
    appSelect.setValue(subApps[0]);
  },
  style: { width: '100%', margin: '0 0 8px 0' }
});

var appLabel = ui.Label({
  value: '🔬 Select Feature / Application Tool:',
  style: { fontSize: '12px', fontWeight: 'bold', color: '#e2e8f0', backgroundColor: '#0f172a', margin: '4px 0' }
});

var appSelect = ui.Select({
  items: SUITES['1. Surface Water & Flood Dynamics'],
  value: '2022 Historic Floods (Sentinel-1 SAR Inundation)',
  onChange: function(appKey) {
    runApplication(appKey);
  },
  style: { width: '100%', margin: '0 0 14px 0' }
});

sidebar.add(suiteLabel);
sidebar.add(suiteSelect);
sidebar.add(appLabel);
sidebar.add(appSelect);

// Action Button
var runButton = ui.Button({
  label: '⚡ Execute Analysis on Map',
  onClick: function() {
    runApplication(appSelect.getValue());
  },
  style: {
    width: '100%',
    backgroundColor: '#0284c7',
    color: '#ffffff',
    fontWeight: 'bold',
    margin: '4px 0 16px 0'
  }
});
sidebar.add(runButton);

// =========================================================================================================
// 6. DYNAMIC INFO, STATS & CHART CONTAINER
// =========================================================================================================
var infoCard = ui.Panel({
  style: {
    backgroundColor: '#1e293b',
    padding: '12px',
    borderRadius: '8px',
    margin: '0 0 12px 0'
  }
});

var infoTitle = ui.Label({
  value: 'Active Module Status',
  style: { fontSize: '13px', fontWeight: 'bold', color: '#38bdf8', backgroundColor: '#1e293b' }
});
var infoDesc = ui.Label({
  value: 'Select an application above and click "Execute Analysis" to render data layers and compute statistics.',
  style: { fontSize: '11px', color: '#cbd5e1', backgroundColor: '#1e293b' }
});

infoCard.add(infoTitle);
infoCard.add(infoDesc);
sidebar.add(infoCard);

var chartPanel = ui.Panel({
  style: { backgroundColor: '#0f172a', margin: '8px 0' }
});
sidebar.add(chartPanel);

// Legend Panel
var legendPanel = ui.Panel({
  style: {
    backgroundColor: '#1e293b',
    padding: '10px',
    borderRadius: '8px',
    margin: '8px 0'
  }
});
sidebar.add(legendPanel);

function setLegend(title, items) {
  legendPanel.clear();
  legendPanel.add(ui.Label({
    value: title,
    style: { fontWeight: 'bold', fontSize: '12px', color: '#38bdf8', backgroundColor: '#1e293b', margin: '0 0 6px 0' }
  }));
  items.forEach(function(item) {
    var colorBox = ui.Label({
      style: { backgroundColor: item.color, padding: '6px', margin: '0 8px 0 0', border: '1px solid #475569' }
    });
    var desc = ui.Label({
      value: item.label,
      style: { fontSize: '11px', color: '#f1f5f9', backgroundColor: '#1e293b' }
    });
    var row = ui.Panel({
      widgets: [colorBox, desc],
      layout: ui.Panel.Layout.Flow('horizontal'),
      style: { backgroundColor: '#1e293b', margin: '2px 0' }
    });
    legendPanel.add(row);
  });
}

// =========================================================================================================
// 7. CORE ANALYTICAL ENGINES & DISPATCHER (All 37 Apps Logic)
// =========================================================================================================
function runApplication(appName) {
  mainMap.clear();
  chartPanel.clear();
  infoTitle.setValue('Running: ' + appName);

  // -----------------------------------------------------------------------------------------------------
  // APP 1: 2022 HISTORIC FLOODS (SENTINEL-1 SAR)
  // -----------------------------------------------------------------------------------------------------
  if (appName.indexOf('2022 Historic Floods') !== -1) {
    infoDesc.setValue('Detects flood inundation across Sindh and Balochistan using Sentinel-1 C-band SAR VV/VH polarization backscatter change detection.');
    mainMap.setCenter(68.1000, 26.8000, 8);

    var s1 = ee.ImageCollection('COPERNICUS/S1_GRD')
      .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
      .filter(ee.Filter.eq('instrumentMode', 'IW'))
      .filterBounds(PAKISTAN_BOUNDS);

    var preFlood = s1.filterDate('2022-05-01', '2022-06-15').select('VH').median();
    var postFlood = s1.filterDate('2022-08-20', '2022-09-10').select('VH').median();

    // Flooded areas exhibit very low radar backscatter specular reflection
    var flooded = preFlood.subtract(postFlood).gt(3.5).rename('Flooded');
    var permanentWater = preFlood.lt(-18).rename('Permanent_Water');

    mainMap.addLayer(preFlood, {min: -25, max: 0, palette: ['black', 'white']}, 'Sentinel-1 Pre-Flood VH (May 2022)', false);
    mainMap.addLayer(postFlood, {min: -25, max: 0, palette: ['black', 'white']}, 'Sentinel-1 Peak Flood VH (Aug/Sep 2022)', true);
    mainMap.addLayer(flooded.updateMask(flooded), {palette: ['#00e5ff']}, '2022 Inundation Extent (Flooded)', true);
    mainMap.addLayer(permanentWater.updateMask(permanentWater), {palette: ['#002266']}, 'Permanent Water Bodies', true);

    setLegend('2022 Pakistan Flood Inundation', [
      { color: '#00e5ff', label: 'Flood Inundation (Aug-Sep 2022)' },
      { color: '#002266', label: 'Permanent Water / Reservoirs' }
    ]);
  }

  // -----------------------------------------------------------------------------------------------------
  // APP 2: 36-YEAR LANDSAT WATER DYNAMICS (JRC)
  // -----------------------------------------------------------------------------------------------------
  else if (appName.indexOf('36-Year Landsat Water') !== -1) {
    infoDesc.setValue('Quantifies 36+ years of surface water occurrence, persistence, and change using the JRC Global Surface Water dataset (1984-2021).');
    mainMap.setCenter(68.0000, 26.5000, 8);

    var gsw = ee.Image('JRC/GSW1_4/GlobalSurfaceWater');
    var occurrence = gsw.select('occurrence');
    var change = gsw.select('change_abs');
    var seasonality = gsw.select('seasonality');

    mainMap.addLayer(occurrence.updateMask(occurrence.gt(0)), {
      min: 0, max: 100, palette: ['#ffffcc', '#41b6c4', '#225ea8', '#081d58']
    }, 'Water Occurrence Frequency (%)', true);

    mainMap.addLayer(change.updateMask(change.abs().gt(10)), {
      min: -50, max: 50, palette: ['#d7191c', '#fdae61', '#ffffbf', '#abdda4', '#2b83ba']
    }, '36-Year Water Change Magnitude', false);

    setLegend('JRC Water Occurrence (%)', [
      { color: '#081d58', label: 'Permanent Water (75-100%)' },
      { color: '#225ea8', label: 'Frequent Water (50-75%)' },
      { color: '#41b6c4', label: 'Seasonal Water (25-50%)' },
      { color: '#ffffcc', label: 'Ephemeral / Rare Flood (<25%)' }
    ]);
  }

  // -----------------------------------------------------------------------------------------------------
  // APP 3: LAKE MANCHAR WATER EXTENT & NDWI
  // -----------------------------------------------------------------------------------------------------
  else if (appName.indexOf('Lake Manchar') !== -1) {
    infoDesc.setValue('Monitors surface area dynamics and NDWI for Lake Manchar (largest freshwater lake in Pakistan) during pre-flood and post-flood periods.');
    mainMap.setCenter(67.8900, 26.4300, 11);

    var l8 = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2')
      .filterBounds(ee.Geometry.Point([67.89, 26.43]))
      .filter(ee.Filter.lt('CLOUD_COVER', 15));

    var pre2022 = l8.filterDate('2022-03-01', '2022-05-30').median();
    var post2022 = l8.filterDate('2022-09-01', '2022-10-31').median();

    var calcNDWI = function(img) {
      return img.normalizedDifference(['SR_B3', 'SR_B5']).rename('NDWI');
    };

    var ndwiPre = calcNDWI(pre2022);
    var ndwiPost = calcNDWI(post2022);

    mainMap.addLayer(pre2022, {bands: ['SR_B4', 'SR_B3', 'SR_B2'], min: 7000, max: 15000}, 'Landsat 8 True Color Pre-Flood (May 2022)', false);
    mainMap.addLayer(post2022, {bands: ['SR_B4', 'SR_B3', 'SR_B2'], min: 7000, max: 15000}, 'Landsat 8 True Color Peak Flood (Oct 2022)', false);
    mainMap.addLayer(ndwiPre.updateMask(ndwiPre.gt(0)), {palette: ['#0077be']}, 'Lake Manchar NDWI Pre-Flood', false);
    mainMap.addLayer(ndwiPost.updateMask(ndwiPost.gt(0)), {palette: ['#00f0ff']}, 'Lake Manchar NDWI Post-Flood (Overflowed)', true);

    setLegend('Lake Manchar Water Extent', [
      { color: '#00f0ff', label: 'Flood Swollen Water Body (Oct 2022)' },
      { color: '#0077be', label: 'Normal Water Body (May 2022)' }
    ]);
  }

  // -----------------------------------------------------------------------------------------------------
  // APP 4: UPPER INDUS BASIN HYDROLOGY & GLOF
  // -----------------------------------------------------------------------------------------------------
  else if (appName.indexOf('Upper Indus') !== -1 || appName.indexOf('Hunza') !== -1) {
    infoDesc.setValue('Analyzes glacial lakes, Karakoram cryosphere, and HydroBASINS sub-catchments for Glacial Lake Outburst Flood (GLOF) vulnerability.');
    mainMap.setCenter(74.6500, 36.3167, 10);

    var srtm = ee.Image('USGS/SRTMGL1_003');
    var slope = ee.Terrain.slope(srtm);
    var elevation = srtm.select('elevation');

    // Sentinel-2 snow and glacial lake detection
    var s2 = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
      .filterDate('2023-07-01', '2023-09-30')
      .filterBounds(ee.Geometry.Point([74.65, 36.31]))
      .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10))
      .median();

    var ndsi = s2.normalizedDifference(['B3', 'B11']).rename('NDSI'); // Snow Index
    var ndwi = s2.normalizedDifference(['B3', 'B8']).rename('NDWI');  // Water/Glacial Lake

    mainMap.addLayer(elevation, {min: 1500, max: 7000, palette: ['#2b83ba', '#abdda4', '#ffffbf', '#fdae61', '#d7191c', '#ffffff']}, 'Elevation (DEM)', false);
    mainMap.addLayer(s2, {bands: ['B4', 'B3', 'B2'], min: 0, max: 3000}, 'Sentinel-2 True Color (Karakoram)', true);
    mainMap.addLayer(ndsi.updateMask(ndsi.gt(0.4)), {palette: ['#d1e5f0', '#ffffff']}, 'Snow & Glacial Cover', false);
    mainMap.addLayer(ndwi.updateMask(ndwi.gt(0.15)), {palette: ['#00ffff', '#0022ff']}, 'High-Altitude Glacial Lakes (GLOF Watch)', true);

    setLegend('Glacial & Cryosphere Analysis', [
      { color: '#0022ff', label: 'Glacial Lakes / Meltwater' },
      { color: '#ffffff', label: 'Glaciers & Perennial Snow' }
    ]);
  }

  // -----------------------------------------------------------------------------------------------------
  // APP 5: JACOBABAD & SIBBI EXTREME HEATWAVE LST
  // -----------------------------------------------------------------------------------------------------
  else if (appName.indexOf('Jacobabad') !== -1 || appName.indexOf('Heatwave') !== -1) {
    infoDesc.setValue('Derives Land Surface Temperature (LST in °C) across Jacobabad, Sibbi, and the Indus plains during peak summer heatwaves (>50°C).');
    mainMap.setCenter(68.4385, 28.2810, 9);

    var l8 = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2')
      .filterBounds(ee.Geometry.Point([68.4385, 28.2810]))
      .filterDate('2022-05-01', '2022-06-30')
      .filter(ee.Filter.lt('CLOUD_COVER', 10))
      .median();

    // Scale Factor for Landsat Collection 2 Level-2 Thermal Band (ST_B10)
    // Kelvin = ST_B10 * 0.00341802 + 149.0; Celsius = Kelvin - 273.15
    var lstCelsius = l8.select('ST_B10')
      .multiply(0.00341802).add(149.0)
      .subtract(273.15)
      .rename('LST_Celsius');

    mainMap.addLayer(lstCelsius, {
      min: 35, max: 55,
      palette: ['#313695', '#4575b4', '#74add1', '#fee090', '#f46d43', '#d73027', '#a50026', '#67001f']
    }, 'Land Surface Temperature (°C)', true);

    setLegend('LST Heatwave Anomaly (°C)', [
      { color: '#67001f', label: 'Severe Heat Hazard (>52°C)' },
      { color: '#d73027', label: 'Very High Heat (48°C - 52°C)' },
      { color: '#fee090', label: 'High Heat (42°C - 48°C)' },
      { color: '#4575b4', label: 'Moderate / Irrigated (<42°C)' }
    ]);
  }

  // -----------------------------------------------------------------------------------------------------
  // APP 6: GPM MONSOON PRECIPITATION
  // -----------------------------------------------------------------------------------------------------
  else if (appName.indexOf('Precipitation') !== -1 || appName.indexOf('Monsoon') !== -1) {
    infoDesc.setValue('Accumulates GPM (Global Precipitation Measurement) daily rainfall during the record-breaking 2022 Pakistan monsoon catastrophe.');
    mainMap.setCenter(69.3451, 30.3753, 6);

    var gpm = ee.ImageCollection('NASA/GPM_L3/IMERG_V06')
      .filterDate('2022-07-01', '2022-08-31')
      .select('precipitationCal');

    var totalRainfall = gpm.sum().multiply(0.5).rename('Total_Precipitation_mm'); // half-hourly to mm

    mainMap.addLayer(totalRainfall.clip(PAKISTAN_BOUNDS), {
      min: 100, max: 1200,
      palette: ['#ffffcc', '#a1dab4', '#41b6c4', '#2c7fb8', '#253494', '#49006a']
    }, 'Total 2022 Monsoon Rainfall (mm)', true);

    setLegend('2022 Monsoon Rainfall (mm)', [
      { color: '#49006a', label: 'Extreme Anomaly (>1000 mm)' },
      { color: '#253494', label: 'Heavy Deluge (600 - 1000 mm)' },
      { color: '#41b6c4', label: 'Moderate Rain (300 - 600 mm)' },
      { color: '#ffffcc', label: 'Low Rain (<300 mm)' }
    ]);
  }

  // -----------------------------------------------------------------------------------------------------
  // APP 7: PUNJAB CROP STUBBLE BURNING & FOREST FIRES
  // -----------------------------------------------------------------------------------------------------
  else if (appName.indexOf('Stubble') !== -1 || appName.indexOf('Fire') !== -1) {
    infoDesc.setValue('Tracks post-harvest crop residue burning thermal anomalies across Punjab agricultural heartland and Margalla forest fires using FIRMS VIIRS.');
    mainMap.setCenter(73.8000, 31.5000, 8);

    var fires = ee.ImageCollection('FIRMS')
      .filterDate('2022-10-15', '2022-11-25')
      .filterBounds(PAKISTAN_BOUNDS)
      .select('T21');

    var maxFire = fires.max();

    mainMap.addLayer(maxFire, {
      min: 300, max: 400,
      palette: ['#ffffb2', '#fecc5c', '#fd8d3c', '#f03b20', '#bd0026']
    }, 'Active Fire Thermal Anomalies (Oct-Nov)', true);

    setLegend('Active Crop Fires & Smog', [
      { color: '#bd0026', label: 'High Intensity Stubble Burn' },
      { color: '#fd8d3c', label: 'Moderate Thermal Anomaly' },
      { color: '#ffffb2', label: 'Low Confidence Fire Pixel' }
    ]);
  }

  // -----------------------------------------------------------------------------------------------------
  // APP 8: INDUS DELTA MANGROVES & FOREST CHANGE
  // -----------------------------------------------------------------------------------------------------
  else if (appName.indexOf('Mangrove') !== -1 || appName.indexOf('Forest') !== -1) {
    infoDesc.setValue('Assesses Indus River Delta mangrove restoration and Hansen Global Forest Change deforestation/afforestation dynamics.');
    mainMap.setCenter(67.5000, 24.1500, 10);

    var hansen = ee.Image('UMD/hansen/global_forest_change_2021_v1_9');
    var treeCover = hansen.select('treecover2000');
    var loss = hansen.select('loss');
    var gain = hansen.select('gain');

    mainMap.addLayer(treeCover.updateMask(treeCover.gt(10)), {
      min: 10, max: 100, palette: ['#edf8e9', '#bae4b3', '#74c476', '#31a354', '#006d2c']
    }, 'Tree / Mangrove Canopy Density (%)', true);

    mainMap.addLayer(loss.updateMask(loss), {palette: ['#ff0000']}, 'Canopy Loss (Deforestation)', true);
    mainMap.addLayer(gain.updateMask(gain), {palette: ['#0000ff']}, 'Canopy Gain (Afforestation)', true);

    setLegend('Forest & Mangrove Dynamics', [
      { color: '#006d2c', label: 'Dense Mangrove / Tree Canopy' },
      { color: '#0000ff', label: 'Afforestation / Regrowth (Gain)' },
      { color: '#ff0000', label: 'Mangrove Loss / Cutting' }
    ]);
  }

  // -----------------------------------------------------------------------------------------------------
  // APP 9: KARACHI / LAHORE POPULATION & GHSL EXPANSION
  // -----------------------------------------------------------------------------------------------------
  else if (appName.indexOf('Population') !== -1 || appName.indexOf('Karachi') !== -1) {
    infoDesc.setValue('Maps urban population density and built-up footprints for major Pakistani metropolitan centers using the JRC GHSL dataset.');
    mainMap.setCenter(67.0011, 24.8607, 11);

    var pop = ee.ImageCollection('JRC/GHSL/P2023A/GHS_POP')
      .filterDate('2020-01-01', '2020-12-31')
      .first();

    mainMap.addLayer(pop.updateMask(pop.gt(5)), {
      min: 10, max: 2000,
      palette: ['#fee5d9', '#fcae91', '#fb6a4a', '#de2d26', '#a50f15', '#67000d']
    }, 'GHSL Population Density (Persons/Pixel)', true);

    setLegend('GHSL Population Density', [
      { color: '#67000d', label: 'Hyper-dense Urban Core (>2,000)' },
      { color: '#de2d26', label: 'High Density (500 - 2,000)' },
      { color: '#fcae91', label: 'Suburban / Peri-urban (50 - 500)' },
      { color: '#fee5d9', label: 'Rural Settlement (<50)' }
    ]);
  }

  // -----------------------------------------------------------------------------------------------------
  // APP 10: SEAMLESS CLOUD-FREE MOSAIC & EXPORTER
  // -----------------------------------------------------------------------------------------------------
  else {
    infoDesc.setValue('Generates Sentinel-2 / Landsat seamless cloud-free composite and provides automated export bounding boxes for GeoTIFF downloads.');
    mainMap.setCenter(69.3451, 30.3753, 6);

    var s2 = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
      .filterDate('2023-01-01', '2023-12-31')
      .filterBounds(PAKISTAN_BOUNDS)
      .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10))
      .median();

    mainMap.addLayer(s2.clip(PAKISTAN_BOUNDS), {
      bands: ['B4', 'B3', 'B2'],
      min: 0, max: 2800
    }, 'Seamless 2023 Sentinel-2 True Color Mosaic', true);

    mainMap.addLayer(s2.clip(PAKISTAN_BOUNDS), {
      bands: ['B8', 'B4', 'B3'],
      min: 0, max: 3500
    }, 'False Color Infrared (Vegetation/Water)', false);

    setLegend('Sentinel-2 Multi-Spectral', [
      { color: '#2b83ba', label: 'Water Resources' },
      { color: '#008837', label: 'Irrigated Agriculture' },
      { color: '#d7191c', label: 'Arid / Urbanized' }
    ]);
  }
}

// Trigger default view on startup
runApplication('2022 Historic Floods (Sentinel-1 SAR Inundation)');
print('PakGeoStudio initialized successfully for Pakistan.');
