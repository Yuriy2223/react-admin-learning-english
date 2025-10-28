import {
  List,
  Datagrid,
  TextField,
  DeleteButton,
  FilterButton,
  TopToolbar,
  CreateButton,
  ReferenceInput,
  AutocompleteInput,
  EditButton,
  useGetList,
} from "react-admin";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ListActions = () => (
  <TopToolbar>
    <FilterButton />
    <CreateButton />
  </TopToolbar>
);

const questionFilters = [
  <ReferenceInput source="topicId" reference="grammar/admin/topics" alwaysOn>
    <AutocompleteInput
      optionText="title"
      label="Topic"
      sx={{ minWidth: 300 }}
      clearIcon={null}
    />
  </ReferenceInput>,
];

const GrammarQuestionListContent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: topics, isLoading } = useGetList("grammar/admin/topics");

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const currentFilter = searchParams.get("filter");
    const filterObj = currentFilter ? JSON.parse(currentFilter) : null;

    if (!filterObj?.topicId && topics && topics.length > 0 && !isLoading) {
      const firstTopicId = topics[0].id;
      searchParams.set("filter", JSON.stringify({ topicId: firstTopicId }));
      navigate(`${location.pathname}?${searchParams.toString()}`, {
        replace: true,
      });
    }
  }, [topics, isLoading, navigate, location]);

  return (
    <List
      filters={questionFilters}
      actions={<ListActions />}
      filterDefaultValues={{ topicId: undefined }}
    >
      <Datagrid>
        <TextField source="question" label="Питання" />
        <TextField source="options" label="Опції" />
        <TextField source="explanation" label="Пояснення" />
        <EditButton />
        <DeleteButton />
      </Datagrid>
    </List>
  );
};

export const GrammarQuestionList = GrammarQuestionListContent;
