# Contributing

nyxx is free and open-source project, and all contributions are welcome and highly appreciated. However, please conform to the following guidelines when possible.

## Writing docs
Docs are written in markdown format and compiled with the [jaspr](https://jaspr.site) package.

To preview your changes locally, run the following command in the root of the repository:

```bash
dart run jaspr_cli:jaspr serve
```

This will start a local server at `http://localhost:8080` where you can see your changes in real-time.

When writing docs, please ensure that:
- The content is clear, concise, and easy to understand.
- The formatting is consistent with the rest of the documentation.

When writing components, please ensure that you follow [Jaspr's component system](https://docs.jaspr.site/concepts/components).

## Building the site
To build the site for deployment, run the following command in the root of the repository:
```bash
dart run jaspr_cli:jaspr build
```
This will generate the static files in the `build` directory, which can then be deployed to a web server.
