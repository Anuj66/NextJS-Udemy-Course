import AllPosts from "../../components/posts/all-posts";

const DUMMY_POSTS = [
  {
    slug: "getting-started-with-nextjs",
    title: "Getting Started With NextJS",
    image: "getting-started-nextjs.png",
    excerpt:
      "NextJs is a React Framework for production build which makes developing Single-Page application breeze with SSR.",
    date: "2022-05-21",
  },
  {
    slug: "already-started-with-nextjs",
    title: "Getting Started With NextJS",
    image: "getting-started-nextjs.png",
    excerpt:
      "NextJs is a React Framework for production build which makes developing Single-Page application breeze with SSR.",
    date: "2022-05-21",
  },
  {
    slug: "not-started-with-nextjs",
    title: "Getting Started With NextJS",
    image: "getting-started-nextjs.png",
    excerpt:
      "NextJs is a React Framework for production build which makes developing Single-Page application breeze with SSR.",
    date: "2022-05-21",
  },
  {
    slug: "why-started-with-nextjs",
    title: "Getting Started With NextJS",
    image: "getting-started-nextjs.png",
    excerpt:
      "NextJs is a React Framework for production build which makes developing Single-Page application breeze with SSR.",
    date: "2022-05-21",
  },
];

function PostsPage() {
  return <AllPosts posts={DUMMY_POSTS} />;
}

export default PostsPage;
