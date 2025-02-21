import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../services/auth.service';
import { ActionsSubject } from '@ngrx/store';
import { authActions } from './actions';
import { switchMap, map, catchError, of } from 'rxjs';
import { currentUser } from '../../shared/user.interface';

export const registerEffect = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) => {
    return actions$.pipe(
      ofType(authActions.register),
      switchMap(({ request }) => {
        return authService.register(request).pipe(
          map((currentUser: currentUser) => {
            return authActions.regsitserSuccess({ currentUser });
          }),
          catchError(() => {
            return of(authActions.regsitserFailure());
          })
        );
      })
    );
  },
  {
    functional: true,
  }
);
