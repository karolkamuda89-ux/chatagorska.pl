
import BookingCalendar from './bookingCalendar' // Importujemy kalendarz z drugiego pliku
import React, { useState } from 'react'
import opisySEO from './opisy.json' // upewnij się, że ścieżka do pliku jest poprawna

// AUTOMATYCZNIE (Czysty JS, zajmuje 1 sekundę)
const JEDNA_Z_35_FOTEK = Array.from({ length: 29 }, (_, i) => `/zdjecia/${i + 1}.webp`);

function App() {
const [touchStartX, setTouchStartX] = useState(0);
const [touchEndX, setTouchEndX] = useState(0);
const [wybranyTermin, setWybranyTermin] = useState("");
const [dataStart, setDataStart] = useState("");
const [dataEnd, setDataEnd] = useState("");
const [imie, setImie] = useState("");
const [email, setEmail] = useState("");
const [telefon, setTelefon] = useState("");
const [goscie, setGoscie] = useState("1"); // Domyślnie 1 osoba
const [currentIndex, setCurrentIndex] = useState(0);
const handleDatesChange = (start, end) => {
  setDataStart(start);
  setDataEnd(end);
  if (start && !end) {
    setWybranyTermin(`Przyjazd: ${start} (Wybierz wyjazd...)`);
  } else if (start && end) {
    setWybranyTermin(`${start} do ${end}`);
  } else {
    setWybranyTermin("");
  }
};

const nextSlide = () => {
  setCurrentIndex((prev) => (prev === JEDNA_Z_35_FOTEK.length - 1 ? 0 : prev + 1));
};

const prevSlide = () => {
  setCurrentIndex((prev) => (prev === 0 ? JEDNA_Z_35_FOTEK.length - 1 : prev - 1));
};
const handleSubmit = async (e) => {
  e.preventDefault(); // Blokujemy przeładowanie strony

  if (!dataStart || !dataEnd) {
    alert("Proszę wybrać termin w kalendarzu!");
    return;
  }

  // Pakujemy dane do formatu, który rozumie nasz plik PHP
  const daneRezerwacji = {
    imie_nazwisko: imie,
    email: email,
    telefon: telefon,
    data_przyjazdu: dataStart,
    data_wyjazdu: dataEnd,
    liczba_gosci: goscie
  };

  try {
    // Wysyłamy paczkę kurierem (fetch) pod adres lokalnego Apache
    const response = await fetch("https://chatagorska.pl/chatagorska-backend/zapisz.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(daneRezerwacji)
    });

    const rezultat = await response.json();

    if (rezultat.status === "success") {
      alert("Sukces! " + rezultat.message);
      // Opcjonalnie: czyścimy formularz po sukcesie
      setImie("");
      setEmail("");
      setTelefon("");
    } else {
      alert("Błąd: " + rezultat.message);
    }
  } catch (error) {
    console.error("Błąd wysyłania:", error);
    alert("Nie udało się połączyć z serwerem spróbój ponownie.");
  }
};
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans antialiased scroll-smooth">
      
      {/* 1. DUŻY GÓRNY PASEK (NAVBAR) */}
      <nav className="sticky top-0 z-50 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-900 px-6 py-4">
  <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
    
    {/* LEWA STRONA: LOGO + DANE MOBILNE */}
    <div className="flex flex-col items-center md:items-start gap-2 w-full md:w-auto">
      {/* LOGO */}
      <span className="text-xl font-light tracking-widest text-white uppercase">Chata Górska</span>
      
{/* SZYBKI KONTAKT DLA TELEFONÓW (ukryty na komputerach md:hidden) */}
      <div className="flex md:hidden items-center justify-between w-full text-[10px] sm:text-[11px] font-light tracking-wider text-neutral-400">
        
        {/* TELEFON MOBILNY */}
        <a href="tel:+48512294264" className="flex items-center gap-1 hover:text-amber-500 active:text-amber-400 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5 text-amber-500/70">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
          </svg>
          <span>512 294 264</span>
        </a>

        {/* EMAIL MOBILNY */}
        <a href="mailto:kontakt@chatagorska.pl" className="flex items-center gap-1 hover:text-amber-500 active:text-amber-400 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5 text-amber-500/70">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
          </svg>
          <span>kontakt@chatagorska.pl</span>
        </a>

        {/* JAK DOJECHAĆ */}
        <a href="#jak-dojechac" className="flex items-center gap-1 hover:text-amber-500 active:text-amber-400 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5 text-amber-500/70">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
          </svg>
          <span>Jak dojechać</span>
        </a>
      </div>

    </div>
    
    {/* ŚRODEK: LINKI NAWIGACJI (tylko komputery) */}
    <div className="hidden md:flex space-x-8 text-sm font-light tracking-wider text-neutral-300">
      <a href="#o-nas" className="hover:text-amber-500 transition-colors">O nas</a>
      <a href="#galeria" className="hover:text-amber-500 transition-colors">Galeria</a>
      <a href="#rezerwacja" className="hover:text-amber-500 transition-colors">Rezerwacja</a>
      <a href="#jak-dojechac" className="hover:text-amber-500 transition-colors">Jak Dojechać?</a>
    </div>

    {/* PRAWA STRONA: DANE DLA KOMPUTERÓW + PRZYCISK REZERWACJI */}
    <div className="flex items-center space-x-6 justify-between md:justify-end w-full md:w-auto border-t border-neutral-900 md:border-t-0 pt-3 md:pt-0">
      
      {/* SEKCJA KONTAKTOWA DLA KOMPUTERÓW (widoczna od dużych ekranów lg) */}
      <div className="hidden lg:flex items-center space-x-5 text-xs font-light tracking-wider text-neutral-400 border-r border-neutral-800 pr-5">
        <a href="tel:+48512294264" className="flex items-center gap-2 hover:text-amber-500 transition-colors group">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-amber-500/70 group-hover:text-amber-500 transition-colors">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
          </svg>
          <span>512 294 264</span>
        </a>

        <a href="mailto:kontakt@chatagorska.pl" className="flex items-center gap-2 hover:text-amber-500 transition-colors group">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-amber-500/70 group-hover:text-amber-500 transition-colors">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
          </svg>
          <span>kontakt@chatagorska.pl</span>
        </a>
      </div>

      {/* PRZYCISK ZAREZERWUJ (na telefonie rozciąga się lub dopasowuje elegancko) */}
      <a href="#rezerwacja" className="w-full md:w-auto text-center px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-medium tracking-wider uppercase transition-all active:scale-95 shadow-lg shadow-amber-500/10 mx-auto md:mx-0">
        Zarezerwuj
      </a>

    </div>

  </div>
</nav>

      {/* 2. WIELKIE ZDJĘCIE WIZERUNKOWE (HERO) */}
      <header className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <img 
          src="/zdjecia/zdjecie1.webp"
          alt="Chata Górska w zimie" 
          className="absolute inset-0 w-full h-full object-cover opacity-40 scale-105 transition-transform duration-1000 object-bottom"
        />
        <div className="relative z-10 text-center px-4 max-w-2xl">
          <span className="text-xs font-semibold tracking-widest text-amber-500 uppercase">Ekskluzywny wypoczynek</span>
          <h1 className="mt-3 text-5xl sm:text-6xl font-extralight tracking-tight text-white uppercase">Chata Górska</h1>
          <p className="mt-4 text-neutral-300 font-light leading-relaxed">
            Dom w górach z jacuzzi i sauną – Beskid Mały.
          </p>
          <a href="#rezerwacja" className="inline-block mt-8 px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-medium text-sm transition-all shadow-xl shadow-amber-500/10">
            Sprawdź wolne terminy
          </a>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-neutral-950 to-transparent"></div>
      </header>
    
      {/* 3. STREFA O NAS / O MIEJSCU */}

<section id="o-nas" className="py-20 px-6 max-w-6xl mx-auto flex flex-col gap-16">
  
  {/* RZĄD 1: NAGŁÓWEK, PIERWSZY OPIS (LEWO) + 2 ZDJĘCIA (PRAWO) */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
    {/* Lewa strona: Tekst */}
    <div>
      <span className="text-xs font-semibold tracking-widest text-amber-500 uppercase">Strefa Komfortu</span>
      <h2 className="mt-2 text-3xl font-light text-white tracking-tight">Oaza ciszy i luksusu</h2>
      <p className="mt-6 text-neutral-400 font-light leading-relaxed">
        Nasz obiekt położony jest w otoczeniu lasu, ciszy i górskiej natury, tworząc idealne warunki dla osób szukających komfortu z dala od zgiełku miasta.<br/><br/>Dom pomieści od 8 do 12 osób w 4 dwuosobowych sypialniach (dodatkowe miejsca noclegowe znajdują się w salonie). To doskonałe miejsce na rodzinne wyjazdy, weekendy z przyjaciółmi czy kameralne spotkania.
      </p>
    </div>
    
    {/* Prawa strona: Zdjęcia */}
    <div className="grid grid-cols-2 gap-4 items-end">
      <img src="/zdjecia/zdjeciezakrzaka.webp" alt="Zdjęcie sprzed domu" className="contrast-110 rounded-2xl border border-neutral-900 shadow-xl w-full h-80 object-cover" />
      <img src="/zdjecia/zdjeciedron.webp" alt="Widok z drona" className="contrast-110 rounded-2xl border border-neutral-900 shadow-xl w-full h-64 object-cover" />
    </div>
  </div>

  {/* RZĄD 2: ZDJĘCIA (LEWO) + DRUGI OPIS (PRAWO) */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
    {/* Opis (W kodzie jest wyżej, ale klasa "md:order-last" przesunie go na prawo na komputerze) */}
    <div className="md:order-last">
      <p className="text-neutral-400 font-light leading-relaxed">
        Do dyspozycji gości oddajemy przestronne wnętrza, w pełni wyposażoną kuchnię oraz bogatą strefę rozrywki (bilard, ping-pong, piłkarzyki).<br/> Po dniu spędzonym na szlaku możesz zrelaksować się w jacuzzi z widokiem na naturę, skorzystać z sauny lub spędzić wieczór w altanie przy grillu lub ognisku.
      </p>
    </div>
    
    {/* Zdjęcia (W kodzie są niżej, ale klasa "md:order-first" wrzuci je na lewą stronę na komputerze) */}
    <div className="grid grid-cols-2 gap-4 items-start md:order-first">
      <img src="/zdjecia/wannaokno.webp" alt="Wanna przy oknie" className="contrast-110 rounded-2xl border border-neutral-900 shadow-xl w-full h-64 object-cover" />
      <img src="/zdjecia/saunajacuzzi.webp" alt="Sauna i Jacuzzi" className="contrast-110 rounded-2xl border border-neutral-900 shadow-xl w-full h-80 object-cover" />
    </div>
  </div>

    {/* RZĄD 3: NAGŁÓWEK, TRZECI OPIS (LEWO) + 2 ZDJĘCIA (PRAWO) */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      {/* Lewa strona: Tekst */}
      <div>
        <p className="mt-6 text-neutral-400 font-light leading-relaxed">
          Okolica zachwyca spokojem i pięknymi widokami, które można podziwiać, pijąc kawę na przestronnym tarasie przy wschodzie słońca. To idealne miejsce na odpoczynek o każdej porze roku – zarówno dla miłośników aktywnego wypoczynku, jak i błogiego relaksu w górskim klimacie.<br/><br/>Położenie domu stanowi doskonałą bazę wypadową na liczne trasy piesze i rowerowe oraz wycieczki do okolicznych atrakcji, takich jak Góra Żar, Kocierz, Czarny Groń, Park Miniatur czy Energylandia. Zapraszamy do miejsca, w którym natura i cisza spotykają się z prawdziwym komfortem.
        </p>
      </div>
    
      {/* Prawa strona: Zdjęcia */}
      <div className="grid grid-cols-2 gap-4 items-end">
        <img src="/zdjecia/taraskawa.webp" alt="Kawa na tarasie" className="contrast-110 rounded-2xl border border-neutral-900 shadow-xl w-full h-80 object-cover" />
        <img src="/zdjecia/zdjecieokno.webp" alt="Zdjecie przez okno" className="contrast-110 rounded-2xl border border-neutral-900 shadow-xl w-full h-64 object-cover" />
      </div>
    </div>

        {/* RZĄD 4: sekcja jak dojechać) */}
            {/* Lewa strona: Tekst */}
<section id="jak-dojechac" className="w-full max-w-6xl mx-auto py-12 md:py-20 px-6">
  {/* Główny kontener - items-center gwarantuje pionowe wyśrodkowanie na komputerze! */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
    
    {/* Lewa strona: Tekst */}
    <div className="flex flex-col justify-center">
      <h2 className="text-xl font-semibold tracking-widest text-amber-500 uppercase">
        Jak dojechać?
      </h2>
      <p className="mt-6 text-neutral-400 font-light leading-relaxed">
        Twoja wizyta u nas zaczyna się już w drodze. Aby ułatwić Ci dojazd i oszczędzić stresu z nawigacją, przygotowaliśmy ten krótki film. Sprawdź, jak wygląda ostatni etap trasy, zrelaksuj się i jedź bezpiecznie. Czekamy na Ciebie!
      </p>
      
      {/* Przycisk do nawigacji */}
      <a 
        href="https://maps.app.goo.gl/NDC2pAE1wGR35bSf7" 
        target="_blank" 
        rel="noopener noreferrer"
        className="mt-8 px-8 py-3 bg-amber-500 hover:bg-amber-400 text-neutral-900 font-semibold rounded-xl transition-all shadow-lg hover:shadow-amber-500/20 text-center w-full md:w-max"
      >
        📍 Otwórz w Google Maps
      </a>
    </div>

    {/* Prawa strona: Wideo */}
    <div className="flex justify-center md:justify-end items-center">
      <video 
        src="dojazd.mp4" 
        controls 
        className="contrast-110 rounded-3xl border border-neutral-800 shadow-2xl w-full max-w-sm aspect-[9/16] object-cover bg-neutral-900"
      >
        Twoja przeglądarka nie obsługuje odtwarzacza wideo.
      </video>
    </div>

  </div>
</section>

</section>

      {/* 4. GALERIA */}
{/* 4. GALERIA Z OPTYMALIZACJĄ */}
<section id="galeria" className="py-20 bg-neutral-900/40 border-y border-neutral-900 px-6 overflow-hidden">
  <div className="max-w-6xl mx-auto relative">
    
    <div className="text-center mb-16">
      <span className="text-xs font-semibold tracking-widest text-amber-500 uppercase">Galeria zdjęć</span>
      <h2 className="mt-2 text-3xl font-light text-white tracking-tight">Zobacz naszą przestrzeń</h2>
    </div>

    {/* KONTENER KARUZELI Z OBSŁUGĄ GESTÓW DOTYKOWYCH */}
    <div 
      className="flex items-center justify-center gap-4 sm:gap-8 min-h-[350px] relative px-12 select-none"
      onTouchStart={(e) => setTouchStartX(e.targetTouches[0].clientX)}
      onTouchMove={(e) => setTouchEndX(e.targetTouches[0].clientX)}
      onTouchEnd={() => {
        if (!touchStartX || !touchEndX) return;
        const distance = touchStartX - touchEndX;
        const isLeftSwipe = distance > 50;  // Przesunięcie palcem w lewo (następne)
        const isRightSwipe = distance < -50; // Przesunięcie palcem w prawo (poprzednie)

        if (isLeftSwipe) nextSlide();
        if (isRightSwipe) prevSlide();

        // Resetowanie wartości po zakończeniu gestu
        setTouchStartX(0);
        setTouchEndX(0);
      }}
    >
      
      {/* STRZAŁKA W LEWO */}
      <button 
        onClick={prevSlide}
        className="absolute left-0 z-30 p-3 rounded-full bg-neutral-900/80 border border-neutral-800 text-white hover:text-amber-500 hover:bg-neutral-800 transition-all active:scale-95"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      {/* TRZY FILARY KARUZELI */}
      {[-1, 0, 1].map((offset) => {
        let index = currentIndex + offset;
        if (index < 0) index = JEDNA_Z_35_FOTEK.length - 1;
        if (index >= JEDNA_Z_35_FOTEK.length) index = 0;

        const isCenter = offset === 0;

        return (
          <div 
            key={offset}
            className={`transition-all duration-500 ease-in-out transform flex-1 h-64 sm:h-80 md:h-[400px] 
              ${isCenter ? 'scale-105 z-20 opacity-100' : 'scale-90 z-10 opacity-45 hidden sm:block'}
            `}
          >
            <img 
              src={JEDNA_Z_35_FOTEK[index]} 
              alt={opisySEO[index + 1] || `Ekskluzywna Chata Górska - zdjęcie nr ${index + 1}`} 
              className="w-full h-full object-cover rounded-2xl"
              loading="lazy" 
              draggable="false" 
            />
          </div>
        );
      })}

      {/* STRZAŁKA W PRAWO */}
      <button 
        onClick={nextSlide}
        className="absolute right-0 z-30 p-3 rounded-full bg-neutral-900/80 border border-neutral-800 text-white hover:text-amber-500 hover:bg-neutral-800 transition-all active:scale-95"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>

    </div>

    {/* LICZNIK ZDJĘĆ PREMIUM */}
    <div className="text-center mt-8 text-xs font-light tracking-widest text-neutral-500">
      <span className="text-neutral-300">{currentIndex + 1}</span> / {JEDNA_Z_35_FOTEK.length}
    </div>

  </div>
</section>

{/* 5. STREFA REZERWACJI I KONTAKTU */}
      <section id="rezerwacja" className="py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold tracking-widest text-amber-500 uppercase">Rezerwacja Online</span>
          <h2 className="mt-2 text-3xl font-light text-white tracking-tight">Zaplanuj swój pobyt</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Formularz */}
          <div className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl">
            <h3 className="text-xl font-light text-white mb-4">Dane rezerwacji</h3>
          <form className="space-y-4" onSubmit={handleSubmit}>
  
          {/* 1. Termin */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">Wybrany termin</label>
              <input type="text" readOnly value={wybranyTermin} placeholder="Kliknij dzień przyjazdu i wyjazdu w kalendarzu" className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-amber-500 font-medium focus:outline-none" />
          </div>

          {/* 2. Imię i nazwisko */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">Imię i Nazwisko</label>
            <input type="text" required value={imie} onChange={(e) => setImie(e.target.value)} placeholder="Jan Kowalski" className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-amber-500 focus:outline-none" />
          </div>

          {/* 3. Adres E-mail */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">Adres E-mail</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="jan@kowalski.pl" className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-amber-500 focus:outline-none" />
          </div>

          {/* 4. Numer telefonu */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">Numer telefonu</label>
            <input type="tel" required value={telefon} onChange={(e) => setTelefon(e.target.value)} placeholder="+48 123 456 789" className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-amber-500 focus:outline-none" />
          </div>

          {/* 5. Liczba gości */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1">Liczba gości</label>
              <div className="relative">
                <select value={goscie} onChange={(e) => setGoscie(e.target.value)} className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:border-amber-500 focus:outline-none appearance-none cursor-pointer">
                  <option value="1">1 osoba</option>
                  <option value="2">2 osoby</option>
                  <option value="4">4 osoby</option>
                  <option value="6">6 osób</option>
                  <option value="8">+8 osób</option>
                </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-neutral-500">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
              </div>
          </div>

          <button type="submit" className="w-full mt-4 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-medium text-sm transition-all shadow-lg uppercase tracking-wider">
            Zapytaj o rezerwację
          </button>

</form>
          </div>

          {/* Kalendarz (Zajmuje 2 kolumny po prawej stronie na dużych ekranach) */}
          <div className="lg:col-span-2">
            <BookingCalendar onDatesChange={handleDatesChange} />
          </div>
        </div>
        
      </section>

{/* FOOTER / KONTAKT */}
    <footer className="py-8 text-center text-neutral-500 text-xs border-t border-neutral-900 bg-neutral-950">
    
      <p>&copy; 2026 Chata Górska. Wszelkie prawa zastrzeżone.</p>
      
      <div className="mt-3 space-x-4">
        <a href="/Regulamin_Obiektu.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-amber-500 transition-colors">
          Regulamin obiektu
        </a>
        <span className="text-neutral-700">|</span>
        <a href="/Polityka_Prywatnosci.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-amber-500 transition-colors">
          Polityka prywatności
        </a>
      </div>

      <div className="mt-4 space-y-1 text-neutral-400">
        <p>Kontakt: kontakt@chatagorska.pl | +48 512 294 264</p>
        <p>Adres: 43-353 Porąbka, ul. Poprzeczna 6</p>
      </div>
    </footer>
    </div>
  );
}

export default App;