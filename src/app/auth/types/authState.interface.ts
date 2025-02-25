import { BackendErrors } from '../../shared/backendErrors.interface';
import { currentUser } from '../../shared/user.interface';

export interface AuthState {
  isSubmitting: boolean;
  currentUser: currentUser | null;
  errors: BackendErrors | null | undefined;
  isLoggedIn: boolean;
}
