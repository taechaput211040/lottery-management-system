export async function getAccountReport(
  { commit },
  params = {
    username: undefined,
    currentPage: undefined,
    limit: undefined
  }
) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `https://sm-lotto.com/v1alpha/lotto/lotto_launchgame/api/users/get_members`,
        {
          params: {
            username: params.username,
            currentPage: params.currentPage,
            limit: params.limit
          }
        }
      );
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}
export async function getBetReport(
  { commit },
  params = {
    start_time: undefined,
    end_time: undefined,
    type_purchase: undefined,
    page: undefined,
    limit: undefined
  }
) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `https://kong-api-kdz5uqbpia-as.a.run.app/v1alpha/lotto/lotto-report/api/summary/Range/${params.start_time}/${params.end_time}`,
        {
          params: {
            type_purchase: params.type_purchase,
            page: params.page,
            limit: params.limit
          }
        },
        {
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );
      resolve(response.data, "item");
    } catch (error) {
      reject(error);
    }
  });
}
export async function getReportDetail(
  { commit },
  params = {
    typecategory_id: undefined,
    program_id: undefined,
    start_time: undefined,
    end_time: undefined,
    type_purchase: undefined,
    page: undefined,
    limit: undefined
  }
) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `https://sm-lotto.com/v1alpha/lotto/lotto-report/api/summary/Range/${params.start_time}/${params.end_time}`,
        {
          params: {
            type_purchase: params.type_purchase,
            page: params.page,
            limit: params.limit
          }
        }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

export async function getReportNumber(
  { commit },
  params = {
    lottotype_id: undefined,
    start_date: undefined,
    end_date: undefined,
    currentPage: undefined,
    limit: undefined
  }
) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `https://sm-lotto.com/v1alpha/lotto/lotto_price/api/LottoPrize/report_prize`,
        {
          params: {
            lottotype_id: params.lottotype_id,
            start_date: params.start_date,
            end_date: params.end_date,
            currentPage: params.currentPage,
            limit: params.limit
          }
        }
      );
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}

export async function getDashboardWinlose(
  { commit },
  params = {
    start_date: undefined,
    end_date: undefined
  }
) {
  return new Promise(async (resolve, reject) => {
    try {
      // let response = {
      //   bet: 649676,
      //   payout: 66270,
      //   winlose: 62749.53,
      //   programs: [
      //     {
      //       title: "หวยรัฐบาล",
      //       lottotype_id: null,
      //       lottotype_name: null,
      //       bet: 649676,
      //       bet_amount: 649015.46,
      //       payout: 66270,
      //       winlose: 62749.53
      //     },
      //     {
      //       title: "หวยฮานอยสตาร์",
      //       lottotype_id: null,
      //       lottotype_name: null,
      //       bet: 584334,
      //       bet_amount: 584224.46,
      //       payout: 112112,
      //       winlose: 62749.53
      //     }
      //   ]
      // };
      let response = await this.$axios.get(
        `https://sm-lotto.com/v1alpha/lotto/lotto-report/api/summary/Overview/${params.start_time}/${params.end_time}`
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

export async function getReportWinlose(
  { commit },
  params = {
    start_time: undefined,
    end_time: undefined,
    type_purchase: undefined,
    page: undefined,
    limit: undefined
  }
) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `https://sm-lotto.com/v1alpha/lotto/lotto-report/api/summary/Winlose/${params.start_time}/${params.end_time}`,
        {
          params: {
            type_purchase: params.type_purchase,
            page: params.page,
            limit: params.limit
          }
        }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

export async function getDifferentReport(
  { commit },
  params = {
    start_time: undefined,
    end_time: undefined,
    page: undefined,
    limit: undefined
  }
) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `https://sm-lotto.com/v1alpha/lotto/lotto-report/api/summary/Payrate/different/${params.start_time}/${params.end_time}`,
        {
          params: {
            page: params.page,
            limit: params.limit
          }
        }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}
export async function getTransaction(
  { commit },
  params = {
    member_id: undefined,
    program_id: undefined,
    type_purchase: undefined,
    page: undefined,
    limit: undefined
  }
) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `https://sm-lotto.com/v1alpha/lotto/lotto-report/api/summary/Transaction/${params.program_id}/${params.member_id}`,
        {
          params: {
            type_purchase: params.type_purchase,
            page: params.page,
            limit: params.limit
          }
        }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}
export async function getNumberTypeReport(
  { commit },
  params = {
    program_id: undefined,
    type_purchase: undefined,
    page: undefined,
    limit: undefined
  }
) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `https://sm-lotto.com/v1alpha/lotto/lotto-report/api/summary/Ranking/${params.program_id}`,
        {
          params: {
            type_purchase: params.type_purchase,
            page: params.page,
            limit: params.limit
          }
        }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

export async function getDetailNumberReport(
  { commit },
  params = {
    program_id: undefined,
    lottonumbertype_id: undefined,
    type_purchase: undefined,
    page: undefined,
    limit: undefined
  }
) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `https://sm-lotto.com/v1alpha/lotto/lotto-report/api/summary/Ranking/${params.program_id}/${params.lottonumbertype_id}`,
        {
          params: {
            type_purchase: params.type_purchase,
            page: params.page,
            limit: params.limit
          }
        }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}
