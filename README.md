# React + TypeScript + Vite

## How to Run the Project

``` plaintext
1. **Install Dependencies**  
  Run the following command in your project directory to install all required dependencies:
```

  ``` bash
  npm install
  ```

1. **Start the Development Server**  
  Use the following command to start the development server:

  ``` bash
  npm run dev
  ```

  The app will be available at [http://localhost:5173](http://localhost:5173) by default.

1. **Build for Production**  
  To create an optimized production build, run:

  ``` bash
  npm run build
  ```

1. **Preview the Production Build**  
  To preview the production build locally:
  
  ``` bash
  npm run preview
  ```

---

## Implementation Details

### Project Structure

- **`src/`**: Contains all source code.
- **`components/`**: Houses reusable React components.
- **`App.tsx`**: Main application component.
- **`main.tsx`**: Entry point for the React app.

### Component Implementation

1. **Component Creation**  
  Each required component was created as a separate `.tsx` file inside the `src/components` directory. TypeScript interfaces were used to define props for type safety.

2. **State Management**  
  React's `useState` and `useEffect` hooks were used for managing local state and side effects within components.

3. **Props and Composition**  
  Components were designed to be reusable and composable. Props were used to pass data and callbacks between parent and child components.

4. **Styling**  
  Styling was handled using CSS modules or standard CSS files, imported directly into each component for scoped styles.

5. **TypeScript Integration**  
  All components and logic were written in TypeScript, ensuring type safety and better developer experience.

6. **Vite Configuration**  
  Vite was used as the build tool for fast development and optimized builds. The configuration is minimal and leverages Vite's sensible defaults for React and TypeScript projects.

---

Feel free to explore the codebase for more details on each component's implementation.

## File Structure and Key Modules

### File Structure Overview

``` plaintext
src/
├── components/
│   ├── dashboard_employee_management/
│   ├── dashboard_home/
│   └── ... (other reusable components)
├── context/
│   ├── UsernameContext.tsx
|   └── userContextValue.ts
├── pages/
|   ├──login.tsx
|   └──Dashboard.tsx
├── utils/
|   └──hooks/
│      ├── useExportCSV.ts
│      ├── useModal.ts
│      └── ... (other custom hooks)
│   ├── handleFormSubmit.tsx
│   └── searchbar.tsx
│   └── ... (other custom utils)
├── App.tsx
├── main.tsx
└── ...
```

- **pages/Login/**: Contains the login form and related UI logic.
- **components/dashboard_employee_management/**: Handles employee and listing and CRUD operations.
- **components/dashboard_home/**: Displays user-specific and app-wide metrics.
- **context/UsernameContext.tsx**: Provides a React context for sharing the logged-in username across components.
- **context/userContextValue.ts**: Provides the actual UserContext and the type for faster loading.
- **hooks/**: Custom hooks for encapsulating logic (e.g., authentication, employee data fetching).
- **utils/**: Utility functions for API calls and helpers.

### Explanation of Hooks, Utils, and Components

- **useExportCSV**: Custom hook for downloading the table as a csv file.
- **handleFormSubmit**: authentication logic (login, logout, session management).
- **useModal**: Simple Hook to simplify and optimise the props used in modals.
- **UseUser**: Centralizes context for username of the logger user.
- **useUserTableColumns.tsx**: Custom Hook for easier accessibility of the table data.

### Optimizations

- **Component Memoization**: Used `React.memo` and `useMemo` to prevent unnecessary re-renders.
- **Efficient State Management**: Leveraged context and custom hooks to avoid prop drilling and redundant state.
- **Code Splitting**: Dynamically imported large components (e.g., Dashboard) for faster initial load.
- **API Caching**: Implemented caching in hooks to minimize network requests.
- **Scoped Styling**: Used CSS modules to prevent style conflicts and improve maintainability.

This structure ensures modularity, reusability, and performance throughout the application
