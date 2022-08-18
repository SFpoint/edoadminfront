import { repository, baseURL } from "@/api/base";

export default {
  async saveChanges(item) {
    console.log(item);
    const { data } = await repository.put(baseURL + "/docFields", item);
    return data;
  },
};
