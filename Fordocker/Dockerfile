#FROM frolvlad/alpine-oraclejdk8:slim
#VOLUME /tmp
#ADD snake-0.1.0.jar app.jar
#RUN sh -c 'touch /app.jar'
#ENV JAVA_OPTS=""
#ENTRYPOINT [ "sh", "-c", "java $JAVA_OPTS -Djava.security.egd=file:/dev/./urandom -jar /app.jar" ]
FROM java:8
COPY snake-0.1.0.jar /apps/tai_app/
WORKDIR /apps/tai_app
EXPOSE 8080
CMD ["java", "-jar", "snake-0.1.0.jar"]