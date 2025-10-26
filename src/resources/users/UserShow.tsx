import {
  Show,
  SimpleShowLayout,
  TextField,
  EmailField,
  BooleanField,
  ImageField,
  FunctionField,
} from "react-admin";
import { Chip } from "@mui/material";

export const UserShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" label="ID" />
      <ImageField source="avatar" label="Аватар" />
      <TextField source="name" label="Ім'я" />
      <EmailField source="email" label="Email" />
      <FunctionField
        label="Ролі"
        render={(record) => (
          <>
            {record.roles?.map((role: string) => (
              <Chip key={role} label={role} sx={{ mr: 1 }} />
            ))}
          </>
        )}
      />
      <BooleanField source="isEmailVerified" label="Email підтверджено" />
      <TextField source="googleId" label="Google ID" />
    </SimpleShowLayout>
  </Show>
);
