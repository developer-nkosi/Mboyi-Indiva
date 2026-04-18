/**
 * MBOYI INDIVA - Interactive Script
 * Handles: Navigation, Passcode Lock, Animations, Accordions
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
    
    console.log('Mboyi Indiva universe initialized');
});

// 1. Initial Curtain Reveal
function initCurtainReveal() {
    const curtain = document.querySelector('.curtain-overlay');
    
    // Wait for fonts and basic load
    window.addEventListener('load', () => {
        setTimeout(() => {
            curtain.classList.add('revealed');
            
            // Remove from DOM after animation
            setTimeout(() => {
                curtain.style.display = 'none';
            }, 1200);
        }, 1500); // Dramatic pause
    });
}

// 2. Navigation Scroll Effect
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
        
        // Hide/show on scroll direction (optional luxury touch)
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
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ====================
// SCROLL TO TOP
// ====================
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show/hide scroll to top button
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});


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
                
                // Optional: unobserve after reveal
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });
}

// 4. Mystery Access Passcode Lock
function initPasscodeLock() {
    const correctPasscode = '1235'; // The code from the brand image
    let currentInput = '';
    
    const digitBoxes = document.querySelectorAll('.digit-box');
    const keys = document.querySelectorAll('.key');
    const lockInterface = document.querySelector('.lock-interface');
    const unlockedContent = document.querySelector('.unlocked-content');
    const statusEl = document.getElementById('lock-status');
    
    // Keypad input
    keys.forEach(key => {
        key.addEventListener('click', () => {
            const keyValue = key.getAttribute('data-key');
            
            if (currentInput.length < 4) {
                currentInput += keyValue;
                updateDisplay();
                
                // Check if complete
                if (currentInput.length === 4) {
                    validatePasscode();
                }
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
            // Success
            statusEl.textContent = 'Access Granted';
            statusEl.style.color = '#D4AF37';
            
            setTimeout(() => {
                unlock();
            }, 500);
        } else {
            // Failure
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
        
        // Trigger confetti or subtle gold particle effect here if desired
        createUnlockEffect();
    }
    
    function createUnlockEffect() {
        // Simple gold flash effect
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

// 5. Service Accordion (Transport section)
function initServiceAccordion() {
    const serviceItems = document.querySelectorAll('.service-item');
    
    serviceItems.forEach(item => {
        const header = item.querySelector('.service-header');
        
        header.addEventListener('click', () => {
            // Close others
            serviceItems.forEach(other => {
                if (other !== item) other.classList.remove('active');
            });
            
            // Toggle current
            item.classList.toggle('active');
        });
    });
}

// 6. Collection Tabs
function initCollectionTabs() {
    const tabs = document.querySelectorAll('.tab-btn');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active from all
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Here you would typically switch content
            // For this demo, we'll just animate the grid
            const grid = document.querySelector('.collection-grid');
            grid.style.opacity = '0';
            
            setTimeout(() => {
                grid.style.opacity = '1';
            }, 300);
        });
    });
}

// 7. Parallax Effects
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        // Hero background parallax
        const heroBg = document.querySelector('.hero-bg');
        if (heroBg) {
            heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
        
        // Light leak movement
        const lightLeak = document.querySelector('.light-leak');
        if (lightLeak) {
            lightLeak.style.transform = `translate(${scrolled * 0.2}px, ${scrolled * 0.1}px)`;
        }
    });
}

// Utility: Mouse trail effect for luxury feel (optional)
document.addEventListener('mousemove', (e) => {
    // Could add a subtle gold glow that follows mouse
    // But keeping it minimal as per brand philosophy
});

// Utility: Random glitch text effect for mystery elements
function glitchText(element) {
    const originalText = element.textContent;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let iterations = 0;
    
    const interval = setInterval(() => {
        element.textContent = originalText
            .split('')
            .map((letter, index) => {
                if (index < iterations) {
                    return originalText[index];
                }
                return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('');
        
        if (iterations >= originalText.length) {
            clearInterval(interval);
        }
        
        iterations += 1/3;
    }, 30);
}

// Initialize glitch on hover for mystery elements
document.querySelectorAll('.mystery-link').forEach(link => {
    link.addEventListener('mouseenter', function() {
        const originalText = this.textContent;
        glitchText(this);
        setTimeout(() => {
            this.textContent = originalText;
        }, 1000);
    });
});
