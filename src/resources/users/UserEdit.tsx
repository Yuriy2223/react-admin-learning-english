import {
  Edit,
  SimpleForm,
  TextInput,
  SelectArrayInput,
  required,
  email,
} from "react-admin";

export const UserEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="name" label="Ім'я" validate={required()} />
      <TextInput
        source="email"
        label="Email"
        type="email"
        validate={[required(), email()]}
        disabled
      />

      <SelectArrayInput
        source="roles"
        label="Ролі"
        choices={[
          { id: "user", name: "User" },
          { id: "admin", name: "Admin" },
          { id: "moderator", name: "Moderator" },
        ]}
        validate={required()}
      />

      <TextInput source="avatar" label="Аватар URL" fullWidth />
    </SimpleForm>
  </Edit>
);
