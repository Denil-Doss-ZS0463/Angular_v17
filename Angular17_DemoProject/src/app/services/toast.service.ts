import { Inject, Injectable } from '@angular/core';
import { Notyf } from 'notyf';
import { NotyfToken } from '../../assets/shared/utils/notfy.token';
@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(@Inject(NotyfToken) private notyf: Notyf) {}

  success(message: any) {
    this.notyf.success(message);
  }

  error(message: any) {
    this.notyf.error(message);
  }

  warning(message: any) {
    this.notyf.open({
      type: 'warning',
      message: message,
    });
  }
}
