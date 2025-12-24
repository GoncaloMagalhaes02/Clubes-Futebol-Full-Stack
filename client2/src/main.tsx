import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

// Criação de um tema simples (pode customizar cores aqui depois)
const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#001E50",
      light: "#F0F4FD",
      dark: "#001941",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    button: {
      textTransform: "none",
      fontWeight: "bold",
    },
  },
});

import RootLayout from "./RootLayout.tsx";
import HomePage from "./pages/HomePage/HomePage.tsx";
import ClubsPage from "./pages/ClubsPage/ClubsPage.tsx";
import CreateClubPage from "./pages/ClubsPage/CreateClubPage.tsx";
import EditClubPage from "./pages/ClubsPage/EditClubPage.tsx";
import Jogadores from "./pages/Jogadores/Jogadores.tsx";
import JogadorDetalhe from "./pages/Jogadores/JogadorDetalhe.tsx";
import CreateJogador from "./pages/Jogadores/CreateJogador.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<HomePage />} />
      <Route path="/clubes" element={<ClubsPage />} />
      <Route path="/clube/:id" element={""} />
      <Route path="/clube-criar" element={<CreateClubPage />} />
      <Route path="/clube-editar/:id_clube" element={<EditClubPage />} />
      <Route path="/jogadores" element={<Jogadores />} />
      <Route path="/jogador-criar" element={<CreateJogador />} />
      <Route path="/jogadores/:id" element={<JogadorDetalhe />} />
    </Route>
  )
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
