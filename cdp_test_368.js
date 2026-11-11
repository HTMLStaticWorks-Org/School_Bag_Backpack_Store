const { spawn } = require('child_process');
const http = require('http');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const rootDir = 'c:\\Users\\prath\\OneDrive\\Desktop\\Websites\\Nov_1\\School Bag & Backpack Store';

async function main() {
  const tmpProfile = path.join(__dirname, 'chrome_tmp_profile');
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--user-data-dir=' + tmpProfile,
    '--disable-gpu',
    '--no-sandbox',
    '--disable-web-security',
    '--allow-file-access-from-files'
  ]);

  // wait for port 9222
  let wsUrl = '';
  for (let i = 0; i < 30; i++) {
    await new Promise(r => setTimeout(r, 200));
    try {
      const data = await new Promise((resolve, reject) => {
        http.get('http://127.0.0.1:9222/json/version', res => {
          let buf = '';
          res.on('data', d => buf += d);
          res.on('end', () => resolve(JSON.parse(buf)));
        }).on('error', reject);
      });
      wsUrl = data.webSocketDebuggerUrl;
      break;
    } catch (e) {}
  }

  if (!wsUrl) {
    console.error('Failed to get wsUrl');
    chrome.kill();
    return;
  }

  console.log('Connected to Chrome CDP:', wsUrl);

  const ws = new WebSocket(wsUrl);
  let id = 1;
  const callbacks = new Map();

  ws.onmessage = (evt) => {
    const msg = JSON.parse(evt.data);
    if (msg.id && callbacks.has(msg.id)) {
      callbacks.get(msg.id)(msg);
      callbacks.delete(msg.id);
    }
  };

  await new Promise(r => ws.onopen = r);

  function send(method, params = {}) {
    return new Promise(resolve => {
      const msgId = id++;
      callbacks.set(msgId, resolve);
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }

  // Create new target
  const target = await send('Target.createTarget', { url: 'about:blank' });
  const targetWs = new WebSocket(`ws://127.0.0.1:9222/devtools/page/${target.result.targetId}`);
  await new Promise(r => targetWs.onopen = r);

  let targetIdCounter = 1;
  const targetCallbacks = new Map();
  targetWs.onmessage = (evt) => {
    const msg = JSON.parse(evt.data);
    if (msg.id && targetCallbacks.has(msg.id)) {
      targetCallbacks.get(msg.id)(msg);
      targetCallbacks.delete(msg.id);
    }
  };

  function sendPage(method, params = {}) {
    return new Promise(resolve => {
      const msgId = targetIdCounter++;
      targetCallbacks.set(msgId, resolve);
      targetWs.send(JSON.stringify({ id: msgId, method, params }));
    });
  }

  await sendPage('Page.enable');
  await sendPage('Emulation.setDeviceMetricsOverride', {
    width: 368,
    height: 800,
    deviceScaleFactor: 1,
    mobile: true
  });

  async function audit(url, label) {
    console.log(`\n================ AUDITING ${label} @ 368px ================`);
    await sendPage('Page.navigate', { url });
    await new Promise(r => setTimeout(r, 1500));

    const evalRes = await sendPage('Runtime.evaluate', {
      expression: `(() => {
        const vw = window.innerWidth;
        const scrollW = document.documentElement.scrollWidth;
        const bodyScrollW = document.body.scrollWidth;

        const overflowing = [];
        const all = document.querySelectorAll('*');
        for (const el of all) {
          const style = window.getComputedStyle(el);
          if (style.display === 'none' || style.visibility === 'hidden') continue;
          // check if offcanvas drawer
          if (el.closest('.mobile-nav-drawer, .enquiry-cart-drawer, .modal')) continue;

          const r = el.getBoundingClientRect();
          if (r.width === 0 && r.height === 0) continue;
          if (r.right > vw + 1) {
            overflowing.push({
              tag: el.tagName,
              cls: el.className,
              id: el.id,
              left: Math.round(r.left),
              right: Math.round(r.right),
              width: Math.round(r.width),
              text: el.textContent.trim().slice(0, 35)
            });
          }
        }

        // Check hero buttons
        const heroBtns = [];
        const hero = document.querySelector('.hero-section, .h2-hero-section');
        if (hero) {
          const btns = hero.querySelectorAll('a, button');
          for (const b of btns) {
            const r = b.getBoundingClientRect();
            heroBtns.push({
              tag: b.tagName,
              cls: b.className,
              text: b.textContent.trim().slice(0, 30),
              left: Math.round(r.left),
              right: Math.round(r.right),
              top: Math.round(r.top),
              bottom: Math.round(r.bottom),
              width: Math.round(r.width),
              height: Math.round(r.height),
              visibleInVw: r.left >= 0 && r.right <= vw
            });
          }
        }

        return {
          vw,
          scrollW,
          bodyScrollW,
          heroBtns,
          topOverflowing: overflowing.slice(0, 20)
        };
      })()`,
      returnByValue: true
    });

    console.log(JSON.stringify(evalRes.result.value, null, 2));
  }

  await audit(`file:///${rootDir.replace(/\\/g, '/')}/index.html`, 'INDEX.HTML');
  await audit(`file:///${rootDir.replace(/\\/g, '/')}/home-2.html`, 'HOME-2.HTML');
  await audit(`file:///${rootDir.replace(/\\/g, '/')}/products.html`, 'PRODUCTS.HTML');

  chrome.kill();
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
