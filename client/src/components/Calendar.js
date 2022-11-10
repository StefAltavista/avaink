import React, { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

export default function Calendar({ availabilities, single, multiple }) {
    useEffect(() => {
        console.log("change", availabilities);
    }, [availabilities]);
    return (
        <div id="calendar">
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                events={availabilities}
                selectable={true}
                dateClick={(e) => single(e)}
                select={(e) => multiple(e)}
            ></FullCalendar>
        </div>
    );
}
