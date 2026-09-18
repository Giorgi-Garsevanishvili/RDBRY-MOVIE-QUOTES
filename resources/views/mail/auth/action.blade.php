<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ $subject }}</title>
</head>
<body style="margin: 0; background: #181623; color: #ffffff; font-family: Helvetica, Arial, sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: linear-gradient(183deg, #181623 0%, #191725 52%, #0d0b14 100%);">
        <tr>
            <td style="padding: 4.5rem 1.5rem;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 76.8125rem; margin: 0 auto;">
                    <tr>
                        <td style="padding-bottom: 4.5rem; color: #ddccaa; font-size: 0.75rem; font-weight: 500; text-align: center; text-transform: uppercase;">
                            {{ $brand }}
                        </td>
                    </tr>
                    <tr>
                        <td style="font-size: 1rem; line-height: 1.5rem;">
                            <p style="margin: 0 0 1.5rem;">{{ $greeting }}</p>
                            <p style="margin: 0 0 2rem;">{{ $intro }}</p>
                            <p style="margin: 0 0 2rem;">
                                <a href="{{ $actionUrl }}" style="display: inline-block; border-radius: 0.25rem; background: #e31221; color: #ffffff; padding: 0.4375rem 0.8125rem; text-decoration: none;">{{ $actionText }}</a>
                            </p>
                            <p style="margin: 0 0 1rem;">{{ $fallback }}</p>
                            <p style="margin: 0 0 3rem; color: #ddccaa; word-break: break-all;">{{ $actionUrl }}</p>
                            <p style="margin: 0 0 1.5rem;">{{ $support }}</p>
                            <p style="margin: 0;">{{ $closing }}</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
