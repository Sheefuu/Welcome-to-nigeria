const { transferProviderReady, providers } = require('../config/env');

function validateTransferSearch(data = {}) {
  const errors = [];
  const pickupLocation = String(data.pickupLocation || '').trim();
  const dropoffLocation = String(data.dropoffLocation || '').trim();
  const date = String(data.date || '').trim();
  const passengers = Number(data.passengers || 1);
  const luggage = Number(data.luggage || 0);

  if (!pickupLocation) errors.push('Pickup location is required.');
  if (!dropoffLocation) errors.push('Drop-off location is required.');
  if (!date) errors.push('Transfer date is required.');
  if (passengers < 1) errors.push('Passenger count must be valid.');
  if (luggage < 0) errors.push('Luggage count must be valid.');

  if (date) {
    const pickedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (pickedDate < today) {
      errors.push('Transfer date cannot be in the past.');
    }
  }

  return { errors, values: { pickupLocation, dropoffLocation, date, passengers, luggage } };
}

function searchTransfers(search = {}) {
  const validation = validateTransferSearch(search);

  if (validation.errors.length) {
    return {
      status: 'validation_error',
      message: 'Please provide valid transfer details.',
      errors: validation.errors
    };
  }

  if (!transferProviderReady) {
    return {
      status: 'api_not_configured',
      provider: providers.transfer,
      message: 'Transfer provider is not configured yet. Add your real credentials to .env to enable live transfer search.',
      results: []
    };
  }

  return {
    status: 'development',
    provider: providers.transfer,
    message: 'Transfer API is ready for integration. Add credentials to enable live transfer results.',
    results: []
  };
}

module.exports = {
  searchTransfers,
  validateTransferSearch
};
