package com.stockeasy.dao;

import com.stockeasy.model.Medicine;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class MedicineDao {
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
    
    // Method to insert medicine
    public static int save(Medicine medicine) {
        int status = 0;
        try (Connection conn = DriverManager.getConnection(JDBC_URL, JDBC_USERNAME, JDBC_PASSWORD)) {
            PreparedStatement stmt = conn.prepareStatement("INSERT INTO medicines (Batch_no, MED_name, MED_manf_name, MED_exp_date, MED_manf_date, Buying_cost, Selling_cost, Quantity, Shop_owner_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
            stmt.setString(1, medicine.getBatchNo());
            stmt.setString(2, medicine.getMedName());
            stmt.setString(3, medicine.getMedManfName());
            stmt.setDate(4, medicine.getMedExpDate());
            stmt.setDate(5, medicine.getMedManfDate());
            stmt.setBigDecimal(6, medicine.getBuyingCost());
            stmt.setBigDecimal(7, medicine.getSellingCost());
            stmt.setInt(8, medicine.getQuantity());
            stmt.setInt(9, medicine.getShopOwnerId());
            status = stmt.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return status;
    }
    
    // Method to fetch all medicines
    public static List<Medicine> getAllMedicines() {
        List<Medicine> medicineList = new ArrayList<>();
        try (Connection conn = DriverManager.getConnection(JDBC_URL, JDBC_USERNAME, JDBC_PASSWORD)) {
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM medicines");
            while (rs.next()) {
                Medicine medicine = new Medicine();
                medicine.setMedId(rs.getInt(1));
                medicine.setBatchNo(rs.getString(2));
                medicine.setMedName(rs.getString(3));
                medicine.setMedManfName(rs.getString(4));
                medicine.setMedExpDate(rs.getDate(5));
                medicine.setMedManfDate(rs.getDate(6));
                medicine.setBuyingCost(rs.getBigDecimal(7));
                medicine.setSellingCost(rs.getBigDecimal(8));
                medicine.setQuantity(rs.getInt(9));
                medicine.setShopOwnerId(rs.getInt(10));
                medicineList.add(medicine);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return medicineList;
    }
    
    // Method to get medicines by shop owner ID
    public static List<Medicine> getMedicinesByShopOwnerId(int shopOwnerId) {
        List<Medicine> medicineList = new ArrayList<>();
        try (Connection conn = DriverManager.getConnection(JDBC_URL, JDBC_USERNAME, JDBC_PASSWORD)) {
            PreparedStatement stmt = conn.prepareStatement("SELECT * FROM medicines WHERE Shop_owner_id = ?");
            stmt.setInt(1, shopOwnerId);
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                Medicine medicine = new Medicine();
                medicine.setMedId(rs.getInt(1));
                medicine.setBatchNo(rs.getString(2));
                medicine.setMedName(rs.getString(3));
                medicine.setMedManfName(rs.getString(4));
                medicine.setMedExpDate(rs.getDate(5));
                medicine.setMedManfDate(rs.getDate(6));
                medicine.setBuyingCost(rs.getBigDecimal(7));
                medicine.setSellingCost(rs.getBigDecimal(8));
                medicine.setQuantity(rs.getInt(9));
                medicine.setShopOwnerId(rs.getInt(10));
                medicineList.add(medicine);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return medicineList;
    }
    
    // Method to delete medicine
    public static int delete(int id) {
        int status = 0;
        try (Connection conn = DriverManager.getConnection(JDBC_URL, JDBC_USERNAME, JDBC_PASSWORD)) {
            PreparedStatement stmt = conn.prepareStatement("DELETE FROM medicines WHERE MED_id = ?");
            stmt.setInt(1, id);
            status = stmt.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return status;
    }
    
    // Method to get medicine by ID
    public static Medicine getMedicineById(int id) {
        Medicine medicine = null;
        try (Connection conn = DriverManager.getConnection(JDBC_URL, JDBC_USERNAME, JDBC_PASSWORD)) {
            PreparedStatement stmt = conn.prepareStatement("SELECT * FROM medicines WHERE MED_id = ?");
            stmt.setInt(1, id);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                medicine = new Medicine();
                medicine.setMedId(rs.getInt(1));
                medicine.setBatchNo(rs.getString(2));
                medicine.setMedName(rs.getString(3));
                medicine.setMedManfName(rs.getString(4));
                medicine.setMedExpDate(rs.getDate(5));
                medicine.setMedManfDate(rs.getDate(6));
                medicine.setBuyingCost(rs.getBigDecimal(7));
                medicine.setSellingCost(rs.getBigDecimal(8));
                medicine.setQuantity(rs.getInt(9));
                medicine.setShopOwnerId(rs.getInt(10));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return medicine;
    }
    
    // Method to update medicine
    public static int update(Medicine medicine) {
        int status = 0;
        try (Connection conn = DriverManager.getConnection(JDBC_URL, JDBC_USERNAME, JDBC_PASSWORD)) {
            PreparedStatement stmt = conn.prepareStatement("UPDATE medicines SET Batch_no = ?, MED_name = ?, MED_manf_name = ?, MED_exp_date = ?, MED_manf_date = ?, Buying_cost = ?, Selling_cost = ?, Quantity = ? WHERE MED_id = ?");
            stmt.setString(1, medicine.getBatchNo());
            stmt.setString(2, medicine.getMedName());
            stmt.setString(3, medicine.getMedManfName());
            stmt.setDate(4, medicine.getMedExpDate());
            stmt.setDate(5, medicine.getMedManfDate());
            stmt.setBigDecimal(6, medicine.getBuyingCost());
            stmt.setBigDecimal(7, medicine.getSellingCost());
            stmt.setInt(8, medicine.getQuantity());
            stmt.setInt(9, medicine.getMedId());
            status = stmt.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return status;
    }
    
    // Method to search medicines by name
    public static List<Medicine> searchMedicinesByName(String name) {
        List<Medicine> medicineList = new ArrayList<>();
        try (Connection conn = DriverManager.getConnection(JDBC_URL, JDBC_USERNAME, JDBC_PASSWORD)) {
            PreparedStatement stmt = conn.prepareStatement("SELECT * FROM medicines WHERE MED_name LIKE ?");
            stmt.setString(1, "%" + name + "%");
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                Medicine medicine = new Medicine();
                medicine.setMedId(rs.getInt(1));
                medicine.setBatchNo(rs.getString(2));
                medicine.setMedName(rs.getString(3));
                medicine.setMedManfName(rs.getString(4));
                medicine.setMedExpDate(rs.getDate(5));
                medicine.setMedManfDate(rs.getDate(6));
                medicine.setBuyingCost(rs.getBigDecimal(7));
                medicine.setSellingCost(rs.getBigDecimal(8));
                medicine.setQuantity(rs.getInt(9));
                medicine.setShopOwnerId(rs.getInt(10));
                medicineList.add(medicine);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return medicineList;
    }
    
    // Method to get expiring medicines (within specified days)
    public static List<Medicine> getExpiringMedicines(int days) {
        List<Medicine> medicineList = new ArrayList<>();
        try (Connection conn = DriverManager.getConnection(JDBC_URL, JDBC_USERNAME, JDBC_PASSWORD)) {
            PreparedStatement stmt = conn.prepareStatement("SELECT * FROM medicines WHERE MED_exp_date <= DATE_ADD(CURDATE(), INTERVAL ? DAY) AND MED_exp_date >= CURDATE()");
            stmt.setInt(1, days);
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                Medicine medicine = new Medicine();
                medicine.setMedId(rs.getInt(1));
                medicine.setBatchNo(rs.getString(2));
                medicine.setMedName(rs.getString(3));
                medicine.setMedManfName(rs.getString(4));
                medicine.setMedExpDate(rs.getDate(5));
                medicine.setMedManfDate(rs.getDate(6));
                medicine.setBuyingCost(rs.getBigDecimal(7));
                medicine.setSellingCost(rs.getBigDecimal(8));
                medicine.setQuantity(rs.getInt(9));
                medicine.setShopOwnerId(rs.getInt(10));
                medicineList.add(medicine);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return medicineList;
    }
}
