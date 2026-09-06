/**
 * ==========================================================================
 * AMIT.ML - CORE APPLICATION LOGIC
 * ==========================================================================
 */

(function () {
    'use strict';

    /* --- 1. BOOT SEQUENCE & PRELOADER --- */
    const bootSequence = [
        {
            type: 'ascii',
            text: `
 █████╗ ███╗   ███╗██╗████████╗   ███╗   ███╗██╗     
██╔══██╗████╗ ████║██║╚══██╔══╝   ████╗ ████║██║     
███████║██╔████╔██║██║   ██║      ██╔████╔██║██║     
██╔══██║██║╚██╔╝██║██║   ██║      ██║╚██╔╝██║██║     
██║  ██║██║ ╚═╝ ██║██║   ██║   ██╗██║ ╚═╝ ██║███████╗
╚═╝  ╚═╝╚═╝     ╚═╝╚═╝   ╚═╝   ╚═╝╚═╝     ╚═╝╚══════╝`
        },
        { type: 'info', text: 'AMIT.ML Neural Interface v2.5.0' },
        { type: 'blank' },
        { type: 'ok', text: 'Loading kernel modules...' },
        { type: 'ok', text: 'Initializing neural_network.ko' },
        { type: 'ok', text: 'Mounting /dev/portfolio' },
        { type: 'ok', text: 'Starting machine_learning.service' },
        { type: 'ok', text: 'Connecting to github.api.v4' },
        { type: 'ok', text: 'Initializing gemini-ai-core...' },
        { type: 'warn', text: 'Calibrating sensory models...' },
        { type: 'ok', text: 'All neural pathways operational' },
        { type: 'blank' },
        { type: 'success', text: '>>> SYSTEM READY <<<' },
        { type: 'prompt', text: 'amit@portfolio:~$ ./launch_interface.sh' }
    ];

    let preloaderFinished = false;

    function dismissPreloader() {
        if (preloaderFinished) return;
        preloaderFinished = true;
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
                initializePage();
            }, 400);
        } else {
            initializePage();
        }
    }

    function runPreloader() {
        const preloader = document.getElementById('preloader');
        if (!preloader) {
            initializePage();
            return;
        }

        const skipBtn = document.getElementById('preloaderSkip');
        if (skipBtn) {
            skipBtn.addEventListener('click', dismissPreloader);
        }

        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !preloaderFinished) {
                dismissPreloader();
            }
        });

        let stepIndex = 0;
        function renderStep() {
            if (preloaderFinished) return;
            if (stepIndex < bootSequence.length) {
                const item = bootSequence[stepIndex];
                const div = document.createElement('div');
                div.className = 'boot-line';

                if (item.type === 'ascii') {
                    div.className = 'boot-ascii';
                    div.innerHTML = `<pre>${item.text}</pre>`;
                } else if (item.type === 'ok') {
                    div.innerHTML = `<span class="ok">[  OK  ]</span> ${item.text}`;
                } else if (item.type === 'warn') {
                    div.innerHTML = `<span class="warn">[ WARN ]</span> ${item.text}`;
                } else if (item.type === 'info') {
                    div.innerHTML = `<span class="info">${item.text}</span>`;
                } else if (item.type === 'success') {
                    div.innerHTML = `<span class="success">${item.text}</span>`;
                } else if (item.type === 'prompt') {
                    div.innerHTML = `<span class="prompt">${item.text}</span><span class="cursor-block"></span>`;
                } else if (item.type === 'blank') {
                    div.innerHTML = '&nbsp;';
                }

                preloader.appendChild(div);
                stepIndex++;

                const delay = item.type === 'ascii' ? 80 :
                              item.type === 'blank' ? 40 :
                              Math.random() * 120 + 60;
                setTimeout(renderStep, delay);
            } else {
                setTimeout(dismissPreloader, 500);
            }
        }
        renderStep();
    }

    /* --- 2. PAGE INITIALIZATION --- */
    function initializePage() {
        SoundManager.init();
        initTheme();
        initScrollReveal();
        initHeroTyping();
        initTiltEffect();
        initMobileMenu();
        initContactForm();
        initScrollSpy();
        initScrollTop();
    }

    /* --- 3. SOUND EFFECTS ENGINE (WEB AUDIO API) --- */
    const SoundManager = {
        ctx: null,
        enabled: localStorage.getItem('ui_audio_enabled') === 'true', // Opt-in / persisted preference

        init() {
            const audioBtn = document.getElementById('audioToggle');
            this.updateButton(audioBtn);

            if (audioBtn) {
                audioBtn.addEventListener('click', () => {
                    this.enabled = !this.enabled;
                    localStorage.setItem('ui_audio_enabled', this.enabled);
                    this.updateButton(audioBtn);
                    if (this.enabled) {
                        this.playToggle(true);
                    }
                });
            }

            // Tactile click micro-sounds for interactive elements
            document.querySelectorAll('.btn, .nav-links a, .stat-card, .anime-item, .chat-toggle-btn').forEach(el => {
                el.addEventListener('click', () => this.playClick());
            });
        },

        updateButton(btn) {
            if (!btn) return;
            btn.innerHTML = this.enabled ? '<i class="fas fa-volume-high"></i>' : '<i class="fas fa-volume-xmark"></i>';
            btn.setAttribute('aria-label', this.enabled ? 'Mute UI Sounds' : 'Enable UI Sounds');
            btn.title = this.enabled ? 'UI Sounds: ON (Click to Mute)' : 'UI Sounds: OFF (Click to Enable)';
            btn.classList.toggle('active', this.enabled);
        },

        getContext() {
            if (!this.ctx && typeof AudioContext !== 'undefined') {
                const AudioCtx = window.AudioContext || window.webkitAudioContext;
                this.ctx = new AudioCtx();
            }
            if (this.ctx && this.ctx.state === 'suspended') {
                this.ctx.resume();
            }
            return this.ctx;
        },

        playClick() {
            if (!this.enabled) return;
            const ctx = this.getContext();
            if (!ctx) return;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(460, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.04);
            gain.gain.setValueAtTime(0.06, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.04);
        },

        playToggle(isDark) {
            if (!this.enabled) return;
            const ctx = this.getContext();
            if (!ctx) return;
            const now = ctx.currentTime;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            const startFreq = isDark ? 320 : 640;
            const endFreq = isDark ? 640 : 320;
            osc.frequency.setValueAtTime(startFreq, now);
            osc.frequency.exponentialRampToValueAtTime(endFreq, now + 0.08);
            gain.gain.setValueAtTime(0.07, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(now + 0.08);
        },

        playStationPing() {
            if (!this.enabled) return;
            const ctx = this.getContext();
            if (!ctx) return;
            const now = ctx.currentTime;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(659.25, now); // E5
            osc.frequency.exponentialRampToValueAtTime(880, now + 0.1); // A5
            gain.gain.setValueAtTime(0.05, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.2);
        },

        playDock() {
            if (!this.enabled) return;
            const ctx = this.getContext();
            if (!ctx) return;
            const now = ctx.currentTime;
            [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, now + i * 0.08);
                gain.gain.setValueAtTime(0, now + i * 0.08);
                gain.gain.linearRampToValueAtTime(0.05, now + i * 0.08 + 0.02);
                gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.35);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now + i * 0.08);
                osc.stop(now + i * 0.08 + 0.35);
            });
        }
    };

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
                SoundManager.playToggle(!currentIsDark);
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

    /* --- 5. CURSOR GLOW EFFECT --- */
    const cursorGlow = document.createElement('div');
    cursorGlow.className = 'cursor-glow';
    document.body.appendChild(cursorGlow);

    let glowX = 0, glowY = 0;
    let targetX = 0, targetY = 0;

    window.addEventListener('mousemove', (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
    }, { passive: true });

    function renderGlow() {
        glowX += (targetX - glowX) * 0.15;
        glowY += (targetY - glowY) * 0.15;
        cursorGlow.style.left = glowX + 'px';
        cursorGlow.style.top = glowY + 'px';
        requestAnimationFrame(renderGlow);
    }
    renderGlow();

    /* --- 6. SCROLL REVEAL & INTERSECTION OBSERVERS --- */
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

        // Exact JS Physics Roadmap Train Animation Trigger
        const qualTimeline = document.getElementById('qualTimeline');
        if (qualTimeline) {
            let activeAnimFrame = null;
            let currentTrainY = 0;

            function getMarkerCenterY(milestoneEl) {
                const marker = milestoneEl ? milestoneEl.querySelector('.marker-dot') : null;
                const spine = qualTimeline.querySelector('.roadmap-spine');
                if (!marker || !spine) return 0;

                // Robust coordinate calculation immune to window scroll or CSS transforms
                let markerOffsetTop = marker.offsetTop;
                let parent = marker.offsetParent;
                while (parent && parent !== qualTimeline) {
                    markerOffsetTop += parent.offsetTop;
                    parent = parent.offsetParent;
                }

                const spineOffsetTop = spine.offsetTop;
                const trainPodHeight = 32;
                const markerCenter = markerOffsetTop + (marker.offsetHeight / 2);
                return markerCenter - spineOffsetTop - (trainPodHeight / 2);
            }

            function setTrainPosition(y) {
                const spineFill = qualTimeline.querySelector('.roadmap-spine-fill');
                const trainCapsule = qualTimeline.querySelector('.roadmap-train-capsule');
                if (!spineFill || !trainCapsule) return;

                currentTrainY = y;
                trainCapsule.style.transform = `translate3d(-50%, ${y}px, 0)`;
                spineFill.style.height = `${y + 16}px`;
            }

            function runRoadmapTrainAnimation() {
                const spine = qualTimeline.querySelector('.roadmap-spine');
                const spineFill = qualTimeline.querySelector('.roadmap-spine-fill');
                const trainCapsule = qualTimeline.querySelector('.roadmap-train-capsule');
                const trainPod = trainCapsule ? trainCapsule.querySelector('.train-pod') : null;
                const milestones = qualTimeline.querySelectorAll('.roadmap-milestone');

                if (!spine || !spineFill || !trainCapsule || milestones.length < 3) return;

                const y0 = Math.max(0, getMarkerCenterY(milestones[0])); // Class 10 center
                const y1 = getMarkerCenterY(milestones[1]); // Class 12 center
                const y2 = getMarkerCenterY(milestones[2]); // BCA 2nd Year center (Exact Dock)

                trainCapsule.classList.add('visible');
                if (trainPod) {
                    trainPod.classList.remove('accelerating', 'docked');
                }

                // Initial position anchored exactly at Class 10
                setTrainPosition(y0);

                const DURATION = 3800; // 3.8s continuous cinematic journey
                let startTime = null;
                let hasPingedStation1 = false;
                let hasPlayedDock = false;

                // Continuous Hermite Spline calculation (C1 continuous velocity)
                function getSplineY(t) {
                    if (t <= 0) return y0;
                    if (t >= 1) return y2;

                    const t1 = 0.42; // Station 1 checkpoint time ratio
                    const totalDist = y2 - y0;
                    const vMid = 1.16 * (totalDist / 1.0); // Cruising velocity across Station 1

                    if (t < t1) {
                        const u = t / t1;
                        const h00 = (1 + 2 * u) * (1 - u) * (1 - u);
                        const h10 = u * (1 - u) * (1 - u);
                        const h01 = u * u * (3 - 2 * u);
                        const h11 = u * u * (u - 1);

                        const m0 = 0; // Starts smoothly from rest
                        const m1 = vMid * t1;
                        return h00 * y0 + h10 * m0 + h01 * y1 + h11 * m1;
                    } else {
                        const w = (t - t1) / (1 - t1);
                        const dt2 = 1 - t1;

                        const h00 = (1 + 2 * w) * (1 - w) * (1 - w);
                        const h10 = w * (1 - w) * (1 - w);
                        const h01 = w * w * (3 - 2 * w);
                        const h11 = w * w * (w - 1);

                        const m1_w = vMid * dt2;
                        const m2 = 0; // Decelerates smoothly into destination
                        return h00 * y1 + h10 * m1_w + h01 * y2 + h11 * m2;
                    }
                }

                function step(now) {
                    if (!startTime) startTime = now;
                    const elapsed = now - startTime;
                    const progress = Math.min(1, elapsed / DURATION);

                    const currentY = getSplineY(progress);

                    // Dynamic ion thruster flare during mid-journey acceleration
                    if (trainPod) {
                        if (progress > 0.08 && progress < 0.85) {
                            trainPod.classList.add('accelerating');
                        } else {
                            trainPod.classList.remove('accelerating');
                        }
                    }

                    // Checkpoint station ping when passing Class 12
                    if (progress >= 0.42 && !hasPingedStation1) {
                        hasPingedStation1 = true;
                        const m1Dot = milestones[1].querySelector('.marker-dot');
                        if (m1Dot) {
                            m1Dot.classList.add('station-ping');
                            setTimeout(() => m1Dot.classList.remove('station-ping'), 800);
                        }
                        SoundManager.playStationPing();
                    }

                    setTrainPosition(currentY);

                    if (progress < 1) {
                        activeAnimFrame = requestAnimationFrame(step);
                    } else {
                        // 100% exact sub-pixel docking alignment at BCA 2nd Year
                        setTrainPosition(y2);
                        if (trainPod) {
                            trainPod.classList.remove('accelerating');
                            trainPod.classList.add('docked');
                        }
                        const m2Dot = milestones[2].querySelector('.marker-dot');
                        if (m2Dot) {
                            m2Dot.classList.add('station-ping');
                            setTimeout(() => m2Dot.classList.remove('station-ping'), 800);
                        }
                        if (!hasPlayedDock) {
                            hasPlayedDock = true;
                            SoundManager.playDock();
                        }
                    }
                }

                if (activeAnimFrame) cancelAnimationFrame(activeAnimFrame);
                activeAnimFrame = requestAnimationFrame(step);
            }

            // Interactive Click to Glide Train directly to any Station
            function glideTrainToStation(targetMilestone) {
                if (!targetMilestone) return;
                const targetY = getMarkerCenterY(targetMilestone);
                const startY = currentTrainY;
                const trainCapsule = qualTimeline.querySelector('.roadmap-train-capsule');
                const trainPod = trainCapsule ? trainCapsule.querySelector('.train-pod') : null;

                if (!trainCapsule) return;
                trainCapsule.classList.add('visible');

                if (activeAnimFrame) cancelAnimationFrame(activeAnimFrame);

                const GLIDE_DURATION = 650;
                let startTime = null;

                function easeOutQuart(x) {
                    return 1 - Math.pow(1 - x, 4);
                }

                function glideStep(now) {
                    if (!startTime) startTime = now;
                    const elapsed = now - startTime;
                    const p = Math.min(1, elapsed / GLIDE_DURATION);
                    const eased = easeOutQuart(p);
                    const y = startY + (targetY - startY) * eased;

                    setTrainPosition(y);

                    if (p < 1) {
                        activeAnimFrame = requestAnimationFrame(glideStep);
                    } else {
                        setTrainPosition(targetY);
                        if (trainPod) {
                            trainPod.classList.add('docked');
                        }
                        const dot = targetMilestone.querySelector('.marker-dot');
                        if (dot) {
                            dot.classList.add('station-ping');
                            setTimeout(() => dot.classList.remove('station-ping'), 700);
                        }
                        SoundManager.playDock();
                    }
                }

                activeAnimFrame = requestAnimationFrame(glideStep);
            }

            // Bind click to each milestone card/station
            const allMilestones = qualTimeline.querySelectorAll('.roadmap-milestone');
            allMilestones.forEach((m) => {
                m.addEventListener('click', () => {
                    glideTrainToStation(m);
                });
            });

            let hasAutoTriggered = false;
            const trainObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasAutoTriggered) {
                        hasAutoTriggered = true;
                        qualTimeline.classList.add('animate');
                        setTimeout(runRoadmapTrainAnimation, 50);
                    }
                });
            }, { threshold: 0.15 });
            trainObserver.observe(qualTimeline);

            window.addEventListener('resize', () => {
                if (hasAutoTriggered) {
                    const activeMilestone = qualTimeline.querySelector('.roadmap-milestone.active-milestone') || milestones[2];
                    if (activeMilestone) {
                        setTrainPosition(getMarkerCenterY(activeMilestone));
                    }
                }
            });
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

    /* --- 7. HERO TYPING LOOP --- */
    function initHeroTyping() {
        const typeEl = document.getElementById('typing');
        if (!typeEl) return;

        const phrases = [
            'Learning Machine Learning...',
            'Building Predictive AI Models...',
            'Writing Python & Automation Tools...',
            'Diving Deep into Data Science...'
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
                setTimeout(typeLoop, 1400);
            } else if (isDeleting && cIndex === 0) {
                isDeleting = false;
                pIndex++;
                setTimeout(typeLoop, 250);
            } else {
                setTimeout(typeLoop, isDeleting ? 30 : 65);
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

        function toggleMenu() {
            const isActive = navLinks.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
        }

        menuToggle.addEventListener('click', toggleMenu);

        navLinks.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });

        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') &&
                !e.target.closest('#navLinks') &&
                !e.target.closest('#menuToggle')) {
                navLinks.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    /* --- 10. SCROLL SPY & SMOOTH NAVIGATION --- */
    function initScrollSpy() {
        const sections = document.querySelectorAll('header[id], section[id]');
        const navLinks = document.querySelectorAll('.nav-links a');

        window.addEventListener('scroll', () => {
            let currentId = '';
            const scrollPos = window.pageYOffset || document.documentElement.scrollTop;

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
    }

    window.scrollToTop = function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

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

    /* --- 13. ANIME SEARCH UTILITY --- */
    window.searchAnime = function (name) {
        if (!name) return;
        window.open('https://www.google.com/search?q=' + encodeURIComponent(name + ' anime'), '_blank', 'noopener,noreferrer');
    };

    /* --- 14. KICK OFF SCRIPT ON LOAD --- */
    window.addEventListener('load', runPreloader);

})();
