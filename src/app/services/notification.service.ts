import { Injectable } from '@angular/core';

// SERVICES
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  public isLoading: boolean = false;

  constructor(
    private toastrService: ToastrService
  ) { }

  public notify(message?: string, code?: number): void {
    if (code === 200) {
      this.toastrService.success(message, 'Sucesso!');
      return;
    }
    if (code === 420) {
      this.toastrService.info(message, 'Informação!');
      return;
    }
    if (code === 401 || code === 403) {
      this.toastrService.warning('Sem permissão...', 'Aviso!');
      return;
    }
    if (code === 500) {
      this.toastrService.error(message, 'Aplicação indisponível!');
      return;
    }
    this.toastrService.info(message, 'Informação!');
  }

  public initLoading(): void {
    this.isLoading = true;
  }

  public stopLoading(): void {
    this.isLoading = false;
  }

}
