import UrlParser from "../../routes/url-parser";
import { editProfileTemplate } from "../templates/template-creator";

const editProfile = {
  async render() {
    // Mendapatkan informasi dari URL menggunakan UrlParser
    const urlParams = UrlParser.parseActiveUrlWithoutCombiner();

    // Memanggil fungsi berandaTemplate dengan data tertentu
    const renderedTemplate = editProfileTemplate(urlParams);

    return renderedTemplate;
  },

  async afterRender() {},
};

export default editProfile;
