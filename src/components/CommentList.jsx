import React from "react";
import { Typography, Flex, Avatar } from "antd";
import { LikeOutlined, DislikeOutlined } from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

function CommentList({
  comments = [],
  authUser,
  onUpVote,
  onDownVote,
  onNeutralVote,
}) {
  return (
    <div style={{ marginTop: "32px" }}>
      <Title level={5}>Komentar ({comments.length})</Title>
      <Flex
        style={{
          flexDirection: "column",
          gap: "16px",
          width: "100%",
          marginBottom: "8px",
          marginTop: "16px",
        }}
      >
        {comments.map((comment) => {
          const isUpVoted = authUser ? comment.upVotesBy.includes(authUser.id) : false;
          const isDownVoted = authUser ? comment.downVotesBy.includes(authUser.id) : false;

          const handleUpVote = () => {
            if (isUpVoted) {
              onNeutralVote(comment.id); // Jika sudah upvote, jadikan netral
            } else {
              onUpVote(comment.id); // Jika belum, lakukan upvote
            }
          };

          const handleDownVote = () => {
            if (isDownVoted) {
              onNeutralVote(comment.id); // Jika sudah downvote, jadikan netral
            } else {
              onDownVote(comment.id); // Jika belum, lakukan downvote
            }
          };

          return (
            <div
              key={comment.id}
              style={{
                borderBottom: "1px solid #f0f0f0",
                paddingBottom: "12px",
                width: "100%",
              }}
            >
              <Flex>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Avatar src={comment.owner.avatar} size={32} />
                  <Text strong style={{ fontSize: "16px", marginLeft: "8px" }}>
                    {comment.owner.name}
                  </Text>
                </div>
              </Flex>
              <Paragraph style={{ margin: "16px" }}>{comment.content}</Paragraph>
              <Flex
                gap="small"
                align="center"
                style={{ marginTop: "8px", marginLeft: "8px" }}
              >
                {/* Upvote Section */}
                <div
                  onClick={handleUpVote}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    cursor: "pointer",
                  }}
                >
                  <LikeOutlined
                    style={{
                      fontSize: "16px",
                      color: isUpVoted ? "#1890ff" : undefined, // Blue if upvoted
                    }}
                  />
                  <span>{comment.upVotesBy.length}</span>
                </div>

                {/* Downvote Section */}
                <div
                  onClick={handleDownVote}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginLeft: "16px",
                    marginRight: "16px",
                    cursor: "pointer",
                  }}
                >
                  <DislikeOutlined
                    style={{
                      fontSize: "16px",
                      color: isDownVoted ? "#ff4d4f" : undefined, // Red if downvoted
                    }}
                  />
                  <span>{comment.downVotesBy.length}</span>
                </div>
              </Flex>
            </div>
          );
        })}
      </Flex>
    </div>
  );
}

export default CommentList;
