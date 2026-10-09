import { Suspense } from 'react';
import SidebarFilters from '@/components/SidebarFilters';
import ProductGrid from '@/components/ProductGrid';

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Sidebar Filters */}
        <Suspense
          fallback={
            <div className="w-full md:w-64 lg:w-72 h-96 bg-blue-700/20 rounded-2xl animate-pulse" />
          }
        >
          <SidebarFilters />
        </Suspense>

        {/* Product Grid Area */}
        <Suspense
          fallback={
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-80 bg-slate-200/60 rounded-xl animate-pulse"
                />
              ))}
            </div>
          }
        >
          <ProductGrid />
        </Suspense>
      </div>
    </div>
  );
}
