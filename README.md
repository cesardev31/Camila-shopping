# Proyecto NodeJS

## Instalación

Para comenzar con este proyecto, sigue los siguientes pasos:

### Configuración del entorno

1. Clona este repositorio a tu máquina local.
2. Dentro del directorio del proyecto, crea un archivo `.env` en la raíz del proyecto.
3. Agrega las siguientes variables de entorno al archivo `.env`, reemplazando `<valor>` con tus valores reales:

    ```
    DB_NAME=<nombre_de_la_base_de_datos>
    DB_USER=<usuario_de_la_base_de_datos>
    DB_PASS=<contraseña_de_la_base_de_datos>
    DB_HOST=<host_de_la_base_de_datos>
    DB_PORT=<puerto_de_la_base_de_datos>
    PORT=<puerto_para_el_servidor_node>
    ```

    Por ejemplo, tu archivo `.env` debería lucir similar a esto (sin incluir los valores reales):

    ```
    DB_NAME=nombreDB
    DB_USER=usuarioDB
    DB_PASS=contraseñaDB
    DB_HOST=localhost
    DB_PORT=5432
    PORT=3201
    ```

### Instalación de dependencias

Para instalar las dependencias, puedes usar npm o pnpm. Aquí tienes cómo hacerlo con ambos gestores de paquetes:

- Con npm:

    ```bash
    npm install
    ```

- Con pnpm:

    ```bash
    pnpm install
    ```

### Desarrollo y producción

Para arrancar el servidor en modo de desarrollo:

- Con npm:

    ```bash
    npm run dev
    ```

- Con pnpm:

    ```bash
    pnpm run dev
    ```

Para arrancar el servidor en modo de producción:

- Con npm:

    ```bash
    npm run start
    ```

- Con pnpm:

    ```bash
    pnpm run start
    ```

## Docker Compose

Para montar el servidor utilizando Docker Compose, asegúrate de tener Docker y Docker Compose instalados en tu máquina. Luego, sigue estos pasos:

1. Crea un archivo `docker-compose.yml` en la raíz del proyecto.
2. Asegúrate de que las variables de entorno en `docker-compose.yml` coincidan con las del archivo `.env`. Aquí tienes un ejemplo de cómo configurar tu servicio en `docker-compose.yml`:

    ```yaml
    version: '3'
    services:
      app:
        build: .
        ports:
          - "3201:3201"
        environment:
          DB_NAME: nombreDB
          DB_USER: usuarioDB
          DB_PASS: contraseñaDB
          DB_HOST: db
          DB_PORT: 5432
          PORT: 3201
        depends_on:
          - db
      db:
        image: postgres
        restart: always
        environment:
          POSTGRES_DB: nombreDB
          POSTGRES_USER: usuarioDB
          POSTGRES_PASSWORD: contraseñaDB
        ports:
          - "5432:5432"
    ```

3. Para iniciar tu aplicación y la base de datos, ejecuta:

    ```bash
    docker-compose up --build
    ```

## Documentación de la API

La documentación de la API está disponible en Swagger. Puedes acceder a ella navegando a `http://localhost:3201/api-docs/` en tu servidor local una vez que la aplicación esté en ejecución.
