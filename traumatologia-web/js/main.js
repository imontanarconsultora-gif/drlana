/* =====================================================
   TRAUMATOLOGÍA A DOMICILIO — Dr. Luciano Germán Lana
   JavaScript principal (compatible con Bootstrap 5)
   ===================================================== */

/* ── NAVBAR: efecto scroll ───────────────────────────── */
(function () {
  var navbar = document.getElementById('navbar');
  if (!navbar) return;
  window.addEventListener('scroll', function () {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });
})();

/* ── SCROLL REVEAL ───────────────────────────────────── */
(function () {
  var reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach(function (el) { observer.observe(el); });
})();

/* ── SMOOTH SCROLL (cierra el menú Bootstrap al navegar) */
(function () {
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      var navH = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--nav-h')
      ) || 68;
      var top = target.getBoundingClientRect().top + window.pageYOffset - navH;
      window.scrollTo({ top: top, behavior: 'smooth' });

      var bsNav = document.getElementById('navbarNav');
      if (bsNav && bsNav.classList.contains('show')) {
        var instance = bootstrap.Collapse.getInstance(bsNav);
        if (instance) instance.hide();
      }
    });
  });
})();

/* ── ACTIVE NAV LINK según sección visible ──────────── */
(function () {
  var sections = document.querySelectorAll('section[id]');
  var links    = document.querySelectorAll('.nav-link-site');
  if (!sections.length || !links.length) return;

  function onScroll() {
    var scrollY = window.pageYOffset;
    var navH    = 80;
    var current = '';

    sections.forEach(function (section) {
      if (scrollY >= section.offsetTop - navH - 20) {
        current = section.getAttribute('id');
      }
    });

    links.forEach(function (link) {
      link.classList.remove('active-nav');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active-nav');
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
})();

/* ── AÑO DINÁMICO en el footer ───────────────────────── */
(function () {
  var copyEl = document.querySelector('.footer-copy');
  if (copyEl) {
    copyEl.textContent = copyEl.textContent.replace(/\d{4}/, new Date().getFullYear());
  }
})();

/* ── FORMULARIO DE TURNO ─────────────────────────────── */
(function () {
  var form        = document.getElementById('turnoForm');
  var campoOS     = document.getElementById('campoObraSocial');
  var radiosOS    = document.querySelectorAll('input[name="obra_social_tiene"]');
  var submitBtn   = document.getElementById('turnoSubmit');
  var successMsg  = document.getElementById('turnoSuccess');
  var errorMsg    = document.getElementById('turnoError');
  var horariosErr = document.getElementById('horariosError');

  if (!form) return;

  /* Mostrar/ocultar campo "¿Cuál obra social?" */
  radiosOS.forEach(function (radio) {
    radio.addEventListener('change', function () {
      if (this.value === 'Sí') {
        campoOS.style.display = 'block';
        campoOS.querySelector('input').focus();
      } else {
        campoOS.style.display = 'none';
        campoOS.querySelector('input').value = '';
      }
    });
  });

  /* Validar que al menos un horario esté seleccionado */
  function hayHorarioSeleccionado() {
    return form.querySelectorAll('input[name="horarios"]:checked').length > 0;
  }

  /* Envío del formulario vía fetch (sin redirigir la página) */
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    /* Validar horarios manualmente */
    if (!hayHorarioSeleccionado()) {
      horariosErr.style.display = 'block';
      horariosErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    horariosErr.style.display = 'none';

    /* Ocultar mensajes previos */
    successMsg.style.display = 'none';
    errorMsg.style.display   = 'none';

    /* Estado de carga */
    submitBtn.disabled     = true;
    submitBtn.innerHTML    = '<span class="spinner-border spinner-border-sm me-2" role="status"></span> Enviando...';

    var data = new FormData(form);

    fetch(form.action, {
      method:  'POST',
      body:    data,
      headers: { 'Accept': 'application/json' }
    })
      .then(function (response) {
        if (response.ok) {
          form.reset();
          campoOS.style.display  = 'none';
          successMsg.style.display = 'flex';
          successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
          return response.json().then(function (data) {
            throw new Error(data.errors ? data.errors.map(function(e){ return e.message; }).join(', ') : 'Error');
          });
        }
      })
      .catch(function () {
        errorMsg.style.display = 'flex';
        errorMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
      })
      .finally(function () {
        submitBtn.disabled  = false;
        submitBtn.innerHTML = '<i class="bi bi-send-fill me-1"></i> Enviar solicitud de turno';
      });
  });

  /* Ocultar error de horarios al hacer clic en alguno */
  form.querySelectorAll('input[name="horarios"]').forEach(function (cb) {
    cb.addEventListener('change', function () {
      if (hayHorarioSeleccionado()) horariosErr.style.display = 'none';
    });
  });
})();
