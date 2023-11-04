#!/bin/sh

s3_bucket_name=gvisual-db-backup
export AWS_ACCESS_KEY_ID="xxxxxxxxxxxx"
export AWS_SECRET_ACCESS_KEY="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
db_name="xxx"
db_username="xxx"
db_password="xxx"

file_name=gvisual-dump-`date +%Y-%m-%d`

mysqldump --single-transaction -u $db_username -p$db_password $db_name > $file_name

aws s3 cp $file_name s3://$s3_bucket_name --storage-class GLACIER_IR

rm $file_name
unset AWS_ACCESS_KEY_ID
unset AWS_SECRET_ACCESS_KEY