/**
 * ==========================================================================
 * AMIT.ML / AMIT.AI — IGLOO-INSPIRED CLIENT APPLICATION CORE
 * Features:
 * 1. Three.js 3D WebGL Crystalline Core with interactive mouse drag & tumble
 * 2. Kinetic Text Decryption (Scramble solver effect)
 * 3. Interactive Cosmic Particle Footer simulation with cursor gravitation
 * 4. Synthesized Web Audio API sound effects (SFX) with toggle
 * 5. Live Interactive ML Inference Playground (Fisher Iris model simulation)
 * 6. Multi-tab terminal HUD, command palette (Ctrl+K), and GitHub API sync
 * ==========================================================================
 */

(function () {
    'use strict';

    /* --- APPLICATION LIFECYCLE --- */
    function initializeApp() {
        initTheme();
        initSoundEffects();
        initThreeJSCrystal();
        initKineticTextScramble();
        initFooterParticles();
        initMLPlayground();
        initTerminalTabs();
        initLocalClock();
        initHeroTyping();
        initTiltEffect();
        initScrollNavigation();
        initResumeModal();
        initCommandPalette();
        initContactForm();
        initGitHubMetrics();
        initScrollTop();
    }

    /* --- 1. THEME MANAGEMENT --- */
    function initTheme() {
        const themeToggle = document.getElementById('themeToggle');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

        function applyTheme(isDark) {
            document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
            if (themeToggle) {
                themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
                themeToggle.setAttribute('aria-label', isDark ? 'Switch to Arctic Light Mode' : 'Switch to Crystalline Dark Mode');
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
                playSFX('toggle');
            });
        }

        prefersDark.addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                applyTheme(e.matches);
            }
        });
    }

    /* --- 2. SYNTHESIZED WEB AUDIO API SOUND SYSTEM --- */
    let audioCtx = null;
    let sfxEnabled = localStorage.getItem('sfx_enabled') === 'true';

    function getAudioContext() {
        if (!audioCtx && (window.AudioContext || window.webkitAudioContext)) {
            const AudioClass = window.AudioContext || window.webkitAudioContext;
            audioCtx = new AudioClass();
        }
        if (audioCtx && audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        return audioCtx;
    }

    function playSFX(type) {
        if (!sfxEnabled) return;
        try {
            const ctx = getAudioContext();
            if (!ctx) return;

            const now = ctx.currentTime;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.connect(gain);
            gain.connect(ctx.destination);

            if (type === 'hover') {
                osc.type = 'sine';
                osc.frequency.setValueAtTime(440, now);
                osc.frequency.exponentialRampToValueAtTime(880, now + 0.05);
                gain.gain.setValueAtTime(0.015, now);
                gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);
                osc.start(now);
                osc.stop(now + 0.05);
            } else if (type === 'click') {
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(600, now);
                osc.frequency.exponentialRampToValueAtTime(280, now + 0.08);
                gain.gain.setValueAtTime(0.04, now);
                gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
                osc.start(now);
                osc.stop(now + 0.08);
            } else if (type === 'toggle') {
                osc.type = 'sine';
                osc.frequency.setValueAtTime(320, now);
                osc.frequency.exponentialRampToValueAtTime(640, now + 0.12);
                gain.gain.setValueAtTime(0.05, now);
                gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);
                osc.start(now);
                osc.stop(now + 0.12);
            } else if (type === 'cmd') {
                osc.type = 'sine';
                osc.frequency.setValueAtTime(520, now);
                osc.frequency.exponentialRampToValueAtTime(1040, now + 0.15);
                gain.gain.setValueAtTime(0.05, now);
                gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);
                osc.start(now);
                osc.stop(now + 0.15);
            } else if (type === 'slider') {
                osc.type = 'sine';
                osc.frequency.setValueAtTime(380, now);
                osc.frequency.exponentialRampToValueAtTime(560, now + 0.035);
                gain.gain.setValueAtTime(0.012, now);
                gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);
                osc.start(now);
                osc.stop(now + 0.035);
            }
        } catch (e) {
            // Audio policy or device limitation
        }
    }

    function initSoundEffects() {
        const sfxToggle = document.getElementById('sfxToggle');
        const sfxIcon = document.getElementById('sfxIcon');

        function updateSFXIcon() {
            if (sfxIcon) {
                sfxIcon.className = sfxEnabled ? 'fas fa-volume-high' : 'fas fa-volume-xmark';
                sfxIcon.style.color = sfxEnabled ? 'var(--cyan)' : '';
            }
        }

        updateSFXIcon();

        if (sfxToggle) {
            sfxToggle.addEventListener('click', () => {
                sfxEnabled = !sfxEnabled;
                localStorage.setItem('sfx_enabled', sfxEnabled);
                updateSFXIcon();
                if (sfxEnabled) {
                    playSFX('toggle');
                    showToast('Futuristic Audio FX Enabled', 'fa-volume-high');
                } else {
                    showToast('Audio FX Muted', 'fa-volume-xmark');
                }
            });
        }

        // Attach subtle hover & click SFX to buttons and nav
        document.querySelectorAll('.btn, .nav-item, .control-btn, .project-card, .stat-card').forEach(el => {
            el.addEventListener('mouseenter', () => playSFX('hover'), { passive: true });
            el.addEventListener('click', () => playSFX('click'), { passive: true });
        });
    }

    /* --- 3. THREE.JS 3D WEBGL CRYSTALLINE CORE --- */
    function initThreeJSCrystal() {
        const canvas = document.getElementById('hero-crystal-canvas');
        if (!canvas || typeof THREE === 'undefined') return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
        camera.position.z = 4.2;

        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: true
        });

        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        function resize() {
            const rect = canvas.getBoundingClientRect();
            const width = rect.width || 400;
            const height = rect.height || 400;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height, false);
        }

        resize();
        window.addEventListener('resize', resize, { passive: true });

        // Outer Faceted Crystal (Icosahedron)
        const outerGeo = new THREE.IcosahedronGeometry(1.25, 0);
        const outerMat = new THREE.MeshBasicMaterial({
            color: 0x38bdf8,
            wireframe: true,
            transparent: true,
            opacity: 0.38
        });
        const outerMesh = new THREE.Mesh(outerGeo, outerMat);
        scene.add(outerMesh);

        // Inner Core Crystal (Octahedron)
        const innerGeo = new THREE.OctahedronGeometry(0.75, 0);
        const innerMat = new THREE.MeshBasicMaterial({
            color: 0x818cf8,
            wireframe: true,
            transparent: true,
            opacity: 0.75
        });
        const innerMesh = new THREE.Mesh(innerGeo, innerMat);
        scene.add(innerMesh);

        // Core Glowing Points
        const pointGeo = new THREE.IcosahedronGeometry(1.25, 1);
        const pointMat = new THREE.PointsMaterial({
            color: 0x7dd3fc,
            size: 0.05,
            transparent: true,
            opacity: 0.85
        });
        const pointsMesh = new THREE.Points(pointGeo, pointMat);
        scene.add(pointsMesh);

        // Concentric Crystalline Shroud (Refractive Geometric Dodecahedron)
        const shroudGeo = new THREE.DodecahedronGeometry(1.68, 0);
        const shroudMat = new THREE.MeshBasicMaterial({
            color: 0x38bdf8,
            wireframe: true,
            transparent: true,
            opacity: 0.14
        });
        const shroudMesh = new THREE.Mesh(shroudGeo, shroudMat);
        scene.add(shroudMesh);

        // Scroll-linked camera parallax tracking
        let scrollY = 0;
        window.addEventListener('scroll', () => {
            scrollY = window.scrollY || window.pageYOffset;
        }, { passive: true });

        // Orbiting Cosmic Frost Particle Ring
        const ringParticleCount = 120;
        const ringGeo = new THREE.BufferGeometry();
        const ringPositions = new Float32Array(ringParticleCount * 3);

        for (let i = 0; i < ringParticleCount; i++) {
            const angle = (i / ringParticleCount) * Math.PI * 2;
            const radius = 1.9 + (Math.random() - 0.5) * 0.4;
            ringPositions[i * 3] = Math.cos(angle) * radius;
            ringPositions[i * 3 + 1] = (Math.random() - 0.5) * 0.3;
            ringPositions[i * 3 + 2] = Math.sin(angle) * radius;
        }

        ringGeo.setAttribute('position', new THREE.BufferAttribute(ringPositions, 3));
        const ringMat = new THREE.PointsMaterial({
            color: 0x38bdf8,
            size: 0.035,
            transparent: true,
            opacity: 0.65
        });
        const ringMesh = new THREE.Points(ringGeo, ringMat);
        ringMesh.rotation.x = Math.PI / 6;
        scene.add(ringMesh);

        // Interactive Drag & Parallax Logic
        let isDragging = false;
        let prevMousePos = { x: 0, y: 0 };
        let rotationVelocity = { x: 0.004, y: 0.007 };
        let targetRotation = { x: 0, y: 0 };

        canvas.addEventListener('mousedown', (e) => {
            isDragging = true;
            prevMousePos = { x: e.clientX, y: e.clientY };
            playSFX('click');
        });

        window.addEventListener('mouseup', () => {
            isDragging = false;
        });

        window.addEventListener('mousemove', (e) => {
            if (isDragging) {
                const deltaX = e.clientX - prevMousePos.x;
                const deltaY = e.clientY - prevMousePos.y;
                rotationVelocity.y = deltaX * 0.006;
                rotationVelocity.x = deltaY * 0.006;
                prevMousePos = { x: e.clientX, y: e.clientY };
            } else {
                // Subtle cursor parallax
                const normX = (e.clientX / window.innerWidth) - 0.5;
                const normY = (e.clientY / window.innerHeight) - 0.5;
                targetRotation.x = normY * 0.4;
                targetRotation.y = normX * 0.4;
            }
        }, { passive: true });

        // Touch support for mobile devices
        canvas.addEventListener('touchstart', (e) => {
            if (e.touches.length === 1) {
                isDragging = true;
                prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
            }
        }, { passive: true });

        window.addEventListener('touchend', () => {
            isDragging = false;
        });

        canvas.addEventListener('touchmove', (e) => {
            if (isDragging && e.touches.length === 1) {
                const deltaX = e.touches[0].clientX - prevMousePos.x;
                const deltaY = e.touches[0].clientY - prevMousePos.y;
                rotationVelocity.y = deltaX * 0.006;
                rotationVelocity.x = deltaY * 0.006;
                prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
            }
        }, { passive: true });

        // Visibility API throttle to preserve battery/CPU
        let isVisible = true;
        document.addEventListener('visibilitychange', () => {
            isVisible = !document.hidden;
        });

        // Reactive prefers-reduced-motion listener (Rule 49 of ui-ux-pro-max threejs stack)
        const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        let prefersReducedMotion = motionQuery.matches;
        motionQuery.addEventListener('change', (e) => {
            prefersReducedMotion = e.matches;
        });

        // Animation Loop
        function animate() {
            requestAnimationFrame(animate);
            if (!isVisible) return;
            if (prefersReducedMotion) {
                renderer.render(scene, camera);
                return;
            }

            // Breathing pulse on the inner core crystal
            const nowMs = performance.now();
            const breath = 1.0 + Math.sin(nowMs * 0.0022) * 0.06;
            innerMesh.scale.set(breath, breath, breath);

            // Apply fluid momentum damping with smooth glide
            if (!isDragging) {
                rotationVelocity.x *= 0.96;
                rotationVelocity.y *= 0.96;
                if (Math.abs(rotationVelocity.x) < 0.0015) rotationVelocity.x = 0.0018;
                if (Math.abs(rotationVelocity.y) < 0.002) rotationVelocity.y = 0.0032;
            }

            outerMesh.rotation.x += rotationVelocity.x;
            outerMesh.rotation.y += rotationVelocity.y;

            shroudMesh.rotation.x -= rotationVelocity.x * 0.45;
            shroudMesh.rotation.y += rotationVelocity.y * 0.55;

            innerMesh.rotation.x -= rotationVelocity.x * 1.4;
            innerMesh.rotation.y -= rotationVelocity.y * 1.4;

            pointsMesh.rotation.x += rotationVelocity.x;
            pointsMesh.rotation.y += rotationVelocity.y;

            ringMesh.rotation.y += 0.0025;

            // Parallax blend + scroll offset integration
            const dynamicTargetX = targetRotation.x + (scrollY * 0.00025);
            scene.rotation.x += (dynamicTargetX - scene.rotation.x) * 0.05;
            scene.rotation.y += (targetRotation.y - scene.rotation.y) * 0.05;

            renderer.render(scene, camera);
        }

        animate();
    }

    /* --- 4. INTERACTIVE KATAKANA / ENGLISH SCRUBBER (SCRATCH-REVEAL) --- */
    function initKineticTextScramble() {
        const elements = document.querySelectorAll('.decrypt-text');

        elements.forEach(el => {
            const originalEnglish = el.getAttribute('data-original') || el.textContent.trim();
            el.setAttribute('data-original', originalEnglish);

            // Accurate Katakana translation mapping for "Amit Kumar Garai"
            // Total length: 16 characters
            const katakanaMap = [
                'ア', 'ミ', 'ッ', 'ト', ' ',
                'ク', 'マ', 'ー', 'ル', '・', ' ',
                'ガ', 'ラ', 'ー', 'イ', '・'
            ];

            // Build locked-width character slots
            el.innerHTML = '';
            const slots = [];

            for (let i = 0; i < originalEnglish.length; i++) {
                const enChar = originalEnglish[i];
                const jpChar = katakanaMap[i] || enChar;
                const isSpace = enChar === ' ';

                const span = document.createElement('span');
                span.className = isSpace ? 'scramble-slot is-space' : 'scramble-slot';
                span.textContent = enChar;
                el.appendChild(span);

                // Measure width for both English and Japanese to find the perfect locked width
                const wEn = span.getBoundingClientRect().width;
                span.textContent = jpChar;
                const wJp = span.getBoundingClientRect().width;
                span.textContent = enChar; // Reset back to English

                const finalWidth = isSpace ? 12 : Math.ceil(Math.max(wEn, wJp, 16));
                span.style.width = `${finalWidth}px`;
                span.style.display = 'inline-block';
                span.style.textAlign = 'center';

                slots.push({
                    span: span,
                    enChar: enChar,
                    jpChar: jpChar,
                    isSpace: isSpace,
                    currentMode: 'en' // 'en' or 'jp'
                });
            }

            let leaveResetTimer = null;
            let lastAudioTick = 0;

            function playScrubSound() {
                const now = Date.now();
                if (now - lastAudioTick > 80) {
                    playSFX('hover');
                    lastAudioTick = now;
                }
            }

            // Set all slots to Japanese on hover entry
            function enterJapaneseMode() {
                clearTimeout(leaveResetTimer);
                slots.forEach(slot => {
                    if (slot.isSpace) return;
                    slot.span.textContent = slot.jpChar;
                    slot.span.classList.add('is-glyph');
                    slot.currentMode = 'jp';
                });
                playScrubSound();
            }

            // Scrubbing logic: turning letters to English left-to-right, and back to Japanese right-to-left
            function scrub(clientX) {
                clearTimeout(leaveResetTimer);
                const rect = el.getBoundingClientRect();
                const mouseX = clientX - rect.left;
                let changed = false;

                slots.forEach(slot => {
                    if (slot.isSpace) return;

                    const slotCenterX = slot.span.offsetLeft + slot.span.offsetWidth / 2;

                    // If mouse has passed this character (from left to right), show English
                    if (mouseX >= slotCenterX) {
                        if (slot.currentMode !== 'en') {
                            slot.span.textContent = slot.enChar;
                            slot.span.classList.remove('is-glyph');
                            slot.currentMode = 'en';
                            changed = true;
                        }
                    } else {
                        // If mouse is to the left of this character, show Japanese
                        if (slot.currentMode !== 'jp') {
                            slot.span.textContent = slot.jpChar;
                            slot.span.classList.add('is-glyph');
                            slot.currentMode = 'jp';
                            changed = true;
                        }
                    }
                });

                if (changed) {
                    playScrubSound();
                }
            }

            // On mouseenter: jump immediately to Japanese so the user sees Katakana
            el.addEventListener('mouseenter', (e) => {
                enterJapaneseMode();
                scrub(e.clientX);
            });

            // As mouse slides across the element
            el.addEventListener('mousemove', (e) => {
                scrub(e.clientX);
            }, { passive: true });

            // On mouseleave: smoothly animate back to English after a moment
            el.addEventListener('mouseleave', () => {
                leaveResetTimer = setTimeout(() => {
                    slots.forEach((slot, idx) => {
                        if (slot.isSpace) return;
                        setTimeout(() => {
                            slot.span.textContent = slot.enChar;
                            slot.span.classList.remove('is-glyph');
                            slot.currentMode = 'en';
                        }, idx * 35);
                    });
                }, 700);
            });

            // Touch support for mobile scrubbing
            el.addEventListener('touchstart', (e) => {
                if (e.touches.length === 1) {
                    enterJapaneseMode();
                    scrub(e.touches[0].clientX);
                }
            }, { passive: true });

            el.addEventListener('touchmove', (e) => {
                if (e.touches.length === 1) {
                    scrub(e.touches[0].clientX);
                }
            }, { passive: true });

            el.addEventListener('touchend', () => {
                leaveResetTimer = setTimeout(() => {
                    slots.forEach((slot, idx) => {
                        if (slot.isSpace) return;
                        setTimeout(() => {
                            slot.span.textContent = slot.enChar;
                            slot.span.classList.remove('is-glyph');
                            slot.currentMode = 'en';
                        }, idx * 35);
                    });
                }, 700);
            });
        });
    }

    /* --- 5. IGLOO-INSPIRED INTERACTIVE COSMIC FOOTER PARTICLES --- */
    function initFooterParticles() {
        const canvas = document.getElementById('footer-particle-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let width = (canvas.width = canvas.parentElement.offsetWidth);
        let height = (canvas.height = canvas.parentElement.offsetHeight);

        function handleResize() {
            width = canvas.width = canvas.parentElement.offsetWidth;
            height = canvas.height = canvas.parentElement.offsetHeight;
        }

        window.addEventListener('resize', handleResize, { passive: true });

        const particleCount = Math.min(80, Math.floor(width / 16));
        const particles = [];
        let mouse = { x: null, y: null, vx: 0, vy: 0 };
        let prevMouse = { x: 0, y: 0 };

        canvas.parentElement.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            const currX = e.clientX - rect.left;
            const currY = e.clientY - rect.top;
            mouse.vx = currX - prevMouse.x;
            mouse.vy = currY - prevMouse.y;
            mouse.x = currX;
            mouse.y = currY;
            prevMouse = { x: currX, y: currY };
        }, { passive: true });

        canvas.parentElement.addEventListener('mouseleave', () => {
            mouse.x = null;
            mouse.y = null;
        });

        class CosmicParticle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.6;
                this.vy = (Math.random() - 0.5) * 0.6;
                this.radius = Math.random() * 1.8 + 0.8;
                this.baseAlpha = Math.random() * 0.5 + 0.2;
                this.alpha = this.baseAlpha;
            }

            update() {
                // Mouse gravitational attraction
                if (mouse.x !== null && mouse.y !== null) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const maxDist = 180;

                    if (dist < maxDist) {
                        const force = (1 - dist / maxDist) * 0.04;
                        this.vx += (dx / dist) * force + mouse.vx * 0.01;
                        this.vy += (dy / dist) * force + mouse.vy * 0.01;
                        this.alpha = Math.min(1, this.baseAlpha + 0.5);
                    } else {
                        this.alpha = this.baseAlpha;
                    }
                } else {
                    this.alpha = this.baseAlpha;
                }

                this.x += this.vx;
                this.y += this.vy;

                // Drag
                this.vx *= 0.98;
                this.vy *= 0.98;

                // Bounds wrap
                if (this.x < 0) this.x = width;
                if (this.x > width) this.x = 0;
                if (this.y < 0) this.y = height;
                if (this.y > height) this.y = 0;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(56, 189, 248, ${this.alpha})`;
                ctx.shadowBlur = 6;
                ctx.shadowColor = '#38bdf8';
                ctx.fill();
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new CosmicParticle());
        }

        function drawConnections() {
            ctx.shadowBlur = 0;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 90) {
                        const opacity = (1 - dist / 90) * 0.22;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(56, 189, 248, ${opacity})`;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                }
            }
        }

        function render() {
            ctx.clearRect(0, 0, width, height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            drawConnections();
            requestAnimationFrame(render);
        }

        render();
    }

    /* --- 6. LIVE INTERACTIVE ML INFERENCE PLAYGROUND --- */
    function initMLPlayground() {
        const inputSL = document.getElementById('inputSepalLength');
        const inputSW = document.getElementById('inputSepalWidth');
        const inputPL = document.getElementById('inputPetalLength');
        const inputPW = document.getElementById('inputPetalWidth');

        const valSL = document.getElementById('valSepalLength');
        const valSW = document.getElementById('valSepalWidth');
        const valPL = document.getElementById('valPetalLength');
        const valPW = document.getElementById('valPetalWidth');

        const predictedClassEl = document.getElementById('predictedClass');
        const confidencePctEl = document.getElementById('confidencePct');

        const probSetosaVal = document.getElementById('probSetosaVal');
        const probVersicolorVal = document.getElementById('probVersicolorVal');
        const probVirginicaVal = document.getElementById('probVirginicaVal');

        const probSetosaFill = document.getElementById('probSetosaFill');
        const probVersicolorFill = document.getElementById('probVersicolorFill');
        const probVirginicaFill = document.getElementById('probVirginicaFill');

        const resetBtn = document.getElementById('resetSlidersBtn');
        const randomBtn = document.getElementById('randomizeSlidersBtn');

        if (!inputSL || !inputSW || !inputPL || !inputPW) return;

        // Centroids based on Fisher's Iris Dataset
        // [SepalLength, SepalWidth, PetalLength, PetalWidth]
        const centroids = {
            'Iris Setosa': [5.006, 3.428, 1.462, 0.246],
            'Iris Versicolor': [5.936, 2.770, 4.260, 1.326],
            'Iris Virginica': [6.588, 2.974, 5.552, 2.026]
        };

        function calculateInference() {
            const sl = parseFloat(inputSL.value);
            const sw = parseFloat(inputSW.value);
            const pl = parseFloat(inputPL.value);
            const pw = parseFloat(inputPW.value);

            if (valSL) valSL.textContent = sl.toFixed(1);
            if (valSW) valSW.textContent = sw.toFixed(1);
            if (valPL) valPL.textContent = pl.toFixed(1);
            if (valPW) valPW.textContent = pw.toFixed(1);

            const inputVec = [sl, sw, pl, pw];

            // Calculate Euclidean distances to each species centroid
            const distances = {};
            let maxDist = 0;

            for (const [species, center] of Object.entries(centroids)) {
                let sumSq = 0;
                for (let i = 0; i < 4; i++) {
                    const diff = inputVec[i] - center[i];
                    sumSq += diff * diff;
                }
                const dist = Math.sqrt(sumSq);
                distances[species] = dist;
                if (dist > maxDist) maxDist = dist;
            }

            // Invert distance to calculate softmax similarity probabilities
            const similarities = {};
            let sumExp = 0;

            for (const [species, dist] of Object.entries(distances)) {
                const sim = Math.exp(-dist * 1.5);
                similarities[species] = sim;
                sumExp += sim;
            }

            const probs = {};
            let bestClass = 'Iris Versicolor';
            let bestProb = 0;

            for (const [species, sim] of Object.entries(similarities)) {
                const p = (sim / sumExp) * 100;
                probs[species] = p;
                if (p > bestProb) {
                    bestProb = p;
                    bestClass = species;
                }
            }

            // Update DOM telemetry
            if (predictedClassEl) predictedClassEl.textContent = bestClass;
            if (confidencePctEl) confidencePctEl.textContent = bestProb.toFixed(1) + '%';

            if (probSetosaVal) probSetosaVal.textContent = probs['Iris Setosa'].toFixed(1) + '%';
            if (probVersicolorVal) probVersicolorVal.textContent = probs['Iris Versicolor'].toFixed(1) + '%';
            if (probVirginicaVal) probVirginicaVal.textContent = probs['Iris Virginica'].toFixed(1) + '%';

            if (probSetosaFill) probSetosaFill.style.width = probs['Iris Setosa'].toFixed(1) + '%';
            if (probVersicolorFill) probVersicolorFill.style.width = probs['Iris Versicolor'].toFixed(1) + '%';
            if (probVirginicaFill) probVirginicaFill.style.width = probs['Iris Virginica'].toFixed(1) + '%';
        }

        let lastSliderAudio = 0;
        [inputSL, inputSW, inputPL, inputPW].forEach(slider => {
            slider.addEventListener('input', () => {
                calculateInference();
                const now = Date.now();
                if (now - lastSliderAudio > 45) {
                    playSFX('slider');
                    lastSliderAudio = now;
                }
            });
        });

        calculateInference();

        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                inputSL.value = '5.8';
                inputSW.value = '3.0';
                inputPL.value = '4.2';
                inputPW.value = '1.3';
                calculateInference();
                playSFX('click');
            });
        }

        if (randomBtn) {
            randomBtn.addEventListener('click', () => {
                inputSL.value = (Math.random() * 3.5 + 4.3).toFixed(1);
                inputSW.value = (Math.random() * 2.2 + 2.0).toFixed(1);
                inputPL.value = (Math.random() * 5.5 + 1.2).toFixed(1);
                inputPW.value = (Math.random() * 2.3 + 0.1).toFixed(1);
                calculateInference();
                playSFX('click');
            });
        }
    }

    /* --- 7. MULTI-TAB TERMINAL HUD --- */
    function initTerminalTabs() {
        const tabs = document.querySelectorAll('.term-tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const target = tab.getAttribute('data-tab');
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                document.querySelectorAll('.terminal-body .tab-pane').forEach(pane => {
                    pane.classList.remove('active');
                });

                const activePane = document.getElementById(`pane-${target}`);
                if (activePane) {
                    activePane.classList.add('active');
                }
                playSFX('click');
            });
        });
    }

    /* --- 8. LIVE LOCAL CLOCK (IST) --- */
    function initLocalClock() {
        const timeEl = document.getElementById('localTimeStr');
        if (!timeEl) return;

        function updateTime() {
            try {
                const now = new Date();
                const options = {
                    timeZone: 'Asia/Kolkata',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false
                };
                timeEl.textContent = new Intl.DateTimeFormat('en-GB', options).format(now) + ' IST';
            } catch (e) {
                timeEl.textContent = 'IST (UTC+5:30)';
            }
        }

        updateTime();
        setInterval(updateTime, 1000);
    }

    /* --- 9. HERO TYPEWRITER --- */
    function initHeroTyping() {
        const typingEl = document.getElementById('typing');
        if (!typingEl) return;

        const phrases = [
            'python -m model.evaluate --accuracy',
            'playwright run --headless --bot=epic_claimer',
            'scikit-learn train --dataset=iris_v2',
            'cat /etc/profile | grep "Curious & Driven"'
        ];

        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let speed = 70;

        function typeLoop() {
            const current = phrases[phraseIndex];

            if (isDeleting) {
                typingEl.textContent = current.substring(0, charIndex - 1);
                charIndex--;
                speed = 35;
            } else {
                typingEl.textContent = current.substring(0, charIndex + 1);
                charIndex++;
                speed = 70;
            }

            if (!isDeleting && charIndex === current.length) {
                isDeleting = true;
                speed = 2000; // Pause at end of command
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                speed = 400;
            }

            setTimeout(typeLoop, speed);
        }

        typeLoop();
    }

    /* --- 10. 3D TILT EFFECT --- */
    function initTiltEffect() {
        // Only run on desktop devices
        if (window.matchMedia('(hover: none)').matches) return;

        const tiltCards = document.querySelectorAll('[data-tilt]');

        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * -6;
                const rotateY = ((x - centerX) / centerX) * 6;

                card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-3px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
            });
        });
    }

    /* --- 11. NAVIGATION & SCROLL SPY --- */
    function initScrollNavigation() {
        const navbar = document.getElementById('navbar');
        const navLinks = document.getElementById('navLinks');
        const menuToggle = document.getElementById('menuToggle');
        const navItems = document.querySelectorAll('.nav-item');

        // Scroll glass styling
        window.addEventListener('scroll', () => {
            if (window.scrollY > 40) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }, { passive: true });

        // Mobile menu toggle
        if (menuToggle && navLinks) {
            menuToggle.addEventListener('click', () => {
                const isActive = navLinks.classList.toggle('active');
                menuToggle.setAttribute('aria-expanded', isActive);
            });

            navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                });
            });
        }

        // Active link spy
        const sections = document.querySelectorAll('header[id], section[id]');

        function spySections() {
            const scrollPos = window.scrollY + 200;

            sections.forEach(sec => {
                const top = sec.offsetTop;
                const height = sec.offsetHeight;
                const id = sec.getAttribute('id');

                if (scrollPos >= top && scrollPos < top + height) {
                    navItems.forEach(item => {
                        item.classList.remove('active');
                        if (item.getAttribute('href') === `#${id}`) {
                            item.classList.add('active');
                        }
                    });
                }
            });
        }

        window.addEventListener('scroll', spySections, { passive: true });
    }

    /* --- 12. RESUME MODAL --- */
    function initResumeModal() {
        const modal = document.getElementById('resumeModal');
        const openBtn = document.getElementById('resumePreviewBtn');
        const closeBtn = document.getElementById('closeResumeModal');

        if (!modal) return;

        function openModal() {
            modal.classList.add('active');
            modal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            playSFX('cmd');
        }

        function closeModal() {
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
            playSFX('click');
        }

        if (openBtn) openBtn.addEventListener('click', openModal);
        if (closeBtn) closeBtn.addEventListener('click', closeModal);

        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    }

    /* --- 13. COMMAND PALETTE (CTRL+K / CMD+K) --- */
    function initCommandPalette() {
        const palette = document.getElementById('cmdPalette');
        const trigger = document.getElementById('cmdPaletteTrigger');
        const input = document.getElementById('cmdInput');
        const items = document.querySelectorAll('.cmd-item');

        if (!palette || !input) return;

        let selectedIndex = 0;

        function getVisibleItems() {
            return Array.from(items).filter(item => item.style.display !== 'none');
        }

        function updateSelection(visible) {
            items.forEach(i => i.classList.remove('selected'));
            if (visible.length > 0) {
                if (selectedIndex >= visible.length) selectedIndex = 0;
                if (selectedIndex < 0) selectedIndex = visible.length - 1;
                visible[selectedIndex].classList.add('selected');
                visible[selectedIndex].scrollIntoView({ block: 'nearest' });
            }
        }

        function openPalette() {
            palette.classList.add('active');
            palette.setAttribute('aria-hidden', 'false');
            input.value = '';
            filterItems('');
            setTimeout(() => input.focus(), 50);
            playSFX('cmd');
        }

        function closePalette() {
            palette.classList.remove('active');
            palette.setAttribute('aria-hidden', 'true');
            playSFX('click');
        }

        function filterItems(query) {
            const q = query.toLowerCase().trim();
            items.forEach(item => {
                const text = item.textContent.toLowerCase();
                if (!q || text.includes(q)) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
            selectedIndex = 0;
            updateSelection(getVisibleItems());
        }

        function executeItem(item) {
            const action = item.getAttribute('data-action');
            closePalette();

            if (action === 'nav') {
                const targetId = item.getAttribute('data-target');
                const targetEl = document.querySelector(targetId);
                if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth' });
            } else if (action === 'resume-preview') {
                const modal = document.getElementById('resumeModal');
                if (modal) {
                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            } else if (action === 'resume-download') {
                const a = document.createElement('a');
                a.href = 'Amit Kumar Garai - Resume.pdf';
                a.download = 'Amit_Kumar_Garai_Resume.pdf';
                a.click();
                showToast('Resume Download Initiated', 'fa-download');
            } else if (action === 'copy-email') {
                navigator.clipboard.writeText('garaiamit64@gmail.com');
                showToast('Email Copied to Clipboard!', 'fa-copy');
            } else if (action === 'toggle-theme') {
                const themeBtn = document.getElementById('themeToggle');
                if (themeBtn) themeBtn.click();
            } else if (action === 'toggle-sfx') {
                const sfxBtn = document.getElementById('sfxToggle');
                if (sfxBtn) sfxBtn.click();
            } else if (action === 'project-link') {
                const url = item.getAttribute('data-url');
                if (url) window.open(url, '_blank');
            } else if (action === 'whatsapp') {
                window.open('https://wa.me/qr/EEASQ2MOEW73P1', '_blank');
            } else if (action === 'github') {
                window.open('https://github.com/amit-649', '_blank');
            } else if (action === 'linkedin') {
                window.open('https://www.linkedin.com/in/amit-garai-10a804267', '_blank');
            }
        }

        if (trigger) trigger.addEventListener('click', openPalette);

        window.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
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

        palette.addEventListener('click', (e) => {
            if (e.target === palette) closePalette();
        });

        input.addEventListener('input', (e) => filterItems(e.target.value));

        input.addEventListener('keydown', (e) => {
            const visible = getVisibleItems();
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                selectedIndex++;
                updateSelection(visible);
                playSFX('hover');
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                selectedIndex--;
                updateSelection(visible);
                playSFX('hover');
            } else if (e.key === 'Enter') {
                e.preventDefault();
                if (visible[selectedIndex]) {
                    executeItem(visible[selectedIndex]);
                }
            }
        });

        items.forEach(item => {
            item.addEventListener('click', () => executeItem(item));
        });
    }

    /* --- 14. TOAST NOTIFICATIONS --- */
    function showToast(message, icon = 'fa-circle-check') {
        const container = document.getElementById('toastContainer');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = 'toast-msg';
        toast.innerHTML = `<i class="fas ${icon}"></i> <span>${message}</span>`;
        container.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(12px) scale(0.95)';
            setTimeout(() => toast.remove(), 300);
        }, 3200);
    }

    /* --- 15. CONTACT FORM DISPATCH --- */
    function initContactForm() {
        const form = document.getElementById('contactForm');
        const statusEl = document.getElementById('formStatus');
        const submitBtn = document.getElementById('submitBtn');

        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const name = document.getElementById('formName').value.trim();
            const email = document.getElementById('formEmail').value.trim();
            const message = document.getElementById('formMessage').value.trim();

            if (!name || !email || !message) {
                statusEl.className = 'form-status error';
                statusEl.textContent = 'Please populate all transmission fields.';
                return;
            }

            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Transmitting...';

            // Check if Web3Forms Key configured in config.js
            const apiKey = typeof CONFIG !== 'undefined' && CONFIG.WEB3FORMS_KEY ? CONFIG.WEB3FORMS_KEY : '';

            if (apiKey && apiKey !== 'YOUR_WEB3FORMS_ACCESS_KEY') {
                try {
                    const res = await fetch('https://api.web3forms.com/submit', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            access_key: apiKey,
                            name: name,
                            email: email,
                            message: message,
                            subject: `[Portfolio Dispatch] from ${name}`
                        })
                    });

                    const data = await res.json();
                    if (data.success) {
                        statusEl.className = 'form-status success';
                        statusEl.textContent = '✓ Packet transmitted successfully! Amit will respond shortly.';
                        form.reset();
                        playSFX('cmd');
                    } else {
                        throw new Error(data.message);
                    }
                } catch (err) {
                    statusEl.className = 'form-status error';
                    statusEl.textContent = 'Network dispatch failed. Reverting to local mail client...';
                    window.location.href = `mailto:garaiamit64@gmail.com?subject=Contact%20from%20${encodeURIComponent(name)}&body=${encodeURIComponent(message)}`;
                }
            } else {
                // Fallback to mailto
                statusEl.className = 'form-status success';
                statusEl.textContent = 'Opening your default mail client...';
                window.location.href = `mailto:garaiamit64@gmail.com?subject=Transmission%20from%20${encodeURIComponent(name)}&body=${encodeURIComponent(message)}`;
            }

            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Transmit Packet';
        });
    }

    /* --- 16. LIVE GITHUB REPO TELEMETRY --- */
    async function initGitHubMetrics() {
        const username = typeof CONFIG !== 'undefined' && CONFIG.GITHUB_USERNAME ? CONFIG.GITHUB_USERNAME : 'amit-649';
        const cacheKey = 'gh_telemetry_v2';
        const cacheTTL = 30 * 60 * 1000;

        function applyMetrics(data) {
            if (!data) return;
            const repoEl = document.getElementById('statReposNum');
            if (repoEl && data.public_repos !== undefined) {
                repoEl.textContent = data.public_repos;
            }

            const starsEl = document.getElementById('epicStarsBadge');
            if (starsEl && data.epic_stars !== undefined) {
                starsEl.innerHTML = `<i class="fas fa-star" style="color:#eab308;"></i> ${data.epic_stars} ${data.epic_stars === 1 ? 'Star' : 'Stars'}`;
            }
        }

        try {
            const cached = localStorage.getItem(cacheKey);
            if (cached) {
                const parsed = JSON.parse(cached);
                if (Date.now() - parsed.timestamp < cacheTTL) {
                    applyMetrics(parsed.data);
                    return;
                }
            }
        } catch (e) {
            // Ignore storage errors
        }

        try {
            const [userRes, reposRes] = await Promise.all([
                fetch(`https://api.github.com/users/${username}`),
                fetch(`https://api.github.com/users/${username}/repos?per_page=100`)
            ]);

            if (!userRes.ok) return;
            const userData = await userRes.json();
            let epicStars = 2;

            if (reposRes.ok) {
                const reposData = await reposRes.json();
                if (Array.isArray(reposData)) {
                    const claimer = reposData.find(r => r.name.toLowerCase() === 'epic-games-auto-claimer');
                    if (claimer) epicStars = claimer.stargazers_count;
                }
            }

            const metrics = {
                public_repos: userData.public_repos || 15,
                epic_stars: epicStars
            };

            applyMetrics(metrics);

            try {
                localStorage.setItem(cacheKey, JSON.stringify({
                    timestamp: Date.now(),
                    data: metrics
                }));
            } catch (err) {
                // Storage quota full
            }
        } catch (error) {
            // Offline or rate-limited
        }
    }

    /* --- 17. SCROLL TO TOP --- */
    function initScrollTop() {
        const topBtn = document.getElementById('scrollTopBtn');
        if (!topBtn) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                topBtn.classList.add('visible');
            } else {
                topBtn.classList.remove('visible');
            }
        }, { passive: true });

        topBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            playSFX('click');
        });
    }

    /* --- INITIALIZE ON DOM READY --- */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeApp);
    } else {
        initializeApp();
    }

})();
