
(function () {
  "use strict";

  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }
  new PureCounter();

  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function (direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

const lightbox = GLightbox({
  selector: '.glightbox'
});
  document.querySelectorAll('.isotope-layout').forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function () {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function (filters) {
      filters.addEventListener('click', function () {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

// ====== PASSWORD ======
const PASSWORD = "010964010";

// ====== OPEN UPLOAD BOX ======
window.openUpload = function () {
  document.getElementById("uploadBox").style.display = "block";
};

// ====== CHECK PASSWORD ======
window.checkPassword = function () {
  const pass = document.getElementById("uploadPassword").value;

  if (pass === PASSWORD) {
    document.getElementById("imageInput").style.display = "block";
    document.getElementById("uploadPassword").disabled = true;
    localStorage.setItem("uploadUnlocked", "true");
  } else {
    alert("Wrong password ❌");
  }
};

// ====== SAVE IMAGE ======
function saveImage(src) {
  let images = JSON.parse(localStorage.getItem("portfolioImages")) || [];
  images.push(src);
  localStorage.setItem("portfolioImages", JSON.stringify(images));
}

// ====== LOAD IMAGES ======
function loadImages() {
  const container = document.querySelector(".isotope-container");
  if (!container) return;

  let images = JSON.parse(localStorage.getItem("portfolioImages")) || [];

  images.forEach(src => {
    const item = document.createElement("div");
    item.className = "col-lg-3 col-md-6 portfolio-item isotope-item filter-app";

    item.innerHTML = `
      <div class="portfolio-content h-100">
        <img src="${src}" class="img-fluid">
        <div class="portfolio-info">
          <h4>Habib Ayami</h4>
          <p>Forever yours, in every way</p>
          <a href="${src}" class="glightbox preview-link">
            <i class="bi bi-zoom-in"></i>
          </a>
        </div>
      </div>
    `;

    container.appendChild(item);
  });

  imagesLoaded(container, function () {
    new Isotope(container);
  });

  lightbox.reload();
}

// ====== ON LOAD ======
window.addEventListener("load", function () {
  // لو الباسورد كان متفعل قبل كده
  if (localStorage.getItem("uploadUnlocked") === "true") {
    document.getElementById("uploadBox").style.display = "block";
    document.getElementById("imageInput").style.display = "block";
    document.getElementById("uploadPassword").disabled = true;
  }

  loadImages();

  const imageInput = document.getElementById("imageInput");
  if (!imageInput) return;

  imageInput.addEventListener("change", function () {
    const file = this.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      const container = document.querySelector(".isotope-container");

      const item = document.createElement("div");
      item.className = "col-lg-3 col-md-6 portfolio-item isotope-item filter-app";

      item.innerHTML = `
        <div class="portfolio-content h-100">
          <img src="${e.target.result}" class="img-fluid">
          <div class="portfolio-info">
            <h4>New Image</h4>
            <p>Added by admin</p>
            <a href="${e.target.result}" class="glightbox preview-link">
              <i class="bi bi-zoom-in"></i>
            </a>
          </div>
        </div>
      `;

      container.appendChild(item);
      saveImage(e.target.result);

      imagesLoaded(container, function () {
        new Isotope(container);
      });

      lightbox.reload();
    };

    reader.readAsDataURL(file);
  });
});

})();
