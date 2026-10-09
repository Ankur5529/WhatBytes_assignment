'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import {
  Star,
  ShoppingCart,
  Check,
  ChevronLeft,
  Truck,
  ShieldCheck,
  RotateCcw,
  Plus,
  Minus,
  MessageSquare
} from 'lucide-react';
import { products, getProductById } from '@/data/products';
import { useCart } from '@/context/CartContext';
import ProductCard from '@/components/ProductCard';

export default function ProductDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const product = getProductById(id);
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Product Not Found</h2>
        <p className="text-slate-500 mb-6">
          The product you are looking for doesn&apos;t exist or has been removed.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-[#155dfc] hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-lg transition"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Products
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  // Mock reviews for the product
  const reviews = [
    {
      id: 1,
      author: 'Alex Morgan',
      rating: 5,
      date: '2 weeks ago',
      content:
        'Outstanding quality! The product exceeded my expectations in every aspect. Build quality and finishing are second to none.',
    },
    {
      id: 2,
      author: 'Sarah Chen',
      rating: 5,
      date: '1 month ago',
      content:
        'Fast delivery and exactly as pictured. Very satisfied with this purchase, would definitely recommend to friends.',
    },
    {
      id: 3,
      author: 'David Wilson',
      rating: 4,
      date: '1 month ago',
      content:
        'Great value for money. Minor learning curve, but once set up it performs brilliantly.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Breadcrumb Navigation */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-slate-500">
        <Link href="/" className="hover:text-blue-600 transition flex items-center gap-1">
          <ChevronLeft className="w-4 h-4" />
          <span>Home</span>
        </Link>
        <span>/</span>
        <Link href={`/?category=${product.category}`} className="hover:text-blue-600 transition">
          {product.category}
        </Link>
        <span>/</span>
        <span className="font-medium text-slate-800 truncate max-w-xs">{product.title}</span>
      </nav>

      {/* Main Two-Column Layout */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 lg:p-10 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 items-start">
          {/* Left Column: Image Section */}
          <div className="flex flex-col gap-4">
            <div className="relative aspect-square w-full rounded-xl bg-slate-50 overflow-hidden border border-slate-100 flex items-center justify-center p-6">
              <Image
                src={product.image}
                alt={product.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain p-4 hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-4 left-4 bg-emerald-50 text-emerald-700 font-semibold text-xs px-2.5 py-1 rounded-full border border-emerald-200">
                In Stock
              </span>
            </div>
          </div>

          {/* Right Column: Details Section */}
          <div className="flex flex-col">
            {/* Category badge */}
            <div className="mb-3">
              <span className="inline-block bg-blue-50 text-[#1053ba] text-xs font-semibold px-3 py-1 rounded-full border border-blue-100">
                Category: {product.category}
              </span>
            </div>

            {/* Product Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-3">
              {product.title}
            </h1>

            {/* Rating Stars */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${
                      star <= Math.round(product.rating)
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-slate-200'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-bold text-slate-800">
                {product.rating.toFixed(1)}
              </span>
              <span className="text-sm text-slate-400">
                ({product.reviewsCount || 100} customer ratings)
              </span>
            </div>

            {/* Price */}
            <div className="mb-6 flex items-baseline gap-3 pb-6 border-b border-slate-100">
              <span className="text-3xl sm:text-4xl font-black text-slate-900">
                ${product.price}
              </span>
              <span className="text-sm text-slate-400 font-medium">USD • Free Shipping</span>
            </div>

            {/* Description Text */}
            <div className="mb-6">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-2">
                Overview
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                {product.description}
              </p>
            </div>

            {/* Product Features */}
            {product.features && product.features.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Key Highlights
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-600">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Quantity Selector and Add to Cart Button */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold text-slate-700">Quantity:</span>
                <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden bg-slate-50">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="p-2.5 hover:bg-slate-200 disabled:opacity-40 disabled:hover:bg-transparent transition text-slate-700"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-5 font-bold text-slate-900 text-sm select-none min-w-[2.5rem] text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-2.5 hover:bg-slate-200 transition text-slate-700"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className={`flex-1 py-3.5 px-6 rounded-xl font-bold text-base transition-all duration-200 flex items-center justify-center gap-3 shadow-md active:scale-98 ${
                    isAdded
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#155dfc] hover:bg-[#1048c7] text-white'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-5 h-5" />
                      <span>Added to Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5" />
                      <span>Add to Cart - ${(product.price * quantity).toFixed(2)}</span>
                    </>
                  )}
                </button>

                <Link
                  href="/cart"
                  className="py-3.5 px-6 rounded-xl font-semibold text-sm border-2 border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50 flex items-center justify-center transition text-center"
                >
                  View Cart
                </Link>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 pt-6 mt-6 border-t border-slate-100 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span>Free Express Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span>2 Year Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span>30-Day Free Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <section className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 lg:p-10 mb-12">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              Customer Reviews ({reviews.length})
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Read verified feedback from genuine purchasers.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black text-slate-900">{product.rating.toFixed(1)}</span>
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={`w-4 h-4 ${
                    s <= Math.round(product.rating)
                      ? 'text-amber-400 fill-amber-400'
                      : 'text-slate-200'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {reviews.map((rev) => (
            <div key={rev.id} className="pb-6 border-b border-slate-100 last:border-0 last:pb-0">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center">
                    {rev.author[0]}
                  </div>
                  <span className="font-semibold text-slate-800 text-sm">{rev.author}</span>
                </div>
                <span className="text-xs text-slate-400">{rev.date}</span>
              </div>
              <div className="flex items-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`w-3.5 h-3.5 ${
                      s <= rev.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">{rev.content}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section>
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Related Products in {product.category}
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Customers who viewed this item also considered these options.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
