import {
    Body,
    Controller,
    Post,
    UseGuards,
    Req,
    Get,
    Param,
    Patch,
    Delete,
} from "@nestjs/common";
import {ProjectService} from "./project.service";
import {AuthGuard} from "@nestjs/passport";
import {Prisma} from "@prisma/client";
import {Request} from "express";

@Controller("project")
@UseGuards(AuthGuard("jwt"))
export class ProjectController {
    constructor(private projectService: ProjectService) {}

    @Post()
    async createProject(
        @Body() body: Prisma.ProjectCreateInput,
        @Req() req: Request
    ) {
        //console.log(body);

        return await this.projectService.createProject(body, req.user);
    }

    @Get("/:id")
    async getOne(@Param("id") id: string) {
        return this.projectService.getOne(id);
    }

    @Get()
    async getUserProjects(@Req() req: Request) {
        return this.projectService.getUserProjects(req.user);
    }

    @Patch("/:id")
    async update(
        @Param("id") id: string,
        @Body() body: Prisma.ProjectUpdateInput
    ) {
        return this.projectService.updateProjectReport(body, id);
    }

    @Patch("/info/:id")
    async updateInfo(
        @Param("id") id: string,
        @Body() body: Prisma.ProjectUpdateInput
    ) {
        return this.projectService.updateProject(body, id);
    }

    @Delete("/:id")
    async delete(@Param("id") id: string) {
        return this.projectService.deleteProject(id);
    }
}
