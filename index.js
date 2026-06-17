client.once("ready", () => {
  console.log("BOT READY");

  startPrayerSystem(client);
  startHadithSystem(client);
});
