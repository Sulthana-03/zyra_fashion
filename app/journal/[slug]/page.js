import { notFound } from "next/navigation";
import Link from "next/link";
import SafeImage from "@/components/SafeImage";
import { blogPosts } from "@/data/testimonials";
import { FiArrowLeft } from "react-icons/fi";

export function generateStaticParams() {
  return blogPosts.map((b) => ({ slug: b.slug }));
}

export function generateMetadata({ params }) {
  const post = blogPosts.find((b) => b.slug === params.slug);
  return { title: post ? `${post.title} | ZYRA Journal` : "ZYRA Journal" };
}

export default function JournalPostPage({ params }) {
  const post = blogPosts.find((b) => b.slug === params.slug);
  if (!post) return notFound();

  const others = blogPosts.filter((b) => b.slug !== post.slug);

  return (
    <div className="container-x py-10 max-w-3xl mx-auto">
      <Link href="/" className="text-sm text-zyra-gray hover:text-zyra-black inline-flex items-center gap-1.5 mb-6">
        <FiArrowLeft size={14} /> Back to home
      </Link>

      <span className="text-[11px] font-semibold uppercase tracking-wider text-zyra-gold">{post.tag}</span>
      <h1 className="font-display text-3xl md:text-4xl font-semibold text-zyra-black mt-2 mb-6">{post.title}</h1>

      <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-8">
        <SafeImage src={post.img} alt={post.title} className="w-full h-full object-cover" />
      </div>

      <div className="space-y-5 text-zyra-gray leading-relaxed">
        {(post.content || [post.excerpt]).map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      <div className="mt-14 pt-8 border-t border-black/10">
        <p className="font-semibold mb-4">More from the Journal</p>
        <div className="grid sm:grid-cols-2 gap-4">
          {others.map((b) => (
            <Link key={b.slug} href={b.href} className="flex gap-3 group">
              <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                <SafeImage src={b.img} alt={b.title} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wide text-zyra-gold">{b.tag}</p>
                <p className="text-sm font-medium group-hover:text-zyra-gold transition-colors line-clamp-2">{b.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
