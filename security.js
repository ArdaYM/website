/* 
   ================================================================
   OURLEX STEALTH SECURITY PROTECTION v3.0
   ================================================================
   WARNING: This script implements aggressive anti-inspection 
   techniques including self-removal from DOM and debugger traps.
   ================================================================
*/

(function () {
    'use strict';

    // 1. SELF-DESTRUCT MECHANISM (Hides traces from Elements tab)
    const stealthCleanup = () => {
        // Remove style links and scripts from the DOM (they remain in memory)
        const selectors = [
            'link[href*="style.css"]',
            'script[src*="security.js"]'
        ];

        selectors.forEach(sel => {
            const el = document.querySelector(sel);
            if (el) el.remove();
        });
    };

    // 2. NUCLEAR WIPE (Clear everything if someone breaks through)
    const triggerNuclearOption = () => {
        // Completely destroy the page content
        document.documentElement.innerHTML = `
            <head>
                <title>🚫 ERİŞİM ENGELLENDİ</title>
                <style>
                    body { 
                        background: radial-gradient(circle, #1a0000, #000); 
                        color: #ff4d4d; 
                        display: flex; 
                        flex-direction: column;
                        align-items: center; 
                        justify-content: center; 
                        height: 100vh; 
                        margin: 0; 
                        font-family: sans-serif; 
                        text-align: center;
                    }
                    .box { padding: 40px; border: 2px solid red; border-radius: 20px; background: rgba(0,0,0,0.8); }
                    h1 { font-size: 3rem; margin: 0; }
                    p { font-size: 1.2rem; opacity: 0.8; }
                </style>
            </head>
            <body>
                <div class="box">
                    <h1>⚠️ GÜVENLİK İHLALİ</h1>
                    <p>Geliştirici araçları tespiti! Bu site sıkı koruma altındadır.</p>
                    <p style="font-size:0.8rem; color:white;">Yönlendiriliyor...</p>
                </div>
            </body>
        `;

        // Attempt to crash or freeze the DevTools if they are open
        if (window.console && window.console.clear) console.clear();

        // Loop reload
        setTimeout(() => window.location.reload(), 2000);
    };

    // 3. ADVANCED DETECTION
    const detect = () => {
        // Size-based detection
        const threshold = 160;
        const widthDev = window.outerWidth - window.innerWidth > threshold;
        const heightDev = window.outerHeight - window.innerHeight > threshold;

        if (widthDev || heightDev) {
            triggerNuclearOption();
        }
    };

    // 4. INFINITE DEBUGGER TRAP (Freezes browser if DevTools opens)
    const debuggerTrap = () => {
        const start = new Date();
        debugger; // This will pause execution if DevTools is open
        const end = new Date();
        if (end.getTime() - start.getTime() > 100) {
            triggerNuclearOption();
        }
    };

    // 5. INTERACTION BLOCKING
    const blockInteractions = () => {
        // Right-click
        document.addEventListener('contextmenu', e => e.preventDefault());

        // Selection
        document.addEventListener('selectstart', e => e.preventDefault());

        // Keyboard Shortcuts
        document.addEventListener('keydown', e => {
            // F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U, Ctrl+S, Ctrl+Shift+C
            if (
                e.keyCode === 123 ||
                (e.ctrlKey && e.shiftKey && [73, 74, 67].includes(e.keyCode)) ||
                (e.ctrlKey && [85, 83].includes(e.keyCode))
            ) {
                e.preventDefault();
                return false;
            }
        });
    };

    // INITIALIZE
    const init = () => {
        blockInteractions();

        // Run cleanup after a tiny delay to ensure files are loaded into memory
        setTimeout(stealthCleanup, 100);

        // Security intervals
        setInterval(detect, 500);
        setInterval(debuggerTrap, 100);

        console.log('%c🛡️ STEALTH SECURITY ACTIVE', 'color:cyan; font-weight:bold; font-size:12px;');
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
