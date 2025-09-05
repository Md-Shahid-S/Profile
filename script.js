// Mobile Navigation Toggle
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

// Enhanced smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            // Add fade effect during scroll
            const sections = document.querySelectorAll('section');
            sections.forEach(section => {
                if (section.id !== targetId.substring(1)) {
                    section.style.opacity = '0.8';
                }
            });
            
            // Get the navbar height for offset calculation
            const navbar = document.querySelector('.navbar');
            const navbarHeight = navbar ? navbar.offsetHeight : 0;
            
            // Calculate position with offset
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = targetPosition - navbarHeight;
            
            // Smooth scroll with enhanced behavior
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            
            // Restore opacity after scroll
            setTimeout(() => {
                sections.forEach(section => {
                    section.style.opacity = '1';
                });
            }, 500);
        }
    });
});

// Add section transition observer
document.addEventListener('DOMContentLoaded', () => {
    // Navbar background on scroll - use class toggle to avoid inline style conflicts
    function updateNavbarScrolledState() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;
        const shouldBeScrolled = window.scrollY > 100;
        navbar.classList.toggle('scrolled', shouldBeScrolled);
    }
    
    // Typing animation for hero section
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
    
    // Initialize typing animation on DOM ready using element's own initial text
    document.addEventListener('DOMContentLoaded', () => {
        const typingElement = document.querySelector('.typing-text');
        if (typingElement) {
            const originalText = typingElement.textContent.trim() || 'Aspiring Data Scientist | Focused on AI, LLMs & GenAI';
            typeWriter(typingElement, originalText, 60);
        }
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all cards for scroll animations
    document.addEventListener('DOMContentLoaded', () => {
        const cards = document.querySelectorAll('.skill-card, .cert-card, .internship-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px)';
            card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            observer.observe(card);
        });
    });
    
    // Parallax effect for hero section (throttled)
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
    
    // Add loading animation to skill icons
    document.querySelectorAll('.skill-icon img, .skill-card-icon').forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
            this.style.transform = 'scale(1)';
        });
        
        // Set initial state
        img.style.opacity = '0';
        img.style.transform = 'scale(0.8)';
        img.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    
        // If already loaded (from cache), apply final state immediately
        if (img.complete) {
            img.style.opacity = '1';
            img.style.transform = 'scale(1)';
        }
    });
    
    // Add hover effects to social buttons
    document.querySelectorAll('.social-btn, .social-card').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add ripple effect to buttons
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
        if (ripple) {
            ripple.remove();
        }
    
        button.appendChild(circle);
    }
    
    // Add ripple effect CSS
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
    
    // Apply ripple effect to interactive elements
    document.querySelectorAll('.social-btn, .cert-link, .internship-link').forEach(btn => {
        btn.addEventListener('click', function(event) {
            // Allow the default link behavior to proceed
            createRipple(event);
        });
    });
    
    // Preload images
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
    
    // Initialize everything when DOM is loaded
    document.addEventListener('DOMContentLoaded', () => {
        preloadImages();
        
        // Add smooth scroll behavior
        document.documentElement.style.scrollBehavior = 'smooth';
        
        // Initialize AOS (Animate On Scroll) alternative
        const animateElements = document.querySelectorAll('.skill-card, .cert-card, .internship-card');
        
        const animateOnScroll = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate-in');
                    }, index * 100);
                }
            });
        }, {
            threshold: 0.1
        });
        
        animateElements.forEach(el => {
            animateOnScroll.observe(el);
        });
        
        // Theme toggle
        const toggleBtn = document.querySelector('.theme-toggle');
        const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
        const savedTheme = localStorage.getItem('theme');
        const initialLight = savedTheme ? savedTheme === 'light' : prefersLight;
        if (initialLight) {
            document.body.classList.add('light');
            if (toggleBtn) toggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
        }
        // Ensure navbar state is correct on load
        updateNavbarScrolledState();
    
        function applyTheme(isLight) {
            document.body.classList.toggle('light', isLight);
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
            if (toggleBtn) toggleBtn.innerHTML = isLight ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
            // Recompute navbar background via class state rather than inline style
            updateNavbarScrolledState();
        }
    
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                const isLight = !document.body.classList.contains('light');
                applyTheme(isLight);
            });
        }
        // Debug: Check if certificate links are working
        document.querySelectorAll('.cert-link, .internship-link').forEach(link => {
            link.addEventListener('click', function(e) {
                console.log('Link clicked:', this.href);
                // Ensure the link opens in a new tab
                if (this.target === '_blank') {
                    e.preventDefault();
                    window.open(this.href, '_blank', 'noopener,noreferrer');
                }
            });
        });
    });
    
    // Add CSS for animation classes
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
    
    // Performance optimization: Throttle scroll events
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
    
    // Apply throttling to scroll events - reuse class-based update
    const throttledNavbar = throttle(updateNavbarScrolledState, 100);
    window.addEventListener('scroll', throttledNavbar);
    
    // Add keyboard navigation support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
    
    // Focus management for accessibility
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('focus', () => {
            link.style.outline = '2px solid #ff6b6b';
            link.style.outlineOffset = '2px';
        });
        
        link.addEventListener('blur', () => {
            link.style.outline = 'none';
        });
    });
