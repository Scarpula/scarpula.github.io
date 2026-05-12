# Screenshots

각 프로젝트의 카드/상세에 사용될 이미지 보관 폴더입니다.

## 파일 규칙

```
<project-slug>/
├── 01-cover.png      ← 필수 (16:9 권장, ≥1280×720)
├── 02-feature-a.png  ← 선택
├── 03-feature-b.png  ← 선택
└── ...
```

- 파일명 정렬을 위해 `01-`, `02-`, ... prefix
- `01-cover`만 카드 썸네일에 사용. 나머지는 상세 갤러리
- PNG 권장. 사진 콘텐츠는 JPG 가능
- 5MB 이하 권장
- **모바일 앱(숨이)** 카드: 폰 목업(9:16) 한 장 + 풍경(16:9) 한 장 권장 → `01-cover.png`은 풍경 권장

## 등록 슬러그 (8개 — 팀 참여 포함)

| 슬러그 | 표시명 | 종류 | 본인 역할 |
|--------|--------|------|----------|
| `soom/` | 숨 | 개인 · Flutter 모바일 SaaS | 단독 |
| `bidshield/` | BidShield | 개인 · 웹 SaaS | 단독 |
| `lottojackpot/` | LottoJackpot | 개인 · CLI 도구 | 단독 |
| `parkgolf-iotplus/` | ParkGolf IOTPLUS | iotplus-code G1 | 5/5 top contributor |
| `solhavi-v2/` | Solhavi V2 *(HDMS 흡수)* | iotplus-code G2 | 팀 참여 |
| `solynx-ems/` | Solynx EMS | iotplus-code G5 | Front top · Back 2nd · AI 단독 |
| `mes/` | 서원 MES | iotplus-code G6 | 서원 Backend top · Frontend top |
| `erp/` | ERP (Spring Boot + React 18) | iotplus-code G6 분리 | mes_backend top · mes_frontend 2nd |
