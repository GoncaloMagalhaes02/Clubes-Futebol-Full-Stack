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
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // useParams é vital aqui
import ClubeService, { type Clube } from "../../service/clube.service";
import JogadorService from "../../service/jogador.service";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const posicoes = ["Guarda-Redes", "Defesa", "Médio", "Avançado"];

function EditJogador() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [clubes, setClubes] = useState<Clube[]>([]);
  const [loading, setLoading] = useState(true);

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
    const loadData = async () => {
      try {
        const clubeRes = await ClubeService.getAll();
        setClubes(clubeRes.data);

        if (id) {
          const jogRes = await JogadorService.getById(parseInt(id));

          if (jogRes.data && jogRes.data.length > 0) {
            const jogador = jogRes.data[0];

            const dataFormatada = jogador.dataNascimento
              ? new Date(jogador.dataNascimento).toISOString().split("T")[0]
              : "";

            setFormData({
              nome: jogador.nome,
              nacionalidade: jogador.nacionalidade,
              numCamisola: jogador.numCamisola.toString(),
              dataNascimento: dataFormatada,
              posicao: jogador.posicao,
              id_clube: jogador.id_clube,
            });
          }
        }
        setLoading(false);
      } catch (err) {
        console.error(err);
        setFeedback({
          open: true,
          message: "Erro ao carregar dados do jogador.",
          severity: "error",
        });
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!formData.nome || !formData.id_clube || !formData.numCamisola || !id) {
      setFeedback({
        open: true,
        message: "Preencha todos os campos obrigatórios!",
        severity: "warning",
      });
      return;
    }

    try {
      const payload = {
        ...formData,
        numCamisola: parseInt(formData.numCamisola),
        id_clube: formData.id_clube as number,
      };
      await JogadorService.update(parseInt(id), payload);

      setFeedback({
        open: true,
        message: "Jogador atualizado com sucesso!",
        severity: "success",
      });

      setTimeout(() => navigate("/jogadores"), 1500);
    } catch (error) {
      console.error(error);
      setFeedback({
        open: true,
        message: "Erro ao atualizar jogador.",
        severity: "error",
      });
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

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
                Editar Jogador
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
              label="Data de Nascimento"
              name="dataNascimento"
              value={formData.dataNascimento}
              onChange={handleChange}
            />

            {/* SELECT DA POSIÇÃO */}
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
              value={
                clubes.find((c) => c.id_clube === formData.id_clube) || null
              }
              onChange={(event, newValue) => {
                setFormData({
                  ...formData,
                  id_clube: newValue ? newValue.id_clube : null,
                });
              }}
              // Para evitar avisos na consola
              isOptionEqualToValue={(option, value) =>
                option.id_clube === value.id_clube
              }
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
              Guardar Alterações
            </Button>
          </Stack>
        </Paper>
      </Container>

      <Snackbar
        open={feedback.open}
        autoHideDuration={4000}
        onClose={() => setFeedback({ ...feedback, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
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

export default EditJogador;
