const { flightProviderReady, providers } = require('../config/env');

function validateFlightSearch(data = {}) {
  const errors = [];
  const origin = String(data.origin || '').trim();
  const destination = String(data.destination || '').trim();
  const departureDate = String(data.departureDate || '').trim();
  const tripType = String(data.tripType || 'round-trip').trim();
  const cabinClass = String(data.cabinClass || 'economy').trim();
  const adults = Number(data.adults || 1);
  const children = Number(data.children || 0);
  const infants = Number(data.infants || 0);

  if (!origin) errors.push('Origin is required.');
  if (!destination) errors.push('Destination is required.');
  if (origin && destination && origin === destination) {
    errors.push('Origin and destination cannot be the same.');
  }
  if (!departureDate) errors.push('Departure date is required.');
  if (tripType === 'round-trip' && !String(data.returnDate || '').trim()) {
    errors.push('Return date is required for round-trip journeys.');
  }

  if (adults < 1) errors.push('At least one adult is required.');
  if (children < 0 || infants < 0) errors.push('Passenger counts must be valid.');
  if (adults + children + infants > 9) errors.push('Total passengers must be 9 or fewer.');

  const departure = departureDate ? new Date(departureDate) : null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (departure && departure < today) {
    errors.push('Departure date cannot be in the past.');
  }

  if (tripType === 'round-trip' && data.returnDate) {
    const returnDate = new Date(data.returnDate);
    if (returnDate < departure) {
      errors.push('Return date cannot be before departure date.');
    }
  }

  const validCabins = ['economy', 'premium-economy', 'business', 'first'];
  if (!validCabins.includes(cabinClass.toLowerCase())) {
    errors.push('Please select a valid cabin class.');
  }

  return { errors, values: { origin, destination, departureDate, tripType, cabinClass, adults, children, infants } };
}

function searchFlights(search = {}) {
  const validation = validateFlightSearch(search);

  if (validation.errors.length) {
    return {
      status: 'validation_error',
      message: 'Please correct the form and try again.',
      errors: validation.errors
    };
  }

  if (!flightProviderReady) {
    return {
      status: 'api_not_configured',
      provider: providers.flight,
      message: 'Flight provider is not configured yet. Add your real credentials to .env to enable live search.',
      results: []
    };
  }

  return {
    status: 'development',
    provider: providers.flight,
    message: 'Flight API is ready for integration. Add your provider credentials to enable live results.',
    results: []
  };
}

module.exports = {
  searchFlights,
  validateFlightSearch
};
