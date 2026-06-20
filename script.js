document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // TYPING ANIMATION
    // ----------------------------------------------------
    const typingText = document.getElementById('typing-text');
    const words = ["AI Engineer", "Data Scientist", "App Developer"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50; // Faster deleting
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100; // Normal typing speed
        }

        // Word completed typing
        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 1500; // Pause at end of word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // Pause before typing next word
        }

        setTimeout(type, typeSpeed);
    }

    if (typingText) {
        setTimeout(type, 500);
    }

    // ----------------------------------------------------
    // MOBILE NAVIGATION TOGGLE
    // ----------------------------------------------------
    const menuToggle = document.getElementById('menu-toggle');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuToggle && navbar) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navbar.classList.toggle('active');
        });

        // Close menu on link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navbar.classList.remove('active');
            });
        });
    }

    // ----------------------------------------------------
    // HEADER SCROLL TRANSITION
    // ----------------------------------------------------
    const header = document.querySelector('.header');

    function checkScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Initial check on load

    // ----------------------------------------------------
    // SCROLL REVEAL (INTERSECTION OBSERVER)
    // ----------------------------------------------------
    const reveals = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Trigger only once
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(reveal => {
        revealObserver.observe(reveal);
    });

    // ----------------------------------------------------
    // SCROLL ACTIVE NAV LINK HIGHLIGHT
    // ----------------------------------------------------
    const sections = document.querySelectorAll('section');

    function activeMenu() {
        try {
            let scrollY = window.scrollY;

            sections.forEach(section => {
                const sectionHeight = section.offsetHeight;
                const sectionTop = section.offsetTop - 150; // offset for sticky header
                const sectionId = section.getAttribute('id');

                if (sectionId) {
                    const navLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);
                    if (navLink) {
                        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                            navLink.classList.add('active');
                        } else {
                            navLink.classList.remove('active');
                        }
                    }
                }
            });
        } catch (error) {
            console.error("Error in activeMenu handler:", error);
        }
    }

    window.addEventListener('scroll', activeMenu);
    activeMenu(); // Run once initially

    // ----------------------------------------------------
    // SIMULATED CONTACT FORM SUBMISSION
    // ----------------------------------------------------
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');
    const submitBtn = document.getElementById('submit-btn');

    if (contactForm && formFeedback && submitBtn) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log("Contact form submit event triggered.");

            // Set sending state
            submitBtn.disabled = true;
            const btnSpan = submitBtn.querySelector('span');
            const originalText = btnSpan.textContent;
            btnSpan.textContent = 'Sending Message...';

            // Simulate API request (1.5 seconds)
            setTimeout(() => {
                console.log("Simulated contact form API success callback.");
                formFeedback.textContent = 'Thank you, Shreya has received your message! She will get back to you shortly.';
                formFeedback.className = 'form-feedback success';

                // Clear form
                contactForm.reset();

                // Reset button
                submitBtn.disabled = false;
                btnSpan.textContent = originalText;

                // Fade out feedback message after 6 seconds
                setTimeout(() => {
                    formFeedback.style.opacity = '0';
                    setTimeout(() => {
                        formFeedback.textContent = '';
                        formFeedback.style.opacity = '1';
                    }, 500);
                }, 6000);

            }, 1500);
        });
    }
});
