# Stage 1
FROM node:17.5.0 as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod
# Stage 2
FROM nginx:alpine
COPY --from=node /app/dist/shift-workfrontend /usr/share/nginx/html