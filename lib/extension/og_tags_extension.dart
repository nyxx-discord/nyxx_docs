import 'package:jaspr/jaspr.dart';
import 'package:jaspr_content/jaspr_content.dart';
import 'package:nyxx_docs/main.dart';

class OgTagsExtension implements PageExtension {
  const OgTagsExtension();

  @override
  Future<List<Node>> apply(Page page, List<Node> nodes) async => [
    ComponentNode(
      Document.head(
        meta: {
          if (page.data.page['description'] case final String description) 'og:description': description,
          'og:url': '$domain/${page.path.replaceAll('.md', '').replaceAll('index', '')}',
          'og:image': '$domain/${page.path.replaceAll('.md', '.png')}',
          'twitter:card': 'summary_large_image',
        },
      ),
    ),
    ...nodes,
  ];
}
