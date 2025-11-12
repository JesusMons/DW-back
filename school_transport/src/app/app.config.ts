import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

export const appConfig: ApplicationConfig = {
    providers: [
        provideAnimationsAsync(),
        provideRouter(routes),
        providePrimeNG({
            theme: {
                preset: Aura,
                options:{
                  darkModeSelector: '.my-app-dark'
                }
            }
        }),
        provideHttpClient()
    ]
};
