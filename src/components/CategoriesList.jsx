import React from 'react';
import { Button, Typography, Card, Row, Col } from 'antd';
import PropTypes from 'prop-types';

const { Title } = Typography;

function CategoriesList({ categories, selectedCategory, onSelect }) {
  return (
    <Row justify="center">
      <Col xs={24} sm={20} md={16} lg={12}>
        <Card style={{ padding: '8px' }}>
          <Title level={4}>Kategori</Title>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {categories.map((category, index) => (
              <Button
                key={index}
                type={selectedCategory === category ? 'primary' : 'default'}
                onClick={() =>
                  onSelect(selectedCategory === category ? 'all' : category)
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

CategoriesList.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedCategory: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};


export default CategoriesList;
