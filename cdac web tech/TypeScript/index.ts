interface Person{
    name:string,
    age:number,
    mobile:string,
    email?:string,
    readonly createdAt:Date,
    setPerson(name:string,age:number,mobile:string,email:string):void
}

interface Student extends Person{
    rollno:number,
    school:string,
    totalMarks:number
}

const p:Person={
    name:"Akashay",
    age:10,
    mobile:"1234123412",
    createdAt:new Date(),
    setPerson:function(name,age,email,mobile)
    {
        this.name=name
        this.age=age
        this.email=email
        this.mobile=mobile
    }
}

console.log(p.name)
console.log(p)
p.setPerson("NINAD",11,"dfdsfd","123233121212")
console.log(p)

const s:Student={
    name:"Ravi",
    rollno:34,
    school:"St.Michaels",
    totalMarks:400,
    age:10,
    mobile:"9876523412",
    createdAt:new Date(),
    setPerson:function(name,age,email,mobile)
    {
        this.name=name
        this.age=age
        this.email=email
        this.mobile=mobile
    }
}