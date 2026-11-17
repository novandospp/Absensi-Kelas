// 1. Mengambil elemen dari HTML
const formAbsensi = document.getElementById('formAbsensi');
const inputNama = document.getElementById('namaSiswa');
const inputStatus = document.getElementById('statusKehadiran');
const tabelBody = document.getElementById('tabelBody');
const totalSiswa = document.getElementById('totalSiswa');
const btnAdmin = document.getElementById('btnAdmin');
const teksTanggal = document.getElementById('tanggalHariIni');

// 2. Menampilkan tanggal hari ini otomatis
const hariIni = new Date();
const opsiTanggal = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
teksTanggal.textContent = "Tanggal: " + hariIni.toLocaleDateString('id-ID', opsiTanggal);

// 3. Mengambil data dari Local Storage
let dataAbsensi = JSON.parse(localStorage.getItem('absensiKelas')) || [];

// 4. Fungsi untuk menampilkan data ke dalam tabel
function tampilkanData() {
    tabelBody.innerHTML = ''; 
    
    dataAbsensi.forEach((item, index) => {
        const baris = document.createElement('tr');
        
        baris.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.nama}</td>
            <td><strong>${item.status}</strong></td>
            <td>${item.waktu}</td>
        `;
        
        tabelBody.appendChild(baris);
    });

    totalSiswa.textContent = dataAbsensi.length;
}

// 5. Menangani saat form absensi disubmit
formAbsensi.addEventListener('submit', function(e) {
    e.preventDefault();

    const nama = inputNama.value.trim();
    const status = inputStatus.value;
    
    const sekarang = new Date();
    const waktu = sekarang.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

    if (nama !== '') {
        dataAbsensi.push({
            nama: nama,
            status: status,
            waktu: waktu
        });

        localStorage.setItem('absensiKelas', JSON.stringify(dataAbsensi));
        tampilkanData();
        inputNama.value = '';
    }
});

// 6. Fitur Kontrol Admin (Hanya bisa diakses dengan PIN / Password)
btnAdmin.addEventListener('click', function() {
    const pin = prompt("Masukkan PIN Admin:");
    
    // PIN admin diset "1234" untuk contoh proyek sekolah
    if (pin === "1234") {
        const aksiAdmin = prompt("Menu Admin:\n1. Hapus Semua Data Absensi\n\nMasukkan nomor pilihan:");
        
        if (aksiAdmin === "1") {
            if (confirm("PERINGATAN: Yakin ingin menghapus seluruh data absensi?")) {
                dataAbsensi = [];
                localStorage.removeItem('absensiKelas');
                tampilkanData();
                alert("Data absensi berhasil direset oleh Admin.");
            }
        } else {
            alert("Pilihan tidak valid.");
        }
    } else if (pin !== null) {
        alert("PIN salah! Anda tidak memiliki akses admin.");
    }
});

// 7. Jalankan fungsi tampilkanData pertama kali
tampilkanData();
