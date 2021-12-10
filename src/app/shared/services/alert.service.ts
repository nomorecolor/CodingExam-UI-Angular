import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor() {}

  success(title?: string, message?: string) {
    return Swal.fire({
      title: title || 'Success!',
      text: message || 'Your work has been saved.',
      icon: 'success',
      confirmButtonText: 'Ok',
      heightAuto: false,
    });
  }

  error(title?: string, message?: string) {
    return Swal.fire({
      title: title || 'Something went wrong!',
      text: message || 'Please try again.',
      icon: 'error',
      confirmButtonText: 'Ok',
      heightAuto: false,
    });
  }
}
