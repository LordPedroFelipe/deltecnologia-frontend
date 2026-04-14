import { Injectable, computed, signal } from '@angular/core';
import { Observable, delay, map, of, tap, throwError } from 'rxjs';
import { AuthRole } from '../enums/auth-role.enum';
import { PortalPermission } from '../enums/portal-permission.enum';
import { AuthSession } from '../models/auth-session.model';
import { LoginRequest } from '../models/login-request.model';
import { PasswordResetChallenge } from '../models/password-reset-challenge.model';
import { PasswordResetConfirmationRequest } from '../models/password-reset-confirmation-request.model';
import { PasswordResetRequest } from '../models/password-reset-request.model';
import { RegisterRequest } from '../models/register-request.model';
import { RegisterResult } from '../models/register-result.model';

interface AccessProfile {
  readonly role: AuthRole;
  readonly roleLabel: string;
  readonly permissions: readonly PortalPermission[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private static readonly storageKey = 'deltecnologia.auth.session';
  private static readonly mockVerificationCode = '204060';

  private readonly sessionState = signal<AuthSession | null>(this.readStoredSession());
  private readonly resetChallengeState = signal<PasswordResetChallenge | null>(null);

  readonly session = computed(() => this.sessionState());
  readonly isAuthenticated = computed(() => this.sessionState() !== null);
  readonly resetChallenge = computed(() => this.resetChallengeState());

  login(request: LoginRequest): Observable<AuthSession> {
    const normalizedEmail = request.email.trim().toLowerCase();

    if (!normalizedEmail.includes('@') || request.password.length < 8) {
      return throwError(() => new Error('Credenciais inválidas.'));
    }

    return of(request).pipe(
      delay(1100),
      map(() => this.buildSession(normalizedEmail)),
      tap((session) => this.persistSession(session, request.remember))
    );
  }

  register(request: RegisterRequest): Observable<RegisterResult> {
    const normalizedEmail = request.email.trim().toLowerCase();

    if (
      !normalizedEmail.includes('@') ||
      request.password.length < 8 ||
      request.password !== request.confirmPassword ||
      !request.acceptTerms
    ) {
      return throwError(() => new Error('Não foi possível concluir o cadastro.'));
    }

    return of(request).pipe(
      delay(1400),
      map(() => ({
        id: 'mock-register-' + Date.now().toString(36),
        onboardingStatus: 'pending',
        message:
          'Cadastro recebido com sucesso. Nossa equipe fará a validação inicial para liberar os próximos passos.'
      }))
    );
  }

  startPasswordReset(request: PasswordResetRequest): Observable<PasswordResetChallenge> {
    if (!request.email.includes('@') || request.company.trim().length < 2) {
      return throwError(() => new Error('Dados inválidos para recuperação.'));
    }

    return of(request).pipe(
      delay(1200),
      map(() => ({
        requestId: 'reset-' + Date.now().toString(36),
        destinationMasked: this.maskEmail(request.email),
        channel: 'email' as const,
        expiresAt: new Date(Date.now() + 1000 * 60 * 10).toISOString()
      })),
      tap((challenge) => this.resetChallengeState.set(challenge))
    );
  }

  confirmPasswordReset(request: PasswordResetConfirmationRequest): Observable<{ message: string }> {
    const activeChallenge = this.resetChallengeState();

    if (
      !activeChallenge ||
      activeChallenge.requestId !== request.requestId ||
      request.verificationCode.length < 6 ||
      request.password.length < 8 ||
      request.password !== request.confirmPassword
    ) {
      return throwError(() => new Error('Não foi possível validar a redefinição.'));
    }

    if (request.verificationCode !== AuthService.mockVerificationCode) {
      return throwError(() => new Error('Código de verificação inválido.'));
    }

    return of(request).pipe(
      delay(1200),
      map(() => ({
        message: 'Senha redefinida com sucesso. Seu acesso já pode ser retomado.'
      })),
      tap(() => this.resetChallengeState.set(null))
    );
  }

  hasPermission(permission: PortalPermission): boolean {
    return this.sessionState()?.user.permissions.includes(permission) ?? false;
  }

  hasAnyPermission(permissions: readonly PortalPermission[]): boolean {
    const activePermissions = this.sessionState()?.user.permissions ?? [];
    return permissions.some((permission) => activePermissions.includes(permission));
  }

  logout(): void {
    this.sessionState.set(null);
    this.clearStoredSession();
  }

  clearResetChallenge(): void {
    this.resetChallengeState.set(null);
  }

  private buildSession(email: string): AuthSession {
    const profile = this.resolveAccessProfile(email);
    const company = this.inferCompanyName(email);

    return {
      token: 'mock-deltecnologia-auth-token',
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 8).toISOString(),
      user: {
        name: email.split('@')[0].replace(/[.\-_]/g, ' '),
        email,
        role: profile.role,
        roleLabel: profile.roleLabel,
        company,
        permissions: profile.permissions
      }
    };
  }

  private resolveAccessProfile(email: string): AccessProfile {
    const localPart = email.split('@')[0];

    if (/(admin|diretoria|gestao|executivo)/.test(localPart)) {
      return {
        role: AuthRole.Admin,
        roleLabel: 'Gestão executiva',
        permissions: [
          PortalPermission.ViewOverview,
          PortalPermission.ViewOperations,
          PortalPermission.ManageTickets,
          PortalPermission.ViewAssets,
          PortalPermission.ViewReports,
          PortalPermission.ManageUsers
        ]
      };
    }

    if (/(cliente|gerente|coordenador|hospital)/.test(localPart)) {
      return {
        role: AuthRole.ClientManager,
        roleLabel: 'Gestor do cliente',
        permissions: [
          PortalPermission.ViewOverview,
          PortalPermission.ViewOperations,
          PortalPermission.ManageTickets,
          PortalPermission.ViewAssets,
          PortalPermission.ViewReports
        ]
      };
    }

    return {
      role: AuthRole.Operator,
      roleLabel: 'Operação técnica',
      permissions: [
        PortalPermission.ViewOverview,
        PortalPermission.ViewOperations,
        PortalPermission.ManageTickets,
        PortalPermission.ViewAssets
      ]
    };
  }

  private inferCompanyName(email: string): string {
    const domain = email.split('@')[1] ?? '';

    if (domain.includes('deltecnologia')) {
      return 'Del Tecnologia';
    }

    const root = domain.split('.')[0] ?? 'Cliente Del';
    return root
      .split('-')
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');
  }

  private maskEmail(email: string): string {
    const [localPart, domain] = email.trim().toLowerCase().split('@');

    if (!localPart || !domain) {
      return 'e-mail informado';
    }

    const visibleStart = localPart.slice(0, 2);
    const visibleEnd = localPart.slice(-1);
    return `${visibleStart}${'*'.repeat(Math.max(2, localPart.length - 3))}${visibleEnd}@${domain}`;
  }

  private persistSession(session: AuthSession, remember: boolean): void {
    this.sessionState.set(session);

    const serialized = JSON.stringify(session);
    if (remember) {
      globalThis.localStorage?.setItem(AuthService.storageKey, serialized);
      globalThis.sessionStorage?.removeItem(AuthService.storageKey);
      return;
    }

    globalThis.sessionStorage?.setItem(AuthService.storageKey, serialized);
    globalThis.localStorage?.removeItem(AuthService.storageKey);
  }

  private readStoredSession(): AuthSession | null {
    const serialized =
      globalThis.localStorage?.getItem(AuthService.storageKey) ??
      globalThis.sessionStorage?.getItem(AuthService.storageKey);

    if (!serialized) {
      return null;
    }

    try {
      return JSON.parse(serialized) as AuthSession;
    } catch {
      this.clearStoredSession();
      return null;
    }
  }

  private clearStoredSession(): void {
    globalThis.localStorage?.removeItem(AuthService.storageKey);
    globalThis.sessionStorage?.removeItem(AuthService.storageKey);
  }
}
