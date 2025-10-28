import { Admin, Resource } from "react-admin";
import { authProvider } from "./providers/authProvider";
import { dataProvider } from "./providers/dataProvider";
import { Dashboard } from "./components/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import BookIcon from "@mui/icons-material/Book";
import AbcIcon from "@mui/icons-material/Abc";
import ChatIcon from "@mui/icons-material/Chat";
import CommentIcon from "@mui/icons-material/Comment";
import SchoolIcon from "@mui/icons-material/School";
import RuleIcon from "@mui/icons-material/Rule";
import QuizIcon from "@mui/icons-material/Quiz";
import { UserList } from "./resources/users/UserList";
import { UserEdit } from "./resources/users/UserEdit";
import { UserShow } from "./resources/users/UserShow";
import { VocabularyTopicList } from "./resources/vocabulary/TopicList";
import { VocabularyTopicEdit } from "./resources/vocabulary/TopicEdit";
import { VocabularyTopicCreate } from "./resources/vocabulary/TopicCreate";
import { VocabularyWordList } from "./resources/vocabulary/WordList";
import { VocabularyWordEdit } from "./resources/vocabulary/WordEdit";
import { VocabularyWordCreate } from "./resources/vocabulary/WordCreate";
import { PhrasesTopicList } from "./resources/phrases/PhrasesTopicList";
import { PhrasesTopicEdit } from "./resources/phrases/PhrasesTopicEdit";
import { PhrasesTopicCreate } from "./resources/phrases/PhrasesTopicCreate";
import { PhraseList } from "./resources/phrases/PhraseList";
import { PhraseEdit } from "./resources/phrases/PhraseEdit";
import { PhraseCreate } from "./resources/phrases/PhraseCreate";
import { GrammarTopicList } from "./resources/grammar/GrammarTopicList";
import { GrammarTopicEdit } from "./resources/grammar/GrammarTopicEdit";
import { GrammarTopicCreate } from "./resources/grammar/GrammarTopicCreate";
import { GrammarRuleList } from "./resources/grammar/GrammarRuleList";
import { GrammarRuleEdit } from "./resources/grammar/GrammarRuleEdit";
import { GrammarRuleCreate } from "./resources/grammar/GrammarRuleCreate";
import { GrammarQuestionList } from "./resources/grammar/GrammarQuestionList";
import { GrammarQuestionCreate } from "./resources/grammar/GrammarQuestionCreate";
import { GrammarQuestionEdit } from "./resources/grammar/GrammarQuestionEdit";

export default function App() {
  return (
    <Admin
      dataProvider={dataProvider}
      authProvider={authProvider}
      dashboard={Dashboard}
      title="English Learning Admin"
    >
      <Resource
        name="users"
        list={UserList}
        edit={UserEdit}
        show={UserShow}
        icon={PeopleIcon}
        options={{ label: "Users" }}
      />

      <Resource
        name="vocabulary/admin/topics"
        list={VocabularyTopicList}
        edit={VocabularyTopicEdit}
        create={VocabularyTopicCreate}
        icon={BookIcon}
        options={{ label: "Vocabulary Topics" }}
      />

      <Resource
        name="vocabulary/admin/words"
        list={VocabularyWordList}
        edit={VocabularyWordEdit}
        create={VocabularyWordCreate}
        icon={AbcIcon}
        options={{ label: "Vocabulary Words" }}
      />

      <Resource
        name="phrases/admin/topics"
        list={PhrasesTopicList}
        edit={PhrasesTopicEdit}
        create={PhrasesTopicCreate}
        icon={ChatIcon}
        options={{ label: "Phrases Topics" }}
      />

      <Resource
        name="phrases/admin/phrase"
        list={PhraseList}
        edit={PhraseEdit}
        create={PhraseCreate}
        icon={CommentIcon}
        options={{ label: "Phrases" }}
      />

      <Resource
        name="grammar/admin/topics"
        list={GrammarTopicList}
        edit={GrammarTopicEdit}
        create={GrammarTopicCreate}
        icon={SchoolIcon}
        options={{ label: "Grammar Topics" }}
      />

      <Resource
        name="grammar/admin/rules"
        list={GrammarRuleList}
        edit={GrammarRuleEdit}
        create={GrammarRuleCreate}
        icon={RuleIcon}
        options={{ label: "Grammar Rules" }}
      />

      <Resource
        name="grammar/admin/questions"
        list={GrammarQuestionList}
        edit={GrammarQuestionEdit}
        create={GrammarQuestionCreate}
        icon={QuizIcon}
        options={{ label: "Grammar Questions" }}
      />
    </Admin>
  );
}
