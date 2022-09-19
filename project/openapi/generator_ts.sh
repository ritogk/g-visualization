
WORK_PATH='/out/ts'
# コード生成
docker run --rm -v ${PWD}:/local openapitools/openapi-generator-cli:v5.3.0 generate -i /local/api.yaml -g typescript-fetch -o /local${WORK_PATH} -c /local/config_ts.json

OUTPUT_PATH='../resources/ts/openapi'
# vue側にコピー
rm -rf ${OUTPUT_PATH}
mkdir -p ${OUTPUT_PATH}
cp -r .${WORK_PATH}/* ${OUTPUT_PATH}
cp ./api.yaml ${OUTPUT_PATH}

# 作業ディレクトリ削除
rm -rf ./out