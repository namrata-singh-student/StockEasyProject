package com.stockeasy.servlet;

import com.stockeasy.dao.AdminDao;
import com.stockeasy.model.Admin;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;

@WebServlet("/admin")
public class AdminServlet extends HttpServlet {
    
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String action = request.getParameter("action");
        
        if ("add".equalsIgnoreCase(action)) {
            // Add new admin
            String adminMailId = request.getParameter("adminMailId");
            String adminPhoneNo = request.getParameter("adminPhoneNo");
            String adminFname = request.getParameter("adminFname");
            String adminMname = request.getParameter("adminMname");
            String adminLname = request.getParameter("adminLname");
            String password = request.getParameter("password");
            
            Admin admin = new Admin();
            admin.setAdminMailId(adminMailId);
            admin.setAdminPhoneNo(adminPhoneNo);
            admin.setAdminFname(adminFname);
            admin.setAdminMname(adminMname);
            admin.setAdminLname(adminLname);
            admin.setPassword(password);
            
            AdminDao.save(admin);
            response.sendRedirect("adminList.jsp");
            
        } else if ("login".equalsIgnoreCase(action)) {
            // Admin login
            String email = request.getParameter("email");
            String password = request.getParameter("password");
            
            Admin admin = AdminDao.getAdminByEmailAndPassword(email, password);
            if (admin != null) {
                HttpSession session = request.getSession();
                session.setAttribute("admin", admin);
                session.setAttribute("userType", "admin");
                response.sendRedirect("adminDashboard.jsp");
            } else {
                request.setAttribute("errorMessage", "Invalid email or password");
                request.getRequestDispatcher("adminLogin.jsp").forward(request, response);
            }
            
        } else if ("logout".equalsIgnoreCase(action)) {
            // Admin logout
            HttpSession session = request.getSession();
            session.invalidate();
            response.sendRedirect("index.jsp");
            
        } else if ("delete".equalsIgnoreCase(action)) {
            // Delete admin
            int id = Integer.parseInt(request.getParameter("id"));
            AdminDao.delete(id);
            response.sendRedirect("adminList.jsp");
            
        } else if ("update".equalsIgnoreCase(action)) {
            // Update admin
            int adminId = Integer.parseInt(request.getParameter("adminId"));
            String adminMailId = request.getParameter("adminMailId");
            String adminPhoneNo = request.getParameter("adminPhoneNo");
            String adminFname = request.getParameter("adminFname");
            String adminMname = request.getParameter("adminMname");
            String adminLname = request.getParameter("adminLname");
            String password = request.getParameter("password");
            
            Admin admin = new Admin();
            admin.setAdminId(adminId);
            admin.setAdminMailId(adminMailId);
            admin.setAdminPhoneNo(adminPhoneNo);
            admin.setAdminFname(adminFname);
            admin.setAdminMname(adminMname);
            admin.setAdminLname(adminLname);
            admin.setPassword(password);
            
            AdminDao.update(admin);
            response.sendRedirect("adminList.jsp");
        }
    }
    
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setAttribute("adminList", AdminDao.getAllAdmins());
        request.getRequestDispatcher("adminList.jsp").forward(request, response);
    }
}
