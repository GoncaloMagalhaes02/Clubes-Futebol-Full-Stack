import React from "react";

import { Button, Card, Container, Grid, Typography } from "@mui/material";
import noticias from "../../data/data.json";

import {
  Box,
  Stack,
  Divider,
  Paper,
  CardActionArea,
  CardMedia,
  CardContent,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import img from "../../assets/imgsNoticias/noticia1.jpg";
import img2 from "../../assets/imgsNoticias/noticia2.png";
import img3 from "../../assets/imgsNoticias/noticia3.jpg";
import img4 from "../../assets/imgsNoticias/noticia4.png";
import { data } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
}));

function HomePage() {
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
          <Button>Benfica</Button>
          <Button>Porto</Button>
          <Button>Sporting</Button>
          <Button>Braga</Button>
          <Button>V. Guimarães</Button>
        </Stack>
      </Paper>
      <Container maxWidth="lg">
        <Typography
          textAlign="center"
          variant="h4"
          component="h2"
          fontWeight="bold"
          gutterBottom
          sx={{ mt: 8 }}
        >
          Ultimas Noticías
        </Typography>

        <Box>
          <Grid container spacing={2}>
            <Grid size={{ xs: 6, md: 8 }}>
              <Item>
                <Card>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="300"
                      image={img}
                      alt="green iguana"
                      sx={{ objectFit: "cover" }}
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        sx={{
                          textAlign: "left",
                          color: "primary.dark",
                          fontWeight: "bold",
                        }}
                      >
                        {noticias.data[0].titulo}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary", textAlign: "left" }}
                      >
                        {noticias.data[0].descricao}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Item>
            </Grid>
            <Grid size={{ xs: 6, md: 4 }}>
              <Item>
                <Card>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="300"
                      image={img2}
                      alt=""
                      sx={{ objectFit: "cover" }}
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        sx={{
                          textAlign: "left",
                          color: "primary.dark",
                          fontWeight: "bold",
                        }}
                      >
                        {noticias.data[1].titulo}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        {noticias.data[1].descricao}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Item>
            </Grid>
            <Grid size={{ xs: 6, md: 4 }}>
              <Item>
                <Card>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="300"
                      image={img2}
                      alt=""
                      sx={{ objectFit: "cover" }}
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        sx={{
                          textAlign: "left",
                          color: "primary.dark",
                          fontWeight: "bold",
                        }}
                      >
                        {noticias.data[1].titulo}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        {noticias.data[1].descricao}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Item>
            </Grid>
            <Grid size={{ xs: 6, md: 8 }}>
              <Item>
                <Card>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="300"
                      image={img}
                      alt="green iguana"
                      sx={{ objectFit: "cover" }}
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        sx={{
                          textAlign: "left",
                          color: "primary.dark",
                          fontWeight: "bold",
                        }}
                      >
                        {noticias.data[0].titulo}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary", textAlign: "left" }}
                      >
                        {noticias.data[0].descricao}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Item>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}

export default HomePage;
