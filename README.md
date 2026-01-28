# GasSpaApp - Google Apps Script React App

A modern React application built with TypeScript and Vite, designed to be deployed as a Google Apps Script (GAS) Web App.

## 🚀 Quick Start

### Prerequisites
- Node.js & npm
- [clasp](https://github.com/google/clasp) installed globally (`npm install -g @google/clasp`)
- Authenticated with clasp (`clasp login`)

### Setup
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Local Development
Run the local Vite development server:
```bash
npm run dev
```
- **Live Preview**: Development happens at `http://localhost:5173`.
- **Mocking**: Since `google.script.run` is not available locally, the app uses a custom injection system (`src/client/mocks/injector.ts`) to provide a `serverMock` (`src/client/mocks/server-mock.ts`) during local development.

### Deployment
To deploy to Google Apps Script:

1. **Build the project**:
   ```bash
   npm run build
   ```
   This bundles the React app into `dist/index.html` (using `vite-plugin-singlefile`) and the server code into `dist/code.js`.

2. **Push to GAS**:
   ```bash
   npm run push:dev   # Pushes to the development script ID
   # or
   npm run push:prod  # Pushes to the production script ID
   ```

---

## 🏗️ Architecture

### Client-Side (`src/client`)
- **React + TypeScript**: Standard React application.
- **Single File Output**: The build process inlines all CSS and JS into `index.html`, as GAS only allows `.html` files for the UI.
- **Server Communication**: Communicates with the backend using the `server` proxy in `src/client/api.ts`, which wraps `google.script.run` in Promises.

### Server-Side (`src/server`)
- **TypeScript Logic**: Core logic is implemented in `src/server/server.ts` as a TypeScript class.
- **Entry Points**: `src/server/entrypoint.js` contains the top-level function declarations required by Google Apps Script. 
  - **Variadic Wrappers**: Uses `(...args)` spread to delegate to the `server` instance, making it maintenance-free for signature changes.
  - **Self-Check**: Includes a runtime check to ensure all `ServerAPI` methods are correctly exposed.

### Shared Types (`src/types`)
- **API Interface**: `src/types/api.ts` defines the contract between client and server. Both the real server and the local mock must implement the `ServerAPI` interface.

---

## 🛠️ Adding a New API Method

1. **Define the interface**: Add the new method signature to `src/types/api.ts`.
2. **Implement the logic**: Add the method implementation to the `Server` class in `src/server/server.ts`.
3. **Expose the entry point**: Add a variadic wrapper to `src/server/entrypoint.js`:
   ```javascript
   function myNewMethod(...args) {
     return server.myNewMethod(...args);
   }
   ```
4. **Update the mock**: Implement the method in `src/client/mocks/server-mock.ts` to allow testing in the local dev server.

---

## 📜 Key Scripts

| Script | Description |
| :--- | :--- |
| `npm run dev` | Starts Vite dev server with local mocks. |
| `npm run build` | Builds client and server code for production. |
| `npm run build:server` | Bundles ONLY the server code into `dist/`. |
| `npm run push:dev` | Pushes the `dist/` folder to the development GAS project. |
| `npm run lint` | Runs ESLint for code quality. |
