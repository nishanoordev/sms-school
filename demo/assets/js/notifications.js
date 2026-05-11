var allEvents = [];
var currentFilter = 'all';
var selectedDate = null;
var calendarDate = new Date();

async function initNotificationsPage() {
  await fetchEvents();
  renderMiniCalendar();
  renderEventsList();
  setupFilters();
}

async function fetchEvents() {
  try {
    var res = await fetch('/api/calendar-events');
    allEvents = await res.json();
  } catch (err) {
    console.error('Failed to fetch events:', err);
    allEvents = [];
  }
}

function getFilteredEvents() {
  var now = new Date();
  var events = allEvents.filter(function(e) { return new Date(e.date) >= now; });
  if (currentFilter !== 'all') {
    events = events.filter(function(e) {
      return (e.category || '').toLowerCase() === currentFilter;
    });
  }
  if (selectedDate) {
    events = events.filter(function(e) {
      var d = new Date(e.date);
      return d.getFullYear() === selectedDate.getFullYear() &&
             d.getMonth()    === selectedDate.getMonth() &&
             d.getDate()     === selectedDate.getDate();
    });
  }
  return events.sort(function(a, b) { return new Date(a.date) - new Date(b.date); });
}

function renderMiniCalendar() {
  var cal   = document.getElementById('miniCalendar');
  if (!cal) return;
  var year  = calendarDate.getFullYear();
  var month = calendarDate.getMonth();
  var today = new Date();
  var firstDay    = new Date(year, month, 1).getDay();
  var daysInMonth = new Date(year, month + 1, 0).getDate();
  var monthName   = calendarDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  var eventDates = new Set(
    allEvents
      .filter(function(e) {
        var d = new Date(e.date);
        return d.getFullYear() === year && d.getMonth() === month;
      })
      .map(function(e) { return new Date(e.date).getDate(); })
  );

  var dayNames = ['Su','Mo','Tu','We','Th','Fr','Sa'];
  var html = '<div class="mini-cal-header">' +
    '<button class="mini-cal-nav" id="calPrev">&#8249;</button>' +
    '<h4>' + monthName + '</h4>' +
    '<button class="mini-cal-nav" id="calNext">&#8250;</button>' +
    '</div><div class="mini-cal-grid">';

  dayNames.forEach(function(d) { html += '<div class="mini-cal-day-name">' + d + '</div>'; });
  for (var i = 0; i < firstDay; i++) { html += '<div class="mini-cal-date empty"></div>'; }

  for (var d = 1; d <= daysInMonth; d++) {
    var isToday = today.getFullYear() === year && today.getMonth() === month && today.getDate() === d;
    var hasEvent = eventDates.has(d);
    var isSel = selectedDate &&
      selectedDate.getFullYear() === year &&
      selectedDate.getMonth()    === month &&
      selectedDate.getDate()     === d;
    var cls = ['mini-cal-date', isToday?'today':'', hasEvent?'has-event':'', isSel?'selected':'']
                .filter(Boolean).join(' ');
    html += '<div class="' + cls + '" data-y="' + year + '" data-m="' + (month+1) + '" data-d="' + d + '">' + d + '</div>';
  }
  html += '</div>';
  cal.innerHTML = html;

  document.getElementById('calPrev').addEventListener('click', function() {
    calendarDate.setMonth(calendarDate.getMonth() - 1);
    renderMiniCalendar();
  });
  document.getElementById('calNext').addEventListener('click', function() {
    calendarDate.setMonth(calendarDate.getMonth() + 1);
    renderMiniCalendar();
  });

  cal.querySelectorAll('.mini-cal-date:not(.empty)').forEach(function(el) {
    el.addEventListener('click', function() {
      var y = parseInt(el.dataset.y), m = parseInt(el.dataset.m), day = parseInt(el.dataset.d);
      selectedDate = new Date(y, m - 1, day);
      var heading = document.getElementById('eventsHeading');
      if (heading) heading.textContent = 'Events on ' + selectedDate.toDateString();
      renderMiniCalendar();
      renderEventsList();
    });
  });
}

function renderEventsList() {
  var list  = document.getElementById('notifEventsList');
  var count = document.getElementById('eventsCount');
  if (!list) return;
  var events = getFilteredEvents();
  if (count) count.textContent = events.length + ' event' + (events.length !== 1 ? 's' : '');

  if (events.length === 0) {
    list.innerHTML = '<div class="notif-empty">' +
      '<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">' +
      '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>' +
      '<path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>' +
      '<p>No events found for this selection.</p></div>';
    return;
  }

  list.innerHTML = events.map(function(event) {
    var date = new Date(event.date);
    var cat  = (event.category || 'other').toLowerCase();
    var time = '';
    if (event.date && event.date.indexOf('T') !== -1) {
      time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    return '<div class="event-card" data-category="' + cat + '">' +
      '<div class="event-card-date">' +
        '<div class="big-day">' + date.getDate() + '</div>' +
        '<div class="big-month">' + date.toLocaleString('default',{month:'short'}) + '</div>' +
        '<div class="big-year">' + date.getFullYear() + '</div>' +
      '</div>' +
      '<div class="event-card-divider"></div>' +
      '<div class="event-card-body">' +
        '<div class="event-card-top">' +
          '<h4 class="event-card-title">' + event.title + '</h4>' +
          '<span class="notif-item-category cat-' + cat + '">' + (event.category || 'Other') + '</span>' +
        '</div>' +
        (event.description ? '<p class="event-card-desc">' + event.description + '</p>' : '') +
        (time ? '<p class="event-card-time">&#128336; ' + time + '</p>' : '') +
      '</div></div>';
  }).join('');
}

function setupFilters() {
  document.querySelectorAll('.filter-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.filter-btn').forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      selectedDate  = null;
      var heading = document.getElementById('eventsHeading');
      if (heading) heading.textContent = 'All Upcoming Events';
      renderMiniCalendar();
      renderEventsList();
    });
  });
}

document.addEventListener('DOMContentLoaded', initNotificationsPage);
