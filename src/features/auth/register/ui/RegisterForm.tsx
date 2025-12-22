"use client";

import { useState } from "react";
import { TextField, Button, Box, Alert, CircularProgress } from "@mui/material";
import { useRegister } from "../useRegister";

export function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { register, isLoading, error } = useRegister();

  const passwordMismatch = Boolean(
    password !== confirmPassword && confirmPassword
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return;
    }

    await register({ email, password });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        width: "100%",
        maxWidth: "400px",
      }}
    >
      <TextField
        id="email"
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        fullWidth
        placeholder="your@email.com"
        autoComplete="email"
      />

      <TextField
        id="password"
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        fullWidth
        inputProps={{ minLength: 6 }}
        placeholder="••••••••"
        autoComplete="new-password"
        error={password.length > 0 && password.length < 6}
        helperText={
          password.length > 0 && password.length < 6
            ? "Пароль должен содержать минимум 6 символов"
            : ""
        }
      />

      <TextField
        id="confirmPassword"
        label="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        fullWidth
        inputProps={{ minLength: 6 }}
        placeholder="••••••••"
        autoComplete="new-password"
        error={passwordMismatch}
        helperText={passwordMismatch ? "Пароли не совпадают" : ""}
      />

      {error && (
        <Alert severity="error" sx={{ mt: 1 }}>
          {error}
        </Alert>
      )}

      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={isLoading || passwordMismatch || password.length < 6}
        sx={{ mt: 2 }}
        startIcon={
          isLoading ? <CircularProgress size={20} color="inherit" /> : null
        }
      >
        {isLoading ? "Регистрация..." : "Зарегистрироваться"}
      </Button>
    </Box>
  );
}
