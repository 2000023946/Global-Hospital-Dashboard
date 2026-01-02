-- CS4400: Introduction to Database Systems (Fall 2025)
-- Phase II: Create Table & Insert Statements [v0] Monday, September 15, 2025 @ 17:00 EST

-- Team 89
-- Preya Kaushalkumar Thakkar (pthakkar36)
-- Akshita Rajiv Karuman (akaruman3)
-- Mohamed Aweys Abucar (mabucar3)

-- Directions:
-- Please follow all instructions for Phase II as listed in the instructions document.
-- Fill in the team number and names and GT usernames for all members above.
-- Create Table statements must be manually written, not taken from a SQL Dump file.
-- This file must run without error for credit.

/* This is a standard preamble for most of our scripts.  The intent is to establish
a consistent environment for the database behavior. */
set global transaction isolation level serializable;
set global SQL_MODE = 'ANSI,TRADITIONAL';
set names utf8mb4;
set SQL_SAFE_UPDATES = 0;

set @thisDatabase = 'er_management';
drop database if exists er_management;
create database if not exists er_management;
use er_management;

-- Define the database structures
/* You must enter your tables definitions (with primary, unique, and foreign key declarations,
data types, and check constraints) and data insertion statements here.  You may sequence them in
any order that works for you (and runs successfully).  When executed, your statements must create 
a functional database that contains all of the data and supports as many of the constraints as possible. */
CREATE TABLE Person (
ssn CHAR(11) PRIMARY KEY, 
birthdate DATE,
firstname VARCHAR(50),
lastname VARCHAR(50),
address VARCHAR(100)
);

CREATE TABLE Department (
deptID INT PRIMARY KEY,
name VARCHAR(50)
);

CREATE TABLE Room (
number INT PRIMARY KEY,
type VARCHAR(50),
ssn CHAR(11),
deptID INT NOT NULL,
FOREIGN KEY (ssn) REFERENCES Person(ssn) ON UPDATE CASCADE ON DELETE SET NULL,
FOREIGN KEY (deptID) REFERENCES Department(deptID) ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE TABLE Patient (
ssn CHAR(11) PRIMARY KEY,
contact CHAR(12),
funds DECIMAL(10, 2),
FOREIGN KEY (ssn) REFERENCES Person(ssn) ON UPDATE RESTRICT ON DELETE CASCADE
);

CREATE TABLE Appointment(
ssn CHAR(11),
date DATE,
time TIME,
cost DECIMAL(10, 2),
PRIMARY KEY (ssn, date, time),
FOREIGN KEY (ssn) REFERENCES Person(ssn) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE Symptoms (
type VARCHAR(50),
ssn CHAR(11),
date DATE,
time TIME,
numDays INT,
PRIMARY KEY (ssn, date, time, type, numDays),
FOREIGN KEY (ssn, date, time) REFERENCES Appointment(ssn, date, time) ON UPDATE RESTRICT ON DELETE CASCADE
);

CREATE TABLE Staff (
staffID INT PRIMARY KEY,
ssn CHAR(11),
salary DECIMAL(10, 2),
hireDate DATE,
deptID INT,
FOREIGN KEY (ssn) REFERENCES Person(ssn) ON UPDATE RESTRICT ON DELETE CASCADE,
FOREIGN KEY (deptID) REFERENCES Department(deptID) ON UPDATE CASCADE ON DELETE SET NULL
);

CREATE TABLE Doctor (
licenseNumber INT PRIMARY KEY,
staffID INT,
experience INT,
FOREIGN KEY (staffID) REFERENCES Staff(staffID) ON UPDATE RESTRICT ON DELETE CASCADE
);

CREATE TABLE Nurse (
staffID INT PRIMARY KEY,
shiftType VARCHAR(50),
regExpiration DATE,
FOREIGN KEY (staffID) REFERENCES Staff(staffID) ON UPDATE RESTRICT ON DELETE CASCADE
);

CREATE TABLE `Order` (
orderNumber INT PRIMARY KEY,
priority INT ,
date DATE,
cost DECIMAL(10, 2),
licenseNumber INT NOT NULL,
ssn CHAR(11) NOT NULL,
CHECK (1 <= priority <= 5),
FOREIGN KEY (licenseNumber) REFERENCES Doctor(licenseNumber) ON UPDATE RESTRICT ON DELETE RESTRICT,
FOREIGN KEY (ssn) REFERENCES Patient(ssn) ON UPDATE RESTRICT ON DELETE CASCADE
);

CREATE TABLE Prescription (
orderNumber INT PRIMARY KEY,
drugType VARCHAR(50),
dosage INT,
FOREIGN KEY (orderNumber) REFERENCES `Order`(orderNumber) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE LabWork (
orderNumber INT PRIMARY KEY,
type VARCHAR(50),
FOREIGN KEY (orderNumber) REFERENCES `Order`(orderNumber) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE Assigned (
number INT,
staffID INT,
PRIMARY KEY (number, staffID),
FOREIGN KEY (number) REFERENCES Room(number) ON UPDATE CASCADE ON DELETE CASCADE,
FOREIGN KEY (staffID) REFERENCES Nurse(staffID) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE WorksIn (
staffID INT,
deptID INT,
PRIMARY KEY (staffID, deptID),
FOREIGN KEY (staffID) REFERENCES Staff(staffID) ON UPDATE CASCADE ON DELETE CASCADE,
FOREIGN KEY (deptID) REFERENCES Department(deptID) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE ScheduledFor (
licenseNumber INT,
ssn CHAR(11),
date DATE,
time TIME,
PRIMARY KEY (ssn, date, time, licenseNumber),
FOREIGN KEY (ssn, date, time) REFERENCES Appointment(ssn, date, time) ON UPDATE CASCADE ON DELETE CASCADE,
FOREIGN KEY (licenseNumber) REFERENCES Doctor(licenseNumber) ON UPDATE CASCADE ON DELETE CASCADE
);

INSERT INTO Department (deptID, name) VALUES
(7, 'Cardiology'),
(9, 'Neurology'),
(11, 'Primary Care'),
(4, 'Opthamology');

INSERT INTO Person (ssn, birthdate, address, firstName, lastName) VALUES
('636-77-8888', '1970-01-01', '950 W Peachtree, Atlanta, GA 30308', 'Olivia', 'Bennett'),
('858-99-0000', '1975-06-24', '500 North Ave, Atlanta, GA 30302', 'Chloe', 'Davis'),
('969-00-1112', '1980-12-14', '670 Piedmont Ave, Atlanta, GA 30303', 'Liam', 'Foster'),
('212-33-4444', '1986-06-06', '1000 Howell Mill Rd, Atlanta, GA 30303', 'Priya', 'Shah'),
('323-44-5555', '1979-12-11', '1420 Oak Terrace, Decatur, GA 30030', 'Marcus', 'Lee'),
('101-22-3030', '1997-05-19', '848 Spring St NW, Atlanta, GA 30308', 'Emily', 'Park'),
('454-66-7777', '1980-05-01', '108 Main St, Atlanta, GA 30308', 'Omar', 'Haddad'),
('888-77-6666', '1975-06-10', '742 Maple Avenue, Decatur, GA 30030', 'Sarah', 'Mitchell'),
('135-79-0000', '1980-08-15', '925 Brookside Drive, Marietta, GA 30062', 'David', 'Thompson'),
('204-60-8010', '1978-04-22', '488 Willow Creek Lane, Johns Creek, GA 30097', 'Laura', 'Chen'),
('987-65-4321', '1970-03-01', '3100 Briarcliff Road, Atlanta, GA 30329', 'Matthew', 'Nguyen'),
('300-40-5000', '1985-01-10', '124 Oakwood Circle, Smyrna, GA 30080', 'David', 'Taylor'),
('800-50-7676', '1987-07-18', '275 Pine Hollow Drive, Roswell, GA 30075', 'Ethan', 'Brooks'),
('103-05-7090', '1990-09-25', '889 Laurel Springs Lane, Alpharetta, GA 30022', 'Hannah', 'Wilson'),
('909-10-1111', '1987-03-22', '81 Peachtree Pl NE, Atlanta, GA 30309', 'Maria', 'Alvarez'),
('123-45-6789', '1965-02-25', '1234 Peach Street, Atlanta, GA 30305', 'Christopher', 'Davis');

INSERT INTO Room (number, type, deptID) VALUES
(3102, 'Shared', 9),
(1421, 'Private', 7),
(908, 'Shared', 11),
(1108, 'Private', 4);

INSERT INTO Staff (staffID, ssn, salary, hireDate, deptID) VALUES
(720301, '636-77-8888', '92000', '2023-02-01', NULL),
(720303, '858-99-0000', '93500', '2021-11-30', NULL),
(720304, '969-00-1112', '90500', '2020-08-20', NULL),
(510201, '212-33-4444', '265000', '2016-08-19', NULL),
(510202, '323-44-5555', '238000', '2019-09-03', NULL),
(510203, '101-22-3030', '312000', '2014-02-27', 7),
(510204, '454-66-7777', '328000', '2012-11-05', 9),
(107435, '888-77-6666', '200000', '2017-03-11', NULL),
(237432, '135-79-0000', '250000', '2019-02-05', NULL),
(902385, '204-60-8010', '300000', '2012-05-30', 4),
(511283, '987-65-4321', '450000', '2010-01-01', 11),
(936497, '300-40-5000', '79000', '2021-09-15', NULL),
(783404, '800-50-7676', '91000', '2017-11-23', NULL),
(416799, '103-05-7090', '85000', '2019-08-13', NULL);

INSERT INTO Patient (ssn, contact, funds) VALUES
('909-10-1111', '404-555-1010', 1800),
('323-44-5555', '470-555-2020', 2400),
('123-45-6789', '470-321-6543', 2000);

INSERT INTO Doctor (licenseNumber, staffID, experience) VALUES
(77231, 510201, 11),
(88342, 510202, 7),
(66125, 510203, 15),
(99473, 510204, 18),
(56789, 511283, 20),
(89012, 107435, 16),
(23456, 237432, 8),
(34567, 902385, 12);

INSERT INTO Nurse (staffID, shiftType, regExpiration) VALUES
(720301, 'Morning', '2027-01-31'),
(720303, 'Night', '2026-05-31'),
(720304, 'Afternoon', '2026-12-31'),
(936497, 'Morning', '2026-06-01'),
(783404, 'Afternoon', '2026-07-15'),
(416799, 'Night', '2026-05-31');

INSERT INTO Appointment (ssn, date, time, cost) VALUES
('909-10-1111', '2025-09-15', '09:20:00', 520),
('323-44-5555', '2025-09-15', '14:05:00', 460),
('123-45-6789', '2025-03-15', '15:00:00', 300),
('123-45-6789', '2025-04-27', '11:30:00', 750);

INSERT INTO `Order` (orderNumber, priority, date, cost, licenseNumber, ssn) VALUES
(3100451, 2, '2025-09-15', 25, 88342, '909-10-1111'),
(3750129, 1, '2025-09-15', 95, 66125, '323-44-5555'),
(1560238, 2, '2025-04-27', 15, 89012, '123-45-6789'),
(1561902, 1, '2025-05-01', 50, 23456, '123-45-6789');

INSERT INTO Prescription (orderNumber, drugType, dosage) VALUE 
(3100451, 'Sumatriptan', 50),
(1560238, 'Pain Relievers', 800);

INSERT INTO LabWork (orderNumber, type) VALUES
(3750129, 'Cardiac enzyme panel'),
(1561902, 'Blood test');

INSERT INTO Symptoms (ssn, date, time, type, numDays) VALUES
('909-10-1111', '2025-09-15', '09:20:00', 'Migraine', 5),
-- ('909-10-1111', '2025-09-15', '09:20:00', 'Migraine', 5),
('909-10-1111', '2025-09-15', '09:20:00', 'Numbness in fingers', 2),
-- ('909-10-1111', '2025-09-15', '09:20:00', 'Numbness in fingers', 2),
('323-44-5555', '2025-09-15', '14:05:00', 'Chest tightness', 1),
('123-45-6789','2025-03-15', '15:00:00', 'Blurry Vision', 7),
('123-45-6789','2025-04-27', '11:30:00', 'Blurry Vision', 40),
('123-45-6789','2025-04-27', '11:30:00', 'Sensitivity to bright light', 10),
('123-45-6789','2025-04-27', '11:30:00', 'Halos around objects', 2);

INSERT INTO ScheduledFor (ssn, date, time, licenseNumber) VALUES
('909-10-1111', '2025-09-15', '09:20:00', 88342),
('909-10-1111', '2025-09-15', '09:20:00', 77231),
('323-44-5555', '2025-09-15', '14:05:00', 66125),
('123-45-6789', '2025-03-15', '15:00:00', 89012),
('123-45-6789', '2025-04-27', '11:30:00', 23456),
('123-45-6789', '2025-04-27', '11:30:00', 34567);

INSERT INTO WorksIn (staffID, deptId) VALUES
(720301, 9),
(720301, 7),
(720303, 7),
(720303, 4),
(720304, 7),
(510201, 7),
(510202, 9),
(510203, 7),
(510204, 9),
(511283, 11),
(936497, 4),
(783404, 4),
(416799, 11),
(107435, 11),
(237432, 4),
(902385, 4);

INSERT INTO Assigned (staffID, number) VALUES
(720301, 3102),
(720301, 908),
(720303, 1421),
(720304, 1421),
(720304, 1108),
(936497, 1108),
(783404, 1108),
(416799, 1108);