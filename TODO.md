# TODO del proyecto del C.E Rafael Rangel


## Frontend

* **General:** Corregir la barra de navegacion
 
* **Sobre el index.html:**
  * Hacer funcionar los botones
  * Corregir los desbordamientos con fit-content o similar
  * Hacer responsivo TODO el diseno
  * Lograr quitar el sticky del aside con la historia del liceo
  
  **Nota:** Creo que para evitar problemas de desbordamiento o responsividad, lo mejor es limitarse a remplazar estilos en los @media queries
* **Sobre el subjects-professors y academic-summary:**
  * Deberia meter una parte que diga el nombre y el resto de los datos del estudiante que esta viendo estas secciones


### Paleta de Colores:

* **Principal:** #1d7bc4


## Backend

**Nada pendiente.**


## BBDD

* Hacer las correciones del profesor
  
* Investigar sobre si tengo que meterle un campo para las contraseñas, ya que pues se supone que los usuarios deben iniciar sesión. Aunque supongo que para eso directamente se mete una tabla **usuario** que almacene la contrasena, nombre de usuario, quizas preguntas para recuperar contrasena, etc.

* Revisar si puedo optimizar un poco la BBDD, como por ejemplo, reduciendo el numero de caracteres de los **VARCHAR(100)**

* Investigar si 'administrador' deberia tener algun campo o algo, para asignar el rol de profesor/administrador.

* Averiguar si la tabla 'periodo_escolar' se relacion con 'docente'.

* Deberia probar la BBDD haber que tal, con datos de prueba.