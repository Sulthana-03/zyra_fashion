import { notFound } from "next/navigation";
import { getProductById, getRelatedProducts, products } from "@/data/products";
import ProductDetail from "@/components/ProductDetail";

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export function generateMetadata({ params }) {
  const product = getProductById(params.id);
  return { title: product ? `${product.name} | ZYRA` : "Product | ZYRA" };
}

export default function ProductPage({ params }) {
  const product = getProductById(params.id);
  if (!product) return notFound();
  const related = getRelatedProducts(product);

  return <ProductDetail key={product.id} product={product} related={related} />;
}
