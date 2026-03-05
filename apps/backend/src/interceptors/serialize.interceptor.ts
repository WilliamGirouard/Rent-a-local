import { CallHandler, ExecutionContext, NestInterceptor, UseInterceptors } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { plainToClass } from "class-transformer";

interface ClassConstructor{
    new (...args: any[]) : {};
}

export function Serialize(dto:any){
    return UseInterceptors(new SerializeInterceptor(dto))
}

export class SerializeInterceptor implements NestInterceptor{

    constructor(private dto: ClassConstructor){
    }

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        //console.log("before...\n", context)     
        return next.handle().pipe(
            map((data : any) => {
                return plainToClass(this.dto, data, {
                    excludeExtraneousValues: true
                })
                //console.log("after...\n", data)
            })
        )
    }

}