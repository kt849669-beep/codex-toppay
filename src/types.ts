export interface User {
  id: string;
  mobile: string;
  mpin?: string | null;
  loginCount: number;
  createdAt: string;
  password?: string;
}

export interface Slide {
  id: string;
  type: 'image' | 'text';
  url: string;
}

export interface Settings {
  videoPopupEnabled: boolean;
  telegramPopupEnabled: boolean;
  videoUrl: string;
  telegramUrl: string;
}

export interface AppState {
  slides: Slide[];
  settings: Settings;
}
