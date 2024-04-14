import { InjectionToken } from '@angular/core';
import { Notyf } from 'notyf';

export const NotyfToken = new InjectionToken<Notyf>('NotyfToken');

export function notyfFactory(): Notyf {
  return new Notyf({
    duration: 1000,
    position: {
      x: 'center',
      y: 'top',
    },
    types: [
      {
        type: 'warning',
        background: 'orange',
        icon: {
          className: 'material-icons',
          tagName: 'i',
          text: 'warning',
        },
      },
    ],
    // Set your global Notyf configuration here
  });
}
