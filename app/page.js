import Hero from "@/components/home/Hero";
import CategoryIconRow from "@/components/home/CategoryIconRow";
import TrustBadges from "@/components/home/TrustBadges";
import HowItWorks from "@/components/home/HowItWorks";
import CategoryTiles from "@/components/home/CategoryTiles";
import GenderSplit from "@/components/home/GenderSplit";
import ProductCarousel from "@/components/home/ProductCarousel";
import SaleBanner from "@/components/home/SaleBanner";
import StatsCounter from "@/components/home/StatsCounter";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Testimonials from "@/components/home/Testimonials";
import InstaFeedSection from "@/components/home/InstaFeedSection";
import BlogSection from "@/components/home/BlogSection";
import AppPromo from "@/components/home/AppPromo";
import TrendingTags from "@/components/home/TrendingTags";
import NewsletterBanner from "@/components/home/NewsletterBanner";
import { products, newArrivals, bestsellers, saleProducts } from "@/data/products";

export default function HomePage() {
  const accessories = products.filter((p) => p.category === "Accessories");
  const footwear = products.filter((p) => p.category === "Footwear");

  return (
    <>
      <Hero />
      <TrustBadges />
      <CategoryIconRow />
      <HowItWorks />

      <CategoryTiles />

      <GenderSplit
        tag="Menswear Edit"
        title="Effortless Style, Tailored for Him"
        subtitle="Sharp shirts, comfortable denim and layers built for real life — explore ZYRA's menswear collection."
        cta="Shop Men"
        href="/men"
        img="https://images.unsplash.com/photo-1619603364904-c0498317e145?auto=format&fit=crop&w=1000&q=80"
      />

      <ProductCarousel
        tag="Just Landed"
        title="New Arrivals"
        subtitle="Fresh drops, straight off the rack."
        products={newArrivals}
        viewAllHref="/new-arrivals"
      />

      <GenderSplit
        reverse
        tag="Womenswear Edit"
        title="Dresses, Ethnic & Everyday Essentials"
        subtitle="From festive sarees to everyday tees — pieces designed to move with her every mood."
        cta="Shop Women"
        href="/women"
        img="https://images.unsplash.com/photo-1616847220575-31b062a4cd05?auto=format&fit=crop&w=1000&q=80"
      />

      <ProductCarousel
        dark
        tag="Customer Favorites"
        title="Bestsellers"
        subtitle="Loved and re-ordered — again and again."
        products={bestsellers}
        viewAllHref="/new-arrivals"
      />

      <SaleBanner />

      <ProductCarousel
        tag="Finish The Look"
        title="Accessories You'll Love"
        subtitle="Bags, watches, jewelry and more — the finishing touch."
        products={accessories}
        viewAllHref="/accessories"
      />

      <StatsCounter />

      <ProductCarousel
        tag="Step Up"
        title="Footwear Edit"
        subtitle="Sneakers to sandals — comfort that keeps pace with you."
        products={footwear}
        viewAllHref="/footwear"
      />

      <WhyChooseUs />

      <Testimonials />

      <TrendingTags />

      <BlogSection />

      <AppPromo />

      <InstaFeedSection />

      <NewsletterBanner />
    </>
  );
}
