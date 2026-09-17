# Product specification

Status: Draft, with Redberry assignment requirements treated as authoritative.

## Product promise

Movie Quotes lets a visitor register and activate an account, then browse a Facebook-style stream of movie quotes. Its public landing page harmoniously combines cinematic stills and quote text, inspired by [Must Awards 2016](https://mustapp.com/2016).

The application is available in English and Georgian.

## 1. Landing

- Present the cinematic multi-section landing design from Figma.
- Provide registration and login navigation.
- Provide English/Georgian locale switching and preserve the selected locale.

## 2. Registration and account activation

The registration form contains:

- username: required, 3–15 characters, lowercase Latin letters and digits only;
- email: required and valid email format;
- password: required, 8–15 characters, lowercase Latin letters and digits only;
- password confirmation: required and equal to password.

Invalid controls receive the Figma error visual and a localized field-level message. A valid submission creates a pending account, sends an activation link, and redirects to the check-email screen. From that screen, the same guest registration session can request another rate-limited activation email without signing in or supplying an address. Following a valid link activates the account and displays the account-activated screen.

Registration/authentication with Google is mandatory.

## 3. Login and password recovery

Login accepts either username + password or email + password. The identity value is required with at least three characters; password is required. Login links to registration and password recovery.

Password recovery:

1. accepts a required, valid email belonging to a system user;
2. redirects to a check-email confirmation after a valid request;
3. sends a reset link;
4. opens a new-password form containing required password (8–15 lowercase Latin letters/digits) and matching confirmation;
5. shows field errors on invalid input;
6. updates the password and redirects to a success screen;
7. handles expired/invalid links with the designed state.

## 4. Protected application shell

Successful authentication opens the news feed. Desktop uses header + sidebar; mobile uses the compact header + side menu. Navigation exposes feed, personal movies, profile, notifications, locale, and logout.

Unauthenticated access to a protected route renders the designed 403 page. An unknown route renders the designed 404 page.

## 5. News feed and search

- Display all users' quote posts in newest-first order.
- Each post displays author, movie, year, image, like count, comment count, comments, and comment input.
- A member can like and comment on each quote.
- Load older posts progressively while scrolling, Facebook-style.
- Search behavior:
    - plain text performs general search;
    - @query searches only movie names;
    - #query searches only quote text.

## 6. Profile

- Display username and email.
- Upload or replace the default avatar.
- Change password for password-based accounts.
- Change email only after the new address is activated through an emailed link.
- For Google-authenticated accounts, email is read-only and the password field is hidden.

## 7. Personal movies

- Show only movies added by the authenticated member.
- Each card shows name, release year, poster, and number of quotes.
- Movie details show name, poster, year, genres, description, director, and the movie's quote list.
- The owner can edit all movie information and delete the movie.
- The owner can start quote creation from the movie details page and navigate from the list to a quote.

The create/edit design contains English and Georgian name, director, and description fields, genres, release year, and poster upload. Exact validation beyond visible language intent remains to be confirmed.

## 8. Quotes

### Create from feed

- Open a modal from “write new quote”.
- Georgian quote: required and Georgian-script content only.
- English quote: required and English-script content only.
- Provide image upload with drag-and-drop.
- Select a movie only from the authenticated member's movies.

### Create from movie

Use the same fields, but preselect the current movie and prevent changing it.

### View and manage

- Show movie context, quote still/image, both translations, likes, and comments.
- Allow likes and new comments.
- Only the quote creator can edit or delete the quote.

## 9. Real-time notifications

- Show a header notification control and unread count.
- Deliver notifications in real time when another member likes or comments on the recipient's quote.
- Show actor, action, target, relative time, read/unread state, and “mark all as read”.

Self-notification and exact mark-one-read behavior remain to be confirmed.

## 10. Cross-cutting acceptance

- Match the supplied desktop and mobile Figma designs responsively.
- Localize UI, validation, mail, and status/error content in English and Georgian.
- Validate and authorize on the server, including ownership and upload rules.
- Use stable pagination for progressive lists and avoid duplicate results and N+1 queries.
- Store uploads through Media Library and remove or replace media consistently.
- Provide an English README, database relationship diagram, semantic Git history, automated CI/CD, server deployment, and Swagger/OpenAPI for JSON API routes.

## Explicitly outside current evidence

No admin dashboard, moderation/reporting, third-party movie catalog import, following, direct messaging, ratings, or video upload is required unless the user adds it.
