import api from "./api";

export interface Jogador {
  id_jogador: number;
  nome: string;
  nacionalidade: string;
  dataNascimento: string;
  posicao: string;
  numCamisola: string;
  nomeClube: string;
  id_clube: number;
  img: string;
}

interface JogadorCreate {
  nome: string;
  nacionalidade: string;
  dataNascimento: string;
  posicao: string;
  numCamisola: number;
  id_clube: number;
}

const JogadorService = {
  getAll: () => api.get<Jogador[]>("/jogadores"),

  getById: (id: number) => api.get<Jogador[]>(`/jogadores/${id}`),

  delete: (id: number) => api.delete(`/jogadores/${id}`),

  create: (data: JogadorCreate) => api.post("/jogadores", data),

  update: (id: number, data: JogadorCreate) =>
    api.patch(`/jogadores/${id}`, data),
};

export default JogadorService;
