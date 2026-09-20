import ProductListing from "@/components/ProductListing";
import { products } from "@/data/products";

export const metadata = { title: "Search Results | ZYRA" };

// Generic marketing words that show up in tag pills ("Sneaker Trends",
// "Statement Bags") but never appear on an actual product — matching the
// FULL phrase as one substring meant "Sneaker Trends" could never match a
// product literally named that, so every tag with more than one word was
// coming back empty. Dropping these before matching, then matching if ANY
// remaining word appears, is what makes a tag like "Sneaker Trends" find
// the actual sneakers.
const SEARCH_STOPWORDS = new Set(["trends", "wear", "statement", "sets", "minimal", "leather", "the", "and"]);

export default function SearchPage({ searchParams }) {
  const q = (searchParams?.q || "").toLowerCase().trim();

  let results = products;
  if (q) {
    let words = q.split(/\s+/).filter(Boolean);
    const meaningful = words.filter((w) => !SEARCH_STOPWORDS.has(w));
    if (meaningful.length > 0) words = meaningful;

    results = products.filter((p) => {
      const haystack = [p.name, p.category, p.sub, p.brand, p.material, ...(p.tags || [])]
        .join(" ")
        .toLowerCase();
      return words.some((w) => haystack.includes(w));
    });
  }

  return (
    <ProductListing
      title={q ? `Results for "${q}"` : "Search"}
      subtitle={`${results.length} product${results.length === 1 ? "" : "s"} found`}
      allProducts={results}
      subCategories={Array.from(new Set(results.map((p) => p.sub)))}
    />
  );
}
