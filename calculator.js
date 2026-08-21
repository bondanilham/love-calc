let calculateHistory = JSON.parse(localStorage.getItem('dataMatch')) || []

render();

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

    const hasilScore = calculateLove(namaPertama, namaKedua, tanggalLahirPertama, tanggalLahirKedua);
    
    document.getElementById('hasilScore').innerText = `Kecocokan: ${hasilScore['score']}%\n${hasilScore['ucapan']}`;

    // 
    const container = document.getElementById('scrollHintContainer');
    if (container) {
        container.innerHTML = `
            <div class="scrollHintWrapper">
                <p class="scrollHintText">Bingung cara menyatakan cintamu? Scroll ke bawah untuk konsultasi dengan Dokter Cinta! 👇</p>
                <button class="scrollHintBtn" onclick="document.querySelector('.footerKonsul').scrollIntoView({behavior: 'smooth'})">
                    Konsultasi Sekarang 🔻
                </button>
            </div>
        `;
    }


    const dataMatch = {
        namaPertama,
        tanggalLahirPertama,
        namaKedua,
        tanggalLahirKedua,
        finalScore: hasilScore['score']
    }

    calculateHistory.push(dataMatch);
    // console.log(dataMatch);
    save ()
    render()

    // const history = document.createElement("p");
    // history.innerText = `${namaPertama} x ${namaKedua} = ${finalScore}`;
    // document.body.appendChild(history)
})

tombolDelete.addEventListener('click', function(){
    calculateHistory = []
    localStorage.removeItem('dataMatch');
    document.getElementById('hasilScore').innerText = '';
    
    // let cerita = document.getElementById('history')
    // let jumlahHistory = document.querySelectorAll('.historyClass')
    // for (const element of jumlahHistory) {
    //     cerita.removeChild(cerita.firstElementChild)
    // }
    render();
})



function save (){
    localStorage.setItem("dataMatch", JSON.stringify(calculateHistory))
}

function render (){
    const temp = document.getElementById('history')
    temp.innerHTML = '';

    // const pastData = localStorage.getItem('dataMatch')
    
    for (const element of calculateHistory) {
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

function calculateLove(nama1, nama2, date1, date2) {
    let namaGabung = gabungNama(nama1,nama2)
    // console.log(namaGabung);
    let tanggalGabung = gabungTanggalLahir(date1,date2)
    let gabungSemua = namaGabung + tanggalGabung
    let ascii = convertAscii(gabungSemua)
    let finalScore = loveMeter(ascii)
    let ucapan = ''

    if (finalScore >= 75) { // test = selimut dan bajubuku, tanggal sama
        ucapan = 'Wah doi sudah pasti jodohmu! Kawal terus jangan sampe lepas! Kalkulator ini ga mungkin salah kok'
        const audio = new Audio('audio/epic-fail.mp3');
        audio.play();
    } else if (finalScore >= 50) { // test = payung dan hujan
        ucapan = 'Wah cocok banget nih kalian berdua! Ibarat puzzle yang saling melengkapi. Kita tunggu undangannya!'
        const audio = new Audio('audio/celebrate-good-time-celebration.mp3');
        audio.play();
    } else if (finalScore >= 25) { // test = tanahapi dan airudara
        ucapan = 'Jangan terlalu berharap deh. Jalanin pelan-pelan aja sambil liat sikon.' 
        const audio = new Audio('audio/thepriceisright-loserhorns.mp3');
        audio.play();
    } else { // test = aku dan aki
        ucapan = 'Lebih baik menyerah saja. Tenang aja kamu ga bakal jomblo sendirian kok, masih ada si jomblo ngenes Albert' 
        const audio = new Audio('audio/spongebob-fail.mp3');
        audio.play();
    }

    return {
        score: finalScore,
        ucapan: ucapan
    };
}
