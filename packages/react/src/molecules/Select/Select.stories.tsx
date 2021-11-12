import React from 'react'

import Select from './Select'

import { withA11y } from '@storybook/addon-a11y'

// css
import '@ds.j/scss/lib/Utilities.css'
import '@ds.j/scss/lib/Margin.css'
import '@ds.j/scss/lib/Select.css'
import '@ds.j/scss/lib/global.css'

const options = [
    {
        label: 'Strict Black',
        value: 'strict-black',
    },
    {
        label: 'Heavenly Green',
        value: 'heavenly-green',
    },
    {
        label: 'Sweet Pink',
        value: 'pink',
    },
]

// Name of the group
export default {
    title: 'Molecules/Select',
    decorators: [withA11y]
}

// Variants/Samples of the component to showcase
export const Common = () => <Select options={options} />

export const RenderOption = () =>
    <Select
        options={options}
        renderOption={({ getOptionRecommendedProps, option, isSelected }) =>
            <span {...getOptionRecommendedProps()}>{option.label} {isSelected ? 'SELECTED !' : ''}</span>}
    />

export const CustomLabel = () => <Select options={options} label='Select a color' />