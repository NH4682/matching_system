import myAxios from ".";

export const currentUser = () => {
  return myAxios
    .get("/user/currentUser")
    .then(function (response) {
      // 处理成功情况
      return response.data?.data;
    })
    .catch(function (error) {
      // 处理错误情况
      console.log(error);
      // return error;
    });
};
