import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { Outlet } from "react-router-dom";

import { Box } from "@mui/material";

function RootLayout() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Header />

        <Box component="main" sx={{ flexGrow: 1 }}>
          <Outlet />
        </Box>

        <Footer />
      </Box>
    </>
  );
}

export default RootLayout;
