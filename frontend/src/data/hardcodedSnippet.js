export const Snippets=[
    {
        title:"React Component",
        Language:"javascript",
        date:"2 days ago",
        createdAt: "2025-08-20T14:57:38.094Z",
        code:`import CodeMirror from "@uiw/react-codemirror";
import {javascript} from "@codemirror/lang-javascript";
import {python} from "@codemirror/lang-python";
import {cpp} from "@codemirror/lang-cpp";
import {java} from "@codemirror/lang-java";

//mapping language with codemirror extenstions

const languageExtension = {
    javascript:javascript({typescript:true}),
    python: python(),
    cpp: cpp(),
    java: java(),
    plaintext: null,
}

const CodeEditor = ({Language,code,setCode,viewOnly}) => {
    return (
        <div className="">

    <CodeMirror    
        value={code}
        extensions={languageExtension[Language] ? languageExtension[Language] : [] }
        height="250px"
        theme="dark"
        onChange={(value)=>setCode(value)}
        readOnly={viewOnly}
        />
        </div>
  );
} 

export default CodeEditor;`

    },
    {
        title:"Css button styles",
        Language:"CSS",
        date:"4 days ago"
    },
    {
        title:"Python Api endpoints",
        Language:"Python",
        date:"3 days ago"
    },
    {
        title:"Python Api endpoints",
        Language:"Python",
        date:"3 days ago"
    },
    {
        title:"Python Api endpoints",
        Language:"Python",
        date:"3 days ago"
    },
    {
        title:"Python Api endpoints",
        Language:"Python",
        date:"3 days ago"
    },
    {
        title:"Python Api endpoints",
        Language:"Python",
        date:"3 days ago"
    }
]