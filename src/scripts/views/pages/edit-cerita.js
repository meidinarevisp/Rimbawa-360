import UrlParser from "../../routes/url-parser";
import { editCeritaTemplate } from "../templates/template-creator";

const editCerita = {
  async render() {
    // Mendapatkan informasi dari URL menggunakan UrlParser
    const urlParams = UrlParser.parseActiveUrlWithoutCombiner();

    // Memanggil fungsi berandaTemplate dengan data tertentu
    const renderedTemplate = editCeritaTemplate(urlParams);

    return renderedTemplate;
  },

  async afterRender() {},
};

export default editCerita;
