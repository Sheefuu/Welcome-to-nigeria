const { hotelProviderReady, providers } = require('../config/env');

function validateHotelSearch(data = {}) {
  const errors = [];
  const destination = String(data.destination || '').trim();
  const checkIn = String(data.checkIn || '').trim();
  const checkOut = String(data.checkOut || '').trim();
  const rooms = Number(data.rooms || 1);
  const adults = Number(data.adults || 2);
  const children = Number(data.children || 0);

  if (!destination) errors.push('Destination is required.');
  if (!checkIn) errors.push('Check-in date is required.');
  if (!checkOut) errors.push('Check-out date is required.');
  if (rooms < 1) errors.push('Rooms must be at least 1.');
  if (adults < 1) errors.push('At least one adult is required.');
  if (children < 0) errors.push('Children count must be valid.');

  if (checkIn && checkOut) {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    if (end <= start) {
      errors.push('Check-out date must be after check-in date.');
    }
  }

  return { errors, values: { destination, checkIn, checkOut, rooms, adults, children } };
}

function searchHotels(search = {}) {
  const validation = validateHotelSearch(search);

  if (validation.errors.length) {
    return {
      status: 'validation_error',
      message: 'Please provide valid accommodation details.',
      errors: validation.errors
    };
  }

  if (!hotelProviderReady) {
    return {
      status: 'api_not_configured',
      provider: providers.hotel,
      message: 'Accommodation provider is not configured yet. Add your real credentials to .env to enable live hotel search.',
      results: []
    };
  }

  return {
    status: 'development',
    provider: providers.hotel,
    message: 'Accommodation API is ready for integration. Add the provider credentials to enable live hotel results.',
    results: []
  };
}

module.exports = {
  searchHotels,
  validateHotelSearch
};
