import { useEffect, useState } from "react";

import { Container, Stack, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import JogadorService, { type Jogador } from "../../service/jogador.service";
import { useNavigate } from "react-router-dom";

function Jogadores() {
  const navigate = useNavigate();

  const [jogadores, setJogadores] = useState<Jogador[]>([]);
  const [loading, setLoading] = useState(false);

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
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            size="large"
            onClick={() => navigate("/create-jogador")}
          >
            Novo Jogador
          </Button>
        </Stack>
      </Container>
    </>
  );
}

export default Jogadores;
