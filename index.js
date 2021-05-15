import {
    readFileSync,
    writeFileSync,
    existsSync,
    mkdirSync
} from 'fs';
import path from 'path';
import marked from 'marked';
import MarkdownIt from 'markdown-it';

const htmlFolder = 'html';
if (!existsSync(htmlFolder)){
    mkdirSync(htmlFolder);
}

const args = process.argv.slice(2);
const mdFilePath = args[0];
const mdFile = path.basename(mdFilePath);
console.log(`Read md file ${mdFilePath}`);
const mdContent = readFileSync(mdFilePath, {encoding: 'utf8'});

//Use marked to generate html
const markedHtmlFile = `${htmlFolder}/${mdFile}-marked.html`;
console.log(`Generate marked html in ${markedHtmlFile}`);
const markedHtmlContent = marked(mdContent);
writeFileSync(markedHtmlFile, markedHtmlContent, {encoding: 'utf8'});

//Use MarkdownIt to generate html
const markdownIt = new MarkdownIt();
const markdownItHtmlFile = `${htmlFolder}/${mdFile}-markdown-it.html`;
console.log(`Generate markdown-it html in ${markdownItHtmlFile}`);
const markdownItHtmlContent = markdownIt.render(mdContent);
writeFileSync(markdownItHtmlFile, markdownItHtmlContent, {encoding: 'utf8'});
