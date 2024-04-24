import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTicket } from "../reduxtk/ticketSlice";

function UpdateTicket({ ticketId }) {
  let [title, setTitle] = useState("");
  let [desc, setDesc] = useState("");
  let [dueDate, setDueDate] = useState("");
  let [selectedDate, setSelectedDate] = useState(null);
  const [status, setStatus] = useState("todo");
  const dispatch = useDispatch();
  const tickets = useSelector((state) => state.tickets);
  useEffect(() => {
    const ticketData = tickets.filter((t) => {
      return t.id === ticketId;
    });
    ticketData.map((d) => {
      setTitle(d.title);
      setDesc(d.desc);
      setDueDate(d.dueDate);
      setStatus(d.status);
      return;
    });
  }, [ticketId]);
  const updateTicketHandler = (e) => {
    e.preventDefault();
    const data = {
      id: ticketId,
      title: title,
      desc: desc,
      selectedDate: selectedDate,
      status: status,
    };
    title && dispatch(updateTicket(data));
    document.getElementById("closeEdit").click();
  };

  return (
    <>
      <form onSubmit={(e) => updateTicketHandler(e)}>
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
        <input type="text" value={dueDate} readOnly="true" />
        <button className="primary-button" type="submit">
          Update Ticket
        </button>
      </form>
    </>
  );
}

export default UpdateTicket;
