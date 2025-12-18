import React from "react";

import { Button, Card, Container, Grid, Typography } from "@mui/material";

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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
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

        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid size={8}>
              <Item>
                <Card>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image=""
                      alt="green iguana"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Lizard
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        Lizards are a widespread group of squamate reptiles,
                        with over 6,000 species, ranging across all continents
                        except Antarctica
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Item>
            </Grid>
            <Grid size={4}>
              <Item>size=4</Item>
            </Grid>
            <Grid size={4}>
              <Item>size=4</Item>
            </Grid>
            <Grid size={8}>
              <Item>size=8</Item>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}

export default HomePage;
