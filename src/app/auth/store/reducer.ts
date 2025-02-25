import { createFeature, createReducer, on } from '@ngrx/store';
import { AuthState } from '../types/authState.interface';
import { authActions } from './actions';

const initialState: AuthState = {
  isSubmitting: false,
  currentUser: null,
  errors: null,
  isLoggedIn: false,
};

const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(authActions.register, (state) => ({
      ...state,
      isSubmitting: true,
      errors: null,
      isLoggedIn: false,
    })),
    on(authActions.registerSuccess, (state, action) => ({
      ...state,
      isSubmitting: false,
      currentUser: action.currentUser,
      isLoggedIn: true,
    })),
    on(authActions.registerFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      errors: action.errors,
      isLoggedIn: false,
    }))
  ),
});

export const {
  name: authFeatureKey,
  reducer: authReducer,
  selectIsSubmitting,
  selectCurrentUser,
  selectErrors,
  selectIsLoggedIn,
} = authFeature;
