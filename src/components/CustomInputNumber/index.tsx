import React, { useState, useRef, ChangeEvent, FocusEvent } from 'react'
import clx from 'classname'
// hooks
import usePress from '../../hooks/usePress'

const buttonClassName = `
    text:center border:1px|solid|sky-66 font:sky-50 w:40px py:8px r:4px scale(0.95):active ~duration:200
`
const inputClassName = `
    mx:8px w:60px r:4px border:1px|solid|gray-66 font:fade-20 px:12px text:center
`

interface CustomInputNumberProps {
    name?: string
    /** The min value */
    min?: number
    /** The max value */
    max?: number
    /** The step value */
    step?: number
    /** If disable the number input */
    disabled?: boolean
    /** The default value */
    value?: number
    /** Optional change handler */
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
    /** Optional blur handler */
    onBlur?: (e: FocusEvent<HTMLInputElement>) => void
    /** Optional focus handler */
    // onFocus?: (e: FocusEvent<HTMLInputElement>) => void
    /** Optional handler that is triggered when Enter key is pressed */
    // onPressEnter?: (e: KeyboardEvent<HTMLInputElement>) => void
}

const CustomInputNumber = ({
    min = 0,
    max = 30,
    step = 1,
    value = 0,
    disabled = false,
    ...restProps
}: CustomInputNumberProps) => {
    const { onChange, onBlur } = restProps
    const defaultValue = useRef((value < min ? min : value).toString())
    const postiveStep = useRef(Math.abs(step))
    const inputRef = useRef<HTMLInputElement>(null)
    const [inputValue, setInputValue] = useState<string>(defaultValue.current)

    const handleOnChange = (e) => {
        onChange && onChange?.(e)
        setInputValue(e?.target?.value)
    }
    const handleOnBlur = (e) => {
        onBlur && onBlur?.(e)
        if (!inputValue) {
            setInputValue(defaultValue.current)
        } else {
            const curentValue = parseFloat(inputValue)
            if (curentValue > max) {
                setInputValue(max.toString())
            } else if (curentValue < min) {
                setInputValue(min.toString())
            } else {
                setInputValue(curentValue.toString())
            }
        }
    }
    const handlePlusMinus = (num: number) => () => {
        if (disabled) return

        setInputValue((prevInputValue) => {
            const nextStep = num * postiveStep.current
            let nextValue = parseFloat(prevInputValue) + nextStep

            if (nextValue > max) {
                nextValue = max
            } else if (nextValue < min) {
                nextValue = min
            }

            Object.getOwnPropertyDescriptor(
                window?.HTMLInputElement?.prototype,
                'value'
            ).set.call(inputRef.current, nextValue.toString())
            const onChangeEvent = new Event('input', { bubbles: true })
            inputRef.current?.dispatchEvent(onChangeEvent)

            return nextValue.toString()
        })
    }
    const handlePress = (num: number) =>
        usePress({ callback: handlePlusMinus(num) })

    return (
        <div
            className={clx('flex', {
                'opacity:0.5 pointer-events:none': disabled,
            })}
        >
            <button className={buttonClassName} {...handlePress(-1)}>
                -
            </button>
            <input
                className={inputClassName}
                type="number"
                value={inputValue}
                min={min}
                max={max}
                disabled={disabled}
                onChange={handleOnChange}
                onBlur={handleOnBlur}
                ref={inputRef}
            />
            <button className={buttonClassName} {...handlePress(1)}>
                +
            </button>
        </div>
    )
}

export default CustomInputNumber
