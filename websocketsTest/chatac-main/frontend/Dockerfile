FROM node:19-alpine as builder
WORKDIR /app
COPY . .
ENV REACT_APP_BACKEND_URL myprotocol//myhost/chat
RUN npm ci
RUN npm run build

FROM nginx:latest
COPY --from=builder /app/build /frontend
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]

