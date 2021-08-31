const dark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

const prismStyle = document.createElement('link');
prismStyle.rel = 'stylesheet'

if(dark) {
    prismStyle.href = './code-themes/dark.css';
} else {
    prismStyle.href = './code-themes/light.css';
}

document.head.appendChild(prismStyle);

document.addEventListener('DOMContentLoaded', (event) => {
    hljs.highlightAll();
});
