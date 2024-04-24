import { createSlice, nanoid } from "@reduxjs/toolkit";

export const ticketSlice = createSlice({
  name: "ticket",
  initialState: {
    tickets: [],
    loginStatus: false,
  },
  reducers: {
    addTicket: (state, action) => {
      const ticket = {
        id: nanoid(),
        title: action.payload.title,
        desc: action.payload.desc,
        dueDate: action.payload.selectedDate,
        status: action.payload.status,
      };
      state.tickets.push(ticket);
    },
    removeTicket: (state, action) => {
      state.tickets = state.tickets.filter(
        (ticket) => ticket.id !== action.payload
      );
    },
    updateTicket: (state, action) => {
      state.tickets = state.tickets.map((obj) => {
        return obj.id === action.payload.id
          ? {
              ...obj,
              title:
                action.payload.title !== undefined
                  ? action.payload.title
                  : obj.title,
              status:
                action.payload.status !== undefined
                  ? action.payload.status
                  : obj.status,
              desc:
                action.payload.desc !== undefined
                  ? action.payload.desc
                  : obj.desc,
            }
          : obj;
      });
    },
    updateLoginStatus: (state, action) => {
      state.loginStatus = action.payload;
    },
  },
});

export const { addTicket, removeTicket, updateTicket, updateLoginStatus } =
  ticketSlice.actions;

export default ticketSlice.reducer;
