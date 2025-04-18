# Use a base image with the latest version of Rust installed
FROM rust:1.83-slim-bullseye AS builder

# Set the working directory in the container
WORKDIR /app

# Install C/C++ musl toolchain (a lot of crates may need "clang" as well)
RUN apt-get update && apt-get install -y musl-tools

# Install the linux-musl build target
RUN rustup target add x86_64-unknown-linux-musl

# Create a blank project
RUN cargo init

# Copy only the dependencies
COPY Cargo.toml Cargo.lock ./

# Enable static linking for the musl target
ENV RUSTFLAGS="-C target-feature=+crt-static"

# A dummy build to get the dependencies compiled and cached
RUN cargo build --target x86_64-unknown-linux-musl --release

# Copy the real application code into the container
ADD ./src/ /app/src

# Add a dummy line to force Cargo to rebuild the application
RUN echo "// force Cargo cache invalidation" >> src/main.rs

# Build the application
RUN cargo build --target x86_64-unknown-linux-musl --release

# Use a slim image for running the application
FROM alpine AS final

# Copy only the compiled binary from the builder stage to this image
COPY --from=builder /app/target/x86_64-unknown-linux-musl/release/promo-api promo-api

# Expose the port that the application will listen on
EXPOSE 8080

# Copy the environment file into the container
COPY .env .env

# Specify the command to run when the container starts
ENTRYPOINT ["./promo-api"]
