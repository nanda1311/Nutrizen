/* ==========================================================================
   NUTRIZEN — SCRIPT.JS
   Handles: scroll progress bar, per-section "timer" fill bars,
   reveal-on-scroll animations, mobile nav toggle, active nav link.
   All images live directly in the HTML via src="images/...".
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------------------------------------------------------------- */
  /* 1. STAGGER DELAYS FOR CARD GRIDS (nice cascading reveal)          */
  /* ---------------------------------------------------------------- */
  document.querySelectorAll("#categoriesGrid .category-card").forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.1}s`;
  });
  document.querySelectorAll("#testimonialsGrid .testimonial-card").forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.12}s`;
  });

  /* ---------------------------------------------------------------- */
  /* 2. SCROLL PROGRESS BAR (global "timer")                          */
  /* ---------------------------------------------------------------- */
  const progressBar = document.getElementById("scrollProgress");
  function updateProgress(){
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = pct + "%";
  }
  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();

  /* ---------------------------------------------------------------- */
  /* 3. REVEAL-ON-SCROLL + PER-SECTION TIMER BARS                     */
  /* ---------------------------------------------------------------- */
  const revealEls = document.querySelectorAll(".reveal, .category-card, .testimonial-card");
  const timerEls  = document.querySelectorAll(".section-timer");

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });

  revealEls.forEach(el => revealObserver.observe(el));

  const timerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add("in-view");
        timerObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  timerEls.forEach(el => timerObserver.observe(el));

  /* ---------------------------------------------------------------- */
  /* 4. STICKY HEADER SHADOW ON SCROLL                                 */
  /* ---------------------------------------------------------------- */
  const header = document.getElementById("siteHeader");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 12){
      header.style.boxShadow = "0 8px 24px rgba(0,0,0,.06)";
    } else {
      header.style.boxShadow = "none";
    }
  }, { passive: true });

  /* ---------------------------------------------------------------- */
  /* 5. MOBILE NAV TOGGLE                                              */
  /* ---------------------------------------------------------------- */
  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("mainNav");
  navToggle.addEventListener("click", () => {
    mainNav.classList.toggle("open");
    navToggle.classList.toggle("active");
  });
  mainNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => mainNav.classList.remove("open"));
  });

  /* ---------------------------------------------------------------- */
  /* 6. ACTIVE NAV LINK ON SCROLL (highlights current section)        */
  /* ---------------------------------------------------------------- */
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = ["home", "about", "contact"].map(id => document.getElementById(id)).filter(Boolean);

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        navLinks.forEach(link => {
          link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      }
    });
  }, { threshold: 0.5 });

  sections.forEach(sec => navObserver.observe(sec));

  /* ---------------------------------------------------------------- */
  /* 7. FOOTER YEAR                                                    */
  /* ---------------------------------------------------------------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});




document.addEventListener("DOMContentLoaded", function () {

    const pills = document.querySelectorAll(".pill");
    const aboutText = document.getElementById("aboutText");

    const content = {
        story: "It Started With a Simple Question. Nutrizen began with a belief that better products shouldn't be difficult to access. RIVR is our first step in building a portfolio of healthier, hygienic and affordable everyday products.",

        mission: " A Healthier Everyday Within Everyone's Reach.To create a future where better products are accessible to everyone  making health, quality and hygiene a part of everyday life, not a premium choice.",

        vision: " To Make Better Products Accessible to Everyone. We create thoughtfully developed products focused on health, hygiene, quality and affordability, while avoiding unnecessary ingredients and complexity."
    };

    pills.forEach(function (pill) {

        pill.addEventListener("click", function () {

            // Don't do anything if already active
            if (this.classList.contains("active")) {
                return;
            }

            // Remove active from all pills
            pills.forEach(function (item) {
                item.classList.remove("active");
            });

            // Add active to clicked pill
            this.classList.add("active");

            // Fade out
            aboutText.classList.add("text-changing");

            // Change text after fade starts
            setTimeout(function () {

                const selected = pill.dataset.content;

                aboutText.textContent = content[selected];

                // Fade back in
                aboutText.classList.remove("text-changing");

            }, 350);

        });

    });

});



// TEAM SLIDER

document.addEventListener("DOMContentLoaded", function () {

    const slides = document.querySelectorAll(".team-slide");
    const dots = document.querySelectorAll(".team-dot");

    const prevButton = document.querySelector(".team-arrow-left");
    const nextButton = document.querySelector(".team-arrow-right");

    let currentSlide = 0;
    let autoSlide;

    const slideDuration = 6000;


    function showSlide(index) {

        if (index >= slides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = index;
        }


        /* Remove active class */
        slides.forEach(function (slide) {
            slide.classList.remove("active");
        });

        dots.forEach(function (dot) {
            dot.classList.remove("active");
        });


        /* Add active class */
        slides[currentSlide].classList.add("active");
        dots[currentSlide].classList.add("active");
    }


    function nextSlide() {
        showSlide(currentSlide + 1);
        restartAutoSlide();
    }


    function previousSlide() {
        showSlide(currentSlide - 1);
        restartAutoSlide();
    }

    function startAutoSlide() {

        autoSlide = setInterval(function () {
            showSlide(currentSlide + 1);
        }, slideDuration);

    }


    function restartAutoSlide() {

        clearInterval(autoSlide);
        startAutoSlide();

    }

    nextButton.addEventListener("click", function () {
        nextSlide();
    });

    prevButton.addEventListener("click", function () {
        previousSlide();
    });

    dots.forEach(function (dot) {

        dot.addEventListener("click", function () {

            const slideIndex = parseInt(
                this.getAttribute("data-slide")
            );

            showSlide(slideIndex);
            restartAutoSlide();

        });

    });

    showSlide(0);
    startAutoSlide();

});
