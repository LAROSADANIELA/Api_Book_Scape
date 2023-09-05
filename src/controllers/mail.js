const { User } = require("../db");
const transporter = require("../transporter/transporter");
const userCreated = async (req, res, next) => {
  try {
    let { email } = req.body;
    let user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!user) return res.status(400).send("Usuario no encontrado");

    await transporter.sendMail(
      {
        from: '"BookScape"<ebookscape01@gmail.com>',
        to: email,
        subject: `Gracias ${user.username} por registrarse a BookScape`,
        html: `
          <html>
            <head>
              <style>
                 body {
                  fon  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
                  t-family: Arial, sans-serif;
                }
                .container {
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                }
                .logo {
                  text-align: center;
                  width: 180px;
                  background: linear-gradient(180deg, #eeeeee 26.71%, #b1b1b1 50%);

                }
                
              </style>
            </head>
            <body>
              <div class="container">
                <div class="logo">
                  <img src="https://clientbookscape-production.up.railway.app/_next/static/media/BookScapeLogo.87fe2f26.png" alt="Logo de BookScape" />
                </div>
                <h4><b>Bienvenido</b></h4>
                <h2>!${user.username}!</h2>
                <p>Ya puedes empezar a comprar y leer todo lo que desees!.</p>
                <p>Este email fue generado automaticamente desde BookScape.com al momento de registrarse</p>
              </div>
            </body>
          </html>
        `,
      },
      (err, info) => {
        if (err) {
          res.status(400).send(err.message);
        } else {
          res.status(200).json(info);
        }
      }
    );
  } catch (error) {
    next(error);
  }
};
module.exports = userCreated;
