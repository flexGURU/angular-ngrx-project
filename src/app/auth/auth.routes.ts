import { Component } from '@angular/core';
import { Route } from '@angular/router';
import path from 'path';
import { RegisterComponent } from './components/register/register.component';

console.log('Auth Routes module is being loaded lazily');

export const registerRoutes: Route[] = [
  {
    path: '',
    component: RegisterComponent,
  },
];
