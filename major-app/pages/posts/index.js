import AllPosts from "../../components/posts/all-posts";
import { getAllPosts } from "../../libs/post-util";

function PostsPage(props) {
  return <AllPosts posts={props.posts} />;
}

export function getStaticProps() {
  const allPosts = getAllPosts();
  return {
    props: {
      posts: allPosts,
    },
  };
}

export default PostsPage;
