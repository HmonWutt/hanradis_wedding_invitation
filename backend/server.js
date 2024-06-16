import { usernamePassword } from "./doNotPushToGithub";
const express = require("express");
const nodemailer = require("nodemailer");

const app = express();

app.use(express.json());

var cors = require("cors");
const { usernamePassword } = require("./doNotPushToGithub");

app.use(cors());
const port = 7000;
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("wedding_invitation.sql");

app.get("/getall", (req, res) => {
  db.all("SELECT * FROM guest_list;", (err, rows) => {
    res.json({ guests: rows });
  });
});

app.post("/post", (req, res) => {
  let { firstname, lastname, email, attendance, plusone } = req.body;
  const attendance_num = Number(attendance);
  const plusone_num = Number(plusone);

  db.run(
    "INSERT INTO guest_list (firstname, lastname, email, coming, plusone) VALUES (?, ?, ?, ?, ?)",
    [firstname, lastname, email, attendance_num, plusone_num],
    (err) => {
      if (err) {
        console.error(err.message);
        res.status(500).send("Insert into database failed");
      } else {
        res.status(200).send("Success!");
      }
    }
  );
});

app.delete("/deleteAll", (req, res) => {
  db.run("DELETE FROM guest_list", function (err) {
    if (err) {
      console.error(err.message);
      return res.status(500).send(err.message);
    } else {
      return res.status(200).send("All entries deleted successfully");
    }
  });
});
app.get("/sendMail", (req, res) => {
  db.all("SELECT * FROM guest_list;", (err, rows) => {
    if (err) {
      res.status(500).send("Retrival from database failed");
    } else {
      res.status(200).send("Success!");

      const html = generateTable(rows);
      const mailOptions = {
        from: "wtthumon@gmail.com",
        //cc: "wtthumon@gmail.com",
        //to: "hanradi91@gmail.com",
        to: "wtthumon@gmail.com",
        subject: "Guest List Update Notification",
        html: html,
      };
      sendEmail(mailOptions);
    }
  });
});

function sendEmail(mailOptions) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: usernamePassword.user,
      pass: usernamePassword.pass,
    },
  });
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error.message);

      //res.status(500).send("Failed to send email");
      return "error";
    } else {
      console.log("Email sent: " + info.response);
      return "success";

      //return res.status(205).send("Update successful and email sent");
    }
  });
}

function generateTable(data) {
  let totalAttendees = 0;
  let rows = data
    .map((guest) => {
      const totalOfThisGuest = guest.coming + guest.plusone;
      totalAttendees += totalOfThisGuest;

      return `
      <tr>
        <td style="border: 1px solid black;">${guest.firstname}</td>
        <td style="border: 1px solid black;">${guest.lastname}</td>
        <td style="border: 1px solid black;">${guest.email}</td>
        <td style="border: 1px solid black;">${guest.coming}</td>
        <td style="border: 1px solid black;">${guest.plusone}</td>
      </tr>
    `;
    })
    .join("");

  return `
  <h3>Total attandees: ${totalAttendees}</h3>
    <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%;">
      <thead>
        <tr style="background-color: #f2f2f2;">
          <th style="border: 1px solid black;">First Name</th>
          <th style="border: 1px solid black;">Last Name</th>
          <th style="border: 1px solid black;">Email</th>
          <th style="border: 1px solid black;">Attendance</th>
          <th style="border: 1px solid black;">Plus One</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>

  `;
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
