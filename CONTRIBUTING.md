# Contributing

Nyxx is free and open-source project, and all contributions are welcome and highly appreciated. However, please conform to the following guidelines when possible.

## Writing docs
Docs are written in markdown format and compiled with the [docusaurus](https://docusaurus.io) package.

Our environement is Nodejs for SSR (server side rendering)\* TypeScript React to render components; so you need to understand the fundamentals of typescript and React.
We're also using [pnpm](https://pnpm.io) as the package manager for this project, you can simply install it by executing `npm i -g pnpm`.

You can compile the documentation by executing `pnpm build`; the execute `pnpm serve` to navigate trough your compiled docs.

If you're developing, use the `pnpm start` command that will render instantanly the changes you've made in the markdown docs or the components.

\* Even if it's all static files, docusaurus is a mix between SSR and SSG (Static site generation) - [Read here for more explanations](https://docusaurus.io/docs/advanced/ssg)