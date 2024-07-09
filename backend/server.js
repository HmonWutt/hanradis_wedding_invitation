const express = require("express");
const nodemailer = require("nodemailer");
const { usernamePassword } = require("./doNotPushToGithub");
const app = express();

app.use(express.json());

var cors = require("cors");

app.use(cors());
const port = 7000;
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("wedding_invitation.sql");

app.get("/getall", (req, res) => {
  db.all("SELECT * FROM guest_list;", (err, rows) => {
    res.json({ guests: rows });
  });
});

function emailer() {
  db.all("SELECT * FROM guest_list;", (err, rows) => {
    if (err) {
      console.log("Retrieval from database failed.");
    } else {
      //res.status(200).send("Success!");

      const html = generateTable(rows);
      const mailOptions = {
        from: "wtthumon@gmail.com",
        to: ["hanradi91@gmail.com", "horace58@ymail.com"],
        subject: "Guest List Update Notification",
        html: html,
      };
      sendEmail(mailOptions);
    }
  });
}

let firstname, lastname, email;
app.post("/post", (req, res) => {
  firstname = req.body.firstname;
  lastname = req.body.lastname;
  email = req.body.email;

  const attendance_num = Number(req.body.attendance);
  const babychair_num = Number(req.body.babychair);

  db.run(
    "INSERT INTO guest_list (firstname, lastname, email, coming, babychair) VALUES (?, ?, ?, ?,?)",
    [firstname, lastname, email, attendance_num, babychair_num],
    (err, _) => {
      if (err) {
        res.status(500).send("Insert into database failed");
        //res.status(500).redirect("/error");
      } else {
        emailer();
        res.status(200).send("Success");
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

app.delete("/deleteOne", (req, res) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  db.run(
    `DELETE FROM guest_list WHERE firstname="${firstname}" AND lastname="${lastname}"`,
    function (err, rows) {
      if (err) {
        console.error(err.message);
        return res.status(500).send(err.message);
      } else {
        return res.status(200).send("Deleted entry successfully.");
      }
    }
  );
});

app.get("/sendMail", (req, res) => {
  let count = 0;
  db.all("SELECT * FROM guest_list;", (err, rows) => {
    if (err) {
      console.log("Retrieval from database failed.");
    } else {
      //res.status(200).send("Success!");
      const html = generateTable(rows);
      const mailOptions = {
        from: "wtthumon@gmail.com",
        to: "wtthumon@gmail.com",
        subject: "Guest List Update Notification",
        html: html,
      };
      sendEmail(mailOptions);
    }
  });
});

app.get("/download", (req, res) => {
  db.all("SELECT * FROM guest_list;", (err, rows) => {
    if (err) {
      setTimeout(() => {
        db.all("SELECT * FROM guest_list;", (err, rows) => {
          if (err) {
            res.status(500).send("Retrival from database failed");
          } else {
            res.setHeader("Content-Type", "text/csv");
            res.setHeader(
              "Content-Disposition",
              "attachment; filename=guestlist.csv"
            );
            res.send(generateCSV(rows));
          }
        });
      }, 2000);
    } else {
      res.setHeader("Content-Type", "text/csv");
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=guestlist.csv"
      );
      res.send(generateCSV(rows));
    }
  });
});

app.get("/postSuccess", (req, res) => {
  db.all("SELECT * FROM guest_list;", (err, rows) => {
    let isExists = false;
    if (err) {
      console.log("Post update failed");
    } else {
      const guests = rows;
      for (let guest of guests) {
        if (
          guest.firstname == firstname &&
          guest.lastname == lastname &&
          guest.email == email
        ) {
          isExists = true;
          break;
        }
      }

      isExists = false;
      console.log("isExists", isExists);
      if (isExists == true) {
        console.log("success");
        const html = generateTable(guests);
        const mailOptions = {
          from: "wtthumon@gmail.com",
          to: "wtthumon@gmail.com",
          subject: "Guest List Update Notification",
          html: html,
        };
        sendEmail(mailOptions);
        res.send("Post update success");
      }
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

function generateCSV(data) {
  let csv = "";
  data.map((guest) => {
    const gueststring = Object.values(guest).join(",") + "\n";
    csv += gueststring;
  });
  //const headings = Object.keys(data[0]).join(",")
  return (
    "First name, Last name, Email, Attandence (0=No 1=Yes), Baby chair \n" + csv
  );
}
function generateTable(data) {
  let totalAttendees = 0;
  let totalBabychair = 0;
  let rows = data
    .map((guest) => {
      const totalOfThisGuest = guest.coming; //+ guest.plusone;

      totalAttendees += totalOfThisGuest;
      totalBabychair += guest.babychair;

      return `
      <tr>
        <td style="border: 1px solid black;">${guest.firstname}</td>
        <td style="border: 1px solid black;">${guest.lastname}</td>
        <td style="border: 1px solid black;">${guest.email}</td>
        <td style="border: 1px solid black;">${guest.coming}</td>
         <td style="border: 1px solid black;">${guest.babychair}</td>
      </tr>
    `;
    })
    .join("");

  return `
  <h3>Total attandees: ${totalAttendees}</h3>
  <h3>Total babychairs: ${totalBabychair}</h3>
    <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%;">
      <thead>
        <tr style="background-color: #f2f2f2;">
          <th style="border: 1px solid black;">First Name</th>
          <th style="border: 1px solid black;">Last Name</th>
          <th style="border: 1px solid black;">Email</th>
          <th style="border: 1px solid black;">Attendance</th>
          <th style="border: 1px solid black;">Baby chair</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
    <a href="https://horaceandradibecome.one/weddingbackend/download" download="guestlist.csv" >Download guest list as a .csv file</a>
  <h3>For the excel sheet (.csv file), "0" means "No", "1" means "Yes"</h3>

  `;
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
