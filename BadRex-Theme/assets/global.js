/**
 * BadRex Store - Global JavaScript
 * Handles cart functionality, AJAX updates, and interactive elements
 */

class CartManager {
  constructor() {
    this.cart = null;
    this.init();
  }

  init() {
    this.bindEvents();
    this.updateCartCount();
  }

  bindEvents() {
    // Add to cart buttons
    document.addEventListener('click', (e) => {
      if (e.target.matches('[data-add-to-cart]') || e.target.closest('[data-add-to-cart]')) {
        e.preventDefault();
        const button = e.target.matches('[data-add-to-cart]') ? e.target : e.target.closest('[data-add-to-cart]');
        this.addToCart(button);
      }
    });

    // Quantity update buttons
    document.addEventListener('click', (e) => {
      if (e.target.matches('[data-quantity-plus]') || e.target.closest('[data-quantity-plus]')) {
        e.preventDefault();
        const button = e.target.matches('[data-quantity-plus]') ? e.target : e.target.closest('[data-quantity-plus]');
        this.updateQuantity(button, 'plus');
      }

      if (e.target.matches('[data-quantity-minus]') || e.target.closest('[data-quantity-minus]')) {
        e.preventDefault();
        const button = e.target.matches('[data-quantity-minus]') ? e.target : e.target.closest('[data-quantity-minus]');
        this.updateQuantity(button, 'minus');
      }
    });

    // Remove item buttons
    document.addEventListener('click', (e) => {
      if (e.target.matches('[data-remove-item]') || e.target.closest('[data-remove-item]')) {
        e.preventDefault();
        const button = e.target.matches('[data-remove-item]') ? e.target : e.target.closest('[data-remove-item]');
        this.removeItem(button);
      }
    });

    // Clear cart button
    document.addEventListener('click', (e) => {
      if (e.target.matches('[data-clear-cart]') || e.target.closest('[data-clear-cart]')) {
        e.preventDefault();
        this.clearCart();
      }
    });

    // Mobile menu toggle
    document.addEventListener('click', (e) => {
      if (e.target.matches('[data-mobile-menu-toggle]') || e.target.closest('[data-mobile-menu-toggle]')) {
        e.preventDefault();
        this.toggleMobileMenu();
      }
    });

    // Language switcher
    document.addEventListener('change', (e) => {
      if (e.target.matches('[data-language-select]')) {
        this.switchLanguage(e.target.value);
      }
    });
  }

  async addToCart(button) {
    try {
      this.setButtonLoading(button, true);
      
      const form = button.closest('form') || button.closest('[data-product-form]');
      const formData = new FormData(form);
      
      const response = await fetch(window.routes.cart_add_url, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.status === 422) {
        throw new Error(result.description || 'Unable to add item to cart');
      }

      await this.updateCartCount();
      this.showNotification('success', window.variantStrings.addToCart || 'Added to cart!');
      
    } catch (error) {
      console.error('Add to cart error:', error);
      this.showNotification('error', error.message || 'Unable to add item to cart');
    } finally {
      this.setButtonLoading(button, false);
    }
  }

  async updateQuantity(button, action) {
    try {
      const lineItem = button.closest('[data-line-item]');
      const key = lineItem.dataset.lineItem;
      const quantityInput = lineItem.querySelector('[data-quantity-input]');
      let currentQuantity = parseInt(quantityInput.value);
      
      let newQuantity;
      if (action === 'plus') {
        newQuantity = currentQuantity + 1;
      } else if (action === 'minus') {
        newQuantity = Math.max(0, currentQuantity - 1);
      }

      const response = await fetch(window.routes.cart_change_url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: key,
          quantity: newQuantity
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const cart = await response.json();
      
      if (newQuantity === 0) {
        lineItem.remove();
      } else {
        quantityInput.value = newQuantity;
        this.updateLineItemTotal(lineItem, cart);
      }
      
      this.updateCartTotals(cart);
      await this.updateCartCount();
      
    } catch (error) {
      console.error('Update quantity error:', error);
      this.showNotification('error', 'Unable to update quantity');
    }
  }

  async removeItem(button) {
    try {
      const lineItem = button.closest('[data-line-item]');
      const key = lineItem.dataset.lineItem;

      const response = await fetch(window.routes.cart_change_url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: key,
          quantity: 0
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const cart = await response.json();
      lineItem.remove();
      
      this.updateCartTotals(cart);
      await this.updateCartCount();
      
      // Check if cart is empty
      if (cart.item_count === 0) {
        this.showEmptyCart();
      }
      
    } catch (error) {
      console.error('Remove item error:', error);
      this.showNotification('error', 'Unable to remove item');
    }
  }

  async clearCart() {
    try {
      const response = await fetch(window.routes.cart_update_url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ updates: {} })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Reload the page to show empty cart
      window.location.reload();
      
    } catch (error) {
      console.error('Clear cart error:', error);
      this.showNotification('error', 'Unable to clear cart');
    }
  }

  async updateCartCount() {
    try {
      const response = await fetch(window.routes.cart_url + '.js');
      const cart = await response.json();
      
      const cartCountElements = document.querySelectorAll('[data-cart-count]');
      cartCountElements.forEach(element => {
        element.textContent = cart.item_count;
        element.style.display = cart.item_count > 0 ? 'flex' : 'none';
      });
      
      this.cart = cart;
      
    } catch (error) {
      console.error('Update cart count error:', error);
    }
  }

  updateLineItemTotal(lineItem, cart) {
    const key = lineItem.dataset.lineItem;
    const cartItem = cart.items.find(item => item.key === key);
    
    if (cartItem) {
      const totalElement = lineItem.querySelector('[data-line-total]');
      if (totalElement) {
        totalElement.textContent = this.formatMoney(cartItem.line_price);
      }
    }
  }

  updateCartTotals(cart) {
    const subtotalElements = document.querySelectorAll('[data-cart-subtotal]');
    const totalElements = document.querySelectorAll('[data-cart-total]');
    
    subtotalElements.forEach(element => {
      element.textContent = this.formatMoney(cart.total_price);
    });
    
    totalElements.forEach(element => {
      element.textContent = this.formatMoney(cart.total_price);
    });
  }

  showEmptyCart() {
    const cartContent = document.querySelector('[data-cart-content]');
    if (cartContent) {
      cartContent.innerHTML = `
        <div class="text-center py-20">
          <div class="text-6xl mb-6">🛒</div>
          <h2 class="text-3xl font-bold mb-4">Your cart is empty</h2>
          <p class="text-muted mb-8">Add some amazing digital products to get started!</p>
          <a href="/collections/all" class="btn btn-primary btn-lg">Browse Products</a>
        </div>
      `;
    }
  }

  setButtonLoading(button, loading) {
    if (loading) {
      button.disabled = true;
      button.dataset.originalText = button.textContent;
      button.textContent = 'Adding...';
      button.classList.add('opacity-50');
    } else {
      button.disabled = false;
      button.textContent = button.dataset.originalText || button.textContent;
      button.classList.remove('opacity-50');
    }
  }

  toggleMobileMenu() {
    const mobileMenu = document.querySelector('[data-mobile-menu]');
    const menuToggle = document.querySelector('[data-mobile-menu-toggle]');
    
    if (mobileMenu) {
      const isOpen = mobileMenu.classList.contains('open');
      
      if (isOpen) {
        mobileMenu.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      } else {
        mobileMenu.classList.add('open');
        menuToggle.setAttribute('aria-expanded', 'true');
      }
    }
  }

  switchLanguage(locale) {
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set('locale', locale);
    window.location.href = currentUrl.toString();
  }

  showNotification(type, message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type} fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm`;
    notification.style.cssText = `
      background-color: ${type === 'success' ? 'var(--color-success)' : 'var(--color-destructive)'};
      color: white;
      transform: translateX(100%);
      transition: transform 0.3s ease;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }

  formatMoney(cents) {
    const amount = cents / 100;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  }
}

// Search functionality
class SearchManager {
  constructor() {
    this.init();
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    const searchInputs = document.querySelectorAll('[data-search-input]');
    
    searchInputs.forEach(input => {
      input.addEventListener('input', this.debounce((e) => {
        this.handleSearch(e.target.value);
      }, 300));
    });
  }

  handleSearch(query) {
    if (query.length < 2) {
      this.clearResults();
      return;
    }

    // Simple client-side search for products on collection pages
    const products = document.querySelectorAll('[data-product-item]');
    
    products.forEach(product => {
      const title = product.querySelector('[data-product-title]')?.textContent.toLowerCase() || '';
      const description = product.querySelector('[data-product-description]')?.textContent.toLowerCase() || '';
      const tags = product.dataset.productTags?.toLowerCase() || '';
      
      const searchText = `${title} ${description} ${tags}`;
      const matches = searchText.includes(query.toLowerCase());
      
      product.style.display = matches ? 'block' : 'none';
    });
  }

  clearResults() {
    const products = document.querySelectorAll('[data-product-item]');
    products.forEach(product => {
      product.style.display = 'block';
    });
  }

  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
}

// Filter functionality
class FilterManager {
  constructor() {
    this.init();
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    // Category filter
    document.addEventListener('change', (e) => {
      if (e.target.matches('[data-category-filter]')) {
        this.filterByCategory(e.target.value);
      }
    });

    // Sort filter
    document.addEventListener('change', (e) => {
      if (e.target.matches('[data-sort-filter]')) {
        this.sortProducts(e.target.value);
      }
    });
  }

  filterByCategory(category) {
    const products = document.querySelectorAll('[data-product-item]');
    
    products.forEach(product => {
      const productCategory = product.dataset.productCategory;
      const matches = category === 'all' || productCategory === category;
      product.style.display = matches ? 'block' : 'none';
    });

    this.updateResultsCount();
  }

  sortProducts(sortBy) {
    const container = document.querySelector('[data-products-grid]');
    if (!container) return;

    const products = Array.from(container.querySelectorAll('[data-product-item]'));
    
    products.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return this.getProductPrice(a) - this.getProductPrice(b);
        case 'price-high':
          return this.getProductPrice(b) - this.getProductPrice(a);
        case 'name':
          return this.getProductTitle(a).localeCompare(this.getProductTitle(b));
        case 'featured':
        default:
          return this.getProductFeatured(b) - this.getProductFeatured(a);
      }
    });

    // Re-append sorted products
    products.forEach(product => container.appendChild(product));
  }

  getProductPrice(product) {
    const priceElement = product.querySelector('[data-product-price]');
    return parseFloat(priceElement?.dataset.price || '0');
  }

  getProductTitle(product) {
    const titleElement = product.querySelector('[data-product-title]');
    return titleElement?.textContent || '';
  }

  getProductFeatured(product) {
    return product.dataset.productFeatured === 'true' ? 1 : 0;
  }

  updateResultsCount() {
    const visibleProducts = document.querySelectorAll('[data-product-item]:not([style*="display: none"])');
    const totalProducts = document.querySelectorAll('[data-product-item]');
    const countElement = document.querySelector('[data-results-count]');
    
    if (countElement) {
      countElement.textContent = `Showing ${visibleProducts.length} of ${totalProducts.length} products`;
    }
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new CartManager();
  new SearchManager();
  new FilterManager();
});

// Utility functions
window.BadRexStore = {
  formatMoney: (cents) => {
    const amount = cents / 100;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  },

  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Smooth scroll to element
  scrollTo: (element) => {
    if (typeof element === 'string') {
      element = document.querySelector(element);
    }
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
};
