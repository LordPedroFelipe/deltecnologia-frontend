import { ChangeDetectionStrategy, Component, DestroyRef, Input, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ContactFormCopy } from '../../../../core/models/landing-copy.model';
import { ContactService } from '../../../../core/services/contact.service';
import { I18nService } from '../../../../core/services/i18n.service';
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
  protected readonly i18n = inject(I18nService);

  protected readonly submitting = signal(false);
  @Input() content?: ContactFormCopy;
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
          this.form.reset({ name: '', email: '', phone: '', company: '', message: '' });
          this.snackBar.open(this.i18n.t('forms.feedback.contactSuccess'), this.i18n.t('forms.feedback.close'), {
            duration: 5000
          });
        },
        error: () => {
          this.submitting.set(false);
          this.snackBar.open(this.i18n.t('forms.feedback.contactError'), this.i18n.t('forms.feedback.close'), {
            duration: 5000
          });
        }
      });
  }

  protected getErrorMessage(controlName: keyof ContactFormGroup['controls']): string {
    const control = this.form.controls[controlName];

    if (control.hasError('required')) {
      return this.i18n.t('forms.errors.required');
    }

    if (control.hasError('email')) {
      return this.i18n.t('forms.errors.invalidEmail');
    }

    if (control.hasError('minlength')) {
      return this.i18n.t('forms.errors.minLength', {
        count: control.getError('minlength').requiredLength
      });
    }

    return this.i18n.t('forms.errors.invalidFieldShort');
  }
}
