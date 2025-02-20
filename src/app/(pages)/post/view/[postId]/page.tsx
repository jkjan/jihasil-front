import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import { getPost } from "@/entities/post";
import { getSession } from "@/features/request-sign-in";
import { PostThumbnail } from "@/widgets/post-thumbnail";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ postId: string }>;
}): Promise<Metadata> {
  const postId = (await params).postId;
  const post = await getPost(postId);

  return {
    title: post?.postMetadata.title,
    openGraph: {
      title: post?.postMetadata.title,
      description: post?.postMetadata.subtitle,
      url: `/${post?.postMetadata.post_id}`,
      images: [
        post?.postMetadata.thumbnail_url
          ? new URL(post?.postMetadata.thumbnail_url)
          : "/main.png",
      ],
    },
  };
}

export default async function PageViewer({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const session = await getSession();
  const postId = (await params).postId;

  const post = await getPost(postId);
  if (!post) {
    notFound();
  }

  console.log(postId);
  console.log(post);

  return (
    <div className="subgrid my-gap">
      <div className="lg:col-span-3 md:col-span-2 col-span-4 flex flex-col my-gap h-fit md:sticky top-[89px]">
        <PostThumbnail postMetadata={post.postMetadata} />
        {session ? (
          <Link
            href={{
              pathname: `/post/edit/${postId}`,
            }}
          >
            <Button className="w-full">수정</Button>
          </Link>
        ) : null}
      </div>
      <div className="lg:col-span-9 md:col-span-6 col-span-4 z-0">
        <div
          id="post_content"
          dangerouslySetInnerHTML={{
            __html: post.html,
          }}
        />
      </div>
    </div>
  );
}
