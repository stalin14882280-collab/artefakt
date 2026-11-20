// Список реалистичных команд и строк кода для фона
const codeSnippets = [
    "$ git init && git add . && git commit -m 'Initial commit'",
    "const server = http.createServer((req, res) => { res.writeHead(200); });",
    "docker-compose up -d --build --force-recreate",
    "SELECT users.id, orders.total FROM users JOIN orders ON users.id = orders.user_id;",
    "npm install express mongoose dotenv cors helmet",
    "ssh root@192.168.1.1 -p 2222 -i ~/.ssh/id_rsa",
    "def optimize_algorithm(data): return [x**2 for x in data if x % 2 == 0]",
    "sudo systemctl restart nginx.service && sudo systemctl status nginx",
    "export default async function handler(req, res) { await dbConnect(); }",
    "chmod +x deploy.sh && ./deploy.sh --production",
    "kubectl get pods --all-namespaces | grep Running",
    "git push origin main --force-with-lease",
    "const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);",
    "curl -X POST https://service.com -H 'Content-Type: application/json'"
];

// Функция заполнения фона размытыми командами
function generateBackgroundCode() {
    const bgElement = document.getElementById('code-bg');
    let content = '';
    
    // Генерируем 80 строк случайных команд с отступами
    for (let i = 0; i < 80; i++) {
        const randomSnippet = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        const randomIndent = ' '.repeat(Math.floor(Math.random() * 15));
        content += `${randomIndent}${randomSnippet}\n`;
    }
    
    bgElement.textContent = content;
}

// Запускаем генерацию фона при загрузке страницы
generateBackgroundCode();

// Лёгкое "оживление" фона: каждые 3 секунды обновляем пару строк кода
setInterval(() => {
    const bgElement = document.getElementById('code-bg');
    const lines = bgElement.textContent.split('\n');
    const randomIndex = Math.floor(Math.random() * lines.length);
    const randomSnippet = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
    const randomIndent = ' '.repeat(Math.floor(Math.random() * 15));
    
    lines[randomIndex] = `${randomIndent}${randomSnippet}`;
    bgElement.textContent = lines.join('\n');
}, 3000);

// Обработка отправки формы
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Предотвращаем перезагрузку страницы
    
    const name = document.getElementById('name').value;
    const statusMsg = document.getElementById('form-status');
    
    // Имитация отправки данных
    statusMsg.textContent = `> Заявка принята, ${name}. Ожидайте ответа в ближайшее время...`;
    
    // Очистка полей формы
    this.reset();
});
