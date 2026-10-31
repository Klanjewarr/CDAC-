package com.library.dao;

import com.library.model.Faculty;
import com.library.model.Member;
import com.library.model.MemberType;
import com.library.model.Student;
import com.library.util.DBConnection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class MemberDAO {

    public void addMember(Member member) throws SQLException {
        String sql = "INSERT INTO members (name, email, member_type) VALUES (?, ?, ?)";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, member.getName());
            ps.setString(2, member.getEmail());
            ps.setString(3, member.getMemberType().name());
            ps.executeUpdate();
        }
    }

    public Member getMemberById(int memberId) throws SQLException {
        String sql = "SELECT * FROM members WHERE member_id = ?";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, memberId);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    String name = rs.getString("name");
                    String email = rs.getString("email");
                    String typeStr = rs.getString("member_type");
                    MemberType type = MemberType.valueOf(typeStr);

                    if (type == MemberType.STUDENT) {
                        return new Student(memberId, name, email);
                    } else {
                        return new Faculty(memberId, name, email);
                    }
                }
            }
        }
        return null;
    }

    public List<Member> getAllMembers() throws SQLException {
        List<Member> memberList = new ArrayList<>();
        String sql = "SELECT * FROM members";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) {
                int id = rs.getInt("member_id");
                String name = rs.getString("name");
                String email = rs.getString("email");
                String typeStr = rs.getString("member_type");
                MemberType type = MemberType.valueOf(typeStr);

                if (type == MemberType.STUDENT) {
                    memberList.add(new Student(id, name, email));
                } else {
                    memberList.add(new Faculty(id, name, email));
                }
            }
        }
        return memberList;
    }
}
