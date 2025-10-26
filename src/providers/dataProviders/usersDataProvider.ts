import type {
  GetOneParams,
  GetManyParams,
  UpdateParams,
  UpdateManyParams,
  GetListResult,
  GetOneResult,
  GetManyResult,
  UpdateResult,
  UpdateManyResult,
  DeleteResult,
  DeleteManyResult,
} from "react-admin";
import { httpClient } from "../dataProvider";
import type { User } from "../../types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const usersDataProvider = {
  getList: async (): Promise<GetListResult> => {
    const { json } = await httpClient(`${API_URL}/users/all`);
    const users = json as User[];
    return {
      data: users.map((user) => ({
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        roles: user.roles,
        isEmailVerified: user.isEmailVerified,
        googleId: user.googleId,
      })),
      total: users.length,
    };
  },

  getOne: async (
    _resource: string,
    params: GetOneParams
  ): Promise<GetOneResult> => {
    const { json } = await httpClient(`${API_URL}/users/${params.id}`);
    return { data: json };
  },

  getMany: async (
    _resource: string,
    params: GetManyParams
  ): Promise<GetManyResult> => {
    const { json } = await httpClient(`${API_URL}/users/all`);
    const users = json as User[];
    const filteredUsers = users.filter((u) => params.ids.includes(u.id));
    return { data: filteredUsers };
  },

  update: async (
    _resource: string,
    params: UpdateParams
  ): Promise<UpdateResult> => {
    if (params.data.roles) {
      const { json } = await httpClient(`${API_URL}/users/${params.id}/roles`, {
        method: "PATCH",
        body: JSON.stringify({
          userId: params.id,
          roles: params.data.roles,
        }),
      });
      return { data: json };
    }

    const { json } = await httpClient(`${API_URL}/users/profile`, {
      method: "PATCH",
      body: JSON.stringify({
        name: params.data.name,
        avatar: params.data.avatar,
      }),
    });
    return { data: json };
  },

  updateMany: async (
    _resource: string,
    params: UpdateManyParams
  ): Promise<UpdateManyResult> => {
    const promises = params.ids.map((id) =>
      httpClient(`${API_URL}/users/${id}/roles`, {
        method: "PATCH",
        body: JSON.stringify({
          userId: id,
          roles: params.data.roles,
        }),
      })
    );
    await Promise.all(promises);
    return { data: params.ids };
  },

  delete: async (): Promise<DeleteResult> => {
    throw new Error("Видалення користувачів заборонено");
  },

  deleteMany: async (): Promise<DeleteManyResult> => {
    throw new Error("Видалення користувачів заборонено");
  },
};
