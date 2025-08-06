package com.stockeasy.servlet;

import com.stockeasy.dao.ShopOwnerDao;
import com.stockeasy.model.ShopOwner;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;

@WebServlet("/shopowner")
public class ShopOwnerServlet extends HttpServlet {
    
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String action = request.getParameter("action");
        
        if ("register".equalsIgnoreCase(action)) {
            // Register new shop owner
            String sMailId = request.getParameter("sMailId");
            String sFname = request.getParameter("sFname");
            String sMname = request.getParameter("sMname");
            String sLname = request.getParameter("sLname");
            String shopName = request.getParameter("shopName");
            String gstNo = request.getParameter("gstNo");
            String drugLicenceNo = request.getParameter("drugLicenceNo");
            String password = request.getParameter("password");
            
            ShopOwner shopOwner = new ShopOwner();
            shopOwner.setSMailId(sMailId);
            shopOwner.setSFname(sFname);
            shopOwner.setSMname(sMname);
            shopOwner.setSLname(sLname);
            shopOwner.setShopName(shopName);
            shopOwner.setGstNo(gstNo);
            shopOwner.setDrugLicenceNo(drugLicenceNo);
            shopOwner.setPassword(password);
            
            int result = ShopOwnerDao.save(shopOwner);
            if (result > 0) {
                request.setAttribute("successMessage", "Registration successful! Please login.");
                request.getRequestDispatcher("login.jsp").forward(request, response);
            } else {
                request.setAttribute("errorMessage", "Registration failed. Please try again.");
                request.getRequestDispatcher("register.jsp").forward(request, response);
            }
            
        } else if ("login".equalsIgnoreCase(action)) {
            // Shop owner login
            String email = request.getParameter("email");
            String password = request.getParameter("password");
            
            ShopOwner shopOwner = ShopOwnerDao.getShopOwnerByEmailAndPassword(email, password);
            if (shopOwner != null) {
                HttpSession session = request.getSession();
                session.setAttribute("shopOwner", shopOwner);
                session.setAttribute("userType", "shopowner");
                session.setAttribute("shopOwnerId", shopOwner.getShopOwnerId());
                response.sendRedirect("dashboard.jsp");
            } else {
                request.setAttribute("errorMessage", "Invalid email or password");
                request.getRequestDispatcher("login.jsp").forward(request, response);
            }
            
        } else if ("logout".equalsIgnoreCase(action)) {
            // Shop owner logout
            HttpSession session = request.getSession();
            session.invalidate();
            response.sendRedirect("index.jsp");
            
        } else if ("update".equalsIgnoreCase(action)) {
            // Update shop owner profile
            int shopOwnerId = Integer.parseInt(request.getParameter("shopOwnerId"));
            String sMailId = request.getParameter("sMailId");
            String sFname = request.getParameter("sFname");
            String sMname = request.getParameter("sMname");
            String sLname = request.getParameter("sLname");
            String shopName = request.getParameter("shopName");
            String gstNo = request.getParameter("gstNo");
            String drugLicenceNo = request.getParameter("drugLicenceNo");
            String password = request.getParameter("password");
            
            ShopOwner shopOwner = new ShopOwner();
            shopOwner.setShopOwnerId(shopOwnerId);
            shopOwner.setSMailId(sMailId);
            shopOwner.setSFname(sFname);
            shopOwner.setSMname(sMname);
            shopOwner.setSLname(sLname);
            shopOwner.setShopName(shopName);
            shopOwner.setGstNo(gstNo);
            shopOwner.setDrugLicenceNo(drugLicenceNo);
            shopOwner.setPassword(password);
            
            int result = ShopOwnerDao.update(shopOwner);
            if (result > 0) {
                HttpSession session = request.getSession();
                session.setAttribute("shopOwner", shopOwner);
                request.setAttribute("successMessage", "Profile updated successfully!");
            } else {
                request.setAttribute("errorMessage", "Profile update failed!");
            }
            request.getRequestDispatcher("profile.jsp").forward(request, response);
        }
    }
    
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String action = request.getParameter("action");
        
        if ("profile".equalsIgnoreCase(action)) {
            HttpSession session = request.getSession();
            ShopOwner shopOwner = (ShopOwner) session.getAttribute("shopOwner");
            if (shopOwner != null) {
                request.setAttribute("shopOwner", shopOwner);
                request.getRequestDispatcher("profile.jsp").forward(request, response);
            } else {
                response.sendRedirect("login.jsp");
            }
        } else {
            // Default: show all shop owners (for admin)
            request.setAttribute("shopOwnerList", ShopOwnerDao.getAllShopOwners());
            request.getRequestDispatcher("shopOwnerList.jsp").forward(request, response);
        }
    }
}
