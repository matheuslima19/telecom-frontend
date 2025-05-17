import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ContratoService } from '../../services/contratos.service';
import { OperadoraService } from '../../services/operadora.service';

interface Contrato {
  id: number;
  nomeFilial: string;
  operadoraId: number;
  planoContratado: string;
  dataInicio: string;
  dataVencimento: string;
  valorMensal: number;
  status: string;
}


interface Operadora {
  id: number;
  nome: string;
}

@Component({
  selector: 'app-contratos',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSnackBarModule
  ],
  templateUrl: './contratos.component.html',
  styleUrls: ['./contratos.component.css']
})
export class ContratosComponent implements OnInit {
  contratos: Contrato[] = [];
  operadoras: Operadora[] = [];
  form!: FormGroup;
  editando: Contrato | null = null;
  displayedColumns = [
    'id',
    'nomeFilial',
    'operadora',
    'planoContratado',
    'dataInicio',
    'dataVencimento',
    'valorMensal',
    'status',
    'acoes'
  ];;

  constructor(
    private fb: FormBuilder,
    private contratoService: ContratoService,
    private operadoraService: OperadoraService,
    private snack: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nomeFilial: ['', Validators.required],
      operadoraId: ['', Validators.required],
      planoContratado: ['', Validators.required],
      dataInicio: ['', Validators.required],
      dataVencimento: ['', Validators.required],
      valorMensal: [0, [Validators.required, Validators.min(0)]],
      status: ['', Validators.required]
    });


    this.listarContratos();
    this.listarOperadoras();
  }

  listarContratos() {
    this.contratoService.listar().subscribe(data => this.contratos = data);
  }

  listarOperadoras() {
    this.operadoraService.listar().subscribe(data => this.operadoras = data);
  }

  salvar() {
    if (this.form.invalid) return;

    const contrato = this.form.value;

    if (this.editando) {
      this.contratoService.atualizar(this.editando.id, contrato).subscribe(() => {
        this.snack.open('Contrato atualizado!', 'Fechar', { duration: 3000 });
        this.cancelar();
        this.listarContratos();
      });
    } else {
      this.contratoService.criar(contrato).subscribe(() => {
        this.snack.open('Contrato cadastrado!', 'Fechar', { duration: 3000 });
        this.form.reset({ ativo: true });
        this.listarContratos();
      });
    }
  }

  editar(ct: Contrato) {
    this.editando = ct;
    this.form.patchValue(ct);
  }


  excluir(id: number) {
    this.contratoService.excluir(id).subscribe(() => {
      this.snack.open('Contrato excluído!', 'Fechar', { duration: 3000 });
      this.listarContratos();
    });
  }

  cancelar() {
    this.editando = null;
    this.form.reset({
      valorMensal: 0
    });
  }


  getNomeOperadora(id: number): string {
    return this.operadoras.find(op => op.id === id)?.nome || '-';
  }
}
