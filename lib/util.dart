import 'dart:convert';
import 'dart:io';

import 'package:jaspr_content/components/sidebar.dart';
import 'package:jaspr_content/jaspr_content.dart';
import 'package:jaspr_og/jaspr_og.dart';
import 'package:nyxx_docs/components/og_image.dart';
import 'package:nyxx_docs/main.server.dart';

typedef SidebarFrontMatter = ({
  String title,
  String? description,
  int sidebarPosition,
  String? category,
});

typedef Category = ({
  String label,
  int position,
});

bool isPrideMonth() => DateTime.timestamp().month == DateTime.june;

Future<Map<String, String>> loadGrammar() async {
  return {
    for (final e
        in await Directory(
              'lib/grammar',
            )
            .listSync()
            .whereType<File>()
            .map((f) async => (await f.readAsString(), f.path.split('/').last.split('.').first))
            .wait)
      e.$2: e.$1,
  };
}

Map<String, Object?> _parseYamlFrontMatter(String rawYaml) {
  final lines = rawYaml.split('\n');
  final frontMatter = <String, Object?>{};

  for (final line in lines) {
    final separatorIndex = line.indexOf(':');
    if (separatorIndex != -1) {
      final key = line.substring(0, separatorIndex).trim();
      final value = line.substring(separatorIndex + 1).trim();

      frontMatter[key] = int.tryParse(value) ?? value;
    }
  }

  return frontMatter;
}

Future<(Map<String, SidebarFrontMatter>, Map<String, Category>)> readFrontMatterAndCategories() async {
  final docsDir = Directory(
    docsLocation,
  ).listSync(recursive: true).whereType<File>();

  final mdFiles = docsDir.where((file) => file.path.endsWith('.md')).toList();

  final frontMatter = <String, SidebarFrontMatter>{};
  for (final file in mdFiles) {
    final content = await file.readAsString();
    final rawFrontMatter = RegExp(r'^---\n([\s\S]+?)\n---').firstMatch(content)?.group(1);
    if (rawFrontMatter != null) {
      final parsedFrontMatter = _parseYamlFrontMatter(rawFrontMatter);
      final title = parsedFrontMatter['title'] as String? ?? 'Untitled';
      final description = parsedFrontMatter['description'] as String?;
      final sidebarPosition = parsedFrontMatter['sidebar_position'] as int? ?? 9999;
      final category = parsedFrontMatter['category'] as String?;
      frontMatter.putIfAbsent(
        file.path.replaceFirst('$docsLocation/', ''),
        () => (
          title: title,
          description: description,
          sidebarPosition: sidebarPosition,
          category: category,
        ),
      );
    }
  }

  final categoryFiles = docsDir.where((f) => f.path.endsWith('_category_.json')).toList();
  final categories = <String, Category>{};

  for (final file in categoryFiles) {
    final content = await file.readAsString();
    final categoryData = json.decode(content) as Map<String, Object?>;
    final label = categoryData['label'] as String? ?? 'Uncategorized';
    final position = categoryData['position'] as int? ?? 9999;
    final relativePath = file.path.replaceFirst('$docsLocation/', '').replaceFirst('/_category_.json', '');
    categories[relativePath] = (label: label, position: position);
  }

  return (frontMatter, categories);
}

List<MemoryPage> loadMemoryPages(Map<String, SidebarFrontMatter> frontMatter) => [
  for (final f in frontMatter.entries)
    MemoryPage.builder(
      path: f.key.replaceFirst('.md', '.png').replaceAll('///', '/'),
      builder: (ctx) => ImageResponse(OgImage(title: f.value.title, description: f.value.description)),
      applyLayout: false,
      keepSuffix: true,
    ),
];

Sidebar buildSidebar(Map<String, SidebarFrontMatter> frontMatter, Map<String, Category> categories) => Sidebar(
  groups: [
    for (final categoryEntry
        in categories.entries.toList()..sort((a, b) => a.value.position.compareTo(b.value.position)))
      SidebarGroup(
        title: categoryEntry.value.label,
        links:
            (frontMatter.entries.where((entry) {
                  final frontMatter = entry.value;
                  final fileCategory = frontMatter.category ?? 'Uncategorized';
                  return fileCategory.toLowerCase() == categoryEntry.key.toLowerCase();
                }).toList()..sort((a, b) => a.value.sidebarPosition.compareTo(b.value.sidebarPosition)))
                .map(
                  (entry) => SidebarLink(
                    text: entry.value.title,
                    href: '/${entry.key.replaceFirst('.md', '')}',
                  ),
                )
                .toList(),
      ),
  ],
);
