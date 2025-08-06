package com.stockeasy.servlet;

import com.stockeasy.dao.MedicineDao;
import com.stockeasy.model.Medicine;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Date;
import java.util.List;

@WebServlet("/medicine")
public class MedicineServlet extends HttpServlet {
    
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String action = request.getParameter("action");
        
        if ("add".equalsIgnoreCase(action)) {
            // Add new medicine
            HttpSession session = request.getSession();
            Integer shopOwnerId = (Integer) session.getAttribute("shopOwnerId");
            
            if (shopOwnerId == null) {
                response.sendRedirect("login.jsp");
                return;
            }
            
            String batchNo = request.getParameter("batchNo");
            String medName = request.getParameter("medName");
            String medManfName = request.getParameter("medManfName");
            String medExpDateStr = request.getParameter("medExpDate");
            String medManfDateStr = request.getParameter("medManfDate");
            String buyingCostStr = request.getParameter("buyingCost");
            String sellingCostStr = request.getParameter("sellingCost");
            String quantityStr = request.getParameter("quantity");
            
            Medicine medicine = new Medicine();
            medicine.setBatchNo(batchNo);
            medicine.setMedName(medName);
            medicine.setMedManfName(medManfName);
            medicine.setMedExpDate(Date.valueOf(medExpDateStr));
            medicine.setMedManfDate(Date.valueOf(medManfDateStr));
            medicine.setBuyingCost(new BigDecimal(buyingCostStr));
            medicine.setSellingCost(new BigDecimal(sellingCostStr));
            medicine.setQuantity(Integer.parseInt(quantityStr));
            medicine.setShopOwnerId(shopOwnerId);
            
            int result = MedicineDao.save(medicine);
            if (result > 0) {
                request.setAttribute("successMessage", "Medicine added successfully!");
            } else {
                request.setAttribute("errorMessage", "Failed to add medicine!");
            }
            request.getRequestDispatcher("addMedicine.jsp").forward(request, response);
            
        } else if ("update".equalsIgnoreCase(action)) {
            // Update medicine
            int medId = Integer.parseInt(request.getParameter("medId"));
            String batchNo = request.getParameter("batchNo");
            String medName = request.getParameter("medName");
            String medManfName = request.getParameter("medManfName");
            String medExpDateStr = request.getParameter("medExpDate");
            String medManfDateStr = request.getParameter("medManfDate");
            String buyingCostStr = request.getParameter("buyingCost");
            String sellingCostStr = request.getParameter("sellingCost");
            String quantityStr = request.getParameter("quantity");
            
            Medicine medicine = new Medicine();
            medicine.setMedId(medId);
            medicine.setBatchNo(batchNo);
            medicine.setMedName(medName);
            medicine.setMedManfName(medManfName);
            medicine.setMedExpDate(Date.valueOf(medExpDateStr));
            medicine.setMedManfDate(Date.valueOf(medManfDateStr));
            medicine.setBuyingCost(new BigDecimal(buyingCostStr));
            medicine.setSellingCost(new BigDecimal(sellingCostStr));
            medicine.setQuantity(Integer.parseInt(quantityStr));
            
            int result = MedicineDao.update(medicine);
            if (result > 0) {
                request.setAttribute("successMessage", "Medicine updated successfully!");
            } else {
                request.setAttribute("errorMessage", "Failed to update medicine!");
            }
            response.sendRedirect("medicine?action=list");
            
        } else if ("delete".equalsIgnoreCase(action)) {
            // Delete medicine
            int medId = Integer.parseInt(request.getParameter("id"));
            int result = MedicineDao.delete(medId);
            if (result > 0) {
                request.setAttribute("successMessage", "Medicine deleted successfully!");
            } else {
                request.setAttribute("errorMessage", "Failed to delete medicine!");
            }
            response.sendRedirect("medicine?action=list");
        }
    }
    
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String action = request.getParameter("action");
        HttpSession session = request.getSession();
        Integer shopOwnerId = (Integer) session.getAttribute("shopOwnerId");
        
        if (shopOwnerId == null) {
            response.sendRedirect("login.jsp");
            return;
        }
        
        if ("list".equalsIgnoreCase(action)) {
            // List all medicines for the shop owner
            List<Medicine> medicineList = MedicineDao.getMedicinesByShopOwnerId(shopOwnerId);
            request.setAttribute("medicineList", medicineList);
            request.getRequestDispatcher("medicineList.jsp").forward(request, response);
            
        } else if ("search".equalsIgnoreCase(action)) {
            // Search medicines by name
            String searchName = request.getParameter("name");
            List<Medicine> medicineList = MedicineDao.searchMedicinesByName(searchName);
            request.setAttribute("medicineList", medicineList);
            request.setAttribute("searchName", searchName);
            request.getRequestDispatcher("medicineList.jsp").forward(request, response);
            
        } else if ("expiring".equalsIgnoreCase(action)) {
            // Get expiring medicines
            int days = Integer.parseInt(request.getParameter("days"));
            List<Medicine> medicineList = MedicineDao.getExpiringMedicines(days);
            request.setAttribute("medicineList", medicineList);
            request.setAttribute("expiringDays", days);
            request.getRequestDispatcher("expiringMedicines.jsp").forward(request, response);
            
        } else if ("edit".equalsIgnoreCase(action)) {
            // Edit medicine form
            int medId = Integer.parseInt(request.getParameter("id"));
            Medicine medicine = MedicineDao.getMedicineById(medId);
            request.setAttribute("medicine", medicine);
            request.getRequestDispatcher("editMedicine.jsp").forward(request, response);
            
        } else {
            // Default: redirect to list
            response.sendRedirect("medicine?action=list");
        }
    }
}
