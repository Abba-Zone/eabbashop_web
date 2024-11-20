# Base image for Java
FROM openjdk:17-jdk-slim

# Set working directory
WORKDIR /app

# Copy build artifact to container
COPY backend/abba/build/libs/*.jar app.jar

# Expose the application port
EXPOSE 8080

# Command to run the application
ENTRYPOINT ["java", "-jar", "app.jar"]