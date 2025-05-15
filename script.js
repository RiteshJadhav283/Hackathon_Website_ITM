// Timer functionality
const Days = document.getElementById('days');
const Hours = document.getElementById('hours');
const Minutes = document.getElementById('minutes');
const Seconds = document.getElementById('seconds');

const target_time = new Date("May 23 2025 00:00:00").getTime();

function timer() {
    const currentDate = new Date().getTime();
    const distance = target_time - currentDate;

    const days = Math.floor(distance / 1000 / 60 / 60 / 24);
    const hours = Math.floor(distance / 1000 / 60 / 60) % 24;
    const minutes = Math.floor(distance / 1000 / 60) % 60;
    const seconds = Math.floor(distance / 1000) % 60;

    Days.innerHTML = days < 10 ? '0' + days : days;
    Hours.innerHTML = hours < 10 ? '0' + hours : hours;
    Minutes.innerHTML = minutes < 10 ? '0' + minutes : minutes;
    Seconds.innerHTML = seconds < 10 ? '0' + seconds : seconds;
}

setInterval(timer, 1000);

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Handle Register button click to go to form page
    const registerButtons = document.querySelectorAll('.Register_button, .Register2');
    registerButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'form.html';
        });
    });

    // Handle Learn More button click
    const learnMoreButton = document.querySelector('.Learn_MOre');
    if (learnMoreButton) {
        learnMoreButton.addEventListener('click', function(e) {
            e.preventDefault();
            // Scroll to About section
            document.querySelector('#About1').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.Navigation_For_Pages ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Check URL hash on page load and scroll to section
    if (window.location.hash) {
        setTimeout(() => {
            document.querySelector(window.location.hash).scrollIntoView({
                behavior: 'smooth'
            });
        }, 1000);
    }
});