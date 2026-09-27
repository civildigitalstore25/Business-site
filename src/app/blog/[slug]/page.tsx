import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar } from "lucide-react";
import { BLOG_POSTS, getBlogPost, ROUTES } from "@/lib/constants";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Post Not Found | Tomscope" };
  return { title: `${post.title} | Tomscope Blog`, description: post.excerpt };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const paragraphs = post.content.split("\n\n").filter(Boolean);

  return (
    <>
      <section className="bg-navy text-white py-12 sm:py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 min-w-0">
          <Link href={ROUTES.blog} className="text-xs text-sky inline-flex items-center gap-1 mb-5 sm:mb-6 hover:gap-2 transition-all">
            <ArrowLeft size={12} /> Back to blog
          </Link>
          <span className="text-[10px] font-bold uppercase tracking-widest text-sky block mb-3">{post.category}</span>
          <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold leading-tight">{post.title}</h1>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-4">
            <Calendar size={12} />
            {post.date} · {post.readTime}
          </div>
        </div>
      </section>

      <article className="bg-white py-10 sm:py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 sm:space-y-5">
          {paragraphs.map((para) => (
            <p key={para.slice(0, 24)} className="text-sm sm:text-base text-charcoal/80 leading-relaxed">
              {para}
            </p>
          ))}
        </div>
      </article>
    </>
  );
}
