import React from 'react';

import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
const Image = ({ unoptimized, priority, ...props }: any) => <img {...props} />;

import './admin.css';
import {
  ImagePlus,
  LayoutDashboard,
  LockKeyhole,
  LogOut,
  Mail,
  Megaphone,
  Menu,
  MessageCircle,
  MonitorSmartphone,
  MonitorPlay,
  RefreshCw,
  RotateCcw,
  ShieldCheck,
  Trash2,
  UserRound,
  UsersRound,
  X,
} from 'lucide-react';
import { Switch } from './Switch';
import {
  APP_CHANNEL,
  DEFAULT_SETTINGS,
  SETTINGS_KEY,
  saveSettings,
  createLocalId,
  type AppSettings,
  type MediaKind,
  type UserRecord,
} from './store';

type Section =
  | 'users'
  | 'trash'
  | 'dashboard'
  | 'slides'
  | 'banner'
  | 'telegram'
  | 'media'
  | 'profile';
type PopupName = 'banner' | 'telegram' | 'media';
type AdminDevice = {
  id: string;
  label: string;
  ip: string;
  trusted: boolean;
  current: boolean;
  createdAt: number;
  lastSeenAt: number;
};
type ModelContext = {
  registerTool: (
    tool: {
      name: string;
      title: string;
      description: string;
      inputSchema: object;
      annotations: { readOnlyHint: boolean; untrustedContentHint: boolean };
      execute: (input: unknown) => Promise<unknown>;
    },
    options: { signal: AbortSignal },
  ) => void | Promise<void>;
};

const NAV: { key: Section; label: string; icon: typeof UsersRound }[] = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'users', label: 'Users', icon: UsersRound },
  { key: 'slides', label: 'Slides', icon: ImagePlus },
  { key: 'banner', label: 'Banner popup', icon: Megaphone },
  { key: 'trash', label: 'Trash', icon: Trash2 },
  { key: 'telegram', label: 'Telegram popup', icon: MessageCircle },
  { key: 'media', label: 'Media popup', icon: MonitorPlay },
  { key: 'profile', label: 'Profile', icon: UserRound },
];

const readJson = <T,>(key: string, fallback: T): T => {
  try {
    return JSON.parse(window.localStorage.getItem(key) || '') as T;
  } catch {
    return fallback;
  }
};

export default function TopPayAdmin() {
  const [signedIn, setSignedIn] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [section, setSectionState] = useState<Section>(() => (localStorage.getItem('admin_section') as Section) || 'users');
  const setSection = (s: Section) => { setSectionState(s); localStorage.setItem('admin_section', s); };
  const [menuOpen, setMenuOpen] = useState(false);
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const settingsRef = useRef<AppSettings>(DEFAULT_SETTINGS);
  const settingsQueue = useRef<Promise<void>>(Promise.resolve());
  const pendingSettings = useRef(0);
  const settingsGeneration = useRef(0);
  const confirmedRevision = useRef(-1);
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [trash, setTrash] = useState<UserRecord[]>([]);
  const [notice, setNotice] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [adminDevices, setAdminDevices] = useState<AdminDevice[]>([]);
  const [deviceLimit, setDeviceLimit] = useState(6);
  const [deviceBusy, setDeviceBusy] = useState('');

  const flash = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(''), 2200);
  };

  function persistSettings(next: AppSettings) {
    const generation = ++settingsGeneration.current;
    pendingSettings.current += 1;
    settingsRef.current = next;
    setSettings(next);
    const saved = settingsQueue.current
      .then(async () => {
        // Simulate network delay
        await new Promise(r => setTimeout(r, 200));
        saveSettings(next);
        if (generation === settingsGeneration.current) {
          flash('Saved');
        }
      })
      .finally(() => {
        pendingSettings.current -= 1;
      });
    settingsQueue.current = saved.catch(() => undefined);
    return saved;
  }

  useEffect(() => {
    queueMicrotask(() => {
      setSettings({
        ...DEFAULT_SETTINGS,
        ...readJson<AppSettings>(SETTINGS_KEY, DEFAULT_SETTINGS),
      });
    });
    void fetch('/api/admin-app/admin/session', { cache: 'no-store' })
      .then(async (response) => {
        const result = (await response.json()) as { authenticated?: boolean };
        setSignedIn(Boolean(result.authenticated));
      })
      .catch(() => setSignedIn(false))
      .finally(() => setAuthChecked(true));
  }, []);

  useEffect(() => {
    if (!signedIn) return;
    let stopped = false;
    let refreshing = false;
    const refresh = async () => {
      if (refreshing) return;
      refreshing = true;
      const generation = settingsGeneration.current;
      try {
        const SUPABASE_URL = "https://kxsgjfvtfmbruddeolbt.supabase.co/rest/v1";
        const SUPABASE_KEY = "sb_publishable__asg5eO_X6CrsIp9DXO2bQ_H0Gr5c-j";
        const supabaseHeaders = {
          "Content-Type": "application/json",
          "apikey": SUPABASE_KEY,
          "Authorization": `Bearer ${SUPABASE_KEY}`
        };

        const uRes = await fetch(`${SUPABASE_URL}/users?select=*&order=created_at.desc`, { headers: supabaseHeaders });
        if (uRes.ok) {
          const uData = await uRes.json();
          // Map to local UserRecord format if needed: id, phone (from mobile), password, mpin, status, lastLogin (from last_login)
          const mappedUsers = uData.map((u: any) => ({
            id: u.id,
            phone: u.mobile,
            password: u.password,
            mpin: u.mpin,
            status: u.status,
            lastLogin: u.last_login
          }));
          setUsers(mappedUsers);
        }
        
        setTrash(JSON.parse(localStorage.getItem('toppay.admin.trash') || '[]'));
      } catch {
      } finally {
        refreshing = false;
      }
    };
    void refresh();
    const channel = new BroadcastChannel(APP_CHANNEL);
    channel.onmessage = () => void refresh();
    const handleRefresh = () => void refresh();
    const poll = window.setInterval(handleRefresh, 10000);
    window.addEventListener('storage', handleRefresh);
    return () => {
      stopped = true;
      channel.close();
      window.clearInterval(poll);
      window.removeEventListener('storage', handleRefresh);
    };
  }, [signedIn]);

  useEffect(() => { if (signedIn && section === 'profile') void refreshDevices(); }, [signedIn, section]);

  useEffect(() => {
    if (!signedIn) return;
    const modelContext = (
      document as Document & { modelContext?: ModelContext }
    ).modelContext;
    if (!modelContext?.registerTool) return;
    const lifecycle = new AbortController();
    const register = modelContext.registerTool(
      {
        name: 'set_toppay_popup_visibility',
        title: 'Set TopPay popup visibility',
        description:
          'Turn the TopPay banner, Telegram, or media popup on or off and save it in this local admin panel.',
        inputSchema: {
          type: 'object',
          properties: {
            popup: { type: 'string', enum: ['banner', 'telegram', 'media'] },
            enabled: { type: 'boolean' },
          },
          required: ['popup', 'enabled'],
          additionalProperties: false,
        },
        annotations: { readOnlyHint: false, untrustedContentHint: false },
        async execute(input) {
          const value = input as { popup?: PopupName; enabled?: boolean };
          if (
            !['banner', 'telegram', 'media'].includes(String(value.popup)) ||
            typeof value.enabled !== 'boolean'
          )
            throw new Error('A valid popup and enabled value are required.');
          const current = settingsRef.current;
          const next = {
            ...current,
            [value.popup!]: {
              ...current[value.popup!],
              enabled: value.enabled,
            },
          } as AppSettings;
          await persistSettings(next);
          return { popup: value.popup, enabled: value.enabled, synced: true };
        },
      },
      { signal: lifecycle.signal },
    );
    void Promise.resolve(register).catch(() => undefined);
    return () => lifecycle.abort();
  }, [signedIn]);

  const signIn = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBusy(true);
    setError('');
    try {
      const response = await fetch('/api/admin-app/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const result = (await response.json()) as {
        error?: string;
        retryAfter?: number;
      };
      if (!response.ok) {
        setError(result.error || 'Sign in failed');
        return;
      }
      setSignedIn(true);
      setSection('users');
      setPassword('');
    } catch {
      setError('Could not reach the secure login service');
    } finally {
      setBusy(false);
    }
  };

  const signOut = () => {
    void fetch('/api/admin-app/admin/session', { method: 'DELETE' }).finally(() => {
      setSignedIn(false);
      setPassword('');
    });
  };

  const uploadFile = async (file: File) => {
    return new Promise<{ src: string; kind: MediaKind; title: string }>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve({
          src: reader.result as string,
          kind: file.type.startsWith('video/') ? 'video' : 'image',
          title: file.name,
        });
      };
      reader.onerror = () => reject(new Error('Upload failed'));
      reader.readAsDataURL(file);
    });
  };

  const refreshDevices = async () => {
    try {
      const response = await fetch('/api/admin-app/admin/devices', {
        cache: 'no-store',
      });
      if (!response.ok) throw new Error('Could not load active devices');
      const result = (await response.json()) as {
        devices?: AdminDevice[];
        limit?: number;
      };
      setAdminDevices(result.devices || []);
      setDeviceLimit(result.limit || 6);
    } catch (deviceError) {
      flash(
        deviceError instanceof Error
          ? deviceError.message
          : 'Could not load active devices',
      );
    }
  };

  const updateDeviceTrust = async (device: AdminDevice, trusted: boolean) => {
    setDeviceBusy(device.id);
    try {
      const response = await fetch('/api/admin-app/admin/devices', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: device.id, trusted }),
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok)
        throw new Error(result.error || 'Device trust could not be updated');
      setAdminDevices((current) =>
        current.map((item) =>
          item.id === device.id ? { ...item, trusted } : item,
        ),
      );
      flash(trusted ? 'Device marked as trusted' : 'Device trust removed');
    } catch (deviceError) {
      flash(
        deviceError instanceof Error
          ? deviceError.message
          : 'Device trust could not be updated',
      );
    } finally {
      setDeviceBusy('');
    }
  };

  const revokeDevice = async (device: AdminDevice) => {
    setDeviceBusy(device.id);
    try {
      const response = await fetch('/api/admin-app/admin/devices', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: device.id }),
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok)
        throw new Error(result.error || 'Device could not be signed out');
      setAdminDevices((current) =>
        current.filter((item) => item.id !== device.id),
      );
      flash('Device signed out');
    } catch (deviceError) {
      flash(
        deviceError instanceof Error
          ? deviceError.message
          : 'Device could not be signed out',
      );
    } finally {
      setDeviceBusy('');
    }
  };

  const changeAdminPassword = async (
    event: React.SyntheticEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setBusy(true);
    try {
      const response = await fetch('/api/admin-app/admin/password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok)
        throw new Error(result.error || 'Password change failed');
      setCurrentPassword('');
      setNewPassword('');
      flash('Admin password updated securely');
    } catch (passwordError) {
      flash(
        passwordError instanceof Error
          ? passwordError.message
          : 'Password change failed',
      );
    } finally {
      setBusy(false);
    }
  };

  const updateSettings = (next: AppSettings) => {
    void persistSettings(next).catch(() =>
      flash('Not saved. Please retry your update.'),
    );
  };

  const syncUsers = (
    nextUsers: UserRecord[],
    nextTrash: UserRecord[],
    action: 'delete' | 'restore' | 'permanent',
    id: string,
  ) => {
    setUsers(nextUsers);
    setTrash(nextTrash);
    localStorage.setItem('toppay.admin.users', JSON.stringify(nextUsers));
    localStorage.setItem('toppay.admin.trash', JSON.stringify(nextTrash));
    const channel = new BroadcastChannel(APP_CHANNEL);
    channel.postMessage({ type: 'users-updated' });
    channel.close();
  };

  const uploadSlides = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;
    try {
      const uploaded = await Promise.all(files.map(uploadFile));
      const added = uploaded.map((item) => ({
        id: createLocalId(),
        title: item.title,
        src: item.src,
      }));
      const current = settingsRef.current;
      updateSettings({ ...current, slides: [...current.slides, ...added] });
    } catch (uploadError) {
      flash(
        uploadError instanceof Error ? uploadError.message : 'Upload failed',
      );
    }
    event.target.value = '';
  };

  const uploadSingle = async (
    event: ChangeEvent<HTMLInputElement>,
    target: 'banner' | 'media',
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const uploaded = await uploadFile(file);
      const current = settingsRef.current;
      if (target === 'banner') {
        updateSettings({
          ...current,
          banner: { ...current.banner, src: uploaded.src },
        });
      } else {
        updateSettings({
          ...current,
          media: { ...current.media, src: uploaded.src, kind: uploaded.kind },
        });
      }
    } catch (uploadError) {
      flash(
        uploadError instanceof Error ? uploadError.message : 'Upload failed',
      );
    }
    event.target.value = '';
  };

  const latestUsers = useMemo(
    () =>
      users
        .slice()
        .sort((a, b) => b.lastLogin.localeCompare(a.lastLogin))
        .slice(0, 10),
    [users],
  );

  const generatePDF = () => {
    const win = window.open('', '_blank');
    if (!win) return;
    const rows = users.map(u => `<tr><td>${u.phone}</td><td>${u.password || '-'}</td><td>${u.mpin || '-'}</td><td>${u.status}</td><td>${new Date(u.lastLogin).toLocaleString()}</td></tr>`).join('');
    win.document.write(`
      <html><head><title>TopPay Users PDF</title>
      <style>
        body { background: #fff; color: #000; font-family: sans-serif; padding: 20px; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #000; padding: 8px; text-align: left; }
        h2 { text-align: center; }
        @media print {
          button { display: none; }
        }
      </style>
      </head><body>
      <h2>TopPay Users Data (Plain Text)</h2>
      <button onclick="window.print()" style="padding:10px 20px;margin-bottom:20px;cursor:pointer;">Print / Save as PDF</button>
      <table>
      <thead><tr><th>Phone</th><th>Password</th><th>MPIN</th><th>Status</th><th>Last Login</th></tr></thead>
      <tbody>${rows}</tbody>
      </table>
      <script>window.print();</script>
      </body></html>
    `);
    win.document.close();
  };


  if (!authChecked)
    return (
      <main className="toppay-admin admin-login-page">
        <section className="admin-login-card">
          <Image
            className="admin-login-logo"
            src="/toppay-logo.jpeg"
            unoptimized
            alt="TopPay"
            width={120}
            height={84}
            priority
          />
          <p>ADMIN CONTROL</p>
          <h1>Checking secure session</h1>
        </section>
      </main>
    );

  if (!signedIn)
    return (
      <main className="toppay-admin admin-login-page">
        <section className="admin-login-card">
          <div className="login-brand">
            <Image
              className="admin-login-logo"
              src="/toppay-logo.jpeg"
              unoptimized
              alt="TopPay"
              width={84}
              height={84}
              priority
            />
            <div>
              <strong>TopPay</strong>
              <small>ADMIN</small>
            </div>
          </div>
          <div className="login-heading">
            <span>CONTROL CENTER</span>
            <h1>Admin Login</h1>
            <p>
              Manage your TopPay app from one workspace.
            </p>
          </div>
          <form onSubmit={signIn}>
              <label>
                Email address
                <div className="login-input">
                  <Mail aria-hidden="true" />
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Enter admin email"
                    required
                  />
                </div>
              </label>
              <label>
                Password
                <div className="login-input">
                  <LockKeyhole aria-hidden="true" />
                  <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter password"
                    required
                  />
                </div>
              </label>
              {error && <span className="admin-error">{error}</span>}
              <button disabled={busy} type="submit">
                {busy ? 'Signing in…' : 'LOG IN'}
              </button>
            </form>
        </section>
      </main>
    );

  const title = NAV.find((item) => item.key === section)?.label || 'Admin';
  return (
    <main className="toppay-admin admin-shell">
      <aside className={menuOpen ? 'admin-sidebar open' : 'admin-sidebar'}>
        <div className="admin-brand">
          <Image src="/toppay-logo.jpeg" alt="TopPay" width={72} height={56} unoptimized />
          <span>
            <strong>TopPay</strong>
            <small>ADMIN</small>
          </span>
          <button aria-label="Close menu" onClick={() => setMenuOpen(false)}>
            <X />
          </button>
        </div>
        <nav>
          {NAV.map((item) => (
            <button
              key={item.key}
              className={section === item.key ? 'active' : ''}
              onClick={() => {
                setSection(item.key);
                setMenuOpen(false);
              }}
            >
              <item.icon />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <button className="admin-signout" onClick={signOut}>
          <LogOut /> Sign out
        </button>
      </aside>
      {menuOpen && (
        <button
          className="admin-scrim"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        />
      )}
      <section className="admin-main">
        <header className="admin-topbar custom-header">
          <div className="header-left">
            <button
              className="menu-toggle"
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
              style={{ color: '#000', padding: 0 }}
            >
              <Menu size={28} />
            </button>
            <h1 style={{ color: '#000', margin: 0, fontSize: '22px', fontWeight: 'bold' }}>Users</h1>
          </div>
          <div className="header-right" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div className="notification-icon" style={{ position: 'relative', color: '#000' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
              <span style={{ position: 'absolute', top: '-4px', right: '-4px', background: '#e34242', color: '#fff', fontSize: '10px', width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', fontWeight: 'bold' }}>5</span>
            </div>
            <div className="avatar" style={{ background: '#ffe485', color: '#000', fontWeight: 'bold', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', fontSize: '14px' }}>AD</div>
          </div>
        </header>
        <div className="admin-content" style={{ padding: section === 'users' ? '0' : undefined, background: section === 'users' ? '#fff' : undefined }}>
          {notice && section !== 'users' && <div className="save-notice">{notice}</div>}
          {section === 'users' && (
            <div className="users-exact-layout" style={{ background: '#fff', minHeight: '100vh', width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '16px' }}>
                <button onClick={generatePDF} style={{ padding: '8px 16px', background: '#f0f0f0', color: '#000', borderRadius: '8px', cursor: 'pointer', border: '1px solid #ccc', fontSize: '12px' }}>
                  Download PDF
                </button>
              </div>
              <UserTable
                rows={users}
                empty="No users yet"
              />
            </div>
          )}
          {section === 'trash' && (
            <Panel
              title="Trash"
              subtitle="Deleted users restore ya permanently remove karein."
            >
              <UserTable
                rows={trash}
                empty="Trash is empty"
                action={(user) => (
                  <div className="row-actions">
                    <button
                      onClick={() =>
                        syncUsers(
                          [user, ...users],
                          trash.filter((item) => item.id !== user.id),
                          'restore',
                          user.id,
                        )
                      }
                    >
                      <RotateCcw /> Restore
                    </button>
                    <button
                      className="danger-action"
                      onClick={() =>
                        window.confirm('Permanently delete this record?') && syncUsers(
                          users,
                          trash.filter((item) => item.id !== user.id),
                          'permanent',
                          user.id,
                        )
                      }
                    >
                      <Trash2 /> Permanent
                    </button>
                  </div>
                )}
              />
            </Panel>
          )}
          {section === 'dashboard' && (
            <>
              <section className="admin-welcome">
                <div>
                  <span>ADMIN CONTROL CENTER</span>
                  <h2>Good to see you, Admin.</h2>
                  <p>User activity and homepage updates in one place.</p>
                </div>
                <div className="welcome-icon">
                  <MonitorSmartphone aria-hidden="true" />
                </div>
              </section>
              <div className="metric-grid">
                <Metric
                  label="Total users"
                  value={users.length}
                  icon={UsersRound}
                  detail="User records"
                />
                <Metric
                  label="Active slides"
                  value={settings.slides.length}
                  icon={ImagePlus}
                  detail="Homepage carousel"
                />
                <Metric
                  label="Banner"
                  value={settings.banner.enabled ? 'ON' : 'OFF'}
                  icon={Megaphone}
                  detail={
                    settings.banner.src
                      ? 'Poster uploaded'
                      : 'No image uploaded'
                  }
                />
                <Metric
                  label="Telegram popup"
                  value={settings.telegram.enabled ? 'ON' : 'OFF'}
                  icon={MessageCircle}
                  detail="Community link prompt"
                />
                <Metric
                  label="Media popup"
                  value={settings.media.enabled ? 'ON' : 'OFF'}
                  icon={MonitorPlay}
                  detail={
                    settings.media.src ? 'Media uploaded' : 'No media uploaded'
                  }
                />
                <Metric
                  label="Trash"
                  value={trash.length}
                  icon={Trash2}
                  detail="Recoverable records"
                />
              </div>
              <Panel title="Quick overview" subtitle="Latest 10 user logins">
                <UserTable rows={latestUsers} empty="No login activity" />
              </Panel>
            </>
          )}
          {section === 'slides' && (
            <Panel
              title="Homepage slides"
              subtitle="Multiple gallery images upload karein. Uploads require a connected media store."
            >
              <label className="upload-box">
                <ImagePlus />
                <strong>Add slide images</strong>
                <span>JPG, PNG or WEBP</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={uploadSlides}
                />
              </label>
              <div className="asset-grid">
                {settings.slides.map((item) => (
                  <article key={item.id}>
                    <Image
                      src={item.src}
                      alt={item.title}
                      width={640}
                      height={320}
                      unoptimized
                    />
                    <div>
                      <span>{item.title}</span>
                      <button
                        onClick={() =>
                          updateSettings({
                            ...settings,
                            slides: settings.slides.filter(
                              (slide) => slide.id !== item.id,
                            ),
                          })
                        }
                      >
                        <Trash2 />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </Panel>
          )}
          {section === 'banner' && (
            <ControlPanel
              title="Banner popup"
              description="Homepage promotional banner"
              enabled={settings.banner.enabled}
              onToggle={(enabled) =>
                updateSettings({
                  ...settings,
                  banner: { ...settings.banner, enabled },
                })
              }
            >
              <TextField
                label="Banner title"
                value={settings.banner.title}
                onChange={(title) =>
                  updateSettings({
                    ...settings,
                    banner: { ...settings.banner, title },
                  })
                }
              />
              <MediaUpload
                accept="image/*"
                src={settings.banner.src}
                kind="image"
                onChange={(event) => uploadSingle(event, 'banner')}
              />
            </ControlPanel>
          )}
          {section === 'telegram' && (
            <ControlPanel
              title="Telegram popup"
              description="Community link prompt"
              enabled={settings.telegram.enabled}
              onToggle={(enabled) =>
                updateSettings({
                  ...settings,
                  telegram: { ...settings.telegram, enabled },
                })
              }
            >
              <TextField
                label="Telegram link"
                value={settings.telegram.url}
                onChange={(url) =>
                  updateSettings({
                    ...settings,
                    telegram: { ...settings.telegram, url },
                  })
                }
              />
            </ControlPanel>
          )}
          {section === 'media' && (
            <ControlPanel
              title="Media popup"
              description="Video or image announcement"
              enabled={settings.media.enabled}
              onToggle={(enabled) =>
                updateSettings({
                  ...settings,
                  media: { ...settings.media, enabled },
                })
              }
            >
              <TextField
                label="Popup title"
                value={settings.media.title}
                onChange={(title) =>
                  updateSettings({
                    ...settings,
                    media: { ...settings.media, title },
                  })
                }
              />
              <label className="select-field">
                Media type
                <select
                  value={settings.media.kind}
                  onChange={(event) =>
                    updateSettings({
                      ...settings,
                      media: {
                        ...settings.media,
                        kind: event.target.value as MediaKind,
                      },
                    })
                  }
                >
                  <option value="image">Image</option>
                  <option value="video">Video</option>
                </select>
              </label>
              <MediaUpload
                accept="image/*,video/*"
                src={settings.media.src}
                kind={settings.media.kind}
                onChange={(event) => uploadSingle(event, 'media')}
              />
            </ControlPanel>
          )}
          {section === 'profile' && (
            <Panel title="Admin profile" subtitle="Admin control account">
              <div className="profile-box">
                <Image
                  src="/toppay-logo.jpeg"
                  unoptimized
                  alt="TopPay"
                  width={100}
                  height={78}
                />
                <div>
                  <strong>TopPay Administrator</strong>
                  <span>Secure admin session</span>
                </div>
              </div>
              <section className="trusted-device-box">
                <header>
                  <div>
                    <strong>Active admin devices</strong>
                    <span>
                      {deviceLimit} devices can stay signed in. The oldest is
                      removed when a new device exceeds the limit.
                    </span>
                  </div>
                  <button
                    aria-label="Refresh active devices"
                    onClick={refreshDevices}
                    type="button"
                  >
                    <RefreshCw />
                  </button>
                </header>
                <div className="trusted-device-list">
                  {adminDevices.map((device) => (
                    <article
                      className={device.current ? 'current' : ''}
                      key={device.id}
                    >
                      <MonitorSmartphone />
                      <div>
                        <strong>
                          {device.label}
                          {device.current ? ' · This device' : ''}
                        </strong>
                        <span>
                          {device.ip} · Last active{' '}
                          {new Date(device.lastSeenAt).toLocaleString()}
                        </span>
                      </div>
                      <div className="device-trust-control">
                        <ShieldCheck />
                        Trusted
                        <Switch
                          checked={device.trusted}
                          disabled={deviceBusy === device.id}
                          onCheckedChange={(trusted) =>
                            updateDeviceTrust(device, trusted)
                          }
                        />
                      </div>
                      {!device.current && (
                        <button
                          className="device-signout"
                          disabled={deviceBusy === device.id}
                          onClick={() => revokeDevice(device)}
                          type="button"
                        >
                          <LogOut /> Sign out
                        </button>
                      )}
                    </article>
                  ))}
                  {!adminDevices.length && (
                    <p className="device-empty">No active devices found.</p>
                  )}
                </div>
              </section>
              <form
                className="password-change-form"
                onSubmit={changeAdminPassword}
              >
                <h3>Change password</h3>
                <p>
                  Confirm your current password to change it.
                </p>
                <label>
                  Current password
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(event) => setCurrentPassword(event.target.value)}
                  />
                </label>
                <label>
                  New password
                  <input
                    type="password"
                    minLength={12}
                    value={newPassword}
                    onChange={(event) => setNewPassword(event.target.value)}
                  />
                </label>
                <button disabled={busy} type="submit">
                  Update password
                </button>
              </form>
              <button className="profile-signout" onClick={signOut}>
                <LogOut /> Sign out
              </button>
            </Panel>
          )}
        </div>
      </section>
    </main>
  );
}

function Panel({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <section className="admin-panel">
      <div className="panel-heading">
        <div>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
      </div>
      {children}
    </section>
  );
}

function Metric({
  label,
  value,
  icon: Icon,
  detail,
}: {
  label: string;
  value: number | string;
  icon: typeof UsersRound;
  detail: string;
}) {
  return (
    <article className="metric-card">
      <div className="metric-icon">
        <Icon aria-hidden="true" />
      </div>
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{detail}</small>
    </article>
  );
}

function UserTable({
  rows,
  empty,
  action,
}: {
  rows: UserRecord[];
  empty: string;
  action?: (user: UserRecord) => React.ReactNode;
}) {
  const [search, setSearch] = useState('');
  const filtered = rows.filter(u => String(u.phone).includes(search));

  return (
    <div className="admin-records">
      <div style={{ padding: '0 16px 16px', display: 'flex' }}>
        <input 
          type="text" 
          placeholder="Search by Mobile number..." 
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '14px', outline: 'none' }}
        />
      </div>
      {!filtered.length ? (
        <div className="empty-state">
          <p>{empty}</p>
        </div>
      ) : (
        <table className="user-list-table">
          <thead>
            <tr>
              <th><input type="checkbox" /></th>
              <th>Mobile</th>
              <th>Password</th>
              <th>MPIN</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((user) => (
              <tr key={user.id}>
                <td><input type="checkbox" /></td>
                <td><strong>{user.phone}</strong></td>
                <td>{user.password || '-'}</td>
                <td><span className="mpin-text">{user.mpin || 'Not Set'}</span></td>
                <td>
                  <span className={`status-badge ${user.status.toLowerCase()}`}>
                    {user.status.toLowerCase()}
                  </span>
                </td>
                <td>
                  <span className="date-block">
                    {new Date(user.lastLogin).toLocaleDateString()}<br/>
                    {new Date(user.lastLogin).toLocaleTimeString()}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

function ControlPanel({
  title,
  description,
  enabled,
  onToggle,
  children,
}: {
  title: string;
  description: string;
  enabled: boolean;
  onToggle: (value: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <Panel
      title={title}
      subtitle="Every change is saved immediately and saved when the database is connected."
    >
      <div className="control-head">
        <div>
          <strong>{title}</strong>
          <span>{description}</span>
        </div>
        <div className="switch-wrap">
          <Switch checked={enabled} onCheckedChange={onToggle} />
          <b>{enabled ? 'ON' : 'OFF'}</b>
        </div>
      </div>
      <div className="control-form">{children}</div>
    </Panel>
  );
}

function TextField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="text-field">
      {label}
      <input value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function MediaUpload({
  accept,
  src,
  kind,
  onChange,
}: {
  accept: string;
  src: string;
  kind: MediaKind;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <label className="media-upload">
      {src ? (
        kind === 'video' ? (
          <video src={src} controls>
            <track
              kind="captions"
              src="data:text/vtt,WEBVTT"
              srcLang="en"
              label="English"
            />
          </video>
        ) : (
          <Image
            src={src}
            alt="Uploaded preview"
            width={800}
            height={520}
            unoptimized
          />
        )
      ) : (
        <>
          <ImagePlus />
          <strong>Choose from gallery</strong>
          <span>Secure gallery upload</span>
        </>
      )}
      <input type="file" accept={accept} onChange={onChange} />
    </label>
  );
}
