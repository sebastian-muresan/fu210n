import { Injectable } from "@angular/core";
import { HttpInterceptor } from '@angular/common/http';
import { GridColumnStyleBuilder } from '@angular/flex-layout/grid/typings/column/column';

@Injectable()
export class AuthHeaderInterceptor implements HttpInterceptor {

    intercept(req: import("@angular/common/http").HttpRequest<any>, next: import("@angular/common/http").HttpHandler): import("rxjs").Observable<import("@angular/common/http").HttpEvent<any>> {

        console.log("interceptor works");
        console.log(req.url);
        const authToken = "My Auth Token asdf";
        const authReq = req.clone({ setHeaders: { Authorization: authToken } });
        return next.handle(authReq);
    }

}