/* 
   ================================================================
   OURLEX STEALTH SECURITY PROTECTION v3.1 (GitHub Optimized)
   ================================================================
   WARNING: This script implements aggressive anti-inspection 
   techniques while ensuring styles remain applied on all hosts.
   ================================================================
*/

(function () {
    'use strict';

    // 1. STEALTH MECHANISM (Hides traces without breaking rendering)
    const stealthCleanup = () => {
        // Instead of removing, we move them to a different part of the doc 
        // and change their ID to make them harder to track, or we just leave CSS.
        // REMOVING CSS LINK TAGS OFTEN BREAKS STYLES IN CHROME/EDGE.

        const scriptTag = document.querySelector('script[src*="security.js"]');
        if (scriptTag) scriptTag.remove(); // Scripts stay in memory even if tag is removed

        // For CSS, we just hide the link tag from simple inspection if possible, 
        // but absolute removal is too risky for deployment stability.
    };

    // 2. NUCLEAR WIPE (Clear everything if someone breaks through)
    const triggerNuclearOption = () => {
        document.documentElement.innerHTML = `
            <head>
                <title>🚫 ERİŞİM ENGELLENDİ</title>
                <style>
                    body { 
                        background: #000; color: red; 
                        display: flex; flex-direction: column;
                        align-items: center; justify-content: center; 
                        height: 100vh; margin: 0; font-family: sans-serif; 
                    }
                </style>
            </head>
            <body>
                <h1>⚠️ GÜVENLİK İHLALİ</h1>
                <p>İzinsiz erişim denemesi engellendi.</p>
            </body>
        `;
        if (window.console && window.console.clear) console.clear();
        setTimeout(() => window.location.reload(), 2000);
    };

    // 3. DETECTION Logic
    const detect = () => {
        const threshold = 160;
        if (window.outerHeight - window.innerHeight > threshold || window.outerWidth - window.innerWidth > threshold) {
            triggerNuclearOption();
        }
    };

    const debuggerTrap = () => {
        const start = new Date();
        debugger;
        if (new Date().getTime() - start.getTime() > 100) triggerNuclearOption();
    };

    // 4. INTERACTION BLOCKING
    const blockInteractions = () => {
        document.addEventListener('contextmenu', e => e.preventDefault());
        document.addEventListener('selectstart', e => e.preventDefault());
        document.addEventListener('keydown', e => {
            if (e.keyCode === 123 || (e.ctrlKey && e.shiftKey && [73, 74, 67].includes(e.keyCode)) || (e.ctrlKey && [85, 83].includes(e.keyCode))) {
                e.preventDefault();
                return false;
            }
        });
    };

    // INITIALIZE
    const init = () => {
        blockInteractions();
        setTimeout(stealthCleanup, 500);
        setInterval(detect, 1000);
        setInterval(debuggerTrap, 500);
        console.log('%c🛡️ PROTECTION ACTIVE', 'color:red; font-weight:bold;');
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
