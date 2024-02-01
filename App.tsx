// App.tsx
import React, { useEffect } from "react";
import Navigation from "./src/routes/navigation.container";
import app from "./src/config/firebaseConfig";


export default function App() {
  useEffect(() => {
    app;
  }, []); // O array vazio assegura que o useEffect seja executado apenas uma vez

  return <Navigation />;
}
