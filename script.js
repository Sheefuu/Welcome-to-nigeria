/* =========================================================
   WELCOME TO NIGERIA
   FRONTEND JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const travelLogo = "Travellogo.jpeg";
    document.querySelectorAll(".logo").forEach(logo => {
        const existingImage = logo.querySelector("img");
        if (existingImage) {
            existingImage.classList.add("logo-image");
            existingImage.classList.remove("logo-mark");
            return;
        }
        logo.innerHTML = `<img class="logo-image" src="${travelLogo}" alt="Welcome to Nigeria logo">`;
    });

    const nigerianStates = [
        "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa",
        "Benue", "Borno", "Cross River", "Delta", "Ebonyi", "Edo",
        "Ekiti", "Enugu", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano",
        "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger",
        "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto",
        "Taraba", "Yobe", "Zamfara", "Abuja (Federal Capital Territory)"
    ];
    const nigerianLocations = [
        ...nigerianStates.map(state => `${state}, Nigeria`),
        "Abuja (ABV)", "Lagos (LOS)", "Port Harcourt (PHC)", "Kano (KAN)",
        "Enugu (ENU)", "Benin City (BNI)", "Calabar (CBQ)", "Uyo (QUO)",
        "Owerri (QOW)", "Asaba (ABB)", "Akure (AKR)", "Ilorin (ILR)",
        "Jos (JOS)", "Kaduna (KAD)", "Maiduguri (MIU)", "Yola (YOL)",
        "Sokoto (SKO)", "Katsina (DKA)", "Gombe (GMO)", "Makurdi (MDI)",
        "Bauchi (BCU)", "Ibadan (IBA)", "Warri (QRW)", "Birnin Kebbi",
        "Abeokuta", "Onitsha", "Aba", "Awka", "Lokoja", "Minna", "Ado-Ekiti",
        "Ikeja", "Victoria Island", "Lekki", "Yenagoa", "Damaturu", "Jalingo",
        "Dubai (DXB)", "London (LHR)", "Accra (ACC)"
    ];
    let locationOptions = document.getElementById("airportOptions");
    const locationInputs = ["dedicatedFlightOrigin", "dedicatedFlightDestination", "dedicatedPickup", "dedicatedDropoff", "dedicatedHotelDestination"]
        .map(id => document.getElementById(id))
        .filter(Boolean);
    if (!locationOptions && locationInputs.length) {
        locationOptions = document.createElement("datalist");
        locationOptions.id = "airportOptions";
        document.body.append(locationOptions);
    }
    if (locationOptions) {
        const existing = new Set(Array.from(locationOptions.options, option => option.value));
        nigerianLocations.forEach(location => {
            if (existing.has(location)) return;
            locationOptions.append(new Option(location, location));
        });
    }
    locationInputs.forEach(input => {
        if (!locationOptions) return;
        input.setAttribute("list", "airportOptions");
    });

    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const navMenu = document.getElementById("navMenu");

    if (mobileMenuBtn && navMenu) {

        mobileMenuBtn.addEventListener("click", () => {

            const isOpen = navMenu.classList.toggle("open");

            mobileMenuBtn.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

        });

        document.querySelectorAll(".nav-link, .nav-cta, .nav-travel-dropdown a").forEach(link => {

            link.addEventListener("click", () => {

                navMenu.classList.remove("open");

                mobileMenuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });

    }


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections = document.querySelectorAll("main section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    const updateActiveNav = () => {

        if (!sections.length) return;

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 150;

            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute("id");
            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            const href = link.getAttribute("href");

            if (href === `#${currentSection}`) {
                link.classList.add("active");
            }

        });

    };

    window.addEventListener("scroll", updateActiveNav);

    updateActiveNav();


    /* =====================================================
       DESTINATION FILTER
    ===================================================== */

    const filterButtons = document.querySelectorAll(".filter-btn");
    const destinationCards =
        document.querySelectorAll(".destination-card");

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            filterButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            const filter = button.dataset.filter;

            destinationCards.forEach(card => {

                const category = card.dataset.category;

                if (
                    filter === "all" ||
                    category === filter
                ) {

                    card.classList.remove("hidden");

                } else {

                    card.classList.add("hidden");

                }

            });

        });

    });


    /* =====================================================
       MODAL SYSTEM
    ===================================================== */

    const modalTriggers =
        document.querySelectorAll("[data-open-modal]");

    const modalCloseButtons =
        document.querySelectorAll("[data-close-modal]");

    const modalOverlays =
        document.querySelectorAll(".modal-overlay");


    function openModal(modalId) {

        const modal = document.getElementById(modalId);

        if (!modal) return;

        modal.classList.add("active");

        document.body.classList.add("modal-open");

    }


    function closeModal(modal) {

        modal.classList.remove("active");

        document.body.classList.remove("modal-open");

    }


    modalTriggers.forEach(trigger => {

        trigger.addEventListener("click", () => {

            const modalId =
                trigger.dataset.openModal;

            openModal(modalId);

        });

    });


    modalCloseButtons.forEach(button => {

        button.addEventListener("click", () => {

            const modalId =
                button.dataset.closeModal;

            const modal =
                document.getElementById(modalId);

            if (modal) {
                closeModal(modal);
            }

        });

    });


    modalOverlays.forEach(overlay => {

        overlay.addEventListener("click", event => {

            if (event.target === overlay) {
                closeModal(overlay);
            }

        });

    });


    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            modalOverlays.forEach(modal => {

                if (modal.classList.contains("active")) {
                    closeModal(modal);
                }

            });

        }

    });


    /* =====================================================
       PACKAGE REQUEST
    ===================================================== */

    const packageButtons =
        document.querySelectorAll(".package-request");

    packageButtons.forEach(button => {

        button.addEventListener("click", () => {

            const packageName =
                button.dataset.package;

            const messageField =
                document.getElementById("message");

            const enquiryType =
                document.getElementById("enquiryType");

            const contactSection =
                document.getElementById("contact");


            if (messageField) {

                messageField.value =
                    `I would like to make an enquiry about the "${packageName}" package. Please provide availability, pricing, itinerary details and applicable terms.`;

            }


            if (enquiryType) {
                enquiryType.value = "Tourism Package";
            }


            if (contactSection) {

                contactSection.scrollIntoView({
                    behavior: "smooth"
                });

            } else {

                window.location.href = `contact.html?package=${encodeURIComponent(packageName)}`;

            }

        });

    });


    /* =====================================================
       DESTINATION REQUEST
    ===================================================== */

    const destinationButtons =
        document.querySelectorAll("[data-destination]");

    destinationButtons.forEach(button => {

        button.addEventListener("click", () => {

            const destination =
                button.dataset.destination;

            const destinationInput =
                document.getElementById("destination");

            const enquiryType =
                document.getElementById("enquiryType");

            const messageField =
                document.getElementById("message");


            if (destinationInput) {
                destinationInput.value = destination;
            }


            if (enquiryType) {
                enquiryType.value = "Travel Enquiry";
            }


            if (messageField) {

                messageField.value =
                    `I am interested in travelling to ${destination}. Please provide relevant travel, tourism and destination information.`;

            }


            const contactSection = document.getElementById("contact");

            if (contactSection) {

                contactSection.scrollIntoView({
                    behavior: "smooth"
                });

            } else {

                window.location.href = `contact.html?destination=${encodeURIComponent(destination)}`;

            }

        });

    });


    /* =====================================================
       TOAST
    ===================================================== */

    const toast =
        document.getElementById("toast");

    const toastTitle =
        document.getElementById("toastTitle");

    const toastMessage =
        document.getElementById("toastMessage");


    function showToast(title, message) {

        if (!toast) return;

        toastTitle.textContent = title;

        toastMessage.textContent = message;

        toast.classList.add("show");

        setTimeout(() => {

            toast.classList.remove("show");

        }, 4500);

    }


    /* =====================================================
       MAIN ENQUIRY FORM
    ===================================================== */

    const enquiryForm =
        document.getElementById("enquiryForm");

    if (enquiryForm) {

        enquiryForm.addEventListener("submit", event => {

            event.preventDefault();


            const formData =
                new FormData(enquiryForm);


            const name =
                formData.get("fullName");

            const email =
                formData.get("email");


            if (!name || !email) {

                showToast(
                    "Missing information",
                    "Please complete the required fields."
                );

                return;

            }


            showToast(
                "Enquiry received",
                "Your enquiry has been prepared successfully. A team member can follow up with you."
            );


            enquiryForm.reset();

        });

    }


    /* =====================================================
       NEWSLETTER
    ===================================================== */

    const newsletterForm =
        document.getElementById("newsletterForm");

    if (newsletterForm) {

        newsletterForm.addEventListener("submit", event => {

            event.preventDefault();


            const email =
                newsletterForm.querySelector(
                    'input[type="email"]'
                ).value;


            if (!email) {

                showToast(
                    "Email required",
                    "Please enter your email address."
                );

                return;

            }


            showToast(
                "Subscription received",
                "Thank you. Your communication preference has been recorded."
            );


            newsletterForm.reset();

        });

    }


    /* =====================================================
       MODAL FORMS
    ===================================================== */

    const modalForms =
        document.querySelectorAll(".modal-form");

    modalForms.forEach(form => {

        form.addEventListener("submit", event => {

            event.preventDefault();


            const modal =
                form.closest(".modal-overlay");


            let message =
                "Your request has been received.";


            if (form.classList.contains("event-form")) {

                message =
                    "Your event registration interest has been received.";

            }


            if (form.classList.contains("vendor-form")) {

                message =
                    "Your vendor/exhibitor application has been received for review.";

            }


            if (form.classList.contains("sponsor-form")) {

                message =
                    "Your partnership or sponsorship enquiry has been received.";

            }


            closeModal(modal);

            form.reset();


            showToast(
                "Submission received",
                message
            );

        });

    });


    /* =====================================================
       COOKIE SYSTEM
    ===================================================== */

    const cookieBanner =
        document.getElementById("cookieBanner");

    const acceptCookies =
        document.getElementById("acceptCookies");

    const cookieSettings =
        document.getElementById("cookieSettings");

    const cookieSettingsBtn =
        document.getElementById("cookieSettingsBtn");

    const saveCookiePreferences =
        document.getElementById(
            "saveCookiePreferences"
        );

    const cookieModal =
        document.getElementById("cookieModal");


    function showCookieBanner() {

        if (!cookieBanner) return;

        cookieBanner.classList.add("show");

    }


    function hideCookieBanner() {

        if (!cookieBanner) return;

        cookieBanner.classList.remove("show");

    }


    function saveCookieChoice(choice) {

        localStorage.setItem(
            "wtn_cookie_preferences",
            JSON.stringify(choice)
        );

    }


    function getCookieChoice() {

        const saved =
            localStorage.getItem(
                "wtn_cookie_preferences"
            );

        if (!saved) return null;

        try {

            return JSON.parse(saved);

        } catch {

            return null;

        }

    }


    if (!getCookieChoice()) {

        setTimeout(() => {

            showCookieBanner();

        }, 1200);

    }


    if (acceptCookies) {

        acceptCookies.addEventListener("click", () => {

            saveCookieChoice({
                essential: true,
                analytics: true,
                marketing: true
            });

            hideCookieBanner();

            showToast(
                "Cookies accepted",
                "Your cookie preferences have been saved."
            );

        });

    }


    function openCookieSettings() {

        hideCookieBanner();

        openModal("cookieModal");

    }


    if (cookieSettings) {

        cookieSettings.addEventListener(
            "click",
            openCookieSettings
        );

    }


    if (cookieSettingsBtn) {

        cookieSettingsBtn.addEventListener(
            "click",
            openCookieSettings
        );

    }


    if (saveCookiePreferences) {

        saveCookiePreferences.addEventListener(
            "click",
            () => {

                const analytics =
                    document.getElementById(
                        "analyticsCookies"
                    ).checked;

                const marketing =
                    document.getElementById(
                        "marketingCookies"
                    ).checked;


                saveCookieChoice({
                    essential: true,
                    analytics,
                    marketing
                });


                closeModal(cookieModal);


                showToast(
                    "Preferences saved",
                    "Your cookie preferences have been updated."
                );

            }
        );

    }


    /* =====================================================
       LOAD SAVED COOKIE SETTINGS
    ===================================================== */

    const savedCookies =
        getCookieChoice();

    if (savedCookies) {

        const analyticsCheckbox =
            document.getElementById(
                "analyticsCookies"
            );

        const marketingCheckbox =
            document.getElementById(
                "marketingCookies"
            );


        if (analyticsCheckbox) {

            analyticsCheckbox.checked =
                !!savedCookies.analytics;

        }


        if (marketingCheckbox) {

            marketingCheckbox.checked =
                !!savedCookies.marketing;

        }

    }


    /* =====================================================
       BOOKING PORTAL
    ===================================================== */

    const bookingTabs = document.querySelectorAll(".booking-tab");
    const bookingPanels = document.querySelectorAll(".booking-panel");

    bookingTabs.forEach(tab => {
        tab.addEventListener("click", () => {
            const target = tab.dataset.bookingTab;

            bookingTabs.forEach(item => item.classList.toggle("active", item === tab));
            bookingPanels.forEach(panel => panel.classList.toggle("active", panel.dataset.panel === target));
        });
    });

    const todayDateString = () => new Date().toISOString().split("T")[0];

    [
        document.getElementById("flightDepartureDate"),
        document.getElementById("flightReturnDate"),
        document.getElementById("hotelCheckIn"),
        document.getElementById("hotelCheckOut"),
        document.getElementById("transferDate")
    ].forEach(input => {
        if (input) input.min = todayDateString();
    });

    function setFlightReturnVisibility() {
        const returnInput = document.getElementById("flightReturnDate");
        const tripRadios = document.querySelectorAll('input[name="tripType"]');

        if (!returnInput) return;

        const roundTripSelected = [...tripRadios].some(radio => radio.checked && radio.value === "round-trip");
        returnInput.disabled = !roundTripSelected;
        returnInput.required = roundTripSelected;
        returnInput.closest(".form-group").style.opacity = roundTripSelected ? "1" : "0.6";
    }

    document.querySelectorAll('input[name="tripType"]').forEach(radio => {
        radio.addEventListener("change", setFlightReturnVisibility);
    });
    setFlightReturnVisibility();

    function renderEmptyState(containerId, title, text) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = `
            <div class="booking-empty-state">
                <h4>${title}</h4>
                <p>${text}</p>
            </div>
        `;
    }

    function showValidationErrors(containerId, errors) {
        renderEmptyState(containerId, "Unable to continue", errors.join(" "));
    }

    async function searchTravelApi(endpoint, payload, containerId, emptyTitle) {
        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (!response.ok || data.status === "validation_error") {
                showValidationErrors(containerId, data.errors || [data.message || "Unable to complete this search."]);
                return null;
            }

            if (data.status === "api_not_configured") {
                renderEmptyState(containerId, "API not configured", data.message || "Connect a real provider to enable live search results.");
                return null;
            }

            return data;
        } catch (error) {
            renderEmptyState(containerId, "Unable to connect", "The provider connection is unavailable right now. Please try again later.");
            return null;
        }
    }

    function createResultCard(item, serviceType) {
        const priceValue = item.price || item.totalPrice || item.estimatedPrice || 0;
        const currency = item.currency || "NGN";
        const priceLabel = new Intl.NumberFormat("en-NG", { style: "currency", currency }).format(priceValue);

        if (serviceType === "flight") {
            return `
                <article class="result-card">
                    <div class="result-card-header">
                        <div>
                            <small>${item.airline || "Airline"}</small>
                            <h4>${item.flightNumber || "Flight"}</h4>
                        </div>
                        <span class="result-status">${item.stops || "Direct"}</span>
                    </div>
                    <div class="route-row">
                        <span>${item.departureAirport || "ABV"} ${item.departureTime || "08:30"}</span>
                        <span class="route-line"></span>
                        <span>${item.arrivalAirport || "LOS"} ${item.arrivalTime || "10:45"}</span>
                    </div>
                    <div class="result-meta">
                        <p>${item.duration || "2h 30m"}</p>
                        <p>${item.cabinClass || "Economy"}</p>
                    </div>
                    <div class="result-footer">
                        <div class="result-price">
                            <span>from</span>
                            <strong>${priceLabel}</strong>
                        </div>
                        <button class="btn btn-primary select-booking" type="button" data-service="flight">Select Flight</button>
                    </div>
                </article>
            `;
        }

        if (serviceType === "hotel") {
            return `
                <article class="result-card">
                    <div class="result-card-header">
                        <div>
                            <small>${item.location || "Location"}</small>
                            <h4>${item.name || "Hotel Property"}</h4>
                        </div>
                        <span class="result-status">${item.rating || "Guest rating"}</span>
                    </div>
                    <p>${item.roomType || "Standard room"}</p>
                    <p>${item.facilities || "Wi-Fi, breakfast, parking"}</p>
                    <div class="result-footer">
                        <div class="result-price">
                            <span>from</span>
                            <strong>${priceLabel}</strong>
                        </div>
                        <button class="btn btn-primary select-booking" type="button" data-service="hotel">View Details</button>
                    </div>
                </article>
            `;
        }

        return `
            <article class="result-card">
                <div class="result-card-header">
                    <div>
                        <small>${item.provider || "Provider"}</small>
                        <h4>${item.vehicleType || "Executive Car"}</h4>
                    </div>
                    <span class="result-status warning">${item.capacity || "4 passengers"}</span>
                </div>
                <p>${item.pickupLocation || "Airport"} → ${item.dropoffLocation || "Hotel"}</p>
                <p>${item.estimatedDuration || "35 mins"}</p>
                <div class="result-footer">
                    <div class="result-price">
                        <span>from</span>
                        <strong>${priceLabel}</strong>
                    </div>
                    <button class="btn btn-primary select-booking" type="button" data-service="transfer">Select Transfer</button>
                </div>
            </article>
        `;
    }

    document.getElementById("flightSearchForm")?.addEventListener("submit", async (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        const formData = new FormData(form);
        const payload = {
            tripType: formData.get("tripType") || "round-trip",
            origin: formData.get("origin"),
            destination: formData.get("destination"),
            departureDate: formData.get("departureDate"),
            returnDate: formData.get("returnDate"),
            adults: Number(formData.get("adults") || 1),
            children: Number(formData.get("children") || 0),
            infants: Number(formData.get("infants") || 0),
            cabinClass: formData.get("cabinClass") || "economy"
        };

        const flightResults = document.getElementById("flightResults");
        flightResults.innerHTML = '<div class="booking-empty-state"><h4>Searching...</h4><p>Please wait while we validate your trip details.</p></div>';

        const response = await searchTravelApi("/api/flights/search", payload, "flightResults", "Flight search");
        if (!response) return;

        const items = response.results?.length ? response.results : [
            {
                airline: "API not connected",
                flightNumber: "Provider pending",
                departureAirport: payload.origin,
                departureTime: "—",
                arrivalAirport: payload.destination,
                arrivalTime: "—",
                duration: "To be confirmed",
                stops: "Provider configuration required",
                cabinClass: payload.cabinClass,
                price: 0,
                currency: "NGN"
            }
        ];

        flightResults.innerHTML = items.map(item => createResultCard(item, "flight")).join("");

        flightResults.querySelectorAll(".select-booking").forEach(button => {
            button.addEventListener("click", () => {
                const selected = {
                    service: "Flight",
                    title: "Flight booking",
                    summary: `${payload.origin} to ${payload.destination} • ${payload.departureDate}`,
                    amount: items[0]?.price || 0,
                    currency: items[0]?.currency || "NGN"
                };
                openBookingCheckout(selected);
            });
        });
    });

    document.getElementById("hotelSearchForm")?.addEventListener("submit", async (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        const formData = new FormData(form);
        const payload = {
            destination: formData.get("destination"),
            checkIn: formData.get("checkIn"),
            checkOut: formData.get("checkOut"),
            rooms: Number(formData.get("rooms") || 1),
            adults: Number(formData.get("adults") || 2),
            children: Number(formData.get("children") || 0)
        };

        const hotelResults = document.getElementById("hotelResults");
        hotelResults.innerHTML = '<div class="booking-empty-state"><h4>Searching...</h4><p>Please wait while we validate the accommodation options.</p></div>';

        const response = await searchTravelApi("/api/hotels/search", payload, "hotelResults", "Accommodation search");
        if (!response) return;

        const items = response.results?.length ? response.results : [
            {
                name: "Accommodation provider pending",
                location: payload.destination,
                roomType: "Standard room",
                rating: "Provider pending",
                facilities: "Wi-Fi, breakfast, parking",
                price: 0,
                currency: "NGN"
            }
        ];

        hotelResults.innerHTML = items.map(item => createResultCard(item, "hotel")).join("");

        hotelResults.querySelectorAll(".select-booking").forEach(button => {
            button.addEventListener("click", () => {
                const selected = {
                    service: "Accommodation",
                    title: "Hotel booking",
                    summary: `${payload.destination} • ${payload.checkIn} to ${payload.checkOut}`,
                    amount: items[0]?.price || 0,
                    currency: items[0]?.currency || "NGN"
                };
                openBookingCheckout(selected);
            });
        });
    });

    document.getElementById("transferSearchForm")?.addEventListener("submit", async (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        const formData = new FormData(form);
        const payload = {
            pickupLocation: formData.get("pickupLocation"),
            dropoffLocation: formData.get("dropoffLocation"),
            date: formData.get("date"),
            time: formData.get("time"),
            passengers: Number(formData.get("passengers") || 1),
            luggage: Number(formData.get("luggage") || 0),
            vehicleType: formData.get("vehicleType") || "standard"
        };

        const transferResults = document.getElementById("transferResults");
        transferResults.innerHTML = '<div class="booking-empty-state"><h4>Searching...</h4><p>Please wait while we validate the transfer options.</p></div>';

        const response = await searchTravelApi("/api/transfers/search", payload, "transferResults", "Transfer search");
        if (!response) return;

        const items = response.results?.length ? response.results : [
            {
                provider: "Transfer provider pending",
                vehicleType: payload.vehicleType,
                capacity: "4 passengers",
                pickupLocation: payload.pickupLocation,
                dropoffLocation: payload.dropoffLocation,
                estimatedDuration: "30–45 mins",
                price: 0,
                currency: "NGN"
            }
        ];

        transferResults.innerHTML = items.map(item => createResultCard(item, "transfer")).join("");

        transferResults.querySelectorAll(".select-booking").forEach(button => {
            button.addEventListener("click", () => {
                const selected = {
                    service: "Airport Transfer",
                    title: "Transfer booking",
                    summary: `${payload.pickupLocation} to ${payload.dropoffLocation} • ${payload.date}`,
                    amount: items[0]?.price || 0,
                    currency: items[0]?.currency || "NGN"
                };
                openBookingCheckout(selected);
            });
        });
    });

    function openBookingCheckout(selected) {
        const checkout = document.getElementById("bookingCheckout");
        const summary = document.getElementById("bookingSummary");
        const badge = document.getElementById("selectedServiceBadge");

        if (!checkout || !summary || !badge) return;

        badge.textContent = selected.service;
        summary.innerHTML = `
            <h4>${selected.title}</h4>
            <p>${selected.summary}</p>
            <p><strong>Amount:</strong> ${new Intl.NumberFormat("en-NG", { style: "currency", currency: selected.currency || "NGN" }).format(selected.amount || 0)}</p>
            <p><strong>Booking flow:</strong> Search → Results → Select → Customer details → Review → Payment → Confirmation</p>
            <p><strong>Note:</strong> Live payment and provider confirmation require credentials and a secure backend integration.</p>
        `;

        checkout.classList.remove("hidden");
        checkout.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    document.getElementById("customerBookingForm")?.addEventListener("submit", (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        const formData = new FormData(form);
        const name = formData.get("customerName") || "Guest Traveller";
        const email = formData.get("customerEmail") || "";
        const phone = formData.get("customerPhone") || "";
        const bookingReference = `WTN-${Date.now().toString(36).toUpperCase()}`;

        if (!name || !email || !phone) {
            showToast("Booking details incomplete", "Please complete all required customer details before continuing.");
            return;
        }

        const confirmation = document.getElementById("bookingConfirmation");
        if (!confirmation) return;

        document.getElementById("confirmationReference").textContent = bookingReference;
        document.getElementById("confirmationCustomer").textContent = name;
        document.getElementById("confirmationService").textContent = document.getElementById("selectedServiceBadge").textContent;
        document.getElementById("confirmationStatus").textContent = "Awaiting provider confirmation";

        confirmation.classList.remove("hidden");
        confirmation.scrollIntoView({ behavior: "smooth", block: "start" });
        showToast("Booking request ready", "Your details have been saved for secure provider review.");
        form.reset();
    });

    /* =====================================================
       HEADER SHADOW ON SCROLL
    ===================================================== */

    const header =
        document.getElementById("header");

    window.addEventListener("scroll", () => {

        if (!header) return;

        if (window.scrollY > 20) {

            header.style.boxShadow =
                "0 8px 25px rgba(0,0,0,0.07)";

        } else {

            header.style.boxShadow = "none";

        }

    });


    /* =====================================================
       DATE INPUT — DON'T ALLOW PAST DATES
    ===================================================== */

    const travelDate =
        document.getElementById("travelDate");

    if (travelDate) {

        const today =
            new Date().toISOString().split("T")[0];

        travelDate.setAttribute(
            "min",
            today
        );

    }


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".destination-card, .service-card, .package-card, .why-card, .refund-card"
        );


    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.style.opacity = "1";
                        entry.target.style.transform =
                            "translateY(0)";

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.1
            }
        );


    revealElements.forEach(element => {

        element.style.opacity = "0";
        element.style.transform =
            "translateY(20px)";
        element.style.transition =
            "opacity 0.6s ease, transform 0.6s ease";

        revealObserver.observe(element);

    });


    /* =====================================================
       SMOOTH INTERNAL LINKS
    ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener("click", event => {

                const targetId =
                    link.getAttribute("href");

                if (
                    targetId === "#" ||
                    targetId === "#privacy" ||
                    targetId === "#terms"
                ) {
                    return;
                }


                const target =
                    document.querySelector(targetId);


                if (target) {

                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            });

        });


    /* =====================================================
       PREVENT DEMO SOCIAL LINKS FROM JUMPING
    ===================================================== */

    document
        .querySelectorAll(".social-links a[href='#']")
        .forEach(link => {

            link.addEventListener("click", event => {

                event.preventDefault();

                showToast(
                    "Social media",
                    "Connect your official social-media links here."
                );

            });

        });


    /* =====================================================
       CONSOLE MESSAGE
    ===================================================== */

    console.log(
        "Welcome to Nigeria frontend loaded successfully."
    );

});