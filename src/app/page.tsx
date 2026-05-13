import { Navbar, Hero } from '@/components/LandingPage';

export default function Home() {
  const heroImage = "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop";

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero heroImage={heroImage} />
    </main>
  );
}
