let calcuclateHistory = []
const tombolHitung = document.getElementById('hitungBtn');
const tombolDelete = document.getElementById('deleteBtn');

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
let ucapan = ''

if (finalScore >= 75) {
    ucapan = 'Wah doi sudah pasti jodohmu! Kawal terus jangan sampe lepas! Kalkulator ini ga mungkin salah kok'
} else if (finalScore >= 50) {
    ucapan = 'Wah cocok banget nih kalian berdua! Ibarat puzzle yang saling melengkapi. Kita tunggu undangannya!'
} else if (finalScore >= 25) {
    ucapan = 'Jangan terlalu berharap deh. Jalanin pelan-pelan aja sambil liat sikon.' 
} else {
    ucapan = 'Lebih baik menyerah saja. Tenang aja kamu ga bakal jomblo sendirian kok, masih ada si jomblo ngenes Albert' 
}

document.getElementById('hasilScore').innerText = `Kecocokan: ${finalScore}%\n${ucapan}`;

let dataMatch = {
    namaPertama,
    tanggalLahirPertama,
    namaKedua,
    tanggalLahirKedua,
    finalScore
}
// console.log(dataMatch);
save(dataMatch)
// render()

// const history = document.createElement("p");
// history.innerText = `${namaPertama} x ${namaKedua} = ${finalScore}`;
// document.body.appendChild(history)
})

tombolDelete.addEventListener('click', function(){
    calcuclateHistory = []
    localStorage.setItem("dataMatch",JSON.stringify([]))
    localStorage.removeItem('dataMatch');
    let cerita = document.getElementById('history')
    let jumlahHistory = document.querySelectorAll('.historyClass')
    for (const element of jumlahHistory) {
        cerita.removeChild(cerita.firstElementChild)
    }
})



function save (data){
    localStorage.setItem("dataMatch", JSON.stringify(data))
    render()
}

function render (){
    const temp = document.getElementById('history')
    temp.innerHTML = '';

    const pastData = localStorage.getItem('dataMatch')

    // calcuclateHistory = []

    if (pastData){
        calcuclateHistory.push(JSON.parse(pastData))
        // console.log(calcuclateHistory);
    }
    
    for (const element of calcuclateHistory) {
        let newline = document.createElement('p')
        newline.classList.add('historyClass')
        newline.innerText = `${element['namaPertama']} x ${element['namaKedua']} = ${element['finalScore']}`
        temp.appendChild(newline)
    }
}
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

render()

// render


// save
// update