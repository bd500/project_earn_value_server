import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpStatus,
} from "@nestjs/common";
import {Prisma} from "@prisma/client";
import {BaseExceptionFilter} from "@nestjs/core";
import {Response} from "express";

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
    catch(
        exception: Prisma.PrismaClientKnownRequestError,
        host: ArgumentsHost
    ) {
        //console.log(exception.message);

        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const message = exception.message;

        console.log(exception.meta);

        switch (exception.code) {
            case "P2002": {
                const status = HttpStatus.CONFLICT;
                response.status(status).json({
                    statusCode: status,
                    message: `Duplicated field value ${exception.meta.target}`,
                    trace: message,
                });
                break;
            }
            case "P2003": {
                const status = HttpStatus.BAD_REQUEST;
                response.status(status).json({
                    statusCode: status,
                    message: `Invalid Input ${exception.meta.target}`,
                    trace: message,
                });
                break;
            }
            case "P2001": {
                const status = HttpStatus.BAD_REQUEST;
                response.status(status).json({
                    statusCode: status,
                    message: `Not found ${exception.meta.target}`,
                    trace: message,
                });
                break;
            }
            default:
                super.catch(exception, host);
                break;
        }
    }
}
