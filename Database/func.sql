use dac_aug_26;
delimiter//
create procedure division(in no1 int, in no2 int)
begin declare result int;
declare exit handler for sqlexception
begin
select 'Error Occured : Division by zero' as msg;
end;
set result = no1/no2;
select result;
end//
delimiter;
call division(12,0);

delimiter//
create procedure unique(in id int, in name varchar(50), in sal decimal(10,2))
begin continue handler for sqlstate '23000'
Select 'Duplicate primary key found ' as msg;
end ;
insert into employee(empId, empName, salary) values(id, name, sal);
select name;
end//
delimiter;
call unique(111, 'Bhanu Pratap', 85000);