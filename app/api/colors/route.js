import fs from 'fs';
import path from 'path';

const CSS_PATH = path.join(process.cwd(), 'app', 'globals.css');

// Regex to capture the content inside :root { ... }
// This matches ":root {" literally, then lazily captures everything until the closing "}"
// We assume standard formatting from the existing file
const ROOT_REGEX = /:root\s*{([^}]*)}/;

// Regex to capture .dark :root, .dark { ... }
const DARK_REGEX = /\.dark\s*:root,\s*\.dark\s*{([^}]*)}/;

function parseVariables(blockContent) {
    const variables = {};
    if (!blockContent) return variables;

    // Match --key: value;
    // value can contain spaces, commas, etc.
    const lines = blockContent.split('\n');
    lines.forEach(line => {
        const match = line.match(/^\s*--([^:]+):\s*([^;]+);/);
        if (match) {
            variables[match[1].trim()] = match[2].trim();
        }
    });
    return variables;
}

export async function GET() {
    try {
        const css = fs.readFileSync(CSS_PATH, 'utf8');

        const rootMatch = css.match(ROOT_REGEX);
        const darkMatch = css.match(DARK_REGEX);

        const variables = {
            light: parseVariables(rootMatch ? rootMatch[1] : ''),
            dark: parseVariables(darkMatch ? darkMatch[1] : '')
        };

        return Response.json({ variables });
    } catch (error) {
        console.error(error);
        return Response.json({ error: 'Failed to read CSS' }, { status: 500 });
    }
}

export async function POST(request) {
    const body = await request.json();
    const { light, dark } = body; //Expects { light: { key: val }, dark: { key: val } }

    if (!light && !dark) {
        return Response.json({ error: 'No variables provided' }, { status: 400 });
    }

    try {
        let css = fs.readFileSync(CSS_PATH, 'utf8');

        // Helper to update a block
        const updateBlock = (regex, newVars) => {
            const match = css.match(regex);
            if (match && newVars) {
                let content = match[1];
                Object.entries(newVars).forEach(([key, val]) => {
                    // Regex to find specific variable line inside the block content
                    const varRegex = new RegExp(`(--${key}:\\s*)([^;]+)(;)`);
                    if (varRegex.test(content)) {
                        // Update existing
                        content = content.replace(varRegex, `$1${val}$3`);
                    } else {
                        // Append new (not implemented for simplicity, assuming we edit existing)
                        // If we needed to add new ones, we'd append to content
                    }
                });
                // Replace the old block content with new content
                css = css.replace(match[1], content);
            }
        };

        if (light) updateBlock(ROOT_REGEX, light);
        if (dark) updateBlock(DARK_REGEX, dark);

        fs.writeFileSync(CSS_PATH, css, 'utf8');
        return Response.json({ success: true });
    } catch (error) {
        console.error(error);
        return Response.json({ error: 'Failed to write CSS' }, { status: 500 });
    }
}
