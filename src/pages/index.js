import { lazy } from 'react';

// Login Page

export const Login = lazy(() => import('./Login/Login'));

// Dashboard Page

export const Dashboard = lazy(() => import('./Dashboard/Dashboard'));

// Relicensure Form Page

export const RelicensureForm = lazy(() => import('./Forms/RelicensureForm'));

// Relicensure Form Page

export const EPharmacyForm = lazy(() => import('./Forms/EPharmacyForm'));

// Error Page

export const Error = lazy(() => import('./Error/Error'));
