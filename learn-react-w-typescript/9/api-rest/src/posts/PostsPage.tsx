import { getPosts } from "./getPosts";
import { PostData } from "./types";
import { PostsList } from "./PostsList";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { savePost } from "./savePost";
import { NewPostForm } from "./NewPostForm";

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
  const {
    isLoading,
    isFetching,
    data: posts,
  } = useQuery({
    queryKey: ["postsData"],
    queryFn: getPosts,
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: savePost,
    onSuccess: (savedPost) => {
      queryClient.setQueryData<PostData[]>(["postsData"], (oldPosts) => {
        if (oldPosts === undefined) {
          return [savedPost];
        } else {
          return [savedPost, ...oldPosts];
        }
      });
    },
  });

  if (isLoading || posts === undefined) {
    return <div className="w-96 mx-auto mt-6">Loading ...</div>;
  }

  return (
    <div className="w-96 mx-auto mt-6">
      <h2 className="text-xl text-slate-900 fontbold">Posts</h2>
      <NewPostForm onSave={mutate} />
      {isFetching ? <div>Fetching ...</div> : <PostsList posts={posts} />}
    </div>
  );
}
