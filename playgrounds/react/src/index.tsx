import React from 'react'
import ReactDOM from 'react-dom'
import { Color, Button, Text, Margin, Select } from '@ds.j/react'

import '@ds.j/scss/lib/Utilities.css'
import '@ds.j/scss/lib/Text.css'
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

ReactDOM.render(
    <div style={{ padding: '40px' }}>
        {/* <Margin>
            <Text size='xs'>this is some text</Text>
        </Margin> */}
        {/* <Margin> */}
            {/* <Select options={options} renderOption={({ option, getOptionRecommendedProps }) => <p {...getOptionRecommendedProps({
                className: 'custom'
            })}>{option.label}</p>} /> */}
            <Select options={options} />
        {/* </Margin> */}
        
        {/* <Color hexCode='#000' width='lg' height='lg' /> */}
         {/* {console.log('Button', Button)} */}
        {/* <Button className='dse-button--container' label='Hello' /> */}
    </div>,
    document.querySelector('#root')
)
