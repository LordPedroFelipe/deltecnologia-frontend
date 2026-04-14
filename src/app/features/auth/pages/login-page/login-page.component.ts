import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { COMPANY_INFO } from '../../../../core/constants/company.constants';
import { AppRoute } from '../../../../core/enums/app-route.enum';
import { AuthService } from '../../../../core/services/auth.service';
import { SeoService } from '../../../../core/services/seo.service';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-login-page',
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
    ScrollRevealDirective
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent implements OnInit {
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly authService = inject(AuthService);
  private readonly snackBar = inject(MatSnackBar);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly seoService = inject(SeoService);

  protected readonly company = COMPANY_INFO;
  protected readonly homeRoute = `/${AppRoute.Home}`;
  protected readonly showPassword = signal(false);
  protected readonly submitting = signal(false);
  protected readonly flowMessage = signal<string | null>(null);

  protected readonly loginForm = this.formBuilder.group({
    email: this.formBuilder.control('', [Validators.required, Validators.email]),
    password: this.formBuilder.control('', [Validators.required, Validators.minLength(8)]),
    remember: this.formBuilder.control(true)
  });

  ngOnInit(): void {
    this.seoService.updatePage({
      title: 'Login Corporativo',
      description:
        'Acesso corporativo Del Tecnologia para acompanhamento de soluções, relacionamento técnico e operações digitais.',
      path: '/login',
      noindex: true
    });

    const registered = this.route.snapshot.queryParamMap.get('registered');
    const resetRequested = this.route.snapshot.queryParamMap.get('resetRequested');
    const resetCompleted = this.route.snapshot.queryParamMap.get('resetCompleted');
    const deniedFrom = this.route.snapshot.queryParamMap.get('deniedFrom');

    if (registered === '1') {
      this.flowMessage.set('Cadastro enviado com sucesso. Faça login para continuar sua jornada com a Del.');
      return;
    }

    if (resetCompleted === '1') {
      this.flowMessage.set('Senha redefinida com sucesso. Entre novamente para acessar o portal.');
      return;
    }

    if (resetRequested === '1') {
      this.flowMessage.set(
        'Solicitação de recuperação registrada. Assim que validada, você poderá acessar sua conta novamente.'
      );
      return;
    }

    if (deniedFrom) {
      this.flowMessage.set(
        'Seu perfil atual não possui permissão para a rota solicitada. Você foi redirecionado para uma área permitida.'
      );
    }
  }

  protected togglePasswordVisibility(): void {
    this.showPassword.update((current) => !current);
  }

  protected submit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.submitting.set(true);

    this.authService
      .login(this.loginForm.getRawValue())
      .pipe(finalize(() => this.submitting.set(false)))
      .subscribe({
        next: (session) => {
          console.info('Mock auth session', session);
          this.snackBar.open('Login efetuado com sucesso. Redirecionando para sua área inicial.', 'Fechar', {
            duration: 4000
          });

          const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') ?? `/${AppRoute.Dashboard}`;
          void this.router.navigateByUrl(returnUrl);
        },
        error: () => {
          this.snackBar.open('Não foi possível autenticar. Revise seus dados e tente novamente.', 'Fechar', {
            duration: 5000
          });
        }
      });
  }

  protected getErrorMessage(controlName: 'email' | 'password'): string {
    const control = this.loginForm.controls[controlName];

    if (control.hasError('required')) {
      return 'Este campo é obrigatório.';
    }

    if (control.hasError('email')) {
      return 'Informe um e-mail corporativo válido.';
    }

    if (control.hasError('minlength')) {
      return `Use pelo menos ${control.getError('minlength').requiredLength} caracteres.`;
    }

    return 'Verifique as informações informadas.';
  }
}
