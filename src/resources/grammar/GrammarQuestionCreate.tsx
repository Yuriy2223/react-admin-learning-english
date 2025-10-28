import {
  Create,
  SimpleForm,
  TextInput,
  ReferenceInput,
  SelectInput,
  required,
  ArrayInput,
  SimpleFormIterator,
  NumberInput,
  useGetList,
  minValue,
} from "react-admin";
import { Box, Typography, Alert } from "@mui/material";

export const GrammarQuestionCreate = () => {
  const { data: topics, isLoading } = useGetList("grammar/admin/topics");

  if (isLoading) return null;

  return (
    <Create title="Create New Grammar Question">
      <SimpleForm>
        <Box sx={{ width: "100%", maxWidth: 600 }}>
          {!topics || topics.length === 0 ? (
            <Alert severity="warning" sx={{ mb: 2 }}>
              Please create a topic first before adding questions
            </Alert>
          ) : null}

          <Typography variant="h6" gutterBottom>
            Question Information
          </Typography>

          <ReferenceInput source="topicId" reference="grammar/admin/topics">
            <SelectInput
              optionText="title"
              validate={required()}
              fullWidth
              helperText="Select the topic this question belongs to"
            />
          </ReferenceInput>

          <TextInput
            source="question"
            validate={required()}
            multiline
            rows={3}
            fullWidth
            helperText="The question text"
          />

          <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
            Answer Options
          </Typography>

          <Alert severity="info" sx={{ mb: 2 }}>
            Add at least 2 options. The correct answer index starts from 0
            (first option = 0, second = 1, etc.)
          </Alert>

          <ArrayInput
            source="options"
            validate={required()}
            defaultValue={["", "", "", ""]}
          >
            <SimpleFormIterator inline>
              <TextInput
                source=""
                label="Option"
                helperText={false}
                validate={required()}
                fullWidth
                sx={{ width: "100%" }}
              />
            </SimpleFormIterator>
          </ArrayInput>

          <NumberInput
            source="correctAnswer"
            validate={[required(), minValue(0)]}
            fullWidth
            helperText="Index of the correct answer (0 for first option, 1 for second, etc.)"
            defaultValue={0}
          />

          <TextInput
            source="explanation"
            multiline
            rows={3}
            fullWidth
            helperText="Optional explanation for the correct answer"
          />
        </Box>
      </SimpleForm>
    </Create>
  );
};
