import { prisma } from "@/prisma/prisma";

export const getUserbyId = async (id: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: id
            }
        })

        return user;
    } catch (error) {

        console.log(error)

        return null
        
    }
}