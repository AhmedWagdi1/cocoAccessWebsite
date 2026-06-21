"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { 
  ShoppingBag, 
  Heart, 
  Menu, 
  X, 
  ChevronRight, 
  ArrowRight, 
  Sparkles, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Truck, 
  RotateCcw,
  CheckCircle
} from "lucide-react";


// Product interface
interface Product {
  id: number;
  name: string;
  price: number;
  category: "Bracelets" | "Earrings" | "Necklaces" | "Sets";
  image: string;
  isNew?: boolean;
  isFeatured?: boolean;
  rating: number;
  description: string;
}

// Injected product details matching the workspace images
const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Sandy Anchor Shell Bracelet",
    price: 34.00,
    category: "Bracelets",
    image: "/images/1.jpeg",
    isNew: true,
    isFeatured: true,
    rating: 5,
    description: "Handcrafted using carefully selected ocean shells, high-grade stainless steel anchors, and colorful sea-glass beads set on dry driftwood tones."
  },
  {
    id: 2,
    name: "Summer Charm Pearl Necklace",
    price: 48.00,
    category: "Necklaces",
    image: "/images/2.jpeg",
    isFeatured: true,
    rating: 5,
    description: "An elegant iridescent beaded necklace featuring natural pearl elements, glowing stars, and gold beads. Perfect for seaside evenings."
  },
  {
    id: 3,
    name: "Sun-Kissed Golden Anklet",
    price: 28.00,
    category: "Bracelets",
    image: "/images/3.jpeg",
    rating: 4,
    description: "Woven with golden threading, small sea shells, and reflective beads that glisten beautifully in the bright summer sunlight."
  },
  {
    id: 4,
    name: "Turquoise Shell Cascade",
    price: 32.00,
    category: "Bracelets",
    image: "/images/4.jpeg",
    isNew: true,
    rating: 5,
    description: "A double-stranded elastic bracelet set with natural turquoise beads and delicate white cone shells gathered from tropical shores."
  },
  {
    id: 5,
    name: "Tropical Dream Beaded Set",
    price: 65.00,
    category: "Sets",
    image: "/images/5.jpeg",
    isFeatured: true,
    rating: 5,
    description: "A matching necklace and bracelet set incorporating ocean-blue stones, tropical flora shapes, and sand-white detailing."
  },
  {
    id: 6,
    name: "Sunset Hibiscus Earrings",
    price: 24.00,
    category: "Earrings",
    image: "/images/6.jpeg",
    rating: 4,
    description: "Vibrant tassel earrings inspired by the bright pink hibiscus bloom on our signature logo. Handmade with fine cotton and wood rings."
  },
  {
    id: 7,
    name: "Coastal Breeze Choker",
    price: 38.00,
    category: "Necklaces",
    image: "/images/7.jpeg",
    rating: 5,
    description: "Choker length necklace compiled with alternating baby clam shells and premium aqua-tinted glass beads."
  },
  {
    id: 8,
    name: "Desert Gold Tassel Earrings",
    price: 26.00,
    category: "Earrings",
    image: "/images/8.jpeg",
    rating: 4,
    description: "Elegant earthy earrings with desert gold, coral, and teal tassels dangling from hand-carved coconut rings."
  },
  {
    id: 9,
    name: "Ocean Glow Statement Ring",
    price: 18.00,
    category: "Earrings",
    image: "/images/9.jpeg",
    rating: 5,
    description: "A gorgeous polished coconut shell ring inlayed with glowing blue resin reminiscent of bioluminescent waves."
  },
  {
    id: 10,
    name: "Island Nomad Wrap Bracelet",
    price: 29.00,
    category: "Bracelets",
    image: "/images/10.jpeg",
    rating: 4,
    description: "A multi-wrap leather cords bracelet combined with wooden accents and authentic cowrie shells."
  },
  {
    id: 11,
    name: "Coral Reef Drop Earrings",
    price: 22.00,
    category: "Earrings",
    image: "/images/11.jpeg",
    rating: 5,
    description: "Handcrafted miniature drop earrings holding beautiful coral-pink beads and custom-wrapped brass wires."
  },
  {
    id: 12,
    name: "Bioluminescent Sea Necklace",
    price: 42.00,
    category: "Necklaces",
    image: "/images/12.jpeg",
    isNew: true,
    rating: 5,
    description: "Captivating glowing beads that trap natural light during the day and emit a subtle emerald shimmer in dark ocean breezes."
  },
  {
    id: 13,
    name: "Hibiscus Petal Anklet Set",
    price: 39.00,
    category: "Sets",
    image: "/images/13.jpeg",
    rating: 4,
    description: "Three layered anklets utilizing pink coral dust beads, metallic leaf charms, and classic white shells."
  },
  {
    id: 14,
    name: "Golden Sand Hoop Earrings",
    price: 30.00,
    category: "Earrings",
    image: "/images/14.jpeg",
    rating: 5,
    description: "Extraordinarily lightweight hoops lined with fine gold-plated beads and miniature sliced spiral shells."
  },
  {
    id: 15,
    name: "Artisan Coconut Dream Set",
    price: 79.00,
    category: "Sets",
    image: "/images/15.jpeg",
    isFeatured: true,
    rating: 5,
    description: "The ultimate signature package. Features our premium logo earrings, a matching double-strand necklace, and a shell wrist wrap."
  }
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cart, setCart] = useState<Product[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Cart operations
  const addToCart = (product: Product) => {
    setCart((prev) => [...prev, product]);
    showToast(`Added "${product.name}" to your cart`);
  };

  const removeFromCart = (index: number) => {
    const product = cart[index];
    setCart((prev) => prev.filter((_, i) => i !== index));
    showToast(`Removed "${product.name}" from cart`);
  };

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) => 
      prev.includes(productId) 
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
    const prod = PRODUCTS.find(p => p.id === productId);
    if (prod) {
      const isFav = !favorites.includes(productId);
      showToast(isFav ? `Saved "${prod.name}" to wishlist` : `Removed "${prod.name}" from wishlist`);
    }
  };

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  // Filtered products list
  const filteredProducts = activeCategory === "All"
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === activeCategory);

  // Featured products
  const featuredProducts = PRODUCTS.filter((p) => p.isFeatured);

  const cartTotal = cart.reduce((acc, curr) => acc + curr.price, 0);

  return (
    <div className="flex flex-col min-h-screen bg-[#fafaf9]">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-xl bg-amber-950 text-amber-50 shadow-2xl animate-fade-in border border-amber-900/20">
          <CheckCircle className="w-5 h-5 text-pink-500" />
          <span className="text-sm font-medium">{toast}</span>
        </div>
      )}

      {/* Elegant Promo Banner */}
      <div className="w-full py-2 bg-gradient-to-r from-amber-950 via-amber-900 to-amber-950 text-amber-100 text-xs font-semibold uppercase tracking-[0.2em] text-center flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
        <span>Free Worldwide Shipping on Orders Over $75</span>
        <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
      </div>

      {/* Main Header / Navigation */}
      <header className="sticky top-0 z-40 w-full glass-effect transition-all duration-300 border-b border-amber-950/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo / Brand Name */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border border-amber-950/10 shadow-sm transition-transform duration-300 group-hover:scale-105">
              <Image 
                src="/images/logo.jpeg" 
                alt="Coconut Accessories Logo" 
                fill 
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-wide text-amber-950 group-hover:text-pink-600 transition-colors duration-300">
                COCONUT
              </span>
              <span className="text-[10px] font-sans font-medium tracking-[0.25em] text-amber-800 -mt-1 uppercase">
                Accessories
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm font-medium text-amber-950 hover:text-pink-600 transition-colors">Home</a>
            <a href="#shop" className="text-sm font-medium text-amber-950 hover:text-pink-600 transition-colors">Collection</a>
            <a href="#about" className="text-sm font-medium text-amber-950 hover:text-pink-600 transition-colors">Our Story</a>
            <a href="#contact" className="text-sm font-medium text-amber-950 hover:text-pink-600 transition-colors">Contact</a>
          </nav>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button 
              onClick={() => showToast("Wishlist is empty right now. Add items you love!")}
              className="p-2.5 rounded-full hover:bg-pink-50 text-amber-950 hover:text-pink-600 transition-all relative"
              aria-label="Wishlist"
            >
              <Heart className="w-5.5 h-5.5" />
              {favorites.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-pink-500 rounded-full text-[9px] font-bold text-white flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </button>

            <button 
              onClick={() => setCartOpen(true)}
              className="p-2.5 rounded-full hover:bg-amber-100/50 text-amber-950 hover:text-pink-600 transition-all relative"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5.5 h-5.5" />
              {cart.length > 0 && (
                <span className="absolute top-1 right-1 w-4.5 h-4.5 bg-pink-500 rounded-full text-[10px] font-bold text-white flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-full hover:bg-amber-100/50 text-amber-950"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 md:hidden bg-amber-950/20 backdrop-blur-sm animate-fade-in" onClick={() => setMobileMenuOpen(false)}>
          <div className="absolute right-0 top-0 bottom-0 w-4/5 max-w-sm bg-white p-6 shadow-2xl flex flex-col gap-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between pb-4 border-b border-amber-900/10">
              <span className="font-serif text-lg font-bold text-amber-950">Navigation</span>
              <button onClick={() => setMobileMenuOpen(false)} className="p-1 rounded-full hover:bg-amber-50">
                <X className="w-5 h-5 text-amber-950" />
              </button>
            </div>
            <nav className="flex flex-col gap-4">
              <a href="#" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-amber-950 hover:text-pink-600 py-1">Home</a>
              <a href="#shop" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-amber-950 hover:text-pink-600 py-1">Collection</a>
              <a href="#about" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-amber-950 hover:text-pink-600 py-1">Our Story</a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-amber-950 hover:text-pink-600 py-1">Contact</a>
            </nav>
            <div className="mt-auto pt-6 border-t border-amber-900/10 flex flex-col gap-4">
              <div className="flex items-center gap-3 text-xs text-amber-800">
                <MapPin className="w-4 h-4 text-pink-500" />
                <span>Handcrafted Tropical Jewelry Studio</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-amber-800">
                <Phone className="w-4 h-4 text-pink-500" />
                <span>+1 (800) 123-4567</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center bg-gradient-to-b from-[#fef3c7]/30 via-[#fdf2f8]/40 to-[#fafaf9] overflow-hidden pt-10 pb-20">
        {/* Abstract shapes referencing colors from logo */}
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-pink-100/40 blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-amber-100/30 blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-6 flex flex-col justify-center text-center lg:text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-50 border border-pink-100 text-pink-600 text-xs font-semibold uppercase tracking-wider self-center lg:self-start">
              <Sparkles className="w-3.5 h-3.5 text-pink-500 animate-spin" style={{ animationDuration: '3s' }} />
              <span>Authentic Artisan Collection</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6.5xl font-serif font-extrabold text-amber-950 leading-tight">
              Sun-Drenched <br />
              <span className="text-pink-600 relative inline-block">
                Handmade
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-pink-500/20 rounded-full" />
              </span> Accessories
            </h1>
            
            <p className="text-base sm:text-lg text-amber-900/80 font-sans max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Every detail woven by hand. Inspired by sunlit beaches and organic materials, our collection captures the essence of summer with authentic sea shells, custom resin, and beautiful cotton tassels.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <a 
                href="#shop" 
                className="px-8 py-4 bg-amber-950 hover:bg-pink-600 text-white rounded-full font-semibold transition-all duration-300 shadow-md hover:shadow-pink-200/30 flex items-center justify-center gap-2 group"
              >
                <span>Shop the Collection</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a 
                href="#about" 
                className="px-8 py-4 bg-white hover:bg-amber-50 text-amber-950 border border-amber-900/10 rounded-full font-semibold transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span>Read Our Story</span>
              </a>
            </div>

            {/* Quick trust metrics */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-amber-950/5 max-w-md mx-auto lg:mx-0">
              <div>
                <div className="font-serif text-2xl font-bold text-amber-950">100%</div>
                <div className="text-[11px] text-amber-800 uppercase tracking-wider font-semibold">Hand-crafted</div>
              </div>
              <div>
                <div className="font-serif text-2xl font-bold text-amber-950">Natural</div>
                <div className="text-[11px] text-amber-800 uppercase tracking-wider font-semibold">Sea Shells</div>
              </div>
              <div>
                <div className="font-serif text-2xl font-bold text-amber-950">Premium</div>
                <div className="text-[11px] text-amber-800 uppercase tracking-wider font-semibold">Quality</div>
              </div>
            </div>
          </div>

          {/* Hero Right Images Slider/Collage */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            <div className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[450px] lg:h-[450px] rounded-full overflow-hidden border-8 border-white shadow-2xl bg-white">
              <Image 
                src="/images/1.jpeg" 
                alt="Featured shell bracelet" 
                fill 
                className="object-cover hover:scale-105 transition-transform duration-700"
                priority
              />
            </div>
            
            {/* Small floating card 1 */}
            <div className="absolute top-10 right-4 sm:-right-4 bg-white/95 backdrop-blur px-4 py-3 rounded-2xl shadow-xl border border-amber-900/5 flex items-center gap-3 animate-bounce" style={{ animationDuration: '4s' }}>
              <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-pink-100">
                <Image src="/images/2.jpeg" alt="Necklace" fill className="object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-amber-950">Island Pearl Choker</span>
                <span className="text-[10px] text-pink-600 font-semibold">$48.00</span>
              </div>
            </div>

            {/* Small floating card 2 */}
            <div className="absolute bottom-10 left-4 sm:-left-4 bg-[#78350f] text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-serif font-bold">Hibiscus Inspired</span>
                <span className="text-[9px] uppercase tracking-widest text-pink-200">Limited Release</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Values / Benefits */}
      <section className="py-12 bg-amber-950 text-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4 p-4">
              <div className="p-3 bg-pink-600/20 rounded-xl text-pink-400">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold mb-1">Worldwide Shipping</h3>
                <p className="text-sm text-amber-100/70">Safe, trackable delivery to your doorstep across the globe.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4">
              <div className="p-3 bg-pink-600/20 rounded-xl text-pink-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold mb-1">Authentic Guarantee</h3>
                <p className="text-sm text-amber-100/70">Crafted with authentic high-quality seashells and natural stones.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4">
              <div className="p-3 bg-pink-600/20 rounded-xl text-pink-400">
                <RotateCcw className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold mb-1">Easy Exchanges</h3>
                <p className="text-sm text-amber-100/70">Love it or exchange it within 14 days of purchase.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shop / Product Section */}
      <section id="shop" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="text-center space-y-4 mb-12">
          <span className="text-xs uppercase tracking-[0.2em] text-pink-600 font-bold">Our Curated Collection</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-amber-950">Inspired by Ocean Shimmers</h2>
          <p className="text-amber-900/70 max-w-lg mx-auto text-sm">
            Hand-curated collections of bracelets, necklaces, matching sets and earrings designed with colors borrowed from tropical hibiscus flora and golden sandy beaches.
          </p>

          {/* Categories Tab Selector */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
            {["All", "Bracelets", "Earrings", "Necklaces", "Sets"].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all duration-300 border ${
                  activeCategory === cat
                    ? "bg-amber-950 border-amber-950 text-white shadow-sm"
                    : "bg-white border-amber-900/10 text-amber-900 hover:border-amber-950/20"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const isFav = favorites.includes(product.id);
            return (
              <div 
                key={product.id} 
                className="group bg-white rounded-3xl overflow-hidden border border-amber-950/5 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col"
              >
                {/* Image Wrapper */}
                <div className="relative aspect-[4/5] bg-stone-100 overflow-hidden cursor-pointer" onClick={() => setSelectedProduct(product)}>
                  <Image 
                    src={product.image} 
                    alt={product.name} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Floating Action Buttons */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(product.id);
                    }}
                    className={`absolute top-4 right-4 p-2.5 rounded-full shadow-md z-10 transition-transform duration-300 hover:scale-110 ${
                      isFav 
                        ? "bg-pink-500 text-white" 
                        : "bg-white/90 text-amber-950 hover:bg-white"
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isFav ? "fill-current" : ""}`} />
                  </button>

                  {product.isNew && (
                    <span className="absolute top-4 left-4 bg-pink-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                      New
                    </span>
                  )}
                  {product.isFeatured && (
                    <span className="absolute bottom-4 left-4 bg-amber-950/90 text-amber-100 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full backdrop-blur-sm shadow-sm">
                      Best Seller
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-pink-600">
                      {product.category}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-amber-950 mt-1 hover:text-pink-600 cursor-pointer transition-colors" onClick={() => setSelectedProduct(product)}>
                      {product.name}
                    </h3>
                    <p className="text-xs text-amber-900/60 mt-1 line-clamp-2">
                      {product.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 mt-4 border-t border-amber-950/5">
                    <span className="font-serif text-lg font-bold text-amber-950">
                      ${product.price.toFixed(2)}
                    </span>
                    <button 
                      onClick={() => addToCart(product)}
                      className="px-4 py-2 bg-amber-50 hover:bg-pink-600 hover:text-white text-amber-950 text-xs font-bold rounded-full transition-all duration-300 flex items-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Bag</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Banner / Story Focus */}
      <section id="about" className="bg-[#78350f] text-[#fef3c7] py-20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-pink-600/10 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 relative">
            <div className="relative w-full aspect-square max-w-sm mx-auto rounded-3xl overflow-hidden border-4 border-[#854d0e] shadow-2xl">
              <Image 
                src="/images/15.jpeg" 
                alt="Artisan assembling jewelry" 
                fill 
                className="object-cover"
              />
            </div>
            {/* Overlay Logo */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-2xl overflow-hidden bg-white p-2 shadow-2xl transform rotate-6 border border-amber-900/10">
              <div className="relative w-full h-full">
                <Image src="/images/logo.jpeg" alt="Logo" fill className="object-cover" />
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-pink-400 font-bold">Craftsmanship & Care</span>
            <h2 className="text-3xl sm:text-4xl lg:text-4.5xl font-serif font-extrabold text-white leading-tight">
              Locally Woven, <br />
              Tropical Hearted
            </h2>
            <p className="text-[#fef3c7]/80 text-sm sm:text-base leading-relaxed">
              Coconut Accessories is founded on a deep appreciation for the coast and the vibrant, organic treasures it offers. What started as wrapping small sea glass stones found on shore walks has grown into a small community of passionate artisans crafting beautiful pieces that carry the warm sun and fresh breeze with them.
            </p>
            <p className="text-[#fef3c7]/80 text-sm sm:text-base leading-relaxed">
              We source natural materials responsibly, including real coconuts, organic wood, cotton yarn, and ethically sourced sea shells. Every single accessory is checked, customized, and polished by hand in our local workshop.
            </p>
            <div className="pt-4 flex flex-wrap gap-6 items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-pink-600/20 flex items-center justify-center text-pink-400">
                  <Heart className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-[#fef3c7]/65">Purely Artisan</div>
                  <div className="text-sm font-bold text-white">Handmade with Love</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-pink-600/20 flex items-center justify-center text-pink-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-[#fef3c7]/65">Naturally Crafted</div>
                  <div className="text-sm font-bold text-white">Organic Materials</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials / Gallery */}
      <section className="py-20 bg-gradient-to-b from-[#fafaf9] to-[#fdf2f8]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <span className="text-xs uppercase tracking-[0.2em] text-pink-600 font-bold">Happy Sunseekers</span>
            <h2 className="text-3xl font-serif font-extrabold text-amber-950">Shared Coconut Shimmers</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-8 rounded-3xl border border-amber-950/5 shadow-sm space-y-4">
              <div className="flex text-pink-500 gap-0.5">
                {"★★★★★".split("").map((s, i) => <span key={i}>{s}</span>)}
              </div>
              <p className="text-sm text-amber-900/80 italic leading-relaxed">
                &ldquo;I ordered the Sandy Anchor Shell Bracelet and I am blown away by the quality. You can tell it is handmade with absolute care. I wear it to the beach every day and receive so many compliments.&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-2">
                <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center font-bold text-pink-600 text-xs">
                  MA
                </div>
                <div>
                  <h4 className="text-xs font-bold text-amber-950">Maria A.</h4>
                  <p className="text-[10px] text-amber-800">Verified Buyer</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-8 rounded-3xl border border-amber-950/5 shadow-sm space-y-4">
              <div className="flex text-pink-500 gap-0.5">
                {"★★★★★".split("").map((s, i) => <span key={i}>{s}</span>)}
              </div>
              <p className="text-sm text-amber-900/80 italic leading-relaxed">
                &ldquo;The colors are gorgeous! The Sunset Hibiscus earrings matching my logo beachwear perfectly. They are surprisingly light and comfortable to wear all day long.&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-2">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center font-bold text-amber-800 text-xs">
                  SK
                </div>
                <div>
                  <h4 className="text-xs font-bold text-amber-950">Sarah K.</h4>
                  <p className="text-[10px] text-amber-800">Verified Buyer</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white p-8 rounded-3xl border border-amber-950/5 shadow-sm space-y-4">
              <div className="flex text-pink-500 gap-0.5">
                {"★★★★★".split("").map((s, i) => <span key={i}>{s}</span>)}
              </div>
              <p className="text-sm text-amber-900/80 italic leading-relaxed">
                &ldquo;Exceptional customer service! The shipping was incredibly fast, and the packaging included a handwritten thank you note on recycled paper. Best online shop experience this summer.&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-2">
                <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center font-bold text-teal-600 text-xs">
                  JL
                </div>
                <div>
                  <h4 className="text-xs font-bold text-amber-950">Jessica L.</h4>
                  <p className="text-[10px] text-amber-800">Verified Buyer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer / Contact Section */}
      <footer id="contact" className="bg-amber-950 text-amber-100/90 pt-16 pb-8 border-t border-amber-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-amber-900/30">
          
          {/* Logo & Brand Pitch */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="relative w-8 h-8 rounded-full overflow-hidden">
                <Image src="/images/logo.jpeg" alt="Logo" fill className="object-cover" />
              </div>
              <span className="font-serif text-xl font-bold tracking-wider text-white">COCONUT</span>
            </div>
            <p className="text-xs text-amber-200/60 leading-relaxed">
              We design and construct premium hand-made resort wear accessories, capturing pure tropical joy.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="p-2 rounded-full bg-amber-900/50 hover:bg-pink-600 text-white transition-colors" aria-label="Instagram">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.008 3.752.052 2.714.124 4.091 1.503 4.215 4.215.044.968.052 1.322.052 3.752 0 2.43-.008 2.784-.052 3.752-.124 2.714-1.503 4.091-4.215 4.215-.968.044-1.322.052-3.752.052-2.43 0-2.784-.008-3.752-.052-2.714-.124-4.091-1.503-4.215-4.215C2.008 14.784 2 14.43 2 12c0-2.43.008-2.784.052-3.752.124-2.714 1.503-4.091 4.215-4.215.968-.044 1.322-.052 3.752-.052zm0 1.8c-2.392 0-2.676.009-3.621.053-2.02.093-2.825.908-2.918 2.918-.044.945-.053 1.229-.053 3.621s.009 2.676.053 3.621c.093 2.02.908 2.825 2.918 2.918.945.044 1.229.053 3.621.053s2.676-.009 3.621-.053c2.02-.093 2.825-.908 2.918-2.918.044-.945.053-1.229.053-3.621s-.009-2.676-.053-3.621c-.093-2.02-.908-2.825-2.918-2.918-.945-.044-1.229-.053-3.621-.053zm0 3.038a5.162 5.162 0 100 10.322 5.162 5.162 0 000-10.322zm0 8.522a3.36 3.36 0 110-6.72 3.36 3.36 0 010 6.72zm5.795-8.918a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="p-2 rounded-full bg-amber-900/50 hover:bg-pink-600 text-white transition-colors" aria-label="Facebook">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
            </div>

          </div>

          {/* Links Quick */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-widest text-white">Collections</h4>
            <ul className="space-y-2 text-xs text-amber-200/70">
              <li><a href="#shop" className="hover:text-pink-400 transition-colors">Sea Shell Bracelets</a></li>
              <li><a href="#shop" className="hover:text-pink-400 transition-colors">Tassel Earrings</a></li>
              <li><a href="#shop" className="hover:text-pink-400 transition-colors">Artisan Sets</a></li>
              <li><a href="#shop" className="hover:text-pink-400 transition-colors">New Releases</a></li>
            </ul>
          </div>

          {/* Links Help */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-widest text-white">Customer Care</h4>
            <ul className="space-y-2 text-xs text-amber-200/70">
              <li><a href="#" className="hover:text-pink-400 transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">Care Guide</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">Sizing Chart</a></li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">FAQs</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-widest text-white">Get in Touch</h4>
            <ul className="space-y-3 text-xs text-amber-200/70">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-pink-500 shrink-0" />
                <span>Coconut Workshop, Tropical Paradise</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-pink-500 shrink-0" />
                <span>+1 (800) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-pink-500 shrink-0" />
                <span>hello@coconutaccessories.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-amber-200/40">
          <span>&copy; {new Date().getFullYear()} Coconut Accessories. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-amber-200/60 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-amber-200/60 transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>

      {/* Cart Drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex justify-end animate-fade-in" onClick={() => setCartOpen(false)}>
          <div className="w-full max-w-md bg-white h-full flex flex-col justify-between shadow-2xl p-6" onClick={(e) => e.stopPropagation()}>
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-amber-950/10">
                <h3 className="font-serif text-lg font-bold text-amber-950 flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-pink-500" />
                  <span>Your Bag ({cart.length})</span>
                </h3>
                <button onClick={() => setCartOpen(false)} className="p-1 rounded-full hover:bg-amber-50">
                  <X className="w-5 h-5 text-amber-950" />
                </button>
              </div>

              {/* Cart List */}
              <div className="overflow-y-auto max-h-[60vh] py-4 space-y-4">
                {cart.length === 0 ? (
                  <div className="py-12 text-center text-amber-900/50 space-y-2">
                    <ShoppingBag className="w-12 h-12 mx-auto stroke-1" />
                    <p className="text-sm font-medium">Your bag is empty</p>
                    <button 
                      onClick={() => setCartOpen(false)}
                      className="text-xs text-pink-600 font-bold underline"
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  cart.map((item, index) => (
                    <div key={index} className="flex gap-4 p-3 bg-amber-50/40 rounded-2xl border border-amber-950/5">
                      <div className="relative w-16 h-20 rounded-xl overflow-hidden shrink-0 bg-stone-100">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="text-sm font-bold text-amber-950 line-clamp-1">{item.name}</h4>
                          <span className="text-[10px] text-pink-600 uppercase font-semibold">{item.category}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-amber-950">${item.price.toFixed(2)}</span>
                          <button 
                            onClick={() => removeFromCart(index)}
                            className="text-xs text-rose-600 font-semibold hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Total & Checkout */}
            {cart.length > 0 && (
              <div className="border-t border-amber-950/10 pt-6 space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-amber-900/70">Subtotal</span>
                  <span className="font-serif text-lg font-bold text-amber-950">${cartTotal.toFixed(2)}</span>
                </div>
                <button 
                  onClick={() => {
                    showToast("Order submitted! In a real application, you would proceed to payment.");
                    setCart([]);
                    setCartOpen(false);
                  }}
                  className="w-full py-4 bg-amber-950 hover:bg-pink-600 text-white rounded-full font-bold transition-all duration-300 shadow-md"
                >
                  Checkout Now
                </button>
                <p className="text-[10px] text-center text-amber-900/50">
                  Taxes and shipping calculated at checkout.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in" onClick={() => setSelectedProduct(null)}>
          <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setSelectedProduct(null)} 
              className="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-white rounded-full shadow"
            >
              <X className="w-5 h-5 text-amber-950" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative aspect-square md:aspect-auto md:h-[450px]">
                <Image src={selectedProduct.image} alt={selectedProduct.name} fill className="object-cover" />
              </div>
              <div className="p-8 flex flex-col justify-between">
                <div className="space-y-4">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-pink-600">
                    {selectedProduct.category}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-amber-950">
                    {selectedProduct.name}
                  </h3>
                  <p className="text-sm text-amber-900/70 leading-relaxed">
                    {selectedProduct.description}
                  </p>
                  
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-amber-900/60 font-medium">Rating:</span>
                    <div className="flex text-pink-500 text-xs">
                      {"★★★★★".slice(0, selectedProduct.rating)}
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-amber-950/5 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-amber-900/60">Price</span>
                    <span className="font-serif text-2xl font-bold text-amber-950">
                      ${selectedProduct.price.toFixed(2)}
                    </span>
                  </div>
                  <button 
                    onClick={() => {
                      addToCart(selectedProduct);
                      setSelectedProduct(null);
                    }}
                    className="w-full py-3.5 bg-amber-950 hover:bg-pink-600 text-white rounded-full font-bold transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Shopping Bag</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
