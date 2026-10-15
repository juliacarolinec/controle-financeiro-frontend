import { inject, Service } from '@angular/core';
import { Categoria } from '../models/categoria';
import { HttpClient } from '@angular/common/http';
import { Pagina } from '../models/pagina';

@Service()
export class CategoriaService {
    private http = inject(HttpClient);
    private apiUrl =  'http://localhost:8080/categorias';

    listarCategorias(page: number, size: number){
        return this.http.get<Pagina<Categoria>>(
            this.apiUrl,{params: {page, size}}
        );
    }
}
