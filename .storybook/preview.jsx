import React from 'react';
import { ConfigProvider } from 'antd';
import enUS from 'antd/es/calendar/locale/en_US';
import 'antd/dist/reset.css';

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <ConfigProvider locale={enUS}>
        <Story />
      </ConfigProvider>
    )
  ]
};

export default preview;