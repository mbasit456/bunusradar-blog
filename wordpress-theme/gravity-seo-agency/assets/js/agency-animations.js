/**
 * Gravity SEO Agency - Kinetic Motion & AI Animation Engine
 */
document.addEventListener('DOMContentLoaded', function () {
  // 1. Scroll-Triggered Reveal Animations (IntersectionObserver)
  var reveals = document.querySelectorAll('.reveal-on-scroll');
  if ('IntersectionObserver' in window && reveals.length > 0) {
    var revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    reveals.forEach(function (el) {
      el.classList.add('is-revealed');
    });
  }

  // 2. Animated Counter Numbers
  var statNumbers = document.querySelectorAll('.stat-number[data-counter]');
  if ('IntersectionObserver' in window && statNumbers.length > 0) {
    var counterObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var target = entry.target;
          var endValue = parseFloat(target.getAttribute('data-counter')) || 0;
          var prefix = target.getAttribute('data-prefix') || '';
          var suffix = target.getAttribute('data-suffix') || '';
          var isDecimal = target.getAttribute('data-decimal') === 'true';
          var duration = 1800; // ms
          var startTime = null;

          function animateCount(timestamp) {
            if (!startTime) startTime = timestamp;
            var progress = Math.min((timestamp - startTime) / duration, 1);
            // Ease out cubic
            var easeProgress = 1 - Math.pow(1 - progress, 3);
            var currentVal = easeProgress * endValue;

            if (isDecimal) {
              target.textContent = prefix + currentVal.toFixed(1) + suffix;
            } else {
              target.textContent = prefix + Math.floor(currentVal).toLocaleString() + suffix;
            }

            if (progress < 1) {
              requestAnimationFrame(animateCount);
            } else {
              if (isDecimal) {
                target.textContent = prefix + endValue.toFixed(1) + suffix;
              } else {
                target.textContent = prefix + endValue.toLocaleString() + suffix;
              }
            }
          }

          requestAnimationFrame(animateCount);
          observer.unobserve(target);
        }
      });
    }, { threshold: 0.3 });

    statNumbers.forEach(function (el) {
      counterObserver.observe(el);
    });
  }

  // 3. Interactive Cursor Spotlight on Bento Cards (Linear / Vercel style)
  var bentoCards = document.querySelectorAll('.bento-card, .pricing-card');
  bentoCards.forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var rect = card.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', x + 'px');
      card.style.setProperty('--mouse-y', y + 'px');
    });
  });

  // 4. Interactive Live SEO Scanner Simulator
  var auditForm = document.getElementById('heroAuditForm');
  var scanResultsCard = document.getElementById('scanResultsCard');
  var scanProgressFill = document.getElementById('scanProgressFill');
  var scanLog = document.getElementById('scanTerminalLog');

  if (auditForm && scanResultsCard) {
    auditForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = auditForm.querySelector('input[type="text"]');
      var domain = input && input.value.trim() ? input.value.trim() : 'example.com';

      // Clean domain formatting
      domain = domain.replace(/^https?:\/\//i, '').replace(/\/.*$/, '');

      scanResultsCard.classList.add('is-active');
      if (scanProgressFill) scanProgressFill.style.width = '0%';
      if (scanLog) scanLog.innerHTML = '<span style="color:#00f2fe;">&gt; Initializing AI Crawler targeting: <strong>' + escapeHtml(domain) + '</strong>...</span>';

      setTimeout(function () {
        if (scanProgressFill) scanProgressFill.style.width = '35%';
        if (scanLog) scanLog.innerHTML += '<br><span style="color:#94a3b8;">&gt; Analyzing Core Web Vitals, Vector Entities &amp; Inbound Link Velocity...</span>';
      }, 500);

      setTimeout(function () {
        if (scanProgressFill) scanProgressFill.style.width = '75%';
        if (scanLog) scanLog.innerHTML += '<br><span style="color:#8b5cf6;">&gt; Evaluating generative search presence (ChatGPT &amp; Perplexity AI)...</span>';
      }, 1100);

      setTimeout(function () {
        if (scanProgressFill) scanProgressFill.style.width = '100%';
        if (scanLog) {
          scanLog.innerHTML += '<br><span style="color:#10b981; font-weight:700;">&gt; [AUDIT COMPLETE] Health Score: 92/100. 14 High-Value AI Keyword Opportunities Found!</span>';
        }
      }, 1800);
    });
  }

  function escapeHtml(text) {
    return text.replace(/[&<>"']/g, function (m) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[m];
    });
  }

  // 5. Interactive FAQ Accordion
  var faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(function (button) {
    button.addEventListener('click', function () {
      var item = button.closest('.faq-item');
      var wasOpen = item.classList.contains('is-open');

      // Close all others
      document.querySelectorAll('.faq-item').forEach(function (el) {
        el.classList.remove('is-open');
      });

      if (!wasOpen) {
        item.classList.add('is-open');
      }
    });
  });

  // 6. Mobile Menu Toggle
  var mobileToggle = document.getElementById('mobileNavToggle');
  var mobileDrawer = document.getElementById('mobileNavDrawer');
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', function () {
      mobileDrawer.classList.toggle('is-active');
    });
  }
});
