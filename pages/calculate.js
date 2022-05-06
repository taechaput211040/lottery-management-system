let outComeRate = payoutLimit / lottoAward.length / betCorrect;
if (
  outComeRate <= minimum_out_come_rate &&
  betCorrect * outComeRate <= betAll * maxProfitLost
) {
  outComeRate = parseFloat(minimum_out_come_rate.toFixed());
  console.table({
    "outComeRate set to (1)": outComeRate,
    "(betCorrect * outComeRate)": betCorrect * outComeRate,
    "(betAll * maxProfitLost)": betAll * maxProfitLost
  });

  if (betCorrect * outComeRate > betAll * maxProfitLost) {
    outComeRate = parseFloat(
      ((betAll * maxProfitLost) / lottoAward.length / betCorrect).toFixed(2)
    );
    console.table({
      "outComeRate set to (2)": outComeRate,
      "(betCorrect * outComeRate)": betCorrect * outComeRate,
      "(betAll * maxProfitLost)": betAll * maxProfitLost
    });
  }
}
