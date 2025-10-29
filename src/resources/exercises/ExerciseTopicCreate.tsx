import {
  Create,
  SimpleForm,
  TextInput,
  SelectInput,
  required,
} from "react-admin";

export const ExerciseTopicCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="title" label="Назва" validate={required()} fullWidth />
      <TextInput
        source="description"
        label="Опис"
        validate={required()}
        multiline
        rows={3}
        fullWidth
      />
      <TextInput source="imageUrl" label="URL зображення" fullWidth />
      <SelectInput
        source="difficulty"
        label="Складність"
        choices={[
          { id: "beginner", name: "Початковий" },
          { id: "intermediate", name: "Середній" },
          { id: "advanced", name: "Просунутий" },
        ]}
        validate={required()}
      />
    </SimpleForm>
  </Create>
);
