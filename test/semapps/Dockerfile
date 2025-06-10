# syntax=docker/dockerfile:1

# Based on: https://docs.docker.com/guides/nodejs/
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

ARG NODE_VERSION=22.16.0

FROM node:${NODE_VERSION}-alpine
RUN mkdir -p /lib-build
ADD . /lib-build
WORKDIR /lib-build

# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.npm to speed up subsequent builds.
# Leverage a bind mounts to package.json and package-lock.json to avoid having to copy them into
# into this layer.
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci

# Run the application as a non-root user.
USER node

# Copy the rest of the source files into the image.
COPY . .

# Give Fuseki plenty of time, 30s, to respond to requests.
RUN NODE_OPTIONS="--network-family-autoselection-attempt-timeout=30000"

# Run the Node script that tests against a SemApps instance running via the
# Docker Compose file in the root directory (../../docker-compose.test.yml).
CMD ["node", "index.js"]
