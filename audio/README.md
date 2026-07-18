# TILAWA — Audio Folder

This directory stores local audio reference files, audio recordings, or metadata guides.

## Streaming vs. Local Audios
- **Public Quran Recitations**: Resolves directly from `mp3quran.net` and `everyayah.com` CDNs. See [TECH_STACK.MD](file:///c:/Users/ASUS/Downloads/TILAWA-IQRA-main%20%281%29/TILAWA-IQRA/ARCHITECTURE.MD/TECH_STACK.MD).
- **User Recitations**: Temporarily recorded via in-browser audio recorders and uploaded to secure transient signed URLs in object storage (S3/GCS).
- **Local Audio Samples**: Put reference WAV/MP3 files in this directory for offline or local testing models.
