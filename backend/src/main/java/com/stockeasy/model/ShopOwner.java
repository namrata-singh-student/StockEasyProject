package com.stockeasy.model;

/**
 * ShopOwner model class representing shopowners table
 */
public class ShopOwner {
    private int shopOwnerId;
    private String sMailId;
    private String sFname;
    private String sMname;
    private String sLname;
    private String shopName;
    private String gstNo;
    private String drugLicenceNo;
    private String password;
    
    // Default constructor
    public ShopOwner() {}
    
    // Constructor
    public ShopOwner(String sMailId, String sFname, String sLname, String shopName, String gstNo, String drugLicenceNo, String password) {
        this.sMailId = sMailId;
        this.sFname = sFname;
        this.sLname = sLname;
        this.shopName = shopName;
        this.gstNo = gstNo;
        this.drugLicenceNo = drugLicenceNo;
        this.password = password;
    }
    
    // Getters and Setters
    public int getShopOwnerId() {
        return shopOwnerId;
    }
    
    public void setShopOwnerId(int shopOwnerId) {
        this.shopOwnerId = shopOwnerId;
    }
    
    public String getSMailId() {
        return sMailId;
    }
    
    public void setSMailId(String sMailId) {
        this.sMailId = sMailId;
    }
    
    public String getSFname() {
        return sFname;
    }
    
    public void setSFname(String sFname) {
        this.sFname = sFname;
    }
    
    public String getSMname() {
        return sMname;
    }
    
    public void setSMname(String sMname) {
        this.sMname = sMname;
    }
    
    public String getSLname() {
        return sLname;
    }
    
    public void setSLname(String sLname) {
        this.sLname = sLname;
    }
    
    public String getShopName() {
        return shopName;
    }
    
    public void setShopName(String shopName) {
        this.shopName = shopName;
    }
    
    public String getGstNo() {
        return gstNo;
    }
    
    public void setGstNo(String gstNo) {
        this.gstNo = gstNo;
    }
    
    public String getDrugLicenceNo() {
        return drugLicenceNo;
    }
    
    public void setDrugLicenceNo(String drugLicenceNo) {
        this.drugLicenceNo = drugLicenceNo;
    }
    
    public String getPassword() {
        return password;
    }
    
    public void setPassword(String password) {
        this.password = password;
    }
    
    @Override
    public String toString() {
        return "ShopOwner{" +
                "shopOwnerId=" + shopOwnerId +
                ", sMailId='" + sMailId + '\'' +
                ", sFname='" + sFname + '\'' +
                ", sLname='" + sLname + '\'' +
                ", shopName='" + shopName + '\'' +
                ", gstNo='" + gstNo + '\'' +
                '}';
    }
}
