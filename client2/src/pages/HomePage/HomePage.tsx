import { Button, Container, Stack, Divider, Paper } from "@mui/material";

import Noticias from "../../components/Noticias/Noticias";
import Estatisticas from "../../components/Estatisticas/Estatisticas";

function HomePage() {
  return (
    <>
      <Paper
        elevation={0}
        square
        sx={{
          width: "100%",
          borderBottom: "1px solid #e0e0e0",
          bgcolor: "primary.light",
          py: 1.5,
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="center"
          divider={<Divider orientation="vertical" flexItem />}
        >
          <Button>Benfica</Button>
          <Button>Porto</Button>
          <Button>Sporting</Button>
          <Button>Braga</Button>
          <Button>V. Guimarães</Button>
        </Stack>
      </Paper>
      <Container maxWidth="lg">
        <Noticias />
      </Container>
      <Estatisticas />
    </>
  );
}

export default HomePage;
