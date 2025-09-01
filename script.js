// ===== GÜVENLİK ÖNLEMLERİ =====
// F12, Ctrl+Shift+I, Ctrl+U gibi kısayolları engelle
document.addEventListener('keydown', function(e) {
    // F12 tuşu
    if (e.keyCode === 123) {
        e.preventDefault();
        return false;
    }
    
    // Ctrl+Shift+I (Chrome DevTools)
    if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
        e.preventDefault();
        return false;
    }
    
    // Ctrl+Shift+J (Chrome Console)
    if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
        e.preventDefault();
        return false;
    }
    
    // Ctrl+U (Kaynak kodu görüntüleme)
    if (e.ctrlKey && e.keyCode === 85) {
        e.preventDefault();
        return false;
    }
    
    // Ctrl+Shift+C (Element Inspector)
    if (e.ctrlKey && e.shiftKey && e.keyCode === 67) {
        e.preventDefault();
        return false;
    }
    
    // F5 (Sayfa yenileme)
    if (e.keyCode === 116) {
        e.preventDefault();
        return false;
    }
    
    // Ctrl+R (Sayfa yenileme)
    if (e.ctrlKey && e.keyCode === 82) {
        e.preventDefault();
        return false;
    }
    
    // Ctrl+F5 (Hard refresh)
    if (e.ctrlKey && e.keyCode === 116) {
        e.preventDefault();
        return false;
    }
});

// Sağ tık menüsünü engelle
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    return false;
});

// Geliştirici araçlarını tespit et ve uyar
function detectDevTools() {
    const threshold = 160;
    
    if (window.outerHeight - window.innerHeight > threshold || 
        window.outerWidth - window.innerWidth > threshold) {
        document.body.innerHTML = '<div style="text-align: center; padding: 50px; color: white; font-family: Arial, sans-serif;"><h1>Erişim Engellendi</h1><p>Geliştirici araçları kullanımı yasaktır.</p></div>';
        return true;
    }
    return false;
}

// Sürekli kontrol et
setInterval(detectDevTools, 1000);

// Console'u temizle
setInterval(function() {
    console.clear();
    console.log('%cBu site korunmaktadır.', 'color: red; font-size: 20px; font-weight: bold;');
    console.log('%cGeliştirici araçları kullanımı yasaktır.', 'color: red; font-size: 16px;');
}, 100);

// Debugger'ı engelle
setInterval(function() {
    debugger;
}, 100);

// ===== GÜVENLİK ÖNLEMLERİ SONU =====

// DOM Elements
const bgVideo = document.getElementById('bgVideo');
const bgImage = document.getElementById('bgImage');
const backgroundMusic = document.getElementById('backgroundMusic');
const musicToggleBtn = document.getElementById('musicToggleBtn');

// Music Toggle Function
let isMusicPlaying = false;

musicToggleBtn.addEventListener('click', function() {
    if (isMusicPlaying) {
        backgroundMusic.pause();
        isMusicPlaying = false;
        this.classList.add('muted');
        this.querySelector('i').className = 'fas fa-volume-mute';
    } else {
        backgroundMusic.play().then(() => {
            isMusicPlaying = true;
            this.classList.remove('muted');
            this.querySelector('i').className = 'fas fa-volume-up';
        }).catch(e => {
            console.log('Müzik çalınamadı:', e);
        });
    }
});



// Initialize background and music
document.addEventListener('DOMContentLoaded', function() {
    // Check if video exists and load it
    bgVideo.addEventListener('loadeddata', function() {
        console.log('Video yüklendi');
        bgVideo.style.display = 'block';
        bgImage.style.display = 'none';
    });
    
    bgVideo.addEventListener('error', function() {
        console.log('Video yüklenemedi, resim gösteriliyor...');
        bgVideo.style.display = 'none';
        bgImage.style.display = 'block';
    });
    
    // Try to load video first, if it fails, image will be shown
    bgVideo.load();
    
    // Set initial music volume and try to play
    backgroundMusic.volume = 0.3;
    
    // Music ended event listener
    backgroundMusic.addEventListener('ended', function() {
        console.log('Müzik bitti, yeniden başlatılıyor...');
        backgroundMusic.currentTime = 0;
        backgroundMusic.play();
    });
    
    backgroundMusic.play().then(() => {
        isMusicPlaying = true;
        musicToggleBtn.querySelector('i').className = 'fas fa-volume-up';
    }).catch(e => {
        console.log('Müzik otomatik başlatılamadı:', e);
        isMusicPlaying = false;
        musicToggleBtn.classList.add('muted');
        musicToggleBtn.querySelector('i').className = 'fas fa-volume-mute';
    });
});

// Notification System
function showNotification(message, type) {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4ecdc4' : '#ff6b6b'};
        color: white;
        padding: 1rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        max-width: 300px;
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        .notification-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 1rem;
        }
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            line-height: 1;
        }
        .notification-close:hover {
            opacity: 0.8;
        }
    `;
    document.head.appendChild(style);
    
    // Add to page
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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



// Add hover effects for social links
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.05)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add subtle parallax effect
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const profileSection = document.querySelector('.profile-section');
    
    if (profileSection) {
        const rate = scrolled * -0.1;
        profileSection.style.transform = `translateY(${rate}px)`;
    }
});



// Add typing effect for the name (optional)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', function() {
    const nameElement = document.querySelector('.name');
    if (nameElement) {
        const originalText = nameElement.textContent;
        setTimeout(() => {
            typeWriter(nameElement, originalText, 120);
        }, 500);
    }
    
    // Add loading animation for all sections
    const sections = document.querySelectorAll('.about-section, .contact-section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'all 0.8s ease';
        
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, 1000 + (index * 200));
    });
});

// Add skill tags animation with stagger effect
document.querySelectorAll('.skill-tag').forEach((tag, index) => {
    tag.style.opacity = '0';
    tag.style.transform = 'translateY(30px) scale(0.8)';
    tag.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    
    setTimeout(() => {
        tag.style.opacity = '1';
        tag.style.transform = 'translateY(0) scale(1)';
    }, index * 150 + 1000);
});

// Add social link stagger animation
document.querySelectorAll('.social-link').forEach((link, index) => {
    link.style.animationDelay = `${index * 0.1}s`;
});

// Add scroll reveal animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for animation
document.querySelectorAll('.about-section, .contact-section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.8s ease';
    observer.observe(section);
});



// Add info notification type
function showNotification(message, type) {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4ecdc4' : '#ff6b6b'};
        color: white;
        padding: 1rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        max-width: 300px;
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        .notification-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 1rem;
        }
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            line-height: 1;
        }
        .notification-close:hover {
            opacity: 0.8;
        }
    `;
    document.head.appendChild(style);
    
    // Add to page
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
    
    // Update background color for info type
    if (type === 'info') {
        notification.style.background = '#45b7d1';
    }
}
