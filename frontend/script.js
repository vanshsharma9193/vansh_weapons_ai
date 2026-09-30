/* ============ VANSH WEAPONS — JavaScript ============ */

// ---- PRODUCTS DATA ----
const products = [
  {
    id: 1, category: 'knives',
    name: 'Predator Hunting Blade',
    emoji: '🔪',
    image: 'images/knife1.png',
    badge: 'BESTSELLER', badgeClass: '',
    price: 2499, originalPrice: 3299,
    discount: 24, rating: 4.8, reviews: 312,
    desc: 'Full tang stainless steel blade with ergonomic grip'
  },
  {
    id: 2, category: 'knives',
    name: 'Stealth Tactical Knife',
    emoji: '🗡️',
    image: 'images/knife2.png',
    badge: 'NEW', badgeClass: 'new',
    price: 1899, originalPrice: 2199,
    discount: 14, rating: 4.6, reviews: 98,
    desc: 'Lightweight G10 handle with 440C stainless steel'
  },
  {
    id: 3, category: 'knives',
    name: 'Survivalist Bowie Knife',
    emoji: '⚔️',
    image: 'images/knife3.png',
    badge: 'HOT', badgeClass: 'hot',
    price: 3799, originalPrice: 4500,
    discount: 16, rating: 4.9, reviews: 245,
    desc: '12-inch blade, brass guard, genuine leather sheath'
  },
  {
    id: 4, category: 'bow',
    name: 'Phantom Recurve Bow',
    emoji: '🏹',
    image: 'images/bow1.png',
    badge: 'POPULAR', badgeClass: '',
    price: 8999, originalPrice: 11000,
    discount: 18, rating: 4.7, reviews: 167,
    desc: '40lb draw weight, fiberglass limbs, ambidextrous'
  },
  {
    id: 5, category: 'bow',
    name: 'Steel Arrow Set (12pcs)',
    emoji: '🎯',
    image: 'images/bow2.png',
    badge: 'NEW', badgeClass: 'new',
    price: 1299, originalPrice: 1599,
    discount: 19, rating: 4.5, reviews: 89,
    desc: 'Carbon fiber shafts with stainless broadheads'
  },
  {
    id: 6, category: 'bow',
    name: 'Olympic Compound Bow',
    emoji: '🏹',
    image: 'images/bow3.png',
    badge: 'PREMIUM', badgeClass: '',
    price: 22999, originalPrice: 28000,
    discount: 18, rating: 4.9, reviews: 53,
    desc: '60-70lb draw, let-off 80%, CNC machined risers'
  },
  {
    id: 7, category: 'tactical',
    name: 'Night Owl Tactical Torch',
    emoji: '🔦',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
    badge: 'HOT', badgeClass: 'hot',
    price: 1599, originalPrice: 1999,
    discount: 20, rating: 4.6, reviews: 445,
    desc: '2000 lumen output, waterproof, strobe mode'
  },
  {
    id: 8, category: 'tactical',
    name: 'Ranger Multi-Tool Pro',
    emoji: '🔧',
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&q=80',
    badge: 'BESTSELLER', badgeClass: '',
    price: 3299, originalPrice: 3999,
    discount: 18, rating: 4.7, reviews: 278,
    desc: '21-in-1 stainless steel multi-tool with leather pouch'
  },
  {
    id: 9, category: 'tactical',
    name: 'Black Ops Tactical Vest',
    emoji: '🦺',
    image: 'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=400&q=80',
    badge: 'NEW', badgeClass: 'new',
    price: 5499, originalPrice: 6500,
    discount: 15, rating: 4.5, reviews: 134,
    desc: 'MOLLE system, 8 pockets, padded shoulder straps'
  },
  {
    id: 10, category: 'selfdefense',
    name: 'Phantom Pepper Spray',
    emoji: '💨',
    image: 'https://images.unsplash.com/photo-1604231507908-d5a3da85a9d1?w=400&q=80',
    badge: 'BESTSELLER', badgeClass: '',
    price: 499, originalPrice: 699,
    discount: 29, rating: 4.8, reviews: 891,
    desc: '5m range, 60 sprays, UV dye marker, keychain clip'
  },
  {
    id: 11, category: 'selfdefense',
    name: 'Guardian Stun Baton',
    emoji: '⚡',
    image: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=400&q=80',
    badge: 'HOT', badgeClass: 'hot',
    price: 2799, originalPrice: 3299,
    discount: 15, rating: 4.7, reviews: 234,
    desc: '5 million volt, LED flashlight, rechargeable battery'
  },
  {
    id: 12, category: 'selfdefense',
    name: 'Kubaton Keychain Set',
    emoji: '🛡️',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
    badge: 'NEW', badgeClass: 'new',
    price: 349, originalPrice: 499,
    discount: 30, rating: 4.4, reviews: 567,
    desc: 'Aircraft aluminum, 5.5 inch, 6 color options'
  },
  {
    id: 13, category: 'accessories',
    name: 'Molle Tactical Holster',
    emoji: '👜',
    image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400&q=80',
    badge: 'POPULAR', badgeClass: '',
    price: 1199, originalPrice: 1499,
    discount: 20, rating: 4.6, reviews: 198,
    desc: 'Universal fit, ambidextrous, quick-release mechanism'
  },
  {
    id: 14, category: 'accessories',
    name: 'Leather Knife Sheath',
    emoji: '🧳',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80',
    badge: 'BESTSELLER', badgeClass: '',
    price: 699, originalPrice: 899,
    discount: 22, rating: 4.8, reviews: 334,
    desc: 'Genuine leather, adjustable belt loops, snap button'
  },
  {
    id: 15, category: 'accessories',
    name: 'Tactical Weapon Bag',
    emoji: '🎒',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80',
    badge: 'NEW', badgeClass: 'new',
    price: 3499, originalPrice: 4199,
    discount: 17, rating: 4.7, reviews: 112,
    desc: 'Lockable zippers, TSA compliant, padded dividers'
  },
  {
    id: 16, category: 'tactical',
    name: 'Night Vision Monocular',
    emoji: '🔭',
    image: 'https://images.unsplash.com/photo-1464820453369-31d2c0b651af?w=400&q=80',
    badge: 'PREMIUM', badgeClass: '',
    price: 18999, originalPrice: 24000,
    discount: 21, rating: 4.8, reviews: 67,
    desc: '4x magnification, 300m range, infrared illuminator'
  }
];

// ---- TESTIMONIALS DATA ----
const testimonials = [
  {
    text: "Vansh Weapons is a game-changer! The quality of the hunting knife I ordered is absolutely top-notch. The blade is razor-sharp and the handle feels premium. Delivery was also super fast. Highly recommended!",
    name: "Arjun Sharma", location: "Delhi", rating: 5, verified: true
  },
  {
    text: "I've been looking for a reliable legal self-defense option for a long time. The pepper spray from Vansh Weapons is exactly what I needed. Great range, strong formula. The team was also very helpful with legal queries.",
    name: "Priya Nair", location: "Kochi", rating: 5, verified: true
  },
  {
    text: "Bought the Phantom Recurve Bow as a beginner and I couldn't be happier. The quality is exceptional for the price. Vansh Weapons also provided a detailed guide on usage and safety. Will definitely order again!",
    name: "Rohit Verma", location: "Mumbai", rating: 5, verified: true
  },
  {
    text: "The Night Owl Tactical Torch is absolutely brilliant! 2000 lumens is insane brightness. Build quality is military-grade. I use it on all my trekking trips now. Vansh Weapons never disappoints.",
    name: "Vikram Singh", location: "Chandigarh", rating: 4, verified: true
  },
  {
    text: "Ordered the Ranger Multi-Tool Pro and it arrived in beautiful packaging. Every component is precision-machined. The leather pouch is a nice touch. Customer service was also prompt in answering my questions.",
    name: "Anjali Mehta", location: "Pune", rating: 5, verified: true
  },
  {
    text: "Fast shipping, authentic products and a user-friendly website. The tactical vest quality is excellent — lots of pockets and very comfortable fit. This is my go-to store for all tactical gear now.",
    name: "Suresh Babu", location: "Hyderabad", rating: 5, verified: true
  }
];

// ---- CART STATE ----
let cart = [];
let currentFilter = 'all';
let testimonialIndex = 0;

// ---- PRELOADER ----
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('preloader').classList.add('hidden');
    document.body.style.overflow = 'visible';
    initAnimations();
    animateStats();
    createParticles();
  }, 1800);
  document.body.style.overflow = 'hidden';
});

// ---- NAVBAR SCROLL ----
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');
  const scrollY = window.scrollY;

  if (scrollY > 80) {
    navbar.classList.add('scrolled');
    backToTop.classList.add('visible');
  } else {
    navbar.classList.remove('scrolled');
    backToTop.classList.remove('visible');
  }

  // Active nav link
  const sections = ['home', 'categories', 'products', 'about', 'testimonials', 'contact'];
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      const rect = el.getBoundingClientRect();
      const link = document.querySelector(`a[href="#${id}"]`);
      if (link) {
        if (rect.top <= 120 && rect.bottom >= 120) {
          document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        }
      }
    }
  });
});

// ---- HAMBURGER MENU ----
function toggleMenu() {
  const links = document.getElementById('navLinks');
  const hamburger = document.getElementById('hamburger');
  links.classList.toggle('open');
  hamburger.classList.toggle('active');
}

// Close menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('navLinks').classList.remove('open');
    document.getElementById('hamburger').classList.remove('active');
  });
});

// ---- SEARCH ----
function toggleSearch() {
  const bar = document.getElementById('searchBar');
  bar.classList.toggle('open');
  if (bar.classList.contains('open')) {
    setTimeout(() => document.getElementById('searchInput').focus(), 100);
  }
}
document.getElementById('searchToggle').addEventListener('click', toggleSearch);

function closeSearch() {
  document.getElementById('searchBar').classList.remove('open');
}

function handleSearch(query) {
  if (!query.trim()) return;
  const q = query.toLowerCase();
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q)
  );
  renderProducts(filtered);
  document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
  closeSearch();
}

// ---- PRODUCTS ----
function renderProducts(list) {
  const grid = document.getElementById('productsGrid');
  if (!list || list.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:64px;color:var(--text-muted)">
      <div style="font-size:48px;margin-bottom:16px">🔍</div>
      <p style="font-size:18px;color:var(--text-secondary)">No products found</p>
    </div>`;
    return;
  }
  grid.innerHTML = list.map(p => `
    <div class="product-card" data-category="${p.category}" id="product-${p.id}">
      <div class="product-image-wrapper">
        <img
          src="${p.image}"
          alt="${p.name}"
          class="product-img"
          loading="lazy"
          onerror="this.style.display='none';this.nextElementSibling.style.display='flex';"
        />
        <span class="product-emoji-fallback" style="display:none">${p.emoji}</span>
        ${p.badge ? `<span class="product-badge ${p.badgeClass}">${p.badge}</span>` : ''}
        <button class="product-wishlist" onclick="showNotification('Added to Wishlist! ❤️')" title="Add to wishlist" aria-label="Wishlist">♡</button>
      </div>
      <div class="product-info">
        <div class="product-category">${getCategoryName(p.category)}</div>
        <h3 class="product-name">${p.name}</h3>
        <div class="product-rating">
          <span class="stars">${getStars(p.rating)}</span>
          <span class="rating-count">(${p.reviews})</span>
        </div>
        <div class="product-price">
          <span class="price-current">₹${p.price.toLocaleString('en-IN')}</span>
          <span class="price-original">₹${p.originalPrice.toLocaleString('en-IN')}</span>
          <span class="price-discount">${p.discount}% OFF</span>
        </div>
        <button class="product-add-btn" onclick="addToCart(${p.id})" id="addBtn-${p.id}">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          Add to Arsenal
        </button>
      </div>
    </div>
  `).join('');
  addRevealObserver();
}

function getCategoryName(cat) {
  const map = { knives: '🔪 Hunting Knives', bow: '🏹 Bows & Arrows', tactical: '⚡ Tactical Gear', selfdefense: '🛡️ Self-Defense', accessories: '🔧 Accessories' };
  return map[cat] || cat;
}

function getStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
}

function filterProducts(category) {
  currentFilter = category;
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(b => {
    b.classList.toggle('active', b.dataset.filter === category || (category !== 'all' && b.dataset.filter === category));
  });
  // Find the 'all' or matching button
  buttons.forEach(b => b.classList.remove('active'));
  const activeBtn = document.querySelector(`[data-filter="${category}"]`);
  if (activeBtn) activeBtn.classList.add('active');
  else if (category !== 'all') {
    document.querySelector('[data-filter="all"]').classList.remove('active');
  }

  const filtered = category === 'all' ? products : products.filter(p => p.category === category);
  renderProducts(filtered);
}

function scrollToProducts() {
  setTimeout(() => document.getElementById('products').scrollIntoView({ behavior: 'smooth' }), 100);
}

// ---- CART ----
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(c => c.id === productId);
  if (existing) {
    existing.qty = (existing.qty || 1) + 1;
    showNotification(`${product.name} qty updated! 🛒`);
  } else {
    cart.push({ ...product, qty: 1 });
    showNotification(`${product.name} added to Arsenal! ⚔️`);
  }

  updateCartUI();
  bounceCartIcon();
}

function removeFromCart(productId) {
  cart = cart.filter(c => c.id !== productId);
  updateCartUI();
}

function updateCartUI() {
  const badge = document.getElementById('cartBadge');
  const totalQty = cart.reduce((s, c) => s + (c.qty || 1), 0);
  badge.textContent = totalQty;
  badge.style.display = totalQty ? 'flex' : 'none';

  const cartItems = document.getElementById('cartItems');
  const cartFooter = document.getElementById('cartFooter');

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="empty-cart">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#444" stroke-width="1.5"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
        <p>Your cart is empty</p>
        <span>Add some gear to get started</span>
      </div>`;
    cartFooter.style.display = 'none';
  } else {
    cartItems.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div class="cart-item-icon">
          <img src="${item.image}" alt="${item.name}" class="cart-item-img" onerror="this.style.display='none';this.nextElementSibling.style.display='block';" />
          <span class="cart-item-emoji-fallback" style="display:none">${item.emoji}</span>
        </div>
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <p>₹${item.price.toLocaleString('en-IN')} × ${item.qty || 1}</p>
        </div>
        <button class="cart-item-remove" onclick="removeFromCart(${item.id})" title="Remove" aria-label="Remove">🗑</button>
      </div>
    `).join('');
    const total = cart.reduce((s, c) => s + c.price * (c.qty || 1), 0);
    document.getElementById('cartTotal').textContent = `₹${total.toLocaleString('en-IN')}`;
    cartFooter.style.display = 'block';
  }
}

function toggleCart() {
  const sidebar = document.getElementById('cartSidebar');
  const overlay = document.getElementById('cartOverlay');
  sidebar.classList.toggle('open');
  overlay.classList.toggle('open');
}

function bounceCartIcon() {
  const btn = document.querySelector('.cart-btn');
  btn.style.transform = 'scale(1.3)';
  setTimeout(() => btn.style.transform = '', 200);
}

// ---- TESTIMONIALS ----
function renderTestimonials() {
  const track = document.getElementById('testimonialsTrack');
  const dots = document.getElementById('carouselDots');

  track.innerHTML = testimonials.map(t => `
    <div class="testimonial-card">
      <div class="test-stars">${'★'.repeat(t.rating)}${'☆'.repeat(5 - t.rating)}</div>
      <p class="test-text">"${t.text}"</p>
      <div class="test-author">
        <div class="test-avatar">${t.name[0]}</div>
        <div>
          <div class="test-name">${t.name}</div>
          <div class="test-location">📍 ${t.location}</div>
          ${t.verified ? '<div class="test-verified">✓ VERIFIED PURCHASE</div>' : ''}
        </div>
      </div>
    </div>
  `).join('');

  const cardCount = testimonials.length;
  const visibleCount = window.innerWidth > 960 ? 3 : window.innerWidth > 600 ? 2 : 1;
  const totalSlides = cardCount - visibleCount + 1;

  dots.innerHTML = '';
  for (let i = 0; i < Math.max(1, totalSlides); i++) {
    const dot = document.createElement('div');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.onclick = () => goToTestimonial(i);
    dots.appendChild(dot);
  }
}

function goToTestimonial(index) {
  const track = document.getElementById('testimonialsTrack');
  const cards = track.querySelectorAll('.testimonial-card');
  const visibleCount = window.innerWidth > 960 ? 3 : window.innerWidth > 600 ? 2 : 1;
  const maxIndex = Math.max(0, testimonials.length - visibleCount);
  testimonialIndex = Math.max(0, Math.min(index, maxIndex));

  const cardWidth = cards[0].offsetWidth + 24;
  track.style.transform = `translateX(-${testimonialIndex * cardWidth}px)`;

  document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === testimonialIndex));
}

function nextTestimonial() {
  const visibleCount = window.innerWidth > 960 ? 3 : window.innerWidth > 600 ? 2 : 1;
  const maxIndex = Math.max(0, testimonials.length - visibleCount);
  goToTestimonial(testimonialIndex >= maxIndex ? 0 : testimonialIndex + 1);
}

function prevTestimonial() {
  const visibleCount = window.innerWidth > 960 ? 3 : window.innerWidth > 600 ? 2 : 1;
  const maxIndex = Math.max(0, testimonials.length - visibleCount);
  goToTestimonial(testimonialIndex <= 0 ? maxIndex : testimonialIndex - 1);
}

// Auto-rotate testimonials
setInterval(nextTestimonial, 5000);

// ---- NOTIFICATION ----
let notifTimeout;
function showNotification(msg) {
  const notif = document.getElementById('notification');
  const text = document.getElementById('notificationText');
  text.textContent = msg;
  notif.classList.add('show');
  clearTimeout(notifTimeout);
  notifTimeout = setTimeout(() => notif.classList.remove('show'), 3000);
}

// ---- CONTACT FORM ----
function handleContactForm(e) {
  e.preventDefault();
  const btn = document.getElementById('contactSubmitBtn');
  btn.innerHTML = '<span>Sending...</span>';
  btn.disabled = true;
  setTimeout(() => {
    btn.innerHTML = '<span>Message Sent! ✓</span>';
    btn.style.background = 'linear-gradient(135deg, #1a6e3a, #27ae60)';
    showNotification('Message sent successfully! We\'ll get back to you soon. 📬');
    setTimeout(() => {
      document.getElementById('contactForm').reset();
      btn.innerHTML = '<span>Send Message</span><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>';
      btn.style.background = '';
      btn.disabled = false;
    }, 2500);
  }, 1500);
}

// ---- NEWSLETTER ----
function handleNewsletter(e) {
  e.preventDefault();
  const email = document.getElementById('newsletterEmail').value;
  showNotification(`✅ Subscribed! Welcome to the Vansh Weapons family!`);
  document.getElementById('newsletterEmail').value = '';
}

// ---- STATS COUNTER ----
function animateStats() {
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = parseInt(el.dataset.target);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        el.textContent = target.toLocaleString('en-IN');
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current).toLocaleString('en-IN');
      }
    }, 16);
  });
}

// ---- PARTICLES ----
function createParticles() {
  const container = document.getElementById('particles');
  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div');
    p.style.cssText = `
      position: absolute;
      width: ${Math.random() * 3 + 1}px;
      height: ${Math.random() * 3 + 1}px;
      background: rgba(200,168,75,${Math.random() * 0.4 + 0.1});
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation: float ${Math.random() * 6 + 4}s ease-in-out ${Math.random() * 4}s infinite;
    `;
    container.appendChild(p);
  }
}

// ---- REVEAL ON SCROLL ----
function addRevealObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.product-card, .category-card, .trust-item, .testimonial-card, .contact-item, .feature-item, .about-mini-stat').forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });
}

function initAnimations() {
  addRevealObserver();
}



// ---- KEYBOARD SHORTCUT ----
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeSearch();
    document.getElementById('cartSidebar').classList.remove('open');
    document.getElementById('cartOverlay').classList.remove('open');
    // document.getElementById('chatbotContainer').classList.remove('open');
    // document.getElementById('chatbotToggle').classList.remove('active');
  }
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    toggleSearch();
  }
});

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
  renderProducts(products);
  renderTestimonials();
  updateCartUI();

  // Update nav offset for announcement bar height
  const annBar = document.querySelector('.announcement-bar');
  if (annBar) {
    document.getElementById('navbar').style.top = annBar.offsetHeight + 'px';
  }
});

// Responsive testimonials on resize
window.addEventListener('resize', () => {
  goToTestimonial(0);
  renderTestimonials();
});
