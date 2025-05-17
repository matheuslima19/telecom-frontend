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
import { FaturaService } from '../../services/faturas.service';
import { ContratoService } from '../../services/contratos.service';

interface Fatura {
  id: number;
  contratoId: number;
  dataEmissao: string;
  dataVencimento: string;
  valorCobrado: number;
  status: string;
  contratoNomeFilial?: string;
}

interface Contrato {
  id: number;
  nomeFilial: string;
}

@Component({
  selector: 'app-faturas',
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
  templateUrl: './faturas.component.html',
  styleUrls: ['./faturas.component.css']
})
export class FaturasComponent implements OnInit {
  faturas: Fatura[] = [];
  contratos: Contrato[] = [];
  form!: FormGroup;
  editando: Fatura | null = null;
  displayedColumns = [
    'id',
    'contrato',
    'dataEmissao',
    'dataVencimento',
    'valorCobrado',
    'status',
    'acoes'
  ];

  constructor(
    private fb: FormBuilder,
    private faturaService: FaturaService,
    private contratoService: ContratoService,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      contratoId: ['', Validators.required],
      dataEmissao: ['', Validators.required],
      dataVencimento: ['', Validators.required],
      valorCobrado: [0, [Validators.required, Validators.min(0)]],
      status: ['', Validators.required]
    });

    this.listarFaturas();
    this.listarContratos();
  }

  listarFaturas() {
    this.faturaService.listar().subscribe(data => this.faturas = data);
  }

  listarContratos() {
    this.contratoService.listar().subscribe(data => this.contratos = data);
  }

  salvar() {
    if (this.form.invalid) return;

    const fatura = this.form.value;

    if (this.editando) {
      this.faturaService.atualizar(this.editando.id, fatura).subscribe(() => {
        this.snack.open('Fatura atualizada!', 'Fechar', { duration: 3000 });
        this.cancelar();
        this.listarFaturas();
      });
    } else {
      this.faturaService.criar(fatura).subscribe(() => {
        this.snack.open('Fatura cadastrada!', 'Fechar', { duration: 3000 });
        this.form.reset({ valor: 0 });
        this.listarFaturas();
      });
    }
  }

  editar(f: Fatura) {
    this.editando = f;
    this.form.patchValue(f);
  }

  excluir(id: number) {
    this.faturaService.excluir(id).subscribe(() => {
      this.snack.open('Fatura excluída!', 'Fechar', { duration: 3000 });
      this.listarFaturas();
    });
  }

  cancelar() {
    this.editando = null;
    this.form.reset({ valor: 0 });
  }

  getNomeContrato(id: number): string {
    return this.contratos.find(c => c.id === id)?.nomeFilial || '-';
  }
}
