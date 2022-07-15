import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
// components
import CustomInputNumber from './index'

export default {
    title: 'CustomInputNumber',
    component: CustomInputNumber,
    parameters: {
        docs: {
            description: {
                component: 'Default custom number input.',
            },
        },
    },
} as ComponentMeta<typeof CustomInputNumber>

const Template: ComponentStory<typeof CustomInputNumber> = (args) => (
    <CustomInputNumber {...args} />
)

export const Default = Template.bind({})

export const Value = Template.bind({})
Value.args = {
    value: 3,
}
Value.parameters = {
    docs: {
        description: {
            story: 'Set default value to 3',
        },
    },
}

export const StepValue = Template.bind({})
StepValue.args = {
    step: 2,
}
StepValue.parameters = {
    docs: {
        description: {
            story: 'Set step value to 2',
        },
    },
}

export const MinValue = Template.bind({})
MinValue.args = {
    min: 2,
    value: 1,
}
MinValue.parameters = {
    docs: {
        description: {
            story: 'Default value is 1, but min value is 2, use min value as default',
        },
    },
}

export const MaxValue = Template.bind({})
MaxValue.args = {
    max: 10,
    value: 11,
}
MaxValue.parameters = {
    docs: {
        description: {
            story: 'Default value is 11, but max value is 10, use max value as default.',
        },
    },
}

export const Disabled = Template.bind({})
Disabled.args = {
    disabled: true,
}
