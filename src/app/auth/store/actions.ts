import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';
import { RegisterRequestInterface } from '../types/registerRequest.interface';
import { currentUser } from '../../shared/user.interface';
import { BackendErrors } from '../../shared/backendErrors.interface';

export const authActions = createActionGroup({
  source: 'auth',
  events: {
    Register: props<{ request: RegisterRequestInterface }>(),
    'Register Success': props<{ currentUser: currentUser }>(),
    'Register Failure': props<{ errors: BackendErrors }>(),
  },
});

// export const register = createAction(
//   '[Auth] Register',
//   props<{ request: RegisterRequestInterface }>()
// );

// export const registerSuccess = createAction(
//   '[Auth] Register',
//   props<{ request: RegisterRequestInterface }>()
// );

// export const registerFailure = createAction(
//   '[Auth] Register',
//   props<{ request: RegisterRequestInterface }>()
// );
