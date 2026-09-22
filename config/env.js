function hasValue(value) {
  return typeof value === 'string' ? value.trim().length > 0 : Boolean(value);
}

function providerReady(apiKey, apiSecret) {
  return hasValue(apiKey) && hasValue(apiSecret);
}

module.exports = {
  port: Number(process.env.PORT || 3000),
  flightProviderReady: providerReady(
    process.env.FLIGHT_API_KEY,
    process.env.FLIGHT_API_SECRET
  ),
  hotelProviderReady: providerReady(
    process.env.HOTEL_API_KEY,
    process.env.HOTEL_API_SECRET
  ),
  transferProviderReady: providerReady(
    process.env.TRANSFER_API_KEY,
    process.env.TRANSFER_API_SECRET
  ),
  paymentProviderReady: hasValue(process.env.PAYMENT_SECRET_KEY),
  providers: {
    flight: process.env.FLIGHT_PROVIDER || 'duffel',
    hotel: process.env.HOTEL_PROVIDER || 'booking-com',
    transfer: process.env.TRANSFER_PROVIDER || 'ride-hailing',
    payment: process.env.PAYMENT_PROVIDER || 'stripe'
  }
};
