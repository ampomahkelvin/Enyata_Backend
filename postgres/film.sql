-- Basic SQL Syntax, SELECT, WHERE, and Sorting
SELECT * from film;

SELECT title, release_year from film;

SELECT * from film ORDER BY release_year LIMIT 10;

SELECT * from customer WHERE first_name = 'John';

SELECT * from rental WHERE return_date BETWEEN '2005-01-01' AND '2005-12-31';

SELECT * from film WHERE title LIKE '%Action%';

SELECT * from customer WHERE email IS NOT null;

SELECT * from rental WHERE customer_id = 1;

SELECT * from film ORDER BY title DESC;


-- Comparison Operators and Logical Operators
SELECT * from film WHERE "length" > 100;

-- SELECT * from customers WHERE district = 'California' OR phone LIKE '555%';

SELECT * from film WHERE release_year < 2000 OR rating = 'PG';

SELECT * from rental WHERE last_update < Now() - INTERVAL '30 DAY';

select * from film where rental_duration is null;


-- DISTINCT, LIMIT, and Aliases
SELECT DISTINCT category from category;

select first_name, last_name from actor limit 5;

select title, release_year as year_released from film;

select first_name as CustomerFirstName, * from customer limit 10;
-- alter table customer rename column first_name to CustomerFirstName;

select * from film order by release_year desc limit 10;


-- Grouping, Aggregate Functions, and HAVING
select count(film_id) from film;

select avg(rental_duration) from film;

select max(rental_duration), min(rental_duration) from film;

select count(title),rating from film group by rating;

select avg(amount) from payment having sum(customer_id) > 5;

select sum(amount), customer_id from payment group by customer_id;

-- Find the total number of rentals for each film title, but only for films rented more than 10 times.


-- Joins (INNER, LEFT, RIGHT, FULL, CROSS, Self-Joins)
select * from film inner join rental on rental.customer_id = 1;

select * from customer c left join rental r on c.customer_id =r.customer_id;

select * from staff s left join store st on s.store_id =  st.store_id;


-- Subqueries
select c.customer_id, c.first_name from customer c 
where c.customer_id in (
select r.customer_id from rental r where r.inventory_id in
(select i.inventory_id from inventory i where i.film_id = (select f.film_id from film f where f.title = 'The Godfather')));

select c.customer_id, c.first_name 
from customer c where (c.customer_id in (select r.customer_id 
from rental r where r.inventory_id in (select i.inventory_id 
from inventory i where i.film_id in (select f.film_id 
from film f where f.film_id in (select r.inventory_id 
from rental r where r.customer_id = 1) ))));


-- Miscellaneous
select sum(p.amount) from payment p where DATE_PART('year', p.payment_date) = 2016;


-- TABLE CREATION
-- Create country_new table
CREATE TABLE country_new (
    country_id serial PRIMARY KEY,
    country varchar(50),
    last_update timestamp
);

-- Create city_new table 
CREATE TABLE city_new (
    city_id serial PRIMARY KEY,
    city varchar(50),
    country_id integer,
    last_update timestamp
);

-- Create address_new table 
CREATE TABLE address_new (
    address_id serial PRIMARY KEY,
    address varchar(255),
    address2 varchar(255),
    district varchar(50),
    city_id integer,
    postal_code varchar(20),
    phone varchar(20),
    last_update timestamp
);

-- Create language_new table
CREATE TABLE language_new (
    language_id serial PRIMARY KEY,
    name varchar(20),
    last_update timestamp
);

-- Create staff_new table 
CREATE TABLE staff_new (
    staff_id serial PRIMARY KEY,
    first_name varchar(50),
    last_name varchar(50),
    address_id integer,
    email varchar(100),
    store_id integer,
    active boolean DEFAULT true,
    username varchar(50),
    password varchar(50)
);

-- Create store_new table
CREATE TABLE store_new (
    store_id serial PRIMARY KEY,
    manager_staff_id integer,
    address_id integer
);

-- Create film_new table
CREATE TABLE film_new (
    film_id serial PRIMARY KEY,
    title varchar(255),
    description text,
    release_year int,
    language_id integer,
    rental_duration int,
    rental_rate numeric(5, 2),
    "length" int,
    replacement_cost numeric(5, 2),
    rating varchar(5),
    special_features varchar(255)
);

-- Create actor_new table 
CREATE TABLE actor_new (
    actor_id serial PRIMARY KEY,
    first_name varchar(50),
    last_name varchar(50)
);

CREATE TABLE category_new (
    category_id serial PRIMARY KEY,
    name varchar(50)
);

-- Add foreign key constraints to the tables
ALTER TABLE city_new ADD CONSTRAINT fk_country
    FOREIGN KEY (country_id) REFERENCES country_new (country_id);

ALTER TABLE address_new ADD CONSTRAINT fk_city
    FOREIGN KEY (city_id) REFERENCES city_new (city_id);

ALTER TABLE staff_new ADD CONSTRAINT fk_address
    FOREIGN KEY (address_id) REFERENCES address_new (address_id);

ALTER TABLE store_new ADD CONSTRAINT fk_manager_staff
    FOREIGN KEY (manager_staff_id) REFERENCES staff_new (staff_id);

ALTER TABLE store_new ADD CONSTRAINT fk_address_store
    FOREIGN KEY (address_id) REFERENCES address_new (address_id);

ALTER TABLE film_new ADD CONSTRAINT fk_language
    FOREIGN KEY (language_id) REFERENCES language_new (language_id);

-- Create film_actor_new table
CREATE TABLE film_actor_new (
    actor_id integer,
    film_id integer,
    PRIMARY KEY (actor_id, film_id)
);

-- Add foreign key constraints to film_actor_new table
ALTER TABLE film_actor_new ADD CONSTRAINT fk_actor
    FOREIGN KEY (actor_id) REFERENCES actor_new (actor_id);

ALTER TABLE film_actor_new ADD CONSTRAINT fk_film
    FOREIGN KEY (film_id) REFERENCES film_new (film_id);

-- Create inventory_new table
CREATE TABLE inventory_new (
    inventory_id serial PRIMARY KEY,
    film_id integer,
    store_id integer,
    last_update timestamp DEFAULT current_timestamp
);

-- Add foreign key constraints to inventory_new table
ALTER TABLE inventory_new ADD CONSTRAINT fk_film_inventory
    FOREIGN KEY (film_id) REFERENCES film_new (film_id);

ALTER TABLE inventory_new ADD CONSTRAINT fk_store_inventory
    FOREIGN KEY (store_id) REFERENCES store_new (store_id);

-- Create customer_new table
CREATE TABLE customer_new (
    customer_id serial PRIMARY KEY,
    store_id integer,
    first_name varchar(50),
    last_name varchar(50),
    email varchar(100),
    address_id integer,
    active boolean DEFAULT true
);

-- Add foreign key constraints to customer_new table
ALTER TABLE customer_new ADD CONSTRAINT fk_store_customer
    FOREIGN KEY (store_id) REFERENCES store_new (store_id);

ALTER TABLE customer_new ADD CONSTRAINT fk_address_customer
    FOREIGN KEY (address_id) REFERENCES address_new (address_id);

-- Create rental_new table
CREATE TABLE rental_new (
    rental_id serial PRIMARY KEY,
    rental_date timestamp,
    inventory_id integer,
    customer_id integer,
    return_date timestamp,
    staff_id integer
);

-- Add foreign key constraints to rental_new table
ALTER TABLE rental_new ADD CONSTRAINT fk_inventory_rental
    FOREIGN KEY (inventory_id) REFERENCES inventory_new (inventory_id);

ALTER TABLE rental_new ADD CONSTRAINT fk_customer_rental
    FOREIGN KEY (customer_id) REFERENCES customer_new (customer_id);

ALTER TABLE rental_new ADD CONSTRAINT fk_staff_rental
    FOREIGN KEY (staff_id) REFERENCES staff_new (staff_id);

-- Create payment_new table
CREATE TABLE payment_new (
    payment_id serial PRIMARY KEY,
    customer_id integer,
    staff_id integer,
    rental_id integer,
    amount numeric(5, 2),
    payment timestamp
);

-- Add foreign key constraints to payment_new table
ALTER TABLE payment_new ADD CONSTRAINT fk_customer_payment
    FOREIGN KEY (customer_id) REFERENCES customer_new (customer_id);

ALTER TABLE payment_new ADD CONSTRAINT fk_staff_payment
    FOREIGN KEY (staff_id) REFERENCES staff_new (staff_id);

ALTER TABLE payment_new ADD CONSTRAINT fk_rental_payment
    FOREIGN KEY (rental_id) REFERENCES rental_new (rental_id);


-- Data Manipulation Questions
-- INSERT – Inserting Data into Tables
-- Insert a new film into the film_new table
INSERT INTO film_new (title, release_year, rental_duration)
VALUES ('New Movie', 2022, 7);

-- Insert a new customer into the customer_new table
INSERT INTO customer_new (first_name, last_name, email)
VALUES ('Alice', 'Johnson', 'alice.johnson@example.com');

-- Insert a new rental record for customer ID 2, film ID 5
INSERT INTO rental_new (customer_id, inventory_id, rental_date, return_date)
VALUES (2, 5, '2023-10-10', '2023-10-20');

-- Insert a new payment record for customer ID 3
INSERT INTO payment_new (customer_id, amount, payment)
VALUES (3, 15.99, '2023-10-10');

-- Insert a new store into the store_new table
INSERT INTO store_new (address_id, manager_staff_id)
VALUES ((SELECT address_id FROM address_new WHERE address = '1234 Oak Street' AND city_id = (SELECT city_id FROM city_new WHERE city = 'Los Angeles' AND country_id = (SELECT country_id FROM country_new WHERE country = 'USA'))), (SELECT staff_id FROM staff_new WHERE first_name = 'Manager'));

-- UPDATE – Updating Existing Records
-- Update the film_new table to change the rating of the film with film_id 15 to 'PG-13'
UPDATE film_new SET rating = 'PG-13' WHERE film_id = 15;

-- Update the customer_new table to change the email address of customer with customer_id 10
UPDATE customer_new SET email = 'newemail@example.com' WHERE customer_id = 10;

-- Update the rental_new table to set the return date of rental ID 5
UPDATE rental_new SET return_date = '2023-10-15' WHERE rental_id = 5;

-- Update the payment_new table to increase the payment amount by 10% for all payments made in '2023-10-10'
UPDATE payment_new SET amount = amount * 1.10 WHERE payment >= '2023-10-10' AND payment < '2023-10-11';

-- Update the store_new table to change the store's address for store_id 1
UPDATE store_new SET address_id = (SELECT address_id FROM address_new WHERE address = '4321 Elm Street') WHERE store_id = 1;

-- DELETE – Deleting Records
-- Delete the film_new record with the title 'Old Movie'
DELETE FROM film_new
WHERE title = 'Old Movie';

-- Delete all rental records for customer ID 4
DELETE FROM rental_new
WHERE customer_id = 4;

-- Delete any payment records for rental ID 12 from the payment table
DELETE FROM payment_new
WHERE rental_id = 12;

-- Delete a customer with customer_id 25 if they have not made any rentals in the last 6 months
DELETE FROM customer_new
WHERE customer_id = 25 AND customer_id NOT IN (SELECT DISTINCT customer_id FROM rental_new WHERE rental_date >= NOW() - INTERVAL '6 MONTH');

-- Delete all inventory records associated with films that were discontinued
DELETE FROM inventory_new
WHERE film_id IN (SELECT film_id FROM film_new WHERE status = 'discontinued');

