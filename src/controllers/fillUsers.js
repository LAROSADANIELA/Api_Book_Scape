const axios = require("axios");

const users = [
  {
    username: "ejemplo1",
    email: "ejemplo1@example.com",
    admin: false,
    born_date: "1990-01-01",
    active: true,
    password: "ejemplo1pass",
  },
  {
    username: "ejemplo2",
    email: "ejemplo2@example.com",
    admin: true,
    born_date: "1995-05-10",
    active: false,
    password: "ejemplo2pass",
  },
  {
    username: "ejemplo3",
    email: "ejemplo3@example.com",
    admin: false,
    born_date: "1988-12-25",
    active: true,
    password: "ejemplo3pass",
  },
  {
    username: "ejemplo4",
    email: "ejemplo4@example.com",
    admin: true,
    born_date: "1992-07-15",
    active: false,
    password: "ejemplo4pass",
  },
  {
    username: "ejemplo5",
    email: "ejemplo5@example.com",
    admin: false,
    born_date: "1999-03-20",
    active: true,
    password: "ejemplo5pass",
  },
  {
    username: "ejemplo6",
    email: "ejemplo6@example.com",
    admin: true,
    born_date: "1993-11-08",
    active: false,
    password: "ejemplo6pass",
  },
  {
    username: "ejemplo7",
    email: "ejemplo7@example.com",
    admin: false,
    born_date: "1997-09-05",
    active: true,
    password: "ejemplo7pass",
  },
  {
    username: "ejemplo8",
    email: "ejemplo8@example.com",
    admin: true,
    born_date: "1996-04-12",
    active: false,
    password: "ejemplo8pass",
  },
  {
    username: "ejemplo9",
    email: "ejemplo9@example.com",
    admin: false,
    born_date: "1994-02-28",
    active: true,
    password: "ejemplo9pass",
  },
];
const fillUsers =async () => {
    for(const user of users){
      console.log("se intento crear user: ",user);
      await axios.post("http://localhost:3001/users/", user);
    }
  
}

module.exports = fillUsers;
