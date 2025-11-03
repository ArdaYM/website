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
    
    // Ctrl+Shift+K (Firefox Console)
    if (e.ctrlKey && e.shiftKey && e.keyCode === 75) {
        e.preventDefault();
        return false;
    }
    
    // Ctrl+Shift+E (Firefox Inspector)
    if (e.ctrlKey && e.shiftKey && e.keyCode === 69) {
        e.preventDefault();
        return false;
    }
    
    // Ctrl+Shift+Del (Clear data)
    if (e.ctrlKey && e.shiftKey && e.keyCode === 46) {
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

// Kaynak kodlarını gizle
(function() {
    'use strict';
    
    // Tüm script etiketlerini gizle
    const scripts = document.querySelectorAll('script');
    scripts.forEach(script => {
        script.style.display = 'none';
        script.setAttribute('hidden', 'true');
    });
    
    // CSS dosyalarını gizle
    const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
    stylesheets.forEach(link => {
        link.style.display = 'none';
        link.setAttribute('hidden', 'true');
    });
    
    // Kaynak görüntüleme engelle
    const originalOpen = window.open;
    window.open = function(url, name, specs) {
        if (url && (url.includes('view-source:') || url.includes('chrome://') || url.includes('about:'))) {
            return null;
        }
        return originalOpen.call(this, url, name, specs);
    };
    
    // Console'da kaynak kodlarını gizle
    const originalLog = console.log;
    console.log = function() {
        const args = Array.from(arguments);
        if (args.some(arg => typeof arg === 'string' && arg.includes('script.js'))) {
            return;
        }
        return originalLog.apply(console, arguments);
    };
    
    // Network tab'ında dosyaları gizle
    const originalFetch = window.fetch;
    window.fetch = function() {
        const url = arguments[0];
        if (typeof url === 'string' && (url.includes('.js') || url.includes('.css'))) {
            return Promise.reject(new Error('Access denied'));
        }
        return originalFetch.apply(this, arguments);
    };
})();

// ===== GÜVENLİK ÖNLEMLERİ SONU =====

// DOM Elements
const bgVideo = document.getElementById('bgVideo');
const bgImage = document.getElementById('bgImage');
const backgroundMusic = document.getElementById('backgroundMusic');
const musicToggleBtn = document.getElementById('musicToggleBtn');
const themeToggleBtn = document.getElementById('themeToggleBtn');

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

// Theme Toggle Function
let isDarkTheme = true;

themeToggleBtn.addEventListener('click', function() {
    const body = document.body;
    const icon = this.querySelector('i');
    const backgroundImage = document.getElementById('bgImage');
    const backgroundContainer = document.querySelector('.background-container');
    const backgroundOverlay = document.querySelector('.background-overlay');
    
    // Add transition class
    body.classList.add('theme-transitioning');
    
    // Completely freeze all background animations and transforms
    const backgroundElements = [backgroundImage, backgroundContainer, backgroundOverlay];
    backgroundElements.forEach(element => {
        if (element) {
            element.style.transform = 'scale(1) translateZ(0)';
            element.style.transition = 'opacity 0.8s ease';
            element.style.animation = 'none';
            element.style.willChange = 'opacity';
        }
    });
    
    if (isDarkTheme) {
        // Switch to white theme
        body.setAttribute('data-theme', 'white');
        icon.className = 'fas fa-sun';
        isDarkTheme = false;
    } else {
        // Switch to dark theme
        body.removeAttribute('data-theme');
        icon.className = 'fas fa-moon';
        isDarkTheme = true;
    }
    
    // Remove transition class after animation
    setTimeout(() => {
        body.classList.remove('theme-transitioning');
        // Reset any forced styles but keep background stable
        backgroundElements.forEach(element => {
            if (element) {
                element.style.transform = 'scale(1)';
                element.style.transition = 'opacity 0.6s ease';
                element.style.animation = '';
                element.style.willChange = '';
            }
        });
    }, 800);
});



// Arka planı tüm animasyonlardan koruma fonksiyonu
function protectBackgroundFromAnimations() {
    const backgroundElements = [
        document.querySelector('.background-container'),
        document.getElementById('bgImage'),
        document.querySelector('.background-overlay'),
        document.getElementById('bgVideo')
    ];
    
    backgroundElements.forEach(element => {
        if (element) {
            element.style.transform = 'scale(1) translateZ(0)';
            element.style.animation = 'none';
            element.style.transition = 'opacity 0.6s ease';
            element.style.willChange = 'opacity';
            element.style.backfaceVisibility = 'hidden';
            element.style.perspective = '1000px';
        }
    });
}

// Initialize background and music
document.addEventListener('DOMContentLoaded', function() {
    // Arka planı koruma
    protectBackgroundFromAnimations();
    
    // Test notification on page load (removed for production)
    // setTimeout(() => {
    //     showNotification('Site yüklendi! Discord alanını test edebilirsiniz.', 'info', 'fas fa-info-circle');
    // }, 2000);
    
    // Check if video exists and load it
    bgVideo.addEventListener('loadeddata', function() {
        console.log('Video yüklendi');
        bgVideo.style.display = 'block';
        bgImage.style.display = 'none';
        protectBackgroundFromAnimations();
    });
    
    bgVideo.addEventListener('error', function() {
        console.log('Video yüklenemedi, resim gösteriliyor...');
        bgVideo.style.display = 'none';
        bgImage.style.display = 'block';
        protectBackgroundFromAnimations();
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
    
    // Periyodik olarak arka planı koru
    setInterval(protectBackgroundFromAnimations, 1000);
    
    // Tüm animasyon event'lerinde arka planı koru
    document.addEventListener('animationstart', protectBackgroundFromAnimations);
    document.addEventListener('animationend', protectBackgroundFromAnimations);
    document.addEventListener('transitionstart', protectBackgroundFromAnimations);
    document.addEventListener('transitionend', protectBackgroundFromAnimations);
});

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function() {
            const isOpen = navLinks.classList.toggle('open');
            this.querySelector('i').className = isOpen ? 'fas fa-times' : 'fas fa-bars';
        });
        // Close menu on link click (mobile)
        navLinks.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => {
                navLinks.classList.remove('open');
                navToggle.querySelector('i').className = 'fas fa-bars';
            });
        });
    }
});

// Mini Leaderboard logic
document.addEventListener('DOMContentLoaded', function() {
    const leaderboardEl = document.getElementById('leaderboard');
    const addBtn = document.getElementById('addScore');
    const resetBtn = document.getElementById('resetScore');
    if (!leaderboardEl) return;
    const KEY = 'ourlex_leaderboard';
    function readScores() {
        try { return JSON.parse(localStorage.getItem(KEY)) || [{ user:'aym', score:1280 }, { user:'arda', score:1090 }, { user:'guest', score:920 }]; } catch { return []; }
    }
    function writeScores(scores) { localStorage.setItem(KEY, JSON.stringify(scores)); }
    function render(scores) {
        leaderboardEl.innerHTML = scores.map(s => `<li><span class="user">${s.user}</span><span class="score">${s.score}</span></li>`).join('');
    }
    function randomDelta() { return Math.floor(20 + Math.random() * 80); }
    let scores = readScores();
    render(scores);
    addBtn?.addEventListener('click', () => {
        scores = readScores().map(s => ({ ...s, score: s.score + randomDelta() }))
            .sort((a,b) => b.score - a.score).slice(0, 5);
        writeScores(scores); render(scores);
        showNotification?.('Skorlar güncellendi!', 'success', 'fas fa-trophy');
    });
    resetBtn?.addEventListener('click', () => {
        scores = [{ user:'aym', score:1280 }, { user:'arda', score:1090 }, { user:'guest', score:920 }];
        writeScores(scores); render(scores);
        showNotification?.('Skorlar sıfırlandı', 'info', 'fas fa-rotate');
    });
});

// Beautiful Glass Notification System
function showNotification(message, type, icon = null) {
    // Remove existing notifications
    const existingNotification = document.querySelector('.glass-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'glass-notification';
    
    // Get theme colors
    const isDark = !document.body.hasAttribute('data-theme') || document.body.getAttribute('data-theme') !== 'white';
    const bgColor = isDark ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.9)';
    const textColor = isDark ? '#ffffff' : '#1a1a1a';
    const borderColor = isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)';
    
    // Type-specific styling
    let typeColor = '#7289da';
    let typeIcon = 'fas fa-info-circle';
    
    if (type === 'success') {
        typeColor = '#4ecdc4';
        typeIcon = 'fas fa-check-circle';
    } else if (type === 'error') {
        typeColor = '#ff6b6b';
        typeIcon = 'fas fa-exclamation-circle';
    } else if (type === 'info') {
        typeColor = '#45b7d1';
        typeIcon = 'fas fa-info-circle';
    }
    
    if (icon) {
        typeIcon = icon;
    }
    
    notification.innerHTML = `
        <div class="glass-notification-content">
            <div class="notification-icon" style="background: linear-gradient(135deg, ${typeColor}, ${typeColor}dd);">
                <i class="${typeIcon}"></i>
            </div>
            <div class="notification-text">
                <span class="notification-message">${message}</span>
            </div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add beautiful glass styles
    notification.style.cssText = `
        position: fixed !important;
        top: 30px !important;
        right: 30px !important;
        background: ${bgColor} !important;
        backdrop-filter: blur(20px) !important;
        -webkit-backdrop-filter: blur(20px) !important;
        border: 1px solid ${borderColor} !important;
        border-radius: 20px !important;
        box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.1),
            0 0 0 1px rgba(255, 255, 255, 0.05),
            inset 0 1px 0 rgba(255, 255, 255, 0.1) !important;
        z-index: 999999 !important;
        animation: glassSlideIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) !important;
        max-width: 400px !important;
        min-width: 300px !important;
        overflow: hidden !important;
        margin: 0 !important;
        padding: 0 !important;
    `;
    
    // Add glass effect overlay
    const glassOverlay = document.createElement('div');
    glassOverlay.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
        border-radius: 20px;
        pointer-events: none;
    `;
    notification.appendChild(glassOverlay);
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes glassSlideIn {
            0% { 
                transform: translateX(100%) scale(0.8); 
                opacity: 0; 
            }
            50% { 
                transform: translateX(-10px) scale(1.05); 
                opacity: 0.8; 
            }
            100% { 
                transform: translateX(0) scale(1); 
                opacity: 1; 
            }
        }
        
        @keyframes glassSlideOut {
            0% { 
                transform: translateX(0) scale(1); 
                opacity: 1; 
            }
            100% { 
                transform: translateX(100%) scale(0.8); 
                opacity: 0; 
            }
        }
        
        .glass-notification-content {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 1.2rem 1.5rem;
            position: relative;
            z-index: 2;
        }
        
        .notification-icon {
            width: 45px;
            height: 45px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            animation: iconPulse 2s ease-in-out infinite;
        }
        
        @keyframes iconPulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
        
        .notification-icon i {
            color: white;
            font-size: 1.2rem;
        }
        
        .notification-text {
            flex: 1;
        }
        
        .notification-message {
            color: ${textColor};
            font-size: 1rem;
            font-weight: 500;
            line-height: 1.4;
            ${isDark ? 'text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);' : ''}
        }
        
        .notification-close {
            width: 35px;
            height: 35px;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
            color: ${textColor};
        }
        
        .notification-close:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: scale(1.1);
        }
        
        .notification-close i {
            font-size: 0.9rem;
        }
    `;
    document.head.appendChild(style);
    
    // Add to page
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'glassSlideOut 0.3s ease forwards';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    });
    
    // Auto remove after 6 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'glassSlideOut 0.3s ease forwards';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, 6000);
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

// Discord Profile and Server Links
document.addEventListener('DOMContentLoaded', function() {
    const discordProfile = document.getElementById('discordProfile');
    const discordServer = document.getElementById('discordServer');
    
    // Discord Profile click handler
    if (discordProfile) {
        discordProfile.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Copy to clipboard with beautiful notification
            navigator.clipboard.writeText('whoissarda').then(() => {
                showNotification('Discord kullanıcı adı panoya kopyalandı!', 'success', 'fas fa-copy');
            }).catch(() => {
                showNotification('Discord kullanıcı adı: whoissarda', 'info', 'fab fa-discord');
            });
        });
    }
    
});

// Projects Section Toggle
document.addEventListener('DOMContentLoaded', function() {
    const projectsToggle = document.getElementById('projectsToggle');
    const projectsContent = document.getElementById('projectsContent');
    const projectsArrow = projectsToggle?.querySelector('.projects-arrow i');
    
    if (projectsToggle && projectsContent) {
        let isOpen = false;
        
        projectsToggle.addEventListener('click', function() {
            // Toggle animation
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            if (isOpen) {
                // Close projects
                projectsContent.classList.remove('active');
                projectsArrow.style.transform = 'rotate(0deg)';
                isOpen = false;
            } else {
                // Open projects
                projectsContent.classList.add('active');
                projectsArrow.style.transform = 'rotate(180deg)';
                isOpen = true;
            }
        });
        
    }
});

// Contact Handlers
document.addEventListener('DOMContentLoaded', function() {
    const contactEmail = document.getElementById('contactEmail');
    const contactDiscord = document.getElementById('contactDiscord');
    
    // Email handler
    if (contactEmail) {
        contactEmail.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Copy to clipboard with beautiful notification
            navigator.clipboard.writeText('ourlex@email.com').then(() => {
                showNotification('Email adresi panoya kopyalandı!', 'success', 'fas fa-copy');
            }).catch(() => {
                showNotification('Email adresi: ourlex@email.com', 'info', 'fas fa-envelope');
            });
        });
    }
    
    // Discord handler
    if (contactDiscord) {
        contactDiscord.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Copy to clipboard with beautiful notification
            navigator.clipboard.writeText('whoissarda').then(() => {
                showNotification('Discord kullanıcı adı panoya kopyalandı!', 'success', 'fas fa-copy');
            }).catch(() => {
                showNotification('Discord kullanıcı adı: whoissarda', 'info', 'fab fa-discord');
            });
        });
    }
});

// Add subtle parallax effect
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const profileSection = document.querySelector('.profile-section');
    
    if (profileSection) {
        const rate = scrolled * -0.1;
        profileSection.style.transform = `translateY(${rate}px)`;
    }
    
    // Arka planı scroll animasyonundan koru
    protectBackgroundFromAnimations();
});



// Initialize page load animations
window.addEventListener('load', function() {
    
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




// Simon Game + Leaderboard
document.addEventListener('DOMContentLoaded', function() {
    const leaderboardEl = document.getElementById('leaderboard');
    const startBtn = document.getElementById('startGame');
    const gridEl = document.getElementById('simonGrid');
    const statusEl = document.getElementById('gameStatus');
    const rankInfo = document.getElementById('rankInfo');
    if (!leaderboardEl || !startBtn || !gridEl) return;

    const KEY = 'ourlex_simon_scores';
    function readScores() { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; } }
    function writeScores(scores) { localStorage.setItem(KEY, JSON.stringify(scores)); }
    function render(scores) {
        const top = scores.slice().sort((a,b) => b - a).slice(0, 3);
        leaderboardEl.innerHTML = top.map((v, i) => `<li class="top${i+1}"><span class="user">${i+1}. skor</span><span class="score">${v}</span></li>`).join('');
    }
    render(readScores());

    const pads = Array.from(gridEl.querySelectorAll('.pad'));
    let sequence = [];
    let inputIndex = 0;
    let playingBack = false;

    startBtn.addEventListener('click', () => { startGame(); });
    pads.forEach(p => p.addEventListener('click', () => handlePad(parseInt(p.dataset.id))));

    function flashPad(id, delay = 0) {
        const pad = pads[id];
        setTimeout(() => {
            pad.classList.add('active');
            setTimeout(() => pad.classList.remove('active'), 450);
        }, delay);
    }

    function playback() {
        playingBack = true;
        statusEl.textContent = `Dizi oynatılıyor (seviye ${sequence.length})`;
        let t = 300;
        sequence.forEach(id => { flashPad(id, t); t += 600; });
        setTimeout(() => {
            playingBack = false;
            inputIndex = 0;
            statusEl.textContent = 'Sıra sende!';
        }, t + 150);
    }

    function nextRound() { sequence.push(Math.floor(Math.random() * 4)); playback(); }

    function startGame() { sequence = []; rankInfo.textContent = ''; nextRound(); }

    function endGame() {
        const level = Math.max(0, sequence.length - 1);
        const scores = readScores();
        scores.push(level);
        scores.sort((a,b) => b - a);
        writeScores(scores);
        render(scores);
        const rank = scores.findIndex(v => v === level) + 1;
        if (rank > 0) { rankInfo.textContent = `${rank}. sıradasın`; }
        statusEl.textContent = `Oyun bitti! Seviye: ${level}. Tekrar için Başlat.`;
    }

    function handlePad(id) {
        if (playingBack || sequence.length === 0) return;
        flashPad(id);
        if (id === sequence[inputIndex]) {
            inputIndex += 1;
            if (inputIndex === sequence.length) setTimeout(nextRound, 600);
        } else { endGame(); }
    }
});