import fs from 'fs/promises';
import path from 'path';

const appRoot = path.resolve(process.cwd(), 'simple-js-app');

const files = {
  'package.json': `{
  "name": "simple-js-app",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "start": "node server.js",
    "dev": "npx live-server --port=3000 --open=./index.html"
  }
}
`,

  'index.html': `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Simple JS App</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <div class="app">
      <h1>Simple JavaScript App</h1>
      <p id="status">Loading...</p>
      <button id="actionButton">Click me</button>
    </div>
    <script type="module" src="app.js"></script>
  </body>
</html>
`,

  'styles.css': `.app {
  max-width: 640px;
  margin: 4rem auto;
  padding: 2rem;
  border-radius: 16px;
  background: #ffffff;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  font-family: Arial, sans-serif;
  text-align: center;
}

body {
  margin: 0;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #3b82f6, #9333ea);
  color: #111827;
}

button {
  margin-top: 1.5rem;
  padding: 0.9rem 1.8rem;
  border: none;
  border-radius: 9999px;
  background: #2563eb;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.2s ease, background 0.2s ease;
}

button:hover {
  transform: translateY(-2px);
  background: #1d4ed8;
}
`,

  'app.js': `const statusElement = document.getElementById('status');
const actionButton = document.getElementById('actionButton');

function updateStatus(message) {
  if (statusElement) {
    statusElement.textContent = message;
  }
}

function handleButtonClick() {
  updateStatus('Button clicked! Welcome to your JavaScript app.');
}

updateStatus('App is ready. Click the button below.');

if (actionButton) {
  actionButton.addEventListener('click', handleButtonClick);
}
`,

  'server.js': `import fs from 'fs';
import path from 'path';
import http from 'http';

const port = 3000;
const root = process.cwd();

const contentTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
};

http.createServer((req, res) => {
  const requestedPath = req.url === '/' ? '/index.html' : req.url;
  const fullPath = path.resolve(root, requestedPath.slice(1));

  fs.readFile(fullPath, (error, content) => {
    if (error) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not found');
      return;
    }

    const ext = path.extname(fullPath);
    res.writeHead(200, { 'Content-Type': contentTypes[ext] || 'application/octet-stream' });
    res.end(content);
  });
}).listen(port, () => {
  console.log('Server running at http://localhost:' + port);
});
`,

  'README.md': `# Simple JavaScript App



## Run locally

1. Install dependencies:
   \`npm install\`
2. Start the local server:
   \`npm run dev\`
3. Open \`http://localhost:3000\`
`,

  '.gitignore': `node_modules
.DS_Store
`,
};

async function createApp() {
  try {
    await fs.mkdir(appRoot, { recursive: true });

    for (const [filename, content] of Object.entries(files)) {
      await fs.writeFile(path.join(appRoot, filename), content, 'utf8');
    }

    console.log(`Created app at ${appRoot}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

createApp();
