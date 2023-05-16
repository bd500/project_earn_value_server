import {Injectable} from "@nestjs/common";
import {Prisma} from "@prisma/client";
import {PrismaService} from "src/db/prisma.service";

@Injectable()
export class ReportService {
    constructor(private prismaService: PrismaService) {}

    async createReport(report: Prisma.ReportCreateInput, projectId: string) {
        return this.prismaService.report.create({
            data: {
                ac: report.ac,
                ev: report.ev,
                pv: report.pv,
                projectId: projectId,
            },
        });
    }

    async getOne(projectId: string) {
        return this.prismaService.report.findFirstOrThrow({
            where: {projectId},
        });
    }
}
