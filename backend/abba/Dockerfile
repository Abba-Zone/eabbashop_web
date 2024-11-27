# Base image for Java
FROM openjdk:17-jdk-slim

# Set working directory
WORKDIR /app

# Copy Gradle wrapper and project files
COPY . .

# Grant execution permission for Gradle wrapper
RUN chmod +x gradlew

# Build the application
RUN ./gradlew clean build -x test

# Copy the built artifact to the container
COPY build/libs/*.jar app.jar

# Expose the application port
EXPOSE 8080

# Command to run the application
ENTRYPOINT ["java", "-jar", "app.jar"]