import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { authActions } from '../../store/actions';
import { RegisterRequestInterface } from '../../types/registerRequest.interface';
import { selectIsSubmitting } from '../../store/reducer';
import { AuthState } from '../../types/authState.interface';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  formData: FormGroup;
  isSubmitting$ = this.store.select(selectIsSubmitting);

  constructor(
    private fb: FormBuilder,
    private store: Store<{ auth: AuthState }>,
    private authService: AuthService
  ) {
    this.formData = this.fb.nonNullable.group({
      username: ['emilys', Validators.required],
      password: ['emilyspass', [Validators.required, Validators.min(6)]],
    });
    this.authService;
  }

  onSubmit() {
    console.log(this.formData.getRawValue());
    const request: RegisterRequestInterface = this.formData.getRawValue();
    // this.store.dispatch(authActions.register({ request }));
    this.authService.register(request).subscribe((result) => {
      console.log(result);
    });
  }
}
