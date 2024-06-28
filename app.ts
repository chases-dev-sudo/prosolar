import * as GeoTIFF from 'geotiff';

interface GeoTiff {
  width: number;
  height: number;
  rasters: Float32Array[];
  bounds: Bounds;
}

interface Bounds {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

async function fetchConfig(): Promise<{ apiKey: string; address: string }> {
  const response = await fetch('/config.json');
  if (!response.ok) {
    throw new Error(`Error fetching config: ${response.statusText}`);
  }
  return response.json();
}

async function fetchGeoTiffFromServer(apiKey: string, address: string): Promise<GeoTiff> {
  const response = await fetch('/api/solar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ apiKey, address })
  });

  if (!response.ok) {
    throw new Error(`Error fetching GeoTIFF data: ${response.statusText}`);
  }

  const data = await response.json();

  // Process the data as needed for your application
  const rasters: Float32Array[] = []; // Replace with actual processing logic to get raster arrays
  const width = 100; // Example value, replace with actual calculation
  const height = 100; // Example value, replace with actual calculation
  const bounds = data.boundingBox; // Example value, replace with actual bounding box data

  return { width, height, rasters, bounds };
}

function renderRGB(rgb: GeoTiff, mask?: GeoTiff): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = mask ? mask.width : rgb.width;
  canvas.height = mask ? mask.height : rgb.height;
  const dw = rgb.width / canvas.width;
  const dh = rgb.height / canvas.height;
  const ctx = canvas.getContext('2d')!;
  const img = ctx.getImageData(0, 0, canvas.width, canvas.height);

  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      const rgbIdx = Math.floor(y * dh) * rgb.width + Math.floor(x * dw);
      const maskIdx = y * canvas.width + x;
      const imgIdx = y * canvas.width * 4 + x * 4;
      img.data[imgIdx + 0] = rgb.rasters[0][rgbIdx];
      img.data[imgIdx + 1] = rgb.rasters[1][rgbIdx];
      img.data[imgIdx + 2] = rgb.rasters[2][rgbIdx];
      img.data[imgIdx + 3] = mask ? mask.rasters[0][maskIdx] * 255 : 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  return canvas;
}

async function displayGeoTiff() {
  const { apiKey, address } = await fetchConfig();
  const geoTiff = await fetchGeoTiffFromServer(apiKey, address);
  const canvas = renderRGB(geoTiff);
  document.getElementById('canvas-container')!.appendChild(canvas);
}

displayGeoTiff();
