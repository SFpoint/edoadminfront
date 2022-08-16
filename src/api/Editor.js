import { repository, baseURL } from "@/api/base";

export default {
  async findFields(body) {
    const { data } = await repository.post(
      baseURL + "/docDescription/findFields",
      body
    );
    return data;
  },
};
