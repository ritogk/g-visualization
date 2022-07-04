# 技術
- vue.js
- typescript
- laravel

# アプリ概要

スポーツ走行向けのGを可視化するアプリ

## リンク
https://gvisual.homisoftware.net/lp/ja  
https://twitter.com/homing_fd2/status/1521749005360779265?s=20&t=qpOtG8M4-zggtwA0-cncgw

## 動作環境

iphone(safari, chrome)
android(chrome)

## できる事
Gのベクトル回転
Gの可視化  
Gの感度調整  
最大Gの変更

## G インジケーター

|                                                                                                                   |                                                                                                                   |
| :---------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------: |
| <img src="https://user-images.githubusercontent.com/72111956/167336480-bb207c66-b289-4197-ba51-4dda7eed0a04.png"> | <img src="https://user-images.githubusercontent.com/72111956/167336769-50288979-6ccf-4dd5-a106-bdcc471ab45d.png"> |

## G ボール

|                                                                                                                   |                                                                                                                   |
| :---------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------: |
| <img src="https://user-images.githubusercontent.com/72111956/167336420-ae7cfb1f-8ceb-4c2b-a7c2-2d58dfcc6bda.png"> | <img src="https://user-images.githubusercontent.com/72111956/166639455-31419185-d52c-4d17-a530-b067ab87962c.PNG"> |

## キャリブレーション

|                                                                                                                   |                                                                                                                   |
| :---------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------: |
| <img src="https://user-images.githubusercontent.com/72111956/166639071-71d8d948-bf4d-42ac-9812-a2ea3610f11d.PNG"> | <img src="https://user-images.githubusercontent.com/72111956/166639066-5c035886-1728-474b-aaf3-951096c15134.PNG"> |


## デモ

<video src="https://user-images.githubusercontent.com/72111956/167770813-9f066ee5-5115-471d-805b-6606976c2a8e.mp4"></video>

## 環境構築

### php コンテナ内で実行

```sh
./setup.sh
curl https://sh.rustup.rs -sSf | sh -s -- -y
```

### メインのソースディレクトリはここ  
https://github.com/ritogk/g-visualization/tree/main/project/resources/ts
