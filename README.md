# 技術
- vue.js
- typescript
- laravel(殆ど使ってない)

# アプリ概要

スポーツ走行時のGを可視化or音声出力して車を操る手助けをするアプリ

## リンク
https://gvisual.homisoftware.net/lp/ja  
https://twitter.com/homing_fd2/status/1521749005360779265?s=20&t=qpOtG8M4-zggtwA0-cncgw

## 動作環境

iphone(safari, chrome)
android(chrome)

## できる事
Gの可視化
Gの音声出力
ベクトルの回転

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

<video src="https://user-images.githubusercontent.com/72111956/190582702-4d902ad0-a674-41cf-ae12-8c52dca0863b.mp4"></video>

## 環境構築

### php コンテナ内で実行

```sh
./setup.sh
curl https://sh.rustup.rs -sSf | sh -s -- -y
```

### メインのソースディレクトリはここ  
https://github.com/ritogk/g-visualization/tree/main/project/resources/ts
