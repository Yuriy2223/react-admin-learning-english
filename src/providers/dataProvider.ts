// import { fetchUtils } from "react-admin";
// import type { DataProvider } from "react-admin";
// import type { User } from "../types";

// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// // HTTP клієнт з токеном
// const httpClient = (url: string, options: fetchUtils.Options = {}) => {
//   const customHeaders = (options.headers ||
//     new Headers({
//       Accept: "application/json",
//     })) as Headers;

//   const token = localStorage.getItem("token");
//   if (token) {
//     customHeaders.set("Authorization", `Bearer ${token}`);
//   }

//   return fetchUtils.fetchJson(url, {
//     ...options,
//     headers: customHeaders,
//     credentials: "include",
//   });
// };

// export const dataProvider: DataProvider = {
//   // Отримання списку записів
//   getList: async (resource) => {
//     // Для users використовуємо спеціальний ендпоінт
//     if (resource === "users") {
//       const { json } = await httpClient(`${API_URL}/users/all`);

//       // json це масив UserDto[]
//       const users = json as User[];
//       return {
//         data: users.map((user) => ({
//           id: user.id,
//           email: user.email,
//           name: user.name,
//           avatar: user.avatar,
//           roles: user.roles,
//           isEmailVerified: user.isEmailVerified,
//           googleId: user.googleId,
//         })),
//         total: users.length,
//       };
//     }

//     // Для інших ресурсів - стандартна логіка
//     const { json } = await httpClient(`${API_URL}/${resource}`);

//     return {
//       data: Array.isArray(json) ? json : json.data || [],
//       total: json.total || (Array.isArray(json) ? json.length : 0),
//     };
//   },

//   // Отримання одного запису
//   getOne: async (resource, params) => {
//     const { json } = await httpClient(`${API_URL}/${resource}/${params.id}`);
//     return { data: json };
//   },

//   // Отримання багатьох записів за ID
//   getMany: async (resource, params) => {
//     if (resource === "users") {
//       const { json } = await httpClient(`${API_URL}/users/all`);
//       const users = json as User[];
//       const filteredUsers = users.filter((u) => params.ids.includes(u.id));
//       return { data: filteredUsers };
//     }

//     // Для інших ресурсів робимо окремі запити
//     const promises = params.ids.map((id) =>
//       httpClient(`${API_URL}/${resource}/${id}`).then(({ json }) => json)
//     );
//     const data = await Promise.all(promises);
//     return { data };
//   },

//   // Отримання записів за зовнішнім ключем
//   getManyReference: async (resource, params) => {
//     const { json } = await httpClient(`${API_URL}/${resource}`);

//     // Фільтруємо на клієнті
//     const items = Array.isArray(json) ? json : [];
//     const filtered = items.filter(
//       (item: Record<string, unknown>) => item[params.target] === params.id
//     );

//     return {
//       data: filtered,
//       total: filtered.length,
//     };
//   },

//   // Створення запису
//   create: async (resource, params) => {
//     const { json } = await httpClient(`${API_URL}/${resource}`, {
//       method: "POST",
//       body: JSON.stringify(params.data),
//     });

//     // Правильна типізація для react-admin
//     return {
//       data: {
//         id: (json as { id?: string }).id || Math.random().toString(),
//         ...params.data,
//         ...json,
//       },
//     };
//   },

//   // Оновлення одного запису
//   update: async (resource, params) => {
//     if (resource === "users") {
//       // Для users використовуємо PATCH /users/:id/roles
//       if (params.data.roles) {
//         const { json } = await httpClient(
//           `${API_URL}/users/${params.id}/roles`,
//           {
//             method: "PATCH",
//             body: JSON.stringify({
//               userId: params.id,
//               roles: params.data.roles,
//             }),
//           }
//         );
//         return { data: json };
//       }

//       // Або PATCH /users/profile для name/avatar
//       const { json } = await httpClient(`${API_URL}/users/profile`, {
//         method: "PATCH",
//         body: JSON.stringify({
//           name: params.data.name,
//           avatar: params.data.avatar,
//         }),
//       });
//       return { data: json };
//     }

//     const { json } = await httpClient(`${API_URL}/${resource}/${params.id}`, {
//       method: "PATCH",
//       body: JSON.stringify(params.data),
//     });
//     return { data: json };
//   },

//   // Оновлення багатьох записів
//   updateMany: async (resource, params) => {
//     if (resource === "users") {
//       // Для users оновлюємо кожного окремо
//       const promises = params.ids.map((id) =>
//         httpClient(`${API_URL}/users/${id}/roles`, {
//           method: "PATCH",
//           body: JSON.stringify({
//             userId: id,
//             roles: params.data.roles,
//           }),
//         })
//       );
//       await Promise.all(promises);
//       return { data: params.ids };
//     }

//     const promises = params.ids.map((id) =>
//       httpClient(`${API_URL}/${resource}/${id}`, {
//         method: "PATCH",
//         body: JSON.stringify(params.data),
//       })
//     );
//     await Promise.all(promises);
//     return { data: params.ids };
//   },

//   // Видалення одного запису
//   delete: async (resource, params) => {
//     // Для users видалення заборонено
//     if (resource === "users") {
//       throw new Error("Видалення користувачів заборонено");
//     }

//     const { json } = await httpClient(`${API_URL}/${resource}/${params.id}`, {
//       method: "DELETE",
//     });
//     return { data: json };
//   },

//   // Видалення багатьох записів
//   deleteMany: async (resource, params) => {
//     // Для users видалення заборонено
//     if (resource === "users") {
//       throw new Error("Видалення користувачів заборонено");
//     }

//     const promises = params.ids.map((id) =>
//       httpClient(`${API_URL}/${resource}/${id}`, {
//         method: "DELETE",
//       })
//     );
//     await Promise.all(promises);
//     return { data: params.ids };
//   },
// };
import { fetchUtils } from "react-admin";
import type { DataProvider } from "react-admin";
import { usersDataProvider } from "./dataProviders/usersDataProvider";
import { vocabularyDataProvider } from "./dataProviders/vocabularyDataProvider";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// HTTP клієнт з токеном
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
    // Users
    if (resource === "users") {
      return usersDataProvider.getList(resource, params);
    }

    // Vocabulary
    if (resource.startsWith("vocabulary/")) {
      return vocabularyDataProvider.getList(resource, params);
    }

    // Дефолтна логіка для інших ресурсів
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
      return usersDataProvider.delete(resource, params);
    }

    if (resource.startsWith("vocabulary/")) {
      return vocabularyDataProvider.delete(resource, params);
    }

    const { json } = await httpClient(`${API_URL}/${resource}/${params.id}`, {
      method: "DELETE",
    });
    return { data: json };
  },

  deleteMany: async (resource, params) => {
    if (resource === "users") {
      return usersDataProvider.deleteMany(resource, params);
    }

    if (resource.startsWith("vocabulary/")) {
      return vocabularyDataProvider.deleteMany(resource, params);
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
