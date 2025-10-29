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
import type { TopicExercise, Exercise } from "../../types";
import { API_URL } from "../authProvider";

export const exercisesDataProvider = {
  getList: async (
    resource: string,
    params: GetListParams
  ): Promise<GetListResult> => {
    if (resource === "exercises/admin/topics") {
      const { json } = await httpClient(`${API_URL}/exercises/admin/topics`);
      const topics = json as TopicExercise[];
      return {
        data: topics,
        total: topics.length,
      };
    }

    if (resource === "exercises/admin/exercises") {
      const topicId = params.filter?.topicId;

      if (!topicId) {
        return {
          data: [],
          total: 0,
        };
      }

      const { json } = await httpClient(
        `${API_URL}/exercises/admin/topics/${topicId}/exercises`
      );

      const exercises = json as Exercise[];
      return {
        data: exercises,
        total: exercises.length,
      };
    }

    throw new Error(`Unknown exercises resource: ${resource}`);
  },

  getOne: async (
    resource: string,
    params: GetOneParams
  ): Promise<GetOneResult> => {
    if (resource === "exercises/admin/topics") {
      const { json } = await httpClient(`${API_URL}/exercises/admin/topics`);
      const topics = json as TopicExercise[];
      const topic = topics.find((t) => t.id === params.id);
      if (!topic) {
        throw new Error("Topic not found");
      }
      return { data: topic };
    }

    if (resource === "exercises/admin/exercises") {
      const { json: topics } = await httpClient(
        `${API_URL}/exercises/admin/topics`
      );
      for (const topic of topics as TopicExercise[]) {
        const { json: exercises } = await httpClient(
          `${API_URL}/exercises/admin/topics/${topic.id}/exercises`
        );
        const exercise = (exercises as Exercise[]).find(
          (e) => e.id === params.id
        );
        if (exercise) {
          return { data: exercise };
        }
      }
      throw new Error("Exercise not found");
    }

    throw new Error(`Unknown exercises resource: ${resource}`);
  },

  getMany: async (
    resource: string,
    params: GetManyParams
  ): Promise<GetManyResult> => {
    if (resource === "exercises/admin/topics") {
      const { json } = await httpClient(`${API_URL}/exercises/admin/topics`);
      const topics = json as TopicExercise[];
      const filtered = topics.filter((t) => params.ids.includes(t.id));
      return { data: filtered };
    }

    return { data: [] };
  },

  getManyReference: async (
    resource: string,
    params: GetManyReferenceParams
  ): Promise<GetManyReferenceResult> => {
    if (
      resource === "exercises/admin/exercises" &&
      params.target === "topicId"
    ) {
      const { json } = await httpClient(
        `${API_URL}/exercises/admin/topics/${params.id}/exercises`
      );
      const exercises = json as Exercise[];
      return {
        data: exercises,
        total: exercises.length,
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
    if (resource === "exercises/admin/topics") {
      const { json } = await httpClient(`${API_URL}/exercises/admin/topics`, {
        method: "POST",
        body: JSON.stringify(params.data),
      });
      return { data: json as TopicExercise };
    }

    if (resource === "exercises/admin/exercises") {
      const { json } = await httpClient(
        `${API_URL}/exercises/admin/exercises`,
        {
          method: "POST",
          body: JSON.stringify(params.data),
        }
      );
      return { data: json as Exercise };
    }

    throw new Error(`Unknown exercises resource: ${resource}`);
  },

  update: async (
    resource: string,
    params: UpdateParams
  ): Promise<UpdateResult> => {
    if (resource === "exercises/admin/topics") {
      const { json } = await httpClient(
        `${API_URL}/exercises/admin/topics/${params.id}`,
        {
          method: "PATCH",
          body: JSON.stringify(params.data),
        }
      );
      return { data: json as TopicExercise };
    }

    if (resource === "exercises/admin/exercises") {
      const { json } = await httpClient(
        `${API_URL}/exercises/admin/exercises/${params.id}`,
        {
          method: "PATCH",
          body: JSON.stringify(params.data),
        }
      );
      return { data: json as Exercise };
    }

    throw new Error(`Unknown exercises resource: ${resource}`);
  },

  delete: async (
    resource: string,
    params: DeleteParams
  ): Promise<DeleteResult> => {
    if (resource === "exercises/admin/topics") {
      await httpClient(`${API_URL}/exercises/admin/topics/${params.id}`, {
        method: "DELETE",
      });
      return { data: params.previousData as TopicExercise };
    }

    if (resource === "exercises/admin/exercises") {
      await httpClient(`${API_URL}/exercises/admin/exercises/${params.id}`, {
        method: "DELETE",
      });
      return { data: params.previousData as Exercise };
    }

    throw new Error(`Unknown exercises resource: ${resource}`);
  },

  deleteMany: async (
    resource: string,
    params: DeleteManyParams
  ): Promise<DeleteManyResult> => {
    if (resource === "exercises/admin/topics") {
      const promises = params.ids.map((id) =>
        httpClient(`${API_URL}/exercises/admin/topics/${id}`, {
          method: "DELETE",
        })
      );
      await Promise.all(promises);
      return { data: params.ids };
    }

    if (resource === "exercises/admin/exercises") {
      const promises = params.ids.map((id) =>
        httpClient(`${API_URL}/exercises/admin/exercises/${id}`, {
          method: "DELETE",
        })
      );
      await Promise.all(promises);
      return { data: params.ids };
    }

    throw new Error(`Unknown exercises resource: ${resource}`);
  },
};
