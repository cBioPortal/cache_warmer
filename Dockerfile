FROM ghcr.io/puppeteer/puppeteer:21.5.2
USER pptruser
WORKDIR /home/pptruser
COPY config.js config.js
COPY main.js main.js
CMD ["node", "main.js"]
