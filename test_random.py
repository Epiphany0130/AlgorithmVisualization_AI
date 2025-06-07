import urllib.request
import json

print("测试题目随机性:")
for i in range(3):
    response = urllib.request.urlopen('http://localhost:8080/api/api/questions/random?count=5')
    result = json.loads(response.read().decode('utf-8'))
    data = result['data']
    print(f'第{i+1}次调用ID顺序: {[q["id"] for q in data]}')