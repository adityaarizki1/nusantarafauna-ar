#!/usr/bin/env python3
"""
NusantaraFauna AR - Local Development Server
Menjalankan server web lokal dengan dukungan MIME type lengkap (.glb, .patt, .wav)
dan mendeteksi alamat IP lokal agar dapat diuji langsung dari ponsel pintar.
"""

import http.server
import socketserver
import socket
import os
import sys

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class ARHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def guess_type(self, path):
        # Pastikan MIME types untuk aset WebAR dikenali secara benar oleh browser
        if path.endswith('.glb'):
            return 'model/gltf-binary'
        if path.endswith('.gltf'):
            return 'model/gltf+json'
        if path.endswith('.patt'):
            return 'text/plain'
        if path.endswith('.wav'):
            return 'audio/wav'
        if path.endswith('.mp3'):
            return 'audio/mpeg'
        return super().guess_type(path)

    def end_headers(self):
        # Header CORS untuk kemudahan pengujian lintas domain
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()

def get_local_ip():
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(('8.8.8.8', 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        return '127.0.0.1'

def main():
    local_ip = get_local_ip()
    os.chdir(DIRECTORY)
    
    print("=" * 65)
    print("   NUSANTARA FAUNA AR - LOCAL DEVELOPMENT SERVER")
    print("   Mata Kuliah Realitas Bercampur - TI UNTAG Surabaya")
    print("=" * 65)
    print(f"[*] Folder Proyek : {DIRECTORY}")
    print(f"[*] Port Server   : {PORT}")
    print("\n[+] Buka di Browser Laptop / Komputer:")
    print(f"    👉 http://localhost:{PORT}")
    print(f"    👉 http://localhost:{PORT}/cards.html (Buka untuk melihat / cetak Flashcard)")
    print("\n[+] Buka di Smartphone (Dalam satu jaringan WiFi yang sama):")
    print(f"    👉 http://{local_ip}:{PORT}")
    print("\n[!] Catatan Keamanan Browser Ponsel:")
    print("    Akses kamera ponsel di browser mewajibkan koneksi aman (HTTPS).")
    print("    Untuk pengujian di HP, cara paling mudah dan resmi adalah mengunggah")
    print("    proyek ini ke GitHub Pages (gratis HTTPS selamanya).")
    print("    Lihat panduan lengkap di file README.md.")
    print("=" * 65)
    print("[*] Server berjalan... Tekan Ctrl+C untuk menghentikan server.\n")

    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), ARHTTPRequestHandler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n[*] Server dihentikan.")
            sys.exit(0)

if __name__ == '__main__':
    main()
