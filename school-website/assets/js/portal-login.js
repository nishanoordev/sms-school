// Portal Login Modal Logic
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('smsLoginModal');
    const closeBtn = document.querySelector('.sms-login-close');
    
    // Function to open modal
    window.openSmsLogin = function(e) {
        if (e) e.preventDefault();
        if (modal) modal.style.display = 'flex';
    };

    // Close on X click
    if (closeBtn) {
        closeBtn.onclick = function() {
            modal.style.display = 'none';
        }
    }

    // Close on outside click
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
});
