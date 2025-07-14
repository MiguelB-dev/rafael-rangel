-- ESQUEMA DE LA BASE DE DATOS PARA EL PROYECTO DEL COMPLEJO EDUCATIVO RAFAEL RANGEL

/*
    ! Se recomienda NO COMPARTIR el presente archivo a terceros o publicarlo en internet, debido a su naturaleza sensible y confidencial.
    
    ! Se ha optado por utilizar claves primarias artificiales para las tablas (ejemplo: id_persona), evitando utilizar números de cédula o identificadores personales como claves primarias, con el fin de proteger la privacidad de los estudiantes, evitar problemas de seguridad o anomalías de datos por cédulas de personas extranjeras, entre otros factores.

    * Se han tomado múltiples medidas de seguridad y buenas prácticas en la presente BBDD (Bases de datos). Sin embargo, en caso de que se detecte algún error, vulnerabilidad o anomalía, se recomienda reportarlo a la administración del C.E. Rafael Rangel, o al departamento de Informática de la UPTT para su corrección/asistencia.
    
*/


-- CREACIÓN DE LA BASE DE DATOS

CREATE DATABASE IF NOT EXISTS rafael_rangel;
USE rafael_rangel;


-- Tabla de Años y Secciones
CREATE TABLE IF NOT EXISTS anio_seccion (
    id_anio_seccion INT PRIMARY KEY AUTO_INCREMENT,
    anio VARCHAR(20) NOT NULL,
    seccion VARCHAR(10) NOT NULL,
    horario VARCHAR(255),
    CONSTRAINT uk_anio_seccion UNIQUE (anio, seccion)
);


-- Tabla de Asignaturas
CREATE TABLE IF NOT EXISTS asignatura (
    id_asignatura INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL
);


-- Tabla de Estudiantes
CREATE TABLE IF NOT EXISTS estudiante (
    id_estudiante INT PRIMARY KEY AUTO_INCREMENT,
    id_anio_seccion INT NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    cedula INT NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    genero ENUM('Masculino', 'Femenino') NOT NULL,
    direccion VARCHAR(255),
    telefono_personal VARCHAR(15),
    telefono_representante VARCHAR(15),
    email VARCHAR(100),
    CONSTRAINT fk_estudiante_anio_seccion FOREIGN KEY (id_anio_seccion) REFERENCES anio_seccion (id_anio_seccion)
);


-- Tabla de Docentes
CREATE TABLE IF NOT EXISTS docente (
    id_docente INT PRIMARY KEY AUTO_INCREMENT,
    contrasena VARCHAR(255) NOT NULL,
    cedula INT NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    genero ENUM('Masculino', 'Femenino') NOT NULL,
    direccion VARCHAR(255),
    telefono_personal VARCHAR(15),
    email VARCHAR(100)
);


-- Tabla de Administradores
CREATE TABLE IF NOT EXISTS administrador (
    id_administrador INT PRIMARY KEY AUTO_INCREMENT,
    contrasena VARCHAR(255) NOT NULL,
    cedula INT NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    genero ENUM('Masculino', 'Femenino') NOT NULL,
    direccion VARCHAR(255),
    telefono_personal VARCHAR(15),
    email VARCHAR(100)
);


-- *Tabla intermedia 'n:m' entre Estudiantes a Asignaturas 
CREATE TABLE IF NOT EXISTS estudiante_asignatura (
    id_estudiante_asignatura INT PRIMARY KEY AUTO_INCREMENT,
    id_estudiante INT NOT NULL,
    id_asignatura INT NOT NULL,
    CONSTRAINT fk_estudiante_asignatura_estudiante FOREIGN KEY (id_estudiante) REFERENCES estudiante (id_estudiante),
    CONSTRAINT fk_estudiante_asignatura_asignatura FOREIGN KEY (id_asignatura) REFERENCES asignatura (id_asignatura),
    CONSTRAINT uk_estudiante_asignatura_unique UNIQUE (id_estudiante, id_asignatura)
);


-- Tabla de Periodos escolares (para almacenar las notas y asistencias en cada lapso)
CREATE TABLE IF NOT EXISTS periodo_escolar (
    id_periodo_escolar INT PRIMARY KEY AUTO_INCREMENT,
    id_estudiante_asignatura INT NOT NULL UNIQUE, -- UNIQUE por la relacion 1:1 con estudiante_asignatura
    ciclo_escolar VARCHAR(9) NOT NULL, -- *Formato de Ejemplo: 2024-2025
    nota_lapso1 DECIMAL(4,2) CHECK (nota_lapso1 BETWEEN 0 AND 20),
    nota_lapso2 DECIMAL(4,2) CHECK (nota_lapso2 BETWEEN 0 AND 20),
    nota_lapso3 DECIMAL(4,2) CHECK (nota_lapso3 BETWEEN 0 AND 20),
    inasistencia_lapso1 INT,
    inasistencia_lapso2 INT,
    inasistencia_lapso3 INT,
    CONSTRAINT fk_periodo_escolar_estudiante_asignatura
    FOREIGN KEY (id_estudiante_asignatura) REFERENCES estudiante_asignatura (id_estudiante_asignatura)
);


-- Tabla de Calendario Escolar
CREATE TABLE IF NOT EXISTS calendario_escolar (
    id_calendario INT PRIMARY KEY AUTO_INCREMENT,
    id_docente INT NULL,
    id_administrador INT NULL,
    titulo_evento VARCHAR(100),
    descripcion_evento TEXT,
    laborable ENUM('Si', 'No') NOT NULL DEFAULT 'Si',
    fecha_evento DATE NOT NULL,
    CONSTRAINT fk_calendario_escolar_docente FOREIGN KEY (id_docente) REFERENCES docente (id_docente) ON DELETE CASCADE,
    CONSTRAINT fk_calendario_administrador FOREIGN KEY (id_administrador) REFERENCES administrador (id_administrador) ON DELETE CASCADE,
    CONSTRAINT chk_calendario_ecolar_un_creador CHECK (
        (id_docente IS NOT NULL AND id_administrador IS NULL) OR
        (id_docente IS NULL AND id_administrador IS NOT NULL)
    ) -- *Se asegura que solo una clave foránea sea nula, es decir, que el evento sea creado por un docente o un administrador, pero no ambos o ninguno
);


-- Tabla de las Publicaciones
CREATE TABLE IF NOT EXISTS publicacion (
    id_publicacion INT PRIMARY KEY AUTO_INCREMENT,
    id_docente INT NULL,
    id_administrador INT NULL,
    titulo_publicacion VARCHAR(100) NOT NULL,
    descripcion_publicacion TEXT NOT NULL,
    fecha_publicacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_publicacion_docente FOREIGN KEY (id_docente) REFERENCES docente (id_docente) ON DELETE CASCADE,
    CONSTRAINT fk_publicacion_administrador FOREIGN KEY (id_administrador) REFERENCES administrador (id_administrador) ON DELETE CASCADE,
    CONSTRAINT chk_publicacion_un_creador CHECK (
        (id_docente IS NOT NULL AND id_administrador IS NULL) OR
        (id_docente IS NULL AND id_administrador IS NOT NULL)
    ) -- *Se asegura que solo una clave foránea sea nula, es decir, que la publicacion sea creada por un docente o un administrador, pero no ambos o ninguno
);


-- Tabla de Archivos Adjuntos de las Publicaciones
CREATE TABLE IF NOT EXISTS archivo_adjunto (
    id_archivo_adjunto INT PRIMARY KEY AUTO_INCREMENT,
    id_publicacion INT NOT NULL,
    tipo ENUM('imagen', 'documento') NOT NULL,
    ruta_archivo VARCHAR(255) NOT NULL,
    nombre_original VARCHAR(100) NOT NULL,
    orden INT DEFAULT 0 COMMENT 'Para ordenar archivos',
    CONSTRAINT fk_archivo_adjunto_publicacion FOREIGN KEY (id_publicacion) REFERENCES publicacion (id_publicacion)
    ON DELETE CASCADE -- *Con esto se eliminan los archivos adjuntos si se elimina la publicación correspondiente (pero solo el registro, el archivo físico debe eliminarse manualmente si es necesario)
);


-- *Tabla para relación ternaria o 'n:m:p' (porque involucra 3 tablas: docente, asignatura y anio_seccion) siendo la relacion de docente a asignatura, y de docente a anio y seccion.
CREATE TABLE IF NOT EXISTS docente_asignatura_anio_seccion (
    id_docente_asignatura_anio_seccion INT PRIMARY KEY AUTO_INCREMENT,
    id_docente INT NOT NULL,
    id_asignatura INT NOT NULL,
    id_anio_seccion INT NOT NULL,
    CONSTRAINT fk_docente_asignatura_docente FOREIGN KEY (id_docente) REFERENCES docente (id_docente),
    CONSTRAINT fk_docente_asignatura_asignatura FOREIGN KEY (id_asignatura) REFERENCES asignatura (id_asignatura),
    CONSTRAINT fk_docente_asignatura_anio_seccion FOREIGN KEY (id_anio_seccion) REFERENCES anio_seccion (id_anio_seccion),
    CONSTRAINT uk_docente_asignatura_anio_seccion_unique UNIQUE (id_docente, id_asignatura, id_anio_seccion)
);