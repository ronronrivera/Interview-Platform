// PISTON API is a service for code execution


const PISTON_API = "https://emkc.org/api/v2/piston"

const LANGUAGE_VERSIONS = {
    javascript: {language: "javascript", version: "18.15.0"},
    python: {language: "python", version: "3.10.0"},
    cpp: {language: "cpp", version: "10.2.0"},
}


/**
 * @param {string} language - programming language
 * @param {string} code - source code to execute 
 * @returns {Promise<success:boolean, output?:string, error?: string>} 
 */

export async function executeCode(language, code){
    try {
        const languageConfig = LANGUAGE_VERSIONS[language];

        if(!languageConfig){
            return {
                success: false,
                error: `Unsupported language: ${language}`
            }
        }

        const response = await fetch(`${PISTON_API}/execute`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                language: languageConfig.language,
                version: languageConfig.version,
                files: [
                    {
                        name:`main.${getFileExtension(language)}`,
                        content: code
                    }
                ]
            })
        })


        if(!response.ok){
            return {
                success: false,
                error: `HTTP error status: ${response.status}`
            }
        }

        const data = await response.json();

        // Piston may return run.output or run.stdout depending on language/version
        const run = data?.run ?? {};
        const compile = data?.compile ?? {};

        const stdout = run?.output ?? run?.stdout ?? "";
        const stderr = run?.stderr ?? "";
        const compileStderr = compile?.stderr ?? compile?.output ?? "";

        // If there are compile errors (common for C++), surface them first
        if (compileStderr && compileStderr.length > 0) {
            return {
                success: false,
                output: stdout || "",
                error: `Compile error:\n${compileStderr}`,
                raw: data,
            };
        }

        if (stderr && stderr.length > 0) {
            return {
                success: false,
                output: stdout || "",
                error: stderr,
                raw: data,
            };
        }

        return {
            success: true,
            output: stdout || "No Output",
            raw: data,
        }

    } catch (error) {
        return {
            success: false,
            error: `Failed to execute code: ${error.message}`,
        } 
    }
}

function getFileExtension(language){
    const extensions = {
        javascript: "js",
        python: "py",
        cpp: "cpp",
    }

    return extensions[language] || "txt";
}
