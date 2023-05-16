import {Injectable} from "@nestjs/common";
import {PrismaService} from "../db/prisma.service";
import {Prisma, User} from "@prisma/client";

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async findAll() {
        return this.prisma.user.findMany({
            include: {
                projects: true,
            },
        });
    }

    async findOne(id: string) {
        const user = await this.prisma.user.findFirstOrThrow({
            where: {
                id,
            },
        });

        return user;
    }

    async updateUser(data: Prisma.UserUpdateInput, id: string) {
        return this.prisma.user.update({
            where: {
                id: id,
            },
            data: {...data},
        });
    }
}
