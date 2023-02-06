import { lazy } from 'react';

// Login Page

export const Login = lazy(() => import('./Login/Login'));

// Reset Password Page

export const ResetPassword = lazy(() => import('./Login/ResetPassword'));

// Dashboard Page

export const Dashboard = lazy(() => import('./Dashboard/Dashboard'));

// Relicensure Form Page

export const RelicensureForm = lazy(() => import('./Forms/RelicensureForm'));

// Relicensure Form Page

export const PharmacyRenewal = lazy(() => import('./Forms/PharmacyRenewal'));

// Relicensure Form Page

export const EPharmacyForm = lazy(() => import('./Forms/EPharmacyForm'));

// Error Page

export const Error = lazy(() => import('./Error/Error'));
