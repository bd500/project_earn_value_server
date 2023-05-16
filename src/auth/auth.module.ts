import {Module} from "@nestjs/common";
import {AuthController} from "./auth.controller";
import {AuthService} from "./auth.service";
import {PrismaService} from "../db/prisma.service";
import {JwtModule} from "@nestjs/jwt";
import {JwtStragery} from "./strageries/jwt.stragery";
import {PassportModule} from "@nestjs/passport";

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: {expiresIn: "30d"},
        }),
        PassportModule,
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStragery, PrismaService],
})
export class AuthModule {}
