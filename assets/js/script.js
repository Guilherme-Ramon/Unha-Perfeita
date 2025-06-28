document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.querySelector(".navbar.fixed-top");
    const mainContent = document.querySelector("main");

    if (navbar && mainContent) {
        const adjustMainPadding = () => {
            const navbarHeight = navbar.offsetHeight;
            mainContent.style.paddingTop = `${navbarHeight}px`;
        };

        adjustMainPadding();

        window.addEventListener("resize", adjustMainPadding);

        const observer = new ResizeObserver(adjustMainPadding);
        observer.observe(navbar);
    }

    const nav = document.querySelector("nav.navbar");
    const toggles = document.querySelectorAll(".navbar-toggler");

    toggles.forEach((toggle) => {
        toggle.addEventListener("click", () => {});
    });

    const links = document.querySelectorAll(".nav-link");
    links.forEach((link) => {
        link.addEventListener("click", () => {
            const navbarCollapse = document.getElementById("navbarNav");
            if (navbarCollapse && navbarCollapse.classList.contains("show")) {
                const bsCollapse =
                    bootstrap.Collapse.getInstance(navbarCollapse) ||
                    new bootstrap.Collapse(navbarCollapse, {
                        toggle: false,
                    });
                bsCollapse.hide();
            }
        });
    });

    const header = nav;
    const navHeight = header.offsetHeight;

    function changeHeaderWhenScroll() {
        if (window.scrollY >= navHeight) {
            header.classList.add("scroll");
        } else {
            header.classList.remove("scroll");
        }
    }

    const backToTopButton = document.getElementById("back-to-top");
    function toggleBackToTop() {
        if (!backToTopButton) return;
        if (window.scrollY >= 300) {
            backToTopButton.style.display = "flex";
        } else {
            backToTopButton.style.display = "none";
        }
    }
    if (backToTopButton) {
        backToTopButton.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    const swiper = new Swiper(".mySwiper", {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        autoplay: {
            delay: 6000,
            disableOnInteraction: false,
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
            },
        },
    });

    const scrollReveal = ScrollReveal({
        origin: "top",
        distance: "30px",
        duration: 700,
        reset: true,
    });

    scrollReveal.reveal(
        `#home .col-lg-6, #home .order-lg-1,
    #about .col-lg-6, #about .text-center.text-lg-start,
    #services header, #services .card,
    #testimonials header, .swiper,
    #gallery header, #galleryCarousel,
    #contact .col-lg-6`,
        { interval: 100 }
    );

    const sections = document.querySelectorAll("section[id]");
    function activateMenuAtCurrentSection() {
        const checkpoint = window.pageYOffset + (window.innerHeight / 8) * 4;

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute("id");
            const checkpointStart = checkpoint >= sectionTop;
            const checkpointEnd = checkpoint <= sectionTop + sectionHeight;

            const link = document.querySelector(
                `.nav-link[href="#${sectionId}"]`
            );
            if (!link) return;

            if (checkpointStart && checkpointEnd) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });
    }

    function onScroll() {
        changeHeaderWhenScroll();
        toggleBackToTop();
        activateMenuAtCurrentSection();
    }

    window.addEventListener("scroll", onScroll);

    onScroll();
});

const swiper = new Swiper('.gallery-swiper', {
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });