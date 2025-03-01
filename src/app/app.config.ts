import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { authFeatureKey, authReducer } from './auth/store/reducer';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import * as authEffects  from './auth/store/effects';


export interface UserConfig {
  apiUrl: string;
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    provideRouter(routes),
    provideClientHydration(),
    provideEffects(authEffects),
    provideStore(),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode,
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
    provideState(authFeatureKey, authReducer),
    {
      provide: 'API_URL',
      useValue: { apiUrl: 'https://dummyjson.com/auth/login' },
    },
  ],
};
