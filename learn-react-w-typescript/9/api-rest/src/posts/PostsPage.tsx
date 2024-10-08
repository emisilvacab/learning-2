import { assertIsPosts } from "./getPosts";
import { PostData } from "./types";
import { PostsList } from "./PostsList";
import { useLoaderData, Await } from "react-router-dom";
import { Suspense } from "react";

type Data = {
  posts: PostData[];
};

export function assertIsData(data: unknown): asserts data is Data {
  if (typeof data !== "object") {
    throw new Error("Data isn't an object");
  }
  if (data === null) {
    throw new Error("Data is null");
  }
  if (!("posts" in data)) {
    throw new Error("data doesn't contain posts");
  }
}

export function PostsPage() {
  const data = useLoaderData();
  assertIsData(data);

  return (
    <Suspense fallback={<div>Fetching...</div>}>
      <Await resolve={data.posts}>
        {(posts) => {
          assertIsPosts(posts);
          return <PostsList posts={posts} />;
        }}
      </Await>
    </Suspense>
  );
}
