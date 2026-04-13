# Build stage
FROM node:20-alpine AS build-stage

WORKDIR /app

# Install build dependencies
COPY package*.json ./
RUN npm install

# Copy source
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:stable-alpine

# Copy build output from build stage
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY ha-addon/nginx.conf /etc/nginx/conf.d/default.conf

# Start script
COPY ha-addon/run.sh /run.sh
RUN chmod a+x /run.sh

CMD [ "/run.sh" ]
