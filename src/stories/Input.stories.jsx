import React from 'react';
import { Input } from 'antd';

const stories = {
    title: 'AntD/Input',
    component: Input,
    args: {
      placeholder: 'Masukkan teks...',
    },
}

export default stories

const TemplateStory = (args) => <Input {...args} />;

export const Default = TemplateStory.bind({});

export const WithDefaultValue = TemplateStory.bind({});
WithDefaultValue.args = {
  defaultValue: 'Ini adalah Text Input!',
};

export const PasswordInput = (args) => <Input.Password {...args} />;
PasswordInput.args = {
  placeholder: 'Ketik password...',
};

export const Disabled = TemplateStory.bind({});
Disabled.args = {
  disabled: true,
  placeholder: 'Input nonaktif',
};
