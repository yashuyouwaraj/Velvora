FROM eclipse-temurin:22-jdk

WORKDIR /app

# Copy maven wrapper and pom first for dependency caching
COPY mvnw mvnw
COPY .mvn .mvn
COPY pom.xml pom.xml

# Ensure mvnw is executable
RUN chmod +x mvnw

# Copy the source
COPY src src

# Build the application (skip tests to speed up builds; adjust as needed)
RUN ./mvnw -DskipTests clean package

# Use the built artifact
EXPOSE 5454

CMD ["sh", "-c", "java -jar target/*.jar"]
