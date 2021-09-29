---
title: cache
author: l7ssha
timestamp: 2021-09-21
category: guides
---

Cache in nyxx is managed automatically with internal wrappers around existing Dart features. Nyxx features 
[`Cache<T, S>`](https://nyxx.l7ssha.xyz/dartdocs/nyxx/nyxx/Cache-class.html) interface which is base class for all cache types used in library. 
But like any other aspect of nyxx cache handling can be altered to fit your needs.

You can pass `CacheOptions` implementation to Nyxx constructor to alter cache behavior across whole bot

```dart
/// Options for configuring cache. Allows to specify where and which entities should be cached and preserved in cache
class CacheOptions {
  /// Defines in which locations members will be cached
  CachePolicyLocation memberCachePolicyLocation = CachePolicyLocation();

  /// Defines which members are preserved in cache
  CachePolicy<Member> memberCachePolicy = MemberCachePolicy.def;

  /// Defines where channel entities are preserved cache. Defaults to [CachePolicyLocation] with additional objectConstructor set to true
  CachePolicyLocation channelCachePolicyLocation = CachePolicyLocation()..objectConstructor = true;

  /// Defines which channel entities are preserved in cache.
  CachePolicy<IChannel> channelCachePolicy = ChannelCachePolicy.def;

  /// Defines in which places user can be cached
  CachePolicyLocation userCachePolicyLocation = CachePolicyLocation();
}
```

For now there are few things you can do:
 1. alter where objects are added to cache (like from event, http...)
 2. which objects are add to cache (by specifying predicate to choose which object is good and whih is not)
 
#### CachePolicyLocation

So this setting allows to specify where object are added to cache. You have few options there:
 - event (objects are added from events)
 - objectConstructor (object are added from other object's constructors - like member from message payload)
 - http (objects are added from http requests)
 - other (any other place that cannot be categorized under options above)

So as an example how to cache members only from event and http you could do something like that:
```dart
Future<void> main() async {
  final cacheOptions = CacheOptions()
    ..memberCachePolicyLocation = (
        CachePolicyLocation()
          ..event = true
          ..http = true
    );
  
  final bot = Nyxx("token", 10, cacheOptions: cacheOptions);
}
```

#### MemberCachePolicy

Other option to restrict cache is to specify `CachePolicy` which is class that wraps callback which will be executed
when trying to cache certain object.

`CachePolicy` can be freely composed with provided base methods or extended by end developer:
```dart
/// Convenience method to concatenate other policy
CachePolicy<T> or(CachePolicy<T> other);

/// Convenience method to require other policy
CachePolicy<T> and(CachePolicy<T> other);

/// Composes a policy by concatenating multiple other policies from list
static CachePolicy<S> any<S extends SnowflakeEntity>(List<CachePolicy<S>> policies);
```

So if you want only cache members who have role you can do something like that:
```dart
Future<void> main() async {
  final cacheOptions = CacheOptions()
    ..memberCachePolicy = CachePolicy<Member>((member) => member.roles.isNotEmpty);
  
  final bot = Nyxx("token", 10, cacheOptions: cacheOptions);
}
```
