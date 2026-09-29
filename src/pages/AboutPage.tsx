import { useStore } from '@/store/StoreContext';
import { useReveal } from '@/hooks/useReveal';
import { heroImage2 } from '@/data/products';
import { Award, Heart, Leaf, Users } from 'lucide-react';

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}>
      {children}
    </div>
  );
}

export function AboutPage() {
  const { navigate } = useStore();

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[350px] overflow-hidden">
        <img src={heroImage2} alt="About MAISON" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <Reveal>
            <p className="text-white/70 text-xs tracking-[0.3em] uppercase mb-3">Our Story</p>
            <h1 className="text-white text-4xl lg:text-6xl font-bold tracking-tight">Crafted With Purpose</h1>
          </Reveal>
        </div>
      </section>

      {/* Story */}
      <section className="mx-auto max-w-3xl px-4 py-16 lg:py-24 text-center">
        <Reveal>
          <p className="text-lg text-neutral-700 leading-relaxed">
            MAISON was born from a simple belief: that everyday clothing should feel exceptional.
            We design pieces that bridge the gap between comfort and craftsmanship, creating
            wardrobe essentials that last beyond a season.
          </p>
          <p className="text-base text-neutral-500 leading-relaxed mt-6">
            Every garment is thoughtfully made from carefully selected fabrics, produced in small
            batches to reduce waste, and priced honestly. No markups for logos, no compromise on quality.
          </p>
        </Reveal>
      </section>

      {/* Values */}
      <section className="bg-neutral-50 py-16 lg:py-24">
        <div className="mx-auto max-w-[1400px] px-4 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Award, title: 'Quality First', desc: 'We obsess over fabric, fit, and finish so you never have to.' },
              { icon: Leaf, title: 'Sustainable', desc: 'Small-batch production and responsible sourcing at every step.' },
              { icon: Heart, title: 'Honest Pricing', desc: 'Premium materials without the premium markup.' },
              { icon: Users, title: 'Community', desc: 'Built with and for people who care about what they wear.' },
            ].map((v, i) => (
              <Reveal key={v.title}>
                <div className="text-center" style={{ transitionDelay: `${i * 80}ms` }}>
                  <div className="grid place-items-center h-14 w-14 mx-auto rounded-full bg-white mb-4">
                    <v.icon size={24} className="text-neutral-700" />
                  </div>
                  <h3 className="text-base font-semibold mb-2">{v.title}</h3>
                  <p className="text-sm text-neutral-500 leading-relaxed">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-2xl px-4 py-16 lg:py-24 text-center">
        <Reveal>
          <h2 className="text-3xl font-bold tracking-tight">Ready to Explore?</h2>
          <p className="text-neutral-500 mt-3">Discover our latest collection.</p>
          <button
            onClick={() => navigate({ name: 'shop' })}
            className="mt-6 bg-neutral-900 text-white text-sm font-medium tracking-wider uppercase px-8 py-4 hover:bg-neutral-800 transition-colors"
          >
            Shop Now
          </button>
        </Reveal>
      </section>
    </div>
  );
}
