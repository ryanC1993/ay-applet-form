import { PeopleInRoom } from './types'

export const getCorrectRoomCount = (
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
