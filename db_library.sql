--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5
-- Dumped by pg_dump version 14.5

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

SET default_table_access_method = heap;

--
-- Name: authors; Type: TABLE; Schema: public; Owner: gerardo
--

CREATE TABLE public.authors (
    author_id integer NOT NULL,
    author character varying(50) NOT NULL
);


ALTER TABLE public.authors OWNER TO gerardo;

--
-- Name: authors_author_id_seq; Type: SEQUENCE; Schema: public; Owner: gerardo
--

CREATE SEQUENCE public.authors_author_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.authors_author_id_seq OWNER TO gerardo;

--
-- Name: authors_author_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: gerardo
--

ALTER SEQUENCE public.authors_author_id_seq OWNED BY public.authors.author_id;


--
-- Name: books_info; Type: TABLE; Schema: public; Owner: gerardo
--

CREATE TABLE public.books_info (
    book_info_id integer NOT NULL,
    book_id integer NOT NULL,
    subtitle character varying(100),
    category text,
    publish_date date NOT NULL,
    editors text,
    description text,
    author_id integer NOT NULL,
    image_id integer
);


ALTER TABLE public.books_info OWNER TO gerardo;

--
-- Name: book_info_book_info_id_seq; Type: SEQUENCE; Schema: public; Owner: gerardo
--

CREATE SEQUENCE public.book_info_book_info_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.book_info_book_info_id_seq OWNER TO gerardo;

--
-- Name: book_info_book_info_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: gerardo
--

ALTER SEQUENCE public.book_info_book_info_id_seq OWNED BY public.books_info.book_info_id;


--
-- Name: books; Type: TABLE; Schema: public; Owner: gerardo
--

CREATE TABLE public.books (
    book_id integer NOT NULL,
    title character varying(100) NOT NULL,
    source character varying(30) NOT NULL
);


ALTER TABLE public.books OWNER TO gerardo;

--
-- Name: books_book_id_seq; Type: SEQUENCE; Schema: public; Owner: gerardo
--

CREATE SEQUENCE public.books_book_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.books_book_id_seq OWNER TO gerardo;

--
-- Name: books_book_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: gerardo
--

ALTER SEQUENCE public.books_book_id_seq OWNED BY public.books.book_id;


--
-- Name: images; Type: TABLE; Schema: public; Owner: gerardo
--

CREATE TABLE public.images (
    image_id integer NOT NULL,
    image_path text NOT NULL
);


ALTER TABLE public.images OWNER TO gerardo;

--
-- Name: images_image_id_seq; Type: SEQUENCE; Schema: public; Owner: gerardo
--

CREATE SEQUENCE public.images_image_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.images_image_id_seq OWNER TO gerardo;

--
-- Name: images_image_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: gerardo
--

ALTER SEQUENCE public.images_image_id_seq OWNED BY public.images.image_id;


--
-- Name: authors author_id; Type: DEFAULT; Schema: public; Owner: gerardo
--

ALTER TABLE ONLY public.authors ALTER COLUMN author_id SET DEFAULT nextval('public.authors_author_id_seq'::regclass);


--
-- Name: books book_id; Type: DEFAULT; Schema: public; Owner: gerardo
--

ALTER TABLE ONLY public.books ALTER COLUMN book_id SET DEFAULT nextval('public.books_book_id_seq'::regclass);


--
-- Name: books_info book_info_id; Type: DEFAULT; Schema: public; Owner: gerardo
--

ALTER TABLE ONLY public.books_info ALTER COLUMN book_info_id SET DEFAULT nextval('public.book_info_book_info_id_seq'::regclass);


--
-- Name: images image_id; Type: DEFAULT; Schema: public; Owner: gerardo
--

ALTER TABLE ONLY public.images ALTER COLUMN image_id SET DEFAULT nextval('public.images_image_id_seq'::regclass);


--
-- Data for Name: authors; Type: TABLE DATA; Schema: public; Owner: gerardo
--

COPY public.authors (author_id, author) FROM stdin;
37	J.K. Rowling
38	Miss
39	aa
40	a
41	Alberto Ayoze Castillo
43	Anonymous
\.


--
-- Data for Name: books; Type: TABLE DATA; Schema: public; Owner: gerardo
--

COPY public.books (book_id, title, source) FROM stdin;
80	Harry Potter	internal DB
86	Información financiera	Google Books
87	Volumen Homenaje a Noel Llopis Lladó	Google Books
\.


--
-- Data for Name: books_info; Type: TABLE DATA; Schema: public; Owner: gerardo
--

COPY public.books_info (book_info_id, book_id, subtitle, category, publish_date, editors, description, author_id, image_id) FROM stdin;
56	80	and the Philosopher's Stone	Fantasy	1999-10-10	Panini	Harry does stuff	37	31
\.


--
-- Data for Name: images; Type: TABLE DATA; Schema: public; Owner: gerardo
--

COPY public.images (image_id, image_path) FROM stdin;
31	https://books.google.co.ve/books/content?id=2zgRDXFWkm8C&hl=es&pg=PP1&img=1&zoom=3&sig=ACfU3U0QXCxkCmsHBYCkHRDQfplIdcWHhw&w=1280
32	
33	http://books.google.com/books/content?id=698EDgAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api
34	http://books.google.com/books/content?id=iAMpAQAAIAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api
\.


--
-- Name: authors_author_id_seq; Type: SEQUENCE SET; Schema: public; Owner: gerardo
--

SELECT pg_catalog.setval('public.authors_author_id_seq', 43, true);


--
-- Name: book_info_book_info_id_seq; Type: SEQUENCE SET; Schema: public; Owner: gerardo
--

SELECT pg_catalog.setval('public.book_info_book_info_id_seq', 62, true);


--
-- Name: books_book_id_seq; Type: SEQUENCE SET; Schema: public; Owner: gerardo
--

SELECT pg_catalog.setval('public.books_book_id_seq', 88, true);


--
-- Name: images_image_id_seq; Type: SEQUENCE SET; Schema: public; Owner: gerardo
--

SELECT pg_catalog.setval('public.images_image_id_seq', 34, true);


--
-- Name: authors authors_pkey; Type: CONSTRAINT; Schema: public; Owner: gerardo
--

ALTER TABLE ONLY public.authors
    ADD CONSTRAINT authors_pkey PRIMARY KEY (author_id);


--
-- Name: books_info book_info_pkey; Type: CONSTRAINT; Schema: public; Owner: gerardo
--

ALTER TABLE ONLY public.books_info
    ADD CONSTRAINT book_info_pkey PRIMARY KEY (book_info_id);


--
-- Name: books books_pkey; Type: CONSTRAINT; Schema: public; Owner: gerardo
--

ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_pkey PRIMARY KEY (book_id);


--
-- Name: images images_pkey; Type: CONSTRAINT; Schema: public; Owner: gerardo
--

ALTER TABLE ONLY public.images
    ADD CONSTRAINT images_pkey PRIMARY KEY (image_id);


--
-- Name: books_info book_info_book_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gerardo
--

ALTER TABLE ONLY public.books_info
    ADD CONSTRAINT book_info_book_id_fkey FOREIGN KEY (book_id) REFERENCES public.books(book_id);


--
-- Name: books_info books_info_author_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gerardo
--

ALTER TABLE ONLY public.books_info
    ADD CONSTRAINT books_info_author_id_fkey FOREIGN KEY (author_id) REFERENCES public.authors(author_id);


--
-- Name: books_info books_info_image_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gerardo
--

ALTER TABLE ONLY public.books_info
    ADD CONSTRAINT books_info_image_id_fkey FOREIGN KEY (image_id) REFERENCES public.images(image_id);


--
-- PostgreSQL database dump complete
--

