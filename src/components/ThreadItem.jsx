import { useNavigate } from "react-router-dom";
import { postedAt } from "../utils";
import PropTypes from "prop-types";

function ThreadItem({
  id,
  title,
  body,
  category,
  createdAt,
  ownerId,
  totalComments,
  upVotesBy,
  upVoteBy,
  downVotesBy,
  downVoteBy,
  authUser,
  user,
}) {
  const navigate = useNavigate();
//   const isThreadUpVoted = upVotesBy.includes(authUser);
//   const isThreadDownVoted = downVotesBy.includes(authUser);

  const isThreadUpVoted = (upVotesBy ?? []).includes(authUser);
  const isThreadDownVoted = (downVotesBy ?? []).includes(authUser);

  const onUpVoteClick = (event) => {
    event.stopPropagation();
    upVoteBy(id);
  };

  const onDownVoteClick = (event) => {
    event.stopPropagation();
    downVoteBy(id);
  };

  const onThreadClick = () => {
    navigate(`/threads/${id}`);
  };

  const onThreadPress = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      navigate(`/threads/${id}`);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      className="talk-item"
      onClick={onThreadClick}
      onKeyDown={onThreadPress}
    >
      <div className="talk-item__user-photo">
        <img src={user.avatar} alt={user} />
      </div>
      <div className="talk-item__detail">
        <header>
          <div className="talk-item__user-info">
            <p className="talk-item__user-name">{user.name}</p>
            <p className="talk-item__user-id">@{user.email}</p>
          </div>
          <p className="talk-item__created-at">{postedAt(createdAt)}</p>
        </header>
        <h2>{title}</h2>
        <p>{body}</p>
        <p>
          <strong>Kategori:</strong> #{category}
        </p>
        <p>
          <strong>Dibuat pada:</strong> {postedAt(createdAt)}
        </p>
        <p>
          <strong>Total Komentar:</strong> {totalComments}
        </p>
        <div style={{ display: "flex", gap: "1rem" }}>
          {/* <button onClick={onUpVoteClick}>
            👍 {upVotesBy.length} {isThreadUpVoted ? "(Voted)" : ""}
          </button>
          <button onClick={onDownVoteClick}>
            👎 {downVotesBy.length} {isThreadDownVoted ? "(Voted)" : ""}
          </button> */}
        </div>
      </div>
    </div>
  );
}

const userShape = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
};

const threadItemShape = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  totalComments: PropTypes.number.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  authUser: PropTypes.string.isRequired,
  user: PropTypes.shape(userShape).isRequired,
};

ThreadItem.propTypes = {
  ...threadItemShape,
  upVoteBy: PropTypes.func,
  downVoteBy: PropTypes.func,
};

ThreadItem.defaultProps = {
  upVoteBy: null,
  downVoteBy: null,
};

export { threadItemShape };

export default ThreadItem;
