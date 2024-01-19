import zod from "zod"

export const addFriendValidator = zod.object({
    email: zod.string().email(),
})