# Database schema

This diagram reflects the Movie Quotes tables implemented through PR 15. Migration files remain the executable source of truth.

```mermaid
erDiagram
    direction LR

    USER ||--o{ MOVIE : owns
    USER ||--o{ QUOTE : authors
    USER ||--o{ COMMENT : writes
    USER ||--o{ LIKE : gives
    USER ||--o{ NOTIFICATION : receives
    USER ||--o{ NOTIFICATION : triggers
    MOVIE ||--o{ GENRE_MOVIE : categorized_by
    GENRE ||--o{ GENRE_MOVIE : classifies
    MOVIE ||--o{ QUOTE : contains
    QUOTE ||--o{ COMMENT : receives
    QUOTE ||--o{ LIKE : receives
    QUOTE ||--o{ NOTIFICATION : targets
    MOVIE ||..o{ MEDIA : stores_poster
    QUOTE ||..o{ MEDIA : stores_image

    USER {
        bigint id PK
        string username UK
        string email UK
        datetime email_verified_at
        string password
        datetime created_at
        datetime updated_at
    }
    MOVIE {
        bigint id PK
        bigint user_id FK
        string name_en
        string name_ka
        string director_en
        string director_ka
        text description_en
        text description_ka
        smallint release_year
        datetime created_at
        datetime updated_at
    }
    GENRE {
        bigint id PK
        string name_en UK
        string name_ka UK
        datetime created_at
        datetime updated_at
    }
    GENRE_MOVIE {
        bigint genre_id PK, FK
        bigint movie_id PK, FK
    }
    QUOTE {
        bigint id PK
        bigint user_id FK
        bigint movie_id FK
        text text_en
        text text_ka
        datetime created_at
        datetime updated_at
    }
    COMMENT {
        bigint id PK
        bigint user_id FK
        bigint quote_id FK
        text body
        datetime created_at
        datetime updated_at
    }
    LIKE {
        bigint id PK
        bigint user_id FK
        bigint quote_id FK
        datetime created_at
        datetime updated_at
    }
    NOTIFICATION {
        uuid id PK
        string type
        string notifiable_type
        bigint notifiable_id FK
        bigint actor_id FK
        bigint quote_id FK
        text data
        datetime read_at
        datetime created_at
        datetime updated_at
    }
    MEDIA {
        bigint id PK
        string model_type
        bigint model_id
        uuid uuid UK
        string collection_name
        string file_name
        string mime_type
        string disk
        bigint size
    }
```

`media.model_type` and `media.model_id` form Media Library's polymorphic association, so they are indexed but are not a database foreign key. A movie owns one item in the named `poster` collection and a quote owns one item in the named `image` collection. Their model lifecycles remove files and media rows on hard deletion.

Deleting a movie explicitly deletes its quote models before the database removes the movie, allowing Media Library to clean every quote image. Deleting a quote cascades its comments, likes, and notifications. Notification recipient, actor, and quote columns have database constraints, so deleting either involved member or the target quote removes the notification. The database permits at most one like for each member/quote pair.
