import UserHome from '@/components/UserHome';

export const metadata = { title: 'TopPay Dashboard', robots: { index: false, follow: false }, alternates: { canonical: '/home' } };
export default function HomePage() { return <UserHome />; }
