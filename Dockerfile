# Compiler container
FROM node:lts-alpine as builder
WORKDIR /app/
COPY package.json /app/
RUN npm install --only=production

# App container
FROM node:lts-alpine
ENV NODE_ENV production
WORKDIR /app
COPY --from=builder /app/node_modules /app/node_modules
COPY src /app/src
COPY package.json /app/
EXPOSE 3000
CMD ["npm", "start"]