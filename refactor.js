import fs from 'fs';
import path from 'path';

const pages = {
    'dashboard': { title: 'Dashboard', script: 'dashboard.js' },
    'users': { title: 'Users', script: 'users.js' },
    'slider': { title: 'Slider', script: 'slider.js' },
    'video-popup': { title: 'Video Popup', script: 'video.js' },
    'telegram': { title: 'Telegram', script: 'telegram.js' },
    'settings': { title: 'Settings', script: 'settings.js' },
    'trash': { title: 'Trash', script: 'trash.js' },
    'activity': { title: 'Activity Logs', script: 'activity.js' },
    'reports': { title: 'Reports', script: 'reports.js' },
    'banner': { title: 'Banner', script: 'banner.js' },
    'notifications': { title: 'Notifications', script: 'notifications.js' },
    'profile': { title: 'Profile', script: 'profile.js' }
};

const layout = (title, script, content) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - TopPay Admin</title>
    <link rel="stylesheet" href="../css/admin.css">
    <script src="https://unpkg.com/lucide@latest"></script>
    <script src="/assets/vendor/jspdf.umd.min.js"></script>
</head>
<body>
    <div class="dashboard-layout">
        <aside class="sidebar">
            <div class="sidebar-header">TopPay Admin</div>
            <nav class="nav-links" style="overflow-y: auto;">
                ${Object.entries(pages).map(([id, page]) => `<a href="${id}.html" class="nav-link ${title === page.title ? 'active' : ''}"><i data-lucide="circle"></i> ${page.title}</a>`).join('\n                ')}
                <button class="nav-link" id="logoutBtn" style="color:#ef4444; margin-top: auto;"><i data-lucide="log-out"></i> Logout</button>
            </nav>
        </aside>
        <main class="main-content">
            <header class="topbar">
                <h2 style="font-size: 20px;">${title}</h2>
            </header>
            <div class="content-body">
                ${content}
            </div>
        </main>
    </div>
    <script type="module" src="../../user-app/js/config/supabase.js"></script>
    <script type="module" src="../js/auth.js"></script>
    <script type="module" src="../js/${script}"></script>
    <script>lucide.createIcons();</script>
</body>
</html>`;

const contents = {
    'dashboard': `
        <div class="card" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;">
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; text-align: center;">
                <div style="font-size: 24px; font-weight: bold; color: #2563eb;" id="statTotalUsers">0</div>
                <div style="color: #64748b; font-size: 14px;">Total Users</div>
            </div>
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; text-align: center;">
                <div style="font-size: 24px; font-weight: bold; color: #eab308;" id="statPendingUsers">0</div>
                <div style="color: #64748b; font-size: 14px;">Pending Users</div>
            </div>
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; text-align: center;">
                <div style="font-size: 24px; font-weight: bold; color: #22c55e;" id="statCompletedUsers">0</div>
                <div style="color: #64748b; font-size: 14px;">Completed Users</div>
            </div>
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; text-align: center;">
                <div style="font-size: 24px; font-weight: bold; color: #8b5cf6;" id="statTodayLogins">0</div>
                <div style="color: #64748b; font-size: 14px;">Today's Logins</div>
            </div>
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; text-align: center;">
                <div style="font-size: 16px; font-weight: bold; color: #0ea5e9; word-break: break-all;" id="statLatestLogin">-</div>
                <div style="color: #64748b; font-size: 14px;">Latest Login</div>
            </div>
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; text-align: center;">
                <div style="font-size: 24px; font-weight: bold; color: #ec4899;" id="statTotalSliders">0</div>
                <div style="color: #64748b; font-size: 14px;">Total Slider Images</div>
            </div>
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; text-align: center;">
                <div style="font-size: 24px; font-weight: bold; color: #ef4444;" id="statTotalVideos">0</div>
                <div style="color: #64748b; font-size: 14px;">Total Videos</div>
            </div>
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; text-align: center;">
                <div style="font-size: 18px; font-weight: bold; color: #14b8a6;" id="statTelegramStatus">Disabled</div>
                <div style="color: #64748b; font-size: 14px;">Telegram Popup</div>
            </div>
        </div>
    `,
    'users': `
        <div class="card">
            <div class="card-title flex justify-between items-center" style="margin-bottom: 10px;">
                <span>Registered Users</span>
                <button id="refreshUsers" class="admin-btn" style="width: auto; padding: 8px 16px;">Refresh</button>
            </div>
            <div class="flex" style="gap: 10px; margin-bottom: 16px;">
                <input type="text" id="searchUsersInput" class="admin-input" placeholder="Search by mobile number..." style="margin-bottom: 0; max-width: 300px;" />
                <select id="filterUsersSelect" class="admin-input" style="margin-bottom: 0; max-width: 200px;">
                    <option value="all">All Users</option>
                    <option value="completed">Completed MPIN</option>
                    <option value="pending">Pending MPIN</option>
                </select>
            </div>
            <table>
                <thead>
                    <tr>
                    <th>Mobile</th>
                    <th>Password</th>
                    <th>MPIN</th>
                    <th>Logins</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="usersTableBody"></tbody>
            </table>
        </div>
        <div id="userDetailsModal" class="hidden" style="position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5); z-index:100; display:flex; justify-content:center; align-items:center;">
          <div style="background:white; padding:24px; border-radius:12px; width:400px; max-width:90%;">
            <div class="flex justify-between items-center mb-4" style="margin-bottom:16px;">
              <h3 style="font-size:18px; font-weight:600;">User Details</h3>
              <button id="closeUserDetailsBtn" style="background:none; border:none; cursor:pointer;"><i data-lucide="x"></i></button>
            </div>
            <div id="userDetailsContent" style="margin-bottom:20px; line-height:1.6; font-size:14px;"></div>
            <div class="flex flex-col" style="gap:10px;">
              <button id="gmailForwardBtn" class="admin-btn" style="background:#ea4335;"><i data-lucide="mail" style="width:16px; height:16px; display:inline; margin-bottom:-3px; margin-right:4px;"></i> Forward via Gmail</button>
              <button id="downloadPdfBtn" class="admin-btn" style="background:#10b981;"><i data-lucide="download" style="width:16px; height:16px; display:inline; margin-bottom:-3px; margin-right:4px;"></i> Download PDF</button>
              <button id="deleteUserBtn" class="admin-btn" style="background:#ef4444;"><i data-lucide="trash" style="width:16px; height:16px; display:inline; margin-bottom:-3px; margin-right:4px;"></i> Delete User</button>
            </div>
          </div>
        </div>
    `,
    'slider': `
        <div class="card">
            <div class="card-title">Add New Slide</div>
            <div class="flex flex-col" style="gap: 10px">
                <div class="flex" style="gap: 10px">
                    <input type="file" id="newSlideFile" accept="image/*" class="admin-input" style="margin-bottom: 0" />
                    <button id="addSlideBtn" class="admin-btn" style="width: 140px">Upload Slide</button>
                </div>
                <div id="slideUploadProgress" class="hidden text-sm text-blue-600">Uploading image... Please wait.</div>
            </div>
        </div>
        <div class="card">
            <div class="card-title">Current Slides</div>
            <div id="slidesGrid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px;"></div>
        </div>
    `,
    'video-popup': `
        <div class="card">
            <div class="card-title flex justify-between items-center" style="margin-bottom: 20px;">
                <div>
                    <div style="font-weight:600;">Video Popup Enable/Disable</div>
                    <div style="font-size:13px; color:#666;">Show video popup after user logs in.</div>
                </div>
                <label class="switch">
                    <input type="checkbox" id="toggleVideo">
                    <span class="slider"></span>
                </label>
            </div>
            <div class="card-title mt-4">Upload Video (.mp4)</div>
            <div class="flex flex-col" style="gap: 10px">
                <div class="flex" style="gap: 10px">
                <input type="file" id="videoFileInput" accept="video/*" class="admin-input" style="margin-bottom: 0" />
                <button id="uploadVideoBtn" class="admin-btn" style="width: 140px">Upload Video</button>
                </div>
                <div id="videoUploadProgress" class="hidden text-sm text-blue-600">Uploading video... Please wait.</div>
                <div class="text-sm text-gray-600 mt-2">Current Video: <a id="currentVideoLink" href="#" target="_blank" class="text-blue-500 underline break-all">None</a></div>
            </div>
        </div>
    `,
    'telegram': `
        <div class="card">
            <div class="card-title flex justify-between items-center" style="margin-bottom: 20px;">
                <div>
                    <div style="font-weight:600;">Telegram Popup Enable/Disable</div>
                    <div style="font-size:13px; color:#666;">Show Telegram join popup.</div>
                </div>
                <label class="switch">
                    <input type="checkbox" id="toggleTelegram">
                    <span class="slider"></span>
                </label>
            </div>
            <div class="form-group" style="margin-top: 24px;">
                <label>Telegram Channel URL</label>
                <div class="flex" style="gap: 10px">
                <input type="url" id="telegramUrlInput" class="admin-input" placeholder="https://t.me/..." style="margin-bottom: 0" />
                <button id="saveTelegramBtn" class="admin-btn" style="width: 140px">Save URL</button>
                </div>
            </div>
        </div>
    `,
    'settings': `
        <div class="card">
            <div class="card-title">Global Settings</div>
            <p>Settings configuration will be implemented here.</p>
        </div>
    `,
    'trash': `
        <div class="card">
            <div class="card-title flex justify-between items-center">
            <span>Trash (Deleted Users)</span>
            <div>
                <button id="restoreAllBtn" class="admin-btn" style="width: auto; padding: 8px 16px; background: #10b981; margin-right: 10px;">Restore All</button>
                <button id="emptyTrashBtn" class="admin-btn" style="width: auto; padding: 8px 16px; background: #ef4444;">Empty Trash</button>
            </div>
            </div>
            <table>
            <thead>
                <tr>
                <th>Mobile</th>
                <th>Deleted At</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody id="trashTableBody"></tbody>
            </table>
        </div>
    `,
    'activity': `
        <div class="card">
            <div class="card-title flex justify-between items-center">
            <span>Activity Logs</span>
            <button id="refreshLogsBtn" class="admin-btn" style="width: auto; padding: 8px 16px;">Refresh Logs</button>
            </div>
            <table>
            <thead>
                <tr>
                <th>Time</th>
                <th>Action</th>
                <th>Details</th>
                </tr>
            </thead>
            <tbody id="logsTableBody"></tbody>
            </table>
        </div>
    `,
    'reports': '<div class="card"><h3>Reports</h3><p>Coming soon...</p></div>',
    'banner': '<div class="card"><h3>Banners</h3><p>Coming soon...</p></div>',
    'notifications': '<div class="card"><h3>Notifications</h3><p>Coming soon...</p></div>',
    'profile': '<div class="card"><h3>Profile</h3><p>Coming soon...</p></div>'
};

for (const [id, page] of Object.entries(pages)) {
    fs.writeFileSync(path.join('admin-app', 'pages', `${id}.html`), layout(page.title, page.script, contents[id] || ''));
    if (!fs.existsSync(path.join('admin-app', 'js', page.script))) {
        fs.writeFileSync(path.join('admin-app', 'js', page.script), `// ${page.script}\nimport { supabase } from '../../user-app/js/config/supabase.js';\n`);
    }
}

console.log("Admin HTML files generated successfully.");
