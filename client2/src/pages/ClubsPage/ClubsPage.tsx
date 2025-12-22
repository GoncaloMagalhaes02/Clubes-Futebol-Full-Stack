import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Container,
  Box,
  CircularProgress,
  Stack,
  CardActionArea,
  Divider,
} from "@mui/material";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

import { useNavigate } from "react-router-dom";
import ClubeService, { type Clube } from "../../service/clube.service";

const ClubsPage: React.FC = () => {
  const navigate = useNavigate();

  const [clubes, setClubes] = useState<Clube[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const IMAGES_URL = "http://localhost:8080/uploads/";

  useEffect(() => {
    loadClubes();
  }, []);

  const loadClubes = async () => {
    try {
      setLoading(true);
      const response = await ClubeService.getAll();
      setClubes(response.data);
    } catch (err) {
      setError("Não foi possível carregar os clubes.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Tem a certeza que deseja eliminar este clube?")) {
      try {
        await ClubeService.delete(id);
        setClubes(clubes.filter((c) => c.id_clube !== id));
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
            Clubes de Futebol
          </Typography>

          <Button
            variant="outlined"
            color="primary"
            startIcon={<AddIcon />}
            size="large"
            onClick={() => navigate("/create-club")}
            sx={{
              "&:hover": {
                backgroundColor: "primary.main",
                color: "#fff",
                borderColor: "primary.main",
              },
            }}
          >
            Novo Clube
          </Button>
        </Stack>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error" align="center">
            {error}
          </Typography>
        ) : (
          <Grid container spacing={4}>
            {clubes.map((clube) => (
              <Grid key={clube.id_clube} size={{ xs: 12, sm: 6, md: 4 }}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: 3,
                  }}
                >
                  <CardActionArea
                    component={Link}
                    to={`/clube/${clube.id_clube}`}
                  >
                    <CardMedia
                      component="img"
                      sx={{
                        height: 200,
                        objectFit: "contain",
                        p: 2,
                        backgroundColor: "#f5f5f5",
                      }}
                      image={`${IMAGES_URL}${clube.img}`}
                      alt={clube.nomeClube}
                      onError={(e: any) => {
                        e.target.src =
                          "https://via.placeholder.com/200?text=Sem+Foto";
                      }}
                    />
                    <Divider />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="h2"
                        fontWeight="bold"
                      >
                        {clube.nomeClube}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Cidade:</strong> {clube.cidade}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Estádio:</strong> {clube.estadio}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Ano Fundação:</strong> {clube.anoFundacao}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Treinador:</strong> {clube.treinador}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions
                    sx={{ justifyContent: "space-between", px: 2, pb: 2 }}
                  >
                    <Button
                      variant="outlined"
                      onClick={() => navigate(`/edit-clube/${clube.id_clube}`)}
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
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete(clube.id_clube)}
                    >
                      Eliminar
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </>
  );
};

export default ClubsPage;
