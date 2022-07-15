import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
// components
import RoomAllocation from './index'

export default {
    title: 'RoomAllocation',
    component: RoomAllocation,
    parameters: {
        docs: {
            description: {
                component: '',
            },
        },
    },
} as ComponentMeta<typeof RoomAllocation>

const Template: ComponentStory<typeof RoomAllocation> = (args) => (
    <RoomAllocation
        key={`${args.guest}-${args.room}-${args.limitPerRoom || 4}`}
        {...args}
    />
)

export const Default = Template.bind({})
Default.args = {
    guest: 10,
    room: 3,
}

export const Example1 = Template.bind({})
Example1.args = {
    guest: 15,
    room: 2,
}
Example1.parameters = {
    docs: {
        description: {
            story: 'With guest 15, room 2, correct room count should be 4.',
        },
    },
}

export const Example2 = Template.bind({})
Example2.args = {
    guest: 5,
    room: 11,
}
Example2.parameters = {
    docs: {
        description: {
            story: 'With room 11, guest 5 (room > guest), correct room count should be 5.',
        },
    },
}

export const Disabled = Template.bind({})
Disabled.args = {
    guest: 3,
    room: 3,
}
Disabled.parameters = {
    docs: {
        description: {
            story: 'Disable input when guest count is equal room count.',
        },
    },
}
