# Base image for Java
FROM openjdk:17-jdk-slim

# Install required tools (MySQL client and ping)
RUN apt-get update && apt-get install -y default-mysql-client iputils-ping && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy Gradle wrapper and project files
COPY . .

# Grant execution permission for Gradle wrapper
RUN chmod +x gradlew

# Build the application
RUN ./gradlew clean build -x test

RUN ls

# Copy the built artifact to the container
COPY build/libs/*SNAPSHOT.jar app.jar

# Expose the application port
EXPOSE 8080

# Command to run the application
# ENTRYPOINT ["java", "-jar", "app.jar"]
CMD sh -c " \
    echo 'Checking MySQL connection...' && \
        mysql -habba-mysql -P3306 -uchcadmin -pabbazone!@@ -e 'show databases;' && \
        echo 'Checking Redis connection...' && \
        ping -c 3 abba-redis && \
        echo 'Starting Java application...' && \
        java -jar app.jar"