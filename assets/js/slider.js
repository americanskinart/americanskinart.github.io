// assets/js/slider.js — JSON-driven showcase slider (instagram-first, fallback to inline)
(function(){
  const ARTIST_ROUTES = [
    { key: 'sinisterblack_tattoos', handle: '@sinisterblack_tattoos', page: 'sinisterblack_tattoos.html' },
    { key: 'dannypeltier.ink', handle: '@dannypeltier.ink', page: 'dannypeltier.ink.html' },
    { key: 'cruelbloomtattoo', handle: '@cruelbloomtattoo', page: 'cruelbloomtattoo.html' }
  ];

  const Slider = function(opts){
    const conf = Object.assign({
      mount: '#recent-showcase',
      json: '/data/instagram-feed.json',
      interval: 4200,
      limit: 18
    }, opts || {});

    const mount = document.querySelector(conf.mount);
    if (!mount) return;

    // Helper: shuffle (Fisher–Yates)
    function shuffle(arr){
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    }

    // Try instagram feed first (data-json attr or default conf.json)
    const attrJson = mount.getAttribute('data-json');
    const jsonUrl = attrJson || conf.json;

    function tryInstagram(){
      return fetch(jsonUrl, {cache: 'no-store'})
        .then(r => { if(!r.ok) throw new Error('HTTP '+r.status); return r.json(); })
        .then(list => Array.isArray(list) ? list : []);
    }

    // Fallback: merge inline datasets (#devin-works, #danny-works, #dale-works)
    function fallbackInline(){
      const ids = ['devin-works','danny-works','dale-works'];
      let all = [];
      ids.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
          try {
            const arr = JSON.parse(el.textContent || '[]');
            if (Array.isArray(arr)) all = all.concat(arr);
          } catch(e){}
        }
      });
      return shuffle(all).slice(0, conf.limit);
    }

    function fallbackHandle(it){
      if (!it) return '';
      if (it.username) return it.username.startsWith('@') ? it.username : '@' + it.username;
      if (it.alt) {
        const match = it.alt.match(/@[\w.\-]+/);
        if (match) return match[0];
      }
      return '';
    }

    function getArtistMeta(it){
      if (!it) return { handle: '', page: '' };
      const haystack = [it.src, it.alt, it.username]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      for (const artist of ARTIST_ROUTES) {
        const key = artist.key.toLowerCase();
        const handleKey = artist.handle.replace('@','').toLowerCase();
        if (haystack.includes(key) || haystack.includes(handleKey)) {
          return { handle: artist.handle, page: artist.page };
        }
      }
      return { handle: fallbackHandle(it), page: '' };
    }

    function initWith(items){
      if (!items || !items.length) items = fallbackInline();
      mount.innerHTML = [
        '<div class="slider" aria-roledescription="carousel">',
        '  <div class="slides" role="list"></div>',
        '  <button class="nav prev" aria-label="Previous slide" type="button">&#10094;</button>',
        '  <button class="nav next" aria-label="Next slide" type="button">&#10095;</button>',
        '  <div class="dots" role="tablist" aria-label="Slides"></div>',
        '</div>',
        '<div class="slider-lightbox hidden fixed inset-0 bg-black/95 backdrop-blur z-50 flex items-center justify-center p-4" style="cursor: pointer;">',
        '  <button class="lightbox-prev absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 border border-white/20 flex items-center justify-center hover:bg-black/80 transition-colors z-10" aria-label="Previous image">',
        '    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">',
        '      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>',
        '    </svg>',
        '  </button>',
        '  <img class="max-h-[90vh] max-w-[90vw] rounded-xl border border-white/10" alt="" style="cursor: pointer;" />',
        '  <button class="lightbox-next absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 border border-white/20 flex items-center justify-center hover:bg-black/80 transition-colors z-10" aria-label="Next image">',
        '    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">',
        '      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>',
        '    </svg>',
        '  </button>',
        '  <a class="absolute top-6 right-6 ink-button text-sm" style="cursor: pointer; pointer-events: auto;">View Artist Page</a>',
        '</div>'
      ].join('');

      const el = {
        slider: mount.querySelector('.slider'),
        track: mount.querySelector('.slides'),
        prev:  mount.querySelector('.prev'),
        next:  mount.querySelector('.next'),
        dots:  mount.querySelector('.dots'),
        lightbox: mount.querySelector('.slider-lightbox'),
        lightboxImg: mount.querySelector('.slider-lightbox img'),
        lightboxLink: mount.querySelector('.slider-lightbox a'),
        lightboxPrev: mount.querySelector('.lightbox-prev'),
        lightboxNext: mount.querySelector('.lightbox-next')
      };

      let slides = [], idx = 0, timer = null, hovering = false, touching = false, touchStartX = 0, touchStartY = 0, touchStartTime = 0;
      let lightboxIndex = 0, lightboxItems = [];

      // Lightbox functions
      function openLightbox(src, alt, artistPage) {
        el.lightboxImg.src = src;
        el.lightboxImg.alt = alt;

        if (artistPage && artistPage !== '#') {
          el.lightboxLink.href = artistPage;
          el.lightboxLink.style.display = 'block';
        } else {
          el.lightboxLink.style.display = 'none';
        }

        el.lightbox.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
      }

      function closeLightbox() {
        el.lightbox.classList.add('hidden');
        document.body.style.overflow = '';
      }

      function showLightboxImage(index) {
        if (!lightboxItems[index]) return;
        lightboxIndex = index;
        const item = lightboxItems[index];
        const meta = getArtistMeta(item);
        const href = meta.page || item.href || '#';

        el.lightboxImg.src = item.src;
        el.lightboxImg.alt = item.alt || '';

        if (href && href !== '#') {
          el.lightboxLink.href = href;
          el.lightboxLink.style.display = 'block';
        } else {
          el.lightboxLink.style.display = 'none';
        }
      }

      function nextLightboxImage() {
        lightboxIndex = (lightboxIndex + 1) % lightboxItems.length;
        showLightboxImage(lightboxIndex);
      }

      function prevLightboxImage() {
        lightboxIndex = (lightboxIndex - 1 + lightboxItems.length) % lightboxItems.length;
        showLightboxImage(lightboxIndex);
      }

      // Lightbox event handlers
      el.lightbox.addEventListener('click', (e) => {
        // Close when clicking the background (not the image or link)
        if (e.target === el.lightbox) {
          closeLightbox();
        }
      });

      el.lightboxImg.addEventListener('click', (e) => {
        e.stopPropagation();
        closeLightbox();
      });

      el.lightboxLink.addEventListener('click', (e) => {
        e.stopPropagation(); // Don't close lightbox when clicking the link
      });

      // Navigation button handlers
      el.lightboxPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        prevLightboxImage();
      });

      el.lightboxNext.addEventListener('click', (e) => {
        e.stopPropagation();
        nextLightboxImage();
      });

      // Keyboard navigation
      document.addEventListener('keydown', (e) => {
        if (el.lightbox.classList.contains('hidden')) return;
        if (e.key === 'Escape') {
          closeLightbox();
        } else if (e.key === 'ArrowRight') {
          nextLightboxImage();
        } else if (e.key === 'ArrowLeft') {
          prevLightboxImage();
        }
      });

      function render(items){
        el.track.innerHTML = '';
        el.dots.innerHTML = '';
        lightboxItems = items; // Store items for lightbox navigation

        items.forEach((it, i) => {
          const li = document.createElement('figure');
          li.className = 'slide';
          li.setAttribute('role','group');
          li.setAttribute('aria-roledescription','slide');
          li.setAttribute('aria-label', (i+1) + ' of ' + items.length);

          const meta = getArtistMeta(it);
          const href = meta.page || it.href || '#';

          const img = document.createElement('img');
          img.decoding = 'async';
          img.loading = 'lazy';
          img.src = it.src;
          img.alt = it.alt || '';
          img.style.cursor = 'pointer';

          // Click handler to open lightbox
          img.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            lightboxIndex = i; // Set current index
            openLightbox(it.src, it.alt || '', href);
          });

          const cap = document.createElement('figcaption');
          cap.className = 'caption';
          const handle = meta.handle;
          cap.textContent = handle;
          if (!handle) cap.classList.add('hidden');

          li.appendChild(img);
          li.appendChild(cap);
          el.track.appendChild(li);

          const dot = document.createElement('button');
          dot.className = 'dot';
          dot.setAttribute('role','tab');
          dot.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
          dot.setAttribute('aria-controls', 'slide-' + i);
          dot.type = 'button';
          dot.addEventListener('click', () => go(i));
          el.dots.appendChild(dot);
        });

        slides = Array.from(el.track.children);
        go(0, true);
      }

      function go(n, instant){
        if (!slides.length) return;
        idx = (n + slides.length) % slides.length;
        const offset = -idx * 100;
        el.track.style.transition = instant ? 'none' : '';
        el.track.style.transform = 'translateX(' + offset + '%)';
        Array.from(el.dots.children).forEach((d,i)=>d.setAttribute('aria-selected', i===idx?'true':'false'));
      }

      function next(){ go(idx + 1); }
      function prev(){ go(idx - 1); }

      function start(){
        stop();
        timer = setInterval(()=>{ if(!hovering && !touching) next(); }, conf.interval);
      }
      function stop(){ if (timer) { clearInterval(timer); timer = null; } }

      // Events
      el.next.addEventListener('click', next);
      el.prev.addEventListener('click', prev);
      el.slider.addEventListener('mouseenter', ()=>{ hovering = true; stop(); });
      el.slider.addEventListener('mouseleave', ()=>{ hovering = false; start(); });
      // Keyboard
      el.slider.tabIndex = 0;
      el.slider.addEventListener('keydown', (e)=>{
        if (e.key === 'ArrowRight') next();
        if (e.key === 'ArrowLeft') prev();
      });
      // Touch with improved swipe detection
      el.slider.addEventListener('touchstart', (e)=>{
        touching = true;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        touchStartTime = Date.now();
        stop();
      }, {passive:true});

      el.slider.addEventListener('touchmove', (e)=>{
        if (!touching) return;
        const touchCurrentX = e.touches[0].clientX;
        const touchCurrentY = e.touches[0].clientY;
        const dx = touchCurrentX - touchStartX;
        const dy = touchCurrentY - touchStartY;

        // Only handle horizontal swipes (prevent conflict with vertical scroll)
        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 10) {
          e.preventDefault();
        }
      }, {passive: false});

      el.slider.addEventListener('touchend', (e)=>{
        if (!touching) return;
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        const dx = touchEndX - touchStartX;
        const dy = touchEndY - touchStartY;
        const dt = Date.now() - touchStartTime;

        // Swipe must be primarily horizontal and meet minimum distance/speed
        const minSwipeDistance = 50;
        const maxSwipeTime = 300;

        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > minSwipeDistance) {
          if (dx < 0) {
            next(); // Swipe left -> next
          } else {
            prev(); // Swipe right -> prev
          }
        }

        touching = false;
        start();
      });

      render(items && items.length ? items.slice(0, conf.limit) : fallbackInline());
      start();
    }

    // Boot: IG-first, fallback to inline
    tryInstagram().then(items => initWith(shuffle(items || []))).catch(() => initWith([]));
  };

  window.ASA_Slider = Slider;
  if (document.querySelector('#recent-showcase')) new Slider();
})();
