import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Container,
  Typography,
} from "@mui/material";

function Estatisticas() {
  return (
    <>
      <Box
        component="section"
        bgcolor="primary.light"
        py={8} // Padding vertical
        mt={6}
      >
        <Typography
          variant="h4"
          component="h2"
          fontWeight="bold"
          color="primary.main"
          textAlign="center"
          mb={6}
        >
          📊 Factos e Estatísticas em Destaque
        </Typography>
        <Container
          sx={{
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
          }}
          maxWidth="lg"
        >
          <Card sx={{ maxWidth: 250 }}>
            <CardActionArea>
              <CardContent sx={{ textAlign: "center" }}>
                <Typography
                  gutterBottom
                  fontSize="1rem"
                  color="primary.main"
                  component="div"
                  fontWeight="bold"
                >
                  Melhor Marcador
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Vangelis Pavlidis (SLB)
                </Typography>
                <Typography variant="body2">13 Golos</Typography>
              </CardContent>
            </CardActionArea>
          </Card>

          {/* 2º Card */}

          <Card sx={{ maxWidth: 250 }}>
            <CardActionArea>
              <CardContent sx={{ textAlign: "center" }}>
                <Typography
                  gutterBottom
                  fontSize="1rem"
                  color="primary.main"
                  component="div"
                  fontWeight="bold"
                >
                  Mais Assistências
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Francisco Trincão (SCP)
                </Typography>
                <Typography variant="body2">7 Assistências</Typography>
              </CardContent>
            </CardActionArea>
          </Card>

          {/* 3º Card */}
          <Card sx={{ maxWidth: 250 }}>
            <CardActionArea>
              <CardContent sx={{ textAlign: "center" }}>
                <Typography
                  gutterBottom
                  fontSize="1rem"
                  color="primary.main"
                  component="div"
                  fontWeight="bold"
                >
                  Cartões Amarelos
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Cezary Mistza(RAFC)
                </Typography>
                <Typography variant="body2">6 Cartões Amarelos</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Container>
      </Box>
    </>
  );
}

export default Estatisticas;
