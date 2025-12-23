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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import PublicIcon from "@mui/icons-material/Public";
import GroupIcon from "@mui/icons-material/Group";
import DateRangeIcon from "@mui/icons-material/DateRange";

import JogadorService, { type Jogador } from "../../service/jogador.service";
import { Link, useNavigate } from "react-router-dom";

function Jogadores() {
  const navigate = useNavigate();

  const [jogadores, setJogadores] = useState<Jogador[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>();

  useEffect(() => {
    getJogadores();
  }, []);

  const getJogadores = async () => {
    try {
      setLoading(true);
      const response = await JogadorService.getAll();
      setJogadores(response.data);
      setLoading(false);
      console.log(response.data);
    } catch (err) {
      setError("Não foi possivel listar Jogadores.");
      console.log(err);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Tem a certeza que deseja eliminar este clube?")) {
      try {
        await JogadorService.delete(id);
        setJogadores(jogadores.filter((j) => j.id_jogador !== id));
      } catch (err) {
        alert("Erro ao eliminar o clube.");
      }
    }
  };

  return (
    <>
      <Container sx={{ py: 8 }} maxWidth="lg">
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
            onClick={() => navigate("/create-jogador")}
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
                        <Typography variant="body2" color="text.secondary">
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
                        <Typography variant="body2" color="text.secondary">
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
                    to={`/jogador-edit/${jogador.id_jogador}}`}
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
      </Container>
    </>
  );
}

export default Jogadores;
