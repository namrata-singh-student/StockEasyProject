package com.stockeasy.model;

import java.math.BigDecimal;
import java.sql.Date;

/**
 * Medicine model class representing medicines table
 */
public class Medicine {
    private int medId;
    private String batchNo;
    private String medName;
    private String medManfName;
    private Date medExpDate;
    private Date medManfDate;
    private BigDecimal buyingCost;
    private BigDecimal sellingCost;
    private int quantity;
    private int shopOwnerId;
    
    // Default constructor
    public Medicine() {}
    
    // Constructor
    public Medicine(String batchNo, String medName, String medManfName, Date medExpDate, 
                   Date medManfDate, BigDecimal buyingCost, BigDecimal sellingCost, 
                   int quantity, int shopOwnerId) {
        this.batchNo = batchNo;
        this.medName = medName;
        this.medManfName = medManfName;
        this.medExpDate = medExpDate;
        this.medManfDate = medManfDate;
        this.buyingCost = buyingCost;
        this.sellingCost = sellingCost;
        this.quantity = quantity;
        this.shopOwnerId = shopOwnerId;
    }
    
    // Getters and Setters
    public int getMedId() {
        return medId;
    }
    
    public void setMedId(int medId) {
        this.medId = medId;
    }
    
    public String getBatchNo() {
        return batchNo;
    }
    
    public void setBatchNo(String batchNo) {
        this.batchNo = batchNo;
    }
    
    public String getMedName() {
        return medName;
    }
    
    public void setMedName(String medName) {
        this.medName = medName;
    }
    
    public String getMedManfName() {
        return medManfName;
    }
    
    public void setMedManfName(String medManfName) {
        this.medManfName = medManfName;
    }
    
    public Date getMedExpDate() {
        return medExpDate;
    }
    
    public void setMedExpDate(Date medExpDate) {
        this.medExpDate = medExpDate;
    }
    
    public Date getMedManfDate() {
        return medManfDate;
    }
    
    public void setMedManfDate(Date medManfDate) {
        this.medManfDate = medManfDate;
    }
    
    public BigDecimal getBuyingCost() {
        return buyingCost;
    }
    
    public void setBuyingCost(BigDecimal buyingCost) {
        this.buyingCost = buyingCost;
    }
    
    public BigDecimal getSellingCost() {
        return sellingCost;
    }
    
    public void setSellingCost(BigDecimal sellingCost) {
        this.sellingCost = sellingCost;
    }
    
    public int getQuantity() {
        return quantity;
    }
    
    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
    
    public int getShopOwnerId() {
        return shopOwnerId;
    }
    
    public void setShopOwnerId(int shopOwnerId) {
        this.shopOwnerId = shopOwnerId;
    }
    
    // Helper methods
    public boolean isExpired() {
        if (medExpDate == null) return false;
        return medExpDate.before(new Date(System.currentTimeMillis()));
    }
    
    public boolean isExpiringSoon(int daysThreshold) {
        if (medExpDate == null) return false;
        
        long currentTime = System.currentTimeMillis();
        long expiryTime = medExpDate.getTime();
        long daysUntilExpiry = (expiryTime - currentTime) / (1000 * 60 * 60 * 24);
        
        return daysUntilExpiry <= daysThreshold;
    }
    
    @Override
    public String toString() {
        return "Medicine{" +
                "medId=" + medId +
                ", batchNo='" + batchNo + '\'' +
                ", medName='" + medName + '\'' +
                ", medManfName='" + medManfName + '\'' +
                ", medExpDate=" + medExpDate +
                ", quantity=" + quantity +
                ", sellingCost=" + sellingCost +
                '}';
    }
}
