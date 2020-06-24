
DROP DATABASE IF EXISTS contracts;
CREATE DATABASE contracts;
\c contracts
CREATE TABLE applicants (
    id SERIAL PRIMARY KEY,
    applicant VARCHAR NOT NULL
);

CREATE TABLE sexes (
    id SERIAL PRIMARY KEY,
    sex VARCHAR(10) NOT NULL
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
    sex_id INTEGER NOT NULL REFERENCES sexes(id)
);

CREATE TABLE objects (
    id SERIAL PRIMARY KEY,
    object VARCHAR(50) NOT NULL
);

CREATE TABLE states (
    id SERIAL PRIMARY KEY,
    state VARCHAR(20) NOT NULL
);

CREATE TABLE contracts(
    id SERIAL PRIMARY KEY,
    date_from TIMESTAMP NOT NULL,
    date_until TIMESTAMP NOT NULL,
    number_order VARCHAR(8), -- Nro Disposicion
    reason TEXT,
    attached VARCHAR(50), --PDF
    created_at DATE,
    updated_at DATE,
    state_id INTEGER NOT NULL REFERENCES states(id),
    applicant_id INTEGER NOT NULL,
    object_id INTEGER NOT NULL,
    person_id INTEGER NOT NULL
);

COPY states (state) FROM stdin;
Activo
Reservado
Baja
\.

COPY objects (object) FROM stdin;
Dictado Clases de Grado
\.

COPY sexes (sex) FROM stdin;
Femenino
Masculino
No Declara
\.

COPY applicants (applicant) FROM stdin;
Sec. Extensión
Sec. Académica
Sec. Administrativa
Sec. Posgrado
\\.