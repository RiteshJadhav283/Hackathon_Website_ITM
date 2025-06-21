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
    
    form.addEventListener('submit', function(e) 
    {
        e.preventDefault();
        let isValid = true;
        
        document.querySelectorAll('.error-message').forEach(el => {
            el.style.display = 'none';
        });
        
        if (!teamSizeSelect.value) 
        {
            document.getElementById('teamSizeError').style.display = 'block';
            isValid = false;
        }
        
        const teamName = document.getElementById('teamName').value.trim();
        if (!teamName) 
        {
            document.getElementById('teamNameError').style.display = 'block';
            isValid = false;
        }
        
        const leaderName = document.getElementById('leaderName').value.trim();
        if (!leaderName) {
            document.getElementById('leaderNameError').style.display = 'block';
            isValid = false;
        }
        
        const leaderEmail = document.getElementById('leaderEmail').value.trim();
        if (!leaderEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(leaderEmail)) {
            document.getElementById('leaderEmailError').style.display = 'block';
            isValid = false;
        }
        const leaderPhone = document.getElementById('leaderPhone').value.trim();
        if (!leaderPhone || !/^[\d\s\-+]{8,}$/.test(leaderPhone)) {
            document.getElementById('leaderPhoneError').style.display = 'block';
            isValid = false;
        }
        
        const member1 = document.getElementById('member1').value.trim();
        if (!member1) {
            document.getElementById('member1Error').style.display = 'block';
            isValid = false;
        }
        
        if (member2Group.style.display === 'block') {
            const member2 = document.getElementById('member2').value.trim();
            if (!member2) {
                document.getElementById('member2Error').style.display = 'block';
                isValid = false;
            }
        }
        
        if (member3Group.style.display === 'block') {
            const member3 = document.getElementById('member3').value.trim();
            if (!member3) {
                document.getElementById('member3Error').style.display = 'block';
                isValid = false;
            }
        }
        
        if (isValid) {
            alert('REGISTRATION SUCCESSFUL! GOOD LUCK HACKERS!');
            form.reset();
            member2Group.style.display = 'none';
            member3Group.style.display = 'none';
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








//For Forms 
document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    fetch('Yhttps://script.google.com/macros/s/AKfycbwXmSm_kxzjRNZ5K_okbodlQx05F2Qj_bfyerfNOSzI2lC46iJK5viQsKx0cASmFB4fOg/exec', {
      method: 'POST',
      body: JSON.stringify({
        teamSize: document.getElementById('teamSize').value,
        teamName: document.getElementById('teamName').value,
        leaderName: document.getElementById('leaderName').value,
        leaderEmail: document.getElementById('leaderEmail').value,
        leaderPhone: document.getElementById('leaderPhone').value,
        member1: document.getElementById('member1').value,
        member2: document.getElementById('member2').value,
        member3: document.getElementById('member3').value
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => alert('Registration submitted!'))
    .catch(error => alert('Submission failed!'));
  });
  