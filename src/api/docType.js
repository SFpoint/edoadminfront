import { repository, baseURL } from "@/api/base";

export default {
  async getDocType() {
    const { data } = await repository.get(baseURL + "/docType/findAll");
    return data;
  },
};
