/* =========================================================
   WELCOME TO NIGERIA
   FRONTEND JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const travelLogo = "Travellogo.jpeg";
  document.querySelectorAll(".logo").forEach((logo) => {
    const existingImage = logo.querySelector("img");
    if (existingImage) {
      existingImage.classList.add("logo-image");
      existingImage.classList.remove("logo-mark");
      return;
    }
    logo.innerHTML = `<img class="logo-image" src="${travelLogo}" alt="Welcome to Nigeria logo">`;
  });

  const nigerianStates = [
    "Abia",
    "Adamawa",
    "Akwa Ibom",
    "Anambra",
    "Bauchi",
    "Bayelsa",
    "Benue",
    "Borno",
    "Cross River",
    "Delta",
    "Ebonyi",
    "Edo",
    "Ekiti",
    "Enugu",
    "Gombe",
    "Imo",
    "Jigawa",
    "Kaduna",
    "Kano",
    "Katsina",
    "Kebbi",
    "Kogi",
    "Kwara",
    "Lagos",
    "Nasarawa",
    "Niger",
    "Ogun",
    "Ondo",
    "Osun",
    "Oyo",
    "Plateau",
    "Rivers",
    "Sokoto",
    "Taraba",
    "Yobe",
    "Zamfara",
    "Abuja (Federal Capital Territory)",
  ];
  const nigerianLocations = [
    ...nigerianStates.map((state) => `${state}, Nigeria`),
    "Abuja (ABV)",
    "Lagos (LOS)",
    "Port Harcourt (PHC)",
    "Kano (KAN)",
    "Enugu (ENU)",
    "Benin City (BNI)",
    "Calabar (CBQ)",
    "Uyo (QUO)",
    "Owerri (QOW)",
    "Asaba (ABB)",
    "Akure (AKR)",
    "Ilorin (ILR)",
    "Jos (JOS)",
    "Kaduna (KAD)",
    "Maiduguri (MIU)",
    "Yola (YOL)",
    "Sokoto (SKO)",
    "Katsina (DKA)",
    "Gombe (GMO)",
    "Makurdi (MDI)",
    "Bauchi (BCU)",
    "Ibadan (IBA)",
    "Warri (QRW)",
    "Birnin Kebbi",
    "Abeokuta",
    "Onitsha",
    "Aba",
    "Awka",
    "Lokoja",
    "Minna",
    "Ado-Ekiti",
    "Ikeja",
    "Victoria Island",
    "Lekki",
    "Yenagoa",
    "Damaturu",
    "Jalingo",
    "Dubai (DXB)",
    "London (LHR)",
    "Accra (ACC)",
  ];
  let locationOptions = document.getElementById("airportOptions");
  const locationInputs = [
    "dedicatedFlightOrigin",
    "dedicatedFlightDestination",
    "dedicatedPickup",
    "dedicatedDropoff",
    "dedicatedHotelDestination",
  ]
    .map((id) => document.getElementById(id))
    .filter(Boolean);
  if (!locationOptions && locationInputs.length) {
    locationOptions = document.createElement("datalist");
    locationOptions.id = "airportOptions";
    document.body.append(locationOptions);
  }
  if (locationOptions) {
    const existing = new Set(
      Array.from(locationOptions.options, (option) => option.value),
    );
    nigerianLocations.forEach((location) => {
      if (existing.has(location)) return;
      locationOptions.append(new Option(location, location));
    });
  }
  locationInputs.forEach((input) => {
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

      mobileMenuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    document
      .querySelectorAll(".nav-link, .nav-cta, .nav-travel-dropdown a")
      .forEach((link) => {
        link.addEventListener("click", () => {
          navMenu.classList.remove("open");

          mobileMenuBtn.setAttribute("aria-expanded", "false");
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

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 150;

      if (window.scrollY >= sectionTop) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
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

  const extraDestinations = [
    [
      "Abia",
      "culture",
      "SOUTHEAST NIGERIA",
      "Culture, crafts and welcoming city experiences.",
      "image-calabar",
    ],
    [
      "Adamawa",
      "nature",
      "NORTHEAST NIGERIA",
      "Highland scenery, peaceful landscapes and outdoor discovery.",
      "image-plateau",
    ],
    [
      "Akwa Ibom",
      "nature",
      "SOUTH-SOUTH NIGERIA",
      "Coastal views, food, culture and warm hospitality.",
      "image-port",
    ],
    [
      "Anambra",
      "culture",
      "SOUTHEAST NIGERIA",
      "Heritage, markets and the energy of southeastern Nigeria.",
      "image-enugu",
    ],
    [
      "Bauchi",
      "nature",
      "NORTHEAST NIGERIA",
      "Open landscapes, wildlife and memorable natural escapes.",
      "image-plateau",
    ],
    [
      "Bayelsa",
      "nature",
      "NIGER DELTA",
      "Waterways, mangroves and the distinctive life of the Delta.",
      "image-port",
    ],
    [
      "Benue",
      "culture",
      "CENTRAL NIGERIA",
      "Rich food traditions, festivals and cultural connections.",
      "image-calabar",
    ],
    [
      "Borno",
      "heritage",
      "NORTHEAST NIGERIA",
      "Deep heritage, resilient communities and historic traditions.",
      "image-kano",
    ],
    [
      "Delta",
      "nature",
      "SOUTH-SOUTH NIGERIA",
      "River landscapes, city life and coastal experiences.",
      "image-port",
    ],
    [
      "Ebonyi",
      "nature",
      "SOUTHEAST NIGERIA",
      "Rolling scenery, local food and a slower travel rhythm.",
      "image-plateau",
    ],
    [
      "Edo",
      "heritage",
      "SOUTHERN NIGERIA",
      "Royal history, art, craft and the story of Benin City.",
      "image-oyo",
    ],
    [
      "Ekiti",
      "nature",
      "SOUTHWEST NIGERIA",
      "Hills, waterfalls and a refreshing highland atmosphere.",
      "image-plateau",
    ],
    [
      "Gombe",
      "nature",
      "NORTHEAST NIGERIA",
      "Rock formations, open skies and northern landscapes.",
      "image-kano",
    ],
    [
      "Imo",
      "culture",
      "SOUTHEAST NIGERIA",
      "Food, music, community and lively southeastern culture.",
      "image-enugu",
    ],
    [
      "Jigawa",
      "heritage",
      "NORTHWEST NIGERIA",
      "Traditional craft, heritage and northern hospitality.",
      "image-kano",
    ],
    [
      "Katsina",
      "heritage",
      "NORTHWEST NIGERIA",
      "Historic architecture, craft and enduring traditions.",
      "image-kano",
    ],
    [
      "Kebbi",
      "nature",
      "NORTHWEST NIGERIA",
      "River scenery, fishing traditions and open landscapes.",
      "image-port",
    ],
    [
      "Kogi",
      "heritage",
      "CENTRAL NIGERIA",
      "Confluence landscapes, hills and historic communities.",
      "image-plateau",
    ],
    [
      "Kwara",
      "culture",
      "NORTH CENTRAL NIGERIA",
      "Arts, craft, food and the heritage of Ilorin.",
      "image-oyo",
    ],
    [
      "Nasarawa",
      "nature",
      "NORTH CENTRAL NIGERIA",
      "Hills, waterfalls and quiet nature escapes near Abuja.",
      "image-plateau",
    ],
    [
      "Niger",
      "heritage",
      "NORTH CENTRAL NIGERIA",
      "Historic landscapes, waterways and cultural discovery.",
      "image-kano",
    ],
    [
      "Ogun",
      "culture",
      "SOUTHWEST NIGERIA",
      "Heritage, art, food and easy access from Lagos.",
      "image-lagos",
    ],
    [
      "Ondo",
      "nature",
      "SOUTHWEST NIGERIA",
      "Hills, forests, caves and memorable outdoor discovery.",
      "image-plateau",
    ],
    [
      "Osun",
      "heritage",
      "SOUTHWEST NIGERIA",
      "Sacred groves, festivals and deep Yoruba heritage.",
      "image-oyo",
    ],
    [
      "Taraba",
      "nature",
      "NORTHEAST NIGERIA",
      "Mountain scenery, wildlife and wide open landscapes.",
      "image-plateau",
    ],
    [
      "Yobe",
      "heritage",
      "NORTHEAST NIGERIA",
      "Ancient landscapes, culture and northern traditions.",
      "image-kano",
    ],
    [
      "Zamfara",
      "heritage",
      "NORTHWEST NIGERIA",
      "Craft, history and the warmth of northwestern communities.",
      "image-kano",
    ],
  ];

  const extraDestinationContainer = document.querySelector(
    "[data-extra-destinations]",
  );
  if (extraDestinationContainer) {
    extraDestinationContainer.replaceWith(
      ...extraDestinations.map(
        ([name, category, region, description, imageClass]) => {
          const slug = name.toLowerCase().replace(/\s+/g, "-");
          const card = document.createElement("article");
          card.className = "destination-card destination-card-extra";
          card.dataset.category = category;
          card.setAttribute("aria-hidden", "true");
          card.innerHTML = `
          <div class="destination-image ${imageClass}">
            <span class="destination-tag">${category}</span>
          </div>
          <div class="destination-body">
            <span class="destination-location">${region}</span>
            <h3>${name}</h3>
            <p>${description}</p>
            <a class="card-link" href="destination.html?destination=${slug}">Discover ${name} →</a>
          </div>`;
          return card;
        },
      ),
    );
  }

  const filterButtons = document.querySelectorAll(".filter-btn");
  const destinationCards = document.querySelectorAll(".destination-card");
  const destinationToggle = document.getElementById("destinationToggle");
  let destinationsExpanded = false;

  const updateDestinationCards = (filter = "all") => {
    destinationCards.forEach((card) => {
      const matchesFilter =
        filter === "all" || card.dataset.category === filter;
      const isExtra = card.classList.contains("destination-card-extra");
      const shouldShow = matchesFilter && (!isExtra || destinationsExpanded);
      card.classList.toggle("is-filtered-out", !matchesFilter);
      card.classList.toggle("is-collapsed", !shouldShow);
      card.setAttribute("aria-hidden", String(!shouldShow));
    });
  };

  if (destinationToggle) {
    destinationToggle.addEventListener("click", () => {
      destinationsExpanded = !destinationsExpanded;
      destinationToggle.textContent = destinationsExpanded
        ? "See Less"
        : "See More";
      destinationToggle.setAttribute(
        "aria-expanded",
        String(destinationsExpanded),
      );
      updateDestinationCards(
        document.querySelector(".filter-btn.active")?.dataset.filter || "all",
      );
    });
  }

  updateDestinationCards();

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => {
        btn.classList.remove("active");
      });

      button.classList.add("active");

      const filter = button.dataset.filter;

      updateDestinationCards(filter);
    });
  });

  /* =====================================================
       MODAL SYSTEM
    ===================================================== */

  const modalTriggers = document.querySelectorAll("[data-open-modal]");

  const modalCloseButtons = document.querySelectorAll("[data-close-modal]");

  const modalOverlays = document.querySelectorAll(".modal-overlay");

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

  modalTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const modalId = trigger.dataset.openModal;

      openModal(modalId);
    });
  });

  modalCloseButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modalId = button.dataset.closeModal;

      const modal = document.getElementById(modalId);

      if (modal) {
        closeModal(modal);
      }
    });
  });

  modalOverlays.forEach((overlay) => {
    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) {
        closeModal(overlay);
      }
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      modalOverlays.forEach((modal) => {
        if (modal.classList.contains("active")) {
          closeModal(modal);
        }
      });
    }
  });

  /* =====================================================
       PACKAGE REQUEST
    ===================================================== */

  const packageButtons = document.querySelectorAll(".package-request");

  packageButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const packageName = button.dataset.package;

      const messageField = document.getElementById("message");

      const enquiryType = document.getElementById("enquiryType");

      const contactSection = document.getElementById("contact");

      if (messageField) {
        messageField.value = `I would like to make an enquiry about the "${packageName}" package. Please provide availability, pricing, itinerary details and applicable terms.`;
      }

      if (enquiryType) {
        enquiryType.value = "Tourism Package";
      }

      if (contactSection) {
        contactSection.scrollIntoView({
          behavior: "smooth",
        });
      } else {
        window.location.href = `contact.html?package=${encodeURIComponent(packageName)}`;
      }
    });
  });

  /* =====================================================
       DESTINATION REQUEST
    ===================================================== */

  const destinationButtons = document.querySelectorAll("[data-destination]");

  destinationButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const destination = button.dataset.destination;

      const destinationInput = document.getElementById("destination");

      const enquiryType = document.getElementById("enquiryType");

      const messageField = document.getElementById("message");

      if (destinationInput) {
        destinationInput.value = destination;
      }

      if (enquiryType) {
        enquiryType.value = "Travel Enquiry";
      }

      if (messageField) {
        messageField.value = `I am interested in travelling to ${destination}. Please provide relevant travel, tourism and destination information.`;
      }

      const contactSection = document.getElementById("contact");

      if (contactSection) {
        contactSection.scrollIntoView({
          behavior: "smooth",
        });
      } else {
        window.location.href = `contact.html?destination=${encodeURIComponent(destination)}`;
      }
    });
  });

  /* =====================================================
       DESTINATION DETAIL PAGE
    ===================================================== */

  const destinationDetail = document.querySelector("[data-destination-detail]");
  const destinationGuides = {
    lagos: {
      name: "Lagos",
      region: "Southwest Nigeria",
      image:
        "https://images.unsplash.com/photo-1568428494232-9b5b3f2e9b18?auto=format&fit=crop&w=1800&q=85",
      summary:
        "A bold coastal city where creativity, culture, business and nightlife meet the Atlantic.",
      introTitle: "Find energy, culture and coastal escapes.",
      intro:
        "Lagos is Nigeria's busiest cultural and creative hub. Spend time between historic neighbourhoods, contemporary art, music, beaches and restaurants that keep the city moving.",
      best: "Culture, food and city life",
      style: "Urban escapes and coastal weekends",
      places: [
        [
          "Victoria Island",
          "Restaurants, galleries, beaches and the citys modern waterfront energy.",
        ],
        [
          "Lagos Island",
          "Explore historic landmarks, markets and the roots of the city.",
        ],
        [
          "Lekki",
          "Pair a relaxed coastal mood with art, dining and nature experiences.",
        ],
      ],
      experiences: [
        "Taste Nigerian dishes and contemporary cuisine across the city.",
        "Discover live music, galleries, fashion and creative neighbourhoods.",
        "Take a slower day by the coast with a beach or waterfront escape.",
      ],
      tips: [
        "Plan extra time for traffic, especially around peak commuting hours.",
        "Keep a flexible itinerary so you can make room for food, music and local recommendations.",
        "Ask your accommodation team about current transport and neighbourhood guidance.",
      ],
    },
    abuja: {
      name: "Abuja",
      region: "Federal Capital Territory",
      image: "Abujacitygate.jpg",
      summary:
        "A spacious capital shaped by landmarks, hills, gardens, culture and a calm modern rhythm.",
      introTitle: "See the capital from every angle.",
      intro:
        "Abuja brings together national landmarks, open green spaces, galleries, restaurants and a growing creative scene. It is an excellent base for a balanced city break.",
      best: "Landmarks, nature and culture",
      style: "Relaxed city breaks and events",
      places: [
        [
          "Abuja City Gate",
          "Begin with the landmark welcome to the Federal Capital Territory.",
        ],
        [
          "Aso Rock",
          "Take in the distinctive landscape that frames the capital.",
        ],
        [
          "Millennium Park",
          "Slow down among gardens and open spaces in the heart of Abuja.",
        ],
      ],
      experiences: [
        "Visit national landmarks and learn more about Nigerias capital.",
        "Enjoy a relaxed food and coffee trail through the citys neighbourhoods.",
        "Combine a city stay with a nature escape around the surrounding hills.",
      ],
      tips: [
        "Abuja is spread out, so group nearby places together when planning each day.",
        "Book ahead during conferences, expos and major national events.",
        "Choose a trusted driver or transfer service for sightseeing days.",
      ],
    },
    calabar: {
      name: "Calabar",
      region: "Cross River State",
      image:
        "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1800&q=85",
      summary:
        "A welcoming city of heritage, greenery, festivals and easy access to Cross River adventures.",
      introTitle: "Slow down into heritage and nature.",
      intro:
        "Calabar offers a gentler pace, rich cultural history and a green setting. It is a strong choice for travellers who want history, community and outdoor discovery in one trip.",
      best: "Heritage, festivals and nature",
      style: "Cultural stays and soft adventure",
      places: [
        [
          "Old Residency Museum",
          "Connect with the citys colonial-era history and stories.",
        ],
        [
          "Marina Resort",
          "Enjoy waterfront atmosphere and a relaxed city evening.",
        ],
        ["Kwa Falls", "Take a nature-focused outing beyond the city centre."],
      ],
      experiences: [
        "Explore local history, food and cultural storytelling.",
        "Plan a festival-focused trip around Calabars celebrated events.",
        "Pair the city with rainforest, waterfalls or wildlife experiences in Cross River.",
      ],
      tips: [
        "Check seasonal conditions before planning waterfall or rainforest outings.",
        "Leave room for local guides who can add context to heritage sites.",
        "Pack light rain protection for outdoor days.",
      ],
    },
    kano: {
      name: "Kano",
      region: "Northern Nigeria",
      image:
        "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=1800&q=85",
      summary:
        "A historic northern city known for heritage, craft, markets and deep commercial traditions.",
      introTitle: "Walk through living history.",
      intro:
        "Kano is one of Nigerias great historic cities. Its markets, architecture and craft traditions offer a direct connection to the depth and diversity of northern Nigerian culture.",
      best: "Heritage, craft and markets",
      style: "Cultural discovery and city stays",
      places: [
        [
          "Kano City Walls",
          "See traces of the historic city and its long commercial story.",
        ],
        [
          "Kurmi Market",
          "Browse a lively marketplace filled with craft, textiles and local colour.",
        ],
        [
          "Gidan Makama Museum",
          "Spend time with artefacts and stories from Kano and northern Nigeria.",
        ],
      ],
      experiences: [
        "Shop for traditional textiles, leatherwork and locally made crafts.",
        "Taste northern Nigerian dishes and learn the stories behind them.",
        "Travel with a local guide to better understand the citys heritage.",
      ],
      tips: [
        "Dress comfortably and respectfully for cultural and religious sites.",
        "Start market visits earlier in the day for a cooler, calmer experience.",
        "Carry small notes for local purchases and guide services.",
      ],
    },
    plateau: {
      name: "Plateau",
      region: "Central Nigeria",
      image:
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1800&q=85",
      summary:
        "A highland destination of cooler air, dramatic scenery, waterfalls and outdoor discovery.",
      introTitle: "Find a cooler side of Nigeria.",
      intro:
        "Plateau State is made for travellers who enjoy open landscapes and a slower outdoor rhythm. Its highlands create a refreshing contrast to Nigerias larger cities.",
      best: "Scenery, nature and retreats",
      style: "Outdoor breaks and scenic stays",
      places: [
        [
          "Jos",
          "Use the city as a base for highland culture, food and nearby escapes.",
        ],
        [
          "Assop Falls",
          "Enjoy one of the regions memorable natural viewpoints.",
        ],
        [
          "Shere Hills",
          "Look out across striking highland scenery and open skies.",
        ],
      ],
      experiences: [
        "Plan a scenic drive through the Jos highlands.",
        "Take a guided outdoor walk and discover local landscapes.",
        "Combine nature days with craft, culture and relaxed city dining.",
      ],
      tips: [
        "Temperatures can feel cooler, especially in the evenings; pack a light layer.",
        "Use local guidance for hiking and remote viewpoints.",
        "Confirm road and weather conditions before longer day trips.",
      ],
    },
    "port-harcourt": {
      name: "Port Harcourt",
      region: "Rivers State",
      image:
        "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1800&q=85",
      summary:
        "A lively Rivers State gateway connecting business, culture, food and waterfront experiences.",
      introTitle: "Meet the energy of the Niger Delta.",
      intro:
        "Port Harcourt is a confident city with strong business connections, vibrant entertainment and access to the wider Rivers State landscape.",
      best: "City life, food and business",
      style: "Urban stays and regional journeys",
      places: [
        [
          "Port Harcourt City",
          "Explore restaurants, shopping, arts and the citys social rhythm.",
        ],
        [
          "Isaac Boro Park",
          "Find a central green space and a place to pause between city outings.",
        ],
        [
          "Bonny Island",
          "Add a longer coastal journey for beaches, heritage and waterfront scenery.",
        ],
      ],
      experiences: [
        "Taste Rivers State flavours and explore the local food scene.",
        "Connect a business visit with cultural and leisure time.",
        "Plan a guided regional trip for waterfront and heritage experiences.",
      ],
      tips: [
        "Arrange trusted local transport for trips beyond the city centre.",
        "Allow extra time for regional travel and river crossings.",
        "Check event calendars because the citys best experiences often follow what is happening now.",
      ],
    },
  };

  if (destinationDetail) {
    const key =
      new URLSearchParams(window.location.search).get("destination") || "lagos";
    const guide = destinationGuides[key] || destinationGuides.lagos;
    const setText = (selector, value) => {
      const element = document.querySelector(selector);
      if (element) element.textContent = value;
    };
    const heroImage = document.querySelector("[data-detail-hero]");
    if (heroImage)
      heroImage.style.backgroundImage = `linear-gradient(90deg, rgba(4, 27, 17, 0.78), rgba(4, 27, 17, 0.18)), url("${guide.image}")`;
    document.title = `Explore ${guide.name} | Welcome to Nigeria`;
    setText("[data-detail-name]", guide.name);
    setText("[data-detail-region]", guide.region);
    setText("[data-detail-summary]", guide.summary);
    setText("[data-detail-intro-title]", guide.introTitle);
    setText("[data-detail-intro]", guide.intro);
    setText("[data-detail-best]", guide.best);
    setText("[data-detail-style]", guide.style);
    const places = document.querySelector("[data-detail-places]");
    if (places)
      places.innerHTML = guide.places
        .map(
          ([name, description], index) =>
            `<article><span>0${index + 1}</span><h3>${name}</h3><p>${description}</p></article>`,
        )
        .join("");
    const experiences = document.querySelector("[data-detail-experiences]");
    if (experiences)
      experiences.innerHTML = guide.experiences
        .map(
          (experience, index) =>
            `<div><strong>0${index + 1}</strong><p>${experience}</p></div>`,
        )
        .join("");
    const tips = document.querySelector("[data-detail-tips]");
    if (tips)
      tips.innerHTML = guide.tips.map((tip) => `<li>${tip}</li>`).join("");
  }

  /* =====================================================
       TOAST
    ===================================================== */

  const toast = document.getElementById("toast");

  const toastTitle = document.getElementById("toastTitle");

  const toastMessage = document.getElementById("toastMessage");

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

  const enquiryForm = document.getElementById("enquiryForm");

  if (enquiryForm) {
    enquiryForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(enquiryForm);

      const name = formData.get("fullName");

      const email = formData.get("email");

      if (!name || !email) {
        showToast(
          "Missing information",
          "Please complete the required fields.",
        );

        return;
      }

      showToast(
        "Enquiry received",
        "Your enquiry has been prepared successfully. A team member can follow up with you.",
      );

      enquiryForm.reset();
    });
  }

  /* =====================================================
       NEWSLETTER
    ===================================================== */

  const newsletterForm = document.getElementById("newsletterForm");

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const email = newsletterForm.querySelector('input[type="email"]').value;

      if (!email) {
        showToast("Email required", "Please enter your email address.");

        return;
      }

      showToast(
        "Subscription received",
        "Thank you. Your communication preference has been recorded.",
      );

      newsletterForm.reset();
    });
  }

  /* =====================================================
       MODAL FORMS
    ===================================================== */

  const modalForms = document.querySelectorAll(".modal-form");

  modalForms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const modal = form.closest(".modal-overlay");

      let message = "Your request has been received.";

      if (form.classList.contains("event-form")) {
        message = "Your event registration interest has been received.";
      }

      if (form.classList.contains("vendor-form")) {
        message =
          "Your vendor/exhibitor application has been received for review.";
      }

      if (form.classList.contains("sponsor-form")) {
        message = "Your partnership or sponsorship enquiry has been received.";
      }

      closeModal(modal);

      form.reset();

      showToast("Submission received", message);
    });
  });

  /* =====================================================
       COOKIE SYSTEM
    ===================================================== */

  const cookieBanner = document.getElementById("cookieBanner");

  const acceptCookies = document.getElementById("acceptCookies");

  const cookieSettings = document.getElementById("cookieSettings");

  const cookieSettingsBtn = document.getElementById("cookieSettingsBtn");

  const saveCookiePreferences = document.getElementById(
    "saveCookiePreferences",
  );

  const cookieModal = document.getElementById("cookieModal");

  function showCookieBanner() {
    if (!cookieBanner) return;

    cookieBanner.classList.add("show");
  }

  function hideCookieBanner() {
    if (!cookieBanner) return;

    cookieBanner.classList.remove("show");
  }

  function saveCookieChoice(choice) {
    localStorage.setItem("wtn_cookie_preferences", JSON.stringify(choice));
  }

  function getCookieChoice() {
    const saved = localStorage.getItem("wtn_cookie_preferences");

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
        marketing: true,
      });

      hideCookieBanner();

      showToast("Cookies accepted", "Your cookie preferences have been saved.");
    });
  }

  function openCookieSettings() {
    hideCookieBanner();

    openModal("cookieModal");
  }

  if (cookieSettings) {
    cookieSettings.addEventListener("click", openCookieSettings);
  }

  if (cookieSettingsBtn) {
    cookieSettingsBtn.addEventListener("click", openCookieSettings);
  }

  if (saveCookiePreferences) {
    saveCookiePreferences.addEventListener("click", () => {
      const analytics = document.getElementById("analyticsCookies").checked;

      const marketing = document.getElementById("marketingCookies").checked;

      saveCookieChoice({
        essential: true,
        analytics,
        marketing,
      });

      closeModal(cookieModal);

      showToast(
        "Preferences saved",
        "Your cookie preferences have been updated.",
      );
    });
  }

  /* =====================================================
       LOAD SAVED COOKIE SETTINGS
    ===================================================== */

  const savedCookies = getCookieChoice();

  if (savedCookies) {
    const analyticsCheckbox = document.getElementById("analyticsCookies");

    const marketingCheckbox = document.getElementById("marketingCookies");

    if (analyticsCheckbox) {
      analyticsCheckbox.checked = !!savedCookies.analytics;
    }

    if (marketingCheckbox) {
      marketingCheckbox.checked = !!savedCookies.marketing;
    }
  }

  /* =====================================================
       BOOKING PORTAL
    ===================================================== */

  const bookingTabs = document.querySelectorAll(".booking-tab");
  const bookingPanels = document.querySelectorAll(".booking-panel");

  bookingTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.bookingTab;

      bookingTabs.forEach((item) =>
        item.classList.toggle("active", item === tab),
      );
      bookingPanels.forEach((panel) =>
        panel.classList.toggle("active", panel.dataset.panel === target),
      );
    });
  });

  const todayDateString = () => new Date().toISOString().split("T")[0];

  [
    document.getElementById("flightDepartureDate"),
    document.getElementById("flightReturnDate"),
    document.getElementById("hotelCheckIn"),
    document.getElementById("hotelCheckOut"),
    document.getElementById("transferDate"),
  ].forEach((input) => {
    if (input) input.min = todayDateString();
  });

  function setFlightReturnVisibility() {
    const returnInput = document.getElementById("flightReturnDate");
    const tripRadios = document.querySelectorAll('input[name="tripType"]');

    if (!returnInput) return;

    const roundTripSelected = [...tripRadios].some(
      (radio) => radio.checked && radio.value === "round-trip",
    );
    returnInput.disabled = !roundTripSelected;
    returnInput.required = roundTripSelected;
    returnInput.closest(".form-group").style.opacity = roundTripSelected
      ? "1"
      : "0.6";
  }

  document.querySelectorAll('input[name="tripType"]').forEach((radio) => {
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
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || data.status === "validation_error") {
        showValidationErrors(
          containerId,
          data.errors || [data.message || "Unable to complete this search."],
        );
        return null;
      }

      if (data.status === "api_not_configured") {
        renderEmptyState(
          containerId,
          "API not configured",
          data.message ||
            "Connect a real provider to enable live search results.",
        );
        return null;
      }

      return data;
    } catch (error) {
      renderEmptyState(
        containerId,
        "Unable to connect",
        "The provider connection is unavailable right now. Please try again later.",
      );
      return null;
    }
  }

  function createResultCard(item, serviceType) {
    const priceValue =
      item.price || item.totalPrice || item.estimatedPrice || 0;
    const currency = item.currency || "NGN";
    const priceLabel = new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency,
    }).format(priceValue);

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

  document
    .getElementById("flightSearchForm")
    ?.addEventListener("submit", async (event) => {
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
        cabinClass: formData.get("cabinClass") || "economy",
      };

      const flightResults = document.getElementById("flightResults");
      flightResults.innerHTML =
        '<div class="booking-empty-state"><h4>Searching...</h4><p>Please wait while we validate your trip details.</p></div>';

      const response = await searchTravelApi(
        "/api/flights/search",
        payload,
        "flightResults",
        "Flight search",
      );
      if (!response) return;

      const items = response.results?.length
        ? response.results
        : [
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
              currency: "NGN",
            },
          ];

      flightResults.innerHTML = items
        .map((item) => createResultCard(item, "flight"))
        .join("");

      flightResults.querySelectorAll(".select-booking").forEach((button) => {
        button.addEventListener("click", () => {
          const selected = {
            service: "Flight",
            title: "Flight booking",
            summary: `${payload.origin} to ${payload.destination} • ${payload.departureDate}`,
            amount: items[0]?.price || 0,
            currency: items[0]?.currency || "NGN",
          };
          openBookingCheckout(selected);
        });
      });
    });

  document
    .getElementById("hotelSearchForm")
    ?.addEventListener("submit", async (event) => {
      event.preventDefault();

      const form = event.currentTarget;
      const formData = new FormData(form);
      const payload = {
        destination: formData.get("destination"),
        checkIn: formData.get("checkIn"),
        checkOut: formData.get("checkOut"),
        rooms: Number(formData.get("rooms") || 1),
        adults: Number(formData.get("adults") || 2),
        children: Number(formData.get("children") || 0),
      };

      const hotelResults = document.getElementById("hotelResults");
      hotelResults.innerHTML =
        '<div class="booking-empty-state"><h4>Searching...</h4><p>Please wait while we validate the accommodation options.</p></div>';

      const response = await searchTravelApi(
        "/api/hotels/search",
        payload,
        "hotelResults",
        "Accommodation search",
      );
      if (!response) return;

      const items = response.results?.length
        ? response.results
        : [
            {
              name: "Accommodation provider pending",
              location: payload.destination,
              roomType: "Standard room",
              rating: "Provider pending",
              facilities: "Wi-Fi, breakfast, parking",
              price: 0,
              currency: "NGN",
            },
          ];

      hotelResults.innerHTML = items
        .map((item) => createResultCard(item, "hotel"))
        .join("");

      hotelResults.querySelectorAll(".select-booking").forEach((button) => {
        button.addEventListener("click", () => {
          const selected = {
            service: "Accommodation",
            title: "Hotel booking",
            summary: `${payload.destination} • ${payload.checkIn} to ${payload.checkOut}`,
            amount: items[0]?.price || 0,
            currency: items[0]?.currency || "NGN",
          };
          openBookingCheckout(selected);
        });
      });
    });

  document
    .getElementById("transferSearchForm")
    ?.addEventListener("submit", async (event) => {
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
        vehicleType: formData.get("vehicleType") || "standard",
      };

      const transferResults = document.getElementById("transferResults");
      transferResults.innerHTML =
        '<div class="booking-empty-state"><h4>Searching...</h4><p>Please wait while we validate the transfer options.</p></div>';

      const response = await searchTravelApi(
        "/api/transfers/search",
        payload,
        "transferResults",
        "Transfer search",
      );
      if (!response) return;

      const items = response.results?.length
        ? response.results
        : [
            {
              provider: "Transfer provider pending",
              vehicleType: payload.vehicleType,
              capacity: "4 passengers",
              pickupLocation: payload.pickupLocation,
              dropoffLocation: payload.dropoffLocation,
              estimatedDuration: "30–45 mins",
              price: 0,
              currency: "NGN",
            },
          ];

      transferResults.innerHTML = items
        .map((item) => createResultCard(item, "transfer"))
        .join("");

      transferResults.querySelectorAll(".select-booking").forEach((button) => {
        button.addEventListener("click", () => {
          const selected = {
            service: "Airport Transfer",
            title: "Transfer booking",
            summary: `${payload.pickupLocation} to ${payload.dropoffLocation} • ${payload.date}`,
            amount: items[0]?.price || 0,
            currency: items[0]?.currency || "NGN",
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

  document
    .getElementById("customerBookingForm")
    ?.addEventListener("submit", (event) => {
      event.preventDefault();

      const form = event.currentTarget;
      const formData = new FormData(form);
      const name = formData.get("customerName") || "Guest Traveller";
      const email = formData.get("customerEmail") || "";
      const phone = formData.get("customerPhone") || "";
      const bookingReference = `WTN-${Date.now().toString(36).toUpperCase()}`;

      if (!name || !email || !phone) {
        showToast(
          "Booking details incomplete",
          "Please complete all required customer details before continuing.",
        );
        return;
      }

      const confirmation = document.getElementById("bookingConfirmation");
      if (!confirmation) return;

      document.getElementById("confirmationReference").textContent =
        bookingReference;
      document.getElementById("confirmationCustomer").textContent = name;
      document.getElementById("confirmationService").textContent =
        document.getElementById("selectedServiceBadge").textContent;
      document.getElementById("confirmationStatus").textContent =
        "Awaiting provider confirmation";

      confirmation.classList.remove("hidden");
      confirmation.scrollIntoView({ behavior: "smooth", block: "start" });
      showToast(
        "Booking request ready",
        "Your details have been saved for secure provider review.",
      );
      form.reset();
    });

  /* =====================================================
       HEADER SHADOW ON SCROLL
    ===================================================== */

  const header = document.getElementById("header");

  window.addEventListener("scroll", () => {
    if (!header) return;

    if (window.scrollY > 20) {
      header.style.boxShadow = "0 8px 25px rgba(0,0,0,0.07)";
    } else {
      header.style.boxShadow = "none";
    }
  });

  /* =====================================================
       DATE INPUT — DON'T ALLOW PAST DATES
    ===================================================== */

  const travelDate = document.getElementById("travelDate");

  if (travelDate) {
    const today = new Date().toISOString().split("T")[0];

    travelDate.setAttribute("min", today);
  }

  /* =====================================================
       SCROLL REVEAL
    ===================================================== */

  const revealElements = document.querySelectorAll(
    ".destination-card, .service-card, .package-card, .why-card, .refund-card",
  );

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";

          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
    },
  );

  revealElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease";

    revealObserver.observe(element);
  });

  /* =====================================================
       SMOOTH INTERNAL LINKS
    ===================================================== */

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (
        targetId === "#" ||
        targetId === "#privacy" ||
        targetId === "#terms"
      ) {
        return;
      }

      const target = document.querySelector(targetId);

      if (target) {
        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  /* =====================================================
       PREVENT DEMO SOCIAL LINKS FROM JUMPING
    ===================================================== */

  document.querySelectorAll(".social-links a[href='#']").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      showToast(
        "Social media",
        "Connect your official social-media links here.",
      );
    });
  });

  /* =====================================================
       FRONTEND AUTHENTICATION DEMO
    ===================================================== */

  const authProfileKey = "wtn_demo_profile";
  const authSessionKey = "wtn_demo_session";

  const getAuthProfile = () => {
    try {
      return JSON.parse(localStorage.getItem(authProfileKey) || "null");
    } catch {
      return null;
    }
  };

  const getAuthSession = () => {
    try {
      return JSON.parse(
        localStorage.getItem(authSessionKey) ||
          sessionStorage.getItem(authSessionKey) ||
          "null",
      );
    } catch {
      return null;
    }
  };

  const setAuthMessage = (element, message, type = "error") => {
    if (!element) return;
    element.textContent = message;
    element.className = `auth-message ${type}`;
    element.hidden = !message;
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) =>
    password.length >= 8 && /[A-Za-z]/.test(password) && /\d/.test(password);

  const updatePasswordStrength = (input, meter, label) => {
    if (!input || !meter || !label) return;
    const password = input.value;
    const score = [
      password.length >= 8,
      /[A-Z]/.test(password),
      /\d/.test(password),
      /[^A-Za-z0-9]/.test(password),
    ].filter(Boolean).length;
    const levels = ["", "Weak", "Fair", "Good", "Strong"];
    meter.dataset.level = score;
    label.textContent = password ? `Password strength: ${levels[score]}` : "";
  };

  const showAuthProfile = (profile) => {
    document.querySelectorAll("[data-auth-name]").forEach((element) => {
      element.textContent = profile
        ? `${profile.firstName} ${profile.lastName}`
        : "Guest traveller";
    });
    document.querySelectorAll("[data-auth-email]").forEach((element) => {
      element.textContent = profile?.email || "No account is signed in.";
    });
    document.querySelectorAll("[data-auth-phone]").forEach((element) => {
      element.textContent = profile?.phone || "Not provided";
    });
  };

  const initAuthNavigation = () => {
    const navMenu = document.getElementById("navMenu");
    if (!navMenu || navMenu.querySelector(".auth-nav-group")) return;

    const profile = getAuthProfile();
    const session = getAuthSession();
    const authGroup = document.createElement("span");
    authGroup.className = "auth-nav-group";
    authGroup.innerHTML = session
      ? `<a href="account.html" class="nav-link auth-account-link">Account</a><button type="button" class="nav-auth-button" data-auth-logout>Log out</button>`
      : `<a href="signin.html" class="nav-cta auth-signin-link">Sign in</a><a href="signup.html" class="nav-cta auth-signup-link">Sign up</a>`;
    navMenu.append(authGroup);
    authGroup
      .querySelector("[data-auth-logout]")
      ?.addEventListener("click", () => {
        localStorage.removeItem(authSessionKey);
        sessionStorage.removeItem(authSessionKey);
        window.location.href = "signin.html?logout=1";
      });
    showAuthProfile(profile);
  };

  const initAuthForms = () => {
    document.querySelectorAll("[data-toggle-password]").forEach((button) => {
      button.addEventListener("click", () => {
        const input = document.getElementById(button.dataset.togglePassword);
        if (!input) return;
        const visible = input.type === "text";
        input.type = visible ? "password" : "text";
        button.textContent = visible ? "Show" : "Hide";
        button.setAttribute("aria-pressed", String(!visible));
      });
    });

    const passwordInput =
      document.getElementById("signupPassword") ||
      document.getElementById("resetPassword");
    const strengthMeter = document.getElementById("passwordStrengthMeter");
    const strengthLabel = document.getElementById("passwordStrengthLabel");
    passwordInput?.addEventListener("input", () =>
      updatePasswordStrength(passwordInput, strengthMeter, strengthLabel),
    );

    document
      .getElementById("signupForm")
      ?.addEventListener("submit", (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const data = new FormData(form);
        const profile = {
          firstName: String(data.get("firstName") || "").trim(),
          lastName: String(data.get("lastName") || "").trim(),
          email: String(data.get("email") || "")
            .trim()
            .toLowerCase(),
          phone: String(data.get("phone") || "").trim(),
        };
        const password = String(data.get("password") || "");
        const confirmation = String(data.get("confirmPassword") || "");
        const message = document.getElementById("signupMessage");
        if (
          !profile.firstName ||
          !profile.lastName ||
          !validateEmail(profile.email)
        )
          return setAuthMessage(
            message,
            "Please enter your first name, last name, and a valid email address.",
          );
        if (!validatePassword(password))
          return setAuthMessage(
            message,
            "Password must be at least 8 characters and include a letter and a number.",
          );
        if (password !== confirmation)
          return setAuthMessage(message, "Passwords do not match.");
        if (!data.get("terms"))
          return setAuthMessage(
            message,
            "Please agree to the Terms & Conditions and Privacy Policy.",
          );
        localStorage.setItem(authProfileKey, JSON.stringify(profile));
        setAuthMessage(
          message,
          "Your account details are ready. Connect this form to your signup service to complete registration.",
          "success",
        );
        setTimeout(() => {
          window.location.href = "signin.html";
        }, 900);
      });

    document
      .getElementById("signinForm")
      ?.addEventListener("submit", (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const data = new FormData(form);
        const profile = getAuthProfile();
        const email = String(data.get("email") || "")
          .trim()
          .toLowerCase();
        const message = document.getElementById("signinMessage");
        if (!validateEmail(email) || !data.get("password"))
          return setAuthMessage(
            message,
            "Enter a valid email address and password.",
          );
        if (!profile || profile.email !== email)
          return setAuthMessage(
            message,
            "No account matches this email. Please check your details or create an account first.",
          );
        const session = {
          email: profile.email,
          signedInAt: new Date().toISOString(),
        };
        localStorage.removeItem(authSessionKey);
        sessionStorage.removeItem(authSessionKey);
        (data.get("remember") ? localStorage : sessionStorage).setItem(
          authSessionKey,
          JSON.stringify(session),
        );
        setAuthMessage(
          message,
          "Sign-in successful. Redirecting to your account...",
          "success",
        );
        setTimeout(() => {
          window.location.href = "account.html";
        }, 700);
      });

    document
      .getElementById("forgotForm")
      ?.addEventListener("submit", (event) => {
        event.preventDefault();
        const email = String(
          new FormData(event.currentTarget).get("email") || "",
        ).trim();
        const message = document.getElementById("forgotMessage");
        if (!validateEmail(email))
          return setAuthMessage(message, "Please enter a valid email address.");
        setAuthMessage(
          message,
          "Your password recovery request has been received. Continue to reset your password.",
          "success",
        );
        document.getElementById("resetLink")?.removeAttribute("hidden");
      });

    document
      .getElementById("resetForm")
      ?.addEventListener("submit", (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const message = document.getElementById("resetMessage");
        const password = String(data.get("password") || "");
        if (!validatePassword(password))
          return setAuthMessage(
            message,
            "Password must be at least 8 characters and include a letter and a number.",
          );
        if (password !== String(data.get("confirmPassword") || ""))
          return setAuthMessage(message, "Passwords do not match.");
        setAuthMessage(
          message,
          "Your password details have been validated. Your account service will apply the new password.",
          "success",
        );
      });

    const accountPage = document.querySelector("[data-account-page]");
    if (accountPage && !getAuthSession()) {
      document.getElementById("accountSignedOut")?.removeAttribute("hidden");
      document.getElementById("accountContent")?.setAttribute("hidden", "true");
    }
    if (accountPage && getAuthSession()) showAuthProfile(getAuthProfile());
    document
      .querySelector("[data-account-logout]")
      ?.addEventListener("click", () => {
        localStorage.removeItem(authSessionKey);
        sessionStorage.removeItem(authSessionKey);
        window.location.href = "signin.html?logout=1";
      });
  };

  initAuthNavigation();
  initAuthForms();

  /* =====================================================
       CONSOLE MESSAGE
    ===================================================== */

  console.log("Welcome to Nigeria frontend loaded successfully.");
});
