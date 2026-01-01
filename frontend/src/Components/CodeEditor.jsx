import { Editor } from "@monaco-editor/react"
import { LoaderIcon, PlayIcon } from "lucide-react"
import { LANGUAGE_CONFIG } from "../data/problem"

function CodeEditor({
    selectedLanguage,
    code,
    isRunning,
    onLanguageChange,
    onCodeChange,
    onRunCode,
    currentProblemId
}) {
    


    const handleEditorWillMount = (monaco) => {
        monaco.editor.defineTheme("daisy-night", {
            base: "vs-dark",
            inherit: true,
            rules: [
                { token: "comment", foreground: "6B7280" },
                { token: "keyword", foreground: "FBBF24", fontStyle: "bold" },
                { token: "number", foreground: "34D399" },
                { token: "string", foreground: "F472B6" }
            ],
            colors: {
                "editor.background": "#1E293B",
                "editor.foreground": "#F8FAFC",
                "editor.lineHighlightBackground": "#334155",
                "editorCursor.foreground": "#FBBF24",
                "editor.selectionBackground": "#475569",
            }
        });
    };

    return (
        <div className="h-full bg-base-300 flex flex-col">
            <div className="flex items-center justify-between px-4 py-3 bg-base-100 border-t border-base-300">
                <div className="flex items-center gap-3">
                    <img src={LANGUAGE_CONFIG[selectedLanguage].icon} 
                        alt={LANGUAGE_CONFIG[selectedLanguage].name}
                        className="size-6"
                    />
                    <select className="select select-sm"
                        value={selectedLanguage}
                        onChange={onLanguageChange}
                    >
                        {Object.entries(LANGUAGE_CONFIG).map(([key, lang]) =>(
                            <option key={key} value={key}>
                                {lang.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button className="btn btn-primary btn-sm gap-2" disabled={isRunning} onClick={onRunCode}>
                    {isRunning? (
                        <>
                            <LoaderIcon className="size-4 animate-spin"/>
                            Running...
                        </>) : 
                        (<>
                            <PlayIcon className="size-4"/>
                            Run Code
                        </>)}
                </button>
            </div>
            <div className="flex-1">
                <Editor
                    key={currentProblemId + selectedLanguage} 
                    height={"100%"}
                    language={LANGUAGE_CONFIG[selectedLanguage].monacoLang}
                    defaultValue={code}
                    onChange={onCodeChange}
                    theme="daisy-night"
                    beforeMount={handleEditorWillMount}
                    options={{
                        fontSize: 20,
                        lineNumbers: "on",
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                        minimap: {enabled: false}
                    }}
                />   
            </div>
        </div>
    )
}

export default CodeEditor
