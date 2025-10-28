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
import type { Topic, GrammarRule, GrammarQuestion } from "../../types";
import { API_URL } from "../authProvider";

export const grammarDataProvider = {
  getList: async (
    resource: string,
    params: GetListParams
  ): Promise<GetListResult> => {
    if (resource === "grammar/admin/topics") {
      const searchQuery = params.filter?.q;
      const url = searchQuery
        ? `${API_URL}/grammar/admin/topics?q=${encodeURIComponent(searchQuery)}`
        : `${API_URL}/grammar/admin/topics`;

      const { json } = await httpClient(url);
      const topics = json as Topic[];
      return {
        data: topics,
        total: topics.length,
      };
    }

    if (resource === "grammar/admin/rules") {
      const topicId = params.filter?.topicId;

      if (!topicId) {
        return {
          data: [],
          total: 0,
        };
      }

      const { json } = await httpClient(
        `${API_URL}/grammar/admin/topics/${topicId}/rules`
      );

      const rules = json as GrammarRule[];
      return {
        data: rules,
        total: rules.length,
      };
    }

    if (resource === "grammar/admin/questions") {
      const topicId = params.filter?.topicId;

      if (!topicId) {
        return {
          data: [],
          total: 0,
        };
      }

      const { json } = await httpClient(
        `${API_URL}/grammar/admin/topics/${topicId}/questions`
      );

      const rawQuestions = json as Record<string, unknown>[];
      const questions = rawQuestions.map((q) => ({
        ...q,
        id: (q.id as string) || String(q._id),
      })) as GrammarQuestion[];

      return {
        data: questions,
        total: questions.length,
      };
    }

    throw new Error(`Unknown grammar resource: ${resource}`);
  },

  getOne: async (
    resource: string,
    params: GetOneParams
  ): Promise<GetOneResult> => {
    if (resource === "grammar/admin/topics") {
      const { json } = await httpClient(`${API_URL}/grammar/admin/topics`);
      const topics = json as Topic[];
      const topic = topics.find((t) => t.id === params.id);
      if (!topic) {
        throw new Error("Topic not found");
      }
      return { data: topic };
    }

    if (resource === "grammar/admin/rules") {
      const { json: topics } = await httpClient(
        `${API_URL}/grammar/admin/topics`
      );
      for (const topic of topics as Topic[]) {
        const { json: rules } = await httpClient(
          `${API_URL}/grammar/admin/topics/${topic.id}/rules`
        );
        const rule = (rules as GrammarRule[]).find((r) => r.id === params.id);
        if (rule) {
          return { data: rule };
        }
      }
      throw new Error("Rule not found");
    }

    if (resource === "grammar/admin/questions") {
      const { json: topics } = await httpClient(
        `${API_URL}/grammar/admin/topics`
      );
      for (const topic of topics as Topic[]) {
        const { json: questions } = await httpClient(
          `${API_URL}/grammar/admin/topics/${topic.id}/questions`
        );
        const rawQuestions = questions as Record<string, unknown>[];
        const mappedQuestions = rawQuestions.map((q) => ({
          ...q,
          id: (q.id as string) || String(q._id),
        })) as GrammarQuestion[];

        const question = mappedQuestions.find((q) => q.id === params.id);
        if (question) {
          return { data: question };
        }
      }
      throw new Error("Question not found");
    }

    throw new Error(`Unknown grammar resource: ${resource}`);
  },

  getMany: async (
    resource: string,
    params: GetManyParams
  ): Promise<GetManyResult> => {
    if (resource === "grammar/admin/topics") {
      const { json } = await httpClient(`${API_URL}/grammar/admin/topics`);
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
    if (resource === "grammar/admin/rules" && params.target === "topicId") {
      const { json } = await httpClient(
        `${API_URL}/grammar/admin/topics/${params.id}/rules`
      );
      const rules = json as GrammarRule[];
      return {
        data: rules,
        total: rules.length,
      };
    }

    if (resource === "grammar/admin/questions" && params.target === "topicId") {
      const { json } = await httpClient(
        `${API_URL}/grammar/admin/topics/${params.id}/questions`
      );
      const rawQuestions = json as Record<string, unknown>[];
      const questions = rawQuestions.map((q) => ({
        ...q,
        id: (q.id as string) || String(q._id),
      })) as GrammarQuestion[];

      return {
        data: questions,
        total: questions.length,
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
    if (resource === "grammar/admin/topics") {
      const { json } = await httpClient(`${API_URL}/grammar/admin/topics`, {
        method: "POST",
        body: JSON.stringify(params.data),
      });
      return { data: json as Topic };
    }

    if (resource === "grammar/admin/rules") {
      const { json } = await httpClient(`${API_URL}/grammar/admin/rules`, {
        method: "POST",
        body: JSON.stringify(params.data),
      });
      return { data: json as GrammarRule };
    }

    if (resource === "grammar/admin/questions") {
      const { json } = await httpClient(`${API_URL}/grammar/admin/questions`, {
        method: "POST",
        body: JSON.stringify(params.data),
      });
      const rawQuestion = json as Record<string, unknown>;
      const question = {
        ...rawQuestion,
        id: (rawQuestion.id as string) || String(rawQuestion._id),
      } as GrammarQuestion;

      return { data: question };
    }

    throw new Error(`Unknown grammar resource: ${resource}`);
  },

  update: async (
    resource: string,
    params: UpdateParams
  ): Promise<UpdateResult> => {
    if (resource === "grammar/admin/topics") {
      const { json } = await httpClient(
        `${API_URL}/grammar/admin/topics/${params.id}`,
        {
          method: "PATCH",
          body: JSON.stringify(params.data),
        }
      );
      return { data: json as Topic };
    }

    if (resource === "grammar/admin/rules") {
      const { json } = await httpClient(
        `${API_URL}/grammar/admin/rules/${params.id}`,
        {
          method: "PATCH",
          body: JSON.stringify(params.data),
        }
      );
      return { data: json as GrammarRule };
    }

    if (resource === "grammar/admin/questions") {
      const { json } = await httpClient(
        `${API_URL}/grammar/admin/questions/${params.id}`,
        {
          method: "PATCH",
          body: JSON.stringify(params.data),
        }
      );
      const rawQuestion = json as Record<string, unknown>;
      const question = {
        ...rawQuestion,
        id: (rawQuestion.id as string) || String(rawQuestion._id),
      } as GrammarQuestion;

      return { data: question };
    }

    throw new Error(`Unknown grammar resource: ${resource}`);
  },

  delete: async (
    resource: string,
    params: DeleteParams
  ): Promise<DeleteResult> => {
    if (resource === "grammar/admin/topics") {
      await httpClient(`${API_URL}/grammar/admin/topics/${params.id}`, {
        method: "DELETE",
      });
      return { data: params.previousData as Topic };
    }

    if (resource === "grammar/admin/rules") {
      await httpClient(`${API_URL}/grammar/admin/rules/${params.id}`, {
        method: "DELETE",
      });
      return { data: params.previousData as GrammarRule };
    }

    if (resource === "grammar/admin/questions") {
      await httpClient(`${API_URL}/grammar/admin/questions/${params.id}`, {
        method: "DELETE",
      });
      return { data: params.previousData as GrammarQuestion };
    }

    throw new Error(`Unknown grammar resource: ${resource}`);
  },

  deleteMany: async (
    resource: string,
    params: DeleteManyParams
  ): Promise<DeleteManyResult> => {
    if (resource === "grammar/admin/topics") {
      const promises = params.ids.map((id) =>
        httpClient(`${API_URL}/grammar/admin/topics/${id}`, {
          method: "DELETE",
        })
      );
      await Promise.all(promises);
      return { data: params.ids };
    }

    if (resource === "grammar/admin/rules") {
      const promises = params.ids.map((id) =>
        httpClient(`${API_URL}/grammar/admin/rules/${id}`, {
          method: "DELETE",
        })
      );
      await Promise.all(promises);
      return { data: params.ids };
    }

    if (resource === "grammar/admin/questions") {
      const promises = params.ids.map((id) =>
        httpClient(`${API_URL}/grammar/admin/questions/${id}`, {
          method: "DELETE",
        })
      );
      await Promise.all(promises);
      return { data: params.ids };
    }

    throw new Error(`Unknown grammar resource: ${resource}`);
  },
};
