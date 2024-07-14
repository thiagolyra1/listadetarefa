import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Tarefa } from '../models/tarefa';
import { Page } from '../models/page';

@Injectable({
  providedIn: 'root',
})
export class HttpService {

  // Localização dos dados do back-end
  tarefaApi = '/api/tarefas';

  constructor(private httpClient: HttpClient) {}

  // Criar tarefa. Observable -> pegar uma lista observável "externa". Gera um INSERT no banco de dados
  createTarefa(tarefa: Tarefa): Observable<Tarefa> {
    return this.httpClient.post<Tarefa>(this.tarefaApi, tarefa);
  }

  // Pegar lista de tarefa com paginação. Gera um SELECT no bando de dados
  getTarefasWithPagination(
    pageNum: number,
    size: number
  ): Observable<GetTarefaResponse> {
    const url = `${this.tarefaApi}?page=${pageNum}&size=${size}`;
    return this.httpClient.get<GetTarefaResponse>(url);
  }

  // Deletar tarefa baseado no ID, gerando um delete no banco de dados
  deleteTarefa(id: number): Observable<Tarefa> {
    const deleteUrl = `${this.tarefaApi}/${id}`;
    return this.httpClient.delete<Tarefa>(deleteUrl);
  }

  // Editar a tarefa baseado no ID, gerando um update no banco de dados (put atualiza todas as propriedades)
  updateTarefa(tarefa: Tarefa): Observable<Tarefa> {
    const updateUrl = `${this.tarefaApi}/${tarefa.id}`;
    return this.httpClient.put<Tarefa>(updateUrl, tarefa);
  }

  // Atualizar apenas a propriedade status, sem precisar editar objeto. Gera um update (patch atualiza 1 ou mais propriedade)
  patchTarefaStatus(id: number, finalizadoStatus: boolean): Observable<Tarefa> {
    const patchUrl = `${this.tarefaApi}/${id}`;
    return this.httpClient.patch<Tarefa>(patchUrl, {
      finalizado: finalizadoStatus,
    });
  }
}

// interface para pegar a reposta da lista de tarefa com paginação
interface GetTarefaResponse {
  _embedded: {
    tarefas: Tarefa[];
  };
  page: Page;
}
