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
            <td style="padding: 72px 24px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 1229px; margin: 0 auto;">
                    <tr>
                        <td style="padding-bottom: 72px; color: #ddccaa; font-size: 12px; font-weight: 500; text-align: center; text-transform: uppercase;">
                            {{ $brand }}
                        </td>
                    </tr>
                    <tr>
                        <td style="font-size: 16px; line-height: 24px;">
                            <p style="margin: 0 0 24px;">{{ $greeting }}</p>
                            <p style="margin: 0 0 32px;">{{ $intro }}</p>
                            <p style="margin: 0 0 32px;">
                                <a href="{{ $actionUrl }}" style="display: inline-block; border-radius: 4px; background: #e31221; color: #ffffff; padding: 7px 13px; text-decoration: none;">{{ $actionText }}</a>
                            </p>
                            <p style="margin: 0 0 16px;">{{ $fallback }}</p>
                            <p style="margin: 0 0 48px; color: #ddccaa; word-break: break-all;">{{ $actionUrl }}</p>
                            <p style="margin: 0 0 24px;">{{ $support }}</p>
                            <p style="margin: 0;">{{ $closing }}</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
