# ostseee
OrdnungsSystemToolzurSicherenEchtzeitEvaluation

## Generating from "api/evaluation.yml"

Run `openapi-generator`twice (once for server and client each).

```
openapi-generator generate -i api/evaluation.yml -g go-gin-server -o server
openapi-generator generate -i api/evaluation.yml -g typescript-redux-query -o web-common --enable-post-process-file
```

For the client (`web-common`) you have to adjust import paths to import the `index` files, e.g. via grep. You can then develop in `web-admin`or `web` (to be created).‚