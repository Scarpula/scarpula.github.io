# 기여도 증거 — GitHub Contributors API

> 페치: 2026-05-07 · `gh api repos/<owner>/<repo>/contributors`
> 본 문서는 PROJECTS.md의 "역할" 필드를 **추측이 아닌 증거** 기반으로 채우기 위한 자료입니다.
> Scarpula = 본인.

---

## 1. 개인 레포 (Scarpula 소유)

| 레포 | Scarpula | 타인 | Scarpula 비중 | 판정 |
|------|----------|------|--------------|------|
| PanicDisorder (숨) | 16 | — | **100%** | 단독 개발 |
| bidshield | 3 | — | **100%** | 단독 개발 (커밋 squash 추정) |
| LottoJackpot | 3 | — | **100%** | 단독 개발 |

> 개인 레포 커밋 수가 낮은 것은 Claude Code 기반 vibe-coding으로 로컬에서 작업 후 큰 단위로 push한 패턴으로 보임. 단독 소유·단독 작업은 명확.

---

## 2. iotplus-code 조직 — 채택 그룹 (Option A 기준)

### G1. ParkGolf IOTPLUS — ✅ **유지 권장 (강력)**

| 레포 | Scarpula | 타인 | Scarpula 비중 | 판정 |
|------|----------|------|--------------|------|
| ParkGolf_IOTPLUS_Back | **118** (top) | mijin166: 47, KimDaeHyun00: 16 | 65% | 주도 |
| ParkGolf_IOTPLUS_Front | **68** (top) | mijin166: 60, KimDaeHyun00: 33 | 42% | 주도 (top contributor) |
| ParkGolf_IOTPLUS_Mobile | **73** (top) | mijin166: 6, KimDaeHyun00: 3 | 89% | 단독에 가까움 |
| ParkGolf_IOTPLUS_QRChecker | **2** (sole) | — | 100% | 단독 |
| ParkGolf_IOTPLUS_Kiosk | **2** (sole) | — | 100% | 단독 |

→ **5개 컴포넌트 모두 본인이 top contributor**. 사이트 노출 정당성 100%.

### G2. Solhavi V2 — ❌ **노출 비추천 (증거 부족)**

| 레포 | Scarpula | 타인 | 판정 |
|------|----------|------|------|
| solhavi_V2_back | 0 | KimDaeHyun00: 96 | **참여 X** |
| solhavi_V2_front | 0 | KimDaeHyun00: 120 | **참여 X** |
| solhavi_V2_app | 0 | KimDaeHyun00: 49 | **참여 X** |
| solhavi_V2_admin | 0 | KimDaeHyun00: 27 | **참여 X** |
| solhavi_V2_prod | 0 | KimDaeHyun00: 16 | **참여 X** |

→ 5개 레포 **모두 0커밋**. KimDaeHyun00 단독 작업. 포트폴리오 노출 시 사실관계 문제 가능. **드롭 권장**.

> 참고로 `solhavi_v0.1_*` (구버전)은 Scarpula 6+1커밋 — 초기 버전엔 일부 참여. 대체용 활용도 어려움.

### G3. HDMS — ⚠️ **노출 비추천 (기여 미미)**

| 레포 | Scarpula | 타인 | 판정 |
|------|----------|------|------|
| HDMS_Front | 3 | KimDaeHyun00: 8 | 부분 참여 (27%) |
| HDMS_Back | 1 | KimDaeHyun00: 5 | 미미 (17%) |
| HDMS-API-Docs | 0 | KimDaeHyun00: 5 | X |

→ 총 4커밋. "참여" 수준은 되지만 카드로 내세우기엔 약함. **드롭 권장**.

### G5. Solynx EMS — ✅ **유지 권장 (강력)**

| 레포 | Scarpula | 타인 | Scarpula 비중 | 판정 |
|------|----------|------|--------------|------|
| EMS_V2_FrontEnd | **129** (top) | KimDaeHyun00: 105, IOTPLUS-project: 27 | 49% | 주도 (top contributor) |
| EMS_V2_BackEnd | 76 (2nd) | KimDaeHyun00: 125 | 38% | 주요 공동 (2nd) |
| Solynx_AI_Server | **2** (sole) | — | 100% | 단독 |
| ems-swagger-ui | — | (외부 OSS Swagger UI 포크 — 본인 기여 X) | — | 외부 OSS |

→ 프론트 주도 + 백엔드 공동 + AI 서버 단독. **유지 권장**. 단, `ems-swagger-ui`는 외부 OSS 포크라 노출 시 오해 소지 → **제외 권장**.

---

## 3. 대체 후보 — MES 그룹 (Solhavi V2 / HDMS 대체)

> contributors 데이터로 발견된 강력한 미채택 후보.

| 레포 | Scarpula | 타인 | Scarpula 비중 | 판정 |
|------|----------|------|--------------|------|
| MES_seowon_Backend | **36** (top) | KimDaeHyun00: 24, mijin166: 11 | 51% | 주도 |
| Mes_seowon_FrontEnd | **81** (top) | KimDaeHyun00: 29, mijin166: 15 | 65% | 주도 |
| mes_backend | **19** (top) | KimDaeHyun00: 9, mijin166: 1 | 66% | 주도 |
| mes_frontend | 27 (2nd) | KimDaeHyun00: 65, mijin166: 13 | 26% | 공동 (2nd) |

→ **4개 중 3개 top contributor**. "서원 MES + ERP MES" 시리즈로 묶기 가능. **승격 추천**.

---

## 4. 보조 후보 — SalesMS

| 레포 | Scarpula | 타인 | 판정 |
|------|----------|------|------|
| SalesMS_Front | 10 | KimDaeHyun00: 28 | 부분 참여 (26%) |
| SalesMS-BackEnd | 0 | KimDaeHyun00: 30 | X |
| SalesMS-API-Docs | 0 | KimDaeHyun00: 9 | X |

→ 약함. 노출 비추천.

---

## 5. 미채택 — 본인 기여 거의 없음

| 레포 | 비고 |
|------|------|
| iotplus-mes | KimDaeHyun00 단독 |
| pms_front | KimDaeHyun00 146 / Scarpula 1 |
| pms_back | KimDaeHyun00 단독 |
| bannam | mijin166 50 / KimDaeHyun00 34 / Scarpula 3 |
| EMS_V2, IOTPLUS_EMS, EMS_-, EMS | 1~3 커밋, 구버전 |

---

## 6. 요약 — 권장 최종 선택

| 그룹 | 권장 | 사유 |
|------|------|------|
| **G1. ParkGolf IOTPLUS** | ✅ 유지 | 5개 컴포넌트 모두 top contributor |
| **G5. Solynx EMS** | ✅ 유지 | 3개 레포 top/2nd, AI 서버 단독 |
| **G6. MES (신규)** | 🆕 추가 | 4개 레포 중 3개 top — Solhavi V2 대체 |
| ~~G2. Solhavi V2~~ | ❌ 드롭 | 5개 레포 0 커밋 |
| ~~G3. HDMS~~ | ❌ 드롭 | 4 커밋 (미미) |

### 권장 최종 카드 셋 (총 6장)

1. 숨 — 단독 개발
2. BidShield — 단독 개발
3. LottoJackpot — 단독 개발
4. ParkGolf IOTPLUS — 5 컴포넌트 주도
5. Solynx EMS — 3 컴포넌트 주도/공동
6. MES (서원 + ERP) — 4 컴포넌트 주도/공동

---

## 컨펌 필요

- 위 권장(G2/G3 드롭, G6 MES 추가)으로 갈지
- 또는 Option A 그대로 유지 (G2/G3 — 그러면 카드에 "참여" 정도로만 표기)
- 또는 다른 조합
