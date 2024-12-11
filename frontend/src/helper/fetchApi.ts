import { site } from "../site_state";

interface IFetch {
  API_URI: string;
  method?: string;
  bearer?: boolean;
  body?: any;
}

export const fetchApi = async ({
  API_URI,
  method = "GET",
  bearer = false,
  body,
}: IFetch) => {
  const apiUrl: string = site;
  const token: string | null = localStorage.getItem("accessToken") || null;
  const headers: any = { "Content-Type": "application/json" };

  if (bearer && token) headers["Authorization"] = `Bearer ${token}`;

  try {
    const response = await fetch(`${apiUrl}${API_URI}`, {
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

