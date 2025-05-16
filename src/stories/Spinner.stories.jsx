import React from 'react';
import { Spin, Alert } from 'antd';

const stories = {
  title: 'AntD/Spinner',
  component: Spin,
};

export default stories;

const TemplateStory = (args) => (
  <Spin {...args}>
    <Alert
      message='Content'
      description='Please wait while content loads.'
      type='info'
    />
  </Spin>
);

export const Small = TemplateStory.bind({});
Small.args = {
  spinning: true,
  size: 'small',
};

export const Medium = TemplateStory.bind({});
Medium.args = {
  spinning: true,
};

export const Large = TemplateStory.bind({});
Large.args = {
  spinning: true,
  size: 'large',
};
