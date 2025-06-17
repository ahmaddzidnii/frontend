import axios from "axios";

type GetMeResponse = {
  status: string;
  data: {
    id: string;
    nama: string;
    nim: string;
  };
};

export const getMe = async () => {
  const me = await axios.get<GetMeResponse>("https://dummyjson.com/c/3dee-2be9-436c-811a", {});

  return me.data;
};
