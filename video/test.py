import oss2

auth = oss2.Auth('LTAIGdNdx7XNGGJF', 'tQBPhn1qZGWybqFZWfNEpUnDlZLx62')
bucket = oss2.Bucket(auth, 'oss-cn-hangzhou.aliyuncs.com', 'videoapp')

# oss2.resumable_download(bucket, '1035_1/small.mp4', 'video/small.mp4')

url = bucket.sign_url('GET', 'xiong/[Uchouten_Kazoku][02].mp4', 60)

print(url)