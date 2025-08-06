<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>StockEasy - Medicine Stock Management System</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background-color: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1 {
            color: #2c3e50;
            text-align: center;
            margin-bottom: 30px;
        }
        .nav-links {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin-bottom: 30px;
        }
        .nav-links a {
            padding: 10px 20px;
            background-color: #3498db;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            transition: background-color 0.3s;
        }
        .nav-links a:hover {
            background-color: #2980b9;
        }
        .features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-top: 30px;
        }
        .feature {
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 8px;
            text-align: center;
        }
        .feature h3 {
            color: #2c3e50;
            margin-bottom: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🏥 StockEasy Backend</h1>
        <p style="text-align: center; color: #666; font-size: 18px;">
            Medicine Stock Management System - Backend API
        </p>
        
        <div class="nav-links">
            <a href="login.jsp">Shop Owner Login</a>
            <a href="register.jsp">Register Shop</a>
            <a href="adminLogin.jsp">Admin Login</a>
        </div>
        
        <div class="features">
            <div class="feature">
                <h3>🏪 Shop Management</h3>
                <p>Register and manage pharmacy shops with complete profile management.</p>
            </div>
            <div class="feature">
                <h3>💊 Medicine Inventory</h3>
                <p>Add, update, and track medicine stock with expiry date monitoring.</p>
            </div>
            <div class="feature">
                <h3>👥 Customer Management</h3>
                <p>Maintain customer database with contact information and purchase history.</p>
            </div>
            <div class="feature">
                <h3>💰 Sales Tracking</h3>
                <p>Record and track all sales transactions with detailed reporting.</p>
            </div>
            <div class="feature">
                <h3>📊 Analytics</h3>
                <p>Generate reports and analytics for business insights and decision making.</p>
            </div>
            <div class="feature">
                <h3>🔐 Secure Access</h3>
                <p>Role-based access control with admin and shop owner authentication.</p>
            </div>
        </div>
        
        <div style="margin-top: 40px; text-align: center; color: #666;">
            <h3>API Endpoints</h3>
            <ul style="list-style: none; padding: 0;">
                <li><strong>/admin</strong> - Admin management operations</li>
                <li><strong>/shopowner</strong> - Shop owner registration and authentication</li>
                <li><strong>/medicine</strong> - Medicine inventory management</li>
                <li><strong>/customer</strong> - Customer management</li>
                <li><strong>/sale</strong> - Sales transaction handling</li>
            </ul>
        </div>
        
        <div style="margin-top: 30px; text-align: center; padding: 20px; background-color: #f8f9fa; border-radius: 5px;">
            <p><strong>Database:</strong> MySQL (stockeasy)</p>
            <p><strong>Technology:</strong> Java Servlets, JDBC, JSP</p>
            <p><strong>Server:</strong> Apache Tomcat</p>
        </div>
    </div>
</body>
</html>
