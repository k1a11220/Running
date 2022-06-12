import { useParams } from "react-router-dom";

const CourseDetail = () => {
  let { id } = useParams();

  return <div>{id}</div>;
};

export default CourseDetail;
