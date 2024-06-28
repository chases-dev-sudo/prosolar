interface ApiResponse {
  name: string;
  center: { latitude: number; longitude: number };
  imageryDate: { year: number; month: number; day: number };
  postalCode: string;
  administrativeArea: string;
  statisticalArea: string;
  regionCode: string;
  solarPotential: {
    maxArrayPanelsCount: number;
    maxArrayAreaMeters2: number;
    maxSunshineHoursPerYear: number;
    carbonOffsetFactorKgPerMwh: number;
    wholeRoofStats: {
      areaMeters2: number;
      sunshineQuantiles: number[];
      groundAreaMeters2: number;
    };
    roofSegmentStats: {
      pitchDegrees: number;
      azimuthDegrees: number;
      stats: {
        areaMeters2: number;
        sunshineQuantiles: number[];
        groundAreaMeters2: number;
      };
      center: { latitude: number; longitude: number };
      boundingBox: {
        sw: { latitude: number; longitude: number };
        ne: { latitude: number; longitude: number };
      };
      planeHeightAtCenterMeters: number;
    }[];
    solarPanelConfigs: SolarPanelConfig[];
  };
}

async function fetchGeoTiffFromServer(apiKey: string, address: string): Promise<ApiResponse> {
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

  const data: ApiResponse = await response.json();
  return data;
}

function generateSummary(data: ApiResponse): string {
  const summary = `
    Location: ${data.name}, ${data.administrativeArea}, ${data.postalCode}, ${data.regionCode}
    Imagery Date: ${data.imageryDate.year}-${data.imageryDate.month}-${data.imageryDate.day}
    Maximum Array Panels Count: ${data.solarPotential.maxArrayPanelsCount}
    Maximum Array Area (m²): ${data.solarPotential.maxArrayAreaMeters2}
    Maximum Sunshine Hours Per Year: ${data.solarPotential.maxSunshineHoursPerYear}
    Carbon Offset Factor (kg per MWh): ${data.solarPotential.carbonOffsetFactorKgPerMwh}
    Roof Area (m²): ${data.solarPotential.wholeRoofStats.areaMeters2}
    Ground Area (m²): ${data.solarPotential.wholeRoofStats.groundAreaMeters2}
  `;
  return summary;
}

function displaySolarInfo(data: ApiResponse) {
  const container = document.getElementById('canvas-container')!;
  container.innerHTML = '';

  const summary = generateSummary(data);
  const summaryElement = document.createElement('pre');
  summaryElement.textContent = summary;
  container.appendChild(summaryElement);

  const imageUrl = createImageUrl(data); // Function to create the image URL
  const linkElement = document.createElement('a');
  linkElement.href = imageUrl;
  linkElement.textContent = 'View Solar Panel Configuration Image';
  linkElement.target = '_blank';
  container.appendChild(linkElement);
}

function createImageUrl(data: ApiResponse): string {
  // Process the GeoTIFF data and generate the image URL
  // For demonstration purposes, this function will return a dummy URL
  // In a real application, you would generate the image URL based on the data

  return 'https://dummyimage.com/600x400/000/fff';
}

async function handleFormSubmit(event: Event) {
  event.preventDefault();
  const apiKey = (document.getElementById('api-key') as HTMLInputElement).value;
  const address = (document.getElementById('address') as HTMLInputElement).value;

  try {
    const geoTiff = await fetchGeoTiffFromServer(apiKey, address);
    displaySolarInfo(geoTiff);
  } catch (error) {
    console.error('Error fetching GeoTIFF data:', error);
  }
}

document.getElementById('solar-form')!.addEventListener('submit', handleFormSubmit);
