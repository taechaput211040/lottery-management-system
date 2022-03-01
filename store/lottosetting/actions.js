//Lotto Type : get//
export async function getLottotype({ commit }) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(`/program/api/LottoType/get`);
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
      let response = await this.$axios.post(`/program/api/LottoType/insert`, {
        title: body.title
      });
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
      // console.log(body);
      let response = await this.$axios.patch(
        `/program/api/LottoType/update/${body.id}`,
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
        `/program/api/LottoType/delete/${param.id}`
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
        `/program/api/LottoType/close/${param.id}`
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
        `/program/api/TypeCategory/id/${id}`
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
        `/program/api/TypeCategoryDetail/id/${id}`
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
    page: undefined,
    limit: undefined
  }
) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `/program/api/TypeCategory/orderby`,
        {
          params: {
            currentPage: params.page,
            limit: params.limit
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
export async function getTypeCategoryDetail({ commit }) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `/program/api/TypeCategoryDetail/get`
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
        `/program/api/TypeCategory/orderby`,
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
        `/program/api/TypeCategoryDetail/orderby`,
        sort_param
      );
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}

//TypeCategory/insert
export async function createTypeCategory({ commit, body }) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.post(
        `/program/api/TypeCategory/insert`,
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
        `/program/api/TypeCategoryDetail/insert`,
        body
      );
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}

//TypeCategory/update
export async function updateTypeCategory({ commit, id, body }) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.patch(
        `/program/api/TypeCategory/update/${id}`,
        body
      );
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}

//TypeCategory/delete
export async function deleteTypeCategory({ commit, id }) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.delete(
        `/program/api/TypeCategory/delete/${id}`
      );
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}

//TypeCategory/close
export async function closeTypeCategory({ commit, id }) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.delete(
        `/program/api/TypeCategory/close/${id}`
      );
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}

//ProgramLotto/Id
export async function getProgramLottoById({ commit, id }) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `/program/api/ProgramLotto/id/${id}`
      );
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}

//ProgramLotto/get
export async function getProgramLotto({ commit }) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(`/program/api/ProgramLotto/get`);
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
        `/program/api/ProgramLotto/orderby`,
        sort_param
      );
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}

//ProgramLotto/insert
export async function createProgramLotto({ commit, body }) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.post(
        `/program/api/ProgramLotto/insert`,
        body
      );
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}

//ProgramLotto/update
export async function updateProgramLotto({ commit, id, body }) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.patch(
        `/program/api/ProgramLotto/update/${id}`,
        body
      );
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}

//ProgramLotto/delete
export async function deleteProgramLotto({ commit, id }) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.delete(
        `/program/api/ProgramLotto/delete/${id}`,
        body
      );
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}

//ProgramLotto/delete
export async function closeProgramLotto({ commit, id }) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.delete(
        `/program/api/ProgramLotto/close/${id}`,
        body
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
        `/program/api/ProgramLotto/CheckLotto`
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
        `/program/api/ProgramLotto/CheckLottoById/${id}`
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
        `/program/api/ProgramLotto/CheckLottoById/${title}`
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
        `/program/api/ProgramLotto/GenProgramLotto/${num_of_month}`
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
        `/program/api/LottoNumberType/id/${id}`
      );
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}

// LottoNumberType/get
export async function getLottoNumberType({ commit }) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(`/program/api/LottoNumberType/get`);
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
        `/program/api/LottoNumberType/orderby`,
        sort_param
      );
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}

// LottoNumberType/insrt
export async function createLottoNumberType({ commit, body }) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.post(
        `/program/api/LottoNumberType/insert`,
        body
      );
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}

// LottoNumberType/update
export async function updateLottoNumberTypeByid({ commit, id, body }) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.patch(
        `/program/api/LottoNumberType/update/${id}`,
        body
      );
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}

// LottoNumberType/delete
export async function deleteLottoNumberType({ commit, id }) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.delete(
        `/program/api/LottoNumberType/delete/${id}`
      );
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}

// LottoNumberType/close
export async function closeLottoNumberType({ commit, id }) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.delete(
        `/program/api/LottoNumberType/close/${id}`
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
      let response = await this.$axios.get(`/program/api/LottoPrize/id/`, id);
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
      let response = await this.$axios.get(`/program/api/LottoPrize/get`);
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
        `/program/api/LottoPrize/orderby`,
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
        `/program/api/LottoPrize/insert`,
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
        `/program/api/LottoPrize/update/${id}`,
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
      let response = await this.$axios.delete(`/program/api/LottoPrize/${id}`);
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}
