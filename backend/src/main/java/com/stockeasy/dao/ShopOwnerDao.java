package com.stockeasy.dao;

import com.stockeasy.model.ShopOwner;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class ShopOwnerDao {
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
    
    // Method to insert shop owner
    public static int save(ShopOwner shopOwner) {
        int status = 0;
        try (Connection conn = DriverManager.getConnection(JDBC_URL, JDBC_USERNAME, JDBC_PASSWORD)) {
            PreparedStatement stmt = conn.prepareStatement("INSERT INTO shopowners (S_mail_id, S_fname, S_mname, S_lname, Shop_name, GST_no, Drug_licence_no, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
            stmt.setString(1, shopOwner.getSMailId());
            stmt.setString(2, shopOwner.getSFname());
            stmt.setString(3, shopOwner.getSMname());
            stmt.setString(4, shopOwner.getSLname());
            stmt.setString(5, shopOwner.getShopName());
            stmt.setString(6, shopOwner.getGstNo());
            stmt.setString(7, shopOwner.getDrugLicenceNo());
            stmt.setString(8, shopOwner.getPassword());
            status = stmt.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return status;
    }
    
    // Method to fetch all shop owners
    public static List<ShopOwner> getAllShopOwners() {
        List<ShopOwner> shopOwnerList = new ArrayList<>();
        try (Connection conn = DriverManager.getConnection(JDBC_URL, JDBC_USERNAME, JDBC_PASSWORD)) {
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM shopowners");
            while (rs.next()) {
                ShopOwner shopOwner = new ShopOwner();
                shopOwner.setShopOwnerId(rs.getInt(1));
                shopOwner.setSMailId(rs.getString(2));
                shopOwner.setSFname(rs.getString(3));
                shopOwner.setSMname(rs.getString(4));
                shopOwner.setSLname(rs.getString(5));
                shopOwner.setShopName(rs.getString(6));
                shopOwner.setGstNo(rs.getString(7));
                shopOwner.setDrugLicenceNo(rs.getString(8));
                shopOwner.setPassword(rs.getString(9));
                shopOwnerList.add(shopOwner);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return shopOwnerList;
    }
    
    // Method to delete shop owner
    public static int delete(int id) {
        int status = 0;
        try (Connection conn = DriverManager.getConnection(JDBC_URL, JDBC_USERNAME, JDBC_PASSWORD)) {
            PreparedStatement stmt = conn.prepareStatement("DELETE FROM shopowners WHERE Shop_owner_id = ?");
            stmt.setInt(1, id);
            status = stmt.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return status;
    }
    
    // Method to get shop owner by email and password (for login)
    public static ShopOwner getShopOwnerByEmailAndPassword(String email, String password) {
        ShopOwner shopOwner = null;
        try (Connection conn = DriverManager.getConnection(JDBC_URL, JDBC_USERNAME, JDBC_PASSWORD)) {
            PreparedStatement stmt = conn.prepareStatement("SELECT * FROM shopowners WHERE S_mail_id = ? AND password = ?");
            stmt.setString(1, email);
            stmt.setString(2, password);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                shopOwner = new ShopOwner();
                shopOwner.setShopOwnerId(rs.getInt(1));
                shopOwner.setSMailId(rs.getString(2));
                shopOwner.setSFname(rs.getString(3));
                shopOwner.setSMname(rs.getString(4));
                shopOwner.setSLname(rs.getString(5));
                shopOwner.setShopName(rs.getString(6));
                shopOwner.setGstNo(rs.getString(7));
                shopOwner.setDrugLicenceNo(rs.getString(8));
                shopOwner.setPassword(rs.getString(9));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return shopOwner;
    }
    
    // Method to get shop owner by ID
    public static ShopOwner getShopOwnerById(int id) {
        ShopOwner shopOwner = null;
        try (Connection conn = DriverManager.getConnection(JDBC_URL, JDBC_USERNAME, JDBC_PASSWORD)) {
            PreparedStatement stmt = conn.prepareStatement("SELECT * FROM shopowners WHERE Shop_owner_id = ?");
            stmt.setInt(1, id);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                shopOwner = new ShopOwner();
                shopOwner.setShopOwnerId(rs.getInt(1));
                shopOwner.setSMailId(rs.getString(2));
                shopOwner.setSFname(rs.getString(3));
                shopOwner.setSMname(rs.getString(4));
                shopOwner.setSLname(rs.getString(5));
                shopOwner.setShopName(rs.getString(6));
                shopOwner.setGstNo(rs.getString(7));
                shopOwner.setDrugLicenceNo(rs.getString(8));
                shopOwner.setPassword(rs.getString(9));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return shopOwner;
    }
    
    // Method to update shop owner
    public static int update(ShopOwner shopOwner) {
        int status = 0;
        try (Connection conn = DriverManager.getConnection(JDBC_URL, JDBC_USERNAME, JDBC_PASSWORD)) {
            PreparedStatement stmt = conn.prepareStatement("UPDATE shopowners SET S_mail_id = ?, S_fname = ?, S_mname = ?, S_lname = ?, Shop_name = ?, GST_no = ?, Drug_licence_no = ?, password = ? WHERE Shop_owner_id = ?");
            stmt.setString(1, shopOwner.getSMailId());
            stmt.setString(2, shopOwner.getSFname());
            stmt.setString(3, shopOwner.getSMname());
            stmt.setString(4, shopOwner.getSLname());
            stmt.setString(5, shopOwner.getShopName());
            stmt.setString(6, shopOwner.getGstNo());
            stmt.setString(7, shopOwner.getDrugLicenceNo());
            stmt.setString(8, shopOwner.getPassword());
            stmt.setInt(9, shopOwner.getShopOwnerId());
            status = stmt.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return status;
    }
}
