import React, { useState, useEffect, ChangeEvent } from 'react'
import clx from 'classname'
// components
import CustomInputNumber from '../CustomInputNumber'
// types
import { PeopleInRoom } from './types'

const inputBlockClassname =
    'flex justify-content:space-between align-items:flex-start'

enum InputType {
    adult,
    child,
}

interface RoomProps {
    disabled?: boolean
    limit: number
    room: PeopleInRoom
    onRoomChange?: (room: PeopleInRoom) => void
}

interface PeopleInRoomWithMaxInfo extends PeopleInRoom {
    adultMax: number
    childMax: number
}

const Room = ({ disabled, limit, room, onRoomChange }: RoomProps) => {
    const [totalPeople, setTotalPeople] = useState<number>(
        room.adult + room.child
    )
    const [roomState, setRoomState] = useState<PeopleInRoomWithMaxInfo>({
        ...room,
        adultMax: limit - room.child,
        childMax: limit - room.adult,
    })

    useEffect(() => {
        setRoomState((prevRoomState) => ({
            ...prevRoomState,
            adultMax: limit - room.child,
            childMax: limit - room.adult,
        }))
    }, [limit])

    const handleInputChange =
        (type: InputType) => (e: ChangeEvent<HTMLInputElement>) => {
            const value = parseFloat(e?.target?.value)

            setRoomState((prevRoomState) => {
                let nextState = {
                    ...prevRoomState,
                }

                if (type === InputType.adult) {
                    nextState.adult = value
                } else if (type === InputType.child) {
                    nextState.child = value
                }

                setTotalPeople(nextState.adult + nextState.child)

                nextState = {
                    ...nextState,
                    adultMax: limit - nextState.child,
                    childMax: limit - nextState.adult,
                }

                onRoomChange &&
                    onRoomChange?.({
                        adult: nextState.adult,
                        child: nextState.child,
                    })

                return nextState
            })
        }

    return (
        <div className="py:12px font:14px">
            <h5>{`房間：${totalPeople} 人`}</h5>
            <div className={clx(inputBlockClassname, 'my:12px')}>
                <div className="flex flex-direction:column">
                    <span>大人</span>
                    <span className="font:12px font:gray-40 mt:4px">
                        年齡 20+
                    </span>
                </div>
                <CustomInputNumber
                    value={room.adult}
                    min={1}
                    max={roomState.adultMax}
                    key={roomState.adultMax}
                    onChange={handleInputChange(InputType.adult)}
                    disabled={disabled}
                />
            </div>
            <div className={inputBlockClassname}>
                <span>小孩</span>
                <CustomInputNumber
                    value={room.child}
                    max={roomState.childMax}
                    key={roomState.childMax}
                    onChange={handleInputChange(InputType.child)}
                    disabled={disabled}
                />
            </div>
        </div>
    )
}

export default Room
