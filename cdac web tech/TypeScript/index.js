"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const p = {
    name: "Akashay",
    age: 10,
    mobile: "1234123412",
    createdAt: new Date(),
    setPerson: function (name, age, email, mobile) {
        this.name = name;
        this.age = age;
        this.email = email;
        this.mobile = mobile;
    }
};
console.log(p.name);
console.log(p);
p.setPerson("NINAD", 11, "dfdsfd", "123233121212");
console.log(p);
const s = {
    name: "Ravi",
    rollno: 34,
    school: "St.Michaels",
    totalMarks: 400,
    age: 10,
    mobile: "9876523412",
    createdAt: new Date(),
    setPerson: function (name, age, email, mobile) {
        this.name = name;
        this.age = age;
        this.email = email;
        this.mobile = mobile;
    }
};
//# sourceMappingURL=index.js.map