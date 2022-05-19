import { useContext, useState } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";
import NotificationContext from "../../store/notification-context";

function Comments(props) {
  const { eventId } = props;
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const notificationCtx = useContext(NotificationContext);

  async function getComments() {
    const response = await fetch(`/api/comment/${eventId}`);
    const data = await response.json();
    console.log(data);
    if (data.success) {
      setComments(data.comments);
    }
  }

  async function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
    if (!showComments) {
      await getComments();
    }
  }

  async function addCommentHandler(commentData) {
    // send data to API
    try {
      const { name, email, text } = commentData;
      notificationCtx.showNotification({
        title: "Adding the comment",
        message: "Trying to add your comment",
        status: "pending",
      });

      const response = await fetch("/api/comment", {
        method: "POST",
        body: JSON.stringify({
          name: name,
          email: email,
          comment: text,
          eventId: eventId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        notificationCtx.showNotification({
          title: "error",
          message: "Couldn't hit the database",
          status: "error",
        });
      }
      const data = await response.json();
      // console.log(data);
      notificationCtx.showNotification({
        title: "Hurray!",
        message: "Comment added successfully",
        status: "success",
      });
      await getComments();
    } catch (e) {
      notificationCtx.showNotification({
        title: "Error",
        message: e.message || "Error adding comment",
        status: "error",
      });
    }
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList comments={comments} />}
    </section>
  );
}

export default Comments;
