---
title: 'My music server'
description: 'A music server/player similar to Subsonic,Navindrome'
date: '2025-11-05'
published: true
coverUrl: https://file.ony.world/videos/ony.world/mms-preview.mp4
coverType: "video"
---

<video controls muted>
    <source src="https://file.ony.world/videos/ony.world/mms-preview.mp4" type="video/mp4" />
</video>

[Source code here](https://github.com/ony-boom/mms)

**MMS** (My Music Server), as the name implies, is a simple music server.
I made it because there aren't any music players that actually fit my needs on Linux.

It's **not the best, but it's mine** and works well for me.

## The why ???

I wanted to have all of my music in the same place.
Yes, yes, yes... I know Spotify, Deezer, Tidal and so on exist but I don't want that... okay!
I'm a dev, and I, instead of just using them, created my own.

I learned a lot making it. Sure there's a lot to improve and some of my choices when making it were wrong. For example, I load all songs at the start and store them all inside `indexedDB` (don't judge 😒, I know it's bad).
