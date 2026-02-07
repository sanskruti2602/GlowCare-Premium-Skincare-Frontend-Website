document.addEventListener("DOMContentLoaded", () => {

  /* =====================================================
     NAVBAR ACTIVE LINK ON SCROLL
  ===================================================== */
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav__links a");

  function updateActiveNav() {
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");

      if (scrollPosition >= top && scrollPosition < top + height) {
        navLinks.forEach(link => link.classList.remove("active"));
        const activeLink = document.querySelector(
          `.nav__links a[href="#${id}"]`
        );
        activeLink?.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", updateActiveNav);


  /* =====================================================
     HEADER SCROLL SHADOW (PREMIUM FEEL)
  ===================================================== */
  const header = document.querySelector(".header");

  window.addEventListener("scroll", () => {
    header.style.boxShadow =
      window.scrollY > 20
        ? "0 8px 24px rgba(0,0,0,0.08)"
        : "0 1px 2px rgba(0,0,0,0.04)";
  });


  /* =====================================================
     HERO BUTTON SCROLL ACTIONS
  ===================================================== */
  const shopBtn = document.querySelector(".hero__actions button:first-child");
  const learnBtn = document.querySelector(".hero__actions button:last-child");

  shopBtn?.addEventListener("click", () => {
    document.querySelector("#products")?.scrollIntoView({
      behavior: "smooth"
    });
  });

  learnBtn?.addEventListener("click", () => {
    document.querySelector("#about")?.scrollIntoView({
      behavior: "smooth"
    });
  });


  /* =====================================================
     SCROLL REVEAL ANIMATIONS
     (RESPECTS prefers-reduced-motion)
  ===================================================== */
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (!prefersReducedMotion) {
    const revealItems = document.querySelectorAll(
      ".hero__content, .hero__image, .about__content, .product-card, .ingredients__content, .review, .contact__form"
    );

    revealItems.forEach(item => {
      item.style.opacity = "0";
      item.style.transform = "translateY(30px)";
      item.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    });

    function revealOnScroll() {
      const trigger = window.innerHeight * 0.85;

      revealItems.forEach(item => {
        const rect = item.getBoundingClientRect().top;
        if (rect < trigger) {
          item.style.opacity = "1";
          item.style.transform = "translateY(0)";
        }
      });
    }

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();
  }


  /* =====================================================
     PRODUCT CARD BUTTON UX FEEDBACK
  ===================================================== */
  const productButtons = document.querySelectorAll(".product-card button");

  productButtons.forEach(button => {
    button.addEventListener("click", () => {
      const originalText = button.textContent;

      button.textContent = "Added ✓";
      button.disabled = true;

      setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
      }, 1500);
    });
  });


  /* =====================================================
     CONTACT FORM VALIDATION
  ===================================================== */
  const form = document.querySelector(".contact__form");

  form?.addEventListener("submit", event => {
    event.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      showFormMessage("Please fill in all fields.", "error");
      return;
    }

    if (!isValidEmail(email)) {
      showFormMessage("Please enter a valid email address.", "error");
      return;
    }

    showFormMessage("Message sent successfully ✨", "success");
    form.reset();
  });

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showFormMessage(text, type) {
    let messageEl = document.querySelector(".form-message");

    if (!messageEl) {
      messageEl = document.createElement("p");
      messageEl.className = "form-message";
      messageEl.style.marginTop = "1rem";
      messageEl.style.fontSize = "0.875rem";
      form.appendChild(messageEl);
    }

    messageEl.textContent = text;
    messageEl.style.color =
      type === "success" ? "#4caf50" : "#d32f2f";
  }

});
