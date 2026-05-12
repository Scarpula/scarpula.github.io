# 프로젝트별 이미지 폴더

이 폴더 하나가 **카드 표지 + 상세 모달 hero + 갤러리** 까지 모두 담당합니다. 프로젝트별로 한 폴더에 정리.

## 참조 위치

| 노출 위치 | 데이터 필드 | 경로 |
|----------|------------|------|
| Projects 섹션 카드 표지 (그리고 클릭 시 회전하는 FlyingCard) | `projects.ts` → `coverImage` | `/projects/<slug>/01-cover.png` |
| 상세 모달 hero (헤더 영역) | `project-details.ts` → `heroImage` | `/projects/<slug>/01-cover.png` *(같은 파일)* |
| 상세 모달 갤러리 | `project-details.ts` → `gallery[].src` | `/projects/<slug>/<N>-<name>.png` |

→ **카드 표지 = 상세 hero = 같은 파일 1장**. 한 번 저장하면 두 곳에 자동 반영.

---

## 슬러그별 필요 파일

### `soom/` — 상세 모달 갤러리 정의 완료
| 파일 | 용도 | 권장 비율 |
|------|------|----------|
| `01-cover.png` | 카드 표지 + 상세 hero | 16:10 또는 16:9 |
| `02-onboarding.png` | 갤러리 — 자가 선별검사 | 9:16 (모바일 스크린샷) |
| `03-login.png` | 갤러리 — 다중 소셜 로그인 | 9:16 |
| `04-home.png` | 갤러리 — 홈 대시보드 | 9:16 |
| `05-diagnosis.png` | 갤러리 — DSM-5 진단 | 9:16 |
| `06-profile.png` | 갤러리 — 프로필 | 9:16 |

### `bidshield/` — 상세 모달 갤러리 정의 완료
| 파일 | 용도 | 권장 비율 |
|------|------|----------|
| `01-cover.png` | 카드 표지 + 상세 hero — **랜딩 Hero** ("좋은 입찰은 빠른 분석보다 정확한 판정에서 시작됩니다") | 16:10 데스크톱 (1920×1200) |
| `02-landing-metrics.png` | 갤러리 — Numbers Teams Trust (43.7% / 3분 / 1화면) | 16:10 |
| `03-landing-flow.png` | 갤러리 — Review Flow 3-step | 16:10 |
| `04-tender-search.png` | 갤러리 — 공고 검색 + AI 분석 요청 | 16:10 |
| `05-subscription.png` | 갤러리 — 구독 관리 (체험/Basic/Pro) | 16:10 |

### `lottojackpot/` — 상세 모달 갤러리 정의 완료
| 파일 | 용도 | 권장 비율 |
|------|------|----------|
| `01-cover.png` | 카드 표지 + 상세 hero — **메인 화면** (LOTTOJACKPOT 로고 + 데이터 현황 + 3 액션 버튼) | 16:10 데스크톱 |
| `02-prediction.png` | 갤러리 — 예측 번호 10개 조합 (필터 + 점수 + 카드별 메트릭) | 16:10 |
| `03-stats.png` | 갤러리 — 통계 분석 (전체 빈도 TOP 10 + 최근 100회차 핫넘버) | 16:10 |
| `04-loading.png` | 갤러리 — 예측 생성 로딩 스피너 (유전 알고리즘 + 몬테카를로) | 16:10 또는 정사각 |

### `parkgolf-iotplus/` — 상세 모달 갤러리 정의 완료 (모바일 4장 + 커버 1장) ✅
| 파일 | 용도 | 권장 비율 |
|------|------|----------|
| `01-cover.jpg` | 카드 표지 + 상세 hero — **마케팅 배너** ("간편하게 예약하고 관리하는 파크골프 앱" + 5 폰 mockup) | 16:9 wide |
| `02-brand.jpg` | 갤러리 — GO Field 브랜드 페이지 (골프 클럽 제품샷 + "더 쉬운 파크 골프의 시작") | 9:16 모바일 |
| `02-login.jpg` | 갤러리 — 노을파크골프 로그인 (카카오/네이버/Google 3종 소셜) *※ 파일명 번호 02 중복, 원본 그대로 유지* | 9:16 모바일 |
| `04-venues.jpg` | 갤러리 — 전국 파크골프장 리스트 (228개 구장, 거리순/인기순/가격순) | 9:16 모바일 |
| `05-venue-detail.jpg` | 갤러리 — 구장 상세 (남평 1구장 코스 정보 + A/B/C 코스 9홀) | 9:16 모바일 |

### `solhavi-v2/` — 상세 모달 갤러리 정의 완료 (13 wide 대시보드 + 3 mobile = 16장)
| 파일 | 용도 | 비율 |
|------|------|------|
| `01-cover.png` | 카드 표지 + 상세 hero — **🚧 따로 제작 중** | 16:9 wide |
| `dashboard-fullpage.png` | 갤러리 — 메인 대시보드 (KPI + 알림 + 위젯 통합) | 16:10 wide |
| `monitoring.png` | 갤러리 — 디바이스 실시간 상태 보드 (SSE 24h) | 16:10 wide |
| `panel-3d.png` | 갤러리 — Three.js 3D 시설 시각화 (panel-3d) | 16:10 wide |
| `panel-visualization.png` | 갤러리 — Recharts 시계열 차트 | 16:10 wide |
| `analysis.png` | 갤러리 — 다축 시계열 분석 + xlsx export | 16:10 wide |
| `alerts.png` | 갤러리 — 알림 목록 시간순 누적 | 16:10 wide |
| `alerts-settings.png` | 갤러리 — 임계값 엔진 (hysteresis + 지속시간) | 16:10 wide |
| `facilities.png` | 갤러리 — 시설 5단 계층 + 엑셀 임포트 (1GB) | 16:10 wide |
| `users.png` | 갤러리 — 사용자 관리 (JWT 30일) | 16:10 wide |
| `permissions.png` | 갤러리 — RBAC 권한 매트릭스 | 16:10 wide |
| `menu-management.png` | 갤러리 — 동적 메뉴 트리 (DB 기반) | 16:10 wide |
| `login-history.png` | 갤러리 — 로그인 감사 (IP + UA) | 16:10 wide |
| `settings.png` | 갤러리 — 시스템 전역 설정 | 16:10 wide |
| `mobile.png` | 갤러리 — React Native + Expo 54 화면 1 | 9:16 phone |
| `mobile2.png` | 갤러리 — RN 앱 알림 (OS Push + Web Push) | 9:16 phone |
| `mobile3.png` | 갤러리 — RN 앱 (PWA APK 와 동일 백엔드 공유) | 9:16 phone |

### `erp/` — 상세 모달 갤러리 정의 완료 (23 wide 화면)
| 파일 | 화면 |
|------|------|
| `01-cover.png` | 카드 표지 + 상세 hero — **🚧 따로 제작 중** |
| `00_login.png` | 로그인 (JWT) |
| `01_dashboard.png` | 대시보드 (KPI + 차트) |
| `02_customer.png` | 고객 마스터 |
| `03_supplier.png` | 공급사 마스터 |
| `04_item_master.png` | 품목 마스터 (안전재고) |
| `05_warehouse.png` | 창고 마스터 |
| `06_inventory_item.png` | 입출고 유형 (DR/CR) |
| `07_process.png` | 공정 관리 |
| `08_inout_reg.png` | 입출고 등록 (거래번호 자동) |
| `09_stock_history.png` | 입출고 이력 |
| `10_stock_by_item.png` | 품목별 재고 |
| `11_stock_out_by_inbound.png` | 입고 기준 출고 |
| `12_stock_transfer.png` | 창고 이동 |
| `13_stock_conversion.png` | 재고 전환 |
| `14_stock_monthly_status.png` | 월별 재고 현황 (수불명세서) |
| `15_monthly_stock.png` | 월별 재고 (펼친 뷰) |
| `16_current_stock_chart.png` | 현재고 차트 |
| `17_stock_days.png` | 재고 일수 (Days of Inventory) |
| `18_notice.png` | 공지사항 (Toast UI Editor) |
| `19_user.png` | 사용자 관리 |
| `20_authority.png` | 권한 정의 |
| `21_authority_assign.png` | 권한 할당 |
| `22_menu.png` | 메뉴 관리 (depth 4) |

→ 모든 ERP 화면 비율은 **16:10 데스크톱 wide** (대시보드 SaaS).

### `solynx-ems/` — 상세 모달 갤러리 정의 완료 (32 wide · VoltTrack EMS 전 도메인)
| 파일 | 화면 | 그룹 |
|------|------|------|
| `01-cover.png` | 카드 표지 + 상세 hero — **🚧 따로 제작 중** | — |
| `01_home.png` | 메인 대시보드 (VoltTrack 종합) | 메인 |
| `10_re_power_generator.png` | 재생발전 · 발전원별 종합 (태양광/풍력 탭) | 재생발전 / 발전 |
| `11_re_daily_energy.png` | 재생발전 · 일일 충/방전·발전량 (4 라인) | 재생발전 / 발전 |
| `12_re_power_consumption_production.png` | 재생발전 · 전력 소비·생산 현황 (오늘 vs 어제) | 재생발전 / 발전 |
| `13_re_wind_power.png` | 재생발전 · 풍력 모니터링 (터빈별) | 재생발전 / 발전 |
| `14_re_pq_rate_of_change.png` | 전기 품질 · 전압/전류 변화율 (R/S/T) | 재생발전 / 전기품질 |
| `15_re_pq_power_factor.png` | 전기 품질 · 역률 (오늘 vs 어제) | 재생발전 / 전기품질 |
| `16_re_pq_frequency.png` | 전기 품질 · 주파수 변동 (60Hz 기준) | 재생발전 / 전기품질 |
| `17_re_perf_pcs_status.png` | 장치 발생현황 · PCS | 재생발전 / 발생현황 |
| `18_re_perf_bms_status.png` | 장치 발생현황 · BMS | 재생발전 / 발생현황 |
| `19_re_perf_pv_status.png` | 장치 발생현황 · PV | 재생발전 / 발생현황 |
| `20_re_dc_status_control.png` | 장치 제어 · 상태 제어 (자동/수동/대기) | 재생발전 / 장치제어 |
| `21_re_dc_pcs_setting.png` | 장치 제어 · PCS 설정 (PMS 송출) | 재생발전 / 장치제어 |
| `22_re_dc_protection_setting.png` | 장치 제어 · 보호동작 설정 (BMS) | 재생발전 / 장치제어 |
| `23_re_std_push_alarm.png` | 기준정보 · 푸시 알람 등록 | 재생발전 / 기준정보 |
| `24_re_std_device_spec.png` | 기준정보 · 장치 제원 (POI Excel) | 재생발전 / 기준정보 |
| `25_re_std_user_registration.png` | 기준정보 · 사용자 등록 (권한 매트릭스) | 재생발전 / 기준정보 |
| `26_re_std_status_code.png` | 기준정보 · 상태 코드 | 재생발전 / 기준정보 |
| `27_re_std_tip_registration.png` | 기준정보 · 팁 등록 | 재생발전 / 기준정보 |
| `30_ess_monitoring.png` | ESS 모니터링 (다중 배터리 뱅크) | ESS |
| `31_ess_statistics.png` | ESS 통계 (효율 트렌드) | ESS |
| `32_ess_rawdata.png` | ESS 원시 데이터 (TimescaleDB raw) | ESS |
| `33_ess_thresholds.png` | ESS 임계값 (SOC/온도/습도) | ESS |
| `40_dr_grid_power_control.png` | 수요반응 · 그리드 전력 제어 (KPX 발령) | DR |
| `41_dr_ev_charging_control.png` | 수요반응 · EV 충전 제어 (V2X 연동) | DR |
| `42_dr_economics_perf.png` | 수요반응 · 경제성 실적 (정산/절감) | DR |
| `43_dr_reliability_perf.png` | 수요반응 · 신뢰성 실적 (이행률) | DR |
| `50_v2x_vehicle_data.png` | V2X 차량 데이터 (실시간 텔레메트리) | V2X |
| `51_v2x_basic_info.png` | V2X 기본 정보 (스테이션 + Google Maps) | V2X |
| `52_v2x_vehicle_info.png` | V2X 차량 정보 (V2G/G2V · reactflow) | V2X |
| `53_v2x_ownership_history.png` | V2X 소유권 이력 (감사 로그) | V2X |
| `54_v2x_maintain_info.png` | V2X 정비 정보 (SSE 알람) | V2X |

→ 모든 Solynx EMS 화면 비율은 **16:10 데스크톱 wide** (관제 대시보드).
→ FEMS(에너지 관리) 도메인은 본 포트폴리오 범위에서 제외.
→ AI(Gemini 3 Flash + MCP)는 별도 서버(`Solynx_AI_Server`)로 운용되며 본 갤러리에는 UI 미포함.

### 그 외 1개 — 카드 표지(`01-cover.png`) 1장만 (상세 모달은 fallback)
- `mes/01-cover.png`

---

## 이미지 없을 때 동작
- 카드 표지: `onError` 핸들러 → `opacity:0`, 슬러그/번호 텍스트만 노출
- FlyingCard: 같은 처리 (회전·이동은 정상 동작)
- 모달 hero: `opacity:0`
- 갤러리: `opacity:0.1` 흐리게 노출

## 새 프로젝트 추가
1. `public/projects/<slug>/` 디렉토리 생성
2. `01-cover.png` 저장 (필수)
3. 상세 모달도 풍부하게 채우려면 `src/data/project-details.ts` 의 `PROJECT_DETAILS` 객체에 항목 추가
