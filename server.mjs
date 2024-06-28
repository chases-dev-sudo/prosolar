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

    console.log(`Received apiKey: ${apiKey}, address: ${address}`);

    if (!apiKey || !address) {
      console.log('Missing apiKey or address in the request body');
      return res.status(400).send('Missing apiKey or address in the request body');
    }

    const geocodingResponse = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`);
    const geocodingData = await geocodingResponse.json();

    console.log(`Geocoding response: ${JSON.stringify(geocodingData)}`);

    if (!geocodingData.results || geocodingData.results.length === 0) {
      console.log('Address not found');
      return res.status(404).send('Address not found');
    }

    const location = geocodingData.results[0].geometry.location;
    const latitude = location.lat;
    const longitude = location.lng;

    const solarApiUrl = `https://solar.googleapis.com/v1/buildingInsights:findClosest?location.latitude=${latitude}&location.longitude=${longitude}&requiredQuality=HIGH&key=${apiKey}`;
    const solarResponse = await fetch(solarApiUrl, {
      headers: {
        'Accept': 'application/json'
      },
      compress: true
    });

    console.log(`Solar API response status: ${solarResponse.status}`);
    const solarResponseText = await solarResponse.text();
    console.log(`Solar API response text: ${solarResponseText}`);

    if (!solarResponse.ok) {
      console.log(`Error fetching solar data: ${solarResponse.statusText}`);
      return res.status(solarResponse.status).send(`Error fetching solar data: ${solarResponse.statusText}`);
    }

    const solarData = JSON.parse(solarResponseText);

    console.log(`Solar data: ${JSON.stringify(solarData)}`);

    res.json(solarData);

  } catch (error) {
    console.error(`Error: ${error}`);
    res.status(500).send(`Internal Server Error: ${error.message}`);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

