-- StockEasy Medicine Stock Management System Database Schema
-- Following the provided classroom database structure

CREATE DATABASE IF NOT EXISTS stockeasy;
USE stockeasy;

-- Drop tables if they exist (in reverse order of dependencies)
DROP TABLE IF EXISTS subscriptions;
DROP TABLE IF EXISTS sales;
DROP TABLE IF EXISTS medicines;
DROP TABLE IF EXISTS customers;
DROP TABLE IF EXISTS shopaddress;
DROP TABLE IF EXISTS shopowners;
DROP TABLE IF EXISTS admin;

-- ADMIN Table
CREATE TABLE admin (
    Admin_id INT PRIMARY KEY AUTO_INCREMENT,
    Admin_mail_id VARCHAR(100) UNIQUE NOT NULL,
    Admin_phone_no VARCHAR(15) UNIQUE NOT NULL,
    Admin_fname VARCHAR(50) NOT NULL,
    Admin_mname VARCHAR(50),
    Admin_lname VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- SHOPOWNERS Table
CREATE TABLE shopowners (
    Shop_owner_id INT PRIMARY KEY AUTO_INCREMENT,
    S_mail_id VARCHAR(100) UNIQUE NOT NULL,
    S_fname VARCHAR(50) NOT NULL,
    S_mname VARCHAR(50),
    S_lname VARCHAR(50) NOT NULL,
    Shop_name VARCHAR(100) NOT NULL,
    GST_no VARCHAR(20) UNIQUE NOT NULL,
    Drug_licence_no VARCHAR(20) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- SHOPADDRESS Table
CREATE TABLE shopaddress (
    Shop_address_id INT PRIMARY KEY AUTO_INCREMENT,
    Shop_owners_id INT,
    Shop_city VARCHAR(100) NOT NULL,
    Shop_state VARCHAR(100) NOT NULL,
    Shop_pin VARCHAR(10) NOT NULL,
    FOREIGN KEY (Shop_owners_id) REFERENCES shopowners(Shop_owner_id)
);

-- CUSTOMERS Table
CREATE TABLE customers (
    Cust_id INT PRIMARY KEY AUTO_INCREMENT,
    Cust_mail_id VARCHAR(100) UNIQUE NOT NULL,
    Cust_phone_no VARCHAR(15) UNIQUE NOT NULL,
    Cust_name VARCHAR(100) NOT NULL,
    Shop_owner_id INT,
    FOREIGN KEY (Shop_owner_id) REFERENCES shopowners(Shop_owner_id)
);

-- MEDICINES Table
CREATE TABLE medicines (
    MED_id INT PRIMARY KEY AUTO_INCREMENT,
    Batch_no VARCHAR(50) NOT NULL,
    MED_name VARCHAR(100) NOT NULL,
    MED_manf_name VARCHAR(100) NOT NULL,
    MED_exp_date DATE NOT NULL,
    MED_manf_date DATE NOT NULL,
    Buying_cost DECIMAL(10, 2) NOT NULL,
    Selling_cost DECIMAL(10, 2) NOT NULL,
    Quantity INT NOT NULL,
    Shop_owner_id INT,
    FOREIGN KEY (Shop_owner_id) REFERENCES shopowners(Shop_owner_id)
);

-- SALES Table
CREATE TABLE sales (
    Sales_id INT PRIMARY KEY AUTO_INCREMENT,
    MED_Id INT,
    Shop_owners_id INT,
    Customer_id INT,
    Amount DECIMAL(10, 2) NOT NULL,
    Selling_date DATE NOT NULL,
    FOREIGN KEY (MED_Id) REFERENCES medicines(MED_id),
    FOREIGN KEY (Shop_owners_id) REFERENCES shopowners(Shop_owner_id),
    FOREIGN KEY (Customer_id) REFERENCES customers(Cust_id)
);

-- SUBSCRIPTIONS Table
CREATE TABLE subscriptions (
    Sub_id INT PRIMARY KEY AUTO_INCREMENT,
    Shop_owners_id INT,
    Starting_date DATE NOT NULL,
    Ending_date DATE NOT NULL,
    Sub_price DECIMAL(10, 2) NOT NULL,
    Plan VARCHAR(50) NOT NULL,
    FOREIGN KEY (Shop_owners_id) REFERENCES shopowners(Shop_owner_id)
);

-- Insert default admin user (password: admin123)
INSERT INTO admin (Admin_mail_id, Admin_phone_no, Admin_fname, Admin_lname, password) VALUES
('admin@stockeasy.com', '9876543210', 'System', 'Administrator', 'admin123');

-- Insert sample shop owner
INSERT INTO shopowners (S_mail_id, S_fname, S_lname, Shop_name, GST_no, Drug_licence_no, password) VALUES
('owner@pharmacy.com', 'John', 'Doe', 'City Pharmacy', 'GST123456789', 'DL123456789', 'owner123');

-- Insert shop address
INSERT INTO shopaddress (Shop_owners_id, Shop_city, Shop_state, Shop_pin) VALUES
(1, 'Mumbai', 'Maharashtra', '400001');

COMMIT;
