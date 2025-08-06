package com.stockeasy.model;

/**
 * Customer model class representing customers table
 */
public class Customer {
    private int custId;
    private String custMailId;
    private String custPhoneNo;
    private String custName;
    private int shopOwnerId;
    
    // Default constructor
    public Customer() {}
    
    // Constructor
    public Customer(String custMailId, String custPhoneNo, String custName, int shopOwnerId) {
        this.custMailId = custMailId;
        this.custPhoneNo = custPhoneNo;
        this.custName = custName;
        this.shopOwnerId = shopOwnerId;
    }
    
    // Getters and Setters
    public int getCustId() {
        return custId;
    }
    
    public void setCustId(int custId) {
        this.custId = custId;
    }
    
    public String getCustMailId() {
        return custMailId;
    }
    
    public void setCustMailId(String custMailId) {
        this.custMailId = custMailId;
    }
    
    public String getCustPhoneNo() {
        return custPhoneNo;
    }
    
    public void setCustPhoneNo(String custPhoneNo) {
        this.custPhoneNo = custPhoneNo;
    }
    
    public String getCustName() {
        return custName;
    }
    
    public void setCustName(String custName) {
        this.custName = custName;
    }
    
    public int getShopOwnerId() {
        return shopOwnerId;
    }
    
    public void setShopOwnerId(int shopOwnerId) {
        this.shopOwnerId = shopOwnerId;
    }
    
    @Override
    public String toString() {
        return "Customer{" +
                "custId=" + custId +
                ", custMailId='" + custMailId + '\'' +
                ", custPhoneNo='" + custPhoneNo + '\'' +
                ", custName='" + custName + '\'' +
                ", shopOwnerId=" + shopOwnerId +
                '}';
    }
}
