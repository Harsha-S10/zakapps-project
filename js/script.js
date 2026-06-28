const PRODUCTS = [
  {
    id: 'okazu-lovers-set',
    name: 'OKAZU Lovers Set (230ml/12 jars)',
    price: 135,
    compareAt: 167.88,
    rating: 5,
    reviews: 32,
    category: 'Okazu',
    type: 'Multi Set',
    flavor: 'Original',
    featured: true,
    image: 'images/best-seller-1.png',
    imageClass: 'art--grain',
    description: 'A versatile set of jarred okazu blends for rice, noodles, and protein bowls.'
  },
  {
    id: 'okazu-chili-miso',
    name: 'OKAZU Chili Miso',
    price: 13.5,
    compareAt: 15,
    rating: 4,
    reviews: 18,
    category: 'Okazu',
    type: 'Single Pack',
    flavor: 'Spicy',
    featured: true,
    image: 'images/best-seller-2.png',
    imageClass: 'art--jar',
    description: 'A single jar for quick meals with a rich chili miso flavor.'
  },
  {
    id: 'miso-soup-variety-pack',
    name: 'Miso Soup Variety Pack',
    price: 18,
    compareAt: 22,
    rating: 4,
    reviews: 24,
    category: 'Miso Soup',
    type: 'Multi Set',
    flavor: 'Savory',
    featured: true,
    image: 'images/best-seller-3.png',
    imageClass: 'art--bowl',
    description: 'Three flavor pack for warming soup moments.'
  },
  {
    id: 'miso-soup',
    name: 'Miso Soup',
    price: 19.99,
    compareAt: 24,
    rating: 5,
    reviews: 24,
    category: 'Miso Soup',
    type: 'Single Pack',
    flavor: 'Umami',
    featured: true,
    image: 'images/miso soup.png',
    imageClass: 'art--grain',
    description: 'A single soup option with a clean, savory profile.'
  },
  {
    id: 'miso-soup-3pack',
    name: 'Miso Soup 3-Pack',
    price: 19.5,
    compareAt: 23,
    rating: 4,
    reviews: 20,
    category: 'Miso Soup',
    type: 'Multi Set',
    flavor: 'Savory',
    featured: false,
    image: 'images/miso soup 3 pack.png',
    imageClass: 'art--bowl',
    description: 'Three-pack of easy soups for weekly rotation.'
  },
  {
    id: 'matcha',
    name: 'Instant Matcha',
    price: 22,
    compareAt: 26,
    rating: 3,
    reviews: 12,
    category: 'Instant Matcha',
    type: 'Single Pack',
    flavor: 'Matcha',
    featured: false,
    image: 'images/instant matcha.png',
    imageClass: 'art--grain',
    description: 'A bright daily pick-me-up with a clean matcha profile.'
  }
];
 
const STORAGE_KEYS = {
  cart: 'abokichi-cart-count',
  wishlist: 'abokichi-wishlist-count',
  wishlistIds: 'abokichi-wishlist-ids'
};
 
function getCartCount() {
  return Number(localStorage.getItem(STORAGE_KEYS.cart) || 0);
}
 
function setCartCount(value) {
  localStorage.setItem(STORAGE_KEYS.cart, String(value));
  updateCountBadges();
}
 
function getWishlistCount() {
  return Number(localStorage.getItem(STORAGE_KEYS.wishlist) || 0);
}
 
function setWishlistCount(value) {
  localStorage.setItem(STORAGE_KEYS.wishlist, String(value));
  updateCountBadges();
}
 
function getWishlistIds() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.wishlistIds) || '[]');
  } catch {
    return [];
  }
}
 
function setWishlistIds(ids) {
  localStorage.setItem(STORAGE_KEYS.wishlistIds, JSON.stringify(ids));
}
 
function updateCountBadges() {
  const setBadge = (selector, value) => {
    document.querySelectorAll(selector).forEach((node) => {
      node.textContent = value || '';
      node.classList.toggle('is-hidden', !value);
    });
  };
 
  setBadge('[data-cart-count]', getCartCount());
  setBadge('[data-wishlist-count]', getWishlistCount());
}
 
function starsMarkup(rating) {
  return '★'.repeat(rating) + '☆'.repeat(5 - rating);
}
 
function productUrl(productId) {
  return `product.html?id=${encodeURIComponent(productId)}`;
}
 
function renderFeaturedGrid() {
  const grid = document.querySelector('[data-featured-grid]');
  if (!grid) return;
 
  const featuredProducts = PRODUCTS.filter((product) => product.featured).slice(0, 4);
  grid.innerHTML = featuredProducts.map((product) => `
    <a class="featured-card" href="shop.html" aria-label="Browse ${product.name} in the shop">
      <div class="featured-card__media art ${product.imageClass}" style="background-image:url('${product.image || ''}')"></div>
      <div class="featured-card__body">
        <div class="featured-card__title">${product.name}</div>
        <div class="meta-row"><span>$${product.price.toFixed(2)}</span><span>${starsMarkup(product.rating)}</span></div>
      </div>
    </a>
  `).join('');
}
 
function renderShopFilters() {
  const categoryContainer = document.querySelector('[data-filter-group="category"]');
  const typeContainer = document.querySelector('[data-filter-group="type"]');
  const flavorContainer = document.querySelector('[data-filter-group="flavor"]');
  const ratingContainer = document.querySelector('[data-filter-group="rating"]');
  if (!categoryContainer || !typeContainer || !ratingContainer || !flavorContainer) return;
 
  const categories = [...new Set(PRODUCTS.map((product) => product.category))];
  const types = [...new Set(PRODUCTS.map((product) => product.type))];
  const flavors = [...new Set(PRODUCTS.map((product) => product.flavor))];
  const ratings = [5, 4, 3];
 
  categoryContainer.innerHTML = categories.map((category) => filterOptionMarkup('category', category)).join('');
  typeContainer.innerHTML = types.map((type) => filterOptionMarkup('type', type)).join('');
  flavorContainer.innerHTML = flavors.map((flavor) => filterOptionMarkup('flavor', flavor)).join('');
  ratingContainer.innerHTML = ratings.map((rating) => filterOptionMarkup('rating', `${rating}+`, String(rating))).join('');
}
 
function filterOptionMarkup(group, label, value = label) {
  const id = `${group}-${value}`.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  return `
    <label class="filter-option" for="${id}">
      <input id="${id}" type="checkbox" name="${group}" value="${value}" />
      <span>${label}</span>
    </label>
  `;
}
 
function getSelectedValues(name) {
  return [...document.querySelectorAll(`input[name="${name}"]:checked`)].map((input) => input.value);
}
 
function productCardMarkup(product) {
  return `
    <article class="product-card" data-product-id="${product.id}" tabindex="0" role="link" aria-label="Open ${product.name}">
      <div class="product-card__media art ${product.imageClass}" style="background-image:url('${product.image || ''}')"></div>
      <div class="product-card__body">
        <div class="product-card__name">${product.name}</div>
        <div class="product-card__meta">
          <span>$${product.price.toFixed(2)}</span>
          <span class="product-card__stars">${starsMarkup(product.rating)}</span>
        </div>
        <div class="product-card__meta">
          <span>${product.category}</span>
          <span>${product.type}</span>
        </div>
      </div>
    </article>
  `;
}
 
function applyShopState() {
  const grid = document.querySelector('[data-products-grid]');
  const countNode = document.querySelector('[data-product-count]');
  const emptyState = document.querySelector('[data-empty-state]');
  if (!grid || !countNode || !emptyState) return;
 
  const selectedCategories = getSelectedValues('category');
  const selectedTypes = getSelectedValues('type');
  const selectedFlavors = getSelectedValues('flavor');
  const selectedRatings = getSelectedValues('rating').map(Number);
  const sortValue = document.querySelector('[data-sort-select]')?.value || 'featured';
 
  let filtered = PRODUCTS.filter((product) => {
    const categoryMatch = !selectedCategories.length || selectedCategories.includes(product.category);
    const typeMatch = !selectedTypes.length || selectedTypes.includes(product.type);
    const flavorMatch = !selectedFlavors.length || selectedFlavors.includes(product.flavor);
    const ratingMatch = !selectedRatings.length || selectedRatings.some((rating) => product.rating >= rating);
    return categoryMatch && typeMatch && flavorMatch && ratingMatch;
  });
 
  switch (sortValue) {
    case 'alpha-asc':
      filtered.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'alpha-desc':
      filtered.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case 'price-asc':
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      filtered.sort((a, b) => b.price - a.price);
      break;
    case 'rating-desc':
      filtered.sort((a, b) => b.rating - a.rating || a.name.localeCompare(b.name));
      break;
    default:
      filtered.sort((a, b) => Number(b.featured) - Number(a.featured));
  }
 
  countNode.textContent = `(${filtered.length})`;
  emptyState.classList.toggle('is-hidden', filtered.length !== 0);
  grid.innerHTML = filtered.map(productCardMarkup).join('');
 
  grid.querySelectorAll('[data-product-id]').forEach((card) => {
    card.addEventListener('click', () => {
      window.location.href = productUrl(card.dataset.productId);
    });
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        window.location.href = productUrl(card.dataset.productId);
      }
    });
  });
}
 
function setProductFromUrl() {
  const detail = document.querySelector('[data-product-detail]');
  if (!detail) return;
 
  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id') || 'okazu-lovers-set';
  const product = PRODUCTS.find((item) => item.id === productId) || PRODUCTS[0];
 
  document.title = `ABOKICHI | ${product.name}`;
  document.querySelector('[data-breadcrumb]').textContent = product.name;
  document.querySelector('[data-product-category]').textContent = product.category;
  document.querySelector('[data-product-title]').textContent = product.name;
  document.querySelector('[data-product-price]').textContent = `$${product.price.toFixed(2)}`;
  document.querySelector('[data-product-compare]').textContent = `$${product.compareAt.toFixed(2)}`;
  document.querySelector('[data-product-reviews]').textContent = `${product.reviews} Reviews`;
  document.querySelector('[data-product-description]').textContent = product.description;
  const mainImage = document.querySelector('[data-product-image]');
  mainImage.className = `product-media__main art ${product.imageClass}`;
  mainImage.style.backgroundImage = `url('${product.image || 'images/best-seller-1.png'}')`;
 
  const stars = document.querySelector('[data-product-stars]');
  if (stars) stars.textContent = starsMarkup(product.rating);
 
  const thumbRow = document.querySelector('[data-product-thumbs]');
  if (thumbRow) {
    thumbRow.innerHTML = [1, 2, 3].map(() => `<div class="thumb art ${product.imageClass}" style="background-image:url('${product.image || 'images/best-seller-1.png'}')"></div>`).join('');
  }
 
  const wishlistButton = document.querySelector('[data-wishlist-toggle]');
  const wishlistLabel = document.querySelector('[data-wishlist-label]');
  const wishlistIds = getWishlistIds();
  const isWishlisted = wishlistIds.includes(product.id);
  if (wishlistLabel) {
    wishlistLabel.textContent = isWishlisted ? 'Remove from wishlist' : 'Add to wishlist';
  }
 
  wishlistButton?.addEventListener('click', () => {
    const currentIds = getWishlistIds();
    const currentIndex = currentIds.indexOf(product.id);
    let newCount = getWishlistCount();
 
    if (currentIndex >= 0) {
      currentIds.splice(currentIndex, 1);
      newCount = Math.max(0, newCount - 1);
      if (wishlistLabel) wishlistLabel.textContent = 'Add to wishlist';
    } else {
      currentIds.push(product.id);
      newCount += 1;
      if (wishlistLabel) wishlistLabel.textContent = 'Remove from wishlist';
    }
 
    setWishlistIds(currentIds);
    setWishlistCount(newCount);
  });
 
  document.querySelector('[data-add-to-cart]')?.addEventListener('click', () => {
    setCartCount(getCartCount() + 1);
  });
 
  document.querySelector('[data-buy-now]')?.addEventListener('click', (event) => {
    event.preventDefault();
    window.location.href = 'order.html';
  });
}
 
function setupGlobalNavigation() {
  const toggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-nav-menu]');
  const filterToggle = document.querySelector('[data-filter-toggle]');
  const filterPanel = document.querySelector('[data-filter-panel]');
 
  toggle?.addEventListener('click', () => menu?.classList.toggle('is-open'));
  filterToggle?.addEventListener('click', () => filterPanel?.classList.toggle('is-open'));
}
 
function setupShopInteractions() {
  renderShopFilters();
  applyShopState();
 
  document.querySelector('[data-sort-select]')?.addEventListener('change', applyShopState);
  document.querySelectorAll('input[type="checkbox"]').forEach((input) => {
    input.addEventListener('change', applyShopState);
  });
 
  document.querySelector('[data-clear-filters]')?.addEventListener('click', () => {
    document.querySelectorAll('input[type="checkbox"]').forEach((input) => {
      input.checked = false;
    });
    const sortSelect = document.querySelector('[data-sort-select]');
    if (sortSelect) sortSelect.value = 'featured';
    applyShopState();
  });
 
  document.querySelectorAll('.view-switch__btn').forEach((button, index) => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.view-switch__btn').forEach((item) => item.classList.remove('is-active'));
      button.classList.add('is-active');
      document.querySelector('[data-products-grid]')?.classList.toggle('list-view', index === 1);
    });
  });
}
 
function init() {
  updateCountBadges();
  setupGlobalNavigation();
  renderFeaturedGrid();
 
  const page = document.body.dataset.page;
  if (page === 'shop') setupShopInteractions();
  if (page === 'product') setProductFromUrl();
}
 
document.addEventListener('DOMContentLoaded', init);