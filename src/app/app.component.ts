import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Tarefa } from './models/tarefa';
import { HttpService } from './services/http.service';
import { MESSAGE } from './msgSnack';
import { GeneratedPage } from './models/page';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {
  readonly MESSAGE = MESSAGE;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  tarefaForm!: FormGroup;
  tarefas: Tarefa[] = [];
  isEditMode: boolean = false;
  pageNum = 0;
  size = 5;
  generatedPages: GeneratedPage[] = [];


  constructor(
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private httpService: HttpService,

  ) {}

  ngOnInit(): void {
    this.tarefaForm = this.formBuilder.group({
      id: [''],
      titulo: ['', Validators.required],
      descricao: [''],
      finalizado: [''],
      dataVencimento: ['', Validators.required],
      prioridade: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
    });
    this.getTarefasWithPagination();
  }

  openSnackBar(msg: string) {
    this._snackBar.open(msg, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 2000,
    });
  }

  getTarefasWithPagination(page = 0) {
    this.httpService
      .getTarefasWithPagination(page, this.size)
      .subscribe((data) => {
        if (data) {
          this.tarefas = data._embedded.tarefas;
          this.generateAllPages(data.page.totalPages);
          this.pageNum = data.page.number;
        }
      });
  }

  generateAllPages(totalPages: number) {
    this.generatedPages = [];
    for (let i = 0; i < totalPages; i++) {
      this.generatedPages.push({
        displayValue: i + 1,
        value: i,
      });
    }
  }

  deleteTarefa(id: number) {
    if (confirm('Tens certeza que queres deletar essa tarefa?')) {
      this.httpService.deleteTarefa(id).subscribe((data) => {
        this.getTarefasWithPagination(this.pageNum);
        this.openSnackBar(MESSAGE.DELETE);
      });
    }
  }

  updateTarefa(tarefa: Tarefa) {
    this.httpService.updateTarefa(tarefa).subscribe((data) => {
      this.getTarefasWithPagination(this.pageNum);
      this.tarefaForm.reset();
      this.openSnackBar(MESSAGE.UPDATE);
      this.isEditMode = false;
    });
  }

  handleEdit(tarefa: Tarefa) {
    this.isEditMode = true;
    this.tarefaForm.setValue(tarefa);
  }

  patchTarefaStatus(id: number, finalizadoStatus: boolean) {
    this.httpService.patchTarefaStatus(id, finalizadoStatus).subscribe((data) => {
      this.getTarefasWithPagination(this.pageNum);
      this.openSnackBar(MESSAGE.UPDATE);
    });
  }

  onSubmit() {
    if (this.tarefaForm.invalid) {
      return;
    }
    const formValue: Tarefa = this.tarefaForm.value;
    if (this.isEditMode) {
      this.updateTarefa(formValue);
    } else {
      const tarefaRequest: Tarefa = {
        titulo: formValue.titulo,
        descricao: formValue.descricao,
        finalizado: false,
        dataVencimento: formValue.dataVencimento,
        prioridade: formValue.prioridade,
      };
      this.httpService.createTarefa(tarefaRequest).subscribe((data) => {
        this.generateAllPages(this.pageNum);
        this.openSnackBar(MESSAGE.CREATED);
        this.getTarefasWithPagination(this.pageNum);

        //resetar sem validação
        this.tarefaForm.reset();
        Object.keys(this.tarefaForm.controls).forEach(key => {
          this.tarefaForm.controls[key].setErrors(null)
        });
      });
    }
  }
}

