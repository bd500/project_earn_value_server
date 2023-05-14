import {Body, Controller, Get, Post, Param, Patch} from "@nestjs/common";
import {UserService} from "./user.service";
import {Prisma} from "@prisma/client";

@Controller("user")
export class UserController {
    constructor(private userService: UserService) {}

    @Get()
    async findAll() {
        return this.userService.findAll();
    }

    @Get("/:id")
    async findById(@Param("id") id: string) {
        return this.userService.findOne(id);
    }

    @Post()
    async register(
        @Body() body: {email: string; name: string; password: string}
    ) {
        const {email, name, password} = body;
        const data = {
            email,
            name,
            password,
        };

        const result = await this.userService.createUser(data);

        return result;
    }

    @Patch("/:id")
    async updateUser(
        @Param("id") id: string,
        @Body() bodyData: Prisma.UserUpdateInput
    ) {
        return this.userService.updateUser(bodyData, id);
    }
}
