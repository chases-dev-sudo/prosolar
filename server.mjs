import express from 'express';
import fetch from 'node-fetch';
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/api/solar', async (req, res) => {
    try {
        const { apiKey, address } = req.body;
        if (!apiKey || !address) {
            return res.status(400).send('Missing apiKey or address');
        }

        // Geocoding API call to get coordinates
        const geocodingResponse = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`);
        const geocodingData = await geocodingResponse.json();

        if (!geocodingData.results || geocodingData.results.length === 0) {
            return res.status(404).send('Address not found');
        }

        const location = geocodingData.results[0].geometry.location;
        const latitude = location.lat;
        const longitude = location.lng;

        // Solar API call
        const solarApiUrl = `https://solar.googleapis.com/v1/buildingInsights:findClosest?location.latitude=${latitude}&location.longitude=${longitude}&requiredQuality=HIGH&key=${apiKey}`;
        const solarResponse = await fetch(solarApiUrl, {
            headers: {
                'Accept': 'application/json'
            },
            compress: true
        });

        if (!solarResponse.ok) {
            console.error(`Error fetching solar data: ${solarResponse.statusText}`);
            return res.status(500).send('Internal Server Error');
        }

        const solarData = await solarResponse.json();
        res.json(solarData);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
