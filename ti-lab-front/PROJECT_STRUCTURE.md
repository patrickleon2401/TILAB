# TI Lab Front - Project Structure Guide

## Overview
TI Lab Front is a React TypeScript application built with Vite for managing laboratory components, kits, courses, and loans. The application uses React Router for navigation and features a collapsible sidebar layout.

## Tech Stack
- **Framework**: React 19.2.0 with TypeScript
- **Build Tool**: Vite 7.2.4
- **Routing**: React Router DOM 7.11.0
- **Styling**: Inline CSS styles (dark theme)
- **Linting**: ESLint with React-specific rules

## Project Structure

### Root Configuration Files
- `package.json` - Dependencies and scripts
- `vite.config.ts` - Vite configuration
- `tsconfig.json` - TypeScript configuration
- `eslint.config.js` - ESLint rules
- `.gitignore` - Git ignore patterns

### Source Code (`src/`)

#### Entry Point
- `main.tsx` - Application entry point
- `App.tsx` - Root component that renders AppRouter

#### Routing (`src/routes/`)
- `AppRouter.tsx` - Defines all application routes using React Router
  - Uses `MainLayout` as the parent route
  - Routes: Home, Registrar Componente, Lista Componentes, Crear Kit, Gestión Cursos, Gestión Préstamos, Profile

#### Layout Components (`src/components/layout/`)
- `MainLayout.tsx` - Main layout wrapper with sidebar and content area
  - Manages sidebar collapse state
  - Uses dark theme styling (#343541 background, #ececf1 text)
- `Sidebar.tsx` - Navigation sidebar component
- `Layout.tsx` - Additional layout utilities

#### Pages (`src/pages/`)
- `Home.tsx` - Home page
- `RegistrarComponente.tsx` - Component registration page
- `ListaComponentes.tsx` - Component listing page
- `CrearKit.tsx` - Kit creation page
- `GestionCursos.tsx` - Course management page
- `GestionPrestamos.tsx` - Loan management page
- `Profile.tsx` - User profile page

#### Types (`src/types/`)
- `sidebar.ts` - TypeScript interfaces for sidebar components
  - `SidebarItem` interface
  - `SidebarProps` interface

#### Styles (`src/styles/`)
- `index.css` - Global styles

#### Assets (`src/assets/`)
- `react.svg` - React logo

## Key Features
1. **Responsive Sidebar** - Collapsible navigation with smooth transitions
2. **Dark Theme** - Consistent dark color scheme throughout
3. **Type Safety** - Full TypeScript implementation
4. **Route-based Structure** - Clean separation of concerns per page

## Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production (includes TypeScript compilation)
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Navigation Flow
All routes are nested under `MainLayout`, which provides:
- Left sidebar with navigation
- Main content area that renders the selected page
- Consistent styling and layout across all pages

## Development Notes
- Uses inline styles for theming (consider CSS modules for future scalability)
- Icons in sidebar are string-based (consider React Icons library)
- State management is local to components (consider Context API for global state)