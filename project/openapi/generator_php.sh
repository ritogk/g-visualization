
WORK_PATH='/out/php'
# コード生成
docker run --rm -v ${PWD}:/local openapitools/openapi-generator-cli generate -i /local/api.yaml -g php -o /local${WORK_PATH} -c /local/config_php.json
# enum型の定数名の頭の勝手につく文字を削除
grep -l 'NUMBER_' .${WORK_PATH}/lib/Model/* | xargs sed -i 's/NUMBER_//g'


OUTPUT_PATH='../app/OpenAPI'
# laravel側にコピー
rm -rf ${OUTPUT_PATH}
mkdir -p ${OUTPUT_PATH}
cp -r .${WORK_PATH}/lib/* ${OUTPUT_PATH}
cp api.yaml ${OUTPUT_PATH}

# 作業ディレクトリ削除
rm -rf ./out