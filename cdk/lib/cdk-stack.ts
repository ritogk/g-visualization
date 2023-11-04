import * as cdk from "aws-cdk-lib"
import { Construct } from "constructs"
import * as s3 from "aws-cdk-lib/aws-s3"
import * as iam from "aws-cdk-lib/aws-iam"
import * as route53 from "aws-cdk-lib/aws-route53"

import * as dotenv from "dotenv"
dotenv.config()

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    // s3バケットを作成。89日経過したファイルは自動的に削除する
    const bucket = new s3.Bucket(this, "MyFirstBucket", {
      bucketName: "gvisual-db-backup",
      lifecycleRules: [
        {
          expiration: cdk.Duration.days(89),
        },
      ],
      removalPolicy: cdk.RemovalPolicy.DESTROY, // スタックが削除されたときにバケットも削除する
    })

    // s3バケットの書き込み権限を持つiamユーザーを作成
    const user = new iam.User(this, "IAMUser", {
      userName: "gvisual-user",
    })
    // S3バケットへの書き込み権限を持つポリシーを作成
    const s3Policy = new iam.PolicyStatement({
      actions: ["s3:PutObject"], // 書き込み権限を必要な操作に制限
      resources: [bucket.bucketArn + "/*"], // バケット内のすべてのオブジェクトに対する権限
    })
    // IAMユーザーにポリシーステートメントをアタッチ
    user.addToPolicy(s3Policy)

    // ホストゾーンを取得
    const hosteZoneId = process.env.HOST_ZONE_ID ?? ""
    const subDomain = process.env.SUB_DOMAIN ?? ""
    const domain = process.env.DOMAIN ?? ""
    const serverIp = process.env.SERVER_IP ?? ""
    const hostedZone = route53.HostedZone.fromHostedZoneAttributes(
      this,
      "GetHostZone",
      {
        hostedZoneId: hosteZoneId,
        zoneName: domain, // Your domain name
      }
    )

    // サブドメインを作成して、IPアドレスを設定
    const subDomainRecord = new route53.ARecord(this, "SubDomain", {
      zone: hostedZone,
      recordName: subDomain,
      ttl: cdk.Duration.minutes(5),
      target: route53.RecordTarget.fromIpAddresses(serverIp),
    })
  }
}
