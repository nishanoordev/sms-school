const VAPID_PUBLIC_KEY = 'BMKMMHIXgaz9QBGxf3GYx69BaousXnA8zuwFPq99cY5a40rU6EKnNC5wScU8IIBnOmjCsnNRb4ouTYoMDJL_fKg';

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

async function subscribeToPush() {
  if (!('serviceWorker' in navigator)) return;

  try {
    const registration = await navigator.serviceWorker.register('/sw.js');
    console.log('Service Worker registered');

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
    });

    await fetch('/api/notifications/subscribe', {
      method: 'POST',
      body: JSON.stringify(subscription),
      headers: { 'Content-Type': 'application/json' }
    });

    alert('Successfully subscribed to notifications!');
    document.getElementById('pushSubscribeBtn').textContent = 'Subscribed ✅';
    document.getElementById('pushSubscribeBtn').disabled = true;
  } catch (err) {
    console.error('Push subscription failed:', err);
    alert('Failed to subscribe to notifications.');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const subscribeBtn = document.getElementById('pushSubscribeBtn');
  if (subscribeBtn) {
    subscribeBtn.addEventListener('click', subscribeToPush);
  }

  // Check if already subscribed
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(reg => {
      reg.pushManager.getSubscription().then(sub => {
        if (sub && subscribeBtn) {
          subscribeBtn.textContent = 'Subscribed ✅';
          subscribeBtn.disabled = true;
        }
      });
    });
  }
});
