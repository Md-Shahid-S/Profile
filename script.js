// ===============================
// MOBILE NAVIGATION
// ===============================
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// ===============================
// SMOOTH SCROLL WITH OFFSET
// ===============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);

        if (target) {
            const sections = document.querySelectorAll('section');
            sections.forEach(section => {
                if (section.id !== targetId.substring(1)) {
                    section.style.opacity = '0.8';
                }
            });

            const navbar = document.querySelector('.navbar');
            const navbarHeight = navbar ? navbar.offsetHeight : 0;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = targetPosition - navbarHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            setTimeout(() => {
                sections.forEach(section => {
                    section.style.opacity = '1';
                });
            }, 500);
        }
    });
});

// ===============================
// DOM READY
// ===============================
document.addEventListener('DOMContentLoaded', () => {
    // ---------------------------
    // NAVBAR SCROLL BACKGROUND
    // ---------------------------
    function updateNavbarScrolledState() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;
        const shouldBeScrolled = window.scrollY > 100;
        navbar.classList.toggle('scrolled', shouldBeScrolled);
    }

    // ---------------------------
    // HERO TYPING ANIMATION
    // ---------------------------
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';

        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const originalText = typingElement.textContent.trim() || 'Aspiring Data Scientist | Focused on AI, LLMs & GenAI';
        typeWriter(typingElement, originalText, 60);
    }

    // ---------------------------
    // INTERSECTION OBSERVER ANIMATIONS
    // ---------------------------
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const cards = document.querySelectorAll('.skill-card, .cert-card, .internship-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // ---------------------------
    // HERO PARALLAX EFFECT
    // ---------------------------
    const applyParallax = (() => {
        let ticking = false;
        return () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const parallax = document.querySelector('.hero');
                const speed = scrolled * 0.5;
                if (parallax) {
                    parallax.style.transform = `translateY(${speed}px)`;
                }
                ticking = false;
            });
        };
    })();
    window.addEventListener('scroll', applyParallax);

    // ---------------------------
    // SKILL ICONS LOADING EFFECT
    // ---------------------------
    document.querySelectorAll('.skill-icon img, .skill-card-icon').forEach(img => {
        img.addEventListener('load', function () {
            this.style.opacity = '1';
            this.style.transform = 'scale(1)';
        });

        img.style.opacity = '0';
        img.style.transform = 'scale(0.8)';
        img.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

        if (img.complete) {
            img.style.opacity = '1';
            img.style.transform = 'scale(1)';
        }
    });

    // ---------------------------
    // SOCIAL BUTTON HOVER EFFECTS
    // ---------------------------
    document.querySelectorAll('.social-btn, .social-card').forEach(btn => {
        btn.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });
        btn.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // ---------------------------
    // RIPPLE EFFECT
    // ---------------------------
    function createRipple(event) {
        const button = event.currentTarget;
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
        circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
        circle.classList.add('ripple');

        const ripple = button.getElementsByClassName('ripple')[0];
        if (ripple) ripple.remove();

        button.appendChild(circle);
    }

    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 600ms linear;
            background-color: rgba(255, 255, 255, 0.6);
            pointer-events: none;
        }
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);

    document.querySelectorAll('.social-btn, .cert-link, .internship-link').forEach(btn => {
        btn.addEventListener('click', function (event) {
            createRipple(event);
        });
    });

    // ---------------------------
    // PRELOAD IMAGES
    // ---------------------------
    function preloadImages() {
        const imageUrls = [
            'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg',
            'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg',
            'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg'
        ];
        imageUrls.forEach(url => {
            const img = new Image();
            img.src = url;
        });
    }
    preloadImages();

    // ---------------------------
    // THEME TOGGLE (Light default, Dark optional)
    // ---------------------------
    const toggleBtn = document.querySelector('.theme-toggle');
    const savedTheme = localStorage.getItem('theme');
    const isLight = savedTheme ? savedTheme === 'light' : true;

    applyTheme(isLight);

    function applyTheme(lightMode) {
        document.body.classList.toggle('light', lightMode);
        localStorage.setItem('theme', lightMode ? 'light' : 'dark');
        if (toggleBtn) {
            toggleBtn.innerHTML = lightMode
                ? '<i class="fas fa-sun"></i>'
                : '<i class="fas fa-moon"></i>';
        }
        updateNavbarScrolledState();
    }

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const currentlyLight = document.body.classList.contains('light');
            applyTheme(!currentlyLight);
        });
    }

    // ---------------------------
    // AOS-LIKE SCROLL ANIMATION
    // ---------------------------
    const animateElements = document.querySelectorAll('.skill-card, .cert-card, .internship-card');
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });

    animateElements.forEach(el => {
        animateOnScroll.observe(el);
    });

    // ---------------------------
    // DEBUG LINKS OPEN NEW TAB
    // ---------------------------
    document.querySelectorAll('.cert-link, .internship-link').forEach(link => {
        link.addEventListener('click', function (e) {
            console.log('Link clicked:', this.href);
            if (this.target === '_blank') {
                e.preventDefault();
                window.open(this.href, '_blank', 'noopener,noreferrer');
            }
        });
    });

    // ---------------------------
    // ADD EXTRA CSS
    // ---------------------------
    const animationCSS = document.createElement('style');
    animationCSS.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        .skill-card, .cert-card, .internship-card {
            opacity: 0;
            transform: translateY(50px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
    `;
    document.head.appendChild(animationCSS);

    // ---------------------------
    // THROTTLE SCROLL
    // ---------------------------
    function throttle(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    const throttledNavbar = throttle(updateNavbarScrolledState, 100);
    window.addEventListener('scroll', throttledNavbar);

    // ---------------------------
    // KEYBOARD ESC CLOSE MENU
    // ---------------------------
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });

    // ---------------------------
    // ACCESSIBILITY FOCUS OUTLINE
    // ---------------------------
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('focus', () => {
            link.style.outline = '2px solid #ff6b6b';
            link.style.outlineOffset = '2px';
        });
        link.addEventListener('blur', () => {
            link.style.outline = 'none';
        });
    });
});
