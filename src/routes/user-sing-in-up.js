import express from "express";
import bcrypt from "bcrypt";
import passport from "passport";
import usersDB from "../models/users-model";
import config from "../config/config";
import helpers from "../helpers/helpers";

const router = express.Router();

router.post("/signup", (req, res) => {
  //   User.findOne({
  //     where: {
  //       email: req.body.email,
  //     },
  //   })
  //     .then((user) => {
  //       if (user) {
  //         res.status(400).send("User with this email is already exists");
  //       } else {
  //         bcrypt.hash(
  //           req.body.password,
  //           config.bcrypt.saltRounds,
  //           (err, hash) => {
  //             User.create({
  //               email: req.body.email,
  //               password: hash,
  //             }).then((user) => {
  //               res.json(user);
  //             });
  //           }
  //         );
  //       }
  //     })
  //     .catch((err) => {
  //       res.status(err.statusCode).send(err.message);
  //     });
});

router.post("/signin/local", async (req, res) => {
  console.log("\n---- sign in ---- \n", req.body);

  try {
    const user = await usersDB.findByEmail(req.body.email);
    console.log("\n---- user ---- \n", user);
    if (!user) {
      res
        .status(404)
        .json({ err: "The user with the specified email does not exist" });
    } else {
      bcrypt.compare(req.body.password, user.password).then((equal) => {
        if (equal) {
          const body = {
            id: user.id,
            email: user.email,
          };
          const token = helpers.jwtSign({ user: body });
          res.json({
            user,
            success: true,
            token,
          });
        } else {
          res.status(400).send("Wrong password");
        }
      });
    }
  } catch (err) {
    res.status({ err: "The user information could not be retrieved" });
  }

  //   User.findOne({
  //     where: {
  //       email: req.body.email,
  //     },
  //   })
  //     .then((user) => {
  //       bcrypt.compare(req.body.password, user.password).then((equal) => {
  //         if (equal) {
  //           const body = {
  //             id: user.id,
  //             email: user.email,
  //           };
  //           const token = helpers.jwtSign({ user: body });
  //           res.json({
  //             user,
  //             success: true,
  //             token,
  //           });
  //         } else {
  //           res.status(400).send("Wrong password");
  //         }
  //       });
  //     })
  //     .catch(() => {
  //       res.status(400).send("User with this email does not exist");
  //     });
});

router.get("/signin/google", (req, res, next) => {
  passport.authenticate("google", {
    scope: ["profile", "email"],
    state: req.query.app,
  })(req, res, next);
});

router.get(
  "/signin/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  function (req, res) {
    socialRedirect(res, req.query.state, req.user.token, config);
  }
);

router.get("/signin/microsoft", (req, res, next) => {
  passport.authenticate("microsoft", {
    scope: ["https://graph.microsoft.com/user.read openid"],
    state: req.query.app,
  })(req, res, next);
});

router.get(
  "/signin/microsoft/callback",
  passport.authenticate("microsoft", {
    failureRedirect: "/login",
    session: false,
  }),
  function (req, res) {
    socialRedirect(res, req.query.state, req.user.token, config);
  }
);

function socialRedirect(res, state, token, config) {
  let url;
  let fullPath = /^http(s?):\/\//.test(state);
  if (fullPath) {
    url = state;
  } else {
    url =
      config.hostUI +
      `${config.portUI ? `:${config.portUI}` : ``}` +
      `${state ? `/${state}` : ``}`;
  }
  res.redirect(url + "/#/login?token=" + token);
}

module.exports = router;
