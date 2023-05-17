import {Injectable} from "@nestjs/common";
import {PrismaService} from "../db/prisma.service";
import {Prisma, User} from "@prisma/client";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async findAll() {
        return this.prisma.user.findMany({
            // include: {
            //     projects: true,
            // },
            select: {
                name: true,
                email: true,
                id: true,
                isAdmin: true,
            },
        });
    }

    async findOne(id: string) {
        const user = await this.prisma.user.findFirstOrThrow({
            where: {
                id,
            },
            select: {
                id: true,
                email: true,
                isAdmin: true,
                name: true,
            },
        });

        return user;
    }

    async updateUser(data: Prisma.UserUpdateInput, id: string) {
        if (data.password) {
            const salt = await bcrypt.genSalt();
            const hashPass = await bcrypt.hash(data.password.toString(), salt);
            data.password = hashPass;
        }

        return this.prisma.user.update({
            where: {
                id: id,
            },
            data: {...data},
            select: {
                id: true,
                email: true,
                isAdmin: true,
                name: true,
            },
        });
    }
}
