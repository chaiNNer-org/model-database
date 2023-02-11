import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { TextLink } from '../../src/elements/components/link';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'TextLink',
    component: TextLink,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {},
} as ComponentMeta<typeof TextLink>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TextLink> = (args) => <TextLink {...args} />;

export const External = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
External.args = {
    href: 'openmodeldb.info',
    children: 'Open Model DB',
    external: true,
};

export const Internal = Template.bind({});
Internal.args = {
    href: 'openmodeldb.info',
    children: 'Open Model DB',
    external: false,
};
