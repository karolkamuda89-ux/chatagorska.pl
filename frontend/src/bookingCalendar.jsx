import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

function BookingCalendar({ onDatesChange }) {
  const [rangeStart, setRangeStart] = useState(null);
  const [rangeEnd, setRangeEnd] = useState(null);

  // Funkcja obsługująca logikę dwóch kliknięć (Przyjazd -> Wyjazd)
  const handleDateClick = (info) => {
    const clickedDateStr = info.dateStr;

    if (!rangeStart || (rangeStart && rangeEnd)) {
      // Pierwsze kliknięcie (lub reset po pełnym wyborze)
      setRangeStart(clickedDateStr);
      setRangeEnd(null);
      if (onDatesChange) onDatesChange(clickedDateStr, "");
    } else if (rangeStart && !rangeEnd) {
      // Drugie kliknięcie
      if (clickedDateStr < rangeStart) {
        // Jeśli użytkownik kliknął datę wcześniejszą niż start, ustawiamy ją jako nowy start
        setRangeStart(clickedDateStr);
        if (onDatesChange) onDatesChange(clickedDateStr, "");
      } else {
        // Prawidłowy wybór zakresu
        setRangeEnd(clickedDateStr);
        if (onDatesChange) onDatesChange(rangeStart, clickedDateStr);
      }
    }
  };

  // Generujemy w locie podświetlenie wybranego przedziału jako "wydarzenie", żeby użytkownik widział co zaznaczył
  const getEvents = () => {
    const events = [
      // Twoje stałe rezerwacje (Mock Data)
      {
        title: 'Zajęte',
        start: '2026-07-10',
        end: '2026-07-13',
        backgroundColor: '#ef4444',
        borderColor: '#ef4444',
        allDay: true,
        display: 'background' // Blokuje klikalność
      }
    ];

    // Jeśli użytkownik zaznacza przedział, dodajemy go jako tymczasowe podświetlenie na złoto/bursztynowo
    if (rangeStart) {
      events.push({
        id: 'user-selection',
        title: rangeEnd ? 'Twój pobyt' : 'Wybierz datę wyjazdu',
        start: rangeStart,
        // FullCalendar potrzebuje daty +1 dzień dla poprawnego wyświetlenia końca przedziału całodniowego
        end: rangeEnd ? new Date(new Date(rangeEnd).getTime() + 86400000).toISOString().split('T')[0] : rangeStart,
        backgroundColor: '#f59e0b',
        borderColor: '#f59e0b',
        allDay: true
      });
    }

    return events;
  };

  return (
    <div className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl text-neutral-200">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth" 
        headerToolbar={{
          left: 'prev,next',
          center: 'title',
          right: ''
        }}
        locale="pl"
        firstDay={1}
        selectable={false} // Wyłączamy przeciąganie!
        dateClick={handleDateClick} // Włączamy własną logikę kliknięć
        events={getEvents()}
        height="auto"
      />
    </div>
  );
}

export default BookingCalendar;

