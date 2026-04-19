---
name: freepass-v2 Firebase Rules 필요 변경사항
description: proposals·car_models·proposal_views 경로의 Rules 조정 필요. 고객 공개 링크 전용 + 마스터 공유 허용.
type: project
originSessionId: df1d6c67-5473-41b0-868e-3cee453edf6e
---
**배경**: 2026-04-19 Phase 2 작업 중 공개 접근·공유 마스터를 위해 추가 Rules 조정 필요.

**필수 Rules (아직 적용 안 됨)**

```json
{
  "rules": {
    "proposals": {
      "$id": {
        ".read": true,
        ".write": "auth != null && (!data.exists() || data.child('agent_uid').val() === auth.uid)"
      }
    },
    "proposal_views": {
      "$proposalId": {
        ".read": "auth != null",
        ".write": true
      }
    },
    "contract_sign": {
      "$token": {
        ".read": true,
        ".write": true
      }
    },
    "car_models": {
      ".read": "auth != null",
      "$id": {
        ".write": "auth != null"
      }
    },
    "policies": {
      ".read": "auth != null",
      "$id": {
        ".write": "auth != null"
      }
    }
  }
}
```

**contract_sign 토큰 보안**: 토큰 자체가 인증 수단. `sign_{base36ts}_{rand10}` 형태라 추측 불가. 7일 만료(expires_at) 검증은 클라이언트에서. 이미 서명된 토큰(signed_at 있음)은 재서명 방지.

**Why:**
- `proposals/{id}`: 고객이 로그인 없이 공개 링크로 열람. id가 랜덤이라 추측 어려움.
- `proposal_views/{proposalId}`: 고객 뷰 트래킹 (공개 write, 로그인 read)
- `car_models`: jpkerp-next·freepass-v2 공유. 로그인된 사용자면 읽기·쓰기 허용 (staff-only)
- `policies`: 위와 동일

**How to apply:** Firebase Console → Realtime Database → 규칙 → 위 내용 merge. 기존 products·contracts·rooms·messages 규칙은 유지하고 이 4개만 추가. 배포 전 Rules Playground에서 테스트.

**catalog.html**: 기존 `products/` 공개 read 규칙이 필요. 현재 규칙 상태 확인 필요 (이미 공개거나 아니면 추가 필요).
