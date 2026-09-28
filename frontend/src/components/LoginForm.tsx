import { useState } from "react";
import type { FormEvent } from "react";

import { login } from "../services/auth.service";
import type { LoginResponse } from "@nx-ecommerce/shared/src/auth/auth.schema";

interface LoginFormProps {
  onLogin: (auth: LoginResponse) => void;
}

const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const result = await login({
        email,
        password,
      });

      onLogin(result);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "No fue posible iniciar sesión",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="login-header">
        <span className="login-badge">NX</span>

        <h1>Bienvenido</h1>

        <p>Ingresá para continuar</p>
      </div>

      <div className="form-field">
        <label htmlFor="email">Email</label>

        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="tu@email.com"
          autoComplete="email"
          required
        />
      </div>

      <div className="form-field">
        <label htmlFor="password">Contraseña</label>

        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Tu contraseña"
          autoComplete="current-password"
          required
        />
      </div>

      {error && <div className="form-error">{error}</div>}

      <button
        className="primary-button"
        type="submit"
        disabled={loading}
      >
        {loading ? "Ingresando..." : "Ingresar"}
      </button>
    </form>
  );
};

export default LoginForm;