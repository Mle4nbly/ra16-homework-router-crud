import { useRef, useState, type Dispatch, type SetStateAction } from "react";

export interface PostEditProps {
  id: number;
  initContent: string;
  onToggle: Dispatch<SetStateAction<boolean>>;
  onSave: (id: number, content: string) => Promise<void>;
}

export const PostEdit = ({
  id,
  initContent,
  onToggle,
  onSave,
}: PostEditProps) => {
  const [content, setContent] = useState(initContent);
  const formRef = useRef(null);
  const [wasValidated, setWasValidated] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) {
      setWasValidated(true);

      return;
    }

    onSave(id, content);
  };

  return (
    <div className="post">
      <form
        className={wasValidated ? "was-validated" : ""}
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="post__header">
          <h3 className="post__title">Редактировать публикацию</h3>
          <button
            className="btn btn--cross"
            onClick={() => {
              onToggle(false);
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
              className={`post-form__textarea form-control ${wasValidated && !content.trim() ? "is-invalid" : ""}`}
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
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
          <button type="submit" className="btn btn--primary">
            Сохранить
          </button>
        </div>
      </form>
    </div>
  );
};
