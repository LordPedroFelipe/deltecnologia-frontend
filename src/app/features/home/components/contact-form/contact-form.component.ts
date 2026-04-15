import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ContactService } from '../../../../core/services/contact.service';
import { PremiumCardDirective } from '../../../../shared/directives/premium-card.directive';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';

type ContactFormGroup = FormGroup<{
  name: FormControl<string>;
  email: FormControl<string>;
  phone: FormControl<string>;
  company: FormControl<string>;
  message: FormControl<string>;
}>;

@Component({
  selector: 'app-contact-form',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    PremiumCardDirective
  ],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [ScrollRevealDirective, PremiumCardDirective]
})
export class ContactFormComponent {
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly contactService = inject(ContactService);
  private readonly snackBar = inject(MatSnackBar);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly submitting = signal(false);
  protected readonly form: ContactFormGroup = this.formBuilder.group({
    name: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
    email: this.formBuilder.control('', [Validators.required, Validators.email]),
    phone: this.formBuilder.control('', [Validators.required, Validators.minLength(10)]),
    company: this.formBuilder.control('', [Validators.required, Validators.minLength(2)]),
    message: this.formBuilder.control('', [Validators.required, Validators.minLength(10)])
  });

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting.set(true);

    this.contactService
      .submitContact(this.form.getRawValue())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.submitting.set(false);
          this.form.reset({
            name: '',
            email: '',
            phone: '',
            company: '',
            message: ''
          });
          this.snackBar.open('Mensagem enviada com sucesso. Em breve entraremos em contato.', 'Fechar', {
            duration: 5000
          });
        },
        error: () => {
          this.submitting.set(false);
          this.snackBar.open('Não foi possível enviar agora. Tente novamente em instantes.', 'Fechar', {
            duration: 5000
          });
        }
      });
  }

  protected getErrorMessage(controlName: keyof ContactFormGroup['controls']): string {
    const control = this.form.controls[controlName];

    if (control.hasError('required')) {
      return 'Este campo é obrigatório.';
    }

    if (control.hasError('email')) {
      return 'Informe um e-mail válido.';
    }

    if (control.hasError('minlength')) {
      return `Preencha ao menos ${control.getError('minlength').requiredLength} caracteres.`;
    }

    return 'Verifique este campo.';
  }
}
