import {Injectable} from "@nestjs/common";
import {LoginDto} from "./dtos/login.dto";

@Injectable()
export class AuthService {
    async login({email, password}: LoginDto) {}
}
