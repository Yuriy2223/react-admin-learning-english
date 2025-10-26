import { fetchUtils } from "react-admin";
import type { DataProvider } from "react-admin";
import { usersDataProvider } from "./dataProviders/usersDataProvider";
import { vocabularyDataProvider } from "./dataProviders/vocabularyDataProvider";
import { phrasesDataProvider } from "./dataProviders/phrasesDataProvider";
import { API_URL } from "./authProvider";

export const httpClient = (url: string, options: fetchUtils.Options = {}) => {
  const customHeaders = (options.headers ||
    new Headers({
      Accept: "application/json",
    })) as Headers;

  const token = localStorage.getItem("token");
  if (token) {
    customHeaders.set("Authorization", `Bearer ${token}`);
  }

  return fetchUtils.fetchJson(url, {
    ...options,
    headers: customHeaders,
    credentials: "include",
  });
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

    const promises = params.ids.map((id) =>
      httpClient(`${API_URL}/${resource}/${id}`, {
        method: "DELETE",
      })
    );
    await Promise.all(promises);
    return { data: params.ids };
  },
};
