import { Button, Container, Stack, Divider, Paper, Box } from "@mui/material";

import Noticias from "../../components/Noticias/Noticias";
import Estatisticas from "../../components/Estatisticas/Estatisticas";
import { useEffect, useState } from "react";
import type { Clube } from "../../service/clube.service";
import ClubeService from "../../service/clube.service";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [clubes, setClubes] = useState<Clube[]>();

  const navigate = useNavigate();

  const IMAGES_URL = "http://localhost:8080/uploads/";

  useEffect(() => {
    getClubes();
  }, []);

  const getClubes = async () => {
    try {
      const response = await ClubeService.getAll();
      setClubes(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Erro ao buscar os clubes:", error);
    }
  };

  return (
    <>
      <Paper
        elevation={0}
        square
        sx={{
          width: "100%",
          borderBottom: "1px solid #e0e0e0",
          bgcolor: "primary.light",
          py: 1.5,
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="center"
          divider={<Divider orientation="vertical" flexItem />}
        >
          {clubes &&
            clubes.map((clube) => (
              <Box
                onClick={() => navigate(`/clube/${clube.id_clube}`)}
                component="img"
                width={"35px"}
                src={`${IMAGES_URL}${clube.img}`}
                alt={clube.nomeClube}
                key={clube.id_clube}
                sx={{
                  cursor: "pointer",

                  "&:hover": { transform: "scale(1.1)" },
                  transition: "transform 0.2s",
                }}
              ></Box>
            ))}
        </Stack>
      </Paper>
      <Container maxWidth="lg">
        <Noticias />
      </Container>
      <Estatisticas />
    </>
  );
}

export default HomePage;
