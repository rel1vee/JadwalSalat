// Ambil jadwal hari ini
const getDate = new Date();
const getYear = getDate.getFullYear();
const getMonth = getDate.getMonth() + 1;
const getDay = getDate.getDate();

function bulan() {
  if (getMonth < 10) {
    bulan = `0${getMonth}`;
  } else {
    bulan = getMonth;
  }
  return bulan;
}

function hari() {
  if (getDay < 10) {
    hari = `0${getDay}`;
  } else {
    hari = getDay;
  }
  return hari;
}

/* const tanggal = `${getYear}-${bulan()}-${hari()}`; */

// Pilih lokasi
const inputSearch = document.querySelector(".input-search");
const cardList = document.querySelector(".card-list");

inputSearch.addEventListener("keyup", function () {
  const valueSearch = inputSearch.value.length;

  if (valueSearch > 0) {
    cardList.classList.remove("hidden-list");

    fetch("https://api.myquran.com/v2/sholat/kota/semua")
      .then((response) => response.json())
      .then((response) => {
        const kota = response.data;
        let listKota = "";
        kota.forEach((kota) => {
          listKota += `<a href="#" data-idkota="${kota.id}" id="nama-kota" class="list-group-item list-group-item-action">${kota.lokasi}</a>
          `;
        });
        const namaKota = document.querySelector(".card-list");
        namaKota.innerHTML = listKota;

        // Ketika kota di klik
        const klikKota = document.querySelectorAll("#nama-kota");
        klikKota.forEach((element) => {

          const filterText = inputSearch.value.toLowerCase();
          const itemText = element.firstChild.textContent.toLowerCase();

          if(itemText.indexOf(filterText) != -1 ){
            element.setAttribute("style", "display: block");
          } else {
            element.setAttribute("style", "display: none !important");
          }

          element.addEventListener("click", function () {
            const idkota = this.dataset.idkota;
            const judulKota = this.textContent;
            window.localStorage.setItem("idkota", idkota);
            window.localStorage.setItem("judulkota", judulKota);
            namaKota.classList.add("hidden-list");
            inputSearch.value = '';
            location.reload();
            alert(`${judulKota} berhasil dipilih`);
          });
        });
      });
  } else {
    cardList.classList.add("hidden-list");
  }
});

const tampilKota = document.querySelector(".judul-kota");
tampilKota.textContent = localStorage.judulkota;

function getJadwalSalat() {
  fetch("https://api.myquran.com/v2/sholat/jadwal/" + parseInt(localStorage.idkota) + "/" + getYear + "/" + bulan() + "/" + hari())
    .then((response) => response.json())
    .then((data) => {
      const jadwal = data.data.jadwal;
      document.querySelector(".imsak").textContent = jadwal.imsak;
      document.querySelector(".subuh").textContent = jadwal.subuh;
      document.querySelector(".terbit").textContent = jadwal.terbit;
      document.querySelector(".duha").textContent = jadwal.dhuha;
      document.querySelector(".zuhur").textContent = jadwal.dzuhur;
      document.querySelector(".asar").textContent = jadwal.ashar;
      document.querySelector(".magrib").textContent = jadwal.maghrib;
      document.querySelector(".isya").textContent = jadwal.isya;
      document.querySelector(".tanggal").textContent = jadwal.tanggal;
    });
}

getJadwalSalat();