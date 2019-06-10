#!/usr/bin/node

const Messer = require("messer/src/messer");
const config = require("/root/.messer/tmp/config.json");

const messer = new Messer();

messer.messen
  .login()
  .then(() => messer.processCommand(`history "Elitarny numerek" 1`))
  .then(res => {
    let regex = /Dzisiejszy numerek to (\d+)\./;
    console.log(`Elitarny numerek: ${res}`);
    let lucky = regex.exec(res)[1];
    console.log(`Lucky string: ${lucky}`);

    lucky = parseInt(lucky);
    if (lucky === NaN) process.exit(1);
    console.log(`Lucky number: ${lucky}`);

    luckyOne = config[lucky];
    if (luckyOne === undefined) return lucky;
    console.log(`Lucky person: ${luckyOne}`);
    return luckyOne;
  })
  .then(luckyOne => {
    console.log("Sending message...");
    if (Number.isInteger(luckyOne)) {
      let message = {
        body: `Dzisiaj szczęśliwy numerek to ${luckyOne}`
      };
      messer.messen.api.sendMessage(message, config.group);
      return console.log("Message sent");
    }
    messer.messen.api.getUserID(luckyOne, (err, data) => {
      let message = {
        body: `Dzisiaj szczęśliwy numerek ma @${luckyOne}`
      };
      if (err) {
        console.log(`Could not get id of ${luckyOne}`);
        messer.messen.api.sendMessage(message, config.group);
      } else {
        const id = data[0].userID;
        messer.messen.api.sendMessage(
          {
            ...message,
            mentions: [
              {
                tag: `@${luckyOne}`,
                id: id
              }
            ]
          },
          config.group
        );
      }
      return console.log("Message sent");
    });
  })
  .catch(error => {
    console.log(error);
    process.exit(1);
  });
