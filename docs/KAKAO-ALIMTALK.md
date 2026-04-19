---
name: 카카오 알림톡 연동
description: freepass-v2 신규 대화/계약/정산 알림. Flask 프록시 + 프론트 헬퍼 스캐폴드 완료, Aligo 계정·템플릿 승인 대기.
type: project
originSessionId: df1d6c67-5473-41b0-868e-3cee453edf6e
---
**현 상태 (2026-04-19)**: 스캐폴드 완료, 환경변수·템플릿 승인 후 즉시 활성화 가능.

**아키텍처**
- 프론트 `src/core/alimtalk.js` → Flask `/api/alimtalk/send` → Aligo API
- API 키는 Flask env(`ALIGO_*`)에 보관, 프론트에 절대 노출 안 함
- 전송 실패해도 throw하지 않음 — 비즈니스 플로우 차단 방지

**필요 환경변수 (Flask)**
```
ALIGO_API_KEY      = Aligo 발급 API 키
ALIGO_USER_ID      = Aligo 계정 ID
ALIGO_SENDER_KEY   = 카카오 비즈 발신프로필 키
ALIGO_SENDER_TEL   = 발신자 전화번호
ALIGO_ADMIN_KEY    = (선택) X-Admin-Key 헤더 검증
```

**템플릿 (Aligo 콘솔에서 사전 승인 필수)**
| template_code    | 용도                   | 트리거 예정 위치 |
|------------------|------------------------|------------------|
| new_inquiry      | 신규 문의 → 공급사     | ensureRoom 직후 |
| contract_sent    | 계약서 발송 → 에이전트 | saveContract 직후 또는 발송 버튼 |
| contract_done    | 계약 체결 → 양측       | auto-status.js 계약완료 hook |
| settle_ready     | 정산 지급 예정 → 수취인 | createSettlement 직후 |

**헬퍼 함수** (src/core/alimtalk.js)
- `sendAlimtalk({template, tel, message, subject, variables})` — 저수준
- `notifyNewInquiry({providerTel, agentName, carNo, model})`
- `notifyContractSent({agentTel, carNo, link})`
- `notifyContractDone({tel, carNo, customerName})`
- `notifySettleReady({tel, amount, carNo})`

**Why:** 실시간 업무 진행 상황을 담당자에게 즉시 전달. 웹앱 미접속 상태에서도 중요 이벤트 알림.

**How to apply:** 
1. Aligo 가입 + 카카오 비즈채널 등록 → 템플릿 4종 승인 받기
2. Flask 배포 환경에 ALIGO_* env 추가
3. 프론트 트리거 연결: `collections.js`, `auto-status.js` 등에서 적절한 시점에 notify* 호출
4. 비용 ~7.5원/건 — 과도한 알림 방지 로직(중복·디바운스) 필요 시 추가

**Cloud Functions 대안**: RTDB 트리거로 서버사이드 발송도 가능하지만, Flask가 이미 있어서 프록시로 단일화하는 게 운영 단순.
