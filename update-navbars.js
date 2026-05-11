const fs = require('fs');
const path = require('path');

const dir = '/Users/nishanoor/DEV/sms-school/public-website';

// Get all HTML files except notifications.html (we'll create that separately)
const files = fs.readdirSync(dir)
  .filter(f => f.endsWith('.html') && f !== 'notifications.html')
  .map(f => path.join(dir, f));

const bellHTML = `<div class="notif-bell-wrapper" id="notifBellWrapper">
                                  <button class="notif-bell-btn" id="notifBellBtn" aria-label="Notifications">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                                      <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                                    </svg>
                                    <span class="notif-badge" id="notifBadge" style="display:none;">0</span>
                                  </button>
                                  <div class="notif-dropdown" id="notifDropdown">
                                    <div class="notif-dropdown-header">
                                      <h5>Upcoming Events</h5>
                                      <a href="notifications.html" class="notif-view-all">View All &rarr;</a>
                                    </div>
                                    <div class="notif-dropdown-list" id="notifDropdownList">
                                      <p class="notif-loading" style="padding:16px;color:#999;text-align:center;font-size:13px;">Loading...</p>
                                    </div>
                                    <div class="notif-dropdown-footer">
                                      <a href="notifications.html" class="notif-footer-btn">Open Full Calendar</a>
                                    </div>
                                  </div>
                                </div>
                                `;

let totalChanged = 0;

files.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // 1. Add notifications.css after style.css (if not already present)
  if (!content.includes('notifications.css')) {
    content = content.replace(
      /(<link rel="stylesheet" href="assets\/css\/style\.css">)/,
      '$1\r\n    <!-- Notifications CSS -->\r\n    <link rel="stylesheet" href="assets/css/notifications.css">'
    );
    changed = true;
  }

  // 2. Add bell-notifications.js before </body> (if not already present)
  if (!content.includes('bell-notifications.js')) {
    content = content.replace(
      /(<\/body>)/,
      '    <!-- Bell Notifications JS -->\r\n    <script src="assets/js/bell-notifications.js"></script>\r\n$1'
    );
    changed = true;
  }

  // 3. MOBILE MENU: Remove Demo dropdown → direct link
  const mobileDemoDropdown = /<li class="menu-item-has-children">\s*<a href="index\.html">Demo<\/a>\s*<ul class="sub-menu">[\s\S]*?<\/ul>\s*<\/li>/;
  if (mobileDemoDropdown.test(content)) {
    content = content.replace(mobileDemoDropdown, '<li><a href="index.html">Demo</a></li>');
    changed = true;
  }

  // 4. MOBILE MENU: Remove Classes dropdown → direct link
  const mobileClassDropdown = /<li class="menu-item-has-children">\s*<a href="class\.html">Classes<\/a>\s*<ul class="sub-menu">[\s\S]*?<\/ul>\s*<\/li>/;
  if (mobileClassDropdown.test(content)) {
    content = content.replace(mobileClassDropdown, '<li><a href="class.html">Classes</a></li>');
    changed = true;
  }

  // 5. DESKTOP MENU: Remove Demo dropdown (about.html-style with 8 items in desktop nav)
  //    Pattern: <li class="menu-item-has-children"> with Demo href index.html
  const desktopDemoDropdown = /<li class="menu-item-has-children">\s*<a href="index\.html">Demo<\/a>\s*<ul class="sub-menu">\s*<li><a href="index\.html">Demo Style 1<\/a><\/li>[\s\S]*?<\/ul>\s*<\/li>/;
  if (desktopDemoDropdown.test(content)) {
    content = content.replace(desktopDemoDropdown, '<li><a href="index.html">Demo</a></li>');
    changed = true;
  }

  // 6. DESKTOP MENU: Remove Classes dropdown (about.html-style with Class Style 1, 2, Details)
  const desktopClassDropdown1 = /<li class="menu-item-has-children">\s*<a href="class\.html">Classes<\/a>\s*<ul class="sub-menu">\s*<li><a href="class\.html">Class Style 1<\/a><\/li>[\s\S]*?<\/ul>\s*<\/li>/;
  if (desktopClassDropdown1.test(content)) {
    content = content.replace(desktopClassDropdown1, '<li><a href="class.html">Classes</a></li>');
    changed = true;
  }

  // 7. DESKTOP MENU: Remove Classes dropdown (index.html-style with All Classes + Class Details)
  const desktopClassDropdown2 = /<li class="menu-item-has-children">\s*<a href="class\.html">Classes<\/a>\s*<ul class="sub-menu">\s*<li><a href="class\.html">All Classes<\/a><\/li>[\s\S]*?<\/ul>\s*<\/li>/;
  if (desktopClassDropdown2.test(content)) {
    content = content.replace(desktopClassDropdown2, '<li><a href="class.html">Classes</a></li>');
    changed = true;
  }

  // 8. Add bell icon to header-icons (if not already present)
  if (!content.includes('notifBellWrapper')) {
    content = content.replace(
      /(<div class="header-icons">)\s*(<button class="simple-icon sideMenuToggler">)/,
      `$1\r\n                                ${bellHTML}$2`
    );
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    totalChanged++;
    console.log('Updated:', path.basename(filePath));
  } else {
    console.log('Skipped (no changes):', path.basename(filePath));
  }
});

console.log(`\nDone! Updated ${totalChanged} files.`);
