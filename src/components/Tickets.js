import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeTicket, updateTicket } from "../reduxtk/ticketSlice";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import AddTicket from "./AddTicket";
import UpdateTicket from "./UpdateTicket";

function Tickets() {
  const [ticketId, setTicketId] = useState("");
  const [filterValue, setFilterValue] = useState("todo");
  const [updateComponent, setUpdateComponent] = useState("");
  var tickets = useSelector((state) => state.tickets);
  const [finalTickets, setFinalTickets] = useState([]);
  const statusList = ["all", "todo", "inprogress", "complete"];
  useEffect(() => {
    setFinalTickets(tickets);
  }, [tickets]);
  localStorage.setItem("storedTickets", JSON.stringify(tickets));
  useEffect(() => {
    setFinalTickets(JSON.parse(localStorage.getItem("storedTickets")));
  }, []);
  const dispatch = useDispatch();
  const filterByStatus = () => {
    if (filterValue == "all") {
      setFinalTickets(tickets);
      return;
    }
    const ticketsByStatus = tickets.filter((t) => {
      return t.status === filterValue;
    });
    setFinalTickets(ticketsByStatus == undefined ? tickets : ticketsByStatus);
  };
  const filterBySearch = () => {
    if (filterValue.length === 0) {
      setFinalTickets(tickets);
      return;
    }
    const ticketsBySearch = tickets.filter((t) => {
      return (
        t.title.split(" ").includes(filterValue) ||
        t.title === filterValue ||
        t.desc.split(" ").includes(filterValue) ||
        t.desc === filterValue
      );
    });
    setFinalTickets(ticketsBySearch != undefined ? ticketsBySearch : tickets);
  };
  useEffect(() => {
    statusList.includes(filterValue) ? filterByStatus() : filterBySearch();
  }, [filterValue]);
  useEffect(() => {
    setUpdateComponent(<UpdateTicket ticketId={ticketId} />);
  }, [ticketId]);
  return (
    <>
      <div className="filter-section">
        <input
          type="text"
          placeholder="search here..."
          onChange={(e) => setFilterValue(e.target.value)}
        />
        <select
          name="status"
          id="status"
          onChange={(e) => setFilterValue(e.target.value)}
        >
          <option value="all">All</option>
          <option value="todo">Todo</option>
          <option value="inprogress">In Progress</option>
          <option value="complete">Completed</option>
        </select>
      </div>
      <div className="tasks-section">
        <div className="todo-section">
          <div className="card-head">
            <span>Tickets</span>
          </div>
          {finalTickets &&
            finalTickets.map((ticket) => (
              <div className="task-card">
                <div className="task-line">
                  <div className="task-title">
                    <div className={ticket.status}></div>
                    <span>{ticket.title}</span>
                  </div>
                  <div className="task-status-show">
                    <span>Status : {ticket.status.toUpperCase()}</span>
                  </div>
                </div>
                <div className="desc-line">
                  <span>{ticket.desc}</span>
                </div>

                <div className="task-extra">
                  <div className="left-extra">
                    <div className="task-date" title="Due Date">
                      <i className="fa fa-bell-o" aria-hidden="true"></i>
                      <span>{ticket.dueDate}</span>
                    </div>
                    <div
                      className="task-delete"
                      title="Delete Task"
                      onClick={() => dispatch(removeTicket(ticket.id))}
                    >
                      <i className="fa fa-trash" aria-hidden="true"></i>
                    </div>
                    <div
                      className="task-edit"
                      title="Edit Task"
                      data-toggle="modal"
                      data-target="#myEditModal"
                      onClick={() => setTicketId(ticket.id)}
                    >
                      <i className="fa fa-edit" aria-hidden="true"></i>
                      <span>Edit</span>
                    </div>
                  </div>
                  <div className="right-extra">
                    <div
                      className="to-progress"
                      title="Move to InProgress"
                      onClick={() =>
                        dispatch(
                          updateTicket({
                            id: ticket.id,
                            status: "inprogress",
                          })
                        )
                      }
                    >
                      <i className="fa fa-forward" aria-hidden="true"></i>
                    </div>
                    <div
                      className="to-complete"
                      title="Move to Complete"
                      onClick={() =>
                        dispatch(
                          updateTicket({
                            id: ticket.id,
                            status: "complete",
                            title: ticket.title,
                          })
                        )
                      }
                    >
                      <i className="fa fa-forward" aria-hidden="true"></i>
                    </div>
                    <div
                      className="to-todo"
                      title="Move to Todo"
                      onClick={() =>
                        dispatch(
                          updateTicket({
                            id: ticket.id,
                            status: "todo",
                            title: ticket.title,
                          })
                        )
                      }
                    >
                      <i className="fa fa-refresh" aria-hidden="true"></i>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div
        className="floating-button"
        data-toggle="modal"
        data-target="#myModal"
      >
        <Link to="#" className="float" title="Add New Ticket">
          <i className="fa fa-plus my-float"></i>
        </Link>
      </div>
      <div className="modal fade" id="myModal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Add Task Details</h4>
              <button
                type="button"
                className="close"
                id="close"
                data-dismiss="modal"
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="form-fields">
                <AddTicket />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="myEditModal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Update Task Details</h4>
              <button
                type="button"
                className="close"
                id="closeEdit"
                data-dismiss="modal"
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="form-fields">{updateComponent}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Tickets;
