import java.io.*;
import java.net.*;
import java.util.*;

/**
 * Simple HTTP Server to test StockEasy Backend
 * This is a basic server for testing without Tomcat
 */
public class TestServer {
    private static final int PORT = 8080;
    
    public static void main(String[] args) {
        try {
            ServerSocket serverSocket = new ServerSocket(PORT);
            System.out.println("🚀 StockEasy Test Server started on http://localhost:" + PORT);
            System.out.println("📊 Backend API endpoints available:");
            System.out.println("   - /admin - Admin operations");
            System.out.println("   - /shopowner - Shop owner management");
            System.out.println("   - /medicine - Medicine inventory");
            System.out.println("   - /customer - Customer management");
            System.out.println("   - /sale - Sales transactions");
            System.out.println("\n💡 Note: This is a test server. For production, use Apache Tomcat.");
            System.out.println("🛑 Press Ctrl+C to stop the server\n");
            
            while (true) {
                Socket clientSocket = serverSocket.accept();
                handleRequest(clientSocket);
            }
        } catch (IOException e) {
            System.err.println("Server error: " + e.getMessage());
        }
    }
    
    private static void handleRequest(Socket clientSocket) {
        try (BufferedReader in = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
             PrintWriter out = new PrintWriter(clientSocket.getOutputStream(), true)) {
            
            String requestLine = in.readLine();
            if (requestLine == null) return;
            
            String[] parts = requestLine.split(" ");
            String method = parts[0];
            String path = parts[1];
            
            // Skip headers
            String line;
            while ((line = in.readLine()) != null && !line.isEmpty()) {
                // Skip headers
            }
            
            // Send response
            out.println("HTTP/1.1 200 OK");
            out.println("Content-Type: text/html; charset=UTF-8");
            out.println("Access-Control-Allow-Origin: *");
            out.println("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
            out.println("Access-Control-Allow-Headers: Content-Type");
            out.println();
            
            if (path.equals("/") || path.equals("/index")) {
                sendHomePage(out);
            } else if (path.startsWith("/admin")) {
                sendApiResponse(out, "Admin API", "Admin management operations");
            } else if (path.startsWith("/shopowner")) {
                sendApiResponse(out, "Shop Owner API", "Shop owner registration and authentication");
            } else if (path.startsWith("/medicine")) {
                sendApiResponse(out, "Medicine API", "Medicine inventory management");
            } else if (path.startsWith("/customer")) {
                sendApiResponse(out, "Customer API", "Customer management operations");
            } else if (path.startsWith("/sale")) {
                sendApiResponse(out, "Sales API", "Sales transaction handling");
            } else {
                send404(out);
            }
            
            clientSocket.close();
            
        } catch (IOException e) {
            System.err.println("Request handling error: " + e.getMessage());
        }
    }
    
    private static void sendHomePage(PrintWriter out) {
        out.println("<!DOCTYPE html>");
        out.println("<html><head><title>StockEasy Backend - Test Server</title>");
        out.println("<style>");
        out.println("body { font-family: Arial, sans-serif; margin: 40px; background: #f5f5f5; }");
        out.println(".container { max-width: 800px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }");
        out.println("h1 { color: #2c3e50; text-align: center; }");
        out.println(".status { background: #d4edda; color: #155724; padding: 15px; border-radius: 5px; margin: 20px 0; }");
        out.println(".endpoint { background: #f8f9fa; padding: 15px; margin: 10px 0; border-left: 4px solid #007bff; }");
        out.println("</style></head><body>");
        out.println("<div class='container'>");
        out.println("<h1>🏥 StockEasy Backend - Test Server</h1>");
        out.println("<div class='status'>✅ Server is running successfully on port 8080!</div>");
        out.println("<h3>📡 Available API Endpoints:</h3>");
        out.println("<div class='endpoint'><strong>GET/POST /admin</strong> - Admin management operations</div>");
        out.println("<div class='endpoint'><strong>GET/POST /shopowner</strong> - Shop owner registration & authentication</div>");
        out.println("<div class='endpoint'><strong>GET/POST /medicine</strong> - Medicine inventory management</div>");
        out.println("<div class='endpoint'><strong>GET/POST /customer</strong> - Customer management</div>");
        out.println("<div class='endpoint'><strong>GET/POST /sale</strong> - Sales transaction handling</div>");
        out.println("<h3>🔧 Backend Features:</h3>");
        out.println("<ul>");
        out.println("<li>✅ Database Schema (MySQL compatible)</li>");
        out.println("<li>✅ Model Classes (Admin, ShopOwner, Customer, Medicine, Sale)</li>");
        out.println("<li>✅ DAO Classes with JDBC operations</li>");
        out.println("<li>✅ Servlet Classes with action-based routing</li>");
        out.println("<li>✅ Session management and authentication</li>");
        out.println("</ul>");
        out.println("<p><strong>Note:</strong> This is a test server. For production deployment, use Apache Tomcat with the provided WAR file.</p>");
        out.println("<p><strong>Database:</strong> Configure MySQL with the provided schema.sql file.</p>");
        out.println("</div></body></html>");
    }
    
    private static void sendApiResponse(PrintWriter out, String apiName, String description) {
        out.println("<!DOCTYPE html>");
        out.println("<html><head><title>" + apiName + " - StockEasy</title>");
        out.println("<style>body { font-family: Arial, sans-serif; margin: 40px; } .container { max-width: 600px; margin: 0 auto; }</style>");
        out.println("</head><body><div class='container'>");
        out.println("<h1>🔌 " + apiName + "</h1>");
        out.println("<p>" + description + "</p>");
        out.println("<p><strong>Status:</strong> ✅ Endpoint is accessible</p>");
        out.println("<p><strong>Note:</strong> This is a test server. Full functionality requires Apache Tomcat and MySQL database.</p>");
        out.println("<a href='/'>← Back to Home</a>");
        out.println("</div></body></html>");
    }
    
    private static void send404(PrintWriter out) {
        out.println("<!DOCTYPE html>");
        out.println("<html><head><title>404 - Not Found</title></head><body>");
        out.println("<h1>404 - Endpoint Not Found</h1>");
        out.println("<p>The requested endpoint is not available.</p>");
        out.println("<a href='/'>← Back to Home</a>");
        out.println("</body></html>");
    }
}
