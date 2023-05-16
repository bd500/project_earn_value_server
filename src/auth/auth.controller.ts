import {Body, Controller, Post} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {LoginDto} from "./dtos/login.dto";
import {RegisterDto} from "./dtos/register.dto";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post("login")
    login(@Body() body: LoginDto) {
        return this.authService.validate(body);
    }

    @Post("register")
    register(@Body() body: RegisterDto) {
        return this.authService.register(body);
    }
}
