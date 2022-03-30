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
      let token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhhYzEzOThiLWMyZWUtNDg2OC05NDZhLWRkNDJmYTNjMGY4OSJ9.dAu3qp8tYc4DJO40gHJQi64U5xsY2zrzpr5Uyc5Mspk";
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
      let token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhhYzEzOThiLWMyZWUtNDg2OC05NDZhLWRkNDJmYTNjMGY4OSJ9.dAu3qp8tYc4DJO40gHJQi64U5xsY2zrzpr5Uyc5Mspk";
      let response = await this.$axios.get(
        `https://kong-api-kdz5uqbpia-as.a.run.app/v1alpha/lotto/lotto-report/api/summary/Transaction/${params.typecategory_id}/${params.program_id}/${params.start_time}/${params.end_time}`,
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
