import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { getUrl, GetUrlWithPathOutput } from "aws-amplify/storage";

const client = generateClient<Schema>();

function App() {
    const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
    const [storageUrl, setStorageUrl] = useState<GetUrlWithPathOutput | null>(null);

    useEffect(() => {
        client.models.Todo.observeQuery().subscribe({
            next: (data) => setTodos([...data.items]),
        });
    }, []);

    useEffect(() => {
        async function fetchUrl() {
            try {
                const result = await getUrl({
                    options: {bucket: 'bg-audience-data-3008'},
                    path: "cleanroom/data/table/coll8/impression/impression1_out.csv",
                });
                setStorageUrl(result);
            } catch (err) {
                console.error("Failed to fetch storage URL", err);
            }
        }
        void fetchUrl();
    }, []);

    function createTodo() {
        client.models.Todo.create({ content: window.prompt("Todo content") });
    }

    console.log('storageUrl', storageUrl)

    return (
        <main>
            <h1>My todos</h1>
            <a href={storageUrl?.url.toString()}>
                Test url download
            </a>
            <button onClick={createTodo}>+ new</button>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>{todo.content}</li>
                ))}
            </ul>
            <div>
                🥳 App successfully hosted. Try creating a new todo.
                <br />
                <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
                    Review next step of this tutorial.
                </a>
            </div>
        </main>
    );
}

export default App;
