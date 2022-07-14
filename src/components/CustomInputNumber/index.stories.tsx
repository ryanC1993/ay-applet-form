import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
// components
import CustomInputNumber from './index'

export default {
    title: 'CustomInputNumber',
    component: CustomInputNumber,
} as ComponentMeta<typeof CustomInputNumber>

const Template: ComponentStory<typeof CustomInputNumber> = (args) => (
    <CustomInputNumber {...args} />
)

export const Default = Template.bind({})

export const DefaultValue3 = Template.bind({})
DefaultValue3.args = {
    value: 3,
}

export const StepValue2 = Template.bind({})
StepValue2.args = {
    step: 2,
}

export const Disabled = Template.bind({})
Disabled.args = {
    disabled: true,
}
