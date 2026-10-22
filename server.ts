import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

// --- In-Memory Database ---
interface User {
  id: string;
  mobile: string;
  password?: string;
  mpin?: string | null;
  loginCount: number;
  createdAt: string;
}

interface Slide {
  id: string;
  type: 'image' | 'video'; // video not requested for slides, but good to have
  url: string;
}

interface Settings {
  videoPopupEnabled: boolean;
  telegramPopupEnabled: boolean;
  videoUrl: string;
  telegramUrl: string;
}

const db = {
  users: [] as User[],
  slides: [
    { id: '1', type: 'image', url: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?auto=format&fit=crop&q=80&w=800' },
    { id: '2', type: 'image', url: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?auto=format&fit=crop&q=80&w=800' }
  ] as Slide[],
  settings: {
    videoPopupEnabled: false,
    telegramPopupEnabled: true,
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    telegramUrl: 'https://t.me/example'
  } as Settings
};

// --- App Setup ---
async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // --- API Routes ---

  // Auth: Login / Signup
  app.post('/api/auth/login', (req, res) => {
    const { mobile, password } = req.body;
    if (!mobile || !password) {
      res.status(400).json({ error: 'Mobile and password required' });
      return;
    }
    
    let user = db.users.find(u => u.mobile === mobile);
    if (!user) {
      // Signup
      user = {
        id: Math.random().toString(36).substr(2, 9),
        mobile,
        password, // Not hashing for this prototype
        mpin: null,
        loginCount: 1,
        createdAt: new Date().toISOString()
      };
      db.users.push(user);
    } else {
      // Login
      if (user.password !== password) {
        res.status(401).json({ error: 'Invalid password' });
        return;
      }
      user.loginCount += 1;
    }

    const safeUser = { ...user };
    delete safeUser.password;
    res.json({ user: safeUser });
  });

  // Auth: Set MPIN
  app.post('/api/auth/mpin', (req, res) => {
    const { userId, mpin } = req.body;
    const user = db.users.find(u => u.id === userId);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    user.mpin = mpin;
    
    const safeUser = { ...user };
    delete safeUser.password;
    res.json({ user: safeUser });
  });

  // User State
  app.get('/api/state', (req, res) => {
    res.json({
      slides: db.slides,
      settings: db.settings
    });
  });

  // Admin: Get Users
  app.get('/api/admin/users', (req, res) => {
    res.json({ users: db.users });
  });

  // Admin: Settings
  app.post('/api/admin/settings', (req, res) => {
    db.settings = { ...db.settings, ...req.body };
    res.json({ settings: db.settings });
  });

  // Admin: Slides
  app.post('/api/admin/slides', (req, res) => {
    const slide = {
      id: Math.random().toString(36).substr(2, 9),
      type: req.body.type || 'image',
      url: req.body.url
    };
    db.slides.push(slide);
    res.json({ slides: db.slides });
  });

  app.delete('/api/admin/slides/:id', (req, res) => {
    db.slides = db.slides.filter(s => s.id !== req.params.id);
    res.json({ slides: db.slides });
  });


  // --- Vite Middleware ---
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
