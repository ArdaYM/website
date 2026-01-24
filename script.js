/* Ourlex Portfolio - Interactive Logic */

document.addEventListener('DOMContentLoaded', () => {
    // === ELEMENTS ===
    const cursorGlow = document.getElementById('cursorGlow');
    const navbar = document.querySelector('.navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const themeToggle = document.getElementById('themeToggle');
    const musicToggle = document.getElementById('musicToggle');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const toast = document.getElementById('toast');
    const canvas = document.getElementById('interactiveCanvas');
    const typingElement = document.getElementById('typingText');

    let isMusicPlaying = false;
    let isDarkMode = true;

    // === CURSOR GLOW ===
    document.addEventListener('mousemove', (e) => {
        if (cursorGlow) {
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top = e.clientY + 'px';
            cursorGlow.style.opacity = '1';
        }
    });

    // === PARTICLES ===
    function createParticles() {
        const pContainer = document.getElementById('particles');
        if (!pContainer) return;
        pContainer.innerHTML = '';
        for (let i = 0; i < 30; i++) {
            const p = document.createElement('div');
            p.className = 'particle';
            p.style.left = Math.random() * 100 + '%';
            p.style.animationDelay = Math.random() * 15 + 's';
            p.style.animationDuration = (15 + Math.random() * 10) + 's';
            pContainer.appendChild(p);
        }
    }
    createParticles();

    // === NAVBAR & SCROLL ===
    window.addEventListener('scroll', () => {
        if (navbar) {
            if (window.scrollY > 50) navbar.classList.add('scrolled');
            else navbar.classList.remove('scrolled');
        }
    });

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('open');
        });
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('open');
            });
        });
    }

    // === THEME TOGGLE ===
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            isDarkMode = !isDarkMode;
            if (isDarkMode) {
                document.body.removeAttribute('data-theme');
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            } else {
                document.body.setAttribute('data-theme', 'light');
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            }
        });
    }

    // === MUSIC TOGGLE ===
    if (musicToggle && backgroundMusic) {
        backgroundMusic.volume = 0.3;
        musicToggle.addEventListener('click', () => {
            if (isMusicPlaying) {
                backgroundMusic.pause();
                isMusicPlaying = false;
                musicToggle.innerHTML = '<i class="fas fa-volume-xmark"></i>';
            } else {
                backgroundMusic.play().then(() => {
                    isMusicPlaying = true;
                    musicToggle.innerHTML = '<i class="fas fa-volume-high"></i>';
                }).catch(() => { });
            }
        });
    }

    // === 3D INTERACTIVE CANVAS ===
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height, particles = [];
        const particleCount = 60, connectionDistance = 100, sphereRadius = 180;
        let rotation = { x: 0, y: 0 }, targetRotation = { x: 0, y: 0 };

        class SphereParticle {
            constructor() {
                const theta = Math.random() * Math.PI * 2;
                const phi = Math.acos((Math.random() * 2) - 1);
                this.x = sphereRadius * Math.sin(phi) * Math.cos(theta);
                this.y = sphereRadius * Math.sin(phi) * Math.sin(theta);
                this.z = sphereRadius * Math.cos(phi);
            }
            project(rotX, rotY, w, h) {
                let x1 = this.x * Math.cos(rotY) - this.z * Math.sin(rotY);
                let z1 = this.z * Math.cos(rotY) + this.x * Math.sin(rotY);
                let y1 = this.y * Math.cos(rotX) - z1 * Math.sin(rotX);
                let z2 = z1 * Math.cos(rotX) + this.y * Math.sin(rotX);
                const scale = 400 / (400 + z2);
                return { x: x1 * scale + w / 2, y: y1 * scale + h / 2, scale, z: z2 };
            }
        }

        const resizeCanvas = () => {
            width = canvas.parentElement.clientWidth;
            height = canvas.parentElement.clientHeight;
            canvas.width = width; canvas.height = height;
        };

        const initCanvas = () => {
            particles = Array.from({ length: particleCount }, () => new SphereParticle());
        };

        const drawCanvas = () => {
            ctx.clearRect(0, 0, width, height);
            rotation.x += (targetRotation.x - rotation.x) * 0.05;
            rotation.y += (targetRotation.y - rotation.y) * 0.05;
            targetRotation.y += 0.002;

            const projected = particles.map(p => p.project(rotation.x, rotation.y, width, height));
            const color = isDarkMode ? '#ffffff' : '#000000';
            ctx.strokeStyle = color; ctx.fillStyle = color;

            for (let i = 0; i < particleCount; i++) {
                for (let j = i + 1; j < particleCount; j++) {
                    const p1 = projected[i], p2 = projected[j];
                    const dist = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
                    if (dist < connectionDistance) {
                        ctx.globalAlpha = (1 - dist / connectionDistance) * 0.4;
                        ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();
                    }
                }
            }

            projected.forEach(p => {
                ctx.globalAlpha = Math.max(0.1, p.scale - 0.5);
                ctx.beginPath(); ctx.arc(p.x, p.y, 2 * p.scale, 0, Math.PI * 2); ctx.fill();
            });
            requestAnimationFrame(drawCanvas);
        };

        window.addEventListener('resize', resizeCanvas);
        document.addEventListener('mousemove', (e) => {
            targetRotation.y = (e.clientX - window.innerWidth / 2) * 0.001;
            targetRotation.x = (e.clientY - window.innerHeight / 2) * 0.001;
        });

        resizeCanvas(); initCanvas(); drawCanvas();
    }

    // === TYPING EFFECT ===
    if (typingElement) {
        const words = ["Ourlex", "Arda"];
        let wordIdx = 0, charIdx = words[0].length, isDeleting = true, speed = 100;

        function type() {
            const current = words[wordIdx];
            if (isDeleting) {
                typingElement.textContent = current.substring(0, charIdx - 1);
                charIdx--; speed = 100;
            } else {
                typingElement.textContent = current.substring(0, charIdx + 1);
                charIdx++; speed = 150;
            }

            if (!isDeleting && charIdx === current.length) { isDeleting = true; speed = 3000; }
            else if (isDeleting && charIdx === 0) { isDeleting = false; wordIdx = (wordIdx + 1) % words.length; speed = 500; }
            setTimeout(type, speed);
        }
        setTimeout(type, 2000);
    }

    // === STAT COUNTERS ===
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-count');
            if (!target) return;
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            const update = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(update);
                } else {
                    counter.textContent = target;
                }
            };
            update();
        });
    }

    // === SCROLL ANIMATIONS ===
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                if (entry.target.id === 'hero') animateCounters();
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section, .about-content, .feature-card, .project-card, .skill-card').forEach(el => scrollObserver.observe(el));

    // === CLIPBOARD & TOAST ===
    function showToast(msg) {
        if (!toast) return;
        const m = toast.querySelector('.toast-message');
        if (m) m.textContent = msg;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    }

    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const text = btn.dataset.copy || btn.parentElement.querySelector('.contact-value')?.textContent;
            if (text) {
                navigator.clipboard.writeText(text).then(() => {
                    showToast('Kopyalandı!');
                    btn.innerHTML = '<i class="fas fa-check"></i>';
                    setTimeout(() => btn.innerHTML = '<i class="fas fa-copy"></i>', 2000);
                });
            }
        });
    });

    document.querySelectorAll('.contact-card').forEach(card => {
        card.addEventListener('click', () => card.querySelector('.copy-btn')?.click());
    });

    // === PROJECT LOADER ===
    function loadProjects() {
        const grid = document.getElementById('projectsGrid');
        if (!grid) return;

        let projs = JSON.parse(localStorage.getItem('projects'));
        if (!projs || projs.length === 0) {
            projs = [
                { id: 1, title: "ACollection Plugin", category: "Minecraft Plugin", desc: "Minecraft için gelişmiş koleksiyon ve ödül sistemi.", tags: ["Java", "Paper API"], img: "assets/img/plugin1.jpg", size: "medium" },
                { id: 2, title: "ABlackMarket", category: "Minecraft Plugin", desc: "Minecraft sunucuları için kara borsa sistemi.", tags: ["Java", "Spigot"], img: "projeresim/karaborsa.jpeg", size: "small" }
            ];
            localStorage.setItem('projects', JSON.stringify(projs));
        }

        grid.innerHTML = '';
        projs.forEach((p, i) => {
            const art = document.createElement('article');
            art.className = `project-card size-${p.size || 'medium'}`;
            art.style.animationDelay = `${i * 0.1}s`;

            const imageContent = p.img
                ? `<img src="${p.img}" alt="${p.title}" class="project-bg-image">`
                : `<div class="project-icon"><i class="fas ${p.category?.toLowerCase().includes('web') ? 'fa-code' : 'fa-cube'}"></i></div>`;

            art.innerHTML = `
                <div class="project-image">
                    ${imageContent}
                    <div class="project-overlay"><span class="project-category">${p.category}</span></div>
                </div>
                <div class="project-content">
                    <h3 class="project-title">${p.title}</h3>
                    <p class="project-description">${p.desc}</p>
                    <div class="project-tech">${(p.tags || []).map(t => `<span class="tech-badge">${t}</span>`).join('')}</div>
                </div>
            `;
            grid.appendChild(art);
            scrollObserver.observe(art);
        });
    }
    loadProjects();
});
