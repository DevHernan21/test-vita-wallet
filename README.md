# test-vita-wallet

Este proyecto es una aplicación de billetera virtual que permite a los usuarios iniciar sesión y manejar sus datos financieros.

## Instrucciones de instalación y ejecución

1. Clona el repositorio en tu máquina local utilizando `git clone`.
2. Navega hasta el directorio del proyecto.
3. Instala las dependencias del proyecto con `npm install`.
4. Inicia la aplicación con `npm start`. La aplicación ahora debería estar corriendo en `localhost:3000`.

## Uso de Contextos

Este proyecto utiliza dos contextos de React para manejar el estado global de la aplicación:

- `AuthContext`: Este contexto se encarga de la autenticación del usuario. Mantiene el estado del usuario actual y proporciona funciones para iniciar y cerrar sesión.
- `DataContext`: Este contexto se encarga de manejar los datos de la aplicación. Imita el comportamiento funcional real de una billetera virtual, permitiendo a los usuarios ver y actualizar sus datos financieros.

## Arquitectura del Proyecto

El proyecto sigue una arquitectura modular para permitir una mayor escalabilidad. Los componentes de React se organizan en carpetas por funcionalidad, lo que facilita la adición de nuevas características a la aplicación.

Los contextos `AuthContext` y `DataContext` se utilizan para manejar el estado global de la aplicación, lo que permite un fácil acceso a los datos del usuario y a la información de la billetera virtual en cualquier parte de la aplicación.

## Ampliación de la Aplicación

Gracias a la arquitectura modular y al uso de contextos para el manejo del estado, la aplicación puede ser fácilmente ampliada con nuevas características. Por ejemplo, se podrían añadir nuevas funcionalidades a la billetera virtual, como la capacidad de realizar pagos o transferencias a otros usuarios.

Además, el `DataContext` podría ser ampliado para manejar más tipos de datos, y se podrían añadir más contextos si se necesitan manejar otros aspectos del estado global de la aplicación.

## Colaboración con Endpoints

Este proyecto ha logrado consumir todos los endpoints con el seteo automático de los headers requeridos mediante el contexto. Aquí están los endpoints:

1. `https://api.qa.vitawallet.io/api/auth/sign_in`: Para realizar inicio de sesión y obtener información de la cuenta y headers de sesión, las cuales encontrará en las cabeceras de respuesta.
2. `https://api.qa.vitawallet.io/api/profile`: Para obtener balance actualizado e información actualizada del usuario.
3. `https://api.qa.vitawallet.io/api/users/get_crypto_multi_prices`: Para obtener precios actualizados del usuario, tomar en consideración que debe ser llamado periódicamente y/o previo a realizar un intercambio.
4. `https://api.qa.vitawallet.io/api/transactions`: Para listar las transacciones realizadas por el usuario, diferencias por categorías y estados de las mismas.
5. `https://api.qa.vitawallet.io/api/transactions/exchange`: Para realizar y ejecutar transacciones de intercambio.

## Headers requeridos para el uso de los endpoints:
- `app-name`: Nombre de la aplicación. Ejemplo: 'ANGIE'
- `access-token`: Token de acceso. Ejemplo: 'x_uLoN1ZpGDQevRJ3H-nvg'
- `uid`: Identificador de usuario. Ejemplo: 'prospecto@vitawallet.io'
- `expiry`: Fecha de expiración del token. Ejemplo: '1708369100'
- `client`: Identificador del cliente. Ejemplo: 'TZyhBEBkunW6Y9xOmeBmMA'

## Objetivo Principal de la Aplicación

El objetivo principal de esta aplicación es imitar el comportamiento de una billetera virtual. Los usuarios pueden interactuar con las billeteras cargadas con diferentes componentes, como las transferencias, para modificar los datos del contexto. 

Esto permite a los usuarios ver su información financiera actualizada en tiempo real. Por ejemplo, después de realizar una transferencia, los usuarios pueden ver el descuento en su billetera y la transacción en su historial de transacciones en la página de inicio.

Esta funcionalidad proporciona a los usuarios una experiencia de usuario fluida y coherente, similar a la de una billetera virtual real. Los usuarios pueden gestionar sus finanzas y realizar transacciones con facilidad, todo en un solo lugar.

## Limitaciones y Trabajo Pendiente

A pesar de los avances y funcionalidades desarrolladas, hay ciertos aspectos que no se pudieron completar:

- **Intercambios**: No se pudo desarrollar y maquetar la página de intercambios de criptomonedas.
- **Perfil**: No se pudo desarrollar y maquetar la página de perfil del usuario.

Estos aspectos representan oportunidades para futuras mejoras y expansiones del proyecto.
