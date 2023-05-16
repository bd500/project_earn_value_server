import {Injectable, NotFoundException} from "@nestjs/common";
import {Prisma} from "@prisma/client";
import {PrismaService} from "src/db/prisma.service";

@Injectable()
export class ProjectService {
    constructor(private prismaService: PrismaService) {}

    async getUserProjects(user: any) {
        return this.prismaService.project.findMany({where: {id: user.id}});
    }

    async getOne(id: string) {
        return this.prismaService.project.findFirstOrThrow({
            where: {id},
            include: {
                report: true,
            },
        });
    }

    async createProject(project: Prisma.ProjectCreateInput, user: any) {
        return this.prismaService.project.create({
            data: {
                name: project.name,
                duration: project.duration,
                status: project.status,
                userId: user.id,
                tasks: project.tasks,
            },
        });
    }

    async updateProject(project: Prisma.ProjectUpdateInput, id: string) {
        const existPro = await this.prismaService.project.findUnique({
            where: {id},
        });

        if (!existPro) throw new NotFoundException("Project not found.");

        return this.prismaService.project.update({
            where: {id},
            data: {...project},
        });
    }

    async deleteProject(id: string) {
        const existPro = await this.prismaService.project.findUnique({
            where: {id},
        });

        if (!existPro) throw new NotFoundException("Project not found.");

        return this.prismaService.project.delete({
            where: {id: id},
        });
    }
}
