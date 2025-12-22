import { useEffect, useState } from "react";

import {
  Container,
  Stack,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  CardActionArea,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

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
            <Grid>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea
                  component={Link}
                  to={`/jogador/${jogador.id_jogador}`}
                >
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      sx={{ color: "primary.main" }}
                    >
                      {jogador.nome}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Data de Nascimento: </strong>
                      {new Date(jogador.dataNascimento).toLocaleDateString(
                        "pt-PT"
                      )}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      component={Link}
                      to={`/jogador-edit/${jogador.id_jogador}}`}
                      size="small"
                    >
                      Editar
                    </Button>
                    <Button size="small">Learn More</Button>
                  </CardActions>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default Jogadores;
