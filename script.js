// --- 1. ЛОГИКА КАПЧИ ПРИ ЗАХОДЕ ---
document.body.classList.add('locked');

const captchaOverlay = document.getElementById('captcha-overlay');
const captchaBox = document.querySelector('.captcha-box');
const mathTaskEl = document.getElementById('math-task');
const captchaInput = document.getElementById('captcha-answer');
const captchaSubmit = document.getElementById('captcha-submit');
const captchaError = document.getElementById('captcha-error');

let correctAnswer = 0;

function generateCaptcha() {
    const num1 = Math.floor(Math.random() * 15) + 3;
    const num2 = Math.floor(Math.random() * 15) + 2;
    correctAnswer = num1 + num2;
    mathTaskEl.textContent = `${num1} + ${num2} = ?`;
}

generateCaptcha();

function checkCaptcha() {
    const userVal = parseInt(captchaInput.value, 10);
    
    if (userVal === correctAnswer) {
        captchaError.textContent = "> Доступ разрешён...";
        setTimeout(() => {
            captchaOverlay.classList.add('hidden');
            document.body.classList.remove('locked');
        }, 300);
    } else {
        captchaError.textContent = "> Неверно. Попробуй ещё раз!";
        captchaInput.value = "";
        captchaBox.classList.remove('shake');
        void captchaBox.offsetWidth;
        captchaBox.classList.add('shake');
        generateCaptcha();
    }
}

captchaSubmit.addEventListener('click', checkCaptcha);
captchaInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        checkCaptcha();
    }
});

// --- 2. НЕПРЕРЫВНАЯ ПЕЧАТЬ КОДА НА ФОНЕ ---
const codeLines = [
    "$ ssh artefakt@production-server -p 2222",
    "const artefakt = new Developer({ telegram: '@intwf', status: 'online' });",
    "docker-compose up -d --build --force-recreate",
    "async function deployService(config) { await kubernetes.apply(config); }",
    "SELECT id, project_name, status FROM orders WHERE developer = 'artefakt';",
    "git commit -m 'feat: implement liquid glass UI and captcha'",
    "npm run build && systemctl restart nginx.service",
    "def neural_pipeline(data): return [optimize(x) for x in data]",
    "curl -X POST https://telegram.org -d 'chat_id=@intwf'",
    "const socket = new WebSocket('wss://artefakt.dev/stream');",
    "chmod +x init_cluster.sh && ./init_cluster.sh --workers=8",
    "export const middleware = (req, res, next) => verifyJWT(req, next);"
];

const bgElement = document.getElementById('code-bg');
let lineIndex = 0;
let charIndex = 0;
let currentText = "";

for (let i = 0; i < 12; i++) {
    currentText += codeLines[i % codeLines.length] + "\n";
}
bgElement.textContent = currentText;

function typeBackgroundCode() {
    const targetLine = codeLines[lineIndex];
    
    if (charIndex < targetLine.length) {
        currentText += targetLine.charAt(charIndex);
        charIndex++;
    } else {
        currentText += "\n";
        charIndex = 0;
        lineIndex = (lineIndex + 1) % codeLines.length;
        
        const linesArray = currentText.split('\n');
        if (linesArray.length > 28) {
            currentText = linesArray.slice(linesArray.length - 28).join('\n');
        }
    }
    
    bgElement.textContent = currentText + "█";
    
    const typingSpeed = Math.floor(Math.random() * 35) + 20;
    setTimeout(typeBackgroundCode, typingSpeed);
}

typeBackgroundCode();

// --- 3. АНИМАЦИЯ ПОЯВЛЕНИЯ БЛОКОВ ПРИ ПРОКРУТКЕ ---
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('active');
            }, index * 100);
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.12
});

revealElements.forEach(el => revealObserver.observe(el));

// --- 4. КНОПКИ КОПИРОВАНИЯ КОНТАКТОВ В БУФЕР ОБМЕНА ---
const copyButtons = document.querySelectorAll('.copy-btn');
const copyToast = document.getElementById('copy-toast');

copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const textToCopy = btn.getAttribute('data-copy');
        navigator.clipboard.writeText(textToCopy).then(() => {
            copyToast.textContent = `> Скопировано в буфер обмена: ${textToCopy}`;
            setTimeout(() => {
                copyToast.textContent = '';
            }, 3000);
        });
    });
});
