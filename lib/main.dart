import 'package:jaspr/server.dart';

import 'package:jaspr_content/components/callout.dart';
import 'package:jaspr_content/components/code_block.dart';
import 'package:jaspr_content/components/github_button.dart';
import 'package:jaspr_content/components/header.dart';
import 'package:jaspr_content/components/image.dart';
import 'package:jaspr_content/components/tabs.dart';
import 'package:jaspr_content/components/theme_toggle.dart';
import 'package:jaspr_content/jaspr_content.dart';
import 'package:jaspr_content/theme.dart';
import 'package:nyxx_docs/extension/og_tags_extension.dart';
import 'package:nyxx_docs/util.dart';

import 'jaspr_options.dart';

const docsLocation = 'docs';
const dataLocation = '$docsLocation/_data';

const isPreview = bool.fromEnvironment('website.preview');

const domain = 'https://${isPreview ? 'preview.' : ''}nyxx.org';

void main() async {
  Jaspr.initializeApp(
    options: defaultJasprOptions,
  );

  final (frontMatter, categories) = await readFrontMatterAndCategories();

  final app = ContentApp.custom(
    loaders: [
      FilesystemLoader(docsLocation),
      MemoryLoader(
        pages: loadMemoryPages(frontMatter),
      ),
    ],
    configResolver: PageConfig.all(
      dataLoaders: [FilesystemDataLoader(dataLocation)],
      templateEngine: MustacheTemplateEngine(
        partialsRoot: '$docsLocation/_includes',
      ),
      parsers: [
        MarkdownParser(),
      ],
      extensions: [
        HeadingAnchorsExtension(),
        TableOfContentsExtension(),
        const OgTagsExtension()
      ],
      components: [
        Callout(),
        CodeBlock(grammars: await loadGrammar()),
        Tabs(),
        Image(zoom: true),
      ],
      layouts: [
        DocsLayout(
          header: Header(
            title: 'Nyxx Docs',
            logo: '/images/logo${isPrideMonth() ? '-pride' : ''}.svg',
            items: [
              ThemeToggle(),
              GitHubButton(repo: 'nyxx-discord/nyxx'),
            ],
          ),
          sidebar: buildSidebar(frontMatter, categories),
        ),
      ],
      theme: ContentTheme(
        primary: ThemeColor(ThemeColors.blue.$300, dark: ThemeColors.blue.$100),
        background: ThemeColor(ThemeColors.teal.$50, dark: ThemeColors.cyan.$950),
        colors: [
          ContentColors.quoteBorders.apply(ThemeColors.blue.$400),
        ],
      ),
    ),
  );

  runApp(app);
}
