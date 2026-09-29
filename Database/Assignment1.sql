-- Question 1
create database Assignment;
use Assignment;
select * from employee;
alter table employee modify column salary varchar(50) check(salary>0);
alter table employee modify column experience int check(experience>=0);
INSERT INTO employee (emp_id, emp_name, email, department, city, salary, experience) VALUES
(101,'Amit Sharma','amit@gmail.com','IT','Pune',65000,3),
(102,'Priya Patil','priya@gmail.com','HR','Mumbai',55000,4),
(103,'Rahul Verma','rahul@gmail.com','Finance','Delhi',70000,5),
(104,'Sneha Joshi','sneha@gmail.com','Marketing','Pune',48000,2),
(105,'Karan Mehta','karan@gmail.com','Sales','Nagpur',52000,3),
(106,'Neha Singh','neha@gmail.com','Operations','Nashik',60000,6),
(107,'Rohit Gupta','rohit@gmail.com','Admin','Delhi',45000,2),
(108,'Pooja Shah','pooja@gmail.com','Legal','Mumbai',75000,7),
(109,'Vikas Rao','vikas@gmail.com','Engineering','Bangalore',85000,5),
(110,'Anjali Deshmukh','anjali@gmail.com','Support','Pune',42000,1),
(111,'Saurabh Jain','saurabh@gmail.com','Research','Hyderabad',72000,4),
(112,'Meena Kulkarni','meena@gmail.com','Design','Nagpur',58000,3);

alter table employee add column phone int;
select * from employee;

UPDATE employee
SET salary = salary + salary*0.05
WHERE experience > 5
AND emp_id > 0;

select * from employee;

delete from employee where emp_id=110;

select * from employee where salary>50000 and experience>3;

SELECT emp_name, department, salary FROM employee ORDER BY salary DESC;

select  count(emp_id), avg(salary) from employee;

select min(salary), max(salary) from employee;

SELECT department, COUNT(emp_id) AS num_employees, AVG(salary) AS avg_salary FROM employee GROUP BY department;

SELECT department, COUNT(emp_id) AS num_employees FROM employee GROUP BY department HAVING COUNT(emp_id) >= 3;

SELECT department, AVG(salary) AS avg_salary FROM employee GROUP BY department HAVING AVG(salary) > 60000;

-- Question 2 

USE Assignment;



CREATE TABLE product (
    product_id      INT PRIMARY KEY,
    product_name    VARCHAR(50) NOT NULL,
    category        VARCHAR(30) NOT NULL,
    price           DECIMAL(10,2) CHECK (price > 0),
    stock           INT CHECK (stock >= 0)
);

CREATE TABLE sales (
    sale_id         INT PRIMARY KEY,
    product_id      INT,
    customer_name   VARCHAR(50) NOT NULL,
    quantity        INT CHECK (quantity > 0),
    sale_date       DATE,
    FOREIGN KEY (product_id) REFERENCES product(product_id)
);


INSERT INTO product (product_id, product_name, category, price, stock) VALUES
(1,'Laptop','Electronics',55000,15),
(2,'Smartphone','Electronics',25000,30),
(3,'Office Chair','Furniture',4500,25),
(4,'Dining Table','Furniture',12000,10),
(5,'Mixer Grinder','Appliances',3200,40),
(6,'Refrigerator','Appliances',32000,12),
(7,'Notebook Pack','Stationery',150,200),
(8,'Ball Pen Box','Stationery',80,300),
(9,'Running Shoes','Footwear',2500,60),
(10,'Formal Shoes','Footwear',3200,35);


INSERT INTO sales (sale_id, product_id, customer_name, quantity, sale_date) VALUES
(1,1,'Ravi Kumar',1,'2025-01-05'),
(2,2,'Anita Rao',2,'2025-01-06'),
(3,3,'Suresh Nair',3,'2025-01-07'),
(4,4,'Divya Menon',1,'2025-01-08'),
(5,5,'Manoj Tiwari',4,'2025-01-09'),
(6,6,'Kavita Iyer',1,'2025-01-10'),
(7,7,'Arjun Singh',10,'2025-01-11'),
(8,8,'Ritu Sharma',15,'2025-01-12'),
(9,9,'Vikram Das',2,'2025-01-13'),
(10,10,'Sunita Rao',1,'2025-01-14'),
(11,1,'Amit Joshi',1,'2025-01-15'),
(12,2,'Neha Kapoor',3,'2025-01-16'),
(13,5,'Rohan Mehta',2,'2025-01-17'),
(14,9,'Priya Desai',1,'2025-01-18'),
(15,7,'Karan Malhotra',5,'2025-01-19');


ALTER TABLE product ADD COLUMN brand VARCHAR(30);

UPDATE product SET brand = CASE product_id
    WHEN 1 THEN 'Dell'
    WHEN 2 THEN 'Samsung'
    WHEN 3 THEN 'Nilkamal'
    WHEN 4 THEN 'Godrej'
    WHEN 5 THEN 'Philips'
    WHEN 6 THEN 'LG'
    WHEN 7 THEN 'Classmate'
    WHEN 8 THEN 'Cello'
    WHEN 9 THEN 'Nike'
    WHEN 10 THEN 'Bata'
END;


UPDATE product p JOIN (
    SELECT product_id, SUM(quantity) AS total_sold
    FROM sales
    GROUP BY product_id
) s ON p.product_id = s.product_id SET p.stock = p.stock - s.total_sold;


DELETE FROM sales WHERE sale_id = 15;

SELECT * FROM product WHERE price > 1000 AND stock < 20;


SELECT p.product_name, SUM(s.quantity) AS total_quantity_sold FROM sales s JOIN product p ON s.product_id = p.product_id GROUP BY p.product_name;


SELECT category, COUNT(product_id) AS num_products, AVG(price) AS avg_price FROM product GROUP BY category;


SELECT category, COUNT(product_id) AS num_products FROM product GROUP BY category HAVING COUNT(product_id) > 2;


SELECT category, AVG(price) AS avg_price FROM product GROUP BY category HAVING AVG(price) > 2000;


SELECT p.category, SUM(s.quantity) AS total_qty_sold FROM sales s JOIN product p ON s.product_id = p.product_id GROUP BY p.category ORDER BY total_qty_sold DESC LIMIT 1;








