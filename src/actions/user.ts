"use server"

import {PrismaClient} from "@prisma/client";
import {TUser} from "@/actions/types";

const prisma = new PrismaClient()

export async function SaveUser(data: TUser) {
    let user = await prisma.user.create({
        data: {
            firstname: data.firstname,
            lastname: data.lastname,
            phone_number: data.phone_number,
            date_of_birth: data.date_of_birth,
            nationality: data.nationality,
            email: data.email,
            password: data.password
        }
    })

    return user
}

export async function UpdateUser(userId: number, data: any) {
    let user = await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            email: data.email,
            password: data.password
        }
    })
}