// Mobile Menu Toggle
const menuBtn = document.getElementById('menuBtn');
const mainNav = document.getElementById('mainNav');
const overlay = document.getElementById('overlay');

menuBtn.addEventListener('click', () => {
    mainNav.classList.toggle('active');
    overlay.classList.toggle('active');
    menuBtn.innerHTML = mainNav.classList.contains('active') ? 
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

overlay.addEventListener('click', () => {
    mainNav.classList.remove('active');
    overlay.classList.remove('active');
    menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
});

// Close menu when clicking on links
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        mainNav.classList.remove('active');
        overlay.classList.remove('active');
        menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Promo Slider
const promoSlides = document.querySelectorAll('.promo-slider .slide');
const promoDots = document.querySelectorAll('.promo-slider .dot');
let currentPromoSlide = 0;

function showPromoSlide(index) {
    promoSlides.forEach(slide => slide.classList.remove('active'));
    promoDots.forEach(dot => dot.classList.remove('active'));
    
    promoSlides[index].classList.add('active');
    promoDots[index].classList.add('active');
    currentPromoSlide = index;
}

function nextPromoSlide() {
    currentPromoSlide = (currentPromoSlide + 1) % promoSlides.length;
    showPromoSlide(currentPromoSlide);
}

// Auto slide change every 5 seconds
setInterval(nextPromoSlide, 5000);

// Dot navigation for promo slider
promoDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showPromoSlide(index);
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// EmailJS Form Submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submitBtn');
    const formSuccess = document.getElementById('formSuccess');
    
    // Change button text to show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Send form data via EmailJS
    emailjs.sendForm('YOUR_EMAILJS_SERVICE_ID', 'YOUR_EMAILJS_TEMPLATE_ID', this)
        .then(() => {
            // Show success message
            formSuccess.style.display = 'block';
            this.reset();
            
            // Reset button
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
            submitBtn.disabled = false;
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                formSuccess.style.display = 'none';
            }, 5000);
        }, (error) => {
            alert('Failed to send message. Please try again later.');
            console.error('EmailJS Error:', error);
            
            // Reset button
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
            submitBtn.disabled = false;
        });
});
