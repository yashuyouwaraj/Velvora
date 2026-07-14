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

# Build the application (skip tests and test compilation to avoid test failures during image build)
# `-Dmaven.test.skip=true` disables test compilation and execution
RUN ./mvnw -DskipTests -Dmaven.test.skip=true clean package

# Use the built artifact
EXPOSE 5454

CMD ["sh", "-c", "java -jar target/*.jar"]
