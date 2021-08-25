FROM node:10  as build

WORKDIR /html

COPY . .

RUN npm install && npm run build


FROM nginx:1.21.5

COPY --from=build /html/index.html  /usr/share/nginx/html
COPY --from=build /html/dist  /usr/share/nginx/html/dist
COPY --from=build /html/src/static  /usr/share/nginx/html/src/static
COPY --from=build /html/src/assets  /usr/share/nginx/html/src/assets
