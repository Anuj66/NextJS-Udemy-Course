import classes from "./post-content.module.css";
import PostHeader from "./post-header";

const DUMMY_POST = {
  slug: "getting-started-with-nextjs",
  title: "Getting Started With NextJS",
  image: "getting-started-nextjs.png",
  date: "2022-05-21",
  content: "# This is a First Post",
};

function PostContent() {
  const imageLink = `/images/posts/${DUMMY_POST.slug}/${DUMMY_POST.image}`;

  return (
    <article className={classes.content}>
      <PostHeader title={DUMMY_POST.title} image={imageLink} />
      <p>{DUMMY_POST.content}</p>
    </article>
  );
}

export default PostContent;
