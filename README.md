# nest

## Description

description

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## 获取 access_token
```
1.把access_token储存在 mongodb 中 7000S 之内替换

```

## 验证 签名
```
# 1.sha1 排序加密 token timestamp nonce
const str = [token, timestamp, nonce].sort().join('')
const sha = sha1(str)
```

