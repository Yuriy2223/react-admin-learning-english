import {
  Create,
  SimpleForm,
  TextInput,
  SelectInput,
  required,
} from "react-admin";

export const PhrasesTopicCreate = () => (
  <Create>
    <SimpleForm>
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
    </SimpleForm>
  </Create>
);
