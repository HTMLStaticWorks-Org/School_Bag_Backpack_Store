const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const rootDir = 'c:\\Users\\prath\\OneDrive\\Desktop\\Websites\\Nov_1\\School Bag & Backpack Store';
const chrome = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const runnerHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Iframe 368px Tester</title>
  <style>
    body { margin: 0; padding: 0; background: #333; }
    iframe { width: 368px; height: 1200px; border: 1px solid red; display: block; }
  </style>
</head>
<body>
  <iframe id="testFrame" src="TEST_PAGE_URL"></iframe>
  <pre id="DIAG_RESULT"></pre>
  <script>
    const frame = document.getElementById('testFrame');
    frame.onload = () => {
      try {
        const doc = frame.contentDocument || frame.contentWindow.document;
        const win = frame.contentWindow;
        
        const res = {
          winInnerWidth: win.innerWidth,
          docScrollWidth: doc.documentElement.scrollWidth,
          bodyScrollWidth: doc.body.scrollWidth,
          overflowingElements: []
        };

        const all = doc.querySelectorAll('*');
        for (const el of all) {
          const rect = el.getBoundingClientRect();
          if (rect.right > win.innerWidth + 1) {
            res.overflowingElements.push({
              tag: el.tagName,
              id: el.id,
              className: el.className,
              rectRight: Math.round(rect.right),
              rectWidth: Math.round(rect.width),
              text: (el.textContent || '').trim().slice(0, 40)
            });
          }
        }
        document.getElementById('DIAG_RESULT').textContent = JSON.stringify(res, null, 2);
      } catch (err) {
        document.getElementById('DIAG_RESULT').textContent = JSON.stringify({ error: err.message });
      }
    };
  </script>
</body>
</html>`;

function testPage(pageName) {
  const runnerPath = path.join(__dirname, `runner_${pageName}`);
  const targetUrl = 'file:///' + path.join(rootDir, pageName).replace(/\\/g, '/');
  fs.writeFileSync(runnerPath, runnerHtml.replace('TEST_PAGE_URL', targetUrl), 'utf8');

  const out = execFileSync(chrome, [
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--allow-file-access-from-files',
    '--disable-web-security',
    '--dump-dom',
    'file:///' + runnerPath.replace(/\\/g, '/')
  ], { encoding: 'utf8', timeout: 15000 });

  const m = out.match(/<pre id="DIAG_RESULT">([\s\S]*?)<\/pre>/);
  if (m) {
    console.log(`=== ${pageName} @ 368px ===`);
    console.log(m[1]);
  } else {
    console.log(`=== ${pageName} @ 368px: No result ===`);
  }
}

testPage('index.html');
testPage('home-2.html');
testPage('products.html');

