import React from "react";

const week = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
};
export default function ModalBook({ selected }) {
    const day = week[selected.date.getDay()];
    return (
        <div id="modalBook">
            <p>Please write me a message with your desired Timeframe</p>
            <p>{day}</p>
            <p>{selected.date.toString().substring(3, 10)}</p>
            <p>Write Message</p>
            <textarea></textarea>
            <button>Book</button>
        </div>
    );
}
