import AllPosts from "../../components/posts/all-posts";
import { getAllPosts } from "../../libs/post-util";
import { Fragment } from "react";
import Head from "next/head";

function PostsPage(props) {
  return (
    <Fragment>
      <Head>
        <meta name={'description'} content={'List of all Blogs'}/>
      </Head>
      <AllPosts posts={props.posts} />
    </Fragment>
  );
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
