import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
  TextField,
  IconButton,
  Autocomplete,
  Snackbar,
  Alert,
  MenuItem,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ClubeService, { type Clube } from "../../service/clube.service";
import JogadorService from "../../service/jogador.service";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function CreateJogador() {
  const navigate = useNavigate();
  const [clubes, setClubes] = useState<Clube[]>([]);

  const posicoes = ["Guarda-Redes", "Defesa", "Médio", "Avançado"];

  const [feedback, setFeedback] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "warning",
  });

  const [formData, setFormData] = useState({
    nome: "",
    nacionalidade: "",
    numCamisola: "",
    dataNascimento: "",
    posicao: "",
    id_clube: null as number | null,
  });

  useEffect(() => {
    getClubes();
  }, []);

  const getClubes = async () => {
    try {
      const response = await ClubeService.getAll();
      setClubes(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCloseFeedback = () => {
    setFeedback({ ...feedback, open: false });
  };
  const handleSubmit = async () => {
    if (
      !formData.nome ||
      !formData.nacionalidade ||
      !formData.numCamisola ||
      !formData.dataNascimento ||
      !formData.posicao ||
      !formData.id_clube
    ) {
      setFeedback({
        open: true,
        message: "Por favor, preencha todos os campos obrigatórios!",
        severity: "warning",
      });
      return;
    }

    const payload = {
      ...formData,
      numCamisola: parseInt(formData.numCamisola),
      id_clube: formData.id_clube as number,
    };

    try {
      await JogadorService.create(payload);
      setFeedback({
        open: true,
        message: "Jogador criado com sucesso! A redirecionar...",
        severity: "success",
      });
      setTimeout(() => {
        navigate("/jogadores");
      }, 2000);
    } catch (error) {
      console.error(error);
      setFeedback({
        open: true,
        message: "Erro ao criar jogador. Tente novamente.",
        severity: "error",
      });
    }
  };

  return (
    <>
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Paper elevation={2} sx={{ p: 4, borderRadius: 3, boxShadow: 3 }}>
          <Stack direction={"column"} spacing={3}>
            <Box p={2} display="flex" alignItems="center" gap={2}>
              <IconButton onClick={() => navigate(-1)}>
                <ArrowBackIcon />
              </IconButton>
              <Typography variant="h4" component="h2" fontWeight="bold">
                Novo Jogador
              </Typography>
            </Box>

            <TextField
              required
              label="Nome do Jogador"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
            />
            <TextField
              required
              label="Nacionalidade"
              name="nacionalidade"
              value={formData.nacionalidade}
              onChange={handleChange}
            />
            <TextField
              required
              type="number"
              label="Número da Camisola"
              name="numCamisola"
              value={formData.numCamisola}
              onChange={handleChange}
            />
            <TextField
              required
              type="date"
              name="dataNascimento"
              value={formData.dataNascimento}
              onChange={handleChange}
            />
            <TextField
              select
              required
              label="Posição"
              name="posicao"
              value={formData.posicao}
              onChange={handleChange}
            >
              {posicoes.map((opcao) => (
                <MenuItem key={opcao} value={opcao}>
                  {opcao}
                </MenuItem>
              ))}
            </TextField>

            <Autocomplete
              disablePortal
              options={clubes}
              getOptionLabel={(option) => option.nomeClube}
              onChange={(event, newValue) => {
                setFormData({
                  ...formData,
                  id_clube: newValue ? newValue.id_clube : null,
                });
              }}
              renderInput={(params) => (
                <TextField {...params} label="Clube" required />
              )}
            />

            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleSubmit}
            >
              Criar Jogador
            </Button>
          </Stack>
        </Paper>
      </Container>

      {/* 3. O COMPONENTE VISUAL DE FEEDBACK */}
      <Snackbar
        open={feedback.open}
        autoHideDuration={4000}
        onClose={handleCloseFeedback}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseFeedback}
          severity={feedback.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {feedback.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default CreateJogador;
