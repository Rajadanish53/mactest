const express = require("express");
const os = require("os");
const cors = require("cors");
const app = express();
app.use(cors());
let PORT = process.env.PORT || 2000;

app.get("/getInfo", (req, res) => {
  let obj = os.networkInterfaces();
  let finalObj = {
    Ethernet: obj.Ethernet,
    IPv4: obj["Loopback Pseudo-Interface 1"],
    IPv6: obj["vEthernet (Default Switch)"],
    hostname: os.hostname,
  };
  res.send(finalObj);
});
app.listen(PORT, () => {
  console.log("running at port", PORT);
});
