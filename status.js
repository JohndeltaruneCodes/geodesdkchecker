const statusElement = document.getElementById('status');
const img = document.getElementById('status-checker-img');
const targetUrl = 'http://example.com/favicon.ico'; // Use a small, public file

img.onload = function() {
    statusElement.textContent = 'Online';
    statusElement.style.color = 'green';
};

img.onerror = function() {
    statusElement.textContent = 'Offline';
    statusElement.style.color = 'red';
};

// Add a random query parameter to prevent caching
img.src = targetUrl + '?' + new Date().getTime();
