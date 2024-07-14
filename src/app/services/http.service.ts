import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Tarefa } from '../models/tarefa';
import { Page } from '../models/page';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  tarefaApi = '/api/tarefas';

  constructor(private httpClient: HttpClient) {}

  createTarefa(tarefa: Tarefa): Observable<Tarefa> {
    return this.httpClient.post<Tarefa>(this.tarefaApi, tarefa);
  }

  getTarefasWithPagination(
    pageNum: number,
    size: number
  ): Observable<GetTarefaResponse> {
    const url = `${this.tarefaApi}?page=${pageNum}&size=${size}`;
    return this.httpClient.get<GetTarefaResponse>(url);
  }

  deleteTarefa(id: number): Observable<Tarefa> {
    const deleteUrl = `${this.tarefaApi}/${id}`;
    return this.httpClient.delete<Tarefa>(deleteUrl);
  }

  updateTarefa(tarefa: Tarefa): Observable<Tarefa> {
    const updateUrl = `${this.tarefaApi}/${tarefa.id}`;
    return this.httpClient.put<Tarefa>(updateUrl, tarefa);
  }

  patchTarefaStatus(id: number, finalizadoStatus: boolean): Observable<Tarefa> {
    const patchUrl = `${this.tarefaApi}/${id}`;
    return this.httpClient.patch<Tarefa>(patchUrl, {
      finalizado: finalizadoStatus,
    });
  }
}

interface GetTarefaResponse {
  _embedded: {
    tarefas: Tarefa[];
  };
  page: Page;
}
