export interface PostType {
  id: number;
  content: string;
}

export interface PostProps extends PostType {
  onClick: () => void;
}

export const Post = ({ content, onClick = () => {} }: PostProps) => {
  return (
    <div className="post post--clickable" onClick={onClick}>
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
    </div>
  );
};
