import api from "./api";

export interface Jogador {
  id_jogador: number;
  nome: string;
  nacionalidade: string;
  dataNascimento: string;
  posicao: string;
  num_Camisola: string;
  id_clube: number;
}

const JogadorService = {
  getAll: () => api.get<Jogador[]>("/jogadores"),

  getById: (id: number) => api.get<Jogador>(`/jogadores/${id}`),

  delete: (id: number) => api.delete(`/jogadores/${id}`),
};

export default JogadorService;
