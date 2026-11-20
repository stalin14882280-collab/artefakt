// Команды и код для непрерывной печати на фоне
const codeLines = [
    "$ ssh artefakt@production-server -p 2222",
    "const artefakt = new Developer({ telegram: '@intwf', status: 'online' });",
    "docker-compose up -d --build --force-recreate",
    "async function deployService(config) { await kubernetes.apply(config); }",
    "SELECT id, project_name, status FROM orders WHERE developer = 'artefakt';",
    "git commit -m 'feat: implement liquid glass UI and smooth animations'",
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

// Предзаполняем фон несколькими строками, чтобы экран сразу не был пустым
for (let i = 0; i < 12; i++) {
    currentText += codeLines[i % codeLines.length] + "\n";
}
bgElement.textContent = currentText;

// Функция непрерывной живой печати кода на фоне
function typeBackgroundCode() {
    const targetLine = codeLines[lineIndex];
    
    if (charIndex < targetLine.length) {
        currentText += targetLine.charAt(charIndex);
        charIndex++;
    } else {
        currentText += "\n";
        charIndex = 0;
        lineIndex = (lineIndex + 1) % codeLines.length;
        
        // Ограничиваем количество строк в памяти, чтобы браузер не тормозил
        const linesArray = currentText.split('\n');
        if (linesArray.length > 28) {
            currentText = linesArray.slice(linesArray.length - 28).join('\n');
        }
    }
    
    bgElement.textContent = currentText + "█"; // Мигающий курсор терминала
    
    // Случайная скорость печати для реалистичности (от 20 до 55 мс)
    const typingSpeed = Math.floor(Math.random() * 35) + 20;
    setTimeout(typeBackgroundCode, typingSpeed);
}

// Запускаем печать кода на фоне
typeBackgroundCode();

// Плавная анимация появления элементов при прокрутке (Intersection Observer)
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

// Реальная отправка заявки на почту через Web3Forms
const contactForm = document.getElementById('contact-form');
const statusMsg = document.getElementById('form-status');
const submitBtn = document.getElementById('submit-btn');

contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = 'Отправка...';
    submitBtn.disabled = true;
    statusMsg.textContent = '';

    const formData = new FormData(contactForm);
    
    // Твой личный ключ Web3Forms
    formData.append("access_key", "70c31c79-4b6c-4103-809a-428754cc581c");
    
    // Настройки письма
    formData.append("subject", "Новая заявка с сайта artefakt!");
    formData.append("from_name", "Сайт artefakt");

    try {
        const response = await fetch("https://web3forms.com", {
            method: "POST",
            body: formData
        });

        const result = await response.json();

        if (result.success) {
            statusMsg.innerHTML = `> Заявка успешно отправлена на почту! Я скоро свяжусь с вами.`;
            contactForm.reset();
        } else {
            statusMsg.innerHTML = `> Ошибка при отправке. Напишите мне напрямую в Telegram: <a href="https://t.me" target="_blank" style="color:#fff; text-decoration:underline;">@intwf</a>`;
        }
    } catch (error) {
        statusMsg.innerHTML = `> Нет соединения с сервером. Напишите в Telegram: <a href="https://t.me" target="_blank" style="color:#fff; text-decoration:underline;">@intwf</a>`;
    } finally {
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
    }
});
