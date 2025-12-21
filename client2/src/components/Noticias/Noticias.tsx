import { Card, Grid, Typography } from "@mui/material";
import noticias from "../../data/data.json";

import {
  Box,
  Paper,
  CardActionArea,
  CardMedia,
  CardContent,
} from "@mui/material";

import img from "../../assets/imgsNoticias/noticia1.jpg";
import img2 from "../../assets/imgsNoticias/noticia2.png";
import img3 from "../../assets/imgsNoticias/noticia3.jpg";
import img4 from "../../assets/imgsNoticias/noticia4.png";

import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
}));

function Noticias() {
  return (
    <>
      <Typography
        textAlign="center"
        variant="h4"
        component="h2"
        fontWeight="bold"
        gutterBottom
        sx={{ mt: 8 }}
      >
        📰 Ultimas Noticías
      </Typography>
      <Box>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Item>
              <Card>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="250"
                    image={img}
                    alt="green iguana"
                    sx={{ objectFit: "fill" }}
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
          <Grid size={{ xs: 12, md: 6 }}>
            <Item>
              <Card>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="250"
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
          <Grid size={{ xs: 12, md: 6 }}>
            <Item>
              <Card>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="250"
                    image={img3}
                    alt=""
                    sx={{ objectFit: "fill" }}
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
                      {noticias.data[2].titulo}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {noticias.data[2].descricao}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Item>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Item>
              <Card>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="250"
                    image={img4}
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
                      {noticias.data[3].titulo}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary", textAlign: "left" }}
                    >
                      {noticias.data[3].descricao}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Noticias;
