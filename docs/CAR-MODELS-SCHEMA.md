---
name: 차종마스터 공유 스키마
description: freepass-v2 + jpkerp-next 공유 차종 마스터 데이터 canonical 스키마. sub_model·trim_name 완전 분리 원칙.
type: project
originSessionId: df1d6c67-5473-41b0-868e-3cee453edf6e
---
**2026-04-19 결정** — 차종 마스터는 freepass-v2와 jpkerp-next가 RTDB에서 공유.

**Canonical 스키마 (양쪽 ERP 동일 이름 강제)**
- RTDB 컬렉션: `car_models`
- 필드:
  ```
  maker: string            // 제조사
  model: string            // 모델명
  sub_model: string        // 세부모델 (CN7, G30 등)
  trim_name: string        // 트림 (스마트 1.6 GDI 등)
  code?: string            // 내부 코드
  year_start/end?          // 생산기간
  category?                // 분류 (차종구분)
  origin?, powertrain?, fuel_type?, transmission?, seats?, drive_type?, displacement?, battery_kwh?, ev_range?, status?, created_at?
  ```

**중요: 세부모델 ↔ 트림 분리 원칙**
세부모델(CN7, G30)과 트림(1.6 GDI, 3.0d M Sport)은 완전히 다른 개념. 하나로 합치면 안 됨.

**원칙: 양쪽 이름 완전 통일, 호환 레이어 없음**
지금 데이터 거의 없을 때 한 번에 맞추고 간다. 나중에 붙이면 이름 두벌 유지 비용이 훨씬 큼.

**소유권: jpkerp-next가 마스터 owner, freepass-v2는 consumer**
스키마 변경·seed 관리는 jpkerp-next 쪽에서 선행. freepass-v2는 그 스키마를 그대로 따름. 양쪽 모두 같은 RTDB `car_models`를 참조하되, 쓰기 주도권은 jpkerp-next의 `car-master.tsx`. freepass-v2에서 admin 신규 입력 시에도 같은 스키마로 write만 함.

**변경 필요 사항 (양쪽 레포)**
- jpkerp-next:
  - RTDB 경로 `vehicle_master` → `car_models`
  - `RtdbCarModel` 타입: `sub` 필드 → `sub_model` + `trim_name` 두 필드로 쪼갬
  - `app/(workspace)/dev/tools/car-master.tsx` UI: 세부모델·트림 두 입력칸 분리
  - `lib/data/car-models-seed.ts` 195종 seed 데이터에서 `sub` → `sub_model` + `trim_name`로 재가공
  - `DATA-MODEL.md`에 `car_models` 섹션 신규 작성
- freepass-v2:
  - `core/car-models.js` — watchCollection('car_models')로 구독, store에 캐시
  - products 필드명: `model_name` → `model` (canonical로 맞춤)
  - `renderPicker` — allProducts 인덱스 대신 car_models 마스터 기반으로 전환
  - 세부모델 선택 시 car_models lookup해서 `vehicle_class(category)`, `fuel_type` auto-derive
  - admin "직접 입력" → products가 아닌 car_models에 write
  - 기존 products 마이그레이션 스크립트 (`model_name` → `model`)

**How to apply:** jpkerp-next가 seed 아직 안 올렸고 freepass-v2 products도 소량이라 지금이 통일 적기.
