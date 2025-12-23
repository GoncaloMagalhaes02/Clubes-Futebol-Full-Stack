import { useParams } from "react-router-dom";
import JogadorService, { type Jogador } from "../../service/jogador.service";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

function JogadorDetalhe() {
  const { id } = useParams();

  const [jogador, setJogador] = useState<Jogador | null>(null);
  const [isLoading, SetisLoading] = useState(false);
  const [error, setError] = useState<string | null>();

  useEffect(() => {
    getJogador();
  }, []);

  const getJogador = async () => {
    if (!id) return;
    try {
      SetisLoading(true);
      const response = await JogadorService.getById(parseInt(id));
      if (response.data && response.data.length > 0) {
        setJogador(response.data[0]);
      }
      SetisLoading(false);
    } catch (error) {
      setError("Não foi possivel listar o Jogador.");
      console.log(error);
      SetisLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : jogador ? (
        <Container maxWidth="lg">
          <Paper component="section" elevation={2}>
            <Box
              sx={{
                bgcolor: "primary.main",
                color: "primary.light",
                display: "flex",
                mt: 6,
                borderRadius: 2,
              }}
            >
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                justifyContent="space-between"
                width="100%"
                px={6}
              >
                <Box
                  display="flex"
                  justifyContent="space-around"
                  gap={2}
                  height="100px"
                  alignItems="center"
                >
                  <Typography
                    variant="h4"
                    sx={{ color: "primary.light", fontWeight: "bold" }}
                  >
                    #{jogador.numCamisola}
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{ color: "primary.light", fontWeight: "bold" }}
                  >
                    {jogador.nome}
                  </Typography>
                </Box>

                <Box display="flex" gap={2}>
                  <Button variant="contained" color="success">
                    Voltar
                  </Button>
                  <Button variant="contained" color="info">
                    Editar
                  </Button>
                </Box>
              </Stack>
            </Box>
          </Paper>
        </Container>
      ) : null}
    </>
  );
}

export default JogadorDetalhe;
