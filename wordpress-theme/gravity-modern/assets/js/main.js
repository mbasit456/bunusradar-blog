/**
 * Gravity Modern Main Scripts
 */
document.addEventListener('DOMContentLoaded', function () {
  // 1. Mobile Menu Toggle
  var mobileToggle = document.getElementById('mobileMenuToggle');
  var mobileDrawer = document.getElementById('mobileMenuDrawer');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', function () {
      var expanded = mobileToggle.getAttribute('aria-expanded') === 'true' || false;
      mobileToggle.setAttribute('aria-expanded', !expanded);
      mobileDrawer.classList.toggle('is-active');
    });
  }

  // 2. Search Bar Toggle
  var searchToggle = document.getElementById('searchToggle');
  var searchBar = document.getElementById('headerSearchBar');

  if (searchToggle && searchBar) {
    searchToggle.addEventListener('click', function () {
      searchBar.classList.toggle('is-active');
      if (searchBar.classList.contains('is-active')) {
        var input = searchBar.querySelector('input[type="search"]');
        if (input) {
          input.focus();
        }
      }
    });
  }

  // Close drawers on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (mobileDrawer && mobileDrawer.classList.contains('is-active')) {
        mobileDrawer.classList.remove('is-active');
        if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
      }
      if (searchBar && searchBar.classList.contains('is-active')) {
        searchBar.classList.remove('is-active');
      }
    }
  });

  // 3. Back To Top Button
  var backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    window.addEventListener('scroll', function () {
      if (window.pageYOffset > 350) {
        backToTopBtn.classList.add('is-visible');
      } else {
        backToTopBtn.classList.remove('is-visible');
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});
