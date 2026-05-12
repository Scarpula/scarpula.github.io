# Public assets

## hero-bg.mp4 (Hero 배경 영상)

Hero 섹션이 영상을 배경으로 사용합니다 — 마우스 커서 위치에 spotlight 형태로 노출되고,
스크롤 시 확대·하강하는 시네마틱 효과를 받습니다.

### 권장 스펙

- 포맷: MP4 (h264) + 선택적으로 WebM (VP9)
- 해상도: 1920×1080 또는 1280×720
- 길이: 6~12초 무한 루프
- 용량: 1.5MB 이하 권장 (압축 권장)
- 분위기: 다크 톤, 추상적 / 우주 / 잉크 흐름 / 입자 / 코드 / 기하 패턴 등

### 무료 소스 추천

- [Pexels Videos](https://www.pexels.com/videos/) — abstract / dark 검색
- [Pixabay Videos](https://pixabay.com/videos/) — CC0
- [Coverr](https://coverr.co/) — 큐레이션 무료 루프
- [Mixkit](https://mixkit.co/free-stock-video/) — 다크 / 추상

### 파일 배치

이 디렉터리(`public/`)에 다음 이름으로 저장하면 자동 활성화됩니다:

```
public/
├── hero-bg.mp4       (필수)
└── hero-bg.webm      (선택, 최신 브라우저용 더 작은 버전)
```

### 영상 없을 때

자동으로 CSS 그라디언트 폴백이 보입니다 (`hero-media-shift` 애니메이션 — 보라/사이언/마젠타 hue 흐름). 영상 추가 전까지도 spotlight 효과는 정상 동작합니다.

### 압축 명령 예시

```bash
# h264 1080p, ~1.5MB
ffmpeg -i input.mp4 -vcodec libx264 -crf 28 -preset slow -an -movflags +faststart hero-bg.mp4

# WebM (옵션)
ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 35 -b:v 0 -an hero-bg.webm
```
