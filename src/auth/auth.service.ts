import {Injectable, UnauthorizedException} from "@nestjs/common";
import {LoginDto} from "./dtos/login.dto";
import {PrismaService} from "src/db/prisma.service";
import {JwtService} from "@nestjs/jwt";
import {RegisterDto} from "./dtos/register.dto";
import * as bcrypt from "bcrypt";

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

        const isValidPass = await bcrypt.compare(password, user.password);
        if (!isValidPass) {
            throw new UnauthorizedException();
        }

        const token = this.jwtService.sign({id: user.id});
        const result = {
            id: user.id,
            email: user.email,
            projects: user.projects,
            token,
            isAdmin: user.isAdmin,
            name: user.name,
        };

        return result;
    }

    async register(user: RegisterDto) {
        const salt = await bcrypt.genSalt();
        const hashPass = await bcrypt.hash(user.password, salt);

        return this.prisma.user.create({
            data: {
                email: user.email,
                name: user.name,
                password: hashPass,
                // isAdmin: true,
            },
        });
    }
}
