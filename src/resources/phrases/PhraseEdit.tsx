import {
  Edit,
  SimpleForm,
  TextInput,
  ReferenceInput,
  SelectInput,
  required,
} from "react-admin";

export const PhraseEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput
        source="phrase"
        label="Фраза"
        validate={required()}
        fullWidth
      />
      <TextInput
        source="translation"
        label="Переклад"
        validate={required()}
        fullWidth
      />
      <TextInput source="audioUrl" label="URL аудіо" fullWidth />

      <ReferenceInput source="topicId" reference="phrases/admin/topics">
        <SelectInput optionText="title" validate={required()} />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);
