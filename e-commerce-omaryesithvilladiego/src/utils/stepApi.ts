export const STEP_API = `<div>
<h1>Guía de Uso - NestJS API E-commerce FST53</h1>
<h2>Paso 1: Agregar categorías</h2>
<p>Ejecuta el siguiente endpoint para agregar las categorías de los productos:</p>
<code>GET /categories/seeder</code>
<h2>Paso 2: Agregar productos</h2>
<p>Ejecuta el siguiente endpoint para agregar los productos:</p>
<code>GET /products/seeder</code>
<h2>Paso 3: Registrar un usuario</h2>
<p>Para realizar compras, primero debes registrar un usuario:</p>
<code>POST /auths/signup</code>
<h2>Paso 4: Iniciar sesión</h2>
<p>Inicia sesión con el usuario registrado para obtener el token:</p>
<code>POST /auths/signin</code>
<h2>Paso 5: Realizar una compra</h2>
<p>Para hacer una compra, usa el siguiente endpoint:</p>
<code>POST /orders</code>
<h2>Paso 6: Obtener la compra</h2>
<p>Para obtener detalles de una compra específica, utiliza:</p>
<code>GET /orders/{id}</code>
<h2>Paso 7: Usar rutas protegidas</h2>
<p>Después de iniciar sesión, usa el token recibido en el botón de autenticación para acceder a las rutas protegidas:</p>
<p>Pon el token en el encabezado de autorización.</p>
</div>
`