import CodeMirror from "@uiw/react-codemirror";
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

const CodeEditor = ({Language,code,setCode,viewOnly,customHeight}) => {
    return (
        <div className="">

    <CodeMirror    
        value={code}
        extensions={languageExtension[Language] ? languageExtension[Language] : [] }
        height={customHeight ? customHeight :"250px"} 
        theme="dark"
        onChange={(value)=>setCode(value)}
        readOnly={viewOnly}
        />
        </div>
  );
} 

export default CodeEditor;