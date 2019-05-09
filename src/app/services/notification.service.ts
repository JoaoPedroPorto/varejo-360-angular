import { Injectable } from '@angular/core';

// SERVICES
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  public isLoading = false;
  public serverIndisponible = false;

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
    if (code === 401) {
      this.toastrService.warning('Sem acesso...', 'Aviso!');
      return;
    }
    if (code === 403) {
      this.toastrService.warning('Sem permissão...', 'Aviso!');
      return;
    }
    if (code === 500) {
      this.serverIndisponible = true;
      this.toastrService.error(message, 'Erro na aplicação!');
      return;
    }
    if (code === 0 || code === 503 || code === 404) {
      this.serverIndisponible = true;
      this.toastrService.error('Aplicação se encontra indisponível no momento. Tente novamente mais tarde...', 'Aplicação indisponível!');
      return;
    }
  }

  public initLoading(): void {
    this.isLoading = true;
  }

  public stopLoading(): void {
    this.isLoading = false;
  }

  public setServerIndisponible(): void {
    this.serverIndisponible = false;
  }

}
