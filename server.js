const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const { searchFlights } = require('./services/flightProvider');
const { searchHotels } = require('./services/hotelProvider');
const { searchTransfers } = require('./services/transferProvider');

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT || 3000);

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'welcome-to-nigeria-travel-booking',
    environment: process.env.NODE_ENV || 'development'
  });
});

app.post('/api/flights/search', (req, res) => {
  const response = searchFlights(req.body || {});
  res.status(response.status === 'validation_error' ? 400 : 200).json(response);
});

app.post('/api/hotels/search', (req, res) => {
  const response = searchHotels(req.body || {});
  res.status(response.status === 'validation_error' ? 400 : 200).json(response);
});

app.post('/api/transfers/search', (req, res) => {
  const response = searchTransfers(req.body || {});
  res.status(response.status === 'validation_error' ? 400 : 200).json(response);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Travel booking backend running on http://localhost:${PORT}`);
});
