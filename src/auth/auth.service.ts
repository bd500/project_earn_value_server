import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from "@nestjs/common";
import {LoginDto} from "./dtos/login.dto";
import {PrismaService} from "src/db/prisma.service";
import {JwtService} from "@nestjs/jwt";
import {RegisterDto} from "./dtos/register.dto";

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService
    ) {}

    async validate({email, password}: LoginDto) {
        const user = await this.prisma.user.findFirstOrThrow({
            where: {
                email,
            },
            include: {
                projects: true,
            },
        });

        // if (!user) throw new NotFoundException("User not Found");

        if (password !== user.password) {
            throw new UnauthorizedException();
        }

        const token = this.jwtService.sign({id: user.id});
        const result = {
            id: user.id,
            email: user.email,
            password: user.password,
            projects: user.projects,
            token,
        };

        return result;
    }

    async register(user: RegisterDto) {
        return this.prisma.user.create({
            data: {
                email: user.email,
                name: user.name,
                password: user.password,
                // isAdmin: true,
            },
        });
    }
}
