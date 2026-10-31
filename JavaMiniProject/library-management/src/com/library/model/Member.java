package com.library.model;

public class Member extends Person {

    protected String email;
    protected MemberType memberType;

    public Member(int id, String name, String email, MemberType memberType) {
        super(id, name);
        this.email = email;
        this.memberType = memberType;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public MemberType getMemberType() {
        return memberType;
    }

    public void setMemberType(MemberType memberType) {
        this.memberType = memberType;
    }

    public int getMaxBooks() {
        return 3;
    }

    public int getBorrowDays() {
        return 14;
    }

    public double getFineRate() {
        return 2.0;
    }

    @Override
    public void displayDetails() {
        System.out.println("ID: " + id + ", Name: " + name + ", Email: " + email + ", Type: " + memberType);
    }

    @Override
    public String toString() {
        return "Member [id=" + id + ", name=" + name + ", email=" + email + ", type=" + memberType + "]";
    }
}
