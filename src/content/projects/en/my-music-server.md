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

## The why

I've **always been a purist about my music collection**. Since I was a kid, I've kept my music as MP3 files on an SD card. I don't know, there's something about owning your music files that makes you feel closer to the artists and albums you love. 

But here's the problem: I have multiple devices. My phone, my desktop, maybe a laptop. Manually syncing music files across all of them? Absolute pain.

When I got my first VPS and discovered self-hosting, I thought I'd found the solution. I tried Plex, Subsonic, Navidrome... they all worked well, and honestly, they're solid projects. But I wanted more - a specific vision I had in mind.

See, I'd been using [Otto](https://play.google.com/store/apps/details?id=com.piyush.music&hl=en&pli=1) on Android for years. It's a music player that just gets it - clean, intuitive, beautiful. I kept thinking: what if I could have that experience, but accessible from anywhere, on any device, through a web browser?

So I built it. **MMS is my answer to that question**.

## What it does

TLDR; playing your music, beautifully.

### The basics

- Audio playback for any format your browser supports (MP3, FLAC, AAC, you name it)
- Browse your collection by albums and artists
- Artist information pulled from the Last.fm API
- Smart queue management - add songs to queue, play next, reorder on the fly

### Smart Music Management

On first launch, MMS scans your music folder and extracts all the metadata - artist, album, track info, everything. It stores this in a SQLite database for access. Album covers get extracted and cached on the filesystem, so you're not re-scanning files every time you need artwork.

After the initial scan, it watches your Music folder automatically. Drop in new albums, and they just... appear.

### The UI Experience
Single-page app. Fully responsive. Works on your phone, tablet, or desktop - whatever you're using in the moment.

Here's what I'm particularly proud of: Material You-style dynamic theming. The entire UI adapts its colors to match the album cover you're currently playing. Plus, if you have  `.lrc` files with your music, you get synced lyrics that follow along as you listen.
_(Playlist creation is coming soon - it's on the list!)_

