import type {
  GetOneParams,
  GetManyParams,
  CreateParams,
  UpdateParams,
  DeleteParams,
  DeleteManyParams,
  GetListResult,
  GetOneResult,
  GetManyResult,
  CreateResult,
  UpdateResult,
  DeleteResult,
  DeleteManyResult,
} from "react-admin";
import { httpClient } from "../dataProvider";
import type { Achievement } from "../../types";
import { API_URL } from "../authProvider";

export const achievementsDataProvider = {
  getList: async (resource: string): Promise<GetListResult> => {
    if (resource === "achievements/admin") {
      const { json } = await httpClient(`${API_URL}/achievements/admin/all`);
      const achievements = json as Achievement[];
      return {
        data: achievements,
        total: achievements.length,
      };
    }

    throw new Error(`Unknown achievements resource: ${resource}`);
  },

  getOne: async (
    resource: string,
    params: GetOneParams
  ): Promise<GetOneResult> => {
    if (resource === "achievements/admin") {
      const { json } = await httpClient(`${API_URL}/achievements/admin/all`);
      const achievements = json as Achievement[];
      const achievement = achievements.find((a) => a.id === params.id);
      if (!achievement) {
        throw new Error("Achievement not found");
      }
      return { data: achievement };
    }

    throw new Error(`Unknown achievements resource: ${resource}`);
  },

  getMany: async (
    resource: string,
    params: GetManyParams
  ): Promise<GetManyResult> => {
    if (resource === "achievements/admin") {
      const { json } = await httpClient(`${API_URL}/achievements/admin/all`);
      const achievements = json as Achievement[];
      const filtered = achievements.filter((a) => params.ids.includes(a.id));
      return { data: filtered };
    }

    return { data: [] };
  },

  create: async (
    resource: string,
    params: CreateParams
  ): Promise<CreateResult> => {
    if (resource === "achievements/admin") {
      const { json } = await httpClient(`${API_URL}/achievements/admin`, {
        method: "POST",
        body: JSON.stringify(params.data),
      });
      return { data: json as Achievement };
    }

    throw new Error(`Unknown achievements resource: ${resource}`);
  },

  update: async (
    resource: string,
    params: UpdateParams
  ): Promise<UpdateResult> => {
    if (resource === "achievements/admin") {
      const { json } = await httpClient(
        `${API_URL}/achievements/admin/${params.id}`,
        {
          method: "PATCH",
          body: JSON.stringify(params.data),
        }
      );
      return { data: json as Achievement };
    }

    throw new Error(`Unknown achievements resource: ${resource}`);
  },

  delete: async (
    resource: string,
    params: DeleteParams
  ): Promise<DeleteResult> => {
    if (resource === "achievements/admin") {
      await httpClient(`${API_URL}/achievements/admin/${params.id}`, {
        method: "DELETE",
      });
      return { data: params.previousData as Achievement };
    }

    throw new Error(`Unknown achievements resource: ${resource}`);
  },

  deleteMany: async (
    resource: string,
    params: DeleteManyParams
  ): Promise<DeleteManyResult> => {
    if (resource === "achievements/admin") {
      const promises = params.ids.map((id) =>
        httpClient(`${API_URL}/achievements/admin/${id}`, {
          method: "DELETE",
        })
      );
      await Promise.all(promises);
      return { data: params.ids };
    }

    throw new Error(`Unknown achievements resource: ${resource}`);
  },
};
