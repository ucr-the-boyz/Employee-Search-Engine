drop database if exists code_huntersdb;
create database code_huntersdb;
use code_huntersdb;

create table employer(
id int auto_increment,
first_name varchar(255) not null,
last_name varchar (255) not null,
business_name varchar (255) not null,
languages_needed text not null,
project_details text not null,
budget varchar (15) not null,
employer_email varchar(500) not null,
employer_phone varchar (15) not null,
city_name varchar (500) not null,
primary key (id)
);

create table employee(
id int auto_increment,
first_name varchar(255) not null,
last_name varchar (255) not null,
years_experience int (2) not null,
languages_known text not null,
salary_desired varchar (15) not null,
employee_email varchar (255),
employee_phone varchar (15) not null,
city_name varchar (500) not null,
primary key (id)
);
