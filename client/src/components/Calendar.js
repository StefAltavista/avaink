import React, { useState, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
// import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useSelector } from "react-redux";

import ModalBook from "./ModalBook";

export default function Calendar() {
    const access = useSelector((state) => state.admin.access);
    const availabilities = useSelector((state) => state.content.calendar);
    const [myCalendar, setMyCalendar] = useState(availabilities);

    const [multipleSelection, setMultipleSelection] = useState();
    const [selectedDate, setSelectedDate] = useState(null);

    const cal = useRef();
    const available = (start, end) => {
        return {
            id: "Available",
            start,
            end,
            backgroundColor: "LightGreen",
            display: "background",
            selectable: true,
        };
    };

    const unavailable = (start, end) => {
        return {
            id: "Not Available",
            start,
            end,
            backgroundColor: "Red",
            display: "background",
            selectable: false,
        };
    };

    const setAvailable = () => {
        let event = available(multipleSelection.start, multipleSelection.end);
        console.log(event);
        setMyCalendar([...myCalendar, event]);
        console.log("myC", myCalendar);
        console.log("api", cal.current.getApi());
    };

    // let Calendario = new Calendar(cal, {
    //     plugins: [dayGridPlugin, interactionPlugin],
    //     events: myCalendar,
    //     selectable: true,
    //     dateClick: (e) => {
    //         setSelectedDate(e);
    //         console.log(myCalendar);
    //     },
    //     select: (e) => setMultipleSelection(e),
    // });
    return (
        <div id="calendar">
            <FullCalendar
                ref={cal}
                plugins={[dayGridPlugin, interactionPlugin]}
                events={myCalendar}
                selectable={true}
                dateClick={(e) => {
                    setSelectedDate(e);
                    console.log(myCalendar);
                }}
                select={(e) => setMultipleSelection(e)}
            ></FullCalendar>

            {selectedDate && !access && (
                <ModalBook selected={selectedDate}></ModalBook>
            )}
            {access && (
                <div>
                    <button onClick={setAvailable}>Set Available</button>
                    <button>Set Not Available</button>
                    <button>Save</button>
                </div>
            )}
        </div>
    );
}
