<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\URL;

class VerifyNewEmail extends Notification implements ShouldQueue
{
	use Queueable;

	public function __construct(
		public readonly int $userId,
		public readonly string $email,
	) {
	}

	/** @return list<string> */
	public function via(object $notifiable): array
	{
		return ['mail'];
	}

	public function toMail(object $notifiable): MailMessage
	{
		$url = URL::temporarySignedRoute(
			'profile.email.verify',
			now()->addMinutes(60),
			[
				'user' => $this->userId,
				'hash' => hash('sha256', $this->email),
			],
		);

		return (new MailMessage)
			->subject(__('profile.email.subject'))
			->line(__('profile.email.intro'))
			->action(__('profile.email.action'), $url)
			->line(__('profile.email.expiry'));
	}
}
