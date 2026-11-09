/**
 * ZIPPACK — SCHOOL BAG & BACKPACK STORE — MAIN JAVASCRIPT (ES6+)
 * Frontend interactions: Product Catalog (by Age & Type), Category Filters,
 * Search, Sorting, Enquiry Cart (localStorage), Enquire Page Prefill & Validation,
 * Brand FAQ Accordion, Sticky Header & Responsive Mobile Navigation.
 */

'use strict';

/* ==========================================================================
   1. SAMPLE PRODUCT CATALOG DATA (20 BACKPACKS ACROSS 4 AGE & TYPE CATEGORIES)
   ========================================================================== */
const PRODUCT_CATALOG = [
  // CATEGORY 1 — KIDS (AGES 3-7) (5 Products)
  {
    id: 'kid-01',
    name: 'DinoRoar 3D Toddler Backpack',
    category: 'Kids (Ages 3-7)',
    diet: 'veg',
    badgeLabel: 'Lightweight',
    packSize: '12L • Ages 3–5',
    price: 799,
    featured: true,
    image: 'assets/images/prod-kid-01.webp',
    homeImage: 'assets/images/h1-feat-1.webp',
    description: 'Playful 3D dinosaur hardshell mini backpack with breathable mesh shoulder straps, anti-slip chest clip and wipe-clean lining for preschool adventures.'
  },
  {
    id: 'kid-02',
    name: 'StarUnicorn Pastel School Bag',
    category: 'Kids (Ages 3-7)',
    diet: 'nonveg',
    badgeLabel: 'Water-Resistant',
    packSize: '15L • Ages 4–7',
    price: 899,
    featured: true,
    image: 'assets/images/prod-kid-02.webp',
    homeImage: 'assets/images/h1-feat-2.webp',
    description: 'Colorful rainbow-pastel junior school bag with twin elastic water bottle pockets, easy-pull chunky zippers and a matching clip-on pencil pouch.'
  },
  {
    id: 'kid-03',
    name: 'SpaceExplorer Junior Daypack',
    category: 'Kids (Ages 3-7)',
    diet: 'veg',
    badgeLabel: 'Lightweight',
    packSize: '14L • Ages 4–7',
    price: 849,
    featured: true,
    image: 'assets/images/prod-kid-03.webp',
    homeImage: 'assets/images/h1-feat-3.webp',
    description: 'Glow-accented astronaut print kindergarten backpack featuring cushioned back support, custom name-tag window and a roomy snack box compartment.'
  },
  {
    id: 'kid-04',
    name: 'SafariBuddy Plush Preschool Pack',
    category: 'Kids (Ages 3-7)',
    diet: 'veg',
    badgeLabel: 'Ultra-Soft',
    packSize: '10L • Ages 3–5',
    price: 699,
    featured: false,
    image: 'assets/images/prod-kid-04.webp',
    description: 'Featherlight ergonomically contoured toddler bag with soft-touch animal ears, sternum buckle and quick-access front pocket for crayons and wipes.'
  },
  {
    id: 'kid-05',
    name: 'ColorPop Mini Roll-Top Bag',
    category: 'Kids (Ages 3-7)',
    diet: 'nonveg',
    badgeLabel: 'Water-Resistant',
    packSize: '16L • Ages 5–7',
    price: 949,
    featured: false,
    image: 'assets/images/prod-kid-05.webp',
    description: 'Bright color-block primary starter pack with 360-degree reflective safety strips, magnetic roll-top clasp and reinforced base for early grade readers.'
  },

  // CATEGORY 2 — SCHOOL (AGES 8-13) (5 Products)
  {
    id: 'sch-01',
    name: 'ErgoSpine Pro Orthopedic Bag',
    category: 'School (Ages 8-13)',
    diet: 'veg',
    badgeLabel: 'Ergonomic',
    packSize: '24L • Ages 8–12',
    price: 1499,
    featured: false,
    image: 'assets/images/prod-sch-01.webp',
    description: 'Multi-chamber primary & middle school bookbag engineered with S-curve padded straps and weight-distributing lumbar cushions for heavy textbooks.'
  },
  {
    id: 'sch-02',
    name: 'GlideWheel 6-Wheel Trolley Bag',
    category: 'School (Ages 8-13)',
    diet: 'nonveg',
    badgeLabel: 'Stair-Climber',
    packSize: '28L • Ages 8–13',
    price: 2199,
    featured: true,
    image: 'assets/images/prod-sch-02.webp',
    homeImage: 'assets/images/h1-feat-4.webp',
    description: 'Detachable stair-climbing 6-wheel trolley school backpack with aircraft-grade aluminum handle, built-in rain cover and 3 spacious A4 book compartments.'
  },
  {
    id: 'sch-03',
    name: 'AeroMesh 3-Compartment Bookbag',
    category: 'School (Ages 8-13)',
    diet: 'veg',
    badgeLabel: 'Ergonomic',
    packSize: '26L • Ages 9–13',
    price: 1299,
    featured: false,
    image: 'assets/images/prod-sch-03.webp',
    description: 'Breathable honeycomb-back middle school pack with dedicated lunchbox sleeve, multi-slot stationery organizer and side load-compression straps.'
  },
  {
    id: 'sch-04',
    name: 'BrightWave Waterproof School Pack',
    category: 'School (Ages 8-13)',
    diet: 'nonveg',
    badgeLabel: 'Rain Cover',
    packSize: '25L • Ages 8–12',
    price: 1350,
    featured: false,
    image: 'assets/images/prod-sch-04.webp',
    description: 'High-density 900D ripstop school backpack with fold-out neon rain cover, high-visibility night safety piping and dual steel-bottle side holders.'
  },
  {
    id: 'sch-05',
    name: 'ScholarMax 4-in-1 Combo Bag Set',
    category: 'School (Ages 8-13)',
    diet: 'veg',
    badgeLabel: '4-in-1 Combo',
    packSize: '27L • Ages 9–13',
    price: 1699,
    featured: false,
    image: 'assets/images/prod-sch-05.webp',
    description: 'Complete back-to-school value bundle including a 27L ergonomic backpack, insulated thermal lunch tote, zip pencil case and bottle carrier.'
  },

  // CATEGORY 3 — TEENS & COLLEGE (5 Products)
  {
    id: 'col-01',
    name: 'UrbanTech 16" Laptop Campus Pack',
    category: 'Teens & College',
    diet: 'nonveg',
    badgeLabel: '16" Laptop Safe',
    packSize: '30L • Ages 14+',
    price: 1899,
    featured: true,
    image: 'assets/images/prod-col-01.webp',
    homeImage: 'assets/images/h1-feat-5.webp',
    description: 'Sleek dual-tone campus backpack with shockproof EVA 16-inch laptop vault, external USB charging port and hidden anti-theft back passport pocket.'
  },
  {
    id: 'col-02',
    name: 'NeoGrid High School Organizer Bag',
    category: 'Teens & College',
    diet: 'veg',
    badgeLabel: 'Ergonomic',
    packSize: '28L • Ages 13–18',
    price: 1599,
    featured: false,
    image: 'assets/images/prod-col-02.webp',
    description: 'Structured high-capacity backpack for teens featuring a fleece-lined tablet sleeve, power-bank cable organizer, key clip and luggage trolley strap.'
  },
  {
    id: 'col-03',
    name: 'CanvasCraft Vintage Roll-Top Pack',
    category: 'Teens & College',
    diet: 'nonveg',
    badgeLabel: '15.6" Laptop',
    packSize: '29L • Ages 15+',
    price: 1750,
    featured: false,
    image: 'assets/images/prod-col-03.webp',
    description: 'Heavyweight water-repellent waxed canvas college rucksack with magnetic strap buckles, padded 15.6" laptop sleeve and quick side-zip access.'
  },
  {
    id: 'col-04',
    name: 'CyberGuard Anti-Theft Commuter Bag',
    category: 'Teens & College',
    diet: 'nonveg',
    badgeLabel: 'Anti-Theft',
    packSize: '26L • Ages 16+',
    price: 2099,
    featured: false,
    image: 'assets/images/prod-col-04.webp',
    description: 'Cut-resistant college & commuter backpack with lockable main zippers, RFID-shielded metro card slot and 180-degree flat-lay tech compartment.'
  },
  {
    id: 'col-05',
    name: 'PrismPop Colorblock Teen Daypack',
    category: 'Teens & College',
    diet: 'veg',
    badgeLabel: 'Lightweight',
    packSize: '25L • Ages 13–19',
    price: 1399,
    featured: false,
    image: 'assets/images/prod-col-05.webp',
    description: 'Bold multi-color streetwear backpack crafted for high school and college daily carry with padded sunglass pocket, binder divider and reinforced base.'
  },

  // CATEGORY 4 — SPORTS & DAYPACKS (5 Products)
  {
    id: 'spt-01',
    name: 'HydroSprint Sports & Gym Backpack',
    category: 'Sports & Daypacks',
    diet: 'veg',
    badgeLabel: 'Shoe Tunnel',
    packSize: '32L • All Ages',
    price: 1650,
    featured: true,
    image: 'assets/images/prod-spt-01.webp',
    homeImage: 'assets/images/h1-feat-6.webp',
    description: 'Athletic training backpack with a ventilated bottom shoe tunnel, waterproof wet-gear pocket and expandable front cord for footballs or helmets.'
  },
  {
    id: 'spt-02',
    name: 'TrailBlazer 35L Excursion Rucksack',
    category: 'Sports & Daypacks',
    diet: 'nonveg',
    badgeLabel: 'All-Weather',
    packSize: '35L • Ages 12+',
    price: 2299,
    featured: false,
    image: 'assets/images/prod-spt-02.webp',
    description: 'Rugged outdoor camp and school field-trip rucksack with adjustable sternum and hip belts, hydration sleeve and high-tear ripstop shell.'
  },
  {
    id: 'spt-03',
    name: 'FlexiCincher Swim & PE Sackpack',
    category: 'Sports & Daypacks',
    diet: 'nonveg',
    badgeLabel: 'Waterproof',
    packSize: '18L • All Ages',
    price: 599,
    featured: false,
    image: 'assets/images/prod-spt-03.webp',
    description: 'Heavy-duty water-repellent Oxford drawstring gym bag with wide comfort shoulder cords and zippered front valuables pocket for PE and swim club.'
  },
  {
    id: 'spt-04',
    name: 'ThermoCarry Insulated Lunch Pack',
    category: 'Sports & Daypacks',
    diet: 'veg',
    badgeLabel: 'Thermal Lined',
    packSize: '10L • All Ages',
    price: 649,
    featured: false,
    image: 'assets/images/prod-spt-04.webp',
    description: 'Leak-proof PEVA thermal insulated lunch bag & mini backpack with adjustable shoulder strap, inner cutlery mesh pocket and wide dual-zip opening.'
  },
  {
    id: 'spt-05',
    name: 'AeroFold Packable Tuition Daypack',
    category: 'Sports & Daypacks',
    diet: 'veg',
    badgeLabel: 'Foldable',
    packSize: '22L • Ages 10+',
    price: 999,
    featured: false,
    image: 'assets/images/prod-spt-05.webp',
    description: 'Ultralight daypack that folds neatly into its own inner pouch—ideal for after-school tuition classes, museum field trips and weekend cycling.'
  }
];

const CART_STORAGE_KEY = 'zippack_bag_enquiry_cart_v1';

/* ==========================================================================
   2. ENQUIRY CART STATE MANAGEMENT (LOCALSTORAGE)
   ========================================================================== */
function getEnquiryCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    return [];
  }
}

function saveEnquiryCart(cart) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (err) {
    // Fallback if storage is restricted
  }
  updateAllCartUI();
}

function addToEnquiryCart(productId, btnElement = null) {
  const product = PRODUCT_CATALOG.find(item => item.id === productId);
  if (!product) return;

  const cart = getEnquiryCart();
  const existingIndex = cart.findIndex(item => item.id === productId);

  if (existingIndex > -1) {
    cart[existingIndex].qty += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      category: product.category,
      packSize: product.packSize,
      price: product.price,
      qty: 1
    });
  }

  saveEnquiryCart(cart);

  // Pulse badge animation
  document.querySelectorAll('.cart-count-badge').forEach(badge => {
    badge.classList.remove('pulse');
    void badge.offsetWidth;
    badge.classList.add('pulse');
    setTimeout(() => badge.classList.remove('pulse'), 350);
  });

  // Button visual feedback
  if (btnElement) {
    const originalHTML = btnElement.innerHTML;
    btnElement.classList.add('is-added');
    btnElement.innerHTML = '<i class="bi bi-check2-circle"></i> Added to Enquiry';
    setTimeout(() => {
      btnElement.classList.remove('is-added');
      btnElement.innerHTML = originalHTML;
    }, 1200);
  }
}

function updateCartItemQty(productId, delta) {
  let cart = getEnquiryCart();
  const idx = cart.findIndex(item => item.id === productId);
  if (idx === -1) return;

  cart[idx].qty += delta;
  if (cart[idx].qty <= 0) {
    cart.splice(idx, 1);
  }
  saveEnquiryCart(cart);
}

function removeCartItem(productId) {
  const cart = getEnquiryCart().filter(item => item.id !== productId);
  saveEnquiryCart(cart);
}

function clearEnquiryCart() {
  saveEnquiryCart([]);
}

function getCartTotals() {
  const cart = getEnquiryCart();
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  return { cart, totalItems, totalAmount };
}

/* ==========================================================================
   3. RENDER ENQUIRY CART DRAWER & INLINE SUMMARY
   ========================================================================== */
function updateAllCartUI() {
  const { cart, totalItems, totalAmount } = getCartTotals();

  // Update header badges
  document.querySelectorAll('.cart-count-badge').forEach(badge => {
    badge.textContent = totalItems;
    badge.setAttribute('aria-label', `${totalItems} bags in enquiry cart`);
  });

  // Update slide-over drawer body
  const drawerBody = document.getElementById('enquiryCartBody');
  const drawerTotal = document.getElementById('enquiryCartTotal');
  const drawerCount = document.getElementById('enquiryCartCount');
  const clearBtn = document.getElementById('clearEnquiryCartBtn');
  const sendBtn = document.getElementById('sendEnquiryCartBtn');

  if (drawerCount) {
    drawerCount.textContent = `${totalItems} ${totalItems === 1 ? 'Bag' : 'Bags'}`;
  }
  if (drawerTotal) {
    drawerTotal.textContent = `₹${totalAmount.toLocaleString('en-IN')}`;
  }

  if (drawerBody) {
    if (cart.length === 0) {
      drawerBody.innerHTML = `
        <div class="text-center py-5">
          <div class="mb-3" style="font-size: 2.5rem; color: var(--mint-secondary);">
            <i class="bi bi-backpack2"></i>
          </div>
          <h4 class="mb-2">Your Bag Enquiry List is Empty</h4>
          <p class="small mb-4">Add your favourite school bags, orthopedic bookbags, laptop packs or sports daypacks to request back-to-school deal pricing and availability.</p>
          <a href="products.html" class="btn-brand-primary btn-sm">Browse Backpacks</a>
        </div>
      `;
      if (clearBtn) clearBtn.disabled = true;
      if (sendBtn) sendBtn.classList.add('disabled');
    } else {
      if (clearBtn) clearBtn.disabled = false;
      if (sendBtn) sendBtn.classList.remove('disabled');
      drawerBody.innerHTML = cart.map(item => `
        <div class="cart-item-row" data-cart-id="${item.id}">
          <div class="cart-item-info">
            <div class="cart-item-title">${item.name}</div>
            <div class="cart-item-meta">${item.packSize} &bull; ₹${item.price} / bag (Deal)</div>
          </div>
          <div class="cart-qty-controls" role="group" aria-label="Quantity controls for ${item.name}">
            <button type="button" class="qty-btn" data-action="dec" data-id="${item.id}" aria-label="Decrease quantity of ${item.name}">&minus;</button>
            <span class="qty-val">${item.qty}</span>
            <button type="button" class="qty-btn" data-action="inc" data-id="${item.id}" aria-label="Increase quantity of ${item.name}">&#43;</button>
          </div>
          <div class="text-end" style="min-width: 58px; font-family: var(--font-heading); font-weight: 700; font-size: 0.9rem;">
            ₹${item.price * item.qty}
          </div>
          <button type="button" class="cart-remove-btn" data-action="remove" data-id="${item.id}" aria-label="Remove ${item.name} from enquiry list" title="Remove bag">
            <i class="bi bi-trash3"></i>
          </button>
        </div>
      `).join('');
    }
  }

  // Update inline enquiry bar on products.html if present
  const inlineBar = document.getElementById('inlineEnquirySummaryBar');
  const inlineSummaryText = document.getElementById('inlineEnquirySummaryText');
  if (inlineBar && inlineSummaryText) {
    if (totalItems > 0) {
      inlineBar.hidden = false;
      inlineSummaryText.innerHTML = `<strong>${totalItems} ${totalItems === 1 ? 'bag' : 'bags'}</strong> selected across <strong>${cart.length} ${cart.length === 1 ? 'model' : 'models'}</strong> &bull; Est. Deal Total: <strong>₹${totalAmount.toLocaleString('en-IN')}</strong> <span class="text-muted small">(Back-to-School Deal)</span>`;
    } else {
      inlineBar.hidden = true;
    }
  }
}

/* ==========================================================================
   4. PRODUCT CARD HTML GENERATOR
   ========================================================================== */
function createProductCardHTML(product, useHomeImage = false) {
  const isVeg = product.diet === 'veg';
  const badgeText = product.badgeLabel || (isVeg ? 'Ergonomic' : 'Water-Resistant');
  const dietClass = isVeg ? 'is-veg' : 'is-nonveg';
  const imgSrc = (useHomeImage && product.homeImage) ? product.homeImage : product.image;

  return `
    <article class="product-card" data-product-id="${product.id}" data-category="${product.category}">
      <div class="product-card-media">
        <img src="${imgSrc}" alt="${product.name} - ${product.category} (${product.packSize})" loading="lazy" width="600" height="450">
        <span class="product-category-tag">${product.category}</span>
        <span class="diet-indicator ${dietClass}" title="${badgeText} Feature">
          <span class="diet-dot" aria-hidden="true"></span>
          ${badgeText}
        </span>
      </div>
      <div class="product-card-body">
        <div>
          <h3 class="product-card-title">${product.name}</h3>
          <p class="product-card-desc">${product.description}</p>
        </div>
        <div>
          <div class="product-meta-row">
            <span class="product-pack-size"><i class="bi bi-backpack me-1"></i>${product.packSize}</span>
            <div class="product-price-wrap">
              <span class="product-price">₹${product.price}</span>
              <span class="demo-price-tag">Back-to-School Deal</span>
            </div>
          </div>
          <button type="button" class="btn-brand-primary btn-add-enquiry" data-add-enquiry="${product.id}" aria-label="Add ${product.name} to Enquiry">
            <i class="bi bi-plus-circle"></i> Add to Enquiry
          </button>
        </div>
      </div>
    </article>
  `;
}

/* ==========================================================================
   5. HOME PAGE FEATURED PRODUCTS INITIALIZATION
   ========================================================================== */
function initHomeFeaturedProducts() {
  const featuredContainer = document.getElementById('homeFeaturedProductsGrid');
  if (!featuredContainer) return;

  const featuredList = PRODUCT_CATALOG.filter(item => item.featured).slice(0, 6);
  featuredContainer.innerHTML = featuredList.map(item => createProductCardHTML(item, true)).join('');
}

/* ==========================================================================
   6. PRODUCTS PAGE CATALOG, FILTERING, SEARCH & SORTING
   ========================================================================== */
function initProductsCatalogPage() {
  const catalogGrid = document.getElementById('productsCatalogGrid');
  if (!catalogGrid) return;

  const filterButtons = document.querySelectorAll('[data-category-filter]');
  const searchInput = document.getElementById('productSearchInput');
  const sortSelect = document.getElementById('productSortSelect');
  const countDisplay = document.getElementById('productCountDisplay');
  const emptyState = document.getElementById('catalogEmptyState');
  const resetFilterBtn = document.getElementById('resetCatalogFiltersBtn');

  let activeCategory = 'All';
  let searchQuery = '';
  let sortMode = 'featured';

  // Check URL query parameters (?category=Kids (Ages 3-7) or ?search=laptop)
  const urlParams = new URLSearchParams(window.location.search);
  const categoryParam = urlParams.get('category');
  const searchParam = urlParams.get('search');

  const validCategories = ['All', 'Kids (Ages 3-7)', 'School (Ages 8-13)', 'Teens & College', 'Sports & Daypacks'];
  if (categoryParam && validCategories.includes(categoryParam)) {
    activeCategory = categoryParam;
  }
  if (searchParam && searchInput) {
    searchQuery = searchParam.trim();
    searchInput.value = searchQuery;
  }

  function syncFilterButtonStates() {
    filterButtons.forEach(btn => {
      const cat = btn.getAttribute('data-category-filter');
      const isMatch = cat === activeCategory;
      btn.classList.toggle('active', isMatch);
      btn.setAttribute('aria-pressed', isMatch ? 'true' : 'false');
    });
  }

  function renderFilteredProducts() {
    let filtered = PRODUCT_CATALOG.filter(product => {
      const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
      const q = searchQuery.toLowerCase();
      const matchesSearch = !q ||
        product.name.toLowerCase().includes(q) ||
        product.description.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q) ||
        product.packSize.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });

    // Apply sorting
    if (sortMode === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortMode === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortMode === 'name-asc') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      // Featured default order
      filtered.sort((a, b) => Number(b.featured) - Number(a.featured));
    }

    if (countDisplay) {
      countDisplay.textContent = `Showing ${filtered.length} of ${PRODUCT_CATALOG.length} Backpacks & Bags`;
    }

    if (filtered.length === 0) {
      catalogGrid.innerHTML = '';
      if (emptyState) emptyState.hidden = false;
    } else {
      if (emptyState) emptyState.hidden = true;
      catalogGrid.innerHTML = filtered.map(createProductCardHTML).join('');
    }
  }

  // Category filter clicks
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      activeCategory = btn.getAttribute('data-category-filter') || 'All';
      syncFilterButtonStates();
      renderFilteredProducts();
    });
  });

  // Search input listener
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim();
      renderFilteredProducts();
    });
  }

  // Sort select listener
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      sortMode = e.target.value;
      renderFilteredProducts();
    });
  }

  // Reset filters button
  if (resetFilterBtn) {
    resetFilterBtn.addEventListener('click', () => {
      activeCategory = 'All';
      searchQuery = '';
      sortMode = 'featured';
      if (searchInput) searchInput.value = '';
      if (sortSelect) sortSelect.value = 'featured';
      syncFilterButtonStates();
      renderFilteredProducts();
    });
  }

  syncFilterButtonStates();
  renderFilteredProducts();
}

/* ==========================================================================
   7. ENQUIRE & CONTACT PAGE — CART PREFILL & FORM VALIDATION
   ========================================================================== */
function initContactEnquiryPage() {
  const form = document.getElementById('orderEnquiryForm');
  if (!form) return;

  const fullNameInput = document.getElementById('fullName');
  const phoneInput = document.getElementById('phoneNumber');
  const emailInput = document.getElementById('emailAddress');
  const enquiryTypeSelect = document.getElementById('enquiryType');
  const productCategorySelect = document.getElementById('productCategory');
  const interestedProductsInput = document.getElementById('interestedProducts');
  const quantityInput = document.getElementById('productQuantity');
  const deliveryLocationInput = document.getElementById('deliveryLocation');
  const messageInput = document.getElementById('enquiryMessage');
  const prefillNotice = document.getElementById('cartPrefillNotice');
  const successAlert = document.getElementById('enquirySuccessConfirmation');
  const submittedSummaryBox = document.getElementById('submittedEnquirySummary');

  // Auto-populate from Enquiry Cart if items exist
  function populateFromCart() {
    const { cart, totalItems, totalAmount } = getCartTotals();
    if (cart.length === 0) return;

    const productSummary = cart.map(item => `${item.name} (${item.packSize}) x ${item.qty}`).join(', ');
    const uniqueCategories = [...new Set(cart.map(item => item.category))];

    if (interestedProductsInput) {
      interestedProductsInput.value = productSummary;
    }
    if (quantityInput) {
      quantityInput.value = `${totalItems} ${totalItems === 1 ? 'Bag' : 'Bags'} (Est. Deal Total: ₹${totalAmount.toLocaleString('en-IN')})`;
    }
    if (enquiryTypeSelect) {
      enquiryTypeSelect.value = 'Back-to-School Deal Enquiry';
    }
    if (productCategorySelect) {
      if (uniqueCategories.length === 1) {
        productCategorySelect.value = uniqueCategories[0];
      } else if (uniqueCategories.length > 1) {
        productCategorySelect.value = 'Multiple Categories';
      }
    }
    if (messageInput && !messageInput.value.trim()) {
      messageInput.value = `Hello, I would like to enquire about back-to-school deal pricing, stock availability and delivery options for the following selected backpacks:\n- ${cart.map(i => `${i.name} (${i.packSize}): ${i.qty} bag(s)`).join('\n- ')}`;
    }
    if (prefillNotice) {
      prefillNotice.hidden = false;
    }
  }

  populateFromCart();

  // Field validation helper
  function validateField(input, validatorFn) {
    if (!input) return true;
    const isValid = validatorFn(input.value.trim());
    input.classList.toggle('is-invalid', !isValid);
    input.setAttribute('aria-invalid', !isValid ? 'true' : 'false');
    return isValid;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const phoneRegex = /^[+]?[\d\s()-]{10,16}$/;

  const validators = [
    { el: fullNameInput, fn: val => val.length >= 2 },
    { el: phoneInput, fn: val => phoneRegex.test(val) && val.replace(/\D/g, '').length >= 10 },
    { el: emailInput, fn: val => emailRegex.test(val) },
    { el: enquiryTypeSelect, fn: val => val.length > 0 },
    { el: productCategorySelect, fn: val => val.length > 0 },
    { el: interestedProductsInput, fn: val => val.length >= 2 },
    { el: quantityInput, fn: val => val.length >= 1 },
    { el: deliveryLocationInput, fn: val => val.length >= 3 },
    { el: messageInput, fn: val => val.length >= 8 }
  ];

  validators.forEach(({ el, fn }) => {
    if (!el) return;
    el.addEventListener('input', () => {
      if (el.classList.contains('is-invalid')) {
        validateField(el, fn);
      }
    });
    el.addEventListener('change', () => {
      if (el.classList.contains('is-invalid')) {
        validateField(el, fn);
      }
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let allValid = true;
    let firstInvalidEl = null;

    validators.forEach(({ el, fn }) => {
      const ok = validateField(el, fn);
      if (!ok) {
        allValid = false;
        if (!firstInvalidEl) firstInvalidEl = el;
      }
    });

    if (!allValid) {
      if (firstInvalidEl) firstInvalidEl.focus();
      return;
    }

    // Build demo confirmation details
    if (submittedSummaryBox) {
      submittedSummaryBox.innerHTML = `
        <div class="row g-2 small mt-2 pt-2 border-top">
          <div class="col-sm-6"><strong>Customer Name:</strong> ${escapeHTML(fullNameInput.value.trim())}</div>
          <div class="col-sm-6"><strong>Contact Phone:</strong> ${escapeHTML(phoneInput.value.trim())}</div>
          <div class="col-sm-6"><strong>Enquiry Type:</strong> ${escapeHTML(enquiryTypeSelect.value)}</div>
          <div class="col-sm-6"><strong>Age & Bag Category:</strong> ${escapeHTML(productCategorySelect.value)}</div>
          <div class="col-12"><strong>Selected Backpacks & Quantity:</strong> ${escapeHTML(interestedProductsInput.value.trim())} (${escapeHTML(quantityInput.value.trim())})</div>
          <div class="col-12"><strong>City / Delivery Area:</strong> ${escapeHTML(deliveryLocationInput.value.trim())}</div>
        </div>
      `;
    }

    if (successAlert) {
      successAlert.hidden = false;
      successAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    form.reset();
    validators.forEach(({ el }) => {
      if (el) {
        el.classList.remove('is-invalid');
        el.setAttribute('aria-invalid', 'false');
      }
    });
  });
}

function escapeHTML(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/* ==========================================================================
   8. FAQ ACCORDION (BRANDS PAGE)
   ========================================================================== */
function initFaqAccordions() {
  const triggers = document.querySelectorAll('.faq-trigger');
  if (!triggers.length) return;

  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
      const targetId = trigger.getAttribute('aria-controls');
      const contentEl = targetId ? document.getElementById(targetId) : null;

      // Close sibling items for clean reading
      triggers.forEach(otherTrigger => {
        if (otherTrigger !== trigger) {
          otherTrigger.setAttribute('aria-expanded', 'false');
          const otherId = otherTrigger.getAttribute('aria-controls');
          const otherContent = otherId ? document.getElementById(otherId) : null;
          if (otherContent) otherContent.hidden = true;
        }
      });

      trigger.setAttribute('aria-expanded', !isExpanded ? 'true' : 'false');
      if (contentEl) {
        contentEl.hidden = isExpanded;
      }
    });
  });
}

/* ==========================================================================
   9. GLOBAL NAVIGATION, DRAWERS & EVENT DELEGATION
   ========================================================================== */
function initGlobalUI() {
  const siteHeader = document.querySelector('.site-header');
  const hamburgerBtn = document.getElementById('mobileMenuOpenBtn');
  const mobileCloseBtn = document.getElementById('mobileMenuCloseBtn');
  const mobileDrawer = document.getElementById('mobileNavDrawer');
  const sharedBackdrop = document.getElementById('sharedOverlayBackdrop');

  const cartOpenBtns = document.querySelectorAll('[data-open-cart]');
  const cartCloseBtn = document.getElementById('enquiryCartCloseBtn');
  const cartDrawer = document.getElementById('enquiryCartDrawer');
  const clearCartBtn = document.getElementById('clearEnquiryCartBtn');

  const searchToggleBtn = document.getElementById('headerSearchToggleBtn');
  const headerSearchBar = document.getElementById('headerSearchBar');
  const headerSearchForm = document.getElementById('headerSearchForm');
  const headerSearchInput = document.getElementById('headerSearchInput');

  // Sticky Header Scroll State
  window.addEventListener('scroll', () => {
    if (!siteHeader) return;
    if (window.scrollY > 24) {
      siteHeader.classList.add('is-scrolled');
    } else {
      siteHeader.classList.remove('is-scrolled');
    }
  }, { passive: true });

  function closeAllDrawers() {
    if (mobileDrawer) {
      mobileDrawer.classList.remove('is-open');
      mobileDrawer.setAttribute('aria-hidden', 'true');
    }
    if (hamburgerBtn) {
      hamburgerBtn.setAttribute('aria-expanded', 'false');
    }
    if (cartDrawer) {
      cartDrawer.classList.remove('is-open');
      cartDrawer.setAttribute('aria-hidden', 'true');
    }
    if (sharedBackdrop) {
      sharedBackdrop.classList.remove('is-open');
    }
    document.body.style.overflow = '';
  }

  function openMobileDrawer() {
    closeAllDrawers();
    if (mobileDrawer) {
      mobileDrawer.classList.add('is-open');
      mobileDrawer.setAttribute('aria-hidden', 'false');
    }
    if (hamburgerBtn) {
      hamburgerBtn.setAttribute('aria-expanded', 'true');
    }
    if (sharedBackdrop) {
      sharedBackdrop.classList.add('is-open');
    }
    document.body.style.overflow = 'hidden';
  }

  function openCartDrawer() {
    closeAllDrawers();
    if (cartDrawer) {
      cartDrawer.classList.add('is-open');
      cartDrawer.setAttribute('aria-hidden', 'false');
    }
    if (sharedBackdrop) {
      sharedBackdrop.classList.add('is-open');
    }
    document.body.style.overflow = 'hidden';
  }

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', openMobileDrawer);
  }
  if (mobileCloseBtn) {
    mobileCloseBtn.addEventListener('click', closeAllDrawers);
  }
  if (mobileDrawer) {
    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeAllDrawers);
    });
  }

  cartOpenBtns.forEach(btn => {
    btn.addEventListener('click', openCartDrawer);
  });
  if (cartCloseBtn) {
    cartCloseBtn.addEventListener('click', closeAllDrawers);
  }
  if (sharedBackdrop) {
    sharedBackdrop.addEventListener('click', closeAllDrawers);
  }

  if (clearCartBtn) {
    clearCartBtn.addEventListener('click', () => {
      clearEnquiryCart();
    });
  }

  // Header Search Bar Toggle
  if (searchToggleBtn && headerSearchBar) {
    searchToggleBtn.addEventListener('click', () => {
      const isOpen = headerSearchBar.classList.toggle('is-open');
      searchToggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      if (isOpen && headerSearchInput) {
        setTimeout(() => headerSearchInput.focus(), 100);
      }
    });
  }

  if (headerSearchForm && headerSearchInput) {
    headerSearchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const q = headerSearchInput.value.trim();
      const pageSearchInput = document.getElementById('productSearchInput');
      if (pageSearchInput) {
        pageSearchInput.value = q;
        pageSearchInput.dispatchEvent(new Event('input'));
        pageSearchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        window.location.href = `products.html?search=${encodeURIComponent(q)}`;
      }
    });
  }

  document.querySelectorAll('[data-drawer-search-form]').forEach(drawerForm => {
    drawerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const inputEl = drawerForm.querySelector('input[type="search"]');
      const q = inputEl ? inputEl.value.trim() : '';
      closeAllDrawers();
      const pageSearchInput = document.getElementById('productSearchInput');
      if (pageSearchInput) {
        pageSearchInput.value = q;
        pageSearchInput.dispatchEvent(new Event('input'));
        pageSearchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        window.location.href = `products.html?search=${encodeURIComponent(q)}`;
      }
    });
  });

  // Escape key closes drawers and search bar
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllDrawers();
      if (headerSearchBar && headerSearchBar.classList.contains('is-open')) {
        headerSearchBar.classList.remove('is-open');
        if (searchToggleBtn) searchToggleBtn.setAttribute('aria-expanded', 'false');
      }
    }
  });

  // Global Event Delegation for Add-to-Enquiry and Cart Quantity buttons
  document.addEventListener('click', (e) => {
    const addBtn = e.target.closest('[data-add-enquiry]');
    if (addBtn) {
      const productId = addBtn.getAttribute('data-add-enquiry');
      addToEnquiryCart(productId, addBtn);
      return;
    }

    const cartActionBtn = e.target.closest('[data-action]');
    if (cartActionBtn) {
      const action = cartActionBtn.getAttribute('data-action');
      const id = cartActionBtn.getAttribute('data-id');
      if (action === 'inc') updateCartItemQty(id, 1);
      if (action === 'dec') updateCartItemQty(id, -1);
      if (action === 'remove') removeCartItem(id);
    }
  });

  // Scroll Reveal Observer
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('is-visible'));
  }

  // Floating Back to Top Button Controller
  let backToTopBtn = document.getElementById('backToTopBtn');
  if (!backToTopBtn) {
    backToTopBtn = document.createElement('button');
    backToTopBtn.type = 'button';
    backToTopBtn.id = 'backToTopBtn';
    backToTopBtn.className = 'back-to-top-btn';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    backToTopBtn.setAttribute('title', 'Back to top');
    backToTopBtn.innerHTML = '<i class="bi bi-arrow-up"></i>';
    document.body.appendChild(backToTopBtn);
  }

  const toggleBackToTopVisibility = () => {
    if (window.scrollY > 280) {
      backToTopBtn.classList.add('is-visible');
    } else {
      backToTopBtn.classList.remove('is-visible');
    }
  };

  window.addEventListener('scroll', toggleBackToTopVisibility, { passive: true });
  toggleBackToTopVisibility();

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   10. RTL & THEME (DARK / LIGHT) TOGGLE CONTROLLER
   ========================================================================== */
const THEME_STORAGE_KEY = 'zippack_theme_v1';
const DIR_STORAGE_KEY = 'zippack_dir_v1';

function applyThemePreference(theme) {
  const validTheme = theme === 'dark' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', validTheme);
  document.querySelectorAll('[data-toggle-theme], #themeToggleBtn').forEach(btn => {
    const icon = btn.querySelector('i');
    if (icon) {
      icon.className = validTheme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-stars';
    }
    btn.setAttribute('aria-pressed', validTheme === 'dark' ? 'true' : 'false');
    btn.setAttribute('title', validTheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
  });
}

function applyDirectionPreference(dir) {
  const validDir = dir === 'rtl' ? 'rtl' : 'ltr';
  document.documentElement.setAttribute('dir', validDir);
  document.querySelectorAll('[data-toggle-rtl], #rtlToggleBtn').forEach(btn => {
    const label = btn.querySelector('.rtl-badge-text');
    if (label) {
      label.textContent = validDir === 'rtl' ? 'LTR' : 'RTL';
    }
    btn.setAttribute('aria-pressed', validDir === 'rtl' ? 'true' : 'false');
    btn.setAttribute('title', validDir === 'rtl' ? 'Switch to LTR (Left-to-Right)' : 'Switch to RTL (Right-to-Left)');
  });
}

function initThemeAndDirectionToggles() {
  let savedTheme = 'light';
  let savedDir = 'ltr';
  try {
    savedTheme = localStorage.getItem(THEME_STORAGE_KEY) || 'light';
    savedDir = localStorage.getItem(DIR_STORAGE_KEY) || 'ltr';
  } catch (err) {
    // Default fallback
  }

  applyThemePreference(savedTheme);
  applyDirectionPreference(savedDir);

  document.querySelectorAll('[data-toggle-theme], #themeToggleBtn').forEach(btn => {
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem(THEME_STORAGE_KEY, next);
      } catch (err) {}
      applyThemePreference(next);
    });
  });

  document.querySelectorAll('[data-toggle-rtl], #rtlToggleBtn').forEach(btn => {
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('dir') === 'rtl' ? 'rtl' : 'ltr';
      const next = current === 'rtl' ? 'ltr' : 'rtl';
      try {
        localStorage.setItem(DIR_STORAGE_KEY, next);
      } catch (err) {}
      applyDirectionPreference(next);
    });
  });
}

/* ==========================================================================
   11. INITIALIZE APPLICATION ON DOM READY
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  initThemeAndDirectionToggles();
  updateAllCartUI();
  initHomeFeaturedProducts();
  initProductsCatalogPage();
  initContactEnquiryPage();
  initFaqAccordions();
  initGlobalUI();
});
