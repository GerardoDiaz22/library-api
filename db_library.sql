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
14	Eric Harrison
18	Eric Harrison
19	Rod Jones
20	Lauraine Snelling
21	Danny Ayers
22	Lewis Carrol
23	Rob Sewell
24	Martha Elizabeth Hillman Rustad
25	Brooke Ligertwood
26	KARL; ENGELS MARX (FRIEDRICH.)
27	Stephanie Macceca
\.


--
-- Data for Name: books; Type: TABLE DATA; Schema: public; Owner: gerardo
--

COPY public.books (book_id, title, source) FROM stdin;
34	Caring for Cut Flowers	Google Books
35	Eagle's Wings	Google Books
36	Atom	Google Books
37	Beginning RSS and Atom Programming	Google Books
20	Harry Potter: Final	internal DB
55	Alice in Wonderland	internal DB
56	Alice through the looking glass	internal DB
60	Baby Penguin Story	Google Books
61	What a Beautiful Name	Google Books
63	La bandera de estrellas centelleantes (The Star-Spangled Banner) 6-Pack	Google Books
21	Polar Express	internal DB
\.


--
-- Data for Name: books_info; Type: TABLE DATA; Schema: public; Owner: gerardo
--

COPY public.books_info (book_info_id, book_id, subtitle, category, publish_date, editors, description, author_id, image_id) FROM stdin;
29	34		Science	2002-02-02	Landlinks Press	Caring for Cut Flowers shows florists and growers how to make cut flowers last longer. While proper postharvest techniques will not magically transform poor quality flowers into first class material, a few basic, inexpensive techniques can maximise the vase life of good quality material.	19	18
30	35		Christian life	1999-10-10	Bethany House Pub	Because her father is ill, without telling her parents, horse-loving Trish earns money after school at the race track, where trouble begins when one of her mounts is in a mysterious accident.	20	19
31	37		Computers	1999-10-10	John Wiley & Sons	RSS and Atom are specifications that give users the power to subscribe to information they want to receive and give content developers tools to provide continuous subscriptions to willing recipients in a spam-free setting. RSS and Atom are the technical power behind the growing millions of blogs on the Web. Blogs change the Web from a set of static pages or sites requiring programming expertise to update to an ever changing, constantly updated landscape that anyone can contribute to. RSS and Atom syndication provides users an easy way to track new information on as many Web sites as they want. This book offers you insight to understanding the issues facing the user community so you can meet users' needs by writing software and Web sites using RSS and Atom feeds. Beginning with an introduction to all the current and coming versions of RSS and Atom, you'll go step by step through the process of producing, aggregating, and storing information feeds. When you're finished, you'll be able to produce client software and Web sites that create, manipulate, aggregate, and display information feeds effectively. "This book is full of practical advice and tips for consuming, producing, and manipulating information feeds. I only wish I had a book like this when I started writing RSS Bandit." - Dare Obasanjo, RSS Bandit creator: http://www.rssbandit.org/	21	20
37	55		Fantasy	1999-10-10	Disney	The tea party begins!	22	12
38	56	And what Alice found there	Fantasy	2000-10-10	Disney	The tea party begins!	22	12
17	20	A Magic Tale	Fantasy	2002-05-03	Casa Bologna	Magic Kid goes to Magic Place	14	12
40	60		Juvenile Nonfiction	1999-10-10	Capstone	Introduces penguins and describes how they are cared for by their parents and gradually become more independent as they learn to catch their own food.	24	22
41	61		Juvenile Fiction	1999-10-10	WaterBrook	Based on Hillsong Worship's beloved Grammy-winning, chart-topping song, this fantastical journey of discovery is certain to inspire children who long to know more about Jesus and what draws people to Him. Join little Oliver and his monkey pal as they embark on a quest for the name in the song Oliver’s mother sings. As they travel across land, sea, and space, they encounter beauty, wonder, and power. Each adventure in their epic journey leads them to the matchless name of Jesus—and to the realization that they don’t have to go far to find Him. What a Beautiful Name is the perfect book for sharing with the little adventurers in your world, and its faith-filled message will resound in their hearts long after the last page is read.	25	23
18	21	Hallowenn Special	Fantasy	2022-05-03	Disney and Bros.	Polar in the Express	18	17
\.


--
-- Data for Name: images; Type: TABLE DATA; Schema: public; Owner: gerardo
--

COPY public.images (image_id, image_path) FROM stdin;
12	
17	
18	http://books.google.com/books/content?id=Pv1eUCKdP-QC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api
19	http://books.google.com/books/content?id=7dhHcV6QBRoC&printsec=frontcover&img=1&zoom=5&source=gbs_api
20	http://books.google.com/books/content?id=B-3ANNNleH0C&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api
21	http://books.google.com/books/content?id=DCp9DwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api
22	http://books.google.com/books/content?id=NYD_AAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api
23	http://books.google.com/books/content?id=UU_EDwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api
24	http://books.google.com/books/content?id=3Sq4CgAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api
25	http://books.google.com/books/content?id=65JfCQAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api
\.


--
-- Name: authors_author_id_seq; Type: SEQUENCE SET; Schema: public; Owner: gerardo
--

SELECT pg_catalog.setval('public.authors_author_id_seq', 27, true);


--
-- Name: book_info_book_info_id_seq; Type: SEQUENCE SET; Schema: public; Owner: gerardo
--

SELECT pg_catalog.setval('public.book_info_book_info_id_seq', 42, true);


--
-- Name: books_book_id_seq; Type: SEQUENCE SET; Schema: public; Owner: gerardo
--

SELECT pg_catalog.setval('public.books_book_id_seq', 63, true);


--
-- Name: images_image_id_seq; Type: SEQUENCE SET; Schema: public; Owner: gerardo
--

SELECT pg_catalog.setval('public.images_image_id_seq', 25, true);


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

