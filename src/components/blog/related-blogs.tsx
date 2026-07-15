import { blogService } from "@/services/blog.service";
import { LandingBlogGrid } from "@/features/landing/landing-blog-grid";
import { LandingSectionHeader } from "@/features/landing/landing-section-header";

interface RelatedBlogsProps {
  slug: string;
}

export async function RelatedBlogs({ slug }: RelatedBlogsProps) {
  const { data: related } = await blogService.getRelated(slug);

  if (!related.length) return null;

  return (
    <div className="mt-16 border-t border-(--lp-border) pt-16">
      <LandingSectionHeader
        title="Related articles"
        description="More stories you might enjoy"
        align="left"
      />
      <LandingBlogGrid blogs={related} />
    </div>
  );
}
