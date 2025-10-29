import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
  CreateButton,
  TopToolbar,
  BooleanField,
} from "react-admin";

const ListActions = () => (
  <TopToolbar>
    <CreateButton />
  </TopToolbar>
);

export const AchievementList = () => (
  <List actions={<ListActions />}>
    <Datagrid rowClick="edit">
      <TextField source="title" label="Назва" />
      <TextField source="description" label="Опис" />
      <TextField source="type" label="Тип" />
      <TextField source="category" label="Категорія" />
      <TextField source="target" label="Ціль" />
      <TextField source="points" label="Бали" />
      <BooleanField source="isActive" label="Активно" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);
