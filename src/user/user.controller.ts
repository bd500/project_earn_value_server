import {Body, Controller, Get, Param, Patch, UseGuards} from "@nestjs/common";
import {UserService} from "./user.service";
import {Prisma} from "@prisma/client";
import {AuthGuard} from "@nestjs/passport";
import {RoleGuard} from "src/auth/guards/role.guard";

@Controller("user")
export class UserController {
    constructor(private userService: UserService) {}

    @Get()
    @UseGuards(AuthGuard("jwt"), RoleGuard)
    async findAll() {
        return this.userService.findAll();
    }

    @Get("/:id")
    @UseGuards(AuthGuard("jwt"))
    async findById(@Param("id") id: string) {
        return this.userService.findOne(id);
    }

    @Patch("/:id")
    @UseGuards(AuthGuard("jwt"))
    async updateUser(
        @Param("id") id: string,
        @Body() bodyData: Prisma.UserUpdateInput
    ) {
        return this.userService.updateUser(bodyData, id);
    }
}
