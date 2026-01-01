import { useParams, useNavigate, Link as RouterLink } from "react-router-dom";
import ClubeService, { type Clube } from "../../service/clube.service";
import JogadorService, { type Jogador } from "../../service/jogador.service";
import { useEffect, useState } from "react";

import {
    Box,
    Container,
    CircularProgress,
    Paper,
    Typography,
    Stack,
    Button,
    Grid,
    Divider,
    ListItemText
} from "@mui/material";

function ClubeDetails() {
    const { id_clube } = useParams<{ id_clube: string }>();
    const navigate = useNavigate();

    const [clube, setClube] = useState<Clube | null>(null);
    const [jogadores, setJogadores] = useState<Jogador[]>([]);
    const [isLoading, SetisLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const IMAGES_URL = "http://localhost:8080/uploads/";

    useEffect(() => {
        getData();
    }, [id_clube]);

    const getData = async () => {
        if (!id_clube) return;
        try {
            SetisLoading(true);
            const id = parseInt(id_clube);

            const [clubeRes, jogadoresRes] = await Promise.all([
                ClubeService.getById(id),
                JogadorService.getByClube(id)
            ]);

            setClube(clubeRes.data);
            setJogadores(jogadoresRes.data);
            
            SetisLoading(false);
        } catch (error) {
            setError("Não foi possível carregar os dados do clube.");
            console.error(error);
            SetisLoading(false);
        }
    };

    return (
        <>
            {isLoading ? (
                <Box display="flex" justifyContent="center" mt={10}><CircularProgress /></Box>
            ) : error ? (
                <Typography color="error" align="center" mt={5}>{error}</Typography>
            ) : clube ? (
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                    {/* CARD PRINCIPAL DO CLUBE */}
                    <Paper elevation={3} sx={{ borderRadius: 2, overflow: "hidden", mb: 4 }}>
                        <Box sx={{ bgcolor: "primary.main", color: "white", p: 4 }}>
                            <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center" spacing={2}>
                                <Stack direction="row" spacing={3} alignItems="center">
                                    <Box
                                        component="img"
                                        src={`${IMAGES_URL}${clube.img}`}
                                        alt={clube.nomeClube}
                                        onError={(e: any) => { e.target.src = "https://via.placeholder.com/200?text=Sem+Logo"; }}
                                        sx={{ width: 100, height: 100, objectFit: "contain", bgcolor: "white", p: 1, borderRadius: 2 }}
                                    />
                                    <Typography variant="h3" fontWeight="bold">
                                        {clube.nomeClube}
                                    </Typography>
                                </Stack>

                                <Stack direction="row" spacing={2}>
                                    <Button variant="contained" color="inherit" sx={{ color: "primary.main" }} onClick={() => navigate("/clubes")}>
                                        Voltar
                                    </Button>
                                    <Button variant="contained" color="warning" component={RouterLink} to={`/clube-editar/${clube.id_clube}`}>
                                        Editar
                                    </Button>
                                </Stack>
                            </Stack>
                        </Box>

                        <Box p={4}>
                            <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>Detalhes Técnicos</Typography>
                            <Divider sx={{ mb: 3 }} />
                            <Grid container spacing={4}>
                                <Grid item xs={12} sm={6} md={3}>
                                    <Typography color="text.secondary" variant="caption" fontWeight="bold">CIDADE</Typography>
                                    <Typography variant="h6">{clube.cidade}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6} md={3}>
                                    <Typography color="text.secondary" variant="caption" fontWeight="bold">ESTÁDIO</Typography>
                                    <Typography variant="h6">{clube.estadio}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6} md={3}>
                                    <Typography color="text.secondary" variant="caption" fontWeight="bold">TREINADOR</Typography>
                                    <Typography variant="h6">{clube.treinador}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6} md={3}>
                                    <Typography color="text.secondary" variant="caption" fontWeight="bold">FUNDAÇÃO</Typography>
                                    <Typography variant="h6">{clube.anoFundacao}</Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </Paper>

                    {/* SECÇÃO DO PLANTEL ABAIXO DO CARD DO CLUBE */}
                    <Paper elevation={2} sx={{ borderRadius: 2, p: 4 }}>
                        <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
                            Plantel Atual ({jogadores.length})
                        </Typography>
                        <Divider sx={{ mb: 3 }} />
                        
                        {jogadores.length > 0 ? (
                            <Grid container spacing={2}>
                                {jogadores.map((jogador) => (
                                    <Grid item xs={12} sm={6} md={4} key={jogador.id_jogador}>
                                        <Paper variant="outlined" sx={{ p: 2, bgcolor: "#fcfcfc" }}>
                                            <ListItemText 
                                                primary={
                                                    <Typography fontWeight="bold" variant="body1">
                                                        {jogador.nome}
                                                    </Typography>
                                                } 
                                                secondary={
                                                    <Typography variant="body2" color="text.secondary">
                                                        Nº {jogador.numCamisola} | {jogador.posicao} | {jogador.nacionalidade}
                                                    </Typography>
                                                } 
                                            />
                                        </Paper>
                                    </Grid>
                                ))}
                            </Grid>
                        ) : (
                            <Typography color="text.secondary" align="center" sx={{ py: 4 }}>
                                Não existem jogadores associados a este clube.
                            </Typography>
                        )}
                    </Paper>
                </Container>
            ) : null}
        </>
    );
}

export default ClubeDetails;