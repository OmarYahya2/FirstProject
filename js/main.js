// Initialize AOS
AOS.init({
    duration: 1000,
    once: true
});

// Typed.js initialization
const typed = new Typed('#typed', {
    strings: [
        'Web Developer',
        'AI Enthusiast',
        'Problem Solver',
        'Computer Engineering Student'
    ],
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 2000,
    loop: true
});

// Navigation scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(26, 26, 26, 0.95)';
    } else {
        navbar.style.backgroundColor = 'rgba(26, 26, 26, 0.8)';
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Portfolio filter
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Filter portfolio items
        portfolioItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Mobile menu handling
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const body = document.body;

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
        body.classList.toggle('menu-open');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') && 
            !e.target.closest('.nav-links') && 
            !e.target.closest('.menu-toggle')) {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
            body.classList.remove('menu-open');
        });
    });
}

// Blog post preview
const blogCards = document.querySelectorAll('.blog-card');
blogCards.forEach(card => {
    card.addEventListener('click', () => {
        const postId = card.getAttribute('data-post-id');
        window.location.href = `/blog/post.html?id=${postId}`;
    });
});

// Resume download
const downloadResume = document.querySelector('.download-resume');
if (downloadResume) {
    downloadResume.addEventListener('click', () => {
        // Replace with actual resume file path
        window.location.href = '/files/resume.pdf';
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(element => {
    observer.observe(element);
});

// Touch event handling for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
        // Swipe left - close menu
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
            body.classList.remove('menu-open');
        }
    }
}

// Prevent scroll when menu is open
function toggleScroll(disable) {
    body.style.overflow = disable ? 'hidden' : '';
}

// Handle form submission with loading state
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        
        try {
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            const formData = new FormData(contactForm);
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                showNotification('Message sent successfully! I will get back to you soon.', 'success');
                contactForm.reset();
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            showNotification('Failed to send message. Please try again later.', 'error');
        } finally {
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        }
    });
}

// Notification function with improved mobile styling
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Ensure notification is visible on mobile
    notification.style.maxWidth = '90%';
    notification.style.margin = '0 auto';
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
} 