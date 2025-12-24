import { Link, useParams } from "react-router-dom";
import JogadorService, { type Jogador } from "../../service/jogador.service";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Paper,
  Stack,
  Grid,
  Typography,
} from "@mui/material";

function JogadorDetalhe() {
  const { id } = useParams();

  const IMAGES_URL = "http://localhost:8080/uploads/";

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
                  <Button
                    variant="contained"
                    color="error"
                    component={Link}
                    to="/jogadores"
                  >
                    Voltar
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: "primary.light",
                      color: "primary.main",
                    }}
                    component={Link}
                    to={`/jogador-editar/${jogador.id_jogador}`}
                  >
                    Editar
                  </Button>
                </Box>
              </Stack>
            </Box>

            {/* Conteudo Principal */}
            <Grid container maxWidth="lg">
              <Grid size={{ xs: 12, md: 6 }}>
                <Stack
                  px={6}
                  py={4}
                  display="flex"
                  flexDirection="column"
                  gap={2}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      color: "text.secondary",
                      fontSize: "1.2rem",
                    }}
                  >
                    Detalhes Pessoais
                  </Typography>
                  <Divider />
                  <Box>
                    <Typography color="text.secondary">
                      Nacionalidade
                    </Typography>
                    <Typography fontWeight="bold" fontSize="1.2rem">
                      {jogador.nacionalidade}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography color="text.secondary">
                      Data Nascimento
                    </Typography>
                    <Typography fontWeight="bold" fontSize="1.2rem">
                      {new Date(jogador.dataNascimento).toLocaleDateString()}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography color="text.secondary">Posição</Typography>
                    <Typography fontWeight="bold" fontSize="1.2rem">
                      {jogador.posicao}
                    </Typography>
                  </Box>
                </Stack>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }} pb={4}>
                <Box
                  px={6}
                  py={4}
                  display="flex"
                  flexDirection="column"
                  gap={2}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      color: "text.secondary",
                      fontSize: "1.2rem",
                    }}
                  >
                    Clube Atual
                  </Typography>
                  <Divider />
                </Box>
                {jogador.id_clube ? (
                  <Box
                    bgcolor="grey.200"
                    p={2}
                    mx={6}
                    borderRadius={2}
                    display={"flex"}
                    alignItems="center"
                  >
                    <Box>
                      <Box
                        component="img"
                        width="80px"
                        src={`${IMAGES_URL}${jogador.img}`}
                        alt={`Logo do clube ${jogador.nomeClube}`}
                        onError={(e: any) => {
                          e.target.src =
                            "https://via.placeholder.com/200?text=Sem+Foto";
                        }}
                        sx={{ objectFit: "cover" }}
                      />
                    </Box>
                    <Box ml={2}>
                      <Typography fontWeight="bold" fontSize="1.2rem">
                        {jogador.nomeClube}
                      </Typography>
                      <Typography
                        color="info"
                        fontWeight={"bold"}
                        fontSize={"0.8rem"}
                        component={Link}
                        to={`/clube/${jogador.id_clube}`}
                      >
                        Ver Detalhes do Clube
                      </Typography>
                    </Box>
                  </Box>
                ) : (
                  <Typography px={6} color="text.secondary">
                    Jogador sem clube atual.
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Paper>
        </Container>
      ) : null}
    </>
  );
}

export default JogadorDetalhe;
