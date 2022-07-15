import React, { useState } from 'react'
import clx from 'classname'
// components
import Room from './Room'
// types
import { PeopleInRoom } from './types'
// utils
import { getSafeRoomAllocationProps, getUnAllocatedCount } from './utils'

interface RoomAllocationProps {
    /** Total guest value */
    guest: number
    /** Total room value */
    room: number
    /** Optional value for guest limt per room */
    limitPerRoom?: number
    /** Optional change handler */
    onChange?: (roomAllocation: PeopleInRoom[]) => void
}

const RoomAllocation = ({
    guest,
    room,
    limitPerRoom: LIMIT_PER_EOOM = 4,
    onChange,
}: RoomAllocationProps) => {
    const [guestCount, correctRoomCount, limitPerRoom] =
        getSafeRoomAllocationProps(guest, room, LIMIT_PER_EOOM)

    const [roomAllocation, setRoomAllocation] = useState<PeopleInRoom[]>(
        Array(correctRoomCount).fill({ adult: 1, child: 0 })
    )
    const [unAllocatedCount, setUnAllocatedCount] = useState<number>(
        getUnAllocatedCount(guestCount, roomAllocation)
    )

    const handleRoomChange = (roomIndex: number) => (_room: PeopleInRoom) => {
        setRoomAllocation((prevRoomAllocation) => {
            const nextRoomAllocation = [...prevRoomAllocation]
            nextRoomAllocation[roomIndex] = _room

            setUnAllocatedCount(
                getUnAllocatedCount(guestCount, nextRoomAllocation)
            )

            onChange && onChange?.(nextRoomAllocation)
            return nextRoomAllocation
        })
    }

    return (
        <div className="px:16px border:1px|solid|gray-88 r:4px min-w:360">
            <div className="py:12px flex justify-content:space-between align-items:flex-end">
                <h4>{`住客人數：${guestCount} 人 / ${correctRoomCount} 房`}</h4>
                <h6>{`每房上限：${limitPerRoom} 人`}</h6>
            </div>
            <div
                className={clx('my:12px py:16px px:8px r:4px font:14px', {
                    'border:1px|solid|sky-80 background:sky-92':
                        !!unAllocatedCount,
                    'border:1px|solid|green-80 background:green-92':
                        !unAllocatedCount,
                })}
            >
                {!!unAllocatedCount
                    ? `尚未分配人數：${unAllocatedCount}`
                    : '點擊確認完成預定！'}
            </div>
            {roomAllocation.map((room: PeopleInRoom, idx: number) => {
                const isLastRoom = idx === roomAllocation?.length - 1
                const roomPeopleCount = room.adult + room.child
                const isAllAllocated = unAllocatedCount === 0

                return (
                    <div
                        className={clx({
                            'border-bottom:1px|solid|gray-88': !isLastRoom,
                        })}
                        key={`room-${idx}`}
                    >
                        <Room
                            disabled={guestCount === correctRoomCount}
                            room={room}
                            limit={
                                isAllAllocated ? roomPeopleCount : limitPerRoom
                            }
                            onRoomChange={handleRoomChange(idx)}
                        />
                    </div>
                )
            })}
        </div>
    )
}

export default RoomAllocation
