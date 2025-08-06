package com.stockeasy.model;

/**
 * Admin model class representing admin table
 */
public class Admin {
    private int adminId;
    private String adminMailId;
    private String adminPhoneNo;
    private String adminFname;
    private String adminMname;
    private String adminLname;
    private String password;
    
    // Default constructor
    public Admin() {}
    
    // Constructor
    public Admin(String adminMailId, String adminPhoneNo, String adminFname, String adminLname, String password) {
        this.adminMailId = adminMailId;
        this.adminPhoneNo = adminPhoneNo;
        this.adminFname = adminFname;
        this.adminLname = adminLname;
        this.password = password;
    }
    
    // Getters and Setters
    public int getAdminId() {
        return adminId;
    }
    
    public void setAdminId(int adminId) {
        this.adminId = adminId;
    }
    
    public String getAdminMailId() {
        return adminMailId;
    }
    
    public void setAdminMailId(String adminMailId) {
        this.adminMailId = adminMailId;
    }
    
    public String getAdminPhoneNo() {
        return adminPhoneNo;
    }
    
    public void setAdminPhoneNo(String adminPhoneNo) {
        this.adminPhoneNo = adminPhoneNo;
    }
    
    public String getAdminFname() {
        return adminFname;
    }
    
    public void setAdminFname(String adminFname) {
        this.adminFname = adminFname;
    }
    
    public String getAdminMname() {
        return adminMname;
    }
    
    public void setAdminMname(String adminMname) {
        this.adminMname = adminMname;
    }
    
    public String getAdminLname() {
        return adminLname;
    }
    
    public void setAdminLname(String adminLname) {
        this.adminLname = adminLname;
    }
    
    public String getPassword() {
        return password;
    }
    
    public void setPassword(String password) {
        this.password = password;
    }
    
    @Override
    public String toString() {
        return "Admin{" +
                "adminId=" + adminId +
                ", adminMailId='" + adminMailId + '\'' +
                ", adminFname='" + adminFname + '\'' +
                ", adminLname='" + adminLname + '\'' +
                '}';
    }
}
