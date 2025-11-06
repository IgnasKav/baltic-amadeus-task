# React + TypeScript + Vite

This project implements payment form with advanced validation features and multi-language support.

## Project Setup

```bash
npm install
npm run dev
```

## Features

- **Account Information Display**: After entering a payer IBAN, the corresponding account information appears above the form
- **Multi-Language Support**: Use the language field to switch the form's language. All error messages are translated, and account balance formatting adapts to the selected locale
- **Smart Validation**: 
  - Payment amount validates against the payer account balance
  - IBAN field validates using API responses and cross-validates with other field values
- **Account Transfers**: Transfer money between accounts seamlessly

## Technology Stack

- **TanStack Form** - Form state management and validation
- **TanStack Query** - API call management with automatic caching (prevents redundant IBAN validations)
- **Zod** - Schema definition for validation and type safety
- **Material UI** - Component library for consistent UI elements
- **Tailwind CSS** - Utility-first CSS framework for rapid styling without separate style files

## Tests
Created IBAN field test, to check zod and api validation.

```bash
#inside project root
npx vitest src/test/iban-field.test.tsx
```