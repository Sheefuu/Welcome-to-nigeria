document.addEventListener('DOMContentLoaded', () => {
    const today = new Date().toISOString().split('T')[0];
    document.querySelectorAll('input[type="date"]').forEach(input => {
        input.min = today;
    });

    const flightForm = document.getElementById('dedicatedFlightSearchForm');
    const flightResults = document.getElementById('dedicatedFlightResults');
    const flightModeButtons = document.querySelectorAll('[data-flight-mode]');
    const flightTripType = flightForm?.querySelector('[name="tripType"]');
    const returnGroup = document.getElementById('dedicatedReturnGroup');

    function setFlightMode(mode) {
        flightModeButtons.forEach(button => {
            button.classList.toggle('active', button.dataset.flightMode === mode);
        });

        if (!flightTripType || !returnGroup) return;
        flightTripType.value = mode;
        const returnInput = returnGroup.querySelector('input');
        const requiresReturn = mode === 'round-trip';
        returnInput.disabled = !requiresReturn;
        returnInput.required = requiresReturn;
        returnGroup.style.opacity = requiresReturn ? '1' : '0.6';
    }

    flightModeButtons.forEach(button => {
        button.addEventListener('click', () => setFlightMode(button.dataset.flightMode));
    });
    setFlightMode('round-trip');

    async function postSearch(endpoint, payload, target, label) {
        target.innerHTML = `<div class="booking-empty-state"><h4>Searching...</h4><p>Validating your ${label} request securely.</p></div>`;

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const data = await response.json();

            if (!response.ok || data.status === 'validation_error') {
                target.innerHTML = `<div class="booking-empty-state"><h4>Please check your details</h4><p>${(data.errors || [data.message]).join(' ')}</p></div>`;
                return;
            }

            target.innerHTML = `<div class="booking-empty-state"><h4>API not connected yet</h4><p>${data.message || 'Live provider results will appear here after configuration.'}</p></div>`;
        } catch {
            target.innerHTML = '<div class="booking-empty-state"><h4>Provider connection unavailable</h4><p>Start the secure backend locally or try again when the provider is available.</p></div>';
        }
    }

    flightForm?.addEventListener('submit', event => {
        event.preventDefault();
        const formData = new FormData(flightForm);
        const mode = formData.get('tripType');
        const origin = String(formData.get('origin') || '').trim();
        const destination = String(formData.get('destination') || '').trim();
        const payload = {
            tripType: mode === 'multi-city' ? 'round-trip' : mode,
            origin,
            destination,
            departureDate: formData.get('departureDate'),
            returnDate: formData.get('returnDate'),
            adults: Number(formData.get('adults') || 1),
            children: 0,
            infants: 0,
            cabinClass: formData.get('cabinClass')
        };

        postSearch('/api/flights/search', payload, flightResults, 'flight');
    });

    const hotelForm = document.getElementById('dedicatedHotelSearchForm');
    const hotelResults = document.getElementById('dedicatedHotelResults');
    hotelForm?.addEventListener('submit', event => {
        event.preventDefault();
        const formData = new FormData(hotelForm);
        postSearch('/api/hotels/search', {
            destination: formData.get('destination'),
            checkIn: formData.get('checkIn'),
            checkOut: formData.get('checkOut'),
            rooms: Number(formData.get('rooms') || 1),
            adults: Number(formData.get('adults') || 1),
            children: 0
        }, hotelResults, 'accommodation');
    });

    const transferForm = document.getElementById('dedicatedTransferSearchForm');
    const transferResults = document.getElementById('dedicatedTransferResults');
    transferForm?.addEventListener('submit', event => {
        event.preventDefault();
        const formData = new FormData(transferForm);
        postSearch('/api/transfers/search', {
            pickupLocation: formData.get('pickupLocation'),
            dropoffLocation: formData.get('dropoffLocation'),
            date: formData.get('date'),
            time: formData.get('time'),
            passengers: Number(formData.get('passengers') || 1),
            luggage: Number(formData.get('luggage') || 0),
            vehicleType: formData.get('vehicleType')
        }, transferResults, 'transfer');
    });
});
