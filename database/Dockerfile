FROM postgres:16.0

WORKDIR /database

ENV POSTGRES_USER postgres

ENV POSTGRES_PASSWORD postgres

ENV POSTGRES_DB dishesdb

COPY dishes.csv /data

COPY setup.sql /docker-entrypoint-initdb.d/

EXPOSE 5432

