// ===== GELİŞMİŞ GÜVENLİK SİSTEMİ =====

(function() {
    'use strict';
    
    // Geliştirici araçlarını tespit etme fonksiyonları
    const devTools = {
        // Pencere boyutlarından tespit
        size: function() {
            const threshold = 160;
            return window.outerHeight - window.innerHeight > threshold || 
                   window.outerWidth - window.innerWidth > threshold;
        },
        
        // Console açık mı kontrol et
        console: function() {
            let devtools = { open: false, orientation: null };
            const threshold = 160;
            
            setInterval(() => {
                if (window.outerHeight - window.innerHeight > threshold || 
                    window.outerWidth - window.innerWidth > threshold) {
                    if (!devtools.open) {
                        devtools.open = true;
                        this.trigger();
                    }
                } else {
                    devtools.open = false;
                }
            }, 500);
            
            return devtools;
        },
        
        // Firebug tespiti
        firebug: function() {
            if (window.console && (window.console.firebug || window.console.exception)) {
                this.trigger();
                return true;
            }
            return false;
        },
        
        // Debugger tespiti
        debugger: function() {
            const startTime = new Date();
            debugger;
            const endTime = new Date();
            if (endTime.getTime() - startTime.getTime() > 100) {
                this.trigger();
                return true;
            }
            return false;
        }
    };
    
    // Güvenlik ihlali tespit edildiğinde çalışacak fonksiyon
    function trigger() {
        // Tüm script etiketlerini kaldır
        const scripts = document.querySelectorAll('script');
        scripts.forEach(script => script.remove());
        
        // Tüm link etiketlerini kaldır
        const links = document.querySelectorAll('link[rel="stylesheet"]');
        links.forEach(link => link.remove());
        
        // Sayfayı tamamen temizle
        document.documentElement.innerHTML = '';
        document.body.innerHTML = '';
        
        // Yeni içerik oluştur
        const warning = document.createElement('div');
        warning.innerHTML = `
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: linear-gradient(45deg, #000000, #1a1a1a);
                color: #ff0000;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                font-family: 'Arial', sans-serif;
                text-align: center;
                z-index: 999999;
                padding: 20px;
            ">
                <h1 style="font-size: 3rem; margin-bottom: 20px; text-shadow: 0 0 20px #ff0000;">
                    ⚠️ GÜVENLİK İHLALİ
                </h1>
                <p style="font-size: 1.5rem; margin-bottom: 15px; color: #ffffff;">
                    Geliştirici araçları kullanımı tespit edildi!
                </p>
                <p style="font-size: 1.2rem; color: #cccccc; max-width: 600px;">
                    Bu site korunmaktadır. Geliştirici araçları kullanarak kaynak kodlarına erişmeye çalışmak yasaktır.
                </p>
                <div style="margin-top: 30px; padding: 20px; border: 2px solid #ff0000; border-radius: 10px; background: rgba(255,0,0,0.1);">
                    <p style="color: #ff6666; font-size: 1rem;">
                        Site güvenliği için sayfa yeniden yüklenmiştir.
                    </p>
                </div>
            </div>
        `;
        
        document.body.appendChild(warning);
        
        // Console'u temizle
        if (window.console && window.console.clear) {
            console.clear();
        }
        
        // Tüm global değişkenleri temizle
        Object.keys(window).forEach(key => {
            if (key !== 'securitySystem' && key !== 'console' && key !== 'document' && key !== 'window') {
                try {
                    delete window[key];
                } catch(e) {}
            }
        });
        
        // Sayfayı yeniden yükle (3 saniye sonra)
        setTimeout(() => {
            window.location.reload();
        }, 3000);
    }
    
    // Güvenlik kontrollerini başlat
    function initSecurity() {
        // Sürekli kontrol
        setInterval(() => {
            if (devTools.size()) {
                trigger();
            }
        }, 1000);
        
        // Debugger kontrolü
        setInterval(() => {
            devTools.debugger();
        }, 100);
        
        // Firebug kontrolü
        setInterval(() => {
            devTools.firebug();
        }, 1000);
        
        // Console temizleme
        setInterval(() => {
            if (window.console && window.console.clear) {
                console.clear();
                console.log('%c🚫 GÜVENLİK UYARISI 🚫', 'color: red; font-size: 20px; font-weight: bold;');
                console.log('%cBu site korunmaktadır!', 'color: red; font-size: 16px;');
                console.log('%cGeliştirici araçları kullanımı yasaktır.', 'color: red; font-size: 14px;');
            }
        }, 100);
    }
    
    // Sayfa yüklendiğinde güvenliği başlat
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSecurity);
    } else {
        initSecurity();
    }
    
    // Global güvenlik fonksiyonlarını dışa aktar
    window.securitySystem = {
        trigger: trigger,
        devTools: devTools,
        init: initSecurity
    };
    
})();

// ===== GÜVENLİK SİSTEMİ SONU =====

