import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/api/solar', async (req, res) => {
  const { apiKey, address } = req.body;

  if (!apiKey || !address) {
    return res.status(400).json({ error: 'API key and address are required.' });
  }

  try {
    // Use the provided apiKey and address to fetch data
    const geocodingResponse = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`);
    const geocodingData = await geocodingResponse.json();

    if (!geocodingData.results || geocodingData.results.length === 0) {
      return res.status(404).json({ error: 'Address not found.' });
    }

    const location = geocodingData.results[0].geometry.location;
    const latitude = location.lat;
    const longitude = location.lng;

    const solarApiUrl = `https://solar.googleapis.com/v1/buildingInsights:findClosest?location.latitude=${latitude}&location.longitude=${longitude}&requiredQuality=HIGH&key=${apiKey}`;
    const solarResponse = await fetch(solarApiUrl);
    const solarData = await solarResponse.json();

    if (!solarResponse.ok) {
      return res.status(solarResponse.status).json({ error: solarData.error.message });
    }

    return res.json(solarData);
  } catch (error) {
    console.error('Error fetching data:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

