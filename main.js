(function () {
  'use strict';

  var modalOverlay = document.getElementById('modal-overlay');
  var modalBackdrop = document.getElementById('modal-backdrop');
  var modalClose = document.getElementById('modal-close');
  var mobileMenu = document.getElementById('mobile-menu');
  var btnMobileMenu = document.getElementById('btn-mobile-menu');
  var iconMenu = document.getElementById('icon-menu');
  var iconClose = document.getElementById('icon-close');
  var signupForm = document.getElementById('signup-form');
  var toast = document.getElementById('toast');
  var toastDesc = document.getElementById('toast-desc');
  var btnTogglePassword = document.getElementById('btn-toggle-password');
  var senhaInput = document.getElementById('senha');
  var iconEye = document.querySelector('.icon-eye');
  var iconEyeOff = document.querySelector('.icon-eye-off');

  function openModal() {
    if (modalOverlay) {
      modalOverlay.classList.add('is-open');
      modalOverlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal() {
    if (modalOverlay) {
      modalOverlay.classList.remove('is-open');
      modalOverlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  function toggleMobileMenu() {
    if (mobileMenu) {
      mobileMenu.classList.toggle('is-open');
      if (iconMenu && iconClose) {
        var isOpen = mobileMenu.classList.contains('is-open');
        iconMenu.style.display = isOpen ? 'none' : 'block';
        iconClose.style.display = isOpen ? 'block' : 'none';
      }
    }
  }

  function showToast(message) {
    if (toastDesc) toastDesc.textContent = message || 'As senhas não coincidem.';
    if (toast) {
      toast.classList.add('is-visible');
      setTimeout(function () {
        toast.classList.remove('is-visible');
      }, 4000);
    }
  }

  function togglePasswordVisibility() {
    if (!senhaInput || !btnTogglePassword) return;
    var isPassword = senhaInput.type === 'password';
    senhaInput.type = isPassword ? 'text' : 'password';
    if (iconEye) iconEye.style.display = isPassword ? 'none' : 'block';
    if (iconEyeOff) iconEyeOff.style.display = isPassword ? 'block' : 'none';
    btnTogglePassword.setAttribute('aria-label', isPassword ? 'Ocultar senha' : 'Mostrar senha');
  }

  // Open modal buttons
  ['btn-open-modal', 'btn-hero-modal', 'btn-cta-modal'].forEach(function (id) {
    var btn = document.getElementById(id);
    if (btn) btn.addEventListener('click', openModal);
  });
  var btnOpenModalMobile = document.getElementById('btn-open-modal-mobile');
  if (btnOpenModalMobile) {
    btnOpenModalMobile.addEventListener('click', function () { openModal(); toggleMobileMenu(); });
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('is-open')) closeModal();
  });

  if (btnMobileMenu) btnMobileMenu.addEventListener('click', toggleMobileMenu);

  // Close mobile menu when clicking a link
  var mobileLinks = document.querySelectorAll('.mobile-nav-link');
  mobileLinks.forEach(function (link) {
    link.addEventListener('click', function () { toggleMobileMenu(); });
  });

  if (btnTogglePassword) btnTogglePassword.addEventListener('click', togglePasswordVisibility);

  if (signupForm) {
    signupForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var senha = document.getElementById('senha');
      var senha2 = document.getElementById('senha2');
      if (!senha || !senha2) return;
      if (senha.value !== senha2.value) {
        showToast('As senhas não coincidem.');
        return;
      }
      var form = document.createElement('form');
      form.method = 'POST';
      form.action = '../bot/production/cadastro_user.php';
      var data = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        senha: senha.value,
        senha2: senha2.value
      };
      Object.keys(data).forEach(function (key) {
        var input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = data[key];
        form.appendChild(input);
      });
      document.body.appendChild(form);
      form.submit();
    });
  }
})();
