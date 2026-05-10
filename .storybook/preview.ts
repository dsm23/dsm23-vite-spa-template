import type { Preview } from "@storybook/react-vite";

import "../src/index.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/iv,
        date: /Date$/iv,
      },
    },
  },
};

export default preview;
