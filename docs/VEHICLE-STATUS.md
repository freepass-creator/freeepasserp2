---
name: freepass-v2 차량상태 라이프사이클
description: freepass-v2 상품 vehicle_status 옵션 5종과 계약 연동 자동전환 규칙
type: project
originSessionId: df1d6c67-5473-41b0-868e-3cee453edf6e
---
freepass-v2 차량 vehicle_status 옵션 (순서: 즉시출고 → 출고가능 → 상품화중 → 출고협의 → 출고불가).

- 상품화중 = 정비·외판 등 "아직 공개 전" 상태를 포괄하는 umbrella (별도 정비중 없음)
- 계약완료 차량은 자동으로 출고불가로 전환 예정
- 계약대기중 차량은 자동으로 출고협의로 전환 예정

**Why:** 사용자가 라이프사이클을 단순화하기 위해 umbrella 상태(상품화중)로 통합. 자동 전환은 중복 상태 관리 비용을 줄이기 위함.

**How to apply:** 계약(contract/room) 쪽 상태 변경 이벤트에서 product.vehicle_status를 write하는 구조로 붙여야 함. STATUS_OPTS 수정 시 product-manage.js(ORDER/SHORT/tone/STATUS_OPTS)와 core/product-badges.js(VS_MAP) 둘 다 업데이트.
