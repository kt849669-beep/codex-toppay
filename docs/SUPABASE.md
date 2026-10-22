# Database configuration

## Browser client

The active static application imports its database client from `user-app/js/config/supabase.js`. This file contains the project URL and publishable key used by both user and administrator pages.

The client connects directly from the browser. Review database row-level security policies before exposing the application publicly; the publishable key is not an authorization boundary.

## Schema

`toppay-supabase-setup.sql`, `toppay-database.sql` and `database/` contain schema and setup scripts. Review the scripts against the target database before applying them. Some scripts include seed data and are intended for a new database.

## Retained server implementation

The earlier server implementation in `lib/` reads `SUPABASE_URL` and `SUPABASE_ANON_KEY`, with optional administrator fallback settings listed in `.env.example`. These variables do not configure the active static browser client.

Keep local environment files and private credentials out of version control.
