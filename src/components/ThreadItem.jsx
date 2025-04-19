import { useNavigate } from "react-router-dom";
import { postedAt } from "../utils";
import PropTypes from "prop-types";
import { Card, Typography, Button, Flex, Avatar } from "antd";
import DOMPurify from "dompurify";
import truncate from "truncate-html";
import { useState } from "react";
import {
  LikeOutlined,
  DislikeOutlined,
  CommentOutlined,
  FieldTimeOutlined,
} from "@ant-design/icons";

const { Title, Paragraph, Text, Link } = Typography;
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
  limit = 90,
}) {
  const navigate = useNavigate();

  const isThreadUpVoted = (upVotesBy ?? []).includes(authUser);
  const isThreadDownVoted = (downVotesBy ?? []).includes(authUser);

  const [expanded, setExpanded] = useState(false);

  // Sanitize HTML
  const cleanHTML = DOMPurify.sanitize(body);

  // Truncate if not expanded
  const displayedHTML = expanded ? cleanHTML : truncate(cleanHTML, limit);

  const onUpVoteClick = (event) => {
    event.stopPropagation();
    if(isThreadUpVoted){
      upVoteBy(id, true);
    } else {
      upVoteBy(id)
    }
  };

  const onDownVoteClick = (event) => {
    event.stopPropagation();
    if(isThreadDownVoted){
      downVoteBy(id, true)
    }else{
      downVoteBy(id);
    }
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
    <Card style={{ width: "100%", marginTop: "8px", marginBottom: "8px" }}>
      <div
        style={{
          display: "",
          alignItems: "center",
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        <div
          role="button"
          tabIndex={0}
          onClick={onThreadClick}
          onKeyDown={onThreadPress}
          style={{ cursor: "pointer" }}
        >
          <Flex style={{ marginBottom: "8px" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Avatar src={user.avatar} size={64} />
              <div style={{ marginLeft: "12px" }}>
                <Text strong style={{ fontSize: "20px" }}>
                  {user.name}
                </Text>{" "}
                <br />
                <Text type="secondary">@{user.email}</Text> <br />
                <Text type="secondary">
                  <FieldTimeOutlined /> {postedAt(createdAt)}{" "}
                </Text>
              </div>
            </div>
          </Flex>

          <Title level={4} style={{ marginTop: "16px", marginLeft: "8px" }}>
            {title}
          </Title>
        </div>
      </div>
      <Paragraph style={{ marginTop: "16px", marginLeft: "8px" }}>
        <Flex>
          <span
            dangerouslySetInnerHTML={{ __html: displayedHTML }}
            style={{ fontSize: "16px" }}
          />
          {cleanHTML.length > limit && (
            <Button
              type="link"
              size="small"
              onClick={() => setExpanded(!expanded)}
              style={{
                display: "inline",
                padding: 0,
                height: "auto",
                lineHeight: "1",
                fontSize: "inherit",
              }}
            >
              {expanded ? "Collapse" : "Show More"}
            </Button>
          )}
        </Flex>
      </Paragraph>
      <Flex
        gap="small"
        align="center"
        style={{ marginTop: "32px", marginLeft: "8px" }}
      >
        <div
          style={{ display: "flex", alignItems: "center", gap: "8px", }}
          onClick={onUpVoteClick}
        >
          <LikeOutlined
            style={{
              fontSize: "20px",
              color: isThreadUpVoted ? "#1890ff" : undefined,
            }}
          />
          <span>{upVotesBy.length}</span>
        </div>
        <div
          style={{ display: "flex", alignItems: "center", gap: "8px",marginLeft: '16px',
          marginRight: '16px', }}
          onClick={onDownVoteClick}
        >
          <DislikeOutlined
            style={{
              fontSize: "20px",
              color: isThreadDownVoted ? "#ff4d4f" : undefined,
            }}
          />
          <span>{downVotesBy.length}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <CommentOutlined style={{ fontSize: "20px" }} />{" "}
          <span>{totalComments}</span>
        </div>
      </Flex>
      <Button
        color="default"
        variant="outlined"
        style={{ marginBottom: "16px", marginTop: "32px", marginLeft: "8px" }}
      >
        #{category}
      </Button>
    </Card>
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
