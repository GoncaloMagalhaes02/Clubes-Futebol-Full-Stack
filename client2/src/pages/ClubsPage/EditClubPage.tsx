import React, { useEffect, useState } from "react";
import { 
  Container, Typography, TextField, Button, Box, Paper, 
  Stack, IconButton, Snackbar, Alert, CircularProgress 
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useNavigate, useParams } from "react-router-dom";
import ClubeService, { type Clube } from "../../service/clube.service";
import Header from "../../components/Header/Header";

const EditClubPage: React.FC = () => {
  const navigate = useNavigate();
  const { id_clube } = useParams<{ id_clube: string }>(); // Captura o ID da rota

  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    nomeClube: "",
    anoFundacao: "",
    cidade: "",
    estadio: "",
    treinador: ""
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [severity, setSeverity] = useState<"success" | "error">("success");

  // 1. Carregar os dados atuais do clube
  useEffect(() => {
    const fetchClube = async () => {
      try {
        if (id_clube) {
          const response = await ClubeService.getById(Number(id_clube));
          const clube = response.data;
          setFormData({
            nomeClube: clube.nomeClube,
            anoFundacao: clube.anoFundacao.toString(),
            cidade: clube.cidade,
            estadio: clube.estadio,
            treinador: clube.treinador
          });
        }
      } catch (error) {
        setSeverity("error");
        setSnackbarMsg("Erro ao carregar os dados do clube.");
        setOpenSnackbar(true);
      } finally {
        setLoading(false);
      }
    };
    fetchClube();
  }, [id_clube]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id_clube) return;

    // Como o seu backend usa Multer no PATCH, usamos FormData
    const data = new FormData();
    data.append("nomeClube", formData.nomeClube);
    data.append("anoFundacao", formData.anoFundacao);
    data.append("cidade", formData.cidade);
    data.append("estadio", formData.estadio);
    data.append("treinador", formData.treinador);
    
    if (selectedFile) {
      data.append("img", selectedFile);
    }

    try {
      await ClubeService.update(Number(id_clube), data);
      setSeverity("success");
      setSnackbarMsg("Clube atualizado com sucesso!");
      setOpenSnackbar(true);

      setTimeout(() => navigate("/clubs"), 2000);
    } catch (error) {
      setSeverity("error");
      setSnackbarMsg("Erro ao atualizar o clube.");
      setOpenSnackbar(true);
    }
  };

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress /></Box>;

  return (
    <>
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 3 }}>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 3 }}>
            <IconButton onClick={() => navigate(-1)}><ArrowBackIcon /></IconButton>
            <Typography variant="h4" fontWeight="bold">Editar Clube</Typography>
          </Stack>

          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField label="Nome do Clube" name="nomeClube" fullWidth required value={formData.nomeClube} onChange={handleChange} />
              <TextField label="Ano de Fundação" name="anoFundacao" type="number" fullWidth required value={formData.anoFundacao} onChange={handleChange} />
              <TextField label="Cidade" name="cidade" fullWidth required value={formData.cidade} onChange={handleChange} />
              <TextField label="Estádio" name="estadio" fullWidth required value={formData.estadio} onChange={handleChange} />
              <TextField label="Treinador" name="treinador" fullWidth required value={formData.treinador} onChange={handleChange} />

              <Button component="label" variant="outlined" startIcon={<CloudUploadIcon />} sx={{ py: 1.5 }}>
                {selectedFile ? selectedFile.name : "Substituir Logo (Opcional)"}
                <input type="file" hidden accept="image/*" onChange={handleFileChange} />
              </Button>

              <Box sx={{ pt: 2 }}>
                <Button type="submit" variant="contained" color="warning" fullWidth size="large" sx={{ py: 1.5, fontWeight: "bold" }}>
                  Guardar Alterações
                </Button>
              </Box>
            </Stack>
          </form>
        </Paper>
      </Container>

      <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={() => setOpenSnackbar(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={() => setOpenSnackbar(false)} severity={severity} variant="filled" sx={{ width: '100%' }}>
          {snackbarMsg}
        </Alert>
      </Snackbar>
    </>
  );
};

export default EditClubPage;