import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTicket } from "../reduxtk/ticketSlice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AddTicket() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  let [selectedDate, setSelectedDate] = useState(null);
  const [status, setStatus] = useState("todo");
  const dispatch = useDispatch();

  const addTicketHandler = (e) => {
    function convertDate(inputFormat) {
      function pad(s) {
        return s < 10 ? "0" + s : s;
      }
      var d = new Date(inputFormat);
      return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join(
        "/"
      );
    }
    selectedDate = selectedDate != null ? convertDate(selectedDate) : "";
    e.preventDefault();
    const data = {
      title: title,
      desc: desc,
      selectedDate: selectedDate,
      status: status,
    };
    title && dispatch(addTicket(data));
    setTitle("");
    setDesc("");
    setSelectedDate(null);
    document.getElementById("close").click();
  };
  return (
    <form onSubmit={addTicketHandler}>
      <input
        type="text"
        placeholder="Ticket Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Ticket Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <DatePicker
        selected={selectedDate}
        placeholderText="Select Due Date"
        onChange={(date) => setSelectedDate(date)}
        dateFormat="dd/MM/yyyy"
        isClearable
        showYearDropdown
        showMonthDropdown
      />
      <button className="primary-button" type="submit">
        Add Ticket
      </button>
    </form>
  );
}

export default AddTicket;
