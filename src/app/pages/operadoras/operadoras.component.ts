import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { OperadoraService } from '../../services/operadora.service';

export interface Operadora {
  id: number;
  nome: string;
  tipoServico: string;
  contatoSuporte: string;
}

@Component({
  selector: 'app-operadoras',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSnackBarModule
  ],
  templateUrl: './operadoras.component.html',
  styleUrls: ['./operadoras.component.css']
})
export class OperadorasComponent implements OnInit {
  operadoras: Operadora[] = [];
  form!: FormGroup;
  editando: Operadora | null = null;
  displayedColumns = ['id', 'nome', 'tipoServico', 'contatoSuporte', 'acoes'];

  constructor(
    private fb: FormBuilder,
    private operadoraService: OperadoraService,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      tipoServico: ['', Validators.required],
      contatoSuporte: ['', Validators.required]
    });

    this.listar();
  }

  listar() {
    this.operadoraService.listar().subscribe(data => this.operadoras = data);
  }

  salvar() {
    if (this.form.invalid) return;

    const operadora = this.form.value;

    if (this.editando) {
      this.operadoraService.atualizar(this.editando.id, operadora).subscribe(() => {
        this.snack.open('Operadora atualizada!', 'Fechar', { duration: 3000 });
        this.cancelar();
        this.listar();
      });
    } else {
      this.operadoraService.criar(operadora).subscribe(() => {
        this.snack.open('Operadora cadastrada!', 'Fechar', { duration: 3000 });
        this.form.reset();
        this.listar();
      });
    }
  }

  editar(op: Operadora) {
    this.editando = op;
    this.form.patchValue(op);
  }

  excluir(id: number) {
    this.operadoraService.excluir(id).subscribe(() => {
      this.snack.open('Operadora excluída!', 'Fechar', { duration: 3000 });
      this.listar();
    });
  }

  cancelar() {
    this.editando = null;
    this.form.reset();
  }
}
