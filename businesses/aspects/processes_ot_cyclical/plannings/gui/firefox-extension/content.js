function extractVisible() {
  return {
    url: location.href,
    title: document.title,
    text: document.body.innerText,
    html: document.documentElement.outerHTML,
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight
    }
  };
}

browser.runtime.onMessage.addListener((msg) => {
  if (msg.cmd === "extract") {
    return Promise.resolve(extractVisible());
  }

  if (msg.cmd === "click") {
    let el = document.querySelector(msg.selector);
    if (el) {
      el.click();
      return Promise.resolve({ ok: true });
    }
    return Promise.resolve({ ok: false });
  }
});