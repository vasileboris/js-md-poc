import {
    readFileSync,
    writeFileSync,
    existsSync,
    mkdirSync
} from 'fs';
import path from 'path';
import marked from 'marked';
import MarkdownIt from 'markdown-it';
import highlightJs from 'highlight.js';

const htmlFolder = 'html';
if (!existsSync(htmlFolder)){
    mkdirSync(htmlFolder);
}

const args = process.argv.slice(2);
const mdFilePath = args[0];
const mdFile = path.basename(mdFilePath);
console.log(`Read md file ${mdFilePath}`);
const mdContent = readFileSync(mdFilePath, {encoding: 'utf8'});

const highlightCssContent = readFileSync('./node_modules/highlight.js/styles/github.css', 'utf8');

//Use marked to generate html
marked.setOptions({
    highlight: function(code) {
        return highlightJs.highlightAuto(code).value;
    }
});
const markedHtmlFile = `${htmlFolder}/${mdFile}-marked.html`;
console.log(`Generate marked html in ${markedHtmlFile}`);
const markedHtmlContent = marked(mdContent);
const markedHighlightHtmlContent =
`<!DOCTYPE html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <title>Marked</title>
  <style>${highlightCssContent}</style>
  </head>
  <body>${markedHtmlContent}</body>
</html>`;
writeFileSync(markedHtmlFile, markedHighlightHtmlContent, {encoding: 'utf8'});

//Use MarkdownIt to generate html
const markdownIt = new MarkdownIt({
    highlight: function(code) {
        return highlightJs.highlightAuto(code).value;
    }
});
const markdownItHtmlFile = `${htmlFolder}/${mdFile}-markdown-it.html`;
console.log(`Generate markdown-it html in ${markdownItHtmlFile}`);
const markdownItHtmlContent = markdownIt.render(mdContent);
const markdownItHighlightHtmlContent =
    `<!DOCTYPE html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <title>Marked</title>
  <style>${highlightCssContent}</style>
  </head>
  <body>${markdownItHtmlContent}</body>
</html>`;
writeFileSync(markdownItHtmlFile, markdownItHighlightHtmlContent, {encoding: 'utf8'});
