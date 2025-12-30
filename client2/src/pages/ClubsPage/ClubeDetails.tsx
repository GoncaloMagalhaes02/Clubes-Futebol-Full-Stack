import { useParams, useNavigate, Link as RouterLink } from "react-router-dom";
import ClubeService, { type Clube } from "../../service/clube.service";
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
} from "@mui/material";


function ClubeDetails() {
    const { id_clube } = useParams<{ id_clube: string }>();
    const navigate = useNavigate();

    const [clube, setClube] = useState<Clube | null>(null);
    const [isLoading, SetisLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const IMAGES_URL = "http://localhost:8080/uploads/";

    useEffect(() => {
        getClube();
    }, [id_clube]);

    const getClube = async () => {
        if (!id_clube) return;
        try {
            SetisLoading(true);
            const response = await ClubeService.getById(parseInt(id_clube));
            if (response.data) {
                setClube(response.data);
            }
            SetisLoading(false);
        } catch (error) {
            setError("Não foi possível carregar os detalhes do Clube.");
            console.log(error);
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
                <Container maxWidth="lg" sx={{ mt: 4 }}>
                    <Paper elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
                        {/* Cabeçalho do Detalhe */}
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

                        {/* Conteúdo Info */}
                        <Grid container spacing={0}>
                            <Grid item xs={12} md={6}>
                                <Stack p={4} spacing={3}>
                                    <Typography variant="h5" fontWeight="bold" color="primary">Informações Gerais</Typography>
                                    <Divider />
                                    
                                    <Box>
                                        <Typography color="text.secondary" variant="caption">CIDADE</Typography>
                                        <Typography variant="h6">{clube.cidade}</Typography>
                                    </Box>

                                    <Box>
                                        <Typography color="text.secondary" variant="caption">ANO DE FUNDAÇÃO</Typography>
                                        <Typography variant="h6">{clube.anoFundacao}</Typography>
                                    </Box>

                                     <Box>
                                        <Typography color="text.secondary" variant="caption">ESTÁDIO</Typography>
                                        <Typography variant="h6">{clube.estadio}</Typography>
                                    </Box>

                                    <Box>
                                        <Typography color="text.secondary" variant="caption">TREINADOR ATUAL</Typography>
                                        <Typography variant="h6">{clube.treinador}</Typography>
                                    </Box>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Paper>
                </Container>
            ) : null}
        </>
    );
}

export default ClubeDetails; 
