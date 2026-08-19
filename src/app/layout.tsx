import type { Metadata } from 'next';
import { AuthProvider } from '@/components/auth/AuthProvider';
import { AuthModal } from '@/components/auth/AuthModal';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: 'EcoGrid | Intelligent Urban Mobility Platform',
  description: 'Operating System Deadlock Prevention Engine for Urban Traffic with Real-Time Firestore & Google Gemini AI',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950 text-slate-100 font-sans antialiased min-h-screen flex flex-col selection:bg-emerald-500 selection:text-slate-950">
        <AuthProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <AuthModal />
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
