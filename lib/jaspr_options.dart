// dart format off
// ignore_for_file: type=lint

// GENERATED FILE, DO NOT MODIFY
// Generated with jaspr_builder

import 'package:jaspr/jaspr.dart';
import 'package:jaspr_content/components/_internal/code_block_copy_button.dart'
    as prefix0;
import 'package:jaspr_content/components/_internal/tab_bar.dart' as prefix1;
import 'package:jaspr_content/components/_internal/zoomable_image.dart'
    as prefix2;
import 'package:jaspr_content/components/callout.dart' as prefix3;
import 'package:jaspr_content/components/code_block.dart' as prefix4;
import 'package:jaspr_content/components/github_button.dart' as prefix5;
import 'package:jaspr_content/components/image.dart' as prefix6;
import 'package:jaspr_content/components/sidebar_toggle_button.dart' as prefix7;
import 'package:jaspr_content/components/tabs.dart' as prefix8;
import 'package:jaspr_content/components/theme_toggle.dart' as prefix9;

/// Default [JasprOptions] for use with your jaspr project.
///
/// Use this to initialize jaspr **before** calling [runApp].
///
/// Example:
/// ```dart
/// import 'jaspr_options.dart';
///
/// void main() {
///   Jaspr.initializeApp(
///     options: defaultJasprOptions,
///   );
///
///   runApp(...);
/// }
/// ```
JasprOptions get defaultJasprOptions => JasprOptions(
  clients: {
    prefix0.CodeBlockCopyButton: ClientTarget<prefix0.CodeBlockCopyButton>(
      'jaspr_content:components/_internal/code_block_copy_button',
    ),

    prefix1.TabBar: ClientTarget<prefix1.TabBar>(
      'jaspr_content:components/_internal/tab_bar',
      params: _prefix1TabBar,
    ),

    prefix2.ZoomableImage: ClientTarget<prefix2.ZoomableImage>(
      'jaspr_content:components/_internal/zoomable_image',
      params: _prefix2ZoomableImage,
    ),

    prefix5.GitHubButton: ClientTarget<prefix5.GitHubButton>(
      'jaspr_content:components/github_button',
      params: _prefix5GitHubButton,
    ),

    prefix7.SidebarToggleButton: ClientTarget<prefix7.SidebarToggleButton>(
      'jaspr_content:components/sidebar_toggle_button',
    ),

    prefix9.ThemeToggle: ClientTarget<prefix9.ThemeToggle>(
      'jaspr_content:components/theme_toggle',
    ),
  },
  styles: () => [
    ...prefix1.TabBar.styles,
    ...prefix2.ZoomableImage.styles,
    ...prefix3.Callout.styles,
    ...prefix4.CodeBlock.styles,
    ...prefix5.GitHubButton.styles,
    ...prefix6.Image.styles,
    ...prefix8.Tabs.styles,
    ...prefix9.ThemeToggleState.styles,
  ],
);

Map<String, dynamic> _prefix1TabBar(prefix1.TabBar c) => {
  'initialValue': c.initialValue,
  'items': c.items,
};
Map<String, dynamic> _prefix2ZoomableImage(prefix2.ZoomableImage c) => {
  'src': c.src,
  'alt': c.alt,
  'caption': c.caption,
};
Map<String, dynamic> _prefix5GitHubButton(prefix5.GitHubButton c) => {
  'repo': c.repo,
};
