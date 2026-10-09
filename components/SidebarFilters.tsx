'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { RotateCcw, SlidersHorizontal, ChevronDown, ChevronUp } from 'lucide-react';

const CATEGORIES = ['All', 'Electronics', 'Clothing', 'Home'] as const;

export default function SidebarFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedCategory = searchParams.get('category') || 'All';
  const priceParam = searchParams.get('price');
  const initialPrice = priceParam ? Math.min(Math.max(parseInt(priceParam, 10) || 1000, 0), 1000) : 1000;

  const [price, setPrice] = useState<number>(initialPrice);
  const [isOpenMobile, setIsOpenMobile] = useState<boolean>(false);
  const [customPriceInput, setCustomPriceInput] = useState<string>(initialPrice.toString());

  useEffect(() => {
    if (priceParam) {
      const parsed = parseInt(priceParam, 10);
      if (!isNaN(parsed)) {
        setPrice(parsed);
        setCustomPriceInput(parsed.toString());
      }
    } else {
      setPrice(1000);
      setCustomPriceInput('1000');
    }
  }, [priceParam]);

  const updateFilters = (newCategory?: string, newPrice?: number) => {
    const params = new URLSearchParams(searchParams.toString());

    if (newCategory !== undefined) {
      if (newCategory === 'All') {
        params.delete('category');
      } else {
        params.set('category', newCategory);
      }
    }

    if (newPrice !== undefined) {
      if (newPrice >= 1000) {
        params.delete('price');
      } else {
        params.set('price', newPrice.toString());
      }
    }

    const queryString = params.toString();
    const targetUrl = queryString ? `${pathname}?${queryString}` : pathname;
    router.push(targetUrl, { scroll: false });
  };

  const handleCategoryChange = (cat: string) => {
    updateFilters(cat, undefined);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setPrice(val);
    setCustomPriceInput(val.toString());
    updateFilters(undefined, val);
  };

  const handleCustomPriceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = Number(customPriceInput);
    if (!isNaN(val) && val >= 0) {
      const clamped = Math.min(val, 1000);
      setPrice(clamped);
      updateFilters(undefined, clamped);
    }
  };

  const handleResetFilters = () => {
    setPrice(1000);
    setCustomPriceInput('1000');
    const params = new URLSearchParams();
    const currentSearch = searchParams.get('search');
    if (currentSearch) {
      params.set('search', currentSearch);
    }
    const queryString = params.toString();
    router.push(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
  };

  const hasActiveFilters = selectedCategory !== 'All' || price < 1000;

  return (
    <aside className="w-full md:w-64 lg:w-72 flex-shrink-0">
      {/* Mobile Accordion Toggle */}
      <div className="md:hidden mb-4">
        <button
          onClick={() => setIsOpenMobile(!isOpenMobile)}
          type="button"
          className="w-full flex items-center justify-between bg-[#1053ba] text-white px-5 py-3 rounded-xl font-semibold shadow-sm"
        >
          <span className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4" />
            Filters {hasActiveFilters && '(Active)'}
          </span>
          {isOpenMobile ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Filter Body (Hidden on mobile unless toggled) */}
      <div className={`space-y-6 ${isOpenMobile ? 'block' : 'hidden md:block'}`}>
        {/* Main Blue Filters Box - Matches Mockup */}
        <div className="bg-[#1053ba] text-white rounded-2xl p-6 shadow-md transition-all">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold tracking-tight">Filters</h2>
            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                title="Reset filters"
                className="text-xs text-blue-200 hover:text-white flex items-center gap-1 transition"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
            )}
          </div>

          {/* Category Section */}
          <div className="mb-6">
            <h3 className="font-semibold text-sm text-blue-100 uppercase tracking-wider mb-3">
              Category
            </h3>
            <div className="space-y-2.5">
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <label
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className="flex items-center gap-3 cursor-pointer group text-sm select-none"
                  >
                    <span
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                        isSelected
                          ? 'border-white bg-transparent'
                          : 'border-blue-300/60 group-hover:border-white'
                      }`}
                    >
                      {isSelected && (
                        <span className="w-2 h-2 rounded-full bg-white animate-in zoom-in-50 duration-150" />
                      )}
                    </span>
                    <span
                      className={`transition-colors ${
                        isSelected
                          ? 'font-bold text-white'
                          : 'text-blue-100/90 group-hover:text-white'
                      }`}
                    >
                      {cat}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Price Range Section */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-sm text-blue-100 uppercase tracking-wider">
                Price
              </h3>
              <span className="text-xs font-semibold bg-blue-700/80 px-2 py-0.5 rounded text-white">
                Max: ${price}
              </span>
            </div>

            <div className="mt-2">
              <input
                type="range"
                min="0"
                max="1000"
                step="10"
                value={price}
                onChange={handlePriceChange}
                aria-label="Price range filter"
                className="w-full accent-white"
              />
              <div className="flex justify-between items-center text-xs font-medium text-blue-200 mt-2">
                <span>0</span>
                <span>1000</span>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Clean Filter Box - Matches Lower Section of Mockup */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hidden sm:block">
          <h3 className="font-bold text-slate-800 text-sm mb-3 uppercase tracking-wider">
            Quick Price Limit
          </h3>
          <form onSubmit={handleCustomPriceSubmit} className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-slate-500 font-semibold text-sm">$</span>
              <input
                type="number"
                min="0"
                max="1000"
                value={customPriceInput}
                onChange={(e) => setCustomPriceInput(e.target.value)}
                placeholder="1000"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
              />
              <button
                type="submit"
                className="bg-[#1053ba] hover:bg-blue-700 text-white text-xs font-semibold px-3 py-2.5 rounded-lg transition"
              >
                Apply
              </button>
            </div>
            <p className="text-xs text-slate-500">
              Enter maximum budget between $0 and $1000.
            </p>
          </form>

          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              type="button"
              className="mt-4 w-full py-2 px-3 border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Clear All Filters
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
