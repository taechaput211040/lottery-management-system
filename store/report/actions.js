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
        `${process.env.API_LOTTO_LAUNCHGAME}/users/get_members`,
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
export async function getMemberReportByUser(
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
        `${process.env.API_LOTTO_LAUNCHGAME}/users/get_member_by_user`,
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
    limit: undefined,
    sort: undefined,
    search: undefined
  }
) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `${process.env.API_LOTTO_REPORT}/summary/Range/${params.start_time}/${params.end_time}`,
        {
          params: {
            type_purchase: params.type_purchase,
            page: params.page,
            limit: params.limit,
            sort: params.sort,
            search: params.search
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
    limit: undefined,
    order_by: undefined,
    order_mode: undefined
  }
) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `${process.env.API_LOTTO_PRICE}/LottoPrize/report_prize`,
        {
          params: {
            lottotype_id: params.lottotype_id,
            start_date: params.start_date,
            end_date: params.end_date,
            currentPage: params.currentPage,
            limit: params.limit,
            order_by: params.order_by,
            order_mode: params.order_mode
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
      let response = await this.$axios.get(
        `${process.env.API_LOTTO_REPORT}/summary/Overview/${params.start_time}/${params.end_time}`
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

export async function getGraphReport(
  { commit },
  params = {
    type: undefined
  }
) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `${process.env.API_LOTTO_REPORT}/summary/Overview/${params.type}`
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
    limit: undefined,
    sort: undefined,
    agent_name: undefined
  }
) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `${process.env.API_LOTTO_REPORT}/summary/Winlose/${params.start_time}/${params.end_time}`,
        {
          params: {
            agent_name: params.agent_name,
            type_purchase: params.type_purchase,
            page: params.page,
            limit: params.limit,
            sort: params.sort
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
        `${process.env.API_LOTTO_REPORT}/summary/Payrate/different/${params.start_time}/${params.end_time}`,
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
    round_id: undefined,
    type_purchase: undefined,
    page: undefined,
    limit: undefined
  }
) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `${process.env.API_LOTTO_REPORT}/summary/Transaction/${params.round_id}/${params.member_id}`,
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
        `${process.env.API_LOTTO_REPORT}/summary/Ranking/${params.program_id}`,
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
    limit: undefined,
    sort: undefined
  }
) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `${process.env.API_LOTTO_REPORT}/summary/Ranking/${params.program_id}/${params.lottonumbertype_id}`,
        {
          params: {
            type_purchase: params.type_purchase,
            page: params.page,
            limit: params.limit,
            sort: params.sort
          }
        }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

export async function betFake({ commit }, body) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.post(
        `${process.env.API_LOTTO_BET}/bet/bet_fake`,
        body
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

export async function getRoundBymemberid(
  { commit },
  params = {
    agent_id: undefined,
    member_id: undefined,
    start_time: undefined,
    end_time: undefined,
    page: undefined,
    limit: undefined,
    sort: undefined
  }
) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `${process.env.API_LOTTO_REPORT}/summary/Round/${params.agent_id}/${params.member_id}/${params.start_time}/${params.end_time}`,
        {
          params: {
            page: params.page,
            limit: params.limit,
            sort: params.sort
          }
        }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}
