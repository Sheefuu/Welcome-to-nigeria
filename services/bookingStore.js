const bookings = [];

function makeBookingReference() {
  return `WTN-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}

function createBookingRecord(payload = {}) {
  const booking = {
    booking_id: `bk_${Date.now()}_${Math.random().toString(16).slice(2, 8)}`,
    booking_reference: makeBookingReference(),
    customer_name: payload.customer_name || 'Guest Traveller',
    customer_email: payload.customer_email || '',
    customer_phone: payload.customer_phone || '',
    service_type: payload.service_type || 'travel',
    provider: payload.provider || 'provider-not-configured',
    provider_booking_reference: payload.provider_booking_reference || '',
    travel_date: payload.travel_date || null,
    booking_status: payload.booking_status || 'pending',
    payment_status: payload.payment_status || 'pending',
    amount: Number(payload.amount || 0),
    currency: payload.currency || 'NGN',
    created_at: new Date().toISOString()
  };

  bookings.push(booking);
  return booking;
}

module.exports = {
  bookings,
  createBookingRecord
};
