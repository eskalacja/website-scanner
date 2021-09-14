## [3.4.0](https://github.com/eskalacja/website-scanner/compare/v3.3.0...v3.4.0) (2021-08-30)


### Features

* test release ([28a53c7](https://github.com/eskalacja/website-scanner/commit/28a53c74e640b455a111cbd53dd42ffca114a852))

## [3.3.0](https://github.com/eskalacja/website-scanner/compare/v3.2.0...v3.3.0) (2021-08-30)


### Features

* test release ([e60efec](https://github.com/eskalacja/website-scanner/commit/e60efec8e26fa8d6de99a5398c935fadcf8852fd))

## [3.2.0](https://github.com/eskalacja/website-scanner/compare/v3.1.0...v3.2.0) (2021-08-30)


### Features

* support easy container extending ([9608848](https://github.com/eskalacja/website-scanner/commit/960884801a798b8f05c1cadd4428457855508c25))

## [3.2.0-next.1](https://github.com/eskalacja/website-scanner/compare/v3.1.0...v3.2.0-next.1) (2021-08-30)


### Features

* support easy container extending ([9608848](https://github.com/eskalacja/website-scanner/commit/960884801a798b8f05c1cadd4428457855508c25))

## [3.1.0](https://github.com/eskalacja/website-scanner/compare/v3.0.0...v3.1.0) (2021-08-29)


### Features

* make sure it actually releases ([14ef78e](https://github.com/eskalacja/website-scanner/commit/14ef78ef4cf18051128880057dbd14c889fd0932))

## [3.0.0](https://github.com/eskalacja/website-scanner/compare/v2.0.0...v3.0.0) (2021-08-29)


### ⚠ BREAKING CHANGES

* there will be no new pushes to docker hub

### Features

* push to github registry instead of dockerhub ([3747921](https://github.com/eskalacja/website-scanner/commit/37479216af48ccc5d1b9a9633ae4859da93c59fb))

## [3.0.0-next.1](https://github.com/eskalacja/website-scanner/compare/v2.0.0...v3.0.0-next.1) (2021-08-29)


### ⚠ BREAKING CHANGES

* there will be no new pushes to docker hub

### Features

* push to github registry instead of dockerhub ([3747921](https://github.com/eskalacja/website-scanner/commit/37479216af48ccc5d1b9a9633ae4859da93c59fb))

## [2.0.0](https://github.com/eskalacja/website-scanner/compare/v1.3.1...v2.0.0) (2021-08-29)


### ⚠ BREAKING CHANGES

* docker needs to run with CAP_SYS_ADMIN flag from now on

### Features

* run in sandboxed mode, as non priv. user ([d150603](https://github.com/eskalacja/website-scanner/commit/d1506038cec31792cff347b85ee6abb1f84a1c05))

### [1.3.1](https://github.com/eskalacja/website-scanner/compare/v1.3.0...v1.3.1) (2021-08-29)


### Bug Fixes

* make sure PID 1 is busy ([8ec9411](https://github.com/eskalacja/website-scanner/commit/8ec941117fd1456dab875884c31ac3da21588d3b))

## [1.3.0](https://github.com/eskalacja/website-scanner/compare/v1.2.0...v1.3.0) (2021-06-20)


### Features

* upgrade dependencies ([7cfa75a](https://github.com/eskalacja/website-scanner/commit/7cfa75a439cfa378b803dee83f0dc87f53192b4d))


### Bug Fixes

* fix build by skipping hooks on CI ([92ede0a](https://github.com/eskalacja/website-scanner/commit/92ede0a756f5d5acef59c0e8598224cbbd7c8065))

## [1.2.0](https://github.com/eskalacja/website-scanner/compare/v1.1.0...v1.2.0) (2021-06-20)


### Features

* upgrade docker base image ([21b9e13](https://github.com/eskalacja/website-scanner/commit/21b9e134c0f58991446c294d15070e5d5cd9813f))

## [1.1.0](https://github.com/eskalacja/website-scanner/compare/v1.0.0...v1.1.0) (2021-01-09)


### Features

* introduce APP_TIMEOUT env ([e6ab930](https://github.com/eskalacja/website-scanner/commit/e6ab930f0b28f0ea29b2bf40923635d00c60e617))


### Bug Fixes

* add missing sleep between uptime checks, make sleepTime configurable (env) ([51088f8](https://github.com/eskalacja/website-scanner/commit/51088f843b1ffa32621e7de0783f571d83a440a8))
* remove console log ([4a58cea](https://github.com/eskalacja/website-scanner/commit/4a58cea0f4bd6d6f5681e7e135781609708e0699))

## 1.0.0 (2021-01-03)


### Features

* add docker container command ([6f502cc](https://github.com/eskalacja/website-scanner/commit/6f502ccfe69b5f25bd69e57aa00098559f76e1ed))
* add uptime check ([280d0ed](https://github.com/eskalacja/website-scanner/commit/280d0ed97116944b67e45ae0faf4257e5ae9b0be))
* dummy release ([8e0c11d](https://github.com/eskalacja/website-scanner/commit/8e0c11de82d9f8c3d0a4850bc1c7619a09dd5651))
* fetch and group links from current page ([8739ecd](https://github.com/eskalacja/website-scanner/commit/8739ecd5a936d5fe95acad47f509a4e2002f4ad5))
* gather links in a structured way ([4f239c1](https://github.com/eskalacja/website-scanner/commit/4f239c15e728208097b558e22707523f92579bf4))
* move output files to /app/output for easier docker runs ([024dab4](https://github.com/eskalacja/website-scanner/commit/024dab4b568e92afe77dfb2b96379f1e55e7e62b))
* output a normalized result ([dda3032](https://github.com/eskalacja/website-scanner/commit/dda3032600710cfc4ab698a95a67679d10ccb9bc))
* run simple scan ([c818f37](https://github.com/eskalacja/website-scanner/commit/c818f374e48004e188ad5c28d236fab94b2f549e))
* save report to json ([7a6d250](https://github.com/eskalacja/website-scanner/commit/7a6d250d04b3d80cd6912359320375548e71537d))
* scan all internal pages ([813609f](https://github.com/eskalacja/website-scanner/commit/813609f7788cc7197b6bf3522771480f893ebdb2))
* throw when missing env variable ([c31e813](https://github.com/eskalacja/website-scanner/commit/c31e813bbab021d98e1a1ec5deb15808f23d45f0))
* verbose logger ([1577e5f](https://github.com/eskalacja/website-scanner/commit/1577e5fb345c753e9a95c4024e8c572c83226d58))


### Bug Fixes

* no more "null" origins ([829a0e0](https://github.com/eskalacja/website-scanner/commit/829a0e00877e9770ae60fc73363255d5e821fd16))

## [1.0.0-next.2](https://github.com/eskalacja/website-scanner/compare/v1.0.0-next.1...v1.0.0-next.2) (2021-01-03)


### Features

* dummy release ([8e0c11d](https://github.com/eskalacja/website-scanner/commit/8e0c11de82d9f8c3d0a4850bc1c7619a09dd5651))

## 1.0.0-next.1 (2021-01-03)


### Features

* add docker container command ([6f502cc](https://github.com/eskalacja/website-scanner/commit/6f502ccfe69b5f25bd69e57aa00098559f76e1ed))
* add uptime check ([280d0ed](https://github.com/eskalacja/website-scanner/commit/280d0ed97116944b67e45ae0faf4257e5ae9b0be))
* fetch and group links from current page ([8739ecd](https://github.com/eskalacja/website-scanner/commit/8739ecd5a936d5fe95acad47f509a4e2002f4ad5))
* gather links in a structured way ([4f239c1](https://github.com/eskalacja/website-scanner/commit/4f239c15e728208097b558e22707523f92579bf4))
* move output files to /app/output for easier docker runs ([024dab4](https://github.com/eskalacja/website-scanner/commit/024dab4b568e92afe77dfb2b96379f1e55e7e62b))
* output a normalized result ([dda3032](https://github.com/eskalacja/website-scanner/commit/dda3032600710cfc4ab698a95a67679d10ccb9bc))
* run simple scan ([c818f37](https://github.com/eskalacja/website-scanner/commit/c818f374e48004e188ad5c28d236fab94b2f549e))
* save report to json ([7a6d250](https://github.com/eskalacja/website-scanner/commit/7a6d250d04b3d80cd6912359320375548e71537d))
* scan all internal pages ([813609f](https://github.com/eskalacja/website-scanner/commit/813609f7788cc7197b6bf3522771480f893ebdb2))
* throw when missing env variable ([c31e813](https://github.com/eskalacja/website-scanner/commit/c31e813bbab021d98e1a1ec5deb15808f23d45f0))
* verbose logger ([1577e5f](https://github.com/eskalacja/website-scanner/commit/1577e5fb345c753e9a95c4024e8c572c83226d58))


### Bug Fixes

* no more "null" origins ([829a0e0](https://github.com/eskalacja/website-scanner/commit/829a0e00877e9770ae60fc73363255d5e821fd16))
