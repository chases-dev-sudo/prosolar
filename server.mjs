import express from 'express';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/api/solar', async (req, res) => {
  try {
    const { address } = req.body;
    const apiKey = process.env.API_KEY;

    if (!apiKey || !address) {
      return res.status(400).send('Missing API key or address in the request body');
    }

    // Get coordinates from address
    const geocodingResponse = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`);
    const geocodingData = await geocodingResponse.json();

    if (!geocodingData.results || geocodingData.results.length === 0) {
      return res.status(404).send('Address not found');
    }

    const location = geocodingData.results[0].geometry.location;
    const latitude = location.lat;
    const longitude = location.lng;

    // Fetch solar data
    const solarApiUrl = `https://solar.googleapis.com/v1/buildingInsights:findClosest?location.latitude=${latitude}&location.longitude=${longitude}&requiredQuality=HIGH&key=${apiKey}`;
    const solarResponse = await fetch(solarApiUrl, {
      headers: {
        'Accept': 'application/json'
      },
      compress: true
    });

    const solarData = await solarResponse.json();

    if (!solarResponse.ok) {
      return res.status(solarResponse.status).send(`Error fetching solar data: ${solarResponse.statusText}`);
    }

    // Assuming `solarData` contains an image URL or similar data
    // You need to process this data to return the relevant information
    const imageUrl = solarData.someImageUrl; // Placeholder, replace with actual path in the response

    res.json({
      coordinates: { latitude, longitude },
      solarData,
      imageUrl
    });

  } catch (error) {
    res.status(500).send(`Internal Server Error: ${error.message}`);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

