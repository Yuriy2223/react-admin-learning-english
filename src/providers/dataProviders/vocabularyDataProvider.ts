// import type {
//   GetOneParams,
//   GetManyParams,
//   GetManyReferenceParams,
//   CreateParams,
//   UpdateParams,
//   DeleteParams,
//   DeleteManyParams,
//   GetListResult,
//   GetOneResult,
//   GetManyResult,
//   GetManyReferenceResult,
//   CreateResult,
//   UpdateResult,
//   DeleteResult,
//   DeleteManyResult,
// } from "react-admin";
// import { httpClient } from "../dataProvider";
// import type { Topic, Word } from "../../types";

// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// export const vocabularyDataProvider = {
//   getList: async (resource: string): Promise<GetListResult> => {
//     if (resource === "vocabulary/admin/topics") {
//       const { json } = await httpClient(`${API_URL}/vocabulary/admin/topics`);
//       const topics = json as Topic[];
//       return {
//         data: topics,
//         total: topics.length,
//       };
//     }

//     if (resource === "vocabulary/admin/words") {
//       return {
//         data: [],
//         total: 0,
//       };
//     }

//     throw new Error(`Unknown vocabulary resource: ${resource}`);
//   },

//   getOne: async (
//     resource: string,
//     params: GetOneParams
//   ): Promise<GetOneResult> => {
//     if (resource === "vocabulary/admin/topics") {
//       const { json } = await httpClient(`${API_URL}/vocabulary/admin/topics`);
//       const topics = json as Topic[];
//       const topic = topics.find((t) => t.id === params.id);
//       if (!topic) {
//         throw new Error("Topic not found");
//       }
//       return { data: topic };
//     }

//     if (resource === "vocabulary/admin/words") {
//       const { json: topics } = await httpClient(
//         `${API_URL}/vocabulary/admin/topics`
//       );
//       for (const topic of topics as Topic[]) {
//         const { json: words } = await httpClient(
//           `${API_URL}/vocabulary/admin/topics/${topic.id}/words`
//         );
//         const word = (words as Word[]).find((w) => w.id === params.id);
//         if (word) {
//           return { data: word };
//         }
//       }
//       throw new Error("Word not found");
//     }

//     throw new Error(`Unknown vocabulary resource: ${resource}`);
//   },

//   getMany: async (
//     resource: string,
//     params: GetManyParams
//   ): Promise<GetManyResult> => {
//     if (resource === "vocabulary/admin/topics") {
//       const { json } = await httpClient(`${API_URL}/vocabulary/admin/topics`);
//       const topics = json as Topic[];
//       const filtered = topics.filter((t) => params.ids.includes(t.id));
//       return { data: filtered };
//     }

//     return { data: [] };
//   },

//   getManyReference: async (
//     resource: string,
//     params: GetManyReferenceParams
//   ): Promise<GetManyReferenceResult> => {
//     if (resource === "vocabulary/admin/words" && params.target === "topicId") {
//       const { json } = await httpClient(
//         `${API_URL}/vocabulary/admin/topics/${params.id}/words`
//       );
//       const words = json as Word[];
//       return {
//         data: words,
//         total: words.length,
//       };
//     }

//     return {
//       data: [],
//       total: 0,
//     };
//   },

//   create: async (
//     resource: string,
//     params: CreateParams
//   ): Promise<CreateResult> => {
//     if (resource === "vocabulary/admin/topics") {
//       const { json } = await httpClient(`${API_URL}/vocabulary/admin/topics`, {
//         method: "POST",
//         body: JSON.stringify(params.data),
//       });
//       return { data: json as Topic };
//     }

//     if (resource === "vocabulary/admin/words") {
//       const { json } = await httpClient(`${API_URL}/vocabulary/admin/words`, {
//         method: "POST",
//         body: JSON.stringify(params.data),
//       });
//       return { data: json as Word };
//     }

//     throw new Error(`Unknown vocabulary resource: ${resource}`);
//   },

//   update: async (
//     resource: string,
//     params: UpdateParams
//   ): Promise<UpdateResult> => {
//     if (resource === "vocabulary/admin/topics") {
//       const { json } = await httpClient(
//         `${API_URL}/vocabulary/admin/topics/${params.id}`,
//         {
//           method: "PATCH",
//           body: JSON.stringify(params.data),
//         }
//       );
//       return { data: json as Topic };
//     }

//     if (resource === "vocabulary/admin/words") {
//       const { json } = await httpClient(
//         `${API_URL}/vocabulary/admin/words/${params.id}`,
//         {
//           method: "PATCH",
//           body: JSON.stringify(params.data),
//         }
//       );
//       return { data: json as Word };
//     }

//     throw new Error(`Unknown vocabulary resource: ${resource}`);
//   },

//   delete: async (
//     resource: string,
//     params: DeleteParams
//   ): Promise<DeleteResult> => {
//     if (resource === "vocabulary/admin/topics") {
//       await httpClient(`${API_URL}/vocabulary/admin/topics/${params.id}`, {
//         method: "DELETE",
//       });
//       return { data: params.previousData as Topic };
//     }

//     if (resource === "vocabulary/admin/words") {
//       await httpClient(`${API_URL}/vocabulary/admin/words/${params.id}`, {
//         method: "DELETE",
//       });
//       return { data: params.previousData as Word };
//     }

//     throw new Error(`Unknown vocabulary resource: ${resource}`);
//   },

//   deleteMany: async (
//     resource: string,
//     params: DeleteManyParams
//   ): Promise<DeleteManyResult> => {
//     const promises = params.ids.map((id) =>
//       httpClient(`${API_URL}/${resource}/${id}`, {
//         method: "DELETE",
//       })
//     );
//     await Promise.all(promises);
//     return { data: params.ids };
//   },
// };
import type {
  GetListParams,
  GetOneParams,
  GetManyParams,
  GetManyReferenceParams,
  CreateParams,
  UpdateParams,
  DeleteParams,
  DeleteManyParams,
  GetListResult,
  GetOneResult,
  GetManyResult,
  GetManyReferenceResult,
  CreateResult,
  UpdateResult,
  DeleteResult,
  DeleteManyResult,
} from "react-admin";
import { httpClient } from "../dataProvider";
import type { Topic, Word } from "../../types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const vocabularyDataProvider = {
  // getList: async (
  //   resource: string,
  //   params: GetListParams
  // ): Promise<GetListResult> => {
  //   if (resource === "vocabulary/admin/topics") {
  //     const { json } = await httpClient(`${API_URL}/vocabulary/admin/topics`);
  //     const topics = json as Topic[];
  //     return {
  //       data: topics,
  //       total: topics.length,
  //     };
  //   }

  //   if (resource === "vocabulary/admin/words") {
  //     const topicId = params.filter?.topicId;

  //     if (!topicId) {
  //       return {
  //         data: [],
  //         total: 0,
  //       };
  //     }

  //     const { json } = await httpClient(
  //       `${API_URL}/vocabulary/admin/topics/${topicId}/words`
  //     );
  //     const words = json as Word[];
  //     return {
  //       data: words,
  //       total: words.length,
  //     };
  //   }

  //   throw new Error(`Unknown vocabulary resource: ${resource}`);
  // },
  getList: async (
    resource: string,
    params: GetListParams
  ): Promise<GetListResult> => {
    console.log("getList called:", { resource, params });

    if (resource === "vocabulary/admin/topics") {
      const { json } = await httpClient(`${API_URL}/vocabulary/admin/topics`);
      const topics = json as Topic[];
      return {
        data: topics,
        total: topics.length,
      };
    }

    if (resource === "vocabulary/admin/words") {
      const topicId = params.filter?.topicId;

      console.log("Words getList, topicId:", topicId);

      if (!topicId) {
        console.log("No topicId, returning empty");
        return {
          data: [],
          total: 0,
        };
      }

      console.log("Fetching words for topic:", topicId);
      const { json } = await httpClient(
        `${API_URL}/vocabulary/admin/topics/${topicId}/words`
      );
      console.log("Words response:", json);
      const words = json as Word[];
      return {
        data: words,
        total: words.length,
      };
    }

    throw new Error(`Unknown vocabulary resource: ${resource}`);
  },

  getOne: async (
    resource: string,
    params: GetOneParams
  ): Promise<GetOneResult> => {
    if (resource === "vocabulary/admin/topics") {
      const { json } = await httpClient(`${API_URL}/vocabulary/admin/topics`);
      const topics = json as Topic[];
      const topic = topics.find((t) => t.id === params.id);
      if (!topic) {
        throw new Error("Topic not found");
      }
      return { data: topic };
    }

    if (resource === "vocabulary/admin/words") {
      const { json: topics } = await httpClient(
        `${API_URL}/vocabulary/admin/topics`
      );
      for (const topic of topics as Topic[]) {
        const { json: words } = await httpClient(
          `${API_URL}/vocabulary/admin/topics/${topic.id}/words`
        );
        const word = (words as Word[]).find((w) => w.id === params.id);
        if (word) {
          return { data: word };
        }
      }
      throw new Error("Word not found");
    }

    throw new Error(`Unknown vocabulary resource: ${resource}`);
  },

  getMany: async (
    resource: string,
    params: GetManyParams
  ): Promise<GetManyResult> => {
    if (resource === "vocabulary/admin/topics") {
      const { json } = await httpClient(`${API_URL}/vocabulary/admin/topics`);
      const topics = json as Topic[];
      const filtered = topics.filter((t) => params.ids.includes(t.id));
      return { data: filtered };
    }

    return { data: [] };
  },

  getManyReference: async (
    resource: string,
    params: GetManyReferenceParams
  ): Promise<GetManyReferenceResult> => {
    if (resource === "vocabulary/admin/words" && params.target === "topicId") {
      const { json } = await httpClient(
        `${API_URL}/vocabulary/admin/topics/${params.id}/words`
      );
      const words = json as Word[];
      return {
        data: words,
        total: words.length,
      };
    }

    return {
      data: [],
      total: 0,
    };
  },

  create: async (
    resource: string,
    params: CreateParams
  ): Promise<CreateResult> => {
    if (resource === "vocabulary/admin/topics") {
      const { json } = await httpClient(`${API_URL}/vocabulary/admin/topics`, {
        method: "POST",
        body: JSON.stringify(params.data),
      });
      return { data: json as Topic };
    }

    if (resource === "vocabulary/admin/words") {
      const { json } = await httpClient(`${API_URL}/vocabulary/admin/words`, {
        method: "POST",
        body: JSON.stringify(params.data),
      });
      return { data: json as Word };
    }

    throw new Error(`Unknown vocabulary resource: ${resource}`);
  },

  update: async (
    resource: string,
    params: UpdateParams
  ): Promise<UpdateResult> => {
    if (resource === "vocabulary/admin/topics") {
      const { json } = await httpClient(
        `${API_URL}/vocabulary/admin/topics/${params.id}`,
        {
          method: "PATCH",
          body: JSON.stringify(params.data),
        }
      );
      return { data: json as Topic };
    }

    if (resource === "vocabulary/admin/words") {
      const { json } = await httpClient(
        `${API_URL}/vocabulary/admin/words/${params.id}`,
        {
          method: "PATCH",
          body: JSON.stringify(params.data),
        }
      );
      return { data: json as Word };
    }

    throw new Error(`Unknown vocabulary resource: ${resource}`);
  },

  delete: async (
    resource: string,
    params: DeleteParams
  ): Promise<DeleteResult> => {
    if (resource === "vocabulary/admin/topics") {
      await httpClient(`${API_URL}/vocabulary/admin/topics/${params.id}`, {
        method: "DELETE",
      });
      return { data: params.previousData as Topic };
    }

    if (resource === "vocabulary/admin/words") {
      await httpClient(`${API_URL}/vocabulary/admin/words/${params.id}`, {
        method: "DELETE",
      });
      return { data: params.previousData as Word };
    }

    throw new Error(`Unknown vocabulary resource: ${resource}`);
  },

  deleteMany: async (
    resource: string,
    params: DeleteManyParams
  ): Promise<DeleteManyResult> => {
    const promises = params.ids.map((id) =>
      httpClient(`${API_URL}/${resource}/${id}`, {
        method: "DELETE",
      })
    );
    await Promise.all(promises);
    return { data: params.ids };
  },
};
