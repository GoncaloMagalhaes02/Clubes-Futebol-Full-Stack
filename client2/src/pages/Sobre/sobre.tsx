import React from "react";
import { 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Avatar, 
  Box, 
  Paper, 
  Divider 
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const SobrePage: React.FC = () => {
  const teamMembers = [
    {
      nome: "Guilherme Magalhães",
      role: "Programador Web | Frontend/Backend",
      curso: "3º Ano - ECGM",
      numero: "25393",
    },
    {
      nome: "Gonçalo Magalhães",
      role: "Programador Web | Frontend/Backend",
      curso: "3º Ano - ECGM",
      numero: "25354",
    },
  ];

  return (
    <>
      <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* Cabeçalho da Página */}
        <Box textAlign="center" mb={6}>
          <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
            👥 Grupo de Trabalho
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Projeto de Desenvolvimento Web (ECGM - 3º Ano)
          </Typography>
          <Divider sx={{ mt: 3, width: "100px", mx: "auto", borderBottomWidth: 3, bgcolor: "primary.main" }} />
        </Box>

        {/* Container dos Membros */}
        <Grid container spacing={4} justifyContent="center">
          {teamMembers.map((member, index) => (
            <Grid item xs={12} sm={6} md={5} key={index}>
              <Card 
                elevation={4} 
                sx={{ 
                  borderRadius: 4, 
                  textAlign: "center", 
                  transition: "transform 0.2s",
                  "&:hover": { transform: "scale(1.02)" } 
                }}
              >
                <CardContent sx={{ p: 5 }}>
                  <Avatar 
                    sx={{ 
                      width: 80, 
                      height: 80, 
                      mx: "auto", 
                      mb: 2, 
                      bgcolor: "primary.light",
                      color: "primary.main"
                    }}
                  >
                    <AccountCircleIcon sx={{ fontSize: 60 }} />
                  </Avatar>
                  
                  <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom>
                    {member.nome}
                  </Typography>
                  
                  <Typography variant="body1" color="primary" fontWeight="medium" gutterBottom>
                    {member.role}
                  </Typography>
                  
                  <Box mt={2}>
                    <Typography variant="body2" color="text.secondary">
                      {member.curso}
                    </Typography>
                    <Typography variant="body2" fontWeight="bold" sx={{ mt: 1 }}>
                      Número: {member.numero}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Informação Extra do Projeto */}
        <Paper 
          variant="outlined" 
          sx={{ mt: 8, p: 4, borderRadius: 3, bgcolor: "grey.50", textAlign: "center" }}
        >
          <Typography variant="body2" color="text.secondary">
            Este projeto foi desenvolvido no âmbito da Unidade Curricular de Programação Web do curso de Engenharia da Computação Gráfica e Multimédia.
          </Typography>
        </Paper>
      </Container>
    </>
  );
};

export default SobrePage;