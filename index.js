const express = require("express");
const os = require("os");
const cors = require("cors");
const app = express();
const address = require("address");
app.use(cors());
const RequestIp = require("@supercharge/request-ip");
let PORT = process.env.PORT || 2000;
const expressMiddleware = function (req, res, next) {
  req.ip = RequestIp.getClientIp(req);

  next();
};
app.get("/getInfo", (req, res) => {
  console.log();
  console.log();
  // '192.168.0.2'
  // 'fe80::7aca:39ff:feb0:e67d'
  let mac = null;
  let mac1 = null;
  address.mac(function (err, addr) {
    mac = addr; // '78:ca:39:b0:e6:7d'
  });

  // local loopback
  console.log(address.ip("lo")); // '127.0.0.1'

  // vboxnet MAC
  address.mac("vboxnet", function (err, addr) {
    mac1 = addr; // '0a:00:27:00:00:00'
  });
  res.send({
    ip: req.ip,
    addressnpm: {
      ip: address.ip(),
      IPv6: address.ipv6(),
      addressIP: address.ip("lo"),
      mac,
      mac1,
    },
    ips: req.ips,
    localaddress: req.socket.localAddress,
    localPort: req.socket.localPort,
    family: req.socket.remoteFamily,
    remoteaDDRESS: req.socket.remoteAddress,
  });
  // res.send("done");

  // let obj = os.networkInterfaces();
  // let finalObj = {
  //   Ethernet: obj.Ethernet,
  //   IPv4: obj["Loopback Pseudo-Interface 1"],
  //   IPv6: obj["vEthernet (Default Switch)"],
  //   hostname: os.hostname,
  // };
  // res.send(finalObj);
});
app.listen(PORT, () => {
  console.log("running at port", PORT);
});
