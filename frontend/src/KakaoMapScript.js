const { kakao } = window;

export default function KakaoMapScript(lat, lng) {
	const container = document.getElementById('myMap');
	const options = {
		center: new kakao.maps.LatLng(37.5116, 126.9817),
		level: 9
	};
	const map = new kakao.maps.Map(container, options);

	// 마커가 표시될 위치입니다 
	var markerPosition = new kakao.maps.LatLng(lat, lng);

	// 마커를 생성합니다
	var marker = new kakao.maps.Marker({
		position: markerPosition
	});

	// 마커가 지도 위에 표시되도록 설정합니다
	marker.setMap(map);
}