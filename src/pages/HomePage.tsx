import { useState } from 'react';
import { ArrowRight, Sparkles, Award, Truck, RefreshCw, ShieldCheck, Star, Instagram } from 'lucide-react';
import { useStore } from '@/store/StoreContext';
import { useReveal } from '@/hooks/useReveal';
import { ProductCard } from '@/components/ProductCard';
import { QuickView } from '@/components/QuickView';
import { Rating } from '@/components/Rating';
import {
  getNewArrivals,
  getBestSellers,
  allCategories,
  socialImages,
  heroImage,
  featuredImage,
} from '@/data/products';
import type { Product } from '@/types';

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
    >
      {children}
    </div>
  );
}

export function HomePage() {
  const { navigate } = useStore();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const newArrivals = getNewArrivals();
  const bestSellers = getBestSellers();

  const reviews = [
    { name: 'Aarav Sharma', avatar: 'https://images.pexels.com/photos/14950779/pexels-photo-14950779.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&fit=crop', rating: 5, text: 'Absolutely loved the quality and fit. The packaging also felt incredibly premium.', product: 'Oversized Cotton Tee' },
    { name: 'Priya Patel', avatar: 'https://images.pexels.com/photos/16869444/pexels-photo-16869444.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&fit=crop', rating: 5, text: 'The silk dress exceeded my expectations. Got so many compliments at the event.', product: 'Silk Slip Dress' },
    { name: 'Rohan Mehta', avatar: 'https://images.pexels.com/photos/6102841/pexels-photo-6102841.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&fit=crop', rating: 5, text: 'Best denim I have owned. The fit is perfect and the quality is unmatched for this price.', product: 'Relaxed Denim Jeans' },
    { name: 'Sneha Reddy', avatar: 'https://images.pexels.com/photos/35490803/pexels-photo-35490803.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&fit=crop', rating: 4, text: 'Beautiful blazer, well-tailored and the wool feels premium. Delivery was quick too.', product: 'Tailored Wool Blazer' },
  ];

  const categoryNav = (name: string) => {
    if (name.startsWith("Men's")) navigate({ name: 'shop', category: 'Men' });
    else if (name.startsWith("Women's")) navigate({ name: 'shop', category: 'Women' });
    else if (name === 'New Arrivals') navigate({ name: 'shop', category: 'New Arrivals' });
    else if (name === 'Streetwear') navigate({ name: 'shop', category: 'Streetwear' });
    else if (name === 'Casual Wear') navigate({ name: 'shop', category: 'Casual Wear' });
    else navigate({ name: 'shop', category: 'Accessories' });
  };

  return (
    <div>
      {/* HERO */}
      <section className="relative h-[85vh] min-h-[600px] overflow-hidden">
        <img src={heroImage} alt="Fashion hero" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/10" />
        <div className="relative h-full mx-auto max-w-[1400px] px-4 lg:px-8 flex flex-col justify-center">
          <Reveal>
            <p className="text-white/80 text-xs lg:text-sm tracking-[0.3em] uppercase mb-4">Autumn / Winter 2026</p>
          </Reveal>
          <Reveal>
            <h1 className="text-white text-5xl sm:text-6xl lg:text-8xl font-bold tracking-tight leading-[0.95] max-w-2xl">
              Wear Your<br />Statement.
            </h1>
          </Reveal>
          <Reveal>
            <p className="text-white/90 text-base lg:text-lg mt-6 max-w-md leading-relaxed">
              Timeless styles. Modern attitude. Designed for the way you live.
            </p>
          </Reveal>
          <Reveal>
            <div className="flex flex-wrap gap-3 mt-8">
              <button
                onClick={() => navigate({ name: 'shop', category: 'Men' })}
                className="bg-white text-neutral-900 text-sm font-medium tracking-wider uppercase px-8 py-4 hover:bg-neutral-100 transition-all hover:scale-105"
              >
                Shop Men
              </button>
              <button
                onClick={() => navigate({ name: 'shop', category: 'Women' })}
                className="border border-white text-white text-sm font-medium tracking-wider uppercase px-8 py-4 hover:bg-white hover:text-neutral-900 transition-all"
              >
                Shop Women
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SHOP BY CATEGORY */}
      <section className="mx-auto max-w-[1400px] px-4 lg:px-8 py-16 lg:py-24">
        <Reveal>
          <div className="text-center mb-10 lg:mb-14">
            <p className="text-xs tracking-[0.3em] uppercase text-neutral-400 mb-2">Curated Edits</p>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">Shop By Category</h2>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-6">
          {allCategories.map((cat, i) => (
            <Reveal key={cat.name}>
              <button
                onClick={() => categoryNav(cat.name)}
                className="group relative w-full overflow-hidden block aspect-[4/5] lg:aspect-[3/4]"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition-colors" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                  <p className="text-white/70 text-[10px] lg:text-xs tracking-[0.25em] uppercase mb-1">{cat.tagline}</p>
                  <h3 className="text-white text-lg lg:text-2xl font-semibold">{cat.name}</h3>
                  <span className="mt-3 text-white text-xs tracking-wider uppercase border-b border-white/60 pb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Explore Collection
                  </span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="bg-neutral-50 py-16 lg:py-24">
        <div className="mx-auto max-w-[1400px] px-4 lg:px-8">
          <Reveal>
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-xs tracking-[0.3em] uppercase text-neutral-400 mb-2">Just Dropped</p>
                <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">New Arrivals</h2>
              </div>
              <button
                onClick={() => navigate({ name: 'shop', category: 'New Arrivals' })}
                className="hidden sm:flex items-center gap-2 text-sm font-medium tracking-wide hover:gap-3 transition-all"
              >
                View All <ArrowRight size={16} />
              </button>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
            {newArrivals.slice(0, 8).map((p) => (
              <Reveal key={p.id}>
                <ProductCard product={p} onQuickView={setQuickViewProduct} />
              </Reveal>
            ))}
          </div>
          <div className="text-center mt-10 sm:hidden">
            <button
              onClick={() => navigate({ name: 'shop', category: 'New Arrivals' })}
              className="border border-neutral-900 text-neutral-900 text-sm font-medium tracking-wider uppercase px-8 py-3"
            >
              View All Products
            </button>
          </div>
        </div>
      </section>

      {/* FEATURED COLLECTION */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <img src={featuredImage} alt="The Essentials" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/35" />
        <div className="relative h-full mx-auto max-w-[1400px] px-4 lg:px-8 flex flex-col justify-center items-center text-center">
          <Reveal>
            <p className="text-white/70 text-xs lg:text-sm tracking-[0.3em] uppercase mb-3">Featured Collection</p>
            <h2 className="text-white text-4xl lg:text-6xl font-bold tracking-tight">The Essentials</h2>
            <p className="text-white/90 text-base lg:text-lg mt-4 max-w-lg">Everyday pieces, elevated.</p>
            <button
              onClick={() => navigate({ name: 'shop' })}
              className="mt-8 bg-white text-neutral-900 text-sm font-medium tracking-wider uppercase px-8 py-4 hover:bg-neutral-100 transition-all hover:scale-105"
            >
              Shop The Collection
            </button>
          </Reveal>
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="mx-auto max-w-[1400px] px-4 lg:px-8 py-16 lg:py-24">
        <Reveal>
          <div className="text-center mb-10">
            <p className="text-xs tracking-[0.3em] uppercase text-neutral-400 mb-2">Customer Favorites</p>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">Best Sellers</h2>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
          {bestSellers.slice(0, 4).map((p) => (
            <Reveal key={p.id}>
              <ProductCard product={p} onQuickView={setQuickViewProduct} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* PROMO BANNER */}
      <section className="bg-neutral-900 text-white py-16 lg:py-20">
        <div className="mx-auto max-w-[1400px] px-4 lg:px-8 text-center">
          <Reveal>
            <p className="text-amber-400 text-xs tracking-[0.3em] uppercase mb-3">Limited Time</p>
            <h2 className="text-4xl lg:text-6xl font-bold tracking-tight">Up to 40% Off</h2>
            <p className="text-neutral-300 text-base lg:text-lg mt-4 max-w-xl mx-auto">
              Refresh your wardrobe with our latest styles.
            </p>
            <button
              onClick={() => navigate({ name: 'shop', filter: 'sale' })}
              className="mt-8 bg-white text-neutral-900 text-sm font-medium tracking-wider uppercase px-8 py-4 hover:bg-neutral-100 transition-all hover:scale-105"
            >
              Shop Sale
            </button>
          </Reveal>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="mx-auto max-w-[1400px] px-4 lg:px-8 py-16 lg:py-24">
        <Reveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">Why Choose Us</h2>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
          {[
            { icon: Award, title: 'Premium Quality', desc: 'Thoughtfully selected fabrics and quality craftsmanship.' },
            { icon: Truck, title: 'Fast Delivery', desc: 'Quick and reliable delivery across India.' },
            { icon: RefreshCw, title: 'Easy Returns', desc: 'Simple and hassle-free returns within 7 days.' },
            { icon: ShieldCheck, title: 'Secure Payments', desc: 'Safe and secure checkout experience.' },
          ].map((f, i) => (
            <Reveal key={f.title}>
              <div className="text-center" style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="grid place-items-center h-14 w-14 mx-auto rounded-full bg-neutral-100 mb-4">
                  <f.icon size={24} className="text-neutral-700" />
                </div>
                <h3 className="text-base font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SOCIAL SECTION */}
      <section className="bg-neutral-50 py-16 lg:py-24">
        <div className="mx-auto max-w-[1400px] px-4 lg:px-8">
          <Reveal>
            <div className="text-center mb-10">
              <p className="text-xs tracking-[0.3em] uppercase text-neutral-400 mb-2">@maison.official</p>
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">Follow Our Style</h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-3 lg:grid-cols-6 gap-2 lg:gap-3">
            {socialImages.map((src, i) => (
              <Reveal key={i}>
                <a
                  href="#"
                  className="group relative block aspect-square overflow-hidden"
                >
                  <img src={src} alt="Instagram post" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors grid place-items-center">
                    <Instagram size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
          <div className="text-center mt-8">
            <a
              href="#"
              className="inline-flex items-center gap-2 border border-neutral-900 text-neutral-900 text-sm font-medium tracking-wider uppercase px-8 py-3.5 hover:bg-neutral-900 hover:text-white transition-colors"
            >
              <Instagram size={16} /> Follow Us
            </a>
          </div>
        </div>
      </section>

      {/* CUSTOMER REVIEWS */}
      <section className="mx-auto max-w-[1400px] px-4 lg:px-8 py-16 lg:py-24">
        <Reveal>
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.3em] uppercase text-neutral-400 mb-2">Loved by Thousands</p>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">Customer Reviews</h2>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {reviews.map((rev, i) => (
            <Reveal key={rev.name}>
              <div className="border border-neutral-100 p-6 h-full flex flex-col" style={{ transitionDelay: `${i * 80}ms` }}>
                <Rating rating={rev.rating} size={16} />
                <p className="text-sm text-neutral-700 leading-relaxed mt-4 flex-1">"{rev.text}"</p>
                <div className="flex items-center gap-3 mt-6 pt-4 border-t border-neutral-100">
                  <img src={rev.avatar} alt={rev.name} className="h-10 w-10 rounded-full object-cover" />
                  <div>
                    <p className="text-sm font-medium">{rev.name}</p>
                    <p className="text-xs text-neutral-400">Purchased: {rev.product}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="bg-neutral-100 py-16 lg:py-24">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <Reveal>
            <Sparkles size={28} className="mx-auto text-neutral-400 mb-4" />
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">Join The Club</h2>
            <p className="text-neutral-600 mt-3 text-base lg:text-lg">
              Get early access to new drops, exclusive offers and fashion updates.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col sm:flex-row gap-3 mt-8 max-w-md mx-auto"
            >
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="flex-1 border border-neutral-300 bg-white px-4 py-3.5 text-sm outline-none focus:border-neutral-900 transition-colors"
              />
              <button
                type="submit"
                className="bg-neutral-900 text-white text-sm font-medium tracking-wider uppercase px-8 py-3.5 hover:bg-neutral-800 transition-colors"
              >
                Join Now
              </button>
            </form>
            <p className="text-xs text-neutral-400 mt-4">By subscribing, you agree to our Privacy Policy.</p>
          </Reveal>
        </div>
      </section>

      <QuickView product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </div>
  );
}
