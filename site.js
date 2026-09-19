(function(){
  // Mobile nav toggle
  var navLinks = document.getElementById('navLinks');
  var navToggle = document.getElementById('navToggle');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function(){
      var open = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Accordion toggles (past works, brochure transcript)
  document.querySelectorAll('[data-toggle]').forEach(function(btn){
    btn.addEventListener('click', function(){
      var panel = document.getElementById(btn.getAttribute('aria-controls'));
      if (!panel) return;
      var expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      panel.hidden = expanded;
      var chevron = btn.querySelector('.chevron');
      if (chevron) chevron.classList.toggle('open', !expanded);
      var label = btn.querySelector('.toggle-label');
      if (label && label.dataset.altText) {
        var current = label.textContent;
        label.textContent = label.dataset.altText;
        label.dataset.altText = current;
      }
    });
  });

  // Lightbox for brochure / image panels
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = lightbox ? lightbox.querySelector('img') : null;
  function openLightbox(src, alt){
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    lightbox.hidden = false;
  }
  function closeLightbox(){
    if (!lightbox) return;
    lightbox.hidden = true;
    if (lightboxImg) lightboxImg.src = '';
  }
  document.querySelectorAll('[data-lightbox-src]').forEach(function(el){
    el.addEventListener('click', function(){
      openLightbox(el.getAttribute('data-lightbox-src'), el.getAttribute('data-lightbox-alt'));
    });
  });
  if (lightbox) {
    lightbox.addEventListener('click', function(e){
      if (e.target === lightbox || e.target.closest('.lightbox-close')) closeLightbox();
    });
    document.addEventListener('keydown', function(e){
      if (e.key === 'Escape') closeLightbox();
    });
  }

  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
