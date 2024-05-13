# SSOP_Expo
팀BeNU의 SSOP 개발기


## Git Flow
>1) issue를 생성한다. <br/>
>2) branch를 생성한다. <br/>
>3) add → commit → push → pull request 과정을 거친다. <br/>
>4) pull request를 요청하면, 다른 팀원이 code review를 한다. <br/>
>5) code review가 완료되면, pull request 요청자가 main branch로 merge한다. <br/>
<br/>

## Commit Convention
#### 타입: 부연 설명 및 이유 #이슈번호<br/>
<i>ex. feat: Login 화면 UI 구현 #1</i>

```
  feat: 새로운 기능 추가
  fix: 버그 수정
  build: 빌드 관련 파일 수정
  chore: 그 외 자잘한 수정
  ci: CI관련 설정 수정
  docs: Wiki, README 문서 (문서 추가 수정, 삭제)
  style: 스타일 (코드 형식, 세미콜론 추가, 비즈니스 로직 변경X)
  refactor: 리팩토링 (네이밍 변경, 포함)
  test: 테스트 코드 (추가, 수정, 삭제)
  remove: 코드 삭제
```
<br/>

## Branch
#### (feat/fix/refactor/chore)/#이슈번호-(UI/Func)-기능설명 <br/>
<i> ex) feat/#2-UI-TeamSpace</i>
<br/>

## Issue
```
[FEAT]
[FIX]
[REFACTOR]
[CHORE]
```
