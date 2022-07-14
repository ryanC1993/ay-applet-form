import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
// components
import CustomInputNumber from './index'

export default {
    title: 'CustomInputNumber',
    component: CustomInputNumber,
} as ComponentMeta<typeof CustomInputNumber>

const Template: ComponentStory<typeof CustomInputNumber> = () => (
    <CustomInputNumber />
)

export const Primary = Template.bind({})
