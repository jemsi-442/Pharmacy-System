// Small responsive nav toggler. Adds event listeners to .hamburger and .overlay
(function(){
  function $(sel){return document.querySelector(sel);} 
  function $$ (sel){return document.querySelectorAll(sel);} 

  document.addEventListener('DOMContentLoaded', function(){
    var body = document.body;
    // Insert overlay element if not present
    if (!$('.overlay')){
      var ov = document.createElement('div');
      ov.className = 'overlay';
      document.body.appendChild(ov);
    }

    // Insert hamburger button if not present
    if (!$('.hamburger')){
      var hb = document.createElement('button');
      hb.className = 'hamburger';
      hb.setAttribute('aria-label','Open navigation');
      hb.innerHTML = '<span class="bar" aria-hidden="true"></span>';
      document.body.appendChild(hb);
    }

    var hamburger = $('.hamburger');
    var overlay = $('.overlay');
    var sidebar = $('.sidebar');

    function openNav(){
      if (!sidebar) return;
      sidebar.classList.add('open');
      overlay.classList.add('show');
      hamburger.setAttribute('aria-expanded','true');
      // prevent body scroll
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    }
    function closeNav(){
      if (!sidebar) return;
      sidebar.classList.remove('open');
      overlay.classList.remove('show');
      hamburger.setAttribute('aria-expanded','false');
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', function(e){
      if (sidebar.classList.contains('open')) closeNav(); else openNav();
    });

    overlay.addEventListener('click', function(){ closeNav(); });

    // Close sidebar on escape
    document.addEventListener('keydown', function(e){ if (e.key === 'Escape') closeNav(); });

    // Ensure initial aria state
    hamburger.setAttribute('aria-expanded','false');

  });
})();
