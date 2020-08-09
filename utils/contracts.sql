DROP DATABASE IF EXISTS contracts;

CREATE DATABASE contracts;

\c contracts;

CREATE TABLE applicants (
    id SERIAL PRIMARY KEY,
    applicant VARCHAR NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP
);

CREATE TABLE sexes (
    id SERIAL PRIMARY KEY,
    sex VARCHAR(10) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP
);

CREATE TABLE persons (
    id SERIAL PRIMARY KEY,
    surname VARCHAR(20) NOT NULL,
    name VARCHAR(50) NOT NULL,
    dni VARCHAR(8) NOT NULL,
    domicile VARCHAR(100),
    mail VARCHAR(50),
    telephone VARCHAR(20),
    date_birth DATE,
    cuit VARCHAR(11) NOT NULL,
    sex_id INTEGER NOT NULL REFERENCES sexes(id),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP
);

CREATE TABLE objects (
    id SERIAL PRIMARY KEY,
    object VARCHAR(50) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP
);

CREATE TABLE states (
    id SERIAL PRIMARY KEY,
    state VARCHAR(20) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP
);

CREATE TABLE contracts(
    id SERIAL PRIMARY KEY,
    date_from DATE NOT NULL,
    date_until DATE NOT NULL,
    date_order DATE,
    number_order VARCHAR(8),
    -- Nro Disposicion
    reason TEXT,
    attached VARCHAR(50),
    --PDF
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP,
    state_id INTEGER NOT NULL REFERENCES states(id),
    applicant_id INTEGER NOT NULL,
    object_id INTEGER NOT NULL,
    person_id INTEGER NOT NULL
);

INSERT INTO states(state)
VALUES ('Activo'),
    ('Reservado'),
    ('Baja');

INSERT INTO objects(object)
VALUES ('Dictado Clases de Grado');

INSERT INTO sexes(sex)
VALUES ('Femenino'),
    ('Masculino'),
    ('No Declara');

INSERT INTO applicants(applicant)
VALUES ('Sec.Extensión'),
    ('Sec.Académica'),
    ('Sec.Administrativa'),
    ('Sec.Posgrado');


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(20) NOT NULL,
    password VARCHAR(60) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP
);

CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(20) NOT NULL,
    slug VARCHAR(20) NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP
);

CREATE TABLE users_roles (
    user_id INTEGER NULL REFERENCES users(id) ON DELETE CASCADE,
    role_id INTEGER NULL REFERENCES roles(id) ON DELETE CASCADE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP
);

CREATE TABLE permissions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    slug VARCHAR(30) NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP
);

CREATE TABLE roles_permissions (
    role_id INTEGER NULL REFERENCES roles(id) ON DELETE CASCADE,
    permission_id INTEGER NULL REFERENCES permissions(id) ON DELETE CASCADE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP
);


INSERT INTO permissions(name, slug, description)
VALUES 
    ('Crear solicitante', 'create.applicant', 'Crear solicitantes'),
    ('Editar solicitante', 'edit.applicant', 'Editar solicitantes'),
    ('Ver solicitantes', 'index.applicant', 'Ver solicitantes'),
    ('Ver solicitante', 'show.applicant', 'Ver solicitante'),
    ('Eliminar solicitantes', 'destroy.applicant', 'Eliminar solicitantes'),

    ('Crear sexo', 'create.sex', 'Crear sexos'),
    ('Editar sexo', 'edit.sex', 'Editar sexos'),
    ('Ver sexos', 'index.sex', 'Ver sexos'),
    ('Ver sexo', 'show.sex', 'Ver sexo'),
    ('Eliminar sexos', 'destroy.sex', 'Eliminar sexos'),

    ('Crear persona', 'create.person', 'Crear personas'),
    ('Editar persona', 'edit.person', 'Editar personas'),
    ('Ver personas', 'index.person', 'Ver personas'),
    ('Ver persona', 'show.person', 'Ver persona'),
    ('Eliminar personas', 'destroy.person', 'Eliminar personas'),

    ('Crear objecto', 'create.object', 'Crear objectos'),
    ('Editar objecto', 'edit.object', 'Editar objectos'),
    ('Ver objectos', 'index.object', 'Ver objectos'),
    ('Ver objecto', 'show.object', 'Ver objecto'),
    ('Eliminar objectos', 'destroy.object', 'Eliminar objectos'),

    ('Crear estados', 'create.state', 'Crear estadoss'),
    ('Editar estados', 'edit.state', 'Editar estadoss'),
    ('Ver estadoss', 'index.state', 'Ver estadoss'),
    ('Ver estado', 'show.state', 'Ver estado'),
    ('Eliminar estadoss', 'destroy.state', 'Eliminar estadoss'),

    ('Crear contratos', 'create.contract', 'Crear contratos'),
    ('Editar contratos', 'edit.contract', 'Editar contratos'),
    ('Ver contratos', 'index.contract', 'Ver contratos'),
    ('Ver contrato', 'show.contract', 'Ver contrato'),
    ('Eliminar contratos', 'destroy.contract', 'Eliminar contratos'),

    ('Crear usuarios', 'create.user', 'Crear usuarios'),
    ('Editar usuarios', 'edit.user', 'Editar usuarios'),
    ('Ver usuarios', 'index.user', 'Ver usuarios'),
    ('Ver usuario', 'show.user', 'Ver usuario'),
    ('Eliminar usuarios', 'destroy.user', 'Eliminar usuarios'),

    ('Crear roles', 'create.role', 'Crear roles'),
    ('Editar roles', 'edit.role', 'Editar roles'),
    ('Ver roles', 'index.role', 'Ver roles'),
    ('Ver rol', 'show.role', 'Ver rol'),
    ('Eliminar roles', 'destroy.role', 'Eliminar roles')
    ;