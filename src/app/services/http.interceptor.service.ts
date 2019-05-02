import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { tap } from 'rxjs/operators';

// SERVICES
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(
    private notificationService: NotificationService
  ) { }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.notificationService.initLoading();
    return next.handle(request).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) {
            this.notificationService.stopLoading();
          }
        },
        error => {
          this.notificationService.stopLoading();
          this.notificationService.notify(error.error.error, error.code);
        }
      )
    );
  }

}
