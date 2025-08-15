# STAGE 1: Build aplikasi React
# Menggunakan image Node.js versi Long-Term Support (LTS) sebagai dasar
FROM node:18-alpine AS builder

# Menetapkan direktori kerja di dalam container
WORKDIR /app

# Menyalin package.json dan package-lock.json (atau yarn.lock)
COPY package*.json ./

# Meng-install semua dependensi proyek
RUN npm install

# Menyalin sisa file proyek ke dalam direktori kerja
COPY . .

# Menjalankan script build untuk menghasilkan file statis
RUN npm run build

# STAGE 2: Sajikan aplikasi dengan Nginx
# Menggunakan image Nginx yang ringan (alpine) sebagai dasar
FROM nginx:1.25-alpine

# Menyalin hasil build dari stage 'builder' ke direktori default Nginx
# Folder 'dist' adalah output standar dari 'npm run build' pada Vite
COPY --from=builder /app/dist /usr/share/nginx/html

# Menyalin file konfigurasi Nginx kustom
# File ini akan kita buat di langkah selanjutnya
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Memberi tahu Docker bahwa container akan berjalan di port 80
EXPOSE 3000

# Perintah untuk menjalankan Nginx saat container dimulai
CMD ["nginx", "-g", "daemon off;"]
