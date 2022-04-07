//Lotto Type : get//
export async function getLottotype({ commit }) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `https://sm-lotto.com/v1alpha/lotto/lotto_price/api/LottoType/get`
      );
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}

//LottoType/insert
export async function createLottotype({ commit }, body) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.post(
        `https://sm-lotto.com/v1alpha/lotto/lotto_price/api/LottoType/insert`,
        {
          title: body.title
        }
      );
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}

//LottoType/update
export async function updateLottotype({ commit }, body) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.patch(
        `https://sm-lotto.com/v1alpha/lotto/lotto_price/api/LottoType/update/${body.id}`,
        {
          title: body.title,
          status: body.status
        }
      );
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}

//LottoType/delete
export async function deleteLottotype({ commit }, param) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.delete(
        `https://sm-lotto.com/v1alpha/lotto/lotto_price/api/LottoType/delete/${param.id}`
      );
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}

//LottoType/close
export async function closeLottotype({ commit }, param) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.delete(
        `https://sm-lotto.com/v1alpha/lotto/lotto_price/api/LottoType/close/${param.id}`
      );
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}

//TypeCategory/Id
export async function getTypeCategoryByid({ commit, id }) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `https://sm-lotto.com/v1alpha/lotto/lotto_price/api/TypeCategory/id/${id}`
      );
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}

//TypeCategoryDetail/Id
export async function getTypeCategoryDetailByid({ commit }, id) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `https://sm-lotto.com/v1alpha/lotto/lotto_price/api/TypeCategoryDetail/id/${id}`
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

//TypeCategory/get
export async function getTypeCategory(
  { commit },
  params = {
    title: undefined,
    currentPage: undefined,
    limit: undefined,
    type_id: undefined
  }
) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `https://sm-lotto.com/v1alpha/lotto/lotto_price/api/TypeCategory/get`,
        {
          params: {
            title: params.title,
            currentPage: params.currentPage,
            limit: params.limit,
            lottotype_id: params.type_id
          }
        }
      );
      resolve(response.data, "item");
    } catch (error) {
      reject(error);
    }
  });
}

//TypeCategoryDetail/get
export async function getTypeCategoryDetail(
  { commit },
  params = {
    title: undefined,
    currentPage: undefined,
    limit: undefined
  }
) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `https://sm-lotto.com/v1alpha/lotto/lotto_price/api/TypeCategoryDetail/get`,
        {
          params: {
            title: params.title,
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

//TypeCategory/orderby
export async function orderByTypeCategory({ commit, sort_param }) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `https://sm-lotto.com/v1alpha/lotto/lotto_price/api/TypeCategory/orderby`,
        sort_param
      );
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}

//TypeCategoryDetail/orderby
export async function orderByTypeCategoryDetail({ commit, sort_param }) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `https://sm-lotto.com/v1alpha/lotto/lotto_price/api/TypeCategoryDetail/orderby`,
        sort_param
      );
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}
export async function createType({ commit }, body) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.post(
        `https://sm-lotto.com/v1alpha/lotto/lotto_price/api/TypeCategory/insert`,
        body
      );

      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}

//TypeCategory/insert
export async function createTypeCategory({ commit }, body) {
  return new Promise(async (resolve, reject) => {
    console.log(body);
    try {
      let response = await this.$axios.post(
        `https://sm-lotto.com/v1alpha/lotto/lotto_price/api/TypeCategoryDetail/insert`,
        body
      );

      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}
export async function updateTypeCategoryDetail({ commit }, body) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.patch(
        `https://sm-lotto.com/v1alpha/lotto/lotto_price/api/TypeCategoryDetail/update/${body.id}`,
        body
      );

      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}
// ----------- here might be wrong  ------------
//TypeCategoryDetail/insert
export async function createTypeCategoryDetail({ commit, body }) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.post(
        `https://sm-lotto.com/v1alpha/lotto/lotto_price/api/TypeCategoryDetail/insert`,
        body
      );
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}

//TypeCategory/update
export async function updateTypeCategory({ commit }, body) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.patch(
        `https://sm-lotto.com/v1alpha/lotto/lotto_price/api/TypeCategory/update/${body.id}`,
        body
      );
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}

//TypeCategory/delete
export async function deleteTypeCategory({ commit }, id) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.delete(
        `https://sm-lotto.com/v1alpha/lotto/lotto_price/api/TypeCategory/delete/${id}`
      );
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}

//TypeCategory/close
export async function closeTypeCategory({ commit }, id) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.delete(
        `https://sm-lotto.com/v1alpha/lotto/lotto_price/api/TypeCategory/close/${id}`
      );
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}

export async function deleteCategoryTypeDetail({ commit }, id) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.delete(
        `https://sm-lotto.com/v1alpha/lotto/lotto_price/api/TypeCategoryDetail/delete/${id}`
      );
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}
export async function closeCategoryTypeDetail({ commit }, id) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.delete(
        `https://sm-lotto.com/v1alpha/lotto/lotto_price/api/TypeCategoryDetail/close/${id}`
      );
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}
//ProgramLotto/Id
export async function getProgramLottoById({ commit }) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `https://sm-lotto.com/v1alpha/lotto/lotto_price/api/ProgramLotto/id/${id}`
      );
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}

//ProgramLotto/get
export async function getProgramLotto(
  { commit },
  params = {
    title: undefined,
    currentPage: undefined,
    limit: undefined,
    LottoTypeId: undefined,
    start_date: undefined,
    end_date: undefined,
    order_mode: undefined,
    order_by: undefined,
    type_id: undefined,
    TypeCategoryId: undefined
  }
) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `https://sm-lotto.com/v1alpha/lotto/lotto_price/api/ProgramLotto/get`,
        {
          params: {
            title: params.title,
            currentPage: params.currentPage,
            limit: params.limit,
            LottoTypeId: params.type_id,
            start_date: params.start_date,
            end_date: params.end_date,
            order_mode: params.order_mode,
            order_by: params.order_by,
            type_id: params.type_id,
            TypeCategoryId: params.TypeCategoryId
          }
        }
      );
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}

//ProgramLotto/orderby
export async function orderByProgramLotto({ commit, sort_param }) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `https://sm-lotto.com/v1alpha/lotto/lotto_price/api/ProgramLotto/orderby`,
        sort_param
      );
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}

//ProgramLotto/insert
export async function createProgramLotto({ commit }, body) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.post(
        `https://sm-lotto.com/v1alpha/lotto/lotto_price/api/ProgramLotto/insert`,
        { body }
      );
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}

//ProgramLotto/update
export async function updateProgramLotto({ commit }, body) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.patch(
        `https://sm-lotto.com/v1alpha/lotto/lotto_price/api/ProgramLotto/update/${body.id}`,
        {
          bet_open_time: body.bet_open_time,
          bet_close_time: body.bet_close_time,
          bet_lotto_time: body.bet_lotto_time,
          lottotype_id: body.LottoTypeId,
          typecategory_id: body.TypeCategoryId,
          typecategorydetail_id: body.TypeCategoryDetailId,
          status: body.status,
          status_lotto: body.status_lotto,
          status_calculate: body.status_calculate
        }
      );

      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}

//ProgramLotto/delete
export async function deleteProgramLotto({ commit }, id) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.delete(
        `https://sm-lotto.com/v1alpha/lotto/lotto_price/api/ProgramLotto/delete/${id}`
      );
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}

//ProgramLotto/delete
export async function closeProgramLotto({ commit }, id) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.delete(
        `https://sm-lotto.com/v1alpha/lotto/lotto_price/api/ProgramLotto/close/${id}`
      );
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}

//ProgramLotto/CheckLotto
export async function checkProgramLotto({ commit }) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `https://sm-lotto.com/v1alpha/lotto/lotto_price/api/ProgramLotto/CheckLotto`
      );
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}

//ProgramLotto/CheckLottoById/{id}
export async function checkIdProgramLotto({ commit, id }) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `https://sm-lotto.com/v1alpha/lotto/lotto_price/api/ProgramLotto/CheckLottoById/${id}`
      );
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}

//ProgramLotto/CheckLottoByTitle/{title}
export async function checkTitleProgramLotto({ commit, title }) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `https://sm-lotto.com/v1alpha/lotto/lotto_price/api/ProgramLotto/CheckLottoById/${title}`
      );
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}

//ProgramLotto/GenProgramLotto/{num_of_month}
export async function genProgramLotto({ commit, num_of_month }) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.post(
        `https://sm-lotto.com/v1alpha/lotto/lotto_price/api/ProgramLotto/GenProgramLotto/${num_of_month}`
      );
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}

// LottoNumberType/Id
export async function getLottoNumberTypeByid({ commit, id }) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `https://sm-lotto.com/v1alpha/lotto/lotto_price/api/LottoNumberType/id/${id}`
      );
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}

// LottoNumberType/get
export async function getLottoNumberType(
  { commit },
  params = {
    name: undefined,
    typecategory_title: undefined,
    number: undefined,
    typecategory_id: undefined,
    currentPage: undefined,
    limit: undefined
  }
) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `https://sm-lotto.com/v1alpha/lotto/lotto_price/api/LottoNumberType/get`,
        {
          params: {
            name: params.name,
            typecategory_title: params.typecategory_title,
            number: params.number,
            typecategory_id: params.typecategory_id,
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

export async function getTypeDefult({ commit, id }) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `https://sm-lotto.com/v1alpha/lotto/lotto_price/api/LottoNumberType/lottonumbertype_default`
      );
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}
// LottoNumberType/orderby
export async function getLottoNumberTypeSort({ commit, sort_param }) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `https://sm-lotto.com/v1alpha/lotto/lotto_price/api/LottoNumberType/orderby`,
        sort_param
      );
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}

// LottoNumberType/insrt
export async function createLottoNumberType({ commit }, body) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.post(
        `https://sm-lotto.com/v1alpha/lotto/lotto_price/api/LottoNumberType/insert`,
        body
      );
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}

// LottoNumberType/update
export async function updateLottoNumberTypeByid({ commit }, body) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.patch(
        `https://sm-lotto.com/v1alpha/lotto/lotto_price/api/LottoNumberType/update/${body.id}`,
        {
          lottonumbertype_default_id: body.lottonumbertype_default_id,
          typecategory_id: body.typecategory_id,
          status: body.status,
          amount_reward: body.amount_reward
        }
      );
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}

// LottoNumberType/delete
export async function deleteLottoNumberType({ commit }, id) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.delete(
        `https://sm-lotto.com/v1alpha/lotto/lotto_price/api/LottoNumberType/delete/${id}`
      );
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}

// LottoNumberType/close
export async function closeLottoNumberType({ commit }, id) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.delete(
        `https://sm-lotto.com/v1alpha/lotto/lotto_price/api/LottoNumberType/close/${id}`
      );
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}

//LottoPrize/id
export async function getLottoPrizeByid({ commit, id }) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `https://sm-lotto.com/v1alpha/lotto/lotto_price/api/LottoPrize/id/`,
        id
      );
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}

//LottoPrize/get
export async function getLottoPrize({ commit }) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `https://sm-lotto.com/v1alpha/lotto/lotto_price/api/LottoPrize/get`
      );
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}

//LottoPrize/orderby
export async function getLottoPrizeByOrder({ commit, sort_param }) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `https://sm-lotto.com/v1alpha/lotto/lotto_price/api/LottoPrize/orderby`,
        sort_param
      );
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}

//LottoPrize/insert
export async function createLottoPrize({ commit, body }) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.post(
        `https://sm-lotto.com/v1alpha/lotto/lotto_price/api/LottoPrize/insert`,
        body
      );
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}

//LottoPrize/id
export async function updateLottoPrize({ commit, id, body }) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.patch(
        `https://sm-lotto.com/v1alpha/lotto/lotto_price/api/LottoPrize/update/${id}`,
        body
      );
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}

//LottoPrize/delete
export async function deleteLottoPrize({ commit, id }) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.delete(
        `https://sm-lotto.com/v1alpha/lotto/lotto_price/api/LottoPrize/${id}`
      );
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}
export async function getawardlotto(
  { commit },
  params = {
    start_date: undefined,
    end_date: undefined,
    status_lotto: undefined,
    currentPage: undefined,
    limit: undefined
  }
) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `https://sm-lotto.com/v1alpha/lotto/lotto_price/api/ProgramLotto/get_award`,
        {
          params: {
            start_date: params.start_date,
            end_date: params.end_date,
            status_lotto: params.status_lotto,
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
export async function getlottobyprogram({ commit }, id) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `https://sm-lotto.com/v1alpha/lotto/lotto_price/api/LottoPrize/get_by_program_id/${id}`
      );
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}

export async function savelottonumber({ commit }, body) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.patch(
        `https://sm-lotto.com/v1alpha/lotto/lotto_price/api/LottoPrize/update_reward`,
        body
      );
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}
