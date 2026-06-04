from http.server import BaseHTTPRequestHandler
import urllib.request
import urllib.error
import json
import os

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data)

            reference = data.get('reference')

            if not reference:
                self._send_error(400, "Missing reference.")
                return

            paystack_secret = os.environ.get("PAYSTACK_SECRET_KEY")
            if not paystack_secret:
                self._send_error(500, "Server configuration error.")
                return

            url = f"https://api.paystack.co/transaction/verify/{reference}"
            req = urllib.request.Request(url)
            req.add_header('Authorization', f'Bearer {paystack_secret}')
            req.add_header('Content-Type', 'application/json')

            try:
                with urllib.request.urlopen(req) as response:
                    res_data = json.loads(response.read().decode())
            except urllib.error.HTTPError as http_err:
                self._send_error(400, f"Paystack communication error: {http_err.reason}")
                return
            except urllib.error.URLError as url_err:
                self._send_error(500, f"Network error: {url_err.reason}")
                return

            if not res_data.get('status') or res_data.get('data', {}).get('status') != 'success':
                self._send_error(400, "This transaction is invalid, failed, or abandoned.")
                return

            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({
                "verified": True,
                "reference": reference
            }).encode())

        except Exception as e:
            self._send_error(500, f"Server error: {str(e)}")

    def _send_error(self, status_code, message):
        self.send_response(status_code)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps({"message": message}).encode())