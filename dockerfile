FROM tiangolo/node-frontend:10 as build-stage
WORKDIR /app
COPY package.json /app/
RUN rm package-lock.json
RUN yarn install
COPY ./ /app/
ENV REACT_APP_API_BASE https://dash.checkomo.com/api
RUN yarn build

FROM nginx
COPY --from=build-stage /app/build/ /usr/share/nginx/html
COPY --from=build-stage /nginx.conf /etc/nginx/conf.d/default.conf