// 1. Mengambil elemen dari HTML
const formAbsensi = document.getElementById('formAbsensi');
const inputNama = document.getElementById('namaSiswa');
const inputStatus = document.getElementById('statusKehadiran');
const tabelBody = document.getElementById('tabelBody');
const totalSiswa = document.getElementById('totalSiswa');
const btnReset = document.getElementById('btnReset');
const teksTanggal = document.getElementById('tanggalHariIni');

// 2. Menampilkan tanggal hari ini otomatis
const hariIni = new Date();
const opsiTanggal = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
teksTanggal.textContent = "Tanggal: " + hariIni.toLocaleDateString('id-ID', opsiTanggal);

// 3. Mengambil data dari Local Storage (jika sudah ada sebelumnya)
let dataAbsensi = JSON.parse(localStorage.getItem('absensiKelas')) || [];

// 4. Fungsi untuk menampilkan data ke dalam tabel
function tampilkanData() {
    tabelBody.innerHTML = ''; // Kosongkan tabel sebelum diisi ulang
    
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

    // Perbarui angka total tercatat
    totalSiswa.textContent = dataAbsensi.length;
}

// 5. Menangani saat form absensi disubmit (tombol Simpan diklik)
formAbsensi.addEventListener('submit', function(e) {
    e.preventDefault(); // Mencegah halaman refresh otomatis

    const nama = inputNama.value.trim();
    const status = inputStatus.value;
    
    // Mengambil jam & menit saat absen
    const sekarang = new Date();
    const waktu = sekarang.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

    if (nama !== '') {
        // Masukkan data baru ke dalam array
        dataAbsensi.push({
            nama: nama,
            status: status,
            waktu: waktu
        });

        // Simpan ke memori lokal browser (Local Storage)
        localStorage.setItem('absensiKelas', JSON.stringify(dataAbsensi));

        // Perbarui tampilan tabel & kosongkan kotak input nama
        tampilkanData();
        inputNama.value = '';
    }
});

// 6. Menangani tombol Reset Data
btnReset.addEventListener('click', function() {
    if (confirm('Apakah Anda yakin ingin menghapus semua data absensi hari ini?')) {
        dataAbsensi = [];
        localStorage.removeItem('absensiKelas');
        tampilkanData();
    }
});

// 7. Jalankan fungsi tampilkanData pertama kali saat halaman dibuka
tampilkanData();
