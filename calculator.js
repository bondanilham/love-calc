
const tombolHitung = document.getElementById('hitungBtn');

tombolHitung.addEventListener('click', function() {
const namaPertama = document.getElementById('name1').value  // masukin id nama pertama di sini
const namaKedua = document.getElementById('name2').value  // masukin id nama kedua di sini
const tanggalLahirPertama = document.getElementById('dob1').value; // masukin id tanggal pertama di ini
const tanggalLahirKedua = document.getElementById('dob2').value; // masukin id tanggal kedua di sini

if (!namaPertama || !tanggalLahirPertama || !namaKedua || !tanggalLahirKedua) {
    alert("Nama atau tanggal jangan kosong ngab!");
    return;
}

let namaGabung = gabungNama(namaPertama,namaKedua)
// console.log(namaGabung);
let tanggalGabung = gabungTanggalLahir(tanggalLahirPertama,tanggalLahirKedua)

let gabungSemua = namaGabung + tanggalGabung
let ascii = convertAscii(gabungSemua)
let finalScore = loveMeter(ascii)

document.getElementById('hasilScore').innerText = `Kecocokan: ${finalScore}%`;

const history = document.createElement("p");
history.innerText = `${namaPertama} x ${namaKedua} = ${finalScore}`;
document.body.appendChild(history)
})

// hitung2an
function gabungNama(a,b){
    let nama = (a+b).toLowerCase()
    nama = nama.split(" ").join("")
    // keluarannya adalah string
    return nama
}

function gabungTanggalLahir(a,b){
    return (a+b);
}

function convertAscii(a){
    let value = 0
    for (let i = 0; i < a.length; i++) {
        value += a.charCodeAt(i)
        // console.log(value);
    }
    return value
}

function loveMeter(a){
    return a % 101
}

console.log(loveMeter());


// render
// save
// update