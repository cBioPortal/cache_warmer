## Create the following config.js file and set the loginUrl:

```
global.config = {
    loginUrl : "xxxxxxx",
    urls : [
        {
            "url": "https://cbioportal.mskcc.org/study/summary?id=mskimpact"
        }
    ]
}
```

## Run the following command:

```
docker run -i --init --cap-add=SYS_ADMIN --rm ghcr.io/puppeteer/puppeteer:latest node -e "$(cat ./config.js); $(cat ./main.js)"
```