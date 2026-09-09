/**
 * ==========================================================================
 * AMIT.ML - CORE APPLICATION LOGIC
 * ==========================================================================
 */

(function () {
    'use strict';

    /* --- 1. PAGE INITIALIZATION --- */
    function initializePage() {
        initTheme();
        initScrollReveal();
        initHeroTyping();
        initTiltEffect();
        initMobileMenu();
        initContactForm();
        initScrollSpy();
        initScrollTop();
        initAnimeInteractions();
        initResumeModal();
        initCommandPalette();
        initGitHubMetrics();
    }

    /* --- 4. THEME MANAGEMENT --- */
    function initTheme() {
        const themeToggle = document.getElementById('themeToggle');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

        function applyTheme(isDark) {
            document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
            if (themeToggle) {
                themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
                themeToggle.setAttribute('aria-label', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
            }
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        }

        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            applyTheme(savedTheme === 'dark');
        } else {
            applyTheme(prefersDark.matches);
        }

        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                const currentIsDark = document.documentElement.getAttribute('data-theme') === 'dark';
                applyTheme(!currentIsDark);
            });
        }

        prefersDark.addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                applyTheme(e.matches);
            }
        });
    }

    /* --- 4. NEURAL NETWORK CANVAS ANIMATION --- */
    const canvas = document.getElementById('neuro-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);
        let isTabActive = true;
        let animationFrameId = null;

        const points = [];
        const POINT_COUNT = Math.min(45, Math.floor(window.innerWidth / 30));

        let mouse = { x: null, y: null };

        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        }, { passive: true });

        window.addEventListener('mouseleave', () => {
            mouse.x = null;
            mouse.y = null;
        });

        function handleResize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }

        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(handleResize, 150);
        });

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.4;
                this.vy = (Math.random() - 0.5) * 0.4;
                this.radius = Math.random() * 1.5 + 1;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;
            }
        }

        for (let p = 0; p < POINT_COUNT; p++) {
            points.push(new Particle());
        }

        function drawNetwork() {
            if (!isTabActive) return;

            ctx.clearRect(0, 0, width, height);

            const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
            const nodeColor = isDark ? '#22d3ee' : '#0284c7';
            const lineBase = isDark ? 'rgba(124, 58, 237, ' : 'rgba(99, 102, 241, ';
            const mouseLineBase = isDark ? 'rgba(34, 211, 238, ' : 'rgba(2, 132, 199, ';

            for (let i = 0; i < points.length; i++) {
                for (let j = i + 1; j < points.length; j++) {
                    const dx = points[i].x - points[j].x;
                    const dy = points[i].y - points[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 140) {
                        const alpha = (1 - dist / 140) * 0.22;
                        ctx.strokeStyle = lineBase + alpha + ')';
                        ctx.lineWidth = 0.8;
                        ctx.beginPath();
                        ctx.moveTo(points[i].x, points[i].y);
                        ctx.lineTo(points[j].x, points[j].y);
                        ctx.stroke();
                    }
                }

                if (mouse.x !== null && mouse.y !== null) {
                    const mdx = points[i].x - mouse.x;
                    const mdy = points[i].y - mouse.y;
                    const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
                    if (mdist < 180) {
                        const mAlpha = (1 - mdist / 180) * 0.35;
                        ctx.strokeStyle = mouseLineBase + mAlpha + ')';
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(points[i].x, points[i].y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.stroke();
                    }
                }
            }

            ctx.fillStyle = nodeColor;
            for (let i = 0; i < points.length; i++) {
                points[i].update();
                ctx.beginPath();
                ctx.arc(points[i].x, points[i].y, points[i].radius, 0, Math.PI * 2);
                ctx.fill();
            }

            animationFrameId = requestAnimationFrame(drawNetwork);
        }

        // Page Visibility API - Saves battery when tab is hidden
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden') {
                isTabActive = false;
                if (animationFrameId) cancelAnimationFrame(animationFrameId);
            } else {
                isTabActive = true;
                drawNetwork();
            }
        });

        drawNetwork();
    }

    /* --- 5. SCROLL REVEAL & INTERSECTION OBSERVERS --- */
    function initScrollReveal() {
        const revealElements = document.querySelectorAll('.reveal');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.12 });

        revealElements.forEach((el) => observer.observe(el));

        // Roadmap Timeline Animation Trigger
        const qualTimeline = document.getElementById('qualTimeline');
        if (qualTimeline) {
            const timelineObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        qualTimeline.classList.add('animate');
                        timelineObserver.unobserve(qualTimeline);
                    }
                });
            }, { threshold: 0.15 });
            timelineObserver.observe(qualTimeline);
        }

        // Stats Counter Animation
        const statNumbers = document.querySelectorAll('.stat-number');
        if (statNumbers.length > 0) {
            const statsObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const target = parseInt(entry.target.getAttribute('data-target'), 10);
                        animateCounter(entry.target, target);
                        statsObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.4 });

            statNumbers.forEach((num) => statsObserver.observe(num));
        }
    }

    function animateCounter(element, target) {
        let current = 0;
        const duration = 1200;
        const frameRate = 30;
        const totalSteps = duration / frameRate;
        const increment = target / totalSteps;
        const suffix = element.getAttribute('data-suffix') || '';

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + suffix;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + suffix;
            }
        }, frameRate);
    }

    /* --- 7. HERO BASH TYPING EFFECT --- */
    function initHeroTyping() {
        const typeEl = document.getElementById('typing');
        if (!typeEl) return;

        const phrases = [
            'Building predictive ML models with Python...',
            'Engineering automated data pipelines...',
            'python -m model.train --accuracy 98.2%',
            'Exploring neural networks & NLP architectures...',
            'Turning complex data into intelligent decisions...'
        ];
        let pIndex = 0, cIndex = 0, isDeleting = false;

        function typeLoop() {
            const current = phrases[pIndex % phrases.length];
            typeEl.textContent = current.substring(0, cIndex);

            if (isDeleting) {
                cIndex--;
            } else {
                cIndex++;
            }

            if (!isDeleting && cIndex === current.length + 1) {
                isDeleting = true;
                setTimeout(typeLoop, 1800);
            } else if (isDeleting && cIndex === 0) {
                isDeleting = false;
                pIndex++;
                setTimeout(typeLoop, 320);
            } else {
                // Smooth natural keystroke cadence
                const speed = isDeleting ? 28 : 50 + (Math.random() * 25);
                setTimeout(typeLoop, speed);
            }
        }
        typeLoop();
    }

    /* --- 8. 3D TILT EFFECT --- */
    function initTiltEffect() {
        const cards = document.querySelectorAll('.tilt-card');
        cards.forEach((card) => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -4;
                const rotateY = ((x - centerX) / centerX) * 4;
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
            });
        });
    }

    /* --- 9. MOBILE MENU TOGGLE --- */
    function initMobileMenu() {
        const menuToggle = document.getElementById('menuToggle');
        const navLinks = document.getElementById('navLinks');

        if (!menuToggle || !navLinks) return;

        function updateToggleIcon(isActive) {
            menuToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.className = isActive ? 'fas fa-xmark' : 'fas fa-bars';
            }
        }

        function toggleMenu() {
            const isActive = navLinks.classList.toggle('active');
            updateToggleIcon(isActive);
        }

        menuToggle.addEventListener('click', toggleMenu);

        navLinks.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                updateToggleIcon(false);
            });
        });

        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') &&
                !e.target.closest('#navLinks') &&
                !e.target.closest('#menuToggle')) {
                navLinks.classList.remove('active');
                updateToggleIcon(false);
            }
        });
    }

    /* --- 10. SCROLL SPY & VIEWPORT-CENTERED NAVIGATION --- */
    function scrollToTargetCentered(targetElement) {
        if (!targetElement) return;

        const nav = document.querySelector('nav');
        const navHeight = nav ? nav.offsetHeight + 24 : 84;
        const viewportHeight = window.innerHeight;

        // Get element's absolute position in the document
        const rect = targetElement.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const elementTop = rect.top + scrollTop;
        const elementHeight = targetElement.offsetHeight;

        let targetScrollY;
        const availableViewHeight = viewportHeight - navHeight;

        if (elementHeight < availableViewHeight) {
            // Section is shorter than available viewport -> center it perfectly in the visible window
            const extraSpace = availableViewHeight - elementHeight;
            targetScrollY = elementTop - navHeight - (extraSpace / 2);
        } else {
            // Section is taller than screen space -> position cleanly below the floating navbar with padding
            targetScrollY = elementTop - navHeight - 16;
        }

        targetScrollY = Math.max(0, Math.round(targetScrollY));

        window.scrollTo({
            top: targetScrollY,
            behavior: 'smooth'
        });
    }

    function initSmoothCenterNavigation() {
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (!href || href === '#') return;

                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    scrollToTargetCentered(target);

                    // Close mobile menu if open
                    const navLinks = document.getElementById('navLinks');
                    const menuToggle = document.getElementById('menuToggle');
                    if (navLinks && navLinks.classList.contains('active')) {
                        navLinks.classList.remove('active');
                        if (menuToggle) {
                            menuToggle.setAttribute('aria-expanded', 'false');
                            const icon = menuToggle.querySelector('i');
                            if (icon) icon.className = 'fas fa-bars';
                        }
                    }

                    if (history.pushState) {
                        history.pushState(null, null, href);
                    }
                }
            });
        });
    }

    function initScrollSpy() {
        const sections = document.querySelectorAll('header[id], section[id]');
        const navLinks = document.querySelectorAll('.nav-links a');

        initSmoothCenterNavigation();

        const nav = document.querySelector('nav');

        window.addEventListener('scroll', () => {
            if (nav) {
                if (window.scrollY > 30) {
                    nav.classList.add('scrolled');
                } else {
                    nav.classList.remove('scrolled');
                }
            }

            let currentId = '';
            const scrollPos = window.pageYOffset || document.documentElement.scrollTop;
            const viewportCenter = scrollPos + window.innerHeight / 2;

            sections.forEach((sec) => {
                const top = sec.offsetTop - 140;
                const height = sec.offsetHeight;
                if (scrollPos >= top && scrollPos < top + height) {
                    currentId = sec.getAttribute('id');
                }
            });

            navLinks.forEach((link) => {
                link.classList.remove('active');
                if (currentId && link.getAttribute('href') === `#${currentId}`) {
                    link.classList.add('active');
                }
            });
        }, { passive: true });
    }

    /* --- 11. SCROLL TO TOP BUTTON --- */
    function initScrollTop() {
        const scrollTopBtn = document.getElementById('scrollTopBtn');
        if (!scrollTopBtn) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                scrollTopBtn.style.display = 'flex';
            } else {
                scrollTopBtn.style.display = 'none';
            }
        }, { passive: true });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* --- 12. CONTACT FORM HANDLER --- */
    function initContactForm() {
        const contactForm = document.getElementById('contactForm');
        const formStatus = document.getElementById('formStatus');
        const submitBtn = document.getElementById('submitBtn');

        if (!contactForm) return;

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const name = contactForm.elements['name'].value.trim();
            const email = contactForm.elements['email'].value.trim();
            const message = contactForm.elements['message'].value.trim();

            if (!name || !email || !message) {
                showStatus('Please fill out all required fields.', 'error');
                return;
            }

            const originalBtnHtml = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

            try {
                // If a real Web3Forms key is configured
                if (CONFIG.WEB3FORMS_KEY && CONFIG.WEB3FORMS_KEY !== 'YOUR_WEB3FORMS_ACCESS_KEY') {
                    const response = await fetch(CONFIG.CONTACT_ENDPOINT, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                        body: JSON.stringify({
                            access_key: CONFIG.WEB3FORMS_KEY,
                            name: name,
                            email: email,
                            message: message,
                            subject: `New Portfolio Message from ${name}`
                        })
                    });

                    const resData = await response.json();
                    if (!response.ok || !resData.success) {
                        throw new Error(resData.message || 'Failed to submit form.');
                    }
                    showStatus('Thank you! Your message has been sent successfully. 🚀', 'success');
                    contactForm.reset();
                } else {
                    // Graceful fallback to direct mailto client
                    const mailtoUrl = `mailto:${CONFIG.AUTHOR_EMAIL}?subject=${encodeURIComponent('Portfolio Contact from ' + name)}&body=${encodeURIComponent(message + '\n\nFrom: ' + name + ' (' + email + ')')}`;
                    window.location.href = mailtoUrl;
                    showStatus('Opening your default email client to send the message...', 'success');
                    contactForm.reset();
                }
            } catch (err) {
                showStatus('⚠️ ' + (err.message || 'Could not send message. Please email directly.'), 'error');
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHtml;
            }
        });

        function showStatus(msg, type) {
            if (!formStatus) return;
            formStatus.textContent = msg;
            formStatus.className = `form-status ${type}`;
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 6000);
        }
    }

    /* --- 13. ANIME SEARCH INTERACTION --- */
    function initAnimeInteractions() {
        document.querySelectorAll('.anime-item[data-anime]').forEach(item => {
            item.addEventListener('click', () => {
                const animeName = item.getAttribute('data-anime');
                if (animeName) {
                    window.open('https://www.google.com/search?q=' + encodeURIComponent(animeName + ' anime'), '_blank', 'noopener,noreferrer');
                }
            });
        });
    }

    /* --- TOAST NOTIFICATIONS --- */
    function showToast(message, icon = 'fa-circle-check') {
        const container = document.getElementById('toastContainer');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = 'toast-msg';
        toast.innerHTML = `<i class="fas ${icon}"></i> <span>${message}</span>`;
        container.appendChild(toast);

        setTimeout(() => {
            toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(10px) scale(0.95)';
            setTimeout(() => toast.remove(), 300);
        }, 3200);
    }

    /* --- 14. RESUME QUICK-PREVIEW MODAL --- */
    function initResumeModal() {
        const modal = document.getElementById('resumeModal');
        const openBtn = document.getElementById('resumePreviewBtn');
        const closeBtn = document.getElementById('closeResumeModal');

        if (!modal) return;

        function openModal() {
            modal.classList.add('active');
            modal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            if (closeBtn) closeBtn.focus();
        }

        function closeModal() {
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
            if (openBtn) openBtn.focus();
        }

        if (openBtn) {
            openBtn.addEventListener('click', openModal);
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });

        // Expose globally for command palette invocation
        window.openResumeModal = openModal;
        window.closeResumeModal = closeModal;
    }

    /* --- 15. DEVELOPER COMMAND PALETTE (CTRL + K) --- */
    function initCommandPalette() {
        const palette = document.getElementById('cmdPalette');
        const triggerBtn = document.getElementById('cmdPaletteTrigger');
        const input = document.getElementById('cmdInput');
        const results = document.getElementById('cmdResults');

        if (!palette || !input || !results) return;

        let selectedIndex = 0;

        function getVisibleItems() {
            return Array.from(results.querySelectorAll('.cmd-item:not([style*="display: none"])'));
        }

        function updateSelection(visibleItems) {
            visibleItems.forEach((item, idx) => {
                if (idx === selectedIndex) {
                    item.classList.add('selected');
                    item.scrollIntoView({ block: 'nearest' });
                } else {
                    item.classList.remove('selected');
                }
            });
        }

        function openPalette() {
            palette.classList.add('active');
            palette.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            input.value = '';
            filterItems('');
            selectedIndex = 0;
            const visible = getVisibleItems();
            updateSelection(visible);
            setTimeout(() => input.focus(), 50);
        }

        function closePalette() {
            palette.classList.remove('active');
            palette.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }

        function filterItems(query) {
            const cleanQuery = query.toLowerCase().trim();
            const groups = results.querySelectorAll('.cmd-group');

            groups.forEach((group) => {
                let hasVisible = false;
                const items = group.querySelectorAll('.cmd-item');

                items.forEach((item) => {
                    const text = item.textContent.toLowerCase();
                    if (!cleanQuery || text.includes(cleanQuery)) {
                        item.style.display = 'flex';
                        hasVisible = true;
                    } else {
                        item.style.display = 'none';
                    }
                });

                group.style.display = hasVisible ? 'block' : 'none';
            });

            selectedIndex = 0;
            const visible = getVisibleItems();
            updateSelection(visible);
        }

        function executeItem(item) {
            if (!item) return;
            const action = item.getAttribute('data-action');
            const target = item.getAttribute('data-target');
            const url = item.getAttribute('data-url');

            closePalette();

            if (action === 'nav' && target) {
                const el = document.querySelector(target);
                if (el) {
                    setTimeout(() => scrollToTargetCentered(el), 120);
                }
            } else if (action === 'resume-preview') {
                setTimeout(() => {
                    if (window.openResumeModal) window.openResumeModal();
                }, 120);
            } else if (action === 'resume-download') {
                const link = document.createElement('a');
                link.href = CONFIG.RESUME_PATH || 'Amit Kumar Garai - Resume.pdf';
                link.download = 'Amit_Kumar_Garai_Resume.pdf';
                link.click();
                showToast('Downloading resume PDF...', 'fa-file-arrow-down');
            } else if (action === 'copy-email') {
                const email = CONFIG.AUTHOR_EMAIL || 'garaiamit64@gmail.com';
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(email).then(() => {
                        showToast(`Copied ${email} to clipboard!`, 'fa-copy');
                    }).catch(() => {
                        showToast(email, 'fa-envelope');
                    });
                } else {
                    showToast(email, 'fa-envelope');
                }
            } else if (action === 'toggle-theme') {
                const themeToggle = document.getElementById('themeToggle');
                if (themeToggle) {
                    themeToggle.click();
                    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
                    showToast(`Switched to ${isDark ? 'Dark' : 'Light'} Mode`, isDark ? 'fa-moon' : 'fa-sun');
                }
            } else if (action === 'whatsapp') {
                window.open('https://wa.me/qr/EEASQ2MOEW73P1', '_blank', 'noopener,noreferrer');
            } else if (action === 'github') {
                window.open('https://github.com/' + (CONFIG.GITHUB_USERNAME || 'amit-649'), '_blank', 'noopener,noreferrer');
            } else if (action === 'linkedin') {
                window.open('https://www.linkedin.com/in/amit-garai-10a804267', '_blank', 'noopener,noreferrer');
            } else if (action === 'project-link' && url) {
                window.open(url, '_blank', 'noopener,noreferrer');
            }
        }

        // Event listeners
        if (triggerBtn) {
            triggerBtn.addEventListener('click', openPalette);
        }

        palette.addEventListener('click', (e) => {
            if (e.target === palette) {
                closePalette();
            }
        });

        input.addEventListener('input', (e) => {
            filterItems(e.target.value);
        });

        input.addEventListener('keydown', (e) => {
            const visible = getVisibleItems();
            if (visible.length === 0) return;

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                selectedIndex = (selectedIndex + 1) % visible.length;
                updateSelection(visible);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                selectedIndex = (selectedIndex - 1 + visible.length) % visible.length;
                updateSelection(visible);
            } else if (e.key === 'Enter') {
                e.preventDefault();
                executeItem(visible[selectedIndex]);
            }
        });

        results.addEventListener('click', (e) => {
            const item = e.target.closest('.cmd-item');
            if (item) {
                executeItem(item);
            }
        });

        window.addEventListener('keydown', (e) => {
            // Check for Ctrl+K or Cmd+K
            if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
                e.preventDefault();
                if (palette.classList.contains('active')) {
                    closePalette();
                } else {
                    openPalette();
                }
            } else if (e.key === 'Escape' && palette.classList.contains('active')) {
                closePalette();
            }
        });
    }

    /* --- 16. DYNAMIC GITHUB API METRICS --- */
    async function initGitHubMetrics() {
        const username = CONFIG.GITHUB_USERNAME || 'amit-649';
        const cacheKey = 'gh_metrics_v1';
        const cacheTTL = 30 * 60 * 1000; // 30 minutes

        function applyMetrics(data) {
            if (!data) return;

            // Update Repository Count
            const repoNumEl = document.getElementById('statReposNum');
            if (repoNumEl && data.public_repos !== undefined) {
                repoNumEl.setAttribute('data-target', data.public_repos);
                repoNumEl.textContent = data.public_repos;
            }

            // Update Epic Games Auto Claimer Star Count
            const epicStarsEl = document.getElementById('epicStarsBadge');
            if (epicStarsEl && data.epic_stars !== undefined) {
                epicStarsEl.innerHTML = `<i class="fas fa-star" style="color:#eab308;"></i> ${data.epic_stars} ${data.epic_stars === 1 ? 'Star' : 'Stars'}`;
            }
        }

        // Check local cache
        try {
            const cached = localStorage.getItem(cacheKey);
            if (cached) {
                const parsed = JSON.parse(cached);
                if (Date.now() - parsed.timestamp < cacheTTL) {
                    applyMetrics(parsed.data);
                    return; // Cache valid, avoid network fetch
                }
            }
        } catch (e) {
            // Ignore storage errors
        }

        // Fetch live metrics from public GitHub API
        try {
            const [userRes, reposRes] = await Promise.all([
                fetch(`https://api.github.com/users/${username}`),
                fetch(`https://api.github.com/users/${username}/repos?per_page=100`)
            ]);

            if (!userRes.ok) return;

            const userData = await userRes.json();
            let epicStars = 2; // fallback

            if (reposRes.ok) {
                const reposData = await reposRes.json();
                if (Array.isArray(reposData)) {
                    const claimerRepo = reposData.find(r => r.name.toLowerCase() === 'epic-games-auto-claimer');
                    if (claimerRepo) {
                        epicStars = claimerRepo.stargazers_count;
                    }
                }
            }

            const metricsData = {
                public_repos: userData.public_repos || 11,
                epic_stars: epicStars
            };

            applyMetrics(metricsData);

            // Cache to localStorage
            try {
                localStorage.setItem(cacheKey, JSON.stringify({
                    timestamp: Date.now(),
                    data: metricsData
                }));
            } catch (err) {
                // Ignore storage quota errors
            }
        } catch (error) {
            // Offline or rate-limited: silently keep default markup
        }
    }

    /* --- KICK OFF SCRIPT ON LOAD --- */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializePage);
    } else {
        initializePage();
    }

})();
