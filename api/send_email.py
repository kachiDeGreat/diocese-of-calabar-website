from http.server import BaseHTTPRequestHandler
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import json
import os # Added this to access environment variables

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            # 1. Read the incoming data from React
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data)

            # 2. Get Credentials from Environment Variables
            sender_email = os.environ.get("GMAIL_USER")
            sender_password = os.environ.get("GMAIL_APP_PASSWORD")
            receiver_email = data.get('email')

            # 3. Build the Email
            message = MIMEMultipart("alternative")
            message["Subject"] = "Synod 2026 Registration Confirmed!"
            message["From"] = f"Diocese of Calabar <{sender_email}>"
            message["To"] = receiver_email

            html = f"""
            <html>
              <body style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
                <h2 style="color: #c52810;">Payment Successful, {data.get('fullName')}!</h2>
                <p>Thank you for registering for the 3rd Session of the 12th Synod of the Diocese of Calabar.</p>
                <p><strong>Your Registration Details:</strong></p>
                <ul>
                    <li>Designation: {data.get('designation')}</li>
                    <li>Archdeaconry: {data.get('archdeaconry')}</li>
                    <li>Amount Paid: NGN {data.get('amountPaid')}</li>
                </ul>
                <div style="font-size: 18px; padding: 15px; background: #f9f9f9; border-left: 5px solid #c52810; margin: 20px 0;">
                  Your Unique Delegate ID: <strong>{data.get('delegateId')}</strong>
                </div>
                <p>Please keep this ID safe, as you will need it for your accreditation tag.</p>
              </body>
            </html>
            """
            message.attach(MIMEText(html, "html"))

            # 4. Connect to Google and Send
            with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
                server.login(sender_email, sender_password)
                server.sendmail(sender_email, receiver_email, message.as_string())
            
            # 5. Send Success Response back to React
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({"message": "Receipt sent successfully!"}).encode())

        except Exception as e:
            # 6. Handle Errors
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({"error": str(e)}).encode())