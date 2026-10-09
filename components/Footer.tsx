'use client';

import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#071e49] text-white pt-12 pb-10 border-t border-blue-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Column 1: Filters */}
          <div>
            <h3 className="text-base font-bold text-white mb-4 tracking-wide">
              Filters
            </h3>
            <ul className="space-y-2 text-sm text-blue-200">
              <li>
                <Link
                  href="/?category=All"
                  className="hover:text-white transition duration-150 inline-block py-0.5"
                >
                  All
                </Link>
              </li>
              <li>
                <Link
                  href="/?category=Electronics"
                  className="hover:text-white transition duration-150 inline-block py-0.5"
                >
                  Electronics
                </Link>
              </li>
              <li>
                <Link
                  href="/?category=Clothing"
                  className="hover:text-white transition duration-150 inline-block py-0.5"
                >
                  Clothing
                </Link>
              </li>
              <li>
                <Link
                  href="/?category=Home"
                  className="hover:text-white transition duration-150 inline-block py-0.5"
                >
                  Home
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: About Us */}
          <div>
            <h3 className="text-base font-bold text-white mb-4 tracking-wide">
              About Us
            </h3>
            <ul className="space-y-2 text-sm text-blue-200">
              <li>
                <Link
                  href="/about"
                  className="hover:text-white transition duration-150 inline-block py-0.5"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white transition duration-150 inline-block py-0.5"
                >
                  Contact
                </Link>
              </li>
              <li>
                <span className="text-blue-300/70 text-xs">
                  Premium e-commerce curated collection.
                </span>
              </li>
            </ul>
          </div>

          {/* Column 3: Follow Us */}
          <div>
            <h3 className="text-base font-bold text-white mb-4 tracking-wide">
              Follow Us
            </h3>
            <div className="flex items-center gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-blue-900/60 hover:bg-blue-600 flex items-center justify-center transition-all duration-200 text-white hover:scale-110 shadow-sm"
              >
                <Facebook className="w-5 h-5 fill-current" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="w-10 h-10 rounded-full bg-blue-900/60 hover:bg-blue-600 flex items-center justify-center transition-all duration-200 text-white hover:scale-110 shadow-sm"
              >
                <Twitter className="w-5 h-5 fill-current" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-blue-900/60 hover:bg-blue-600 flex items-center justify-center transition-all duration-200 text-white hover:scale-110 shadow-sm"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
            <p className="mt-4 text-xs text-blue-300/70">
              Stay connected with our latest product arrivals and special deals.
            </p>
          </div>
        </div>

        {/* Bottom Bar: Copyright */}
        <div className="pt-8 border-t border-blue-900/60 flex flex-col sm:flex-row items-center justify-between text-xs text-blue-300/80">
          <p>© 2024 American. All rights reserved.</p>
          <div className="flex gap-4 mt-2 sm:mt-0">
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
