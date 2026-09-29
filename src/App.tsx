import { StoreProvider, useStore } from '@/store/StoreContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { SearchOverlay } from '@/components/SearchOverlay';
import { HomePage } from '@/pages/HomePage';
import { ShopPage } from '@/pages/ShopPage';
import { ProductPage } from '@/pages/ProductPage';
import { CheckoutPage } from '@/pages/CheckoutPage';
import { AccountPage } from '@/pages/AccountPage';
import { AdminPage } from '@/pages/AdminPage';
import { AboutPage } from '@/pages/AboutPage';

function PageRouter() {
  const { page, toast } = useStore();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {page.name === 'home' && <HomePage />}
        {page.name === 'shop' && <ShopPage />}
        {page.name === 'product' && <ProductPage />}
        {page.name === 'checkout' && <CheckoutPage />}
        {page.name === 'account' && <AccountPage />}
        {page.name === 'admin' && <AdminPage />}
        {page.name === 'about' && <AboutPage />}
      </main>
      <Footer />
      <CartDrawer />
      <SearchOverlay />

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[200] bg-neutral-900 text-white text-sm px-5 py-3 rounded-lg shadow-xl animate-[fadeIn_0.2s_ease-out]">
          {toast}
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <StoreProvider>
      <PageRouter />
    </StoreProvider>
  );
}

export default App;
