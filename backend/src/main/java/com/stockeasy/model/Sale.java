package com.stockeasy.model;

import java.math.BigDecimal;
import java.sql.Date;

/**
 * Sale model class representing sales table
 */
public class Sale {
    private int salesId;
    private int medId;
    private int shopOwnersId;
    private int customerId;
    private BigDecimal amount;
    private Date sellingDate;
    
    // Default constructor
    public Sale() {}
    
    // Constructor
    public Sale(int medId, int shopOwnersId, int customerId, BigDecimal amount, Date sellingDate) {
        this.medId = medId;
        this.shopOwnersId = shopOwnersId;
        this.customerId = customerId;
        this.amount = amount;
        this.sellingDate = sellingDate;
    }
    
    // Getters and Setters
    public int getSalesId() {
        return salesId;
    }
    
    public void setSalesId(int salesId) {
        this.salesId = salesId;
    }
    
    public int getMedId() {
        return medId;
    }
    
    public void setMedId(int medId) {
        this.medId = medId;
    }
    
    public int getShopOwnersId() {
        return shopOwnersId;
    }
    
    public void setShopOwnersId(int shopOwnersId) {
        this.shopOwnersId = shopOwnersId;
    }
    
    public int getCustomerId() {
        return customerId;
    }
    
    public void setCustomerId(int customerId) {
        this.customerId = customerId;
    }
    
    public BigDecimal getAmount() {
        return amount;
    }
    
    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }
    
    public Date getSellingDate() {
        return sellingDate;
    }
    
    public void setSellingDate(Date sellingDate) {
        this.sellingDate = sellingDate;
    }
    
    @Override
    public String toString() {
        return "Sale{" +
                "salesId=" + salesId +
                ", medId=" + medId +
                ", shopOwnersId=" + shopOwnersId +
                ", customerId=" + customerId +
                ", amount=" + amount +
                ", sellingDate=" + sellingDate +
                '}';
    }
}
