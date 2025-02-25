window.onload = function() {
    const skills = document.querySelectorAll('.skill');
    
    // Add the 'visible' class to all skill elements to trigger animation
    skills.forEach((skill, index) => {
        skill.style.animationDelay = `${index * 0.2}s`;  // Stagger the animations
        skill.classList.add('visible');  // Trigger the animation
    });
}


// JavaScript for Slide-in Animation on Load

document.addEventListener('DOMContentLoaded', function() {
    const skillsSection = document.querySelector('.skills-container');
    
    // Wait for 0.5s before adding the visible class to trigger animation
    setTimeout(() => {
        skillsSection.classList.add('visible');
    }, 500);
});

document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    // Validate inputs
    const inputs = document.querySelectorAll('#contactForm input, #contactForm textarea');
    const successMessageElement = document.getElementById('successMessage');
    let isValid = true;

    inputs.forEach((input) => {
        if (!input.value.trim()) {
            input.style.borderColor = 'red';
            isValid = false;
        } else {
            input.style.borderColor = 'green';
        }
    });

    if (!isValid) {
        successMessageElement.textContent = 'Please fill in all fields before submitting.';
        successMessageElement.style.color = 'red';
        successMessageElement.style.display = 'block';

        // Hide the error message after 2 seconds
        setTimeout(() => {
            successMessageElement.style.display = 'none';
        }, 2000);

        return;
    }

    // Collect form data
    const contactData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    // Make the API call to the backend
    fetch('http://localhost:80/amizhth/contact/save', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(contactData)
    })
    .then(response => response.json()) // Parse the JSON response
    .then(data => {
        // Display the success message
        successMessageElement.textContent = data.responseMessage || 'Contact submitted successfully!';
        successMessageElement.style.color = '#28a745';
        successMessageElement.style.display = 'block';

        // Hide the success message after 2 seconds
        setTimeout(() => {
            successMessageElement.style.display = 'none';
            document.getElementById('contactForm').reset(); // Reset the form fields
        }, 2000); // Show the message for 2 seconds
    })
    .catch(error => {
        console.error('Error:', error);
        successMessageElement.textContent = 'An error occurred. Please try again later.';
        successMessageElement.style.color = 'red';
        successMessageElement.style.display = 'block';
        successMessageElement.style.animation = 'fadeIn 1s ease-in-out';

        // Hide the error message after 2 seconds
        setTimeout(() => {
            successMessageElement.style.display = 'none';
        }, 2000);
    });
});

// Add glow effect on focus
const inputs = document.querySelectorAll('#contactForm input, #contactForm textarea');
inputs.forEach((input) => {
    input.addEventListener('focus', () => {
        input.style.boxShadow = '0 0 10px #00b4d8';
        input.style.transition = 'box-shadow 0.3s ease-in-out';
    });

    input.addEventListener('blur', () => {
        input.style.boxShadow = 'none';
    });
});

// Scroll Animation
const sections = document.querySelectorAll('section');
const options = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            entry.target.classList.remove('visible');
        }
    });
}, options);

sections.forEach((section) => observer.observe(section));

// Navbar Toggle
const toggle = document.querySelector('.menu-toggle');
const navbar = document.querySelector('.navbar ul');

toggle.addEventListener('click', () => {
    navbar.classList.toggle('active');
});
