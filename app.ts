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

interface SolarData {
  coordinates: { latitude: number; longitude: number };
  solarData: any; // Define according to the structure of solarData you receive
  imageUrl: string;
}

async function fetchConfig(): Promise<{ apiKey: string; address: string }> {
  const response = await fetch('/config.json');
  if (!response.ok) {
    throw new Error(`Error fetching config: ${response.statusText}`);
  }
  return response.json();
}

async function fetchSolarData(apiKey: string, address: string): Promise<SolarData> {
  const response = await fetch('/api/solar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ apiKey, address })
  });

  if (!response.ok) {
    throw new Error(`Error fetching solar data: ${response.statusText}`);
  }

  return response.json();
}

function renderSolarImage(imageUrl: string): HTMLImageElement {
  const image = new Image();
  image.src = imageUrl;
  image.alt = "Solar Panel Configuration";
  return image;
}

async function displaySolarData() {
  const { apiKey, address } = await fetchConfig();
  const { imageUrl, solarData } = await fetchSolarData(apiKey, address);

  const container = document.getElementById('canvas-container');
  if (container) {
    // Display the solar panel image
    const image = renderSolarImage(imageUrl);
    container.appendChild(image);

    // Optionally, display other solar data information
    const solarInfo = document.createElement('pre');
    solarInfo.textContent = JSON.stringify(solarData, null, 2);
    container.appendChild(solarInfo);
  }
}

displaySolarData();
