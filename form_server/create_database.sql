drop TABLE if exists users;
drop database etilico_users;
create database etilico_users;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    surname VARCHAR(50) NOT NULL,
    dni VARCHAR(10) NOT NULL,
    date_of_birth VARCHAR(30) NOT NULL,
    postal_code VARCHAR(10) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    mobile VARCHAR(15) NOT NULL,
    iban VARCHAR(24) NOT NULL,
    card_number VARCHAR(16) NOT NULL,
    password VARCHAR(255) NOT NULL,
    password2 VARCHAR(255) NOT NULL
);

INSERT INTO users (name, surname, dni, date_of_birth, postal_code, email, phone, mobile, iban, card_number, password, password2)
VALUES (
    'John',
    'Doe Sully',
    'x12345678b',
    '22/09/2000',
    '35500',
    'john.doe@example.com',
    '928666666',
    '666999666',
    'ES7921000813610123456789',
    '4539955085883327',
    'hola1234567@',
    'hola1234567@'
);