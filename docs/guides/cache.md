---
title: Cache
author: l7ssha
timestamp: 2021-09-21
category: guides
sidebar_position: 1
---

Caching in nyxx is managed automatically with internal wrappers around existing Dart features. Nyxx features a
[`ICache<T, S>`](https://pub.dev/documentation/nyxx/latest/nyxx/ICache-class.html) interface which is the base class for all caches used in the library.
Like any other aspect of nyxx, cache handling can be altered to fit your needs.

You can pass an instance of `CacheOptions` when creating your `INyxx` instance to alter caching behavior across the whole bot:

```dart
/// Options for configuring cache. Allows to specify where and which entities should be cached and preserved in cache
class CacheOptions {
  /// Defines in which locations members will be cached
  CachePolicyLocation memberCachePolicyLocation = CachePolicyLocation();

  /// Defines which members are preserved in cache
  CachePolicy<IMember> memberCachePolicy = MemberCachePolicy.def;

  /// Defines where channel entities are preserved cache. Defaults to [CachePolicyLocation] with additional objectConstructor set to true
  CachePolicyLocation channelCachePolicyLocation = CachePolicyLocation()..objectConstructor = true;

  /// Defines which channel entities are preserved in cache.
  CachePolicy<IChannel> channelCachePolicy = ChannelCachePolicy.def;

  /// Defines in which places user can be cached
  CachePolicyLocation userCachePolicyLocation = CachePolicyLocation();

  /// Defines in which locations members will be cached
  CachePolicyLocation messageCachePolicyLocation = CachePolicyLocation();

  /// Defines which members are preserved in cache
  CachePolicy<IMessage> messageCachePolicy = MessageCachePolicy.def;
}
```

For now there are a few things you can do:

1.  Alter when objects are added to cache (from websocket events or HTTPS requests);
2.  Control which objects are added to cache (by specifying a predicate to choose which objects to cache)

#### CachePolicyLocation

This setting allows to specify when object are added to the cache:

- `event`: Objects are cached from websocket events;
- `objectConstructor`: Objects are cached from other object's constructors, for example `Member` objects from message payloads;
- `http`: Objects are added from HTTP API requests;
- `other`: All other times an object could be cached.

As an example, this code would only cache `IMember` objects from websocket events and http API requests:

```dart
Future<void> main() async {
  final cacheOptions = CacheOptions()
    ..memberCachePolicyLocation = (
        CachePolicyLocation()
          ..event = true
          ..http = true
    );

  final bot = NyxxFactory.createNyxxWebsocket("token", 10, cacheOptions: cacheOptions);
}
```

#### CachePolicy

Another option to restrict caching is to specify a `CachePolicy` which is a class that wraps a callback executed when trying to cache objects.

`CachePolicy` can be freely composed with provided base methods or extended by the end developer:

```dart
/// Convenience method to concatenate other policy
CachePolicy<T> or(CachePolicy<T> other);

/// Convenience method to require other policy
CachePolicy<T> and(CachePolicy<T> other);

/// Composes a policy by concatenating multiple other policies from list
static CachePolicy<S> any<S extends SnowflakeEntity>(List<CachePolicy<S>> policies);
```

For example, this code would only cache `Member` objects who have roles:

```dart
Future<void> main() async {
  final cacheOptions = CacheOptions()
    ..memberCachePolicy = CachePolicy<IMember>((member) => member.roles.isNotEmpty);

  final bot = NyxxFactory.createNyxxWebsocket("token", 10, cacheOptions: cacheOptions);
}
```
