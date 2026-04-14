import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import {
  AbstractControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { COMPANY_INFO } from '../../../../core/constants/company.constants';
import { AppRoute } from '../../../../core/enums/app-route.enum';
import { AuthService } from '../../../../core/services/auth.service';
import { SeoService } from '../../../../core/services/seo.service';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';

const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;

  if (!password || !confirmPassword) {
    return null;
  }

  return password === confirmPassword ? null : { passwordMismatch: true };
};

type ResetStep = 'identify' | 'verify';

@Component({
  selector: 'app-forgot-password-page',
  imports: [
    DatePipe,
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    ScrollRevealDirective
  ],
  templateUrl: './forgot-password-page.component.html',
  styleUrl: './forgot-password-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgotPasswordPageComponent implements OnInit {
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly authService = inject(AuthService);
  private readonly snackBar = inject(MatSnackBar);
  private readonly router = inject(Router);
  private readonly seoService = inject(SeoService);

  protected readonly company = COMPANY_INFO;
  protected readonly step = signal<ResetStep>('identify');
  protected readonly submitting = signal(false);
  protected readonly challenge = this.authService.resetChallenge;
  protected readonly challengeHint = computed(
    () => 'Use o código demo 204060 para validar esta experiência de duas etapas.'
  );

  protected readonly identityForm = this.formBuilder.group({
    email: this.formBuilder.control('', [Validators.required, Validators.email]),
    company: this.formBuilder.control('', [Validators.required, Validators.minLength(2)])
  });

  protected readonly verificationForm = this.formBuilder.group(
    {
      verificationCode: this.formBuilder.control('', [Validators.required, Validators.minLength(6)]),
      password: this.formBuilder.control('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: this.formBuilder.control('', [Validators.required, Validators.minLength(8)])
    },
    { validators: [passwordMatchValidator] }
  );

  ngOnInit(): void {
    this.authService.clearResetChallenge();
    this.seoService.updatePage({
      title: 'Recuperar senha',
      description:
        'Fluxo em duas etapas para redefinição de senha da área Del com validação institucional e segurança.',
      path: '/recuperar-senha',
      noindex: true
    });
  }

  protected submitIdentity(): void {
    if (this.identityForm.invalid) {
      this.identityForm.markAllAsTouched();
      return;
    }

    this.submitting.set(true);

    this.authService
      .startPasswordReset(this.identityForm.getRawValue())
      .pipe(finalize(() => this.submitting.set(false)))
      .subscribe({
        next: () => {
          this.step.set('verify');
          this.snackBar.open('Código enviado para validação do acesso.', 'Fechar', {
            duration: 4500
          });
        },
        error: () => {
          this.snackBar.open('Não foi possível iniciar a recuperação agora.', 'Fechar', {
            duration: 5000
          });
        }
      });
  }

  protected submitVerification(): void {
    if (this.verificationForm.invalid || !this.challenge()) {
      this.verificationForm.markAllAsTouched();
      return;
    }

    this.submitting.set(true);

    this.authService
      .confirmPasswordReset({
        requestId: this.challenge()!.requestId,
        ...this.verificationForm.getRawValue()
      })
      .pipe(finalize(() => this.submitting.set(false)))
      .subscribe({
        next: (result) => {
          this.snackBar.open(result.message, 'Fechar', { duration: 4500 });
          void this.router.navigate([`/${AppRoute.Login}`], {
            queryParams: { resetCompleted: '1' }
          });
        },
        error: (error: Error) => {
          this.snackBar.open(error.message || 'Não foi possível validar o código.', 'Fechar', {
            duration: 5000
          });
        }
      });
  }

  protected backToIdentity(): void {
    this.step.set('identify');
  }

  protected getIdentityError(controlName: 'email' | 'company'): string {
    const control = this.identityForm.controls[controlName];

    if (control.hasError('required')) {
      return 'Este campo é obrigatório.';
    }

    if (control.hasError('email')) {
      return 'Informe um e-mail válido.';
    }

    if (control.hasError('minlength')) {
      return `Preencha ao menos ${control.getError('minlength').requiredLength} caracteres.`;
    }

    return 'Verifique as informações informadas.';
  }

  protected getVerificationError(controlName: 'verificationCode' | 'password' | 'confirmPassword'): string {
    const control = this.verificationForm.controls[controlName];

    if (control.hasError('required')) {
      return 'Este campo é obrigatório.';
    }

    if (control.hasError('minlength')) {
      return `Preencha ao menos ${control.getError('minlength').requiredLength} caracteres.`;
    }

    if (controlName === 'confirmPassword' && this.verificationForm.hasError('passwordMismatch')) {
      return 'As senhas precisam ser iguais.';
    }

    return 'Verifique as informações informadas.';
  }
}
