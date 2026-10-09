'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, Check } from 'lucide-react';
import { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1200);
  };

  return (
    <div className="group bg-white rounded-xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col h-full">
      {/* Product Image Area */}
      <Link
        href={`/product/${product.id}`}
        className="block relative w-full pt-[85%] bg-slate-50 overflow-hidden cursor-pointer"
      >
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          priority={false}
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-xs font-semibold px-2 py-0.5 rounded-full text-slate-600 shadow-xs">
          {product.category}
        </div>
      </Link>

      {/* Product Information */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          <Link href={`/product/${product.id}`} className="block group-hover:text-blue-600 transition">
            <h3 className="font-bold text-slate-900 text-base leading-snug line-clamp-1">
              {product.title}
            </h3>
          </Link>

          {/* Price */}
          <div className="mt-1 flex items-baseline justify-between">
            <span className="font-bold text-slate-900 text-lg">
              ${product.price}
            </span>

            {/* Stars */}
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((starIndex) => (
                <Star
                  key={starIndex}
                  className={`w-3.5 h-3.5 ${
                    starIndex <= Math.round(product.rating)
                      ? 'text-amber-400 fill-amber-400'
                      : 'text-slate-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Add to Cart Button */}
        <div className="mt-4 pt-1">
          <button
            onClick={handleAddToCart}
            type="button"
            className={`w-full py-2.5 px-4 rounded-lg font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2 active:scale-98 ${
              isAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-[#155dfc] hover:bg-[#1048c7] text-white shadow-xs'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added</span>
              </>
            ) : (
              <span>Add to Cart</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
