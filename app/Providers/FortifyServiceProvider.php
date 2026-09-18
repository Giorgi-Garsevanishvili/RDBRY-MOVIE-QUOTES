<?php

namespace App\Providers;

use App\Actions\Auth\AuthenticateUser;
use App\Actions\Fortify\ResetUserPassword;
use App\Http\Requests\Auth\LoginRequest as MovieQuotesLoginRequest;
use App\Http\Requests\Auth\SendPasswordResetLinkRequest as MovieQuotesPasswordResetLinkRequest;
use App\Http\Responses\PasswordResetLinkSentResponse;
use App\Http\Responses\PasswordResetResponse;
use App\Models\User;
use Illuminate\Auth\Notifications\ResetPassword as ResetPasswordNotification;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\Facades\Password as PasswordBroker;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use Laravel\Fortify\Fortify;
use Laravel\Fortify\Http\Requests\LoginRequest as FortifyLoginRequest;
use Laravel\Fortify\Http\Requests\SendPasswordResetLinkRequest as FortifyPasswordResetLinkRequest;
use Laravel\Fortify\Contracts\PasswordResetResponse as PasswordResetResponseContract;
use Laravel\Fortify\Contracts\SuccessfulPasswordResetLinkRequestResponse;

class FortifyServiceProvider extends ServiceProvider
{
	/**
	 * Register any application services.
	 */
	public function register(): void
	{
		$this->app->bind(FortifyLoginRequest::class, MovieQuotesLoginRequest::class);
		$this->app->bind(FortifyPasswordResetLinkRequest::class, MovieQuotesPasswordResetLinkRequest::class);
		$this->app->bind(SuccessfulPasswordResetLinkRequestResponse::class, PasswordResetLinkSentResponse::class);
		$this->app->bind(PasswordResetResponseContract::class, PasswordResetResponse::class);
	}

	/**
	 * Bootstrap any application services.
	 */
	public function boot(): void
	{
		$this->configureActions();
		$this->configureNotifications();
		$this->configureViews();
		$this->configureRateLimiting();
	}

	private function configureNotifications(): void
	{
		VerifyEmail::createUrlUsing(fn (User $notifiable): string => URL::temporarySignedRoute(
			'activation.verify',
			now()->addMinutes((int) config('auth.verification.expire')),
			[
				'user' => $notifiable->getKey(),
				'hash' => sha1($notifiable->getEmailForVerification()),
			],
		));

		VerifyEmail::toMailUsing(fn (User $notifiable, string $url): MailMessage => $this->authMail(
			__('mail.verification.subject'),
			__('mail.greeting', ['username' => $notifiable->username]),
			__('mail.verification.intro'),
			__('mail.verification.action'),
			$url,
		));

		ResetPasswordNotification::toMailUsing(function (User $notifiable, string $token): MailMessage {
			$url = route('password.reset', [
				'token' => $token,
				'email' => $notifiable->getEmailForPasswordReset(),
			]);

			return $this->authMail(
				__('mail.reset.subject'),
				__('mail.greeting', ['username' => $notifiable->username]),
				__('mail.reset.intro', [
					'count' => config('auth.passwords.users.expire'),
				]),
				__('mail.reset.action'),
				$url,
			);
		});
	}

	private function authMail(
		string $subject,
		string $greeting,
		string $intro,
		string $actionText,
		string $actionUrl,
	): MailMessage {
		$data = [
			'subject'    => $subject,
			'brand'      => __('mail.brand'),
			'greeting'   => $greeting,
			'intro'      => $intro,
			'actionText' => $actionText,
			'actionUrl'  => $actionUrl,
			'fallback'   => __('mail.fallback'),
			'support'    => __('mail.support', ['email' => 'support@moviequotes.ge']),
			'closing'    => __('mail.closing'),
		];

		return (new MailMessage)
			->subject($subject)
			->view('mail.auth.action', $data)
			->text('mail.auth.action-text', $data);
	}

	/**
	 * Configure Fortify actions.
	 */
	private function configureActions(): void
	{
		Fortify::resetUserPasswordsUsing(ResetUserPassword::class);
		Fortify::authenticateUsing(
			fn (Request $request) => app(AuthenticateUser::class)->handle(
				$request->string(Fortify::username())->toString(),
				$request->string('password')->toString(),
			),
		);
	}

	/**
	 * Configure Fortify views.
	 */
	private function configureViews(): void
	{
		Fortify::loginView(fn (Request $request) => Inertia::render('auth/Login', [
			'canResetPassword' => Features::enabled(Features::resetPasswords()),
			'status'           => $request->session()->get('status'),
			'googleError'      => $request->session()->get('google_error'),
		]));

		Fortify::resetPasswordView(function (Request $request) {
			$email = Str::lower($request->string('email')->toString());
			$token = (string) $request->route('token');
			$user = User::query()->where('email', $email)->first();

			if ($user === null || $user->password === null || !PasswordBroker::broker()->tokenExists($user, $token))
			{
				return Inertia::render('auth/PasswordResetExpired');
			}

			return Inertia::render('auth/ResetPassword', [
				'email' => $email,
				'token' => $token,
			]);
		});

		Fortify::requestPasswordResetLinkView(fn () => Inertia::render('auth/ForgotPassword'));
		Fortify::verifyEmailView(fn () => Inertia::render('auth/VerificationPending'));

		Fortify::confirmPasswordView(fn () => Inertia::render('auth/confirm-password'));
	}

	/**
	 * Configure rate limiting.
	 */
	private function configureRateLimiting(): void
	{
		RateLimiter::for('login', function (Request $request) {
			$identity = $request->string(Fortify::username())->toString();
			$throttleKey = Str::transliterate(Str::lower($identity) . '|' . $request->ip());

			return Limit::perMinute(5)->by($throttleKey);
		});
	}
}
