import { useEffect, useState, useRef } from 'react'

enum ClickAction {
    click,
    press,
}

interface UsePressProps {
    callback?: () => void
    delay?: number
}

const usePress = ({ callback, delay = 200 }: UsePressProps) => {
    const [action, setAction] = useState<ClickAction>()

    const intervalRef = useRef(null)
    const isLongPress = useRef(false)

    const stopTimer = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
        }
    }

    const startPressTimer = () => {
        isLongPress.current = false
        intervalRef.current = setInterval(() => {
            callback && callback?.()
            isLongPress.current = true
            setAction(ClickAction.press)
        }, delay)
    }

    const handleOnTouchStart = () => {
        startPressTimer()
    }

    const handleOnTouchEnd = () => {
        if (action === ClickAction.press) return
        stopTimer()
    }

    const handleOnMouseDown = () => {
        startPressTimer()
    }

    const handleOnMouseUp = () => {
        stopTimer()
    }

    const handleOnClick = () => {
        if (isLongPress.current) {
            return
        }
        callback && callback?.()
        setAction(ClickAction.click)
    }

    useEffect(() => {
        return () => stopTimer()
    }, [])

    return {
        onClick: handleOnClick,
        onMouseDown: handleOnMouseDown,
        onMouseUp: handleOnMouseUp,
        onTouchStart: handleOnTouchStart,
        onTouchEnd: handleOnTouchEnd,
    }
}

export default usePress
