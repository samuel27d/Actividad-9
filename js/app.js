/**
 * AgroConnect - Script de Interacciones para el Prototipo Estático
 * Totalmente autónomo y sin dependencias externas.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Manejo del Menú Móvil
  const menuBtn = document.querySelector('.mobile-menu-toggle');
  const mobileBackdrop = document.querySelector('.mobile-nav-backdrop');
  const mobileClose = document.querySelector('.mobile-nav-close');

  if (menuBtn && mobileBackdrop) {
    menuBtn.addEventListener('click', () => {
      mobileBackdrop.style.display = 'block';
      document.body.style.overflow = 'hidden';
    });

    const closeNav = () => {
      mobileBackdrop.style.display = 'none';
      document.body.style.overflow = '';
    };

    if (mobileClose) mobileClose.addEventListener('click', closeNav);
    mobileBackdrop.addEventListener('click', (e) => {
      if (e.target === mobileBackdrop) closeNav();
    });
  }

  // 2. Buscador del Header
  const searchForm = document.querySelector('.header-search-box');
  const searchInput = document.querySelector('.header-search-input');
  const searchClear = document.querySelector('.header-search-clear');

  if (searchInput && searchClear) {
    searchInput.addEventListener('input', () => {
      searchClear.style.display = searchInput.value.trim() ? 'flex' : 'none';
    });
    searchClear.addEventListener('click', () => {
      searchInput.value = '';
      searchClear.style.display = 'none';
      searchInput.focus();
    });
  }

  if (searchForm && searchInput) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const query = searchInput.value.trim();
      if (query) {
        window.location.href = `productos.html?search=${encodeURIComponent(query)}`;
      }
    });
  }

  // 3. Selectores de Cantidad (+ / -)
  document.querySelectorAll('.quantity-selector').forEach(selector => {
    const decBtn = selector.querySelector('.qty-btn-decrement, button:first-child');
    const incBtn = selector.querySelector('.qty-btn-increment, button:last-child');
    const display = selector.querySelector('.qty-display, input, span');

    if (decBtn && incBtn && display) {
      decBtn.addEventListener('click', () => {
        let val = parseInt(display.textContent || display.value || '1', 10);
        if (val > 1) {
          val--;
          if (display.tagName === 'INPUT') display.value = val;
          else display.textContent = val;
        }
      });
      incBtn.addEventListener('click', () => {
        let val = parseInt(display.textContent || display.value || '1', 10);
        val++;
        if (display.tagName === 'INPUT') display.value = val;
        else display.textContent = val;
      });
    }
  });

  // 4. Modales Estáticos (abrir y cerrar)
  document.querySelectorAll('[data-modal-open]').forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-modal-open');
      const targetModal = document.getElementById(modalId);
      if (targetModal) targetModal.style.display = 'flex';
    });
  });

  document.querySelectorAll('[data-modal-close]').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-backdrop');
      if (modal) modal.style.display = 'none';
    });
  });

  // 5. Relleno Rápido de Credenciales en Login
  document.querySelectorAll('[data-quick-login]').forEach(btn => {
    btn.addEventListener('click', () => {
      const email = btn.getAttribute('data-email');
      const role = btn.getAttribute('data-role');
      const emailInput = document.getElementById('email');
      const passInput = document.getElementById('password');
      if (emailInput) emailInput.value = email;
      if (passInput) passInput.value = 'Demo1234*';
      
      const badge = document.querySelector('.selected-role-badge');
      if (badge) {
        badge.textContent = `Perfil cargado: ${role}`;
        badge.style.display = 'inline-block';
      }
    });
  });

  // 6. Filtros del Catálogo en Productos
  const filterBtns = document.querySelectorAll('.category-filter-item, [data-category-filter]');
  const productCards = document.querySelectorAll('.catalog-layout .product-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const cat = btn.getAttribute('data-category-filter');
      productCards.forEach(card => {
        if (!cat || cat === 'all' || card.getAttribute('data-category') === cat) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
});

