import {
  List,
  Datagrid,
  TextField,
  EmailField,
  BooleanField,
  EditButton,
  ShowButton,
  SearchInput,
  SelectInput,
  FunctionField,
} from "react-admin";
import { Chip } from "@mui/material";

const userFilters = [
  <SearchInput key="search" source="q" alwaysOn />,
  <SelectInput
    key="role"
    source="roles"
    choices={[
      { id: "user", name: "User" },
      { id: "admin", name: "Admin" },
      { id: "moderator", name: "Moderator" },
    ]}
  />,
];

export const UserList = () => (
  <List filters={userFilters}>
    <Datagrid rowClick="show">
      <TextField source="id" label="ID" />
      <TextField source="name" label="Ім'я" />
      <EmailField source="email" label="Email" />
      <FunctionField
        label="Ролі"
        render={(record) => (
          <>
            {record.roles?.map((role: string) => (
              <Chip key={role} label={role} size="small" sx={{ mr: 0.5 }} />
            ))}
          </>
        )}
      />
      <BooleanField source="isEmailVerified" label="Email підтверджено" />
      <ShowButton />
      <EditButton />
    </Datagrid>
  </List>
);
