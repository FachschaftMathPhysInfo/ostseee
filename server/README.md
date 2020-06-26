# server

## enviroment variables.

There are no default values yet!

| Variable | Description | Example |
| -------- | ----------- | ------- |
| JWT_SECRET_KEY | Used for JWT tokens | awfJLWiAFIJWALF |
| JWT_ENABLED | Used to determine whether JWT tokens are required | 0 or 1|
| ADMIN_USER_ID | The login id of the admin user | admin |
| ADMIN_USER_PASSWORD | The login password of the admin user | admin |
| DB_CONNECTION_TYPE | Sets the dialect of the connection (e.g. postgres or sqlite3) | sqlite3 |
| DB_CONNECTION_STRING | Connection string, depends on DB_CONNECTION_TYPE | test3.sqlite |
| MIGRATE_DB | If MIGRATE_DB=1 then the db will be automigrated | 0 or 1 |
| DB_LOG | If DB_LOG=1 then the log will be verbose | 0 or 1 |
| LTI_SECRET_KEY | Needed to validate LTI Request. Keep it in a safe place | secretKey |