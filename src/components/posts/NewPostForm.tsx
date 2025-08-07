import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const NewPostForm = () => {
  const navigate = useNavigate();
  const formRef = useRef(null);
  const [wasValidated, setWasValidated] = useState(false);

  const [formData, setFormData] = useLocalStorage('formData', {
    content: ""
  })

  const [content, setContent] = useState(formData.content);

  useEffect(() => {
    setFormData({
      content
    })
  }, [content, setFormData])

  const handleAddClick = async () => {
    if (!content.trim()) {
      setWasValidated(true);

      return;
    }

    await fetch("http://localhost:3000/posts/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content,
      }),
    });

    setFormData({
      content: ""
    })
    navigate("/");
  };

  const handleCancelClick = () => {
    navigate("/");
  };

  return (
    <>
      <div className="post">
        <div className="post__header">
          <h3 className="post__title">Создать пост</h3>
          <button
            className="btn btn--cross"
            onClick={() => {
              handleCancelClick();
            }}
          >
            ✖
          </button>
        </div>

        <div className="post__content">
          <div className="user-info">
            <div className="user-info__avatar">
              <img
                src="https://sun9-2.userapi.com/s/v1/ig1/nJOJfUrlQYzU4QX_C4mbi25xmkca9M6vlJgA9L95U7E2I2mLCaF2Kyu05SgubkY7MNB1DFOh.jpg?quality=96&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,604x604&from=bu"
                alt="avatar"
              />
            </div>
          </div>
          <div className="validation-group">
            <textarea
              ref={formRef}
              name="content"
              className={`post-form__textarea form-control ${wasValidated && !content.trim() ? "is-invalid" : ""}`}
              value={content}
              onChange={(e) => {
                setContent(e.target.value)
              }}
              required
            ></textarea>
            {wasValidated && !content.trim() && (
              <div className="invalid-feedback" style={{ display: "block" }}>
                Поле обязательно для заполнения
              </div>
            )}
          </div>
        </div>

        <div className="post__actions">
          <button
            className="btn btn--primary"
            onClick={() => {
              handleAddClick();
            }}
          >
            Опубликовать
          </button>
        </div>
      </div>
    </>
  );
};
