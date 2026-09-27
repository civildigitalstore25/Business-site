import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { BLOG_POSTS, ROUTES } from "@/lib/constants";
import { MotionSection } from "@/components/common/MotionSection";
import { ScrollRow, ScrollRowItem } from "@/components/common/ScrollRow";

function BlogCard({ post }: { post: (typeof BLOG_POSTS)[number] }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group h-full bg-white border border-[#E2E8F0] rounded-xl p-5 hover:-translate-y-1 hover:border-sky hover:shadow-[0_12px_32px_rgba(15,23,42,0.10)] transition-all duration-300 min-w-0 block"
    >
      <span className="text-[10px] font-bold uppercase tracking-widest text-sky">{post.category}</span>
      <h3 className="text-sm font-bold text-navy mt-2 mb-2 group-hover:text-sky transition-colors leading-snug line-clamp-2">
        {post.title}
      </h3>
      <p className="text-xs text-[#64748B] leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
      <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
        <Calendar size={11} />
        {post.date} · {post.readTime}
      </div>
    </Link>
  );
}

export function HomeBlogPreview() {
  const posts = BLOG_POSTS.slice(0, 3);

  return (
    <section className="bg-off-white py-10 sm:py-16 border-t border-[#E2E8F0] w-full">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MotionSection className="w-full flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 sm:gap-4 mb-6 sm:mb-10">
          <div className="w-full min-w-0">
            <p className="section-label mb-2">Insights</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-navy">From Our Blog</h2>
            <p className="mt-2 text-[11px] text-slate-400 sm:hidden">Swipe for articles →</p>
          </div>
          <Link
            href={ROUTES.blog}
            className="text-xs font-semibold text-sky inline-flex items-center gap-1 hover:gap-2 transition-all shrink-0"
          >
            View all articles <ArrowRight size={12} />
          </Link>
        </MotionSection>

        <div className="sm:hidden">
          <ScrollRow>
            {posts.map((post) => (
              <ScrollRowItem key={post.slug}>
                <BlogCard post={post} />
              </ScrollRowItem>
            ))}
          </ScrollRow>
        </div>

        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 w-full">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
