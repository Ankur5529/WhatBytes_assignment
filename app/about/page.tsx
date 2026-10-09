import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-800 font-medium mb-6"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to Products
      </Link>
      <div className="bg-white rounded-2xl border border-slate-200/80 p-8 sm:p-12 shadow-xs">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-4">About Us</h1>
        <p className="text-slate-600 leading-relaxed mb-4">
          Welcome to our modern e-commerce destination. We take pride in curating the finest selection of electronics, everyday apparel, and home essentials.
        </p>
        <p className="text-slate-600 leading-relaxed mb-6">
          Our mission is to bring you top-tier quality products paired with an intuitive, seamless shopping experience and lightning-fast worldwide delivery.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-slate-100 text-center">
          <div className="p-4 bg-slate-50 rounded-xl">
            <div className="text-2xl font-black text-blue-600 mb-1">10,000+</div>
            <div className="text-xs text-slate-500 font-medium">Happy Customers</div>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl">
            <div className="text-2xl font-black text-blue-600 mb-1">99.8%</div>
            <div className="text-xs text-slate-500 font-medium">Satisfaction Rate</div>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl">
            <div className="text-2xl font-black text-blue-600 mb-1">24/7</div>
            <div className="text-xs text-slate-500 font-medium">Customer Support</div>
          </div>
        </div>
      </div>
    </div>
  );
}
