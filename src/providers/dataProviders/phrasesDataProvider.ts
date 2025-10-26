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
import type { Topic, Phrase } from "../../types";
import { API_URL } from "../authProvider";

export const phrasesDataProvider = {
  getList: async (
    resource: string,
    params: GetListParams
  ): Promise<GetListResult> => {
    if (resource === "phrases/admin/topics") {
      const { json } = await httpClient(`${API_URL}/phrases/admin/topics`);
      const topics = json as Topic[];
      return {
        data: topics,
        total: topics.length,
      };
    }

    if (resource === "phrases/admin/phrase") {
      const topicId = params.filter?.topicId;

      if (!topicId) {
        return {
          data: [],
          total: 0,
        };
      }

      const { json } = await httpClient(
        `${API_URL}/phrases/admin/topics/${topicId}/phrase`
      );

      const phrases = json as Phrase[];
      return {
        data: phrases,
        total: phrases.length,
      };
    }

    throw new Error(`Unknown phrases resource: ${resource}`);
  },

  getOne: async (
    resource: string,
    params: GetOneParams
  ): Promise<GetOneResult> => {
    if (resource === "phrases/admin/topics") {
      const { json } = await httpClient(`${API_URL}/phrases/admin/topics`);
      const topics = json as Topic[];
      const topic = topics.find((t) => t.id === params.id);
      if (!topic) {
        throw new Error("Topic not found");
      }
      return { data: topic };
    }

    if (resource === "phrases/admin/phrase") {
      const { json: topics } = await httpClient(
        `${API_URL}/phrases/admin/topics`
      );
      for (const topic of topics as Topic[]) {
        const { json: phrases } = await httpClient(
          `${API_URL}/phrases/admin/topics/${topic.id}/phrase`
        );
        const phrase = (phrases as Phrase[]).find((p) => p.id === params.id);
        if (phrase) {
          return { data: phrase };
        }
      }
      throw new Error("Phrase not found");
    }

    throw new Error(`Unknown phrases resource: ${resource}`);
  },

  getMany: async (
    resource: string,
    params: GetManyParams
  ): Promise<GetManyResult> => {
    if (resource === "phrases/admin/topics") {
      const { json } = await httpClient(`${API_URL}/phrases/admin/topics`);
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
    if (resource === "phrases/admin/phrase" && params.target === "topicId") {
      const { json } = await httpClient(
        `${API_URL}/phrases/admin/topics/${params.id}/phrase`
      );
      const phrases = json as Phrase[];
      return {
        data: phrases,
        total: phrases.length,
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
    if (resource === "phrases/admin/topics") {
      const { json } = await httpClient(`${API_URL}/phrases/admin/topics`, {
        method: "POST",
        body: JSON.stringify(params.data),
      });
      return { data: json as Topic };
    }

    if (resource === "phrases/admin/phrase") {
      const { json } = await httpClient(`${API_URL}/phrases/admin/phrase`, {
        method: "POST",
        body: JSON.stringify(params.data),
      });
      return { data: json as Phrase };
    }

    throw new Error(`Unknown phrases resource: ${resource}`);
  },

  update: async (
    resource: string,
    params: UpdateParams
  ): Promise<UpdateResult> => {
    if (resource === "phrases/admin/topics") {
      const { json } = await httpClient(
        `${API_URL}/phrases/admin/topics/${params.id}`,
        {
          method: "PATCH",
          body: JSON.stringify(params.data),
        }
      );
      return { data: json as Topic };
    }

    if (resource === "phrases/admin/phrase") {
      const { json } = await httpClient(
        `${API_URL}/phrases/admin/phrase/${params.id}`,
        {
          method: "PATCH",
          body: JSON.stringify(params.data),
        }
      );
      return { data: json as Phrase };
    }

    throw new Error(`Unknown phrases resource: ${resource}`);
  },

  delete: async (
    resource: string,
    params: DeleteParams
  ): Promise<DeleteResult> => {
    if (resource === "phrases/admin/topics") {
      await httpClient(`${API_URL}/phrases/admin/topics/${params.id}`, {
        method: "DELETE",
      });
      return { data: params.previousData as Topic };
    }

    if (resource === "phrases/admin/phrase") {
      await httpClient(`${API_URL}/phrases/admin/phrase/${params.id}`, {
        method: "DELETE",
      });
      return { data: params.previousData as Phrase };
    }

    throw new Error(`Unknown phrases resource: ${resource}`);
  },

  deleteMany: async (
    resource: string,
    params: DeleteManyParams
  ): Promise<DeleteManyResult> => {
    if (resource === "phrases/admin/topics") {
      const promises = params.ids.map((id) =>
        httpClient(`${API_URL}/phrases/admin/topics/${id}`, {
          method: "DELETE",
        })
      );
      await Promise.all(promises);
      return { data: params.ids };
    }

    if (resource === "phrases/admin/phrase") {
      const promises = params.ids.map((id) =>
        httpClient(`${API_URL}/phrases/admin/phrase/${id}`, {
          method: "DELETE",
        })
      );
      await Promise.all(promises);
      return { data: params.ids };
    }

    throw new Error(`Unknown phrases resource: ${resource}`);
  },
};
