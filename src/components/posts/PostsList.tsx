import { Link, useNavigate } from "react-router-dom";
import { Post, type PostType } from "./Post";
import { useFetch } from "../hooks/useFetch";

export const PostsList = () => {
  const [{ data, loading }] = useFetch<PostType[]>(
    "http://localhost:3000/posts",
  );
  const navigate = useNavigate();

  const handleAddClick = () => {
    navigate("/posts/new");
  };

  const handlePostClick = (id: number) => {
    navigate(`/posts/${id}`);
  };

  return (
    <>
      <div className="post-create__action">
        <button className="btn btn--primary" onClick={handleAddClick}>
          Создать пост
        </button>
      </div>
      <div className="posts">
        {loading && <p>Loading...</p>}
        {!data ? (
          <div className="error-massage">
          <h3 className="error-massage__title">ERROR</h3>
          <p>Not data availabel</p>
          <Link className="btn btn--home" to="/">Вернуться на главную</Link>
        </div>
        ) : (
          data.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              content={post.content}
              onClick={() => {
                handlePostClick(post.id);
              }}
            />
          ))
        )}
      </div>
    </>
  );
};
