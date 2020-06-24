--
-- PostgreSQL database dump
--

-- Dumped from database version 11.7 (Ubuntu 11.7-2.pgdg18.04+1)
-- Dumped by pg_dump version 12.2 (Ubuntu 12.2-2.pgdg18.04+1)

-- Started on 2020-06-15 09:56:22 -03

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

--
-- TOC entry 201 (class 1259 OID 39614)
-- Name: contratos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.contratos (
    nro_contrato integer NOT NULL,
    fecha_desde date,
    fecha_hasta date,
    fecha_disp date,
    nro_dispo character varying(8),
    id_estado character(1) NOT NULL,
    resumen text,
    nombre_archivo character varying(50),
    fecha_carga date,
    anexo character varying(2),
    id_solicitante integer NOT NULL,
    contrato character varying(10),
    objeto integer NOT NULL,
    id_pers integer NOT NULL
);


ALTER TABLE public.contratos OWNER TO postgres;

--
-- TOC entry 200 (class 1259 OID 39606)
-- Name: estados; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.estados (
    id_estado character(1) NOT NULL,
    estado character varying
);


ALTER TABLE public.estados OWNER TO postgres;

--
-- TOC entry 197 (class 1259 OID 39588)
-- Name: objeto; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.objeto (
    objeto integer NOT NULL,
    desc_objeto character varying NOT NULL
);


ALTER TABLE public.objeto OWNER TO postgres;

--
-- TOC entry 199 (class 1259 OID 39601)
-- Name: personas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.personas (
    id_pers integer NOT NULL,
    apellido character varying(20) NOT NULL,
    nombre character varying(50) NOT NULL,
    nro_doc character varying(10) NOT NULL,
    domicilio character varying(100),
    mail character varying(50),
    telefono character varying(20),
    fecha_nac date,
    sexo character varying(1) NOT NULL,
    cuit character varying(11) NOT NULL
);


ALTER TABLE public.personas OWNER TO postgres;

--
-- TOC entry 198 (class 1259 OID 39596)
-- Name: sexo; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sexo (
    sexo character varying(1) NOT NULL,
    descsexo character varying(10) NOT NULL
);


ALTER TABLE public.sexo OWNER TO postgres;

--
-- TOC entry 196 (class 1259 OID 39580)
-- Name: solicitantes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.solicitantes (
    id_solicitante integer NOT NULL,
    solicitante character varying NOT NULL
);


ALTER TABLE public.solicitantes OWNER TO postgres;

--
-- TOC entry 3006 (class 0 OID 39614)
-- Dependencies: 201
-- Data for Name: contratos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.contratos (nro_contrato, fecha_desde, fecha_hasta, fecha_disp, nro_dispo, id_estado, resumen, nombre_archivo, fecha_carga, anexo, id_solicitante, contrato, objeto, id_pers) FROM stdin;
\.


--
-- TOC entry 3005 (class 0 OID 39606)
-- Dependencies: 200
-- Data for Name: estados; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.estados (id_estado, estado) FROM stdin;
A	Activo
R	Reservado
B	Baja
\.


--
-- TOC entry 3002 (class 0 OID 39588)
-- Dependencies: 197
-- Data for Name: objeto; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.objeto (objeto, desc_objeto) FROM stdin;
1	Dictado Clases de Grado
\.


--
-- TOC entry 3004 (class 0 OID 39601)
-- Dependencies: 199
-- Data for Name: personas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.personas (id_pers, apellido, nombre, nro_doc, domicilio, mail, telefono, fecha_nac, sexo, cuit) FROM stdin;
\.


--
-- TOC entry 3003 (class 0 OID 39596)
-- Dependencies: 198
-- Data for Name: sexo; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sexo (sexo, descsexo) FROM stdin;
1	Femenino
2	Masculino
3	No Declara
\.


--
-- TOC entry 3001 (class 0 OID 39580)
-- Dependencies: 196
-- Data for Name: solicitantes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.solicitantes (id_solicitante, solicitante) FROM stdin;
1	Sec. Extensión
2	Sec. Académica
3	Sec. Administrativa
4	Sec. Posgrado
\.


--
-- TOC entry 2874 (class 2606 OID 39621)
-- Name: contratos contratos_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contratos
    ADD CONSTRAINT contratos_pk PRIMARY KEY (nro_contrato);


--
-- TOC entry 2872 (class 2606 OID 39613)
-- Name: estados estados_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estados
    ADD CONSTRAINT estados_pk PRIMARY KEY (id_estado);


--
-- TOC entry 2866 (class 2606 OID 39595)
-- Name: objeto objeto_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.objeto
    ADD CONSTRAINT objeto_pk PRIMARY KEY (objeto);


--
-- TOC entry 2870 (class 2606 OID 39605)
-- Name: personas personas_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.personas
    ADD CONSTRAINT personas_pk PRIMARY KEY (id_pers);


--
-- TOC entry 2868 (class 2606 OID 39600)
-- Name: sexo sexo_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sexo
    ADD CONSTRAINT sexo_pk PRIMARY KEY (sexo);


--
-- TOC entry 2864 (class 2606 OID 39587)
-- Name: solicitantes solicitantes_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.solicitantes
    ADD CONSTRAINT solicitantes_pk PRIMARY KEY (id_solicitante);


--
-- TOC entry 2879 (class 2606 OID 39642)
-- Name: contratos estados_contratos_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contratos
    ADD CONSTRAINT estados_contratos_fk FOREIGN KEY (id_estado) REFERENCES public.estados(id_estado);


--
-- TOC entry 2876 (class 2606 OID 39622)
-- Name: contratos objeto_contratos_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contratos
    ADD CONSTRAINT objeto_contratos_fk FOREIGN KEY (objeto) REFERENCES public.objeto(objeto);


--
-- TOC entry 2878 (class 2606 OID 39637)
-- Name: contratos personas_contratos_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contratos
    ADD CONSTRAINT personas_contratos_fk FOREIGN KEY (id_pers) REFERENCES public.personas(id_pers);


--
-- TOC entry 2875 (class 2606 OID 39632)
-- Name: personas sexo_personas_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.personas
    ADD CONSTRAINT sexo_personas_fk FOREIGN KEY (sexo) REFERENCES public.sexo(sexo);


--
-- TOC entry 2877 (class 2606 OID 39627)
-- Name: contratos solicitantes_contratos_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contratos
    ADD CONSTRAINT solicitantes_contratos_fk FOREIGN KEY (id_solicitante) REFERENCES public.solicitantes(id_solicitante);


-- Completed on 2020-06-15 09:56:22 -03

--
-- PostgreSQL database dump complete
--
