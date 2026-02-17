# Laravel Mail & Mailtrap Setup

**Configuring SMTP for local email testing using Mailtrap.**

---

## 1. What is Mailtrap?

Mailtrap is an "Email Sandbox" that captures outgoing emails from your local Laravel app. It provides a fake SMTP server so you can view how your emails look without bothering real recipients.

---

## 2. Mailtrap Configuration (.env)

1. Sign up/Login at [Mailtrap.io](https://mailtrap.io/).
2. Go to **Sandboxes** > **My Sandbox** > **Code Samples**.
3. Select **Laravel 9+** from the "Integrations"-`PHP` dropdown.
4. Copy the credentials into your `.env` file:

```env
MAIL_MAILER=smtp
MAIL_HOST=sandbox.smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=your_username_from_mailtrap
MAIL_PASSWORD=your_password_from_mailtrap
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS="noreply@gashadigital.com"
MAIL_FROM_NAME="${APP_NAME}"
```

## 3. Creating a Mailable

Generate a new email class using Artisan:

```php
php artisan make:mail WelcomeMail
```

This creates a file in `app/Mail/WelcomeMail.php`.

**Configuring the Content**
In `WelcomeMail.php`, define the view or markdown template:

```php
public function content(): Content
{
    return new Content(
        view: 'emails.welcome',
    );
}
```

## 4. Sending the Email

You can trigger the email from a Controller or Route:

```php
use App\Mail\WelcomeMail;
use Illuminate\Support\Facades\Mail;

Route::get('/test-mail', function () {
    Mail::to('user@example.com')->send(new WelcomeMail());
    return "Check your Mailtrap inbox!";
});
```

## 5. Troubleshooting

- **Cache Issues:** If you update .env and the mail still fails, run:

```bash
php artisan config:clear
```

- **Connection Timeout:** Ensure your firewall allows outgoing traffic on port 2525 or 587.
- **Mail Driver:** For local testing, ensure MAIL_MAILER is set to smtp. For logs only (no UI), you can use log.

