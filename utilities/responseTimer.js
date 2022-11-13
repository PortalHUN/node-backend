const responseTimer = (req, res, next) => {
  if (req.path.includes(".ico") || req.path.includes("/_static")) return;
  const startTimer = process.hrtime();

  res.on("finish", () => {
    const totalTime = process.hrtime(startTimer);
    const totalTimeInMS = totalTime[0] * 1000 + totalTime[1] / 1e6;
    console.log(`[S] Response time on ${req.path} is ${totalTimeInMS} ms.`);
  });
  next();
};

module.exports = responseTimer;
