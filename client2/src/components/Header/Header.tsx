import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../../assets/ligalogo.png";

const navButtonStyle = {
  color: "inherit",
  fontWeight: 500,
  borderBottom: "2px solid transparent", // Começa invisível
  borderRadius: 0,
  transition: "all 0.3s ease-in-out", // Animação suave
  mx: 1, // Margin horizontal (espaço entre botões)
  "&:hover": {
    borderBottom: "2px solid #FFD700", // Cor dourada (exemplo) no hover
    backgroundColor: "rgba(255,255,255,0.05)", // Fundo muito subtil
    color: "#FFD700", // O texto também fica dourado
  },
};

function Header() {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ height: 80 }}>
          <Box
            component="img"
            sx={{
              height: 60,
              mr: 3,
              cursor: "pointer",
            }}
            alt="Logótipo Primeira Liga"
            src={logo}
          />
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: "none",
              color: "inherit",
              fontWeight: "bold",
            }}
          >
            Primeira Liga
          </Typography>

          <Box>
            <Button
              color="inherit"
              component={Link}
              to="/jogadores"
              sx={{
                mr: 4,
                transition: "0.3s",
                "&:hover": {
                  backgroundColor: "primary.light",
                  transform: "scale(1.05)",
                  color: "primary.main",
                },
              }}
            >
              Jogadores
            </Button>

            <Button
              color="inherit"
              component={Link}
              to="/clubes"
              sx={{
                mr: 4,
                transition: "0.3s",
                "&:hover": {
                  backgroundColor: "primary.light",
                  transform: "scale(1.05)",
                  color: "primary.main",
                },
              }}
            >
              Clubes
            </Button>

            <Button
              color="inherit"
              component={Link}
              to="/sobre"
              sx={{
                mr: 4,
                transition: "0.3s",
                "&:hover": {
                  backgroundColor: "primary.light",
                  transform: "scale(1.05)",
                  color: "primary.main",
                },
              }}
            >
              Sobre
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
