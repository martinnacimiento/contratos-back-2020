# CONTRATOS - BACKEND 📝
Bienvenido a este proyecto de contratos que estoy realizando para la cátedra de Diseño y Aplicaciones en la Web.

## Versiones 🌀
El proyecto va a contar con 2 versiones:
- V1.0: Solamente CRUDs de los recursos del proyecto.
- V2.0: Se agrega seguridad (autenticación y autorización) mediante tokens JWT.
- v2.1: Se corrige la posibilidad de auto-eliminarse como usuario.

## Requisitos ✋
- Node.js
  
## Empezar 🚀
1. Clone el repositorio.
2. Seleccione la version que desee probar con `git checkout Vn.m` donde `n` y `m` serán las versiones que desea probar.
3. Instale las dependencias necesarias con `npm install`.
4. Debe configurar las variables de entorno del proyecto, para esto puede hacerlo con un archivo `.env`, puede crearlo con el siguiente comando `cp .env.example .env`, lo que va a hacer el comando es copiar el archivo de ejemplo con el nombre `.env`, en este archivo debe proporcionar los valores necesarios para las variables con prefijo `DB`, de manera que el proyecto pueda conectarse a una base de datos.
5. Debe crear la base de datos y todo su esquema, para esto en se le proporciona un script sql `utils/contracts.sql` para que pueda hacer esto de forma rápida con el comando `psql -U postgres < contracts.sql`, tenga en cuenta que de ser necesario debe ingresar las credenciales a su base de datos, o un nombre de usuario diferente.
6. Para ejecutar el proyecto debe ejecutar `npm run dev`.