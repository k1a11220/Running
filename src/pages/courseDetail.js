import { useState } from "react";
import { Map, MapMarker, Polyline } from "react-kakao-maps-sdk";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { CourseList } from "../data/courseList";

const Container = styled.div`
  margin: auto;
  max-width: 36rem;
  /* padding: 0 22px; */

  & form {
    display: flex;
    margin-bottom: 24px;
  }
`;

const CourseDetail = () => {
  const [state, setState] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  });

  const getLocation = () => {
    //   useEffect(() => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.watchPosition(
        (position) => {
          setState((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude, // 위도
              lng: position.coords.longitude, // 경도
            },
            isLoading: false,
          }));
          console.log(position.coords);
        },
        (err) => {
          setState((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }));
        },
        { enableHighAccuracy: true }
      );
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      setState((prev) => ({
        ...prev,
        errMsg: "geolocation을 사용할수 없어요..",
        isLoading: false,
      }));
    }
    //   }, []);
  };

  setInterval(getLocation, 2000);

  let { id } = useParams();
  const overlayData = CourseList.find((course) => course.id === parseInt(id));
  //   console.log(overlayData);

  function pointsToPath(points) {
    return points.map((point) => ({
      lat: point.y,
      lng: point.x,
    }));
  }

  return (
    <Container>
      <div
        style={{
          position: "relative",
          height: "100vh",
        }}
      >
        <Map
          center={{
            // 지도의 중심좌표
            lat: overlayData.marker[0].y,
            lng: overlayData.marker[0].x,
          }}
          style={{
            width: "100%",
            height: "100%",
          }}
          level={6} // 지도의 확대 레벨
        >
          {overlayData.polyline.map(({ points, options }, i) => (
            <Polyline key={i} path={pointsToPath(points)} {...options} />
          ))}

          {overlayData.marker.map(({ x, y, zIndex }, i) => (
            <MapMarker
              key={i}
              position={{
                lat: y,
                lng: x,
              }}
              zIndex={zIndex}
            />
          ))}
          {!state.isLoading && (
            <MapMarker position={state.center}>
              {/* <div style={{ padding: "5px", color: "#000" }}>
                {state.errMsg ? state.errMsg : "여기에 계신가요?!"}
              </div> */}
            </MapMarker>
          )}
        </Map>
      </div>
    </Container>
  );
};

export default CourseDetail;
