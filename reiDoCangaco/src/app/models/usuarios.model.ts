import { Empregado } from './empregado.model';
export interface Usuarios {
    idUser?: string;
    tipo: string;
    userName: string;
    senha: string;
    flagAtivo?: boolean;
    status?: string;
    idEmpregado?: Empregado;
}
