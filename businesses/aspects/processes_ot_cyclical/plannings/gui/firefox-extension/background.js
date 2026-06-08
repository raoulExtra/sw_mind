async function sendToKilo(payload) {
  await fetch("http://localhost:8000/kilo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
}

browser.tabs.onUpdated.addListener(async (tabId, info, tab) => {
  if (info.status === "complete") {
    let result = await browser.tabs.sendMessage(tabId, { cmd: "extract" });
    sendToKilo(result);
  }
});