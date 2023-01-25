import requests
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()

# CORS 
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True, # cookie 포함 여부를 설정한다. 기본은 False
    allow_methods=["*"],    # 허용할 method를 설정할 수 있으며, 기본값은 'GET'이다.
    allow_headers=["*"],	# 허용할 http header 목록을 설정할 수 있으며 Content-Type, Accept, Accept-Language, Content-Language은 항상 허용된다.
)

# 주소 검색하기
def getLatLng(address):
    result = ""
    url = 'https://dapi.kakao.com/v2/local/search/address.json?query=' + address
    rest_api_key = '***'
    header = {'Authorization': 'KakaoAK ' + rest_api_key}
 
    r = requests.get(url, headers=header)
 
    if r.status_code == 200:
        result_address = r.json()["documents"][0]["address"]
        
        result = result_address["y"], result_address["x"]
    else:
        result = "ERROR[" + str(r.status_code) + "]"
    
    return result

# 장소 정보 가져오기
def getInfo(latlng, keyword):
	y = str(latlng[0]) # 위도
	x = str(latlng[1]) # 경도
	radius = str(20000) # 반경 최대 20km 이내
	url = 'https://dapi.kakao.com/v2/local/search/keyword.json?' \
		+ 'y=' + y + '&' + 'x=' + x + '&' + 'radius=' + radius + '&query=' + keyword
	rest_api_key = '***'

	header = {'Authorization': 'KakaoAK ' + rest_api_key}
	
	r = requests.get(url, headers=header)
	
	if r.status_code == 200:
		result = r.json()["documents"][0] # 첫번째 검색 결과
	else:
		result = "ERROR[" + str(r.status_code) + "]"
	
	return result

@app.get("/")
def hello():
	return "API 실습을 해봅시당!"

@app.get("/place")
def myPlace():
	address = "서울 중구 세종대로 110" # 서울시청 주소
	address_latlng = getLatLng(address)
	keyword = "스윗사워솔트"
	place_info = getInfo(address_latlng, keyword)
	
	return place_info

