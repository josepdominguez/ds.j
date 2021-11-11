import React, { useState, useRef, useEffect, KeyboardEventHandler, createRef } from 'react'
import Text from '../../atoms/Text'

const KEY_CODES = {
    ENTER: 13,
    SPACE: 32,
    DOWN_ARROW: 40
}

interface SelectOption {
    label: string
    value: string
}

interface RenderOptionProps {
    isSelected: boolean,
    option: SelectOption,
    getOptionRecommendedProps: (overrideProps?: Object) => Object
}

interface SelectProps {
    onOptionSelected?: (option: SelectOption, optionIndex: number) => void
    options?: SelectOption[]
    label?: string,
    renderOption: (props: RenderOptionProps) => React.ReactNode
}

const Select: React.FC<SelectProps> = ({ options = [], label = 'Please select an option', onOptionSelected: handler, renderOption }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [selectedIndex, setSelectedIndex] = useState<null | number>(null)
    const [highlightedIndex, setHighlightedIndex] = useState<null | number>(null)
    const labelRef = useRef<HTMLButtonElement>(null);
    const [optionRefs, setOptionRefs] = useState<React.RefObject<HTMLLIElement>[]>([])
    const [overlayTop, setOverlayTop] = useState<number>(0)

    const onOptionSelected = (option: SelectOption, optionIndex: number) => {
        setIsOpen(!isOpen)
        if (handler) {
            handler(option, optionIndex)
        }

        setSelectedIndex(optionIndex)
        setIsOpen(false)

    }
    const onLabelClick = () => {
        setIsOpen(!isOpen)
    }

    useEffect(() => {
        setOverlayTop((
            labelRef.current?.offsetHeight || 0
        ) + 10)
    }, [labelRef.current?.offsetHeight])

    let selectedOption = null
    if (selectedIndex !== null) {
        selectedOption = options[selectedIndex]
    }

    const highlightItem = (optionIndex: number|null) => {
        setHighlightedIndex(optionIndex)
        // if (optionIndex !== null) {
        //     const ref = optionRefs[optionIndex]
        //     if (ref && ref.current) {
        //         ref.current.focus()
        //     }
        // }
        
    }
    const onButtonKeyDown: KeyboardEventHandler = (event) => {
        console.log('hey')
        event.preventDefault()
        
        if ([KEY_CODES.ENTER, KEY_CODES.SPACE, KEY_CODES.DOWN_ARROW].includes(event.keyCode)) {
            setIsOpen(true)

            // set focus on the list item
            highlightItem(0)
        }

    }

    useEffect(() => {
        setOptionRefs(options.map(_ => createRef<HTMLLIElement>()))
    }, [options.length])

    useEffect(() => {
        if (highlightedIndex !== null && isOpen) {
            const ref = optionRefs[highlightedIndex]

            if (ref && ref.current) {
                ref.current.focus()
            }
        }
    }, [isOpen])

    return <div className='dse-select'>
        <button onKeyDown={onButtonKeyDown} aria-controls='dse-select-list' aria-haspopup={true} aria-expanded={isOpen ? true : undefined} ref={labelRef} className='dse-select__label' onClick={() => onLabelClick()}>
            <Text>{selectedOption === null ? label : selectedOption.label}</Text>
            <svg className={`dse-select__caret ${isOpen ? 'dse-select__caret--open' : 'dse-select__caret--closed'}`} width='1rem' height='1rem' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
        </button>
        {isOpen ?
            <ul role='menu' id='dse-select-list' style={{ top: overlayTop }} className='dse-select__overlay'>
                {options.map((option, optionIndex) => {
                    const isSelected = selectedIndex === optionIndex
                    const isHighlighted = highlightedIndex === optionIndex

                    const ref = optionRefs[optionIndex]

                    const renderOptionProps = {
                        ref,
                        option,
                        isSelected,
                        getOptionRecommendedProps: (overrideProps = {}) => {
                            return {
                                ref,
                                tabindex: isHighlighted ? -1 : 0,
                                onMouseEnter: () => highlightItem(optionIndex),
                                onMouseLeave: () => highlightItem(null),
                                className: `
                                    dse-select__option
                                    ${isSelected ? 'dse-select__option--selected' : ''}
                                    ${isHighlighted ? 'dse-select__option--highlighted' : ''}
                                `,
                                onClick: () => onOptionSelected(option, optionIndex),
                                key: option.value,
                                ...overrideProps
                            }
                        }
                    }

                    if (renderOption) {
                        return renderOption(renderOptionProps)
                    }
                    return <li
                        {...renderOptionProps.getOptionRecommendedProps()}
                        >
                        <Text>
                            {option.label}
                        </Text>
                        {isSelected ? <svg width='1rem' height='1rem' className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg> : ''}
                    </li>
                })}
            </ul> : null}

    </div>
}

export default Select