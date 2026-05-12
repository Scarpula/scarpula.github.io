# iotplus-code 조직 레포 — Prefix 그룹화

> 페치 일시: 2026-05-07
> 총 레포 수: 34개 (전부 비공개 31 + 공개 3)
> **본 문서의 목적**: 사이트에 노출할 prefix 그룹을 사용자가 컨펌

---

## 추천 노출 그룹 (활성도/규모 기준 상위)

### 🏆 G1. ParkGolf_IOTPLUS_* — **파크골프 통합 시스템** (5 repos, 가장 최근)

가장 최근까지 활발히 개발 중 (2026-04 ~ 2026-05). 단일 도메인의 백엔드/웹/모바일/QR/키오스크 풀스택.

| 레포 | 언어 | 비고 |
|------|------|------|
| ParkGolf_IOTPLUS_Back | Java | 백엔드 |
| ParkGolf_IOTPLUS_Front | TypeScript | 웹 프론트 |
| ParkGolf_IOTPLUS_Mobile | TypeScript | 모바일 앱 |
| ParkGolf_IOTPLUS_QRChecker | TypeScript | QR 체크인 |
| ParkGolf_IOTPLUS_Kiosk | TypeScript | 키오스크 |

> 카드 1장으로 묶어 "5개 클라이언트 + 백엔드 통합 IoT 시스템"으로 표현하기 좋음.

---

### 🏆 G2. solhavi_V2_* — **Solhavi V2 (solhavi+hdms 통합)** (5 repos, 2026-04)

| 레포 | 언어 | 비고 |
|------|------|------|
| solhavi_V2_back | Java | 백엔드 |
| solhavi_V2_front | TypeScript | 웹 |
| solhavi_V2_app | TypeScript | 앱 |
| solhavi_V2_admin | TypeScript | 통합관리자 |
| solhavi_V2_prod | PowerShell | 배포 설정 |

> "기존 두 시스템 통합 신규 V2" 스토리텔링 — 마이그레이션·통합 경험 어필 가능.

---

### G3. HDMS_* + HDMS-API-Docs — **하베스팅 센서 데이터 모니터링** (3 repos)

| 레포 | 언어 | 공개 |
|------|------|------|
| HDMS_Front | TypeScript | private |
| HDMS_Back | Java | private |
| HDMS-API-Docs | HTML (Swagger) | **public** |

> IoT 도메인 강조. 공개 Swagger 링크 노출 가능.

---

### G4. SalesMS_* / SalesMS- — **영업/납품 관리 시스템** (3 repos)

| 레포 | 언어 | 공개 |
|------|------|------|
| SalesMS_Front | TypeScript | private |
| SalesMS-BackEnd | Java | private |
| SalesMS-API-Docs | HTML (Swagger) | **public** |

---

### G5. EMS_V2_* + ems-* — **Solynx EMS (에너지 관리 시스템)** (3 repos)

| 레포 | 언어 | 공개 |
|------|------|------|
| EMS_V2_FrontEnd | JavaScript | private |
| EMS_V2_BackEnd | Java | private |
| ems-swagger-ui | JavaScript (Swagger) | **public** |

> IoT + 에너지 도메인. 공개 Swagger 노출 가능.

---

### G6. MES 그룹 (이름 형태 다양 — 5 repos)

| 레포 | 언어 | 비고 |
|------|------|------|
| iotplus-mes | TypeScript | iotplus 자재관리시스템 |
| MES_seowon_Backend | Java | 서원 MES |
| Mes_seowon_FrontEnd | JavaScript | 서원 MES |
| mes_frontend | JavaScript | ERP MES |
| mes_backend | Java | ERP MES |

> 단일 prefix가 아니라 도메인 그룹. 하위 분리 표현 필요.

---

### G7. pms_* — **Project Management System** (2 repos)

| 레포 | 언어 |
|------|------|
| pms_front | JavaScript |
| pms_back | Java |

---

## 단발 / 보조 레포

| 레포 | 비고 | 분류 의견 |
|------|------|---------|
| Solynx_AI_Server | Python, AI 서버 | EMS 그룹에 보조 카드로 묶기 가능 |
| bannam | HTML, 반남면 | 단발 — 노출 추천 X |
| solhavi_v0.1_Front / Back | GS인증용 솔하비 초기 | solhavi_V2에 흡수, 별도 노출 X |
| EMS_V2 / IOTPLUS_EMS / EMS_- / EMS | 구 EMS 잔여물 | EMS 그룹에서 흡수, 별도 X |

---

## 컨펌 요청 — 노출 그룹 선택

**Option A — 강력 추천** (활성도·완성도 기준 4그룹)
- ✅ G1. ParkGolf_IOTPLUS_*
- ✅ G2. solhavi_V2_*
- ✅ G3. HDMS_*
- ✅ G5. EMS_V2_* (+ Solynx_AI_Server 보조)

**Option B — 풍부하게** (6그룹)
- A의 4개 + G4. SalesMS_*, G7. pms_*

**Option C — 미니멀** (2그룹)
- G1, G2만

**Option D — 직접 지정**
- 위 7개 그룹 중 원하는 것 골라주기

---

## 카드 표현 방식 (제안)

여러 레포로 구성된 시스템은 **레포 단위 카드가 아니라 "시스템 단위 카드 1장"**으로 표현:

```
┌─────────────────────────────────────────┐
│  🌐 ParkGolf IOTPLUS                    │
│  파크골프 통합 IoT 운영 플랫폼            │
│                                          │
│  Java · TypeScript · IoT · Mobile · POS │
│                                          │
│  [백엔드] [웹] [모바일] [QR체크인] [키오스크] │
│   5개 클라이언트 + 통합 백엔드           │
└─────────────────────────────────────────┘
```

이 방식 OK 하시면 채택된 그룹별로 한 카드씩 정리하겠습니다.

---

## 다음 단계

위에서:
1. **A/B/C/D 중 선택** 또는 직접 그룹 지정
2. **시스템 단위 카드 표현** OK?
3. 각 시스템에 대해 **본인 역할** 한 줄씩 알려주기 (예: "ParkGolf — 풀스택 / Mobile·Kiosk 구현 주도")

답변 받으면 PROJECTS.md §5에 채택 그룹 카드 정리하겠습니다.
