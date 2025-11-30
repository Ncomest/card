import { URL } from "@/constants/consts";
import type { ICardTable, IFetch } from "@/types/types";

export const fetchApi = async ({
  API_URI,
  method = "GET",
  bearer = false,
  body,
}: IFetch): Promise<unknown> => {
  const token: string | null = localStorage.getItem("accessToken") || null;
  const headers: Record<string, string> = { "Content-Type": "application/json" };

  if (bearer && token) headers["Authorization"] = `Bearer ${token}`;

  try {
    const response = await fetch(`${URL}${API_URI}`, {
      method: method,
      headers: headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(
        `Запрос не удался: ${response.status} ${response.statusText}`
      );
    }
  } catch (error) {
    console.error(error, "Ошибка");
    throw error;
  }
};
export const getDataTableLongPolling = async (): Promise<ICardTable[]> => {
  try {
    const response = await fetch(`${URL}/api/table/update`);

    if (!response.ok) {
      const errorText = await response.text();

      throw new Error(
        `Запрос выполнился неудачно: ${response.status} ${errorText}`
      );
    }

    const data = await response.json();
    console.log("api: getDataTableLongPolling: ", data);
    return data;
  } catch (error) {
    console.error("Произошла ошибка в теле запроса", error);
    throw error;
  }
};

export const getDataTable = async () => {
  try {
    const response = await fetch(`${URL}/api/table`);

    if (!response.ok) {
      const errorText = await response.text();

      throw new Error(
        `Запрос выполнился неудачно: ${response.status} ${errorText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Произошла ошибка в теле запроса", error);
    throw error;
  }
};
