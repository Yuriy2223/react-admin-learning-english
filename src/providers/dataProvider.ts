import { fetchUtils } from "react-admin";
import type { DataProvider } from "react-admin";
import { usersDataProvider } from "./dataProviders/usersDataProvider";
import { vocabularyDataProvider } from "./dataProviders/vocabularyDataProvider";
import { phrasesDataProvider } from "./dataProviders/phrasesDataProvider";
import { API_URL } from "./authProvider";
import { grammarDataProvider } from "./dataProviders/grammarDataProvider";
import { refreshToken } from "../utils/tokenUtils";
import { exercisesDataProvider } from "./dataProviders/exercisesDataProvider";
import { achievementsDataProvider } from "./dataProviders/achievementsDataProvider";

export const httpClient = async (
  url: string,
  options: fetchUtils.Options = {}
) => {
  const customHeaders = (options.headers ||
    new Headers({
      Accept: "application/json",
    })) as Headers;

  const token = localStorage.getItem("token");
  if (token) {
    customHeaders.set("Authorization", `Bearer ${token}`);
  }

  try {
    return await fetchUtils.fetchJson(url, {
      ...options,
      headers: customHeaders,
      credentials: "include",
    });
  } catch (error: unknown) {
    const err = error as { status?: number };
    if (err.status === 401) {
      try {
        const newToken = await refreshToken();

        customHeaders.set("Authorization", `Bearer ${newToken}`);
        return await fetchUtils.fetchJson(url, {
          ...options,
          headers: customHeaders,
          credentials: "include",
        });
      } catch (refreshError) {
        window.location.href = "/login";
        throw refreshError;
      }
    }

    throw error;
  }
};

export const dataProvider: DataProvider = {
  getList: async (resource, params) => {
    if (resource === "users") {
      return usersDataProvider.getList();
    }

    if (resource.startsWith("vocabulary/")) {
      return vocabularyDataProvider.getList(resource, params);
    }

    if (resource.startsWith("phrases/")) {
      return phrasesDataProvider.getList(resource, params);
    }

    if (resource.startsWith("grammar/")) {
      return grammarDataProvider.getList(resource, params);
    }

    if (resource.startsWith("exercises/")) {
      return exercisesDataProvider.getList(resource, params);
    }

    if (resource.startsWith("achievements/")) {
      return achievementsDataProvider.getList(resource);
    }

    const { json } = await httpClient(`${API_URL}/${resource}`);
    return {
      data: Array.isArray(json) ? json : json.data || [],
      total: json.total || (Array.isArray(json) ? json.length : 0),
    };
  },

  getOne: async (resource, params) => {
    if (resource === "users") {
      return usersDataProvider.getOne(resource, params);
    }

    if (resource.startsWith("vocabulary/")) {
      return vocabularyDataProvider.getOne(resource, params);
    }

    if (resource.startsWith("phrases/")) {
      return phrasesDataProvider.getOne(resource, params);
    }

    if (resource.startsWith("grammar/")) {
      return grammarDataProvider.getOne(resource, params);
    }

    if (resource.startsWith("exercises/")) {
      return exercisesDataProvider.getOne(resource, params);
    }

    if (resource.startsWith("achievements/")) {
      return achievementsDataProvider.getOne(resource, params);
    }

    const { json } = await httpClient(`${API_URL}/${resource}/${params.id}`);
    return { data: json };
  },

  getMany: async (resource, params) => {
    if (resource === "users") {
      return usersDataProvider.getMany(resource, params);
    }

    if (resource.startsWith("vocabulary/")) {
      return vocabularyDataProvider.getMany(resource, params);
    }

    if (resource.startsWith("phrases/")) {
      return phrasesDataProvider.getMany(resource, params);
    }

    if (resource.startsWith("grammar/")) {
      return grammarDataProvider.getMany(resource, params);
    }

    if (resource.startsWith("exercises/")) {
      return exercisesDataProvider.getMany(resource, params);
    }

    if (resource.startsWith("achievements/")) {
      return achievementsDataProvider.getMany(resource, params);
    }

    const promises = params.ids.map((id) =>
      httpClient(`${API_URL}/${resource}/${id}`).then(({ json }) => json)
    );
    const data = await Promise.all(promises);
    return { data };
  },

  getManyReference: async (resource, params) => {
    if (resource.startsWith("vocabulary/")) {
      return vocabularyDataProvider.getManyReference(resource, params);
    }

    if (resource.startsWith("phrases/")) {
      return phrasesDataProvider.getManyReference(resource, params);
    }

    if (resource.startsWith("grammar/")) {
      return grammarDataProvider.getManyReference(resource, params);
    }

    if (resource.startsWith("exercises/")) {
      return exercisesDataProvider.getManyReference(resource, params);
    }

    const { json } = await httpClient(`${API_URL}/${resource}`);
    const items = Array.isArray(json) ? json : [];
    const filtered = items.filter(
      (item: Record<string, unknown>) => item[params.target] === params.id
    );

    return {
      data: filtered,
      total: filtered.length,
    };
  },

  create: async (resource, params) => {
    if (resource.startsWith("vocabulary/")) {
      return vocabularyDataProvider.create(resource, params);
    }

    if (resource.startsWith("phrases/")) {
      return phrasesDataProvider.create(resource, params);
    }

    if (resource.startsWith("grammar/")) {
      return grammarDataProvider.create(resource, params);
    }

    if (resource.startsWith("exercises/")) {
      return exercisesDataProvider.create(resource, params);
    }

    if (resource.startsWith("achievements/")) {
      return achievementsDataProvider.create(resource, params);
    }

    const { json } = await httpClient(`${API_URL}/${resource}`, {
      method: "POST",
      body: JSON.stringify(params.data),
    });

    return {
      data: {
        id: (json as { id?: string }).id || Math.random().toString(),
        ...params.data,
        ...json,
      },
    };
  },

  update: async (resource, params) => {
    if (resource === "users") {
      return usersDataProvider.update(resource, params);
    }

    if (resource.startsWith("vocabulary/")) {
      return vocabularyDataProvider.update(resource, params);
    }

    if (resource.startsWith("phrases/")) {
      return phrasesDataProvider.update(resource, params);
    }

    if (resource.startsWith("grammar/")) {
      return grammarDataProvider.update(resource, params);
    }

    if (resource.startsWith("exercises/")) {
      return exercisesDataProvider.update(resource, params);
    }

    if (resource.startsWith("achievements/")) {
      return achievementsDataProvider.update(resource, params);
    }

    const { json } = await httpClient(`${API_URL}/${resource}/${params.id}`, {
      method: "PATCH",
      body: JSON.stringify(params.data),
    });
    return { data: json };
  },

  updateMany: async (resource, params) => {
    if (resource === "users") {
      return usersDataProvider.updateMany(resource, params);
    }

    const promises = params.ids.map((id) =>
      httpClient(`${API_URL}/${resource}/${id}`, {
        method: "PATCH",
        body: JSON.stringify(params.data),
      })
    );
    await Promise.all(promises);
    return { data: params.ids };
  },

  delete: async (resource, params) => {
    if (resource === "users") {
      return usersDataProvider.delete();
    }

    if (resource.startsWith("vocabulary/")) {
      return vocabularyDataProvider.delete(resource, params);
    }

    if (resource.startsWith("phrases/")) {
      return phrasesDataProvider.delete(resource, params);
    }

    if (resource.startsWith("grammar/")) {
      return grammarDataProvider.delete(resource, params);
    }

    if (resource.startsWith("exercises/")) {
      return exercisesDataProvider.delete(resource, params);
    }

    if (resource.startsWith("achievements/")) {
      return achievementsDataProvider.delete(resource, params);
    }

    const { json } = await httpClient(`${API_URL}/${resource}/${params.id}`, {
      method: "DELETE",
    });
    return { data: json };
  },

  deleteMany: async (resource, params) => {
    if (resource === "users") {
      return usersDataProvider.deleteMany();
    }

    if (resource.startsWith("vocabulary/")) {
      return vocabularyDataProvider.deleteMany(resource, params);
    }

    if (resource.startsWith("phrases/")) {
      return phrasesDataProvider.deleteMany(resource, params);
    }

    if (resource.startsWith("grammar/")) {
      return grammarDataProvider.deleteMany(resource, params);
    }

    if (resource.startsWith("exercises/")) {
      return exercisesDataProvider.deleteMany(resource, params);
    }

    if (resource.startsWith("achievements/")) {
      return achievementsDataProvider.deleteMany(resource, params);
    }

    const promises = params.ids.map((id) =>
      httpClient(`${API_URL}/${resource}/${id}`, {
        method: "DELETE",
      })
    );
    await Promise.all(promises);
    return { data: params.ids };
  },
};
