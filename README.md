# LOGIN STATE MANAGEMENT USING ANGULAR NGRX

![state-management-lifecycle](https://github.com/user-attachments/assets/60b95eb4-04a1-41fb-b075-4bbeb6b2fa74)

# Authentication Module with Angular and NgRx

## 📂 Project Overview

This project is an authentication module built using Angular with state management handled by NgRx. The module provides a registration and login flow, including form validation, state management, and error handling. It is designed with a clean architecture and adheres to best practices for Angular and NgRx.

## 🚀 Features

- User Registration
- User Login
- Reactive Forms with Validation
- Error Handling with NgRx Effects
- State Management with NgRx Store
- Asynchronous Data Handling using Observables

## 🛠️ Technologies Used

- **Angular** for front-end framework
- **NgRx** for state management
- **Reactive Forms** for form handling
- **RxJS** for managing asynchronous operations
- **Clarity UI** for user interface components
- **Tailwind CSS** for styling

## 🧠 State Management

State management in this project is handled using **NgRx**. The state is divided into **auth** state, which includes information about the authentication process such as:

- **isSubmitting**: Boolean flag indicating form submission status
- **backendErrors**: Holds error messages from API responses
- **currentUser**: Stores the authenticated user's information

### 🔄 State Flow

1. **Action Dispatch**: When a user submits the registration form, an **action** (`authActions.register`) is dispatched.
2. **Effect Handling**: The **effect** (`registerEffect`) listens for this action, calls the **AuthService** to make the API request, and handles both **success** and **failure** scenarios.
3. **Reducer Update**: Depending on the outcome, the **reducer** updates the store with either the authenticated **currentUser** or the **backendErrors**.
4. **Component Binding**: Components subscribe to **selectors** like `selectIsSubmitting` and `selectErrors` to reflect changes in the UI.

## 📦 Example Code

### Actions

```typescript
export const authActions = createActionGroup({
  source: "auth",
  events: {
    Register: props<{ request: RegisterRequestInterface }>(),
    "Register Success": props<{ currentUser: currentUser }>(),
    "Register Failure": props<{ errors: BackendErrors }>(),
  },
});
```

### Reducer

```typescript
const initialState: AuthState = {
  isSubmitting: false,
  currentUser: null,
  errors: null,
  isLoggedIn: false,
};

const authFeature = createFeature({
  name: "auth",
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

export const { name: authFeatureKey, reducer: authReducer, selectIsSubmitting, selectCurrentUser, selectErrors, selectIsLoggedIn } = authFeature;
```

### Register Effect

```typescript
export const registerEffect = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) => {
    return actions$.pipe(
      ofType(authActions.register),
      switchMap(({ request }) => {
        return authService.register(request).pipe(
          map((currentUser: currentUser) => {
            return authActions.registerSuccess({ currentUser });
          }),
          catchError((error: HttpErrorResponse) => {
            return of(authActions.registerFailure({ errors: error.error.message }));
          })
        );
      })
    );
  },
  {
    functional: true,
  }
);
```



[src/app/auth/components/register/register.component.ts](src/app/auth/components/register/register.component.ts)


### Component Logic:![Screenshot 2025-02-25 195801](https://github.com/user-attachments/assets/ea9c6d1c-6cf2-41bc-8311-eaae100e3e03)
