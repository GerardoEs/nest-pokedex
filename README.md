<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Ejecutr en desarrollo

1.- Clonar el repositorio

2.- Ejecutar el comando
```
yarn install
```

3.-Tener Nest CLI instalado
```
npm i -g @nestjs/cli
```

4.-Levantar la base de datos
```
docker-compose up-d
```

5. cLONAR EL ARCHIVO __env_template__ y renombrar la copia a __env__


6. LLenar las variables de entorno en el entorno __.env__

7. Ejecutar la aplicacion en dev:

```
yarn start:dev
```

8. Reconstruir la Base con seed
```
http://localhost:3000/api/v2/seed
```
## Stack usado
*MongoDB
*Nest
