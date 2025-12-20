import React, { useState } from "react";
import { 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Box, 
  Paper, 
  Stack,
  IconButton,
  Snackbar,
  Alert
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useNavigate } from "react-router-dom";
import ClubeService from "../../service/clube.service";

const CreateClubPage: React.FC = () => {
  const navigate = useNavigate();
  
  // Estado para os campos de texto
  const [formData, setFormData] = useState({
    nomeClube: "",
    anoFundacao: "",
    cidade: "",
    estadio: "",
    treinador: ""
  });

  // Estado para o ficheiro de imagem
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Estados para o Feedback (Alerta do Material UI)
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [severity, setSeverity] = useState<"success" | "error">("success");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Uso de FormData para envio de ficheiros
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
      await ClubeService.insert(data);
      
      // Configurar alerta de sucesso
      setSnackbarMsg("Clube criado com sucesso!");
      setSeverity("success");
      setOpenSnackbar(true);

      // Aguarda 2 segundos para o utilizador ler o alerta e redireciona
      setTimeout(() => {
        navigate("/clubs"); 
      }, 2000);

    } catch (error) {
      console.error(error);
      setSnackbarMsg("Erro ao criar o clube. Verifique os dados.");
      setSeverity("error");
      setOpenSnackbar(true);
    }
  };

  return (
    <>
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 3 }}>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 3 }}>
            <IconButton onClick={() => navigate(-1)}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h4" fontWeight="bold">Novo Clube</Typography>
          </Stack>

          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                label="Nome do Clube"
                name="nomeClube"
                fullWidth
                required
                value={formData.nomeClube}
                onChange={handleChange}
              />
              
              <TextField
                label="Ano de Fundação"
                name="anoFundacao"
                type="number"
                fullWidth
                required
                value={formData.anoFundacao}
                onChange={handleChange}
              />

              <TextField
                label="Cidade"
                name="cidade"
                fullWidth
                required
                value={formData.cidade}
                onChange={handleChange}
              />

              <TextField
                label="Estádio"
                name="estadio"
                fullWidth
                required
                value={formData.estadio}
                onChange={handleChange}
              />

              <TextField
                label="Treinador"
                name="treinador"
                fullWidth
                required
                value={formData.treinador}
                onChange={handleChange}
              />

              {/* Botão de Upload customizado */}
              <Button
                component="label"
                variant="outlined"
                startIcon={<CloudUploadIcon />}
                sx={{ py: 1.5 }}
              >
                {selectedFile ? selectedFile.name : "Carregar Logo do Clube"}
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </Button>

              <Box sx={{ pt: 2 }}>
                <Button 
                  type="submit" 
                  variant="contained" 
                  fullWidth 
                  size="large"
                  sx={{ py: 1.5, fontWeight: "bold" }}
                >
                  Confirmar Registo
                </Button>
              </Box>
            </Stack>
          </form>
        </Paper>
      </Container>

      {/* COMPONENTE DE ALERTA (SNACKBAR) */}
      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={4000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={severity} 
          variant="filled" 
          sx={{ width: '100%' }}
        >
          {snackbarMsg}
        </Alert>
      </Snackbar>
    </>
  );
};

export default CreateClubPage;