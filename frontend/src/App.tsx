import { useState } from "react";

import "./App.css";

import LoginForm from "./components/LoginForm";
import ProductList from "./components/ProductList";
import type { LoginResponse } from "@nx-ecommerce/shared/src/auth/auth.schema";

function App() {
  const [auth, setAuth] = useState<LoginResponse | null>(null);

  if (!auth) {
    return (
      <main className="login-page">
        <LoginForm onLogin={setAuth} />
      </main>
    );
  }

  return (
    <main className="products-page">
      <header className="products-header">
        <div className="brand">NX</div>

        <div>
          Bienvenido, <strong>{auth.name}</strong>
        </div>
      </header>

      <ProductList token={auth.token} />
    </main>
  );
}

export default App;