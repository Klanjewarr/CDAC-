create database college;
use college;

create table dept(
dept_id INT primary key,
depr_name varchar(30) Not null unique
);

create table emp(
emp_id int auto_increment primary key,
name varchar(50) not null,
sal decimal(10,2) default 10000 check (sal>0),
dept_id int,
mgr_id int,
join_date date,
foreign key(dept_id) references dept(dept_id)
);

alter table emp add email varchar(50);
alter table emp modify name varchar(80);
alter table emp drop column email;
alter table emp add constraint uq unique(name);
alter table emp drop foreign key emp_idfk_1;   -- drop constraint
rename table emp to employee;
truncate table employee;
drop table employee;
