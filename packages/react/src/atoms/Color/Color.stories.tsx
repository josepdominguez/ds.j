import React from 'react'

import Color from './Color'

import { text, select } from '@storybook/addon-knobs'

import { Spacing } from '@ds.j/foundation'

// css
import '@ds.j/scss/lib/Utilities.css'

export default {
    title: 'Atoms/Color'
}

export const Common = () => <Color hexCode={text('HexCode', 'pink')} />

export const CustomDimensions = () =>
    <Color
        hexCode='pink'
        width={select('Width', Object.values(Spacing), 'xxl')}
        height={select('Height', Object.values(Spacing), 'xxl')} />