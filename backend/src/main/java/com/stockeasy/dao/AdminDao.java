package com.stockeasy.dao;

import com.stockeasy.model.Admin;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class AdminDao {
    // Database connection details
    private static final String JDBC_URL = "jdbc:mysql://localhost:3306/stockeasy";
    private static final String JDBC_USERNAME = "root";
    private static final String JDBC_PASSWORD = "";
    
    static {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
    
    // Method to insert admin
    public static int save(Admin admin) {
        int status = 0;
        try (Connection conn = DriverManager.getConnection(JDBC_URL, JDBC_USERNAME, JDBC_PASSWORD)) {
            PreparedStatement stmt = conn.prepareStatement("INSERT INTO admin (Admin_mail_id, Admin_phone_no, Admin_fname, Admin_mname, Admin_lname, password) VALUES (?, ?, ?, ?, ?, ?)");
            stmt.setString(1, admin.getAdminMailId());
            stmt.setString(2, admin.getAdminPhoneNo());
            stmt.setString(3, admin.getAdminFname());
            stmt.setString(4, admin.getAdminMname());
            stmt.setString(5, admin.getAdminLname());
            stmt.setString(6, admin.getPassword());
            status = stmt.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return status;
    }
    
    // Method to fetch all admins
    public static List<Admin> getAllAdmins() {
        List<Admin> adminList = new ArrayList<>();
        try (Connection conn = DriverManager.getConnection(JDBC_URL, JDBC_USERNAME, JDBC_PASSWORD)) {
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM admin");
            while (rs.next()) {
                Admin admin = new Admin();
                admin.setAdminId(rs.getInt(1));
                admin.setAdminMailId(rs.getString(2));
                admin.setAdminPhoneNo(rs.getString(3));
                admin.setAdminFname(rs.getString(4));
                admin.setAdminMname(rs.getString(5));
                admin.setAdminLname(rs.getString(6));
                admin.setPassword(rs.getString(7));
                adminList.add(admin);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return adminList;
    }
    
    // Method to delete admin
    public static int delete(int id) {
        int status = 0;
        try (Connection conn = DriverManager.getConnection(JDBC_URL, JDBC_USERNAME, JDBC_PASSWORD)) {
            PreparedStatement stmt = conn.prepareStatement("DELETE FROM admin WHERE Admin_id = ?");
            stmt.setInt(1, id);
            status = stmt.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return status;
    }
    
    // Method to get admin by email and password (for login)
    public static Admin getAdminByEmailAndPassword(String email, String password) {
        Admin admin = null;
        try (Connection conn = DriverManager.getConnection(JDBC_URL, JDBC_USERNAME, JDBC_PASSWORD)) {
            PreparedStatement stmt = conn.prepareStatement("SELECT * FROM admin WHERE Admin_mail_id = ? AND password = ?");
            stmt.setString(1, email);
            stmt.setString(2, password);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                admin = new Admin();
                admin.setAdminId(rs.getInt(1));
                admin.setAdminMailId(rs.getString(2));
                admin.setAdminPhoneNo(rs.getString(3));
                admin.setAdminFname(rs.getString(4));
                admin.setAdminMname(rs.getString(5));
                admin.setAdminLname(rs.getString(6));
                admin.setPassword(rs.getString(7));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return admin;
    }
    
    // Method to get admin by ID
    public static Admin getAdminById(int id) {
        Admin admin = null;
        try (Connection conn = DriverManager.getConnection(JDBC_URL, JDBC_USERNAME, JDBC_PASSWORD)) {
            PreparedStatement stmt = conn.prepareStatement("SELECT * FROM admin WHERE Admin_id = ?");
            stmt.setInt(1, id);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                admin = new Admin();
                admin.setAdminId(rs.getInt(1));
                admin.setAdminMailId(rs.getString(2));
                admin.setAdminPhoneNo(rs.getString(3));
                admin.setAdminFname(rs.getString(4));
                admin.setAdminMname(rs.getString(5));
                admin.setAdminLname(rs.getString(6));
                admin.setPassword(rs.getString(7));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return admin;
    }
    
    // Method to update admin
    public static int update(Admin admin) {
        int status = 0;
        try (Connection conn = DriverManager.getConnection(JDBC_URL, JDBC_USERNAME, JDBC_PASSWORD)) {
            PreparedStatement stmt = conn.prepareStatement("UPDATE admin SET Admin_mail_id = ?, Admin_phone_no = ?, Admin_fname = ?, Admin_mname = ?, Admin_lname = ?, password = ? WHERE Admin_id = ?");
            stmt.setString(1, admin.getAdminMailId());
            stmt.setString(2, admin.getAdminPhoneNo());
            stmt.setString(3, admin.getAdminFname());
            stmt.setString(4, admin.getAdminMname());
            stmt.setString(5, admin.getAdminLname());
            stmt.setString(6, admin.getPassword());
            stmt.setInt(7, admin.getAdminId());
            status = stmt.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return status;
    }
}
