import React, { useEffect, useState } from "react";
import Calendar from "./Calendar";
import { useSelector } from "react-redux";
import ModalBook from "./ModalBook";
export default function Book() {
    const access = useSelector((state) => state.admin.access);
    const availabilities = useSelector((state) => state.content.calendar);
    const [myCalendar, setMyCalendar] = useState(availabilities);
    const [multipleSelection, setMultipleSelection] = useState();
    const [selectedDate, setSelectedDate] = useState(null);

    const setAvailable = () => {
        console.log(multipleSelection);
        let events = [
            ...myCalendar,
            available(multipleSelection.startStr, multipleSelection.endStr),
        ];
        setMyCalendar(events);
    };

    const setUnavailable = () => {
        console.log(multipleSelection);
        let events = [
            ...myCalendar,
            unavailable(multipleSelection.startStr, multipleSelection.endStr),
        ];
        setMyCalendar(events);
    };
    useEffect(() => {
        console.log(myCalendar);
    }, [myCalendar]);
    return (
        <>
            <h1>Book an appointment</h1>
            <Calendar
                multiple={(e) => setMultipleSelection(e)}
                single={(e) => setSelectedDate(e)}
                availabilities={myCalendar}
            />
            {selectedDate && !access && <ModalBook selected={selectedDate} />}
            {access && (
                <div>
                    <button
                        onClick={() => {
                            setAvailable();
                        }}
                    >
                        Set Available
                    </button>
                    <button onClick={() => setUnavailable()}>
                        Set Not Available
                    </button>
                    <button>Save</button>
                </div>
            )}
        </>
    );
}

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
