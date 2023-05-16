import {Module} from "@nestjs/common";
import {AppController} from "./app.controller";
import {AppService} from "./app.service";
import {UserModule} from "./user/user.module";
import {AuthModule} from "./auth/auth.module";
import {ConfigModule} from "@nestjs/config";
import { ReportModule } from './report/report.module';
import { ProjectModule } from './project/project.module';

@Module({
    imports: [UserModule, AuthModule, ConfigModule.forRoot(), ReportModule, ProjectModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
