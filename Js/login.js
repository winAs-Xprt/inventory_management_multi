
        // Initialize AOS animations
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 50
        });

        // Password toggle functionality
        function togglePassword() {
            const passwordInput = document.getElementById('password');
            const toggleIcon = document.getElementById('passwordToggleIcon');
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                toggleIcon.classList.remove('fa-eye');
                toggleIcon.classList.add('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                toggleIcon.classList.remove('fa-eye-slash');
                toggleIcon.classList.add('fa-eye');
            }
        }

        // Toast notification function
        function showToast(message, type = 'success') {
            const toast = document.getElementById('toast');
            const toastMessage = document.getElementById('toastMessage');
            const toastIcon = toast.querySelector('i');
            
            // Update content
            toastMessage.textContent = message;
            
            // Update styling based on type
            toast.className = `toast ${type}`;
            
            if (type === 'success') {
                toastIcon.className = 'fas fa-check-circle';
            } else if (type === 'error') {
                toastIcon.className = 'fas fa-times-circle';
            } else if (type === 'warning') {
                toastIcon.className = 'fas fa-exclamation-triangle';
            }
            
            // Show toast
            toast.classList.add('show');
            
            // Hide after 4 seconds
            setTimeout(() => {
                toast.classList.remove('show');
            }, 4000);
        }

        // Enhanced input animations with upward movement
        function handleInputAnimation(input) {
            const formGroup = input.parentElement;
            const hasContent = input.value.trim() !== '';
            
            if (hasContent) {
                formGroup.classList.add('has-content');
            } else {
                formGroup.classList.remove('has-content');
            }
        }

        // Email validation
        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        // Login form submission
        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const rememberMe = document.getElementById('rememberMe').checked;
            const submitButton = document.querySelector('.login-button');
            const formSection = document.querySelector('.form-section');
            
            // Validation
            if (!email || !password) {
                showToast('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showToast('Please enter a valid email address', 'error');
                return;
            }
            
            // Check credentials
            if (email === 'admin@gmail.com' && password === 'admin123') {
                // Show loading state
                submitButton.classList.add('loading');
                submitButton.disabled = true;
                formSection.classList.add('loading');
                
                // Save login state if remember me is checked
                if (rememberMe) {
                    localStorage.setItem('rememberLogin', 'true');
                    localStorage.setItem('userEmail', email);
                }
                
                showToast('Login successful! Redirecting to dashboard...', 'success');
                
                // Redirect after successful login
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
                
            } else {
                showToast('Invalid email or password. Please try again.', 'error');
            }
        });

        // Forgot password functionality
        function showForgotPassword() {
            const email = document.getElementById('email').value;
            if (email && isValidEmail(email)) {
                showToast(`Password reset instructions sent to ${email}`, 'success');
            } else {
                showToast('Please enter your email address first', 'warning');
                document.getElementById('email').focus();
            }
        }

        // Load saved email if remember me was checked
        document.addEventListener('DOMContentLoaded', function() {
            if (localStorage.getItem('rememberLogin') === 'true') {
                const savedEmail = localStorage.getItem('userEmail');
                if (savedEmail) {
                    document.getElementById('email').value = savedEmail;
                    document.getElementById('rememberMe').checked = true;
                    handleInputAnimation(document.getElementById('email'));
                }
            }

            // Handle Lottie animation error
            const lottieElement = document.querySelector('dotlottie-wc');
            const fallbackIcon = document.querySelector('.image-placeholder i');
            
            lottieElement.addEventListener('error', function() {
                lottieElement.style.display = 'none';
                fallbackIcon.style.display = 'block';
            });

            lottieElement.addEventListener('load', function() {
                fallbackIcon.style.display = 'none';
            });
        });

        // Enhanced input event listeners with upward animation
        document.querySelectorAll('.form-input').forEach(input => {
            // Focus event
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            // Blur event
            input.addEventListener('blur', function() {
                this.parentElement.classList.remove('focused');
                handleInputAnimation(this);
            });
            
            // Input event (while typing)
            input.addEventListener('input', function() {
                handleInputAnimation(this);
            });
            
            // Check if input has value on load
            handleInputAnimation(input);
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', function(e) {
            // Enter key to submit form
            if (e.key === 'Enter' && !e.shiftKey) {
                const form = document.getElementById('loginForm');
                if (document.activeElement && form.contains(document.activeElement)) {
                    e.preventDefault();
                    form.dispatchEvent(new Event('submit'));
                }
            }
        });

        // Page visibility change handling
        document.addEventListener('visibilitychange', function() {
            if (!document.hidden) {
                // Page is visible - refresh animations if needed
                AOS.refresh();
            }
        });

        // Console welcome message
        console.log(`
        🎯 Multi Ecom Admin Login
        📧 Email: admin@gmail.com
        🔑 Password: admin123
        🚀 Redirects to: index.html
        🎬 Clean Lottie animation without background card
        ✨ Professional login with upward animations
        `);
