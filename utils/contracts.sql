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