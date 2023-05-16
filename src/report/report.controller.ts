import {Body, Controller, Get, Post, UseGuards} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {ReportService} from "./report.service";
import {Prisma} from "@prisma/client";

@Controller("report")
@UseGuards(AuthGuard("jwt"))
export class ReportController {
    constructor(private reportService: ReportService) {}

    @Post()
    async create(@Body() body: Prisma.ReportCreateInput) {
        const projectId = "646398c91048ca927f605f17";

        return await this.reportService.createReport(body, projectId);
    }

    @Get("/:id")
    async getOne(projectId: string) {
        return this.reportService.getOne(projectId);
    }
}
