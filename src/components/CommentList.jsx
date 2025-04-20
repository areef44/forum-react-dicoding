import React from "react";
import { Typography, Flex } from "antd";
import {
    LikeOutlined,
    DislikeOutlined,
  } from "@ant-design/icons";

const { Title, Paragraph } = Typography;
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
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              <img
                src={comment.owner.avatar}
                alt={comment.owner.name}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  marginRight: "12px",
                }}
              />
              <div>
                <strong>{comment.owner.name}</strong>
                <br />
                <small style={{ color: "#888" }}>{comment.owner.email}</small>
              </div>
            </div>
            <Paragraph style={{margin: '16px'}}>{comment.content}</Paragraph>
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
