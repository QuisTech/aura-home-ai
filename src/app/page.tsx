import { Navbar, Hero, Features, CTA } from '@/components/LandingPage';

export default function Home() {
  return (
    <main className="bg-white">
      <Navbar />
      <Hero heroImage="/hero.png" />
      <Features />
      <CTA />
      
      {/* Premium Footer */}
      <footer className="py-12 px-8 border-t border-slate-100 bg-white text-center">
        <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.4em]">
          © 2026 Aura Home AI · Built by Agents Assemble · Premium Autonomy
        </p>
      </footer>
    </main>
  );
}
