import {Injectable, UnauthorizedException} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import {PrismaService} from "src/db/prisma.service";

@Injectable()
export class JwtStragery extends PassportStrategy(Strategy) {
    constructor(private readonly prismaService: PrismaService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    async validate(payload) {
        const user = await this.prismaService.user.findFirstOrThrow({
            where: {id: payload.id},
        });
        if (!user) throw new UnauthorizedException();

        return user;
    }
}
