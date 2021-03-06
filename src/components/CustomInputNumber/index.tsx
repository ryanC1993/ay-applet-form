import React, {
    useEffect,
    useState,
    useRef,
    ChangeEvent,
    FocusEvent,
} from 'react'
import clx from 'classname'
// hooks
import usePress from '../../hooks/usePress'

const buttonClassName = `
    user-select:none text:center border:1px|solid|sky-66 font:sky-50 w:40px py:8px r:4px scale(0.95):active ~duration:200
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

interface InputEvent {
    event: Event
    value: string
}

const getDefaultValue = ({
    value,
    min,
    max,
}: {
    value: number
    min: number
    max: number
}): number => {
    if (value < min) {
        return min
    } else if (value > max) {
        return max
    }
    return value
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
    const positiveStep = Math.abs(step)
    const defaultValue = useRef(getDefaultValue({ value, min, max }).toString())
    const inputRef = useRef<HTMLInputElement>(null)
    const [inputEvent, setInputEvent] = useState<InputEvent>(null)
    const [inputValue, setInputValue] = useState<string>(defaultValue.current)

    const handleOnChange = (e) => {
        const nextValue = parseFloat(e?.target?.value)

        if (nextValue >= min && nextValue <= max) {
            onChange && onChange?.(e)
        }
        setInputValue(e?.target?.value)
    }
    const handleOnBlur = (e) => {
        onBlur && onBlur?.(e)

        const blurValue = parseFloat(e?.target?.value)
        let nextValue = blurValue.toString()
        if (!inputValue) {
            nextValue = defaultValue.current
        } else {
            if (blurValue > max) {
                nextValue = max.toString()
            } else if (blurValue < min) {
                nextValue = min.toString()
            }
        }
        const onChangeEvent = new Event('change', { bubbles: true })
        setInputEvent({
            event: onChangeEvent,
            value: nextValue.toString(),
        })
    }
    const handlePlusMinus = (num: number) => () => {
        if (disabled) return

        setInputValue((prevInputValue) => {
            const nextStep = num * positiveStep
            let nextValue = parseFloat(prevInputValue) + nextStep

            if (nextValue > max) {
                nextValue = max
            } else if (nextValue < min) {
                nextValue = min
            }

            const onChangeEvent = new Event('change', { bubbles: true })
            setInputEvent({
                event: onChangeEvent,
                value: nextValue.toString(),
            })

            return prevInputValue
        })
    }
    const handlePress = (num: number) =>
        usePress({ callback: handlePlusMinus(num) })

    useEffect(() => {
        if (inputEvent) {
            Object.getOwnPropertyDescriptor(
                Object.getPrototypeOf(inputRef.current),
                'value'
            ).set.call(inputRef.current, inputEvent.value)
            inputRef.current?.dispatchEvent(inputEvent.event)
        }
    }, [inputEvent])

    return (
        <div
            className={clx('flex', {
                'opacity:0.4 pointer-events:none': disabled,
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
