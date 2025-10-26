import {
  Edit,
  SimpleForm,
  TextInput,
  SelectInput,
  ImageField,
  required,
} from "react-admin";

export const PhrasesTopicEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="title" label="Назва" validate={required()} fullWidth />
      <TextInput
        source="description"
        label="Опис"
        validate={required()}
        multiline
        fullWidth
      />

      <SelectInput
        source="difficulty"
        label="Складність"
        choices={[
          { id: "beginner", name: "Beginner" },
          { id: "intermediate", name: "Intermediate" },
          { id: "advanced", name: "Advanced" },
        ]}
        validate={required()}
      />

      <TextInput source="imageUrl" label="URL зображення" fullWidth />
      <ImageField source="imageUrl" label="Попередній перегляд" />
    </SimpleForm>
  </Edit>
);
