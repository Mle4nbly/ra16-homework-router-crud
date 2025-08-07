import { Link, useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { useEffect, useState } from "react";
import type { PostType } from "./Post";
import { PostEdit } from "./PostEdit";

export const PostDetails = () => {
  const { id } = useParams();
  const [{ data: post, loading }] = useFetch<PostType>(
    `http://localhost:3000/posts/${id}`,
  );
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState("");

  useEffect(() => {
    if (post) setContent(post.content);
  }, [post]);

  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:3000/posts/${id}`, {
      method: "DELETE",
    });
    navigate("/");
  };

  const handleSave = async (id: number, content: string) => {
    await fetch(`http://localhost:3000/posts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        content,
      }),
    });

    setContent(content);
    setIsEditing(false);
  };

  if (loading) return <p>Loading...</p>;
  if (!post) return (
      <div className="error-message">
        <h3 className="error-message__title">ERROR</h3>
        <p>Post not found</p>
        <Link className="btn btn--home" to="/">Вернуться на главную</Link>
      </div>
  );

  return (
    <>
      {isEditing ? (
        <PostEdit
          id={Number(id)}
          initContent={content}
          onSave={handleSave}
          onToggle={setIsEditing}
        />
      ) : (
        <div className="post">
          <div className="user-info">
            <div className="user-info__avatar">
              <img
                src="https://sun9-2.userapi.com/s/v1/ig1/nJOJfUrlQYzU4QX_C4mbi25xmkca9M6vlJgA9L95U7E2I2mLCaF2Kyu05SgubkY7MNB1DFOh.jpg?quality=96&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,604x604&from=bu"
                alt="avatar"
              />
            </div>
            <div className="user-info__name">User Name</div>
          </div>
          <div className="post__content">{content}</div>
          <div className="post__actions">
            <button
              className="btn btn--primary"
              onClick={() => setIsEditing(true)}
            >
              Редактировать
            </button>
            <button
              className="btn btn--danger"
              onClick={() => handleDelete(Number(id))}
            >
              Удалить
            </button>
          </div>
        </div>
      )}
    </>
  );
};
