import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteButton,
  NumberField,
  ChipField,
  ImageField,
  SearchInput,
  CreateButton,
} from "react-admin";

const topicFilters = [<SearchInput key="search" source="q" alwaysOn />];

export const GrammarTopicList = () => (
  <List filters={topicFilters} actions={<CreateButton />}>
    <Datagrid rowClick="edit">
      <TextField source="title" label="Назва" />
      <TextField source="description" label="Опис" />
      <ChipField source="difficulty" label="Складність" />

      <NumberField source="totalItems" label="Правила" />
      <ImageField source="imageUrl" label="Зображення" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);
