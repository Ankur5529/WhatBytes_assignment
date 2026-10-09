'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShoppingBag,
  CheckCircle,
  ShieldCheck,
  ChevronLeft,
  Tag
} from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    totalCount,
  } = useCart();

  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponMessage, setCouponMessage] = useState<{
    text: string;
    isError: boolean;
  } | null>(null);
  const [isCheckoutSuccess, setIsCheckoutSuccess] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === 'DISCOUNT10' || code === 'SAVE10') {
      setDiscountPercent(10);
      setCouponMessage({ text: '10% discount applied!', isError: false });
    } else if (code === 'VIP20') {
      setDiscountPercent(20);
      setCouponMessage({ text: '20% VIP discount applied!', isError: false });
    } else {
      setCouponMessage({ text: 'Invalid promo code. Try "SAVE10"', isError: true });
    }
  };

  const discountAmount = (subtotal * discountPercent) / 100;
  const shippingCost = subtotal > 150 || subtotal === 0 ? 0 : 9.99;
  const taxAmount = (subtotal - discountAmount) * 0.08;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingCost + taxAmount);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setIsCheckoutSuccess(true);
      clearCart();
    }, 1200);
  };

  if (isCheckoutSuccess) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
          <CheckCircle className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 mb-3">
          Order Confirmed!
        </h1>
        <p className="text-slate-600 mb-8 max-w-md mx-auto leading-relaxed">
          Thank you for your simulated purchase! A confirmation receipt and shipment tracking details have been sent to your email.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-[#155dfc] hover:bg-blue-700 text-white font-semibold px-8 py-3.5 rounded-xl transition shadow-sm"
        >
          <ChevronLeft className="w-4 h-4" />
          Continue Shopping
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
          Your Cart is Empty
        </h1>
        <p className="text-slate-500 max-w-md mx-auto mb-8 text-sm sm:text-base">
          Looks like you haven&apos;t added any products to your cart yet. Explore our curated catalog to find what you love!
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-[#155dfc] hover:bg-blue-700 text-white font-semibold px-8 py-3.5 rounded-xl transition shadow-sm"
        >
          Start Shopping
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Shopping Cart
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            You have <span className="font-semibold text-slate-800">{totalCount}</span> items in your cart
          </p>
        </div>

        <button
          onClick={clearCart}
          type="button"
          className="text-xs text-rose-600 hover:text-rose-800 font-semibold flex items-center gap-1.5 transition"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {items.map(({ product, quantity }) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-6 shadow-xs flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
            >
              {/* Product Thumbnail */}
              <Link
                href={`/product/${product.id}`}
                className="relative w-24 h-24 rounded-xl bg-slate-50 border border-slate-100 flex-shrink-0 overflow-hidden flex items-center justify-center p-2"
              >
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  sizes="96px"
                  className="object-contain p-2 hover:scale-105 transition"
                />
              </Link>

              {/* Title & Info */}
              <div className="flex-1 min-w-0 text-center sm:text-left">
                <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                  {product.category}
                </span>
                <Link
                  href={`/product/${product.id}`}
                  className="block font-bold text-slate-900 text-base sm:text-lg hover:text-blue-600 transition truncate mt-0.5"
                >
                  {product.title}
                </Link>
                <div className="text-slate-500 text-sm mt-1">
                  ${product.price.toFixed(2)} each
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50 overflow-hidden">
                <button
                  type="button"
                  onClick={() => updateQuantity(product.id, quantity - 1)}
                  className="p-2 hover:bg-slate-200 text-slate-600 transition"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-3 font-bold text-slate-900 text-sm min-w-[2rem] text-center select-none">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => updateQuantity(product.id, quantity + 1)}
                  className="p-2 hover:bg-slate-200 text-slate-600 transition"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Item Total Price */}
              <div className="text-right min-w-[5rem]">
                <div className="font-extrabold text-slate-900 text-lg">
                  ${(product.price * quantity).toFixed(2)}
                </div>
              </div>

              {/* Remove Button */}
              <button
                type="button"
                onClick={() => removeFromCart(product.id)}
                className="p-2 text-slate-400 hover:text-rose-600 transition rounded-lg hover:bg-rose-50"
                aria-label={`Remove ${product.title}`}
                title="Remove item"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}

          <div className="pt-4 flex justify-between items-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800 transition"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Catalog
            </Link>
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm sticky top-28">
            <h2 className="text-lg font-bold text-slate-900 mb-6 pb-4 border-b border-slate-100">
              Order Summary
            </h2>

            <div className="space-y-3.5 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal ({totalCount} items)</span>
                <span className="font-semibold text-slate-800">
                  ${subtotal.toFixed(2)}
                </span>
              </div>

              {discountPercent > 0 && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Discount ({discountPercent}%)</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-600">
                <span>Estimated Shipping</span>
                <span className="font-semibold text-slate-800">
                  {shippingCost === 0 ? (
                    <span className="text-emerald-600">FREE</span>
                  ) : (
                    `$${shippingCost.toFixed(2)}`
                  )}
                </span>
              </div>

              <div className="flex justify-between text-slate-600">
                <span>Estimated Tax (8%)</span>
                <span className="font-semibold text-slate-800">
                  ${taxAmount.toFixed(2)}
                </span>
              </div>

              <div className="pt-4 mt-2 border-t border-slate-100 flex justify-between items-baseline">
                <span className="text-base font-bold text-slate-900">Total</span>
                <span className="text-2xl font-black text-slate-900">
                  ${grandTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Promo Code Form */}
            <form onSubmit={handleApplyCoupon} className="mt-6 pt-6 border-t border-slate-100">
              <label
                htmlFor="coupon"
                className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2"
              >
                Promo Code
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    id="coupon"
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter SAVE10"
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg uppercase placeholder:normal-case font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold px-4 py-2 rounded-lg transition"
                >
                  Apply
                </button>
              </div>
              {couponMessage && (
                <p
                  className={`text-xs mt-2 font-medium ${
                    couponMessage.isError ? 'text-rose-600' : 'text-emerald-600'
                  }`}
                >
                  {couponMessage.text}
                </p>
              )}
            </form>

            {/* Checkout Button */}
            <button
              type="button"
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="mt-6 w-full py-4 px-6 bg-[#155dfc] hover:bg-blue-700 active:scale-98 text-white rounded-xl font-bold text-base transition-all duration-200 flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
            >
              {isCheckingOut ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Safe & Secure 256-Bit SSL Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
