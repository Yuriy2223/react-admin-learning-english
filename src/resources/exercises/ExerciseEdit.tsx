import {
  Edit,
  SimpleForm,
  TextInput,
  ReferenceInput,
  SelectInput,
  ArrayInput,
  SimpleFormIterator,
  NumberInput,
  required,
  minValue,
} from "react-admin";
import { Box, Typography } from "@mui/material";

export const ExerciseEdit = () => {
  return (
    <Edit title="Редагувати вправу">
      <SimpleForm>
        <Box sx={{ width: "100%", maxWidth: 600 }}>
          <Typography variant="h6" gutterBottom>
            Інформація про вправу
          </Typography>

          <ReferenceInput source="topicId" reference="exercises/admin/topics">
            <SelectInput
              optionText="title"
              label="Тема"
              validate={required()}
              fullWidth
            />
          </ReferenceInput>

          <SelectInput
            source="type"
            label="Тип вправи"
            choices={[
              { id: "multiple_choice", name: "Множинний вибір" },
              { id: "fill_blank", name: "Заповнити пропуск" },
              { id: "translation", name: "Переклад" },
            ]}
            validate={required()}
            fullWidth
          />

          <TextInput
            source="question"
            label="Питання"
            validate={required()}
            multiline
            rows={3}
            fullWidth
          />

          <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
            Варіанти відповідей
          </Typography>

          <ArrayInput source="options" label="Опції" validate={required()}>
            <SimpleFormIterator inline>
              <TextInput
                source=""
                label="Варіант"
                helperText={false}
                validate={required()}
                fullWidth
                sx={{ width: "100%" }}
              />
            </SimpleFormIterator>
          </ArrayInput>

          <TextInput
            source="correctAnswer"
            label="Правильна відповідь"
            validate={required()}
            fullWidth
            helperText="Введіть точну правильну відповідь"
          />

          <NumberInput
            source="points"
            label="Бали за вправу"
            validate={[required(), minValue(1)]}
            fullWidth
          />
        </Box>
      </SimpleForm>
    </Edit>
  );
};
