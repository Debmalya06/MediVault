FROM openjdk:21-jdk-alpine
VOLUME /tmp
WORKDIR /app
COPY target/AiMedical-*.jar app.jar
EXPOSE 8081
ENTRYPOINT ["java", "-jar", "app.jar"]