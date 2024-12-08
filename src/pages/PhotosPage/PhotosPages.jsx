import Slide from "../../components/Slider/Slider";
import { Helmet } from "react-helmet";

const PhotosPage = () => {
  return (
    <>
      <Helmet>
        <title>Galerie photos</title>
        <meta
          name="description"
          content="Découvrez des images inspirantes de nos cours et de nos travaux de coloration."
        />
      </Helmet>
      <Slide />
    </>
  );
};
export default PhotosPage;
