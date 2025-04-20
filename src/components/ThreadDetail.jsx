import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { postedAt } from "../utils";
import { Card, Typography, Button, Flex, Avatar } from "antd";
import DOMPurify from "dompurify";
import {
  LikeOutlined,
  DislikeOutlined,
  CommentOutlined,
  FieldTimeOutlined,
} from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

function ThreadDetail({
  id,
  title,
  body,
  category,
  createdAt,
  ownerId,
  totalComments,
  upVotesBy: upVotesByProps,
  upVoteBy,
  downVotesBy: downVotesByProps,
  downVoteBy,
  authUser,
  user,
}) {
  const [localUpVotes, setLocalUpVotes] = useState(upVotesByProps ?? []);
  const [localDownVotes, setLocalDownVotes] = useState(downVotesByProps ?? []);

  useEffect(() => {
    setLocalUpVotes(upVotesByProps);
    setLocalDownVotes(downVotesByProps);
  }, [upVotesByProps, downVotesByProps]);

  const isThreadUpVoted = localUpVotes.includes(authUser);
  const isThreadDownVoted = localDownVotes.includes(authUser);

  const cleanHTML = DOMPurify.sanitize(body);

  const onUpVoteClick = async (event) => {
    event.stopPropagation();
    if (isThreadUpVoted) {
      setLocalUpVotes(localUpVotes.filter((id) => id !== authUser));
      await upVoteBy(id, true);
    } else {
      setLocalUpVotes([...localUpVotes, authUser]);
      setLocalDownVotes(localDownVotes.filter((id) => id !== authUser));
      await upVoteBy(id);
    }
  };

  const onDownVoteClick = async (event) => {
    event.stopPropagation();
    if (isThreadDownVoted) {
      setLocalDownVotes(localDownVotes.filter((id) => id !== authUser));
      await downVoteBy(id, true);
    } else {
      setLocalDownVotes([...localDownVotes, authUser]);
      setLocalUpVotes(localUpVotes.filter((id) => id !== authUser));
      await downVoteBy(id);
    }
  };

  return (
    <div>
      <div
        style={{
          display: "",
          alignItems: "center",
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        <div role="button" tabIndex={0} style={{ cursor: "pointer" }}>
          <Button
            color="default"
            variant="outlined"
            disabled
            style={{ marginBottom: "16px" }}
          >
            #{category}
          </Button>
          <Flex style={{ marginBottom: "8px" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Avatar src={user.avatar} size={64} />
              <div style={{ marginLeft: "12px" }}>
                <Text strong style={{ fontSize: "20px" }}>
                  {user.name}
                </Text>{" "}
                <br />
                <Text type="secondary">{user.email}</Text> <br />
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
            dangerouslySetInnerHTML={{ __html: cleanHTML }}
            style={{ fontSize: "16px" }}
          />
        </Flex>
      </Paragraph>
      <Flex
        gap="small"
        align="center"
        style={{ marginTop: "32px", marginLeft: "8px" }}
      >
        <div
          style={{ display: "flex", alignItems: "center", gap: "8px" }}
          onClick={onUpVoteClick}
        >
          <LikeOutlined
            style={{
              fontSize: "20px",
              color: isThreadUpVoted ? "#1890ff" : undefined,
            }}
          />
          <span>{localUpVotes.length}</span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginLeft: "16px",
            marginRight: "16px",
          }}
          onClick={onDownVoteClick}
        >
          <DislikeOutlined
            style={{
              fontSize: "20px",
              color: isThreadDownVoted ? "#ff4d4f" : undefined,
            }}
          />
          <span>{localDownVotes.length}</span>
        </div>
      </Flex>
    </div>
  );
}

export default ThreadDetail;
