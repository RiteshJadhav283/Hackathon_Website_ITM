document.addEventListener('DOMContentLoaded', function() 
{
    const navLinks = document.querySelectorAll('.Navigation_For_Pages ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.textContent.trim().toLowerCase();
            let hash = '';
            
            switch(page) {
                case 'home':
                    hash = '#Home1';
                    break;
                case 'about':
                    hash = '#About1';
                    break;
                case 'tracks':
                    hash = '#Tracks1';
                    break;
                case 'schedule':
                    hash = '#Schedule1';
                    break;
                case 'prize':
                    hash = '#Prizes1';
                    break;
                case 'judges':
                    hash = '#Judges1';
                    break;
                case 'images':
                    hash = '#Images1';
                    break;
                default:
                    hash = '';
            }
            
            window.location.href = 'index.html' + hash;
        });
    });

    const teamSizeSelect = document.getElementById('teamSize');
    const member2Group = document.getElementById('member2Group');
    const member3Group = document.getElementById('member3Group');

    teamSizeSelect.addEventListener('change', function() 
    {
        const size = parseInt(this.value);
        
        document.getElementById('member2').required = false;
        document.getElementById('member3').required = false;
        member2Group.style.display = 'none';
        member3Group.style.display = 'none';
        
        if (size >= 3) 
            {
            document.getElementById('member2').required = true;
            member2Group.style.display = 'block';
        }
        
        if (size >= 4) 
            {
            document.getElementById('member3').required = true;
            member3Group.style.display = 'block';
        }
    });

    const form = document.getElementById('registrationForm');
    
    // Add debugging to form element
    console.log('Form element found:', form);
    
    // Add submission lock to prevent multiple submissions
    let isSubmitting = false;
    
    form.addEventListener('submit', function(e) 
    {
        console.log('Submit event triggered!'); // Debug log
        e.preventDefault();
        
        // Prevent multiple submissions
        if (isSubmitting) {
            console.log('Form is already being submitted, ignoring duplicate submission');
            return;
        }
        
        console.log('Form submission started...'); // Debug log
        
        let isValid = true;
        
        document.querySelectorAll('.error-message').forEach(el => {
            el.style.display = 'none';
        });
        
        if (!teamSizeSelect.value) 
        {
            console.log('Team size validation failed'); // Debug log
            document.getElementById('teamSizeError').style.display = 'block';
            isValid = false;
        }
        
        const teamName = document.getElementById('teamName').value.trim();
        if (!teamName) 
        {
            console.log('Team name validation failed'); // Debug log
            document.getElementById('teamNameError').style.display = 'block';
            isValid = false;
        }
        
        const leaderName = document.getElementById('leaderName').value.trim();
        if (!leaderName) {
            console.log('Leader name validation failed'); // Debug log
            document.getElementById('leaderNameError').style.display = 'block';
            isValid = false;
        }
        
        const leaderEmail = document.getElementById('leaderEmail').value.trim();
        if (!leaderEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(leaderEmail)) {
            console.log('Leader email validation failed'); // Debug log
            document.getElementById('leaderEmailError').style.display = 'block';
            isValid = false;
        }
        const leaderPhone = document.getElementById('leaderPhone').value.trim();
        if (!leaderPhone || !/^[\d\s\-+]{8,}$/.test(leaderPhone)) {
            console.log('Leader phone validation failed'); // Debug log
            document.getElementById('leaderPhoneError').style.display = 'block';
            isValid = false;
        }
        
        const member1 = document.getElementById('member1').value.trim();
        if (!member1) {
            console.log('Member 1 validation failed'); // Debug log
            document.getElementById('member1Error').style.display = 'block';
            isValid = false;
        }
        
        if (member2Group.style.display === 'block') {
            const member2 = document.getElementById('member2').value.trim();
            if (!member2) {
                console.log('Member 2 validation failed'); // Debug log
                document.getElementById('member2Error').style.display = 'block';
                isValid = false;
            }
        }
        
        if (member3Group.style.display === 'block') {
            const member3 = document.getElementById('member3').value.trim();
            if (!member3) {
                console.log('Member 3 validation failed'); // Debug log
                document.getElementById('member3Error').style.display = 'block';
                isValid = false;
            }
        }
        
        console.log('Form validation result:', isValid); // Debug log
        
        if (isValid) {
            console.log('Form is valid, starting submission...'); // Debug log
            
            // Set submission lock
            isSubmitting = true;
            
            // Disable submit button and change text
            const submitButton = document.querySelector('button[type="submit"]');
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = 'SUBMITTING...';
                submitButton.style.opacity = '0.7';
                submitButton.style.cursor = 'not-allowed';
            }
            
            // Submit to Google Sheets
            const scriptUrl = 'https://script.google.com/macros/s/AKfycbyF6lVa_5vUiNiyvqDxag-3Kyp95QMQBQ7Jrocu0Ba4DupVGI_rEbb6TXSAyBCI5lc4/exec';
            
            // Create URL parameters for Google Apps Script
            const params = new URLSearchParams();
            params.append('teamSize', document.getElementById('teamSize').value);
            params.append('teamName', document.getElementById('teamName').value);
            params.append('leaderName', document.getElementById('leaderName').value);
            params.append('leaderEmail', document.getElementById('leaderEmail').value);
            params.append('leaderPhone', document.getElementById('leaderPhone').value);
            params.append('member1', document.getElementById('member1').value);
            params.append('member2', document.getElementById('member2').value);
            params.append('member3', document.getElementById('member3').value);

            console.log('=== FORM DATA BEING SENT ===');
            console.log('Script URL:', scriptUrl);
            console.log('Team Size:', document.getElementById('teamSize').value);
            console.log('Team Name:', document.getElementById('teamName').value);
            console.log('Leader Name:', document.getElementById('leaderName').value);
            console.log('Leader Email:', document.getElementById('leaderEmail').value);
            console.log('Leader Phone:', document.getElementById('leaderPhone').value);
            console.log('Member 1:', document.getElementById('member1').value);
            console.log('Member 2:', document.getElementById('member2').value);
            console.log('Member 3:', document.getElementById('member3').value);
            console.log('URL Parameters:', params.toString());
            console.log('==========================');

            // Method 1: Using URLSearchParams (most reliable for Google Apps Script)
            console.log('Sending POST request to:', scriptUrl);
            fetch(scriptUrl, {
                method: 'POST',
                body: params,
                mode: 'no-cors'
            })
            .then(response => {
                console.log('POST Response received:', response);
                console.log('Response status:', response.status);
                console.log('Response type:', response.type);
                alert('REGISTRATION SUCCESSFUL! GOOD LUCK HACKERS!');
                form.reset();
                member2Group.style.display = 'none';
                member3Group.style.display = 'none';
                
                // Reset submission lock and button
                isSubmitting = false;
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = 'SUBMIT';
                    submitButton.style.opacity = '1';
                    submitButton.style.cursor = 'pointer';
                }
            })
            .catch(error => {
                console.error('POST Fetch error:', error);
                
                // Method 2: Try with GET request as fallback
                const getUrl = scriptUrl + '?' + params.toString();
                console.log('Trying GET request as fallback:', getUrl);
                fetch(getUrl, {
                    method: 'GET',
                    mode: 'no-cors'
                })
                .then(response => {
                    console.log('GET fallback response:', response);
                    console.log('GET Response status:', response.status);
                    console.log('GET Response type:', response.type);
                    alert('REGISTRATION SUCCESSFUL! GOOD LUCK HACKERS!');
                    form.reset();
                    member2Group.style.display = 'none';
                    member3Group.style.display = 'none';
                    
                    // Reset submission lock and button
                    isSubmitting = false;
                    if (submitButton) {
                        submitButton.disabled = false;
                        submitButton.textContent = 'SUBMIT';
                        submitButton.style.opacity = '1';
                        submitButton.style.cursor = 'pointer';
                    }
                })
                .catch(fallbackError => {
                    console.error('GET fallback error:', fallbackError);
                    alert('Registration failed! Please check your internet connection and try again.');
                    
                    // Reset submission lock and button on error
                    isSubmitting = false;
                    if (submitButton) {
                        submitButton.disabled = false;
                        submitButton.textContent = 'SUBMIT';
                        submitButton.style.opacity = '1';
                        submitButton.style.cursor = 'pointer';
                    }
                });
            });
        } else {
            console.log('Form validation failed, not submitting'); // Debug log
            alert('Please fill in all required fields correctly.');
        }
    });

    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.boxShadow = `0 0 15px ${this.type === 'email' ? 'var(--secondary)' : 'var(--primary)'}`;
        });
        input.addEventListener('blur', function() {
            this.style.boxShadow = 'none';
        });
    });

    const navRegisterButton = document.querySelector('.Register_button');
    if (navRegisterButton) {
        navRegisterButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: document.querySelector('.container').offsetTop - 100,
                behavior: 'smooth'
            });
        });
    }

    // Add click event listener to submit button as backup
    const submitButton = document.querySelector('button[type="submit"]');
    if (submitButton) {
        console.log('Submit button found:', submitButton);
        submitButton.addEventListener('click', function(e) {
            console.log('Submit button clicked!');
        });
    }
});

// Mobile Working Js
const menuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.Navigation_For_Pages');

if (menuToggle) {
    menuToggle.addEventListener('click', function() 
    {

        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        if (navMenu.classList.contains('active')) 
            {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    const navLinks = document.querySelectorAll('.Navigation_For_Pages a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}
  