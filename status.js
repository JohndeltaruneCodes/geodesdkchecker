const statusElement = document.getElementById('status');
const targetUrl = 'https://api.geode-sdk.org'; // consider using a /health endpoint if available

async function checkStatus() {
  const url = targetUrl + '?_=' + Date.now(); // cache-buster

  // Try a HEAD request first (cheap). This requires the server to allow CORS for HEAD.
  try {
    const headResp = await fetch(url, {
      method: 'HEAD',
      cache: 'no-store',
      mode: 'cors'
    });

    if (headResp.ok) {
      statusElement.textContent = 'Online';
      statusElement.style.color = 'green';
      return;
    } else {
      // Server responded but not 2xx
      statusElement.textContent = 'Offline';
      statusElement.style.color = 'red';
      return;
    }
  } catch (headErr) {
    // Common reason: CORS blocked the request or network error.
    // Fallback: try a GET with no-cors mode to at least detect network connectivity.
    // Note: no-cors yields an "opaque" response; we cannot read status code.
    try {
      await fetch(url, {
        method: 'GET',
        cache: 'no-store',
        mode: 'no-cors'
      });
      // If fetch resolved (no network error), treat as online.
      statusElement.textContent = 'Online';
      statusElement.style.color = 'green';
      return;
    } catch (getErr) {
      // Network error / DNS failure / blocked by browser extension, etc.
      statusElement.textContent = 'Offline';
      statusElement.style.color = 'red';
      return;
    }
  }
}

// Run the check on load (and you can setInterval to poll)
checkStatus();
