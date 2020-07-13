import config from "../config/config";
import { jwtSign } from "../helpers/helpers";
//import db from "../models/account-model";

const passport = require("passport");
const JWTstrategy = require("passport-jwt").Strategy;
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const MicrosoftStrategy = require("passport-microsoft").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

passport.use(
  new JWTstrategy(
    {
      secretOrKey: config.secret_key,
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: config.google.clientId,
      clientSecret: config.google.clientSecret,
      callbackURL: config.apiUrl + "/user/signin/google/callback",
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      // sequelize
      // db.User.findOrCreate({ where: {email: profile.email}}).then(([user, created]) => {
      //   const body = {
      //     id: user.id,
      //     email: user.email,
      //     name: profile.displayName,
      //     avatar: profile.picture
      //   };
      //   const token = jwtSign({user: body});
      //   return done(null, {token});
      // });
    }
  )
);

passport.use(
  new MicrosoftStrategy(
    {
      clientID: config.microsoft.clientId,
      clientSecret: config.microsoft.clientSecret,
      callbackURL: config.apiUrl + "/user/signin/microsoft/callback",
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      const email = profile._json.mail || profile._json.userPrincipalName;
      // sequelize
      // db.User.findOrCreate({where: {email}}).then(([user, created]) => {
      //   const body = {
      //     id: user.id,
      //     email: user.email,
      //     name: profile.displayName
      //   };
      //   const token = helpers.jwtSign({user: body});
      //   return done(null, {token});
      // });
    }
  )
);
