"use client";
import SafeImage from "@/components/SafeImage";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { FiSearch, FiHeart, FiUser, FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { megaMenu } from "@/data/categories";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";

const navLinks = ["Men", "Women", "Accessories", "Footwear"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  // The mobile drawer is rendered through a portal straight into <body> (see
  // below) instead of staying nested inside this <header>. Reason: this
  // header is `position: sticky`, and on real mobile browsers (this does NOT
  // show up in a desktop devtools mobile emulator, only on an actual phone) a
  // `position: fixed` element nested inside a `position: sticky` ancestor can
  // get its containing block wrongly resolved to that sticky ancestor instead
  // of the viewport. The visible symptom is exactly what was reported: the
  // drawer collapses down to just its own header's height (a tiny box) instead
  // of stretching the full screen height. Portaling it to <body> removes the
  // sticky ancestor from its containing-block chain entirely, so it always
  // sizes against the real viewport. `mounted` guards this because document
  // isn't available during server rendering.
  useEffect(() => setMounted(true), []);

  const { totalItems } = useCart();
  const { ids } = useWishlist();
  const { user } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const submitSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setSearchOpen(false);
      setMobileOpen(false);
    }
  };

  const mobileDrawer = (
    <>
      {/* Mobile sidebar menu — a long, full-height drawer from the left
          (not a small collapsed box), with expandable category sections. */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[60]"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-y-0 left-0 z-[70] w-[300px] max-w-[85vw] h-[100dvh] bg-zyra-black text-white shadow-2xl overflow-y-auto flex flex-col"
          >
            {/* White header strip, matching the reference — the body below it
                is the only colored part, not the whole panel. */}
            <div className="flex items-center justify-between px-5 py-5 bg-white text-zyra-black flex-shrink-0">
              <span className="font-display text-xl font-bold tracking-wide">Menu</span>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/5"
              >
                <FiX size={20} />
              </button>
            </div>

            <div className="py-3 text-base flex-1">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="block px-6 py-2.5 font-medium hover:bg-white/10"
              >
                Home
              </Link>

              {navLinks.map((link) => (
                <div key={link}>
                  <button
                    onClick={() => setMobileExpanded((cur) => (cur === link ? null : link))}
                    className="w-full flex items-center justify-between px-6 py-2.5 font-medium hover:bg-white/10"
                  >
                    <span>{link}</span>
                    <FiChevronDown
                      size={16}
                      className={`transition-transform ${mobileExpanded === link ? "rotate-180" : ""}`}
                    />
                  </button>
                  <AnimatePresence>
                    {mobileExpanded === link && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden bg-white/5"
                      >
                        <Link
                          href={`/${link.toLowerCase()}`}
                          onClick={() => setMobileOpen(false)}
                          className="block px-8 py-2.5 text-xs uppercase tracking-wide text-zyra-gold font-semibold"
                        >
                          Shop All {link}
                        </Link>
                        {megaMenu[link].groups.map((g) => (
                          <div key={g.title} className="px-8 py-2">
                            <p className="text-[11px] uppercase text-white/40 tracking-wider mb-1.5">{g.title}</p>
                            {g.items.map((it) => (
                              <Link
                                key={it}
                                href={`/${link.toLowerCase()}?sub=${encodeURIComponent(it)}`}
                                onClick={() => setMobileOpen(false)}
                                className="block py-1.5 text-white/80 hover:text-white text-sm"
                              >
                                {it}
                              </Link>
                            ))}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              <Link
                href="/new-arrivals"
                onClick={() => setMobileOpen(false)}
                className="block px-6 py-2.5 font-medium hover:bg-white/10"
              >
                New Arrivals
              </Link>
              <Link
                href="/sale"
                onClick={() => setMobileOpen(false)}
                className="block px-6 py-2.5 font-medium text-zyra-rose hover:bg-white/10"
              >
                Sale
              </Link>
            </div>

            <div className="py-3 text-base border-t border-white/15 mt-2 flex-shrink-0">
              <Link href="/account" onClick={() => setMobileOpen(false)} className="block px-6 py-2.5 text-white/80 hover:bg-white/10">
                My Account
              </Link>
              <Link href="/orders" onClick={() => setMobileOpen(false)} className="block px-6 py-2.5 text-white/80 hover:bg-white/10">
                My Orders
              </Link>
              <Link href="/contact" onClick={() => setMobileOpen(false)} className="block px-6 py-2.5 text-white/80 hover:bg-white/10">
                Contact Us
              </Link>
              <Link href="/about" onClick={() => setMobileOpen(false)} className="block px-6 py-2.5 text-white/80 hover:bg-white/10">
                About Us
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

  return (
    <>
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      <div className="container-x flex items-center justify-between h-20">
        <button className="lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Open menu">
          <FiMenu size={24} />
        </button>

        <Link href="/" className="flex items-center gap-2 select-none">
          <span className="font-display text-3xl md:text-4xl font-extrabold tracking-wide text-zyra-black">
            ZYRA
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-10 font-medium text-sm max-lg:!hidden">
          {navLinks.map((link) => (
            <div
              key={link}
              className="relative py-8"
              onMouseEnter={() => setActiveMenu(link)}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <Link
                href={`/${link.toLowerCase()}`}
                className="relative uppercase tracking-wide text-zyra-black after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-zyra-gold after:transition-all hover:after:w-full"
              >
                {link}
              </Link>

              <AnimatePresence>
                {activeMenu === link && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-1/2 -translate-x-1/2 top-full w-[560px] bg-white rounded-2xl shadow-2xl p-6 grid grid-cols-3 gap-6 border border-black/5"
                  >
                    <div className="col-span-2 grid grid-cols-2 gap-5">
                      {megaMenu[link].groups.map((g) => (
                        <div key={g.title}>
                          <p className="text-xs font-semibold uppercase text-zyra-gold mb-2 tracking-wider">
                            {g.title}
                          </p>
                          <ul className="space-y-2">
                            {g.items.map((it) => (
                              <li key={it}>
                                <Link
                                  href={`/${link.toLowerCase()}?sub=${encodeURIComponent(it)}`}
                                  className="text-sm text-zyra-black/80 hover:text-zyra-gold transition-colors"
                                >
                                  {it}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <Link href={`/${link.toLowerCase()}`} className="relative rounded-xl overflow-hidden zoom-img">
                      <SafeImage src={megaMenu[link].banner} alt={link} className="w-full h-full object-cover" />
                      <span className="absolute bottom-2 left-2 text-white text-xs font-semibold bg-black/50 px-2 py-1 rounded-full">
                        Shop {link}
                      </span>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
          <Link href="/new-arrivals" className="uppercase tracking-wide text-zyra-black hover:text-zyra-gold">
            New Arrivals
          </Link>
          <Link href="/sale" className="uppercase tracking-wide text-zyra-rose hover:text-zyra-gold font-semibold">
            Sale
          </Link>
        </nav>

        <div className="flex items-center gap-4 md:gap-5">
          <button onClick={() => setSearchOpen((s) => !s)} aria-label="Search">
            <FiSearch size={21} />
          </button>
          <Link href={user ? "/account" : "/login"} className="hidden sm:block" aria-label="Account">
            <FiUser size={21} />
          </Link>
          <Link href="/wishlist" className="relative" aria-label="Wishlist">
            <FiHeart size={21} />
            {ids.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-zyra-rose text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {ids.length}
              </span>
            )}
          </Link>
          <Link href="/cart" className="relative" aria-label="Cart">
            <HiOutlineShoppingBag size={23} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-zyra-gold text-zyra-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>

      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-black/5 overflow-hidden"
          >
            <form onSubmit={submitSearch} className="container-x py-4 flex items-center gap-3">
              <FiSearch className="text-zyra-gray" size={18} />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for products, brands and more..."
                className="flex-1 min-w-0 outline-none text-sm bg-transparent"
              />
              <button type="submit" className="flex-shrink-0 btn-primary py-2 px-5 text-xs">
                Search
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

    </header>
      {mounted && createPortal(mobileDrawer, document.body)}
    </>
  );
}
