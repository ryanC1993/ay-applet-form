import { PeopleInRoom } from './types'

const getCorrectRoomCount = (
    guest: number,
    room: number,
    limitPerRoom: number
) => {
    if (room > guest) {
        return guest
    } else {
        const limit = room * limitPerRoom

        if (guest > limit) {
            return Math.ceil(guest / limitPerRoom)
        }

        return room
    }
}

export const getSafeRoomAllocationProps = (
    guest: number,
    room: number,
    limitPerRoom: number
) => {
    const getDefaultValue = (val) => (val < 1 ? 1 : val)
    let _guest = getDefaultValue(guest)
    let _room = getDefaultValue(room)
    let _limitPerRoom = getDefaultValue(limitPerRoom)

    const _correctRoomCount = getCorrectRoomCount(_guest, _room, _limitPerRoom)

    return [_guest, _correctRoomCount, _limitPerRoom]
}

export const getUnAllocatedCount = (
    guest: number,
    roomAllocation: PeopleInRoom[]
) => {
    return (
        guest -
        roomAllocation.reduce((acc, item) => {
            acc += item.adult + item.child
            return acc
        }, 0)
    )
}
