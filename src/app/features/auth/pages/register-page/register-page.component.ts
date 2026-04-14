import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { AbstractControl, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { NonNullableFormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { COMPANY_INFO } from '../../../../core/constants/company.constants';
import { AppRoute } from '../../../../core/enums/app-route.enum';
import { AuthService } from '../../../../core/services/auth.service';
import { SeoService } from '../../../../core/services/seo.service';
import { RegisterProfileType } from '../../../../core/models/register-request.model';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';

const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;

  if (!password || !confirmPassword) {
    return null;
  }

  return password === confirmPassword ? null : { passwordMismatch: true };
};

@Component({
  selector: 'app-register-page',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatRadioModule,
    ScrollRevealDirective
  ],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterPageComponent implements OnInit {
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly authService = inject(AuthService);
  private readonly snackBar = inject(MatSnackBar);
  private readonly router = inject(Router);
  private readonly seoService = inject(SeoService);

  protected readonly company = COMPANY_INFO;
  protected readonly submitting = signal(false);
  protected readonly showPassword = signal(false);
  protected readonly showConfirmPassword = signal(false);
  protected readonly profileOptions: ReadonlyArray<{ value: RegisterProfileType; title: string; description: string }> = [
    {
      value: 'client',
      title: 'Cliente institucional',
      description: 'Para hospitais, clínicas, laboratórios e parceiros que desejam relacionamento técnico com a Del.'
    },
    {
      value: 'user',
      title: 'Usuário operacional',
      description: 'Para responsáveis, gestores e profissionais que acompanharão demandas e acessos internos.'
    }
  ];
  protected readonly segmentOptions = [
    'Hospital',
    'Clínica',
    'Laboratório',
    'Centro diagnóstico',
    'Distribuidor / parceiro',
    'Outro'
  ] as const;
  protected readonly employeesOptions = [
    '1 a 20 colaboradores',
    '21 a 100 colaboradores',
    '101 a 300 colaboradores',
    '301 a 1000 colaboradores',
    'Mais de 1000 colaboradores'
  ] as const;

  protected readonly registerForm = this.formBuilder.group(
    {
      profileType: this.formBuilder.control<RegisterProfileType>('client', [Validators.required]),
      fullName: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
      email: this.formBuilder.control('', [Validators.required, Validators.email]),
      phone: this.formBuilder.control('', [Validators.required, Validators.minLength(10)]),
      company: this.formBuilder.control('', [Validators.required, Validators.minLength(2)]),
      jobTitle: this.formBuilder.control('', [Validators.required, Validators.minLength(2)]),
      segment: this.formBuilder.control('', [Validators.required]),
      employeesRange: this.formBuilder.control('', [Validators.required]),
      password: this.formBuilder.control('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: this.formBuilder.control('', [Validators.required, Validators.minLength(8)]),
      acceptTerms: this.formBuilder.control(false, [Validators.requiredTrue]),
      acceptUpdates: this.formBuilder.control(true)
    },
    {
      validators: [passwordMatchValidator]
    }
  );

  ngOnInit(): void {
    this.seoService.updatePage({
      title: 'Cadastro Corporativo',
      description:
        'Cadastro institucional Del Tecnologia para usuários e clientes da empresa, com estrutura pronta para relacionamento, atendimento e operações digitais.',
      path: '/cadastro',
      noindex: true
    });
  }

  protected togglePasswordVisibility(): void {
    this.showPassword.update((current) => !current);
  }

  protected toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword.update((current) => !current);
  }

  protected submit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.submitting.set(true);

    this.authService
      .register(this.registerForm.getRawValue())
      .pipe(finalize(() => this.submitting.set(false)))
      .subscribe({
        next: (result) => {
          console.info('Mock register result', result);
          this.snackBar.open(result.message, 'Fechar', {
            duration: 5500
          });
          void this.router.navigate([`/${AppRoute.Login}`], {
            queryParams: { registered: '1' }
          });
        },
        error: () => {
          this.snackBar.open('Não foi possível concluir o cadastro. Revise os dados e tente novamente.', 'Fechar', {
            duration: 5000
          });
        }
      });
  }

  protected getErrorMessage(
    controlName:
      | 'fullName'
      | 'email'
      | 'phone'
      | 'company'
      | 'jobTitle'
      | 'segment'
      | 'employeesRange'
      | 'password'
      | 'confirmPassword'
      | 'acceptTerms'
  ): string {
    const control = this.registerForm.controls[controlName];

    if (control.hasError('required') || control.hasError('requiredTrue')) {
      return 'Este campo é obrigatório.';
    }

    if (control.hasError('email')) {
      return 'Informe um e-mail válido.';
    }

    if (control.hasError('minlength')) {
      return `Preencha ao menos ${control.getError('minlength').requiredLength} caracteres.`;
    }

    if (controlName === 'confirmPassword' && this.registerForm.hasError('passwordMismatch')) {
      return 'As senhas precisam ser iguais.';
    }

    return 'Verifique as informações informadas.';
  }
}
