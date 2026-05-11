// Bell icon quick-preview dropdown
async function loadNavNotifications() {
  try {
    var res = await fetch('/api/calendar-events');
    var events = await res.json();
    var today = new Date();
    var upcoming = events
      .filter(function(e) { return new Date(e.date) >= today; })
      .sort(function(a, b) { return new Date(a.date) - new Date(b.date); })
      .slice(0, 5);

    var badge = document.getElementById('notifBadge');
    var list  = document.getElementById('notifDropdownList');
    if (!badge || !list) return;

    if (upcoming.length > 0) {
      badge.textContent = upcoming.length;
      badge.style.display = 'flex';
    }

    if (upcoming.length === 0) {
      list.innerHTML = '<p style="padding:16px;color:#999;text-align:center;font-size:13px;">No upcoming events</p>';
      return;
    }

    list.innerHTML = upcoming.map(function(event) {
      var date = new Date(event.date);
      var cat  = (event.category || 'other').toLowerCase();
      var day  = date.getDate();
      var mon  = date.toLocaleString('default', { month: 'short' });
      return [
        '<div class="notif-item">',
        '  <div class="notif-item-date-box">',
        '    <span class="day">' + day + '</span>',
        '    <span class="month">' + mon + '</span>',
        '  </div>',
        '  <div class="notif-item-body">',
        '    <p class="notif-item-title">' + event.title + '</p>',
        '    <span class="notif-item-category cat-' + cat + '">' + (event.category || 'Other') + '</span>',
        '  </div>',
        '</div>'
      ].join('');
    }).join('');
  } catch (err) {
    console.error('Bell notification error:', err);
  }
}

// Toggle dropdown open/close
document.addEventListener('DOMContentLoaded', function() {
  var btn      = document.getElementById('notifBellBtn');
  var dropdown = document.getElementById('notifDropdown');
  if (!btn || !dropdown) return;

  btn.addEventListener('click', function(e) {
    e.stopPropagation();
    dropdown.classList.toggle('open');
  });

  document.addEventListener('click', function() {
    dropdown.classList.remove('open');
  });

  dropdown.addEventListener('click', function(e) { e.stopPropagation(); });

  loadNavNotifications();
});
