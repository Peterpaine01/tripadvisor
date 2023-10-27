require("dotenv").config();
const express = require("express");
const cors = require("cors");

// Mailgun
const Mailgun = require("mailgun.js");
const formData = require("form-data");
const exp = require("constants");

const app = express();
app.use(express.json());
app.use(cors());

// création du client mailgun
const mailgun = new Mailgun(formData);
const client = mailgun.client({
  // Le nom qu'on veut
  username: "CARL",
  key: process.env.MAILGUN_API_KEY,
});

app.get("/", (req, res) => {
  console.log("route /");

  res.status(200).json({
    message: "Welcome",
  });
});

app.post("/post", async (req, res) => {
  console.log("route form test");

  //   console.log(process.env.MAILGUN_API_KEY);
  //   console.log(req.body);

  //   -- Destructuration du body
  const { firstname, lastname, email, message } = req.body;
  console.log(req.body);

  //   -- création du message
  const messageData = {
    from: `${firstname} ${lastname} <${email}>`,
    // -- Dois être l'un des emails valider de votre sandbox
    to: "facarlier@gmail.com",
    subject: "Hello",
    text: message,
  };

  //   -- Avec la syntaxe async/await et try/catch
  try {
    const response = await client.messages.create(
      process.env.MAILGUN_DOMAIN,
      messageData
    );

    console.log(response);

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
  }

  //   -- Avec la syntaxe de la doc Mailgun
  //   client.messages
  //     .create(process.env.MAILGUN_DOMAIN, messageData)
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
});

app.listen(process.env.PORT, () => {
  console.log("Server has started 🤓");
});
