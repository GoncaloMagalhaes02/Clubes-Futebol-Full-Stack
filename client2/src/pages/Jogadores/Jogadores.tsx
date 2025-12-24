import { useEffect, useState } from "react";

import {
  Container,
  Stack,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  CardActionArea,
  Box,
  Divider,
  CircularProgress,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import GroupIcon from "@mui/icons-material/Group";
import JogadorService, { type Jogador } from "../../service/jogador.service";
import { Link, useNavigate } from "react-router-dom";

function Jogadores() {
  const navigate = useNavigate();

  const [jogadores, setJogadores] = useState<Jogador[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("Nenhum jogador encontrado.");

  useEffect(() => {
    getJogadores();
  }, []);

  const getJogadores = async () => {
    try {
      setLoading(true);
      const response = await JogadorService.getAll();
      setJogadores(response.data);
      console.log(response.data);
      setLoading(false);
    } catch (err) {
      setError("Não foi possível carregar os jogadores.");
      console.log(err);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Tem a certeza que deseja eliminar este Jogador?")) {
      try {
        await JogadorService.delete(id);
        setJogadores(jogadores.filter((j) => j.id_jogador !== id));
      } catch (err) {
        alert("Erro ao eliminar o jogador.");
      }
    }
  };

  return (
    <>
      <Container sx={{ py: 9 }} maxWidth="lg">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 6 }}
        >
          <Typography variant="h3" component="h1" fontWeight="bold">
            Jogadores
          </Typography>

          <Button
            variant="outlined"
            color="primary"
            startIcon={<AddIcon />}
            size="large"
            component={Link}
            to="/jogador-criar"
            sx={{
              "&:hover": {
                backgroundColor: "primary.main",
                color: "#fff",
                borderColor: "primary.main",
              },
            }}
          >
            Novo Jogador
          </Button>
        </Stack>
        {loading ? (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        ) : jogadores.length === 0 ? (
          <Box display="flex" justifyContent="center" mt={4}>
            <Typography color="error">{error}</Typography>
          </Box>
        ) : (
          jogadores.length > 0 && (
            <>
              <Grid container spacing={4}>
                {jogadores.map((jogador) => (
                  <Grid display="flex" flexGrow={1} key={jogador.id_jogador}>
                    <Card
                      sx={{
                        minWidth: 260,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <CardActionArea
                        component={Link}
                        to={`/jogadores/${jogador.id_jogador}`}
                        sx={{
                          flexGrow: 1,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                        }}
                      >
                        <CardContent sx={{ width: "100%" }}>
                          <Box>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                              sx={{ color: "primary.main", fontWeight: "bold" }}
                            >
                              {jogador.nome}
                            </Typography>
                          </Box>

                          <Divider />

                          <Stack mt={2} gap={0.2}>
                            {/* Nome do Clube  */}
                            <Box
                              display="flex"
                              alignItems="center"
                              gap={1}
                              color="text.secondary"
                            >
                              <GroupIcon fontSize="small" />
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {jogador.nomeClube}
                              </Typography>
                            </Box>

                            {/* Posicao */}
                            <Box
                              display="flex"
                              alignItems="center"
                              gap={1}
                              color="text.secondary"
                            >
                              <SportsSoccerIcon fontSize="small" />
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {jogador.posicao}
                              </Typography>
                            </Box>
                          </Stack>
                        </CardContent>
                      </CardActionArea>

                      <CardActions
                        sx={{
                          justifyContent: "space-between",
                          px: 1,
                          pb: 2,
                        }}
                      >
                        <Button
                          component={Link}
                          to={`/jogador-editar/${jogador.id_jogador}}`}
                          size="small"
                          variant="outlined"
                          sx={{
                            "&:hover": {
                              backgroundColor: "primary.main",
                              color: "#fff",
                              borderColor: "primary.main",
                            },
                          }}
                        >
                          Editar
                        </Button>

                        <Button
                          size="small"
                          variant="outlined"
                          color="error"
                          sx={{
                            "&:hover": {
                              backgroundColor: "#f44336",
                              color: "#fff",
                              borderColor: "#f44336",
                            },
                          }}
                          onClick={() => handleDelete(jogador.id_jogador)}
                        >
                          Eliminar
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </>
          )
        )}
      </Container>
    </>
  );
}

export default Jogadores;
