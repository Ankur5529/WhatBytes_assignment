'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { ShoppingCart, Search, X, CheckCircle2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { totalCount, notification, dismissNotification } = useCart();

  const currentSearch = searchParams.get('search') || '';
  const [searchTerm, setSearchTerm] = useState(currentSearch);

  useEffect(() => {
    setSearchTerm(currentSearch);
  }, [currentSearch]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (searchTerm.trim()) {
      params.set('search', searchTerm.trim());
    } else {
      params.delete('search');
    }

    if (pathname === '/') {
      router.push(`/?${params.toString()}`);
    } else {
      router.push(`/?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    const params = new URLSearchParams(searchParams.toString());
    params.delete('search');
    if (pathname === '/') {
      router.push(`/?${params.toString()}`);
    } else {
      router.push('/');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#155dfc] text-white shadow-md">
      {/* Toast Notification */}
      {notification && (
        <div className="bg-emerald-600 text-white px-4 py-2 text-sm flex items-center justify-between shadow transition-all duration-300">
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
            <span className="flex items-center gap-2 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-200" />
              {notification}
            </span>
            <button
              onClick={dismissNotification}
              className="text-white/80 hover:text-white text-xs font-semibold uppercase tracking-wider ml-4"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white hover:opacity-90 transition flex-shrink-0"
        >
          Logo
        </Link>

        {/* Search Bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="flex-1 max-w-xl mx-2 sm:mx-6"
        >
          <div className="relative flex items-center w-full">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/70">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for products..."
              className="w-full pl-10 pr-10 py-2.5 bg-blue-700/50 hover:bg-blue-700/70 focus:bg-blue-800/80 text-white placeholder-blue-200 text-sm rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40 transition duration-200"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/70 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </form>

        {/* Cart Button */}
        <Link
          href="/cart"
          className="flex items-center gap-2 bg-[#0d40a8] hover:bg-[#0b358c] active:scale-95 text-white px-4 sm:px-5 py-2.5 rounded-lg font-medium text-sm transition-all duration-150 shadow-sm flex-shrink-0 border border-white/10"
        >
          <ShoppingCart className="w-4 h-4" />
          <span className="hidden sm:inline font-semibold">Cart</span>
          <span
            className={`flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-bold rounded-full ${
              totalCount > 0
                ? 'bg-white text-[#0d40a8] shadow-sm'
                : 'bg-blue-800 text-blue-200'
            }`}
          >
            {totalCount}
          </span>
        </Link>
      </div>
    </header>
  );
}
