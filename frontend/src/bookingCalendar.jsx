import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

function BookingCalendar({ onDatesChange }) {
  const [rangeStart, setRangeStart] = useState(null);
  const [rangeEnd, setRangeEnd] = useState(null);
  
  // Stan na rezerwacje wyciągnięte z bazy danych
  const [bookedDates, setBookedDates] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- POBIERANIE REZERWACJI Z BAZY (API) ---
  useEffect(() => {
    // Podmień ten adres URL na Twój realny ścieżkę do pliku PHP na serwerze (np. https://chatagorska.pl/api/get_bookings.php)
    fetch("https://chatagorska.pl/chatagorska-backend/get_bookings.php") 
      .then((response) => response.json())
      .then((data) => {
        // Mapujemy dane z bazy, aby pasowały do formatu FullCalendar
        const formattedBookings = data.map((booking) => ({
          title: "Zajęte",
          start: booking.data_przyjazdu, // upewnij się, że kolumna w bazie/JSON-ie nazywa się tak samo
          end: booking.data_wyjazdu,   // upewnij się, czy to data_do czy np. data_konca
          backgroundColor: "#ef4444",
          borderColor: "#ef4444",
          allDay: true,
          display: "background", // Blokuje możliwość kliknięcia tych dni
        }));
        setBookedDates(formattedBookings);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Błąd pobierania rezerwacji:", error);
        setLoading(false);
      });
  }, []);


  const handleDateClick = (info) => {
    const clickedDateStr = info.dateStr;

    if (!rangeStart || (rangeStart && rangeEnd)) {
      setRangeStart(clickedDateStr);
      setRangeEnd(null);
      if (onDatesChange) onDatesChange(clickedDateStr, "");
    } else if (rangeStart && !rangeEnd) {
      if (clickedDateStr < rangeStart) {
        setRangeStart(clickedDateStr);
        if (onDatesChange) onDatesChange(clickedDateStr, "");
      } else {
        setRangeEnd(clickedDateStr);
        if (onDatesChange) onDatesChange(rangeStart, clickedDateStr);
      }
    }
  };

  // Łączymy rezerwacje z bazy z tym, co użytkownik klika w tym momencie
  const getEvents = () => {
    const events = [...bookedDates]; // wrzucamy tu wszystkie zajęte terminy pobrane z bazy

    // Jeśli użytkownik zaznacza swój przedział, dorzucamy go jako podświetlenie na złoto
    if (rangeStart) {
      events.push({
        id: "user-selection",
        title: rangeEnd ? "Twój pobyt" : "Wybierz datę wyjazdu",
        start: rangeStart,
        end: rangeEnd ? new Date(new Date(rangeEnd).getTime() + 86400000).toISOString().split("T")[0] : rangeStart,
        backgroundColor: "#f59e0b",
        borderColor: "#f59e0b",
        allDay: true,
      });
    }

    return events;
  };

  if (loading) {
    return <div className="text-center text-neutral-400 py-6">Ładowanie kalendarza rezerwacji...</div>;
  }

  return (
    <div className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl text-neutral-200">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next",
          center: "title",
          right: "",
        }}
        locale="pl"
        firstDay={1}
        selectable={false}
        dateClick={handleDateClick}
        events={getEvents()}
        height="auto"
      />
    </div>
  );
}

export default BookingCalendar;

