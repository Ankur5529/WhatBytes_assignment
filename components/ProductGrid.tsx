'use client';

import React, { useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { products } from '@/data/products';
import ProductCard from './ProductCard';
import { PackageSearch, X, RotateCcw } from 'lucide-react';

export default function ProductGrid() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedCategory = searchParams.get('category') || 'All';
  const priceParam = searchParams.get('price');
  const maxPrice = priceParam ? parseInt(priceParam, 10) || 1000 : 1000;
  const searchQuery = (searchParams.get('search') || '').trim().toLowerCase();

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter
      if (selectedCategory !== 'All' && product.category.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }

      // Price filter
      if (product.price > maxPrice) {
        return false;
      }

      // Search filter
      if (searchQuery) {
        const titleMatch = product.title.toLowerCase().includes(searchQuery);
        const descMatch = product.description.toLowerCase().includes(searchQuery);
        const catMatch = product.category.toLowerCase().includes(searchQuery);
        if (!titleMatch && !descMatch && !catMatch) {
          return false;
        }
      }

      return true;
    });
  }, [selectedCategory, maxPrice, searchQuery]);

  const handleResetFilters = () => {
    router.push('/', { scroll: false });
  };

  const hasAnyFilter = selectedCategory !== 'All' || maxPrice < 1000 || searchQuery !== '';

  return (
    <div className="flex-1 min-w-0">
      {/* Title & Active Filter Badges */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Product Listing
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Showing <span className="font-semibold text-slate-800">{filteredProducts.length}</span> of {products.length} products
          </p>
        </div>

        {/* Active Filters Badges */}
        {hasAnyFilter && (
          <div className="flex flex-wrap items-center gap-2">
            {searchQuery && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                Search: &ldquo;{searchQuery}&rdquo;
                <button
                  onClick={() => {
                    const params = new URLSearchParams(searchParams.toString());
                    params.delete('search');
                    router.push(`/?${params.toString()}`, { scroll: false });
                  }}
                  className="hover:text-blue-900"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}

            {selectedCategory !== 'All' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                Category: {selectedCategory}
                <button
                  onClick={() => {
                    const params = new URLSearchParams(searchParams.toString());
                    params.delete('category');
                    router.push(`/?${params.toString()}`, { scroll: false });
                  }}
                  className="hover:text-blue-900"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}

            {maxPrice < 1000 && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                Max: ${maxPrice}
                <button
                  onClick={() => {
                    const params = new URLSearchParams(searchParams.toString());
                    params.delete('price');
                    router.push(`/?${params.toString()}`, { scroll: false });
                  }}
                  className="hover:text-blue-900"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}

            <button
              onClick={handleResetFilters}
              className="text-xs text-blue-600 hover:text-blue-800 font-medium underline ml-1"
            >
              Reset all
            </button>
          </div>
        )}
      </div>

      {/* Conditional Rendering: Empty State vs Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center my-6">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <PackageSearch className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">
            No products found
          </h3>
          <p className="text-slate-500 text-sm max-w-md mx-auto mb-6">
            We couldn&apos;t find any items matching your selected filters. Try broadening your price range, searching for another keyword, or resetting your filters.
          </p>
          <button
            onClick={handleResetFilters}
            type="button"
            className="inline-flex items-center gap-2 bg-[#155dfc] hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition shadow-sm"
          >
            <RotateCcw className="w-4 h-4" />
            Reset all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
