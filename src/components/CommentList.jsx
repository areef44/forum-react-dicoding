import React from "react";
import { Typography, Flex, Avatar } from "antd";
import { LikeOutlined, DislikeOutlined } from "@ant-design/icons";

const { Title, Paragraph,Text } = Typography;
function CommentList({ comments = [] }) {
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
        {comments.map((comment) => (
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
                <Text strong style={{ fontSize: "16px", marginLeft:'8px' }} >{comment.owner.name}</Text>
              </div>
            </Flex>
            <Paragraph style={{ margin: "16px" }}>{comment.content}</Paragraph>
            <Flex
              gap="small"
              align="center"
              style={{ marginTop: "8px", marginLeft: "8px" }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <LikeOutlined
                  style={{
                    fontSize: "16px",
                    // color: isThreadUpVoted ? "#1890ff" : undefined,
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginLeft: "16px",
                  marginRight: "16px",
                }}
              >
                <DislikeOutlined
                  style={{
                    fontSize: "16px",
                    // color: isThreadDownVoted ? "#ff4d4f" : undefined,?
                  }}
                />
              </div>
            </Flex>
          </div>
        ))}
      </Flex>
    </div>
  );
}

export default CommentList;
