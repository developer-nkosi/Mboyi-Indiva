/**
 * MBOYI INDIVA - Interactive Script
 * Handles: Navigation, Passcode Lock, Animations, Accordions, Mobile Menu, Scroll Button
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // Initialize all systems
    initCurtainReveal();
    initNavigation();
    initScrollReveal();
    initPasscodeLock();
    initServiceAccordion();
    initCollectionTabs();
    initParallax();
    initMobileMenu();
    initScrollToTop();
    
    console.log('Mboyi Indiva universe initialized');
});

// ====================
// MOBILE MENU
// ====================
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    if (!menuToggle || !mobileMenu) return;
    
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when link clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// ====================
// SCROLL TO TOP
// ====================
function initScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (!scrollToTopBtn) return;
    
    // Show/hide button based on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    // Click handler (smooth scroll)
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Make scrollToTop available globally
window.scrollToTop = function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

// ====================
// NAVIGATION SCROLL EFFECT
// ====================
function initNavigation() {
    const nav = document.querySelector('.main-nav');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add/remove scrolled class
        if (currentScroll > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        // Hide/show on scroll direction
        if (currentScroll > lastScroll && currentScroll > 200) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
    
    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#') && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// ====================
// PASSCODE LOCK (Updated with Enter/Clear)
// ====================
function initPasscodeLock() {
    const correctPasscode = '1235';
    let currentInput = '';
    
    const digitBoxes = document.querySelectorAll('.digit-box');
    const keys = document.querySelectorAll('.key');
    const lockInterface = document.querySelector('.lock-interface');
    const unlockedContent = document.querySelector('.unlocked-content');
    const statusEl = document.getElementById('lock-status');
    
    if (!keys.length) return;
    
    keys.forEach(key => {
        key.addEventListener('click', () => {
            const keyValue = key.getAttribute('data-key');
            
            if (keyValue === 'clear') {
                currentInput = '';
                updateDisplay();
                statusEl.textContent = '';
                return;
            }
            
            if (keyValue === 'enter') {
                if (currentInput.length === 4) {
                    validatePasscode();
                } else {
                    statusEl.textContent = 'Enter 4 digits';
                    statusEl.style.color = '#ff4444';
                }
                return;
            }
            
            if (currentInput.length < 4) {
                currentInput += keyValue;
                updateDisplay();
                statusEl.textContent = '';
            }
        });
    });
    
    function updateDisplay() {
        digitBoxes.forEach((box, index) => {
            if (index < currentInput.length) {
                box.textContent = '•';
                box.classList.add('filled');
            } else {
                box.textContent = '';
                box.classList.remove('filled', 'error');
            }
        });
    }
    
    function validatePasscode() {
        if (currentInput === correctPasscode) {
            statusEl.textContent = 'Access Granted';
            statusEl.style.color = '#D4AF37';
            
            setTimeout(() => {
                unlock();
            }, 500);
        } else {
            statusEl.textContent = 'Access Denied';
            statusEl.style.color = '#ff4444';
            
            digitBoxes.forEach(box => {
                box.classList.add('error');
            });
            
            setTimeout(() => {
                currentInput = '';
                updateDisplay();
                statusEl.textContent = '';
                digitBoxes.forEach(box => box.classList.remove('error'));
            }, 1500);
        }
    }
    
    function unlock() {
        lockInterface.style.display = 'none';
        unlockedContent.classList.add('active');
        createUnlockEffect();
    }
    
    function createUnlockEffect() {
        const flash = document.createElement('div');
        flash.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle, rgba(212, 175, 55, 0.2), transparent);
            pointer-events: none;
            z-index: 9998;
            opacity: 0;
            transition: opacity 0.5s ease;
        `;
        document.body.appendChild(flash);
        
        setTimeout(() => flash.style.opacity = '1', 10);
        setTimeout(() => {
            flash.style.opacity = '0';
            setTimeout(() => flash.remove(), 500);
        }, 500);
    }
}

// ... [Keep other existing functions: Curtain Reveal, Scroll Reveal, Service Accordion, Collection Tabs, Parallax] ...

// 1. Initial Curtain Reveal
function initCurtainReveal() {
    const curtain = document.querySelector('.curtain-overlay');
    if (!curtain) return;
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            curtain.classList.add('revealed');
            setTimeout(() => {
                curtain.style.display = 'none';
            }, 1200);
        }, 1500);
    });
}

// 3. Scroll Reveal Animations
function initScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });
}

// 5. Service Accordion
function initServiceAccordion() {
    const serviceItems = document.querySelectorAll('.service-item');
    
    serviceItems.forEach(item => {
        const header = item.querySelector('.service-header');
        if (!header) return;
        
        header.addEventListener('click', () => {
            serviceItems.forEach(other => {
                if (other !== item) other.classList.remove('active');
            });
            item.classList.toggle('active');
        });
    });
}

// 6. Collection Tabs
function initCollectionTabs() {
    const tabs = document.querySelectorAll('.tab-btn');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const grid = document.querySelector('.collection-grid');
            if (grid) {
                grid.style.opacity = '0';
                setTimeout(() => {
                    grid.style.opacity = '1';
                }, 300);
            }
        });
    });
}

// 7. Parallax Effects
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        const heroBg = document.querySelector('.hero-bg');
        if (heroBg) {
            heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
        
        const lightLeak = document.querySelector('.light-leak');
        if (lightLeak) {
            lightLeak.style.transform = `translate(${scrolled * 0.2}px, ${scrolled * 0.1}px)`;
        }
    });
}
