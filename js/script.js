// --- FUTURISTIC LINUX BOOT PRELOADER ---
const bootSequence = [
    {
        type: 'ascii', text: `
 █████╗ ███╗   ███╗██╗████████╗   ███╗   ███╗██╗     
██╔══██╗████╗ ████║██║╚══██╔══╝   ████╗ ████║██║     
███████║██╔████╔██║██║   ██║      ██╔████╔██║██║     
██╔══██║██║╚██╔╝██║██║   ██║      ██║╚██╔╝██║██║     
██║  ██║██║ ╚═╝ ██║██║   ██║   ██╗██║ ╚═╝ ██║███████╗
╚═╝  ╚═╝╚═╝     ╚═╝╚═╝   ╚═╝   ╚═╝╚═╝     ╚═╝╚══════╝` },
    { type: 'info', text: 'AMIT.ML Neural Interface v2.5.0' },
    { type: 'blank' },
    { type: 'ok', text: 'Loading kernel modules...' },
    { type: 'ok', text: 'Initializing neural_network.ko' },
    { type: 'ok', text: 'Mounting /dev/portfolio' },
    { type: 'ok', text: 'Starting machine_learning.service' },
    { type: 'ok', text: 'Connecting to github.api.v4' },
    { type: 'ok', text: 'Loading gemini-ai-core' },
    { type: 'warn', text: 'Optimizing for maximum performance...' },
    { type: 'ok', text: 'All systems operational' },
    { type: 'blank' },
    { type: 'success', text: '>>> SYSTEM READY <<<' },
    { type: 'prompt', text: 'amit@portfolio:~$ ./launch_interface.sh' }
];

window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (!preloader) {
        initializePage();
        return;
    }

    let i = 0;

    function typeBoot() {
        if (i < bootSequence.length) {
            const item = bootSequence[i];
            const div = document.createElement('div');
            div.className = 'boot-line';

            if (item.type === 'logo') {
                div.className = 'glitch-logo';
                div.innerHTML = item.text;
            } else if (item.type === 'ascii') {
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
            i++;

            // Variable timing for realism
            const delay = item.type === 'ascii' ? 100 :
                item.type === 'blank' ? 50 :
                    Math.random() * 200 + 80;
            setTimeout(typeBoot, delay);
        } else {
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                    initializePage();
                }, 500);
            }, 600);
        }
    }
    typeBoot();
});

function initializePage() {
    typeCode();
    initScrollReveal();
}

// --- DARK/LIGHT MODE TOGGLE ---
const themeToggle = document.getElementById('themeToggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

function setTheme(isDark) {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    if (themeToggle) {
        themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    }
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Load saved theme or use system preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    setTheme(savedTheme === 'dark');
} else {
    setTheme(prefersDark.matches);
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        setTheme(!isDark);
    });
}

// --- CURSOR GLOW EFFECT ---
const cursorGlow = document.createElement('div');
cursorGlow.className = 'cursor-glow';
document.body.appendChild(cursorGlow);

document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});

// --- SCROLL REVEAL (Intersection Observer) ---
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => observer.observe(el));

    // Train Animation Trigger
    const qualTimeline = document.getElementById('qualTimeline');
    if (qualTimeline) {
        const trainObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !qualTimeline.classList.contains('animate')) {
                    qualTimeline.classList.add('animate');
                }
            });
        }, { threshold: 0.3 });
        trainObserver.observe(qualTimeline);
    }

    // Stats Counter Animation
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length > 0) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.getAttribute('data-target'));
                    animateCounter(entry.target, target);
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(num => statsObserver.observe(num));
    }

    // Contact Form Handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            btn.style.background = '#22c55e';
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
                btn.style.background = '';
                contactForm.reset();
            }, 3000);
        });
    }
}

// Counter Animation Function
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const suffix = element.getAttribute('data-suffix') || '';
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, 30);
}

// --- SCROLL SPY (Active Nav) ---
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLi = document.querySelectorAll('.nav-links a');
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });

    navLi.forEach(li => {
        li.classList.remove('active');
        if (li.getAttribute('href') && li.getAttribute('href').includes(current)) {
            li.classList.add('active');
        }
    });
});

// --- MENU TOGGLE (Improved) ---
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    const navLinks = document.querySelector('.nav-links');
    const menuToggle = document.querySelector('.menu-toggle');
    if (navLinks && navLinks.classList.contains('active') &&
        !e.target.closest('.nav-links') && !e.target.closest('.menu-toggle')) {
        navLinks.classList.remove('active');
    }
});

// --- COPY EMAIL FUNCTION ---
function copyEmail() {
    const email = 'garaiamit64@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
        const btn = document.getElementById('copyEmailBtn');
        btn.classList.add('copied');
        btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        setTimeout(() => {
            btn.classList.remove('copied');
            btn.innerHTML = '<i class="fas fa-envelope"></i> Email';
        }, 1500);
    });
}

// --- SMOOTH SCROLL WITH OFFSET FOR STAT CARDS ---
document.querySelectorAll('a.stat-card').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            // Calculate offset to center the section in viewport
            const sectionHeight = targetSection.offsetHeight;
            const viewportHeight = window.innerHeight;
            const offset = Math.max(50, (viewportHeight - sectionHeight) / 2);
            const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// --- NEURAL NETWORK CANVAS ANIMATION ---
const canvas = document.getElementById('neuro-canvas');
const ctx = canvas.getContext('2d');
let width, height;
let points = [];

let mouse = { x: null, y: null };
window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

class Point {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
    }
}

for (let i = 0; i < 50; i++) points.push(new Point());

function animate() {
    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = 'rgba(124, 58, 237, 0.15)';
    for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
            const dx = points[i].x - points[j].x;
            const dy = points[i].y - points[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 150) {
                ctx.beginPath();
                ctx.moveTo(points[i].x, points[i].y);
                ctx.lineTo(points[j].x, points[j].y);
                ctx.stroke();
            }
        }

        if (mouse.x && mouse.y) {
            const dx = points[i].x - mouse.x;
            const dy = points[i].y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 200) {
                ctx.beginPath();
                ctx.strokeStyle = 'rgba(34, 211, 238, 0.2)';
                ctx.moveTo(points[i].x, points[i].y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.stroke();
                ctx.strokeStyle = 'rgba(124, 58, 237, 0.15)';
            }
        }
    }
    ctx.fillStyle = '#22d3ee';
    for (let point of points) {
        point.update();
        ctx.beginPath();
        ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
        ctx.fill();
    }
    requestAnimationFrame(animate);
}
animate();

// --- HERO TYPING EFFECT ---
const phrases = ["Learning ML...", "Building Models...", "Writing Python...", "Training AI..."];
let i = 0, charI = 0, isDeleting = false;
const typeEl = document.getElementById('typing');

function typeLoop() {
    if (!typeEl) return;
    let current = phrases[i % phrases.length];
    typeEl.innerText = current.substring(0, charI);
    if (isDeleting) charI--; else charI++;

    if (!isDeleting && charI === current.length + 1) { isDeleting = true; setTimeout(typeLoop, 1000); }
    else if (isDeleting && charI === 0) { isDeleting = false; i++; setTimeout(typeLoop, 200); }
    else setTimeout(typeLoop, isDeleting ? 30 : 60);
}
typeLoop();

// --- ANIME SEARCH FUNCTION ---
function searchAnime(name) {
    window.open('https://www.google.com/search?q=' + encodeURIComponent(name) + ' anime', '_blank');
}

// --- 3D TILT EFFECT ---
const cards = document.querySelectorAll('.tilt-card');
cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -2;
        const rotateY = ((x - centerX) / centerX) * 2;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
    });
});

// --- ANIMATED CODE TERMINAL ---
const codeTokens = [
    { text: "import ", class: "c-k" },
    { text: "sklearn\n", class: "c-s" },
    { text: "model = ", class: "c-o" },
    { text: "RandomForestClassifier()\n", class: "c-f" },
    { text: "model.fit(X_train, y_train)\n", class: "c-c" },
    { text: "print(", class: "c-o" },
    { text: "\"Amit is hired!\"", class: "c-s" },
    { text: ")", class: "c-o" }
];

const codeDisplay = document.getElementById('code-display');
let tokenIndex = 0;
let charIndex = 0;
let currentSpan = null;

function typeCode() {
    if (!codeDisplay) return;
    if (tokenIndex < codeTokens.length) {
        const token = codeTokens[tokenIndex];
        if (!currentSpan) {
            currentSpan = document.createElement('span');
            currentSpan.className = token.class;
            codeDisplay.appendChild(currentSpan);
        }
        if (charIndex < token.text.length) {
            currentSpan.textContent += token.text[charIndex];
            charIndex++;
            codeDisplay.scrollTop = codeDisplay.scrollHeight;
            setTimeout(typeCode, 20);
        } else {
            charIndex = 0;
            tokenIndex++;
            currentSpan = null;
            setTimeout(typeCode, 20);
        }
    } else {
        const cursor = document.createElement('span');
        cursor.className = 'code-cursor';
        codeDisplay.appendChild(cursor);
    }
}

// --- AI CHATBOT ---
const chatWindow = document.getElementById('chat-window');
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');

// Store chat history for context
let chatHistory = [];

function toggleChat() {
    if (!chatWindow) return;
    if (chatWindow.style.display === 'none' || chatWindow.style.display === '') {
        chatWindow.style.display = 'flex';
    } else {
        chatWindow.style.display = 'none';
    }
}

function handleEnter(e) { if (e.key === 'Enter') sendMessage(); }

function showTypingIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'typing-indicator';
    indicator.id = 'typing-indicator';
    indicator.innerHTML = '<span></span><span></span><span></span>';
    chatMessages.appendChild(indicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function hideTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) indicator.remove();
}

async function sendMessage() {
    if (!userInput || !chatMessages) return;
    const text = userInput.value.trim();
    if (!text) return;

    addMessage(text, 'user');
    userInput.value = '';
    showTypingIndicator();

    const SYSTEM_PROMPT = `You are Amit's AI Assistant. Be helpful, friendly, and CONCISE. 
    Amit's Bio: 1st-year BCA student, passionate about programming/AI/ML, likes cooking and anime.
    Social Links:
    - Instagram: https://www.instagram.com/itssz.amit (@itssz.amit)
    - GitHub: https://github.com/amit-649
    - LinkedIn: https://www.linkedin.com/in/amit-garai-10a804267
    - WhatsApp: https://wa.me/qr/EEASQ2MOEW73P1
    - Email: garaiamit64@gmail.com
    Rules:
    - BE CONCISE. Do not give long introductions for simple questions.
    - If user says "Hi" or similar greeting, reply simply: "Hello! Glad to have you here. How can I help you? 😊"
    - If asked about projects, be diplomatic but brief: "Amit is working on some exciting projects soon to be announced! Stay tuned to his socials or DM him."
    - Keep the "relationship" Easter egg: "Error 404: Relationship not found (Optimization in progress) 😉"
    - If asked for socials, provide the direct links above.`;

    try {
        const API_KEY = CONFIG.API_KEY;

        // Construct contents with system prompt and history
        const contents = [
            {
                role: 'user',
                parts: [{ text: "Context/System Instructions: " + SYSTEM_PROMPT }]
            },
            {
                role: 'model',
                parts: [{ text: "Understood. I am Amit's AI Assistant and will follow these instructions." }]
            },
            ...chatHistory,
            {
                role: 'user',
                parts: [{ text: text }]
            }
        ];

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: contents })
        });

        hideTypingIndicator();

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error.message || response.statusText);
        }

        const data = await response.json();
        const botReply = data.candidates[0].content.parts[0].text;

        // Update history (keep last 10 messages to avoid large payloads)
        chatHistory.push({ role: 'user', parts: [{ text: text }] });
        chatHistory.push({ role: 'model', parts: [{ text: botReply }] });
        if (chatHistory.length > 10) chatHistory = chatHistory.slice(-10);

        addMessage(botReply, 'bot');

    } catch (error) {
        hideTypingIndicator();
        addMessage("⚠️ Error: " + error.message, 'bot');
    }
}

function addMessage(text, sender) {
    const div = document.createElement('div');
    div.className = `message ${sender}`;
    div.innerText = text;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// --- SCROLL TO TOP LOGIC ---
const scrollTopBtn = document.getElementById('scrollTopBtn');

if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
            scrollTopBtn.style.display = "flex";
        } else {
            scrollTopBtn.style.display = "none";
        }
    });
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
