import React from "react";
import { Button, Typography, Card, Row, Col } from "antd";

const { Title } = Typography;

function CategoriesList({ categories, selectedCategory, onSelect }) {
  return (
    <Row justify="center">
      <Col xs={24} sm={20} md={16} lg={12}>
        <Card style={{ padding: "8px" }}>
          <Title level={4}>Kategori</Title>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {categories.map((category, index) => (
              <Button
                key={index}
                type={selectedCategory === category ? "primary" : "default"}
                onClick={() =>
                  onSelect(selectedCategory === category ? "all" : category)
                }
              >
                #{category}
              </Button>
            ))}
          </div>
        </Card>
      </Col>
    </Row>
  );
}

export default CategoriesList;
