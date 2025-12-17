import React, { useState } from "react";
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import logoImg from "../../assets/ligalogo.png";

const navLinks = [
  { title: "Jogadores", path: "/jogadores" },
  { title: "Clubes", path: "/clubes" },
  { title: "Sobre", path: "/sobre" },
];

const navButtonStyle = {
  color: "inherit",
  fontWeight: 500,
  borderBottom: "2px solid transparent",
  borderRadius: 0,
  transition: "all 0.3s ease-in-out",
  mx: 1,
  "&:hover": {
    borderBottom: "2px solid primary.light",
    backgroundColor: "rgba(255,255,255,0.05)",
    color: "primary.light",
  },
};

function Header() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ height: 80 }}>
          <Box component="img" src={logoImg} sx={{ height: 60, mr: 4 }} />

          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: "none",
              color: "inherit",
              fontWeight: "bold",
              fontSize: { xs: "1rem", md: "1.25rem" },
            }}
          >
            Primeira Liga
          </Typography>

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {navLinks.map((item) => (
              <Button
                key={item.title}
                component={Link}
                to={item.path}
                sx={navButtonStyle}
              >
                {item.title}
              </Button>
            ))}
          </Box>

          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu de navegação"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {navLinks.map((item) => (
                <MenuItem
                  key={item.title}
                  onClick={handleCloseNavMenu}
                  component={Link}
                  to={item.path}
                >
                  <Typography textAlign="center">{item.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
