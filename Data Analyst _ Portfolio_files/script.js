/**
 * Data Analyst Portfolio - Interactive Features
 * Smooth scrolling, dark/light mode, scroll animations, mobile nav, form validation
 */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initSmoothScroll();
    initMobileNav();
    initScrollReveal();
    initContactForm();
    initHeaderScroll();
});

/**
 * Dark/Light Mode Toggle
 * Toggle switch in navbar, persists preference in localStorage
 * Both desktop and mobile toggles stay in sync
 */
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const themeToggleMobile = document.getElementById('themeToggleMobile');
    const savedTheme = localStorage.getItem('theme') || 
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    document.documentElement.setAttribute('data-theme', savedTheme);

    const toggleTheme = () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };

    [themeToggle, themeToggleMobile].forEach(btn => {
        btn?.addEventListener('click', (e) => {
            e.preventDefault();
            toggleTheme();
        });
    });
}

/**
 * Smooth scrolling for navigation links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                document.getElementById('navMenu')?.classList.remove('active');
                document.getElementById('navToggle')?.classList.remove('active');
            }
        });
    });
}

/**
 * Mobile navigation menu toggle
 */
function initMobileNav() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    navToggle?.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu?.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !navToggle.contains(e.target)) {
            navToggle?.classList.remove('active');
            navMenu?.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

/**
 * Scroll reveal animation
 * Elements with class 'reveal' animate into view on scroll
 */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    const revealThreshold = 0.1;
    const revealRootMargin = '0px 0px -80px 0px';

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: revealThreshold,
        rootMargin: revealRootMargin
    });

    revealElements.forEach(el => revealObserver.observe(el));
}

/**
 * Contact form validation and submission
 */
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const clearErrors = () => {
        [nameError, emailError, messageError].forEach(el => { if (el) el.textContent = ''; });
        [nameInput, emailInput, messageInput].forEach(el => el?.closest('.form-group')?.classList.remove('error'));
    };

    const setError = (input, errorEl, message) => {
        input?.closest('.form-group')?.classList.add('error');
        if (errorEl) errorEl.textContent = message;
    };
    

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        clearErrors();

        let isValid = true;

        // Validate name
        if (!nameInput?.value.trim()) {
            setError(nameInput, nameError, 'Please enter your name');
            isValid = false;
        }

        // Validate email
        if (!emailInput?.value.trim()) {
            setError(emailInput, emailError, 'marwanmohmme7@gmail.coml');
            isValid = false;
        } else if (!validateEmail(emailInput.value.trim())) {
            setError(emailInput, emailError, 'marwanmohmme7@gmail.com');
            isValid = false;
        }

        // Validate message
        if (!messageInput?.value.trim()) {
            setError(messageInput, messageError, 'Please enter your message');
            isValid = false;
        } else if (messageInput.value.trim().length < 10) {
            setError(messageInput, messageError, 'Message must be at least 10 characters');
            isValid = false;
        }

        if (isValid) {
            // Form is valid - in production, you would send to a server
            alert('Thank you for your message! I\'ll get back to you soon.');
            form.reset();
        }
    });

    // Real-time validation feedback
    [nameInput, emailInput, messageInput].forEach(input => {
        input?.addEventListener('input', () => {
            input.closest('.form-group')?.classList.remove('error');
            const errorMap = {
                name: nameError,
                email: emailError,
                message: messageError
            };
            const errorEl = errorMap[input.id];
            if (errorEl) errorEl.textContent = '';
        });
    });
}

/**
 * Header style on scroll (optional enhancement)
 */
function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;

    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 20px var(--shadow)';
        } else {
            header.style.boxShadow = 'none';
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
}