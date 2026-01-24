/* 
   ================================================================
   OURLEX SECURITY PROTECTION v3.2 (Deployment Stability Fix)
   ================================================================
   - Removed 'Stealth' tag auto-removal to prevent CSS drops.
   - Simplified detection for better compatibility with GitHub Pages.
   ================================================================
*/

(function () {
    'use strict';

    // 1. NUCLEAR WIPE (Triggers ONLY on confirmed inspection)
    const triggerNuclearOption = () => {
        document.body.innerHTML = `
            <div style="position:fixed;top:0;left:0;width:100vw;height:100vh;background:#000;color:red;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:sans-serif;text-align:center;z-index:999999;">
                <h1 style="font-size:3rem;">⚠️ GÜVENLİK İHLALİ</h1>
                <p style="font-size:1.5rem;color:white;">İnceleme tespit edildi! Sayfa donduruldu.</p>
            </div>
        `;
        if (window.console && window.console.clear) console.clear();
        // Prevent interaction
        window.location.reload();
    };

    // 2. DETECTION METHODS
    const detect = () => {
        // High threshold for size detection to avoid false positives on mobile/high-dpi
        const threshold = 200;
        if (window.outerHeight - window.innerHeight > threshold || window.outerWidth - window.innerWidth > threshold) {
            // Only trigger if not on a small mobile device where this math can be tricky
            if (window.innerWidth > 500) {
                triggerNuclearOption();
            }
        }
    };

    const debuggerTrap = () => {
        const start = new Date();
        debugger;
        if (new Date().getTime() - start.getTime() > 150) {
            triggerNuclearOption();
        }
    };

    // 3. INTERACTION BLOCKING (Safest protection)
    const blockInteractions = () => {
        document.addEventListener('contextmenu', e => e.preventDefault());
        document.addEventListener('selectstart', e => e.preventDefault());
        document.addEventListener('keydown', e => {
            // Block F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U, Ctrl+S
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
        // We removed the stealthCleanup that was deleting <link> tags.

        setInterval(detect, 2000);
        setInterval(debuggerTrap, 1000);

        console.log('%c🛡️ PROTECTION ENABLED', 'color:green; font-weight:bold;');
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
