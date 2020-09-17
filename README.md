# ostseee
> OrdnungsSystemToolzurSicherenEchtzeitEvaluation

is the fourth version of the seee, but specialized for online evaluations. It uses the seee3 latex classes.

## Key features

* Safe way to evaluate online Courses
* Invitation based, distribution by third party: Ensure anonymity, while preserving uniqueness
* Evaluate Courses, Seminars, Lecturers and Exercise groups
* Multiple Distribution Plattform support:
    - Primary plattform: *Übungsgruppenverwaltung der Physik* - Automatic push
    -  Moodle integration/LTI support (one click install)
    - randomized Email list via cli
* Easy configurable forms via JSON
    - Different question types (Single/Multiple choice,Comment, etc)
    - Multiple Language support for forms and in survey switch
* Support for public Reports/ censoring
* Advanced CLI commands:
    - Mailing to lecturers
    - Report generation with LaTeX
    - Stats
    - Secure upload to thirdparty for providing results
* In development: Account for evaluators, export to CSV files.


## Running the server in production mode

1. Adjust `db.env.example` and save it as `db.env`
2. Adjust `ostsee.env.example`and save it as `ostsee.env`
    - Change the secrets, passwords as you need.
        +  The LTI_SECRET_KEY has to be negotiated with your LTI-provider (administrator of your moodle instance, for example)
    - If you want to secure the server using JWT tokens, set `JWT_ENABLED=1`, otherwise the admin interface will be unprotected.
    - It is important that you fill in an `ADMIN_USER_ID` and an `ADMIN_USER_PASSWORD`
3. Start the docker containers: `docker-compose up --build`
4. (optional) Build the the client in `client/` using `go build main.go`
5. and add an normal user (here max) using the admin account(note: other users CANNOT create an account): `go run main.go admin users add max Max Mustermann --pw mathematikon --user admin`
6. Remove `ADMIN_USER_ID` in your `ostsee.env` or set it to `""`in order to deactivate super admin access.
7. Restart your docker-compose
8. The container exposes now two pages: `localhost:3081`(admin interface) and `localhost:3082` (client, where the questionaires are answered)

## Documentation

### CommandLine Client

For Documentation on the client checkout its [README](client/README.md)

### Web-Admin Docs

For Documentation on the web-admin interface checkout its 
[README](web-admin/README.md)

## Development
### Generating from "api/evaluation.yml"

Run `openapi-generator` (for  client).

```
openapi-generator generate -i api/evaluation.yml -g typescript-redux-query -o web-common --enable-post-process-file
```

For the client (`web-common`) you have to adjust import paths to import the `index` files, e.g. via grep. You can then develop in `web-admin`or `web` (to be created).

### Running the client in Development mode

You need a proxy in order to run this project. Please use `nginx`, a sample proxy config file is provided in `misc/site-react.conf`, copy it into `sites-enabled` of your `nginx`installation, restart `nginx`. Afterwards you can start the server in server by `go run main.go` and in an extra terminal the `web-admin` interface: 

1. Build web-common by `yarn && yarn build` inside of its directory
2. install dependencies in `web-admin`by `yarn`
3. `yarn start`

Then navigate to `localhost:8081` to run and have fun.
