import axios from "axios";

async function loadAllUsers() {
  try {
    const response = await axios.get(
      "https://archintel-exam-mock-api.onrender.com/users"
    );
    return response.data;
  } catch (error) {
    console.log("Error loading users!", error);
    return [];
  }
}

async function loadUser(id) {
  try {
    const response = await axios.get(
      "https://archintel-exam-mock-api.onrender.com/users"
    );
    const filtedResponse = response.data.filter((user) => user.id === id);
    return filtedResponse;
  } catch (error) {
    console.log("Error loading Articles!", error);
    return [];
  }
}

async function loadForEditArticles() {
  try {
    const response = await axios.get(
      "https://archintel-exam-mock-api.onrender.com/article"
    );
    const filtedResponse = response.data.filter(
      (article) => article.status === "For Edit"
    );
    return filtedResponse;
  } catch (error) {
    console.log("Error loading Articles!", error);
    return [];
  }
}

async function loadPublishedArticles() {
  try {
    const response = await axios.get(
      "https://archintel-exam-mock-api.onrender.com/article"
    );
    const filtedResponse = response.data.filter(
      (article) => article.status === "Published"
    );
    return filtedResponse;
  } catch (error) {
    console.log("Error loading Articles!", error);
    return [];
  }
}

async function loadArticle(id) {
  try {
    const response = await axios.get(
      "https://archintel-exam-mock-api.onrender.com/article"
    );
    const filtedResponse = response.data.filter((article) => article.id === id);
    return filtedResponse;
  } catch (error) {
    console.log("Error loading Article!", error);
    return [];
  }
}

async function loadAllArticles() {
  try {
    const response = await axios.get(
      "https://archintel-exam-mock-api.onrender.com/article"
    );
    return response.data;
    return filtedResponse;
  } catch (error) {
    console.log("Error loading All Articles!", error);
    return [];
  }
}

async function loadCompany(id) {
  try {
    const response = await axios.get(
      "https://archintel-exam-mock-api.onrender.com/company"
    );
    const filtedResponse = response.data.filter((company) => company.id === id);
    return filtedResponse;
  } catch (error) {
    console.log("Error loading Companies!", error);
    return [];
  }
}

async function loadAllCompanies() {
  try {
    const response = await axios.get(
      "https://archintel-exam-mock-api.onrender.com/company"
    );
    return response.data;
  } catch (error) {
    console.log("Error loading All Companies!", error);
    return [];
  }
}

async function addUser(newUser) {
  try {
    const response = await axios.post(
      `https://archintel-exam-mock-api.onrender.com/users`,
      newUser
    );
    return response.data;
  } catch (error) {
    console.log("Error Adding User", error);
  }
}

async function addCompany(newCompany) {
  try {
    const response = await axios.post(
      "https://archintel-exam-mock-api.onrender.com/company",
      newCompany
    );
    return response.data;
  } catch (error) {
    console.log("Error Adding Company", error);
  }
}

async function addArticle(newArticle) {
  try {
    const response = await axios.post(
      "https://archintel-exam-mock-api.onrender.com/article",
      newArticle
    );
    return response.data;
  } catch (error) {
    console.log("Error Adding Article", error);
  }
}

async function updateCompany(id, updateCompanyForm) {
  try {
    const response = await axios.patch(
      `https://archintel-exam-mock-api.onrender.com/company/${id}`,
      updateCompanyForm
    );
    return response.data;
  } catch (error) {
    console.log("Error updating Company", error);
  }
}

async function updateUser(id, updateUserForm) {
  try {
    const response = await axios.patch(
      `https://archintel-exam-mock-api.onrender.com/users/${id}`,
      updateUserForm
    );
    return response.data;
  } catch (error) {
    console.log("Error updating User", error);
  }
}

async function updateArticle(id, updateArticleForm) {
  try {
    const response = await axios.patch(
      `https://archintel-exam-mock-api.onrender.com/article/${id}`,
      updateArticleForm
    );
    return response.data;
  } catch (error) {
    console.log("Error updating User", error);
  }
}

export {
  loadUser,
  loadAllUsers,
  loadForEditArticles,
  loadPublishedArticles,
  loadArticle,
  loadAllArticles,
  loadCompany,
  loadAllCompanies,
  addUser,
  addCompany,
  addArticle,
  updateCompany,
  updateUser,
  updateArticle,
};
