import { Box, Typography } from "@mui/material";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 4,
        backgroundColor: "primary.main",
      }}
    >
      <Typography variant="body2" color="#fff" align="center">
        © 2025 Liga Portugal Betclic. Todos os direitos reservados.
      </Typography>
    </Box>
  );
}

export default Footer;
