import api from "./api";

export interface Clube {
  id_clube: number;
  nomeClube: string;
  anoFundacao: number;
  cidade: string;
  estadio: string;
  treinador: string;
  img: string;
}

const ClubeService = {
  getAll: () => api.get<Clube[]>("/"),
  
  getById: (id: number) => api.get<Clube>(`/${id}`),
  
  insert: (formData: FormData) => api.post("/", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  }),
  
  update: (id: number, data: any) => api.patch(`/${id}`, data),
  
  delete: (id: number) => api.delete(`/${id}`)

  
};

export default ClubeService;